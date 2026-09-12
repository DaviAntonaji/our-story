import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, CARTAS_LACRADAS } from '../../data/constants'

function diasRestantes(dataAlvo) {
  if (!dataAlvo) return null
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const alvo = new Date(dataAlvo)
  alvo.setHours(0, 0, 0, 0)
  return Math.ceil((alvo - hoje) / (1000 * 60 * 60 * 24))
}

/** Lacre de cera pequeno, para a frente do envelope. */
function Lacre({ aberto }) {
  return (
    <span
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
      style={{
        background: aberto
          ? 'radial-gradient(circle at 34% 28%, #d4576e 0%, #a82d47 46%, #7e1d33 100%)'
          : 'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%)',
        border: aberto ? 'none' : '1px solid var(--line)',
        boxShadow: aberto
          ? 'inset 0 1px 4px rgba(255,255,255,0.3), inset 0 -3px 8px rgba(0,0,0,0.35), 0 6px 16px -6px rgba(126,29,51,0.7)'
          : 'none',
        color: aberto ? 'rgba(255,240,240,0.9)' : 'var(--ink-4)',
      }}
      aria-hidden
    >
      <Icon name={aberto ? 'unlock' : 'lock'} size={16} strokeWidth={1.5} />
    </span>
  )
}

function CartaCard({ carta }) {
  const dias = diasRestantes(carta.dataAbertura)
  const desbloqueada = dias !== null && dias <= 0
  const semData = carta.dataAbertura === null

  if (desbloqueada) {
    return (
      <article className="sheet sheet-feature px-5 py-6 sm:px-7">
        <header className="flex items-center gap-4">
          <Lacre aberto />
          <div className="text-left flex-1 min-w-0">
            <p className="kicker">Carta aberta</p>
            <h3 className="title-sm mt-1">
              <span className="mr-1.5" aria-hidden>{carta.icon}</span>
              {carta.titulo}
            </h3>
          </div>
        </header>

        <div
          className="mt-5 pt-5 space-y-3"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          {carta.conteudo.map((p, i) => (
            <p key={i} className="prose-soft">{p}</p>
          ))}
        </div>
      </article>
    )
  }

  return (
    <article className="sheet px-5 py-6 sm:px-7 relative overflow-hidden">
      {/* Dobra de envelope, atrás */}
      <span
        className="absolute -top-14 left-1/2 -translate-x-1/2 w-[130%] h-28 pointer-events-none"
        style={{
          background: 'var(--surface-2)',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          border: '1px solid var(--line-soft)',
        }}
        aria-hidden
      />

      <header className="relative flex items-center gap-4">
        <Lacre />
        <div className="text-left flex-1 min-w-0">
          <p className="kicker">{semData ? 'Data em breve' : `Abre em ${carta.dataTexto}`}</p>
          <h3 className="title-sm mt-1 t-body">
            <span className="mr-1.5 opacity-50" aria-hidden>{carta.icon}</span>
            {carta.titulo}
          </h3>
        </div>
      </header>

      {!semData && dias !== null && dias > 0 && (
        <div className="relative mt-4 flex items-baseline justify-center gap-2 sheet-quiet py-2.5 px-3">
          <span className="font-sans text-[0.625rem] uppercase tracking-[0.16em] t-muted">Faltam</span>
          <span className="font-display text-xl font-semibold t-accent tabular-nums">
            {dias.toLocaleString('pt-BR')}
          </span>
          <span className="font-sans text-[0.625rem] uppercase tracking-[0.16em] t-muted">
            {dias === 1 ? 'dia' : 'dias'}
          </span>
        </div>
      )}

      <p className="relative font-body italic text-[0.8125rem] leading-relaxed t-muted mt-4">
        {carta.descricao}
      </p>
    </article>
  )
}

export default function CartasLacradasSlide() {
  return (
    <Slide id="cartas" scene="scene-dark scene-velvet" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-3xl mx-auto flex flex-col gap-9 allow-select pb-10"
        >
          <ChapterPlate
            id="cartas"
            icon="scroll"
            kicker="Para o nosso futuro"
            title="Cartas guardadas"
            lede="Palavras escritas hoje, lacradas esperando o momento certo de serem abertas."
          />

          <div className="flex flex-col gap-5 w-full">
            {CARTAS_LACRADAS.map((carta) => (
              <MI key={carta.id}>
                <CartaCard carta={carta} />
              </MI>
            ))}
          </div>

          <MI v={fadeV} className="text-center">
            <p className="font-hand text-xl t-accent2">
              cada uma tem uma data — e nenhuma vai se perder
            </p>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
