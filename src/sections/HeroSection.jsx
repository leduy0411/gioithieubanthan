import React, { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Cpu,
  Layers,
  Palette,
  Server,
  Sparkles,
  Terminal,
  Video,
  Zap,
} from 'lucide-react'
import { personalInfo, skillCategories } from '../data/portfolioData'
import Character3D from '../components/Character3D'

export default function HeroSection() {
  const roles = [
    'Backend Systems Architect',
    'High-Concurrency API Engineer',
    'Creative Technologist & Visual Artist',
    'Video Editor & Motion Designer',
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedRole, setTypedRole] = useState(roles[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState('backend')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return
    const timer = window.setInterval(
      () => {
        const currentRole = roles[roleIndex]
        if (!isDeleting) {
          const nextText = currentRole.slice(0, typedRole.length + 1)
          setTypedRole(nextText)
          if (nextText === currentRole) {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          const nextText = currentRole.slice(0, typedRole.length - 1)
          setTypedRole(nextText)
          if (!nextText) {
            setIsDeleting(false)
            setRoleIndex((idx) => (idx + 1) % roles.length)
          }
        }
      },
      isDeleting ? 40 : 80
    )
    return () => window.clearInterval(timer)
  }, [isDeleting, roleIndex, typedRole.length])

  const tabSpecs = {
    backend: {
      title: 'Backend Systems & Cloud Architecture',
      desc: 'Engineering resilient microservices, high-throughput Redis caching, and secured OAuth2 gateways.',
      stat1: { label: 'PEAK THROUGHPUT', value: '25,000+ RPS' },
      stat2: { label: 'P99 LATENCY', value: '< 2.4 ms' },
      stat3: { label: 'SERVICE UPTIME', value: '99.99%' },
    },
    design: {
      title: 'Graphic Design & Brand Systems',
      desc: 'Crafting bold visual identities, cyberpunk vector posters, and futuristic UI layout standards.',
      stat1: { label: 'BRAND KITS', value: '15+ Systems' },
      stat2: { label: 'VECTOR RESOLUTION', value: 'Infinite 8K' },
      stat3: { label: 'TOOL MASTERY', value: 'PS • AI' },
    },
    video: {
      title: 'Cinematic Video Editing & Motion VFX',
      desc: 'Narrative timeline pacing, custom sound design beatmatching, and broadcast-grade color grading.',
      stat1: { label: 'OUTPUT TIMELINE', value: '4K Cinematic' },
      stat2: { label: 'SOUND SYNC', value: '128 BPM Lock' },
      stat3: { label: 'SUITE', value: 'PR • AE' },
    },
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-32"
    >
      {/* Volumetric ambient background aurora */}
      <span className="aurora -right-20 top-16" aria-hidden="true" />
      <span className="aurora -left-32 bottom-20 opacity-10" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Monumental Identity & Editorial Telemetry */}
        <div className="lg:col-span-7">
          {/* Top Telemetry Capsule */}
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-[#94a3b8]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/[0.08] px-3.5 py-1.5 text-[#00f2fe] backdrop-blur-md">
              <span className="status-dot" aria-hidden="true" />
              <span>SYS_ONLINE // OPEN FOR OPPORTUNITIES</span>
            </span>
            <span className="text-white/20" aria-hidden="true">/</span>
            <span className="tracking-wider uppercase text-zinc-400">{personalInfo.location}</span>
          </div>

          {/* Monumental Hero Headline */}
          <h1 className="font-display text-[clamp(3.8rem,9vw,7.8rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-white">
            LE DUY<span className="gradient-text">.</span>
          </h1>

          {/* Subtitle Badge */}
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-[#00f2fe]">
            IT ENGINEER • BACKEND ARCHITECT • CREATIVE TECHNOLOGIST
          </p>

          {/* Typewriter Terminal Role line */}
          <div className="mt-6 flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-[#070b14]/80 px-4 py-2.5 font-mono text-sm sm:text-base backdrop-blur-md">
            <span className="text-[#00f2fe]">&gt; role_execute:</span>
            <span className="text-white font-medium">{typedRole}</span>
            <span className="animate-pulse text-[#00f2fe]" aria-hidden="true">_</span>
          </div>

          {/* Interactive Tri-Discipline Switcher */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('backend')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all ${
                  activeTab === 'backend'
                    ? 'border border-[#00f2fe]/50 bg-[#00f2fe]/15 text-[#00f2fe] shadow-[0_0_20px_rgba(0,242,254,0.2)]'
                    : 'border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Server size={14} /> Backend Architect
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('design')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all ${
                  activeTab === 'design'
                    ? 'border border-[#7928ca]/50 bg-[#7928ca]/20 text-[#d8b4fe] shadow-[0_0_20px_rgba(121,40,202,0.3)]'
                    : 'border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Palette size={14} /> Graphic Designer
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all ${
                  activeTab === 'video'
                    ? 'border border-[#ff0080]/50 bg-[#ff0080]/20 text-[#f472b6] shadow-[0_0_20px_rgba(255,0,128,0.3)]'
                    : 'border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Video size={14} /> Video Editor
              </button>
            </div>

            {/* Dynamic Telemetry Metric Card */}
            <div className="spatial-glass mt-4 rounded-2xl p-5 border border-white/[0.1] bg-[#070b14]/90 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#00f2fe]">
                  {tabSpecs[activeTab].title}
                </span>
                <Sparkles size={14} className="text-[#00f2fe]" />
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {tabSpecs[activeTab].desc}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-4">
                <div>
                  <p className="font-mono text-[10px] uppercase text-zinc-500">{tabSpecs[activeTab].stat1.label}</p>
                  <p className="mt-1 font-display text-base sm:text-lg font-bold text-white">{tabSpecs[activeTab].stat1.value}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-zinc-500">{tabSpecs[activeTab].stat2.label}</p>
                  <p className="mt-1 font-display text-base sm:text-lg font-bold text-[#00f2fe]">{tabSpecs[activeTab].stat2.value}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-zinc-500">{tabSpecs[activeTab].stat3.label}</p>
                  <p className="mt-1 font-display text-base sm:text-lg font-bold text-emerald-400">{tabSpecs[activeTab].stat3.value}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Actions & Direct Signals */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="tactile-btn group inline-flex h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#7928ca] px-6 text-sm font-bold text-black shadow-[0_0_35px_rgba(0,242,254,0.35)] hover:shadow-[0_0_50px_rgba(0,242,254,0.6)]"
            >
              EXPLORE ARCHITECTURE
              <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#socials"
              className="tactile-btn inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/[0.15] bg-white/[0.05] px-6 text-sm font-semibold text-white backdrop-blur-md hover:border-[#00f2fe]/60 hover:bg-[#00f2fe]/10 transition-all"
            >
              TRANSMIT SIGNAL
              <ArrowUpRight size={18} className="text-[#00f2fe]" />
            </a>
          </div>

          {/* Tech Spec Badges */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="text-[#00f2fe]" /> Microservices &amp; REST / GraphQL
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="text-[#00f2fe]" /> Adobe Creative Suite 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="text-[#00f2fe]" /> Three.js &amp; GLSL Shaders
            </span>
          </div>
        </div>

        {/* Right Column: 3D Holographic Character Stage with Duy Portrait */}
        <div className="relative lg:col-span-5">
          <Character3D fallbackImage={personalInfo.avatarUrl} />
        </div>
      </div>
    </section>
  )
}
