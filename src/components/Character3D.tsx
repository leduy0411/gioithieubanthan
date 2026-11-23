import React, { useState } from 'react'
import { content } from '../data/content'
import MechanicalGearCore from './MechanicalGearCore'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

interface Character3DProps {
  fallbackImage?: string
}

/**
 * Character3D — Pro Max Interactive 3D Character Spotlight Frame
 *
 * - Interactive 3D pointer tilt tracking with stepped Z-depth parallax
 * - Embedded 5-layer Hextech MechanicalGearCore halo rotating behind the portrait
 * - Clickable mechanical overdrive surge + golden flash on portrait click
 * - Orbiting conic border beam, periodic holographic sheen & live dancing 4-bar equalizer
 */
export default function Character3D({
  fallbackImage = content.identity.avatarUrl,
}: Character3DProps) {
  const [imageTier, setImageTier] = useState<number>(0)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [unlockTick, setUnlockTick] = useState(0)

  const imageSources = [
    fallbackImage,
    content.identity.avatarCutoutUrl,
    content.identity.avatarSvgUrl,
  ]

  const currentSrc = imageTier < imageSources.length ? imageSources[imageTier] : null

  const handleImageError = () => {
    setImageLoaded(false)
    setImageTier((prev) => prev + 1)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    setTilt({ x: rx, y: ry })
  }

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 })

  const handlePortraitClick = () => {
    setUnlockTick((t) => t + 1)
    playMechanicalUnlock()
  }

  return (
    <div
      className="group relative mx-auto w-full max-w-[390px] cursor-pointer select-none py-6"
      onPointerEnter={() => playMechanicalTick()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handlePortraitClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive Character Portrait — Click to trigger Hextech clockwork surge"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handlePortraitClick()
        }
      }}
    >
      {/* Breathing Warm Amber & Arcane Violet Backlight Aura */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_72%_25%,rgba(245,158,11,0.28)_0%,transparent_52%),radial-gradient(circle_at_24%_70%,rgba(139,92,246,0.34)_0%,transparent_58%)] blur-2xl"
      />

      {/* Frame-Bound Energy Micro-Orbs */}
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute -left-3 top-12 z-30 h-2.5 w-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_14px_#F59E0B]"
      />
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute -right-3 top-28 z-30 h-2 w-2 rounded-full bg-[#EC4899] shadow-[0_0_12px_#EC4899]"
        style={{ animationDelay: '1.3s' }}
      />
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute right-8 top-0 z-30 h-2 w-2 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]"
        style={{ animationDelay: '2.2s' }}
      />
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute bottom-16 -left-2 z-30 h-2 w-2 rounded-full bg-[#F472B6] shadow-[0_0_12px_#F472B6]"
        style={{ animationDelay: '0.8s' }}
      />

      {/* Levitating Character Frame with Interactive 3D Pointer Tilt & Orbiting Conic Border Beam */}
      <div className="animate-card-levitate">
        <div
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1100px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
          }}
        >
          <div className="conic-border-beam relative">
            <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-b from-[#23153D] via-[#170E2B] to-[#110B1F]">
              {/* Periodic Holographic Sheen */}
              <div className="holo-foil z-20" aria-hidden="true" />

              {/* Top-Left Live Telemetry Status Chip */}
              <div className="pointer-events-none absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded border border-white/15 bg-[#110B1F]/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#FDE68A] backdrop-blur-md">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-[#F59E0B]" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                </span>
                <span>HEXTECH CORE</span>
              </div>

              {/* Ornate Top-Center Ruby/Sakura Gem */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-2"
              >
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#EC4899]/80" />
                <span className="animate-crystal-breath h-2.5 w-2.5 rotate-45 border border-white/70 bg-[#EC4899] shadow-[0_0_14px_#EC4899]" />
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#EC4899]/80" />
              </div>

              {/* Ornate Geometric Corner Accents */}
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute left-3 top-3 z-30 h-4 w-4 border-l-2 border-t-2 border-[#F59E0B]/80"
              />
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute right-3 top-3 z-30 h-4 w-4 border-r-2 border-t-2 border-[#F59E0B]/80"
                style={{ animationDelay: '0.7s' }}
              />
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute bottom-3 left-3 z-30 h-4 w-4 border-b-2 border-l-2 border-[#EC4899]/80"
                style={{ animationDelay: '1.4s' }}
              />
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute bottom-3 right-3 z-30 h-4 w-4 border-b-2 border-r-2 border-[#EC4899]/80"
                style={{ animationDelay: '2.1s' }}
              />

              {/* Portrait Stage */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_32%,rgba(245,158,11,0.24)_0%,transparent_50%),radial-gradient(circle_at_30%_55%,rgba(139,92,246,0.3)_0%,transparent_55%)]"
                />

                {/* Rotating 5-Layer Hextech Clockwork Halo Mounted Behind Character Silhouette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[38%] z-[5] -translate-x-1/2 -translate-y-1/2 opacity-40 transition-opacity duration-500 group-hover:opacity-75"
                >
                  <MechanicalGearCore
                    variant="halo"
                    tiltX={tilt.x}
                    tiltY={tilt.y}
                    unlockTrigger={unlockTick}
                    className="h-64 w-64"
                  />
                </div>

                {currentSrc ? (
                  <img
                    src={currentSrc}
                    alt="Le Duy — IT Engineer, Backend Architect & Visual Director"
                    onLoad={() => setImageLoaded(true)}
                    onError={handleImageError}
                    className={`relative z-10 h-full w-full object-cover object-top brightness-[0.96] contrast-[1.06] drop-shadow-[0_0_24px_rgba(245,158,11,0.24)] transition-all duration-700 group-hover:scale-[1.03] ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    fetchPriority="high"
                    decoding="async"
                  />
                ) : (
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
                    <p className="font-display text-3xl font-bold tracking-[0.14em] text-white">
                      {content.identity.callsign}
                    </p>
                    <p className="mt-2 font-gaming text-xs uppercase tracking-[0.2em] text-[#F472B6]">
                      {content.identity.locationShort}
                    </p>
                  </div>
                )}

                {/* Smooth Vertical Vignette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-[#110B1F] via-[#110B1F]/70 to-transparent"
                />

                {/* Base Character Emblem with Live Dancing Equalizer Bars */}
                <div className="absolute inset-x-5 bottom-4 z-30 flex items-end justify-between">
                  <div>
                    <p className="font-gaming text-[10px] font-bold uppercase tracking-[0.24em] text-[#F59E0B]">
                      CLASS // ARCHITECT
                    </p>
                    <p className="font-display text-lg font-bold tracking-[0.1em] text-white">
                      {content.identity.fullName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-violet-400/40 bg-[#19112B]/90 px-2.5 py-1.5 font-mono text-[10px] text-[#B8B0C8] backdrop-blur-md">
                    <div className="flex h-3 items-end gap-0.5" aria-hidden="true">
                      <span className="animate-eq-dance h-full w-0.5 rounded-full bg-[#EC4899]" />
                      <span
                        className="animate-eq-dance h-full w-0.5 rounded-full bg-[#F59E0B]"
                        style={{ animationDelay: '0.25s' }}
                      />
                      <span
                        className="animate-eq-dance h-full w-0.5 rounded-full bg-[#A855F7]"
                        style={{ animationDelay: '0.5s' }}
                      />
                      <span
                        className="animate-eq-dance h-full w-0.5 rounded-full bg-[#F472B6]"
                        style={{ animationDelay: '0.75s' }}
                      />
                    </div>
                    <span>128 BPM · CULÉR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Independently Bobbing Mini Collectible Card Accents at Base */}
      <div
        aria-hidden="true"
        className="animate-float-42 pointer-events-none absolute -bottom-1 -left-3 z-20 h-14 w-10 -rotate-12 rounded-md border border-[#F59E0B]/60 bg-gradient-to-br from-[#2B184B] to-[#110B1F] shadow-[0_12px_28px_rgba(0,0,0,0.75)]"
      >
        <div className="flex h-full items-center justify-center">
          <span className="animate-crystal-breath h-2.5 w-2.5 rotate-45 bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="animate-float-36 pointer-events-none absolute bottom-0 -right-2 z-20 h-12 w-9 rotate-12 rounded-md border border-[#EC4899]/60 bg-gradient-to-br from-[#351B5A] to-[#110B1F] shadow-[0_12px_28px_rgba(0,0,0,0.75)]"
      >
        <div className="flex h-full items-center justify-center">
          <span className="animate-crystal-breath h-2.5 w-2.5 rotate-45 bg-[#EC4899] shadow-[0_0_10px_#EC4899]" />
        </div>
      </div>
    </div>
  )
}
