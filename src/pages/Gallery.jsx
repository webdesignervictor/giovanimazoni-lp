import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Send, ChevronLeft, LayoutGrid, List, CheckCircle2, X, Download } from 'lucide-react'
import PageTransition from '../components/PageTransition'

// Fotos reais da pasta /fotos/cel (MVP Fase 2)
const MOCK_PHOTOS = [
  { id: 1,  src: '/fotos/cel/thumb/_DSC7980.webp',    full: '/fotos/cel/full/_DSC7980.webp',    alt: 'Evento' },
  { id: 2,  src: '/fotos/cel/thumb/_GMZ7530.webp',    full: '/fotos/cel/full/_GMZ7530.webp',    alt: 'Evento' },
  { id: 3,  src: '/fotos/cel/thumb/_GMZ7571.webp',    full: '/fotos/cel/full/_GMZ7571.webp',    alt: 'Evento' },
  { id: 4,  src: '/fotos/cel/thumb/_GMZ7572.webp',    full: '/fotos/cel/full/_GMZ7572.webp',    alt: 'Evento' },
  { id: 5,  src: '/fotos/cel/thumb/_GMZ7578-1.webp',  full: '/fotos/cel/full/_GMZ7578-1.webp',  alt: 'Evento' },
  { id: 6,  src: '/fotos/cel/thumb/_GMZ7578.webp',    full: '/fotos/cel/full/_GMZ7578.webp',    alt: 'Evento' },
  { id: 7,  src: '/fotos/cel/thumb/_GMZ7586.webp',    full: '/fotos/cel/full/_GMZ7586.webp',    alt: 'Evento' },
  { id: 8,  src: '/fotos/cel/thumb/_GMZ7600.webp',    full: '/fotos/cel/full/_GMZ7600.webp',    alt: 'Evento' },
  { id: 9,  src: '/fotos/cel/thumb/_GMZ7603.webp',    full: '/fotos/cel/full/_GMZ7603.webp',    alt: 'Evento' },
  { id: 10, src: '/fotos/cel/thumb/_GMZ7605%202.webp', full: '/fotos/cel/full/_GMZ7605%202.webp', alt: 'Evento' },
  { id: 11, src: '/fotos/cel/thumb/_GMZ7605.webp',    full: '/fotos/cel/full/_GMZ7605.webp',    alt: 'Evento' },
  { id: 12, src: '/fotos/cel/thumb/_GMZ7664.webp',    full: '/fotos/cel/full/_GMZ7664.webp',    alt: 'Evento' },
  { id: 13, src: '/fotos/cel/thumb/_GMZ7668.webp',    full: '/fotos/cel/full/_GMZ7668.webp',    alt: 'Evento' },
  { id: 14, src: '/fotos/cel/thumb/_GMZ7672.webp',    full: '/fotos/cel/full/_GMZ7672.webp',    alt: 'Evento' },
  { id: 15, src: '/fotos/cel/thumb/_GMZ8026.webp',    full: '/fotos/cel/full/_GMZ8026.webp',    alt: 'Evento' },
  { id: 16, src: '/fotos/cel/thumb/_GMZ8165.webp',    full: '/fotos/cel/full/_GMZ8165.webp',    alt: 'Evento' },
  { id: 17, src: '/fotos/cel/thumb/_GMZ8176.webp',    full: '/fotos/cel/full/_GMZ8176.webp',    alt: 'Evento' },
  { id: 18, src: '/fotos/cel/thumb/_GMZ8212.webp',    full: '/fotos/cel/full/_GMZ8212.webp',    alt: 'Evento' },
  { id: 19, src: '/fotos/cel/thumb/_GMZ8221.webp',    full: '/fotos/cel/full/_GMZ8221.webp',    alt: 'Evento' },
  { id: 20, src: '/fotos/cel/thumb/_GMZ8598.webp',    full: '/fotos/cel/full/_GMZ8598.webp',    alt: 'Evento' },
  { id: 21, src: '/fotos/cel/thumb/_GMZ8612.webp',    full: '/fotos/cel/full/_GMZ8612.webp',    alt: 'Evento' },
  { id: 22, src: '/fotos/cel/thumb/_GMZ8618.webp',    full: '/fotos/cel/full/_GMZ8618.webp',    alt: 'Evento' },
  { id: 23, src: '/fotos/cel/thumb/_GMZ8656.webp',    full: '/fotos/cel/full/_GMZ8656.webp',    alt: 'Evento' },
  { id: 24, src: '/fotos/cel/thumb/hero1.webp',       full: '/fotos/cel/full/hero1.webp',       alt: 'Hero Imagem' },
]

