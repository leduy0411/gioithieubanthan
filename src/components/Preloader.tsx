import React, { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete?: () => void
}

/**
 * Preloader — High-End Cinematic Deep-Space Intro (≤850ms duration)
 * Features:
 * - High-speed orbital counter (00 -> 100)
 * - Shutter split exit reveal
 * - Skippable on click or Escape
 * - Respects prefers-reduced-motion and sessionStorage
 * - Unmounts completely to free DOM & GPU resources
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // 1. Reduced-motion or session already seen check: bypass immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (sessionStorage.getItem('duy_orbital_intro_shown') || prefersReducedMotion) {
      setIsDone(true)
      if (onComplete) onComplete()
      return
    }

    const startTime = performance.now()
    const duration = 850 // 850ms total load time

    let rafId: number
    const frame = (now: number) => {
      const elapsed = now - startTime
      const p = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setProgress(p)

      if (p < 100) {
        rafId = requestAnimationFrame(frame)
      } else {
        setTimeout(() => {
          setIsClosing(true)
          setTimeout(() => {
            setIsDone(true)
            sessionStorage.setItem('duy_orbital_intro_shown', 'true')
            if (onComplete) onComplete()
          }, 500)
        }, 100)
      }
    }

    rafId = requestAnimationFrame(frame)

    // Safeguard fallback: Force dismiss after 1100ms in case tab is in background
    const fallbackTimer = setTimeout(() => {
      cancelAnimationFrame(rafId)
      setIsClosing(true)
      setTimeout(() => {
        setIsDone(true)
        sessionStorage.setItem('duy_orbital_intro_shown', 'true')
        if (onComplete) onComplete()
      }, 300)
    }, 1100)

    // Allow user to click or press any key to skip immediately
    const handleSkip = () => {
      cancelAnimationFrame(rafId)
      clearTimeout(fallbackTimer)
      setIsClosing(true)
      setTimeout(() => {
        setIsDone(true)
        sessionStorage.setItem('duy_orbital_intro_shown', 'true')
        if (onComplete) onComplete()
      }, 150)
    }

    window.addEventListener('keydown', handleSkip, { once: true })
    window.addEventListener('click', handleSkip, { once: true })

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(fallbackTimer)
      window.removeEventListener('keydown', handleSkip)
      window.removeEventListener('click', handleSkip)
    }
  }, [onComplete])

  if (isDone) return null

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Orbital Systems Initializing"
      className={`fixed inset-0 z-[999999] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isClosing ? 'opacity-0 scale-[1.03] filter blur-md pointer-events-none' : 'opacity-100 bg-[#020307]'
      }`}
    >
      {/* Top Telemetry */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
          <span className="tracking-widest uppercase text-white font-bold">LE DUY // CORE INIT</span>
        </div>
        <span className="tracking-widest text-[#38bdf8]">2026 DEEP-SPACE ODYSSEY</span>
      </div>

      {/* Center Centerpiece Counter */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="font-display font-black text-7xl sm:text-9xl tracking-tighter text-white tabular-nums">
          {progress.toString().padStart(2, '0')}
          <span className="text-3xl sm:text-5xl text-[#38bdf8] ml-1 font-mono font-light">%</span>
        </div>
        <div className="w-48 sm:w-64 h-[2px] bg-white/[0.08] mt-6 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-[11px] tracking-[0.28em] text-zinc-400 uppercase mt-4">
          Allocating Shader Buffers &amp; 5 Orbital Stations
        </p>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
        <span>TRA VINH, VN • GMT+7</span>
        <span className="hidden sm:inline">PRESS ANY KEY TO SKIP</span>
      </div>
    </div>
  )
}
