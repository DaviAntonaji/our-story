import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV } from '../../data/constants'

export default function CartaSlide() {
  return (
    <Slide id="carta" bg="slide-bg-amber">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-6 text-center w-full max-w-sm lg:max-w-xl mx-auto"
        >
          <MI v={fadeV} className="chapter-label">Uma carta pra você</MI>
          <MI v={scaleV} className="text-4xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>💌</MI>
          <MI className="space-y-4 text-left w-full card-surface p-5 rounded-2xl allow-select">
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-100/95">Maysa,</p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              falar de você nunca é simples pra mim. não é só sobre gostar, não é só sobre estar junto… é algo muito mais profundo do que eu consigo colocar em palavras.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              desde que você entrou na minha vida, alguma coisa mudou dentro de mim. é como se Deus tivesse, com todo cuidado, colocado você exatamente no meu caminho. eu vejo Cristo em você - no seu jeito, no seu coração, na sua pureza - e isso é uma das coisas que mais me encanta.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              você não faz ideia do quanto me faz bem. só de pensar em você, eu já fico melhor. seu sorriso tem um poder absurdo de mudar o meu dia, e a sua presença… é um lugar onde eu sinto paz.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              você me aproxima de Deus. me inspira a ser melhor, mais firme, mais parecido com o que Ele espera de mim. e eu quero cuidar de você - te proteger, estar ao seu lado em todos os momentos… e construir uma vida inteira com você.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu sou profundamente grato a Deus por você. todos os dias.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              e com todo meu coração… eu te amo mais do que consigo explicar.
            </p>
          </MI>
          <MI v={fadeV} className="text-2xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite 0.5s' }}>💕</MI>
        </motion.div>
      )}
    </Slide>
  )
}
