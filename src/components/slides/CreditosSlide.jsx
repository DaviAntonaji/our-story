import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, CREDITOS } from '../../data/constants'

export default function CreditosSlide() {
  return (
    <Slide id="creditos" scene="scene-dark scene-night" center={false} sprigs={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-2xl mx-auto flex flex-col gap-11 allow-select pb-10"
        >
          <ChapterPlate
            id="creditos"
            icon="film"
            kicker="Nossa história"
            title="Créditos"
            lede="Toda boa história tem gente que fez parte dela."
          />

          <div className="flex flex-col gap-10 w-full">
            {CREDITOS.map((secao, si) => (
              <MI key={si}>
                <section className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-px flex-1"
                      style={{ background: 'linear-gradient(90deg, transparent, var(--line))' }}
                    />
                    <p className="kicker whitespace-nowrap text-center">{secao.categoria}</p>
                    <span
                      className="h-px flex-1"
                      style={{ background: 'linear-gradient(90deg, var(--line), transparent)' }}
                    />
                  </div>

                  <div className="space-y-6">
                    {secao.itens.map((item, ii) => (
                      <div key={ii} className="text-center">
                        <p className="font-sans text-[0.625rem] uppercase tracking-[0.2em] t-faint">
                          {item.papel}
                        </p>
                        <p
                          className="font-display font-semibold t-ink leading-tight mt-1.5"
                          style={{ fontSize: 'clamp(22px, 4.6vw, 32px)', letterSpacing: '-0.015em' }}
                        >
                          {item.nome}
                        </p>
                        {item.nota && (
                          <p className="font-body italic text-[0.875rem] leading-relaxed t-muted mt-2.5 max-w-[46ch] mx-auto">
                            “{item.nota}”
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </MI>
            ))}

            <MI v={fadeV}>
              <div className="flex items-center gap-4 pt-4">
                <span
                  className="h-px flex-1"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--line))' }}
                />
                <p className="font-display text-lg tracking-[0.42em] t-faint select-none">FIM</p>
                <span
                  className="h-px flex-1"
                  style={{ background: 'linear-gradient(90deg, var(--line), transparent)' }}
                />
              </div>
              <p className="font-hand text-center text-lg t-accent mt-4">
                …mas só desse capítulo
              </p>
            </MI>
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
