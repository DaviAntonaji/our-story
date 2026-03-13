import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Data de início do namoro: 04/03/2026 às 19:30
const INICIO_NAMORO = new Date(2026, 2, 4, 19, 30, 0)

const SPOTIFY_URL = 'https://open.spotify.com/embed/track/7FOPTUmEJ3ByYW9ag9cZJ3'

const FOTOS = [
  '/imgs/photos/1.jpg',
  '/imgs/photos/2.jpg',
  '/imgs/photos/3.jpg',
  '/imgs/photos/4.jpg',
  '/imgs/photos/5.jpg',
  '/imgs/photos/6.jpg',
  '/imgs/photos/7.jpg',
  '/imgs/photos/8.jpg',
  '/imgs/photos/9.jpg',
  '/imgs/photos/10.jpeg',
  '/imgs/photos/11.jpeg',
  '/imgs/photos/12.jpeg',
  '/imgs/photos/13.jpeg',
  '/imgs/photos/14.jpg',
  '/imgs/photos/15.jpg',
  '/imgs/photos/16.jpg',
]

const MIN_SWIPE = 50
const INTERVALO_CARROSSEL = 7000

// ─── Hooks ───────────────────────────────────────────────

function useCountUp(end, duration = 1200, startOn = true) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)
  useEffect(() => {
    if (!startOn || end === 0) { setValue(end); return }
    let raf
    const animate = (now) => {
      if (!startRef.current) startRef.current = now
      const progress = Math.min((now - startRef.current) / duration, 1)
      const eased = 1 - (1 - progress) ** 2
      setValue(Math.floor(eased * end))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, startOn])
  return value
}

function useTempoJuntos() {
  const [tempo, setTempo] = useState({ meses: 0, dias: 0, horas: '00', minutos: '00', segundos: '00', totalDias: 0 })
  useEffect(() => {
    const atualizar = () => {
      const diff = new Date() - INICIO_NAMORO
      if (diff < 0) return
      const totalDias = Math.floor(diff / 86400000)
      const meses = Math.floor(totalDias / 30)
      const dias = totalDias % 30
      const horas = Math.floor((diff / 3600000) % 24).toString().padStart(2, '0')
      const minutos = Math.floor((diff / 60000) % 60).toString().padStart(2, '0')
      const segundos = Math.floor((diff / 1000) % 60).toString().padStart(2, '0')
      setTempo({ meses, dias, horas, minutos, segundos, totalDias })
    }
    atualizar()
    const id = setInterval(atualizar, 1000)
    return () => clearInterval(id)
  }, [])
  return tempo
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const h = () => setIsMobile(mq.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return isMobile
}

// ─── Animação ─────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.4, ease: 'easeOut' },
}
const alwaysVisible = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
}

// ─── Componentes de fundo ──────────────────────────────────

