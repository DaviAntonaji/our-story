import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.35, ease: 'easeOut' }
}


// Data de início do namoro: 04/03/2026 às 19:30
const INICIO_NAMORO = new Date(2026, 2, 4, 19, 30, 0) // mês é 0-indexed

function useCountUp(end, duration = 1200, startOn = true) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    if (!startOn || end === 0) {
      setValue(end)
      return
    }
    let raf
    const start = performance.now()
    const animate = (now) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
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
  const [tempo, setTempo] = useState({
    meses: 0,
    dias: 0,
    horas: '00',
    minutos: '00',
    segundos: '00',
    totalDias: 0
  })

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date()
      const diff = agora - INICIO_NAMORO

      if (diff < 0) {
        setTempo({
          meses: 0,
          dias: 0,
          horas: '00',
          minutos: '00',
          segundos: '00',
          totalDias: 0
        })
        return
      }

      const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24))
      const meses = Math.floor(totalDias / 30)
      const dias = totalDias % 30

      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, '0')
      const minutos = Math.floor((diff / (1000 * 60)) % 60)
        .toString()
        .padStart(2, '0')
      const segundos = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, '0')

      setTempo({ meses, dias, horas, minutos, segundos, totalDias })
    }

    atualizar()
    const id = setInterval(atualizar, 1000)
    return () => clearInterval(id)
  }, [])

  return tempo
}

// Cole o link da música do Spotify aqui (ex: https://open.spotify.com/track/...)
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
  '/imgs/photos/16.jpg'
]

const MIN_SWIPE = 50
const INTERVALO_CARROSSEL = 7000

