import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, Film, Building2, UtensilsCrossed, Heart,
  Users, Clock, MapPin, Package, Sparkles, 
  ArrowRight, ArrowLeft, MessageCircle, X, Loader2
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Wizard Steps Data
// ─────────────────────────────────────────────────────────────

const steps = [
  {
    id: 'tipo',
    question: 'Que tipo de projeto você precisa?',
    subtitle: 'Selecione o serviço que melhor se encaixa',
    options: [
      { value: 'casamento',   label: 'Casamento',             icon: Heart,             color: '#EF4444' },
      { value: 'corporativo', label: 'Evento Corporativo',    icon: Building2,         color: '#3B82F6' },
      { value: 'gastronomia', label: 'Fotografia Gastronômica', icon: UtensilsCrossed, color: '#F59E0B' },
      { value: 'ensaio',      label: 'Ensaio Fotográfico',    icon: Camera,            color: '#8B5CF6' },
      { value: 'audiovisual', label: 'Produção Audiovisual',  icon: Film,              color: '#10B981' },
    ],
  },
  {
    id: 'escala',
    question: 'Qual a escala do projeto?',
    subtitle: 'Isso nos ajuda a dimensionar a equipe',
    options: [
      { value: 'pequeno',  label: 'Pequeno',  desc: 'Até 50 pessoas / 20 pratos',   icon: Users },
      { value: 'medio',    label: 'Médio',    desc: '50-200 pessoas / 60 pratos',   icon: Users },
      { value: 'grande',   label: 'Grande',   desc: '200+ pessoas / produção full', icon: Users },
    ],
  },
  {
    id: 'duracao',
    question: 'Qual a duração estimada?',
    subtitle: 'Inclui preparação e cobertura',
    options: [
      { value: '2h',        label: '2 horas',      icon: Clock },
      { value: '4h',        label: '4 horas',      icon: Clock },
      { value: '8h',        label: '8 horas',      icon: Clock },
      { value: 'dia_todo',  label: 'Dia inteiro',  icon: Clock },
    ],
  },
  {
    id: 'local',
    question: 'Onde será o projeto?',
    subtitle: 'Custos de deslocamento podem variar',
    options: [
      { value: 'franca',     label: 'Franca, SP',          icon: MapPin },
      { value: 'regiao',     label: 'Região (até 100km)',  icon: MapPin },
      { value: 'estado',     label: 'São Paulo (capital)',  icon: MapPin },
      { value: 'outro',      label: 'Outro estado',        icon: MapPin },
    ],
  },
  {
    id: 'necessidade',
    question: 'O que você precisa na entrega?',
    subtitle: 'Podemos combinar formatos',
    options: [
      { value: 'fotos',       label: 'Apenas Fotos',         desc: 'Edição profissional + galeria online', icon: Camera },
      { value: 'fotos_video', label: 'Fotos + Vídeo',        desc: 'Cobertura completa em foto e vídeo',  icon: Film },
      { value: 'producao',    label: 'Produção Completa',    desc: 'Fotos, vídeo, making-of, drone',      icon: Package },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// Price estimation engine (rule-based, IA-ready)
// ─────────────────────────────────────────────────────────────

function estimatePrice(answers) {
  // Base prices by type
  const basePrices = {
    casamento:   { min: 3500, max: 6000 },
    corporativo: { min: 1200, max: 3500 },
    gastronomia: { min: 900,  max: 2500 },
    ensaio:      { min: 500,  max: 1500 },
    audiovisual: { min: 2000, max: 5000 },
  }

  let { min, max } = basePrices[answers.tipo] || { min: 1000, max: 3000 }

  // Scale multiplier
  const scaleMultiplier = { pequeno: 1, medio: 1.4, grande: 2 }
  const scale = scaleMultiplier[answers.escala] || 1
  min = Math.round(min * scale)
  max = Math.round(max * scale)

  // Duration multiplier
  const durationMultiplier = { '2h': 0.8, '4h': 1, '8h': 1.5, 'dia_todo': 2 }
  const dur = durationMultiplier[answers.duracao] || 1
  min = Math.round(min * dur)
  max = Math.round(max * dur)

  // Delivery multiplier
  const deliveryMultiplier = { fotos: 1, fotos_video: 1.6, producao: 2.2 }
  const del = deliveryMultiplier[answers.necessidade] || 1
  min = Math.round(min * del)
  max = Math.round(max * del)

  // Location surcharge
  const locationSurcharge = { franca: 0, regiao: 200, estado: 600, outro: 1200 }
  min += locationSurcharge[answers.local] || 0
  max += locationSurcharge[answers.local] || 0

  // Determine suggested package
  const packages = {
    casamento: 'Pacote Casamento Completo',
    corporativo: max > 2500 ? 'Corporativo Profissional' : 'Corporativo Essencial',
    gastronomia: max > 1800 ? "Chef's Table" : 'Menu Básico',
    ensaio: 'Ensaio Personalizado',
    audiovisual: 'Produção Audiovisual Custom',
  }

  // Generate personalized message
  const tipoLabel = steps[0].options.find(o => o.value === answers.tipo)?.label || answers.tipo
  const messages = {
    casamento: `Para o seu casamento, recomendo o pacote mais completo para garantir que nenhum momento especial seja perdido. Inclui cobertura integral, segundo fotógrafo opcional e álbum premium.`,
    corporativo: `Para o seu evento corporativo, a cobertura profissional garante imagens de alto impacto para comunicação interna e externa. Entrega ágil e galeria online privada.`,
    gastronomia: `A fotografia gastronômica é feita com iluminação controlada e styling de food — cada prato é fotografado para despertar apetite e engajamento nas redes.`,
    ensaio: `O ensaio é todo pensado para você se sentir à vontade. Trabalhamos juntos na direção, iluminação e composição para revelar sua melhor versão.`,
    audiovisual: `A produção audiovisual inclui pré-produção, captação em 4K e pós-produção profissional. Ideal para conteúdo institucional de alto impacto.`,
  }

  return {
    min,
    max,
    package: packages[answers.tipo] || 'Pacote Personalizado',
    message: messages[answers.tipo] || `Baseado nas suas necessidades, preparei uma estimativa personalizada para o seu projeto de ${tipoLabel.toLowerCase()}.`,
    tipo: tipoLabel,
  }
}

// ─────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────

function OptionCard({ option, isSelected, onClick }) {
  const Icon = option.icon
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-300 w-full group ${
        isSelected
          ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(196,98,45,0.15)]'
          : 'bg-surface border-white/[0.08] hover:border-gold/40'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
        isSelected ? 'bg-gold text-ink' : 'bg-white/[0.06] text-cream/40 group-hover:text-gold'
      }`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-[0.9rem] transition-colors ${isSelected ? 'text-gold' : 'text-cream'}`}>
          {option.label}
        </p>
        {option.desc && (
          <p className="text-cream/40 text-[0.8rem] mt-0.5">{option.desc}</p>
        )}
      </div>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}

function ResultCard({ result, answers, onReset, onWhatsApp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      {/* AI Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full mb-8"
      >
        <Sparkles size={14} className="text-gold" />
        <span className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gold">Estimativa Inteligente</span>
      </motion.div>

      {/* Price */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className="text-cream/40 text-sm mb-2">Investimento estimado</p>
        <div className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-cream leading-none mb-1">
          R$ {result.min.toLocaleString('pt-BR')}{' '}
          <span className="text-cream/30 text-[0.6em]">a</span>{' '}
          R$ {result.max.toLocaleString('pt-BR')}
        </div>
        <p className="text-gold font-semibold text-sm tracking-wider uppercase mt-3">
          {result.package}
        </p>
      </motion.div>

      {/* Divider */}
      <div className="gold-divider gold-divider--center !my-8" />

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-cream/55 leading-[1.8] max-w-lg text-[0.95rem]"
      >
        {result.message}
      </motion.p>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-cream/25 text-[0.75rem] mt-6 max-w-md"
      >
        * Esta é uma estimativa baseada nas suas respostas. O orçamento final pode variar conforme detalhes específicos do projeto.
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex flex-wrap gap-4 justify-center mt-10"
      >
        <button onClick={onWhatsApp} className="btn-primary">
          <MessageCircle size={16} />
          Falar com Giovani
        </button>
        <button onClick={onReset} className="btn-outline !px-6">
          Calcular novamente
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function AIEstimator({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const canProceed = answers[step?.id]

  const handleSelect = (value) => {
    setAnswers(prev => ({ ...prev, [step.id]: value }))
  }

  const handleNext = () => {
    if (isLastStep) {
      // Calculate result
      setIsCalculating(true)
      setTimeout(() => {
        const estimation = estimatePrice(answers)
        setResult(estimation)
        setIsCalculating(false)
      }, 2000) // Simulating AI processing time
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (result) {
      setResult(null)
      return
    }
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá, Giovani! Usei o estimador do site e gostaria de um orçamento.\n\n` +
      `📋 *Resumo:*\n` +
      `• Tipo: ${result.tipo}\n` +
      `• Escala: ${answers.escala}\n` +
      `• Duração: ${answers.duracao}\n` +
      `• Local: ${answers.local}\n` +
      `• Entrega: ${answers.necessidade}\n\n` +
      `💰 Estimativa: R$ ${result.min.toLocaleString('pt-BR')} a R$ ${result.max.toLocaleString('pt-BR')}\n` +
      `📦 Pacote sugerido: ${result.package}\n\n` +
      `Gostaria de conversar sobre os detalhes!`
    )
    window.open(`https://wa.me/5516999999999?text=${msg}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[250] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-ink border border-white/[0.08] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-ink/90 backdrop-blur-md border-b border-white/[0.06] px-6 md:px-8 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Sparkles size={16} className="text-gold" />
              </div>
              <div>
                <h3 className="text-cream font-semibold text-sm">Estimador Inteligente</h3>
                {!result && !isCalculating && (
                  <p className="text-cream/30 text-[0.7rem]">
                    Passo {currentStep + 1} de {steps.length}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-cream/30 hover:text-cream hover:bg-white/[0.06] transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Progress Bar */}
          {!result && !isCalculating && (
            <div className="h-[2px] bg-white/[0.06] relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          )}

          {/* Content */}
          <div className="px-6 md:px-8 py-8 md:py-10 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {isCalculating ? (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  >
                    <Loader2 size={40} className="text-gold" />
                  </motion.div>
                  <div className="text-center">
                    <p className="text-cream font-semibold mb-2">Analisando seu projeto...</p>
                    <p className="text-cream/40 text-sm">Calculando a melhor estimativa para você</p>
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div key="result">
                  <ResultCard
                    result={result}
                    answers={answers}
                    onReset={handleReset}
                    onWhatsApp={handleWhatsApp}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  {/* Question */}
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-cream mb-1">
                    {step.question}
                  </h2>
                  <p className="text-cream/40 text-sm mb-8">{step.subtitle}</p>

                  {/* Options */}
                  <div className={`grid gap-3 ${
                    step.options.length <= 3 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                  }`}>
                    {step.options.map(option => (
                      <OptionCard
                        key={option.value}
                        option={option}
                        isSelected={answers[step.id] === option.value}
                        onClick={() => handleSelect(option.value)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer — Navigation */}
          {!result && !isCalculating && (
            <div className="sticky bottom-0 bg-ink/90 backdrop-blur-md border-t border-white/[0.06] px-6 md:px-8 py-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-cream/40 hover:text-cream disabled:opacity-20 disabled:cursor-not-allowed transition-all text-sm font-medium"
              >
                <ArrowLeft size={16} /> Voltar
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-2 bg-gold text-ink px-6 py-2.5 rounded-lg font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-600 transition-all"
              >
                {isLastStep ? (
                  <>
                    <Sparkles size={14} /> Calcular estimativa
                  </>
                ) : (
                  <>
                    Próximo <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
