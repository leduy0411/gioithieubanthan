import { useState } from 'react'
import { ArrowRight, User } from 'lucide-react'
import { content } from '../data/content'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { stationStore } from '../store/stationStore'

interface HeroSectionProps {
  onOpenCommandPalette?: () => void
}

const HERO_ART_FALLBACKS = [
  '/assets/hero-bg.jpg',
  '/images/hero-bg.png',
  '/assets/hero-bg.webp',
]

/**
 * Section 1: Layered Parallax Twilight Hero with Vivid Dual-Layer Motion
 *
 * - Idle Motion (standing still):
 *   * 16s Ken Burns zoom on hero-bg + drifting twilight mist + pulsing ambient aura
 *   * Pulsing amber radar ring on Tra Vinh beacon + gently floating location pill
 *   * Animated metallic light sheen sweeping across LE DUY.
 *   * Periodic light-glint shimmer across EXPLORE ARSENAL CTA + bouncing arrow
 *
 * - Scroll Motion (scrolling down AND scrolling back up):
 *   * Hero key art shifts down (+220px) & zooms softly
 *   * 3 mountain layers separate dramatically (+90px, -45px, -135px foreground wipe)
 *   * Location pill, LE DUY. title, subtitle, and CTA separate at staggered vertical speeds
 */
export default function HeroSection(_props: HeroSectionProps) {
  const sectionRef = useScrollMotion<HTMLElement>()
  const [artIndex, setArtIndex] = useState(0)
  const [artLoaded, setArtLoaded] = useState(false)

  const activeArtSrc = artIndex < HERO_ART_FALLBACKS.length ? HERO_ART_FALLBACKS[artIndex] : null

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex flex-1 min-h-[calc(100vh-5.5rem)] w-full items-center overflow-hidden pt-20"
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
          {/* Seamless Multi-Stop Atmospheric Transition into #110B1F (Zero harsh horizontal cut-off) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#110B1F]/15 via-[#110B1F]/30 to-[#110B1F]/68" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#110B1F] via-[#110B1F]/70 via-35% to-transparent" />
        </div>
      )}

      {/* Atmospheric Breathing Twilight Sun/Moon Glow */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute left-[15%] top-[12%] z-[1] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,232,214,0.34)_0%,rgba(244,147,158,0.14)_45%,transparent_72%)] blur-2xl"
      />

      {/* Seamless Atmospheric Mist & Smooth Curved Horizon Transition into #110B1F (No jagged clipped polygons) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64">
        {/* Drifting Soft Twilight Mist Veil */}
        <div
          className="animate-mist-drift absolute bottom-12 -left-[12%] h-40 w-[124%] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.22)_0%,rgba(236,72,153,0.12)_40%,transparent_72%)] blur-3xl"
        />

        {/* Smooth Parallax Bottom Gradient Skirt that glides cleanly upward on scroll without hard seams */}
        <div
          className="absolute inset-x-0 -bottom-24 h-72 bg-gradient-to-t from-[#110B1F] via-[#110B1F]/95 via-45% to-transparent will-change-transform"
          style={{
            transform: 'translate3d(0, calc(var(--hero-progress, 0) * -85px), 0)',
          }}
        />
      </div>

      {/* Main Hero Copy — Staggered Multi-Speed Scroll Separation + Idle Shine */}
      <div
        className="relative z-30 mx-auto grid w-full max-w-6xl items-center px-5 pb-28 pt-12 will-change-transform sm:px-8 lg:grid-cols-12"
        style={{
          opacity: 'var(--hero-opacity, 1)',
        }}
      >
        <div className="hidden lg:col-span-5 lg:block" />

        <div className="text-center lg:col-span-7 lg:text-right">
          {/* Location Pill: Idle float + Pulsing Amber Radar Ring + Fast Scroll Lift */}
          <div
            className="inline-block will-change-transform"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -145px), 0)',
            }}
          >
            <div className="animate-tile-float inline-flex items-center gap-3 rounded-full border border-white/25 bg-[#110B1F]/55 px-4 py-1.5 backdrop-blur-md shadow-[0_8px_24px_rgba(17,11,31,0.45)]">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
                <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-[#F59E0B]" />
                <span className="relative inline-flex h-2 w-2 rotate-45 bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]" />
              </span>
              <span className="font-gaming text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                TRA VINH, VINH LONG • VIETNAM
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
            <h1 className="animate-title-shine mt-6 font-display text-[clamp(3.6rem,8.5vw,6.8rem)] font-extrabold leading-[0.95] tracking-[0.06em] drop-shadow-[0_14px_40px_rgba(17,11,31,0.75)]">
              {content.identity.callsign}
            </h1>
          </div>

          {/* Subtitle & Tagline: Slower Scroll Lag for Layered Depth */}
          <div
            className="will-change-transform"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -75px), 0)',
            }}
          >
            <p className="mt-4 font-gaming text-sm font-bold uppercase tracking-[0.22em] text-white drop-shadow-[0_4px_18px_rgba(17,11,31,0.85)] sm:text-base">
              IT ENGINEER • BACKEND ARCHITECT • VISUAL DIRECTOR
            </p>

            <p className="ml-auto mt-5 max-w-xl font-body text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_14px_rgba(17,11,31,0.9)] sm:text-base">
              Architecting resilient distributed backend gateways, real-time 512-D computer vision AI
              pipelines, and 4K visual direction with precision and craft.
            </p>
          </div>

          {/* CTA Buttons: Navigate to Standalone Systems & Profile Pages */}
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-4 will-change-transform lg:justify-end"
            style={{
              transform: 'translate3d(0, calc(var(--hero-progress, 0) * -45px), 0)',
            }}
          >
            <a
              href="/profile"
              onClick={(e) => {
                e.preventDefault()
                stationStore.navigate(1)
              }}
              className="tactile-btn inline-flex items-center gap-2 rounded-full border border-white/55 bg-[#110B1F]/55 px-6 py-3.5 font-gaming text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-[#F472B6] hover:bg-[#110B1F]/80 hover:text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80"
            >
              <User size={14} aria-hidden="true" />
              <span>VIEW PROFILE</span>
            </a>

            <a
              href="/systems"
              onClick={(e) => {
                e.preventDefault()
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
    </section>
  )
}
