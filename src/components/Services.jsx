import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Film, Heart, Users } from 'lucide-react'

const services = [
  {
    icon: <Heart size={28} />,
    title: 'Casamentos',
    description: 'Cobertura completa do seu dia mais especial. Da cerimônia à festa, cada momento eternizado com emoção e arte.',
    tags: ['Cerimônia', 'Recepção', 'Álbum', 'Filme'],
  },
  {
    icon: <Camera size={28} />,
    title: 'Ensaios Fotográficos',
    description: 'Ensaios individuais, de casal, familiares ou corporativos. Imagens que revelam personalidade e contam histórias.',
    tags: ['Individual', 'Casal', 'Família', 'Corporativo'],
  },
  {
    icon: <Users size={28} />,
    title: 'Eventos Corporativos',
    description: 'Cobertura profissional de congressos, lançamentos, confraternizações e eventos institucionais.',
    tags: ['Congressos', 'Lançamentos', 'Institucional'],
  },
  {
    icon: <Film size={28} />,
    title: 'Produção Audiovisual',
    description: 'Vídeos institucionais, publicitários, clipes e documentários. Da pré-produção à entrega final editada.',
    tags: ['Institucional', 'Publicitário', 'Clipe', 'Doc'],
  },
]

export default function Services() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const go = (e) => {
    e.preventDefault()
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="servicos" className="bg-ink py-32 md:py-20">
      <div className="max-w-container mx-auto px-6">

        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label section-label--center">O que ofereço</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">Serviços</h2>
          <div className="gold-divider gold-divider--center" />
          <p className="text-cream/55 text-[1.05rem] leading-[1.7] mb-16">
            Cada tipo de projeto merece uma abordagem única.<br />
            Confira o que posso fazer por você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              className="relative overflow-hidden flex flex-col gap-3 bg-surface border border-white/[0.08] rounded-2xl p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 + 0.2 }}
            >
              {/* Gold hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="text-gold relative z-10">{s.icon}</span>

              <h3 className="font-display text-[1.2rem] font-semibold text-cream relative z-10">{s.title}</h3>

              <p className="text-cream/55 text-[0.9rem] leading-[1.7] flex-1 relative z-10">{s.description}</p>

              <div className="flex flex-wrap gap-2 relative z-10">
                {s.tags.map(t => (
                  <span key={t} className="text-[0.7rem] font-medium tracking-[0.06em] uppercase text-gold bg-gold/[0.12] px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <a href="#contato" onClick={go} className="text-[0.82rem] font-medium text-cream/55 group-hover:text-gold transition-colors mt-2 relative z-10">
                Solicitar orçamento →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
