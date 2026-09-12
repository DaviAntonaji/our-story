import { SLIDE_IDS, CAPITULOS, ROMANOS } from '../../data/constants'

/**
 * Fita marcadora lateral — uma marca por capítulo. No hover, revela
 * o numeral romano e o nome do capítulo.
 */
export default function ChapterRibbon({ active }) {
  const navigate = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className="ribbon-nav" aria-label="Capítulos">
      {SLIDE_IDS.map((id, i) => {
        const cap = CAPITULOS[id]
        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            className={`ribbon-nav__tick ${active === i ? 'active' : ''}`}
            aria-label={`Capítulo ${ROMANOS[i + 1]} — ${cap?.label ?? id}`}
            aria-current={active === i ? 'true' : undefined}
          >
            <span className="ribbon-nav__label" aria-hidden>
              {ROMANOS[i + 1]} · {cap?.label ?? id}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
