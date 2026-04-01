import nodemailer from 'nodemailer'

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function asciiSafeSubjectSnippet(s, max = 80) {
  return String(s)
    .replace(/[\r\n]/g, ' ')
    .replace(/[^\x20-\x7E]/g, '?')
    .slice(0, max)
}

/** Primeira origem do CORS (site público), sem barra final. */
export function firstSiteOriginFromEnv(env) {
  const raw = env.ALLOWED_ORIGINS || ''
  const o = raw.split(',')[0]?.trim().replace(/\/$/, '')
  return o || ''
}

/**
 * @param {{ name: string, email: string, message: string }} payload
 * @param {string} siteOrigin URL base do site (ex.: https://exemplo.com)
 */
function buildRecadoHtml({ name, email, message }, siteOrigin) {
  const coverSrc = siteOrigin ? `${siteOrigin}/imgs/og-cover.jpg` : ''
  const nameH = escapeHtml(name)
  const emailH = escapeHtml(email)
  const messageH = escapeHtml(message).replace(/\r\n/g, '\n').replace(/\n/g, '<br />')

  const hero = coverSrc
    ? `<img src="${escapeHtml(coverSrc)}" alt="" width="560" style="display:block;width:100%;max-width:560px;height:auto;border:0;line-height:0;" />`
    : ''

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="color-scheme" content="dark light" />
  <meta name="supported-color-schemes" content="dark light" />
  <title>Um recadinho para nós</title>
</head>
<body style="margin:0;padding:0;background:linear-gradient(180deg,#1f0f18 0%,#3d1624 45%,#1a0d14 100%);-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:transparent;">
    <tr>
      <td align="center" style="padding:28px 14px 36px;">
        <!-- cartão principal -->
        <table role="presentation" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;border-radius:24px;overflow:hidden;background:linear-gradient(165deg,#3d1624 0%,#2a121c 50%,#221018 100%);border:1px solid rgba(253,164,175,0.35);box-shadow:0 4px 32px rgba(251,113,133,0.12),0 24px 48px rgba(0,0,0,0.3);">
          <tr>
            <td style="padding:0;line-height:0;overflow:hidden;">
              ${hero}
            </td>
          </tr>
          <tr>
            <td style="padding:26px 26px 6px;text-align:center;font-family:Georgia,'Times New Roman',serif;">
              <p style="margin:0;color:#fecdd3;font-size:13px;letter-spacing:0.02em;">✨ 💌 ✨</p>
              <p style="margin:10px 0 0;color:#fda4af;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.95;">Um cantinho do nosso site</p>
              <h1 style="margin:12px 0 0;color:#fff5f5;font-size:26px;font-weight:400;line-height:1.35;">Chegou um carinho pra nós 💕</h1>
              <p style="margin:14px 0 0;color:#fbcfe8;font-size:15px;line-height:1.65;font-style:italic;">Alguém leu a nossa história com o coração e quis deixar um pedacinho de carinho aqui.<br />Guarde juntos com carinho — cada palavra é sobre o nosso casal.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 26px 14px;text-align:center;">
              <span style="display:inline-block;font-size:18px;letter-spacing:0.35em;line-height:1;">🌹 💕 🌹</span>
            </td>
          </tr>
          <tr>
            <td style="padding:0 26px 10px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.45),rgba(252,211,77,0.35),rgba(251,191,36,0.45),transparent);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 26px 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <p style="margin:0 0 8px;color:#f9a8d4;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;">Quem enviou com carinho</p>
              <p style="margin:0 0 22px;color:#ffe4e6;font-size:17px;line-height:1.45;font-weight:500;">${nameH}</p>
              <p style="margin:0 0 8px;color:#f9a8d4;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;">Para responder</p>
              <p style="margin:0 0 22px;">
                <a href="mailto:${emailH}" style="color:#fde68a;text-decoration:none;font-size:15px;border-bottom:1px solid rgba(253,230,138,0.5);">${emailH}</a>
              </p>
              <p style="margin:0 0 10px;color:#f9a8d4;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;">O que essa pessoa quis dizer</p>
              <div style="margin:0;padding:20px 22px;background:rgba(255,228,230,0.06);border-radius:16px;border:1px solid rgba(251,113,133,0.22);color:#fce7f3;font-size:15px;line-height:1.72;box-shadow:inset 0 1px 0 rgba(255,255,255,0.04);">${messageH}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 26px 26px;text-align:center;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.3),transparent);margin:0 0 18px;"></div>
              <p style="margin:0 0 8px;color:#e9b4c0;font-size:14px;line-height:1.55;font-family:Georgia,'Times New Roman',serif;font-style:italic;">Se quiser agradecer, é só responder este e-mail — a mensagem volta direto pra quem mandou.</p>
              <p style="margin:16px 0 0;color:#fda4af;font-size:13px;line-height:1.5;font-family:Georgia,'Times New Roman',serif;">Com todo o meu amor,<br /><span style="color:#fff7f7;">Davi</span> <span style="font-size:11px;opacity:0.85;">💕</span></p>
            </td>
          </tr>
        </table>
        <p style="margin:22px 20px 0;max-width:520px;color:#8b5a6b;font-size:11px;line-height:1.55;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:center;">Este e-mail foi gerado com carinho pelo formulário do nosso site. É só entre nós — trate o recado e os dados de quem escreveu com delicadeza.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * @param {import('nodemailer').Transporter} transporter
 * @param {{ name: string, email: string, message: string }} payload
 * @param {{ from: string, to: string }} cfg
 * @param {{ siteOrigin: string }} opts – base URL do site (ALLOWED_ORIGINS) para imagens
 */
export async function sendRecadoMail(transporter, { name, email, message }, { from, to }, opts = {}) {
  const siteOrigin = opts.siteOrigin || ''
  const subject = `💌 Recadinho pro nosso cantinho · ${asciiSafeSubjectSnippet(name)}`
  const text = `Oi, amores — chegou um recadinho no nosso site.\n\nDe: ${name}\nE-mail (pra responder): ${email}\n\n---\n\n${message}\n\n---\n\nCom amor,\n(o site que o Davi fez com carinho pra gente)\n`
  const html = buildRecadoHtml({ name, email, message }, siteOrigin)

  await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
  })
}

/**
 * Cria transport SMTP com TLS mínimo 1.2.
 * @param {NodeJS.ProcessEnv} env
 */
export function createMailTransport(env) {
  const host = env.MAIL_SERVER
  const port = parseInt(env.MAIL_PORT || '587', 10)
  const user = env.MAIL_USERNAME
  const pass = env.MAIL_PASSWORD

  if (!host || !user || pass === undefined || pass === '') {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { minVersion: 'TLSv1.2' },
  })
}
