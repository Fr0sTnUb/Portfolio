import { useEffect } from 'react'

export const useCustomCursor = () => {
  useEffect(() => {
    // New circular dot cursor design
    const cursorSVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236366f1'/%3E%3Cstop offset='100%25' stop-color='%238b5cf6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='10' cy='10' r='9' fill='url(%23g)' opacity='0.2'/%3E%3Ccircle cx='10' cy='10' r='6' fill='url(%23g)' stroke='%23fff' stroke-width='1.5'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%23fff'/%3E%3C/svg%3E"
    
    // Create a style element to inject cursor CSS
    const style = document.createElement('style')
    style.id = 'custom-cursor-style'
    style.textContent = `
      html, body, * {
        cursor: url("${cursorSVG}") 10 10, auto !important;
      }
      a, button, [role="button"], input[type="submit"], input[type="button"], .btn, [href] {
        cursor: url("${cursorSVG}") 10 10, pointer !important;
      }
    `
    
    // Remove existing style if present
    const existing = document.getElementById('custom-cursor-style')
    if (existing) {
      existing.remove()
    }
    
    document.head.appendChild(style)

    return () => {
      const styleToRemove = document.getElementById('custom-cursor-style')
      if (styleToRemove) {
        document.head.removeChild(styleToRemove)
      }
    }
  }, [])
}
