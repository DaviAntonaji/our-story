import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV } from '../../data/constants'

export default function CartaSlide() {
  return (
    <Slide id="carta" bg="slide-bg-amber">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-6 text-center w-full max-w-sm mx-auto"
        >
          <MI v={fadeV} className="chapter-label">Uma carta pra você</MI>
          <MI v={scaleV} className="text-4xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>💌</MI>
          <MI className="space-y-4 text-left w-full card-surface p-5 rounded-2xl allow-select">
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-100/95">Maysa,</p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu fico até sem saber por onde começar… porque falar de você nunca é simples pra mim. não é só sobre gostar, não é só sobre estar junto… é algo muito mais profundo, muito mais verdadeiro.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              desde o momento que você entrou na minha vida, alguma coisa mudou dentro de mim. é como se tudo tivesse ficado mais leve, mais bonito… como se Deus tivesse, com todo cuidado, colocado você exatamente no meu caminho.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu vejo Cristo em você, no seu jeito de falar, no seu coração, na sua sensibilidade, na forma como você se importa com as pessoas, na sua pureza… e isso é uma das coisas que mais me encanta.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              você não faz ideia do quanto me faz bem. só de pensar em você, eu já fico melhor. seu sorriso tem um poder absurdo de mudar o meu dia, sua voz me acalma, e sua presença… a sua presença é um lugar onde eu sinto paz.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu amo cada detalhe seu. amo seu jeitinho, amo suas manias, amo quando você ri, amo quando você fala comigo, amo até quando você fica meio quietinha… porque em tudo isso eu vejo você sendo exatamente quem é.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              e quanto mais eu te conheço, mais eu tenho certeza de uma coisa… eu não quero só momentos com você. eu quero uma vida inteira ao seu lado.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu oro por nós. oro pelo nosso relacionamento, pelo nosso futuro… e, no meu coração, existe um desejo muito sincero de viver tudo isso com você. de te ter como minha companheira, minha parceira, minha futura esposa.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu consigo me imaginar construindo uma vida com você, enfrentando dias difíceis juntos, comemorando conquistas, crescendo espiritualmente lado a lado… formando uma família, cuidando dos nossos filhos, ensinando eles sobre Deus, sobre amor, sobre caráter.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              e não é algo distante ou vazio… é um desejo real, que nasce de tudo que eu vejo em você e de tudo que você já representa na minha vida hoje.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              você me aproxima de Deus. você me inspira a ser melhor, a crescer, a me tornar um homem mais firme, mais responsável, mais parecido com aquilo que Deus espera de mim.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              e eu quero cuidar de você. quero te proteger, te apoiar, estar ao seu lado em todos os momentos… ser alguém que soma na sua vida, que te faz bem assim como você me faz.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              talvez eu não consiga colocar tudo em palavras, porque o que eu sinto vai muito além disso… mas se existe uma coisa que você precisa saber é:
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu sou profundamente grato a Deus por você. todos os dias.
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              e com todo meu coração…
            </p>
            <p className="font-body text-base sm:text-lg leading-[1.9] italic text-rose-200/90">
              eu te amo mais do que consigo explicar.
            </p>
          </MI>
          <MI v={fadeV} className="text-2xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite 0.5s' }}>💕</MI>
        </motion.div>
      )}
    </Slide>
  )
}
