import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, TIMELINE } from '../../data/constants'

/** Data até onde os cards aparecem sem interação (inclusive). */
const DATA_CORTE = '08 de março de 2026'

const idxCorte = TIMELINE.findIndex(i => i.data === DATA_CORTE)
const TIMELINE_VISIVEL = idxCorte >= 0 ? TIMELINE.slice(0, idxCorte + 1) : TIMELINE
const TIMELINE_OCULTA  = idxCorte >= 0 ? TIMELINE.slice(idxCorte + 1)   : []

/** Leia mais por card: mais de 2 parágrafos, ou 2 muito longos, ou 1 parágrafo enorme. */
function precisaLeiaMais(paras) {
  if (!paras?.length) return false
  if (paras.length > 2) return true
  const total = paras.join('').length
  if (paras.length === 1 && paras[0].length > 400) return true
  if (paras.length === 2 && total > 850) return true
  return false
}

function CardBody({ paras }) {
  const [aberto, setAberto] = useState(false)
  const necessita = precisaLeiaMais(paras)

  const preview = necessita
    ? paras.length > 2
      ? paras.slice(0, 2)
      : [paras[0]]
    : paras

  return (
    <div className="space-y-2">
      {(aberto ? paras : preview).map((p, j) => (
        <p key={j} className="text-rose-200/80 text-sm leading-[1.8]">{p}</p>
      ))}
      {necessita && (
        <button
          type="button"
          onClick={() => setAberto(v => !v)}
          className="text-xs font-medium text-amber-300/90 hover:text-amber-200 underline underline-offset-2 decoration-amber-400/40 mt-0.5"
        >
          {aberto ? 'Mostrar menos' : 'Leia mais'}
        </button>
      )}
    </div>
  )
}

function TimelineCard({ item, idx, total }) {
  return (
    <div className="relative pl-5">
      {idx < total - 1 && (
        <div className="absolute left-[3px] top-4 bottom-[-1.25rem] w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
      )}
      <div
        className="absolute left-0 top-0.5 w-[7px] h-[7px] rounded-full bg-amber-400 ring-2 ring-[#1a1020]/90"
        style={{ animation: 'pulseSoft 2.5s ease-in-out infinite', boxShadow: '0 0 8px 2px rgba(212,175,55,0.5)' }}
      />
      <div className="rounded-2xl p-4 bg-white/[0.05] border border-amber-400/12">
        <span className="timeline-date-pill">{item.data}</span>
        <h3 className="font-display text-lg font-semibold text-rose-100 mt-2 mb-2 leading-snug">
          {item.icon} {item.titulo}
        </h3>
        <CardBody paras={item.paras} />
      </div>
    </div>
  )
}

export default function HistoriaSlide() {
  const [expandido, setExpandido] = useState(false)

  return (
    <Slide id="historia" bg="slide-bg-story" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-6 w-full max-w-sm mx-auto allow-select"
        >
          <div className="text-center">
            <MI v={fadeV} className="chapter-label">Nossa história</MI>
            <MI className="mt-2 flex items-center justify-center gap-2">
              <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite' }}>🌹</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Nossa História</h2>
              <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite 0.5s' }}>📖</span>
            </MI>
            <MI v={fadeV}>
              <p className="text-rose-200/55 text-xs mt-1">Os momentos que marcaram nossa trajetória</p>
            </MI>
          </div>

          <div className="space-y-5 w-full">
            {TIMELINE_VISIVEL.map((item, idx) => (
              <MI key={idx}>
                <TimelineCard
                  item={item}
                  idx={idx}
                  total={expandido ? TIMELINE.length : TIMELINE_VISIVEL.length}
                />
              </MI>
            ))}

            <AnimatePresence>
              {expandido && TIMELINE_OCULTA.map((item, i) => {
                const idx = TIMELINE_VISIVEL.length + i
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <TimelineCard item={item} idx={idx} total={TIMELINE.length} />
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {TIMELINE_OCULTA.length > 0 && (
              <div className="flex justify-center pt-1 pb-4">
                <button
                  type="button"
                  onClick={() => setExpandido(v => !v)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-200 font-sans text-sm font-medium tracking-wide hover:bg-amber-400/18 active:scale-95 transition-all duration-200"
                >
                  <span>✦</span>
                  <span>{expandido ? 'Mostrar menos' : 'Leia mais'}</span>
                  <span
                    className="text-xs transition-transform duration-300"
                    style={{ transform: expandido ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    ▾
                  </span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
