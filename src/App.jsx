import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─── Constantes ────────────────────────────────────────────
const INICIO_NAMORO = new Date(2026, 2, 4, 19, 30, 0)
const SPOTIFY_URLS = [
  'https://open.spotify.com/embed/track/3pinR9iFoRAZvqirrRm4os',
  'https://open.spotify.com/embed/track/7FOPTUmEJ3ByYW9ag9cZJ3',
  'https://open.spotify.com/embed/track/0uwaiApk6k7k9POyFjTKeR',
]

const FOTOS = [
  '/imgs/photos/1.jpg', '/imgs/photos/2.jpg', '/imgs/photos/3.jpg',
  '/imgs/photos/4.jpg', '/imgs/photos/5.jpg', '/imgs/photos/6.jpg',
  '/imgs/photos/7.jpg', '/imgs/photos/8.jpg', '/imgs/photos/9.jpg',
  '/imgs/photos/10.jpeg', '/imgs/photos/11.jpeg', '/imgs/photos/12.jpeg',
  '/imgs/photos/13.jpeg', '/imgs/photos/14.jpg', '/imgs/photos/15.jpg',
  '/imgs/photos/16.jpg', '/imgs/photos/17.jpg', '/imgs/photos/18.jpg',
  '/imgs/photos/19.jpg', '/imgs/photos/20.jpg', '/imgs/photos/21.jpg', '/imgs/photos/22.jpg',
  '/imgs/photos/23.jpg', '/imgs/photos/24.jpg', '/imgs/photos/25.jpg', '/imgs/photos/26.jpg',
  '/imgs/photos/27.jpg', '/imgs/photos/28.jpg', '/imgs/photos/29.jpg', '/imgs/photos/30.jpg',
  '/imgs/photos/31.jpg', '/imgs/photos/32.jpg', '/imgs/photos/33.jpg', "/imgs/photos/34.jpg",
  '/imgs/photos/35.jpg', '/imgs/photos/36.jpg', '/imgs/photos/37.jpg', "/imgs/photos/38.jpg",
  '/imgs/photos/39.jpg', '/imgs/photos/40.jpg', '/imgs/photos/41.jpg', "/imgs/photos/42.jpg",
  '/imgs/photos/43.jpg', '/imgs/photos/44.jpg', '/imgs/photos/45.jpg', '/imgs/photos/46.jpg',
  '/imgs/photos/47.jpg'
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
      'E quando comecei a conversar com você sobre Deus, e passagens sobre não desanimar, sobre cansar... Você chorou na hora - e foi só depois, já namorando, que você me contou que foi ali que percebeu que estava apaixonada por mim.',
    ],
  },
  {
    data: '04 de março de 2026',
    titulo: 'Início do nosso namoro',
    icon: '💍',
    paras: [
      'Começou quando combinamos de sair no João Julhão às 18h. Cheguei exatamente às 18:00 e já combinei com o garçom todo o roteiro do que iria acontecer. Quando você chegou com a Talita, estava linda… e ali meu coração já acelerou.',
      'Fomos até a mesa que eu já tinha deixado separada, planejando deixar você sentada de costas para a cozinha, para que não visse nada do que estava sendo preparado.',
      'Foi uma conversa natural e descontraída, principalmente com as perguntas que você começou a fazer - sobre família, estabilidade, educação financeira… tudo isso enquanto comíamos filé mignon à parmegiana.',
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
      'Foi a noite em que conversei com seus pais. Eles fizeram uma torta de frango que estava simplesmente maravilhosa - com certeza uma das melhores que já comi na vida.',
      'Tivemos uma conversa muito boa, e naquele momento eles nos autorizaram a namorar de verdade. Foi um momento muito especial para mim. E foi também nesse dia que demos o nosso primeiro beijo.',
      'Depois fomos ao aniversário do Wagner. Fomos recebidos ao som de "Aquilo que Parecia Impossível" - aquilo deixou a noite ainda mais marcante.',
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
      'Durante o dia eu estava preocupado pensando em como te levar, pois estava chovendo o dia inteiro. No fim, seu pai nos deu um voto de confiança e deixou irmos normalmente - o que tornou tudo ainda mais especial.',
      'Poder estar ali com você, participando de um momento tão importante na presença de Deus, marcou muito o meu coração.',
      'E teve também uma "briguinha" porque eu não deixei você abrir a porta do carro - eu queria abrir para você. Saí todo animado para abrir a porta e segurar sua mão quando você desceu. Foi um gesto pequeno, mas cuidar de você assim me deixa muito feliz. ❤️',
    ],
  },
  {
    data: '14 de março de 2026',
    titulo: 'Nossa primeira cafeteria ☕',
    icon: '☕',
    paras: [
      'Fui te buscar de carro num sábado à tarde, do jeito que eu gosto, estar com você, te levar e cuidar de você. E ainda foi a nossa primeira vez indo juntos numa cafeteria.',
      'Passamos um pouco de frio por causa do ar-condicionado gelado kkk, mas até isso acabou sendo bom pra ficar mais pertinho. Tomamos cappuccino, dividimos um pão com manteiga na chapa e um pão com requeijão e bacon na chapa também. Pra fechar, uma panqueca de Nutella com morango que tava boa demais.',
      'Depois, fomos pra praça da igreja e ficamos num banquinho, abraçados, conversando, fazendo carinho e rindo juntos. Foi daqueles momentos simples, mas que fazem tudo valer a pena.',
      'Na volta, ainda passamos no The Best Açaí e montamos um copo pra Duda. Quando fomos entregar, ela ficou tímida, mas depois você me contou que ela gostou muito e agradeceu. Achei isso muito bonitinho.',
    ],
  },
  {
    data: '15 de março de 2026',
    titulo: 'Nosso primeiro pós-culto 🙏',
    icon: '✝️',
    paras: [
      'Foi um culto muito abençoado. E foi a primeira vez que fui buscar você e a Duda de carro para irmos juntos à igreja. Quando cheguei na sua casa, você me deu um presente lindo, feito completamente a mão - um livrinho feito a mão que se vira página por página, cheio de mensagens fofas, com desenhos seus em cada parte... E dentro ainda tinha uma carta enorme que abria em sanfona, palavra por palavra escrita com tanto amor. Li cada trecho com um carinho imenso, e fiquei tão feliz - porque dinheiro nenhum no mundo compra um presente assim. Tão perfeito, tão detalhado, tão você. Só de lembrar daquele momento eu me emociono. Guardei cada detalhe no coração.',
      'Tivemos a Santa Ceia, e dessa vez conseguimos trocar o pão e o suco direitinho, sem ninguém atrapalhar kkk.',
      'O culto terminou um pouco mais tarde, você avisou seus pais e então tivemos nosso primeiro pós-culto juntos: eu, você e nossa chaveirinho kkkkk. Fomos no Tips perto da igreja, escolhemos nossos lanches e pedimos juntos, e ficamos lá comendo, conversando e rindo muito juntos.',
      'Foi especial de um jeito único - o primeiro de muitos pós-cultos!',
    ],
  },
  {
    data: '22 de março de 2026',
    titulo: 'Um dia cheio de graça',
    icon: '🙏',
    paras: [
      'O dia começou de forma especial: passamos praticamente o dia todo na casa dos seus avós, num almoço que foi muito divertido, engraçado e cheio de alegria. Comida boa, boas risadas, exatamente o tipo de dia que faz tudo valer a pena.',
      'No culto, teve uma mensagem que te marcou muito... Percebi que você estava quase chorando, abalada por dentro. Te abracei e oramos juntos ali mesmo - foi um momento lindo e muito real entre nós.',
      'No final do culto, tivemos uma conversa com o pastor: explicamos como o nosso relacionamento começou, e ele orou e abençoou o que estamos construindo juntos. Sentir essa aprovação e cobertura espiritual foi algo que ficou gravado no meu coração.',
      'Depois fomos ao The Best Açaí com as duas chaveirinhas - Amanda e Duda. As duas ficaram bem amigas nesse dia, e foi tão gostoso ver isso acontecer. Tomamos açaí, nos divertimos muito, e foi daqueles momentos simples que guardam um calor especial.',
      'Na volta, percebi você bem preocupada... Você preferiu conversar comigo pelo WhatsApp depois, e fiz o possível pra te consolar. A preocupação era sobre o tempo, a sensação de não estar dando conta de tudo. Fico feliz por poder estar do seu lado mesmo nessas horas - e por você confiar em mim com o que sente.',
    ],
  },
  {
    data: '29 de março de 2026',
    titulo: 'Nossa primeira viagem com a família',
    icon: '🌊',
    paras: [
      'Hoje foi um daqueles dias que a gente sabe, no fundo, que vai guardar pra sempre.',
      'E o mais louco é que tudo aconteceu do nada. Por volta das 11:00 você me mandou mensagem avisando que iam viajar e perguntou se eu queria ir também. Falei que ia ver com meus pais, resolvi tudo rápido, e quando vi já estava aí às 12:00, pronto pra ir. Sem pensar muito… e, com certeza, foi a melhor decisão que eu tomei hoje.',
      'Foi a nossa primeira viagem juntos com a sua família. Estavam seus pais, a Valentina, seu tio e seus avós em um carro… e no outro, eu, você e a Duda. Só isso já fazia tudo parecer especial, mas o dia conseguiu ser ainda mais.',
      'Passamos a tarde na represa de Sandovalina, e foi simplesmente incrível. Teve risada, teve vôlei, teve aqueles momentos simples que, quando é com a pessoa certa, viram tudo.',
      'Mas, sem dúvida, uma das partes mais bonitas do dia foi lá na água… quando você ganhou seus giros de princesa. Pode parecer algo pequeno pra quem vê de fora, mas pra mim foi um daqueles momentos que ficam marcados. Ver seu sorriso, leve, feliz, sendo você… é o tipo de coisa que faz tudo valer a pena.',
      'Foi um dia leve, divertido, cheio de vida… e que com certeza merece um espaço especial na nossa história.',
      'Um dia simples, inesperado… mas perfeito do jeito que tinha que ser: com você.',
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
      const eased = progress < 0.7 ? progress * 1.2 : 0.84 + (progress - 0.7) * (0.16 / 0.3)
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
function Slide({ id, bg, children, center = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <section id={id} ref={ref} className={`snap-slide ${bg}`}>
      <div
        className={`flex flex-col ${center ? 'items-center justify-center min-h-[100dvh]' : 'items-start justify-start'} w-full px-5 sm:px-8 py-10 sm:py-12`}
        style={{ paddingTop: center ? undefined : 'max(2.5rem, env(safe-area-inset-top, 2.5rem))' }}
      >
        {children(inView)}
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
  const [timerInView, setTimerInView] = useState(false)
  const totalDiasAnimado = useCountUp(tempo.totalDias, 900, timerInView)
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
          if (e.isIntersecting) {
            const idx = SLIDE_IDS.indexOf(e.target.id)
            if (idx !== -1) setActiveSlide(idx)
          }
        })
      },
      { threshold: 0.3 },
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

      <div>

        {/* ── 01 INTRO ─────────────────────────────────────── */}
        <Slide id="intro" bg="slide-bg-rose">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
            >
              <MI v={fadeV} className="chapter-label">Nossa história</MI>
              <MI v={scaleV} className="flex gap-3 text-4xl">
                <span style={{ animation: 'heartBeat 1.5s ease-in-out infinite' }}>❤️</span>
                <span style={{ animation: 'heartBeat 1.5s ease-in-out infinite 0.3s' }}>❤️</span>
                <span style={{ animation: 'heartBeat 1.5s ease-in-out infinite 0.6s' }}>❤️</span>
              </MI>
              <MI className="photo-frame w-full max-w-[200px] sm:max-w-[240px] mx-auto">
                <div className="aspect-[3/4] overflow-hidden rounded-[18px]">
                  <img src="/imgs/photos/15.jpg" alt="Nós dois" className="w-full h-full object-cover" />
                </div>
              </MI>
              <MI className="space-y-1">
                <h1 className="text-hero font-display font-semibold text-rose-50">Para você, Maysa <span className="inline-block animate-heartBeat">❤️</span></h1>
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
          {(inView) => {
            if (inView && !timerInView) setTimerInView(true)
            return (
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
            )
          }}
        </Slide>

        {/* ── 03 NOSSAS MÚSICAS ─────────────────────────────── */}
        <Slide id="musica" bg="slide-bg-purple">
          {(inView) => (
            <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
            >
              <MI v={fadeV} className="chapter-label">A nossa trilha sonora</MI>
              <MI v={scaleV} className="text-5xl sm:text-6xl">🎵</MI>
              <MI className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Nossas Músicas</h2>
                <p className="text-rose-200/65 text-sm">A trilha sonora do nosso amor 💕</p>
              </MI>
              <MI className="w-full">
                {!musicaRevelada ? (
                  <button
                    onClick={() => setMusicaRevelada(true)}
                    className="w-full flex flex-col items-center gap-3 py-6 px-4 rounded-2xl card-surface border border-amber-400/20"
                  >
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-rose-100 text-sm font-medium">
                      <span>▶</span> Ouvir nossas músicas
                    </span>
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-4">
                    {SPOTIFY_URLS.map((url, i) => (
                      <div key={i} className="w-full rounded-2xl overflow-hidden card-surface">
                        <div className="relative w-full" style={{ paddingBottom: '80%' }}>
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            style={{ minHeight: 260 }}
                            src={url}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title={`Nossa música ${i + 1}`}
                          />
                        </div>
                      </div>
                    ))}
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
                  eu fico até sem saber por onde começar… porque falar de você nunca é simples pra mim. não é só sobre gostar, não é só sobre estar junto… é algo muito mais profundo, muito mais verdadeiro.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  desde o momento que você entrou na minha vida, alguma coisa mudou dentro de mim. é como se tudo tivesse ficado mais leve, mais bonito… como se Deus tivesse, com todo cuidado, colocado você exatamente no meu caminho.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  eu vejo Cristo em você, no seu jeito de falar, no seu coração, na sua sensibilidade, na forma como você se importa com as pessoas, na sua pureza… e isso é uma das coisas que mais me encanta.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  você não faz ideia do quanto me faz bem. só de pensar em você, eu já fico melhor. seu sorriso tem um poder absurdo de mudar o meu dia, sua voz me acalma, e sua presença… a sua presença é um lugar onde eu sinto paz.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  eu amo cada detalhe seu. amo seu jeitinho, amo suas manias, amo quando você ri, amo quando você fala comigo, amo até quando você fica meio quietinha… porque em tudo isso eu vejo você sendo exatamente quem é.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  e quanto mais eu te conheço, mais eu tenho certeza de uma coisa… eu não quero só momentos com você. eu quero uma vida inteira ao seu lado.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  eu oro por nós. oro pelo nosso relacionamento, pelo nosso futuro… e, no meu coração, existe um desejo muito sincero de viver tudo isso com você. de te ter como minha companheira, minha parceira, minha futura esposa.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  eu consigo me imaginar construindo uma vida com você, enfrentando dias difíceis juntos, comemorando conquistas, crescendo espiritualmente lado a lado… formando uma família, cuidando dos nossos filhos, ensinando eles sobre Deus, sobre amor, sobre caráter.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  e não é algo distante ou vazio… é um desejo real, que nasce de tudo que eu vejo em você e de tudo que você já representa na minha vida hoje.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  você me aproxima de Deus. você me inspira a ser melhor, a crescer, a me tornar um homem mais firme, mais responsável, mais parecido com aquilo que Deus espera de mim.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  e eu quero cuidar de você. quero te proteger, te apoiar, estar ao seu lado em todos os momentos… ser alguém que soma na sua vida, que te faz bem assim como você me faz.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  talvez eu não consiga colocar tudo em palavras, porque o que eu sinto vai muito além disso… mas se existe uma coisa que você precisa saber é:
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  eu sou profundamente grato a Deus por você. todos os dias.
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  e com todo meu coração…
                </p>
                <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
                  eu te amo mais do que consigo explicar.
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
                  <MI key={text} className="h-full">
                    <div className="tag-item h-full">
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
                    <div className="absolute left-0 top-0.5 w-[7px] h-[7px] rounded-full bg-amber-400 ring-2 ring-[#1a1020]/90" style={{ animation: 'pulseSoft 2.5s ease-in-out infinite', boxShadow: '0 0 8px 2px rgba(212,175,55,0.5)' }} />
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
                  ['⏳', 'Não apressar etapas - seu tempo é sagrado'],
                  ['🧱', 'Provar com atitudes, não só palavras'],
                  ['🌊', 'Manter constância emocional ao seu lado'],
                  ['🏔️', 'Construir uma base firme com Cristo no centro'],
                  ['🔝', 'Sempre dar o melhor de mim por nós'],
                  ['💬', 'Me expressar com você - sempre, mesmo quando for difícil'],
                  ['👁️', 'Ser transparente, de verdade, em tudo'],
                  ['💛', 'Ser compreensível nos seus momentos difíceis'],
                  ['🌸', 'Te fazer pelo menos um pouquinho feliz todos os dias'],
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
                <MI v={scaleV} className="text-4xl mt-2" style={{ animation: 'softFloat 5s ease-in-out infinite' }}>🌅</MI>
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
              <MI v={fadeV}>
                <p className="text-center text-rose-200/70 text-xs sm:text-sm italic">Quando formos construir nossa casa, ela terá um ipê branco na frente. 🌸</p>
              </MI>
              <MI v={fadeV}><Divider char="✦ ✧ ✦" /></MI>
              <MI v={fadeV}><p className="text-center text-rose-200/80 text-sm font-medium">E os seus sonhos - que acredito com você 💪</p></MI>
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
                  Te amo para sempre, Maysa <span className="inline-block animate-heartBeat">♥</span>
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
              <MI v={fadeV} className="text-rose-500/40 text-[10px] sm:text-xs mt-3">
                © {new Date().getFullYear() === 2026 ? '2026' : `2026–${new Date().getFullYear()}`} Davi de Melo Antonaji e Maysa Sophia Ferreira da Silva. Todos os direitos reservados.
              </MI>
            </motion.div>
          )}
        </Slide>

      </div>
    </>
  )
}
