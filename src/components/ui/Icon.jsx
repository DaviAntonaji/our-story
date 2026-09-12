/**
 * Conjunto de ícones em traço fino — substitui emoji na "moldura" do site
 * (cabeçalhos, navegação, ornamentos). Os emojis continuam nos textos,
 * onde são conteúdo escrito à mão, não interface.
 *
 * Todos desenhados numa grade de 24×24, herdam `currentColor`.
 */

const PATHS = {
  heart: <path d="M12 20.4C12 20.4 3.5 15.3 3.5 9.9 3.5 7.2 5.6 5.2 8.2 5.2c1.8 0 3.1.9 3.8 2.2.7-1.3 2-2.2 3.8-2.2 2.6 0 4.7 2 4.7 4.7 0 5.4-8.5 10.5-8.5 10.5z" />,

  ring: (
    <>
      <circle cx="12" cy="14.8" r="5.6" />
      <path d="M12 3.6 14.8 7.2 12 10 9.2 7.2z" />
    </>
  ),

  cross: <path d="M12 3.4v17.2M7.2 8.6h9.6" />,

  envelope: (
    <>
      <rect x="3.2" y="6.2" width="17.6" height="11.6" rx="1.6" />
      <path d="M3.6 7 12 13.4 20.4 7" />
    </>
  ),

  camera: (
    <>
      <path d="M4 8.6h2.8L8 6.4h8l1.2 2.2H20a.8.8 0 0 1 .8.8v9a.8.8 0 0 1-.8.8H4a.8.8 0 0 1-.8-.8v-9A.8.8 0 0 1 4 8.6z" />
      <circle cx="12" cy="13.6" r="3.3" />
    </>
  ),

  pin: (
    <>
      <path d="M12 20.8s6.4-6 6.4-10.4a6.4 6.4 0 1 0-12.8 0C5.6 14.8 12 20.8 12 20.8z" />
      <circle cx="12" cy="10.2" r="2.3" />
    </>
  ),

  trophy: (
    <>
      <path d="M8.2 4.2h7.6v4.2a3.8 3.8 0 0 1-7.6 0z" />
      <path d="M8.2 5.6H5.6v1.2a3 3 0 0 0 2.7 3M15.8 5.6h2.6v1.2a3 3 0 0 1-2.7 3" />
      <path d="M12 12.4v3.4M9.4 20.4h5.2l-.6-4.6H10z" />
    </>
  ),

  hourglass: (
    <>
      <path d="M6.8 3.6h10.4M6.8 20.4h10.4" />
      <path d="M8.4 3.6c0 4 3.6 5.4 3.6 8.4s-3.6 4.4-3.6 8.4M15.6 3.6c0 4-3.6 5.4-3.6 8.4s3.6 4.4 3.6 8.4" />
    </>
  ),

  music: (
    <>
      <circle cx="7.4" cy="17.4" r="2.6" />
      <circle cx="17.6" cy="15.4" r="2.6" />
      <path d="M10 17.4V6.6l10.2-2.2v11" />
    </>
  ),

  book: (
    <>
      <path d="M12 6.4C9.6 4.8 6.8 4.4 4 5.2v13.2c2.8-.8 5.6-.4 8 1.2z" />
      <path d="M12 6.4c2.4-1.6 5.2-2 8-1.2v13.2c-2.8-.8-5.6-.4-8 1.2z" />
    </>
  ),

  flower: (
    <>
      <ellipse cx="12" cy="5.8" rx="2" ry="3.2" />
      <ellipse cx="12" cy="14.2" rx="2" ry="3.2" />
      <ellipse cx="7.8" cy="10" rx="3.2" ry="2" />
      <ellipse cx="16.2" cy="10" rx="3.2" ry="2" />
      <circle cx="12" cy="10" r="1.5" />
      <path d="M12 17.4v3.4" />
    </>
  ),

  leaf: (
    <>
      <path d="M6 20.4C10 14 14.6 9.4 20.4 6c.8 6.4-1.6 11.4-6 13.8-2.4 1.4-5.4 1.4-8.4.6z" />
      <path d="M8.6 17.8c2.6-3 5.6-5.4 9-7" />
    </>
  ),

  sparkle: (
    <>
      <path d="M12 3.4l1.5 5.1 5.1 1.5-5.1 1.5L12 16.6l-1.5-5.1L5.4 10l5.1-1.5z" />
      <path d="M18.4 15.6l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),

  quote: <path d="M10 7.2C7 7.8 5.4 9.8 5.4 12.8v4.4h4.8v-4.6H7.8c0-1.6.8-2.6 2.2-3zM19.6 7.2c-3 .6-4.6 2.6-4.6 5.6v4.4h4.8v-4.6h-2.4c0-1.6.8-2.6 2.2-3z" />,

  check: <path d="M4.6 12.6l4.8 4.8L19.4 6.6" />,

  lock: (
    <>
      <rect x="6.2" y="10.8" width="11.6" height="9.4" rx="1.6" />
      <path d="M8.8 10.8V8.2a3.2 3.2 0 0 1 6.4 0v2.6" />
    </>
  ),

  unlock: (
    <>
      <rect x="6.2" y="10.8" width="11.6" height="9.4" rx="1.6" />
      <path d="M8.8 10.8V8.2a3.2 3.2 0 0 1 6.2-1" />
    </>
  ),

  chevronDown: <path d="M6.2 9.4 12 15.2l5.8-5.8" />,
  chevronLeft: <path d="M14.6 5.4 7.8 12l6.8 6.6" />,
  chevronRight: <path d="M9.4 5.4 16.2 12l-6.8 6.6" />,
  close: <path d="M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6" />,
  arrowRight: <path d="M4.4 12h15.2M14.2 6.8 19.6 12l-5.4 5.2" />,

  bookmark: <path d="M6.8 3.8h10.4v16.4L12 16.2l-5.2 4z" />,

  sunrise: (
    <>
      <circle cx="12" cy="13.2" r="3.8" />
      <path d="M12 4.2v2.4M4.6 13.2H2.4M21.6 13.2h-2.2M6.4 7.6 8 9.2M17.6 7.6 16 9.2M2.6 18.4h18.8" />
    </>
  ),

  film: (
    <>
      <rect x="3.4" y="5.4" width="17.2" height="13.2" rx="1.4" />
      <path d="M3.4 9.2h17.2M3.4 14.8h17.2M7.6 5.4v13.2M16.4 5.4v13.2" />
    </>
  ),

  scroll: (
    <>
      <path d="M7 4.4h9.4a1.8 1.8 0 0 1 1.8 1.8v11.6a1.8 1.8 0 0 1-1.8 1.8H7a1.8 1.8 0 0 0 1.8-1.8V6.2A1.8 1.8 0 0 0 7 4.4z" />
      <path d="M10.4 9h5M10.4 12.4h5" />
    </>
  ),

  chat: <path d="M4.4 5.6h15.2a.8.8 0 0 1 .8.8v8.4a.8.8 0 0 1-.8.8h-8.4l-4.4 3.4v-3.4H4.4a.8.8 0 0 1-.8-.8V6.4a.8.8 0 0 1 .8-.8z" />,

  butterfly: (
    <>
      <path d="M12 7.4v11" />
      <path d="M12 9.6C10.4 6.4 7.8 4.8 5.8 5.9 3.3 7.2 3.6 11.2 5.9 12.6c-2.3 1.4-2.6 5.4-.1 6.7 2 1 4.6-.6 6.2-3.7" />
      <path d="M12 9.6c1.6-3.2 4.2-4.8 6.2-3.7 2.5 1.3 2.2 5.3-.1 6.7 2.3 1.4 2.6 5.4.1 6.7-2 1-4.6-.6-6.2-3.7" />
    </>
  ),

  gift: (
    <>
      <rect x="3.8" y="10.2" width="16.4" height="10" rx="1.2" />
      <path d="M3.2 7.2h17.6v3H3.2zM12 7.2v13" />
      <path d="M12 7.2C10.2 7.2 8 6.7 8 5.2s2.2-1.4 4 2c1.8-3.4 4-3.5 4-2s-2.2 2-4 2z" />
    </>
  ),

  home: (
    <>
      <path d="M3.8 11 12 4.6l8.2 6.4v9.2H3.8z" />
      <path d="M9.6 20.2v-6h4.8v6" />
    </>
  ),

  shield: <path d="M12 3.6 19 6v6.2c0 4.4-3.3 7.6-7 8.4-3.7-.8-7-4-7-8.4V6z" />,

  globe: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M3.8 12h16.4M12 3.8c2.5 2.3 2.5 13.9 0 16.4M12 3.8c-2.5 2.3-2.5 13.9 0 16.4" />
    </>
  ),

  feather: (
    <>
      <path d="M4.4 19.8c5.8-1 9-4.2 11.4-8.6 1.4-2.6 2.8-5.2 4.2-7.6-3 .5-6.8 2-9.6 5.4-2.4 2.9-4.4 6.4-6 10.8z" />
      <path d="M4.4 19.8 10.8 13.4" />
    </>
  ),

  seal: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="5.2" />
    </>
  ),

  moon: <path d="M15.4 3.8A8.4 8.4 0 1 0 20.2 13 6.6 6.6 0 0 1 15.4 3.8z" />,

  compass: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M15.2 8.8 13.4 13.4 8.8 15.2 10.6 10.6z" />
    </>
  ),
}

export default function Icon({
  name,
  size = 20,
  strokeWidth = 1.4,
  filled = false,
  className = '',
  style,
}) {
  const d = PATHS[name]
  if (!d) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
      focusable="false"
    >
      {d}
    </svg>
  )
}

export const ICON_NAMES = Object.keys(PATHS)
