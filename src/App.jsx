import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'
import CosmicScene from './scene/CosmicScene'
import HudOverlay from './components/HudOverlay'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import KineticMarquee from './components/KineticMarquee'
import CommandPalette from './components/CommandPalette'
import DevPlanetPreview from './scene/DevPlanetPreview'
import { useActiveSection } from './hooks/useActiveSection'
import { ArrowUpRight } from 'lucide-react'

export default function App() {
  const [introReady, setIntroReady] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const { activeStation } = useActiveSection()

  // Dev Testbench for 5 Planet Shaders
  if (typeof window !== 'undefined' && window.location.pathname === '/dev/planets') {
    return <DevPlanetPreview />
  }

  const isNotFound =
    window.location.pathname !== '/' &&
    window.location.pathname !== '' &&
    window.location.pathname !== '/dev/planets'

  if (isNotFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020307] px-5 text-center text-[#f8fafc]">
        <div className="max-w-md">
          <p className="font-mono text-sm text-[#38bdf8]">404 // COSMIC_COORDINATE_NOT_FOUND</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">LOST IN DEEP SPACE</h1>
          <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
            The requested coordinate does not exist in the neural architecture.
          </p>
          <a
            href="/"
            className="tactile-btn mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Return to Core
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </main>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020307] text-[#F8FAFC] selection:bg-[#38bdf8]/30 selection:text-white">
      {/* Cinematic 850ms Preloader */}
      <Preloader onComplete={() => setIntroReady(true)} />

      {/* Kinetic Custom Magnetic Context Cursor */}
      <CustomCursor />

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette isOpen={commandPaletteOpen} setIsOpen={setCommandPaletteOpen} />

      {/* Minimalist Cosmic Odyssey 3D Celestial Stage & Orbital Transitions */}
      <CosmicScene currentSection={activeStation} />

      {/* Minimalist Cosmic Mission Control HUD Overlay (Brackets, 5-Station Dots, T+ Timer) */}
      <HudOverlay />

      {/* Subtle Cosmic Deep Space Grain */}
      <div className="grain-overlay pointer-events-none fixed inset-0 z-[1] opacity-[0.03]" aria-hidden="true" />

      {/* Primary Navigation Dock */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <main className="relative z-10">
        <HeroSection onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <KineticMarquee />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <SocialSection />
      </main>

      <Footer />
    </div>
  )
}
