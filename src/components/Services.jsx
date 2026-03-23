import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Film, Heart, Users } from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: <Heart size={28} />,
    title: 'Casamentos',
    description:
      'Cobertura completa do seu dia mais especial. Da cerimônia à festa, cada momento eternizado com emoção e arte.',
    tags: ['Cerimônia', 'Recepção', 'Album', 'Filme'],
  },
  {
    icon: <Camera size={28} />,
    title: 'Ensaios Fotográficos',
    description:
      'Ensaios individuais, de casal, familiares ou corporativos. Imagens que revelam personalidade e contam histórias.',
    tags: ['Individual', 'Casal', 'Família', 'Corporativo'],
  },
  {
    icon: <Users size={28} />,
    title: 'Eventos Corporativos',
    description:
      'Cobertura profissional de congressos, lançamentos, confraternizações e eventos institucionais.',
    tags: ['Congressos', 'Lançamentos', 'Institucional'],
  },
  {
    icon: <Film size={28} />,
    title: 'Produção Audiovisual',
    description:
      'Vídeos institucionais, publicitários, clipes e documentários. Da pré-produção à entrega final editada.',
    tags: ['Institucional', 'Publicitário', 'Clipe', 'Doc'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicos" className="section services">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>O que ofereço</p>
          <h2 className="display-lg services__title">Serviços</h2>
          <div className="gold-divider center" />
          <p className="services__lead">
            Cada tipo de projeto merece uma abordagem única.<br />
            Confira o que posso fazer por você.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 + 0.2 }}
            >
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
              <div className="service-card__tags">
                {s.tags.map(t => (
                  <span key={t} className="service-card__tag">{t}</span>
                ))}
              </div>
              <a
                href="#contato"
                className="service-card__cta"
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Solicitar orçamento →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
