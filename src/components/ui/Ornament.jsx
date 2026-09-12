/**
 * Ornamentos do álbum: ramos botânicos desenhados a traço (no lugar dos
 * antigos "orbs" de brilho), monograma do casal e selo de cera.
 */

/** Ramo com folhas - ornamento de canto. A haste nasce no canto inferior esquerdo. */
export function Sprig({ className = '', flip = false, rotate = 0, style, strokeWidth = 1.1 }) {
  const transform = `${flip ? 'scaleX(-1) ' : ''}rotate(${rotate}deg)`
  return (
    <svg
      viewBox="0 0 120 180"
      className={className}
      style={{ ...style, transform }}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden
      focusable="false"
    >
      {/* haste */}
      <path d="M8 178C26 142 41 106 51 72c7-23 11-44 12-64" />
      {/* folhas à direita */}
      <path d="M51 72c10-10 24-10 31 0-10 10-24 10-31 0z" />
      <path d="M58 48c9-11 23-12 30-3-9 11-23 12-30 3z" />
      <path d="M62 26c7-12 20-15 28-8-7 12-20 15-28 8z" />
      {/* folhas à esquerda */}
      <path d="M45 88c-11-8-25-5-30 6 11 8 25 5 30-6z" />
      <path d="M37 110c-12-6-25 0-28 11 12 6 25 0 28-11z" />
      <path d="M27 134c-12-4-24 2-26 13 12 4 24-2 26-13z" />
      {/* botões */}
      <circle cx="64" cy="8" r="4.2" />
      <circle cx="74" cy="17" r="2.6" />
    </svg>
  )
}

/** Folhinha dupla - divisor discreto entre blocos. */
export function LeafRule({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 w-full ${className}`} aria-hidden>
      <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--line), var(--line))' }} />
      <svg viewBox="0 0 40 16" width="40" height="16" fill="none" stroke="currentColor" strokeWidth="1.1" className="t-accent opacity-70" focusable="false">
        <path d="M20 3v10" strokeLinecap="round" />
        <path d="M20 7c-3.4 0-5.6-1.8-5.6-4.6 3.4 0 5.6 1.8 5.6 4.6z" />
        <path d="M20 7c3.4 0 5.6-1.8 5.6-4.6-3.4 0-5.6 1.8-5.6 4.6z" />
        <circle cx="20" cy="13" r="1.4" />
      </svg>
      <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--line), var(--line), transparent)' }} />
    </div>
  )
}

/** Monograma do casal, em anel. */
export function Monogram({ className = '', size = 52 }) {
  return (
    <span className={`monogram ${className}`} style={{ width: size, height: size }} aria-label="Davi e Maysa">
      <span aria-hidden>D</span>
      <svg viewBox="0 0 24 24" width={11} height={11} fill="currentColor" className="mx-[0.12em] -mt-[0.06em]" aria-hidden focusable="false">
        <path d="M12 20.4C12 20.4 3.5 15.3 3.5 9.9 3.5 7.2 5.6 5.2 8.2 5.2c1.8 0 3.1.9 3.8 2.2.7-1.3 2-2.2 3.8-2.2 2.6 0 4.7 2 4.7 4.7 0 5.4-8.5 10.5-8.5 10.5z" />
      </svg>
      <span aria-hidden>M</span>
    </span>
  )
}

/** Selo de cera com o monograma gravado. */
export function WaxSeal({ className = '', style }) {
  return (
    <span className={`wax-seal ${className}`} style={style} aria-hidden>
      <span className="wax-seal__mono">D&nbsp;M</span>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-30"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        aria-hidden
        focusable="false"
      >
        <circle cx="50" cy="50" r="40" strokeDasharray="2 5" />
        <circle cx="50" cy="50" r="45" />
      </svg>
    </span>
  )
}
