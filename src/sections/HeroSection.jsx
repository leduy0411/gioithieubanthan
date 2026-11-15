import React, { useState } from 'react'
import SplitReveal, { FadeUp } from '../components/SplitReveal'
import { personalInfo } from '../data/portfolioData'
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Copy,
  Check,
  Server,
  Palette,
  Film,
  Zap,
  Sparkles
} from 'lucide-react'
import {
  FacebookIcon,
  LocketIcon,
  InstagramIcon,
  TikTokIcon,
  GmailIcon,
  NodeLogo,
  DatabaseLogo,
  PhotoshopLogo,
  IllustratorLogo,
  PremiereLogo,
  AfterEffectsLogo
} from '../components/SocialIcons'

const HERO_MODES = [
  {
    id: 'backend',
    label: 'Backend Architect',
    color: '#00D9FF',
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
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Giant background holographic wordmark */}
      <div
        className="pointer-events-none absolute right-[-2%] top-[8%] select-none font-display font-black text-[clamp(10rem,24vw,22rem)] tracking-[-0.08em] text-white/[0.018] leading-none z-0"
        aria-hidden="true"
      >
        DUY
      </div>

      {/* Horizontal precision accent line */}
      <div className="absolute top-[18%] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top telemetry strip */}
        <FadeUp delay={0.1} className="flex items-center gap-4 mb-10">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-zinc-500">
            <span className="text-[#00D9FF]">◈</span>
            <span>SYS_IDENT // FLAGSHIP ARCHITECT</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00D9FF]/30 to-transparent" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00D9FF]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#00D9FF] uppercase">
              {personalInfo.status}
            </span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          {/* LEFT: Monumental Typography Column */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Giant Name — VOIDBORN monument with metallic chrome sheen */}
            <div className="mb-6">
              <SplitReveal
                tag="h1"
                delay={0.2}
                className="font-display font-black leading-[0.88] tracking-[-0.055em] text-[clamp(4.5rem,13vw,12rem)] select-none text-metallic"
              >
                LE{'\n'}DUY
              </SplitReveal>
            </div>

            {/* Role + Location strip */}
            <FadeUp delay={0.5} className="flex flex-wrap items-center gap-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00D9FF]" />
                Tra Vinh Ward, Vinh Long Province, VN
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">IT Engineer</span>
            </FadeUp>

            {/* Role switcher cockpit */}
            <FadeUp delay={0.65} className="mb-6 max-w-2xl">
              <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl mb-4">
                {HERO_MODES.map((mode) => {
                  const isActive = activeMode.id === mode.id
                  const Icon = mode.icon
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveMode(mode)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-display font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer tactile-btn"
                      style={{
                        backgroundColor: isActive ? `${mode.color}22` : 'transparent',
                        color: isActive ? mode.color : '#6B7280',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: isActive ? `${mode.color}60` : 'transparent',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: mode.color }} />
                      <span className="hidden sm:inline">{mode.label}</span>
                      <span className="sm:hidden">{mode.label.split(' ')[0]}</span>
                    </button>
                  )
                })}
              </div>

              {/* Dynamic telemetry box */}
              <div
                className="spatial-glass spotlight-card p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500"
                style={{ borderColor: `${activeMode.color}35` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-md tracking-widest"
                    style={{ backgroundColor: `${activeMode.color}18`, color: activeMode.color }}
                  >
                    {activeMode.badge}
                  </span>
                  <Zap className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <p className="font-body text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">{activeMode.quote}</p>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.07]">
                  {activeMode.stats.map((s, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">{s.label}</span>
                      <span className="font-display font-bold text-xs sm:text-sm text-white" style={{ color: idx === 0 ? activeMode.color : undefined }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Social pills strip */}
            <FadeUp delay={0.8} className="flex items-center gap-2.5 flex-wrap mb-8">
              {[
                { href: personalInfo.socials.facebook, Icon: FacebookIcon, hoverColor: '#1877F2', title: 'Facebook' },
                { href: personalInfo.socials.locket, Icon: LocketIcon, hoverColor: '#FFB020', title: 'Locket' },
                { href: personalInfo.socials.instagram, Icon: InstagramIcon, hoverColor: '#E1306C', title: 'Instagram' },
                { href: personalInfo.socials.tiktok, Icon: TikTokIcon, hoverColor: '#00F2FE', title: 'TikTok' },
              ].map(({ href, Icon, hoverColor, title }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="tactile-btn w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center transition-all duration-300 hover:scale-110 p-1.5"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = hoverColor; e.currentTarget.style.boxShadow = `0 0 18px ${hoverColor}55` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
              <a
                href={`mailto:${personalInfo.email}`}
                title="Gmail"
                className="tactile-btn w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center transition-all duration-300 hover:scale-110 p-1.5"
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#EA4335'; e.currentTarget.style.boxShadow = '0 0 18px #EA433555' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <GmailIcon className="w-8 h-8" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy Email"
                className="tactile-btn h-11 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center gap-2 transition-all duration-300 hover:border-[#00D9FF]/50 hover:text-[#00D9FF] cursor-pointer"
              >
                {copiedEmail ? (
                  <><Check className="w-3.5 h-3.5 text-[#00D9FF]" /><span className="font-mono text-[11px] text-[#00D9FF]">COPIED!</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5 text-zinc-500" /><span className="font-mono text-[11px] text-zinc-400">{personalInfo.email}</span></>
                )}
              </button>
            </FadeUp>

            {/* CTA Buttons */}
            <FadeUp delay={0.95} className="flex flex-col sm:flex-row items-start gap-3.5">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="tactile-btn group px-8 py-3.5 rounded-full font-display font-bold text-sm tracking-wider text-[#030306] bg-[#00D9FF] hover:bg-[#38E5FF] shadow-[0_0_28px_rgba(0,217,255,0.5)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>VIEW SYSTEMS</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('socials')}
                className="tactile-btn group px-8 py-3.5 rounded-full font-display font-medium text-sm tracking-wider text-zinc-300 bg-white/[0.05] border border-white/[0.1] hover:border-[#A855F7]/50 hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>SIGNAL ME</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </FadeUp>
          </div>

          {/* RIGHT: Clear spatial canvas for the 3D VoidSignal shader mesh */}
          <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
        </div>

        {/* Bottom tool strip */}
        <FadeUp delay={1.1} className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-3">
            <div className="w-0.5 self-stretch bg-gradient-to-b from-[#00D9FF] via-[#8B5CF6] to-transparent rounded-full" />
            <div>
              <div className="font-display font-bold text-xs text-zinc-200 uppercase tracking-wider mb-0.5">
                Backend Architecture &amp; Creative Production
              </div>
              <div className="font-mono text-[11px] text-zinc-500">
                Scalable Microservices · Timeless Vector Identity · 4K Cinematic Edits
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { Logo: NodeLogo, border: '#22C55E', title: 'Node.js' },
              { Logo: DatabaseLogo, border: '#00D9FF', title: 'Databases' },
              { Logo: PhotoshopLogo, border: '#31A8FF', title: 'Photoshop' },
              { Logo: IllustratorLogo, border: '#FF9A00', title: 'Illustrator' },
              { Logo: PremiereLogo, border: '#9999FF', title: 'Premiere Pro' },
              { Logo: AfterEffectsLogo, border: '#D291FF', title: 'After Effects' },
            ].map(({ Logo, border, title }) => (
              <div
                key={title}
                title={title}
                className="p-2.5 rounded-xl bg-white/[0.04] border transition-all duration-300 cursor-pointer group"
                style={{ borderColor: `${border}40` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.boxShadow = `0 0 16px ${border}50` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${border}40`; e.currentTarget.style.boxShadow = 'none' }}
              >
                <Logo className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
