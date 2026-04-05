import { motion } from 'framer-motion'

export default function StoryTimeline({ chapters, activeIndex, onChapterClick }) {
  return (
    <motion.nav
      className="fixed top-[72px] left-0 right-0 z-[90] bg-ink/80 backdrop-blur-md border-b border-white/[0.06]"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <div className="max-w-container mx-auto px-6 py-3">
        <div className="flex items-center gap-1 md:gap-0 overflow-x-auto scrollbar-hide">
          {chapters.map((chapter, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex

            return (
              <button
                key={chapter.id}
                onClick={() => onChapterClick(i)}
                className="flex items-center gap-2 md:gap-3 flex-shrink-0 group"
              >
                {/* Dot + Label */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-500">
                  {/* Chapter Number */}
                  <span className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-[0.6rem] font-mono font-bold transition-all duration-500
                    ${isActive
                      ? 'bg-gold text-ink scale-110'
                      : isPast
                        ? 'bg-gold/30 text-gold'
                        : 'bg-white/[0.08] text-cream/30 group-hover:text-cream/60'
                    }
                  `}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Label */}
                  <span className={`
                    text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-all duration-500 hidden sm:block
                    ${isActive
                      ? 'text-gold'
                      : isPast
                        ? 'text-cream/40'
                        : 'text-cream/20 group-hover:text-cream/40'
                    }
                  `}>
                    {chapter.title}
                  </span>
                </div>

                {/* Connector Line */}
                {i < chapters.length - 1 && (
                  <div className="w-8 md:w-12 h-px relative flex-shrink-0">
                    <div className="absolute inset-0 bg-white/[0.08]" />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={{ width: '0%' }}
                      animate={{ width: isPast ? '100%' : isActive ? '50%' : '0%' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
