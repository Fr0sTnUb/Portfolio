import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import ThemeToggleRive from './ThemeToggleRive'
import { useScrollBrand } from '../hooks/useScrollBrand'

const Header = () => {
  const scrollProgress = useScrollBrand()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navLinks = [
    { href: '#intro', label: 'Intro' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#labs', label: 'Labs' },
    { href: '#journey', label: 'Journey' },
    { href: '#connect', label: 'Connect' },
  ]

  const getActiveIndex = () => {
    // Don't show slider on hero section
    if (activeSection === 'hero') {
      return -1
    }
    const index = navLinks.findIndex(link => activeSection === link.href.slice(1))
    return index >= 0 ? index : -1
  }

  const shouldShowSlider = () => {
    return activeSection !== 'hero' && getActiveIndex() >= 0
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.classList.remove('nav-open')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.classList.toggle('nav-open')
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    closeMenu()
    // Lenis will handle smooth scrolling via the click event listener in useLenis
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('main section[id]')
      const offset = 120
      let found = false

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= offset && rect.bottom > offset) {
          setActiveSection(section.id)
          found = true
        }
      })

      // If no section is in view and we're at the top, set to hero
      if (!found && window.scrollY < 200) {
        setActiveSection('hero')
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMenu()
    }

    // Check initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('keyup', handleEscape)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keyup', handleEscape)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="container nav-container">
        <a 
          className="brand" 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{
            opacity: scrollProgress > 0.7 ? Math.min(1, (scrollProgress - 0.7) / 0.3) : 0,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            visibility: scrollProgress > 0.7 ? 'visible' : 'hidden'
          }}
        >
          fr0st._.rated
        </a>
        <nav className={`primary-nav ${menuOpen ? 'open' : ''}`} data-nav>
          <div className="nav-pill-container">
            {shouldShowSlider() && (
              <div 
                className="nav-pill-slider" 
                style={{
                  transform: `translateX(${getActiveIndex() * 100}%)`,
                  width: `${100 / navLinks.length}%`
                }}
              />
            )}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="nav-actions">
          <ThemeToggleRive />
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

