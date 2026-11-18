import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * useZeroGravityReveal
 * Attaches the zero-gravity float class when elements scroll into view.
 * If prefers-reduced-motion is enabled, reveals immediately without displacement.
 */
export function useZeroGravityReveal<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = elementRef.current
    if (!el) return undefined

    if (prefersReducedMotion) {
      el.classList.add('is-revealed')
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return elementRef
}
