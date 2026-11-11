import React, { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import CyberBackground from './components/CyberBackground'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ExperienceSection from './sections/ExperienceSection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative min-h-screen bg-[#030407] text-[#F5F7FA] font-body selection:bg-[#D4FF24] selection:text-[#030407] overflow-x-hidden">
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

        {/* Content Sections */}
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Cyber Tech Footer */}
        <Footer />
      </div>
    </div>
  )
}
