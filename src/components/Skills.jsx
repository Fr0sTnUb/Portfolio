import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSectionReveal } from '../hooks/useSectionReveal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const skillsData = [
  {
    category: 'Front-end',
    epoch: '01',
    tools: [
      'React · Next.js',
      'TypeScript · JavaScript (ES2023)',
      'HTML5 · CSS3 · Tailwind · Styled Systems',
      'State machines · Testing Library',
    ],
  },
  {
    category: 'Back-end',
    epoch: '02',
    tools: [
      'Node.js · Express · RESTful APIs',
      'Flask · FastAPI · Microservices',
      'SQL · MongoDB · Prisma · ORMs',
      'Auth · WebSockets · Scaling patterns',
    ],
  },
  {
    category: 'Data Science',
    epoch: '03',
    tools: [
      'Python · R · NumPy · Pandas',
      'Scikit-learn · TensorFlow (basics)',
      'Exploratory data analysis · Visualization',
      'Experiment design · Storytelling',
    ],
  },
  {
    category: 'Creative & UX',
    epoch: '04',
    tools: [
      'Figma · Framer · Adobe XD',
      'Design systems · Accessibility',
      'Motion design · Storytelling',
      'Unity basics · Rapid prototyping',
    ],
  },
  {
    category: 'Automation & Bots',
    epoch: '05',
    tools: [
      'discord.js · REST events · Slash commands',
      'Bot orchestration · community tooling',
      'Automation workflows · integrations',
      'Cloud hosting · CI/CD',
    ],
  },
  {
    category: 'Languages',
    epoch: '06',
    tools: [
      'C · C++ · Java',
      'Python · R · TypeScript',
      'SQL · NoSQL',
      'Shell · Git · DevOps basics',
    ],
  },
]

