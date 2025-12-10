import { useEffect, useRef } from 'react'

const Journey = () => {
  const timelineRef = useRef(null)
  const progressRef = useRef(null)
  const itemRefs = useRef([])

  const timeline = [
    {
      year: '2025',
      title: 'Data Science path',
      description: 'Advancing statistical modelling, experimentation, and ML fundamentals while weaving them into real-world projects and dashboards.'
    },
    {
      year: '2024',
      title: 'Scaling Discord communities',
      description: 'Launched and maintained 15+ discord.js bots supporting moderation, automation, and gamified experiences across vibrant servers.'
    },
    {
      year: '2023',
      title: 'Front-end deep dive',
      description: 'Specialized in React + TypeScript ecosystems, design systems, and performance-oriented interfaces with refined animation workflows.'
    },
    {
      year: '2022',
      title: 'Full stack foundations',
      description: 'Built end-to-end web apps, REST APIs, and data pipelines using Node.js, Python, Flask, and cloud-first deployment patterns.'
    }
  ]

  useEffect(() => {
    // Animate progress line on scroll
    const handleScroll = () => {
      if (!timelineRef.current || !progressRef.current) return

      const timelineRect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineTop = timelineRect.top
      const timelineHeight = timelineRect.height

      const scrollStart = windowHeight * 0.8
      const progress = Math.max(0, Math.min(1, (scrollStart - timelineTop) / (timelineHeight * 0.9)))

      progressRef.current.style.height = `${progress * 100}%`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    // Reveal items on intersection
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-150px',
      }
    )

    itemRefs.current.forEach((item) => {
      if (item) revealObserver.observe(item)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      itemRefs.current.forEach((item) => {
        if (item) revealObserver.unobserve(item)
      })
    }
  }, [])

  return (
    <section id="journey" className="section journey">
      <div className="container">
        <div className="section-heading center" data-animate>
          <p className="eyebrow">Journey</p>
          <h2>Steady progress, collaborative wins</h2>
        </div>
        <div className="timeline" ref={timelineRef} data-timeline>
          <div className="timeline-progress" ref={progressRef} data-timeline-progress></div>
          {timeline.map((item, index) => (
            <div
              key={item.year}
              className="timeline-item"
              data-timeline-item
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{item.year} · {item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey
