import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─── Constantes ────────────────────────────────────────────
const INICIO_NAMORO = new Date(2026, 2, 4, 19, 30, 0)
const SPOTIFY_URL = 'https://open.spotify.com/embed/track/7FOPTUmEJ3ByYW9ag9cZJ3'

const FOTOS = [
  '/imgs/photos/1.jpg', '/imgs/photos/2.jpg', '/imgs/photos/3.jpg',
  '/imgs/photos/4.jpg', '/imgs/photos/5.jpg', '/imgs/photos/6.jpg',
  '/imgs/photos/7.jpg', '/imgs/photos/8.jpg', '/imgs/photos/9.jpg',
  '/imgs/photos/10.jpeg', '/imgs/photos/11.jpeg', '/imgs/photos/12.jpeg',
  '/imgs/photos/13.jpeg', '/imgs/photos/14.jpg', '/imgs/photos/15.jpg',
  '/imgs/photos/16.jpg',
]

const SLIDE_IDS = [
  'intro', 'timer', 'musica', 'carta', 'tags',
  'versiculo', 'momentos',
  'historia',
  'promessas', 'futuro', 'final',
]

const TIMELINE = [
  {
    data: '13–15 de fevereiro de 2026',
    titulo: 'Onde tudo começou',
    icon: '⛺',
    paras: [
      'Foi no acampamento da Comunidade Apascentar que começamos a nos aproximar de verdade, conversando mais e conhecendo melhor o estilo um do outro.',
    ],
  },
  {
    data: '20 de fevereiro de 2026',
    titulo: 'Quando você se apaixonou por mim',
    icon: '💕',
    paras: [
      'Eu não sabia o quão mal você estava naquele dia... Você estava mal ao ponto de qualquer coisa te fazer chorar...',
      'Você só disse: "estou meio desanimada hoje..." Não revelou o real peso que estava sentindo...',
      'E quando comecei a conversar com você sobre Deus, e passagens sobre não desanimar, sobre cansar... Você chorou na hora — e foi só depois, já namorando, que você me contou que foi ali que percebeu que estava apaixonada por mim.',
    ],
  },
  {
    data: '04 de março de 2026',
    titulo: 'Início do nosso namoro',
    icon: '💍',
    paras: [
      'Começou quando combinamos de sair no João Julhão às 18h. Cheguei exatamente às 18:00 e já combinei com o garçom todo o roteiro do que iria acontecer. Quando você chegou com a Talita, estava linda… e ali meu coração já acelerou.',
      'Fomos até a mesa que eu já tinha deixado separada, planejando deixar você sentada de costas para a cozinha, para que não visse nada do que estava sendo preparado.',
      'Foi uma conversa natural e descontraída, principalmente com as perguntas que você começou a fazer — sobre família, estabilidade, educação financeira… tudo isso enquanto comíamos filé mignon à parmegiana.',
      'Até que chegou o momento que eu tinha combinado com os garçons. Terminamos de comer, pedi a sobremesa, e o garçom chegou trazendo junto o buquê e as alianças.',
      'Seus olhos brilhando como se quisesse chorar, sua bochecha tremendo de alegria… você estava tão feliz. E naquele instante você me tornou o homem mais feliz do mundo.',
      'Depois disso, te levei pela primeira vez até a sua casa a sós. Quando você me abraçou, eu senti que aquele abraço era bom demais… e percebi que era exatamente ali que eu sempre quero estar.',
    ],
  },
  {
    data: '07 de março de 2026',
    titulo: 'Nosso primeiro beijo',
    icon: '🌹',
    paras: [
      'Foi a noite em que conversei com seus pais. Eles fizeram uma torta de frango que estava simplesmente maravilhosa — com certeza uma das melhores que já comi na vida.',
      'Tivemos uma conversa muito boa, e naquele momento eles nos autorizaram a namorar de verdade. Foi um momento muito especial para mim. E foi também nesse dia que demos o nosso primeiro beijo.',
      'Depois fomos ao aniversário do Wagner. Fomos recebidos ao som de "Aquilo que Parecia Impossível" — aquilo deixou a noite ainda mais marcante.',
      'Nesse dia também te entreguei seus presentes de Dia das Mulheres: um livro, dois girassóis, um porta-retrato com nossa foto favorita do pedido, fotos reveladas e polaroides para a capinha do celular.',
    ],
  },
  {
    data: '08 de março de 2026',
    titulo: 'Você conheceu meus pais',
    icon: '👨‍👩‍👧',
    paras: [
      'Fomos ao shopping às 12h, comemos batata recheada, vimos livros na livraria, a loja de itens coreanos, tomamos sorvete… foi um momento incrível contigo.',
      'Meus pais te amaram, te acharam muito linda, carismática, e ficaram muito felizes pelo nosso relacionamento.',
      'Na volta, com meu pai dirigindo, fiquei arrumando seu cabelo, dando apoio com o braço para você descansar e fazendo carinho… Cada momento foi marcante.',
    ],
  },
  {
    data: '09 de março de 2026',
    titulo: 'Um cuidado simples ❤️',
    icon: '🍫',
    paras: [
      'No domingo à noite você começou a sentir uma dorzinha. Na segunda, comentou que estava incomodando bastante, mas estava com vergonha de me dizer o que era.',
      'Quando você falou isso, eu já imaginei e perguntei se poderia passar aí depois do serviço, só pra te ver um pouquinho.',
      'Passei rapidinho: levei uma caixinha de bombom, ficamos conversando, abracei você, dei alguns beijinhos e fiz carinho. Você disse que foi um momento muito feliz e que te ajudou a se sentir melhor.',
    ],
  },
  {
    data: '11 de março de 2026',
    titulo: 'Nossa primeira Santa Ceia juntos',
    icon: '✝️',
    paras: [
      'Tivemos um alinhamento com todos os ministérios da igreja e, durante o encontro, aconteceu também a Santa Ceia. Sem ter sido algo planejado, acabou sendo a primeira Santa Ceia que participamos juntos.',
      'Durante o dia eu estava preocupado pensando em como te levar, pois estava chovendo o dia inteiro. No fim, seu pai nos deu um voto de confiança e deixou irmos normalmente — o que tornou tudo ainda mais especial.',
      'Poder estar ali com você, participando de um momento tão importante na presença de Deus, marcou muito o meu coração.',
      'E teve também uma "briguinha" porque eu não deixei você abrir a porta do carro — eu queria abrir para você. Saí todo animado para abrir a porta e segurar sua mão quando você desceu. Foi um gesto pequeno, mas cuidar de você assim me deixa muito feliz. ❤️',
    ],
  },
]

