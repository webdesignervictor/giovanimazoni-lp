import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, MessageCircle, Send, Clock } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)

const infos = [
  { icon: <MapPin size={20} />,         label: 'Localização',   value: 'Franca, SP – Brasil',             href: 'https://maps.google.com/?q=Franca+SP' },
  { icon: <IgIcon />,                   label: 'Instagram',     value: '@giovanimazoni',                   href: 'https://instagram.com/giovanimazoni' },
  { icon: <Mail size={20} />,           label: 'E-mail',        value: 'contato@giovanimazoni.com.br',     href: 'mailto:contato@giovanimazoni.com.br' },
  { icon: <Clock size={20} />,          label: 'Atendimento',   value: 'Seg–Sex: 9h–18h', href: null },
]

const servicesList = ['Fotografia Corporativa', 'Fotografia Gastronômica', 'Ensaio Fotográfico', 'Produção Audiovisual', 'Evento Corporativo', 'Outro']

export default function Contato() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Olá, Giovani! Me chamo *${form.name}*.\n\n📧 ${form.email}\n📱 ${form.phone}\n🎯 Serviço: ${form.service}\n\n${form.message}`
    )
    window.open(`https://wa.me/5516999999999?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  const field = 'flex flex-col gap-1.5'
  const label = 'text-[0.82rem] font-medium text-cream/55 tracking-[0.03em]'
  const input = 'bg-surface-2 border border-white/[0.08] rounded-lg px-4 py-3 text-cream text-[0.9rem] outline-none transition-colors focus:border-gold placeholder:text-cream/20'

  return (
    <PageTransition>
      <div className="bg-ink">
        {/* Page Hero */}
        <section className="bg-surface pt-40 pb-20">
          <div className="max-w-container mx-auto px-6 text-center" ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="section-label section-label--center">Vamos conversar</p>
              <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold text-cream">Contato</h1>
              <div className="gold-divider gold-divider--center" />
              <p className="text-cream/55 text-lg max-w-xl mx-auto leading-relaxed">
                Seja para um evento corporativo, um projeto gastronômico, ou outra ideia — estou aqui para ouvir você.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-24">
          <div className="max-w-container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-start">

            {/* Left — Info */}
            <motion.aside
              className="flex flex-col gap-5"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {infos.map(info => (
                info.href ? (
                  <a key={info.label} href={info.href} target="_blank" rel="noreferrer"
                     className="flex items-center gap-4 p-5 bg-surface border border-white/[0.08] rounded-xl hover:border-gold hover:translate-x-1 transition-all duration-300">
                    <span className="w-10 h-10 rounded-full bg-gold/[0.12] text-gold flex items-center justify-center flex-shrink-0">{info.icon}</span>
                    <div>
                      <p className="text-[0.75rem] text-cream/55 uppercase tracking-[0.08em] font-medium">{info.label}</p>
                      <p className="text-[0.9rem] text-cream font-medium mt-0.5">{info.value}</p>
                    </div>
                  </a>
                ) : (
                  <div key={info.label} className="flex items-center gap-4 p-5 bg-surface border border-white/[0.08] rounded-xl">
                    <span className="w-10 h-10 rounded-full bg-gold/[0.12] text-gold flex items-center justify-center flex-shrink-0">{info.icon}</span>
                    <div>
                      <p className="text-[0.75rem] text-cream/55 uppercase tracking-[0.08em] font-medium">{info.label}</p>
                      <p className="text-[0.9rem] text-cream font-medium mt-0.5">{info.value}</p>
                    </div>
                  </div>
                )
              ))}

              <a href="https://wa.me/5516999999999" target="_blank" rel="noreferrer" className="btn-primary justify-center mt-2">
                <MessageCircle size={18} /> Chamar no WhatsApp
              </a>

              <div className="mt-6 p-5 bg-gold/[0.07] border border-gold/20 rounded-xl">
                <p className="text-gold font-semibold text-sm mb-2">Áreas de Atendimento</p>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Franca · Ribeirão Preto · São Paulo<br />
                  Interior de SP e demais cidades (consulte deslocamento)
                </p>
              </div>
            </motion.aside>

            {/* Right — Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className={field}>
                  <label htmlFor="c-name" className={label}>Nome completo *</label>
                  <input id="c-name" type="text" required placeholder="Seu nome" className={input}
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className={field}>
                  <label htmlFor="c-email" className={label}>E-mail *</label>
                  <input id="c-email" type="email" required placeholder="seu@email.com" className={input}
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className={field}>
                  <label htmlFor="c-phone" className={label}>WhatsApp / Telefone</label>
                  <input id="c-phone" type="tel" placeholder="(16) 99999-9999" className={input}
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className={field}>
                  <label htmlFor="c-service" className={label}>Tipo de serviço *</label>
                  <select id="c-service" required className={`${input} bg-surface`}
                    value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                    <option value="">Selecione...</option>
                    {servicesList.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className={field}>
                <label htmlFor="c-message" className={label}>Conte sobre o seu projeto *</label>
                <textarea id="c-message" rows={6} required placeholder="Detalhe o projeto: data do evento, local, estilo, expectativas..." className={`${input} resize-y`}
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>

              <button type="submit" className="btn-primary self-start px-10 text-base" disabled={sent}>
                <Send size={16} /> {sent ? '✓ Enviado! Aguarde o retorno.' : 'Enviar via WhatsApp'}
              </button>
              <p className="text-cream/30 text-xs">Ao enviar, você será redirecionado ao WhatsApp com a mensagem pré-preenchida.</p>
            </motion.form>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
