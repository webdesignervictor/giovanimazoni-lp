import { motion } from 'framer-motion'

export default function Marquee({ items, speed = 20 }) {
  return (
    <div className="relative flex overflow-hidden bg-ink py-10 border-y border-white/[0.05]">
      <motion.div
        className="flex whitespace-nowrap gap-20"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className="font-display text-[3rem] md:text-[5rem] font-bold text-transparent stroke-text uppercase tracking-wider opacity-20"
            style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
