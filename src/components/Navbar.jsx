import React, { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolioData'
import {
  Sparkles,
  Layers,
  Cpu,
  Mail,
  Check,
  Copy,
  Terminal,
  ExternalLink,
  Flame,
  Award
} from 'lucide-react'

const NAV_LINKS = [
  { id: 'home', label: 'Index', icon: Terminal },
  { id: 'about', label: 'About', icon: Award },
  { id: 'skills', label: 'Discipline', icon: Layers },
  { id: 'projects', label: 'Systems', icon: Cpu },
  { id: 'contact', label: 'Connect', icon: Mail }
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      // Active section detection
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id))
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-[#030306]/85 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(0,217,255,0.15)]'
            : 'bg-[#070B14]/65 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
        }`}
        aria-label="Spatial Navigation Dock"
      >
        {/* 1. Identity & Live Status Pulse */}
        <button
          type="button"
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer group"
          title="Scroll to Top"
        >
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            <span className="absolute w-full h-full rounded-full bg-[#00D9FF] opacity-75 animate-ping" />
            <span className="relative w-2 h-2 rounded-full bg-[#00D9FF]" />
          </div>
          <span className="font-display font-bold text-xs tracking-wider uppercase text-white group-hover:text-[#00D9FF] transition-colors">
            DUY.OS
          </span>
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        {/* 2. macOS Proximity Physics Nav Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((link, idx) => {
            const Icon = link.icon
            const isActive = activeSection === link.id
            const isHovered = hoveredIdx === idx
            const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1

            // Proximity scale calculation
            const scale = isHovered ? 1.15 : isNeighbor ? 1.05 : 1.0

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                data-cursor-text={link.label.toUpperCase()}
                className={`relative px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 ease-out flex items-center gap-1.5 cursor-pointer will-change-transform ${
                  isActive
                    ? 'bg-[#00D9FF] text-[#030306] font-bold shadow-[0_0_15px_rgba(0,217,255,0.5)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
                }`}
                style={{
                  transform: `scale(${scale})`
                }}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#030306]' : 'text-current'}`} />
                <span className="hidden sm:inline">{link.label}</span>

                {/* Subtle active glow pill underlay */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
                )}
              </button>
            )
          })}
        </div>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        {/* 3. Fast Tactile Copy Email Chip */}
        <button
          type="button"
          onClick={handleCopyEmail}
          data-cursor-text="COPY"
          className="tactile-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] hover:border-[#00D9FF]/50 text-xs font-mono text-[#CBD5E1] hover:text-[#00D9FF] transition-all cursor-pointer"
          title="Click to copy email"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span className="text-[11px] font-bold text-[#00D9FF]">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">EMAIL</span>
            </>
          )}
        </button>
      </nav>
    </header>
  )
}
