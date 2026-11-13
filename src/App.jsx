import React, { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import CyberBackground from './components/CyberBackground'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
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

    document.querySelectorAll('main [data-reveal], main .cyber-card').forEach((element) => {
      const siblings = Array.from(element.parentElement?.children ?? [])
      const siblingIndex = siblings.indexOf(element)
      element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 4) * 75}ms`)
      element.classList.add('scroll-reveal')
      revealObserver.observe(element)
    })

    return () => revealObserver.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050811] text-[#F5F7FA] font-body selection:bg-[#00D9FF] selection:text-[#030407] overflow-x-hidden">
      {/* Initial Cyber Loading Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

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
          <SkillsSection />
          <SocialSection />
        </main>

        {/* Minimal Cyber Tech Footer */}
        <Footer />
      </div>
    </div>
  )
}
