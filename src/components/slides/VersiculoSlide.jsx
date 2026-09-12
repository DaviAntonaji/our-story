import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, PASSAGENS_BIBLICAS } from '../../data/constants'

const VISIVEIS = 2
const PASSAGENS_PREVIEW = PASSAGENS_BIBLICAS.slice(0, VISIVEIS)
const PASSAGENS_OCULTAS = PASSAGENS_BIBLICAS.slice(VISIVEIS)

function NumVerso({ n }) {
  return (
    <sup className="font-display text-[0.6875rem] font-semibold t-accent mr-1 align-super tabular-nums">
      {n}
    </sup>
  )
}

/** O versículo da aliança - tratado como epígrafe do capítulo. */
function PassagemPrincipal({ passagem }) {
  return (
    <div className="sheet sheet-feature relative px-6 py-8 sm:px-10 sm:py-11">
      <span
        className="absolute left-4 top-3 t-accent opacity-20 pointer-events-none"
        aria-hidden
      >
        <Icon name="quote" size={52} filled />
      </span>

      <div className="relative text-center">
        <p className="kicker">Gravado na nossa aliança</p>
        <h3 className="title-md mt-2.5">{passagem.titulo}</h3>
      </div>

      <div className="relative mt-6 space-y-4 max-w-[54ch] mx-auto">
        {passagem.versiculos.map(({ n, texto }) => (
          <p
            key={n}
            className="font-body text-[1rem] sm:text-[1.0625rem] leading-[1.9] t-ink text-center"
          >
            <NumVerso n={n} />
            {texto}
          </p>
        ))}
      </div>

      {passagem.nota && (
        <div className="relative mt-7 pt-5" style={{ borderTop: '1px solid var(--line)' }}>
          <p className="font-hand text-lg t-accent2 text-center">{passagem.nota}</p>
        </div>
      )}
    </div>
  )
}

function PassagemCard({ passagem }) {
  if (passagem.principal) return <PassagemPrincipal passagem={passagem} />

  if (passagem.tipo === 'destaque') {
    return (
      <div className="sheet h-full px-5 py-6 text-center">
        <p className="kicker">Palavra</p>
        <h3 className="title-sm mt-2">{passagem.titulo}</h3>
        <p className="font-display text-lg sm:text-xl italic leading-[1.55] t-ink mt-4">
          “{passagem.citacao}”
        </p>
        {passagem.reflexao && (
          <p
            className="mt-4 pt-4 text-[0.8125rem] leading-relaxed t-muted"
            style={{ borderTop: '1px solid var(--line-soft)' }}
          >
            {passagem.reflexao}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="sheet h-full px-5 py-6">
      <p className="kicker text-center">Passagem</p>
      <h3 className="title-sm mt-2 text-center">{passagem.titulo}</h3>
      <div
        className="mt-4 space-y-3 pl-4"
        style={{ borderLeft: '2px solid color-mix(in srgb, var(--accent) 45%, transparent)' }}
      >
        {passagem.versiculos.map(({ n, texto }) => (
          <p key={n} className="prose-soft text-[0.875rem]">
            <NumVerso n={n} />
            {texto}
          </p>
        ))}
      </div>
      {passagem.nota && (
        <p className="font-hand text-base t-accent2 text-center mt-4">{passagem.nota}</p>
      )}
    </div>
  )
}

export default function VersiculoSlide() {
  const [expandido, setExpandido] = useState(false)

  return (
    <Slide id="versiculo" scene="scene-linen" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-4xl mx-auto flex flex-col gap-9 allow-select pb-10"
        >
          <ChapterPlate
            id="versiculo"
            icon="cross"
            kicker="Uma palavra pra nós"
            title="Versículos"
            lede="Os trechos que sustentam a nossa história - fé e amor no mesmo lugar."
          />

          <MI>
            <PassagemCard passagem={PASSAGENS_PREVIEW[0]} />
          </MI>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {PASSAGENS_PREVIEW.slice(1).map((p) => (
              <MI key={p.id}>
                <PassagemCard passagem={p} />
              </MI>
            ))}

            <AnimatePresence>
              {expandido &&
                PASSAGENS_OCULTAS.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <PassagemCard passagem={p} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {PASSAGENS_OCULTAS.length > 0 && (
            <div className="flex justify-center">
              <button type="button" onClick={() => setExpandido((v) => !v)} className="btn">
                <Icon name="book" size={15} />
                {expandido ? 'Mostrar menos' : `Ver mais ${PASSAGENS_OCULTAS.length} passagens`}
                <Icon name="chevronDown" size={14} className="chev" data-open={expandido} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </Slide>
  )
}
