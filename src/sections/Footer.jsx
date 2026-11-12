import React from 'react'
import SiteLogo from '../components/SiteLogo'
import { personalInfo } from '../data/portfolioData'
import { ArrowUp } from 'lucide-react'
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
  { label: 'Disciplines & Skills', href: '#skills' },
  { label: 'Social & Contact', href: '#socials' }
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#030407] border-t border-white/[0.06] pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#00D9FF]/40 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start max-w-xs">
            <SiteLogo className="h-14 w-[76px]" />
            <p className="mt-4 font-body font-normal text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              IT Engineer bridging scalable backend systems with high-impact graphic design and cinematic video production.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-bold text-xs uppercase text-[#00D9FF] tracking-widest mb-4">
              Quick Navigation
            </span>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className="font-body font-medium text-xs text-[#94A3B8] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons + Back to top */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-display font-bold text-xs uppercase text-[#00D9FF] tracking-widest">
              Social Channels
            </span>

            <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-end">
              {[
                { href: personalInfo.socials.facebook, Icon: FacebookIcon, hoverBorder: '#1877F2', title: 'Facebook' },
                { href: personalInfo.socials.locket,   Icon: LocketIcon,   hoverBorder: '#FFB020', title: 'Locket'   },
                { href: personalInfo.socials.instagram, Icon: InstagramIcon, hoverBorder: '#E1306C', title: 'Instagram'},
                { href: personalInfo.socials.tiktok,   Icon: TikTokIcon,   hoverBorder: '#00F2FE', title: 'TikTok'  },
                { href: `mailto:${personalInfo.email}`, Icon: GmailIcon,    hoverBorder: '#EA4335', title: 'Gmail'   }
              ].map(({ href, Icon, hoverBorder, title }) => (
                <a
                  key={title}
                  href={href}
                  target={title === 'Gmail' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  title={title}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:scale-110 transition-all flex items-center justify-center p-1"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = hoverBorder)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <Icon className="w-7 h-7" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] font-body font-medium text-xs text-[#94A3B8] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 font-body text-xs text-[#94A3B8] text-center">
          <div>
            © {new Date().getFullYear()}{' '}
            <span className="font-display font-bold text-[#F5F7FA]">LE DUY</span>. All rights reserved.
          </div>
          <div>Engineered with React 19 • Three.js • Tailwind CSS v4</div>
        </div>

      </div>
    </footer>
  )
}
