import { useEffect, useState } from 'react'

/**
 * Tracks global scroll progress as a percentage (0 to 100).
 * Highly optimized with passive scroll listener.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const updateProgress = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        setProgress(Math.min(Math.max((scrollY / maxScroll) * 100, 0), 100))
      } else {
        setProgress(0)
      }
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}
