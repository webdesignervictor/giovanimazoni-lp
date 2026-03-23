import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import './Portfolio.css'

const categories = ['Todos', 'Casamentos', 'Ensaios', 'Eventos', 'Audiovisual']

const items = [
  { id: 1, cat: 'Casamentos',  label: 'Casamento · Foto 1',    ratio: 'portrait' },
  { id: 2, cat: 'Ensaios',     label: 'Ensaio · Foto 1',       ratio: 'landscape' },
  { id: 3, cat: 'Eventos',     label: 'Evento · Foto 1',        ratio: 'square' },
  { id: 4, cat: 'Casamentos',  label: 'Casamento · Foto 2',    ratio: 'landscape' },
  { id: 5, cat: 'Audiovisual', label: 'Audiovisual · Frame 1', ratio: 'landscape' },
  { id: 6, cat: 'Ensaios',     label: 'Ensaio · Foto 2',       ratio: 'portrait' },
  { id: 7, cat: 'Eventos',     label: 'Evento · Foto 2',        ratio: 'landscape' },
  { id: 8, cat: 'Casamentos',  label: 'Casamento · Foto 3',    ratio: 'square' },
  { id: 9, cat: 'Audiovisual', label: 'Audiovisual · Frame 2', ratio: 'portrait' },
]

export default function Portfolio() {
  const [active, setActive] = useState('Todos')
  const [lightbox, setLightbox] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = active === 'Todos' ? items : items.filter(i => i.cat === active)

  const openLightbox = (item) => setLightbox(item)
  const closeLightbox = () => setLightbox(null)
  const navigate = (dir) => {
    const idx = filtered.findIndex(i => i.id === lightbox.id)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>Trabalhos recentes</p>
          <h2 className="display-lg">Portfólio</h2>
          <div className="gold-divider center" />
        </motion.div>

        {/* Filter tabs */}
        <div className="portfolio__filters">
          {categories.map(c => (
            <button
              key={c}
              className={`portfolio__filter ${active === c ? 'portfolio__filter--active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="portfolio__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`portfolio__item portfolio__item--${item.ratio}`}
                onClick={() => openLightbox(item)}
              >
                <div className="img-placeholder portfolio__ph">
                  <ImageIcon size={24} />
                  <span>{item.label}</span>
                  <span className="portfolio__ph-cat">{item.cat}</span>
                </div>
                <div className="portfolio__overlay">
                  <span className="portfolio__overlay-label">{item.cat}</span>
                  <span className="portfolio__overlay-hint">Clique para ampliar</span>
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
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Fechar">
              <X size={22} />
            </button>
            <button className="lightbox__nav lightbox__nav--prev" onClick={e => { e.stopPropagation(); navigate(-1) }}>
              <ChevronLeft size={28} />
            </button>
            <motion.div
              className="lightbox__content"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="img-placeholder lightbox__ph">
                <ImageIcon size={36} />
                <span>{lightbox.label}</span>
              </div>
              <p className="lightbox__caption">{lightbox.label} · {lightbox.cat}</p>
            </motion.div>
            <button className="lightbox__nav lightbox__nav--next" onClick={e => { e.stopPropagation(); navigate(1) }}>
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
