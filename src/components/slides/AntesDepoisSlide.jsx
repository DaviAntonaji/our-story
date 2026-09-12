import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, ANTES_DEPOIS } from '../../data/constants'

/**
 * Díptico: a coluna "antes" é propositalmente mais apagada; a "depois",
 * cheia de tinta. A diferença de contraste conta a história sozinha.
 */
function Coluna({ titulo, itens, icon, tom }) {
  const antes = tom === 'antes'
  return (
    <div
      className={`relative h-full px-5 py-6 sm:px-6 sm:py-7 rounded-[18px] ${
        antes ? 'sheet-quiet' : 'sheet sheet-feature'
      }`}
      style={antes ? { opacity: 0.82 } : undefined}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
          style={{
            borderColor: antes ? 'var(--line)' : 'color-mix(in srgb, var(--accent) 34%, transparent)',
            background: antes ? 'transparent' : 'color-mix(in srgb, var(--accent) 10%, transparent)',
            color: antes ? 'var(--ink-4)' : 'var(--accent)',
          }}
        >
          <Icon name={icon} size={17} strokeWidth={1.35} />
        </span>
        <h3 className="title-sm" style={antes ? { color: 'var(--ink-3)' } : undefined}>
          {titulo}
        </h3>
      </div>

      <ul className="space-y-3.5">
        {itens.map((texto) => (
          <li key={texto} className="flex gap-3 items-start">
            <span
              className="mt-[0.5em] h-1 w-1 rounded-full shrink-0"
              style={{ background: antes ? 'var(--ink-4)' : 'var(--accent)' }}
              aria-hidden
            />
            <span
              className="font-body text-[0.875rem] leading-[1.7]"
              style={{ color: antes ? 'var(--ink-3)' : 'var(--ink-2)' }}
            >
              {texto}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AntesDepoisSlide() {
  const d = ANTES_DEPOIS
  return (
    <Slide id="antesdepois" scene="scene-sage" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-4xl mx-auto flex flex-col gap-9 allow-select pb-10"
        >
          <ChapterPlate
            id="antesdepois"
            icon="moon"
            kicker="Eu & nós"
            title="Antes & depois"
            lede="Do automático ao propósito - com você no caminho."
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
            {/* Fronteira entre os dois tempos */}
            <div
              className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center z-10 pointer-events-none"
              aria-hidden
            >
              <span
                className="flex-1 w-px"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--line))' }}
              />
              <span
                className="h-9 w-9 rounded-full flex items-center justify-center t-accent"
                style={{
                  background: 'var(--surface-solid)',
                  border: '1px solid color-mix(in srgb, var(--accent) 32%, transparent)',
                  boxShadow: 'var(--shadow-1)',
                }}
              >
                <Icon name="arrowRight" size={15} strokeWidth={1.5} />
              </span>
              <span
                className="flex-1 w-px"
                style={{ background: 'linear-gradient(to bottom, var(--line), transparent)' }}
              />
            </div>

            <MI>
              <Coluna titulo={d.antesTitulo} itens={d.antes} icon="moon" tom="antes" />
            </MI>
            <MI>
              <Coluna titulo={d.depoisTitulo} itens={d.depois} icon="sunrise" tom="depois" />
            </MI>
          </div>

          <MI v={fadeV} className="text-center">
            <p className="font-hand text-xl t-accent">
              você não mudou a minha vida - você deu sentido a ela
            </p>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
