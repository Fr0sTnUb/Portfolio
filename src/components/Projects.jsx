import { useEffect, useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const projects = [
  {
    title: 'MTA Daily Ridership Analysis',
    description: 'A deep dive into NYC transit usage before, during, and after the pandemic. Built with Python, Pandas, and visualization stacks to surface actionable insights.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Data Viz'],
    badge: '⭐ Featured', badgeColor: 'var(--cyan)',
    github: 'https://github.com/Fr0sTnUb/MTA-Daily-Ridership-Analysis', live: null,
  },
  {
    title: 'OneCardPulse',
    description: 'High-performance marketing site for Spectra — India\'s premium metal credit card. SEO-first architecture, Google Analytics integration, and conversion-optimized pages targeting competitive fintech keywords.',
    tech: ['SEO', 'Analytics', 'Digital Marketing', 'React'],
    badge: 'SEO: HIGH', badgeColor: 'var(--green)',
    github: 'https://github.com/Fr0sTnUb/OneCardPulsee', live: 'https://ocpulse1.vercel.app/',
  },
  {
    title: 'Uchiha',
    description: 'Multi-purpose Discord bot with moderation, automation, and community engagement tools. Focused on reliability, modular architecture, and delightful UX.',
    tech: ['Discord.js', 'Node.js', 'MongoDB', 'REST'],
    badge: 'Moderation Bot', badgeColor: 'var(--purple)',
    github: 'https://github.com/Fr0sTnUb/Uchiha', live: null,
  },
  {
    title: 'Discord Bot Web',
    description: 'A polished landing experience for Discord bots, highlighting commands and feature sets. Crafted with responsive CSS and community-driven design patterns.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Design'],
    badge: '⭐ Featured', badgeColor: 'var(--cyan)',
    github: 'https://github.com/Fr0sTnUb/discord-bot-web', live: null,
  },
]

function ProjectCard({ project, delay = 0 }) {
  return (
    <div className="glass-card glass-lift stagger-child" style={{ animationDelay: `${delay}s`, height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
      {/* Gradient top accent */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--cyan), var(--purple))', borderRadius: '14px 14px 0 0' }} />

      <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
        {/* Tags + Badge row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'nowrap', gap: '0.75rem', marginBottom: '1rem' }}>
          {/* Tags — wrap freely on the left */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', flex: 1, minWidth: 0 }}>
            {project.tech.map(t => <span key={t} className="ds-tag" style={{ fontSize: '0.62rem' }}>#{t}</span>)}
          </div>
          {/* Badge — pinned right, never overlaps */}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: project.badgeColor, border: `1px solid ${project.badgeColor}`,
            padding: '0.2rem 0.55rem', whiteSpace: 'nowrap',
            flexShrink: 0, alignSelf: 'flex-start',
          }}>
            {project.badge}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', letterSpacing: '0.02em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.77rem', color: 'var(--text-dim)', lineHeight: 1.75, flex: 1, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline"
               style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', padding: '0.45rem 1rem' }}>
              <Github size={12} /> [ VIEW_REPO ]
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="btn-cyan"
               style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', padding: '0.45rem 1rem' }}>
              <ExternalLink size={12} /> [ LIVE_DEMO ]
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const sectionRef = useRef(null)
  const [titleRef, titleVisible] = useSectionReveal(0.3)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ borderBottom: '1px solid var(--border)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>

        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            <span style={{ color: '#6b7280' }}># ──</span>{' '}
            <span style={{ color: 'var(--cyan)' }}>03. DEPLOYMENTS</span>{' '}
            <span style={{ color: '#1e2d40' }}>{'─'.repeat(38)}</span>
          </p>
          <h2
            ref={titleRef}
            className={titleVisible ? 'title-dataload' : ''}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'var(--text)',
              textTransform: 'uppercase',
              opacity: titleVisible ? undefined : 0,
            }}
          >
            SELECTED WORK
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
