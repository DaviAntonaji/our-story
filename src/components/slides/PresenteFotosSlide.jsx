import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import ChapterPlate from '../ui/ChapterPlate'
import { staggerV, fadeV, SESSAO_FOTOS_PRESENTE } from '../../data/constants'
import { useLightbox } from '../../context/LightboxContext'

const MOSAICO_ALTURA = 'min(58vh, 480px)'

/** Resolve uma ou várias URLs por item (`imagens` sobrescreve `imagem`). No máximo 4 no mosaico. */
function urlsDoItem(item) {
  if (Array.isArray(item.imagens) && item.imagens.length > 0) {
    return item.imagens.filter(Boolean).slice(0, 4)
  }
  if (item.imagem) return [item.imagem]
  return []
}

const imgClass =
  'w-full h-full min-h-0 object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.03]'

function ImgClicavel({ src, width, height, loading, className, onClick }) {
  return (
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
      onClick={onClick}
    />
  )
}

function PresenteFotoMosaico({ urls, blockEager, idPrefix, onImageClick }) {
  const n = urls.length
  if (n === 0) return null

  if (n === 1) {
    return (
      <ImgClicavel
        src={urls[0]}
        width={1200}
        height={1500}
        className={imgClass}
        loading={blockEager ? 'eager' : 'lazy'}
        onClick={() => onImageClick?.(0)}
      />
    )
  }

  if (n === 2) {
    return (
      <div className="grid h-full w-full grid-cols-2 gap-1">
        {urls.map((src, i) => (
          <ImgClicavel
            key={`${idPrefix}-${i}`}
            src={src}
            width={800}
            height={1000}
            className={imgClass}
            loading={blockEager && i === 0 ? 'eager' : 'lazy'}
            onClick={() => onImageClick?.(i)}
          />
        ))}
      </div>
    )
  }

  if (n === 3) {
    return (
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
        <ImgClicavel src={urls[0]} width={800} height={600}
          className={`${imgClass} row-start-1 col-start-1`}
          loading={blockEager ? 'eager' : 'lazy'}
          onClick={() => onImageClick?.(0)} />
        <ImgClicavel src={urls[1]} width={800} height={600}
          className={`${imgClass} row-start-1 col-start-2`}
          loading="lazy"
          onClick={() => onImageClick?.(1)} />
        <ImgClicavel src={urls[2]} width={1200} height={600}
          className={`${imgClass} row-start-2 col-span-2`}
          loading="lazy"
          onClick={() => onImageClick?.(2)} />
      </div>
    )
  }

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
      {urls.map((src, i) => (
        <ImgClicavel
          key={`${idPrefix}-${i}`}
          src={src}
          width={800}
          height={800}
          className={imgClass}
          loading={blockEager && i === 0 ? 'eager' : 'lazy'}
          onClick={() => onImageClick?.(i)}
        />
      ))}
    </div>
  )
}

export default function PresenteFotosSlide() {
  const { titulo, subtitulo, itens } = SESSAO_FOTOS_PRESENTE
  const { abrir } = useLightbox()

  return (
    <Slide id="presentefotos" scene="scene-blush" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-5xl mx-auto flex flex-col gap-10 allow-select pb-10"
        >
          <ChapterPlate
            id="presentefotos"
            icon="flower"
            kicker="Eu te dei"
            title={titulo}
            lede={subtitulo}
          />

          <div className="flex flex-col gap-10 w-full">
            {itens.map((item, idx) => {
              const urls = urlsDoItem(item)
              const multi = urls.length > 1
              const inverso = idx % 2 === 1

              return (
                <MI key={item.id}>
                  <article
                    className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10 ${
                      inverso ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    {/* Fotografia montada */}
                    <div className="photo-mount">
                      <span className="photo-mount__corner" aria-hidden />
                      <span className="photo-mount__corner" aria-hidden />
                      <span className="photo-mount__corner" aria-hidden />
                      <span className="photo-mount__corner" aria-hidden />
                      <div
                        className="relative w-full overflow-hidden"
                        style={
                          multi
                            ? { height: MOSAICO_ALTURA }
                            : { aspectRatio: '4 / 5', maxHeight: MOSAICO_ALTURA }
                        }
                      >
                        <div className="absolute inset-0">
                          <PresenteFotoMosaico
                            urls={urls}
                            blockEager={idx === 0}
                            idPrefix={item.id}
                            onImageClick={(imgIdx) => abrir(urls, imgIdx)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Legenda editorial */}
                    <div className="px-1">
                      {item.data && <span className="date-tag">{item.data}</span>}
                      <h3 className={`title-md ${item.data ? 'mt-3' : ''}`}>{item.titulo}</h3>
                      <div className="mt-3.5 space-y-3">
                        {item.paras.map((p, j) => (
                          <p key={j} className="prose-soft">{p}</p>
                        ))}
                      </div>
                    </div>
                  </article>
                </MI>
              )
            })}
          </div>

          <MI v={fadeV} className="text-center">
            <p className="font-hand text-xl t-accent">flor nenhuma chega perto de você</p>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
