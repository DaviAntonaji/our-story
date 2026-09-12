import Shape from './Shapes'

/** Chuva de pétalas da capa. */
export default function HeartsRain() {
  const items = [
    { n: 'petal', l: '5%',  d: '-4.5s', dur: 6.5, s: 20, c: 'rgba(236, 160, 176, 0.75)' },
    { n: 'heart', l: '13%', d: '-2s',   dur: 8,   s: 15, c: 'rgba(224, 128, 150, 0.6)' },
    { n: 'petal', l: '23%', d: '-3.2s', dur: 6,   s: 17, c: 'rgba(230, 180, 101, 0.6)' },
    { n: 'petal', l: '33%', d: '-1.8s', dur: 5.5, s: 22, c: 'rgba(240, 162, 176, 0.7)' },
    { n: 'heart', l: '43%', d: '-5s',   dur: 9,   s: 14, c: 'rgba(236, 160, 176, 0.5)' },
    { n: 'petal', l: '53%', d: '-2.5s', dur: 6.2, s: 19, c: 'rgba(224, 176, 106, 0.6)' },
    { n: 'petal', l: '63%', d: '-0.5s', dur: 5.8, s: 16, c: 'rgba(240, 162, 176, 0.7)' },
    { n: 'heart', l: '73%', d: '-3.5s', dur: 9.5, s: 15, c: 'rgba(224, 128, 150, 0.55)' },
    { n: 'petal', l: '82%', d: '-4.8s', dur: 6.8, s: 21, c: 'rgba(236, 160, 176, 0.7)' },
    { n: 'petal', l: '92%', d: '-2.8s', dur: 5.5, s: 17, c: 'rgba(230, 180, 101, 0.55)' },
  ]

  return (
    <div className="hearts-rain fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden>
      {items.map((h, i) => (
        <span
          key={i}
          style={{
            left: h.l,
            top: '-24px',
            color: h.c,
            animationDelay: h.d,
            animationDuration: `${h.dur}s`,
          }}
        >
          <Shape name={h.n} size={h.s} />
        </span>
      ))}
    </div>
  )
}
