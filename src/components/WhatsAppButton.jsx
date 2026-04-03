import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Magnetic from './Magnetic'

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/5516999999999?text=Ol%C3%A1%2C+Giovani!+Gostaria+de+solicitar+um+or%C3%A7amento."

  return (
    <div className="fixed bottom-7 right-7 z-[150]">
      <Magnetic strength={0.4}>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chamar no WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] cursor-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25d366] animate-wa-pulse -z-10" />
          <MessageCircle size={26} fill="white" color="white" />
        </motion.a>
      </Magnetic>
    </div>
  )
}
