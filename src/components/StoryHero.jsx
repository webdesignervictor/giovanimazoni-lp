import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Calendar, Aperture, Palette } from 'lucide-react'

export default function StoryHero({ project }) {
  return (
    <section className="relative h-dvh min-h-[600px] flex items-end overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={project.coverFull}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />

      {/* Film Grain */}
      <div className="grain" />

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-6 pb-16 md:pb-24 w-full">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gold">
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] text-cream mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="text-cream/50 text-lg md:text-xl font-light mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {project.subtitle}
          </motion.p>

          {/* Metadata Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { icon: <Calendar size={14} />, label: project.date },
              { icon: <MapPin size={14} />, label: project.location },
              { icon: <Aperture size={14} />, label: project.gear },
              { icon: <Palette size={14} />, label: project.filmStyle },
            ].map((meta, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-cream/40 text-[0.75rem] font-mono tracking-wider uppercase"
              >
                <span className="text-gold">{meta.icon}</span>
                <span className="truncate">{meta.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-12 flex items-center gap-3 text-cream/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[0.7rem] font-mono tracking-[0.2em] uppercase hidden md:block">
            Role para a história
          </span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowRight size={18} className="text-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
