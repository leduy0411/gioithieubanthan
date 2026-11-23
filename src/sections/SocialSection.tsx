import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Clock, Copy, MapPin, Send, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { content } from '../data/content'
import {
  FacebookLogo,
  InstagramLogo,
  LocketLogo,
  TikTokLogo,
} from '../components/BrandIcons'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

const BRAND_LOGOS: Record<string, React.ElementType> = {
  facebook: FacebookLogo,
  locket: LocketLogo,
  instagram: InstagramLogo,
  tiktok: TikTokLogo,
}

const SIGNAL_TOPICS = [
  'Backend & Distributed APIs',
  'Computer Vision & ArcFace AI',
  '4K Motion & Visual Direction',
  'General Collaboration',
] as const

export default function SocialSection() {
  const sectionRef = useScrollMotion<HTMLElement>()
  const [copied, setCopied] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string>(SIGNAL_TOPICS[0])
  const [customNote, setCustomNote] = useState('')
  const [vnClock, setVnClock] = useState<string>(() =>
    new Date().toLocaleTimeString('en-GB', {
      timeZone: content.identity.timezone,
      hour12: false,
    })
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVnClock(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: content.identity.timezone,
          hour12: false,
        })
      )
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const triggerHextechConfetti = () => {
    try {
      confetti({
        particleCount: 42,
        spread: 68,
        origin: { y: 0.72 },
        colors: ['#C89B3C', '#0AC8B9', '#F0E6D2', '#EC4899'],
      })
    } catch {
      // ignore if canvas-confetti blocked
    }
  }

  const copyEmail = () => {
    playMechanicalUnlock()
    navigator.clipboard.writeText(content.identity.email)
    setCopied(true)
    triggerHextechConfetti()
    setTimeout(() => setCopied(false), 2200)
  }

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`[LE DUY. Portfolio] ${selectedTopic}`)
    const bodyText = customNote.trim()
      ? `${customNote.trim()}\n\n---\nSent via LE DUY. Pro Max Signal Portal`
      : `Hi Le Duy,\n\nI would like to connect regarding ${selectedTopic}.\n`
    return `mailto:${content.identity.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`
  }

  return (
    <section
      ref={sectionRef}
      id="socials"
      className="relative flex flex-1 min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden bg-[#110B1F] px-5 pt-24 pb-10 sm:px-8"
    >
      {/* Breathing Ambient Corner & Horizon Glows */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute -bottom-24 left-1/2 h-80 w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(236,72,153,0.18)_0%,rgba(139,92,246,0.12)_45%,transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl"
        style={{ animationDelay: '-2.5s' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left Column (5 cols): Bi-Directional Slide from Left + Levitating Direct Uplink Card */}
          <div
            className="will-change-transform lg:col-span-5"
            style={{
              transform:
                'translate3d(calc(var(--ap, 0) * -54px), calc(var(--p, 0) * 38px), 0)',
              opacity: 'var(--vis, 1)',
            }}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="animate-node-blink h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_8px_#0AC8B9]" />
              <p className="font-gaming text-xs font-bold uppercase tracking-[0.22em] text-[#0AC8B9]">
                PILTOVER HEXGATE // DIRECT CHANNEL
              </p>
            </div>
            <h2 className="animate-title-shine mt-3 font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-[0.05em] sm:text-4xl">
              TRANSMIT YOUR SIGNAL
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-[#B8B0C8] sm:text-base">
              For distributed backend microservices, edge computer vision pipelines, or 4K visual
              direction — select a Hextech transmission rune below or connect across verified portals.
            </p>

            {/* Gently Floating Direct Uplink & Quick Signal Composer Card */}
            <div className="animate-tile-float mt-6">
              <div className="fantasy-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300">
                <span className="animate-corner-pulse pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-[#C89B3C]" />
                <span className="animate-corner-pulse pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-[#C89B3C]" />
                <span className="animate-corner-pulse pointer-events-none absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#0AC8B9]" />
                <span className="animate-corner-pulse pointer-events-none absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#0AC8B9]" />

                <div className="flex items-center justify-between font-gaming text-xs uppercase tracking-[0.16em] text-[#C8AA6E]">
                  <span>HEXGATE DIRECT UPLINK</span>
                  <span className="inline-flex items-center gap-1.5 text-[#0AC8B9]">
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-[#0AC8B9]" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-[#0AC8B9]" />
                    </span>
                    ONLINE
                  </span>
                </div>

                {/* Live Animated Hextech Carrier Waveform Oscilloscope */}
                <div className="mt-3 flex items-center justify-between rounded-lg border border-[#C89B3C]/35 bg-[#091428]/85 px-3 py-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#0AC8B9]">
                    HEXGATE CARRIER // 128.4 MHZ
                  </span>
                  <svg viewBox="0 0 120 18" className="h-4 w-28" fill="none" aria-hidden="true">
                    <path
                      d="M 2 9 Q 12 1, 22 9 T 42 9 T 62 9 T 82 9 T 102 9 T 118 9"
                      stroke="#0AC8B9"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      className="animate-packet-flow"
                    />
                    <path
                      d="M 2 9 Q 12 17, 22 9 T 42 9 T 62 9 T 82 9 T 102 9 T 118 9"
                      stroke="#C89B3C"
                      strokeWidth="1.2"
                      strokeOpacity="0.8"
                      strokeDasharray="4 4"
                      className="animate-packet-flow"
                    />
                  </svg>
                </div>

                <p className="mt-3 break-all font-mono text-sm font-semibold text-white sm:text-base">
                  {content.identity.email}
                </p>

                {/* Pro Max Quick Topic Selector */}
                <div className="mt-4 border-t border-[#C89B3C]/25 pt-3.5">
                  <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#0AC8B9]">
                    <Sparkles size={11} />
                    <span>SELECT TRANSMISSION RUNE</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {SIGNAL_TOPICS.map((topic) => {
                      const active = selectedTopic === topic
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => {
                            playMechanicalTick()
                            setSelectedTopic(topic)
                          }}
                          className={`hextech-chamfer border px-2.5 py-1 font-mono text-[10px] transition-all ${
                            active
                              ? 'border-[#0AC8B9] bg-[#0AC8B9]/22 font-bold text-[#F0E6D2] shadow-[0_0_12px_rgba(10,200,185,0.3)]'
                              : 'border-[#C89B3C]/35 bg-[#091428]/80 text-[#C8AA6E] hover:border-[#C89B3C] hover:text-[#F0E6D2]'
                          }`}
                        >
                          {topic}
                        </button>
                      )
                    })}
                  </div>

                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Optional Hextech transmission note..."
                    aria-label="Optional quick message note"
                    className="mt-2.5 w-full rounded border border-[#C89B3C]/35 bg-[#091428]/85 px-3 py-2 font-body text-xs text-[#F0E6D2] outline-none transition-colors placeholder:text-[#C8AA6E]/45 focus:border-[#0AC8B9]"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#C89B3C]/25 pt-4">
                  <a
                    href={buildMailtoHref()}
                    onClick={() => {
                      playMechanicalUnlock()
                      triggerHextechConfetti()
                    }}
                    className="hextech-play-btn tactile-btn group relative inline-flex flex-1 items-center justify-center gap-1.5 overflow-hidden px-5 py-2.5 font-gaming text-xs font-extrabold uppercase tracking-[0.16em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
                  >
                    <span
                      aria-hidden="true"
                      className="animate-btn-glint pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    />
                    <Send size={13} className="relative z-10" />
                    <span className="relative z-10">TRANSMIT EMAIL</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-live="polite"
                    className="hextech-btn tactile-btn inline-flex items-center gap-1.5 px-4 py-2.5 font-gaming text-xs font-bold uppercase tracking-[0.16em] text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
                  >
                    {copied ? (
                      <Check size={14} className="text-[#0AC8B9]" />
                    ) : (
                      <Copy size={14} className="text-[#C89B3C]" />
                    )}
                    <span>{copied ? 'COPIED ✓' : 'COPY'}</span>
                  </button>
                </div>

                {/* Live Ticking GMT+7 Local Time & Coordinates */}
                <div className="mt-4 flex items-center justify-between border-t border-[#C89B3C]/25 pt-3.5 font-mono text-xs text-[#C8AA6E]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#0AC8B9]" />
                    <span>{content.identity.locationShort}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#F0E6D2]">
                    <Clock size={12} className="text-[#C89B3C]" />
                    <span>{vnClock} GMT+7</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): 4 Social Bento Cards — Staggered Bi-Directional Scroll Wave + Staggered Idle Float */}
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {content.socials.map((social, idx) => {
                const Logo = BRAND_LOGOS[social.id] || FacebookLogo
                const colOffset = idx % 2 === 0 ? 1 : -1
                return (
                  <div
                    key={social.id}
                    className="will-change-transform"
                    style={{
                      transform: `perspective(1000px) translate3d(calc(var(--ap, 0) * ${colOffset * 34}px), calc(var(--p, 0) * ${-28 - idx * 14}px), 0) scale(calc(1 - var(--ap, 0) * ${0.09 + idx * 0.015})) rotateX(calc(var(--p, 0) * ${8 + idx * 2}deg))`,
                    }}
                  >
                    <div
                      className="animate-tile-float h-full"
                      style={{ animationDelay: `${idx * 0.55}s` }}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => playMechanicalTick()}
                        onClick={() => playMechanicalUnlock()}
                        className="fantasy-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/75"
                      >
                        <div className="holo-foil" aria-hidden="true" />

                        <span className="animate-corner-pulse pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-violet-300/50 transition-colors group-hover:border-[#EC4899]" />
                        <span className="animate-corner-pulse pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-violet-300/50 transition-colors group-hover:border-[#EC4899]" />
                        <span className="animate-corner-pulse pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-violet-300/50 transition-colors group-hover:border-[#F59E0B]" />
                        <span className="animate-corner-pulse pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-violet-300/50 transition-colors group-hover:border-[#F59E0B]" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between">
                            <div
                              className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/35 bg-[#19112B] transition-transform duration-300 group-hover:scale-115"
                              style={{
                                color: social.color,
                                boxShadow: `0 0 18px ${social.color}30`,
                              }}
                            >
                              <Logo className="h-5 w-5" />
                            </div>
                            <span
                              className="animate-pill-glow rounded border border-violet-400/30 bg-[#19112B]/85 px-2.5 py-0.5 font-mono text-[10px] text-[#B8B0C8]"
                              style={{ animationDelay: `${idx * 0.4}s` }}
                            >
                              {social.badge}
                            </span>
                          </div>

                          <h3 className="mt-5 font-gaming text-lg font-bold uppercase tracking-wider text-white transition-colors group-hover:text-[#F472B6]">
                            {social.name}
                          </h3>
                          <p className="mt-0.5 font-mono text-xs text-[#F59E0B]">{social.handle}</p>
                          <p className="mt-2 font-body text-xs leading-relaxed text-[#B8B0C8]">
                            {social.description}
                          </p>
                        </div>

                        <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 font-gaming text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8B0C8] transition-colors group-hover:text-white">
                          <span>OPEN PORTAL</span>
                          <ArrowUpRight
                            size={14}
                            className="text-[#EC4899] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
