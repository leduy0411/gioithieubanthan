import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'
import VoidSignal from './components/VoidSignal'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import KineticMarquee from './components/KineticMarquee'
import CommandPalette from './components/CommandPalette'
import { ArrowUpRight } from 'lucide-react'

export default function App() {
  const [introReady, setIntroReady] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const isNotFound = window.location.pathname !== '/' && window.location.pathname !== ''

  if (isNotFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030306] px-5 text-center text-[#f8fafc]">
        <div className="max-w-md">
          <p className="font-mono text-sm text-[#00f2fe]">404 // ROUTE_NOT_FOUND</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">LOST IN THE VOID</h1>
          <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
            The requested coordinate does not exist in the neural architecture.
          </p>
          <a
            href="/"
            className="tactile-btn mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#7928ca] px-5 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
          >
            Return to Core
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </main>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030306] text-[#F8FAFC] selection:bg-[#00f2fe]/30 selection:text-white">
      {/* Cinematic 850ms Preloader */}
      <Preloader onComplete={() => setIntroReady(true)} />

      {/* Kinetic Custom Magnetic Context Cursor */}
      <CustomCursor />

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette isOpen={commandPaletteOpen} setIsOpen={setCommandPaletteOpen} />

      {/* Three.js Custom GLSL Shader Living Mesh Background with Parallax */}
      <VoidSignal />

      {/* Persistent Film Grain Overlay */}
      <div className="grain-overlay pointer-events-none fixed inset-0 z-[1] opacity-[0.035]" aria-hidden="true" />

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
