import { useEffect, useRef, useState } from 'react'

/**
 * useSectionReveal — fires once when the ref element enters the viewport.
 * Returns [ref, isVisible] — apply ref to the element you want to watch,
 * then conditionally apply an animation class when isVisible is true.
 */
export const useSectionReveal = (threshold = 0.2) => {
  const ref        = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // fire only once
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}
