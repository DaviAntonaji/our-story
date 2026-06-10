import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import { staggerV, fadeV, scaleV, CONQUISTAS } from '../../data/constants'
import { getNivelInfo, getTituloNivel } from '../../utils/niveisXp'

// ── Configuração de raridade ──────────────────────────────────────────────────
const RARITY_CONFIG = {
  comum: {
    label: 'Comum',
    color: '#a1a1aa',
    glow: 'rgba(161,161,170,0.18)',
    border: 'rgba(161,161,170,0.28)',
    bg: 'rgba(161,161,170,0.07)',
    xp: 100,
    ring: 'rgba(161,161,170,0.15)',
  },
  especial: {
    label: 'Especial',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.22)',
    border: 'rgba(96,165,250,0.38)',
    bg: 'rgba(96,165,250,0.08)',
    xp: 250,
    ring: 'rgba(96,165,250,0.18)',
  },
  raro: {
    label: 'Raro',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.22)',
    border: 'rgba(52,211,153,0.38)',
    bg: 'rgba(52,211,153,0.08)',
    xp: 300,
    ring: 'rgba(52,211,153,0.18)',
  },
  epico: {
    label: 'Épico',
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.26)',
    border: 'rgba(192,132,252,0.44)',
    bg: 'rgba(192,132,252,0.09)',
    xp: 500,
    ring: 'rgba(192,132,252,0.20)',
  },
  lendario: {
    label: 'Lendário',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.34)',
    border: 'rgba(251,191,36,0.55)',
    bg: 'rgba(251,191,36,0.10)',
    xp: 1000,
    ring: 'rgba(251,191,36,0.28)',
  },
}

// ── Card de conquista desbloqueada ────────────────────────────────────────────
function AchievementCard({ conquista, index }) {
  const [expanded, setExpanded] = useState(false)
  const r = RARITY_CONFIG[conquista.raridade]
  const isLendario = conquista.raridade === 'lendario'
  const isEpico = conquista.raridade === 'epico'

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.38, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <motion.button
        onClick={() => setExpanded(v => !v)}
        className="w-full text-left relative overflow-hidden rounded-2xl transition-colors duration-150 active:scale-[0.985]"
        style={{
          background: `linear-gradient(135deg, ${r.bg}, rgba(255,255,255,0.025))`,
          border: `1px solid ${r.border}`,
        }}
        animate={
          isLendario
            ? {
                boxShadow: [
                  `0 0 0px ${r.glow}`,
                  `0 0 18px ${r.glow}, inset 0 0 18px ${r.ring}`,
                  `0 0 0px ${r.glow}`,
                ],
              }
            : isEpico
            ? { boxShadow: `0 2px 16px -4px rgba(0,0,0,0.45), 0 0 8px ${r.glow}` }
            : { boxShadow: `0 2px 12px -4px rgba(0,0,0,0.40)` }
        }
        transition={isLendario ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : {}}
        whileHover={{ scale: 1.012 }}
      >
        {/* Shine sweep para lendário */}
        {isLendario && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.18) 50%, transparent 70%)',
              zIndex: 1,
            }}
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
          />
        )}

        <div className="relative z-10 flex items-center gap-3 px-3.5 py-3">
          {/* Ícone */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: r.bg,
              border: `1.5px solid ${r.border}`,
              boxShadow: `0 0 12px ${r.glow}`,
            }}
          >
            {conquista.icon}
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm sm:text-base font-bold text-white/90 leading-tight">
                {conquista.titulo}
              </p>
              {/* Badge raridade */}
              <span
                className="flex-shrink-0 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  color: r.color,
                  background: r.bg,
                  border: `1px solid ${r.border}`,
                }}
              >
                {r.label}
              </span>
            </div>
            <p className="text-xs text-white/45 leading-snug mt-0.5 pr-1">
              {conquista.subtitulo}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              {conquista.data && (
                <span className="text-[10px] text-white/25 font-medium">{conquista.data}</span>
              )}
              <span className="text-[10px] font-black tabular-nums" style={{ color: r.color }}>
                +{r.xp.toLocaleString('pt-BR')} XP
              </span>
            </div>
          </div>

          {/* Chevron */}
          <motion.span
            className="flex-shrink-0 text-[10px] text-white/20 ml-0.5"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            ▼
          </motion.span>
        </div>

        {/* Descrição expandida */}
        <AnimatePresence initial={false}>
          {expanded && conquista.descricao && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden relative z-10"
            >
              <div
                className="px-4 pb-4 pt-0"
                style={{ borderTop: `1px solid ${r.border}` }}
              >
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed pt-3 font-body italic">
                  {conquista.descricao}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

// ── Card de conquista bloqueada ───────────────────────────────────────────────
function LockedCard({ conquista, index }) {
  const r = RARITY_CONFIG[conquista.raridade]

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, delay: index * 0.045, ease: 'easeOut' },
        },
      }}
    >
      <div
        className="w-full relative overflow-hidden rounded-2xl flex items-center gap-3 px-3.5 py-3"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Ícone bloqueado */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.06]">
          <span className="text-2xl grayscale opacity-25">{conquista.icon}</span>
        </div>

        {/* Texto muted */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold leading-tight" style={{ color: 'rgba(255,255,255,0.42)' }}>
              {conquista.titulo}
            </p>
            <span
              className="flex-shrink-0 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full opacity-25"
              style={{
                color: r.color,
                background: r.bg,
                border: `1px solid ${r.border}`,
              }}
            >
              {r.label}
            </span>
          </div>
          <p
            className="text-xs mt-1 flex items-center gap-1.5"
            style={{ color: 'rgba(255,228,230,0.55)' }}
          >
            <span aria-hidden className="text-[11px] opacity-80">🔒</span>
            <span>Ainda não desbloqueada</span>
          </p>
          <p
            className="text-[10px] font-black mt-1.5 tabular-nums"
            style={{ color: r.color, opacity: 0.45 }}
          >
            +{r.xp.toLocaleString('pt-BR')} XP
          </p>
        </div>

        <span className="text-base flex-shrink-0" style={{ color: 'rgba(255,228,230,0.35)' }} aria-hidden>
          🔒
        </span>
      </div>
    </motion.div>
  )
}

