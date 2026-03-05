import { useState, useEffect } from 'react'

/**
 * useTheme — toggles light/dark mode by adding/removing the `.light`
 * class on <html>. Persists choice in localStorage.
 * Returns [isDark, toggleTheme]
 */
export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    // Respect OS preference if no saved value
    return !window.matchMedia('(prefers-color-scheme: light)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('light')
    } else {
      root.classList.add('light')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = () => setIsDark(prev => !prev)
  return [isDark, toggle]
}
