import React, { useState } from 'react'
import Character3D from '../components/Character3D'
import { personalInfo } from '../data/portfolioData'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Copy, Check, Terminal, Mail, Server, Palette, Film, Cpu, Zap } from 'lucide-react'
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

// 3 Dynamic Mode Profiles for Interactive Hero Morphing
const HERO_MODES = [
  {
    id: 'backend',
    label: 'Backend Architect',
    color: '#00D9FF',
    accentBorder: 'border-[#00D9FF]',
    glowBg: 'bg-[#00D9FF]/10',
    icon: Server,
    quote: 'Designing high-throughput microservices, secured OAuth2 gateways, and resilient distributed databases.',
    badge: 'API & CLOUD INFRASTRUCTURE',
    stats: [
      { label: 'THROUGHPUT', value: '25,000+ RPS' },
      { label: 'P99 LATENCY', value: '< 2.4 ms' },
      { label: 'AVAILABILITY', value: '99.99%' }
    ]
  },
  {
    id: 'design',
    label: 'Graphic Designer',
    color: '#A855F7',
    accentBorder: 'border-[#A855F7]',
    glowBg: 'bg-[#A855F7]/10',
    icon: Palette,
    quote: 'Crafting brand identities, typography guidelines, vector key art, and futuristic visual directions.',
    badge: 'BRANDING & VECTOR ART',
    stats: [
      { label: 'COLOR SYSTEM', value: 'RGB / CMYK' },
      { label: 'PRECISION', value: 'Pixel-Perfect' },
      { label: 'TOOL SUITE', value: 'PS + AI' }
    ]
  },
  {
    id: 'video',
    label: 'Video Editor',
    color: '#F59E0B',
    accentBorder: 'border-[#F59E0B]',
    glowBg: 'bg-[#F59E0B]/10',
    icon: Film,
    quote: 'Assembling dynamic pacing, audio rhythm sync, cinematic color grading, and custom After Effects motion VFX.',
    badge: 'MOTION & 4K CINEMATIC',
    stats: [
      { label: 'RESOLUTION', value: '4K Ultra-HD' },
      { label: 'FRAME RATE', value: '60 FPS' },
      { label: 'AUDIO SYNC', value: 'Beat-Matched' }
    ]
  }
]

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState(HERO_MODES[0])
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
      {/* Background Holographic Wordmark DUY in deep space */}
      <div
        className="pointer-events-none absolute right-[-4%] top-[12%] select-none font-display text-[clamp(14rem,30vw,36rem)] font-bold tracking-[-0.08em] text-white/[0.015] leading-none z-0"
        aria-hidden="true"
      >
        DUY
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: 3D Holographic Character Stage */}
        <div className="lg:col-span-6 order-2 lg:order-1 relative flex items-center justify-center">
          <Character3D fallbackImage={personalInfo.avatarUrl} />
        </div>

        {/* RIGHT COLUMN: Brand Identity & Interactive Cockpit */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          {/* Status Telemetry Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0E121D]/75 border border-[#00D9FF]/30 mb-5 shadow-[0_0_20px_rgba(0,217,255,0.18)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-[#00D9FF]">
              {personalInfo.status}
            </span>
          </div>

          {/* Monumental Name with 3D Orbital Glow Ring & Editorial Hierarchy */}
          <div className="relative mb-4 inline-block">
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 justify-center lg:justify-start">
              <span className="text-[#00D9FF]">SYS_IDENT //</span>
              <span>FLAGSHIP ARCHITECT</span>
            </div>

            <div className="relative inline-block py-1">
              <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.045em] leading-[0.92] text-white select-none">
                <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
                  LE DUY
                </span>
              </h1>

              {/* Glowing 3D Orbital Ring */}
              <div 
                className="absolute inset-x-[-10%] top-1/2 -translate-y-1/2 h-[70px] sm:h-[90px] md:h-[105px] rounded-[50%] border-2 border-transparent pointer-events-none -rotate-12"
                style={{
                  background: 'linear-gradient(90deg, #00D9FF, #A855F7, #1558C9) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'destination-out',
                  maskComposite: 'exclude',
                  boxShadow: '0 0 25px rgba(0, 217, 255, 0.45), inset 0 0 15px rgba(168, 85, 247, 0.3)'
                }}
              />
            </div>
          </div>

          {/* Location & Title */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 mb-6 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
            <span>Tra Vinh Ward, Vinh Long Province, Vietnam // IT Engineer</span>
          </div>

          {/* 🌟 INNOVATION: Interactive Role Switcher Cockpit */}
          <div className="w-full max-w-xl mb-6">
            <div className="flex items-center justify-center lg:justify-start gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-3.5">
              {HERO_MODES.map((mode) => {
                const isActive = activeMode.id === mode.id
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer tactile-btn ${
                      isActive
                        ? 'text-white shadow-lg'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                    }`}
                    style={{
                      backgroundColor: isActive ? `${mode.color}25` : 'transparent',
                      borderColor: isActive ? mode.color : 'transparent',
                      borderWidth: '1px'
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: mode.color }} />
                    <span className="hidden sm:inline">{mode.label}</span>
                    <span className="sm:hidden">{mode.label.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>

            {/* Dynamic Telemetry Box for Active Mode */}
            <div
              className="spatial-glass spotlight-card p-5 sm:p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 text-left"
              style={{ borderColor: `${activeMode.color}40` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded tracking-wider" style={{ backgroundColor: `${activeMode.color}20`, color: activeMode.color }}>
                  {activeMode.badge}
                </span>
                <span className="font-mono text-xs text-[#94A3B8] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#00D9FF]" />
                  <span>CORE PILLAR</span>
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-4">
                {activeMode.quote}
              </p>
              
              {/* Telemetry Numbers */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.08]">
                {activeMode.stats.map((s, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-mono text-[9px] text-[#94A3B8]">{s.label}</span>
                    <span className="font-display font-bold text-xs sm:text-sm text-white" style={{ color: idx === 0 ? activeMode.color : '#FFFFFF' }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick-Connect Social Buttons Strip */}
          <div className="flex items-center gap-3 sm:gap-3.5 mb-7 flex-wrap justify-center lg:justify-start">
            <span className="font-display font-bold text-xs text-[#94A3B8] mr-1 hidden sm:inline tracking-wider">
              CONNECT:
            </span>
            
            {/* Facebook */}
            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook Profile"
              className="tactile-btn w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#1877F2] hover:scale-105 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <FacebookIcon className="w-9 h-9" />
            </a>

            {/* Locket */}
            <a
              href={personalInfo.socials.locket}
              target="_blank"
              rel="noopener noreferrer"
              title="Locket Widget (ledi04)"
              className="tactile-btn w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#FFB020] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,176,32,0.4)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <LocketIcon className="w-9 h-9" />
            </a>

            {/* Instagram */}
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram (@leduy1104)"
              className="tactile-btn w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#E1306C] hover:scale-105 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <InstagramIcon className="w-9 h-9" />
            </a>

            {/* TikTok */}
            <a
              href={personalInfo.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok (@lee_duy04)"
              className="tactile-btn w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00F2FE] hover:scale-105 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <TikTokIcon className="w-9 h-9" />
            </a>

            {/* Gmail */}
            <a
              href={`mailto:${personalInfo.email}`}
              title="Send Direct Email"
              className="tactile-btn w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#EA4335] hover:scale-105 hover:shadow-[0_0_20px_rgba(234,67,53,0.4)] transition-all duration-300 flex items-center justify-center p-1.5"
            >
              <GmailIcon className="w-9 h-9" />
            </a>

            {/* Quick Copy Email Chip */}
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Copy Email Address"
              className="tactile-btn px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00D9FF]/50 text-xs font-mono text-[#CBD5E1] hover:text-[#00D9FF] transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span className="text-[#00D9FF] font-bold">COPIED EMAIL!</span>
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
              className="tactile-btn w-full sm:w-auto px-8 py-3.5 rounded-full font-display font-bold text-sm tracking-wider flex items-center justify-center gap-2 group cursor-pointer text-[#050508] bg-[#00D9FF] hover:bg-[#38E5FF] shadow-[0_0_25px_rgba(0,217,255,0.45)] transition-all duration-300"
            >
              <span>EXPLORE ARCHITECTURE</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('socials')}
              className="tactile-btn btn-secondary w-full sm:w-auto px-7 py-3.5 rounded-full font-display font-medium text-sm tracking-wider flex items-center justify-center gap-2 group cursor-pointer hover:border-[#A855F7]/50"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM MARQUEE BAR: Engineering + Creative Tool Stack */}
      <div className="max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Philosophy Tagline */}
        <div className="flex items-start gap-3 text-left">
          <div className="w-1 self-stretch bg-gradient-to-b from-[#00D9FF] via-[#1558C9] to-[#A855F7] rounded-full shadow-[0_0_10px_#00D9FF] shrink-0" />
          <div className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#F5F7FA] uppercase leading-relaxed">
            <div>BACKEND ARCHITECTURE &amp; CREATIVE PRODUCTION</div>
            <div className="font-body text-[#94A3B8] text-xs font-normal">
              Scalable Microservices • Timeless Vector Identity • 4K Cinematic Edits
            </div>
          </div>
        </div>

        {/* Right: Hybrid Tech & Creative Tool Suite */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
          <div title="Node.js & Microservices" className="p-2.5 rounded-xl bg-white/[0.04] border border-[#22C55E]/40 shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:border-[#22C55E] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all cursor-pointer group">
            <NodeLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div title="Databases & Distributed APIs" className="p-2.5 rounded-xl bg-white/[0.04] border border-[#00D9FF]/40 shadow-[0_0_15px_rgba(0,217,255,0.15)] hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all cursor-pointer group">
            <DatabaseLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div title="Adobe Photoshop" className="p-2.5 rounded-xl bg-white/[0.04] border border-[#31A8FF]/40 shadow-[0_0_15px_rgba(49,168,255,0.15)] hover:border-[#31A8FF] hover:shadow-[0_0_20px_rgba(49,168,255,0.4)] transition-all cursor-pointer group">
            <PhotoshopLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div title="Adobe Illustrator" className="p-2.5 rounded-xl bg-white/[0.04] border border-[#FF9A00]/40 shadow-[0_0_15px_rgba(255,154,0,0.15)] hover:border-[#FF9A00] hover:shadow-[0_0_20px_rgba(255,154,0,0.4)] transition-all cursor-pointer group">
            <IllustratorLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div title="Adobe Premiere Pro" className="p-2.5 rounded-xl bg-white/[0.04] border border-[#9999FF]/40 shadow-[0_0_15px_rgba(153,153,255,0.15)] hover:border-[#9999FF] hover:shadow-[0_0_20px_rgba(153,153,255,0.4)] transition-all cursor-pointer group">
            <PremiereLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div title="Adobe After Effects" className="p-2.5 rounded-xl bg-white/[0.04] border border-[#D291FF]/40 shadow-[0_0_15px_rgba(210,145,255,0.15)] hover:border-[#D291FF] hover:shadow-[0_0_20px_rgba(210,145,255,0.4)] transition-all cursor-pointer group">
            <AfterEffectsLogo className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  )
}
