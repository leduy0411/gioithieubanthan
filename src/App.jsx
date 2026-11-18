import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'
import CosmicScene from './components/CosmicScene'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import KineticMarquee from './components/KineticMarquee'
import CommandPalette from './components/CommandPalette'
import { ArrowUpRight } from 'lucide-react'

const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'socials']

export default function App() {
  const [introReady, setIntroReady] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)

  // Track active section for CosmicScene planet transitions
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const index = SECTION_IDS.indexOf(visible.target.id)
          if (index !== -1) setActiveSectionIndex(index)
        }
      },
      { rootMargin: '-20% 0px -50% 0px', threshold: [0.1, 0.3, 0.6] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const isNotFound = window.location.pathname !== '/' && window.location.pathname !== ''

  if (isNotFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030307] px-5 text-center text-[#f8fafc]">
        <div className="max-w-md">
          <p className="font-mono text-sm text-[#00f2fe]">404 // COSMIC_COORDINATE_NOT_FOUND</p>
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#030307] text-[#F8FAFC] selection:bg-[#00f2fe]/30 selection:text-white">
      {/* Cinematic 850ms Preloader */}
      <Preloader onComplete={() => setIntroReady(true)} />

      {/* Kinetic Custom Magnetic Context Cursor */}
      <CustomCursor />

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette isOpen={commandPaletteOpen} setIsOpen={setCommandPaletteOpen} />

      {/* Minimalist Cosmic Odyssey 3D Celestial Stage & Orbital Transitions */}
      <CosmicScene currentSection={activeSectionIndex} />

      {/* Subtle Cosmic Grain */}
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
