import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import { validateRecado } from './validate.js'
import { verifyTurnstile } from './turnstile.js'
import { createMailTransport, sendRecadoMail, firstSiteOriginFromEnv } from './mail.js'

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
    methods: ['POST', 'OPTIONS'],
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

const mailTransport = createMailTransport(process.env)
const mailFrom = requiredEnv('MAIL_FROM') || requiredEnv('MAIL_USERNAME') || ''
const mailTo = requiredEnv('MAIL_TO') || requiredEnv('MAIL_USERNAME') || ''

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, ts: Date.now() })
})

app.post('/api/recados', recadosLimiter, async (req, res) => {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY ausente')
    return res.status(503).json({ error: 'server_misconfigured' })
  }

  if (!mailTransport || !mailFrom || !mailTo) {
    console.error('Mail não configurado (MAIL_* / MAIL_FROM / MAIL_TO)')
    return res.status(503).json({ error: 'server_misconfigured' })
  }

  const v = validateRecado(req.body)
  if (!v.ok) {
    return res.status(400).json({ error: v.code })
  }

  const ip =
    req.ip ||
    req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    ''

  let captchaOk
  try {
    captchaOk = await verifyTurnstile(v.turnstileToken, secret, ip)
  } catch {
    return res.status(502).json({ error: 'captcha_verify_failed' })
  }

  if (!captchaOk) {
    return res.status(400).json({ error: 'captcha_failed' })
  }

  try {
    await sendRecadoMail(
      mailTransport,
      { name: v.name, email: v.email, message: v.message },
      { from: mailFrom, to: mailTo },
      { siteOrigin: firstSiteOriginFromEnv(process.env) },
    )
  } catch (e) {
    console.error('Envio SMTP falhou:', e instanceof Error ? e.message : 'unknown')
    return res.status(502).json({ error: 'delivery_failed' })
  }

  return res.status(200).json({ ok: true })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'not_found' })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'internal_error' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`our-story-api listening on :${PORT}`)
})