function HeartsRain() {
  const hearts = [
    { emoji: '❤️', left: '5%', delay: '-4.5s', duration: 5 },
    { emoji: '💕', left: '15%', delay: '-3.2s', duration: 5.5 },
    { emoji: '💗', left: '25%', delay: '-1.8s', duration: 4.5 },
    { emoji: '💖', left: '35%', delay: '-4s', duration: 6 },
    { emoji: '💝', left: '45%', delay: '-2.5s', duration: 5.2 },
    { emoji: '❤️', left: '55%', delay: '-0.5s', duration: 4.8 },
    { emoji: '💕', left: '65%', delay: '-4.8s', duration: 5.8 },
    { emoji: '💗', left: '75%', delay: '-3.5s', duration: 5.3 },
    { emoji: '💖', left: '85%', delay: '-1.2s', duration: 5.5 },
    { emoji: '💝', left: '95%', delay: '-2.8s', duration: 4.5 },
    { emoji: '🤍', left: '10%', delay: '-4.2s', duration: 5 },
    { emoji: '💓', left: '30%', delay: '-0.8s', duration: 5.4 },
    { emoji: '❤️', left: '50%', delay: '-3.8s', duration: 5.6 },
    { emoji: '💕', left: '70%', delay: '-1.5s', duration: 4.7 },
    { emoji: '💗', left: '90%', delay: '-2.2s', duration: 5.2 },
    { emoji: '💖', left: '8%', delay: '-3.6s', duration: 5.1 },
    { emoji: '💝', left: '42%', delay: '-0.3s', duration: 5.7 },
    { emoji: '💓', left: '62%', delay: '-4s', duration: 5.9 },
    { emoji: '🤍', left: '78%', delay: '-2.9s', duration: 4.9 },
  ]
  return (
    <div className="hearts-rain fixed inset-0 pointer-events-none z-[1]" aria-hidden style={{ overflow: 'hidden' }}>
      {hearts.map((h, i) => (
        <span
          key={i}
          style={{
            left: h.left,
            top: '-20px',
            fontSize: '1.5rem',
            animationDelay: h.delay,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [revelado, setRevelado] = useState(false)
  const [musicaRevelada, setMusicaRevelada] = useState(false)
  const [mensagemRevelada, setMensagemRevelada] = useState(false)
  const [fotoAtual, setFotoAtual] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const touchStartX = useRef(0)
  const tempo = useTempoJuntos()
  const totalDiasAnimado = useCountUp(tempo.totalDias, 1400, revelado)

  useEffect(() => {
    if (!revelado) return
    const id = setInterval(() => {
      setFotoAtual((i) => (i + 1) % FOTOS.length)
    }, INTERVALO_CARROSSEL)
    return () => clearInterval(id)
  }, [revelado, timerKey])

  const irParaFoto = (indice) => {
    setFotoAtual(indice)
    setTimerKey((k) => k + 1)
  }

  const onCarouselTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onCarouselTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX
    const diff = touchStartX.current - endX
    if (Math.abs(diff) >= MIN_SWIPE) {
      if (diff > 0) irParaFoto((fotoAtual + 1) % FOTOS.length)
      else irParaFoto((fotoAtual - 1 + FOTOS.length) % FOTOS.length)
    }
  }

  if (!revelado) {
    return (
      <>
        {typeof document !== 'undefined' && createPortal(<HeartsRain />, document.body)}
        <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center text-rose-100 p-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] relative overflow-hidden page-bg-landing">
        <motion.div className="text-5xl md:text-6xl mb-6 animate-pulseSoft" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>💕</motion.div>
        <motion.p className="text-xl md:text-2xl font-serif font-light tracking-wide text-rose-200/95 mb-8 text-center relative z-10" {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.15 }}>
          Uma surpresa especial te espera
        </motion.p>
        <motion.button
          onClick={() => setRevelado(true)}
          className="btn-primary min-h-[52px] px-12 py-4 rounded-2xl font-serif text-lg relative z-10 flex items-center gap-3"
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
        >
          <span>💕</span>
          Clique aqui, meu bem
          <span>💕</span>
        </motion.button>
        <motion.p className="text-sm text-rose-300/60 mt-6 relative z-10 flex items-center gap-1" {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.45 }}>
          <span>✨</span> Toque para revelar <span>✨</span>
        </motion.p>
      </div>
      </>
    )
  }

  return (
    <div className="min-h-screen min-h-[100dvh] text-rose-100 relative overflow-x-hidden page-bg">
      <main className="max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-12 pt-[env(safe-area-inset-top)] space-y-7 sm:space-y-16 relative z-10 pb-20 safe-bottom">
        {/* Dica de scroll - mobile */}
        <p className="text-rose-300/60 text-sm text-center animate-pulse pt-2 pb-1 sm:hidden">
          Role para ver nossa história ↓
        </p>

        {/* Hero */}
        <motion.section className="text-center space-y-6 sm:space-y-8" {...fadeInUp}>
          <p className="text-rose-200/80 text-sm sm:text-base italic font-body">
            A história mais bonita que Deus já escreveu na minha vida.
          </p>
          <div className="flex justify-center gap-3 text-3xl sm:text-4xl">
            <span className="animate-heartBeatSoft">❤️</span>
            <span className="animate-heartBeatSoft [animation-delay:0.4s]">❤️</span>
            <span className="animate-heartBeatSoft [animation-delay:0.8s]">❤️</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-[26px] sm:text-3xl md:text-4xl font-display font-semibold text-rose-50 leading-tight px-2">
              Para você, Maysa ❤️
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-rose-200/95">
              Amor da minha vida
            </h2>
          </div>
          <div className="max-w-sm mx-auto p-2 bg-rose-50/10 rounded-2xl border border-amber-400/50 shadow-lg shadow-rose-950/20">
            <div className="p-1 rounded-xl border border-amber-300/40 bg-rose-50/5">
              <div className="rounded-lg overflow-hidden aspect-[3/4] sm:aspect-square">
                <img
                  src="/imgs/photos/15.jpg"
                  alt="Nós dois"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <p className="text-rose-200/90 text-sm sm:text-base">Juntos desde 04 de março de 2026 🌹</p>
          <div className="space-y-4">
            <p className="text-rose-200/90 text-base sm:text-lg font-medium">Estamos juntos há</p>
            <div className="flex flex-nowrap justify-center items-end gap-1.5 sm:gap-2 md:gap-4 text-2xl font-mono card-glass rounded-2xl p-5 sm:p-5 md:p-6 max-w-md mx-auto overflow-x-auto ring-2 ring-amber-400/40">
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.meses}</span>
                <span className="text-xs sm:text-sm text-rose-300/70">Meses</span>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.dias}</span>
                <span className="text-xs sm:text-sm text-rose-300/70">Dias</span>
              </div>
              <div className="flex flex-nowrap items-end shrink-0 gap-1 sm:gap-2">
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.horas}</span>
                  <span className="text-xs sm:text-sm text-rose-300/70">Horas</span>
                </div>
                <span className="text-base sm:text-lg text-rose-300/60 pb-1 shrink-0">:</span>
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.minutos}</span>
                  <span className="text-xs sm:text-sm text-rose-300/70">Min</span>
                </div>
                <span className="text-base sm:text-lg text-rose-300/60 pb-1 shrink-0">:</span>
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.segundos}</span>
                  <span className="text-xs sm:text-sm text-rose-300/70">Seg</span>
                </div>
              </div>
            </div>
            <p className="text-base sm:text-lg text-rose-200/95 font-medium leading-relaxed">
              {totalDiasAnimado} dias vivendo o melhor capítulo da minha vida ❤️
            </p>
          </div>
          <p className="text-2xl sm:text-3xl flex justify-center gap-1">
            <span className="animate-softFloat text-amber-300/90">✨</span>
            <span className="animate-softFloat [animation-delay:0.8s] text-amber-200/90">🌹</span>
            <span className="animate-softFloat [animation-delay:1.6s] text-amber-300/90">✨</span>
          </p>
        </motion.section>

        {/* Nossa Música */}
        <motion.section className="rounded-2xl overflow-hidden card-glass card-hover card-breath" {...fadeInUp}>
          {!musicaRevelada ? (
            <button
              onClick={() => setMusicaRevelada(true)}
              className="w-full p-8 sm:p-10 md:p-12 text-center hover:bg-rose-800/15 transition-colors flex flex-col items-center gap-4"
            >
              <span className="text-5xl block">🎵</span>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50">Nossa Música</h2>
              <p className="text-rose-200/80 text-sm sm:text-base">A trilha sonora do nosso amor 💕</p>
              <span className="inline-flex items-center gap-3 bg-white/15 hover:bg-white/25 px-6 py-4 rounded-xl font-medium text-rose-50 text-lg transition-colors border border-amber-400/50">
                <span className="text-2xl">▶</span>
                Ouvir nossa música
              </span>
            </button>
          ) : (
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50 mb-2 text-center">
                Nossa Música 🎵
              </h2>
              <p className="text-rose-200/80 mb-4 text-center text-sm sm:text-base">A trilha sonora do nosso amor 💗</p>
              <div className="rounded-xl overflow-visible max-w-md mx-auto w-full pb-2 sm:pb-0">
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-xl"
                    style={{ borderRadius: 12, minHeight: 280 }}
                    src={SPOTIFY_URL}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Nossa música"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* Frase de amor */}
        <motion.section className="rounded-2xl p-5 sm:p-6 md:p-8 card-glass card-hover card-breath" {...fadeInUp}>
          <p className="text-2xl text-center mb-4 animate-softPulse">💌</p>
          <div className="text-rose-50/95 text-[15px] sm:text-base leading-[1.7] italic font-body space-y-4">
            <p>Maysa,</p>
            <p>desde o primeiro dia eu senti que algo em você era diferente.</p>
            <p>Cada momento com você é especial, e cada sorriso seu me faz bem.</p>
            <p>Te amo mais do que consigo dizer.</p>
          </div>
          <p className="text-2xl text-center mt-4 animate-softPulse [animation-delay:1s]">💕</p>
        </motion.section>

        {/* Coisas que amo em você */}
        <motion.section className="rounded-2xl p-6 sm:p-8 card-glass card-hover card-breath" {...fadeInUp}>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50 text-center mb-6">
            ❤️ Coisas que amo em você
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">✝️ Seu amor por Deus</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">💕 O jeito que você cuida de mim</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">🕊️ A paz que sinto ao seu lado</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">💪 Como você sempre me incentiva</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">❤️ Seu jeito único de demonstrar amor</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">✨ Como você torna tudo mais leve</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">👀 Seu olhar quando me vê</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">💗 Seu coração bondoso</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">😊 Seu sorriso e sua risada</span>
            <span className="px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/50 text-rose-50 text-base">🌹 Seu jeito único de ser</span>
          </div>
        </motion.section>

        {/* Versículo */}
        <motion.section className="rounded-2xl p-5 sm:p-6 md:p-8 card-glass card-hover allow-select card-breath" {...fadeInUp}>
          <p className="text-2xl text-center mb-4 animate-softPulse [animation-delay:0.5s]">✝️</p>
          <h2 className="text-lg sm:text-xl font-display font-semibold text-rose-50 text-center mb-4">
            1 Coríntios 13:4-7
          </h2>
          <blockquote className="text-rose-200/90 leading-[1.7] text-[15px] sm:text-base space-y-3">
            <p><strong>4</strong> O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.</p>
            <p><strong>5</strong> Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.</p>
            <p><strong>6</strong> O amor não se alegra com a injustiça, mas se alegra com a verdade.</p>
            <p><strong>7</strong> Tudo sofre, tudo crê, tudo espera, tudo suporta.</p>
          </blockquote>
          <p className="text-rose-300/70 text-center mt-2 text-sm italic">— 1 Coríntios 13</p>
          <p className="text-rose-400/80 text-center mt-3 text-sm">Esse versículo sempre me lembra você.</p>
        </motion.section>

        {/* Momentos - Carrossel de fotos */}
        <motion.section {...fadeInUp}>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50 text-center mb-2">
            Momentos 📸
          </h2>
          <p className="text-rose-200/80 text-center mb-4 sm:mb-6 text-sm sm:text-base">
            Memórias que guardamos no coração, Maysa 💖
          </p>
          <div className="-mx-5 sm:mx-0">
            <div
              className="relative rounded-[14px] sm:rounded-2xl overflow-hidden card-glass h-[360px] sm:h-[420px] flex items-center justify-center w-full"
            onTouchStart={onCarouselTouchStart}
            onTouchEnd={onCarouselTouchEnd}
          >
            {/* Setas esquerda e direita */}
            <button
              type="button"
              onClick={() => irParaFoto((fotoAtual - 1 + FOTOS.length) % FOTOS.length)}
              className="absolute left-1 sm:left-2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:bg-white/20 border border-amber-400/50 transition-colors"
              aria-label="Foto anterior"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-rose-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => irParaFoto((fotoAtual + 1) % FOTOS.length)}
              className="absolute right-1 sm:right-2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:bg-white/20 border border-amber-400/50 transition-colors"
              aria-label="Próxima foto"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-rose-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </div>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 sm:gap-2">
              {FOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => irParaFoto(i)}
                  className={`rounded-full transition-all p-2.5 sm:p-1 ${
                    i === fotoAtual ? 'bg-amber-400 w-3 h-3 sm:w-2.5 sm:h-2.5' : 'bg-white/40 w-2.5 h-2.5 sm:w-2 sm:h-2 hover:bg-amber-400/60 active:bg-amber-400/60'
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                />
              ))}
            </div>
          </div>
          </div>
        </motion.section>

        {/* Nossa História */}
        <motion.section className="allow-select" {...fadeInUp}>
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <span className="text-2xl sm:text-3xl">🌹</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-rose-50">
                Nossa História
              </h2>
              <span className="text-2xl sm:text-3xl">📖</span>
            </div>
            <p className="text-rose-200/80 text-sm sm:text-base">
              Os momentos que marcaram nossa trajetória
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-amber-300/80">
              <span className="text-lg">✦</span>
              <span className="text-lg">✧</span>
              <span className="text-lg">✦</span>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <div className="relative pl-5 sm:pl-6 border-l-2 border-amber-400/60 card-glass rounded-r-2xl p-5 sm:p-5 ml-1 card-breath">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">13, 14 e 15 de fevereiro de 2026</h3>
              <p className="text-rose-300/90 mt-1 font-medium">
                Onde tudo começou
              </p>
              <p className="text-rose-200/80 mt-1 text-sm sm:text-base">
                Foi no acampamento da Comunidade Apascentar que começamos a nos aproximar de verdade, conversando mais e conhecendo melhor o estilo um do outro.
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-amber-400/60 card-glass rounded-r-2xl p-5 sm:p-5 ml-1 card-breath">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">20 de fevereiro de 2026</h3>
              <p className="text-rose-300/90 mt-1 font-medium">
                Quando você se apaixonou por mim
              </p>
              <p className="text-rose-200/80 mt-2">
                Eu não sabia o quão mal eu estava naquele dia... Você estava mal ao ponto de
                qualquer coisa te fazer chorar...
              </p>
              <p className="text-rose-200/80 mt-2">
                Você só disse: "estou meio desanimada hoje..." Não revelou o real peso que estava
                sentindo...
              </p>
              <p className="text-rose-200/80 mt-2">
                E quando comecei a conversar com você sobre Deus, e passagens sobre não desanimar,
                sobre cansar... Você chorou na hora - e foi só depois, já namorando, que você me
                contou que foi ali que percebeu que estava apaixonada por mim...
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-amber-400/60 card-glass rounded-r-2xl p-5 sm:p-5 ml-1 card-breath">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">04 de março de 2026</h3>
              <p className="text-rose-300/90 mt-1 font-medium">
                Início do nosso namoro
              </p>
              <p className="text-rose-200/80 mt-2">
                Começou quando combinamos de sair no João Julhão às 18h, e conseguimos estender até
                as 20h. Com isso, eu já comecei a correr com as coisas durante o dia para deixar
                tudo preparado.
              </p>
              <p className="text-rose-200/80 mt-2">
                Cheguei no JJ exatamente às 18:00 e já combinei com o garçom todo o roteiro do que
                iria acontecer. Quando você chegou com a Talita, estava linda… e ali meu coração já
                acelerou.
              </p>
              <p className="text-rose-200/80 mt-2">
                Fomos até a mesa que eu já tinha deixado separada, inclusive planejando deixar você
                sentada de costas para a cozinha, para que não visse nada do que estava sendo
                preparado.
              </p>
              <p className="text-rose-200/80 mt-2">
                Eu não tinha planejado muito bem como seria o papo… mas acabou sendo algo muito
                natural e descontraído, principalmente com as perguntas que você começou a fazer.
                Primeiro você perguntou sobre a minha família. Depois sobre o que era estabilidade
                para mim. Também falamos sobre educação financeira… tudo isso enquanto comíamos
                meia porção de filé mignon à parmegiana.
              </p>
              <p className="text-rose-200/80 mt-2">
                Até que chegou o momento que eu tinha combinado com os garçons. Terminamos de comer
                e eu pedi para trazerem a sobremesa. Foi então que o garçom chegou trazendo junto o
                buquê e as alianças.
              </p>
              <p className="text-rose-200/80 mt-2">
                Eu estava um pouco nervoso, mas te disse que já fazia um tempinho que eu queria fazer
                aquilo. Disse também que, desde o primeiro momento em que conversamos, eu percebi
                que ali havia algo diferente, e que orei muito a Deus por esse momento. Então eu te
                perguntei se você aceitava namorar comigo.
              </p>
              <p className="text-rose-200/80 mt-2">
                Esse momento ficou gravado muito forte na minha mente. Seus olhos brilhando como se
                quisesse chorar, sua bochecha tremendo de alegria… você estava tão feliz. E naquele
                instante você me tornou o homem mais feliz do mundo.
              </p>
              <p className="text-rose-200/80 mt-2">
                Depois disso, te levei pela primeira vez até a sua casa a sós. Cumprimentei sua mãe
                ali do lado de fora mesmo. E quando você me abraçou, eu senti que aquele abraço era
                bom demais… e percebi que era exatamente ali que eu sempre quero estar.
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-amber-400/60 card-glass rounded-r-2xl p-5 sm:p-5 ml-1 card-breath">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">07 de março de 2026</h3>

              <p className="text-rose-300/90 mt-1 font-medium">
                Noite com seus pais e o nosso primeiro beijo
              </p>

              <p className="text-rose-200/80 mt-2">
                Foi a noite em que conversei com seus pais. Eles fizeram uma torta de frango que estava
                simplesmente maravilhosa - com certeza uma das melhores que já comi na vida. Tivemos uma
                conversa muito boa, e naquele momento eles nos autorizaram a namorar de verdade, estabelecendo
                algumas regras. Foi um momento muito especial para mim.
              </p>

              <p className="text-rose-200/80 mt-2">
                E foi também nesse dia que demos o nosso primeiro beijo. Um momento simples, mas
                inesquecível.
              </p>

              <p className="text-rose-200/80 mt-2">
                Depois fomos ao aniversário do Wagner. Fomos recebidos ao som de "Aquilo que Parecia
                Impossível", e aquilo deixou a noite ainda mais marcante e engraçada. Em seguida, você me levou até a casa
                dos seus avós, onde ficamos conversando por mais um tempo.
              </p>

              <p className="text-rose-200/80 mt-2">
                Lá encontrei também seu tio João Vitor, que estudou comigo na época da escola - foi muito
                legal reencontrá-lo. Até jogamos um pouco de Mortal Kombat. E, pelo que percebi, sua família
                gostou bastante de mim.
              </p>

              <p className="text-rose-200/80 mt-2">
                Nesse dia também te entreguei seus presentes de Dia das Mulheres: um livro, dois
                girassóis, um porta-retrato com nossa foto favorita do pedido de namoro, algumas fotos
                reveladas e polaroides para você colocar na capinha do celular.
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-amber-400/60 card-glass rounded-r-2xl p-5 sm:p-5 ml-1 card-breath">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">08 de março de 2026</h3>

              <p className="text-rose-300/90 mt-1 font-medium">
                Dia que você conheceu meus pais
              </p>

              <p className="text-rose-200/80 mt-2">
                Fomos ao shopping às 12h, comemos batata recheada e passeamos bastante. Vimos alguns
                livros na livraria, a loja de itens coreanos, tomamos sorvete… foi um momento incrível
                contigo. Meus pais te amaram, te acharam muito linda, carismática, e ficaram muito felizes
                pelo nosso relacionamento.
              </p>

              <p className="text-rose-200/80 mt-2">
                Na volta para casa, com meu pai dirigindo, consegui demonstrar um ato de carinho com você:
                demonstrei cuidado e tentei te deixar confortável para tirar um cochilo. Fiquei arrumando
                seu cabelo, dando apoio com o braço para você descansar e fazendo carinho… Cada momento
                foi marcante, cada carinho, cada passeio de mãos dadas, cada beijinho, cada risada. Foi um dia incrível.
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-amber-400/60 card-glass rounded-r-2xl p-5 sm:p-5 ml-1 card-breath">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">09 de março de 2026</h3>

              <p className="text-rose-300/90 mt-1 font-medium">
                Um cuidado simples ❤️
              </p>

              <p className="text-rose-200/80 mt-2">
                No domingo à noite você começou a sentir uma dorzinha. Na segunda, comentou comigo que
                estava incomodando bastante, mas estava com vergonha de me dizer exatamente o que era.
              </p>

              <p className="text-rose-200/80 mt-2">
                Quando você falou isso, conhecendo a mulher que namoro, eu já imaginei e perguntei se poderia passar aí depois do serviço,
                só pra te ver um pouquinho. E passei rapidinho: levei uma caixinha de bombom, ficamos
                conversando, abracei você, dei alguns beijinhos e fiz carinho.
              </p>

              <p className="text-rose-200/80 mt-2">
                Foi um momento simples, mas muito especial. Você mesma disse que foi um momento muito
                feliz e que te ajudou a se sentir um pouco melhor. Às vezes são os gestos pequenos que
                mostram o quanto a gente se importa.
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-amber-400/60 card-glass rounded-r-2xl p-5 sm:p-5 ml-1 card-breath">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">11 de março de 2026</h3>
              <p className="text-rose-300/90 mt-1 font-medium">
                Nossa primeira Santa Ceia juntos
              </p>
              <p className="text-rose-200/80 mt-2">
                Esse dia foi muito especial para nós. Tivemos um alinhamento com todos os ministérios da igreja e, durante o encontro, aconteceu também a Santa Ceia. Sem ter sido algo planejado, acabou sendo a primeira Santa Ceia que participamos juntos.
              </p>
              <p className="text-rose-200/80 mt-2">
                Durante o dia eu estava preocupado pensando em como poderia te levar, porque estava chovendo o dia inteiro. Fiquei pensando em formas de respeitar o que seus pais pediram e ao mesmo tempo conseguir ir com você. Cheguei até a sugerir algumas alternativas, como irmos com você no banco de trás e em chamada de vídeo com sua mãe ou sua irmã caso a Duda não pudesse ir. Mas, no fim, seu pai nos deu um voto de confiança e deixou irmos normalmente, o que tornou tudo ainda mais especial.
              </p>
              <p className="text-rose-200/80 mt-2">
                Poder estar ali com você, participando de um momento tão importante na presença de Deus, marcou muito o meu coração.
              </p>
              <p className="text-rose-200/80 mt-2">
                E teve também um detalhe simples, mas que ficou guardado com muito carinho para mim. Teve até uma "briguinha" porque eu não deixei você abrir a porta do carro, eu queria abrir para você. Eu saí todo animado para abrir a porta e segurar sua mão quando você desceu. Foi um gesto pequeno, mas muito especial para mim, porque cuidar de você assim me deixa muito feliz.
              </p>
              <p className="text-rose-200/80 mt-2">
                Foi um dia cheio de significado, fé e pequenos gestos que mostraram o quanto estamos construindo algo bonito juntos. ❤️
              </p>
            </div>
          </div>
        </motion.section>

        {/* O futuro que sonho com você */}
        <motion.section className="rounded-2xl p-5 sm:p-6 md:p-8 card-glass card-hover card-breath" {...fadeInUp}>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50 text-center mb-6">
            O futuro que sonho com você
          </h2>
          <ul className="space-y-4 text-rose-200/95 text-[15px] sm:text-base leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="text-xl text-amber-300">✨</span>
              <span>Casar com você</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl text-amber-300">✨</span>
              <span>Construir uma família</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl text-amber-300">✨</span>
              <span>Servir a Deus juntos</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl text-amber-300">✨</span>
              <span>Viver muitas histórias ainda</span>
            </li>
          </ul>
        </motion.section>

        {/* Final */}
        <motion.section className="text-center py-12 sm:py-16" {...fadeInUp}>
          <div className="text-4xl sm:text-5xl mb-4 flex justify-center gap-2">
            <span className="animate-softFloat">💕</span>
            <span className="animate-softFloat [animation-delay:0.6s]">❤️</span>
            <span className="animate-softFloat [animation-delay:1.2s]">💗</span>
          </div>
          <p className="text-base sm:text-lg text-rose-200/90 mb-4">
            Essa é só a primeira página da nossa história.
          </p>
          <p className="text-lg sm:text-xl font-display text-rose-200/95 italic">
            E assim continua...
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-rose-50 mt-4 animate-pulseSoft">
            Te amo para sempre, Maysa ♥
          </p>
          <p className="text-amber-200/90 mt-6 text-base sm:text-lg flex items-center justify-center gap-2 flex-wrap">
            <span>🌹</span> Sempre contigo, amor <span>🌹</span>
          </p>
          <p className="text-3xl mt-6 animate-softPulse">💝</p>
          {!mensagemRevelada ? (
            <button
              onClick={() => setMensagemRevelada(true)}
              className="mt-8 text-rose-300/80 hover:text-rose-200 text-sm sm:text-base underline underline-offset-2 transition-colors"
            >
              Clique aqui se você chegou até o fim ❤️
            </button>
          ) : (
            <div className="mt-8 p-6 rounded-2xl card-glass max-w-md mx-auto space-y-3 border-amber-400/30">
              <p className="text-rose-100 text-base sm:text-lg italic">
                Obrigado por viver essa história comigo.
              </p>
              <p className="text-rose-200 font-medium">
                Você é o amor que eu sempre sonhei.
              </p>
            </div>
          )}
          <p className="text-rose-400/60 text-sm mt-8 sm:mt-10 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Feito com muito</span>
            <span>☕</span>
            <span> e </span>
            <span>🍵</span>
            <span> e amor por Davi Antonaji</span>
            <span className="text-rose-300/70">(seu amor)</span>
          </p>
        </motion.section>
      </main>
    </div>
  )
}
