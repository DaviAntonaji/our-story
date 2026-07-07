/**
 * Descobre se hoje é aniversário de algum evento na TIMELINE ou nos MESESVERSARIOS.
 * Retorna um objeto com dados do evento, ou null se não houver coincidência hoje.
 */

const MESES_PT = [
  'janeiro','fevereiro','março','abril','maio','junho',
  'julho','agosto','setembro','outubro','novembro','dezembro',
]

/** Converte '09 de fevereiro de 2026' ou '13–15 de fevereiro de 2026' → Date */
function parseDataTimeline(str) {
  const clean = str.replace(/^(\d+)[–\-]\d+/, '$1').trim()
  const partes = clean.split(' ')
  const dia = parseInt(partes[0], 10)
  const mes = MESES_PT.indexOf(partes[2])
  const ano = parseInt(partes[4], 10)
  if (mes === -1 || isNaN(dia) || isNaN(ano)) return null
  return new Date(ano, mes, dia)
}

/** Converte diferença de datas em texto legível em PT */
function tempoAtras(data) {
  const hoje = new Date()
  const diasTotal = Math.floor((hoje - data) / 86_400_000)
  const anosTotal = hoje.getFullYear() - data.getFullYear()
  const mesesTotal =
    anosTotal * 12 + (hoje.getMonth() - data.getMonth())

  if (diasTotal < 1)  return 'hoje'
  if (diasTotal === 1) return '1 dia atrás'
  if (diasTotal < 30)  return `${diasTotal} dias atrás`
  if (mesesTotal === 1) return '1 mês atrás'
  if (mesesTotal < 12)  return `${mesesTotal} meses atrás`
  if (anosTotal === 1)  return '1 ano atrás'
  return `${anosTotal} anos atrás`
}

/**
 * @param {Array} timeline     — array TIMELINE de constants.js
 * @param {Array} mesesversarios — array MESESVERSARIOS de timeline.js
 * @returns {{ tipo, icon, label, titulo, resumo, tempo } | null}
 */
export function buscarHojeNaHistoria(timeline, mesesversarios) {
  const hoje = new Date()
  const m = hoje.getMonth()
  const d = hoje.getDate()

  // Mêsversários têm prioridade (já são datas comemorativas especiais)
  for (const mes of mesesversarios) {
    if (mes.data.getMonth() === m && mes.data.getDate() === d) {
      return {
        tipo: 'mesversario',
        icon: '🤍',
        label: 'Mêsversário de vocês!',
        titulo: mes.titulo,
        resumo: mes.resumo?.[0] ?? '',
        tempo: null,
      }
    }
  }

  // Evento da TIMELINE no mesmo dia e mês (qualquer ano)
  for (const item of timeline) {
    const data = parseDataTimeline(item.data)
    if (!data) continue
    if (data.getMonth() === m && data.getDate() === d) {
      return {
        tipo: 'timeline',
        icon: item.icon ?? '📅',
        label: 'Hoje na nossa história',
        titulo: item.titulo,
        resumo: item.paras?.[0]?.slice(0, 110) + (item.paras?.[0]?.length > 110 ? '…' : '') ?? '',
        tempo: tempoAtras(data),
      }
    }
  }

  return null
}
