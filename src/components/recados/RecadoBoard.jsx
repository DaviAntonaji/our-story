import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_RECADOS_API_URL

// Papéis de post-it na paleta quente do álbum
const COLORS = [
  { bg: '#fdf2c4', text: '#6b4a1f', pin: '#b0654a' }, // amarelo-mel
  { bg: '#fbe3e6', text: '#7d2e40', pin: '#b23a56' }, // rosa-suave
  { bg: '#fdeee4', text: '#7a3d26', pin: '#a95c3c' }, // pêssego
  { bg: '#eef3e6', text: '#42553c', pin: '#6f8570' }, // sálvia
  { bg: '#f2ecfa', text: '#4c3a63', pin: '#7d62a8' }, // lavanda
]

// Rotações determinísticas pelo id - parecem aleatórias mas são estáveis
const ROTATIONS = [-2.5, 1.5, -1, 2, -1.5, 1, 2.5, -0.5, 1.8, -2.2]

/** Exibe só o primeiro e o último nome. Ex.: "Ana Clara Souza Lima" → "Ana Lima" */
function shortName(full) {
  const parts = String(full).trim().split(/\s+/).filter(Boolean)
  if (parts.length <= 2) return parts.join(' ')
  return `${parts[0]} ${parts[parts.length - 1]}`
}

function formatDate(isoStr) {
  try {
    return new Date(isoStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  } catch {
    return ''
  }
}

function PostIt({ recado, index }) {
  const color = COLORS[index % COLORS.length]
  const rotation = ROTATIONS[recado.id % ROTATIONS.length]

  // Garante que quebras de linha apareçam corretamente, limitando a 8 linhas
  const lines = recado.message.split('\n').filter(Boolean).slice(0, 8)

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
      transition={{
        type: 'spring',
        stiffness: 130,
        damping: 16,
        delay: Math.min(index * 0.07, 0.55),
      }}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 10, transition: { duration: 0.2 } }}
      className="postit break-inside-avoid mb-4 cursor-default"
      style={{ backgroundColor: color.bg }}
    >
      <span className="postit__pin" style={{ backgroundColor: color.pin }} aria-hidden />

      <div className="px-4 pt-6 pb-5">
        <p
          className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] allow-select"
          style={{ color: color.pin }}
        >
          {shortName(recado.name)}
        </p>

        <div className="my-2 h-px" style={{ background: `${color.text}22` }} />

        <div
          className="font-hand text-[1.0625rem] leading-[1.4] allow-select"
          style={{ color: color.text }}
        >
          {lines.map((line, i) => (
            <p key={i} className={i < lines.length - 1 ? 'mb-0.5' : ''}>
              {line}
            </p>
          ))}
        </div>

        <p
          className="font-sans text-[0.625rem] mt-3 text-right select-none"
          style={{ color: color.text, opacity: 0.45 }}
        >
          {formatDate(recado.created_at)}
        </p>
      </div>

      <span className="postit__fold" aria-hidden />
    </motion.article>
  )
}

function SkeletonNote({ index }) {
  return (
    <div
      className="break-inside-avoid mb-4 rounded-sm animate-pulse"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line-soft)',
        height: [130, 100, 150, 110][index % 4],
      }}
    />
  )
}

/**
 * Quadro de post-its com os recados já enviados.
 * Busca GET /api/recados ao montar e quando `fetchKey` muda (após novo envio).
 *
 * @param {{ fetchKey?: number }} props
 */
export default function RecadoBoard({ fetchKey = 0 }) {
  const [recados, setRecados] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    if (!API_URL) {
      setLoading(false)
      return
    }

    setLoading(true)
    setFetchError(false)
    fetch(`${API_URL}?limit=20`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => {
        setRecados(data.recados ?? [])
        setTotal(data.total ?? 0)
      })
      .catch((err) => {
        console.error('[RecadoBoard] falha ao buscar recados:', err?.message ?? err)
        setFetchError(true)
      })
      .finally(() => setLoading(false))
  }, [fetchKey])

  // Sem API configurada: não renderiza nada
  if (!API_URL) return null

  // Erro de rede/CORS/servidor: aviso sutil, não some em silêncio
  if (!loading && fetchError) {
    return (
      <p className="t-faint text-xs text-center py-2 select-none">
        Não foi possível carregar os recados agora.
      </p>
    )
  }

  // Carregou, sem erros, mas realmente vazio: não renderiza o quadro
  if (!loading && !fetchError && recados.length === 0) return null

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
        <p className="kicker whitespace-nowrap select-none">
          {loading ? 'carregando recadinhos…' : `${total} recadinho${total !== 1 ? 's' : ''} com carinho`}
        </p>
        <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
      </div>

      <div className="corkboard">
        {/* Layout masonry via CSS columns */}
        <div className="columns-1 sm:columns-2 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonNote key={i} index={i} />)
            : recados.map((r, i) => <PostIt key={r.id} recado={r} index={i} />)}
        </div>
      </div>
    </div>
  )
}
