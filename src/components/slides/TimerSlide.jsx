import { useState } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV } from '../../data/constants'
import { useTempoJuntos, useCountUp } from '../../hooks'

export default function TimerSlide() {
  const tempo = useTempoJuntos()
  const [timerInView, setTimerInView] = useState(false)
  const totalDiasAnimado = useCountUp(tempo.totalDias, 900, timerInView)

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
          </motion.div>
        )
      }}
    </Slide>
  )
}
