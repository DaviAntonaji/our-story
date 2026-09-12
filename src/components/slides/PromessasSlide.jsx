import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV } from '../../data/constants'

const PROMESSAS = [
  ['🌱', 'Ser paciente com você sempre'],
  ['🤍', 'Ser amoroso e gentil em cada momento'],
  ['🛡️', 'Cuidar de você com atenção e carinho'],
  ['✝️', 'Te aproximar de Cristo todos os dias'],
  ['🙏', 'Conduzir tudo com temor a Deus'],
  ['🕊️', 'Viver santidade no nosso namoro, honrando a Deus em cada escolha'],
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
  ['💐', 'Nunca parar de te conquistar - mesmo depois de anos, mesmo depois de casados'],
  ['🩹', 'Ajudar a curar, com amor e paciência, todo mal que já fizeram a você'],
  ['🧷', 'Nunca desistir de nós'],
  ['💍', 'Ser totalmente fiel a você'],
  ['🔒', 'Nunca quebrar sua confiança'],
  ['🤣', 'Não fugir quando te ver toda descabelada (depois do casamento kkk)'],
  ['🏃‍♂️‍➡️', 'Cuidar da minha saúde e da sua, para vivermos bem cada fase'],
  ['🤲', 'Você nunca vai carregar nada sozinha: sempre vamos carregar juntos'],
  ['⚔️', 'Independente dos problemas, continuarei te escolhendo e me entregando por nós, como Cristo amou a Igreja'],
  ['🏡', 'Quando tivermos nosso lar, não será apenas morar juntos, mas viver juntos de verdade'],
]

export default function PromessasSlide() {
  return (
    <Slide id="promessas" scene="scene-sage" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-4xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="promessas"
            icon="leaf"
            kicker="Meu compromisso"
            title="Minhas promessas para você"
            lede="Com Cristo no centro, e uma por uma — te prometo:"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            {PROMESSAS.map(([icon, text], i) => (
              <MI key={text + i}>
                <div className="row-item h-full items-start">
                  <span className="row-glyph" aria-hidden>
                    {icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-display text-[0.6875rem] font-semibold tracking-[0.2em] t-accent tabular-nums block mb-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body text-[0.875rem] leading-[1.6] t-body">{text}</span>
                  </div>
                </div>
              </MI>
            ))}
          </div>

          <MI v={fadeV}>
            <div className="sheet sheet-feature px-6 py-6 text-center">
              <Icon name="ring" size={26} strokeWidth={1.3} className="t-accent mx-auto mb-3" />
              <p className="font-display text-xl sm:text-2xl italic t-ink leading-snug max-w-[36ch] mx-auto">
                Cada uma dessas vem do coração — e eu assino embaixo.
              </p>
              <p className="font-hand text-2xl t-accent mt-4">Davi</p>
            </div>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
