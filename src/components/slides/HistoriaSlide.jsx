import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, TIMELINE, HISTORIA_DATA_CORTE } from '../../data/constants'

/** Data até onde os cards aparecem sem interação (inclusive). */
const idxCorte = TIMELINE.findIndex(i => i.data === HISTORIA_DATA_CORTE)
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
    <div className="space-y-2.5">
      {(aberto ? paras : preview).map((p, j) => (
        <p key={j} className="prose-soft text-[0.875rem]">{p}</p>
      ))}
      {necessita && (
        <button type="button" onClick={() => setAberto(v => !v)} className="btn-quiet mt-1">
          {aberto ? 'Mostrar menos' : 'Leia mais'}
          <Icon name="chevronDown" size={12} className="chev" data-open={aberto} />
        </button>
      )}
    </div>
  )
}

/** Envoltório comum: espinha + marcador do capítulo. */
function TimelineRow({ idx, total, destaque, children }) {
  return (
    <div className="tl relative">
      {idx < total - 1 && <span className="tl__spine" aria-hidden />}
      <span className={`tl__dot ${destaque ? 'tl__dot--star' : ''}`} aria-hidden />
      {children}
    </div>
  )
}

function ChatCard({ item, idx, total }) {
  const destaque = !!item.destaque
  return (
    <TimelineRow idx={idx} total={total} destaque={destaque}>
      <article className={`overflow-hidden ${destaque ? 'sheet sheet-feature' : 'sheet'}`}>
        <div className="p-5">
          <p className="kicker">Antes de tudo</p>
          <span className="date-tag mt-2">{item.data}</span>
          <h3 className="title-sm mt-2.5 mb-2.5">
            <span className="mr-1.5" aria-hidden>{item.icon}</span>
            {item.titulo}
          </h3>
          <CardBody paras={item.paras} />
        </div>

        <div className="px-3 pb-3">
          <div className="chat-window">
            <div className="chat-window__bar">
              <Icon name="chat" size={12} />
              <span>WhatsApp · 09/02/2026</span>
            </div>
            <div className="p-3 space-y-2">
              {item.mensagens.map((msg, i) => (
                <div key={i} className={`flex ${msg.de === 'eu' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`bubble ${msg.de === 'eu' ? 'bubble--me' : 'bubble--them'}`}>
                    <p className="whitespace-pre-line">{msg.texto}</p>
                    <p className={`bubble__time ${msg.de === 'eu' ? 'text-right' : ''}`}>{msg.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </TimelineRow>
  )
}

function TimelineCard({ item, idx, total }) {
  if (item.tipo === 'chat') return <ChatCard item={item} idx={idx} total={total} />

  const destaque = !!item.destaque
  return (
    <TimelineRow idx={idx} total={total} destaque={destaque}>
      <article className={`p-5 ${destaque ? 'sheet sheet-feature' : 'sheet sheet-lift'}`}>
        {destaque && <p className="kicker mb-2">✦ Momento especial</p>}
        <span className="date-tag">{item.data}</span>
        <h3 className={`mt-2.5 mb-2.5 ${destaque ? 'title-md' : 'title-sm'}`}>
          <span className="mr-1.5" aria-hidden>{item.icon}</span>
          {item.titulo}
        </h3>
        <CardBody paras={item.paras} />
      </article>
    </TimelineRow>
  )
}

export default function HistoriaSlide() {
  const [expandido, setExpandido] = useState(false)

  return (
    <Slide id="historia" scene="scene-cream" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-2xl mx-auto flex flex-col gap-9 allow-select pb-10"
        >
          <ChapterPlate
            id="historia"
            icon="book"
            kicker="Do início"
            title="Nossa história"
            lede="Os momentos que marcaram a nossa trajetória, em ordem."
          />

          <div className="space-y-6 w-full">
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
                    transition={{ duration: 0.38, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <TimelineCard item={item} idx={idx} total={TIMELINE.length} />
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {TIMELINE_OCULTA.length > 0 && (
              <div className="flex justify-center pt-2">
                <button type="button" onClick={() => setExpandido(v => !v)} className="btn">
                  <Icon name="book" size={15} />
                  {expandido ? 'Mostrar menos' : `Continuar lendo (${TIMELINE_OCULTA.length} capítulos)`}
                  <Icon name="chevronDown" size={14} className="chev" data-open={expandido} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
