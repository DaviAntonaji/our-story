import { useState } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV, NOME_ELA_COMPLETO } from '../../data/constants'

const DATA_CASAMENTO = ''

export default function FinalSlide() {
  const [mensagemRevelada, setMensagemRevelada] = useState(false)
  const inicioProximoCapitulo = DATA_CASAMENTO || '__/__/____'

  return (
    <Slide id="final" bg="slide-bg-final">
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-5 text-center w-full max-w-md lg:max-w-2xl mx-auto"
        >
          <MI v={fadeV} className="chapter-label">Capítulo 1 de muitos</MI>
          <MI v={scaleV} className="flex gap-3 text-4xl sm:text-5xl">
            <span className="float-emoji" style={{ animationDelay: '0s' }}>💕</span>
            <span className="float-emoji" style={{ animationDelay: '0.45s' }}>❤️</span>
            <span className="float-emoji" style={{ animationDelay: '0.9s' }}>💗</span>
          </MI>
          <MI
            v={scaleV}
            className="relative w-full overflow-hidden rounded-[28px] border border-amber-300/40 bg-gradient-to-br from-rose-950/85 via-rose-900/75 to-amber-950/45 p-5 sm:p-6 shadow-[0_0_38px_rgba(212,175,55,0.22)]"
          >
            <div className="absolute -top-16 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-rose-300/15 blur-3xl" />

            <div className="relative space-y-4">
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
              <p className="chapter-label text-amber-200/80">O fim do começo</p>
              <div className="space-y-2">
                <p className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-rose-50">
                  Esse foi só o nosso Capítulo 1.
                </p>
                <p className="text-rose-100/85 text-base sm:text-lg leading-relaxed">
                  A gente continua escrevendo a nossa história todos os dias, com amor e com Deus no centro.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200/25 bg-amber-200/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/70">Próximo capítulo</p>
                <p className="mt-1 font-display text-xl sm:text-2xl font-semibold text-amber-100">
                  Nosso casamento
                </p>
                <p className="mt-2 text-rose-100/80 text-sm sm:text-base">
                  Já está sendo sonhado, orado e preparado. Em breve, ele começa em:
                </p>
                <p className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-wide text-rose-50">
                  {inicioProximoCapitulo}
                </p>
              </div>

              <p className="font-display text-lg sm:text-xl text-rose-100/90 italic">
                E assim continua...
              </p>
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
            </div>
          </MI>
          <MI>
            <p className="font-display font-semibold text-rose-50 leading-tight whitespace-nowrap" style={{ fontSize: 'clamp(22px, 6vw, 40px)' }}>
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
