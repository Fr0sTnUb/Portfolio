import { useState, useEffect } from 'react'

export const useScrollBrand = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1
      // Animation completes when scrolled ~800px (adjust as needed)
      const scrollDistance = 800
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      const progress = Math.min(scrollY / scrollDistance, 1)
      setScrollProgress(progress)
    }

    // Initial check
    handleScroll()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Also listen to Lenis scroll events if available
    const lenisInstance = window.lenis
    if (lenisInstance) {
      lenisInstance.on('scroll', handleScroll)
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (lenisInstance) {
        lenisInstance.off('scroll', handleScroll)
      }
    }
  }, [])

  return scrollProgress
}

