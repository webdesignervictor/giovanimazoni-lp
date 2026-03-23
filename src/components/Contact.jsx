import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion' // eslint-disable-line no-unused-vars
import { MapPin, Mail, MessageCircle, Send } from 'lucide-react'

const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
import './Contact.css'

const infos = [
  {
    icon: <MapPin size={20} />,
    label: 'Localização',
    value: 'Franca, SP – Brasil',
    href: 'https://maps.google.com/?q=Franca+SP',
  },
  {
    icon: <IgIcon />,
    label: 'Instagram',
    value: '@giovanimazoni',
    href: 'https://instagram.com/giovanimazoni',
  },
  {
    icon: <Mail size={20} />,
    label: 'E-mail',
    value: 'contato@giovanimazoni.com.br',
    href: 'mailto:contato@giovanimazoni.com.br',
  },
]

const services = [
  'Casamento', 'Ensaio Fotográfico', 'Evento Corporativo',
  'Produção Audiovisual', 'Outro',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Olá, Giovani! Me chamo *${form.name}*.\n\n` +
      `📧 ${form.email}\n📱 ${form.phone}\n🎯 Serviço: ${form.service}\n\n${form.message}`
    )
    window.open(`https://wa.me/5516999999999?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <section id="contato" className="section contact">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>Vamos conversar</p>
          <h2 className="display-lg">Solicite um Orçamento</h2>
          <div className="gold-divider center" />
          <p className="contact__lead">
            Preencha o formulário abaixo e entraremos em contato em breve.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Info cards */}
          <motion.aside
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {infos.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target="_blank"
                rel="noreferrer"
                className="contact__info-card"
              >
                <span className="contact__info-icon">{info.icon}</span>
                <div>
                  <p className="contact__info-label">{info.label}</p>
                  <p className="contact__info-value">{info.value}</p>
                </div>
              </a>
            ))}

            <a
              href="https://wa.me/5516999999999"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary contact__wa"
            >
              <MessageCircle size={18} />
              Chamar no WhatsApp
            </a>
          </motion.aside>

          {/* Form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name">Nome completo *</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Seu nome" />
              </div>
              <div className="contact__field">
                <label htmlFor="email">E-mail *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="seu@email.com" />
              </div>
            </div>
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="phone">WhatsApp / Telefone</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(16) 99999-9999" />
              </div>
              <div className="contact__field">
                <label htmlFor="service">Tipo de serviço *</label>
                <select id="service" name="service" required value={form.service} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  {services.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="message">Mensagem *</label>
              <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Conte um pouco sobre o seu evento ou projeto..." />
            </div>
            <button type="submit" className="btn btn-primary contact__submit">
              <Send size={16} />
              {sent ? 'Redirecionado para WhatsApp!' : 'Enviar via WhatsApp'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
