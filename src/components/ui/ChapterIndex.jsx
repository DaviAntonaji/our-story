import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'
import { SLIDE_IDS, CAPITULOS, ROMANOS } from '../../data/constants'

/** Marcador de livro flutuante que abre o sumário do álbum. */
export default function ChapterIndex({ activeSlide, setActiveSlide }) {
  const [aberto, setAberto] = useState(false)

  const irPara = (idx) => {
    const id = SLIDE_IDS[idx]
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setActiveSlide(idx)
    }
    setAberto(false)
  }

  return (
    <>
      <button
        onClick={() => setAberto((v) => !v)}
        className="index-btn"
        data-open={aberto}
        title="Sumário dos capítulos"
        aria-label="Sumário dos capítulos"
        aria-expanded={aberto}
      >
        <Icon name={aberto ? 'close' : 'bookmark'} size={18} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {aberto && (
          <div
            className="fixed inset-0 z-[295]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setAberto(false)
            }}
          >
            <motion.div
              className="index-panel"
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            >
              <div className="index-panel__head">
                <p className="kicker">Sumário</p>
                <button
                  onClick={() => setAberto(false)}
                  className="t-faint hover:t-body transition-colors"
                  aria-label="Fechar sumário"
                >
                  <Icon name="close" size={14} strokeWidth={1.6} />
                </button>
              </div>

              <div className="index-panel__list scroll-thin">
                {SLIDE_IDS.map((id, idx) => {
                  const cap = CAPITULOS[id]
                  return (
                    <button
                      key={id}
                      onClick={() => irPara(idx)}
                      className={`index-panel__item ${activeSlide === idx ? 'active' : ''}`}
                    >
                      <span className="index-panel__num">{ROMANOS[idx + 1]}</span>
                      <span className="flex-1">{cap?.label ?? id}</span>
                      {cap?.icon && (
                        <span className="opacity-50 shrink-0 self-center">
                          <Icon name={cap.icon} size={13} strokeWidth={1.4} />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
