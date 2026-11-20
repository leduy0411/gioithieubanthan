import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'
import CosmicScene from './scene/CosmicScene'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import CommandPalette from './components/CommandPalette'
import { useActiveSection } from './hooks/useActiveSection'
import { stationStore } from './store/stationStore'
import { ErrorBoundary } from './components/ErrorBoundary'

export default function App() {
  const [, setIntroReady] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const { activeStation, direction, isNotFound, transitionCount } = useActiveSection()

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

      {/* Lightweight Floating Sakura Petals, Golden Embers & Arcane Sparks Canvas */}
      <ErrorBoundary fallback={null} label="ParticleCanvas">
        <CosmicScene currentSection={activeStation} />
      </ErrorBoundary>

      {/* Ultra-Clean Multi-Page Gaming Navbar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Active Standalone Page Stage with Smooth Directional Transition */}
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
