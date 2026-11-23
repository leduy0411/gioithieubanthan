import React, { useEffect, useState } from 'react'
import { ArrowRight, ChevronsDown, RefreshCw, Shield, User } from 'lucide-react'
import { content } from '../data/content'
import MechanicalGearCore from '../components/MechanicalGearCore'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { stationStore } from '../store/stationStore'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

interface HeroSectionProps {
  onOpenCommandPalette?: () => void
}

const HERO_ART_FALLBACKS = [
  '/assets/hero-bg.jpg',
  '/images/hero-bg.png',
  '/assets/hero-bg.webp',
]

function MetricMicroVisualizer({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 64 20" className="h-5 w-16 text-[#0AC8B9]" fill="none" aria-hidden="true">
        <path
          d="M 2 12 L 14 12 L 20 4 L 26 17 L 32 7 L 38 14 L 44 10 L 62 10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 4"
          className="animate-packet-flow"
        />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="#0AC8B9"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          className="animate-slow-spin"
        />
        <circle
          cx="12"
          cy="12"
          r="5"
          stroke="#C89B3C"
          strokeWidth="1.4"
          strokeDasharray="3 2"
          className="animate-slow-spin-reverse"
        />
        <circle cx="12" cy="12" r="2" fill="#F0E6D2" className="animate-node-blink" />
      </svg>
    )
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 56 20" className="h-5 w-14" fill="none" aria-hidden="true">
        <line
          x1="10"
          y1="10"
          x2="46"
          y2="10"
          stroke="#C89B3C"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="animate-packet-flow"
        />
        <circle cx="8" cy="10" r="3.5" fill="#0AC8B9" className="animate-node-blink" />
        <circle
          cx="48"
          cy="10"
          r="3.5"
          fill="#EC4899"
          className="animate-node-blink"
          style={{ animationDelay: '0.5s' }}
        />
      </svg>
    )
  }

  return (
    <div className="flex h-4 items-end gap-0.5" aria-hidden="true">
      {[55, 95, 70, 100, 60, 85].map((h, i) => (
        <span
          key={i}
          className="animate-eq-dance w-1 rounded-t bg-gradient-to-t from-[#C89B3C] via-[#0AC8B9] to-[#F0E6D2]"
          style={{ height: `${h}%`, animationDelay: `${i * 0.14}s` }}
        />
      ))}
    </div>
  )
}

