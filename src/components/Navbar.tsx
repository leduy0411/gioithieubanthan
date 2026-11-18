import React, { useEffect, useState } from 'react'
import { Command, Menu, Volume2, VolumeX, X, Zap } from 'lucide-react'
import { STATIONS, stationStore, StationIndex } from '../store/stationStore'
import { useActiveSection } from '../hooks/useActiveSection'
import { useAudioDrone } from '../hooks/useAudioDrone'
import { content } from '../data/content'

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { activeStation } = useActiveSection()
  const { isEnabled: isAudioEnabled, toggleAudio } = useAudioDrone()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track page scroll percentage for smooth top line
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (index: StationIndex, sectionId: string) => {
    setMenuOpen(false)
    stationStore.setStation(index)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#020307]/80 backdrop-blur-2xl">
      {/* Scroll Progress Bar with dynamic accent */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.04]" aria-hidden="true">
        <div
          className="h-full bg-[var(--accent,#38bdf8)] transition-[width] duration-150 ease-out shadow-[0_0_12px_var(--accent,#38bdf8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        {/* Brand Callsign with Optical Dot */}
        <a
          href="#home"
          onClick={() => handleNavClick(0, 'home')}
          className="group flex items-center gap-2.5 rounded-lg font-display text-lg font-bold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-[#38bdf8]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-[#38bdf8] transition-all group-hover:border-[#38bdf8]/40 group-hover:scale-105">
            <Zap size={15} />
          </div>
          <span className="font-mono text-sm tracking-wider">
            {content.identity.callsign.replace('.', '')}
            <span className="text-[var(--accent,#38bdf8)]">.</span>
          </span>
        </a>

        {/* Desktop Stations Pill Dock */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#070b14]/80 p-1 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          {STATIONS.map((station) => {
            const isActive = activeStation === station.id
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => handleNavClick(station.id, station.sectionId)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'border border-white/20 bg-white/[0.08] text-white font-medium shadow-[0_0_14px_rgba(56,189,248,0.2)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-[10px] opacity-60 mr-1.5">0{station.id}</span>
                <span>{station.sectionId.toUpperCase()}</span>
              </button>
            )
          })}
        </div>

        {/* Right Cockpit Utilities: Audio Toggle, Cmd+K, Transmit */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Audio Cockpit Drone Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            className={`tactile-btn inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-all ${
              isAudioEnabled
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                : 'border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-zinc-300'
            }`}
            title={isAudioEnabled ? 'Cockpit Audio Drone Active (Click to Mute)' : 'Cockpit Audio Drone Inactive (Click to Activate)'}
            aria-label="Toggle Cockpit Audio"
          >
            {isAudioEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>AUDIO {isAudioEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Cmd+K Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="tactile-btn inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-zinc-400 hover:border-white/20 hover:text-white transition-all"
              title="Command Palette (Cmd+K)"
              aria-label="Open Command Palette"
            >
              <Command size={13} className="text-[#38bdf8]" />
              <span>⌘K</span>
            </button>
          )}

          {/* Quick Transmit Signal Uplink */}
          <a
            href="#socials"
            onClick={() => handleNavClick(4, 'socials')}
            className="tactile-btn inline-flex items-center gap-1.5 rounded-lg border border-[#38bdf8]/40 bg-[#38bdf8]/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#38bdf8] hover:bg-[#38bdf8]/20 transition-all shadow-[0_0_14px_rgba(56,189,248,0.2)]"
          >
            TRANSMIT
          </a>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Audio toggle mobile */}
          <button
            type="button"
            onClick={toggleAudio}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
              isAudioEnabled
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-white/[0.08] bg-white/[0.02] text-zinc-500'
            }`}
            aria-label="Toggle Cockpit Audio"
          >
            {isAudioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Cmd+K mobile */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white"
              aria-label="Open Command Palette"
            >
              <Command size={15} />
            </button>
          )}

          {/* Hamburger Menu */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={menuOpen ? 'Close Navigation' : 'Open Navigation'}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-zinc-300 hover:text-white"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <div
          id="mobile-navigation-drawer"
          className={`absolute inset-x-0 top-16 border-b border-white/[0.1] bg-[#020307]/98 px-6 py-6 backdrop-blur-3xl md:hidden transition-all duration-200 ${
            menuOpen ? 'flex flex-col gap-2.5 opacity-100' : 'hidden opacity-0'
          }`}
        >
          {STATIONS.map((station) => {
            const isActive = activeStation === station.id
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => handleNavClick(station.id, station.sectionId)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 font-mono text-xs tracking-wider transition-all text-left ${
                  isActive
                    ? 'border border-[#38bdf8]/40 bg-[#38bdf8]/15 text-[#38bdf8] font-semibold'
                    : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span>{station.callsign}</span>
                <span className="text-[10px] text-zinc-500 uppercase">{station.planetName}</span>
              </button>
            )
          })}

          <a
            href="#socials"
            onClick={() => handleNavClick(4, 'socials')}
            className="tactile-btn mt-3 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-mono text-xs font-bold text-black"
          >
            TRANSMIT SIGNAL ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
