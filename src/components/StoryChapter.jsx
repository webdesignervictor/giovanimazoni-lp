import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function StoryChapter({ chapter, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Alternate layout: even chapters have text left, odd have text right
  const isReversed = index % 2 !== 0

  return (
    <section
      ref={ref}
      id={`chapter-${chapter.id}`}
      className="bg-ink py-24 md:py-32 border-t border-white/[0.04]"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Chapter Header */}
        <motion.div
          className={`flex flex-col md:flex-row items-start gap-6 mb-16 ${isReversed ? 'md:flex-row-reverse md:text-right' : ''}`}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Chapter Number */}
          <div className="flex-shrink-0">
            <span className="font-mono text-[4rem] md:text-[6rem] font-bold text-white/[0.04] leading-none select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Chapter Info */}
          <div className="max-w-xl">
            <p className="section-label">
              Capítulo {index + 1} de {total}
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold text-cream leading-[1.1] mb-2">
              {chapter.title}
            </h2>
            <p className="text-gold/70 text-sm font-medium tracking-wider uppercase mb-4">
              {chapter.subtitle}
            </p>
            <p className="text-cream/50 leading-[1.8] text-[0.95rem]">
              {chapter.description}
            </p>
          </div>
        </motion.div>

        {/* Photo Grid — Cinematic Layout */}
        <div className={`grid gap-4 ${
          chapter.photos.length === 1
            ? 'grid-cols-1'
            : chapter.photos.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : chapter.photos.length === 3
                ? 'grid-cols-1 md:grid-cols-[2fr_1fr] md:grid-rows-2'
                : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {chapter.photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-lg group ${
                // First photo in a 3-photo layout spans 2 rows
                chapter.photos.length === 3 && i === 0 ? 'md:row-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15 + 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={`relative overflow-hidden ${
                chapter.photos.length === 3 && i === 0
                  ? 'aspect-[3/4] md:aspect-auto md:h-full'
                  : chapter.photos.length === 1
                    ? 'aspect-[21/9]'
                    : 'aspect-[4/3]'
              }`}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Hover Overlay with Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gold rounded-full" />
                    <p className="text-cream text-sm font-medium">{photo.caption}</p>
                  </div>
                </div>

                {/* Corner Frame — Cinematic Feel */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
