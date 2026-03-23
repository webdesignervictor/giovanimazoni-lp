import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import './FAQ.css'

const faqs = [
  {
    q: 'Como funciona o processo para contratar seus serviços?',
    a: 'É simples! Entre em contato pelo formulário ou WhatsApp, conte sobre o seu evento ou projeto. Agendamos uma conversa para entender melhor o que você precisa, apresento o orçamento e, após a aprovação, formalizamos o contrato.',
  },
  {
    q: 'Com quanto tempo de antecedência devo contratar?',
    a: 'Para casamentos recomendo pelo menos 6 a 12 meses de antecedência, pois as datas costumam esgotar rápido. Para ensaios e eventos corporativos, entre 2 a 4 semanas já costuma ser suficiente.',
  },
  {
    q: 'Vocês entregam as fotos editadas? Qual o prazo?',
    a: 'Sim! Todas as fotos passam por seleção e edição profissional. O prazo de entrega varia por tipo de projeto: ensaios em até 15 dias, casamentos em até 45 dias, eventos corporativos em até 20 dias úteis.',
  },
  {
    q: 'Como as fotos e vídeos são entregues?',
    a: 'A entrega é feita por galeria online privada e individual, com download em alta resolução. Para álbuns e produtos impressos, entregamos pessoalmente ou pelo correio.',
  },
  {
    q: 'Vocês atendem em outras cidades além de Franca?',
    a: 'Sim! Além de Franca-SP, atendo em Ribeirão Preto, São Paulo e demais cidades do interior. Consulte disponibilidade e custos de deslocamento para eventos fora da região.',
  },
  {
    q: 'O que está incluso no pacote de casamento?',
    a: 'Os pacotes de casamento incluem cobertura da cerimônia e recepção, segundo fotógrafo opcional, galeria online, fotos editadas em alta resolução e filme de casamento. Verifique os detalhes de cada pacote no orçamento.',
  },
]

function FAQItem({ q, a, isOpen, toggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button className="faq-item__question" onClick={toggle}>
        <span>{q}</span>
        <span className="faq-item__icon">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            className="faq-item__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i)

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>Dúvidas frequentes</p>
          <h2 className="display-lg">Perguntas & Respostas</h2>
          <div className="gold-divider center" />
        </motion.div>

        <div className="faq__list">
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              q={f.q}
              a={f.a}
              isOpen={openIdx === i}
              toggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
