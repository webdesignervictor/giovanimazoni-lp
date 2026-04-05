import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, MessageCircle, Send, Sparkles } from 'lucide-react'
import AIEstimator from './AIEstimator'

const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)

const infos = [
  { icon: <MapPin size={20} />, label: 'Localização', value: 'Franca, SP – Brasil', href: 'https://maps.google.com/?q=Franca+SP' },
  { icon: <IgIcon />, label: 'Instagram', value: '@giovanimazoni', href: 'https://instagram.com/giovanimazoni' },
  { icon: <Mail size={20} />, label: 'E-mail', value: 'contato@giovanimazoni.com.br', href: 'mailto:contato@giovanimazoni.com.br' },
]

const servicesList = ['Casamento', 'Ensaio Fotográfico', 'Evento Corporativo', 'Produção Audiovisual', 'Outro']

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [showEstimator, setShowEstimator] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Olá, Giovani! Me chamo *${form.name}*.\n\n📧 ${form.email}\n📱 ${form.phone}\n🎯 Serviço: ${form.service}\n\n${form.message}`
    )
    window.open(`https://wa.me/5516999999999?text=${msg}`, '_blank')
  }

  const field = "flex flex-col gap-1.5"
  const label = "text-[0.82rem] font-medium text-cream/55 tracking-[0.03em]"
  const input = "bg-surface border border-white/[0.08] rounded-lg px-4 py-3 text-cream text-[0.9rem] outline-none transition-colors focus:border-gold placeholder:text-cream/20"

  return (
    <section id="contato" className="bg-ink py-32 md:py-20">
      <div className="max-w-container mx-auto px-6">

        <motion.div ref={ref} className="text-center"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="section-label section-label--center">Vamos conversar</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">Solicite um Orçamento</h2>
          <div className="gold-divider gold-divider--center" />
          <p className="text-cream/55 mb-0">Preencha o formulário e entraremos em contato em breve.</p>
          <button
            onClick={() => setShowEstimator(true)}
            className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-[0.8rem] font-semibold tracking-wider hover:bg-gold/20 hover:border-gold/40 transition-all"
          >
            <Sparkles size={14} /> Calcule seu orçamento com IA
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 mt-12 items-start">

          {/* Info cards */}
          <motion.aside className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
            {infos.map(info => (
              <a key={info.label} href={info.href} target="_blank" rel="noreferrer"
                 className="flex items-center gap-4 p-5 bg-surface border border-white/[0.08] rounded-lg hover:border-gold hover:translate-x-1 transition-all duration-300">
                <span className="w-10 h-10 rounded-full bg-gold/[0.12] text-gold flex items-center justify-center flex-shrink-0">{info.icon}</span>
                <div>
                  <p className="text-[0.75rem] text-cream/55 uppercase tracking-[0.08em] font-medium">{info.label}</p>
                  <p className="text-[0.9rem] text-cream font-medium mt-0.5">{info.value}</p>
                </div>
              </a>
            ))}
            <a href="https://wa.me/5516999999999" target="_blank" rel="noreferrer" className="btn-primary justify-center mt-4">
              <MessageCircle size={18} /> Chamar no WhatsApp
            </a>
          </motion.aside>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className={field}>
                <label htmlFor="name" className={label}>Nome completo *</label>
                <input id="name" name="name" type="text" required placeholder="Seu nome" className={input}
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className={field}>
                <label htmlFor="email" className={label}>E-mail *</label>
                <input id="email" name="email" type="email" required placeholder="seu@email.com" className={input}
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className={field}>
                <label htmlFor="phone" className={label}>WhatsApp / Telefone</label>
                <input id="phone" name="phone" type="tel" placeholder="(16) 99999-9999" className={input}
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className={field}>
                <label htmlFor="service" className={label}>Tipo de serviço *</label>
                <select id="service" name="service" required className={`${input} bg-surface`}
                  value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                  <option value="">Selecione...</option>
                  {servicesList.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className={field}>
              <label htmlFor="message" className={label}>Mensagem *</label>
              <textarea id="message" rows={5} required placeholder="Conte sobre o seu evento ou projeto..." className={`${input} resize-y`}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            <button type="submit" className="btn-primary self-start px-10">
              <Send size={16} /> Enviar via WhatsApp
            </button>
          </motion.form>
        </div>

        {/* AI Estimator Modal */}
        <AIEstimator isOpen={showEstimator} onClose={() => setShowEstimator(false)} />
      </div>
    </section>
  )
}
