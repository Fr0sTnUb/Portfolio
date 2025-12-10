import { useEffect } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
    // Section animations
    const animatedSections = document.querySelectorAll('[data-animate]')

    if (animatedSections.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.12,
        }
      )

      animatedSections.forEach((section) => observer.observe(section))
    }

    // Text reveal animations
    const textRevealElements = document.querySelectorAll(
      '[data-text-reveal], [data-text-slide-left], [data-text-slide-right], [data-text-scale]'
    )

    let textObserver = null

    if (textRevealElements.length > 0) {
      textObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
            } else {
              entry.target.classList.remove('revealed')
            }
          })
        },
        {
          threshold: 0.15,
          rootMargin: '-50px',
        }
      )

      textRevealElements.forEach((element) => textObserver.observe(element))
    }

    // Cleanup function
    return () => {
      if (textObserver) {
        textRevealElements.forEach((element) => textObserver.unobserve(element))
      }
    }
  }, [])
}

