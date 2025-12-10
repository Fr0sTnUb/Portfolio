import Header from './components/Header'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Labs from './components/Labs'
import Journey from './components/Journey'
import Connect from './components/Connect'
import Footer from './components/Footer'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useLenis } from './hooks/useLenis'
import { useCustomCursor } from './hooks/useCustomCursor'

function App() {
  useLenis()
  useScrollAnimation()
  useCustomCursor()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Skills />
        <Projects />
        <Labs />
        <Journey />
        <Connect />
      </main>
      <Footer />
    </>
  )
}

export default App

