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
import { useActiveSection } from './hooks/useActiveSection'
import { STATIONS, stationStore } from './store/stationStore'
import { applyWheelImpulse } from './hooks/useScrollMotion'
import { playMechanicalTick, playMechanicalUnlock } from './hooks/useAudioDrone'

export default function App() {
  const [, setIntroReady] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const { activeStation, direction, isNotFound, transitionCount } = useActiveSection()

  // Full-Page Scroll / Wheel / Touch / Keyboard Navigation Refs
  const wheelAccumRef = useRef(0)
  const lastSwitchTimeRef = useRef(0)
  const lastWheelEventTimeRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const edgeDwellTimeRef = useRef(0)
  const wasAtEdgeRef = useRef(true)

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

    const handleWheel = (e: WheelEvent) => {
      if (commandPaletteOpen || isInsideModalOrScrollable(e.target)) return
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return

      const now = performance.now()
      // Reset accumulator if user paused scrolling for > 180ms
      if (now - lastWheelEventTimeRef.current > 180) {
        wheelAccumRef.current = 0
      }
      lastWheelEventTimeRef.current = now

      // Feed live wheel impulse into Hextech Astrolabe & 3D parallax
      applyWheelImpulse(e.deltaY)

      if (now - lastSwitchTimeRef.current < COOLDOWN_MS) {
        wheelAccumRef.current = 0
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

      // If page has internal scroll room and user isn't at the boundary yet, let native scroll happen
      if ((goingDown && !atBottom) || (goingUp && !atTop)) {
        wasAtEdgeRef.current = false
        wheelAccumRef.current = 0
        return
      }

      // Brief 140ms pause when first hitting the boundary of a tall scrollable page
      if (!wasAtEdgeRef.current) {
        wasAtEdgeRef.current = true
        edgeDwellTimeRef.current = now
        wheelAccumRef.current = 0
        return
      }
      if (maxScroll > 32 && now - edgeDwellTimeRef.current < 140) {
        return
      }

      wheelAccumRef.current += e.deltaY

      const current = stationStore.getState().activeStation
      if (wheelAccumRef.current >= WHEEL_THRESHOLD && current < STATIONS.length - 1) {
        wheelAccumRef.current = 0
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current + 1)
      } else if (wheelAccumRef.current <= -WHEEL_THRESHOLD && current > 0) {
        wheelAccumRef.current = 0
        lastSwitchTimeRef.current = now
        playMechanicalUnlock()
        stationStore.navigate(current - 1)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (commandPaletteOpen || isInsideModalOrScrollable(e.target)) return
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || commandPaletteOpen) return
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
      if (commandPaletteOpen || isInsideModalOrScrollable(e.target)) return
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
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [commandPaletteOpen, isNotFound])

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
      <div className="relative min-h-screen overflow-x-clip bg-[#110B1F] text-white selection:bg-[#EC4899]/35 selection:text-white">
        <CustomCursor />
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className="flex min-h-screen items-center justify-center px-5 pt-20 text-center">
          <div className="max-w-md">
            <p className="font-gaming text-xs font-bold uppercase tracking-[0.22em] text-[#F472B6]">
              404 // LOST REALM
            </p>
            <h1 className="animate-title-shine mt-3 font-display text-4xl font-bold uppercase tracking-[0.06em]">
              PAGE NOT FOUND
            </h1>
            <p className="mt-3 font-body text-sm leading-relaxed text-[#B8B0C8]">
              The requested path does not exist in this portfolio realm.
            </p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                stationStore.navigate(0)
              }}
              className="tactile-btn mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#110B1F] hover:bg-[#F472B6] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80"
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
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#110B1F] text-white selection:bg-[#EC4899]/35 selection:text-white">
      <Preloader onComplete={() => setIntroReady(true)} />
      <CustomCursor />
      <CommandPalette isOpen={commandPaletteOpen} setIsOpen={setCommandPaletteOpen} />

      {/* Ultra-Clean Multi-Page Gaming Navbar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Right-Edge Vertical 5-Page Scroll HUD Dock (Visual & Clickable Wheel Navigation Rail) */}
      <aside
        aria-label="Vertical Page Scroll Navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      >
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
              aria-label={`Switch to ${page.callsign} page`}
              aria-current={isCurrent ? 'page' : undefined}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <span
                className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest backdrop-blur-md transition-all duration-200 ${
                  isCurrent
                    ? 'translate-x-0 border-[#EC4899]/60 bg-[#19112B]/90 text-[#F472B6] opacity-100 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                    : 'translate-x-2 border-white/10 bg-[#110B1F]/75 text-[#B8B0C8] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                0{page.id + 1} · {page.callsign}
              </span>
              <span
                className={`block rotate-45 border transition-all duration-300 ${
                  isCurrent
                    ? 'h-3 w-3 border-white bg-[#EC4899] shadow-[0_0_14px_#EC4899]'
                    : 'h-2 w-2 border-violet-300/45 bg-[#19112B] group-hover:border-[#F59E0B] group-hover:bg-[#F59E0B]'
                }`}
              />
            </button>
          )
        })}

        <div
          title="Scroll mouse wheel up/down to switch pages"
          className="mt-2 flex items-center gap-1 rounded-full border border-white/10 bg-[#110B1F]/70 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-[#B8B0C8]/80 backdrop-blur-md"
        >
          <ChevronsUpDown size={10} className="animate-arrow-bob text-[#F59E0B]" />
          <span>SCROLL</span>
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
