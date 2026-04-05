import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Play, Camera, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import projects from '../data/projects'

// ─────────────────────────────────────────────────────────────
// Type Badges — Pokédex inspired, matching project categories
// ─────────────────────────────────────────────────────────────
const typeColors = {
  'Corporativo': { bg: 'bg-blue-500/20',   border: 'border-blue-500/40',  text: 'text-blue-400',   dot: 'bg-blue-400'   },
  'Ensaios':     { bg: 'bg-purple-500/20',  border: 'border-purple-500/40', text: 'text-purple-400', dot: 'bg-purple-400' },
  'Gastronomia': { bg: 'bg-amber-500/20',   border: 'border-amber-500/40',  text: 'text-amber-400',  dot: 'bg-amber-400'  },
  'Eventos':     { bg: 'bg-emerald-500/20',  border: 'border-emerald-500/40', text: 'text-emerald-400', dot: 'bg-emerald-400' },
}

function TypeBadge({ category }) {
  const colors = typeColors[category] || typeColors['Corporativo']
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.12em] border ${colors.bg} ${colors.border} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
      {category}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// Project Card — Pokédex-style with holographic hover
// ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const chaptersCount = project.chapters.length
  const photosCount = project.chapters.reduce((sum, ch) => sum + ch.photos.length, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/projeto/${project.slug}`}
        className="group relative block rounded-2xl overflow-hidden border border-white/[0.06] bg-surface hover:border-gold/30 transition-all duration-500"
      >
        {/* Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.coverFull || project.cover}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

          {/* Play indicator */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(196,98,45,0.4)]">
              <Play size={24} fill="#1a1a1a" className="text-ink ml-0.5" />
            </div>
          </motion.div>

          {/* Type Badge — top left */}
          <div className="absolute top-4 left-4 z-10">
            <TypeBadge category={project.category} />
          </div>

          {/* Chapters count — top right */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-ink/70 backdrop-blur-sm px-3 py-1 rounded-full text-[0.65rem] text-cream/70 font-medium border border-white/[0.06]">
            <Sparkles size={10} className="text-gold" />
            {chaptersCount} capítulos
          </div>
        </div>

        {/* Card Body — Info */}
        <div className="p-5 pb-6">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-display text-lg font-bold text-cream group-hover:text-gold transition-colors duration-300 leading-tight">
                {project.title}
              </h3>
              <p className="text-cream/40 text-[0.8rem] mt-0.5">{project.subtitle}</p>
            </div>
            <motion.div
              className="flex-shrink-0 w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-cream/30 group-hover:border-gold group-hover:text-gold transition-all"
              whileHover={{ x: 4 }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </div>

          {/* Stats row — horizontal scan line divider */}
          <div className="relative pt-3 mt-1">
            {/* Scan line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <motion.div
              className="absolute top-0 left-0 h-px w-12 bg-gradient-to-r from-gold to-transparent"
              animate={{ x: [0, 200, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex items-center gap-4 text-[0.72rem] text-cream/35">
              <span className="flex items-center gap-1.5">
                <Camera size={11} className="text-gold/60" />
                {photosCount} fotos
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} className="text-gold/60" />
                {project.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={11} className="text-gold/60" />
                {project.location}
              </span>
            </div>
          </div>
        </div>

        {/* Holographic shimmer on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-gold/[0.06]" />
        </div>
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main Showcase Section
// ─────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-ink py-28 md:py-24">
      <div className="max-w-container mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label section-label--center">Director&apos;s Cut</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">
            Histórias que Contamos
          </h2>
          <div className="gold-divider gold-divider--center" />
          <p className="text-cream/45 max-w-lg mx-auto text-[0.95rem]">
            Cada projeto é uma experiência narrativa. Clique para entrar na história.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* CTA — Ver Portfólio Completo */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-cream/40 hover:text-gold text-[0.85rem] font-medium tracking-wider transition-colors group"
          >
            Ver portfólio completo
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
