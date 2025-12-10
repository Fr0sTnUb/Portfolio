import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Skills = () => {
  const cardsRef = useRef([])

  const skillsData = [
    {
      title: 'Front-end',
      tools: [
        'React · Next.js',
        'TypeScript · JavaScript (ES2023)',
        'HTML5 · CSS3 · Tailwind · Styled Systems',
        'State machines · Testing Library'
      ]
    },
    {
      title: 'Back-end',
      tools: [
        'Node.js · Express · RESTful APIs',
        'Flask · FastAPI · Microservices',
        'SQL · MongoDB · Prisma · ORMs',
        'Auth · WebSockets · Scaling patterns'
      ]
    },
    {
      title: 'Data Science',
      tools: [
        'Python · R · NumPy · Pandas',
        'Scikit-learn · TensorFlow (basics)',
        'Exploratory data analysis · Visualization',
        'Experiment design · Storytelling'
      ]
    },
    {
      title: 'Creative & UX',
      tools: [
        'Figma · Framer · Adobe XD',
        'Design systems · Accessibility',
        'Motion design · storytelling',
        'Unity basics · Rapid prototyping'
      ]
    },
    {
      title: 'Automation & Bots',
      tools: [
        'discord.js · REST events · Slash commands',
        'Bot orchestration · community tooling',
        'Automation workflows · integrations',
        'Cloud hosting · CI/CD'
      ]
    },
    {
      title: 'Languages',
      tools: [
        'C · C++ · Java',
        'Python · R · TypeScript',
        'SQL · NoSQL',
        'Shell · Git · DevOps basics'
      ]
    }
  ]

  useEffect(() => {
    const cards = cardsRef.current

    if (cards.length > 0 && typeof window !== 'undefined') {
      // Small delay to ensure Lenis is initialized
      const timer = setTimeout(() => {
        cards.forEach((card, index) => {
          if (!card) return
          const isLast = index === cards.length - 1

          ScrollTrigger.create({
            trigger: card,
            start: 'top 160px',
            end: isLast ? 'bottom 160px' : 'bottom 80px',
            scrub: 0.5,
            markers: false,
            onEnter: () => {
              gsap.to(card, {
                scale: 1,
                opacity: 1,
                y: 0,
                rotationX: 0,
                filter: 'brightness(1)',
                duration: 0.4,
                ease: 'power2.out',
              })
            },
            onLeave: () => {
              if (!isLast) {
                gsap.to(card, {
                  scale: 0.92,
                  opacity: 0,
                  y: -60,
                  rotationX: 6,
                  filter: 'brightness(0.85)',
                  duration: 0.4,
                  ease: 'power2.in',
                })
              }
            },
            onEnterBack: () => {
              gsap.to(card, {
                scale: 1,
                opacity: 1,
                y: 0,
                rotationX: 0,
                filter: 'brightness(1)',
                duration: 0.4,
                ease: 'power2.out',
              })
            },
            onLeaveBack: () => {
              gsap.to(card, {
                scale: 0.96,
                opacity: 0.9,
                y: 10,
                filter: 'brightness(0.95)',
                duration: 0.3,
                ease: 'power2.out',
              })
            },
          })
        })
      }, 100)

      return () => {
        clearTimeout(timer)
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }
  }, [])

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Stacks</p>
          <h2>Core toolbox & frequently used superpowers</h2>
        </div>
        <div className="skills-stack-wrapper" data-stack-container>
          {skillsData.map((skill, index) => (
            <article
              key={skill.title}
              className="skill-card"
              data-stack-card
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="skill-card-header">
                <h3>{skill.title}</h3>
                <span className="hover-hint">Hover to explore</span>
              </div>
              <div className="skill-card-content">
                <ul>
                  {skill.tools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

