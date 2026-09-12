import Shape from './Shapes'

/** Borboletas em traço fino atravessando a página, bem discretas. */
export default function ButterfliesFloating({ isMobile }) {
  const all = [
    { l: '5%', d: '-18s', dur: 22, s: 20 },
    { l: '21%', d: '-8s', dur: 18, s: 15 },
    { l: '39%', d: '-25s', dur: 24, s: 22 },
    { l: '56%', d: '-3s', dur: 20, s: 16 },
    { l: '73%', d: '-14s', dur: 19, s: 19 },
    { l: '89%', d: '-22s', dur: 23, s: 15 },
  ]
  const visible = isMobile ? all.slice(0, 3) : all

  return (
    <div
      className="butterflies-float fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden
      style={{ color: 'rgba(150, 120, 132, 0.85)' }}
    >
      {visible.map((b, i) => (
        <span
          key={i}
          style={{
            left: b.l,
            top: '-24px',
            animationDelay: b.d,
            animationDuration: `${b.dur}s`,
          }}
        >
          <Shape name="petal" size={b.s} />
        </span>
      ))}
    </div>
  )
}
