import React, { useState } from 'react'
import Character3D from '../components/Character3D'
import { personalInfo } from '../data/portfolioData'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Copy, Check, Terminal, Mail } from 'lucide-react'
import {
  FacebookIcon,
  LocketIcon,
  InstagramIcon,
  TikTokIcon,
  GmailIcon,
  FCBarcelonaLogo,
  CameraDSLRLogo,
  DJTurntableLogo,
  NodeLogo,
  DatabaseLogo,
  PhotoshopLogo,
  IllustratorLogo,
  PremiereLogo,
  AfterEffectsLogo
} from '../components/SocialIcons'

export default function HeroSection() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex flex-col justify-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Holographic Wordmark DUY in deep obsidian space */}
      <div
        className="pointer-events-none absolute right-[-5%] top-[14%] select-none font-display text-[clamp(14rem,30vw,36rem)] font-bold tracking-[-0.08em] text-white/[0.015] leading-none z-0"
        aria-hidden="true"
      >
        DUY
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: 3D Holographic Character Avatar on Cyber Platform */}
        <div className="lg:col-span-6 order-2 lg:order-1 relative flex items-center justify-center">
          <Character3D fallbackImage={personalInfo.avatarUrl} />
        </div>

        {/* RIGHT COLUMN: Brand Identity, Tagline, CTAs & Social Links */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          {/* Status Telemetry Beacon */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B101A]/85 border border-[#00D9FF]/40 mb-5 shadow-[0_0_20px_rgba(0,217,255,0.2)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D9FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-[#00D9FF]">
              {personalInfo.status}
            </span>
          </div>

          {/* Main Greeting & Monumental Name with 3D Orbital Glow Ring */}
          <div className="relative mb-3 inline-block">
            <span className="font-display font-bold text-sm sm:text-base md:text-lg tracking-[0.25em] text-[#94A3B8] uppercase block mb-1">
              HI, I'M
            </span>

            {/* LE DUY with Orbiting Glowing Ring */}
            <div className="relative inline-block py-1">
              <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-white select-none">
                <span className="bg-gradient-to-r from-[#FFFFFF] via-[#00D9FF] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,217,255,0.65)]">
                  LE DUY
                </span>
              </h1>

              {/* Glowing 3D Orbital Ellipse Ring circling LE DUY */}
              <div 
                className="absolute inset-x-[-12%] top-1/2 -translate-y-1/2 h-[75px] sm:h-[95px] md:h-[110px] rounded-[50%] border-2 border-transparent pointer-events-none -rotate-12"
                style={{
                  background: 'linear-gradient(90deg, #00D9FF, #A855F7, #1558C9) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'destination-out',
                  maskComposite: 'exclude',
                  boxShadow: '0 0 25px rgba(0, 217, 255, 0.6), inset 0 0 15px rgba(168, 85, 247, 0.4)'
                }}
              />
            </div>
          </div>

          {/* Primary Multi-Discipline Roles with Distinct Neon Accents */}
          <div className="mb-4">
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#F5F7FA]">
              <span className="text-[#00D9FF]">Backend Developer</span>{' '}•{' '}
              <span className="text-[#A855F7]">Graphic Designer</span>{' '}•{' '}
              <span className="text-[#D4FF24]">Video Editor</span>
            </h2>
          </div>

          {/* Location & Graduate Title Subtitle */}
          <div className="flex items-center gap-2 text-sm sm:text-base font-body text-[#94A3B8] mb-5">
            <MapPin className="w-4 h-4 text-[#A855F7] shrink-0" />
            <span>Tra Vinh Ward, Vinh Long Province, Vietnam • IT Engineer</span>
          </div>

          {/* Tagline / English Bio with Vertical Accent Bar */}
          <div className="flex items-start gap-3.5 mb-7 max-w-xl text-left">
            <div className="w-1 self-stretch bg-gradient-to-b from-[#00D9FF] to-[#A855F7] rounded-full shadow-[0_0_12px_#00D9FF] shrink-0" />
            <p className="font-body font-normal text-[#CBD5E1] text-base sm:text-lg leading-relaxed">
              {personalInfo.bioShort}
            </p>
          </div>

          {/* Passions & Lifestyle Quick Showcase (FC Barcelona, Photography, DJing) */}
          <div className="flex flex-wrap items-center gap-3 mb-8 justify-center lg:justify-start">
            {/* FC Barcelona Crest Pill */}
            <div 
              className="px-3.5 py-1.5 rounded-full border flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-default"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 77, 152, 0.3) 0%, rgba(165, 0, 68, 0.3) 100%)',
                borderColor: 'rgba(0, 77, 152, 0.65)',
                boxShadow: '0 0 16px rgba(165, 0, 68, 0.25)'
              }}
              title="Proud FC Barcelona Supporter (Culer)"
            >
              <FCBarcelonaLogo className="w-6 h-6 shrink-0 drop-shadow-[0_0_6px_rgba(237,187,0,0.8)]" />
              <span className="font-display font-bold text-xs sm:text-sm text-white">
                FC BARCELONA <span className="text-[#EDBB00]">• CULER</span>
              </span>
            </div>

            {/* Landscape Photography Pill */}
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00D9FF]/40 flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-default hover:border-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.2)]">
              <CameraDSLRLogo className="w-6 h-6 shrink-0" />
              <span className="font-display font-bold text-xs sm:text-sm text-white">
                PHOTOGRAPHY
              </span>
            </div>

            {/* DJing & Music Pill with Audio Bars */}
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#D4FF24]/40 flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-default hover:border-[#D4FF24] shadow-[0_0_12px_rgba(212,255,36,0.2)]">
              <DJTurntableLogo className="w-6 h-6 shrink-0" />
              <span className="font-display font-bold text-xs sm:text-sm text-white">
                DJ &amp; SOUND
              </span>
              <div className="flex items-center gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 bg-[#D4FF24] rounded-full animate-pulse h-2.5" />
                <span className="w-0.5 bg-[#00D9FF] rounded-full animate-pulse h-3.5" />
                <span className="w-0.5 bg-[#A855F7] rounded-full animate-pulse h-2" />
              </div>
            </div>
          </div>

          {/* Quick-Connect Social Buttons Strip (Standard Authentic Brand Logos) */}
          <div className="flex items-center gap-3 sm:gap-3.5 mb-8 flex-wrap justify-center lg:justify-start">
            <span className="font-display font-bold text-xs text-[#94A3B8] mr-1 hidden sm:inline tracking-wider">
              CONNECT:
            </span>
            
            {/* 1. Facebook */}
            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook Profile"
              className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#1877F2] hover:scale-110 hover:shadow-[0_0_20px_rgba(24,119,242,0.5)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <FacebookIcon className="w-9 h-9" />
            </a>

            {/* 2. Locket */}
            <a
              href={personalInfo.socials.locket}
              target="_blank"
              rel="noopener noreferrer"
              title="Locket Widget (ledi04)"
              className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#FFB020] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,176,32,0.5)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <LocketIcon className="w-9 h-9" />
            </a>

            {/* 3. Instagram */}
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram (@leduy1104)"
              className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#E1306C] hover:scale-110 hover:shadow-[0_0_20px_rgba(225,48,108,0.5)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <InstagramIcon className="w-9 h-9" />
            </a>

            {/* 4. TikTok */}
            <a
              href={personalInfo.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok (@lee_duy04)"
              className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00F2FE] hover:scale-110 hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <TikTokIcon className="w-9 h-9" />
            </a>

            {/* 5. Gmail */}
            <a
              href={`mailto:${personalInfo.email}`}
              title="Send Direct Email"
              className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#EA4335] hover:scale-110 hover:shadow-[0_0_20px_rgba(234,67,53,0.5)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <GmailIcon className="w-9 h-9" />
            </a>

            {/* Quick Copy Email Chip */}
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Copy Email Address"
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00D9FF]/50 text-xs font-mono text-[#CBD5E1] hover:text-[#00D9FF] transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D4FF24]" />
                  <span className="text-[#D4FF24] font-bold">COPIED EMAIL!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{personalInfo.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-display font-bold text-sm tracking-wider flex items-center justify-center gap-2 group cursor-pointer text-[#030407] bg-[#00D9FF] hover:bg-[#38E5FF] shadow-[0_0_25px_rgba(0,217,255,0.5)] hover:scale-105 transition-all duration-300"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('socials')}
              className="btn-secondary w-full sm:w-auto px-7 py-3.5 rounded-full font-display font-medium text-sm tracking-wider flex items-center justify-center gap-2 group cursor-pointer hover:border-[#A855F7]/50"
            >
              <span>CONNECT WITH DUY</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM MARQUEE BAR: Engineering + Creative Tool Stack */}
      <div className="max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Philosophy Tagline */}
        <div className="flex items-start gap-3 text-left">
          <div className="w-1 self-stretch bg-gradient-to-b from-[#00D9FF] to-[#D4FF24] rounded-full shadow-[0_0_10px_#00D9FF] shrink-0" />
          <div className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#F5F7FA] uppercase leading-relaxed">
            <div>BACKEND ARCHITECTURE &amp; CREATIVE PRODUCTION</div>
            <div className="font-body text-[#94A3B8] text-xs font-normal lowercase first-letter:uppercase">
              scalable code • timeless brand visuals • cinematic edits
            </div>
          </div>
        </div>

        {/* Right: Hybrid Tech & Creative Tool Suite */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
          {/* Node.js */}
          <div 
            title="Node.js & Microservices"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-[#22C55E]/40 shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:border-[#22C55E] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all cursor-pointer group"
          >
            <NodeLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          {/* Database & APIs */}
          <div 
            title="Databases & Distributed APIs"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-[#00D9FF]/40 shadow-[0_0_15px_rgba(0,217,255,0.15)] hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all cursor-pointer group"
          >
            <DatabaseLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          {/* Adobe Photoshop */}
          <div 
            title="Adobe Photoshop (Retouching & Graphic Design)"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-[#31A8FF]/40 shadow-[0_0_15px_rgba(49,168,255,0.15)] hover:border-[#31A8FF] hover:shadow-[0_0_20px_rgba(49,168,255,0.4)] transition-all cursor-pointer group"
          >
            <PhotoshopLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          {/* Adobe Illustrator */}
          <div 
            title="Adobe Illustrator (Vector Branding & Logos)"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-[#FF9A00]/40 shadow-[0_0_15px_rgba(255,154,0,0.15)] hover:border-[#FF9A00] hover:shadow-[0_0_20px_rgba(255,154,0,0.4)] transition-all cursor-pointer group"
          >
            <IllustratorLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          {/* Adobe Premiere Pro */}
          <div 
            title="Adobe Premiere Pro (Video Editing & Color Grading)"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-[#9999FF]/40 shadow-[0_0_15px_rgba(153,153,255,0.15)] hover:border-[#9999FF] hover:shadow-[0_0_20px_rgba(153,153,255,0.4)] transition-all cursor-pointer group"
          >
            <PremiereLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          {/* Adobe After Effects */}
          <div 
            title="Adobe After Effects (Motion Graphics & VFX)"
            className="p-2.5 rounded-xl bg-white/[0.04] border border-[#D291FF]/40 shadow-[0_0_15px_rgba(210,145,255,0.15)] hover:border-[#D291FF] hover:shadow-[0_0_20px_rgba(210,145,255,0.4)] transition-all cursor-pointer group"
          >
            <AfterEffectsLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  )
}
