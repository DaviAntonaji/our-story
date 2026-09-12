import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, MOTIVOS_TE_AMO } from '../../data/constants'

export default function MotivosSlide() {
  const ultimo = MOTIVOS_TE_AMO.length - 1
  const lista = MOTIVOS_TE_AMO.slice(0, ultimo)
  const fecho = MOTIVOS_TE_AMO[ultimo]

  return (
    <Slide id="motivos" scene="scene-paper" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-4xl mx-auto flex flex-col gap-9 allow-select pb-10"
        >
          <ChapterPlate
            id="motivos"
            icon="butterfly"
            kicker="Para você saber"
            title="100 motivos porque eu te amo"
            lede="Poderia escrever mil. Aqui vão os primeiros cem."
          />

          {/* A lista, escrita como num caderno de duas colunas */}
          <MI v={fadeV} className="w-full">
            <div
              className="sheet px-5 py-4 sm:px-8 sm:py-7 columns-1 md:columns-2 gap-x-10"
              style={{ columnRule: '1px solid var(--line-soft)' }}
            >
              {lista.map((motivo, i) => (
                <div
                  key={i}
                  className="break-inside-avoid flex items-baseline gap-3 py-2"
                  style={{ borderBottom: '1px solid var(--line-soft)' }}
                >
                  <span className="num-marker">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-body text-[0.875rem] leading-[1.6] t-body">{motivo}</span>
                </div>
              ))}
            </div>
          </MI>

          {/* O centésimo, em destaque */}
          <MI v={fadeV}>
            <div className="sheet sheet-feature px-6 py-7 text-center">
              <span className="font-display text-4xl font-semibold t-accent tabular-nums block">
                100
              </span>
              <p className="font-display text-xl sm:text-2xl italic t-ink leading-snug mt-3 max-w-[42ch] mx-auto">
                {fecho}
              </p>
            </div>
          </MI>

          <MI v={fadeV} className="flex items-center justify-center gap-2 t-accent">
            <Icon name="heart" size={14} />
            <span className="font-hand text-xl">e a cada dia a lista cresce</span>
            <Icon name="heart" size={14} />
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
