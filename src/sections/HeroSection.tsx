import React, { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Command,
  Cpu,
  Palette,
  Server,
  Sparkles,
} from 'lucide-react'
import { content } from '../data/content'
import Character3D from '../components/Character3D'

interface HeroSectionProps {
  onOpenCommandPalette?: () => void
}

export default function HeroSection({ onOpenCommandPalette }: HeroSectionProps) {
  const roles = content.identity.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedRole, setTypedRole] = useState(roles[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState<'backend' | 'vision' | 'creative'>('backend')
  const [vietnamTime, setVietnamTime] = useState('')

  // Real-time GMT+7 Vietnam Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: content.identity.timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setVietnamTime(timeString)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Anti-AI Slop Typewriter (respects prefers-reduced-motion)
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
            setTimeout(() => setIsDeleting(true), 1800)
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
      isDeleting ? 35 : 70
    )
    return () => window.clearInterval(timer)
  }, [isDeleting, roleIndex, typedRole.length, roles])

  // Real Architecture Telemetry (Derived from content.ts and verified tech stack)
  const technicalDisciplines = {
    backend: {
      title: 'Backend Systems & Distributed Gateways',
      focus: 'High-throughput microservices, Redis caching, and secured OAuth2 gateways.',
      stat1: { label: 'CORE RUNTIMES', value: 'FastAPI • Node.js' },
      stat2: { label: 'DATA TIER', value: 'PostgreSQL • Mongo' },
      stat3: { label: 'IN-MEMORY CACHE', value: 'Redis Pipeline' },
    },
    vision: {
      title: 'Computer Vision & Agentic Automation',
      focus: 'ArcFace 512-d biometric embeddings with ONNX Runtime acceleration & Gemini Agentic Tool Calling.',
      stat1: { label: 'AI INFERENCE', value: '< 180 ms' },
      stat2: { label: 'VISION ENGINE', value: 'InsightFace ArcFace' },
      stat3: { label: 'VECTOR EMBEDDING', value: '512-D Space' },
    },
    creative: {
      title: 'Visual Direction & Motion Post-Production',
      focus: 'Vector brand systems, typography hierarchy, and beat-synchronized 4K motion direction.',
      stat1: { label: 'TIMELINE PACING', value: 'ProRes 4K @ 60 FPS' },
      stat2: { label: 'AUDIO RHYTHM', value: '128 BPM Harmonic' },
      stat3: { label: 'CREATIVE SUITE', value: 'PS • AI • PR • AE' },
    },
  }

  const currentDiscipline = technicalDisciplines[activeTab]

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Monumental Identity & Verified Telemetry */}
        <div className="lg:col-span-7 z-10">
          {/* Header Capsule: Station Status & Live GMT+7 Clock */}
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-zinc-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-pulse" aria-hidden="true" />
              <span>ORBITAL STATION 00 // ACTIVE</span>
            </span>
            <span className="text-white/20" aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-[#38bdf8]">
              <Clock size={13} className="text-[#38bdf8]" />
              <span>{content.identity.locationShort}</span>
              <span className="font-semibold text-white">{vietnamTime || 'GMT+7'}</span>
            </span>
          </div>

          {/* Monumental Hero Headline (Crisp White #F8FAFC, Anti-AI Slop) */}
          <h1 className="font-display text-[clamp(3.8rem,9vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#F8FAFC]">
            {content.identity.callsign.replace('.', '')}
            <span className="text-[var(--accent,#38bdf8)]">.</span>
          </h1>

          {/* Clean Callsign Subtitle */}
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-[#38bdf8]">
            {content.identity.primaryRoleShort}
          </p>

          {/* Typewriter Terminal Role Line */}
          <div className="mt-6 flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-[#070b14]/75 px-4 py-2.5 font-mono text-sm backdrop-blur-md">
            <span className="text-[#38bdf8] shrink-0">&gt; mission_focus:</span>
            <span className="text-white font-medium truncate">{typedRole}</span>
            <span className="animate-pulse text-[#38bdf8]" aria-hidden="true">_</span>
          </div>

          {/* Discipline Switcher (Minimalist Tabs, No Boxed Syndrome) */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('backend')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono transition-all ${
                  activeTab === 'backend'
                    ? 'border border-[#38bdf8]/40 bg-[#38bdf8]/15 text-[#38bdf8]'
                    : 'border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Server size={14} /> Backend &amp; Cloud
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono transition-all ${
                  activeTab === 'vision'
                    ? 'border border-[#38bdf8]/40 bg-[#38bdf8]/15 text-[#38bdf8]'
                    : 'border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Cpu size={14} /> Computer Vision &amp; AI
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('creative')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono transition-all ${
                  activeTab === 'creative'
                    ? 'border border-[#a855f7]/40 bg-[#a855f7]/15 text-[#c084fc]'
                    : 'border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Palette size={14} /> Creative Direction
              </button>
            </div>

            {/* Dynamic Architecture Spec Display (Clean Specs, Real Metrics) */}
            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#070b14]/70 p-5 backdrop-blur-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                {currentDiscipline.title}
              </span>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {currentDiscipline.focus}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4">
                <div>
                  <p className="font-mono text-[10px] uppercase text-zinc-500">{currentDiscipline.stat1.label}</p>
                  <p className="mt-1 font-display text-sm sm:text-base font-bold text-white">{currentDiscipline.stat1.value}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-zinc-500">{currentDiscipline.stat2.label}</p>
                  <p className="mt-1 font-display text-sm sm:text-base font-bold text-[#38bdf8]">{currentDiscipline.stat2.value}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-zinc-500">{currentDiscipline.stat3.label}</p>
                  <p className="mt-1 font-display text-sm sm:text-base font-bold text-emerald-400">{currentDiscipline.stat3.value}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs (2 Clear Pillars + Quick ⌘K) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="tactile-btn group inline-flex h-12 items-center gap-2.5 rounded-xl bg-white px-6 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
            >
              EXPLORE ORBIT
              <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#socials"
              className="tactile-btn inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-white backdrop-blur-md hover:border-[#38bdf8]/40 hover:text-[#38bdf8] transition-all"
            >
              TRANSMIT SIGNAL
              <ArrowUpRight size={17} />
            </a>

            {/* Quick Cmd+K Shortcut */}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="tactile-btn hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 font-mono text-xs text-zinc-400 hover:border-white/20 hover:text-white"
                title="Command Palette (Cmd+K)"
                aria-label="Open Command Palette"
              >
                <Command size={14} className="text-[#38bdf8]" />
                <span>⌘K</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Spacecraft Viewport 3D Stage with Le Duy Portrait */}
        <div className="relative lg:col-span-5 flex items-center justify-center z-10 w-full">
          <Character3D fallbackImage={content.identity.avatarUrl} />
        </div>
      </div>
    </section>
  )
}
