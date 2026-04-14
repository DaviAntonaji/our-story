import { useState } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV, NOME_ELA_COMPLETO } from '../../data/constants'

export default function FinalSlide() {
  const [mensagemRevelada, setMensagemRevelada] = useState(false)

  return (
    <Slide id="final" bg="slide-bg-final">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
        >
          <MI v={fadeV} className="chapter-label">Capítulo 1 de muitos</MI>
          <MI v={scaleV} className="flex gap-3 text-4xl sm:text-5xl">
            <span className="float-emoji" style={{ animationDelay: '0s' }}>💕</span>
            <span className="float-emoji" style={{ animationDelay: '0.45s' }}>❤️</span>
            <span className="float-emoji" style={{ animationDelay: '0.9s' }}>💗</span>
          </MI>
          <MI className="space-y-2">
            <p className="text-rose-200/80 text-base sm:text-lg">A gente continua escrevendo a nossa história todos os dias, com amor e com Deus no centro.</p>
            <p className="font-display text-lg sm:text-xl text-rose-200/90 italic">E assim continua...</p>
          </MI>
          <MI>
            <p className="font-display font-semibold text-rose-50 leading-tight" style={{ fontSize: 'clamp(26px, 7.5vw, 44px)' }}>
              Te amo para sempre, Maysa <span className="inline-block animate-heartBeat">♥</span>
            </p>
          </MI>
          <MI v={fadeV}>
            <p className="text-amber-200/80 text-base flex items-center justify-center gap-2 flex-wrap">
              <span>🌹</span> Sempre contigo, amor{' '}
              <span className="float-emoji inline-block text-sm" style={{ animationDelay: '0.3s' }}>🦋</span>{' '}
              <span>🌹</span>
            </p>
          </MI>
          <MI v={scaleV} className="text-3xl" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>💝</MI>
          <MI className="w-full">
            {!mensagemRevelada ? (
              <button
                onClick={() => setMensagemRevelada(true)}
                className="text-rose-300/70 hover:text-rose-200 text-sm underline underline-offset-4 transition-colors"
              >
                Clique aqui se você chegou até o fim ❤️
              </button>
            ) : (
              <div className="card-surface p-5 w-full space-y-3 card-gold-border">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
                <p className="text-rose-100 text-base italic font-body">Obrigado por viver essa história comigo.</p>
                <p className="text-rose-200 font-medium text-sm">Você é o amor que eu sempre sonhei.</p>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
              </div>
            )}
          </MI>
          <MI v={fadeV} className="text-rose-400/45 text-xs flex items-center justify-center gap-1.5 flex-wrap mt-2">
            <span>Feito com muito</span> <span>☕</span> <span>e amor por Davi Antonaji</span>
            <span className="text-rose-300/40">(seu amor)</span>
          </MI>
          <MI v={fadeV} className="text-rose-500/40 text-[10px] sm:text-xs mt-3">
            © {new Date().getFullYear() === 2026 ? '2026' : `2026–${new Date().getFullYear()}`} Davi de Melo Antonaji e {NOME_ELA_COMPLETO}. Todos os direitos reservados.
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
