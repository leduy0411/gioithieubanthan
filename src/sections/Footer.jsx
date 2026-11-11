import React from 'react'
import TechLogoD from '../components/TechLogoD'
import { personalInfo } from '../data/portfolioData'
import { ArrowUp, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'

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
              Thiết kế và kiến trúc hệ thống backend hiệu năng cao, mở rộng linh hoạt và an toàn dữ liệu trên nền tảng đám mây.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-mono text-xs uppercase text-[#D4FF24] tracking-widest mb-4">
              QUICK NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-semibold text-[#9299A6]">
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
                ABOUT
              </a>
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#skills')
                }}
                className="hover:text-white transition-colors"
              >
                SKILLS
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#projects')
                }}
                className="hover:text-white transition-colors"
              >
                PROJECTS
              </a>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#experience')
                }}
                className="hover:text-white transition-colors"
              >
                EXPERIENCE
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#contact')
                }}
                className="hover:text-white transition-colors"
              >
                CONTACT
              </a>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-mono text-xs uppercase text-[#D4FF24] tracking-widest">
              COMMUNICATION MATRIX
            </span>

            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2.5 rounded-xl bg-[#0B101A] border border-[#1B2638] text-[#9299A6] hover:text-white hover:border-[#1558C9] hover:bg-[#1558C9]/20 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2.5 rounded-xl bg-[#0B101A] border border-[#1B2638] text-[#9299A6] hover:text-[#00D9FF] hover:border-[#1558C9] hover:bg-[#1558C9]/20 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="p-2.5 rounded-xl bg-[#0B101A] border border-[#1B2638] text-[#9299A6] hover:text-[#1558C9] hover:border-[#1558C9] hover:bg-[#1558C9]/20 transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B101A] border border-[#1B2638] text-xs font-mono text-[#9299A6] hover:text-[#D4FF24] hover:border-[#D4FF24] transition-all cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack Credits */}
        <div className="pt-8 border-t border-[#1B2638] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9299A6] text-center">
          <div>
            © {new Date().getFullYear()} <span className="text-[#F5F7FA] font-bold">DUY</span>. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5">
            <span>BUILT WITH REACT • THREE.JS • TAILWIND CSS</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
