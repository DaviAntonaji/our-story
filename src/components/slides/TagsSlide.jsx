import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV } from '../../data/constants'

export default function TagsSlide() {
  return (
    <Slide id="tags" bg="slide-bg-magenta">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto"
        >
          <div className="text-center">
            <MI v={fadeV} className="chapter-label">Sobre você</MI>
            <MI className="mt-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">
                Coisas que amo em você ❤️
              </h2>
            </MI>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            {[
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
            ].map(([emoji, text]) => (
              <MI key={text} className="h-full">
                <div className="tag-item h-full">
                  <span className="text-lg shrink-0">{emoji}</span>
                  <span className="text-sm leading-snug">{text}</span>
                </div>
              </MI>
            ))}
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
