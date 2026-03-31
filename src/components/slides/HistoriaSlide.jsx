import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, TIMELINE } from '../../data/constants'

export default function HistoriaSlide() {
  return (
    <Slide id="historia" bg="slide-bg-story" center={false}>
      {(inView) => (
        <motion.div variants={staggerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-6 w-full max-w-sm mx-auto allow-select"
        >
          <div className="text-center">
            <MI v={fadeV} className="chapter-label">Nossa história</MI>
            <MI className="mt-2 flex items-center justify-center gap-2">
              <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite' }}>🌹</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-rose-50">Nossa História</h2>
              <span className="text-2xl" style={{ animation: 'softFloat 5s ease-in-out infinite 0.5s' }}>📖</span>
            </MI>
            <MI v={fadeV}><p className="text-rose-200/55 text-xs mt-1">Os momentos que marcaram nossa trajetória</p></MI>
          </div>

          <div className="space-y-5 w-full">
            {TIMELINE.map((item, idx) => (
              <MI key={idx} className="relative pl-5">
                {idx < TIMELINE.length - 1 && (
                  <div className="absolute left-[3px] top-4 bottom-[-1.25rem] w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
                )}
                <div className="absolute left-0 top-0.5 w-[7px] h-[7px] rounded-full bg-amber-400 ring-2 ring-[#1a1020]/90" style={{ animation: 'pulseSoft 2.5s ease-in-out infinite', boxShadow: '0 0 8px 2px rgba(212,175,55,0.5)' }} />
                <div className="rounded-2xl p-4 bg-white/[0.05] border border-amber-400/12">
                  <span className="timeline-date-pill">{item.data}</span>
                  <h3 className="font-display text-lg font-semibold text-rose-100 mt-2 mb-2 leading-snug">
                    {item.icon} {item.titulo}
                  </h3>
                  <div className="space-y-2">
                    {item.paras.map((p, j) => (
                      <p key={j} className="text-rose-200/80 text-sm leading-[1.8]">{p}</p>
                    ))}
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
