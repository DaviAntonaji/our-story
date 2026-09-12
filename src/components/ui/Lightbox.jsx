import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import Icon from './Icon'
import { useLightbox } from '../../context/LightboxContext'

/** "…/pedido_namoro/3.jpg" → "Pedido namoro" */
function legenda(src) {
  const pasta = String(src).split('/').at(-2) ?? ''
  return pasta
    .replace(/^\d+x?[_-]?/, '')
    .replace(/[_-]/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())
}

export default function Lightbox() {
  const { aberto, fotos, idx, fechar, avancar, voltar, irPara } = useLightbox()
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  // Trava scroll do body quando aberto
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [aberto])

  // Teclado: ← → Esc
  useEffect(() => {
    if (!aberto) return
    const handle = (e) => {
      if (e.key === 'ArrowRight') avancar()
      if (e.key === 'ArrowLeft')  voltar()
      if (e.key === 'Escape')     fechar()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [aberto, avancar, voltar, fechar])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)
    if (Math.abs(dx) > 48 && Math.abs(dx) > dy) {
      dx > 0 ? avancar() : voltar()
    }
  }

  if (typeof document === 'undefined') return null

  const label = aberto && fotos[idx] ? legenda(fotos[idx]) : ''

  return createPortal(
    <AnimatePresence>
      {aberto && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="lb-surface fixed inset-0 z-[500] flex flex-col select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Barra superior */}
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 shrink-0">
            <div className="min-w-0">
              {label && (
                <p className="font-hand text-lg text-white/70 truncate leading-tight">{label}</p>
              )}
              {fotos.length > 1 && (
                <p className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-white/30 tabular-nums mt-0.5">
                  {idx + 1} de {fotos.length}
                </p>
              )}
            </div>
            <button onClick={fechar} className="lb-btn w-9 h-9 shrink-0" aria-label="Fechar">
              <Icon name="close" size={17} strokeWidth={1.8} />
            </button>
          </div>

          {/* Imagem */}
          <div className="flex-1 flex items-center justify-center min-h-0 px-3">
            <AnimatePresence mode="wait">
              <motion.img
                key={`lb-${idx}`}
                src={fotos[idx]}
                alt={label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="max-w-full w-auto h-auto object-contain rounded-[3px] pointer-events-none"
                style={{
                  maxHeight: 'calc(100dvh - 150px)',
                  boxShadow: '0 30px 80px -24px rgba(0,0,0,0.9)',
                }}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div
            className="flex items-center justify-between gap-3 px-4 sm:px-6 pt-3 pb-6 shrink-0"
            style={{ minHeight: 78 }}
          >
            {fotos.length > 1 ? (
              <>
                <button onClick={voltar} className="lb-btn w-12 h-12" aria-label="Anterior">
                  <Icon name="chevronLeft" size={19} strokeWidth={1.8} />
                </button>

                {fotos.length <= 8 ? (
                  <div className="flex gap-1.5 items-center">
                    {fotos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => irPara(i)}
                        className="rounded-full transition-all duration-200"
                        style={{
                          width: i === idx ? 18 : 6,
                          height: 6,
                          background: i === idx ? '#e6b465' : 'rgba(255,255,255,0.26)',
                        }}
                        aria-label={`Foto ${i + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div />
                )}

                <button onClick={avancar} className="lb-btn w-12 h-12" aria-label="Próxima">
                  <Icon name="chevronRight" size={19} strokeWidth={1.8} />
                </button>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <button
                  onClick={fechar}
                  className="font-sans text-[0.625rem] uppercase tracking-[0.22em] text-white/35 hover:text-white/70 transition-colors"
                >
                  fechar
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
