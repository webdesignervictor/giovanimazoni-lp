import { motion } from 'framer-motion'

// Geração de partículas fora do componente para garantir pureza durante o render
const STATIC_PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  initialX: Math.random() * 100 + '%',
  initialY: Math.random() * 100 + '%',
  moveX: (Math.random() - 0.5) * 20 + '%',
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 20,
}))

export default function ParticlesOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-gold rounded-full blur-[0.5px]"
          initial={{
            opacity: 0,
            x: p.initialX,
            y: p.initialY,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: ['-10%', '110%'],
            x: [p.moveX, p.moveX],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}
