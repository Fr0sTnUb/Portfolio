import { useEffect, useRef, useState } from 'react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const pillars = [
  {
    icon: '✦',
    title: 'Front-end Specialist',
    description: 'Pixel-perfect interfaces with React, TypeScript, and modern CSS. I obsess over motion, accessibility, and performance.',
    color: 'var(--cyan)',
  },
  {
    icon: '▲',
    title: 'Data Science Explorer',
    description: 'Python, R, and statistics to interpret complex datasets and frame the story a product needs to tell.',
    color: 'var(--purple)',
  },
  {
    icon: '◈',
    title: 'Community Builder',
    description: 'Discord bots, game prototypes, and collaborative side quests keep me plugged into communities and constantly experimenting.',
    color: 'var(--green)',
  },
]

const badges = ['React', 'TypeScript', 'Python', 'Node.js', 'GSAP', 'Three.js', 'Discord.js', 'Pandas']

const About = () => {
  const sectionRef  = useRef(null)
  const [titleRef, titleVisible] = useSectionReveal(0.3)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ borderBottom: '1px solid var(--border)', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>

        {/* Section Header */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            <span style={{ color: '#6b7280' }}># ──</span>{' '}
            <span style={{ color: 'var(--cyan)' }}>01. ABOUT_ME</span>{' '}
            <span style={{ color: '#1e2d40' }}>{'─'.repeat(40)}</span>
          </p>
          <h2
            ref={titleRef}
            className={titleVisible ? 'title-typewriter' : ''}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'var(--text)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              opacity: titleVisible ? undefined : 0,
            }}
          >
            THE ENGINE<br />BENEATH THE HOOD.
          </h2>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Left: Bio + Model Card */}
          <div className="reveal-left">
            {/* Bio card — glass-strong */}
            <div
              className="glass-strong"
              style={{
                borderLeft: '3px solid var(--cyan)',
                padding: '1.75rem',
                marginBottom: '1.5rem',
                borderRadius: 16,
              }}
            >
              <span style={{ position: 'absolute', top: '0.5rem', right: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--border-bright)' }}>01.md</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.9, marginBottom: '1rem' }}>
                I explore code from every angle—front-end artistry, backend logic,
                and data-driven storytelling. I blend these skills to ship products,
                design user journeys, and surface actionable insights.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.83rem', color: 'var(--text-dim)', lineHeight: 1.9 }}>
                Whether it's a real-time Discord bot or an end-to-end analytics pipeline,
                I thrive on crafting experiences that feel intuitive and intelligent.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.5rem' }}>
                {badges.map(skill => (
                  <span key={skill} className="ds-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Model Card — glass-strong */}
            <div
              className="glass-strong"
              style={{ padding: '1.25rem 1.5rem', borderRadius: 16, position: 'relative' }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.9rem' }}>
                <span style={{ color: 'var(--purple)' }}># model_card.json</span>
              </p>
              {[
                ['NAME',           'Nitesh Sha'],
                ['ALIAS',          'fr0st._.rated'],
                ['SPECIALIZATION', 'Data Science + Full Stack'],
                ['STATUS',         'Available for Opportunities'],
                ['LOCATION',       'IST (UTC+5:30)'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '1rem', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-dim)', minWidth: 130 }}>{k.padEnd(15, '\u00a0')}<span style={{ color: 'var(--border-bright)' }}>:</span></span>
                  <span style={{ color: 'var(--cyan)' }}>"{v}"</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pillars — glass-card + stagger */}
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="glass-card stagger-child"
                style={{
                  padding: '1.4rem',
                  borderLeft: `3px solid ${pillar.color}`,
                  cursor: 'default',
                  animationDelay: `${i * 0.14 + 0.1}s`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 40, height: 40,
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: pillar.color, fontSize: '1.2rem',
                    background: 'rgba(10,14,26,0.5)',
                  }}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
