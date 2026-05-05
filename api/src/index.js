import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { createHash, createHmac } from 'node:crypto'

import { validateRecado } from './validate.js'
import { verifyTurnstile } from './turnstile.js'
import { createMailTransport, sendRecadoMail, firstSiteOriginFromEnv } from './mail.js'
import { sanitizeText, sanitizeLine } from './sanitize.js'
import { createPool, initDb, saveRecado, getRecados, countRecados } from './db.js'

/**
 * Gera hash do IP para armazenamento — nunca armazena o raw.
 * Com IP_HASH_SECRET usa HMAC-SHA256 (irreversível mesmo por rainbow table).
 * Sem segredo cai para SHA-256 puro (ainda anônimo, mas reversível por força bruta em IPv4).
 */
function hashIp(ip, secret) {
  if (!ip) return ''
  return secret
    ? createHmac('sha256', secret).update(ip).digest('hex')
    : createHash('sha256').update(ip).digest('hex')
}

const PORT = parseInt(process.env.PORT || '7000', 10)
const IS_PROD = process.env.NODE_ENV === 'production'

function parseOrigins(raw) {
  if (!raw || typeof raw !== 'string') return []
  return raw
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean)
}

function requiredEnv(name) {
  const v = process.env[name]
  if (v === undefined || v === '') return null
  return v
}

function assertConfigOrExit() {
  if (!IS_PROD) return

  const missing = []
  if (!requiredEnv('TURNSTILE_SECRET_KEY')) missing.push('TURNSTILE_SECRET_KEY')
  if (!requiredEnv('MAIL_SERVER')) missing.push('MAIL_SERVER')
  if (!requiredEnv('MAIL_USERNAME')) missing.push('MAIL_USERNAME')
  if (requiredEnv('MAIL_PASSWORD') === null) missing.push('MAIL_PASSWORD')
  if (parseOrigins(process.env.ALLOWED_ORIGINS || '').length === 0) {
    missing.push('ALLOWED_ORIGINS')
  }

  if (missing.length) {
    console.error('[FATAL] Variáveis obrigatórias em produção:', missing.join(', '))
    process.exit(1)
  }
}

assertConfigOrExit()

// -- DB (opcional: graceful degradation se não configurado) --
const dbPool = createPool(process.env)
if (!dbPool) {
  console.warn('[DB] Variáveis DB_HOST / DB_USER / DB_NAME ausentes — persistência desativada.')
}

const app = express()

if (process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1)
}

app.disable('x-powered-by')
app.use(helmet())

const jsonLimit = process.env.JSON_BODY_LIMIT || '24kb'
app.use(express.json({ limit: jsonLimit }))

const allowedOrigins = parseOrigins(process.env.ALLOWED_ORIGINS || '')

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        if (IS_PROD) return callback(null, false)
        return callback(null, true)
      }
      if (allowedOrigins.length === 0 && !IS_PROD) {
        return callback(null, true)
      }
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(null, false)
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400,
  }),
)

const recadosLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: IS_PROD ? 15 : 100,
  message: { error: 'rate_limited' },
  standardHeaders: true,
  legacyHeaders: false,
  ...(process.env.TRUST_PROXY === '1' ? { validate: { trustProxy: true } } : {}),
})

const listLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: IS_PROD ? 60 : 300,
  message: { error: 'rate_limited' },
  standardHeaders: true,
  legacyHeaders: false,
  ...(process.env.TRUST_PROXY === '1' ? { validate: { trustProxy: true } } : {}),
})

const mailTransport = createMailTransport(process.env)
const mailFrom = requiredEnv('MAIL_FROM') || requiredEnv('MAIL_USERNAME') || ''
const mailTo = requiredEnv('MAIL_TO') || requiredEnv('MAIL_USERNAME') || ''

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, ts: Date.now() })
})

/**
 * Erros de servidor (5xx) nunca expõem detalhes internos.
 * O motivo real fica apenas nos logs do processo.
 */
