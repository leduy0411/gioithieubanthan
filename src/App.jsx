import React, { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import CyberBackground from './components/CyberBackground'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'
import { ArrowLeft, Cpu } from 'lucide-react'

export default function App() {
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    // Check for 404 path on Vercel deployment
    const path = window.location.pathname
    if (path !== '/' && path !== '' && !path.startsWith('/#')) {
      setIsNotFound(true)
    }

    // 1. Interactive Cursor-Tracking Spotlight for Cards (--x, --y, --mouse-x, --mouse-y)
    const handleGlobalMouseMove = (e) => {
      const cards = document.querySelectorAll('.spotlight-card, .cyber-card, .spatial-glass')
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const rect = card.getBoundingClientRect()
        if (
          e.clientX >= rect.left - 200 &&
          e.clientX <= rect.right + 200 &&
          e.clientY >= rect.top - 200 &&
          e.clientY <= rect.bottom + 200
        ) {
          const x = `${e.clientX - rect.left}px`
          const y = `${e.clientY - rect.top}px`
          card.style.setProperty('--x', x)
          card.style.setProperty('--y', y)
          card.style.setProperty('--mouse-x', x)
          card.style.setProperty('--mouse-y', y)
        }
      }
    }
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true })

    // 2. Viewport Scroll-Reveal Observer
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )

    document.querySelectorAll('main [data-reveal], main .cyber-card, main .spotlight-card, main .spatial-glass').forEach((element) => {
      const siblings = Array.from(element.parentElement?.children ?? [])
      const siblingIndex = siblings.indexOf(element)
      element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 4) * 75}ms`)
      element.classList.add('scroll-reveal')
      revealObserver.observe(element)
    })

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      revealObserver.disconnect()
    }
  }, [])

  if (isNotFound) {
    return (
      <div className="relative min-h-screen bg-[#030306] text-[#F5F7FA] font-body flex items-center justify-center p-6">
        <CyberBackground />
        <div className="spatial-glass relative z-10 max-w-lg w-full p-8 sm:p-10 rounded-2xl border border-white/[0.08] text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>404 // ROUTE DISCONNECTED</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white mb-3">
            System Node Not Found
          </h1>
          <p className="font-body text-zinc-400 text-sm leading-relaxed mb-8">
            The requested neural pathway does not exist or has been relocated within the architecture.
          </p>
          <a
            href="/"
            onClick={() => {
              window.history.pushState({}, '', '/')
              setIsNotFound(false)
            }}
            className="tactile-btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D9FF] text-[#030306] font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,217,255,0.4)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Flagship Orbit</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#030306] text-[#F5F7FA] font-body selection:bg-[#00D9FF] selection:text-[#030306] overflow-x-hidden">
      {/* Cinematic Spatial Preloader */}
      <Preloader />

      {/* Desktop Glowing Custom Cursor */}
      <CustomCursor />

      {/* Interactive Three.js Space Background & Cyber Grid */}
      <CyberBackground />

      {/* Main Layout Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Streamlined, Concise & Professional Content Sections */}
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <SocialSection />
        </main>

        {/* Minimal Cyber Tech Footer */}
        <Footer />
      </div>
    </div>
  )
}
