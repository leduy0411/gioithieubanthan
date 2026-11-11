import React, { useState, useEffect } from 'react'
import TechLogoD from './TechLogoD'
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' }
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll spy & navbar background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = NAV_ITEMS.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const scrollTo = (href) => {
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030407]/85 backdrop-blur-xl border-b border-[#1B2638] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on Left */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#home')
            }}
            className="flex items-center"
          >
            <TechLogoD size={38} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#0B101A]/80 border border-[#1B2638] rounded-full px-4 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(item.href)
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 rounded-full ${
                    isActive
                      ? 'text-[#030407] bg-[#D4FF24] shadow-[0_0_15px_rgba(212,255,36,0.5)]'
                      : 'text-[#9299A6] hover:text-[#F5F7FA] hover:bg-[#1558C9]/20'
                  }`}
                >
                  {item.label}
                  {/* Subtle active glow dot if active */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4FF24] shadow-[0_0_6px_#D4FF24]" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Desktop Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#contact')
              }}
              className="btn-lime text-xs uppercase px-4 py-2 rounded-lg flex items-center gap-1.5 group"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#0B101A] border border-[#1B2638] text-[#F5F7FA] hover:border-[#1558C9] hover:text-[#D4FF24] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4FF24]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-[#030407]/95 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-4 mb-2 border-b border-[#1B2638] text-xs font-mono text-[#00D9FF]">
            <Terminal className="w-4 h-4 text-[#D4FF24]" />
            <span>NAVIGATION_PROTOCOL // ACTIVE</span>
          </div>

          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.href)
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-base font-display font-semibold tracking-wider transition-all ${
                  isActive
                    ? 'border-[#D4FF24] bg-[#D4FF24]/10 text-[#D4FF24] shadow-[0_0_15px_rgba(212,255,36,0.15)]'
                    : 'border-[#1B2638] bg-[#0B101A]/60 text-[#F5F7FA] hover:border-[#1558C9] hover:text-[#00D9FF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#9299A6]">0{idx + 1}</span>
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#D4FF24] shadow-[0_0_8px_#D4FF24]" />}
              </a>
            )
          })}
        </div>

        {/* Mobile Drawer Footer CTA */}
        <div className="pt-6 border-t border-[#1B2638] flex flex-col gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#contact')
            }}
            className="btn-lime w-full text-center py-3.5 rounded-xl text-sm font-bold tracking-wider flex items-center justify-center gap-2"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-center font-mono text-[10px] text-[#9299A6]">
            DUY.DEV © 2026 // ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </>
  )
}
