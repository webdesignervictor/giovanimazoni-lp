import { motion } from 'framer-motion'

export default function LightLeaks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
      {/* Leak 1 - Gold Corner */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[120%] h-[120%] bg-radial from-gold/15 via-gold/5 to-transparent blur-3xl opacity-0"
        animate={{
          x: ['-10%', '10%', '-5%'],
          y: ['-5%', '5%', '-10%'],
          opacity: [0.3, 0.6, 0.4, 0.3],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, rgba(196,98,45,0.2) 0%, rgba(196,98,45,0.05) 50%, transparent 80%)'
        }}
      />
      
      {/* Leak 2 - Secondary soft amber */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] opacity-0"
        animate={{
          x: ['10%', '-10%'],
          y: ['10%', '-10%'],
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, rgba(196,98,45,0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(100px)'
        }}
      />
    </div>
  )
}
