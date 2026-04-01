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
  <title>Recado</title>
</head>
<body style="margin:0;padding:0;background:#14080c;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#14080c;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;border-radius:20px;overflow:hidden;background:#2a121c;border:1px solid rgba(251,113,133,0.28);box-shadow:0 12px 40px rgba(0,0,0,0.35);">
          <tr>
            <td style="padding:0;line-height:0;overflow:hidden;">
              ${hero}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 12px;text-align:center;font-family:Georgia,'Times New Roman',serif;">
              <p style="margin:0;color:#fda4af;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">Our Story · Recado</p>
              <h1 style="margin:10px 0 0;color:#fff7f7;font-size:24px;font-weight:400;line-height:1.3;">Alguém deixou um carinho pra vocês</h1>
              <p style="margin:12px 0 0;color:#e9b4c0;font-size:14px;line-height:1.5;">Chegou pelo formulário do site.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.35),transparent);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <p style="margin:0 0 6px;color:#f9a8d4;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Nome</p>
              <p style="margin:0 0 18px;color:#ffe4e6;font-size:16px;line-height:1.45;">${nameH}</p>
              <p style="margin:0 0 6px;color:#f9a8d4;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">E-mail</p>
              <p style="margin:0 0 18px;">
                <a href="mailto:${emailH}" style="color:#fcd34d;text-decoration:none;font-size:15px;">${emailH}</a>
              </p>
              <p style="margin:0 0 6px;color:#f9a8d4;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Mensagem</p>
              <div style="margin:0;padding:16px 18px;background:rgba(57,23,35,0.65);border-radius:12px;border:1px solid rgba(251,113,133,0.15);color:#fce7f3;font-size:15px;line-height:1.6;">${messageH}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 28px;text-align:center;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.25),transparent);margin:0 0 16px;"></div>
              <p style="margin:0;color:#9f6f7c;font-size:12px;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Responda direto a esta mensagem para falar com quem enviou.</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;color:#5c3d48;font-size:11px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Enviado automaticamente · por favor não divulgue dados de terceiros.</p>
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
  const subject = `Recado: ${asciiSafeSubjectSnippet(name)}`
  const text = `Nome: ${name}\nE-mail: ${email}\n\n${message}\n`
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
