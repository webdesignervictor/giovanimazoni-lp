import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import TextReveal from './TextReveal'

const categories = ['Todos', 'Corporativo', 'Gastronomia', 'Eventos', 'Ensaios']

const items = [
  { id: 1, cat: 'Corporativo',  src: '/fotos/cel/_DSC7980.jpg',    alt: 'Evento corporativo premium',        span: 'landscape' },
  { id: 2, cat: 'Ensaios',      src: '/fotos/cel/_GMZ8165.jpg',    alt: 'Ensaio artístico profissional',     span: 'portrait'  },
  { id: 3, cat: 'Gastronomia',  src: '/fotos/cel/_GMZ7603.jpg',    alt: 'Fotografia gastronômica e catering',  span: 'landscape' },
  { id: 4, cat: 'Corporativo',  src: '/fotos/cel/_GMZ7578.jpg',    alt: 'Cobertura de evento empresarial',    span: 'landscape' },
  { id: 5, cat: 'Ensaios',      src: '/fotos/cel/_GMZ7605.jpg',    alt: 'Retrato e ensaio lifestyle',         span: 'portrait'  },
  { id: 6, cat: 'Eventos',      src: '/fotos/cel/_GMZ8656.jpg',    alt: 'Registro de evento social',          span: 'landscape' },
]

const spanClass = { portrait: 'row-span-2', landscape: 'row-span-1' }

export default function Portfolio({ preview = false }) {
  const [active,   setActive]   = useState('Todos')
  const [lightbox, setLightbox] = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const base     = active === 'Todos' ? items : items.filter(i => i.cat === active)
  const filtered = preview ? base.slice(0, 6) : base

  const navigate = dir => {
    const idx  = filtered.findIndex(i => i.id === lightbox.id)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  return (
    <section id="portfolio" className="bg-surface py-32 md:py-20">
      <div className="max-w-container mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label section-label--center">{preview ? 'Destaques' : 'Trabalhos recentes'}</p>
          <motion.h2 
            className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream justify-center mb-4 notranslate"
            translate="no"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Portfólio
          </motion.h2>
          <div className="gold-divider gold-divider--center" />
          {preview && (
            <p className="text-cream/55 mb-2">Foco em <strong className="text-gold">Corporativo</strong> e <strong className="text-gold">Gastronomia</strong>.</p>
          )}
        </motion.div>

        {/* Filters — only on full portfolio page */}
        {!preview && (
          <div className="flex justify-center flex-wrap gap-3 mb-10">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-1.5 rounded-full text-[0.82rem] font-medium tracking-[0.04em] border transition-all duration-300 ${
                  active === c
                    ? 'bg-gold border-gold text-ink'
                    : 'border-white/[0.08] text-cream/55 hover:border-gold hover:text-gold'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  rotateX: 3, 
                  rotateY: -3,
                  scale: 1.02,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                className={`port-item relative rounded-lg overflow-hidden cursor-none ${spanClass[item.span] || ''}`}
                onClick={() => setLightbox(item)}
              >
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover object-center" />
                <div className="port-overlay">
                  <span className="text-[0.9rem] font-semibold text-gold tracking-[0.06em] uppercase">{item.cat}</span>
                  <span className="text-[0.75rem] text-cream/55">Clique para ampliar</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA to full portfolio — only in preview mode */}
        {preview && (
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-primary inline-flex gap-2">
              Ver portfólio completo <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] bg-ink/96 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            {/* Glass Background Layer */}
            <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-md -z-10" />
            <div className="absolute inset-0 bg-black/40 -z-20" />
            
            {/* Animated Blobs (Liquid Effect) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
              <motion.div 
                className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-gold/20 rounded-full blur-[120px]"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] bg-gold/15 rounded-full blur-[100px]"
                animate={{
                  x: [0, -80, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] text-cream hover:bg-gold hover:text-ink hover:border-gold transition-all z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/[0.08] text-cream hover:bg-gold hover:text-ink hover:border-gold transition-all z-10"
              onClick={e => { e.stopPropagation(); navigate(-1) }}
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              className="max-w-4xl w-full flex flex-col gap-4"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[75vh] object-contain rounded-lg" />
              <p className="text-center text-cream/55 text-[0.85rem]">{lightbox.alt} · {lightbox.cat}</p>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/[0.08] text-cream hover:bg-gold hover:text-ink hover:border-gold transition-all z-10"
              onClick={e => { e.stopPropagation(); navigate(1) }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
