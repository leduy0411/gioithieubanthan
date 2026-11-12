import React, { useEffect, useState } from 'react'
import SiteLogo from './SiteLogo'

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('BOOTING SYSTEM CORE...')
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const statusMessages = [
      { at: 15, text: 'INITIALIZING THREE.JS 3D ENGINE...' },
      { at: 40, text: 'LOADING CYBERNETIC SHADERS...' },
      { at: 65, text: 'CONNECTING BACKEND PROTOCOLS...' },
      { at: 88, text: 'CALIBRATING INTERACTIVE HUD...' },
      { at: 100, text: 'SYSTEM ONLINE [DUY.DEV]' }
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4
        if (next >= 100) {
          clearInterval(interval)
          setStatusText('SYSTEM ONLINE [DUY.DEV]')
          setTimeout(() => {
            setIsFadingOut(true)
            setTimeout(() => {
              if (onLoaded) onLoaded()
            }, 500)
          }, 350)
          return 100
        }
        const match = statusMessages.find((s) => next >= s.at && prev < s.at)
        if (match) {
          setStatusText(match.text)
        }
        return next
      })
    }, 45)

    return () => clearInterval(interval)
  }, [onLoaded])

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030407] transition-all duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Cyber Grid Background lines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

      {/* Center glowing orb */}
      <div className="absolute w-96 h-96 rounded-full bg-[#1558C9]/20 blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Brand Emblem */}
        <div className="mb-8 transform hover:scale-105 transition-transform">
          <SiteLogo className="h-28 w-36" />
        </div>

        {/* Project Branding */}
        <h1 className="font-display font-extrabold text-3xl tracking-[0.25em] text-[#F5F7FA] mb-1.5">
          LE DUY<span className="text-[#00D9FF]">.</span>DEV
        </h1>
        <p className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#9CA3AF] uppercase mb-8">
          IT ENGINEER • BACKEND • CREATIVE PRODUCER
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 h-1.5 bg-[#0B101A] border border-[#1B2638] rounded-full overflow-hidden p-[1px] mb-4 shadow-[0_0_15px_rgba(21,88,201,0.2)]">
          {/* Active Fill (#1558C9 with #D4FF24 tip) */}
          <div
            className="h-full bg-gradient-to-r from-[#1558C9] via-[#00D9FF] to-[#D4FF24] rounded-full transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Pulsing Neon Lime Tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4FF24] shadow-[0_0_8px_#D4FF24]" />
          </div>
        </div>

        {/* Status Bar Indicators */}
        <div className="flex items-center justify-between w-64 sm:w-72 font-mono text-[11px] text-[#9299A6]">
          <span className="text-[#00D9FF] flex items-center gap-1.5 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-ping" />
            {statusText}
          </span>
          <span className="text-[#F5F7FA] font-bold ml-2">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
