import React, { useEffect, useState } from 'react'
import TechLogoD from './TechLogoD'
import { ArrowUpRight, Menu, X, Activity, Volume2, VolumeX } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Expertise', href: '#skills' },
  { label: 'Socials', href: '#socials' }
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [audioActive, setAudioActive] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const marker = window.scrollY + window.innerHeight * 0.35
      for (let index = NAV_ITEMS.length - 1; index >= 0; index -= 1) {
        const section = document.querySelector(NAV_ITEMS[index].href)
        if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
          setActiveSection(section.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileMenuOpen])

  const scrollTo = (href) => {
    setMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050508]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.85)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo with Cyber Emblem */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#home')
          }}
          aria-label="Le Duy - Home"
          className="flex shrink-0 items-center"
        >
          <TechLogoD size={38} showText={true} />
        </a>

        {/* Center Pill Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#0B101A]/80 border border-white/[0.08] backdrop-blur-xl shadow-inner"
        >
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.slice(1)
            const isActive = activeSection === sectionId
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.href)
                }}
                className={`tactile-btn px-4 py-1.5 rounded-full text-xs font-display font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00D9FF] text-[#050508] shadow-[0_0_15px_rgba(0,217,255,0.6)] font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Right Action: Soundwave Visualizer + Connect CTA */}
        <div className="flex shrink-0 items-center gap-3">
          
          {/* Cyber Equalizer Audio Pill */}
          <button
            type="button"
            onClick={() => setAudioActive(!audioActive)}
            title={audioActive ? 'Cyber soundscape active' : 'Soundscape muted'}
            className="tactile-btn hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#00D9FF]/40 text-xs font-mono text-zinc-400 transition-all cursor-pointer"
          >
            {audioActive ? (
              <>
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#00D9FF] rounded-full animate-eq-bar h-2" />
                  <span className="w-0.5 bg-[#A855F7] rounded-full animate-eq-bar h-3" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 bg-[#38BDF8] rounded-full animate-eq-bar h-2.5" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-[10px] text-[#00D9FF]">AUDIO FX</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[10px]">MUTED</span>
              </>
            )}
          </button>

          {/* Quick Connect CTA */}
          <a
            href="#socials"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#socials')
            }}
            className="tactile-btn px-5 py-2 rounded-full font-display font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-[#1558C9] via-[#00D9FF] to-[#A855F7] shadow-[0_0_20px_rgba(0,217,255,0.35)] hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center gap-1.5"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white md:hidden hover:border-[#00D9FF] transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#00D9FF]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-x-0 top-[76px] bottom-0 z-40 md:hidden bg-[#030407]/95 backdrop-blur-2xl transition-all duration-300 p-6 flex flex-col justify-between ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-2.5">
          <div className="font-mono text-xs text-[#00D9FF] pb-3 border-b border-white/[0.08]">
            // NAVIGATION PROTOCOL
          </div>
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.href)
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-display font-bold tracking-wide transition-all ${
                  isActive
                    ? 'border-[#00D9FF] bg-[#00D9FF]/10 text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                    : 'border-white/[0.08] bg-white/[0.02] text-[#CBD5E1] hover:border-[#00D9FF]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#94A3B8]">0{index + 1}</span>
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />}
              </a>
            )
          })}
        </nav>

        <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
          <a
            href="#socials"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#socials')
            }}
            className="w-full text-center py-3.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-[#1558C9] via-[#00D9FF] to-[#A855F7] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-center font-mono text-[10px] text-[#94A3B8]">
            DUY.DEV // ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </header>
  )
}
