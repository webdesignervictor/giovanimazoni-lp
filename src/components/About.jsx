import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User } from 'lucide-react'
import './About.css'

const stats = [
  { value: '8+', label: 'Anos de Experiência' },
  { value: '350+', label: 'Projetos Realizados' },
  { value: '200+', label: 'Clientes Satisfeitos' },
]

function StatItem({ value, label, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className="about__stat"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
    >
      <span className="about__stat-value">{value}</span>
      <span className="about__stat-label">{label}</span>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" className="section about">
      <div className="container about__inner">
        {/* Portrait Placeholder */}
        <motion.div
          className="about__portrait-wrap"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          ref={ref}
        >
          <div className="img-placeholder about__portrait">
            <User size={40} />
            <span>Foto do Giovani</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: 0 }}>
              Retrato profissional 3:4
            </span>
          </div>
          <div className="about__portrait-frame" />
        </motion.div>

        {/* Text */}
        <motion.div
          className="about__body"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Sobre mim</p>
          <h2 className="display-lg about__title">
            Por trás das lentes,<br />
            <em>uma paixão por histórias</em>
          </h2>
          <div className="gold-divider" />
          <p className="about__text">
            Sou Giovani Mazoni, fotógrafo e filmmaker baseado em Franca, SP.
            Com mais de 8 anos de experiência, me especializei em capturar a
            emoção genuína de momentos únicos — de casamentos intimistas a
            grandes coberturas de eventos corporativos.
          </p>
          <p className="about__text">
            Cada projeto é tratado com cuidado artístico e atenção aos detalhes.
            Meu trabalho une técnica cinematográfica e sensibilidade humana
            para entregar imagens e vídeos que contam histórias de verdade.
          </p>

          {/* Stats */}
          <div className="about__stats">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
