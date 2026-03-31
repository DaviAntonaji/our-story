import { useState } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV, SPOTIFY_URLS } from '../../data/constants'

export default function MusicaSlide() {
  const [musicaRevelada, setMusicaRevelada] = useState(false)

  return (
    <Slide id="musica" bg="slide-bg-purple">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
        >
          <MI v={fadeV} className="chapter-label">A nossa trilha sonora</MI>
          <MI v={scaleV} className="text-5xl sm:text-6xl">🎵</MI>
          <MI className="space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Nossas Músicas</h2>
            <p className="text-rose-200/65 text-sm">A trilha sonora do nosso amor 💕</p>
          </MI>
          <MI className="w-full">
            {!musicaRevelada ? (
              <button
                onClick={() => setMusicaRevelada(true)}
                className="w-full flex flex-col items-center gap-3 py-6 px-4 rounded-2xl card-surface border border-amber-400/20"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-amber-400/40 text-rose-100 text-sm font-medium">
                  <span>▶</span> Ouvir nossas músicas
                </span>
              </button>
            ) : (
              <div className="w-full flex flex-col gap-4">
                {SPOTIFY_URLS.map((url, i) => (
                  <div key={i} className="w-full rounded-2xl overflow-hidden card-surface">
                    <div className="relative w-full" style={{ paddingBottom: '80%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        style={{ minHeight: 260 }}
                        src={url}
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`Nossa música ${i + 1}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
