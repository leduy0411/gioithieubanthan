import React, { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Command,
  Cpu,
  Palette,
  Server,
  Zap,
} from 'lucide-react'
import { personalInfo } from '../data/portfolioData'
import Character3D from '../components/Character3D'

export default function HeroSection({ onOpenCommandPalette }) {
  const roles = [
    'Backend Engineer & Distributed Gateways',
    'Computer Vision & InsightFace AI Engineer',
    'Creative Technologist & Visual Director',
    '4K Motion Designer & Video Editor',
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedRole, setTypedRole] = useState(roles[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState('backend')
  const [vietnamTime, setVietnamTime] = useState('')

  // Real-time GMT+7 Vietnam Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
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
            setTimeout(() => setIsDeleting(true), 1600)
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
      title: 'Backend Systems & Distributed Gateways',
      desc: 'Architecting resilient microservices, high-throughput Redis caching, and secured OAuth2 gateways.',
      stat1: { label: 'INFERENCE & I/O', value: '< 2.4 ms' },
      stat2: { label: 'API CORE', value: 'FastAPI • Node' },
      stat3: { label: 'DATABASE', value: 'Postgres • Mongo' },
    },
    vision: {
      title: 'Computer Vision & AI Tool Calling',
      desc: 'Deploying InsightFace 512-d embeddings, ONNX Runtime acceleration, and Gemini agentic function calling.',
      stat1: { label: 'INFERENCE', value: '< 180 ms' },
      stat2: { label: 'VISION ENGINE', value: 'InsightFace' },
      stat3: { label: 'AGENT PIPELINE', value: 'Gemini 2.5' },
    },
    creative: {
      title: 'Visual Identity & Motion Post-Production',
      desc: 'Directing vector brand identities, 4K timeline pacing, and beat-synchronized motion VFX.',
      stat1: { label: 'TIMELINE', value: 'ProRes 4K' },
      stat2: { label: 'AUDIO SYNC', value: '128 BPM' },
      stat3: { label: 'DESIGN SUITE', value: 'PS • AI • PR • AE' },
    },
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Monumental Identity & Clean Telemetry */}
        <div className="lg:col-span-7">
          {/* Decluttered Header Capsule: Status & Real-time Vietnam Clock */}
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-zinc-300 backdrop-blur-md">
              <span className="status-dot" aria-hidden="true" />
              <span>OPEN FOR COLLABORATIONS</span>
            </span>
            <span className="text-white/20" aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-[#00f2fe]">
              <Clock size={13} className="text-[#00f2fe]" />
              <span>Vinh Long, VN • GMT+7</span>
              <span className="font-semibold text-white">{vietnamTime || '14:00:00'}</span>
            </span>
          </div>

          {/* Monumental Hero Headline (Crisp White, Anti-AI Slop) */}
          <h1 className="font-display text-[clamp(4rem,9.5vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-[#F8FAFC]">
            LE DUY<span className="text-[#00f2fe]">.</span>
          </h1>

          {/* Clean Subtitle */}
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-[#00f2fe]">
            IT ENGINEER • BACKEND ARCHITECT • CREATIVE TECHNOLOGIST
          </p>

          {/* Typewriter Terminal Role line */}
          <div className="mt-6 flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-[#070b14]/70 px-4 py-2.5 font-mono text-sm sm:text-base backdrop-blur-md">
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
                    ? 'border border-[#00f2fe]/40 bg-[#00f2fe]/10 text-[#00f2fe]'
                    : 'border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Server size={14} /> Backend &amp; Cloud
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all ${
                  activeTab === 'vision'
                    ? 'border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-[#38bdf8]'
                    : 'border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Cpu size={14} /> Computer Vision &amp; AI
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('creative')}
                className={`tactile-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all ${
                  activeTab === 'creative'
                    ? 'border border-[#a855f7]/40 bg-[#a855f7]/10 text-[#c084fc]'
                    : 'border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Palette size={14} /> Creative Direction
              </button>
            </div>

            {/* Dynamic Telemetry Metric Card */}
            <div className="spatial-glass mt-4 rounded-2xl p-5 border border-white/[0.08] bg-[#070b14]/75 backdrop-blur-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-[#00f2fe]">
                {tabSpecs[activeTab].title}
              </span>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {tabSpecs[activeTab].desc}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4">
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

          {/* Action CTAs (2 Main Clear Pillars) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="tactile-btn group inline-flex h-12 items-center gap-2.5 rounded-xl bg-white px-6 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
            >
              INSPECT SYSTEMS
              <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#socials"
              className="tactile-btn inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-white backdrop-blur-md hover:border-[#00f2fe]/40 hover:text-[#00f2fe] transition-all"
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
              >
                <Command size={14} className="text-[#00f2fe]" />
                <span>⌘K</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: 3D Minimalist Space Card with Le Duy Portrait */}
        <div className="relative lg:col-span-5">
          <Character3D fallbackImage={personalInfo.avatarUrl} />
        </div>
      </div>
    </section>
  )
}
