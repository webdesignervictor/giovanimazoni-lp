import { motion } from 'framer-motion'
import { ArrowDown, Camera } from 'lucide-react'
import './Hero.css'

export default function Hero() {
  const scrollToPortfolio = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      {/* Background image placeholder */}
      <div className="hero__bg">
        <div className="img-placeholder hero__placeholder">
          <Camera size={48} />
          <span>Foto Principal do Hero</span>
          <span className="hero__placeholder-hint">Substituir por foto cinematic de alta qualidade</span>
        </div>
        <div className="hero__overlay" />
        <div className="hero__grain" />
      </div>

      {/* Content */}
      <div className="container hero__content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero__text"
        >
          <p className="section-label">Fotógrafo & Filmmaker · Franca, SP</p>

          <h1 className="display-xl hero__title">
            Capturando momentos<br />
            <em>que duram para sempre</em>
          </h1>

          <p className="hero__subtitle">
            Especialista em casamentos, ensaios e produções audiovisuais.<br />
            Arte que conta a sua história com emoção e elegância.
          </p>

          <div className="hero__actions">
            <button className="btn btn-primary" onClick={scrollToPortfolio}>
              Ver Portfólio
            </button>
            <button className="btn btn-outline" onClick={scrollToContact}>
              Solicitar Orçamento
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} color="var(--color-gold)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
