import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative h-dvh min-h-[600px] flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero_bg.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Directional overlay: dark left → transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
        {/* Grain */}
        <div className="grain" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-6 pt-[72px]">
        <motion.div
          className="max-w-[640px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Fotógrafo &amp; Filmmaker · Franca, SP</p>

          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-cream mt-4 mb-6">
            Capturando momentos<br />
            <span className="text-gold italic">que duram para sempre</span>
          </h1>

          <p className="text-cream/55 text-[1.05rem] leading-[1.7] mb-8">
            Especialista em casamentos, ensaios e produções audiovisuais.<br />
            Arte que conta a sua história com emoção e elegância.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="btn-primary" onClick={() => go('#portfolio')}>Ver Portfólio</button>
            <button className="btn-outline" onClick={() => go('#contato')}>Solicitar Orçamento</button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
