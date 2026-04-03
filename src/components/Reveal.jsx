import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function Reveal({ children, width = "fit-content", delay = 0.25, threshold = 0.2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
