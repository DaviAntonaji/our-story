import nodemailer from 'nodemailer'

function asciiSafeSubjectSnippet(s, max = 80) {
  return String(s)
    .replace(/[\r\n]/g, ' ')
    .replace(/[^\x20-\x7E]/g, '?')
    .slice(0, max)
}

/**
 * @param {import('nodemailer').Transporter} transporter
 * @param {{ name: string, email: string, message: string }} payload
 * @param {{ from: string, to: string }} cfg
 */
export async function sendRecadoMail(transporter, { name, email, message }, { from, to }) {
  const subject = `Recado: ${asciiSafeSubjectSnippet(name)}`
  const text = `Nome: ${name}\nE-mail: ${email}\n\n${message}\n`

  await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text,
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
