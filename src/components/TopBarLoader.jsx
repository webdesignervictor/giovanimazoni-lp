import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function TopBarLoader() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[10000] origin-left shadow-[0_0_10px_rgba(196,98,45,0.5)] pointer-events-none"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut",
          opacity: { delay: 0.6, duration: 0.2 } 
        }}
      />
    </AnimatePresence>
  )
}