const Skills = () => {
  const cardsRef = useRef([])
  const sectionRef = useRef(null)
  const [titleRef, titleVisible] = useSectionReveal(0.3)

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards.length || typeof window === 'undefined') return

    // Skip GSAP on mobile — too heavy
    if (window.innerWidth <= 767) return

    const timer = setTimeout(() => {
      cards.forEach((card, index) => {
        if (!card) return
        const isLast = index === cards.length - 1

        ScrollTrigger.create({
          trigger: card,
          start: 'top 160px',
          end: isLast ? 'bottom 160px' : 'bottom 80px',
          scrub: 0.5,
          onEnter: () => {
            gsap.to(card, {
              scale: 1, opacity: 1, y: 0,
              rotationX: 0, filter: 'brightness(1)',
              duration: 0.4, ease: 'power2.out',
            })
          },
          onLeave: () => {
            if (!isLast) {
              gsap.to(card, {
                scale: 0.92, opacity: 0, y: -60,
                rotationX: 6, filter: 'brightness(0.85)',
                duration: 0.4, ease: 'power2.in',
              })
            }
          },
          onEnterBack: () => {
            gsap.to(card, {
              scale: 1, opacity: 1, y: 0,
              rotationX: 0, filter: 'brightness(1)',
              duration: 0.4, ease: 'power2.out',
            })
          },
          onLeaveBack: () => {
            gsap.to(card, {
              scale: 0.96, opacity: 0.9, y: 10,
              filter: 'brightness(0.95)',
              duration: 0.3, ease: 'power2.out',
            })
          },
        })
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  // Reveal observer for section header
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{ borderBottom: '1px solid var(--border)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>

        {/* Section header */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            <span style={{ color: '#6b7280' }}># ──</span>{' '}
            <span style={{ color: 'var(--cyan)' }}>02. TECH_STACK</span>{' '}
            <span style={{ color: '#1e2d40' }}>{'─'.repeat(40)}</span>
          </p>
          <h2
            ref={titleRef}
            className={titleVisible ? 'title-scan' : ''}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'var(--text)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
              opacity: titleVisible ? 1 : 0,
            }}
          >
            THE TOOLBOX
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            [MODULES_LOADED: {skillsData.length}] · STATUS: ACTIVE
          </p>
        </div>

        {/* Stacking cards wrapper */}
        <div style={{ position: 'relative' }}>
          {skillsData.map((skill, index) => (
            <article
              key={skill.category}
              ref={el => (cardsRef.current[index] = el)}
              className="glass-card skill-stack-card"
              style={{
                position: 'sticky',
                top: `${100 + index * 12}px`,
                marginBottom: '1.5rem',
                padding: '2rem',
                borderRadius: 16,
                borderLeft: index % 2 === 0
                  ? '3px solid var(--cyan)'
                  : '3px solid var(--purple)',
                zIndex: index + 1,
                transformOrigin: 'top center',
                willChange: 'transform, opacity',
                cursor: 'pointer',
              }}
            >
              {/* Card header — always visible */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)',
                    border: `1px solid ${index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)'}`,
                    padding: '0.15rem 0.5rem', letterSpacing: '0.1em',
                  }}>
                    [MODULE_{skill.epoch}]
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-mono)', fontWeight: 700,
                    fontSize: '1rem', color: 'var(--text)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    margin: 0,
                  }}>
                    {skill.category}
                  </h3>
                </div>

                {/* Hover hint — visible by default, hides on hover */}
                <span className="hover-hint" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  color: 'var(--text-dim)', letterSpacing: '0.08em',
                  transition: 'opacity 0.3s ease',
                }}>
                  HOVER_TO_LOAD ›
                </span>
              </div>

              {/* Tools list — hidden by default, reveals on hover */}
              <div className="skill-tools-reveal">
                {/* Divider */}
                <div style={{ borderTop: '1px solid var(--border)', margin: '1.25rem 0 1rem' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {skill.tools.map((tool, i) => (
                    <div key={i}
                      className="tool-item"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        transitionDelay: `${i * 0.07}s`,
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: index % 2 === 0 ? 'var(--cyan)' : 'var(--purple)',
                      }}>›</span>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                        color: 'var(--text-dim)', lineHeight: 1.5,
                      }}>{tool}</span>
                    </div>
                  ))}
                </div>

                {/* Module load indicator */}
                <div
                  className="tool-item"
                  style={{
                    marginTop: '1.5rem', paddingTop: '1rem',
                    borderTop: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: 'var(--text-dim)',
                    transitionDelay: '0.3s',
                  }}
                >
                  {'>>> '}
                  <span style={{ color: 'var(--green)' }}>
                    module_{skill.category.toLowerCase().replace(/[\s&]+/g, '_').replace(/_+/g, '_')}.load()
                  </span>
                  <span> — OK</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        /* === SKILL STACK CARD === */
        .skill-stack-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Glow on hover */
        .skill-stack-card:hover {
          box-shadow:
            0 0 24px rgba(0, 212, 255, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
        }

        /* === SKILL TOOLS REVEAL === */

        /* Default hidden state — owned by CSS, not inline */
        .skill-tools-reveal {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-8px);
          margin-top: 0;
          transition:
            max-height 0.55s cubic-bezier(0.23, 1, 0.32, 1),
            opacity 0.4s ease,
            transform 0.4s ease,
            margin-top 0.3s ease;
        }

        /* Revealed state on hover */
        .skill-stack-card:hover .skill-tools-reveal {
          max-height: 500px;
          opacity: 1;
          transform: translateY(0);
        }

        /* Tool items hidden by default */
        .tool-item {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        /* Tool items revealed on parent hover */
        .skill-stack-card:hover .tool-item {
          opacity: 1;
          transform: translateX(0);
        }

        /* Hover hint fades out when tools reveal */
        .skill-stack-card:hover .hover-hint {
          opacity: 0;
          pointer-events: none;
        }

        /* Reveal section header animation */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile — always show everything */
        @media (max-width: 767px) {
          .skill-tools-reveal {
            max-height: 500px !important;
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .tool-item {
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
          .hover-hint { display: none !important; }
          .skill-stack-card {
            position: relative !important;
            top: auto !important;
          }
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}

export default Skills
