import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CVPage from './pages/CVPage'

function App() {
  const progressRef = useRef(null)
  const cursorRef   = useRef(null)
  const canvasRef   = useRef(null)

  // Scroll progress bar
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress  = docHeight > 0 ? scrollTop / docHeight : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  // Custom cursor — GSAP quickTo for buttery smooth tracking
  useEffect(() => {
    try {
      const el = cursorRef.current
      if (!el) return
      gsap.set(el, { xPercent: -50, yPercent: -50, x: -200, y: -200 })
      const xTo = gsap.quickTo(el, 'x', { duration: 0.15, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power3.out' })
      const onMove = (e) => { xTo(e.clientX); yTo(e.clientY) }
      window.addEventListener('mousemove', onMove, { passive: true })
      return () => window.removeEventListener('mousemove', onMove)
    } catch(err) {
      console.warn('Cursor init failed:', err)
    }
  }, [])

  // Particle background — lightweight, main thread, capped at 80
  useEffect(() => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      let W = canvas.width  = window.innerWidth
      let H = canvas.height = window.innerHeight
      let animId
      const MOUSE = { x: -9999, y: -9999 }

      class Particle {
        constructor() { this.reset(true) }
        reset(initial = false) {
          this.x     = Math.random() * W
          this.y     = initial ? Math.random() * H : 0
          this.r     = Math.random() * 1.2 + 0.4
          this.vx    = (Math.random() - 0.5) * 0.3
          this.vy    = (Math.random() - 0.5) * 0.3
          this.base  = Math.random() * 0.4 + 0.1
          this.a     = this.base
          this.pulse = Math.random() * Math.PI * 2
        }
        update() {
          this.x    += this.vx
          this.y    += this.vy
          this.pulse += 0.016
          this.a     = this.base + Math.sin(this.pulse) * 0.1
          const dx = this.x - MOUSE.x
          const dy = this.y - MOUSE.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 100 && d > 0) {
            const f = (100 - d) / 100
            this.vx += (dx / d) * f * 0.05
            this.vy += (dy / d) * f * 0.05
          }
          const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
          if (spd > 0.6) { this.vx *= 0.6 / spd; this.vy *= 0.6 / spd }
          if (this.x < 0) this.x = W
          if (this.x > W) this.x = 0
          if (this.y < 0) this.y = H
          if (this.y > H) this.y = 0
        }
        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,212,255,${this.a})`
          ctx.fill()
        }
      }

      const particles = Array.from({ length: 80 }, () => new Particle())

      // Spatial grid — O(n) not O(n²)
      const drawConnections = () => {
        const MAX  = 100
        const CELL = MAX
        const grid = {}
        for (const p of particles) {
          const key = `${Math.floor(p.x/CELL)},${Math.floor(p.y/CELL)}`
          if (!grid[key]) grid[key] = []
          grid[key].push(p)
        }
        ctx.lineWidth = 0.4
        for (const p of particles) {
          const cx = Math.floor(p.x / CELL)
          const cy = Math.floor(p.y / CELL)
          for (let nx = cx-1; nx <= cx+1; nx++) {
            for (let ny = cy-1; ny <= cy+1; ny++) {
              const cell = grid[`${nx},${ny}`]
              if (!cell) continue
              for (const q of cell) {
                if (q === p) continue
                const dx = p.x - q.x
                const dy = p.y - q.y
                const d  = Math.sqrt(dx*dx + dy*dy)
                if (d < MAX) {
                  ctx.beginPath()
                  ctx.moveTo(p.x, p.y)
                  ctx.lineTo(q.x, q.y)
                  ctx.strokeStyle = `rgba(0,212,255,${(1 - d/MAX) * 0.08})`
                  ctx.stroke()
                }
              }
            }
          }
        }
      }

      const loop = () => {
        ctx.clearRect(0, 0, W, H)
        for (const p of particles) { p.update(); p.draw() }
        drawConnections()
        animId = requestAnimationFrame(loop)
      }

      const onResize = () => {
        W = canvas.width  = window.innerWidth
        H = canvas.height = window.innerHeight
      }
      const onMouse = (e) => { MOUSE.x = e.clientX; MOUSE.y = e.clientY }

      window.addEventListener('resize',    onResize, { passive: true })
      window.addEventListener('mousemove', onMouse,  { passive: true })
      loop()

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize',    onResize)
        window.removeEventListener('mousemove', onMouse)
      }
    } catch(err) {
      console.warn('Particle init failed:', err)
    }
  }, [])

  return (
    <>
      {/* Cursor + canvas — outside BrowserRouter so crash can't blank the page */}
      <div ref={cursorRef} className="cursor-dot" />
      <canvas ref={canvasRef} className="particle-canvas" />

      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ transformOrigin: 'left' }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Certificates />
                <Journey />
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/cv" element={<CVPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
