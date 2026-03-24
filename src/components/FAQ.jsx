import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'Como funciona o processo para contratar seus serviços?', a: 'É simples! Entre em contato pelo formulário ou WhatsApp, conte sobre o seu evento ou projeto. Agendamos uma conversa para entender melhor o que você precisa, apresento o orçamento e, após a aprovação, formalizamos o contrato.' },
  { q: 'Com quanto tempo de antecedência devo contratar?', a: 'Para casamentos recomendo pelo menos 6 a 12 meses de antecedência, pois as datas costumam esgotar rápido. Para ensaios e eventos corporativos, entre 2 a 4 semanas já costuma ser suficiente.' },
  { q: 'Vocês entregam as fotos editadas? Qual o prazo?', a: 'Sim! Todas as fotos passam por seleção e edição profissional. O prazo de entrega varia por tipo de projeto: ensaios em até 15 dias, casamentos em até 45 dias, eventos corporativos em até 20 dias úteis.' },
  { q: 'Como as fotos e vídeos são entregues?', a: 'A entrega é feita por galeria online privada e individual, com download em alta resolução. Para álbuns e produtos impressos, entregamos pessoalmente ou pelo correio.' },
  { q: 'Vocês atendem em outras cidades além de Franca?', a: 'Sim! Além de Franca-SP, atendo em Ribeirão Preto, São Paulo e demais cidades do interior. Consulte disponibilidade e custos de deslocamento para eventos fora da região.' },
  { q: 'O que está incluso no pacote de casamento?', a: 'Os pacotes de casamento incluem cobertura da cerimônia e recepção, segundo fotógrafo opcional, galeria online, fotos editadas em alta resolução e filme de casamento. Verifique os detalhes de cada pacote no orçamento.' },
]

function FAQItem({ q, a, isOpen, toggle }) {
  return (
    <div className={`border rounded-lg overflow-hidden transition-colors duration-300 ${isOpen ? 'border-gold' : 'border-white/[0.08]'}`}>
      <button
        onClick={toggle}
        className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-[0.95rem] font-medium transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-cream'}`}
      >
        <span>{q}</span>
        <span className="text-gold flex-shrink-0">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-cream/55 text-[0.9rem] leading-[1.8]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="bg-surface py-32 md:py-20">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label section-label--center">Dúvidas frequentes</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold text-cream">Perguntas &amp; Respostas</h2>
          <div className="gold-divider gold-divider--center" />
        </motion.div>

        <div className="max-w-[760px] mx-auto mt-10 flex flex-col gap-3">
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              q={f.q}
              a={f.a}
              isOpen={openIdx === i}
              toggle={() => setOpenIdx(prev => prev === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
