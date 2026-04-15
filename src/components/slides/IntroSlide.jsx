import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV } from '../../data/constants'

export default function IntroSlide() {
  return (
    <Slide id="intro" bg="slide-bg-rose">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
        >
          <MI v={fadeV} className="chapter-label">Nossa história</MI>
          <MI v={scaleV} className="flex gap-3 text-4xl">
            <span style={{ animation: 'heartBeat 1.5s ease-in-out infinite' }}>❤️</span>
            <span style={{ animation: 'heartBeat 1.5s ease-in-out infinite 0.3s' }}>❤️</span>
            <span style={{ animation: 'heartBeat 1.5s ease-in-out infinite 0.6s' }}>❤️</span>
          </MI>
          <MI className="photo-frame w-full max-w-[200px] sm:max-w-[240px] mx-auto">
            <div className="aspect-[3/4] overflow-hidden rounded-[18px]">
              <img
                src="/imgs/photos/15.jpg"
                alt="Nós dois"
                width={600}
                height={800}
                sizes="(max-width: 640px) 200px, 240px"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </MI>
          <MI className="space-y-1">
            <h1 className="text-hero font-display font-semibold text-rose-50">Para você, Maysa <span className="inline-block animate-heartBeat">❤️</span></h1>
            <p className="font-display text-xl text-rose-200/85">Amor da minha vida</p>
          </MI>
          <MI>
            <span className="badge-pill">🌹 Juntos desde 04 de março de 2026</span>
          </MI>
          <MI v={fadeV} className="flex items-center gap-2 text-xl mt-1">
            <span className="float-emoji opacity-80" style={{ animationDelay: '0s' }}>✨</span>
            <span className="float-emoji opacity-70" style={{ animationDelay: '0.5s' }}>🦋</span>
            <span className="float-emoji opacity-90" style={{ animationDelay: '0.2s' }}>🌹</span>
            <span className="float-emoji opacity-80" style={{ animationDelay: '0.7s' }}>✨</span>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
