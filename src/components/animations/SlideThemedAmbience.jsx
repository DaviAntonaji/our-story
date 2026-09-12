import { motion, AnimatePresence } from 'framer-motion'
import Shape from './Shapes'
import { SLIDE_AMBIENCE } from '../../data/constants'

/**
 * Ambiência do capítulo ativo: pétalas, folhas ou notas descendo devagar,
 * na cor do capítulo. Troca com crossfade quando o capítulo muda.
 */
export default function SlideThemedAmbience({ activeIndex, isMobile }) {
  const cfg = SLIDE_AMBIENCE[activeIndex] ?? SLIDE_AMBIENCE[0]
  const slots = isMobile
    ? [
        { l: '16%', d: '-6s', dur: 34, size: 17 },
        { l: '81%', d: '-21s', dur: 41, size: 14 },
      ]
    : [
        { l: '7%', d: '-4s', dur: 33, size: 19 },
        { l: '34%', d: '-17s', dur: 39, size: 15 },
        { l: '61%', d: '-10s', dur: 36, size: 17 },
        { l: '90%', d: '-25s', dur: 43, size: 14 },
      ]

  return (
    <div className="slide-themed-ambience fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden>
      <AnimatePresence mode="sync">
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ color: cfg.tint }}
        >
          {slots.map((s, i) => (
            <span
              key={`${activeIndex}-${i}`}
              className="slide-themed-ambience-emoji"
              style={{
                left: s.l,
                top: '-28px',
                animationDelay: s.d,
                animationDuration: `${s.dur}s`,
              }}
            >
              <Shape name={cfg.shape} size={s.size} />
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
