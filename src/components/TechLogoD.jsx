import React from 'react'

export default function TechLogoD({ size = 42, showText = true, className = '' }) {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      {/* SVG Emblem */}
      <div 
        className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 rounded-xl bg-[#1558C9]/30 blur-md group-hover:bg-[#1558C9]/50 transition-all duration-300"
          style={{ width: size, height: size }}
        />
        
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_0_12px_rgba(21,88,201,0.6)]"
        >
          <defs>
            <linearGradient id="cyberBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00D9FF" />
              <stop offset="50%" stop-color="#1558C9" />
              <stop offset="100%" stop-color="#092863" />
            </linearGradient>
            <linearGradient id="neonLimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#D4FF24" />
              <stop offset="100%" stop-color="#9BC700" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Border Hexagonal Container */}
          <rect 
            x="4" 
            y="4" 
            width="92" 
            height="92" 
            rx="20" 
            fill="#0B101A" 
            stroke="#1B2638" 
            strokeWidth="2.5"
            className="transition-colors duration-300 group-hover:stroke-[#1558C9]"
          />

          {/* Futuristic D Geometric Spine & Loop */}
          <path 
            d="M30 24H50C66 24 76 35 76 50C76 65 66 76 50 76H30C27.5 76 26 74.5 26 72V28C26 25.5 27.5 24 30 24Z" 
            stroke="url(#cyberBlueGrad)" 
            strokeWidth="6.5" 
            strokeLinejoin="round" 
            fill="none"
          />

          {/* Inner Cutout */}
          <path 
            d="M40 36H49C57 36 63 42 63 50C63 58 57 64 49 64H40V36Z" 
            fill="#030407" 
            stroke="#1558C9" 
            strokeWidth="2"
          />

          {/* Tech Notch Lines */}
          <line x1="20" y1="50" x2="32" y2="50" stroke="#00D9FF" strokeWidth="3" strokeLinecap="round" />
          
          {/* Neon Lime Tech Core Dot */}
          <circle 
            cx="50" 
            cy="50" 
            r="5" 
            fill="url(#neonLimeGrad)" 
            filter="url(#logoGlow)"
            className="animate-pulse"
          />
          <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-xl tracking-wider text-[#F5F7FA] group-hover:text-white transition-colors">
              DUY
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF24] shadow-[0_0_8px_#D4FF24] animate-ping" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#9299A6] group-hover:text-[#00D9FF] transition-colors uppercase">
            DEV // ARCHITECT
          </span>
        </div>
      )}
    </div>
  )
}
