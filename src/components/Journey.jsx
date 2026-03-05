import { useEffect, useRef } from 'react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const timeline = [
  {
    epoch: '01', year: '2025', title: 'DATA SCIENCE PATH',
    type: 'Education', side: 'left',
    description: 'Advancing statistical modelling, experimentation, and ML fundamentals while weaving them into real-world projects and dashboards.',
  },
  {
    epoch: '02', year: '2024', title: 'SCALING DISCORD COMMUNITIES',
    type: 'Experience', side: 'right',
    description: 'Launched and maintained 15+ discord.js bots supporting moderation, automation, and gamified experiences across vibrant servers.',
  },
  {
    epoch: '03', year: '2023', title: 'FRONT-END DEEP DIVE',
    type: 'Education', side: 'left',
    description: 'Specialized in React + TypeScript ecosystems, design systems, and performance-oriented interfaces with refined animation workflows.',
  },
  {
    epoch: '04', year: '2022', title: 'FULL STACK FOUNDATIONS',
    type: 'Experience', side: 'right',
    description: 'Built end-to-end web apps, REST APIs, and data pipelines using Node.js, Python, Flask, and cloud-first deployment patterns.',
  },
]

function TrainingLogCard({ item }) {
  const typeColor = item.type === 'Education' ? 'var(--cyan)' : 'var(--purple)'
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: typeColor, border: `1px solid ${typeColor}`, padding: '0.15rem 0.5rem', letterSpacing: '0.1em' }}>
          [EPOCH {item.epoch}]
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>{item.year}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
        {item.title}
      </h3>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: typeColor, letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
        EVENT_TYPE : {item.type}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.77rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
        <span style={{ color: 'var(--text-dim)' }}>DESC · </span>{item.description}
      </p>
    </div>
  )
}

const Journey = () => {
  const sectionRef = useRef(null)
  const [titleRef, titleVisible] = useSectionReveal(0.3)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    sectionRef.current
      ?.querySelectorAll('.timeline-item, .reveal, .reveal-left, .reveal-right')
      .forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Grow the center line from top as the section enters view
  useEffect(() => {
    const lineEl = sectionRef.current?.querySelector('.timeline-center-line')
    if (!lineEl) return
    const lineObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) lineEl.classList.add('visible') },
      { threshold: 0.1 }
    )
    lineObserver.observe(lineEl)
    return () => lineObserver.disconnect()
  }, [])

  return (
    <section id="journey" ref={sectionRef} style={{ borderBottom: '1px solid var(--border)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            <span style={{ color: '#6b7280' }}># ──</span>{' '}
            <span style={{ color: 'var(--cyan)' }}>04. SYSTEM_LOG</span>{' '}
            <span style={{ color: '#1e2d40' }}>{'─'.repeat(40)}</span>
          </p>
          <h2
            ref={titleRef}
            className={titleVisible ? 'title-flicker' : ''}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'var(--text)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            CHRONICLE
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            [DATA_RECORDS: {timeline.length}] · STATUS: ACTIVE
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line — desktop only */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, transparent, var(--cyan), var(--purple), transparent)',
            boxShadow: '0 0 12px rgba(0,212,255,0.4), 0 0 30px rgba(124,58,237,0.2)',
            transform: 'translateX(-50%)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }} className="timeline-center-line" />

          <style>{`
            @media (max-width: 767px) { .timeline-center-line { display: none !important; } }
          `}</style>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {timeline.map((item, i) => (
              <div
                key={item.epoch}
                className={`timeline-item ${item.side === 'left' ? 'from-left' : 'from-right'}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  alignItems: 'center',
                  gap: '1.5rem',
                }}
              >
                {item.side === 'left' ? (
                  <div
                    className="journey-card journey-card-cyan"
                    style={{
                      padding: '1.4rem',
                      borderRadius: 14,
                      background: 'rgba(0,212,255,0.04)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(0,212,255,0.15)',
                      borderLeft: '3px solid var(--cyan)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,212,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <TrainingLogCard item={item} />
                  </div>
                ) : <span />}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div className="timeline-node" />
                </div>

                {item.side === 'right' ? (
                  <div
                    className="journey-card journey-card-purple"
                    style={{
                      padding: '1.4rem',
                      borderRadius: 14,
                      background: 'rgba(124,58,237,0.04)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(124,58,237,0.15)',
                      borderRight: '3px solid var(--purple)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(124,58,237,0.05), inset 0 1px 0 rgba(255,255,255,0.06)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <TrainingLogCard item={item} />
                  </div>
                ) : <span />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          #journey [style*="grid-template-columns"] { display: block !important; padding-left: 3.5rem; }
        }

        /* Section header reveal */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Shimmer sweep */
        .journey-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          transition: left 0.6s ease;
          pointer-events: none;
          z-index: 0;
        }
        .journey-card:hover::before { left: 150%; }

        /* Cyan card hover */
        .journey-card-cyan {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .journey-card-cyan:hover {
          transform: translateX(-4px);
          box-shadow:
            0 0 24px rgba(0,212,255,0.18),
            0 8px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08) !important;
        }

        /* Purple card hover */
        .journey-card-purple {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .journey-card-purple:hover {
          transform: translateX(4px);
          box-shadow:
            0 0 24px rgba(124,58,237,0.18),
            0 8px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08) !important;
        }

        /* ── SCROLL REVEAL ───────────────────────── */
        .timeline-item {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .timeline-item.from-left  { transform: translateX(-60px); }
        .timeline-item.from-right { transform: translateX(60px); }
        .timeline-item.visible    { opacity: 1; transform: translateX(0) !important; }

        /* Stagger delay per card */
        .timeline-item:nth-child(1) { transition-delay: 0s; }
        .timeline-item:nth-child(2) { transition-delay: 0.1s; }
        .timeline-item:nth-child(3) { transition-delay: 0.1s; }
        .timeline-item:nth-child(4) { transition-delay: 0.1s; }

        /* Center line grows from top */
        .timeline-center-line {
          transform-origin: top center;
          transform: translateX(-50%) scaleY(0);
          transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .timeline-center-line.visible {
          transform: translateX(-50%) scaleY(1);
        }

        /* Node pops in with bounce after card slides in */
        .timeline-node {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(0,212,255,0.15);
          border: 2px solid var(--cyan);
          box-shadow: 0 0 8px var(--cyan), 0 0 20px rgba(0,212,255,0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          position: relative;
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .timeline-item.visible .timeline-node {
          transform: scale(1);
          transition-delay: 0.3s;
        }
        .timeline-node::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(0,212,255,0.25);
          animation: node-pulse 2s ease-in-out infinite;
        }
        @keyframes node-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%       { transform: scale(1.4); opacity: 0; }
        }

        /* Mobile — all items slide up from bottom, reduce blur */
        @media (max-width: 767px) {
          .timeline-item.from-left,
          .timeline-item.from-right { transform: translateY(40px); }
          .timeline-item.visible    { transform: translateY(0) !important; }
          .journey-card-cyan, .journey-card-purple {
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Journey
