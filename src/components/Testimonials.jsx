import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

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
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[idx]

  return (
    <section id="depoimentos" className="bg-ink py-32 md:py-20">
      <div className="max-w-container mx-auto px-6">

        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label section-label--center">O que dizem</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">Depoimentos</h2>
          <div className="gold-divider gold-divider--center" />
        </motion.div>

        {/* Carousel */}
        <div className="flex items-center gap-4 max-w-[760px] mx-auto mt-10">
          <button
            onClick={() => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
            className="flex-shrink-0 w-11 h-11 items-center justify-center rounded-full border border-white/[0.08] text-cream/55 hover:border-gold hover:text-gold transition-all sm:flex hidden"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <motion.div
            key={idx}
            className="flex-1 bg-surface border border-white/[0.08] rounded-3xl p-10 sm:p-8 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Quote size={36} className="text-gold opacity-40" />
            <p className="text-cream text-[1rem] italic leading-[1.8]">{t.text}</p>
            <div className="flex gap-0.5">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/[0.12] border border-gold flex items-center justify-center font-display text-[1.2rem] text-gold font-semibold flex-shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[0.95rem] text-cream">{t.name}</p>
                <p className="text-[0.8rem] text-cream/55 mt-0.5">{t.event}</p>
              </div>
            </div>
          </motion.div>

          <button
            onClick={() => setIdx(i => (i + 1) % testimonials.length)}
            className="flex-shrink-0 w-11 h-11 items-center justify-center rounded-full border border-white/[0.08] text-cream/55 hover:border-gold hover:text-gold transition-all sm:flex hidden"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-gold w-6' : 'bg-white/[0.15] w-2'}`}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
