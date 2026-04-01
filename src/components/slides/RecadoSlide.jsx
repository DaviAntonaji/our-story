import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import RecadoForm from '../recados/RecadoForm'
import { fadeV, staggerV, upV } from '../../data/constants'

export default function RecadoSlide() {
  return (
    <Slide id="recado" bg="slide-bg-magenta">
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-6 text-center w-full max-w-lg mx-auto"
        >
          <MI v={fadeV} className="chapter-label">
            Um recadinho
          </MI>
          <MI v={upV} className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl text-rose-50 leading-tight">
              Quer deixar um recado pra gente?
            </h2>
            <p className="text-rose-200/75 text-sm sm:text-base max-w-md mx-auto">
              Se você chegou até aqui como amigo, família ou visitante: fique à vontade. Conto essa história do meu jeito,
              e adoramos saber que passaram por aqui.
            </p>
          </MI>
          <MI v={upV} className="w-full card-surface p-5 sm:p-6 card-gold-border">
            <RecadoForm />
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
