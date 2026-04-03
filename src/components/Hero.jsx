import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, MessageCircle } from 'lucide-react'
import LightLeaks from './Hero/LightLeaks'
import ParticlesOverlay from './Hero/ParticlesOverlay'
import Magnetic from './Magnetic'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Paralaxe: Texto sobe um pouco, Imagem desce um pouco
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yBg   = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-dvh min-h-[600px] flex items-center overflow-hidden"
    >

      {/* Background */}
      <div className="absolute inset-0">
        <motion.video
          style={{ y: yBg }}
          src="/videos/hero/video-hero-teste1.mp4"
          poster="/fotos/cel/hero1.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[120%] object-cover object-center absolute -top-[10%]"
        />
        {/* Directional overlay: dark left → transparent right (Ajustado para brilho) */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        
        {/* Dynamic Effects Layers */}
        <LightLeaks />
        <ParticlesOverlay />

        {/* Grain */}
        <div className="grain" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-6 pt-[72px]">
        <motion.div
  className="max-w-[640px]"
  style={{ y: yText, opacity }}
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
>
  <p className="section-label">Fotógrafo &amp; Filmmaker · Franca, SP</p>

  <motion.h1 
    className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-cream mt-4 mb-6 notranslate text-shadow-lg"
    translate="no"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
      }
    }}
    initial="hidden"
    animate="visible"
  >
    <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="block">
      Capturando momentos
    </motion.span>
    <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="animate-gold-sweep italic block">
      que duram para sempre
    </motion.span>
  </motion.h1>

  <p className="text-cream/55 text-[1.05rem] leading-[1.7] mb-8">
    Especialista em casamentos, ensaios e produções audiovisuais.<br />
    Arte que conta a sua história com emoção e elegância.
  </p>

  <div className="flex gap-6 flex-wrap mt-2">
    <Magnetic strength={0.3}>
      <button className="btn-primary" onClick={() => go('#portfolio')}>Ver Portfólio</button>
    </Magnetic>
    <Magnetic strength={0.3}>
      <button className="btn-whatsapp" onClick={() => go('#contato')}>
        <MessageCircle size={18} className="flex-shrink-0" />
        Solicitar Orçamento
      </button>
    </Magnetic>
  </div>
</motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
