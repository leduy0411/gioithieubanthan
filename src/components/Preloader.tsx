import { useEffect, useState } from 'react'
import MechanicalGearCore from './MechanicalGearCore'

interface PreloaderProps {
  onComplete?: () => void
}

/**
 * Preloader — Pro Max Hextech Clockwork Title Curtain (≤ 850ms, skippable)
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [isFading, setIsFading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem('duy_fantasy_intro_shown') === 'true'
    } catch {
      alreadySeen = false
    }

    if (alreadySeen) {
      setIsDone(true)
      onComplete?.()
      return undefined
    }

    const tFade = window.setTimeout(() => setIsFading(true), 560)
    const tDone = window.setTimeout(() => {
      try {
        sessionStorage.setItem('duy_fantasy_intro_shown', 'true')
      } catch {
        // ignore storage errors
      }
      setIsDone(true)
      onComplete?.()
    }, 880)

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
      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <MechanicalGearCore variant="halo" unlockTrigger={1} className="h-32 w-32" />
          <div className="h-3.5 w-3.5 rotate-45 border border-white bg-[#EC4899] shadow-[0_0_20px_#EC4899]" />
        </div>
        <p className="animate-title-shine mt-3 font-display text-2xl font-bold tracking-[0.22em] text-white">
          LE DUY.
        </p>
        <p className="mt-1.5 font-gaming text-[11px] uppercase tracking-[0.28em] text-[#F472B6]">
          HEXTECH REALM // PRO MAX
        </p>
      </div>
    </div>
  )
}
