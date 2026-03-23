import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={e => handleLink(e, '#home')}>
          <span className="navbar__logo-first">GIOVANI</span>
          <span className="navbar__logo-last">MAZONI</span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Navegação principal">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="navbar__link"
              onClick={e => handleLink(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="btn btn-primary navbar__cta"
            onClick={e => handleLink(e, '#contato')}
          >
            Orçamento
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="navbar__mobile-link"
                onClick={e => handleLink(e, l.href)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={e => handleLink(e, '#contato')}
            >
              Solicitar Orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
