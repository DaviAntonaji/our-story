/**
 * Formas usadas na ambiência que cai pela tela - pétalas, folhas, notas.
 * Substituem os emojis: herdam a cor da cena e ficam elegantes tanto no
 * papel claro quanto nas folhas escuras.
 */

const SHAPES = {
  petal: <path d="M12 1.6C5.8 6.8 3.4 13 7.2 18.2c2.9 4 8.4 3 10.4-1.8 1.8-4.4-.4-10.4-5.6-14.8z" />,
  leaf: (
    <>
      <path d="M4 21C8.4 14 13.6 9 20 5.4c.9 7-1.8 12.5-6.6 15.1-2.6 1.5-5.9 1.5-9.4.5z" />
      <path d="M7 18c2.8-3.3 6.1-5.9 9.8-7.6" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
    </>
  ),
  heart: <path d="M12 21C12 21 2.8 15.4 2.8 9.6 2.8 6.6 5.1 4.4 8 4.4c2 0 3.4 1 4 2.4.6-1.4 2-2.4 4-2.4 2.9 0 5.2 2.2 5.2 5.2C21.2 15.4 12 21 12 21z" />,
  star: <path d="M12 2l1.9 6.5L20.5 10l-6.6 1.5L12 18l-1.9-6.5L3.5 10l6.6-1.5z" />,
  note: (
    <>
      <circle cx="8" cy="17.5" r="3.2" />
      <path d="M10.6 17.5V5.4l9-2v3.6l-9 2" />
    </>
  ),
  ring: (
    <>
      <circle cx="12" cy="14.5" r="5.4" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 3.4 14.6 7 12 10.2 9.4 7z" />
    </>
  ),
  drop: <path d="M12 2.4c4 5.2 6.6 8.9 6.6 12.2A6.6 6.6 0 0 1 5.4 14.6C5.4 11.3 8 7.6 12 2.4z" />,
  seed: <ellipse cx="12" cy="12" rx="4.2" ry="8" />,
}

export const SHAPE_NAMES = Object.keys(SHAPES)

export default function Shape({ name = 'petal', size = 18, className = '', style }) {
  const d = SHAPES[name] ?? SHAPES.petal
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
      focusable="false"
    >
      {d}
    </svg>
  )
}
