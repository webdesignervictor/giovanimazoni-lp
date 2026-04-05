import { Link } from 'react-router-dom'

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const YtIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
)
const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const navLinks = [
  { to: '/',          label: 'Home'      },
  { to: '/portfolio', label: 'Portfólio' },
  { to: '/servicos',  label: 'Serviços'  },
  { to: '/contato',   label: 'Contato'   },
]

const socials = [
  { href: 'https://instagram.com/giovanimazoni', icon: <IgIcon />, label: 'Instagram' },
  { href: 'https://youtube.com/@giovanimazoni',  icon: <YtIcon />, label: 'YouTube'   },
  { href: 'https://facebook.com/giovanimazoni',  icon: <FbIcon />, label: 'Facebook'  },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/[0.08]">
      <div className="max-w-container mx-auto px-6 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-12">

        {/* Brand */}
        <div>
          <Link to="/" className="flex flex-col leading-none tracking-[0.14em] text-[0.85rem] font-bold mb-4">
            <span className="text-cream">GIOVANI</span>
            <span className="text-gold">MAZONI</span>
          </Link>
          <p className="text-[0.88rem] text-cream/55 leading-[1.7] mb-6">
            Fotógrafo &amp; Filmmaker em Franca, SP.<br />
            Capturando momentos que duram para sempre.
          </p>
          <div className="flex gap-3">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                 className="w-9 h-9 rounded-full border border-white/[0.08] text-cream/55 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav — using React Router Links */}
        <nav className="flex flex-col gap-3">
          <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-gold mb-1">Navegação</p>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to}
               className="text-[0.88rem] text-cream/55 hover:text-cream transition-colors duration-300">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-gold mb-1">Contato</p>
          <p className="text-[0.88rem] text-cream/55">📍 Franca, SP – Brasil</p>
          <a href="mailto:contato@giovanimazoni.com.br" className="text-[0.88rem] text-cream/55 hover:text-gold transition-colors">✉️ contato@giovanimazoni.com.br</a>
          <a href="https://wa.me/5516999999999" target="_blank" rel="noreferrer" className="text-[0.88rem] text-cream/55 hover:text-gold transition-colors">💬 WhatsApp</a>
          <a href="https://instagram.com/giovanimazoni" target="_blank" rel="noreferrer" className="text-[0.88rem] text-cream/55 hover:text-gold transition-colors">📸 @giovanimazoni</a>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="max-w-container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.8rem] text-cream/30">
          <p>© {new Date().getFullYear()} Giovani Mazoni. Todos os direitos reservados.</p>
          <p>Desenvolvido por{' '}
            <a href="https://instagram.com/victormazoni.webdesign" target="_blank" rel="noreferrer" className="text-gold hover:opacity-70 transition-opacity">
              Victor Mazoni Web Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
