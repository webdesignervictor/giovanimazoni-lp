import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = ['Todos', 'Casamentos', 'Ensaios', 'Eventos', 'Audiovisual']

const items = [
  { id: 1, cat: 'Casamentos',  src: '/port_wedding_1.png',  alt: 'Casamento ao pôr do sol',          span: 'landscape' },
  { id: 2, cat: 'Ensaios',     src: '/port_portrait_1.png', alt: 'Ensaio artístico em preto e branco', span: 'portrait'  },
  { id: 3, cat: 'Eventos',     src: '/port_event_1.png',    alt: 'Gala corporativa',                   span: 'landscape' },
  { id: 4, cat: 'Casamentos',  src: '/port_wedding_2.png',  alt: 'Cerimônia ao ar livre',              span: 'landscape' },
  { id: 5, cat: 'Ensaios',     src: '/port_portrait_2.png', alt: 'Ensaio de casal ao pôr do sol',      span: 'portrait'  },
  { id: 6, cat: 'Audiovisual', src: '/port_video_1.png',    alt: 'Produção audiovisual profissional',  span: 'landscape' },
]

const spanClass = { portrait: 'row-span-2', landscape: 'row-span-1' }

export default function Portfolio() {
  const [active,   setActive]   = useState('Todos')
  const [lightbox, setLightbox] = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = active === 'Todos' ? items : items.filter(i => i.cat === active)

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
          <p className="section-label section-label--center">Trabalhos recentes</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">Portfólio</h2>
          <div className="gold-divider gold-divider--center" />
        </motion.div>

        {/* Filters */}
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

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`port-item relative rounded-lg overflow-hidden cursor-pointer ${spanClass[item.span] || ''}`}
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
