import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Camera, Film, Building2, UtensilsCrossed, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const packagesCorpo = [
  {
    name: 'Essencial',
    price: 'A partir de R$ 1.200',
    desc: 'Ideal para pequenos eventos e reuniões corporativas.',
    items: ['Até 4h de cobertura', '150 fotos editadas', 'Galeria online privada', 'Entrega em até 15 dias'],
  },
  {
    name: 'Profissional',
    price: 'A partir de R$ 2.800',
    desc: 'Cobertura completa para eventos médios e lançamentos.',
    items: ['Até 8h de cobertura', '350 fotos editadas', 'Vídeo highlights 3min', 'Galeria online + download', 'Entrega em até 20 dias'],
    featured: true,
  },
  {
    name: 'Premium',
    price: 'Orçamento personalizado',
    desc: 'Solução completa para grandes eventos e produções.',
    items: ['Cobertura ilimitada', 'Fotos ilimitadas', 'Filme completo editado', 'Making-of', 'Atendimento prioritário'],
  },
]

const packagesGastro = [
  {
    name: 'Menu Básico',
    price: 'A partir de R$ 900',
    desc: 'Para restaurantes e pequenos estabelecimentos.',
    items: ['Até 20 pratos/produtos', '60 fotos editadas', 'Entrega em 10 dias', 'Uso para redes sociais'],
  },
  {
    name: 'Chef\'s Table',
    price: 'A partir de R$ 2.200',
    desc: 'Cobertura completa para cardápios e campanhas.',
    items: ['Até 60 pratos/produtos', '200 fotos editadas', 'Vídeos de processo', 'Licença comercial total', 'Entrega em 15 dias'],
    featured: true,
  },
  {
    name: 'Produção Completa',
    price: 'Orçamento personalizado',
    desc: 'Para grandes marcas, redes e campanhas nacionais.',
    items: ['Volume ilimitado', 'Direção de arte', 'Equipe completa', 'Vídeos + Fotos profissionais', 'Priority delivery'],
  },
]

function PackageCard({ pkg }) {
  return (
    <div className={`relative flex flex-col gap-4 rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
      pkg.featured
        ? 'bg-gold/[0.08] border-gold shadow-[0_0_40px_rgba(196,98,45,0.15)]'
        : 'bg-surface border-white/[0.08] hover:border-gold/50'
    }`}>
      {pkg.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink text-[0.7rem] font-bold px-4 py-1 rounded-full tracking-wider uppercase">
          Mais popular
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-cream">{pkg.name}</h3>
      <p className="text-gold font-semibold text-lg">{pkg.price}</p>
      <p className="text-cream/55 text-sm leading-relaxed">{pkg.desc}</p>
      <ul className="flex flex-col gap-2 mt-2 flex-1">
        {pkg.items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm text-cream/80">
            <CheckCircle2 size={15} className="text-gold flex-shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
      <Link to="/contato" className={`btn-whatsapp justify-center mt-4 ${!pkg.featured ? '!border-gold/50 !text-gold' : ''}`}>
        <MessageCircle size={18} className="flex-shrink-0" />
        Solicitar orçamento
      </Link>
    </div>
  )
}

export default function Servicos() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <PageTransition>
      <div className="bg-ink">
        {/* Page Hero */}
        <section className="bg-surface pt-40 pb-24">
          <div className="max-w-container mx-auto px-6 text-center" ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="section-label section-label--center">O que ofereço</p>
              <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold text-cream">Serviços</h1>
              <div className="gold-divider gold-divider--center" />
              <p className="text-cream/55 text-lg max-w-2xl mx-auto leading-relaxed">
                Especialista em <strong className="text-gold">fotografia corporativa</strong> e <strong className="text-gold">gastronomia</strong> em Franca–SP e região.
                Pacotes pensados para cada necessidade e orçamento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Corporativo */}
        <section className="py-28">
          <div className="max-w-container mx-auto px-6">
            <div className="flex items-center gap-4 mb-4">
              <Building2 className="text-gold" size={32} />
              <div>
                <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold text-cream">Fotografia Corporativa</h2>
                <p className="text-cream/55 text-sm mt-1">Eventos, headshots, cobertura institucional e produção audiovisual</p>
              </div>
            </div>
            <div className="gold-divider mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packagesCorpo.map(p => <PackageCard key={p.name} pkg={p} />)}
            </div>
          </div>
        </section>

        {/* Gastronomia */}
        <section className="py-28 bg-surface">
          <div className="max-w-container mx-auto px-6">
            <div className="flex items-center gap-4 mb-4">
              <UtensilsCrossed className="text-gold" size={32} />
              <div>
                <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold text-cream">Fotografia Gastronômica</h2>
                <p className="text-cream/55 text-sm mt-1">Food photography, cardápios, campanhas e conteúdo para redes sociais</p>
              </div>
            </div>
            <div className="gold-divider mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packagesGastro.map(p => <PackageCard key={p.name} pkg={p} />)}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-24">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-2xl font-semibold text-cream mb-10 text-center">Outros Serviços</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Camera size={24} />, title: 'Ensaios Fotográficos',  desc: 'Individual, casal, família, gestante ou debutante. Estúdio ou locação externa.' },
                { icon: <Film size={24} />,   title: 'Produção Audiovisual',  desc: 'Vídeos institucionais, clipes, reels, documentários e coberturas de eventos.' },
              ].map(s => (
                <div key={s.title} className="flex gap-5 p-6 bg-surface border border-white/[0.08] rounded-2xl hover:border-gold/50 transition-all">
                  <span className="text-gold mt-1 flex-shrink-0">{s.icon}</span>
                  <div>
                    <h3 className="font-semibold text-cream mb-2">{s.title}</h3>
                    <p className="text-cream/55 text-sm leading-relaxed">{s.desc}</p>
                    <Link to="/contato" className="inline-flex items-center gap-1 text-gold text-sm font-medium mt-3 hover:text-[#25d366] transition-all">
                      Solicitar <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 bg-surface">
          <div className="max-w-container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl font-semibold text-cream mb-4">Tem um projeto em mente?</h2>
            <p className="text-cream/55 mb-8 text-lg">Vamos conversar. O orçamento é gratuito e sem compromisso.</p>
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
