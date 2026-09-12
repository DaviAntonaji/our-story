import { useState, useRef, useEffect } from 'react'
import { useInView, motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Icon from '../ui/Icon'
import { MAPA_LUGARES } from '../../data/constants'
import { numeralDoSlide } from '../ui/ChapterPlate'

const COR_ATIVO = '#e6b465'
const COR_PONTO = '#d4697f'

// Basemap: OpenStreetMap padrão - livre, sem chave de API e sem cota paga.
// O estilo original é claro; a classe `map-tiles-night` (index.css) reescurece
// só a camada de tiles via filtro CSS, então os marcadores não são afetados.
// A atribuição ao OSM é obrigatória pela política de uso e aparece no rodapé.
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

function criarIcone(selecionado) {
  const cor = selecionado ? COR_ATIVO : COR_PONTO
  const size = selecionado ? 20 : 13
  const border = selecionado ? '3px solid rgba(255,252,248,0.96)' : '2px solid rgba(255,252,248,0.8)'
  const shadow = selecionado
    ? '0 0 0 5px rgba(230,180,101,0.28), 0 3px 10px rgba(0,0,0,0.6)'
    : '0 2px 6px rgba(0,0,0,0.5)'
  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${cor};border:${border};border-radius:50%;
      box-shadow:${shadow};
      transition:all 0.2s;
    "></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function FitAll({ places }) {
  const map = useMap()
  useEffect(() => {
    if (!places.length) return
    const bounds = L.latLngBounds(places.map(p => p.coords))
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 15 })
  }, []) // eslint-disable-line
  return null
}

function PanTo({ coords }) {
  const map = useMap()
  useEffect(() => {
    if (coords) map.panTo(coords, { animate: true, duration: 0.6 })
  }, [coords]) // eslint-disable-line
  return null
}

export default function MapaSlide() {
  const [selecionado, setSelecionado] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 'some' })

  return (
    <section
      id="mapa"
      data-slide
      ref={ref}
      className="snap-slide scene-dark scene-deep relative overflow-hidden"
    >
      <span className="sheet-seam" aria-hidden />

      {/* O mapa ocupa a folha inteira */}
      <div className="absolute inset-0">
        <MapContainer
          center={[-22.274, -51.495]}
          zoom={14}
          zoomControl={false}
          attributionControl={false}
          className="w-full h-full"
          style={{ background: '#0b0710' }}
        >
          <TileLayer
            url={TILE_URL}
            className="map-tiles-night"
            maxZoom={19}
            attribution='&copy; OpenStreetMap'
          />
          <FitAll places={MAPA_LUGARES} />
          {selecionado && <PanTo coords={selecionado.coords} />}

          {MAPA_LUGARES.map((lugar) => (
            <Marker
              key={lugar.id}
              position={lugar.coords}
              icon={criarIcone(selecionado?.id === lugar.id)}
              eventHandlers={{
                click: () => setSelecionado(prev => prev?.id === lugar.id ? null : lugar),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Véu no topo, para o título respirar */}
      <div
        className="absolute top-0 left-0 right-0 z-[800] pointer-events-none"
        style={{ height: 210, background: 'linear-gradient(to bottom, rgba(9,6,13,0.94) 0%, rgba(9,6,13,0) 100%)' }}
        aria-hidden
      />

      {/* Cabeçalho do capítulo, flutuando */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 left-0 right-0 z-[900] px-5 sm:px-8 lg:px-14"
        style={{ paddingTop: 'max(3rem, env(safe-area-inset-top, 3rem))' }}
      >
        <div className="flex items-center gap-3">
          <span className="chapter-numeral" aria-hidden>
            <Icon name="pin" size={17} strokeWidth={1.3} />
          </span>
          <span className="flex flex-col">
            <span className="kicker">Capítulo {numeralDoSlide('mapa')}</span>
            <span className="font-display italic text-sm t-muted">os nossos lugares</span>
          </span>
        </div>
        <h2 className="title-lg mt-3">Mapa da nossa história</h2>
        <p className="lede mt-1.5">
          {MAPA_LUGARES.length} lugares especiais - toque num ponto para lembrar.
        </p>
      </motion.div>

      {/* Legenda de lugares */}
      <AnimatePresence>
        {!selecionado && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-7 left-0 right-0 z-[900] px-4 sm:px-8"
          >
            <p className="mb-2 font-sans text-[0.5625rem] tracking-[0.1em] t-faint">
              mapa ©{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                OpenStreetMap
              </a>
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {MAPA_LUGARES.map(lugar => (
                <button
                  key={lugar.id}
                  onClick={() => setSelecionado(lugar)}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-150 active:scale-95 t-body"
                  style={{
                    background: 'rgba(12,8,16,0.86)',
                    border: '1px solid var(--line)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span aria-hidden>{lugar.icon}</span>
                  <span>{lugar.nome}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ficha do lugar selecionado */}
      <AnimatePresence>
        {selecionado && (
          <motion.div
            key={selecionado.id}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="absolute bottom-0 left-0 right-0 z-[900] overflow-hidden"
            style={{
              background: 'rgba(12,8,16,0.97)',
              borderTop: '1px solid var(--line)',
              borderRadius: '22px 22px 0 0',
              boxShadow: '0 -10px 52px rgba(0,0,0,0.7)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <span className="w-10 h-1 rounded-full" style={{ background: 'var(--line)' }} aria-hidden />
            </div>

            <div className="mx-auto max-w-2xl flex gap-4 px-5 pb-7 pt-1">
              {/* Foto ou espera */}
              <div className="photo-mount shrink-0 !p-1.5 !rounded-[4px] w-24 h-24 sm:w-28 sm:h-28">
                {selecionado.foto ? (
                  <img
                    src={selecionado.foto}
                    alt={selecionado.nome}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-1"
                    style={{ background: 'var(--surface-2)' }}
                  >
                    <span className="text-2xl opacity-40" aria-hidden>{selecionado.icon}</span>
                    <span className="font-hand text-xs t-faint text-center leading-tight px-1">
                      foto em breve
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="kicker">{selecionado.categoria}</p>
                    <h3 className="title-sm mt-1">
                      <span className="mr-1.5" aria-hidden>{selecionado.icon}</span>
                      {selecionado.nome}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelecionado(null)}
                    className="lb-btn shrink-0 w-7 h-7"
                    aria-label="Fechar"
                  >
                    <Icon name="close" size={13} strokeWidth={1.6} />
                  </button>
                </div>
                <span className="date-tag mt-1.5">{selecionado.data}</span>
                <p className="prose-soft text-[0.8125rem] mt-2.5">{selecionado.descricao}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
