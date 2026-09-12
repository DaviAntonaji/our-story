import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import Icon from '../ui/Icon'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, FOTOS } from '../../data/constants'
import { useLightbox } from '../../context/LightboxContext'

const INITIAL = 16

function seedRot(i) {
  const v = Math.sin(i * 7.13 + 3.33) * 43758.5453
  return ((v - Math.floor(v)) - 0.5) * 8 // -4° a +4°
}

// Converte nome de pasta em legenda legível: "pedido_namoro" → "Pedido de namoro"
function folderLabel(src) {
  const folder = src.split('/').at(-2) ?? ''
  return folder
    .replace(/^\d+x?[_-]?/, '')   // remove prefixos "1x_", "2_"
    .replace(/[_-]/g, ' ')
    .trim()
    .replace(/^\w/, c => c.toUpperCase())
}

export default function MomentosSlide() {
  const { abrir } = useLightbox()
  const [verTudo, setVerTudo] = useState(false)

  const items = useMemo(
    () => FOTOS.map((src, idx) => ({ src, idx, r: seedRot(idx), label: folderLabel(src) })),
    [],
  )

  const visiveis = verTudo ? items : items.slice(0, INITIAL)
  const restantes = FOTOS.length - INITIAL

  return (
    <Slide id="momentos" scene="scene-dark scene-night" center={false} sprigs={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full flex flex-col items-center gap-9 pb-10"
        >
          <ChapterPlate
            id="momentos"
            icon="camera"
            kicker="Nossas memórias"
            title="Momentos"
            lede={`${FOTOS.length} fotos em ordem cronológica — toque em qualquer uma para ampliar.`}
          />

          {/* Mural de polaroids */}
          <MI v={fadeV} className="w-full">
            {/*
              Sem height constraint no container — CSS columns + overflow:auto = brancos e layout quebrado.
              O "Ver mais" já controla o tamanho inicial; expandido, o slide cresce naturalmente.
            */}
            <div className="columns-2 sm:columns-3 lg:columns-5 xl:columns-6 gap-3 px-1 pb-4">
              {visiveis.map(({ src, idx, r, label }) => (
                <div
                  key={src}
                  className={`polaroid-wall-item break-inside-avoid mb-3.5 ${verTudo && idx >= INITIAL ? 'polaroid-new' : ''}`}
                  style={{ '--r': `${r}deg`, '--delay': `${Math.min((idx - INITIAL) * 0.03, 0.7)}s` }}
                  onClick={() => abrir(FOTOS, idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && abrir(FOTOS, idx)}
                  aria-label={`${label} – foto ${idx + 1}`}
                >
                  <div className="polaroid-wall-frame">
                    <img
                      src={src}
                      alt={label}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block"
                    />
                    <p className="polaroid-wall-caption">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </MI>

          {!verTudo && (
            <MI v={fadeV}>
              <button onClick={() => setVerTudo(true)} className="btn">
                <Icon name="camera" size={15} />
                Ver mais {restantes} fotos
              </button>
            </MI>
          )}
        </motion.div>
      )}
    </Slide>
  )
}
