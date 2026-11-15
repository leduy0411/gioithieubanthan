import React, { useEffect, useState } from 'react'
import TechLogoD from '../components/TechLogoD'
import { personalInfo } from '../data/portfolioData'
import { ArrowUp, Heart } from 'lucide-react'
import {
  FacebookIcon,
  LocketIcon,
  InstagramIcon,
  TikTokIcon,
  GmailIcon
} from '../components/SocialIcons'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Le Duy', href: '#about' },
  { label: 'System Concepts', href: '#projects' },
  { label: 'Disciplines & Skills', href: '#skills' },
  { label: 'Social Matrix', href: '#socials' }
]

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Circular progress SVG values
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <footer className="relative bg-[#030306] border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00D9FF]/50 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">

          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <TechLogoD size={42} showText={true} />
            <p className="mt-4 font-body font-normal text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              IT Engineer bridging resilient backend software architectures with modern visual graphic design and cinematic video production.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-bold text-xs uppercase text-[#00D9FF] tracking-widest mb-4">
              Quick Navigation
            </span>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className="font-body font-medium text-xs text-[#94A3B8] hover:text-[#00D9FF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Channels & Back to Top with Scroll Ring */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <span className="font-display font-bold text-xs uppercase text-[#00D9FF] tracking-widest">
              Verified Channels
            </span>

            <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-end">
              {[
                { href: personalInfo.socials.facebook,  Icon: FacebookIcon,  hoverBorder: '#1877F2', title: 'Facebook'  },
                { href: personalInfo.socials.locket,    Icon: LocketIcon,    hoverBorder: '#FFB020', title: 'Locket'    },
                { href: personalInfo.socials.instagram, Icon: InstagramIcon, hoverBorder: '#E1306C', title: 'Instagram' },
                { href: personalInfo.socials.tiktok,    Icon: TikTokIcon,    hoverBorder: '#00F2FE', title: 'TikTok'   },
                { href: `mailto:${personalInfo.email}`, Icon: GmailIcon,     hoverBorder: '#EA4335', title: 'Gmail'    }
              ].map(({ href, Icon, hoverBorder, title }) => (
                <a
                  key={title}
                  href={href}
                  target={title === 'Gmail' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  title={title}
                  className="tactile-btn w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:scale-110 transition-all flex items-center justify-center p-1"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = hoverBorder)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <Icon className="w-7 h-7" />
                </a>
              ))}
            </div>

            {/* Back to Top with Interactive SVG Progress Ring */}
            <button
              type="button"
              onClick={scrollToTop}
              className="tactile-btn mt-1 flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00D9FF] text-xs font-mono text-[#CBD5E1] hover:text-[#00D9FF] transition-all cursor-pointer group shadow-sm"
              title="Return to top of page"
            >
              <div className="relative flex items-center justify-center w-8 h-8">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    stroke="#00D9FF"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-150 ease-out"
                  />
                </svg>
                <ArrowUp className="w-3.5 h-3.5 absolute text-[#00D9FF] group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold">BACK TO TOP</span>
                <span className="text-[10px] text-[#94A3B8]">{Math.round(scrollProgress)}% SCROLLED</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack Credits */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#94A3B8] text-center">
          <div>
            © {new Date().getFullYear()} <span className="font-display font-bold text-white">LE DUY</span>. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5">
            <span>ENGINEERED WITH REACT 19 • THREE.JS • TAILWIND CSS • GSAP</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
