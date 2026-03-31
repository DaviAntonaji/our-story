import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV } from '../../data/constants'

export default function PromessasSlide() {
  return (
    <Slide id="promessas" bg="slide-bg-teal" center={false}>
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-4 w-full max-w-sm mx-auto"
        >
          <div className="text-center">
            <MI v={fadeV} className="chapter-label">Meu compromisso</MI>
            <MI v={scaleV} className="text-4xl mt-2" style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}>🤍</MI>
            <MI className="mt-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Minhas promessas para você</h2>
            </MI>
            <MI v={fadeV}><p className="text-rose-300/65 text-sm mt-1">Com Cristo no centro, te prometo:</p></MI>
          </div>
          <div className="space-y-2 w-full">
            {[
              ['🌱', 'Ser paciente com você sempre'],
              ['🤍', 'Ser amoroso e gentil em cada momento'],
              ['🛡️', 'Cuidar de você com atenção e carinho'],
              ['✝️', 'Te aproximar de Cristo todos os dias'],
              ['🙏', 'Conduzir tudo com temor a Deus'],
              ['⏳', 'Não apressar etapas - seu tempo é sagrado'],
              ['🧱', 'Provar com atitudes, não só palavras'],
              ['🌊', 'Manter constância emocional ao seu lado'],
              ['🏔️', 'Construir uma base firme com Cristo no centro'],
              ['🔝', 'Sempre dar o melhor de mim por nós'],
              ['💬', 'Me expressar com você - sempre, mesmo quando for difícil'],
              ['👁️', 'Ser transparente, de verdade, em tudo'],
              ['🕊️', 'Nunca elevar a voz: sempre conversar com calma, te entender e expor meu ponto com amor'],
              ['💛', 'Ser compreensível nos seus momentos difíceis'],
              ['🌸', 'Te fazer pelo menos um pouquinho feliz todos os dias'],
            ].map(([icon, text]) => (
              <MI key={text}>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/[0.05] border border-emerald-400/12">
                  <span className="text-xl shrink-0">{icon}</span>
                  <span className="text-rose-100/90 text-sm font-medium leading-snug">{text}</span>
                </div>
              </MI>
            ))}
          </div>
          <MI v={fadeV}><p className="text-center text-rose-300/55 text-xs italic">Cada uma vem do coração. ❤️</p></MI>
        </motion.div>
      )}
    </Slide>
  )
}
