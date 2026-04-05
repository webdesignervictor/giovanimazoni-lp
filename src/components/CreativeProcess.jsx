import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Aperture, Film, Award } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Creative Process — Evolution Chain inspired by Pokémon
// Briefing → Produção → Pós-produção → Entrega
// ─────────────────────────────────────────────────────────────

const steps = [
  {
    icon: <Camera size={22} />,
    step: '01',
    title: 'Briefing',
    desc: 'Entendemos juntos seus objetivos, o estilo que você deseja e os detalhes do projeto.',
    color: 'from-blue-500/20 to-blue-500/0',
    ring: 'ring-blue-500/30',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: <Aperture size={22} />,
    step: '02',
    title: 'Produção',
    desc: 'Captura com equipamentos de cinema e técnica refinada para cada tipo de projeto.',
    color: 'from-purple-500/20 to-purple-500/0',
    ring: 'ring-purple-500/30',
    glow: 'shadow-purple-500/20',
  },
  {
    icon: <Film size={22} />,
    step: '03',
    title: 'Pós-produção',
    desc: 'Edição com grading cinematográfico, retoque e entrega em alta qualidade.',
    color: 'from-amber-500/20 to-amber-500/0',
    ring: 'ring-amber-500/30',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: <Award size={22} />,
    step: '04',
    title: 'Entrega',
    desc: 'Galeria online privada, download em alta resolução e suporte pós-entrega.',
    color: 'from-emerald-500/20 to-emerald-500/0',
    ring: 'ring-emerald-500/30',
    glow: 'shadow-emerald-500/20',
  },
]

export default function CreativeProcess() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-ink py-24 md:py-20 overflow-hidden">
      <div className="max-w-container mx-auto px-6" ref={ref}>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label section-label--center">Como trabalho</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">
            Processo Criativo
          </h2>
          <div className="gold-divider gold-divider--center" />
        </motion.div>

        {/* Evolution Chain */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Connection line — horizontal on large, hidden on mobile */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 via-amber-500/20 to-emerald-500/20" />
            <motion.div
              className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gold/60 to-transparent"
              animate={{ x: ['0%', '500%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="relative flex flex-col items-center text-center gap-4"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Evolution orb */}
              <div className={`relative w-[72px] h-[72px] rounded-full bg-surface ring-2 ${s.ring} flex items-center justify-center shadow-lg ${s.glow} z-10`}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.color}`} />
                <span className="relative text-gold">{s.icon}</span>

                {/* Step number badge */}
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-ink text-[0.55rem] font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>

              {/* Arrow between steps on mobile */}
              {i < steps.length - 1 && (
                <div className="lg:hidden text-cream/15 text-lg">↓</div>
              )}

              <div>
                <h3 className="font-display text-base font-semibold text-cream mb-1">{s.title}</h3>
                <p className="text-cream/45 text-[0.82rem] leading-relaxed max-w-[220px] mx-auto">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