// ─── Framer Motion variants ────────────────────────────────
const staggerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const upV = {
  hidden: { opacity: 0, y: 38 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.25, 0.1, 0.25, 1] } },
}
const scaleV = {
  hidden: { opacity: 0, scale: 0.80 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.52, ease: [0.34, 1.56, 0.64, 1] } },
}
const fadeV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
}

// Shorthand motion item
function MI({ children, v = upV, className = '' }) {
  return <motion.div variants={v} className={className}>{children}</motion.div>
}

// ─── Hooks ─────────────────────────────────────────────────
function useCountUp(end, duration = 1400, startOn = true) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)
  useEffect(() => {
    if (!startOn || end === 0) { setValue(end); return }
    let raf
    const animate = (now) => {
      if (!startRef.current) startRef.current = now
      const progress = Math.min((now - startRef.current) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.floor(eased * end))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, startOn])
  return value
}

function useTempoJuntos() {
  const [t, setT] = useState({ meses: 0, dias: 0, horas: '00', minutos: '00', segundos: '00', totalDias: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = new Date() - INICIO_NAMORO
      if (diff < 0) return
      const totalDias = Math.floor(diff / 86400000)
      setT({
        meses: Math.floor(totalDias / 30),
        dias: totalDias % 30,
        horas: Math.floor((diff / 3600000) % 24).toString().padStart(2, '0'),
        minutos: Math.floor((diff / 60000) % 60).toString().padStart(2, '0'),
        segundos: Math.floor((diff / 1000) % 60).toString().padStart(2, '0'),
        totalDias,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function useIsMobile() {
  const [v, setV] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setV(mq.matches)
    const h = () => setV(mq.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return v
}

// ─── Background components ─────────────────────────────────
function HeartsRain() {
  const items = [
    { e: '❤️', l: '5%', d: '-4.5s', dur: 5 }, { e: '🦋', l: '12%', d: '-2s', dur: 7 },
    { e: '💕', l: '22%', d: '-3.2s', dur: 5.5 }, { e: '💗', l: '32%', d: '-1.8s', dur: 4.5 },
    { e: '🦋', l: '42%', d: '-5s', dur: 8 }, { e: '💖', l: '52%', d: '-2.5s', dur: 5.2 },
    { e: '❤️', l: '62%', d: '-0.5s', dur: 4.8 }, { e: '🦋', l: '72%', d: '-3.5s', dur: 9 },
    { e: '💕', l: '82%', d: '-4.8s', dur: 5.8 }, { e: '💝', l: '92%', d: '-2.8s', dur: 4.5 },
  ]
  return (
    <div className="hearts-rain fixed inset-0 pointer-events-none z-[1]" aria-hidden style={{ overflow: 'hidden' }}>
      {items.map((h, i) => (
        <span key={i} style={{ left: h.l, top: '-20px', fontSize: '1.4rem', animationDelay: h.d, animationDuration: `${h.dur}s` }}>{h.e}</span>
      ))}
    </div>
  )
}

function ButterfliesFloating({ isMobile }) {
  const all = [
    { l: '5%', d: '-18s', dur: 22 }, { l: '20%', d: '-8s', dur: 18 },
    { l: '38%', d: '-25s', dur: 24 }, { l: '55%', d: '-3s', dur: 20 },
    { l: '72%', d: '-14s', dur: 19 }, { l: '88%', d: '-22s', dur: 23 },
  ]
  const visible = isMobile ? all.slice(0, 3) : all
  return (
    <div className="butterflies-float fixed inset-0 pointer-events-none z-[1]" aria-hidden style={{ overflow: 'hidden' }}>
      {visible.map((b, i) => (
        <span key={i} style={{ left: b.l, top: '-20px', fontSize: i % 2 === 0 ? '1rem' : '1.2rem', animationDelay: b.d, animationDuration: `${b.dur}s` }}>🦋</span>
      ))}
    </div>
  )
}

// ─── Nav Dots ──────────────────────────────────────────────
function NavDots({ active }) {
  const navigate = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <nav className="slide-nav" aria-label="Navegação">
      {SLIDE_IDS.map((id, i) => (
        <button
          key={id}
          onClick={() => navigate(id)}
          className={`slide-nav-dot ${active === i ? 'active' : ''}`}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </nav>
  )
}

// ─── Slide wrapper ─────────────────────────────────────────
function Slide({ id, bg, children, center = true, amount = 0.5 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount })
  return (
    <section id={id} ref={ref} className={`snap-slide ${bg}`}>
      <div className="slide-inner">
        <div
          className={`flex flex-col ${center ? 'items-center justify-center min-h-full' : 'items-start justify-start'} w-full px-5 sm:px-8 py-10 sm:py-12`}
          style={{ paddingTop: center ? undefined : 'max(2.5rem, env(safe-area-inset-top, 2.5rem))' }}
        >
          {children(inView)}
        </div>
      </div>
    </section>
  )
}

// ─── Divisor fino ──────────────────────────────────────────
function Divider({ char = '✦' }) {
  return (
    <div className="flex items-center gap-3 w-full opacity-40 my-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      <span className="text-amber-300/80 text-xs tracking-widest">{char}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
    </div>
  )
}

// ─── App ────────────────────────────────────────────────────
export default function App() {
  const [revelado, setRevelado] = useState(false)
  const [musicaRevelada, setMusicaRevelada] = useState(false)
  const [mensagemRevelada, setMensagemRevelada] = useState(false)
  const [fotoAtual, setFotoAtual] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStartX = useRef(0)
  const timerKeyRef = useRef(0)
  const tempo = useTempoJuntos()
  const totalDiasAnimado = useCountUp(tempo.totalDias, 1600, revelado)
  const isMobile = useIsMobile()

  // Carousel auto-advance
  useEffect(() => {
    if (!revelado) return
    const id = setInterval(() => setFotoAtual(i => (i + 1) % FOTOS.length), 7000)
    return () => clearInterval(id)
  }, [revelado, timerKeyRef.current])

  // Active slide tracking
  useEffect(() => {
    if (!revelado) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio >= 0.4) {
            const idx = SLIDE_IDS.indexOf(e.target.id)
            if (idx !== -1) setActiveSlide(idx)
          }
        })
      },
      { threshold: 0.4 },
    )
    SLIDE_IDS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [revelado])

  const irParaFoto = (i) => { setFotoAtual(i); timerKeyRef.current++ }
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) >= 50) irParaFoto(diff > 0 ? (fotoAtual + 1) % FOTOS.length : (fotoAtual - 1 + FOTOS.length) % FOTOS.length)
  }

  // ── LANDING ────────────────────────────────────────────────
  if (!revelado) {
    return (
      <>
        {typeof document !== 'undefined' && createPortal(<HeartsRain />, document.body)}
        <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center page-bg-landing text-rose-100 px-6 relative overflow-hidden">
          <div className="w-full max-w-xs flex flex-col items-center gap-6 relative z-10">
            <motion.div
              className="text-6xl"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >💕</motion.div>
            <motion.div
              className="text-center space-y-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="font-display text-2xl font-light tracking-wide text-rose-100/95">Uma surpresa especial</p>
              <p className="font-display text-2xl font-light tracking-wide text-rose-100/95">
                te espera <span className="float-emoji inline-block text-xl" style={{ animationDelay: '0.5s' }}>🦋</span>
              </p>
            </motion.div>
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
            <motion.button
              onClick={() => setRevelado(true)}
              className="btn-primary w-full rounded-2xl font-sans text-base font-medium flex items-center justify-center gap-2 px-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <span>💕</span> Clique aqui, meu bem <span>💕</span>
            </motion.button>
            <motion.p
              className="text-sm text-rose-300/50 flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
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
    <>
      {typeof document !== 'undefined' && createPortal(<ButterfliesFloating isMobile={isMobile} />, document.body)}
      {typeof document !== 'undefined' && createPortal(<NavDots active={activeSlide} />, document.body)}

      <div className="snap-container">

        {/* ── 01 INTRO ─────────────────────────────────────── */}
        <Slide id="intro" bg="slide-bg-rose">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
            >
              <MI v={fadeV} className="chapter-label">Nossa história</MI>
              <MI v={scaleV} className="flex gap-3 text-4xl">
                <span style={{ animation: 'heartBeatSoft 2.5s ease-in-out infinite' }}>❤️</span>
                <span style={{ animation: 'heartBeatSoft 2.5s ease-in-out infinite 0.4s' }}>❤️</span>
                <span style={{ animation: 'heartBeatSoft 2.5s ease-in-out infinite 0.8s' }}>❤️</span>
              </MI>
              <MI className="photo-frame w-full max-w-[200px] sm:max-w-[240px] mx-auto">
                <div className="aspect-[3/4] overflow-hidden rounded-[18px]">
                  <img src="/imgs/photos/15.jpg" alt="Nós dois" className="w-full h-full object-cover" />
                </div>
              </MI>
              <MI className="space-y-1">
                <h1 className="text-hero font-display font-semibold text-rose-50">Para você, Maysa ❤️</h1>
                <p className="font-display text-xl text-rose-200/85">Amor da minha vida</p>
              </MI>
              <MI>
                <span className="badge-pill">🌹 Juntos desde 04 de março de 2026</span>
              </MI>
              <MI v={fadeV} className="flex items-center gap-2 text-xl mt-1">
                <span className="float-emoji opacity-80" style={{ animationDelay: '0s' }}>✨</span>
                <span className="float-emoji opacity-70" style={{ animationDelay: '0.5s' }}>🦋</span>
                <span className="float-emoji opacity-90" style={{ animationDelay: '0.2s' }}>🌹</span>
                <span className="float-emoji opacity-80" style={{ animationDelay: '0.7s' }}>✨</span>
              </MI>
            </motion.div>
          )}
        </Slide>

        {/* ── 02 TIMER ─────────────────────────────────────── */}
        <Slide id="timer" bg="slide-bg-maroon">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
            >
              <MI v={fadeV} className="chapter-label">Já se passou</MI>
              <MI v={scaleV}>
                <p className="text-jumbo font-display font-bold text-rose-50 tabular-nums">{totalDiasAnimado}</p>
              </MI>
              <MI className="space-y-1">
                <p className="font-display text-2xl sm:text-3xl font-light text-rose-200/90">dias juntos</p>
                <p className="text-rose-300/60 text-sm italic">e cada um deles valeu muito ❤️</p>
              </MI>
              <MI>
                <div className="flex items-center justify-center gap-3">
                  {[
                    { val: tempo.horas, label: 'horas' },
                    { val: tempo.minutos, label: 'min' },
                    { val: tempo.segundos, label: 'seg', gold: true },
                  ].map(({ val, label, gold }, i) => (
                    <div key={label} className="flex items-center gap-3">
                      {i > 0 && <span className="text-rose-300/30 text-lg font-light">:</span>}
                      <div className="flex flex-col items-center">
                        <span className={`font-mono tabular-nums text-xl font-semibold ${gold ? 'text-amber-300' : 'text-rose-200/80'}`}>
                          {val}
                        </span>
                        <span className="text-rose-300/45 text-[10px] tracking-widest uppercase mt-0.5">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </MI>
              <MI v={fadeV}>
                <span className="badge-pill">🌹 {tempo.meses} {tempo.meses === 1 ? 'mês' : 'meses'} e {tempo.dias} dias</span>
              </MI>
            </motion.div>
          )}
        </Slide>

        {/* ── 03 NOSSA MÚSICA ──────────────────────────────── */}
        <Slide id="musica" bg="slide-bg-purple">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
            >
              <MI v={fadeV} className="chapter-label">A nossa trilha sonora</MI>
              <MI v={scaleV} className="text-5xl sm:text-6xl">🎵</MI>
              <MI className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Nossa Música</h2>
                <p className="text-rose-200/65 text-sm">A trilha sonora do nosso amor 💕</p>
              </MI>
              <MI className="w-full">
                {!musicaRevelada ? (
                  <button
                    onClick={() => setMusicaRevelada(true)}
                    className="w-full flex flex-col items-center gap-3 py-6 px-4 rounded-2xl card-surface border border-amber-400/20"
                  >
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-rose-100 text-sm font-medium">
                      <span>▶</span> Ouvir nossa música
                    </span>
                  </button>
                ) : (
                  <div className="w-full rounded-2xl overflow-hidden card-surface">
                    <div className="relative w-full" style={{ paddingBottom: '80%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        style={{ minHeight: 260 }}
                        src={SPOTIFY_URL}
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Nossa música"
                      />
                    </div>
                  </div>
                )}
              </MI>
            </motion.div>
          )}
        </Slide>

        {/* ── 04 CARTA DE AMOR ─────────────────────────────── */}
        <Slide id="carta" bg="slide-bg-amber">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-6 text-center w-full max-w-sm mx-auto"
            >
              <MI v={fadeV} className="chapter-label">Uma carta pra você</MI>
              <MI v={scaleV} className="text-4xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>💌</MI>
              <MI className="space-y-4 text-left w-full card-surface p-5 rounded-2xl allow-select">
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-100/95">Maysa,</p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  desde o primeiro dia eu senti que algo em você era diferente.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  Cada momento com você é especial, e cada sorriso seu me faz bem.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  Te amo mais do que consigo dizer.
                </p>
              </MI>
              <MI v={fadeV} className="text-2xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite 0.5s' }}>💕</MI>
            </motion.div>
          )}
        </Slide>

        {/* ── 05 COISAS QUE AMO ────────────────────────────── */}
        <Slide id="tags" bg="slide-bg-magenta">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto"
            >
              <div className="text-center">
                <MI v={fadeV} className="chapter-label">Sobre você</MI>
                <MI className="mt-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">
                    Coisas que amo em você ❤️
                  </h2>
                </MI>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                {[
                  ['✝️', 'Seu amor por Deus'],
                  ['💕', 'O jeito que você cuida de mim'],
                  ['🕊️', 'A paz que sinto ao seu lado'],
                  ['💪', 'Como você me incentiva'],
                  ['❤️', 'Seu jeito de demonstrar amor'],
                  ['✨', 'Como você torna tudo leve'],
                  ['👀', 'Seu olhar quando me vê'],
                  ['💗', 'Seu coração bondoso'],
                  ['😊', 'Seu sorriso e sua risada'],
                  ['🌹', 'Seu jeito único de ser'],
                ].map(([emoji, text]) => (
                  <MI key={text}>
                    <div className="tag-item">
                      <span className="text-lg shrink-0">{emoji}</span>
                      <span className="text-sm leading-snug">{text}</span>
                    </div>
                  </MI>
                ))}
              </div>
            </motion.div>
          )}
        </Slide>

        {/* ── 06 VERSÍCULO ─────────────────────────────────── */}
        <Slide id="versiculo" bg="slide-bg-indigo">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto allow-select"
            >
              <MI v={fadeV} className="chapter-label">Uma palavra pra nós</MI>
              <MI v={scaleV} className="text-4xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>✝️</MI>
              <MI>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">1 Coríntios 13</h2>
              </MI>
              <MI className="w-full">
                <div className="verse-card space-y-2.5 text-rose-200/90 text-sm sm:text-base leading-[1.75] text-left">
                  {[
                    ['4', 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.'],
                    ['5', 'Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.'],
                    ['6', 'O amor não se alegra com a injustiça, mas se alegra com a verdade.'],
                    ['7', 'Tudo sofre, tudo crê, tudo espera, tudo suporta.'],
                  ].map(([n, t]) => (
                    <p key={n}><span className="text-amber-300/75 font-semibold">{n} </span>{t}</p>
                  ))}
                </div>
              </MI>
              <MI v={fadeV} className="text-amber-300/50 text-xs italic">Esse versículo sempre me lembra você.</MI>
            </motion.div>
          )}
        </Slide>

        {/* ── 07 MOMENTOS ──────────────────────────────────── */}
        <Slide id="momentos" bg="slide-bg-dark">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-4 w-full mx-auto"
            >
              <div className="text-center">
                <MI v={fadeV} className="chapter-label">Nossas memórias</MI>
                <MI className="mt-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Momentos 📸</h2>
                </MI>
              </div>
              <MI className="w-full">
                <div
                  className="relative rounded-[16px] overflow-hidden card-surface w-full"
                  style={{ height: 'min(55vh, 420px)' }}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  <div className="carousel-counter">{fotoAtual + 1} / {FOTOS.length}</div>
                  <button onClick={() => irParaFoto((fotoAtual - 1 + FOTOS.length) % FOTOS.length)}
                    className="absolute left-2 z-10 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 border border-white/15"
                    aria-label="Anterior">
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={() => irParaFoto((fotoAtual + 1) % FOTOS.length)}
                    className="absolute right-2 z-10 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 border border-white/15"
                    aria-label="Próxima">
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
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
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {FOTOS.map((_, i) => (
                      <button key={i} onClick={() => irParaFoto(i)}
                        className={`rounded-full transition-all duration-200 ${i === fotoAtual ? 'bg-amber-400 w-4 h-1.5' : 'bg-white/30 w-1.5 h-1.5'}`}
                      />
                    ))}
                  </div>
                </div>
              </MI>
              <MI v={fadeV} className="text-rose-300/55 text-xs text-center">← deslize para navegar →</MI>
            </motion.div>
          )}
        </Slide>

        {/* ── 08 NOSSA HISTÓRIA (TIMELINE) ─────────────────── */}
        <Slide id="historia" bg="slide-bg-story" center={false}>
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col gap-6 w-full max-w-sm mx-auto allow-select"
            >
              <div className="text-center">
                <MI v={fadeV} className="chapter-label">Nossa história</MI>
                <MI className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite' }}>🌹</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Nossa História</h2>
                  <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite 0.5s' }}>📖</span>
                </MI>
                <MI v={fadeV}><p className="text-rose-200/55 text-xs mt-1">Os momentos que marcaram nossa trajetória</p></MI>
              </div>

              <div className="space-y-5 w-full">
                {TIMELINE.map((item, idx) => (
                  <MI key={idx} className="relative pl-5">
                    {/* linha vertical */}
                    {idx < TIMELINE.length - 1 && (
                      <div className="absolute left-[3px] top-4 bottom-[-1.25rem] w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
                    )}
                    {/* dot */}
                    <div className="absolute left-0 top-0.5 w-[7px] h-[7px] rounded-full bg-amber-400 ring-2 ring-[#1a1020]/90 shadow-[0_0_8px_1px_rgba(212,175,55,0.35)]" />
                    {/* card */}
                    <div className="rounded-2xl p-4 bg-white/[0.05] border border-amber-400/12">
                      <span className="timeline-date-pill">{item.data}</span>
                      <h3 className="font-display text-lg font-semibold text-rose-100 mt-2 mb-2 leading-snug">
                        {item.icon} {item.titulo}
                      </h3>
                      <div className="space-y-2">
                        {item.paras.map((p, j) => (
                          <p key={j} className="text-rose-200/80 text-sm leading-[1.8]">{p}</p>
                        ))}
                      </div>
                    </div>
                  </MI>
                ))}
              </div>
            </motion.div>
          )}
        </Slide>

        {/* ── 15 PROMESSAS ─────────────────────────────────── */}
        <Slide id="promessas" bg="slide-bg-teal" center={false}>
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col gap-4 w-full max-w-sm mx-auto"
            >
              <div className="text-center">
                <MI v={fadeV} className="chapter-label">Meu compromisso</MI>
                <MI v={scaleV} className="text-4xl mt-2" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>🤍</MI>
                <MI className="mt-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Minhas promessas para você</h2>
                </MI>
                <MI v={fadeV}><p className="text-rose-300/65 text-sm mt-1">Com Cristo no centro, te prometo:</p></MI>
              </div>
              <div className="space-y-2 w-full">
                {[
                  ['🌱', 'Ser paciente com você sempre'],
                  ['🤍', 'Ser amoroso e gentil em cada momento'],
                  ['🛡️', 'Cuidar de você com atenção e carinho'],
                  ['✝️', 'Te aproximar de Cristo todos os dias'],
                  ['🙏', 'Conduzir tudo com temor a Deus'],
                  ['⏳', 'Não apressar etapas — seu tempo é sagrado'],
                  ['🧱', 'Provar com atitudes, não só palavras'],
                  ['🌊', 'Manter constância emocional ao seu lado'],
                  ['🏔️', 'Construir uma base firme com Cristo no centro'],
                  ['🔝', 'Sempre dar o melhor de mim por nós'],
                ].map(([icon, text]) => (
                  <MI key={text}>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/[0.05] border border-emerald-400/12">
                      <span className="text-xl shrink-0">{icon}</span>
                      <span className="text-rose-100/90 text-sm font-medium leading-snug">{text}</span>
                    </div>
                  </MI>
                ))}
              </div>
              <MI v={fadeV}><p className="text-center text-rose-300/55 text-xs italic">Cada uma vem do coração. ❤️</p></MI>
            </motion.div>
          )}
        </Slide>

        {/* ── 16 FUTURO ────────────────────────────────────── */}
        <Slide id="futuro" bg="slide-bg-blue" center={false}>
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col gap-4 w-full max-w-sm mx-auto"
            >
              <div className="text-center">
                <MI v={fadeV} className="chapter-label">O que está por vir</MI>
                <MI v={scaleV} className="text-4xl mt-2">🌅</MI>
                <MI className="mt-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">O futuro que sonho com você</h2>
                </MI>
              </div>
              <div className="space-y-2 w-full">
                {[
                  { icon: '💍', text: 'Casar com você' },
                  { icon: '👨‍👩‍👧', text: 'Construir uma família firmada em Cristo' },
                  { icon: '✝️', text: 'Servir a Deus juntos, sempre' },
                  { icon: '🏠', text: 'Um lar seguro, alinhado e cheio de amor' },
                  { icon: '🌍', text: 'Viver muitas histórias ainda' },
                ].map(({ icon, text }) => (
                  <MI key={text}>
                    <div className="future-item">
                      <span className="text-2xl shrink-0">{icon}</span>
                      <span className="text-rose-100/90 text-sm sm:text-base font-medium">{text}</span>
                    </div>
                  </MI>
                ))}
              </div>
              <MI v={fadeV}><Divider char="✦ ✧ ✦" /></MI>
              <MI v={fadeV}><p className="text-center text-rose-200/80 text-sm font-medium">E os seus sonhos — que acredito com você 💪</p></MI>
              <div className="space-y-2 w-full">
                {[
                  { icon: '👩‍🏫', text: 'Dar palestras em público', note: 'Você tem muito a dizer. O mundo precisa te ouvir.' },
                  { icon: '✝️', text: 'Dar palavras na igreja', note: 'Deus vai te preparar. Eu estarei na primeira fila.' },
                  { icon: '🧠', text: 'Psicologia', note: 'Sua sensibilidade e inteligência emocional já são presentes natos pra isso.' },
                ].map(({ icon, text, note }) => (
                  <MI key={text}>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-2xl bg-white/[0.05] border border-blue-400/12">
                      <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                      <div>
                        <p className="text-rose-100/90 text-sm font-medium leading-snug">{text}</p>
                        <p className="text-amber-300/55 text-xs italic mt-0.5">{note}</p>
                      </div>
                    </div>
                  </MI>
                ))}
              </div>
            </motion.div>
          )}
        </Slide>

        {/* ── 17 FINAL ─────────────────────────────────────── */}
        <Slide id="final" bg="slide-bg-final">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
            >
              <MI v={fadeV} className="chapter-label">Capítulo 1 de muitos</MI>
              <MI v={scaleV} className="flex gap-3 text-4xl sm:text-5xl">
                <span className="float-emoji" style={{ animationDelay: '0s' }}>💕</span>
                <span className="float-emoji" style={{ animationDelay: '0.45s' }}>❤️</span>
                <span className="float-emoji" style={{ animationDelay: '0.9s' }}>💗</span>
              </MI>
              <MI className="space-y-2">
                <p className="text-rose-200/80 text-base sm:text-lg">Essa é só a primeira página da nossa história.</p>
                <p className="font-display text-lg sm:text-xl text-rose-200/90 italic">E assim continua...</p>
              </MI>
              <MI>
                <p className="font-display font-semibold text-rose-50 leading-tight" style={{ fontSize: 'clamp(26px, 7.5vw, 44px)' }}>
                  Te amo para sempre, Maysa ♥
                </p>
              </MI>
              <MI v={fadeV}>
                <p className="text-amber-200/80 text-base flex items-center justify-center gap-2 flex-wrap">
                  <span>🌹</span> Sempre contigo, amor{' '}
                  <span className="float-emoji inline-block text-sm" style={{ animationDelay: '0.3s' }}>🦋</span>{' '}
                  <span>🌹</span>
                </p>
              </MI>
              <MI v={scaleV} className="text-3xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>💝</MI>
              <MI className="w-full">
                {!mensagemRevelada ? (
                  <button
                    onClick={() => setMensagemRevelada(true)}
                    className="text-rose-300/70 hover:text-rose-200 text-sm underline underline-offset-4 transition-colors"
                  >
                    Clique aqui se você chegou até o fim ❤️
                  </button>
                ) : (
                  <div className="card-surface p-5 w-full space-y-3 card-gold-border">
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
                    <p className="text-rose-100 text-base italic font-body">Obrigado por viver essa história comigo.</p>
                    <p className="text-rose-200 font-medium text-sm">Você é o amor que eu sempre sonhei.</p>
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
                  </div>
                )}
              </MI>
              <MI v={fadeV} className="text-rose-400/45 text-xs flex items-center justify-center gap-1.5 flex-wrap mt-2">
                <span>Feito com muito</span> <span>☕</span> <span>e amor por Davi Antonaji</span>
                <span className="text-rose-300/40">(seu amor)</span>
              </MI>
            </motion.div>
          )}
        </Slide>

      </div>
    </>
  )
}