export default function Gallery() {
  const { id } = useParams()
  const [selected, setSelected] = useState([])
  const [view,      setView]      = useState('grid') // grid | list
  const [lightbox,  setLightbox]  = useState(null)
  
  const toggleSelect = (photoId) => {
    setSelected(prev => 
      prev.includes(photoId) 
        ? prev.filter(i => i !== photoId) 
        : [...prev, photoId]
    )
  }

  const handleSendSelection = () => {
    const msg = encodeURIComponent(
      `Olá, Giovani! Finalizei a seleção das fotos da galeria *${id}*.\n\n📸 Fotos selecionadas (${selected.length}):\n${selected.map(id => `- ID ${id}`).join('\n')}`
    )
    window.open(`https://wa.me/5516999999999?text=${msg}`, '_blank')
  }

  return (
    <PageTransition>
      <div className="bg-ink min-h-screen pt-32 pb-40">
        <div className="max-w-container mx-auto px-6">
          
          {/* Header de Gestão da Galeria */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-4 hover:gap-3 transition-all">
                <ChevronLeft size={16} /> Voltar para Home
              </Link>
              <h1 className="font-display text-4xl font-bold text-cream">Sua Galeria <span className="text-gold">#{id}</span></h1>
              <p className="text-cream/55 mt-2">Selecione suas fotos favoritas para a edição final.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-surface p-1 rounded-lg flex border border-white/10">
                <button onClick={() => setView('grid')} className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-gold text-ink' : 'text-cream/40'}`}>
                  <LayoutGrid size={18} />
                </button>
                <button onClick={() => setView('list')} className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-gold text-ink' : 'text-cream/40'}`}>
                  <List size={18} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-[0.7rem] uppercase tracking-widest text-gold font-bold mb-1">Selecionadas</p>
                <p className="text-2xl font-display font-bold text-cream">{selected.length} <span className="text-cream/20 text-lg">/ {MOCK_PHOTOS.length}</span></p>
              </div>
            </div>
          </div>

          {/* Grid de Fotos */}
          <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {MOCK_PHOTOS.map((photo, i) => (
              <motion.div 
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group relative aspect-square bg-surface rounded-xl overflow-hidden border border-white/5"
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  loading="lazy"
                  onClick={() => setLightbox(photo)}
                  className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Check Overlay */}
                <div 
                  className={`absolute inset-0 bg-gold/20 transition-opacity duration-300 pointer-events-none ${selected.includes(photo.id) ? 'opacity-100' : 'opacity-0'}`} 
                />
                
                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <button 
                    onClick={() => toggleSelect(photo.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${selected.includes(photo.id) ? 'bg-gold text-ink' : 'bg-ink/80 text-cream backdrop-blur-sm'}`}
                  >
                    <Heart size={18} fill={selected.includes(photo.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="text-[0.6rem] font-bold bg-ink/80 text-cream/40 px-2 py-1 rounded backdrop-blur-sm">
                    IMG-{photo.id.toString().padStart(3, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Floating Final Action Bar */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg"
            >
              <div className="bg-gold p-4 rounded-2xl shadow-[0_20px_50px_rgba(196,98,45,0.4)] flex items-center justify-between gap-6">
                <div className="flex items-center gap-3 pl-2">
                  <div className="w-10 h-10 rounded-full bg-ink text-gold flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="text-ink">
                    <p className="text-xs font-bold uppercase tracking-tight leading-none">Pronto para finalizar?</p>
                    <p className="text-sm font-medium leading-none mt-1">{selected.length} fotos selecionadas</p>
                  </div>
                </div>
                <button 
                  onClick={handleSendSelection}
                  className="btn-primary !bg-ink !text-gold !shadow-none !px-6 py-4 flex items-center gap-2 group"
                >
                  Enviar para Giovani <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox - Pre-visualização Pro */}
        <AnimatePresence>
          {lightbox && (
            <motion.div 
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Glass Background Layers */}
              <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-md -z-10" />
              <div className="absolute inset-0 bg-black/40 -z-20" />
              
              {/* Animated Liquid Shapes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-40">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-radial from-gold/10 via-transparent to-transparent blur-[120px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                />
              </div>
              <button 
                onClick={() => setLightbox(null)}
                className="absolute top-8 right-8 text-cream/40 hover:text-gold transition-colors"
              >
                <X size={32} />
              </button>

              <div className="max-w-5xl w-full flex flex-col gap-6">
                <motion.img 
                  layoutId={lightbox.id}
                  src={lightbox.full || lightbox.src} 
                  className="w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="flex justify-between items-center bg-surface/50 p-6 rounded-2xl border border-white/5">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-cream">IMG-{lightbox.id.toString().padStart(3, '0')}</h3>
                    <p className="text-cream/40 text-sm">Alta Resolução · Fotógrafo Giovani Mazoni</p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                       onClick={() => toggleSelect(lightbox.id)}
                       className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${selected.includes(lightbox.id) ? 'bg-gold text-ink' : 'bg-white/5 text-cream border border-white/10 hover:border-gold'}`}
                    >
                      <Heart size={18} fill={selected.includes(lightbox.id) ? 'currentColor' : 'none'} />
                      {selected.includes(lightbox.id) ? 'Selecionada' : 'Selecionar'}
                    </button>
                    <button className="p-3 rounded-full bg-white/5 text-cream border border-white/10 hover:border-gold hover:text-gold transition-all">
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  )
}
