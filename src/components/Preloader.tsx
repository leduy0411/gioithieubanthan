import { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete?: () => void
}

/**
 * Preloader — Stylized Twilight Fantasy Title Curtain (≤ 850ms, skippable)
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [isFading, setIsFading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem('duy_fantasy_intro_shown') === 'true'
    } catch {
      alreadySeen = false
    }

    if (prefersReducedMotion || alreadySeen) {
      setIsDone(true)
      onComplete?.()
      return undefined
    }

    const tFade = window.setTimeout(() => setIsFading(true), 520)
    const tDone = window.setTimeout(() => {
      try {
        sessionStorage.setItem('duy_fantasy_intro_shown', 'true')
      } catch {
        // ignore storage errors
      }
      setIsDone(true)
      onComplete?.()
    }, 840)

    const handleSkip = () => {
      window.clearTimeout(tFade)
      window.clearTimeout(tDone)
      setIsFading(true)
      window.setTimeout(() => {
        try {
          sessionStorage.setItem('duy_fantasy_intro_shown', 'true')
        } catch {
          // ignore
        }
        setIsDone(true)
        onComplete?.()
      }, 120)
    }

    window.addEventListener('keydown', handleSkip, { once: true })
    window.addEventListener('click', handleSkip, { once: true })

    return () => {
      window.clearTimeout(tFade)
      window.clearTimeout(tDone)
      window.removeEventListener('keydown', handleSkip)
      window.removeEventListener('click', handleSkip)
    }
  }, [onComplete])

  if (isDone) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Portfolio"
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-[#110B1F] transition-opacity duration-300 ease-out ${
        isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="mx-auto mb-3 h-2.5 w-2.5 rotate-45 bg-[#EC4899] shadow-[0_0_18px_#EC4899]" />
        <p className="font-display text-2xl font-bold tracking-[0.22em] text-white">
          LE DUY.
        </p>
        <p className="mt-2 font-gaming text-[11px] uppercase tracking-[0.28em] text-[#F472B6]">
          ENTERING REALM
        </p>
      </div>
    </div>
  )
}
