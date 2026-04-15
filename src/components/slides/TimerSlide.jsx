import { useState } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV, MESESVERSARIOS } from '../../data/constants'
import { useTempoJuntos, useCountUp } from '../../hooks'

export default function TimerSlide() {
  const tempo = useTempoJuntos()
  const [timerInView, setTimerInView] = useState(false)
  const totalDiasAnimado = useCountUp(tempo.totalDias, 900, timerInView)
  const saudadePct = useCountUp(100, 3800, timerInView)
  const mesversariosVividos = MESESVERSARIOS.filter((m) => new Date() >= m.data)
  const fraseSaudade =
    saudadePct < 30
      ? 'Comecou de leve...'
      : saudadePct < 60
        ? 'Ja ta batendo forte 💗'
        : saudadePct < 90
          ? 'Quase no limite...'
          : saudadePct < 100
            ? 'Socorro, que saudade de voce 😭'
            : '100%: Te ver é obrigatório ❤️'

  return (
    <Slide id="timer" bg="slide-bg-maroon">
      {(inView) => {
        if (inView && !timerInView) setTimerInView(true)
        return (
          <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="flex flex-col items-center gap-5 text-center w-full max-w-sm mx-auto"
          >
            <MI v={fadeV} className="chapter-label">Já se passou</MI>
            <MI v={scaleV}>
              <p className="text-jumbo font-display font-bold text-rose-50 tabular-nums">{totalDiasAnimado}</p>
            </MI>
            <MI className="space-y-1">
              <p className="font-display text-2xl sm:text-3xl font-light text-rose-200/90">dias juntos</p>
              <p className="text-rose-300/60 text-sm italic">e cada um deles valeu muito ❤️</p>
            </MI>
            <MI>
              <div className="flex items-center justify-center gap-3">
                {[
                  { val: tempo.horas, label: 'horas' },
                  { val: tempo.minutos, label: 'min' },
                  { val: tempo.segundos, label: 'seg', gold: true },
                ].map(({ val, label, gold }, i) => (
                  <div key={label} className="flex items-center gap-3">
                    {i > 0 && <span className="text-rose-300/30 text-lg font-light">:</span>}
                    <div className="flex flex-col items-center">
                      <span className={`font-mono tabular-nums text-xl font-semibold ${gold ? 'text-amber-300' : 'text-rose-200/80'}`}>
                        {val}
                      </span>
                      <span className="text-rose-300/45 text-[10px] tracking-widest uppercase mt-0.5">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </MI>
            <MI v={fadeV}>
              <span className="badge-pill">🌹 {tempo.meses} {tempo.meses === 1 ? 'mês' : 'meses'} e {tempo.dias} dias</span>
            </MI>
            <MI v={fadeV} className="w-full">
              <div className="rounded-2xl border border-rose-300/25 bg-white/[0.06] px-4 py-3.5 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-rose-200/65 text-left">
                  Nível de saudade
                </p>
                <div className="h-2.5 w-full rounded-full bg-rose-200/12 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-300 via-pink-300 to-amber-300 transition-[width] duration-500 ease-linear"
                    style={{ width: `${saudadePct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-rose-100/90 text-left">{fraseSaudade}</p>
                  <span className="font-mono text-sm tabular-nums text-amber-200">{saudadePct}%</span>
                </div>
              </div>
            </MI>
            {mesversariosVividos.length > 0 && (
              <MI v={fadeV} className="w-full space-y-3 text-left">
                <p className="text-center text-[10px] uppercase tracking-[0.18em] text-rose-200/50">Já rolou nos mêsversários</p>
                {mesversariosVividos.map((m) => (
                  <div
                    key={m.id}
                    className="mesversario-memoria rounded-2xl border border-amber-400/22 bg-white/[0.07] px-4 py-3.5 shadow-sm shadow-black/20"
                  >
                    <p className="font-display text-sm text-amber-200 font-medium text-center sm:text-left">
                      {m.titulo}
                    </p>
                    <p className="text-[11px] text-amber-100/55 text-center sm:text-left mt-0.5 mb-2">
                      {m.data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    {m.resumo.map((par, i) => (
                      <p
                        key={i}
                        className="font-body text-[13px] sm:text-sm leading-relaxed text-left mt-2 first:mt-0 allow-select"
                        style={{ color: 'rgb(255, 232, 234)' }}
                      >
                        {par}
                      </p>
                    ))}
                  </div>
                ))}
              </MI>
            )}
            <MI v={fadeV} className="w-full space-y-3 text-left">
              <p className="text-center text-rose-300/55 text-xs">
                {tempo.meses < 12
                  ? 'Primeiro ano - cada mêsversário no mesmo ritmo dos stories ✨'
                  : `${Math.floor(tempo.meses / 12)} ${Math.floor(tempo.meses / 12) === 1 ? 'ano' : 'anos'} juntos - e seguimos somando capítulos`}
              </p>
              {tempo.mesversarioEhAniversario ? (
                <div className="rounded-2xl border border-amber-400/25 bg-white/[0.06] px-4 py-4 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-amber-200/75">Próximo marco</p>
                  <p className="font-display text-lg text-rose-50 font-medium">
                    Faltam{' '}
                    <span className="tabular-nums text-amber-200">{tempo.diasAteMesversario}</span>{' '}
                    {tempo.diasAteMesversario === 1 ? 'dia' : 'dias'}
                    {tempo.diasAteMesversario === 0 && tempo.horasAteMesversario > 0 && (
                      <span className="text-base font-normal text-rose-200/90">
                        {' '}e {tempo.horasAteMesversario}h
                      </span>
                    )}
                  </p>
                  <p className="text-rose-300/70 text-sm">Mêsversário e aniversário de namoro · {tempo.dataMesversarioFmt}</p>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-rose-400/20 bg-white/[0.05] px-4 py-3.5 space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-rose-200/65">Próximo mêsversário</p>
                    <p className="font-display text-base text-rose-50">
                      <span className="tabular-nums font-semibold text-amber-200/95">{tempo.diasAteMesversario}</span>
                      {tempo.diasAteMesversario === 1 ? ' dia' : ' dias'}
                      {tempo.diasAteMesversario === 0 && tempo.horasAteMesversario > 0 && (
                        <span className="text-rose-200/85 font-normal"> e {tempo.horasAteMesversario}h</span>
                      )}
                      <span className="text-rose-300/75 font-normal text-sm block sm:inline sm:ml-1">
                        até {tempo.dataMesversarioFmt}
                      </span>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-amber-400/22 bg-white/[0.06] px-4 py-3.5 space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-amber-200/70">Próximo aniversário de namoro</p>
                    <p className="font-display text-base text-rose-50">
                      <span className="tabular-nums font-semibold text-amber-200/95">{tempo.diasAteAniversario}</span>
                      {tempo.diasAteAniversario === 1 ? ' dia' : ' dias'}
                      {tempo.diasAteAniversario === 0 && tempo.horasAteAniversario > 0 && (
                        <span className="text-rose-200/85 font-normal"> e {tempo.horasAteAniversario}h</span>
                      )}
                      <span className="text-rose-300/75 font-normal text-sm block sm:inline sm:ml-1">
                        até {tempo.dataAniversarioFmt}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </MI>
          </motion.div>
        )
      }}
    </Slide>
  )
}
