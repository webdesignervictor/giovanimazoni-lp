import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5516999999999?text=Ol%C3%A1%2C+Giovani!+Gostaria+de+solicitar+um+or%C3%A7amento."
      target="_blank"
      rel="noreferrer"
      className="whatsapp-btn"
      aria-label="Chamar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="whatsapp-btn__pulse" />
      <MessageCircle size={26} fill="white" color="white" />
    </motion.a>
  )
}
