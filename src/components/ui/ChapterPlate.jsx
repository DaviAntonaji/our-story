import MI from './MI'
import Icon from './Icon'
import { fadeV, scaleV, upV, SLIDE_IDS } from '../../data/constants'

const ROMAN = [
  '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
  'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV',
]

/** Numeral romano do capítulo a partir do id do slide (sempre em sincronia com SLIDE_IDS). */
export function numeralDoSlide(id) {
  const i = SLIDE_IDS.indexOf(id)
  return i >= 0 ? ROMAN[i + 1] : ''
}

/**
 * Abertura de capítulo - o mesmo gesto tipográfico em todo o álbum:
 * selo com ícone · numeral · rótulo · título · filete · linha de apoio.
 */
export default function ChapterPlate({
  id,
  icon,
  kicker,
  title,
  lede,
  align = 'center',
  className = '',
}) {
  const numeral = numeralDoSlide(id)
  const centered = align === 'center'

  return (
    <div
      className={`flex flex-col gap-3.5 ${centered ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      <MI v={scaleV} className="flex items-center gap-3">
        {icon && (
          <span className="chapter-numeral" aria-hidden>
            <Icon name={icon} size={18} strokeWidth={1.3} />
          </span>
        )}
        {numeral && (
          <span
            className="font-display text-[0.6875rem] font-semibold tracking-[0.3em] t-faint"
            aria-label={`Capítulo ${numeral}`}
          >
            {numeral}
          </span>
        )}
      </MI>

      {kicker && (
        <MI v={fadeV} className="kicker">
          {kicker}
        </MI>
      )}

      {title && (
        <MI v={upV}>
          <h2 className="title-lg">{title}</h2>
        </MI>
      )}

      <MI v={fadeV} className={`chapter-rule ${centered ? '' : 'max-w-[12rem]'}`}>
        <span className="chapter-rule__line" />
        <span className="chapter-rule__mark" aria-hidden>
          ✦
        </span>
        <span className="chapter-rule__line" />
      </MI>

      {lede && (
        <MI v={fadeV}>
          <p className={`lede ${centered ? 'max-w-[34ch] mx-auto' : 'max-w-[42ch]'}`}>{lede}</p>
        </MI>
      )}
    </div>
  )
}
