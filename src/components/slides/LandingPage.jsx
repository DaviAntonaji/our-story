import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import HeartsRain from '../animations/HeartsRain'
import { Sprig, WaxSeal } from '../ui/Ornament'
import Icon from '../ui/Icon'

/** A capa do álbum. Romper o selo abre a história. */
export default function LandingPage({ onReveal }) {
  return (
    <>
      {typeof document !== 'undefined' && createPortal(<HeartsRain />, document.body)}

      <div className="scene-veil relative min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Grão de papel */}
        <span
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('/grain.svg')", backgroundSize: '280px 280px' }}
          aria-hidden
        />

        {/* Ramos nos cantos */}
        <Sprig
          className="sprig hidden sm:block"
          rotate={-8}
          style={{ bottom: '-1rem', left: '-1.5rem', width: '11rem', opacity: 0.2 }}
        />
        <Sprig
          className="sprig hidden sm:block"
          rotate={180}
          style={{ top: '-1rem', right: '-1.5rem', width: '11rem', opacity: 0.2 }}
        />

        {/* Moldura de capa encadernada */}
        <motion.span
          className="pointer-events-none absolute rounded-[4px]"
          style={{
            inset: 'clamp(0.9rem, 3vw, 2rem)',
            border: '1px solid rgba(230, 180, 101, 0.28)',
            boxShadow: 'inset 0 0 0 4px rgba(230, 180, 101, 0.09)',
          }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
          <motion.p
            className="kicker"
            style={{ color: 'rgba(230, 180, 101, 0.8)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Davi &amp; Maysa
          </motion.p>

          <motion.h1
            className="font-display mt-4 leading-[0.95]"
            style={{
              fontSize: 'clamp(42px, 13vw, 64px)',
              color: 'var(--moon-900)',
              letterSpacing: '-0.03em',
              fontWeight: 600,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Nossa
            <br />
            <span className="italic font-normal">História</span>
          </motion.h1>

          <motion.div
            className="flex items-center gap-3 w-full max-w-[15rem] mt-6"
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            aria-hidden
          >
            <span
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(230,180,101,0.45))' }}
            />
            <Icon name="heart" size={13} className="shrink-0" style={{ color: 'rgba(240,162,176,0.9)' }} />
            <span
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(90deg, rgba(230,180,101,0.45), transparent)' }}
            />
          </motion.div>

          <motion.p
            className="font-body italic mt-6 text-[0.9375rem] leading-relaxed"
            style={{ color: 'rgba(251, 243, 238, 0.72)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.58, duration: 0.7 }}
          >
            Uma surpresa especial te espera,
            <br />
            meu bem.
          </motion.p>

          {/* O selo — romper para abrir */}
          <motion.button
            onClick={() => onReveal(true)}
            className="group mt-10 flex flex-col items-center gap-4 outline-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.72, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Romper o selo e abrir a nossa história"
          >
            <motion.span
              animate={{ rotate: [-2.5, 2.5, -2.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="block"
            >
              <WaxSeal />
            </motion.span>
            <span
              className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] transition-colors"
              style={{ color: 'rgba(230, 180, 101, 0.85)' }}
            >
              Romper o selo
            </span>
          </motion.button>

          <motion.p
            className="font-hand mt-6 text-lg"
            style={{ color: 'rgba(240, 162, 176, 0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
          >
            toque para abrir o álbum
          </motion.p>
        </div>
      </div>
    </>
  )
}
