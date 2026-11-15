import React, { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolioData'
import { Copy, Check, Mail, Layers, Cpu, Award, Terminal } from 'lucide-react'

const NAV_LINKS = [
  { id: 'home',    label: 'INDEX',      icon: Terminal },
  { id: 'about',   label: 'PROFILE',    icon: Award    },
  { id: 'skills',  label: 'DISCIPLINE', icon: Layers   },
  { id: 'projects',label: 'SYSTEMS',    icon: Cpu      },
  { id: 'socials', label: 'SIGNAL',     icon: Mail     },
]

export default function Navbar() {
  const [active, setActive]     = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied]     = useState(false)
  const [hovIdx, setHovIdx]     = useState(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)
      const offset = window.scrollY + 240
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id)
        if (el && el.offsetTop <= offset) { setActive(NAV_LINKS[i].id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true); setTimeout(() => setCopied(false), 2200)
  }

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 sm:pt-6 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'bg-[#010103]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_16px_48px_rgba(0,0,0,0.75),0_0_30px_rgba(0,217,255,0.08)]'
            : 'bg-[#050810]/60 backdrop-blur-xl border border-white/[0.06]'
        }`}
      >
        {/* Live status beacon */}
        <button
          type="button"
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full hover:bg-white/[0.05] transition-colors cursor-pointer group"
        >
          <span className="relative flex items-center w-2.5 h-2.5">
            <span className="absolute w-full h-full rounded-full bg-[#00D9FF] opacity-70 animate-ping" />
            <span className="relative w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          </span>
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white group-hover:text-[#00D9FF] transition-colors">
            DUY
          </span>
        </button>

        <div className="w-px h-4 bg-white/[0.1]" />

        {/* Navigation links with proximity magnification */}
        {NAV_LINKS.map((link, idx) => {
          const isActive = active === link.id
          const Icon     = link.icon
          const scale    = hovIdx === idx ? 1.14 : hovIdx !== null && Math.abs(hovIdx - idx) === 1 ? 1.06 : 1

          return (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => setHovIdx(idx)}
              onMouseLeave={() => setHovIdx(null)}
              data-cursor-text={link.label}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-250 cursor-pointer will-change-transform ${
                isActive
                  ? 'bg-[#00D9FF] text-[#010103] shadow-[0_0_18px_rgba(0,217,255,0.55)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              style={{ transform: `scale(${scale})`, transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.2s, color 0.2s' }}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#010103]' : ''}`} />
              <span className="hidden sm:inline">{link.label}</span>
            </button>
          )
        })}

        <div className="w-px h-4 bg-white/[0.1]" />

        {/* Copy email chip */}
        <button
          type="button"
          onClick={copyEmail}
          data-cursor-text="COPY EMAIL"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] hover:border-[#00D9FF]/40 text-zinc-400 hover:text-[#00D9FF] transition-all cursor-pointer"
        >
          {copied
            ? <><Check className="w-3.5 h-3.5 text-[#00D9FF]" /><span className="text-[#00D9FF] font-bold">COPIED</span></>
            : <><Copy className="w-3.5 h-3.5" /><span className="hidden md:inline">EMAIL</span></>
          }
        </button>
      </nav>
    </header>
  )
}
