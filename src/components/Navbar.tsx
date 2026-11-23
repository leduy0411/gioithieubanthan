import { useEffect, useState } from 'react'
import { Command, Menu, Send, Volume2, VolumeX, X } from 'lucide-react'
import { STATIONS, stationStore, StationIndex } from '../store/stationStore'
import { useActiveSection } from '../hooks/useActiveSection'
import { useAudioDrone } from '../hooks/useAudioDrone'
import { content } from '../data/content'

interface NavbarProps {
  onOpenCommandPalette?: () => void
  onOpenIdCard?: () => void
}

export default function Navbar({ onOpenCommandPalette, onOpenIdCard }: NavbarProps) {
  const { activeStation, isNotFound } = useActiveSection()
  const { isAudioEnabled, toggleAudio } = useAudioDrone()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (index: StationIndex) => {
    setMenuOpen(false)
    stationStore.navigate(index)
  }

  const pageStepRatio = isNotFound ? 0 : (activeStation + 1) / STATIONS.length

  return (
    <>
      {/* Global 3px Glowing Hextech Gold-to-Cyan Multi-Page Progress Bar */}
      <div
        className="page-progress-bar"
        style={{ transform: `scaleX(${pageStepRatio})` }}
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 h-18 transition-all duration-300 ${
          scrolled || activeStation !== 0
            ? 'border-b border-[#C89B3C]/35 bg-[#091022]/92 backdrop-blur-xl shadow-[0_10px_30px_rgba(4,4,12,0.85)]'
            : 'border-b border-[#C89B3C]/20 bg-[#091022]/60 backdrop-blur-md'
        }`}
      >
        <nav
          aria-label="Primary Page Navigation"
          className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          {/* Left: Single-Line Clean League of Legends Hextech Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(0)
            }}
            className="group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded px-1 font-display text-xl font-extrabold tracking-[0.12em] text-white transition-colors hover:text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]/70"
          >
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <span
                aria-hidden="true"
                className="animate-slow-spin absolute inset-0 rotate-45 border border-[#C89B3C] bg-[#091428]"
              />
              <span
                aria-hidden="true"
                className="relative h-2 w-2 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_10px_#0AC8B9]"
              />
            </span>
            <span className="animate-title-shine whitespace-nowrap">{content.identity.callsign}</span>
          </a>

          {/* Center: Clean 5 Tabs (HOME, PROFILE, SYSTEMS, EXPERTISE, SIGNAL) */}
          <div className="hidden items-center gap-7 lg:gap-9 md:flex">
            {STATIONS.map((item) => {
              const isActive = !isNotFound && activeStation === item.id
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.id)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative inline-flex shrink-0 items-center whitespace-nowrap px-1 py-1.5 font-gaming text-[13px] font-bold uppercase tracking-[0.16em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]/70 ${
                    isActive
                      ? 'text-[#F0E6D2] drop-shadow-[0_0_10px_rgba(200,155,60,0.55)]'
                      : 'text-[#B8B0C8] hover:text-[#F0E6D2]'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border border-[#F0E6D2] bg-[#C89B3C] shadow-[0_0_8px_#C89B3C]"
                    />
                  )}
                  <span>{item.callsign}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-center bg-gradient-to-r from-[#C89B3C] via-[#0AC8B9] to-[#C89B3C] shadow-[0_0_10px_#0AC8B9] transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              )
            })}
          </div>

          {/* Right: Sleek Single-Line Controls (ID Card, Icon Search, Icon Sound, TRANSMIT) */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {onOpenIdCard && (
              <button
                type="button"
                onClick={onOpenIdCard}
                title="View 1-Page Summoner Engineer ID Card / CV Summary"
                className="tactile-btn inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded border border-[#C89B3C]/45 bg-[#091428]/85 px-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#F0E6D2] transition-colors hover:border-[#0AC8B9] hover:text-[#0AC8B9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]/70"
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-[#0AC8B9]" aria-hidden="true" />
                <span>ID CARD</span>
              </button>
            )}

            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                title="Command Palette (Ctrl + K)"
                aria-label="Open Command Palette (Ctrl + K)"
                className="tactile-btn inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded border border-[#C89B3C]/35 bg-[#091428]/80 px-2.5 font-mono text-[10px] text-[#C8AA6E] transition-colors hover:border-[#0AC8B9] hover:text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]/70"
              >
                <Command size={12} className="text-[#0AC8B9]" aria-hidden="true" />
                <span>⌘K</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleAudio}
              title={isAudioEnabled ? 'Mute Hextech SFX' : 'Enable Hextech SFX'}
              aria-label={isAudioEnabled ? 'Mute Hextech SFX' : 'Enable Hextech SFX'}
              aria-pressed={isAudioEnabled}
              className={`tactile-btn inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]/70 ${
                isAudioEnabled
                  ? 'border-[#0AC8B9] bg-[#0AC8B9]/20 text-[#0AC8B9] shadow-[0_0_12px_rgba(10,200,185,0.35)]'
                  : 'border-[#C89B3C]/35 bg-[#091428]/80 text-[#C8AA6E] hover:border-[#C89B3C] hover:text-[#F0E6D2]'
              }`}
            >
              {isAudioEnabled ? (
                <Volume2 size={14} aria-hidden="true" />
              ) : (
                <VolumeX size={14} aria-hidden="true" />
              )}
            </button>

            <a
              href="/signal"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(4)
              }}
              className="hextech-btn tactile-btn inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap px-4 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]/80"
            >
              <Send size={12} className="text-[#0AC8B9]" aria-hidden="true" />
              <span>TRANSMIT</span>
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                aria-label="Open Command Palette"
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#C89B3C]/45 bg-[#091428]/85 text-[#0AC8B9]"
              >
                <Command size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={isAudioEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              className={`inline-flex h-9 w-9 items-center justify-center rounded border ${
                isAudioEnabled
                  ? 'border-[#0AC8B9] bg-[#0AC8B9]/20 text-[#0AC8B9]'
                  : 'border-[#C89B3C]/35 bg-[#091428]/85 text-[#C8AA6E]'
              }`}
            >
              {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-gaming-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#C89B3C]/50 bg-[#091428]/90 text-[#F0E6D2]"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            id="mobile-gaming-menu"
            className="border-b border-[#C89B3C]/40 bg-[#091428]/98 px-6 py-5 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {STATIONS.map((item) => {
                const isActive = !isNotFound && activeStation === item.id
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.id)
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between rounded border-l-2 px-4 py-2.5 text-left font-gaming text-sm font-semibold uppercase tracking-[0.16em] transition-colors ${
                      isActive
                        ? 'border-[#0AC8B9] bg-[#C89B3C]/15 text-[#F0E6D2]'
                        : 'border-transparent text-white/80 hover:text-[#F0E6D2]'
                    }`}
                  >
                    <span>{item.callsign}</span>
                    <span className="font-mono text-[10px] text-[#0AC8B9]">
                      0{item.id + 1} / 0{STATIONS.length}
                    </span>
                  </a>
                )
              })}
              <a
                href="/signal"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(4)
                }}
                className="hextech-btn mt-2 inline-flex items-center justify-center gap-2 py-2.5 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#F0E6D2]"
              >
                <Send size={13} className="text-[#0AC8B9]" aria-hidden="true" />
                <span>TRANSMIT</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
