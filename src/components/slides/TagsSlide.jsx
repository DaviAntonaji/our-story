import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV } from '../../data/constants'

const COISAS = [
  ['✝️', 'Seu amor por Deus'],
  ['💕', 'O jeito que você cuida de mim'],
  ['🕊️', 'A paz que sinto ao seu lado'],
  ['💪', 'Como você me incentiva'],
  ['❤️', 'Seu jeito de demonstrar amor'],
  ['✨', 'Como você torna tudo leve'],
  ['👀', 'Seu olhar quando me vê'],
  ['💗', 'Seu coração bondoso'],
  ['😊', 'Seu sorriso e sua risada'],
  ['🌹', 'Seu jeito único de ser'],
  ['🫂', 'Seu abraço, que parece casa'],
  ['🙏', 'Suas orações por mim'],
]

/** Rotação determinística — parece espalhado à mão, mas é estável. */
function giro(i) {
  const v = Math.sin(i * 5.77 + 1.13) * 43758.5453
  return ((v - Math.floor(v)) - 0.5) * 4.4
}

export default function TagsSlide() {
  return (
    <Slide id="tags" scene="scene-blush" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-4xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="tags"
            icon="sparkle"
            kicker="Sobre você"
            title="Coisas que eu amo em você"
            lede="Colei aqui como quem cola adesivos numa página favorita."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full">
            {COISAS.map(([emoji, text], i) => (
              <MI key={text}>
                <motion.div
                  className="sheet h-full flex items-center gap-3.5 px-4 py-4"
                  style={{ rotate: `${giro(i)}deg` }}
                  whileHover={{ rotate: 0, y: -3, transition: { duration: 0.25 } }}
                >
                  <span className="row-glyph text-[1.0625rem]" aria-hidden>
                    {emoji}
                  </span>
                  <span className="font-body text-[0.875rem] leading-snug t-body">{text}</span>
                </motion.div>
              </MI>
            ))}
          </div>

          <MI v={fadeV} className="text-center">
            <p className="font-hand text-xl t-accent">e essa lista nunca para de crescer</p>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
