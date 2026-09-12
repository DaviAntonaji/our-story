/** Esqueleto leve enquanto um capítulo lazy carrega - mesma cena do alvo. */
export default function SlideSkeleton({ scene = 'scene-cream' }) {
  return (
    <section className={`snap-slide ${scene}`} aria-hidden>
      <span className="sheet-seam" />
      <div className="relative z-[1] flex flex-col items-center justify-center min-h-[100dvh] w-full px-5 py-12">
        <div className="flex flex-col items-center gap-4 w-full max-w-sm animate-pulse">
          <div className="h-10 w-10 rounded-full border" style={{ borderColor: 'var(--line)' }} />
          <div className="h-2 w-24 rounded-full" style={{ background: 'var(--line)' }} />
          <div className="h-8 w-52 rounded" style={{ background: 'var(--line-soft)' }} />
          <div className="mt-3 w-full space-y-3">
            <div className="h-28 rounded-2xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--line-soft)' }} />
            <div className="h-28 rounded-2xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--line-soft)' }} />
            <div className="h-20 rounded-2xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--line-soft)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
