import { useState, useEffect, useRef } from 'react'
import { INICIO_NAMORO } from '../data/constants'

export function useCountUp(end, duration = 1400, startOn = true) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)
  useEffect(() => {
    if (!startOn || end === 0) { setValue(end); return }
    let raf
    const animate = (now) => {
      if (!startRef.current) startRef.current = now
      const progress = Math.min((now - startRef.current) / duration, 1)
      const eased = progress < 0.7 ? progress * 1.2 : 0.84 + (progress - 0.7) * (0.16 / 0.3)
      setValue(Math.floor(eased * end))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, startOn])
  return value
}

export function useTempoJuntos() {
  const [t, setT] = useState({ meses: 0, dias: 0, horas: '00', minutos: '00', segundos: '00', totalDias: 0 })
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = now - INICIO_NAMORO
      if (diff < 0) return

      const totalDias = Math.floor(diff / 86400000)

      let compareDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const timeNow = now.getHours() * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + now.getMilliseconds()
      const timeStart = INICIO_NAMORO.getHours() * 3600000 + INICIO_NAMORO.getMinutes() * 60000 + INICIO_NAMORO.getSeconds() * 1000 + INICIO_NAMORO.getMilliseconds()

      if (timeNow < timeStart) {
        compareDate.setDate(compareDate.getDate() - 1)
      }

      let anos = compareDate.getFullYear() - INICIO_NAMORO.getFullYear()
      let meses = compareDate.getMonth() - INICIO_NAMORO.getMonth()
      let dias = compareDate.getDate() - INICIO_NAMORO.getDate()

      if (dias < 0) {
        meses -= 1
        const prevMonth = new Date(compareDate.getFullYear(), compareDate.getMonth(), 0)
        dias += prevMonth.getDate()
      }
      if (meses < 0) {
        anos -= 1
        meses += 12
      }

      setT({
        meses: anos * 12 + meses,
        dias: dias,
        horas: Math.floor((diff / 3600000) % 24).toString().padStart(2, '0'),
        minutos: Math.floor((diff / 60000) % 60).toString().padStart(2, '0'),
        segundos: Math.floor((diff / 1000) % 60).toString().padStart(2, '0'),
        totalDias,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

export function useIsMobile() {
  const [v, setV] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setV(mq.matches)
    const h = () => setV(mq.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return v
}