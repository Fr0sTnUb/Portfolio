import { useEffect, useRef, useState } from 'react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const techStack = [
  'REACT', 'TYPESCRIPT', 'NEXT.JS', 'PYTHON', 'C++',
  'DISCORD.JS', 'JAVA', 'NODE.JS', 'TAILWIND', 'FIGMA',
  'C', 'NUMPY', 'PANDAS', 'R', 'FLASK', 'POSTGRESQL'
]

const typewriterPhrases = [
  'Training model...',
  'Analyzing dataset...',
  'Visualizing clusters...',
  'Building pipelines...',
  'Deploying to prod...',
  'Parsing 1.2M rows...',
  'Fitting parameters...',
]

const metrics = [
  { label: 'YRS_EXP',  value: '5+' },
  { label: 'SHIPPED',  value: '20' },
  { label: 'BOTS',     value: '15' },
  { label: 'STATUS',   value: 'ONLINE' },
]

// Neural network canvas
function NeuralCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 28
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        n.pulse += 0.02
      })
      // Edges
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 160) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 160) * 0.4})`
            ctx.lineWidth = 0.6
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      // Nodes
      nodes.forEach(n => {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${0.4 + glow * 0.4})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="neural-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

const Hero = () => {
  const [twText, setTwText]  = useState('')
  const [twIdx,  setTwIdx]   = useState(0)
  const [twChar, setTwChar]  = useState(0)
  const [twDel,  setTwDel]   = useState(false)
  const [titleRef, titleVisible] = useSectionReveal(0.15)

  // Typewriter effect
  useEffect(() => {
    const phrase = typewriterPhrases[twIdx]
    const speed  = twDel ? 35 : 70
    const timer  = setTimeout(() => {
      if (!twDel) {
        if (twChar < phrase.length) {
          setTwText(phrase.slice(0, twChar + 1))
          setTwChar(c => c + 1)
        } else {
          setTimeout(() => setTwDel(true), 1400)
        }
      } else {
        if (twChar > 0) {
          setTwText(phrase.slice(0, twChar - 1))
          setTwChar(c => c - 1)
        } else {
          setTwDel(false)
          setTwIdx(i => (i + 1) % typewriterPhrases.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [twText, twChar, twDel, twIdx])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        paddingTop: '72px',
        paddingBottom: 0,
      }}
    >
      <NeuralCanvas />

      <div
        className="glass-strong"
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: 960, margin: '0 auto',
          padding: '3rem 2rem 3.5rem',
          width: '100%', borderRadius: 20,
          marginBottom: '4rem',
        }}
      >
        {/* Two-column grid: content left, photo right */}
        <div className="hero-grid">

          {/* LEFT — all existing hero content unchanged */}
          <div>
            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              border: '1px solid var(--cyan)',
              padding: '0.3rem 0.9rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--cyan)',
              letterSpacing: '0.1em',
              marginBottom: '2rem',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: 7, height: 7,
                borderRadius: '50%',
                background: 'var(--cyan)',
                boxShadow: '0 0 6px var(--cyan)',
                animation: 'blink 1.4s ease-in-out infinite',
              }} />
              STATUS: AVAILABLE FOR HIRE
            </div>

            {/* Name — glitch animation */}
            <h1
              ref={titleRef}
              className={titleVisible ? 'title-glitch' : ''}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2.8rem, 9vw, 7rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                opacity: titleVisible ? undefined : 0,
              }}
            >
              NITESH<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--cyan)' }}>SHA</span>
            </h1>

            {/* Typewriter line */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              color: 'var(--cyan)',
              marginBottom: '1.75rem',
              minHeight: '1.6rem',
              letterSpacing: '0.02em',
            }}>
              <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>$&gt;</span>
              {twText}
              <span className="typewriter-cursor" />
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.92rem',
              color: 'var(--text-dim)',
              maxWidth: 560,
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}>
              I craft uncompromising{' '}
              <span style={{ color: 'var(--text)' }}>front-end experiences</span>, engineer
              raw data into insight, and build Discord bots that power communities.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
              {['// FULL_STACK', '// DATA_SCIENCE', '// AUTOMATION', 'A.K.A. FR0STRATED'].map(tag => (
                <span key={tag} className="ds-tag">{tag}</span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
              <a
                href="#projects"
                className="btn-cyan"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                [ EXECUTE_WORK ]
              </a>
              <a
                href="#contact"
                className="btn-outline"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                [ INIT_CONTACT ]
              </a>
            </div>

            {/* Metric Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {metrics.map(m => (
                <div key={m.label} className="metric-card glass-card" style={{ minWidth: 130, textAlign: 'center' }}>
                  <div className="metric-value">{m.value}</div>
                  <div className="metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — profile photo with BW → colour reveal */}
          <div
            className="photo-wrapper"
            style={{
              position: 'relative',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            {/* Spinning gradient ring */}
            <div style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
              zIndex: 0,
              animation: 'spin-slow 6s linear infinite',
            }} />

            {/* Photo container — clips both layers to a circle */}
            <div style={{
              position: 'relative',
              width: 200,
              height: 200,
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 1,
              border: '3px solid var(--bg)',
            }}>

              {/* LAYER 1 — full colour photo (bottom layer) */}
              <img
                src="/photo.jpeg"
                alt="Nitesh SHA"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  zIndex: 1,
                }}
              />

              {/* LAYER 2 — greyscale photo (top layer, slides up on hover) */}
              <img
                src="/photo.jpeg"
                alt=""
                aria-hidden="true"
                className="photo-bw"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  zIndex: 2,
                  filter: 'grayscale(100%) contrast(1.05) brightness(0.95)',
                  clipPath: 'inset(0 0 0% 0)',
                  transition: 'clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />

              {/* Cyan scan line that sweeps up during hover */}
              <div
                className="photo-scanline"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--cyan)',
                  boxShadow: '0 0 8px var(--cyan), 0 0 16px var(--cyan)',
                  bottom: '0%',
                  zIndex: 3,
                  opacity: 0,
                  transition: 'bottom 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s ease',
                }}
              />
            </div>

            {/* Status dot */}
            <div style={{
              position: 'absolute',
              bottom: 12, right: 12,
              width: 14, height: 14,
              borderRadius: '50%',
              background: 'var(--green)',
              border: '2px solid var(--bg)',
              zIndex: 4,
              boxShadow: '0 0 8px var(--green)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />

            {/* Corner brackets */}
            <div style={{
              position: 'absolute', top: -12, left: -12,
              width: 24, height: 24,
              borderTop: '2px solid var(--cyan)',
              borderLeft: '2px solid var(--cyan)',
              zIndex: 4,
            }} />
            <div style={{
              position: 'absolute', bottom: -12, right: -12,
              width: 24, height: 24,
              borderBottom: '2px solid var(--purple)',
              borderRight: '2px solid var(--purple)',
              zIndex: 4,
            }} />
          </div>

        </div>
      </div>

      {/* Tech Marquee */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderTop: '1px solid var(--border)',
        background: 'rgba(10,14,26,0.9)',
        padding: '0.5rem 0',
        overflow: 'hidden',
        zIndex: 2,
      }}>
        <div style={{
          display: 'flex', gap: '2.5rem',
          animation: 'marquee 30s linear infinite',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          {[...techStack, ...techStack, ...techStack].map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2.5rem' }}>
              {t}
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)', opacity: 0.4, display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.7; }
        }

        /* BW → Colour reveal on hover */
        .photo-wrapper:hover .photo-bw {
          clip-path: inset(0 0 100% 0);
        }
        .photo-wrapper:hover .photo-scanline {
          bottom: 100%;
          opacity: 1;
        }
        .photo-wrapper:hover > div:first-child {
          filter: brightness(1.2);
          transition: filter 0.3s ease;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 3rem;
        }
        .photo-wrapper {
          width: 200px;
          height: 200px;
        }
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }
          .photo-wrapper {
            order: -1;
            width: 140px;
            height: 140px;
            margin: 0 auto;
          }
          .photo-wrapper > div:nth-child(2) {
            width: 140px !important;
            height: 140px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
