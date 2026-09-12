export default function Divider({ char = '✦' }) {
  return (
    <div className="flex items-center gap-3 w-full my-1" aria-hidden>
      <span
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--line))' }}
      />
      <span className="text-[0.55rem] tracking-[0.3em] t-accent opacity-70">{char}</span>
      <span
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, var(--line), transparent)' }}
      />
    </div>
  )
}
