import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Quote, Clock, Package } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import StoryHero from '../components/StoryHero'
import StoryTimeline from '../components/StoryTimeline'
import StoryChapter from '../components/StoryChapter'
import { getProjectBySlug } from '../data/projects'

export default function Projeto() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const [activeChapter, setActiveChapter] = useState(0)
  const [showTimeline, setShowTimeline] = useState(false)
  const chapterRefs = useRef([])

  // Show timeline after hero scroll
  useEffect(() => {
    const onScroll = () => {
      setShowTimeline(window.scrollY > window.innerHeight * 0.5)

      // Detect active chapter based on scroll position
      const offsets = chapterRefs.current.map(ref =>
        ref ? ref.getBoundingClientRect().top : Infinity
      )
      const closest = offsets.findIndex(
        (top, i) => top <= 200 && (i === offsets.length - 1 || offsets[i + 1] > 200)
      )
      if (closest >= 0) setActiveChapter(closest)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleChapterClick = (index) => {
    chapterRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  // 404 fallback
  if (!project) {
    return (
      <PageTransition>
        <div className="bg-ink min-h-screen flex flex-col items-center justify-center gap-6 pt-32">
          <h1 className="font-display text-4xl font-bold text-cream">Projeto não encontrado</h1>
          <Link to="/portfolio" className="btn-primary">Voltar ao Portfólio</Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="bg-ink">
        {/* Back Button (Fixed) */}
        <motion.div
          className="fixed top-24 left-6 z-[95]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Link
            to="/portfolio"
            className="flex items-center gap-2 bg-ink/60 backdrop-blur-md border border-white/[0.08] px-4 py-2 rounded-full text-cream/50 hover:text-gold hover:border-gold/30 transition-all text-[0.78rem] font-medium"
          >
            <ArrowLeft size={14} />
            <span className="hidden md:inline">Portfólio</span>
          </Link>
        </motion.div>

        {/* Story Hero */}
        <StoryHero project={project} />

        {/* Story Timeline (Fixed, appears after hero) */}
        {showTimeline && (
          <StoryTimeline
            chapters={project.chapters}
            activeIndex={activeChapter}
            onChapterClick={handleChapterClick}
          />
        )}

        {/* Chapters */}
        {project.chapters.map((chapter, i) => (
          <div
            key={chapter.id}
            ref={el => (chapterRefs.current[i] = el)}
          >
            <StoryChapter
              chapter={chapter}
              index={i}
              total={project.chapters.length}
            />
          </div>
        ))}

        {/* Epilogue / CTA Section */}
        <section className="bg-surface py-32 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            {/* Project Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-cream/40">
                <Clock size={18} className="text-gold" />
                <span className="text-sm font-mono">{project.duration}</span>
              </div>
              <div className="flex items-center gap-3 text-cream/40">
                <Package size={18} className="text-gold" />
                <span className="text-sm font-mono">{project.deliverables}</span>
              </div>
            </motion.div>

            {/* Testimonial */}
            {project.testimonial && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Quote size={40} className="text-gold/30 mx-auto mb-6" />
                <blockquote className="text-cream text-lg md:text-xl italic leading-[1.8] mb-6">
                  &ldquo;{project.testimonial.text}&rdquo;
                </blockquote>
                <cite className="text-gold text-sm font-semibold not-italic tracking-wider uppercase">
                  — {project.testimonial.author}
                </cite>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-semibold text-cream">
                Quer algo assim para o seu projeto?
              </h2>
              <p className="text-cream/50 mb-4">
                Entre em contato e vamos criar a sua história juntos.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contato" className="btn-primary">
                  <MessageCircle size={16} />
                  Solicitar Orçamento
                </Link>
                <Link to="/portfolio" className="btn-outline">
                  Ver mais projetos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