export default function HeroSection(_props: HeroSectionProps) {
  const sectionRef = useScrollMotion<HTMLElement>()
  const [artIndex, setArtIndex] = useState(0)
  const [artLoaded, setArtLoaded] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 })
  const [astrolabeSurge, setAstrolabeSurge] = useState(0)

  const activeArtSrc = artIndex < HERO_ART_FALLBACKS.length ? HERO_ART_FALLBACKS[artIndex] : null
  const roles = content.identity.roles

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3400)
    return () => window.clearInterval(timer)
  }, [roles.length])

  const cycleRoleManually = () => {
    playMechanicalTick()
    setAstrolabeSurge((s) => s + 1)
    setRoleIndex((prev) => (prev + 1) % roles.length)
  }

  const handleHeroPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    setHeroTilt({ x: rx, y: ry })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={() => setHeroTilt({ x: 0, y: 0 })}
      className="relative flex flex-1 min-h-[calc(100vh-4.5rem)] w-full flex-col justify-between overflow-hidden pt-24 pb-8"
      style={{
        background:
          'linear-gradient(180deg, #F4939E 0%, #C27495 24%, #8B5A8C 52%, #351E4A 82%, #110B1F 100%)',
      }}
    >
      {/* Full-Bleed Parallax Hero Artwork Layer */}
      {activeArtSrc && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
          style={{
            transform:
              'translate3d(0, calc(var(--hero-progress, 0) * 220px), 0) scale(calc(1 + var(--hero-progress, 0) * 0.14))',
          }}
        >
          <img
            src={activeArtSrc}
            alt=""
            onLoad={() => setArtLoaded(true)}
            onError={() => {
              setArtLoaded(false)
              setArtIndex((prev) => prev + 1)
            }}
            className={`animate-ken-burns h-full w-full object-cover object-center transition-opacity duration-700 ${
              artLoaded ? 'opacity-90' : 'opacity-0'
            }`}
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091428]/25 via-[#110B1F]/40 to-[#091428]/82" />
          <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[#110B1F] via-[#110B1F]/78 via-40% to-transparent" />
        </div>
      )}

      {/* League of Legends Piltover Art-Deco Perimeter Frame Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-6 top-24 z-15 hidden rounded border border-[#C89B3C]/25 xl:block"
      >
        <span className="absolute -left-1 -top-1 h-3 w-3 rotate-45 border border-[#F0E6D2] bg-[#091428]" />
        <span className="absolute -right-1 -top-1 h-3 w-3 rotate-45 border border-[#F0E6D2] bg-[#091428]" />
        <span className="absolute -bottom-1 -left-1 h-3 w-3 rotate-45 border border-[#0AC8B9] bg-[#091428]" />
        <span className="absolute -bottom-1 -right-1 h-3 w-3 rotate-45 border border-[#0AC8B9] bg-[#091428]" />
      </div>

      {/* Atmospheric Breathing Twilight Glow */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute left-[15%] top-[12%] z-[1] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,232,214,0.34)_0%,rgba(244,147,158,0.14)_45%,transparent_72%)] blur-2xl"
      />

      {/* Giant Piltover Hextech Astrolabe Horizon Watermark behind Hero Title */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6%] top-[12%] z-[2] hidden opacity-35 lg:block"
      >
        <MechanicalGearCore
          variant="halo"
          tiltX={heroTilt.x}
          tiltY={heroTilt.y}
          unlockTrigger={astrolabeSurge}
          className="h-[540px] w-[540px]"
        />
      </div>

      {/* Seamless Atmospheric Mist & Smooth Curved Horizon Transition into #110B1F */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64">
        <div className="animate-mist-drift absolute bottom-12 -left-[12%] h-40 w-[124%] bg-[radial-gradient(ellipse_at_center,rgba(10,200,185,0.18)_0%,rgba(200,155,60,0.14)_40%,transparent_72%)] blur-3xl" />
        <div
          className="absolute inset-x-0 -bottom-24 h-72 bg-gradient-to-t from-[#110B1F] via-[#110B1F]/95 via-45% to-transparent will-change-transform"
          style={{
            transform: 'translate3d(0, calc(var(--hero-progress, 0) * -85px), 0)',
          }}
        />
      </div>

      {/* Main Champion Splash Copy */}
      <div
        className="relative z-30 mx-auto my-auto grid w-full max-w-6xl items-center px-5 pt-4 pb-8 will-change-transform sm:px-8 lg:grid-cols-12"
        style={{
          opacity: 'var(--hero-opacity, 1)',
        }}
      >
        <div className="hidden lg:col-span-4 lg:block" />

        <div className="text-center lg:col-span-8 lg:text-right">
          {/* Piltover Realm Location & Mastery VII Crest Pill */}
          <div
            className="inline-block will-change-transform"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -145px), 0)',
            }}
          >
            <div className="animate-tile-float inline-flex flex-wrap items-center justify-center gap-3 rounded border border-[#C89B3C]/65 bg-[#091428]/80 px-4 py-1.5 backdrop-blur-md shadow-[0_8px_28px_rgba(9,20,40,0.75)]">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
                <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-[#0AC8B9]" />
                <span className="relative inline-flex h-2 w-2 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_10px_#0AC8B9]" />
              </span>
              <span className="font-gaming text-[11px] font-bold uppercase tracking-[0.22em] text-[#F0E6D2]">
                PILTOVER NODE // TRA VINH, VIETNAM
              </span>
              <span className="hidden h-3 w-px bg-[#C89B3C]/40 sm:inline-block" aria-hidden="true" />
              <span className="hidden items-center gap-1 font-mono text-[10px] font-bold text-[#0AC8B9] sm:inline-flex">
                <Shield size={11} className="text-[#C89B3C]" />
                MASTERY VII
              </span>
            </div>
          </div>

          {/* Champion Title & Ornate Gold Divider */}
          <div
            className="will-change-transform"
            style={{
              transform:
                'translate3d(0, calc(var(--hero-progress, 0) * -110px), 0) scale(calc(1 - var(--hero-progress, 0) * 0.08))',
            }}
          >
            <p className="mt-4 font-display text-xs font-bold uppercase tracking-[0.34em] text-[#F0E6D2] drop-shadow-[0_2px_10px_rgba(9,20,40,0.9)] sm:text-sm">
              THE HEXTECH SYSTEMS ARCHITECT
            </p>
            <h1 className="animate-title-shine mt-1 font-display text-[clamp(3.4rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-[0.06em] drop-shadow-[0_14px_40px_rgba(9,20,40,0.85)]">
              {content.identity.callsign}
            </h1>

            {/* LoL Winged Gold Title Filigree */}
            <div
              aria-hidden="true"
              className="mt-3 flex items-center justify-center gap-2 lg:justify-end"
            >
              <span className="h-[1.5px] w-24 bg-gradient-to-r from-transparent via-[#C89B3C] to-[#F0E6D2]" />
              <span className="h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_12px_#0AC8B9]" />
              <span className="h-2 w-2 rotate-45 border border-[#C89B3C] bg-[#EC4899]" />
              <span className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-[#C89B3C]" />
            </div>
          </div>

          {/* Interactive Pro Max Role Cycler + Tagline */}
          <div
            className="will-change-transform"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -75px), 0)',
            }}
          >
            <p className="mt-3 font-gaming text-sm font-bold uppercase tracking-[0.22em] text-[#F0E6D2] drop-shadow-[0_4px_18px_rgba(9,20,40,0.9)] sm:text-base">
              IT ENGINEER • BACKEND ARCHITECT • VISUAL DIRECTOR
            </p>

            {/* Clickable Live Hextech Role Specialization Cycler */}
            <div className="mt-3 flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={cycleRoleManually}
                title="Click to cycle Hextech specialization & trigger astrolabe surge"
                className="tactile-btn group inline-flex items-center gap-2.5 rounded border border-[#C89B3C]/65 bg-[#091428]/85 px-4 py-1.5 backdrop-blur-md transition-all hover:border-[#0AC8B9] hover:shadow-[0_0_20px_rgba(10,200,185,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
              >
                <span className="font-mono text-[10px] font-bold text-[#C89B3C]">
                  RUNE 0{roleIndex + 1}/0{roles.length}
                </span>
                <span
                  key={roleIndex}
                  className="font-mono text-xs font-semibold tracking-wide text-[#0AC8B9] group-hover:text-[#F0E6D2]"
                >
                  {roles[roleIndex]}
                </span>
                <RefreshCw
                  size={11}
                  className="animate-slow-spin text-[#C89B3C] group-hover:text-[#0AC8B9]"
                  aria-hidden="true"
                />
              </button>
            </div>

            <p className="mx-auto mt-3.5 max-w-xl font-body text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_14px_rgba(9,20,40,0.95)] sm:text-base lg:mr-0 lg:ml-auto">
              Architecting resilient distributed backend gateways, real-time 512-D computer vision AI
              pipelines, and 4K visual direction with Piltover Hextech precision.
            </p>
          </div>

          {/* League of Legends Hextech Action Buttons */}
          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-4 will-change-transform lg:justify-end"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -45px), 0)',
            }}
          >
            <a
              href="/profile"
              onClick={(e) => {
                e.preventDefault()
                playMechanicalUnlock()
                stationStore.navigate(1)
              }}
              className="hextech-btn tactile-btn inline-flex items-center gap-2 rounded px-6 py-3.5 font-gaming text-xs font-bold uppercase tracking-[0.2em] text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
            >
              <User size={14} className="text-[#0AC8B9]" aria-hidden="true" />
              <span>SUMMONER DOSSIER</span>
            </a>

            <a
              href="/systems"
              onClick={(e) => {
                e.preventDefault()
                playMechanicalUnlock()
                stationStore.navigate(2)
              }}
              className="hextech-play-btn tactile-btn group relative inline-flex items-center gap-2.5 overflow-hidden px-8 py-3.5 font-gaming text-xs font-extrabold uppercase tracking-[0.2em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
            >
              <span
                aria-hidden="true"
                className="animate-btn-glint pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
              <span className="relative z-10">EXPLORE ARTIFACT DECK</span>
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Hextech Stat Relics Dock: 4 Live Animated Dossier Metrics */}
      <div className="relative z-30 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {content.dossierMetrics.map((metric, idx) => {
            const targetStation = idx === 2 ? 3 : 2
            const targetProject = idx === 3 ? 3 : 0
            return (
              <div
                key={metric.label}
                className="animate-tile-float"
                style={{ animationDelay: `${idx * 0.4}s` }}
              >
                <button
                  type="button"
                  onMouseEnter={() => playMechanicalTick()}
                  onClick={() => {
                    playMechanicalUnlock()
                    stationStore.navigate(
                      targetStation,
                      targetStation === 2 ? { projectIndex: targetProject } : undefined
                    )
                  }}
                  className="fantasy-card group relative flex w-full flex-col justify-between overflow-hidden rounded-xl p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5"
                >
                  <span
                    aria-hidden="true"
                    className="animate-corner-pulse pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-[#C89B3C]"
                  />
                  <span
                    aria-hidden="true"
                    className="animate-corner-pulse pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-[#0AC8B9]"
                    style={{ animationDelay: `${idx * 0.5}s` }}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C8AA6E]">
                      {metric.label}
                    </span>
                    <MetricMicroVisualizer index={idx} />
                  </div>
                  <p className="mt-1.5 font-display text-lg font-extrabold tracking-wide text-[#F0E6D2] sm:text-xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 truncate font-body text-[11px] text-[#B8B0C8]/90">
                    {metric.detail}
                  </p>
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => {
              playMechanicalUnlock()
              stationStore.navigate(1)
            }}
            className="group inline-flex items-center gap-2 rounded border border-[#C89B3C]/45 bg-[#091428]/80 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F0E6D2]/85 backdrop-blur-md transition-colors hover:border-[#0AC8B9] hover:text-white"
          >
            <ChevronsDown size={12} className="animate-arrow-bob text-[#0AC8B9]" />
            <span>SCROLL WHEEL OR PRESS [1–5] TO WARP REALMS</span>
          </button>
        </div>
      </div>
    </section>
  )
}
