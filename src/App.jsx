import React, { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import CyberBackground from './components/CyberBackground'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import SocialSection from './sections/SocialSection'
import Footer from './sections/Footer'

export default function App() {
  useEffect(() => {
    // 1. Interactive Cursor-Tracking Spotlight for Cards
    const handleGlobalMouseMove = (e) => {
      const cards = document.querySelectorAll('.spotlight-card, .cyber-card')
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const rect = card.getBoundingClientRect()
        if (
          e.clientX >= rect.left - 180 &&
          e.clientX <= rect.right + 180 &&
          e.clientY >= rect.top - 180 &&
          e.clientY <= rect.bottom + 180
        ) {
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
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

    document.querySelectorAll('main [data-reveal], main .cyber-card, main .spotlight-card').forEach((element) => {
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

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#F5F7FA] font-body selection:bg-[#00D9FF] selection:text-[#050508] overflow-x-hidden">
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
