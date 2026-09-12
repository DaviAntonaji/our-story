import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, scaleV, SPOTIFY_URLS } from '../../data/constants'

const VISIVEIS = 4
const URLS_PREVIEW = SPOTIFY_URLS.slice(0, VISIVEIS)
const URLS_OCULTAS = SPOTIFY_URLS.slice(VISIVEIS)

/** Player compacto do Spotify numa moldura de disco. */
function Faixa({ url, idx }) {
  return (
    <div className="sheet overflow-hidden rounded-[16px]" style={{ padding: 6 }}>
      <div className="flex items-center gap-2 px-2 pt-1 pb-2">
        <span className="font-display text-[0.6875rem] tabular-nums t-faint tracking-[0.14em]">
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(90deg, var(--line), transparent)' }}
        />
      </div>
      <iframe
        className="w-full block rounded-xl"
        style={{ height: 152, border: 0, colorScheme: 'normal' }}
        src={url}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Nossa música ${idx + 1}`}
      />
    </div>
  )
}

/** Disco de vinil desenhado — o convite para tocar. */
function Vinil() {
  return (
    <svg viewBox="0 0 120 120" width="88" height="88" aria-hidden focusable="false">
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {[46, 38, 30, 22].map((r) => (
        <circle key={r} cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
      ))}
      <circle cx="60" cy="60" r="14" fill="currentColor" opacity="0.14" />
      <circle cx="60" cy="60" r="3.4" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

export default function MusicaSlide() {
  const [musicaRevelada, setMusicaRevelada] = useState(false)
  const [expandido, setExpandido] = useState(false)

  return (
    <Slide id="musica" scene="scene-dark scene-violet" center={!musicaRevelada}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-3xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="musica"
            icon="music"
            kicker="A nossa trilha sonora"
            title="Nossas músicas"
            lede="As canções que a gente já gastou de tanto ouvir juntos."
          />

          {!musicaRevelada ? (
            <MI v={scaleV} className="flex justify-center">
              <button
                onClick={() => setMusicaRevelada(true)}
                className="sheet sheet-lift group flex flex-col items-center gap-5 px-10 py-9 rounded-[22px]"
              >
                <motion.span
                  className="t-accent2 block"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                >
                  <Vinil />
                </motion.span>
                <span className="btn pointer-events-none">
                  <Icon name="music" size={15} />
                  Tocar nossas músicas
                </span>
                <span className="font-hand text-lg t-muted">
                  {SPOTIFY_URLS.length} faixas esperando por você
                </span>
              </button>
            </MI>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {URLS_PREVIEW.map((url, i) => (
                  <MI key={i}>
                    <Faixa url={url} idx={i} />
                  </MI>
                ))}

                <AnimatePresence>
                  {expandido &&
                    URLS_OCULTAS.map((url, i) => (
                      <motion.div
                        key={VISIVEIS + i}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <Faixa url={url} idx={VISIVEIS + i} />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {URLS_OCULTAS.length > 0 && (
                <div className="flex justify-center pt-2">
                  <button type="button" onClick={() => setExpandido((v) => !v)} className="btn">
                    <Icon name="sparkle" size={15} />
                    {expandido ? 'Mostrar menos' : `Ver mais ${URLS_OCULTAS.length} músicas`}
                    <Icon name="chevronDown" size={14} className="chev" data-open={expandido} />
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </Slide>
  )
}
