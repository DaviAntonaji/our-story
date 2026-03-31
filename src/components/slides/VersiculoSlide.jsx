import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV } from '../../data/constants'

export default function VersiculoSlide() {
  return (
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
  )
}
