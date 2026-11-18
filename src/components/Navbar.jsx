import React, { useEffect, useState } from 'react'
import { Menu, Terminal, X, Zap } from 'lucide-react'

const NAV_LINKS = [
  { id: 'home', label: 'INDEX' },
  { id: 'about', label: 'PROFILE' },
  { id: 'projects', label: 'SYSTEMS' },
  { id: 'skills', label: 'EXPERTISE' },
  { id: 'socials', label: 'SIGNAL' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const sections = NAV_LINKS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) setActive(visibleSection.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#030306]/80 backdrop-blur-2xl">
      {/* Scroll Progress Line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.05]" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#7928ca] transition-[width] duration-150 ease-out shadow-[0_0_12px_#00f2fe]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        {/* Brand Logo with Glowing Beacon */}
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3 rounded-lg font-display text-xl font-bold tracking-tight text-white focus-visible:outline-offset-4"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00f2fe]/40 bg-[#00f2fe]/10 text-[#00f2fe] shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all group-hover:scale-105 group-hover:bg-[#00f2fe]/20">
            <Zap size={18} />
          </div>
          <span>
            LE DUY<span className="text-[#00f2fe]">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links Pill */}
        <div className="hidden sm:flex items-center gap-1 rounded-full border border-white/[0.1] bg-[#070b14]/90 p-1.5 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'border border-[#00f2fe]/40 bg-[#00f2fe]/15 text-[#00f2fe] shadow-[0_0_20px_rgba(0,242,254,0.25)] font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#socials"
            className="tactile-btn inline-flex items-center gap-2 rounded-xl border border-[#00f2fe]/40 bg-[#00f2fe]/10 px-4 py-2 font-mono text-xs font-semibold text-[#00f2fe] hover:bg-[#00f2fe]/20 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
          >
            <span>TRANSMIT</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-[#070b14]/80 text-zinc-300 transition-colors hover:border-[#00f2fe]/50 hover:text-white sm:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation Dropdown */}
        <div
          id="primary-navigation"
          className={`absolute inset-x-0 top-18 border-b border-white/[0.1] bg-[#070b14]/98 px-6 py-6 backdrop-blur-3xl sm:hidden ${
            menuOpen ? 'flex flex-col gap-3' : 'hidden'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 font-mono text-sm transition-all ${
                active === link.id
                  ? 'border border-[#00f2fe]/40 bg-[#00f2fe]/15 text-[#00f2fe]'
                  : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#socials"
            onClick={closeMenu}
            className="tactile-btn mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#7928ca] py-3 font-mono text-sm font-bold text-black"
          >
            TRANSMIT SIGNAL
          </a>
        </div>
      </nav>
    </header>
  )
}
