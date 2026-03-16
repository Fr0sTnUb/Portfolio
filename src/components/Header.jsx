import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#hero',         label: 'HOME',     num: '01' },
  { href: '#about',        label: 'ABOUT',    num: '02' },
  { href: '#skills',       label: 'SKILLS',   num: '03' },
  { href: '#projects',     label: 'PROJECTS', num: '04' },
  { href: '#journey',      label: 'JOURNEY',  num: '05' },
  { href: '#certificates', label: 'CERTS',    num: '06' },
  { href: '#contact',      label: 'CONTACT',  num: '07' },
]

const Header = () => {
  const [menuOpen, setMenuOpen]           = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

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
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: '0.05em',
                    padding: '0.4rem 0.65rem',
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

          {/* CV download — desktop */}
          <div className="desktop-cv-btn" style={{ alignItems: 'center', gap: '0.75rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)', flexShrink: 0, display: 'flex' }}>
            <a
              href="/Nitesh_CV_v2.pdf"
              download="Nitesh_CV_v2.pdf"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--bg)',
                background: 'var(--cyan)',
                border: '1px solid var(--cyan)',
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--cyan)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--cyan)'
                e.currentTarget.style.color = 'var(--bg)'
              }}
            >
              <span className="cv-btn-label">[ DOWNLOAD_CV ]</span>
              <span className="cv-btn-icon">↓ CV</span>
            </a>
          </div>

          {/* Hamburger button — visible only on mobile */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid var(--cyan)',
              borderRadius: 6,
              padding: '6px 10px',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className={`bar ${menuOpen ? 'bar-top' : ''}`} />
            <span className={`bar ${menuOpen ? 'bar-mid' : ''}`} />
            <span className={`bar ${menuOpen ? 'bar-bot' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`}
      >
        {navLinks.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            className="mobile-nav-link"
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={(e) => { e.preventDefault(); handleNavClick(e, item.href) }}
          >
            <span className="mobile-nav-num">[0{i + 1}]</span>
            {item.label}
          </a>
        ))}
        <a
          href="/Nitesh_CV_v2.pdf"
          download
          className="mobile-nav-link mobile-nav-cv"
          onClick={() => setMenuOpen(false)}
        >
          [ DOWNLOAD_CV ]
        </a>
      </div>

      <style>{`
        /* ── Hamburger bars ─────────────────────────────── */
        .bar {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--cyan);
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity   0.2s ease;
          transform-origin: center;
        }
        .bar-top { transform: translateY(7px) rotate(45deg);  }
        .bar-mid { opacity: 0; transform: scaleX(0);          }
        .bar-bot { transform: translateY(-7px) rotate(-45deg);}

        /* ── Show hamburger on mobile only ─────────────── */
        @media (max-width: 767px) {
          .hamburger        { display: flex !important; }
          .desktop-nav      { display: none !important; }
          .desktop-cv-btn   { display: none !important; }
        }

        /* ── Mobile nav overlay ─────────────────────────── */
        .mobile-nav {
          position: fixed;
          top: 72px;
          left: 0; right: 0;
          height: 0;
          overflow: hidden;
          background: rgba(10, 14, 26, 0.97);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          z-index: 998;
          transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 2rem;
        }

        .mobile-nav-open {
          height: 420px;
          padding: 1.5rem 2rem;
        }

        /* ── Individual link — flies in from left ────────── */
        .mobile-nav-link {
          font-family: 'Courier New', monospace;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text);
          text-decoration: none;
          text-transform: uppercase;
          padding: 0.6rem 0;
          width: 100%;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          transform: translateX(-40px) skewX(-8deg);
          transition:
            color     0.2s ease,
            transform 0.2s ease;
          animation: none;
        }

        .mobile-nav-open .mobile-nav-link {
          animation: link-slam 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .mobile-nav-link:hover {
          color: var(--cyan);
          transform: translateX(8px) skewX(0deg);
          border-bottom-color: var(--cyan);
        }

        .mobile-nav-num {
          font-size: 0.65rem;
          color: var(--cyan);
          opacity: 0.7;
          min-width: 32px;
        }

        .mobile-nav-cv {
          color: var(--cyan);
          border: 1px solid var(--cyan);
          border-radius: 6px;
          padding: 0.5rem 1rem;
          margin-top: 0.75rem;
          width: auto;
          font-size: 0.8rem;
          justify-content: center;
        }

        /* ── Entrance keyframe ──────────────────────────── */
        @keyframes link-slam {
          0% {
            opacity: 0;
            transform: translateX(-60px) skewX(-12deg) scaleY(1.3);
            filter: blur(4px);
            letter-spacing: 0.4em;
          }
          60% {
            opacity: 1;
            transform: translateX(6px) skewX(2deg) scaleY(0.97);
            filter: blur(0);
            letter-spacing: 0.08em;
          }
          80% {
            transform: translateX(-2px) skewX(-1deg) scaleY(1.01);
            letter-spacing: 0.11em;
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(0) scaleY(1);
            filter: blur(0);
            letter-spacing: 0.12em;
          }
        }

        /* ── CV button responsive ──────────────────────── */
        .cv-btn-icon { display: none; }
        @media (max-width: 1100px) {
          .cv-btn-label { display: none; }
          .cv-btn-icon  { display: inline; }
        }
      `}</style>
    </>
  )
}

export default Header
