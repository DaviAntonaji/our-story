import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

// Data de início do namoro: 04/03/2026 às 19:30
const INICIO_NAMORO = new Date(2026, 2, 4, 19, 30, 0) // mês é 0-indexed

function useTempoJuntos() {
  const [tempo, setTempo] = useState({
    meses: 0,
    dias: 0,
    horas: '00',
    minutos: '00',
    segundos: '00',
    totalDias: 0
  })

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date()
      const diff = agora - INICIO_NAMORO

      if (diff < 0) {
        setTempo({
          meses: 0,
          dias: 0,
          horas: '00',
          minutos: '00',
          segundos: '00',
          totalDias: 0
        })
        return
      }

      const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24))
      const meses = Math.floor(totalDias / 30)
      const dias = totalDias % 30

      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, '0')
      const minutos = Math.floor((diff / (1000 * 60)) % 60)
        .toString()
        .padStart(2, '0')
      const segundos = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, '0')

      setTempo({ meses, dias, horas, minutos, segundos, totalDias })
    }

    atualizar()
    const id = setInterval(atualizar, 1000)
    return () => clearInterval(id)
  }, [])

  return tempo
}

// Cole o link da música do Spotify aqui (ex: https://open.spotify.com/track/...)
const SPOTIFY_URL = 'https://open.spotify.com/embed/track/7FOPTUmEJ3ByYW9ag9cZJ3'

const FOTOS = [
  '/imgs/photos/1.jpg',
  '/imgs/photos/2.jpg',
  '/imgs/photos/3.jpg',
  '/imgs/photos/4.jpg',
  '/imgs/photos/5.jpg',
  '/imgs/photos/6.jpg',
  '/imgs/photos/7.jpg',
  '/imgs/photos/8.jpg',
  '/imgs/photos/9.jpg',
  '/imgs/photos/10.jpeg'
]

