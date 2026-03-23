// social icons as inline SVGs (lucide-react doesn't export social brand icons)
const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
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
import './Footer.css'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contato', label: 'Contato' },
]

const socials = [
  { href: 'https://instagram.com/giovanimazoni', icon: <IgIcon />, label: 'Instagram' },
  { href: 'https://youtube.com/@giovanimazoni', icon: <YtIcon />, label: 'YouTube' },
  { href: 'https://facebook.com/giovanimazoni', icon: <FbIcon />, label: 'Facebook' },
]

export default function Footer() {
  const handleLink = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span>GIOVANI</span>
            <span className="footer__logo-gold">MAZONI</span>
          </div>
          <p className="footer__tagline">
            Fotógrafo & Filmmaker em Franca, SP.<br />
            Capturando momentos que duram para sempre.
          </p>
          <div className="footer__socials">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="footer__social"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="footer__nav">
          <p className="footer__nav-title">Navegação</p>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="footer__nav-link"
              onClick={e => handleLink(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Contact quick */}
        <div className="footer__contact">
          <p className="footer__nav-title">Contato</p>
          <p className="footer__contact-item">📍 Franca, SP – Brasil</p>
          <a href="mailto:contato@giovanimazoni.com.br" className="footer__contact-item footer__contact-link">
            ✉️ contato@giovanimazoni.com.br
          </a>
          <a href="https://wa.me/5516999999999" target="_blank" rel="noreferrer" className="footer__contact-item footer__contact-link">
            💬 WhatsApp
          </a>
          <a href="https://instagram.com/giovanimazoni" target="_blank" rel="noreferrer" className="footer__contact-item footer__contact-link">
            📸 @giovanimazoni
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Giovani Mazoni. Todos os direitos reservados.</p>
          <p className="footer__credit">
            Desenvolvido por{' '}
            <a href="https://instagram.com/victormazoni.webdesign" target="_blank" rel="noreferrer">
              Victor Mazoni Web Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
