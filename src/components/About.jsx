import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Portrait3D from './Portrait3D'

const stats = [
  { value: '8+',   label: 'Anos de Experiência' },
  { value: '350+', label: 'Projetos Realizados'  },
  { value: '200+', label: 'Clientes Satisfeitos' },
]

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" className="bg-surface py-32 md:py-20">
      <div className="max-w-container mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 md:gap-20 items-center">

          {/* Portrait 3D Interativo */}
          <Portrait3D />

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label">Sobre mim</p>

            <motion.h2 
              className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] text-cream notranslate"
              translate="no"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }}
              viewport={{ once: true }}
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="block">
                Por trás das lentes,{' '}
              </motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="animate-gold-sweep italic block">
                uma paixão por histórias
              </motion.span>
            </motion.h2>

            <div className="gold-divider" />

            <p className="text-cream/55 leading-[1.8] mb-4 text-[0.95rem]">
              Sou Giovani Mazoni, fotógrafo e filmmaker baseado em Franca, SP.
              Com mais de 8 anos de experiência, me especializei em capturar a
              emoção genuína de momentos únicos — de casamentos intimistas a
              grandes coberturas de eventos corporativos.
            </p>
            <p className="text-cream/55 leading-[1.8] text-[0.95rem]">
              Cada projeto é tratado com cuidado artístico e atenção aos detalhes.
              Meu trabalho une técnica cinematográfica e sensibilidade humana para
              entregar imagens e vídeos que contam histórias de verdade.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mt-10 pt-8 border-t border-white/[0.08]">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.6 }}
                >
                  <span className="font-display text-[2.25rem] font-bold text-gold leading-none">{s.value}</span>
                  <span className="text-[0.78rem] text-cream/55 tracking-[0.03em]">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
