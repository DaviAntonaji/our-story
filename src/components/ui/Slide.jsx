import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Sprig } from './Ornament'

/**
 * Uma folha do álbum.
 *
 * `scene` define a "hora do dia" do capítulo (ver .scene-* no index.css):
 * fundo, tinta e acentos vêm todos de lá, então os filhos usam apenas
 * classes semânticas (t-ink / t-body / t-accent / sheet / btn …).
 */
export default function Slide({
  id,
  scene,
  children,
  center = true,
  sprigs = true,
  seam = true,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 'some' })

  return (
    <section id={id} data-slide ref={ref} className={`snap-slide ${scene} ${className}`}>
      {seam && <span className="sheet-seam" aria-hidden />}

      {sprigs && (
        <>
          <Sprig
            className="sprig hidden sm:block"
            rotate={-6}
            style={{ bottom: '-1.5rem', left: '-2rem', width: '9rem' }}
          />
          <Sprig
            className="sprig hidden md:block"
            rotate={180}
            style={{ top: '-1.5rem', right: '-2rem', width: '10rem' }}
          />
        </>
      )}

      <div
        className={`relative z-[1] flex flex-col ${
          center ? 'items-center justify-center min-h-[100dvh]' : 'items-start justify-start'
        } w-full px-5 sm:px-8 lg:px-14 xl:px-20 py-12 sm:py-14 lg:py-20`}
        style={{ paddingTop: center ? undefined : 'max(3.5rem, env(safe-area-inset-top, 3.5rem))' }}
      >
        {children(inView)}
      </div>
    </section>
  )
}
