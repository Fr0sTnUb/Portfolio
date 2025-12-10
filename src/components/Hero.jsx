import { useState, useEffect, useRef } from 'react'
import RiveAnimation from './RiveAnimation'
import apiService from '../services/api'
import { useScrollBrand } from '../hooks/useScrollBrand'

const Hero = () => {
  const scrollProgress = useScrollBrand()
  const brandRef = useRef(null)
  const heroRef = useRef(null)
  
  const [techStack, setTechStack] = useState([
    'React', 'TypeScript', 'Next.js', 'Python', 'C++',
    'discord.js', 'Java', 'Node.js', 'Tailwind', 'Figma', 'C', 'NumPy', 'Pandas', 'R', 'Flask', 'PostgreSQL'
  ])

  const [skills, setSkills] = useState([
    {
      icon: 'ri-code-s-slash-line',
      title: 'Frontend',
      tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      value: '8.8K',
      rarity: 'Mythical',
      rarityColor: '#ef4444',
      element: 'Code',
      elementColor: '#6366f1',
      elementIcon: 'ri-code-box-line',
    },
    {
      icon: 'ri-server-line',
      title: 'Backend',
      tags: ['Node.js', 'Python', 'Flask', 'PostgreSQL'],
      value: '5.5K',
      rarity: 'Epic',
      rarityColor: '#a855f7',
      element: 'Server',
      elementColor: '#0ea5e9',
      elementIcon: 'ri-server-line',
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Data Science',
      tags: ['Python', 'R', 'NumPy', 'Pandas'],
      value: '3.2K',
      rarity: 'Uncommon',
      rarityColor: '#3b82f6',
      element: 'Analytics',
      elementColor: '#06b6d4',
      elementIcon: 'ri-bar-chart-2-line',
    },
  ])

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const currentSkill = skills[currentSkillIndex]

  // Fetch portfolio data from API
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const data = await apiService.getPortfolio()
        if (data.skills) setSkills(data.skills)
        if (data.techStack) setTechStack(data.techStack)
      } catch (error) {
        console.error('Failed to fetch portfolio data, using defaults:', error)
        // Keep default values if API fails
      }
    }
    fetchPortfolioData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // Change card when it's back to front (at 360deg, not during flip)
      setTimeout(() => {
        setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length)
      }, 2000) // Delay to 2s so it changes when card is back to front
    }, 4000)

    return () => clearInterval(interval)
  }, [skills.length])

  // Calculate animation values based on scroll progress
  useEffect(() => {
    if (!brandRef.current) return

    const updateAnimation = () => {
      const header = document.querySelector('.site-header')
      const brand = document.querySelector('.brand')
      
      if (!header || !brand) return

      const headerRect = header.getBoundingClientRect()
      const brandRect = brand.getBoundingClientRect()

      // Start position: center of viewport
      const startX = 0 // Already centered with translate(-50%, -50%)
      const startY = 0
      
      // End position: navbar brand position relative to viewport center
      const endX = brandRect.left + brandRect.width / 2 - window.innerWidth / 2
      const endY = headerRect.top + headerRect.height / 2 - window.innerHeight / 2

      // Calculate scale (from 8 to 1)
      const startScale = 8
      const endScale = 1
      const scale = startScale - (startScale - endScale) * scrollProgress

      // Calculate position interpolation
      const x = startX - (startX - endX) * scrollProgress
      const y = startY - (startY - endY) * scrollProgress

      // Calculate opacity (fade out as it approaches navbar)
      const opacity = scrollProgress < 0.85 ? Math.max(0, 1 - scrollProgress * 1.2) : 0

      // Apply transforms
      brandRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`
      brandRef.current.style.opacity = opacity
    }

    // Use requestAnimationFrame for smooth updates
    const rafId = requestAnimationFrame(updateAnimation)
    
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [scrollProgress])

  return (
    <section id="intro" ref={heroRef} className="section hero" data-animate>
      {/* Large animated FR0STRATED text */}
      <div 
        ref={brandRef}
        className="hero-brand-text"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(8)',
          zIndex: 1000,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        
      </div>
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow" data-text-reveal="1">Full Stack · Data Science · Discord Bots</p>
          <h1 data-text-reveal="2">
            Hi, I'm Nitesh Sha
            <span className="accent">(a.k.a. fr0strated)</span>
          </h1>
          <div className="status-chip" data-text-reveal="3">
            <span className="status-dot"></span>
            Open for collaborations · IST (UTC+5:30)
          </div>
          <p className="lead" data-text-reveal="4">
            I craft immersive front-end experiences, engineer intelligent backends,
            and analyse data to unlock insights. On Discord, I'm the go-to builder
            for bots that elevate communities.
          </p>
          <div className="hero-ctas" data-text-reveal="5">
            <a
              className="btn btn-primary"
              href="https://www.linkedin.com/in/nitesh-sha-a988b3276/"
              target="_blank"
              rel="noreferrer"
            >
              Let's connect
              <i className="ri-arrow-right-up-line"></i>
            </a>
            <a className="btn btn-ghost" href="#projects">
              Explore projects
              <i className="ri-layout-grid-line"></i>
            </a>
          </div>
          <div className="hero-widgets">
            <div className="widget-card" data-text-scale>
              <div className="widget-icon">
                <i className="ri-time-line"></i>
              </div>
              <div className="widget-content">
                <span className="widget-value">5+</span>
                <span className="widget-label">Years of building</span>
              </div>
            </div>
            <div className="widget-card" data-text-scale>
              <div className="widget-icon">
                <i className="ri-box-3-line"></i>
              </div>
              <div className="widget-content">
                <span className="widget-value">20+</span>
                <span className="widget-label">Projects shipped</span>
              </div>
            </div>
            <div className="widget-card" data-text-scale>
              <div className="widget-icon">
                <i className="ri-robot-2-line"></i>
              </div>
              <div className="widget-content">
                <span className="widget-value">15+</span>
                <span className="widget-label">Discord bots launched</span>
              </div>
            </div>
          </div>
          <div className="tech-marquee" aria-hidden="true">
            <div className="marquee-track">
              {techStack.map((tech, i) => (
                <span key={`tech-1-${i}`} className="marquee-item">{tech}</span>
              ))}
            </div>
            <div className="marquee-track">
              {techStack.map((tech, i) => (
                <span key={`tech-2-${i}`} className="marquee-item">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-visual">
          {/* Rive Background Animation */}
          {/* Download a free animation from https://rive.app/community/ */}
          {/* Place it in public/animations/hero-bg.riv */}
          <div className="hero-rive-bg">
            <RiveAnimation
              src="/animations/hero-bg.riv"
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
              onLoadError={(error) => {
                // Silently fail if animation file doesn't exist yet
                console.log('Rive animation not found. Add hero-bg.riv to public/animations/ to enable.');
              }}
            />
          </div>
          <div className="skill-cards-scene">
            <div 
              className="skill-glass-card" 
              data-skill-card
            >
              {/* Front Face */}
              <div className="skill-card-face skill-card-front">
                <div 
                  className="skill-card-inner"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='${encodeURIComponent(currentSkill.elementColor)}' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3CradialGradient id='glow'%3E%3Cstop offset='0%25' stop-color='${encodeURIComponent(currentSkill.elementColor)}' stop-opacity='0.15'/%3E%3Cstop offset='100%25' stop-color='transparent' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3Ccircle cx='50' cy='50' r='40' fill='url(%23glow)'/%3E%3C/svg%3E"), linear-gradient(145deg, rgba(20, 20, 30, 0.95), rgba(10, 10, 15, 0.98))`
                  }}
                >
                  {/* Character/Icon Area with Background */}
                  <div 
                    className="card-character-area"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 30%, ${currentSkill.elementColor}40, transparent 70%), 
                                       linear-gradient(135deg, ${currentSkill.elementColor}20, ${currentSkill.rarityColor}15)`
                    }}
                  >
                    <div className="skill-card-icon" data-skill-icon>
                      <i className={currentSkill.icon}></i>
                    </div>
                  </div>
                  
                  {/* Value with Star */}
                  <div className="card-value">
                    <span className="card-value-amount">{currentSkill.value}</span>
                    <i className="ri-star-fill card-star-icon"></i>
                  </div>
                  
                  {/* Card Name */}
                  <h3 className="skill-card-title" data-skill-title>{currentSkill.title}</h3>
                  
                  {/* Rarity and Element Tags */}
                  <div className="card-tags-row">
                    <span 
                      className="card-rarity-tag" 
                      style={{ backgroundColor: currentSkill.rarityColor }}
                    >
                      {currentSkill.rarity}
                    </span>
                    <span 
                      className="card-element-tag"
                      style={{ backgroundColor: currentSkill.elementColor }}
                    >
                      <i className={currentSkill.elementIcon}></i>
                      {currentSkill.element}
                    </span>
                  </div>
                  
                  {/* Bottom Info */}
                  <div className="card-bottom-info">
                    <span className="card-timer">5+ Years</span>
                    <span className="card-username">fr0strated</span>
                  </div>
                </div>
              </div>
              {/* Back Face */}
              <div className="skill-card-face skill-card-back">
                <svg className="card-back-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  {/* Geometric pattern */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.3"/>
                  <circle cx="100" cy="100" r="60" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.5"/>
                  <circle cx="100" cy="100" r="40" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.7"/>
                  {/* Center logo/icon */}
                  <path d="M100 60 L140 100 L100 140 L60 100 Z" fill="url(#logoGradient)" opacity="0.9"/>
                  <circle cx="100" cy="100" r="15" fill="#fff" opacity="0.2"/>
                  {/* Corner decorations */}
                  <path d="M20 20 L30 20 L20 30 Z" fill="url(#logoGradient)" opacity="0.6"/>
                  <path d="M180 20 L170 20 L180 30 Z" fill="url(#logoGradient)" opacity="0.6"/>
                  <path d="M20 180 L30 180 L20 170 Z" fill="url(#logoGradient)" opacity="0.6"/>
                  <path d="M180 180 L170 180 L180 170 Z" fill="url(#logoGradient)" opacity="0.6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

