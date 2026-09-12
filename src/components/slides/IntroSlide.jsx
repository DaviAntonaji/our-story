import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import { Monogram } from '../ui/Ornament'
import { staggerV, fadeV, scaleV, upV } from '../../data/constants'

const FOTO_PRINCIPAL = '/imgs/photos/shopping_com_meus_pais/15.jpg'
const FOTO_FUNDO = '/imgs/photos/shopping_com_meus_pais/14.jpg'

export default function IntroSlide() {
  const containerRef = useRef(null)

  // Valores de mouse suavizados
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 40, damping: 20, mass: 0.6 })
  const my = useSpring(rawY, { stiffness: 40, damping: 20, mass: 0.6 })

  // Camadas de foto se movem em profundidades diferentes (parallax)
  const frenteX = useTransform(mx, [-1, 1], [7, -7])
  const frenteY = useTransform(my, [-1, 1], [5, -5])
  const fundoX = useTransform(mx, [-1, 1], [-11, 11])
  const fundoY = useTransform(my, [-1, 1], [-8, 8])

  const handlePointerMove = useCallback(
    (e) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
      rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
    },
    [rawX, rawY],
  )

  const handlePointerLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <Slide id="intro" scene="scene-dawn" seam={false}>
      {(inView) => (
        <motion.div
          ref={containerRef}
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-16"
        >
          {/* ── Fotografias montadas ─────────────────────────────── */}
          <MI v={scaleV} className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative" style={{ perspective: 900 }}>
              {/* Foto de trás, espiando */}
              <motion.div
                className="polaroid absolute -left-8 -top-5 sm:-left-14 sm:-top-6 hidden sm:block"
                style={{ x: fundoX, y: fundoY, rotate: -9, zIndex: 1 }}
                aria-hidden
              >
                <div className="polaroid-img w-[130px] sm:w-[150px] aspect-[3/4]">
                  <img
                    src={FOTO_FUNDO}
                    alt=""
                    width={480}
                    height={640}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>

              {/* Foto principal */}
              <motion.div
                className="polaroid relative"
                style={{ x: frenteX, y: frenteY, rotate: 2.5, zIndex: 2 }}
                whileHover={{ rotate: 0, scale: 1.025 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              >
                <div className="polaroid-img w-[210px] sm:w-[248px] lg:w-[270px] aspect-[3/4]">
                  <img
                    src={FOTO_PRINCIPAL}
                    alt="Davi e Maysa"
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                <p className="polaroid-caption">nós dois &#10084;</p>
              </motion.div>
            </div>
          </MI>

          {/* ── Bloco tipográfico ────────────────────────────────── */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
            <MI v={fadeV} className="flex items-center gap-3">
              <Monogram size={46} />
              <span className="flex flex-col items-start leading-tight">
                <span className="kicker">Capítulo I</span>
                <span className="font-display italic text-base t-muted">a abertura</span>
              </span>
            </MI>

            <MI v={upV}>
              <h1 className="text-hero">
                Para você,
                <br />
                <span className="hand-underline italic font-normal">Maysa</span>
                <Icon
                  name="heart"
                  size={30}
                  strokeWidth={1.5}
                  className="inline-block ml-3 -mt-2 align-middle t-accent"
                  style={{ animation: 'heartBeatSoft 2.6s ease-in-out infinite' }}
                />
              </h1>
            </MI>

            <MI v={fadeV}>
              <p className="font-display text-xl sm:text-2xl italic t-body">Amor da minha vida.</p>
            </MI>

            <MI v={fadeV}>
              <p className="lede max-w-[38ch]">
                Isso aqui é um álbum. Cada capítulo é um pedaço de nós - o que já
                vivemos, o que eu te prometo e o que ainda vamos construir.
              </p>
            </MI>

            <MI v={fadeV} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <span className="pill">
                <Icon name="flower" size={13} />
                Juntos desde 04 de março de 2026
              </span>
              <span className="pill-quiet">
                <Icon name="feather" size={12} />
                escrito por Davi
              </span>
            </MI>

            <MI v={fadeV} className="pt-2">
              <p className="font-hand text-lg t-accent2 flex items-center gap-2">
                comece rolando a página
                <Icon name="chevronDown" size={16} className="animate-softFloat" />
              </p>
            </MI>
          </div>
        </motion.div>
      )}
    </Slide>
  )
}
