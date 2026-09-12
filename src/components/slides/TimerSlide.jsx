import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, scaleV, MESESVERSARIOS } from '../../data/constants'
import { useTempoJuntos, useCountUp } from '../../hooks'

const SAUDADE_DUR_MS = 3800
const SAUDADE_PAUSA_NO_100_MS = 5000

function easeSaudade(t) {
  const p = Math.min(Math.max(t, 0), 1)
  return p < 0.7 ? p * 1.2 : 0.84 + (p - 0.7) * (0.16 / 0.3)
}

/** Marcador de tempo vivo - hora : minuto : segundo desde o primeiro dia. */
function RelogioVivo({ tempo }) {
  const casas = [
    { val: tempo.horas, label: 'horas' },
    { val: tempo.minutos, label: 'min' },
    { val: tempo.segundos, label: 'seg' },
  ]
  return (
    <div className="flex items-end justify-center lg:justify-start gap-4">
      {casas.map(({ val, label }, i) => (
        <div key={label} className="flex items-end gap-4">
          {i > 0 && <span className="t-faint text-lg font-light pb-4">:</span>}
          <div className="flex flex-col items-center">
            <span className="font-display text-2xl sm:text-3xl font-semibold tabular-nums t-ink">
              {val}
            </span>
            <span className="mt-1 font-sans text-[0.5625rem] uppercase tracking-[0.18em] t-faint">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TimerSlide() {
  const tempo = useTempoJuntos()
  const countRef = useRef(null)
  const timerInView = useInView(countRef, { once: true, amount: 'some' })
  const totalDiasAnimado = useCountUp(tempo.totalDias, 900, timerInView)
  const [saudadePct, setSaudadePct] = useState(0)
  const [maisAberto, setMaisAberto] = useState(false)

  // Dispara ao abrir "Ver mais" - useInView quebrava com overflow:hidden do painel
  useEffect(() => {
    if (!maisAberto) {
      setSaudadePct(0)
      return
    }
    let rafId = 0
    let timeoutId = 0
    let cancelled = false

    function subir() {
      const t0 = performance.now()
      function frame(now) {
        if (cancelled) return
        const u = (now - t0) / SAUDADE_DUR_MS
        if (u < 1) {
          setSaudadePct(Math.min(99, Math.floor(easeSaudade(u) * 100)))
          rafId = requestAnimationFrame(frame)
        } else {
          setSaudadePct(100)
          timeoutId = window.setTimeout(() => {
            if (cancelled) return
            setSaudadePct(0)
            subir()
          }, SAUDADE_PAUSA_NO_100_MS)
        }
      }
      rafId = requestAnimationFrame(frame)
    }

    subir()
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
    }
  }, [maisAberto])

  const mesversariosVividos = MESESVERSARIOS.filter((m) => new Date() >= m.data)

  const proximoMarcoDias = Math.max(50, Math.ceil((tempo.totalDias + 1) / 50) * 50)
  const marcoPct = Math.min(100, Math.round((tempo.totalDias / proximoMarcoDias) * 100))
  const diasParaMarco = Math.max(0, proximoMarcoDias - tempo.totalDias)

  const fraseSaudade =
    saudadePct < 30
      ? 'Começou de leve…'
      : saudadePct < 60
        ? 'Já tá batendo forte 💗'
        : saudadePct < 90
          ? 'Quase no limite…'
          : saudadePct < 100
            ? 'Socorro, que saudade de você 😭'
            : '100%: te ver é obrigatório ❤️'

  return (
    <Slide id="timer" scene="scene-paper" center={false}>
      {(inView) => (
        <motion.div
          ref={countRef}
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-4xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="timer"
            icon="hourglass"
            kicker="Já se passou"
            title="Dias juntos"
            lede="O contador que eu olho mais do que devia."
          />

          {/* ── Numeral gigante + relógio ─────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center gap-6 lg:gap-12">
            <MI v={scaleV} className="flex items-end justify-center lg:justify-start gap-4">
              <p className="text-jumbo">{totalDiasAnimado}</p>
              <div className="pb-3 sm:pb-5 text-left">
                <p className="font-display text-2xl sm:text-3xl italic t-body leading-none">dias</p>
                <p className="font-hand text-xl t-accent mt-1">e contando</p>
              </div>
            </MI>

            <MI v={fadeV} className="flex flex-col items-center lg:items-start gap-4">
              <RelogioVivo tempo={tempo} />
              <span className="pill">
                <Icon name="flower" size={13} />
                {tempo.meses} {tempo.meses === 1 ? 'mês' : 'meses'} e {tempo.dias}{' '}
                {tempo.dias === 1 ? 'dia' : 'dias'}
              </span>
              <p className="font-body italic text-sm t-muted text-center lg:text-left max-w-[30ch]">
                E cada um deles valeu muito.
              </p>
            </MI>
          </div>

          {/* ── Próximo marco ─────────────────────────────────────── */}
          <MI v={fadeV}>
            <div className="sheet sheet-feature px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="kicker">Próximo marco</p>
                <span className="font-display text-sm font-semibold tabular-nums t-accent">
                  {marcoPct}%
                </span>
              </div>
              <div className="progress-track h-2.5">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${marcoPct}%` }}
                  transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-display text-xl t-ink tabular-nums">
                    {tempo.totalDias} dias vividos
                  </p>
                  <p className="text-xs t-muted mt-0.5">
                    Faltam {diasParaMarco} {diasParaMarco === 1 ? 'dia' : 'dias'} para o próximo.
                  </p>
                </div>
                <div className="sheet-quiet px-3.5 py-2 text-right shrink-0">
                  <p className="font-sans text-[0.5625rem] uppercase tracking-[0.18em] t-faint">
                    Marco
                  </p>
                  <p className="font-display text-lg t-accent tabular-nums">{proximoMarcoDias} dias</p>
                </div>
              </div>
            </div>
          </MI>

          <MI v={fadeV} className="flex justify-center">
            <button type="button" onClick={() => setMaisAberto((v) => !v)} className="btn">
              <Icon name="sparkle" size={15} />
              {maisAberto ? 'Mostrar menos' : 'Ver mais'}
              <Icon name="chevronDown" size={14} className="chev" data-open={maisAberto} />
            </button>
          </MI>

          <AnimatePresence initial={false}>
            {maisAberto && (
              <motion.div
                key="timer-extra"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full overflow-hidden"
              >
                <div className="flex flex-col gap-6 w-full pt-1">
                  {/* Medidor de saudade */}
                  <div className="sheet px-5 py-4">
                    <p className="kicker mb-2.5">Nível de saudade</p>
                    <div className="progress-track h-2">
                      <div className="progress-fill" style={{ width: `${saudadePct}%` }} />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between gap-3">
                      <p className="text-sm t-body">{fraseSaudade}</p>
                      <span className="font-display text-base font-semibold tabular-nums t-accent">
                        {saudadePct}%
                      </span>
                    </div>
                  </div>

                  {/* Mêsversários já vividos */}
                  {mesversariosVividos.length > 0 && (
                    <div className="space-y-3">
                      <p className="kicker text-center">Já rolou nos mêsversários</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {mesversariosVividos.map((m) => (
                          <div key={m.id} className="sheet sheet-lift px-5 py-4 allow-select">
                            <span className="date-tag">
                              {m.data.toLocaleDateString('pt-BR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                            <h3 className="title-sm mt-2.5 mb-2">{m.titulo}</h3>
                            {m.resumo.map((par, i) => (
                              <p key={i} className="prose-soft text-sm mt-2 first:mt-0">
                                {par}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Próximas datas */}
                  <div className="space-y-3">
                    <p className="text-center text-xs t-muted">
                      {tempo.meses < 12
                        ? 'Primeiro ano - cada mêsversário virando capítulo.'
                        : `${Math.floor(tempo.meses / 12)} ${
                            Math.floor(tempo.meses / 12) === 1 ? 'ano' : 'anos'
                          } juntos - e seguimos somando capítulos.`}
                    </p>

                    {tempo.mesversarioEhAniversario ? (
                      <div className="sheet sheet-feature px-5 py-4">
                        <p className="kicker">Mêsversário e aniversário no mesmo dia</p>
                        <p className="font-display text-xl t-ink mt-1.5">
                          Faltam{' '}
                          <span className="tabular-nums t-accent">{tempo.diasAteMesversario}</span>{' '}
                          {tempo.diasAteMesversario === 1 ? 'dia' : 'dias'}
                          {tempo.diasAteMesversario === 0 && tempo.horasAteMesversario > 0 && (
                            <span className="text-base t-body"> e {tempo.horasAteMesversario}h</span>
                          )}
                        </p>
                        <p className="text-sm t-muted mt-1">{tempo.dataMesversarioFmt}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="sheet px-5 py-4">
                          <p className="kicker">Próximo mêsversário</p>
                          <p className="font-display text-xl t-ink mt-1.5">
                            <span className="tabular-nums font-semibold t-accent">
                              {tempo.diasAteMesversario}
                            </span>
                            {tempo.diasAteMesversario === 1 ? ' dia' : ' dias'}
                            {tempo.diasAteMesversario === 0 && tempo.horasAteMesversario > 0 && (
                              <span className="t-body font-normal"> e {tempo.horasAteMesversario}h</span>
                            )}
                          </p>
                          <p className="text-sm t-muted mt-1">até {tempo.dataMesversarioFmt}</p>
                        </div>
                        <div className="sheet px-5 py-4">
                          <p className="kicker">Próximo aniversário de namoro</p>
                          <p className="font-display text-xl t-ink mt-1.5">
                            <span className="tabular-nums font-semibold t-accent">
                              {tempo.diasAteAniversario}
                            </span>
                            {tempo.diasAteAniversario === 1 ? ' dia' : ' dias'}
                            {tempo.diasAteAniversario === 0 && tempo.horasAteAniversario > 0 && (
                              <span className="t-body font-normal"> e {tempo.horasAteAniversario}h</span>
                            )}
                          </p>
                          <p className="text-sm t-muted mt-1">até {tempo.dataAniversarioFmt}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </Slide>
  )
}
