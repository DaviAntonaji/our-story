import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ourstory-analytics-consent'

function loadGtag(measurementId) {
  if (typeof window === 'undefined' || window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

/**
 * Só renderiza se `VITE_GA_MEASUREMENT_ID` estiver definido.
 * O script de medição só carrega após o visitante aceitar.
 */
export default function CookieConsent() {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const [show, setShow] = useState(() => {
    if (!gaId) return false
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'granted'
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!gaId) return
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'granted') {
        loadGtag(gaId)
      }
    } catch {
      /* storage indisponível */
    }
  }, [gaId])

  if (!gaId || !show) return null

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'granted')
    } catch {
      /* ignore */
    }
    loadGtag(gaId)
    setShow(false)
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[120] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-live="polite"
    >
      <div
        className="pointer-events-auto mx-auto max-w-lg rounded-2xl px-5 py-4 backdrop-blur-md"
        style={{
          background: 'var(--surface-solid)',
          border: '1px solid var(--line)',
          boxShadow: '0 18px 48px -18px rgba(43,26,36,0.45), var(--shadow-1)',
        }}
      >
        <p id="cookie-consent-title" className="text-[0.8125rem] leading-relaxed t-body">
          Usamos cookies de terceiros para medir visitas de forma agregada e melhorar o site. Ao
          aceitar, você concorda com esse uso.{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="t-accent underline underline-offset-2"
          >
            Privacidade
          </a>
        </p>
        <div className="mt-3.5 flex justify-end">
          <button type="button" onClick={accept} className="btn btn-solid !min-h-0 !py-2 !px-5 !text-[0.8125rem]">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
