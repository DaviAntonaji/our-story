import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { LeafRule } from '../ui/Ornament'
import { staggerV, fadeV, scaleV, NOME_ELA_FUTURO } from '../../data/constants'

const NOSSOS_SONHOS = [
  { icon: '💍', text: 'Casar com você' },
  { icon: '👨‍👩‍👧', text: 'Construir uma família firmada em Cristo' },
  { icon: '✝️', text: 'Servir a Deus juntos, sempre' },
  { icon: '🏠', text: 'Um lar seguro, alinhado e cheio de amor' },
  { icon: '🌍', text: 'Viver muitas histórias ainda' },
]

const SEUS_SONHOS = [
  {
    icon: '👩‍🏫',
    text: 'Dar palestras em público',
    note: 'Você tem muito a dizer. O mundo precisa te ouvir.',
  },
  {
    icon: '✝️',
    text: 'Dar palavras na igreja',
    note: 'Deus vai te preparar. Eu estarei na primeira fila.',
  },
  {
    icon: '🧠',
    text: 'Psicologia',
    note: 'Sua sensibilidade e inteligência emocional já são presentes natos pra isso.',
  },
]

export default function FuturoSlide() {
  return (
    <Slide id="futuro" scene="scene-golden" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-3xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="futuro"
            icon="sunrise"
            kicker="O que está por vir"
            title="O futuro que sonho com você"
            lede="Nada disso é pressa. É direção."
          />

          <div className="space-y-3 w-full">
            {NOSSOS_SONHOS.map(({ icon, text }) => (
              <MI key={text}>
                <div className="row-item">
                  <span className="row-glyph text-lg" aria-hidden>{icon}</span>
                  <span className="font-body text-[0.9375rem] t-body">{text}</span>
                </div>
              </MI>
            ))}
          </div>

          {/* A placa gravada com o nome combinado */}
          <MI v={scaleV}>
            <div className="sheet sheet-feature px-6 py-8 sm:px-10 text-center">
              <p className="kicker">O combinado</p>
              <p className="font-body italic text-sm t-muted mt-3 max-w-[40ch] mx-auto leading-relaxed">
                A gente já combinou brincando - a brincadeira era um nome gigante, desse tamanho{' '}
                <span className="inline-flex items-center gap-8 whitespace-nowrap align-middle" aria-hidden>
                  <span>🫸🏻</span>
                  <span>🫷🏻</span>
                </span>
              </p>

              <div className="my-5">
                <LeafRule />
              </div>

              <p
                className="font-display font-semibold t-ink leading-[1.15]"
                style={{ fontSize: 'clamp(20px, 4.6vw, 34px)', letterSpacing: '-0.015em' }}
              >
                {NOME_ELA_FUTURO}
              </p>

              <p className="font-hand text-xl t-accent mt-5">
                foi brincando, mas foi sério - o combinado vale
              </p>
              <Icon name="ring" size={22} strokeWidth={1.3} className="t-accent mx-auto mt-2" />
            </div>
          </MI>

          <MI v={fadeV} className="text-center">
            <p className="font-body italic text-sm t-body max-w-[46ch] mx-auto leading-relaxed">
              E quando formos construir a nossa casa, ela terá um ipê branco na frente. 🌸
            </p>
          </MI>

          {/* Os sonhos dela */}
          <MI v={fadeV} className="pt-2">
            <div className="text-center">
              <p className="kicker">E os seus sonhos</p>
              <p className="font-display text-xl italic t-ink mt-1.5">
                que eu acredito junto com você
              </p>
            </div>
          </MI>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full">
            {SEUS_SONHOS.map(({ icon, text, note }) => (
              <MI key={text}>
                <div className="sheet sheet-lift h-full px-5 py-5">
                  <span className="row-glyph text-lg" aria-hidden>{icon}</span>
                  <p className="title-sm mt-3">{text}</p>
                  <p className="font-body italic text-[0.8125rem] leading-relaxed t-muted mt-2">
                    {note}
                  </p>
                </div>
              </MI>
            ))}
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
