import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Divider from '../ui/Divider'
import { staggerV, fadeV, scaleV, NOME_ELA_FUTURO } from '../../data/constants'

export default function FuturoSlide() {
  return (
    <Slide id="futuro" bg="slide-bg-blue" center={false}>
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-4 w-full max-w-sm mx-auto"
        >
          <div className="text-center">
            <MI v={fadeV} className="chapter-label">O que está por vir</MI>
            <MI v={scaleV} className="text-4xl mt-2" style={{ animation: 'softFloat 5s ease-in-out infinite' }}>🌅</MI>
            <MI className="mt-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">O futuro que sonho com você</h2>
            </MI>
          </div>
          <div className="space-y-2 w-full">
            {[
              { icon: '💍', text: 'Casar com você' },
              { icon: '👨‍👩‍👧', text: 'Construir uma família firmada em Cristo' },
              { icon: '✝️', text: 'Servir a Deus juntos, sempre' },
              { icon: '🏠', text: 'Um lar seguro, alinhado e cheio de amor' },
              { icon: '🌍', text: 'Viver muitas histórias ainda' },
            ].map(({ icon, text }) => (
              <MI key={text}>
                <div className="future-item">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <span className="text-rose-100/90 text-sm sm:text-base font-medium">{text}</span>
                </div>
              </MI>
            ))}
          </div>
          <MI v={fadeV}>
            <div className="mt-1 px-4 py-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-amber-200/20 shadow-lg shadow-rose-950/25 ring-1 ring-white/[0.04]">
              <p className="text-center text-xs sm:text-sm text-amber-200/90 mb-2 font-medium leading-snug px-1">
                A gente já combinou brincando - e fechou nesse nome kkk
              </p>
              <p className="text-center text-[11px] sm:text-xs text-rose-200/80 mb-3 leading-relaxed px-1">
                a brincadeira era um nome gigante - desse tamanho{' '}
                <span className="whitespace-nowrap" aria-hidden>🫸🏻 🫷🏻</span>
              </p>
              <p
                className="font-display text-center font-medium text-rose-50 leading-snug px-1"
                style={{ fontSize: 'clamp(15px, 3.9vw, 20px)' }}
              >
                {NOME_ELA_FUTURO}
              </p>
              <p className="text-center text-rose-300/55 text-xs mt-3 italic">foi brincando, mas foi sério - o combinado vale 💍</p>
            </div>
          </MI>
          <MI v={fadeV}>
            <p className="text-center text-rose-200/70 text-xs sm:text-sm italic">Quando formos construir nossa casa, ela terá um ipê branco na frente. 🌸</p>
          </MI>
          <MI v={fadeV}><Divider char="✦ ✧ ✦" /></MI>
          <MI v={fadeV}><p className="text-center text-rose-200/80 text-sm font-medium">E os seus sonhos - que acredito com você 💪</p></MI>
          <div className="space-y-2 w-full">
            {[
              { icon: '👩‍🏫', text: 'Dar palestras em público', note: 'Você tem muito a dizer. O mundo precisa te ouvir.' },
              { icon: '✝️', text: 'Dar palavras na igreja', note: 'Deus vai te preparar. Eu estarei na primeira fila.' },
              { icon: '🧠', text: 'Psicologia', note: 'Sua sensibilidade e inteligência emocional já são presentes natos pra isso.' },
            ].map(({ icon, text, note }) => (
              <MI key={text}>
                <div className="flex items-start gap-3 px-3 py-3 rounded-2xl bg-white/[0.05] border border-blue-400/12">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-rose-100/90 text-sm font-medium leading-snug">{text}</p>
                    <p className="text-amber-300/55 text-xs italic mt-0.5">{note}</p>
                  </div>
                </div>
              </MI>
            ))}
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
