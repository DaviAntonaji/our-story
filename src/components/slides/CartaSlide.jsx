import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { WaxSeal } from '../ui/Ornament'
import { staggerV, fadeV, upV } from '../../data/constants'

const PARAGRAFOS = [
  'falar de você nunca é simples pra mim. não é só sobre gostar, não é só sobre estar junto… é algo muito mais profundo do que eu consigo colocar em palavras.',
  'desde que você entrou na minha vida, alguma coisa mudou dentro de mim. é como se Deus tivesse, com todo cuidado, colocado você exatamente no meu caminho. eu vejo Cristo em você - no seu jeito, no seu coração, na sua pureza - e isso é uma das coisas que mais me encanta.',
  'você não faz ideia do quanto me faz bem. só de pensar em você, eu já fico melhor. seu sorriso tem um poder absurdo de mudar o meu dia, e a sua presença… é um lugar onde eu sinto paz.',
  'você me aproxima de Deus. me inspira a ser melhor, mais firme, mais parecido com o que Ele espera de mim. e eu quero cuidar de você - te proteger, estar ao seu lado em todos os momentos… e construir uma vida inteira com você.',
  'eu sou profundamente grato a Deus por você. todos os dias.',
  'e com todo meu coração… eu te amo mais do que consigo explicar.',
]

export default function CartaSlide() {
  return (
    <Slide id="carta" scene="scene-letter" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-2xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="carta"
            icon="envelope"
            kicker="Uma carta pra você"
            title="Escrita à mão, no coração"
            lede="Guardei essas palavras por muito tempo antes de te entregar."
          />

          {/* A carta */}
          <MI v={upV} className="w-full allow-select">
            <motion.article
              className="letter-paper letter-paper--ruled relative pl-11 pr-6 pt-9 pb-14 sm:pl-20 sm:pr-12 sm:pt-12 sm:pb-16"
              initial={{ rotate: -0.5 }}
              whileInView={{ rotate: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Cabeçalho da carta */}
              <header className="relative mb-6">
                <p className="font-sans text-[0.5625rem] uppercase tracking-[0.22em] text-right" style={{ color: 'rgba(124, 90, 60, 0.6)' }}>
                  Pirapozinho, 2026
                </p>
                <p className="font-display text-3xl sm:text-4xl italic mt-3" style={{ color: '#7d2e40' }}>
                  Maysa,
                </p>
              </header>

              <div className="letter-body relative">
                {PARAGRAFOS.map((p, i) => (
                  <p key={i} className={i > 0 ? 'mt-0' : ''}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Assinatura */}
              <footer className="relative mt-10 flex items-end justify-between gap-6">
                <div className="hidden sm:block">
                  <WaxSeal style={{ width: '4rem', height: '4rem' }} />
                </div>
                <div className="text-right ml-auto">
                  <p className="font-body italic text-sm" style={{ color: 'rgba(96, 70, 78, 0.75)' }}>
                    com todo o meu amor,
                  </p>
                  <p className="letter-signature mt-1">Davi</p>
                </div>
              </footer>

              {/* Canto dobrado */}
              <span
                className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
                style={{ background: 'linear-gradient(225deg, rgba(124, 90, 60, 0.14) 50%, transparent 50%)' }}
                aria-hidden
              />
            </motion.article>
          </MI>

          <MI v={fadeV} className="flex items-center justify-center gap-2.5 t-accent">
            <Icon name="heart" size={16} style={{ animation: 'heartBeatSoft 2.6s ease-in-out infinite' }} />
            <span className="font-hand text-xl">reli isso umas mil vezes antes de te mostrar</span>
            <Icon name="heart" size={16} style={{ animation: 'heartBeatSoft 2.6s ease-in-out infinite 0.4s' }} />
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
