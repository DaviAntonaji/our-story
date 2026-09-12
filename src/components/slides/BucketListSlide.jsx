import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, scaleV, BUCKET_LIST } from '../../data/constants'

const LS_KEY = 'our-story-bucketlist'

function loadFeitos() {
  // Itens marcados no constants.js como feito:true sempre prevalecem
  const defaults = Object.fromEntries(
    BUCKET_LIST.filter(i => i.feito).map(i => [i.id, true])
  )
  try {
    const raw = localStorage.getItem(LS_KEY)
    const saved = raw ? JSON.parse(raw) : {}
    return { ...saved, ...defaults }
  } catch {
    return defaults
  }
}

export default function BucketListSlide() {
  const [feitos, setFeitos] = useState({})
  const [celebrando, setCelebrando] = useState(null)

  useEffect(() => {
    setFeitos(loadFeitos())
  }, [])

  const total = BUCKET_LIST.length
  const qtdFeitos = Object.values(feitos).filter(Boolean).length
  const pct = total > 0 ? (qtdFeitos / total) * 100 : 0

  const toggle = (id) => {
    const novoValor = !feitos[id]
    const novo = { ...feitos, [id]: novoValor }
    setFeitos(novo)
    try { localStorage.setItem(LS_KEY, JSON.stringify(novo)) } catch {}
    if (novoValor) {
      setCelebrando(id)
      setTimeout(() => setCelebrando(null), 800)
    }
  }

  return (
    <Slide id="bucketlist" scene="scene-mint" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-3xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="bucketlist"
            icon="check"
            kicker="Nossos sonhos"
            title="Coisas pra viver juntos"
            lede="Marque enquanto forem realizando - fica salvo aqui, só pra nós dois."
          />

          {/* Progresso dos sonhos */}
          <MI v={scaleV}>
            <div className="sheet sheet-feature px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="kicker">Progresso dos sonhos</p>
                <span className="font-display text-sm font-semibold tabular-nums t-accent">
                  {qtdFeitos}/{total}
                </span>
              </div>
              <div className="progress-track h-2.5">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex items-center justify-between text-xs mt-2.5">
                <span className="t-muted tabular-nums">{Math.round(pct)}% realizados</span>
                <span className="t-accent2">
                  {total - qtdFeitos > 0
                    ? `${total - qtdFeitos} ainda por viver`
                    : 'Tudo realizado!'}
                </span>
              </div>
            </div>
          </MI>

          {/* Lista */}
          <div className="space-y-2.5">
            {BUCKET_LIST.map((item) => {
              const feito = !!feitos[item.id]
              const emProgresso = !!item.progresso && !feito
              const comemorando = celebrando === item.id

              const corEstado = feito
                ? 'var(--sage)'
                : emProgresso
                  ? 'var(--ochre)'
                  : 'var(--ink-4)'

              return (
                <MI key={item.id}>
                  <motion.button
                    onClick={() => toggle(item.id)}
                    className="sheet w-full flex items-center gap-4 px-4 py-3.5 text-left active:scale-[0.99]"
                    style={{
                      borderColor: feito || emProgresso
                        ? `color-mix(in srgb, ${corEstado} 40%, transparent)`
                        : 'var(--line-soft)',
                      background: feito
                        ? 'color-mix(in srgb, var(--sage) 8%, transparent)'
                        : emProgresso
                          ? 'color-mix(in srgb, var(--ochre) 7%, transparent)'
                          : 'var(--surface-2)',
                      boxShadow: comemorando
                        ? '0 0 24px -6px color-mix(in srgb, var(--sage) 70%, transparent)'
                        : undefined,
                    }}
                    animate={comemorando ? { scale: [1, 1.015, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    aria-pressed={feito}
                  >
                    {/* Caixa de marcação */}
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        background: feito ? 'var(--sage)' : 'transparent',
                        border: `1.5px solid ${feito ? 'var(--sage)' : emProgresso ? 'var(--ochre)' : 'var(--line)'}`,
                        color: feito ? '#fff' : 'var(--ochre)',
                      }}
                      aria-hidden
                    >
                      {feito && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex">
                          <Icon name="check" size={13} strokeWidth={2.4} />
                        </motion.span>
                      )}
                      {emProgresso && <Icon name="hourglass" size={12} strokeWidth={1.6} />}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span
                        className="font-body text-[0.9375rem] leading-snug transition-all duration-200"
                        style={{
                          color: feito ? 'var(--ink-4)' : emProgresso ? 'var(--ink-2)' : 'var(--ink-2)',
                          textDecorationLine: feito ? 'line-through' : 'none',
                          textDecorationColor: 'color-mix(in srgb, var(--sage) 60%, transparent)',
                        }}
                      >
                        {item.texto}
                      </span>
                      {emProgresso && (
                        <span className="block font-sans text-[0.5625rem] uppercase tracking-[0.16em] t-accent2 mt-1">
                          em progresso
                        </span>
                      )}
                    </span>

                    {feito && (
                      <Icon name="heart" size={14} className="shrink-0" style={{ color: 'var(--sage)' }} />
                    )}
                  </motion.button>
                </MI>
              )
            })}
          </div>

          {qtdFeitos === total && (
            <MI v={fadeV} className="text-center">
              <p className="font-hand text-2xl t-accent">
                realizaram tudo! que história linda de contar 🥹
              </p>
            </MI>
          )}
        </motion.div>
      )}
    </Slide>
  )
}
