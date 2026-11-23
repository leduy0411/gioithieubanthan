import { useEffect, useState } from 'react'
import { Activity, ArrowRight, Cpu, Film, RefreshCw, Server, User } from 'lucide-react'
import { content } from '../data/content'
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

const METRIC_ICONS = [Activity, Cpu, Server, Film] as const

export default function HeroSection(_props: HeroSectionProps) {
  const sectionRef = useScrollMotion<HTMLElement>()
  const [artIndex, setArtIndex] = useState(0)
  const [artLoaded, setArtLoaded] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

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
    setRoleIndex((prev) => (prev + 1) % roles.length)
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex flex-1 min-h-[calc(100vh-5.5rem)] w-full flex-col justify-between overflow-hidden pt-24 pb-12"
      style={{
        background:
          'linear-gradient(180deg, #F4939E 0%, #C27495 24%, #8B5A8C 52%, #351E4A 82%, #110B1F 100%)',
      }}
    >
      {/* Full-Bleed Parallax Hero Artwork Layer (Scroll shift + 16s Ken Burns breathing zoom) */}
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
          {/* Seamless Multi-Stop Atmospheric Transition into #110B1F */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#110B1F]/20 via-[#110B1F]/35 to-[#110B1F]/75" />
          <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[#110B1F] via-[#110B1F]/75 via-40% to-transparent" />
        </div>
      )}

      {/* Atmospheric Breathing Twilight Sun/Moon Glow */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute left-[15%] top-[12%] z-[1] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,232,214,0.34)_0%,rgba(244,147,158,0.14)_45%,transparent_72%)] blur-2xl"
      />

      {/* Seamless Atmospheric Mist & Smooth Curved Horizon Transition into #110B1F */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64">
        <div className="animate-mist-drift absolute bottom-12 -left-[12%] h-40 w-[124%] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.22)_0%,rgba(236,72,153,0.12)_40%,transparent_72%)] blur-3xl" />
        <div
          className="absolute inset-x-0 -bottom-24 h-72 bg-gradient-to-t from-[#110B1F] via-[#110B1F]/95 via-45% to-transparent will-change-transform"
          style={{
            transform: 'translate3d(0, calc(var(--hero-progress, 0) * -85px), 0)',
          }}
        />
      </div>

      {/* Main Hero Copy — Staggered Multi-Speed Scroll Separation + Idle Shine */}
      <div
        className="relative z-30 mx-auto my-auto grid w-full max-w-6xl items-center px-5 pt-6 pb-10 will-change-transform sm:px-8 lg:grid-cols-12"
        style={{
          opacity: 'var(--hero-opacity, 1)',
        }}
      >
        <div className="hidden lg:col-span-4 lg:block" />

        <div className="text-center lg:col-span-8 lg:text-right">
          {/* Location & Status Pill: Idle float + Pulsing Amber Radar Ring */}
          <div
            className="inline-block will-change-transform"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -145px), 0)',
            }}
          >
            <div className="animate-tile-float inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/25 bg-[#110B1F]/65 px-4 py-1.5 backdrop-blur-md shadow-[0_8px_24px_rgba(17,11,31,0.5)]">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
                <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-[#F59E0B]" />
                <span className="relative inline-flex h-2 w-2 rotate-45 bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]" />
              </span>
              <span className="font-gaming text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                TRA VINH, VINH LONG • VIETNAM
              </span>
              <span className="hidden h-3 w-px bg-white/20 sm:inline-block" aria-hidden="true" />
              <span className="hidden font-mono text-[10px] text-[#FDE68A] sm:inline-block">
                GMT+7 ONLINE
              </span>
            </div>
          </div>

          {/* Headline: Metallic Idle Shine + Mid Scroll Lift & Scale */}
          <div
            className="will-change-transform"
            style={{
              transform:
                'translate3d(0, calc(var(--hero-progress, 0) * -110px), 0) scale(calc(1 - var(--hero-progress, 0) * 0.08))',
            }}
          >
            <h1 className="animate-title-shine mt-5 font-display text-[clamp(3.5rem,8.2vw,6.6rem)] font-extrabold leading-[0.95] tracking-[0.06em] drop-shadow-[0_14px_40px_rgba(17,11,31,0.75)]">
              {content.identity.callsign}
            </h1>
          </div>

          {/* Interactive Pro Max Role Cycler + Tagline */}
          <div
            className="will-change-transform"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -75px), 0)',
            }}
          >
            <p className="mt-3 font-gaming text-sm font-bold uppercase tracking-[0.22em] text-white drop-shadow-[0_4px_18px_rgba(17,11,31,0.85)] sm:text-base">
              IT ENGINEER • BACKEND ARCHITECT • VISUAL DIRECTOR
            </p>

            {/* Clickable Live Role Ticker */}
            <div className="mt-3 flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={cycleRoleManually}
                title="Click to cycle active specialization"
                className="tactile-btn group inline-flex items-center gap-2.5 rounded-lg border border-[#EC4899]/45 bg-[#110B1F]/70 px-3.5 py-1.5 backdrop-blur-md transition-all hover:border-[#F59E0B] hover:bg-[#19112B]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/75"
              >
                <span className="font-mono text-[10px] font-bold text-[#F59E0B]">
                  0{roleIndex + 1}/0{roles.length}
                </span>
                <span
                  key={roleIndex}
                  className="font-mono text-xs font-semibold tracking-wide text-[#F472B6] group-hover:text-white"
                >
                  {roles[roleIndex]}
                </span>
                <RefreshCw
                  size={11}
                  className="animate-slow-spin text-[#B8B0C8] group-hover:text-[#FDE68A]"
                  aria-hidden="true"
                />
              </button>
            </div>

            <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_14px_rgba(17,11,31,0.9)] sm:text-base lg:mr-0 lg:ml-auto">
              Architecting resilient distributed backend gateways, real-time 512-D computer vision AI
              pipelines, and 4K visual direction with precision and craft.
            </p>
          </div>

          {/* CTA Buttons: Navigate to Standalone Systems & Profile Pages */}
          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-4 will-change-transform lg:justify-end"
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
              className="tactile-btn inline-flex items-center gap-2 rounded-full border border-white/55 bg-[#110B1F]/60 px-6 py-3.5 font-gaming text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-[#F472B6] hover:bg-[#110B1F]/85 hover:text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80"
            >
              <User size={14} aria-hidden="true" />
              <span>VIEW PROFILE</span>
            </a>

            <a
              href="/systems"
              onClick={(e) => {
                e.preventDefault()
                playMechanicalUnlock()
                stationStore.navigate(2)
              }}
              className="tactile-btn group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-3.5 font-gaming text-xs font-bold uppercase tracking-[0.2em] text-[#110B1F] shadow-[0_14px_42px_rgba(236,72,153,0.45)] transition-all hover:scale-[1.04] hover:bg-[#FFF5F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80"
            >
              <span
                aria-hidden="true"
                className="animate-btn-glint pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#F472B6]/55 to-transparent"
              />
              <span className="relative z-10">EXPLORE ARSENAL</span>
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Pro Max Bottom Telemetry Dock: 4 Live Animated Dossier Metrics from content.ts */}
      <div className="relative z-30 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {content.dossierMetrics.map((metric, idx) => {
            const Icon = METRIC_ICONS[idx % METRIC_ICONS.length]
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
                  className="fantasy-card group relative flex w-full flex-col justify-between overflow-hidden rounded-xl p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EC4899]/70"
                >
                  <span
                    aria-hidden="true"
                    className="animate-corner-pulse pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-[#F59E0B]/80"
                    style={{ animationDelay: `${idx * 0.5}s` }}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8B0C8]">
                      {metric.label}
                    </span>
                    <Icon
                      size={14}
                      className="shrink-0 text-[#F472B6] transition-transform duration-300 group-hover:scale-115 group-hover:text-[#FDE68A]"
                    />
                  </div>
                  <p className="mt-1.5 font-display text-lg font-extrabold tracking-wide text-white sm:text-xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 truncate font-body text-[11px] text-[#B8B0C8]/85">
                    {metric.detail}
                  </p>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
