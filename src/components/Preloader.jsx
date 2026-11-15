import React, { useEffect, useState } from 'react'

/**
 * Preloader — High-End Cinematic Spatial Intro (0.9s duration)
 * Features:
 * - Ultra-fast counter (00 -> 100)
 * - Shutter blade split exit reveal
 * - Unmounts cleanly to free all DOM & GPU resources
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Check if preloader already ran in this session
    if (sessionStorage.getItem('duy_intro_shown')) {
      setIsDone(true)
      if (onComplete) onComplete()
      return
    }

    const startTime = performance.now()
    const duration = 850 // 850ms total load time

    const frame = (now) => {
      const elapsed = now - startTime
      const p = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setProgress(p)

      if (p < 100) {
        requestAnimationFrame(frame)
      } else {
        setTimeout(() => {
          setIsClosing(true)
          setTimeout(() => {
            setIsDone(true)
            sessionStorage.setItem('duy_intro_shown', 'true')
            if (onComplete) onComplete()
          }, 600)
        }, 120)
      }
    }

    requestAnimationFrame(frame)
  }, [onComplete])

  if (isDone) return null

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col justify-between p-6 sm:p-12 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isClosing ? 'opacity-0 scale-[1.03] filter blur-md' : 'opacity-100 bg-[#030306]'
      }`}
    >
      {/* Top Telemetry */}
      <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
          <span className="tracking-widest uppercase text-white font-bold">LE DUY // CORE INIT</span>
        </div>
        <span className="tracking-widest text-[#00D9FF]">2026 SPATIAL WEB</span>
      </div>

      {/* Center Centerpiece Counter */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="font-display font-black text-7xl sm:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-white/30 tabular-nums">
          {progress.toString().padStart(2, '0')}
          <span className="text-3xl sm:text-5xl text-[#00D9FF] ml-1 font-mono font-light">%</span>
        </div>
        <div className="w-48 sm:w-64 h-[2px] bg-white/[0.08] mt-6 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#94A3B8] uppercase mt-4">
          Allocating Shader Buffers &amp; WebGL Core
        </p>
      </div>

      {/* Bottom Metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
        <span>SYS // VER_2.6</span>
        <span>TRA VINH, VIETNAM [9°56'N 106°20'E]</span>
      </div>
    </div>
  )
}