function serverErr(res, status, logMsg) {
  if (logMsg) console.error(logMsg)
  return res.status(status).json({ error: 'service_unavailable' })
}

// GET /api/recados — lista pública de recados (sem e-mail)
app.get('/api/recados', listLimiter, async (req, res) => {
  // Se o banco não estiver configurado, retorna lista vazia sem revelar o motivo
  if (!dbPool) {
    return res.status(200).json({ ok: true, recados: [], total: 0, limit: 50, offset: 0 })
  }

  const limit = Math.min(Math.max(1, parseInt(String(req.query.limit || '50'), 10) || 50), 100)
  const offset = Math.max(0, parseInt(String(req.query.offset || '0'), 10) || 0)

  try {
    const [recados, total] = await Promise.all([
      getRecados({ limit, offset }, dbPool),
      countRecados(dbPool),
    ])
    return res.status(200).json({ ok: true, recados, total, limit, offset })
  } catch (e) {
    return serverErr(res, 500, `[recados:list] ${e instanceof Error ? e.message : 'unknown'}`)
  }
})

// POST /api/recados — envio de recado (e-mail + persistência)
app.post('/api/recados', recadosLimiter, async (req, res) => {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    return serverErr(res, 503, '[recados:post] TURNSTILE_SECRET_KEY ausente')
  }

  if (!mailTransport || !mailFrom || !mailTo) {
    return serverErr(res, 503, '[recados:post] transporte de mail não configurado')
  }

  const v = validateRecado(req.body)
  if (!v.ok) {
    return res.status(400).json({ error: v.code })
  }

  // Sanitização anti-XSS — executada após validação de tamanho/formato
  const name = sanitizeLine(v.name)
  const email = sanitizeLine(v.email)
  const message = sanitizeText(v.message)

  // Revalida após sanitização (tags removidas podem esvaziar o campo)
  if (!name) return res.status(400).json({ error: 'invalid_name' })
  if (!message) return res.status(400).json({ error: 'invalid_message' })

  const ip =
    req.ip ||
    req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    ''

  let captchaOk
  try {
    captchaOk = await verifyTurnstile(v.turnstileToken, secret, ip)
  } catch (e) {
    return serverErr(res, 502, `[recados:captcha] verificação falhou: ${e instanceof Error ? e.message : 'unknown'}`)
  }

  if (!captchaOk) {
    return res.status(400).json({ error: 'captcha_failed' })
  }

  try {
    await sendRecadoMail(
      mailTransport,
      { name, email, message },
      { from: mailFrom, to: mailTo },
      { siteOrigin: firstSiteOriginFromEnv(process.env) },
    )
  } catch (e) {
    return serverErr(res, 502, `[recados:mail] envio falhou: ${e instanceof Error ? e.message : 'unknown'}`)
  }

  // Persistência no banco (best-effort — falha não bloqueia resposta ao cliente)
  if (dbPool) {
    try {
      const ipHash = hashIp(ip, process.env.IP_HASH_SECRET || '')
      await saveRecado({ name, email, message, ipHash }, dbPool)
    } catch (e) {
      console.error(`[recados:db] falha ao salvar: ${e instanceof Error ? e.message : 'unknown'}`)
    }
  }

  return res.status(200).json({ ok: true })
})

app.use((_req, res) => {
  res.status(404).end()
})

app.use((err, _req, res, _next) => {
  console.error('[unhandled]', err)
  res.status(500).json({ error: 'service_unavailable' })
})

app.listen(PORT, '0.0.0.0', async () => {
  if (dbPool) {
    try {
      await initDb(dbPool)
      console.log('[DB] Tabela recados pronta.')
    } catch (e) {
      console.error('[DB] Falha ao inicializar tabela:', e instanceof Error ? e.message : 'unknown')
    }
  }
  console.log(`our-story-api listening on :${PORT}`)
})
