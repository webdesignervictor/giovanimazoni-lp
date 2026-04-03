import { useState } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

export default function Portrait3D() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Suavização do movimento
  const mouseX = useSpring(x, { stiffness: 100, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 })

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = event.clientX - rect.left
    const mouseYPos = event.clientY - rect.top
    const xPct = (mouseXPos / width - 0.5) * 2
    const yPct = (mouseYPos / height - 0.5) * 2
    x.set(xPct)
    y.set(yPct)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  // Transformações 3D (Rotação e Paralaxe)
  const rotateX = useTransform(mouseY, [1, -1], [-15, 15])
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15])
  
  // Paralaxe das camadas
  const layerX = useTransform(mouseX, [-1, 1], [-15, 15])
  const layerY = useTransform(mouseY, [-1, 1], [-15, 15])

  return (
    <motion.div
      className="relative max-w-[400px] mx-auto md:mx-0 w-full aspect-[3/4] group cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Camada 1: Moldura Decorativa (Atrás) */}
      <motion.div
        className="absolute inset-x-5 inset-y-5 border border-gold/40 rounded-lg -z-10"
        style={{
          x: layerX,
          y: layerY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />

      {/* Camada 2: A FOTO PRINCIPAL */}
      <motion.div
        className="relative w-full h-full rounded-lg overflow-hidden border border-white/[0.08] shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src="/fotos/fotos-videos-do-giovani/fotos/gi1.jpeg"
          alt="Giovani Mazoni"
          className="w-full h-full object-cover object-top scale-110"
        />

        {/* Camada 3: Efeito de Vidro/Brilho */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        
        {/* Camada 4: VIEWFIKNDER UI (HUD de Câmera) */}
        <motion.div 
          className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-20"
          style={{
            x: useTransform(mouseX, [-1, 1], [10, -10]),
            y: useTransform(mouseY, [-1, 1], [10, -10]),
            translateZ: "40px"
          }}
        >
          {/* Brackets de Foco */}
          <div className="absolute inset-8 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
             <div className="w-12 h-12 border-t-2 border-l-2 border-cream absolute top-0 left-0" />
             <div className="w-12 h-12 border-t-2 border-r-2 border-cream absolute top-0 right-0" />
             <div className="w-12 h-12 border-b-2 border-l-2 border-cream absolute bottom-0 left-0" />
             <div className="w-12 h-12 border-b-2 border-r-2 border-cream absolute bottom-0 right-0" />
             {/* Centro */}
             <div className="w-2 h-2 rounded-full bg-gold " />
          </div>

          {/* Dados Técnicos (Topo) */}
          <div className="flex justify-between items-start text-[0.65rem] font-mono text-cream/70 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>REC 4K</span>
            </div>
            <span>STBY</span>
          </div>

          {/* Dados Técnicos (Rodapé) */}
          <div className="flex justify-between items-end text-[0.6rem] font-mono text-cream/70 uppercase tracking-[0.2em]">
             <div className="flex flex-col">
               <span>ISO 100</span>
               <span>f/2.8 1/200</span>
             </div>
             <div className="flex flex-col text-right">
               <span>AF-C</span>
               <span>RAW</span>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