function HeartsRain() {
  const items = [
    { emoji: '❤️', left: '5%', delay: '-4.5s', dur: 5 },
    { emoji: '🦋', left: '12%', delay: '-2s', dur: 7 },
    { emoji: '💕', left: '22%', delay: '-3.2s', dur: 5.5 },
    { emoji: '💗', left: '32%', delay: '-1.8s', dur: 4.5 },
    { emoji: '🦋', left: '42%', delay: '-5s', dur: 8 },
    { emoji: '💖', left: '52%', delay: '-2.5s', dur: 5.2 },
    { emoji: '❤️', left: '62%', delay: '-0.5s', dur: 4.8 },
    { emoji: '🦋', left: '72%', delay: '-3.5s', dur: 9 },
    { emoji: '💕', left: '82%', delay: '-4.8s', dur: 5.8 },
    { emoji: '💝', left: '92%', delay: '-2.8s', dur: 4.5 },
  ]
  return (
    <div className="hearts-rain fixed inset-0 pointer-events-none z-[1]" aria-hidden style={{ overflow: 'hidden' }}>
      {items.map((h, i) => (
        <span key={i} style={{ left: h.left, top: '-20px', fontSize: '1.4rem', animationDelay: h.delay, animationDuration: `${h.dur}s` }}>
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

function ButterfliesFloating({ isMobile }) {
  const all = [
    { left: '5%', delay: '-18s', dur: 22 },
    { left: '20%', delay: '-8s', dur: 18 },
    { left: '38%', delay: '-25s', dur: 24 },
    { left: '55%', delay: '-3s', dur: 20 },
    { left: '72%', delay: '-14s', dur: 19 },
    { left: '88%', delay: '-22s', dur: 23 },
  ]
  const visible = isMobile ? all.slice(0, 3) : all
  return (
    <div className="butterflies-float fixed inset-0 pointer-events-none z-[1]" aria-hidden style={{ overflow: 'hidden' }}>
      {visible.map((b, i) => (
        <span key={i} style={{ left: b.left, top: '-20px', fontSize: i % 2 === 0 ? '1rem' : '1.2rem', animationDelay: b.delay, animationDuration: `${b.dur}s` }}>
          🦋
        </span>
      ))}
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────

export default function App() {
  const [revelado, setRevelado] = useState(false)
  const [musicaRevelada, setMusicaRevelada] = useState(false)
  const [mensagemRevelada, setMensagemRevelada] = useState(false)
  const [fotoAtual, setFotoAtual] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const touchStartX = useRef(0)
  const tempo = useTempoJuntos()
  const totalDiasAnimado = useCountUp(tempo.totalDias, 1400, revelado)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!revelado) return
    const id = setInterval(() => setFotoAtual(i => (i + 1) % FOTOS.length), INTERVALO_CARROSSEL)
    return () => clearInterval(id)
  }, [revelado, timerKey])

  const irParaFoto = (i) => { setFotoAtual(i); setTimerKey(k => k + 1) }
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) >= MIN_SWIPE) irParaFoto(diff > 0 ? (fotoAtual + 1) % FOTOS.length : (fotoAtual - 1 + FOTOS.length) % FOTOS.length)
  }

  const sectionProps = isMobile ? alwaysVisible : fadeUp

  // ── LANDING ────────────────────────────────────────────────
  if (!revelado) {
    return (
      <>
        {typeof document !== 'undefined' && createPortal(<HeartsRain />, document.body)}
        <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center page-bg-landing text-rose-100 px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] relative overflow-hidden">

          {/* Conteúdo centralizado */}
          <div className="w-full max-w-xs flex flex-col items-center gap-6 relative z-10">

            {/* Emoji */}
            <motion.div
              className="text-6xl"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              💕
            </motion.div>

            {/* Texto */}
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="font-display text-2xl font-light tracking-wide text-rose-100/95">
                Uma surpresa especial
              </p>
              <p className="font-display text-2xl font-light tracking-wide text-rose-100/95">
                te espera <span className="float-emoji inline-block text-xl" style={{ animationDelay: '0.5s' }}>🦋</span>
              </p>
            </motion.div>

            {/* Divisor */}
            <motion.div
              className="flex items-center gap-3 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
              <span className="text-amber-300/60 text-xs tracking-widest">❀ ❀ ❀</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
            </motion.div>

            {/* Botão */}
            <motion.button
              onClick={() => setRevelado(true)}
              className="btn-primary w-full rounded-2xl font-sans text-base font-medium flex items-center justify-center gap-2 px-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <span>💕</span>
              Clique aqui, meu bem
              <span>💕</span>
            </motion.button>

            <motion.p
              className="text-sm text-rose-300/50 flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span>✨</span> Toque para revelar <span>✨</span>
            </motion.p>
          </div>
        </div>
      </>
    )
  }

  // ── PÁGINA PRINCIPAL ──────────────────────────────────────
  return (
    <div className="min-h-screen min-h-[100dvh] text-rose-100 relative overflow-x-hidden page-bg">
      {typeof document !== 'undefined' && createPortal(<ButterfliesFloating isMobile={isMobile} />, document.body)}

      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-20 safe-bottom space-y-10 sm:space-y-14 relative z-10 pt-[env(safe-area-inset-top)]">

        {/* Hint scroll mobile */}
        <p className="text-rose-300/50 text-xs text-center animate-pulse sm:hidden">
          Role para ver nossa história ↓
        </p>

        {/* ── HERO ─────────────────────────────────────────── */}
        <motion.section className="flex flex-col items-center gap-6 text-center" {...sectionProps}>

          {/* Corações */}
          <div className="flex gap-3 text-3xl">
            <span style={{ animation: 'heartBeatSoft 2.5s ease-in-out infinite' }}>❤️</span>
            <span style={{ animation: 'heartBeatSoft 2.5s ease-in-out infinite 0.4s' }}>❤️</span>
            <span style={{ animation: 'heartBeatSoft 2.5s ease-in-out infinite 0.8s' }}>❤️</span>
          </div>

          {/* Tagline */}
          <p className="text-rose-200/70 text-sm italic font-body">
            A história mais bonita que Deus já escreveu na minha vida.
          </p>

          {/* Foto hero */}
          <div className="photo-frame w-full max-w-[280px] sm:max-w-[320px]">
            <div className="aspect-[3/4] overflow-hidden rounded-[18px]">
              <img
                src="/imgs/photos/15.jpg"
                alt="Nós dois"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Título */}
          <div className="space-y-1 relative px-4">
            <span className="float-emoji absolute -left-1 top-0 text-xl opacity-60" style={{ animationDelay: '0s' }} aria-hidden>🦋</span>
            <h1 className="text-hero font-display font-semibold text-rose-50 leading-tight">
              Para você, Maysa ❤️
            </h1>
            <h2 className="font-display text-xl sm:text-2xl font-normal text-rose-200/85">
              Amor da minha vida
            </h2>
          </div>

          {/* Badge data */}
          <span className="badge-pill">
            🌹 Juntos desde 04 de março de 2026
          </span>

          {/* Timer */}
          <div className="w-full space-y-2">
            <p className="text-rose-200/80 text-sm font-medium">Estamos juntos há</p>

            <div className="timer-box flex items-end justify-center gap-0 px-4 py-5 overflow-x-auto w-full">
              {/* Meses */}
              <div className="flex flex-col items-center px-3 sm:px-4">
                <span className="text-2xl sm:text-3xl font-bold text-rose-100 font-mono tabular-nums">{tempo.meses}</span>
                <span className="text-[10px] sm:text-xs text-rose-300/60 mt-0.5 tracking-wide uppercase">Meses</span>
              </div>
              <span className="timer-sep text-xl font-light mb-1">·</span>
              {/* Dias */}
              <div className="flex flex-col items-center px-3 sm:px-4">
                <span className="text-2xl sm:text-3xl font-bold text-rose-100 font-mono tabular-nums">{tempo.dias}</span>
                <span className="text-[10px] sm:text-xs text-rose-300/60 mt-0.5 tracking-wide uppercase">Dias</span>
              </div>
              <span className="timer-sep text-xl font-light mb-1">·</span>
              {/* Horas */}
              <div className="flex flex-col items-center px-2 sm:px-3">
                <span className="text-2xl sm:text-3xl font-bold text-rose-100 font-mono tabular-nums">{tempo.horas}</span>
                <span className="text-[10px] sm:text-xs text-rose-300/60 mt-0.5 tracking-wide uppercase">Horas</span>
              </div>
              <span className="timer-sep text-lg mb-1">:</span>
              <div className="flex flex-col items-center px-2 sm:px-3">
                <span className="text-2xl sm:text-3xl font-bold text-rose-100 font-mono tabular-nums">{tempo.minutos}</span>
                <span className="text-[10px] sm:text-xs text-rose-300/60 mt-0.5 tracking-wide uppercase">Min</span>
              </div>
              <span className="timer-sep text-lg mb-1">:</span>
              <div className="flex flex-col items-center px-2 sm:px-3">
                <span className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono tabular-nums">{tempo.segundos}</span>
                <span className="text-[10px] sm:text-xs text-rose-300/60 mt-0.5 tracking-wide uppercase">Seg</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-rose-200/90 font-medium">
              {totalDiasAnimado} dias vivendo o melhor capítulo da minha vida ❤️
            </p>
          </div>

          {/* Decoração */}
          <div className="flex items-center gap-2 text-xl">
            <span className="float-emoji opacity-80" style={{ animationDelay: '0s' }}>✨</span>
            <span className="float-emoji opacity-70" style={{ animationDelay: '0.5s' }}>🦋</span>
            <span className="float-emoji opacity-90" style={{ animationDelay: '0.2s' }}>🌹</span>
            <span className="float-emoji opacity-80" style={{ animationDelay: '0.7s' }}>✨</span>
          </div>
        </motion.section>

        {/* Divisor fino */}
        <div className="flex items-center gap-3 opacity-50">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          <span className="text-amber-300/70 text-xs tracking-widest">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
        </div>

        {/* ── NOSSA MÚSICA ──────────────────────────────────── */}
        <motion.section className="card-surface overflow-hidden" {...sectionProps}>
          {!musicaRevelada ? (
            <button
              onClick={() => setMusicaRevelada(true)}
              className="reveal-music-btn"
            >
              <span className="text-4xl">🎵</span>
              <div className="space-y-1 text-center">
                <p className="font-display text-xl font-semibold text-rose-50">Nossa Música</p>
                <p className="text-rose-200/70 text-sm">A trilha sonora do nosso amor 💕</p>
              </div>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-rose-100 text-sm font-medium mt-1">
                <span>▶</span> Ouvir nossa música
              </span>
            </button>
          ) : (
            <div className="p-4 sm:p-5">
              <p className="font-display text-xl font-semibold text-rose-50 text-center mb-1">Nossa Música 🎵</p>
              <p className="text-rose-200/70 text-sm text-center mb-4">A trilha sonora do nosso amor 💗</p>
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  style={{ borderRadius: 14, minHeight: 280 }}
                  src={SPOTIFY_URL}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Nossa música"
                />
              </div>
            </div>
          )}
        </motion.section>

        {/* ── FRASE DE AMOR ─────────────────────────────────── */}
        <motion.section className="card-surface quote-card allow-select" {...sectionProps}>
          <div className="relative z-10 space-y-3 pt-4">
            <p className="font-body text-base leading-[1.9] italic text-rose-100/95">Maysa,</p>
            <p className="font-body text-base leading-[1.9] italic text-rose-100/90">
              desde o primeiro dia eu senti que algo em você era diferente.
            </p>
            <p className="font-body text-base leading-[1.9] italic text-rose-100/90">
              Cada momento com você é especial, e cada sorriso seu me faz bem.
            </p>
            <p className="font-body text-base leading-[1.9] italic text-rose-100/90">
              Te amo mais do que consigo dizer.
            </p>
          </div>
          <p className="text-center text-2xl mt-5" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>💕</p>
        </motion.section>

        {/* ── COISAS QUE AMO ────────────────────────────────── */}
        <motion.section className="card-surface p-5 sm:p-6" {...sectionProps}>
          <h2 className="text-section-title font-display font-semibold text-rose-50 text-center mb-5">
            ❤️ Coisas que amo em você{' '}
            <span className="float-emoji text-xl" style={{ animationDelay: '0.4s' }}>🦋</span>
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ['✝️', 'Seu amor por Deus'],
              ['💕', 'O jeito que você cuida de mim'],
              ['🕊️', 'A paz que sinto ao seu lado'],
              ['💪', 'Como você sempre me incentiva'],
              ['❤️', 'Seu jeito de demonstrar amor'],
              ['✨', 'Como você torna tudo mais leve'],
              ['👀', 'Seu olhar quando me vê'],
              ['💗', 'Seu coração bondoso'],
              ['😊', 'Seu sorriso e sua risada'],
              ['🌹', 'Seu jeito único de ser'],
            ].map(([emoji, text]) => (
              <div key={text} className="tag-item">
                <span className="text-lg shrink-0">{emoji}</span>
                <span className="text-sm leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divisor */}
        <div className="flex items-center gap-3 opacity-50">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          <span className="text-amber-300/70 text-xs tracking-widest">✦ ✧ ✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
        </div>

        {/* ── VERSÍCULO ─────────────────────────────────────── */}
        <motion.section className="card-surface p-5 sm:p-6 allow-select" {...sectionProps}>
          <div className="text-center mb-4">
            <span className="text-2xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite 0.5s' }}>✝️</span>
            <h2 className="font-display text-card-title font-semibold text-rose-50 mt-1">
              1 Coríntios 13:4-7
            </h2>
          </div>
          <blockquote className="verse-card space-y-2.5 text-rose-200/90 text-sm sm:text-base leading-[1.75]">
            <p><span className="text-amber-300/70 font-semibold">4</span> O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.</p>
            <p><span className="text-amber-300/70 font-semibold">5</span> Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.</p>
            <p><span className="text-amber-300/70 font-semibold">6</span> O amor não se alegra com a injustiça, mas se alegra com a verdade.</p>
            <p><span className="text-amber-300/70 font-semibold">7</span> Tudo sofre, tudo crê, tudo espera, tudo suporta.</p>
          </blockquote>
          <p className="text-amber-300/60 text-xs text-center mt-3 italic">— 1 Coríntios 13</p>
          <p className="text-rose-400/70 text-xs text-center mt-1">Esse versículo sempre me lembra você.</p>
        </motion.section>

        {/* ── MOMENTOS ──────────────────────────────────────── */}
        <motion.section {...sectionProps}>
          <div className="text-center mb-4">
            <h2 className="text-section-title font-display font-semibold text-rose-50">Momentos 📸</h2>
            <p className="text-rose-200/70 text-sm mt-1">Memórias que guardamos no coração, Maysa 💖</p>
          </div>
          <div className="-mx-4 sm:mx-0">
            <div
              className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden card-surface h-[370px] sm:h-[420px] flex items-center justify-center w-full"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Contador */}
              <div className="carousel-counter">{fotoAtual + 1} / {FOTOS.length}</div>

              {/* Seta esquerda */}
              <button
                type="button"
                onClick={() => irParaFoto((fotoAtual - 1 + FOTOS.length) % FOTOS.length)}
                className="absolute left-2 z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/30 border border-white/15 active:bg-black/50 transition-colors"
                aria-label="Foto anterior"
              >
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Seta direita */}
              <button
                type="button"
                onClick={() => irParaFoto((fotoAtual + 1) % FOTOS.length)}
                className="absolute right-2 z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/30 border border-white/15 active:bg-black/50 transition-colors"
                aria-label="Próxima foto"
              >
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Foto */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={fotoAtual}
                    src={FOTOS[fotoAtual]}
                    alt={`Momento ${fotoAtual + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </div>

              {/* Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {FOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => irParaFoto(i)}
                    aria-label={`Foto ${i + 1}`}
                    className={`rounded-full transition-all duration-200 ${
                      i === fotoAtual
                        ? 'bg-amber-400 w-4 h-1.5'
                        : 'bg-white/35 w-1.5 h-1.5 hover:bg-white/55 active:bg-white/55'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Divisor grande */}
        <div className="flex items-center gap-3 opacity-50">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          <span className="text-amber-300/70 text-xs tracking-widest">✦ ✧ ✦ ✧ ✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
        </div>

        {/* ── NOSSA HISTÓRIA (TIMELINE) ─────────────────────── */}
        <motion.section className="allow-select" {...(isMobile ? alwaysVisible : fadeUp)}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite' }}>🌹</span>
              <h2 className="text-section-title font-display font-semibold text-rose-50">Nossa História</h2>
              <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite 0.5s' }}>📖</span>
            </div>
            <p className="text-rose-200/65 text-sm">Os momentos que marcaram nossa trajetória</p>
            <div className="flex items-center justify-center gap-2 mt-3 text-amber-300/50 text-xs tracking-widest">
              <span>✦</span><span>✧</span><span>✦</span>
            </div>
          </div>

          <div className="space-y-5">
            {[
              {
                data: '13–15 de fevereiro de 2026',
                titulo: 'Onde tudo começou',
                paras: [
                  'Foi no acampamento da Comunidade Apascentar que começamos a nos aproximar de verdade, conversando mais e conhecendo melhor o estilo um do outro.',
                ],
              },
              {
                data: '20 de fevereiro de 2026',
                titulo: 'Quando você se apaixonou por mim',
                paras: [
                  'Eu não sabia o quão mal eu estava naquele dia... Você estava mal ao ponto de qualquer coisa te fazer chorar...',
                  'Você só disse: "estou meio desanimada hoje..." Não revelou o real peso que estava sentindo...',
                  'E quando comecei a conversar com você sobre Deus, e passagens sobre não desanimar, sobre cansar... Você chorou na hora — e foi só depois, já namorando, que você me contou que foi ali que percebeu que estava apaixonada por mim...',
                ],
              },
              {
                data: '04 de março de 2026',
                titulo: 'Início do nosso namoro',
                paras: [
                  'Começou quando combinamos de sair no João Julhão às 18h, e conseguimos estender até as 20h. Com isso, eu já comecei a correr com as coisas durante o dia para deixar tudo preparado.',
                  'Cheguei no JJ exatamente às 18:00 e já combinei com o garçom todo o roteiro do que iria acontecer. Quando você chegou com a Talita, estava linda… e ali meu coração já acelerou.',
                  'Fomos até a mesa que eu já tinha deixado separada, inclusive planejando deixar você sentada de costas para a cozinha, para que não visse nada do que estava sendo preparado.',
                  'Eu não tinha planejado muito bem como seria o papo… mas acabou sendo algo muito natural e descontraído, principalmente com as perguntas que você começou a fazer. Primeiro você perguntou sobre a minha família. Depois sobre o que era estabilidade para mim. Também falamos sobre educação financeira… tudo isso enquanto comíamos meia porção de filé mignon à parmegiana.',
                  'Até que chegou o momento que eu tinha combinado com os garçons. Terminamos de comer e eu pedi para trazerem a sobremesa. Foi então que o garçom chegou trazendo junto o buquê e as alianças.',
                  'Eu estava um pouco nervoso, mas te disse que já fazia um tempinho que eu queria fazer aquilo. Disse também que, desde o primeiro momento em que conversamos, eu percebi que ali havia algo diferente, e que orei muito a Deus por esse momento. Então eu te perguntei se você aceitava namorar comigo.',
                  'Esse momento ficou gravado muito forte na minha mente. Seus olhos brilhando como se quisesse chorar, sua bochecha tremendo de alegria… você estava tão feliz. E naquele instante você me tornou o homem mais feliz do mundo.',
                  'Depois disso, te levei pela primeira vez até a sua casa a sós. Cumprimentei sua mãe ali do lado de fora mesmo. E quando você me abraçou, eu senti que aquele abraço era bom demais… e percebi que era exatamente ali que eu sempre quero estar.',
                ],
              },
              {
                data: '07 de março de 2026',
                titulo: 'Noite com seus pais e o nosso primeiro beijo',
                paras: [
                  'Foi a noite em que conversei com seus pais. Eles fizeram uma torta de frango que estava simplesmente maravilhosa — com certeza uma das melhores que já comi na vida. Tivemos uma conversa muito boa, e naquele momento eles nos autorizaram a namorar de verdade, estabelecendo algumas regras. Foi um momento muito especial para mim.',
                  'E foi também nesse dia que demos o nosso primeiro beijo. Um momento simples, mas inesquecível.',
                  'Depois fomos ao aniversário do Wagner. Fomos recebidos ao som de "Aquilo que Parecia Impossível", e aquilo deixou a noite ainda mais marcante e engraçada. Em seguida, você me levou até a casa dos seus avós, onde ficamos conversando por mais um tempo.',
                  'Lá encontrei também seu tio João Vitor, que estudou comigo na época da escola — foi muito legal reencontrá-lo. Até jogamos um pouco de Mortal Kombat. E, pelo que percebi, sua família gostou bastante de mim.',
                  'Nesse dia também te entreguei seus presentes de Dia das Mulheres: um livro, dois girassóis, um porta-retrato com nossa foto favorita do pedido de namoro, algumas fotos reveladas e polaroides para você colocar na capinha do celular.',
                ],
              },
              {
                data: '08 de março de 2026',
                titulo: 'Dia que você conheceu meus pais',
                paras: [
                  'Fomos ao shopping às 12h, comemos batata recheada e passeamos bastante. Vimos alguns livros na livraria, a loja de itens coreanos, tomamos sorvete… foi um momento incrível contigo. Meus pais te amaram, te acharam muito linda, carismática, e ficaram muito felizes pelo nosso relacionamento.',
                  'Na volta para casa, com meu pai dirigindo, consegui demonstrar um ato de carinho com você: demonstrei cuidado e tentei te deixar confortável para tirar um cochilo. Fiquei arrumando seu cabelo, dando apoio com o braço para você descansar e fazendo carinho… Cada momento foi marcante, cada carinho, cada passeio de mãos dadas, cada beijinho, cada risada. Foi um dia incrível.',
                ],
              },
              {
                data: '09 de março de 2026',
                titulo: 'Um cuidado simples ❤️',
                paras: [
                  'No domingo à noite você começou a sentir uma dorzinha. Na segunda, comentou comigo que estava incomodando bastante, mas estava com vergonha de me dizer exatamente o que era.',
                  'Quando você falou isso, conhecendo a mulher que namoro, eu já imaginei e perguntei se poderia passar aí depois do serviço, só pra te ver um pouquinho. E passei rapidinho: levei uma caixinha de bombom, ficamos conversando, abracei você, dei alguns beijinhos e fiz carinho.',
                  'Foi um momento simples, mas muito especial. Você mesma disse que foi um momento muito feliz e que te ajudou a se sentir um pouco melhor. Às vezes são os gestos pequenos que mostram o quanto a gente se importa.',
                ],
              },
              {
                data: '11 de março de 2026',
                titulo: 'Nossa primeira Santa Ceia juntos',
                paras: [
                  'Esse dia foi muito especial para nós. Tivemos um alinhamento com todos os ministérios da igreja e, durante o encontro, aconteceu também a Santa Ceia. Sem ter sido algo planejado, acabou sendo a primeira Santa Ceia que participamos juntos.',
                  'Durante o dia eu estava preocupado pensando em como poderia te levar, porque estava chovendo o dia inteiro. Fiquei pensando em formas de respeitar o que seus pais pediram e ao mesmo tempo conseguir ir com você. Cheguei até a sugerir algumas alternativas, como irmos com você no banco de trás e em chamada de vídeo com sua mãe ou sua irmã caso a Duda não pudesse ir. Mas, no fim, seu pai nos deu um voto de confiança e deixou irmos normalmente, o que tornou tudo ainda mais especial.',
                  'Poder estar ali com você, participando de um momento tão importante na presença de Deus, marcou muito o meu coração.',
                  'E teve também um detalhe simples, mas que ficou guardado com muito carinho para mim. Teve até uma "briguinha" porque eu não deixei você abrir a porta do carro, eu queria abrir para você. Eu saí todo animado para abrir a porta e segurar sua mão quando você desceu. Foi um gesto pequeno, mas muito especial para mim, porque cuidar de você assim me deixa muito feliz.',
                  'Foi um dia cheio de significado, fé e pequenos gestos que mostraram o quanto estamos construindo algo bonito juntos. ❤️',
                ],
              },
            ].map((item, idx) => (
              <div key={idx} className="timeline-item ml-2">
                <div className="timeline-dot" />
                <div className="timeline-card ml-3">
                  <span className="timeline-date-pill mb-2 inline-flex">{item.data}</span>
                  <h3 className="font-display text-lg font-semibold text-rose-100 mb-2 leading-snug">
                    {item.titulo}
                  </h3>
                  <div className="space-y-2">
                    {item.paras.map((p, j) => (
                      <p key={j} className="text-rose-200/80 text-sm sm:text-base leading-[1.75]">{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divisor */}
        <div className="flex items-center gap-3 opacity-50">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          <span className="text-amber-300/70 text-xs tracking-widest">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
        </div>

        {/* ── PROMESSAS ─────────────────────────────────────── */}
        <motion.section className="card-surface p-5 sm:p-6" {...sectionProps}>
          <div className="text-center mb-5">
            <span className="text-3xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>🤍</span>
            <h2 className="text-section-title font-display font-semibold text-rose-50 mt-1">
              Minhas promessas para você
            </h2>
            <p className="text-rose-300/65 text-sm mt-1">Com Cristo no centro, te prometo:</p>
          </div>
          <div className="space-y-2.5">
            {[
              { icon: '🌱', text: 'Ser paciente com você sempre' },
              { icon: '🤍', text: 'Ser amoroso e gentil em cada momento' },
              { icon: '🛡️', text: 'Cuidar de você com atenção e carinho' },
              { icon: '✝️', text: 'Te aproximar de Cristo todos os dias' },
              { icon: '🙏', text: 'Conduzir tudo com temor a Deus' },
              { icon: '🧱', text: 'Provar com atitudes, não só palavras' },
              { icon: '🌊', text: 'Manter constância emocional ao seu lado' },
              { icon: '🏔️', text: 'Construir uma base firme com Cristo no centro' },
              { icon: '🔝', text: 'Sempre dar o melhor de mim por nós' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] border border-amber-400/12">
                <span className="text-xl shrink-0">{icon}</span>
                <span className="text-rose-100/90 text-sm font-medium leading-snug">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-rose-300/60 text-xs italic mt-4">
            Cada uma dessas promessas vem do coração. ❤️
          </p>
        </motion.section>

        {/* Divisor */}
        <div className="flex items-center gap-3 opacity-50">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          <span className="text-amber-300/70 text-xs tracking-widest">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
        </div>

        {/* ── O FUTURO ──────────────────────────────────────── */}
        <motion.section className="card-surface p-5 sm:p-6" {...sectionProps}>
          <h2 className="text-section-title font-display font-semibold text-rose-50 text-center mb-1">
            O futuro que sonho com você
          </h2>
          <p className="text-rose-300/65 text-sm text-center mb-5">Tudo que quero construir ao seu lado 🌿</p>

          <div className="space-y-2.5 mb-6">
            {[
              { icon: '💍', text: 'Casar com você' },
              { icon: '👨‍👩‍👧', text: 'Construir uma família firmada em Cristo' },
              { icon: '✝️', text: 'Servir a Deus juntos, sempre' },
              { icon: '🏠', text: 'Um lar seguro, alinhado e cheio de amor' },
              { icon: '🌍', text: 'Viver muitas histórias ainda' },
            ].map(({ icon, text }) => (
              <div key={text} className="future-item">
                <span className="text-2xl shrink-0">{icon}</span>
                <span className="text-rose-100/90 text-base font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Sonhos dela */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent mb-5" />
          <p className="text-center text-rose-200/80 text-sm font-medium mb-3">
            E os seus sonhos — que acredito com você 💪
          </p>
          <div className="space-y-2.5">
            {[
              { icon: '👩‍🏫', text: 'Dar palestras em público', note: 'Você tem muito a dizer. O mundo precisa te ouvir.' },
              { icon: '✝️', text: 'Dar palavras na igreja', note: 'Deus vai te preparar. Eu estarei na primeira fila.' },
            ].map(({ icon, text, note }) => (
              <div key={text} className="flex items-start gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] border border-amber-400/12">
                <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-rose-100/90 text-sm font-medium leading-snug">{text}</p>
                  <p className="text-amber-300/55 text-xs italic mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── SEÇÃO FINAL ───────────────────────────────────── */}
        <motion.section className="section-final text-center py-12 sm:py-16 px-4" {...sectionProps}>
          {/* Corações flutuantes */}
          <div className="text-4xl sm:text-5xl mb-6 flex justify-center gap-3">
            <span className="float-emoji" style={{ animationDelay: '0s' }}>💕</span>
            <span className="float-emoji" style={{ animationDelay: '0.45s' }}>❤️</span>
            <span className="float-emoji" style={{ animationDelay: '0.9s' }}>💗</span>
          </div>

          <p className="text-rose-200/80 text-base sm:text-lg mb-2">
            Essa é só a primeira página da nossa história.
          </p>
          <p className="font-display text-lg sm:text-xl text-rose-200/90 italic mb-5">
            E assim continua...
          </p>

          <p className="font-display font-semibold text-rose-50 leading-tight mb-6" style={{ fontSize: 'clamp(24px, 7vw, 40px)' }}>
            Te amo para sempre, Maysa ♥
          </p>

          <p className="text-amber-200/80 text-base flex items-center justify-center gap-2 flex-wrap mb-4">
            <span>🌹</span> Sempre contigo, amor{' '}
            <span className="float-emoji inline-block text-sm" style={{ animationDelay: '0.3s' }}>🦋</span>{' '}
            <span>🌹</span>
          </p>

          <p className="text-3xl mb-8" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>💝</p>

          {!mensagemRevelada ? (
            <button
              onClick={() => setMensagemRevelada(true)}
              className="text-rose-300/70 hover:text-rose-200 text-sm underline underline-offset-4 transition-colors"
            >
              Clique aqui se você chegou até o fim ❤️
            </button>
          ) : (
            <div className="card-surface p-5 max-w-xs mx-auto space-y-3 card-gold-border">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent mb-1" />
              <p className="text-rose-100 text-base italic font-body">
                Obrigado por viver essa história comigo.
              </p>
              <p className="text-rose-200 font-medium text-sm">
                Você é o amor que eu sempre sonhei.
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent mt-1" />
            </div>
          )}

          <p className="text-rose-400/50 text-xs mt-10 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Feito com muito</span> <span>☕</span> <span>e</span> <span>🍵</span>
            <span>e amor por Davi Antonaji</span>
            <span className="text-rose-300/50">(seu amor)</span>
          </p>
        </motion.section>

      </main>
    </div>
  )
}
