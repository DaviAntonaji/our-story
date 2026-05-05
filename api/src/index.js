import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

import { validateRecado } from './validate.js'
import { verifyTurnstile } from './turnstile.js'
import { createMailTransport, sendRecadoMail, firstSiteOriginFromEnv } from './mail.js'
import { sanitizeText, sanitizeLine } from './sanitize.js'
import { createPool, initDb, saveRecado, approveRecado, getRecados, countRecados } from './db.js'

/**
 * Gera hash do IP para armazenamento — nunca armazena o raw.
 * Com IP_HASH_SECRET usa HMAC-SHA256 (irreversível mesmo por rainbow table).
 */
function hashIp(ip, secret) {
  if (!ip) return ''
  return secret
    ? createHmac('sha256', secret).update(ip).digest('hex')
    : createHash('sha256').update(ip).digest('hex')
}

/**
 * Gera token de aprovação único por recado: HMAC-SHA256(secret, id) → hex 64 chars.
 * Mesmo que alguém intercepte o link de um recado, não consegue aprovar outro.
 */
function approvalToken(id, secret) {
  return createHmac('sha256', secret).update(String(id)).digest('hex')
}

/** Comparação timing-safe para evitar timing attacks na validação do token. */
function tokenEqual(a, b) {
  try {
    const ba = Buffer.from(String(a))
    const bb = Buffer.from(String(b))
    if (ba.length !== bb.length) return false
    return timingSafeEqual(ba, bb)
  } catch {
    return false
  }
}

/** Monta a URL completa do endpoint de aprovação. */
function buildApprovalUrl(id, secret, apiBase) {
  if (!id || !secret || !apiBase) return ''
  const token = approvalToken(id, secret)
  return `${apiBase.replace(/\/$/, '')}/api/recados/approve?id=${id}&token=${token}`
}

/** Página HTML de resposta ao clicar no link de aprovação. */
function approvePageHtml(state, siteOrigin) {
  const site = siteOrigin || 'https://ourstory.antonaji.com.br'
  const content = {
    success: { icon: '💕', title: 'Recadinho publicado!', msg: 'Já está visível no quadro do site.' },
    invalid: { icon: '🚫', title: 'Link inválido', msg: 'Este link de aprovação é inválido ou já foi utilizado.' },
    error:   { icon: '⚠️', title: 'Algo deu errado', msg: 'Não foi possível publicar agora. Tente novamente.' },
  }[state] ?? { icon: '⚠️', title: 'Erro', msg: '' }

  const metaRefresh = state === 'success'
    ? `<meta http-equiv="refresh" content="5;url=${site}">`
    : ''
  const footer = state === 'success'
    ? `<p class="sub">Redirecionando para o site em 5 segundos…<br><a href="${site}">Ir agora</a></p>`
    : `<p class="sub"><a href="${site}">Voltar ao site</a></p>`

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  ${metaRefresh}
  <title>${content.title} · Nossa História</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{min-height:100dvh;display:flex;align-items:center;justify-content:center;
         background:linear-gradient(155deg,#3e0e2e 0%,#5c1645 50%,#2a0820 100%);
         font-family:system-ui,-apple-system,sans-serif;padding:1.25rem}
    .card{text-align:center;padding:2.75rem 2rem 2.25rem;max-width:360px;width:100%;
          background:rgba(55,25,42,0.90);border-radius:22px;
          border:1px solid rgba(212,175,55,0.28);
          box-shadow:0 8px 40px rgba(0,0,0,0.45)}
    .icon{font-size:3rem;line-height:1;margin-bottom:.85rem}
    h1{color:#fff5f5;font-size:1.3rem;font-weight:500;margin-bottom:.6rem}
    p{color:#fbcfe8;font-size:.9rem;line-height:1.65}
    .sub{margin-top:1.6rem;font-size:.78rem;color:#fda4af;opacity:.7}
    a{color:#fde68a;text-underline-offset:3px}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${content.icon}</div>
    <h1>${content.title}</h1>
    <p>${content.msg}</p>
    ${footer}
  </div>
</body>
</html>`
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

// GET /api/recados/approve — aprovação via link do e-mail (retorna HTML, não JSON)
app.get('/api/recados/approve', async (req, res) => {
  const siteOrigin = firstSiteOriginFromEnv(process.env)
  const secret = process.env.APPROVE_SECRET

  if (!secret || !dbPool) {
    return res.status(503).set('Content-Type', 'text/html; charset=utf-8').send(approvePageHtml('error', siteOrigin))
  }

  const rawId = req.query.id
  const rawToken = req.query.token

  if (!rawId || !rawToken) {
    return res.status(400).set('Content-Type', 'text/html; charset=utf-8').send(approvePageHtml('invalid', siteOrigin))
  }

  const id = parseInt(String(rawId), 10)
  if (!id || id <= 0) {
    return res.status(400).set('Content-Type', 'text/html; charset=utf-8').send(approvePageHtml('invalid', siteOrigin))
  }

  const expected = approvalToken(id, secret)
  if (!tokenEqual(String(rawToken), expected)) {
    return res.status(403).set('Content-Type', 'text/html; charset=utf-8').send(approvePageHtml('invalid', siteOrigin))
  }

  try {
    await approveRecado(id, dbPool)
    return res.set('Content-Type', 'text/html; charset=utf-8').send(approvePageHtml('success', siteOrigin))
  } catch (e) {
    console.error(`[approve] falha ao publicar id=${id}:`, e instanceof Error ? e.message : 'unknown')
    return res.status(500).set('Content-Type', 'text/html; charset=utf-8').send(approvePageHtml('error', siteOrigin))
  }
})

// POST /api/recados — envio de recado (salva no DB → manda e-mail com link de aprovação)
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

  // 1. Salva no banco primeiro (visible=0) para obter o ID e gerar o link de aprovação
  let insertedId = null
  if (dbPool) {
    try {
      const ipHash = hashIp(ip, process.env.IP_HASH_SECRET || '')
      insertedId = await saveRecado({ name, email, message, ipHash }, dbPool)
    } catch (e) {
      console.error(`[recados:db] falha ao salvar: ${e instanceof Error ? e.message : 'unknown'}`)
      // Continua — e-mail é enviado mesmo sem persistência
    }
  }

  // 2. Monta link de aprovação (só se tiver ID + secrets configurados)
  const approvalUrl = buildApprovalUrl(
    insertedId,
    process.env.APPROVE_SECRET || '',
    process.env.API_BASE_URL || '',
  )

  // 3. Envia e-mail com o botão de aprovação
  try {
    await sendRecadoMail(
      mailTransport,
      { name, email, message },
      { from: mailFrom, to: mailTo },
      { siteOrigin: firstSiteOriginFromEnv(process.env), approvalUrl },
    )
  } catch (e) {
    return serverErr(res, 502, `[recados:mail] envio falhou: ${e instanceof Error ? e.message : 'unknown'}`)
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
