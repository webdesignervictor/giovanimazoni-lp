import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hoverType, setHoverType] = useState('default') // default, action, focus, rec
  const [showClickPrompt, setShowClickPrompt] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring de alta precisão
  const springConfig = { damping: 28, stiffness: 250, mass: 0.5 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    let scrollTimeout
    let clickPromptInterval
    
    const moveMouse = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHover = (e) => {
      const target = e.target.closest('a, button, [role="button"], .port-item, .portrait-3d, [data-cursor]')
      setIsHovered(!!target)
      
      if (target) {
        if (target.classList.contains('port-item') || target.classList.contains('portrait-3d')) {
          setHoverType('focus')
          clearInterval(clickPromptInterval)
          setShowClickPrompt(false)
          clickPromptInterval = setInterval(() => {
            setShowClickPrompt(v => !v)
          }, 2000)
        } else if (target.dataset.cursor === 'play') {
          setHoverType('rec')
          setShowClickPrompt(false)
          clearInterval(clickPromptInterval)
        } else {
          setHoverType('action')
          setShowClickPrompt(false)
          clearInterval(clickPromptInterval)
        }
      } else {
        setHoverType('default')
        setShowClickPrompt(false)
        clearInterval(clickPromptInterval)
      }
    }

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => setIsScrolling(false), 300)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp   = () => setIsClicked(false)

    window.addEventListener('mousemove', moveMouse)
    window.addEventListener('mouseover', handleHover)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup',   handleMouseUp)
    window.addEventListener('scroll',    handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handleHover)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup',   handleMouseUp)
      window.removeEventListener('scroll',    handleScroll)
      clearTimeout(scrollTimeout)
      clearInterval(clickPromptInterval)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* 2. VIEWFINDER & MAIN DOT */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] hidden md:flex items-center justify-center p-0 m-0"
        style={{ 
          x, 
          y, 
          translateX: '-50%', 
          translateY: '-50%',
          opacity: hoverType === 'action' ? 0 : 1 
        }}
      >
        <AnimatePresence mode="wait">
          {isScrolling ? (
            <motion.div 
              key="scroll-ui"
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="w-[3px] h-12 bg-white/10 rounded-full relative overflow-hidden shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1/2 bg-[#22D3EE] rounded-full shadow-[0_0_8px_#22D3EE]"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
            </motion.div>
          ) : (hoverType === 'focus' || hoverType === 'rec') ? (
            <motion.div 
              key="viewfinder-ui"
              className="relative w-20 h-20 flex items-center justify-center"
              initial={{ rotate: -90, scale: 1.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
            >
              {/* Cantoneiras */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold" />
              
              {/* Linha de Escaneamento Laser */}
              <motion.div 
                className="absolute left-0 right-0 h-[1px] bg-gold/40 shadow-[0_0_8px_rgba(196,98,45,0.8)] z-[-1]"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />

              {/* Anel de Foco Central Dinâmico */}
              <motion.div 
                className="absolute w-10 h-10 border border-gold/30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />

              {/* Label Central com Transição */}
              <div className="overflow-hidden h-4 flex items-center justify-center translate-y-1">
                <AnimatePresence mode="wait">
                  {!showClickPrompt ? (
                    <motion.span 
                      key="focus-text"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-[9px] font-black tracking-[0.3em] text-gold uppercase"
                    >
                      {hoverType === 'focus' ? 'FOCUS' : 'REC'}
                    </motion.span>
                  ) : (
                    <motion.span 
                      key="click-text"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-[9px] font-black tracking-[0.3em] text-cream uppercase"
                    >
                      CLICK
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              {/* REC Dot */}
              {hoverType === 'rec' && (
                <motion.div 
                  className="absolute top-4 left-4 w-1.5 h-1.5 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="dot-ui"
              className="relative flex items-center justify-center"
            >
              {/* Anel Externo de Brilho */}
              <motion.div 
                className="absolute border border-red-500/30 rounded-full"
                animate={{ 
                  width: isHovered ? 40 : 24, 
                  height: isHovered ? 40 : 24,
                  scale: isClicked ? 1.2 : 1,
                  boxShadow: isHovered ? '0 0 20px rgba(239, 68, 68, 0.4)' : '0 0 10px rgba(239, 68, 68, 0.2)'
                }}
              />

              {/* Bolinha Central Vermelha com Shimmer */}
              <motion.div 
                className="relative w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.6)] overflow-hidden"
                animate={{ 
                  scale: isClicked ? 0.5 : 1
                }}
              >
                {/* Efeito Shimmer Interno */}
                <motion.div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  animate={{ 
                    x: ['-200%', '200%']
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                  style={{ skewX: -20 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shutter Flash Effect */}
        <AnimatePresence>
          {isClicked && (
            <motion.div 
              className="absolute inset-0 bg-white z-[10010] rounded-full"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 20, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
