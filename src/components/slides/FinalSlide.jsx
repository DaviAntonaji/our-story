import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import { Monogram, LeafRule } from '../ui/Ornament'
import { numeralDoSlide } from '../ui/ChapterPlate'
import { staggerV, fadeV, scaleV, upV, NOME_ELA_COMPLETO } from '../../data/constants'

const DATA_CASAMENTO = ''

export default function FinalSlide() {
  const [mensagemRevelada, setMensagemRevelada] = useState(false)
  const inicioProximoCapitulo = DATA_CASAMENTO || '__ / __ / ____'
  const ano = new Date().getFullYear()

  return (
    <Slide id="final" scene="scene-aurora" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-7 pb-6"
        >
          {/* Abertura do capítulo */}
          <MI v={scaleV} className="flex flex-col items-center gap-3">
            <Monogram size={58} />
            <span className="kicker">Capítulo {numeralDoSlide('final')} · o fim do começo</span>
          </MI>

          <MI v={upV}>
            <h2 className="text-hero">
              Esse foi só o nosso
              <br />
              <span className="hand-underline italic font-normal">Capítulo&nbsp;1</span>
            </h2>
          </MI>

          <MI v={fadeV}>
            <p className="lede max-w-[44ch] mx-auto">
              A gente continua escrevendo a nossa história todos os dias, com amor e com Deus no
              centro.
            </p>
          </MI>

          <MI v={fadeV} className="w-full max-w-sm">
            <LeafRule />
          </MI>

          {/* O próximo capítulo */}
          <MI v={scaleV} className="w-full">
            <div className="sheet sheet-feature px-6 py-8 sm:px-10">
              <p className="kicker">Próximo capítulo</p>
              <p className="font-display text-2xl sm:text-3xl font-semibold t-ink mt-2">
                Nosso casamento
              </p>
              <p className="font-body italic text-sm t-body mt-3 max-w-[38ch] mx-auto leading-relaxed">
                Já está sendo sonhado, orado e preparado. Em breve, ele começa em:
              </p>

              <p
                className="font-display font-semibold t-accent tabular-nums mt-5 tracking-[0.06em]"
                style={{ fontSize: 'clamp(24px, 6vw, 40px)' }}
              >
                {inicioProximoCapitulo}
              </p>

              <div className="mt-5 flex items-center justify-center gap-2.5 t-accent2">
                <Icon name="ring" size={18} strokeWidth={1.3} />
                <span className="font-hand text-lg">a data vem — a escolha já está feita</span>
              </div>
            </div>
          </MI>

          {/* A declaração */}
          <MI v={upV} className="pt-2">
            <p
              className="font-display font-semibold t-ink leading-[1.1]"
              style={{ fontSize: 'clamp(24px, 6.6vw, 46px)', letterSpacing: '-0.025em' }}
            >
              Te amo para sempre, Maysa
              <Icon
                name="heart"
                size={26}
                filled
                className="inline-block ml-2.5 -mt-1.5 align-middle t-accent"
                style={{ animation: 'heartBeatSoft 2.4s ease-in-out infinite' }}
              />
            </p>
          </MI>

          <MI v={fadeV}>
            <p className="font-hand text-2xl t-accent2">sempre contigo, amor</p>
          </MI>

          {/* Mensagem escondida para quem chegou até o fim */}
          <MI className="w-full pt-2">
            <AnimatePresence mode="wait">
              {!mensagemRevelada ? (
                <motion.button
                  key="cta"
                  onClick={() => setMensagemRevelada(true)}
                  className="btn-quiet mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Icon name="envelope" size={14} />
                  Clique aqui se você chegou até o fim
                </motion.button>
              ) : (
                <motion.div
                  key="msg"
                  className="sheet px-6 py-7"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LeafRule />
                  <p className="font-display text-xl sm:text-2xl italic t-ink mt-5 leading-snug">
                    Obrigado por viver essa história comigo.
                  </p>
                  <p className="font-body text-sm t-body mt-3">
                    Você é o amor que eu sempre sonhei.
                  </p>
                  <p className="font-hand text-3xl mt-5" style={{ color: 'var(--rose)' }}>
                    Davi
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </MI>

          {/* Colofão */}
          <MI v={fadeV} className="pt-6 w-full">
            <div className="flex items-center justify-center gap-2 text-[0.6875rem] t-faint flex-wrap">
              <span>Feito com muito café e amor por Davi Antonaji</span>
              <Icon name="feather" size={12} />
            </div>
            <p className="text-[0.625rem] t-faint mt-2.5 leading-relaxed">
              © {ano === 2026 ? '2026' : `2026–${ano}`} Davi de Melo Antonaji e {NOME_ELA_COMPLETO}.
              <br className="sm:hidden" /> Todos os direitos reservados.
            </p>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
