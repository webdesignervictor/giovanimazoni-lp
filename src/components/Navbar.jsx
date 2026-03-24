import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#sobre',      label: 'Sobre' },
  { href: '#servicos',   label: 'Serviços' },
  { href: '#portfolio',  label: 'Portfólio' },
  { href: '#depoimentos',label: 'Depoimentos' },
  { href: '#contato',    label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-white/[0.08] py-3'
          : 'py-5'
      }`}
    >
      {/* Desktop bar */}
      <div className="max-w-container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={e => go(e, '#home')}
           className="flex flex-col leading-none tracking-[0.12em] text-[0.75rem] font-semibold">
          <span className="text-cream">GIOVANI</span>
          <span className="text-gold">MAZONI</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => go(e, l.href)}
               className="relative text-[0.85rem] text-cream/55 tracking-[0.04em] hover:text-cream transition-colors duration-300 group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-[width] duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="#contato" onClick={e => go(e, '#contato')}
             className="btn-primary !px-5 !py-2 !text-[0.8rem]">
            Orçamento
          </a>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-cream p-1"
                onClick={() => setMenuOpen(v => !v)}
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden flex flex-col items-center bg-ink/97 border-t border-white/[0.08] px-6 pb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={e => go(e, l.href)}
                 className="w-full text-center py-4 text-[1.05rem] text-cream/55 border-b border-white/[0.08] hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contato" onClick={e => go(e, '#contato')}
               className="btn-primary w-full mt-4 justify-center">
              Solicitar Orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
