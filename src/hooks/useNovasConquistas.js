import { useState, useEffect } from 'react'
import { CONQUISTAS } from '../data/constants'

const LS_KEY = 'conquistas-vistas-v1'

/**
 * Detecta conquistas desbloqueadas que o usuário ainda não viu.
 * Compara CONQUISTAS com a lista salva no localStorage.
 * Retorna a próxima da fila e uma função para marcar como vista.
 */
export function useNovasConquistas() {
  const [fila, setFila] = useState([])

  useEffect(() => {
    // Pequeno delay para não competir com a animação da LandingPage
    const t = setTimeout(() => {
      const raw = localStorage.getItem(LS_KEY)

      // Primeira visita: marca todas as conquistas desbloqueadas como já vistas
      // silenciosamente — notificações só aparecem para conquistas adicionadas depois.
      if (raw === null) {
        const todas = CONQUISTAS.filter(c => c.desbloqueada).map(c => c.id)
        localStorage.setItem(LS_KEY, JSON.stringify(todas))
        return
      }

      const vistas = JSON.parse(raw)
      const novas = CONQUISTAS.filter(c => c.desbloqueada && !vistas.includes(c.id))
      setFila(novas)
    }, 800)
    return () => clearTimeout(t)
  }, [])

  function marcarVista(id) {
    const vistas = JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
    if (!vistas.includes(id)) {
      localStorage.setItem(LS_KEY, JSON.stringify([...vistas, id]))
    }
    setFila(prev => prev.filter(c => c.id !== id))
  }

  return {
    proxima: fila[0] ?? null,
    restantes: Math.max(0, fila.length - 1),
    marcarVista,
  }
}
