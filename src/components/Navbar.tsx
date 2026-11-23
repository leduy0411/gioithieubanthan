import { useEffect, useState } from 'react'
import { Command, Menu, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react'
import { STATIONS, stationStore, StationIndex } from '../store/stationStore'
import { useActiveSection } from '../hooks/useActiveSection'
import { useMotionToggle } from '../hooks/useScrollMotion'
import { useAudioDrone } from '../hooks/useAudioDrone'
import { content } from '../data/content'

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { activeStation, isNotFound } = useActiveSection()
  const { motionEnabled, toggleMotion } = useMotionToggle()
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
      {/* Global 3px Glowing Magenta-to-Gold Multi-Page Progress Bar */}
      <div
        className="page-progress-bar"
        style={{ transform: `scaleX(${pageStepRatio})` }}
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300 ${
          scrolled || activeStation !== 0
            ? 'border-b border-white/10 bg-[#110B1F]/90 backdrop-blur-xl shadow-[0_12px_36px_rgba(9,5,18,0.78)]'
            : 'border-b border-white/5 bg-[#110B1F]/50 backdrop-blur-md'
        }`}
      >
        <nav
          aria-label="Primary Page Navigation"
          className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          {/* Left: Stylized Bold Gaming Logo -> Home Page (/) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(0)
            }}
            className="group inline-flex items-center gap-2.5 rounded px-1 font-display text-xl font-extrabold tracking-[0.12em] text-white transition-colors hover:text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
          >
            <span
              aria-hidden="true"
              className="animate-slow-spin inline-block h-2.5 w-2.5 border border-[#F59E0B] bg-[#EC4899] shadow-[0_0_10px_#EC4899]"
            />
            <span className="animate-title-shine">{content.identity.callsign}</span>
            <span className="hidden rounded border border-[#F59E0B]/40 bg-[#F59E0B]/15 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest text-[#FDE68A] sm:inline-block">
              PRO MAX
            </span>
          </a>

          {/* Center: 5 Standalone Pages (HOME, PROFILE, SYSTEMS, EXPERTISE, SIGNAL) */}
          <div className="hidden items-center gap-6 lg:gap-8 md:flex">
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
                  className={`group relative inline-flex items-center gap-1.5 rounded px-1.5 py-1 font-gaming text-sm font-semibold uppercase tracking-[0.14em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70 ${
                    isActive ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] transition-colors ${
                      isActive ? 'text-[#F59E0B]' : 'text-white/35 group-hover:text-[#F472B6]'
                    }`}
                  >
                    0{item.id + 1}
                  </span>
                  <span>{item.callsign}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-gradient-to-r from-[#F59E0B] via-[#EC4899] to-[#8B5CF6] shadow-[0_0_10px_#EC4899] transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              )
            })}
          </div>

          {/* Right: Command Palette (Ctrl+K), SFX Audio Toggle, ANIM Toggle & TRANSMIT CTA */}
          <div className="hidden items-center gap-2 lg:gap-2.5 md:flex">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                title="Open Quick Command Palette (Ctrl + K)"
                className="tactile-btn inline-flex items-center gap-1.5 rounded border border-violet-400/30 bg-[#19112B]/80 px-2.5 py-2 font-mono text-[10px] text-[#B8B0C8] transition-colors hover:border-[#EC4899]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
              >
                <Command size={11} className="text-[#F472B6]" aria-hidden="true" />
                <span>CTRL+K</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleAudio}
              title={isAudioEnabled ? 'Mute Hextech clockwork SFX' : 'Enable Hextech clockwork SFX'}
              aria-pressed={isAudioEnabled}
              className={`tactile-btn inline-flex items-center gap-1.5 rounded border px-2.5 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70 ${
                isAudioEnabled
                  ? 'border-[#F59E0B]/60 bg-[#F59E0B]/18 text-[#FDE68A] shadow-[0_0_12px_rgba(245,158,11,0.28)]'
                  : 'border-white/15 bg-white/[0.04] text-[#B8B0C8] hover:border-white/30 hover:text-white'
              }`}
            >
              {isAudioEnabled ? (
                <Volume2 size={11} aria-hidden="true" />
              ) : (
                <VolumeX size={11} aria-hidden="true" />
              )}
              <span>SFX {isAudioEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={toggleMotion}
              title={motionEnabled ? 'Pause UI animations' : 'Enable UI animations'}
              aria-pressed={motionEnabled}
              className={`tactile-btn inline-flex items-center gap-1.5 rounded border px-2.5 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70 ${
                motionEnabled
                  ? 'border-[#EC4899]/55 bg-[#EC4899]/18 text-[#F472B6] shadow-[0_0_12px_rgba(236,72,153,0.25)]'
                  : 'border-white/15 bg-white/[0.04] text-[#B8B0C8]'
              }`}
            >
              <Sparkles size={11} aria-hidden="true" />
              <span>ANIM {motionEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <a
              href="/signal"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(4)
              }}
              className={`tactile-btn inline-flex items-center gap-2 rounded border px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70 ${
                !isNotFound && activeStation === 4
                  ? 'border-[#EC4899] bg-[#EC4899] text-white shadow-[0_0_20px_rgba(236,72,153,0.45)]'
                  : 'border-white/75 text-white hover:border-white hover:bg-white hover:text-[#110B1F]'
              }`}
            >
              <Send size={12} aria-hidden="true" />
              <span>TRANSMIT</span>
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                aria-label="Open Command Palette"
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/20 bg-[#19112B]/80 text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
              >
                <Command size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={isAudioEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              className={`inline-flex h-9 items-center gap-1 rounded border px-2 font-mono text-[10px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70 ${
                isAudioEnabled
                  ? 'border-[#F59E0B]/60 bg-[#F59E0B]/20 text-[#FDE68A]'
                  : 'border-white/20 bg-[#19112B]/80 text-[#B8B0C8]'
              }`}
            >
              {isAudioEnabled ? <Volume2 size={11} /> : <VolumeX size={11} />}
            </button>
            <button
              type="button"
              onClick={toggleMotion}
              className="inline-flex h-9 items-center gap-1 rounded border border-white/20 bg-[#19112B]/80 px-2 font-mono text-[10px] text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
            >
              <Sparkles size={11} />
              <span>{motionEnabled ? 'ANIM' : 'OFF'}</span>
            </button>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-gaming-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/25 bg-[#19112B]/80 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            id="mobile-gaming-menu"
            className="border-b border-violet-500/25 bg-[#110B1F]/98 px-6 py-6 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2.5">
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
                    className={`flex items-center justify-between rounded border-l-2 px-4 py-2.5 text-left font-gaming text-sm font-semibold uppercase tracking-[0.16em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70 ${
                      isActive
                        ? 'border-[#EC4899] bg-white/[0.07] text-white'
                        : 'border-transparent text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{item.callsign}</span>
                    <span className="font-mono text-[10px] text-[#B8B0C8]">
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
                className="mt-3 inline-flex items-center justify-center gap-2 rounded border border-white/80 py-3 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-[#110B1F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
              >
                <Send size={13} aria-hidden="true" />
                <span>TRANSMIT</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
