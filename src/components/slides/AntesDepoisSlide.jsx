import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, ANTES_DEPOIS } from '../../data/constants'

function Coluna({ titulo, itens, accent }) {
  return (
    <div className="card-surface p-4 sm:p-5 h-full">
      <h3 className={`font-display text-base sm:text-lg font-semibold mb-3 leading-snug ${accent}`}>
        {titulo}
      </h3>
      <ul className="space-y-2.5 text-[13px] sm:text-sm text-rose-200/85 leading-relaxed">
        {itens.map((texto) => (
          <li key={texto} className="flex gap-2.5">
            <span className="text-amber-400/65 shrink-0 select-none" aria-hidden>
              •
            </span>
            <span>{texto}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AntesDepoisSlide() {
  const d = ANTES_DEPOIS
  return (
    <Slide id="antesdepois" bg="slide-bg-forest" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-5 w-full max-w-2xl mx-auto allow-select pb-14"
        >
          <div className="text-center">
            <MI v={fadeV} className="chapter-label">
              Eu &amp; nós
            </MI>
            <MI className="mt-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">
                Antes &amp; depois
              </h2>
            </MI>
            <MI v={fadeV}>
              <p className="text-rose-200/55 text-xs mt-1.5 max-w-md mx-auto">
                Do automático ao propósito - com você no caminho
              </p>
            </MI>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <MI>
              <Coluna titulo={d.antesTitulo} itens={d.antes} accent="text-rose-200/95" />
            </MI>
            <MI>
              <Coluna titulo={d.depoisTitulo} itens={d.depois} accent="text-amber-200/95" />
            </MI>
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