// ── Slide principal ───────────────────────────────────────────────────────────
export default function ConquistasSlide() {
  const desbloqueadas = useMemo(() => CONQUISTAS.filter(c => c.desbloqueada), [])
  const bloqueadas = useMemo(() => CONQUISTAS.filter(c => !c.desbloqueada), [])

  const currentXP = useMemo(
    () => desbloqueadas.reduce((acc, c) => acc + RARITY_CONFIG[c.raridade].xp, 0),
    [desbloqueadas],
  )
  const totalXP = useMemo(
    () => CONQUISTAS.reduce((acc, c) => acc + RARITY_CONFIG[c.raridade].xp, 0),
    [],
  )
  const nivelInfo = useMemo(
    () => getNivelInfo(currentXP, totalXP),
    [currentXP, totalXP],
  )

  // contagem por raridade
  const raridadesCount = useMemo(() => {
    const counts = { lendario: 0, epico: 0, raro: 0, especial: 0, comum: 0 }
    desbloqueadas.forEach(c => { counts[c.raridade]++ })
    return counts
  }, [desbloqueadas])

  return (
    <Slide id="conquistas" bg="slide-bg-conquistas" center={false}>
      {inView => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-5 w-full max-w-md lg:max-w-2xl mx-auto pb-14"
        >
          {/* ── Header ─────────────────────────────────────── */}
          <div className="text-center pt-2">
            <MI v={fadeV} className="chapter-label">Sistema de conquistas</MI>
            <MI
              v={scaleV}
              className="text-5xl sm:text-6xl mt-3 block"
              style={{ animation: 'pulseSoft 3s ease-in-out infinite' }}
            >
              🏆
            </MI>
            <MI className="mt-3">
              <h2
                className="font-display text-3xl sm:text-4xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 45%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Conquistas
              </h2>
            </MI>
            <MI v={fadeV}>
              <p className="text-white/35 text-sm mt-1">
                {desbloqueadas.length} de {CONQUISTAS.length} desbloqueadas
              </p>
            </MI>

            {/* badges de raridade */}
            <MI v={fadeV} className="flex items-center justify-center gap-2 flex-wrap mt-3">
              {[
                { key: 'lendario', emoji: '🏆' },
                { key: 'epico',    emoji: '💜' },
                { key: 'raro',     emoji: '💚' },
                { key: 'especial', emoji: '💙' },
                { key: 'comum',    emoji: '🩶' },
              ].map(({ key, emoji }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    color: RARITY_CONFIG[key].color,
                    background: RARITY_CONFIG[key].bg,
                    border: `1px solid ${RARITY_CONFIG[key].border}`,
                  }}
                >
                  {emoji} {raridadesCount[key]}× {RARITY_CONFIG[key].label}
                </span>
              ))}
            </MI>
          </div>

          {/* ── Nível & XP ─────────────────────────────────── */}
          <MI v={scaleV}>
            <div
              className="rounded-2xl px-4 py-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg tabular-nums"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(251,191,36,0.25))',
                      border: '1px solid rgba(251,191,36,0.45)',
                      color: '#fde68a',
                      boxShadow: '0 0 16px rgba(251,191,36,0.25)',
                    }}
                  >
                    {nivelInfo.nivel}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">
                      Nível {nivelInfo.nivel}
                      {!nivelInfo.noMaximo && (
                        <span className="text-white/20"> / {nivelInfo.maxNivel}</span>
                      )}
                    </p>
                    <p className="text-sm font-bold text-amber-200/85 leading-tight mt-0.5">
                      {getTituloNivel(nivelInfo.nivel)}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white/25 tabular-nums text-right">
                  {currentXP.toLocaleString('pt-BR')} XP
                </span>
              </div>

              {nivelInfo.noMaximo ? (
                <p className="text-xs text-center text-amber-300/70 font-semibold py-1">
                  Nível máximo alcançado - história completa 🏆
                </p>
              ) : (
                <>
                  <div
                    className="h-2.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #7c3aed 0%, #c084fc 40%, #fbbf24 100%)',
                        boxShadow: '0 0 14px rgba(251,191,36,0.45)',
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${nivelInfo.pct.toFixed(1)}%` } : { width: 0 }}
                      transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[9px] text-white/25 font-medium tabular-nums">
                      {nivelInfo.xpNoNivel.toLocaleString('pt-BR')} / {nivelInfo.xpSpan.toLocaleString('pt-BR')} XP
                    </span>
                    <span className="text-[9px] text-amber-300/55 font-bold tabular-nums">
                      faltam {nivelInfo.xpProximoNivel.toLocaleString('pt-BR')} XP p/ nv. {nivelInfo.nivel + 1}
                    </span>
                  </div>
                </>
              )}
            </div>
          </MI>

          {/* ── Desbloqueadas ──────────────────────────────── */}
          <div>
            <MI v={fadeV}>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(52,211,153,0.45))',
                  }}
                />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-400/65">
                  ✓ Desbloqueadas · {desbloqueadas.length}
                </span>
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(52,211,153,0.45), transparent)',
                  }}
                />
              </div>
            </MI>
            <motion.div
              className="space-y-2"
              variants={staggerV}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              {desbloqueadas.map((c, i) => (
                <AchievementCard key={c.id} conquista={c} index={i} />
              ))}
            </motion.div>
          </div>

          {/* ── Bloqueadas ─────────────────────────────────── */}
          <div>
            <MI v={fadeV}>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.10))',
                  }}
                />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/25">
                  🔒 Em breve · {bloqueadas.length}
                </span>
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0.10), transparent)',
                  }}
                />
              </div>
            </MI>
            <motion.div
              className="space-y-2"
              variants={staggerV}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              {bloqueadas.map((c, i) => (
                <LockedCard key={c.id} conquista={c} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Hint */}
          <MI v={fadeV}>
            <p
              className="text-center text-[11px] italic"
              style={{ color: 'rgba(255,228,230,0.52)' }}
            >
              Toque em uma conquista para ver a história 🎮
            </p>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
