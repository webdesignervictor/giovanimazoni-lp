import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Ana & Lucas',
    event: 'Casamento · Franca, SP',
    text: 'O Giovani capturou cada detalhe do nosso casamento com uma sensibilidade incrível. As fotos são lindas e o vídeo nos fez chorar de emoção! Super recomendo.',
    stars: 5,
  },
  {
    name: 'Fernanda Costa',
    event: 'Ensaio de gestante',
    text: 'Profissional incrível! Me deixou super à vontade durante o ensaio e o resultado superou todas as minhas expectativas. As fotos ficaram mágicas!',
    stars: 5,
  },
  {
    name: 'Empresa Tech Franca',
    event: 'Evento corporativo',
    text: 'Cobertura impecável do nosso evento de lançamento. Entregou no prazo, com qualidade altíssima. Com certeza vamos contratar novamente.',
    stars: 5,
  },
  {
    name: 'Mariana Oliveira',
    event: 'Ensaio 15 anos',
    text: 'As fotos ficaram um sonho! A equipe é muito atenciosa e o trabalho fotográfico é de outro nível. Amei cada detalhe do meu ensaio!',
    stars: 5,
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[idx]

  return (
    <section id="depoimentos" className="section testimonials">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>O que dizem</p>
          <h2 className="display-lg">Depoimentos</h2>
          <div className="gold-divider center" />
        </motion.div>

        <div className="testimonials__carousel">
          <button className="testimonials__arrow" onClick={prev} aria-label="Anterior">
            <ChevronLeft size={22} />
          </button>

          <motion.div
            key={idx}
            className="testimonials__card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <Quote className="testimonials__quote" size={36} />
            <p className="testimonials__text">{t.text}</p>
            <div className="testimonials__stars">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
              ))}
            </div>
            <div className="testimonials__author">
              <div className="testimonials__avatar">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="testimonials__name">{t.name}</p>
                <p className="testimonials__event">{t.event}</p>
              </div>
            </div>
          </motion.div>

          <button className="testimonials__arrow" onClick={next} aria-label="Próximo">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="testimonials__dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === idx ? 'testimonials__dot--active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
