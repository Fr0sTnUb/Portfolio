import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, MessageCircle } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const navLinks = [
  { href: '#hero',     label: 'HOME',     num: '01' },
  { href: '#about',    label: 'ABOUT',    num: '02' },
  { href: '#skills',   label: 'SKILLS',   num: '03' },
  { href: '#projects', label: 'PROJECTS', num: '04' },
  { href: '#journey',  label: 'JOURNEY',  num: '05' },
  { href: '#contact',  label: 'CONTACT',  num: '06' },
]

const Header = () => {
  const [menuOpen, setMenuOpen]           = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isDark, toggleTheme]             = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll('main section[id]')
      let current = 'hero'
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom > 150) current = section.id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 50,
          height: '72px',
          display: 'flex', alignItems: 'center',
          background: scrolled ? 'rgba(10,14,26,0.88)' : 'rgba(10,14,26,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,212,255,0.1)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3), 0 0 20px rgba(0,212,255,0.04)' : '0 2px 20px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--cyan)',
              boxShadow: '0 0 10px var(--cyan)',
              animation: 'blink 1.5s ease-in-out infinite',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: 'var(--cyan)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 20px rgba(0,212,255,0.4)',
            }}>
              fr0st._.rated
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: '0.08em',
                    padding: '0.4rem 0.85rem',
                    color: isActive ? 'var(--cyan)' : 'var(--text-dim)',
                    textDecoration: 'none',
                    borderBottom: isActive ? '2px solid var(--cyan)' : '2px solid transparent',
                    boxShadow: isActive ? '0 2px 0 var(--cyan)' : 'none',
                    transition: 'all 0.2s ease',
                    paddingBottom: '0.35rem',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-dim)' }}
                >
                  [{link.num}_{link.label}]
                </a>
              )
            })}
          </nav>

          {/* Theme toggle — desktop */}
          <div className="hidden md:flex" style={{ alignItems: 'center', marginLeft: '0.5rem' }}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--cyan)',
                background: 'transparent',
                border: '1px solid var(--cyan)',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                transition: 'background 0.2s ease, color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.color = 'var(--bg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cyan)' }}
            >
              <span className="theme-btn-label">{isDark ? '[ LIGHT_MODE ]' : '[ DARK_MODE ]'}</span>
              <span className="theme-btn-icon">{isDark ? '☀' : '☾'}</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              padding: '0.5rem 0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--cyan)',
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? '✕ CLOSE' : '≡ MENU'}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'visibility 0.3s',
        }}
        className="md:hidden"
      >
        {/* Backdrop */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10,14,26,0.92)',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.3s ease',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: '300px',
            background: 'var(--card-bg)',
            borderLeft: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <div style={{ paddingTop: '5rem', padding: '5rem 1.5rem 1.5rem' }}>
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: 'block',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: isActive ? 'var(--cyan)' : 'var(--text-dim)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                  }}
                >
                  &gt; [{link.num}_{link.label}]
                </a>
              )
            })}
          </div>

          <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem' }}>
            {[
              { icon: Github, href: 'https://github.com/Fr0sTnUb' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/nitesh-sha-a988b3276/' },
              { icon: MessageCircle, href: 'https://discord.gg/Yxbjf5FUVt' },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--border)',
                  color: 'var(--text-dim)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
