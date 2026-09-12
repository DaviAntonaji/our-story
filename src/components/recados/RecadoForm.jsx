import { useRef, useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import Icon from '../ui/Icon'

const apiUrl = import.meta.env.VITE_RECADOS_API_URL
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function RecadoForm({ onSuccess }) {
  const turnstileRef = useRef(null)
  const [token, setToken] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState(null)

  const configured = Boolean(apiUrl && siteKey)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!configured || status === 'sending') return
    setFeedback(null)

    if (!token) {
      setFeedback({ type: 'err', text: 'Confirme o captcha antes de enviar.' })
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          turnstileToken: token,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const map = {
          captcha_failed: 'Captcha inválido. Tente de novo.',
          rate_limited: 'Muitas tentativas. Espere um pouco e tente novamente.',
          invalid_name: 'Verifique o nome.',
          invalid_email: 'Verifique o e-mail.',
          invalid_message: 'Escreva uma mensagem (não muito longa).',
          service_unavailable: 'Serviço temporariamente indisponível. Tente mais tarde.',
        }
        setFeedback({
          type: 'err',
          text: map[data.error] || 'Algo deu errado. Tente de novo.',
        })
        turnstileRef.current?.reset()
        setToken(null)
        setStatus('idle')
        return
      }

      setFeedback({ type: 'ok', text: 'Recebemos seu recado. Obrigado pelo carinho!' })
      setName('')
      setEmail('')
      setMessage('')
      turnstileRef.current?.reset()
      setToken(null)
      setStatus('idle')
      onSuccess?.()
    } catch {
      setFeedback({ type: 'err', text: 'Sem conexão ou servidor fora do ar. Tente de novo.' })
      turnstileRef.current?.reset()
      setToken(null)
      setStatus('idle')
    }
  }

  if (!configured) {
    return (
      <p className="t-muted text-sm text-center max-w-md mx-auto leading-relaxed">
        O formulário de recados será ativado em breve. (Configure{' '}
        <code className="t-accent text-xs">VITE_RECADOS_API_URL</code> e{' '}
        <code className="t-accent text-xs">VITE_TURNSTILE_SITE_KEY</code> no ambiente de build.)
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5 text-left">
      <div className="text-center">
        <p className="kicker">Escreva pra nós</p>
        <p className="font-display text-xl italic t-ink mt-1">Deixe um recadinho</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="recado-nome" className="field-label">
            Nome
          </label>
          <input
            id="recado-nome"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field"
            placeholder="Como podemos te chamar?"
          />
        </div>
        <div>
          <label htmlFor="recado-email" className="field-label">
            E-mail
          </label>
          <input
            id="recado-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            placeholder="pra gente poder responder"
          />
        </div>
      </div>

      <div>
        <label htmlFor="recado-msg" className="field-label">
          Mensagem
        </label>
        <textarea
          id="recado-msg"
          name="message"
          required
          rows={5}
          maxLength={4000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="field resize-y min-h-[120px]"
          placeholder="Um recado, um votinho de felicidades…"
        />
      </div>

      <div className="flex justify-center py-1">
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          onSuccess={setToken}
          onExpire={() => setToken(null)}
          onError={() => setToken(null)}
          options={{ theme: 'light' }}
        />
      </div>

      {feedback && (
        <p
          role="alert"
          className={`text-sm text-center ${feedback.type === 'ok' ? 't-accent2' : 't-accent'}`}
        >
          {feedback.text}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn btn-solid w-full">
        <Icon name="feather" size={15} />
        {status === 'sending' ? 'Enviando…' : 'Enviar recado'}
      </button>

      <p className="text-[0.6875rem] text-center leading-relaxed t-faint">
        Seu nome e mensagem ficam visíveis no quadrinho acima. O e-mail é privado e nunca é exibido.
        Protegido por Cloudflare Turnstile.
      </p>
    </form>
  )
}
