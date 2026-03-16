import { useRef, useEffect } from 'react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const certificates = [
  {
    id: '01',
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google',
    date: 'Sep 2024',
    skills: ['Networking', 'TCP/IP', 'DNS', 'HTTP', 'Protocols'],
    link: 'https://coursera.org/verify/SWDN3WWVIDRP',
    color: 'var(--cyan)',
  },
  {
    id: '02',
    title: 'Digital Systems: From Logic Gates to Processors',
    issuer: 'Universitat Autonoma de Barcelona',
    date: 'Sep 2024',
    skills: ['Logic Gates', 'Digital Circuits', 'Processors', 'Hardware'],
    link: 'https://coursera.org/verify/XORNA1ZFGB3P',
    color: 'var(--purple)',
  },
  {
    id: '03',
    title: 'Peer-to-Peer Protocols and Local Area Networks',
    issuer: 'University of Colorado System',
    date: 'Oct 2024',
    skills: ['P2P', 'LAN', 'Protocols', 'Network Architecture'],
    link: 'https://coursera.org/verify/VDJ2P4HZQ3WC',
    color: 'var(--cyan)',
  },
  {
    id: '04',
    title: 'TCP/IP and Advanced Topics',
    issuer: 'University of Colorado System',
    date: 'Nov 2024',
    skills: ['TCP/IP', 'Routing', 'Network Security', 'Advanced Protocols'],
    link: 'https://coursera.org/verify/4D4O00ZTBP2S',
    color: 'var(--purple)',
  },
  {
    id: '05',
    title: 'Packet Switching Networks and Algorithms',
    issuer: 'University of Colorado System',
    date: 'Nov 2024',
    skills: ['Packet Switching', 'Algorithms', 'Network Design', 'Queuing Theory'],
    link: 'https://coursera.org/verify/ZEPPAH4DHRWL',
    color: 'var(--cyan)',
  },
  {
    id: '06',
    title: 'Software Engineering Job Simulation',
    issuer: 'Wells Fargo — Forage',
    date: 'Mar 2026',
    skills: ['Data Modelling', 'Spring Boot', 'Java', 'OOP', 'Backend'],
    link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9Wvq4L2WCFQDyyPp3_nkmk7gJitYs4TBvoA_6921fc96d58f0a7a07c43955_1772802241175_completion_certificate.pdf',
    color: 'var(--green)',
  },
]

const Certificates = () => {
  const [titleRef, titleVisible] = useSectionReveal(0.15)
  const cardRefs = useRef([])

  useEffect(() => {
    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity = '1'
              card.style.transform = 'translateY(0)'
            }, i * 100)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(card)
      return observer
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <section
      id="certificates"
      style={{
        padding: '5rem 1.5rem',
        maxWidth: 1100,
        margin: '0 auto',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.12em',
            marginBottom: '0.75rem',
          }}
        >
          # ── 06. VALIDATED_CHECKPOINTS ────────────
        </div>
        <h2
          ref={titleRef}
          className={titleVisible ? 'title-flicker' : ''}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            opacity: titleVisible ? undefined : 0,
          }}
        >
          CERTIFICATIONS
        </h2>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {certificates.map((cert, i) => {
          const color = i % 2 === 0 ? 'var(--cyan)' : 'var(--purple)'
          return (
            <div
              key={cert.id}
              ref={el => (cardRefs.current[i] = el)}
              className="glass-card cert-card"
              style={{
                padding: '1.5rem',
                borderLeft: `3px solid ${color}`,
                borderRadius: 14,
                position: 'relative',
                overflow: 'hidden',
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {/* Top row: ID badge + date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingRight: '5.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: color,
                  border: `1px solid ${color}`,
                  padding: '0.15rem 0.5rem',
                }}>
                  [CERT_{cert.id}]
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)',
                }}>
                  {cert.date}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.3rem',
              }}>
                {cert.title}
              </h3>

              {/* Issuer */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: color,
                marginBottom: '0.75rem',
              }}>
                ISSUED_BY : {cert.issuer}
              </div>

              {/* Skills tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {cert.skills.map(skill => (
                  <span key={skill} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-dim)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '0.12rem 0.4rem',
                  }}>
                    #{skill}
                  </span>
                ))}
              </div>

              {/* Verify button */}
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: color,
                    textDecoration: 'none',
                    border: `1px solid ${color}`,
                    padding: '0.3rem 0.75rem',
                    borderRadius: 4,
                    transition: 'all 0.2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = color
                    e.currentTarget.style.color = 'var(--bg)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = color
                  }}
                >
                  [ VERIFY_CERT ]
                </a>
              )}

              {/* Verified checkmark badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--green)',
                border: '1px solid var(--green)',
                padding: '0.1rem 0.4rem',
                whiteSpace: 'nowrap',
                background: 'var(--bg)',
              }}>
                ✓ VERIFIED
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Certificates
