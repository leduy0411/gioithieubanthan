import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import SiteLogo from './SiteLogo'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Expertise', href: '#skills' },
  { label: 'Contact', href: '#socials' }
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)

      const marker = window.scrollY + window.innerHeight * 0.35
      for (let index = NAV_ITEMS.length - 1; index >= 0; index -= 1) {
        const section = document.querySelector(NAV_ITEMS[index].href)
        if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
          setActiveSection((current) => current === section.id ? current : section.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileMenuOpen])

  const scrollTo = (href) => {
    setMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            scrollTo('#home')
          }}
          aria-label="Le Duy — về đầu trang"
          className="flex shrink-0 items-center"
        >
          <SiteLogo className="h-11 w-[68px]" />
        </a>

        <nav         aria-label="Primary navigation" className="site-nav hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.slice(1)
            const isActive = activeSection === sectionId
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo(item.href)
                }}
                className={`site-nav-link ${isActive ? 'site-nav-link-active' : ''}`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#socials"
            onClick={(event) => {
              event.preventDefault()
              scrollTo('#socials')
            }}
            className="site-header-cta hidden items-center gap-2 sm:inline-flex"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="site-menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        className={`site-mobile-menu md:hidden ${mobileMenuOpen ? 'site-mobile-menu-open' : ''}`}
      >
        <nav aria-label="Mobile navigation" className="mx-auto flex w-full max-w-lg flex-col gap-2">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo(item.href)
                }}
                className={`site-mobile-link ${isActive ? 'site-mobile-link-active' : ''}`}
              >
                <span className="font-mono text-xs text-[#718096]">0{index + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight className="ml-auto h-4 w-4" />
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