export default function App() {
  const [revelado, setRevelado] = useState(false)
  const [musicaRevelada, setMusicaRevelada] = useState(false)
  const [fotoAtual, setFotoAtual] = useState(0)
  const tempo = useTempoJuntos()

  useEffect(() => {
    if (!revelado) return
    const id = setInterval(() => {
      setFotoAtual((i) => (i + 1) % FOTOS.length)
    }, 4000)
    return () => clearInterval(id)
  }, [revelado])

  if (!revelado) {
    return (
      <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center text-rose-100 p-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] relative overflow-hidden page-bg-landing">
        <motion.div className="text-5xl md:text-6xl mb-6 animate-pulseSoft" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>💕</motion.div>
        <motion.p className="text-xl md:text-2xl font-serif font-light tracking-wide text-rose-200/95 mb-8 text-center relative z-10" {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.15 }}>
          Uma surpresa especial te espera
        </motion.p>
        <motion.button
          onClick={() => setRevelado(true)}
          className="btn-primary min-h-[52px] px-12 py-4 rounded-2xl font-serif text-lg relative z-10 flex items-center gap-3"
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
        >
          <span>💕</span>
          Clique aqui, meu bem
          <span>💕</span>
        </motion.button>
        <motion.p className="text-sm text-rose-300/60 mt-6 relative z-10 flex items-center gap-1" {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.45 }}>
          <span>✨</span> Toque para revelar <span>✨</span>
        </motion.p>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-h-[100dvh] text-rose-100 relative overflow-x-hidden page-bg">
      <main className="max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-12 pt-[env(safe-area-inset-top)] space-y-12 sm:space-y-16 relative z-10 pb-20 safe-bottom">
        {/* Hero */}
        <motion.section className="text-center space-y-5 sm:space-y-6" {...fadeInUp}>
          <div className="flex justify-center gap-3 text-3xl sm:text-4xl">
            <span className="animate-heartBeat">💕</span>
            <span className="animate-heartBeat [animation-delay:0.3s]">❤️</span>
            <span className="animate-heartBeat [animation-delay:0.6s]">💗</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-rose-50 leading-tight px-2">
            Para você, Maysa. Amor da minha vida 💝
          </h1>
          <p className="text-rose-200/90 text-sm sm:text-base font-medium">Juntos desde 04 de março de 2026 🌹</p>
          <div className="flex flex-nowrap justify-center items-end gap-1.5 sm:gap-2 md:gap-4 text-2xl font-mono card-glass rounded-2xl p-4 sm:p-5 md:p-6 max-w-md mx-auto overflow-x-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.meses}</span>
              <span className="text-xs sm:text-sm text-rose-300/70">Meses</span>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.dias}</span>
              <span className="text-xs sm:text-sm text-rose-300/70">Dias</span>
            </div>
            <div className="flex flex-nowrap items-end shrink-0 gap-1 sm:gap-2">
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.horas}</span>
                <span className="text-xs sm:text-sm text-rose-300/70">Horas</span>
              </div>
              <span className="text-base sm:text-lg text-rose-300/60 pb-1 shrink-0">:</span>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.minutos}</span>
                <span className="text-xs sm:text-sm text-rose-300/70">Min</span>
              </div>
              <span className="text-base sm:text-lg text-rose-300/60 pb-1 shrink-0">:</span>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-rose-200">{tempo.segundos}</span>
                <span className="text-xs sm:text-sm text-rose-300/70">Seg</span>
              </div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-rose-200/95 font-medium">
            São {tempo.totalDias} dias de amor contigo, meu bem 💕
          </p>
          <p className="text-2xl sm:text-3xl text-rose-300/80">✨ 🌹 ✨</p>
        </motion.section>

        {/* Nossa Música */}
        <motion.section className="rounded-2xl overflow-hidden card-glass card-hover" {...fadeInUp}>
          {!musicaRevelada ? (
            <button
              onClick={() => setMusicaRevelada(true)}
              className="w-full p-6 sm:p-8 md:p-12 text-center hover:bg-rose-800/15 transition-colors"
            >
              <span className="text-4xl block mb-3">🎵</span>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50 mb-2">Nossa Música</h2>
              <p className="text-rose-200/80 mb-4 text-sm sm:text-base">A trilha sonora do nosso amor 💕</p>
              <span className="text-rose-300/90 underline underline-offset-2 text-sm sm:text-base">
                Clique para descobrir ✨
              </span>
            </button>
          ) : (
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50 mb-2 text-center">
                Nossa Música 🎵
              </h2>
              <p className="text-rose-200/80 mb-4 text-center text-sm sm:text-base">A trilha sonora do nosso amor 💗</p>
              <div className="rounded-xl overflow-visible max-w-md mx-auto w-full pb-2 sm:pb-0">
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-xl"
                    style={{ borderRadius: 12, minHeight: 280 }}
                    src={SPOTIFY_URL}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Nossa música"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* Frase de amor */}
        <motion.section className="rounded-2xl p-4 sm:p-6 md:p-8 card-glass card-hover" {...fadeInUp}>
          <p className="text-2xl text-center mb-4">💌</p>
          <p className="text-rose-50/95 leading-relaxed text-base sm:text-lg italic font-body">
            Maysa, desde o primeiro dia que te vi soube que minha vida não seria mais a mesma. Cada momento com você é especial, cada sorriso seu me faz bem. Te amo mais do que consigo dizer.
          </p>
          <p className="text-2xl text-center mt-4">💕</p>
        </motion.section>

        {/* Versículo */}
        <motion.section className="rounded-2xl p-4 sm:p-6 md:p-8 card-glass card-hover" {...fadeInUp}>
          <p className="text-2xl text-center mb-4">✝️</p>
          <h2 className="text-lg sm:text-xl font-display font-semibold text-rose-50 text-center mb-4">
            1 Coríntios 13:4-7
          </h2>
          <blockquote className="text-rose-200/90 leading-relaxed text-sm sm:text-base space-y-3">
            <p><strong>4</strong> O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.</p>
            <p><strong>5</strong> Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.</p>
            <p><strong>6</strong> O amor não se alegra com a injustiça, mas se alegra com a verdade.</p>
            <p><strong>7</strong> Tudo sofre, tudo crê, tudo espera, tudo suporta.</p>
          </blockquote>
          <p className="text-rose-300/70 text-center mt-4 text-sm italic">A palavra que nos inspira</p>
        </motion.section>

        {/* Momentos - Carrossel de fotos */}
        <motion.section {...fadeInUp}>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-rose-50 text-center mb-2">
            Momentos 📸
          </h2>
          <p className="text-rose-200/80 text-center mb-4 sm:mb-6 text-sm sm:text-base">
            Memórias que guardamos no coração, Maysa 💖
          </p>
          <div className="relative rounded-2xl overflow-hidden card-glass h-[360px] sm:h-[420px] flex items-center justify-center">
            <img
              key={fotoAtual}
              src={FOTOS[fotoAtual]}
              alt={`Momento ${fotoAtual + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain animate-fadeIn"
            />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 sm:gap-2">
              {FOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFotoAtual(i)}
                  className={`rounded-full transition-all p-2.5 sm:p-1 ${
                    i === fotoAtual ? 'bg-rose-300 w-3 h-3 sm:w-2.5 sm:h-2.5' : 'bg-rose-500/50 w-2.5 h-2.5 sm:w-2 sm:h-2 hover:bg-rose-400/70 active:bg-rose-400/70'
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Nossa História */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <span className="text-2xl sm:text-3xl">🌹</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-rose-50">
                Nossa História
              </h2>
              <span className="text-2xl sm:text-3xl">📖</span>
            </div>
            <p className="text-rose-200/80 text-sm sm:text-base">
              Os momentos que marcaram nossa trajetória
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-rose-400/60">
              <span className="text-lg">✦</span>
              <span className="text-lg">✧</span>
              <span className="text-lg">✦</span>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <div className="relative pl-5 sm:pl-6 border-l-2 border-rose-400/50 card-glass rounded-r-2xl p-4 sm:p-5 ml-1">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-rose-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">13, 14 e 15 de fevereiro de 2026</h3>
              <p className="text-rose-300/90 mt-1 font-medium">
                Onde tudo começou
              </p>
              <p className="text-rose-200/80 mt-1 text-sm sm:text-base">
                Foi no acampamento da Comunidade Apascentar que começamos a nos aproximar de verdade, conversando mais e conhecendo melhor o estilo um do outro.
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-rose-400/50 card-glass rounded-r-2xl p-4 sm:p-5 ml-1">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-rose-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">20 de fevereiro de 2026</h3>
              <p className="text-rose-300/90 mt-1 font-medium">
                Quando você se apaixonou por mim
              </p>
              <p className="text-rose-200/80 mt-2">
                Eu não sabia o quão mal eu estava naquele dia... Você estava mal ao ponto de
                qualquer coisa te fazer chorar...
              </p>
              <p className="text-rose-200/80 mt-2">
                Você só disse: "estou meio desanimada hoje..." Não revelou o real peso que estava
                sentindo...
              </p>
              <p className="text-rose-200/80 mt-2">
                E quando comecei a conversar com você sobre Deus, e passagens sobre não desanimar,
                sobre cansar... Você chorou na hora - e foi só depois, já namorando, que você me
                contou que foi ali que percebeu que estava apaixonada por mim...
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-rose-400/50 card-glass rounded-r-2xl p-4 sm:p-5 ml-1">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-rose-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">04 de março de 2026</h3>
              <p className="text-rose-300/90 mt-1 font-medium">
                Início do nosso namoro
              </p>
              <p className="text-rose-200/80 mt-2">
                Começou quando combinamos de sair no João Julhão às 18h, e conseguimos estender até
                as 20h. Com isso, eu já comecei a correr com as coisas durante o dia para deixar
                tudo preparado.
              </p>
              <p className="text-rose-200/80 mt-2">
                Cheguei no JJ exatamente às 18:00 e já combinei com o garçom todo o roteiro do que
                iria acontecer. Quando você chegou com a Talita, estava linda… e ali meu coração já
                acelerou.
              </p>
              <p className="text-rose-200/80 mt-2">
                Fomos até a mesa que eu já tinha deixado separada, inclusive planejando deixar você
                sentada de costas para a cozinha, para que não visse nada do que estava sendo
                preparado.
              </p>
              <p className="text-rose-200/80 mt-2">
                Eu não tinha planejado muito bem como seria o papo… mas acabou sendo algo muito
                natural e descontraído, principalmente com as perguntas que você começou a fazer.
                Primeiro você perguntou sobre a minha família. Depois sobre o que era estabilidade
                para mim. Também falamos sobre educação financeira… tudo isso enquanto comíamos
                meia porção de filé mignon à parmegiana.
              </p>
              <p className="text-rose-200/80 mt-2">
                Até que chegou o momento que eu tinha combinado com os garçons. Terminamos de comer
                e eu pedi para trazerem a sobremesa. Foi então que o garçom chegou trazendo junto o
                buquê e as alianças.
              </p>
              <p className="text-rose-200/80 mt-2">
                Eu estava um pouco nervoso, mas te disse que já fazia um tempinho que eu queria fazer
                aquilo. Disse também que, desde o primeiro momento em que conversamos, eu percebi
                que ali havia algo diferente, e que orei muito a Deus por esse momento. Então eu te
                perguntei se você aceitava namorar comigo.
              </p>
              <p className="text-rose-200/80 mt-2">
                Esse momento ficou gravado muito forte na minha mente. Seus olhos brilhando como se
                quisesse chorar, sua bochecha tremendo de alegria… você estava tão feliz. E naquele
                instante você me tornou o homem mais feliz do mundo.
              </p>
              <p className="text-rose-200/80 mt-2">
                Depois disso, te levei pela primeira vez até a sua casa a sós. Cumprimentei sua mãe
                ali do lado de fora mesmo. E quando você me abraçou, eu senti que aquele abraço era
                bom demais… e percebi que era exatamente ali que eu sempre quero estar.
              </p>
            </div>

            <div className="relative pl-5 sm:pl-6 border-l-2 border-rose-400/50 card-glass rounded-r-2xl p-4 sm:p-5 ml-1">
              <div className="absolute -left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-rose-400 ring-2 ring-rose-900/50" />
              <h3 className="font-bold text-rose-200 text-sm sm:text-base">08 de março de 2026</h3>

              <p className="text-rose-300/90 mt-1 font-medium">
                A noite com seus pais e o nosso primeiro beijo
              </p>

              <p className="text-rose-200/80 mt-2">
                Foi a noite em que conversei com seus pais. Eles fizeram uma torta de frango que estava
                simplesmente maravilhosa - com certeza uma das melhores que já comi na vida. Tivemos uma
                conversa muito boa, e naquele momento eles nos autorizaram a namorar de verdade, estabelecendo
                algumas regras. Foi um momento muito especial para mim.
              </p>

              <p className="text-rose-200/80 mt-2">
                E foi também nesse dia que demos o nosso primeiro beijo. Um momento simples, mas
                inesquecível.
              </p>

              <p className="text-rose-200/80 mt-2">
                Depois fomos ao aniversário do Wagner. Fomos recebidos ao som de "Aquilo que Parecia
                Impossível", e aquilo deixou a noite ainda mais marcante e engraçada. Em seguida, você me levou até a casa
                dos seus avós, onde ficamos conversando por mais um tempo.
              </p>

              <p className="text-rose-200/80 mt-2">
                Lá encontrei também seu tio João Vitor, que estudou comigo na época da escola - foi muito
                legal reencontrá-lo. Até jogamos um pouco de Mortal Kombat. E, pelo que percebi, sua família
                gostou bastante de mim.
              </p>

              <p className="text-rose-200/80 mt-2">
                Nesse dia também te entreguei seus presentes de Dia das Mulheres: um livro, dois
                girassóis, um porta-retrato com nossa foto favorita do pedido de namoro, algumas fotos
                reveladas e polaroides para você colocar na capinha do celular.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Final */}
        <motion.section className="text-center py-12 sm:py-16" {...fadeInUp}>
          <div className="text-4xl sm:text-5xl mb-4">💕 ❤️ 💗</div>
          <p className="text-lg sm:text-xl font-display text-rose-200/95 italic">
            E assim continua nossa história...
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-rose-50 mt-4 animate-pulseSoft">
            Te amo para sempre, Maysa ♥
          </p>
          <p className="text-rose-300/80 mt-6 text-base sm:text-lg flex items-center justify-center gap-2 flex-wrap">
            <span>🌹</span> Sempre contigo, amor <span>🌹</span>
          </p>
          <p className="text-3xl mt-6">💝</p>
          <p className="text-rose-400/60 text-sm mt-8 sm:mt-10 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Feito com muito</span>
            <span>☕</span>
            <span> e </span>
            <span>🍵</span>
            <span> e amor por Davi Antonaji</span>
            <span className="text-rose-300/70">(seu amor)</span>
          </p>
        </motion.section>
      </main>
    </div>
  )
}
