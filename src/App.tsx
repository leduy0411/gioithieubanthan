import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronsUpDown } from 'lucide-react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import CommandPalette from './components/CommandPalette'
import SummonerIdModal from './components/SummonerIdModal'
import { useActiveSection } from './hooks/useActiveSection'
import { STATIONS, stationStore } from './store/stationStore'
import { applyWheelImpulse } from './hooks/useScrollMotion'
import { playMechanicalTick, playMechanicalUnlock } from './hooks/useAudioDrone'

export default function App() {
  const [, setIntroReady] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [idCardOpen, setIdCardOpen] = useState(false)
  const [wheelCharge, setWheelCharge] = useState(0)
  const { activeStation, currentConfig, direction, isNotFound, transitionCount } =
    useActiveSection()

  const wheelAccumRef = useRef(0)
  const lastSwitchTimeRef = useRef(0)
  const lastWheelEventTimeRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const edgeDwellTimeRef = useRef(0)
  const wasAtEdgeRef = useRef(true)
  const chargeDecayTimerRef = useRef<number | null>(null)

  // Global Zero-Re-Render Cursor Spotlight Tracker for all `.fantasy-card` elements
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      const card = target?.closest<HTMLElement>('.fantasy-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--card-mx', `${(e.clientX - rect.left).toFixed(1)}px`)
      card.style.setProperty('--card-my', `${(e.clientY - rect.top).toFixed(1)}px`)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    if (isNotFound) return undefined

    const COOLDOWN_MS = 680
    const WHEEL_THRESHOLD = 42

    const isInsideModalOrScrollable = (target: EventTarget | null): boolean => {
      const el = target as HTMLElement | null
      if (!el) return false
      if (el.closest('[role="dialog"]')) return true
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return true
      const scrollableParent = el.closest('[data-scrollable="true"]')
      if (scrollableParent) return true
      return false
    }

    const scheduleChargeReset = () => {
      if (chargeDecayTimerRef.current) {
        window.clearTimeout(chargeDecayTimerRef.current)
      }
      chargeDecayTimerRef.current = window.setTimeout(() => {
        wheelAccumRef.current = 0
        setWheelCharge(0)
      }, 220)
    }

    const handleWheel = (e: WheelEvent) => {
      if (commandPaletteOpen || idCardOpen || isInsideModalOrScrollable(e.target)) return
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return

      const now = performance.now()
      if (now - lastWheelEventTimeRef.current > 180) {
        wheelAccumRef.current = 0
      }
      lastWheelEventTimeRef.current = now

      applyWheelImpulse(e.deltaY)

      if (now - lastSwitchTimeRef.current < COOLDOWN_MS) {
        wheelAccumRef.current = 0
        setWheelCharge(0)
        return
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const vh = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const maxScroll = Math.max(0, docHeight - vh)

      const goingDown = e.deltaY > 0
      const goingUp = e.deltaY < 0
      const atBottom = scrollTop >= maxScroll - 14
      const atTop = scrollTop <= 14

      if ((goingDown && !atBottom) || (goingUp && !atTop)) {
        wasAtEdgeRef.current = false
        wheelAccumRef.current = 0
        setWheelCharge(0)
        return
      }

      if (!wasAtEdgeRef.current) {
        wasAtEdgeRef.current = true
        edgeDwellTimeRef.current = now
        wheelAccumRef.current = 0
        setWheelCharge(0)
        return
      }
      if (maxScroll > 32 && now - edgeDwellTimeRef.current < 140) {
        return
      }

      wheelAccumRef.current += e.deltaY
      const normalizedCharge = Math.max(
        Math.min(wheelAccumRef.current / WHEEL_THRESHOLD, 1),
        -1
      )
      setWheelCharge(normalizedCharge)
      scheduleChargeReset()

      const current = stationStore.getState().activeStation
      if (wheelAccumRef.current >= WHEEL_THRESHOLD && current < STATIONS.length - 1) {
        wheelAccumRef.current = 0
        setWheelCharge(0)
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current + 1)
      } else if (wheelAccumRef.current <= -WHEEL_THRESHOLD && current > 0) {
        wheelAccumRef.current = 0
        setWheelCharge(0)
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current - 1)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (commandPaletteOpen || idCardOpen || isInsideModalOrScrollable(e.target)) return
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || commandPaletteOpen || idCardOpen) return
      const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current
      const deltaY = touchStartYRef.current - endY
      touchStartYRef.current = null

      if (Math.abs(deltaY) < 64) return

      const now = performance.now()
      if (now - lastSwitchTimeRef.current < COOLDOWN_MS) return

      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const current = stationStore.getState().activeStation

      if (deltaY > 64 && scrollTop >= maxScroll - 16 && current < STATIONS.length - 1) {
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current + 1)
      } else if (deltaY < -64 && scrollTop <= 16 && current > 0) {
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current - 1)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (commandPaletteOpen || idCardOpen || isInsideModalOrScrollable(e.target)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const now = performance.now()
      if (now - lastSwitchTimeRef.current < COOLDOWN_MS) return

      const current = stationStore.getState().activeStation
      if (e.key === 'PageDown' && current < STATIONS.length - 1) {
        e.preventDefault()
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current + 1)
      } else if (e.key === 'PageUp' && current > 0) {
        e.preventDefault()
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current - 1)
      } else if (/^[1-5]$/.test(e.key)) {
        const targetIdx = Number(e.key) - 1
        if (targetIdx !== current) {
          e.preventDefault()
          lastSwitchTimeRef.current = now
          playMechanicalUnlock()
          stationStore.navigate(targetIdx)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (chargeDecayTimerRef.current) window.clearTimeout(chargeDecayTimerRef.current)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [commandPaletteOpen, idCardOpen, isNotFound])

  const renderActivePage = () => {
    switch (activeStation) {
      case 0:
        return <HeroSection onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      case 1:
        return <AboutSection />
      case 2:
        return <ProjectsSection />
      case 3:
        return <SkillsSection />
      case 4:
        return <SocialSection />
      default:
        return <HeroSection onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
    }
  }

  if (isNotFound) {
    return (
      <div className="relative min-h-screen overflow-x-clip bg-[#091428] text-[#F0E6D2] selection:bg-[#0AC8B9]/35 selection:text-[#F0E6D2]">
        <CustomCursor />
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenIdCard={() => setIdCardOpen(true)}
        />
        <main className="flex min-h-screen items-center justify-center px-5 pt-20 text-center">
          <div className="max-w-md">
            <p className="font-gaming text-xs font-bold uppercase tracking-[0.22em] text-[#0AC8B9]">
              404 // LOST REALM
            </p>
            <h1 className="animate-title-shine mt-3 font-display text-4xl font-bold uppercase tracking-[0.06em]">
              PAGE NOT FOUND
            </h1>
            <p className="mt-3 font-body text-sm leading-relaxed text-[#B8B0C8]">
              The requested path does not exist in this Piltover Hextech realm.
            </p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                stationStore.navigate(0)
              }}
              className="hextech-play-btn tactile-btn mt-6 inline-flex items-center gap-2 px-6 py-3 font-gaming text-xs font-extrabold uppercase tracking-[0.18em]"
            >
              <span>RETURN HOME</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#091428] text-[#F0E6D2] selection:bg-[#0AC8B9]/35 selection:text-[#F0E6D2]">
      <Preloader onComplete={() => setIntroReady(true)} />
      <CustomCursor />
      <CommandPalette
        isOpen={commandPaletteOpen}
        setIsOpen={setCommandPaletteOpen}
        onOpenIdCard={() => setIdCardOpen(true)}
      />
      <SummonerIdModal isOpen={idCardOpen} onClose={() => setIdCardOpen(false)} />

      {/* Ultra-Clean Multi-Page League of Legends Client Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenIdCard={() => setIdCardOpen(true)}
      />

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* PILTOVER HEXGATE PORTAL TRANSITION FLASH & REALM ANNOUNCER BANNER */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {transitionCount > 0 && (
        <div key={`hexgate-${transitionCount}`} aria-hidden="true" className="pointer-events-none">
          {/* Top & Bottom Golden-Cyan Caliper Sweep Lines */}
          <div className="animate-warp-sweep fixed inset-x-0 top-18 z-40 h-0.5 bg-gradient-to-r from-transparent via-[#0AC8B9] to-transparent shadow-[0_0_24px_#0AC8B9]" />
          {/* Center Expanding Hexgate Geometric Iris Ring */}
          <div className="animate-hexgate-iris fixed left-1/2 top-1/2 z-30 h-72 w-72 rounded-full border border-[#0AC8B9]/45 shadow-[0_0_40px_rgba(10,200,185,0.25),inset_0_0_25px_rgba(200,155,60,0.2)]" />
          {/* LoL Client Floating Realm Announcer Banner */}
          <div className="animate-realm-banner fixed left-1/2 top-21 z-40 flex items-center gap-2.5">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C89B3C]" />
            <div className="hextech-chamfer flex items-center gap-2 border border-[#C89B3C]/75 bg-[#091428]/95 px-3.5 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.85)] backdrop-blur-md">
              <span className="h-2 w-2 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_8px_#0AC8B9]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#F0E6D2]">
                REALM 0{activeStation + 1} // {currentConfig.planetName}
              </span>
            </div>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C89B3C]" />
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* RIGHT-EDGE PILTOVER HEXTECH REALM PILLAR (Unified Gold & Cyan)    */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <aside
        aria-label="Piltover Hextech Realm Compass"
        className="fixed right-3.5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <div className="relative flex flex-col items-center rounded-xl border border-[#C89B3C]/55 bg-[#091428]/90 px-2.5 py-3.5 shadow-[0_16px_40px_rgba(4,4,14,0.9),inset_0_0_16px_rgba(10,200,185,0.12)] backdrop-blur-xl">
          {/* Top Corner Gold Ticks */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-[#F0E6D2]/75"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r border-t border-[#F0E6D2]/75"
          />

          {/* Step Counter */}
          <span className="mb-2.5 font-mono text-[9px] font-bold tracking-wider text-[#C89B3C]">
            0{activeStation + 1}/0{STATIONS.length}
          </span>

          {/* Vertical Spine & 5 Hextech Diamond Sockets */}
          <div className="relative flex flex-col items-center gap-3.5 py-1">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-[#C89B3C]/40 via-[#0AC8B9]/65 to-[#C89B3C]/40"
            />

            {STATIONS.map((page) => {
              const isCurrent = page.id === activeStation
              return (
                <button
                  key={page.id}
                  type="button"
                  onMouseEnter={() => playMechanicalTick()}
                  onClick={() => {
                    playMechanicalUnlock()
                    stationStore.navigate(page.id)
                  }}
                  aria-label={`Switch to ${page.callsign} page (Key ${page.id + 1})`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className="group relative z-10 flex items-center justify-center focus:outline-none"
                >
                  {/* Slide-Out LoL Client Tooltip Pill on Hover */}
                  <span className="hextech-chamfer pointer-events-none absolute right-7 translate-x-2 whitespace-nowrap border border-[#C89B3C]/70 bg-[#091428]/95 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#F0E6D2] opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.9)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    <span className="text-[#0AC8B9]">0{page.id + 1}</span> · {page.callsign}
                  </span>

                  {/* Diamond Socket Node */}
                  <span
                    className={`block rotate-45 border transition-all duration-300 ${
                      isCurrent
                        ? 'h-3.5 w-3.5 border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_14px_#0AC8B9]'
                        : 'h-2.5 w-2.5 border-[#C89B3C]/65 bg-[#091428] group-hover:scale-125 group-hover:border-[#F0E6D2] group-hover:bg-[#C89B3C]'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Live Wheel Momentum Charge Bar inside Pillar */}
          <div
            title="Scroll mouse wheel or press keys 1–5 to switch realms"
            className="mt-3 flex flex-col items-center gap-1.5 border-t border-[#C89B3C]/25 pt-2.5"
          >
            <div className="h-1 w-7 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#C89B3C] to-[#0AC8B9] transition-all duration-75"
                style={{
                  width: `${Math.min(Math.abs(wheelCharge) * 100, 100)}%`,
                }}
              />
            </div>
            <ChevronsUpDown size={11} className="animate-arrow-bob text-[#0AC8B9]" />
          </div>
        </div>
      </aside>

      {/* Active Standalone Page Stage with Vertical Scroll-Matched Directional Transition */}
      <main className="relative z-10 flex flex-1 flex-col">
        <div
          key={`${activeStation}-${transitionCount}`}
          className={`flex flex-1 flex-col ${
            direction === 'forward' ? 'page-stage-forward' : 'page-stage-backward'
          }`}
        >
          {renderActivePage()}
        </div>
      </main>

      {/* Multi-Page Realm Navigator & Footer */}
      <Footer />
    </div>
  )
}
