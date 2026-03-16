import { useState, useEffect } from 'react'
import { Github, Linkedin, MessageSquare, Instagram, ArrowUp } from 'lucide-react'

const Footer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }))

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const socials = [
    { icon: Github,       href: 'https://github.com/Fr0sTnUb',                         label: 'GitHub' },
    { icon: Linkedin,     href: 'https://www.linkedin.com/in/nitesh-sha-a988b3276/',    label: 'LinkedIn' },
    { icon: MessageSquare,href: 'https://discord.gg/Yxbjf5FUVt',                       label: 'Discord' },
    { icon: Instagram,    href: 'https://www.instagram.com/aint._.nitesh/',             label: 'Instagram' },
  ]

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'rgba(10,14,26,0.97)',
      boxShadow: '0 -1px 20px rgba(0,212,255,0.04)',
      padding: '1.25rem 0',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Terminal log bar */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.06em',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '1rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border)',
        }}>
          <span>
            <span style={{ color: 'var(--cyan)' }}>[INFO]</span>{' '}
            SYS.STAT:{' '}
            <span style={{ color: 'var(--green)' }}>ONLINE</span>
            {'  |  '}
            <span className="hidden md:inline">LOC: IST (UTC+5:30){'  |  '}</span>
            CLK: <span style={{ color: 'var(--cyan)' }}>{time}</span>
            {'  |  '}
            VER: 3.0.0-BLD
          </span>
          <span style={{ color: 'var(--border-bright)' }}>
            © {new Date().getFullYear()} fr0st._.rated — FUEL INJECTED
          </span>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>

          {/* Logo */}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--cyan)',
            textShadow: '0 0 12px rgba(0,212,255,0.35)',
            letterSpacing: '-0.01em',
          }}>
            fr0st._.rated
          </span>

          {/* Social icons + Back to top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--border)',
                  color: 'var(--text-dim)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--cyan)'
                  e.currentTarget.style.color = 'var(--cyan)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-dim)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={16} />
              </a>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              style={{
                width: 36, height: 36, marginLeft: '0.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--border)',
                color: 'var(--text-dim)',
                background: 'transparent',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--cyan)'
                e.currentTarget.style.color = 'var(--cyan)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
