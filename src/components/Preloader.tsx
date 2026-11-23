import { useEffect, useState } from 'react'
import MechanicalGearCore from './MechanicalGearCore'

interface PreloaderProps {
  onComplete?: () => void
}

/**
 * Preloader — League of Legends Piltover Hextech Forge Curtain (≤ 880ms, skippable)
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
      aria-label="Loading Hextech Portfolio"
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-[#091428] transition-opacity duration-300 ease-out ${
        isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <MechanicalGearCore variant="halo" unlockTrigger={1} className="h-36 w-36" />
          <div className="h-4 w-4 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_24px_#0AC8B9]" />
        </div>
        <p className="animate-title-shine mt-3 font-display text-2xl font-extrabold tracking-[0.22em] text-[#F0E6D2]">
          LE DUY.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C89B3C]" />
          <p className="font-gaming text-[11px] font-bold uppercase tracking-[0.28em] text-[#0AC8B9]">
            PILTOVER HEXTECH // CLIENT READY
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C89B3C]" />
        </div>
      </div>
    </div>
  )
}
