import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'

const navItems = [
  { to: '/',          label: 'Home',      exact: true },
  { to: '/portfolio', label: 'Portfólio'              },
  { to: '/servicos',  label: 'Serviços'               },
  { to: '/sobre',     label: 'Sobre'                  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location   = useLocation()
  const navigate   = useNavigate()
  const isHome     = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // On home page, clicking "Contato" scrolls; on other pages, navigates
  const handleCTA = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (isHome) {
      document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/contato')
    }
  }

  const activeCls = ({ isActive }) =>
    `relative text-[0.85rem] tracking-[0.04em] transition-colors duration-300 group ${
      isActive ? 'text-gold font-medium' : 'text-cream/55 hover:text-cream font-normal'
    }`

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-white/[0.08] py-3' : 'py-5'
    }`}>
      <div className="max-w-container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none tracking-[0.12em] text-[0.75rem] font-semibold">
          <span className="text-cream">GIOVANI</span>
          <span className="text-gold">MAZONI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={activeCls}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-[width] duration-300 group-hover:w-full" />
            </NavLink>
          ))}
          <a href="#contato" onClick={handleCTA} className="btn-primary !px-5 !py-2 !text-[0.8rem]">
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden flex flex-col items-center bg-ink/97 border-t border-white/[0.08] px-6 pb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-center py-4 text-[1.05rem] border-b border-white/[0.08] transition-colors ${
                    isActive ? 'text-gold font-medium' : 'text-cream/55 hover:text-gold'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a href="#contato" onClick={handleCTA} className="btn-whatsapp w-full mt-4 justify-center">
              <MessageCircle size={18} className="flex-shrink-0" />
              Solicitar Orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
