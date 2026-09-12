/**
 * Escada de raridade das conquistas - fonte única para o slide de Conquistas
 * e para o modal de desbloqueio. Do frio e discreto ao ouro.
 */
export const RARIDADES = {
  comum: {
    label: 'Comum',
    cor: '#a99bb0',
    glow: 'rgba(169, 155, 176, 0.45)',
    xp: 100,
  },
  especial: {
    label: 'Especial',
    cor: '#8fb0c8',
    glow: 'rgba(143, 176, 200, 0.48)',
    xp: 250,
  },
  raro: {
    label: 'Raro',
    cor: '#86bfa6',
    glow: 'rgba(134, 191, 166, 0.48)',
    xp: 300,
  },
  epico: {
    label: 'Épico',
    cor: '#c096e0',
    glow: 'rgba(192, 150, 224, 0.52)',
    xp: 500,
  },
  lendario: {
    label: 'Lendário',
    cor: '#e8b54f',
    glow: 'rgba(232, 181, 79, 0.62)',
    xp: 1000,
  },
}

/** Ordem de exibição, da mais rara para a mais comum. */
export const RARIDADE_ORDEM = ['lendario', 'epico', 'raro', 'especial', 'comum']

/** Cor / fundo / borda derivados, para não repetir color-mix em toda parte. */
export function tomRaridade(chave) {
  const r = RARIDADES[chave] ?? RARIDADES.comum
  return {
    ...r,
    bg: `color-mix(in srgb, ${r.cor} 9%, transparent)`,
    border: `color-mix(in srgb, ${r.cor} 36%, transparent)`,
    ring: `color-mix(in srgb, ${r.cor} 16%, transparent)`,
  }
}
