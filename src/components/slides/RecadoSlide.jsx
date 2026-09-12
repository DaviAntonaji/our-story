import { useState } from 'react'
import { motion } from 'framer-motion'
import MI from '../ui/MI'
import Slide from '../ui/Slide'
import ChapterPlate from '../ui/ChapterPlate'
import RecadoForm from '../recados/RecadoForm'
import RecadoBoard from '../recados/RecadoBoard'
import { fadeV, staggerV, upV } from '../../data/constants'

export default function RecadoSlide() {
  const [boardKey, setBoardKey] = useState(0)

  return (
    <Slide id="recado" scene="scene-cork" center={false}>
      {(inView) => (
        <motion.div
          variants={staggerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="w-full max-w-3xl mx-auto flex flex-col gap-9 pb-10"
        >
          <ChapterPlate
            id="recado"
            icon="chat"
            kicker="Um recadinho"
            title="Quer deixar um recado pra gente?"
            lede="Se você chegou até aqui como amigo, família ou visitante: fique à vontade. Adoramos saber que passaram por aqui."
          />

          {/* Quadro de recados — recarrega com boardKey após novo envio */}
          <MI v={fadeV} className="w-full">
            <RecadoBoard fetchKey={boardKey} />
          </MI>

          {/* Formulário */}
          <MI v={upV} className="w-full">
            <div className="sheet sheet-feature px-5 py-6 sm:px-8 sm:py-8">
              <RecadoForm onSuccess={() => setBoardKey((k) => k + 1)} />
            </div>
          </MI>
        </motion.div>
      )}
    </Slide>
  )
}
