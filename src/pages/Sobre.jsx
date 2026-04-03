import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Camera, Aperture, Film, Award, MessageCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const stats = [
  { value: '8+',   label: 'Anos de Experiência'   },
  { value: '350+', label: 'Projetos Realizados'    },
  { value: '200+', label: 'Clientes Satisfeitos'   },
  { value: '15+',  label: 'Prêmios & Publicações'  },
]

const process = [
  { icon: <Camera size={22} />,   step: '01', title: 'Briefing',            desc: 'Entendemos juntos seus objetivos, o estilo que você deseja e os detalhes do projeto.' },
  { icon: <Aperture size={22} />, step: '02', title: 'Produção',            desc: 'Executamos a captura com equipamentos de cinema e técnica refinada para cada projeto.' },
  { icon: <Film size={22} />,     step: '03', title: 'Pós-produção',        desc: 'Edição profissional com grading cinematográfico, retoque e entrega de alta qualidade.' },
  { icon: <Award size={22} />,    step: '04', title: 'Entrega & Suporte',   desc: 'Galeria online privada, download em alta resolução e suporte pós-entrega.' },
]

const gear = [
  { cat: 'Câmeras',    items: ['Sony A7 IV',  'Canon R6 Mark II', 'Blackmagic Pocket 6K'] },
  { cat: 'Lentes',     items: ['Sony 24-70mm G Master', 'Canon 85mm 1.4L', 'Sigma Art 35mm'] },
  { cat: 'Iluminação', items: ['Godox AD600', 'Aputure 300D II', 'Nanlite Rebate'] },
  { cat: 'Vídeo',      items: ['Gimbal DJI RS3 Pro', 'Monitor Atomos', 'Rode NTG5'] },
]

export default function Sobre() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ref2   = useRef(null)
  const inView2 = useInView(ref2, { once: true, margin: '-80px' })

  return (
    <PageTransition>
      <div className="bg-ink">
        {/* Page Hero — 2 col */}
        <section className="bg-surface pt-40 pb-28">
          <div className="max-w-container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            {/* Portrait */}
            <motion.div
              className="relative max-w-[420px] mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/about_portrait.webp"
                alt="Giovani Mazoni – fotógrafo e filmmaker"
                className="w-full aspect-[3/4] object-cover object-top rounded-2xl"
              />
              <div className="absolute inset-0 translate-x-5 translate-y-5 border border-gold/20 rounded-2xl -z-10" />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-gold text-ink font-display text-sm font-bold px-5 py-3 rounded-xl shadow-lg">
                📸 Franca–SP
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="section-label">Sobre mim</p>
              <h1 className="font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-bold text-cream leading-[1.1] mb-6">
                Por trás das lentes,{' '}
                <span className="text-gold">uma paixão por histórias</span>
              </h1>
              <div className="space-y-4 text-cream/60 leading-[1.85] text-[0.95rem]">
                <p>
                  Sou <strong className="text-cream">Giovani Mazoni</strong>, fotógrafo e filmmaker baseado em Franca–SP,
                  especializado em <strong className="text-gold">fotografia corporativa</strong> e <strong className="text-gold">gastronomia</strong>.
                  Com 8 anos de trajetória, desenvolvi um olhar único que une técnica cinematográfica com sensibilidade humana.
                </p>
                <p>
                  Meu trabalho nasce de uma crença simples: cada empresa tem uma história que merece ser contada com beleza e verdade.
                  Seja num evento de lançamento, num prato assinado ou num vídeo institucional, entrego imagens que comunicam, vendem e emocionam.
                </p>
                <p>
                  Atendo principalmente Franca, Ribeirão Preto e São Paulo — e demais cidades com logística personalizada.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <Link to="/contato" className="btn-whatsapp">
                  <MessageCircle size={15} className="flex-shrink-0" />
                  Fale comigo <ArrowRight size={15} />
                </Link>
                <Link to="/portfolio" className="btn-outline">Ver portfólio</Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 border-y border-white/[0.06]">
          <div className="max-w-container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <p className="font-display text-[3rem] font-bold text-gold leading-none">{s.value}</p>
                <p className="text-cream/55 text-sm mt-2 tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-28 bg-surface" ref={ref2}>
          <div className="max-w-container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label section-label--center">Como trabalho</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">Processo Criativo</h2>
              <div className="gold-divider gold-divider--center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  className="relative flex flex-col gap-4 p-6 bg-ink border border-white/[0.06] rounded-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.2 }}
                >
                  <span className="text-[3rem] font-display font-black text-gold opacity-15 absolute top-4 right-4 leading-none">{p.step}</span>
                  <span className="w-10 h-10 rounded-full bg-gold/[0.12] text-gold flex items-center justify-center">{p.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-cream">{p.title}</h3>
                  <p className="text-cream/55 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment */}
        <section className="py-28">
          <div className="max-w-container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label section-label--center">Meu arsenal</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">Equipamentos</h2>
              <div className="gold-divider gold-divider--center" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {gear.map(g => (
                <div key={g.cat} className="p-6 bg-surface border border-white/[0.08] rounded-xl">
                  <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">{g.cat}</p>
                  <ul className="space-y-2">
                    {g.items.map(item => (
                      <li key={item} className="text-cream/60 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-surface">
          <div className="max-w-container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl font-semibold text-cream mb-4">Vamos criar algo incrível?</h2>
            <p className="text-cream/55 mb-8 text-lg">Entre em contato e vamos conversar sobre o seu projeto.</p>
            <Link to="/contato" className="btn-whatsapp text-base px-12 py-4">
              <MessageCircle size={20} className="flex-shrink-0" />
              Solicitar orçamento gratuito
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
