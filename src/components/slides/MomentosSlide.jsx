import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, FOTOS } from '../../data/constants'

export default function MomentosSlide() {
  const [fotoAtual, setFotoAtual] = useState(0)
  const touchStartX = useRef(0)
  const timerKeyRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => setFotoAtual(i => (i + 1) % FOTOS.length), 7000)
    return () => clearInterval(id)
  }, [timerKeyRef.current])

  const irParaFoto = (i) => { setFotoAtual(i); timerKeyRef.current++ }
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) >= 50) irParaFoto(diff > 0 ? (fotoAtual + 1) % FOTOS.length : (fotoAtual - 1 + FOTOS.length) % FOTOS.length)
  }

  return (
    <Slide id="momentos" bg="slide-bg-dark">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-4 w-full mx-auto"
        >
          <div className="text-center">
            <MI v={fadeV} className="chapter-label">Nossas memórias</MI>
            <MI className="mt-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Momentos 📸</h2>
            </MI>
          </div>
          <MI className="w-full">
            <div
              className="relative rounded-[16px] overflow-hidden card-surface w-full"
              style={{ height: 'min(55vh, 420px)' }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="carousel-counter">{fotoAtual + 1} / {FOTOS.length}</div>
              <button onClick={() => irParaFoto((fotoAtual - 1 + FOTOS.length) % FOTOS.length)}
                className="absolute left-2 z-10 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 border border-white/15"
                aria-label="Anterior">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={() => irParaFoto((fotoAtual + 1) % FOTOS.length)}
                className="absolute right-2 z-10 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 border border-white/15"
                aria-label="Próxima">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={fotoAtual}
                    src={FOTOS[fotoAtual]}
                    alt={`Momento ${fotoAtual + 1}`}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, min(640px, 90vw)"
                    className="h-auto max-h-full w-auto max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {FOTOS.map((_, i) => (
                  <button key={i} onClick={() => irParaFoto(i)}
                    className={`rounded-full transition-all duration-200 ${i === fotoAtual ? 'bg-amber-400 w-4 h-1.5' : 'bg-white/30 w-1.5 h-1.5'}`}
                  />
                ))}
              </div>
            </div>
          </MI>
          <MI v={fadeV} className="text-rose-300/55 text-xs text-center">← deslize para navegar →</MI>
        </motion.div>
      )}
    </Slide>
  )
}
