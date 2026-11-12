import React from 'react'
import TechLogoD from '../components/TechLogoD'
import { personalInfo } from '../data/portfolioData'
import { ArrowUp } from 'lucide-react'
import {
  FacebookIcon,
  LocketIcon,
  InstagramIcon,
  TikTokIcon,
  GmailIcon
} from '../components/SocialIcons'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#030407] border-t border-[#1B2638] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Top Cyber Line Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#1558C9] to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <TechLogoD size={42} />
            <p className="mt-4 text-xs sm:text-sm text-[#9299A6] leading-relaxed">
              IT Engineer bridging scalable backend software systems with high-impact visual graphic design and cinematic video production.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-mono text-xs uppercase text-[#00D9FF] tracking-widest mb-4">
              QUICK NAVIGATION
            </span>
            <div className="flex flex-col gap-2 text-xs font-semibold text-[#9299A6]">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#home')
                }}
                className="hover:text-white transition-colors"
              >
                HOME
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#about')
                }}
                className="hover:text-white transition-colors"
              >
                ABOUT LE DUY
              </a>
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#skills')
                }}
                className="hover:text-white transition-colors"
              >
                DISCIPLINES &amp; SKILLS
              </a>
              <a
                href="#socials"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#socials')
                }}
                className="hover:text-white transition-colors"
              >
                SOCIAL &amp; CONTACT
              </a>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-mono text-xs uppercase text-[#00D9FF] tracking-widest">
              COMMUNICATION MATRIX
            </span>

            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end">
              {/* Facebook */}
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Profile"
                className="w-12 h-12 rounded-xl bg-[#0B101A] border border-[#1B2638] hover:border-[#1877F2] hover:scale-110 transition-all flex items-center justify-center p-1"
              >
                <FacebookIcon className="w-8 h-8" />
              </a>

              {/* Locket */}
              <a
                href={personalInfo.socials.locket}
                target="_blank"
                rel="noopener noreferrer"
                title="Locket Widget"
                className="w-12 h-12 rounded-xl bg-[#0B101A] border border-[#1B2638] hover:border-[#FFB020] hover:scale-110 transition-all flex items-center justify-center p-1"
              >
                <LocketIcon className="w-8 h-8" />
              </a>

              {/* Instagram */}
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-12 h-12 rounded-xl bg-[#0B101A] border border-[#1B2638] hover:border-[#E1306C] hover:scale-110 transition-all flex items-center justify-center p-1"
              >
                <InstagramIcon className="w-8 h-8" />
              </a>

              {/* TikTok */}
              <a
                href={personalInfo.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-12 h-12 rounded-xl bg-[#0B101A] border border-[#1B2638] hover:border-[#00F2FE] hover:scale-110 transition-all flex items-center justify-center p-1"
              >
                <TikTokIcon className="w-8 h-8" />
              </a>

              {/* Gmail */}
              <a
                href={`mailto:${personalInfo.email}`}
                title="Email Duy"
                className="w-12 h-12 rounded-xl bg-[#0B101A] border border-[#1B2638] hover:border-[#EA4335] hover:scale-110 transition-all flex items-center justify-center p-1"
              >
                <GmailIcon className="w-8 h-8" />
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-2 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0B101A] border border-[#1B2638] text-xs font-mono text-[#9299A6] hover:text-[#00D9FF] hover:border-[#00D9FF] transition-all cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack Credits */}
        <div className="pt-8 border-t border-[#1B2638] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9299A6] text-center">
          <div>
            © {new Date().getFullYear()} <span className="text-[#F5F7FA] font-bold">LE DUY</span>. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5">
            <span>ENGINEERED WITH REACT 19 • THREE.JS • TAILWIND CSS</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
