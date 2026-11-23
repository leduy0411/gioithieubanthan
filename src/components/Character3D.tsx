import React, { useEffect, useState, useCallback } from 'react'
import { Zap } from 'lucide-react'
import { content } from '../data/content'
import MechanicalGearCore from './MechanicalGearCore'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

interface Character3DProps {
  fallbackImage?: string
}

/**
 * Character3D — League of Legends Champion Loading Screen & Mastery VII Flair (`Ctrl + 6`)
 */
export default function Character3D({
  fallbackImage = content.identity.avatarUrl,
}: Character3DProps) {
  const [imageTier, setImageTier] = useState<number>(0)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 30 })
  const [unlockTick, setUnlockTick] = useState(0)
  const [overdrive, setOverdrive] = useState(false)

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
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    setTilt({ x: (ny - 0.5) * -12, y: (nx - 0.5) * 12 })
    setGlare({ x: nx * 100, y: ny * 100 })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 30 })
  }

  const handlePortraitClick = useCallback(() => {
    setUnlockTick((t) => t + 1)
    setOverdrive((prev) => !prev)
    playMechanicalUnlock()
  }, [])

  // Iconic League of Legends `Ctrl + 6` Mastery VII Emote Shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '6') {
        e.preventDefault()
        setUnlockTick((t) => t + 1)
        setOverdrive(true)
        playMechanicalUnlock()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      className="group relative mx-auto w-full max-w-[390px] cursor-pointer select-none py-4"
      onPointerEnter={() => playMechanicalTick()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handlePortraitClick}
      role="button"
      tabIndex={0}
      aria-pressed={overdrive}
      aria-label="League of Legends Champion Mastery VII Portrait — Click or press Ctrl+6 to flash Mastery VII"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handlePortraitClick()
        }
      }}
    >
      {/* Breathing Hextech Mana Cyan & Piltover Gold Backlight Aura */}
      <div
        aria-hidden="true"
        className={`animate-aura-breath pointer-events-none absolute -inset-5 rounded-[2rem] blur-2xl transition-opacity duration-500 ${
          overdrive
            ? 'bg-[radial-gradient(circle_at_72%_25%,rgba(10,200,185,0.55)_0%,transparent_55%),radial-gradient(circle_at_24%_70%,rgba(200,155,60,0.52)_0%,transparent_62%)] opacity-100'
            : 'bg-[radial-gradient(circle_at_72%_25%,rgba(200,155,60,0.32)_0%,transparent_52%),radial-gradient(circle_at_24%_70%,rgba(10,200,185,0.28)_0%,transparent_58%)]'
        }`}
      />

      {/* Hextech Mana Sparks around Champion Border */}
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute -left-3 top-12 z-30 h-2.5 w-2.5 rotate-45 bg-[#0AC8B9] shadow-[0_0_14px_#0AC8B9]"
      />
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute -right-3 top-28 z-30 h-2 w-2 rotate-45 bg-[#C89B3C] shadow-[0_0_12px_#C89B3C]"
        style={{ animationDelay: '1.3s' }}
      />
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute right-8 top-0 z-30 h-2 w-2 rotate-45 bg-[#EC4899] shadow-[0_0_12px_#EC4899]"
        style={{ animationDelay: '2.2s' }}
      />
      <span
        aria-hidden="true"
        className="animate-firefly pointer-events-none absolute bottom-16 -left-2 z-30 h-2 w-2 rotate-45 bg-[#0AC8B9] shadow-[0_0_12px_#0AC8B9]"
        style={{ animationDelay: '0.8s' }}
      />

      {/* Levitating LoL Champion Mastery Frame */}
      <div className="animate-card-levitate">
        <div
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1100px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
          }}
        >
          {/* ═════════════════════════════════════════════════════════════ */}
          {/* LEAGUE OF LEGENDS `CTRL + 6` MASTERY TIER VII FLAIR CREST     */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {overdrive && (
            <div
              key={`mastery-flair-${unlockTick}`}
              aria-hidden="true"
              className="animate-mastery-flair pointer-events-none absolute -top-9 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center"
            >
              <svg
                viewBox="0 0 180 62"
                className="h-14 w-44 drop-shadow-[0_0_20px_rgba(10,200,185,0.85)]"
                fill="none"
              >
                {/* Left & Right Unfurling Piltover Gold Mastery Wings */}
                <path
                  d="M 90 38 L 36 16 L 14 22 L 42 42 Z"
                  fill="#C89B3C"
                  stroke="#F0E6D2"
                  strokeWidth="1.2"
                />
                <path
                  d="M 90 38 L 144 16 L 166 22 L 138 42 Z"
                  fill="#C89B3C"
                  stroke="#F0E6D2"
                  strokeWidth="1.2"
                />
                <path
                  d="M 90 44 L 46 28 L 28 34 L 54 48 Z"
                  fill="#785A28"
                  stroke="#C8AA6E"
                  strokeWidth="1"
                />
                <path
                  d="M 90 44 L 134 28 L 152 34 L 126 48 Z"
                  fill="#785A28"
                  stroke="#C8AA6E"
                  strokeWidth="1"
                />
                {/* 3 Top Mastery VII Crown Spikes */}
                <polygon
                  points="90,4 97,20 90,26 83,20"
                  fill="#F0E6D2"
                  stroke="#C89B3C"
                  strokeWidth="1.2"
                />
                <polygon
                  points="68,10 77,23 71,28 64,20"
                  fill="#C89B3C"
                  stroke="#F0E6D2"
                  strokeWidth="1"
                />
                <polygon
                  points="112,10 116,20 109,28 103,23"
                  fill="#C89B3C"
                  stroke="#F0E6D2"
                  strokeWidth="1"
                />
                {/* Central Faceted Mastery VII Hextech Cyan Gem */}
                <polygon
                  points="90,14 106,32 90,52 74,32"
                  fill="#091428"
                  stroke="#F0E6D2"
                  strokeWidth="1.8"
                />
                <polygon
                  points="90,18 102,32 90,47 78,32"
                  fill="#0AC8B9"
                  stroke="#E0F2FE"
                  strokeWidth="1"
                />
                <polygon points="90,18 102,32 90,32" fill="rgba(255,255,255,0.45)" />
              </svg>
              <span className="hextech-chamfer -mt-2 border border-[#F0E6D2] bg-[#091428]/95 px-3 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#0AC8B9] shadow-[0_0_16px_rgba(10,200,185,0.6)]">
                MASTERY VII // CTRL+6
              </span>
            </div>
          )}

          <div className="conic-border-beam relative">
            <div className="relative overflow-hidden rounded-[14px] border border-[#C89B3C]/65 bg-gradient-to-b from-[#0E1B33] via-[#13102A] to-[#090D1A]">
              {/* Expanding Hextech Mana Shockwave Ring on Click / Mastery Flash */}
              {unlockTick > 0 && (
                <div
                  key={`portrait-shockwave-${unlockTick}`}
                  aria-hidden="true"
                  className="animate-hextech-shockwave pointer-events-none absolute left-1/2 top-[42%] z-30 h-56 w-56 rounded-full border-2 border-[#0AC8B9] shadow-[0_0_32px_#0AC8B9,inset_0_0_24px_#C89B3C]"
                />
              )}

              {/* Inner Double Piltover Gold Hairline Frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 z-25 rounded-lg border border-[#C89B3C]/40"
              />

              {/* Dynamic Cursor-Tracked Specular Glass Glare Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(280px circle at ${glare.x.toFixed(1)}% ${glare.y.toFixed(1)}%, rgba(240,230,210,0.22), rgba(10,200,185,0.14) 42%, transparent 75%)`,
                }}
              />

              <div className="holo-foil z-20" aria-hidden="true" />

              {/* Top-Left Live Hextech Status Chip */}
              <div
                className={`hextech-chamfer pointer-events-none absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md transition-colors ${
                  overdrive
                    ? 'border-[#0AC8B9] bg-[#0AC8B9]/25 font-bold text-white shadow-[0_0_14px_rgba(10,200,185,0.5)]'
                    : 'border-[#C89B3C]/50 bg-[#091428]/85 text-[#F0E6D2]'
                }`}
              >
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-[#0AC8B9]" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#0AC8B9]" />
                </span>
                <span>{overdrive ? 'MASTERY VII ACTIVE' : 'MASTERY TIER VII'}</span>
              </div>

              {/* Top-Right Click Boost Rune Pill */}
              <div className="hextech-chamfer pointer-events-none absolute right-4 top-4 z-30 inline-flex items-center gap-1 border border-[#C89B3C]/45 bg-[#091428]/85 px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest text-[#C8AA6E] backdrop-blur-md">
                <Zap size={9} className={overdrive ? 'text-[#0AC8B9]' : 'text-[#C89B3C]'} />
                <span>{overdrive ? '512-D LOCK' : 'FLASH [CTRL+6]'}</span>
              </div>

              {/* Ornate LoL Winged Top-Center Hextech Gem Crest */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-1.5"
              >
                <span className="h-[1.5px] w-10 bg-gradient-to-r from-transparent to-[#C89B3C]" />
                <span className="animate-crystal-breath h-3 w-3 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_14px_#0AC8B9]" />
                <span className="h-[1.5px] w-10 bg-gradient-to-l from-transparent to-[#C89B3C]" />
              </div>

              {/* Piltover Gold Geometric Corner Chevrons */}
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute left-3 top-3 z-30 h-4 w-4 border-l-2 border-t-2 border-[#C89B3C]"
              />
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute right-3 top-3 z-30 h-4 w-4 border-r-2 border-t-2 border-[#C89B3C]"
                style={{ animationDelay: '0.7s' }}
              />
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute bottom-3 left-3 z-30 h-4 w-4 border-b-2 border-l-2 border-[#0AC8B9]"
                style={{ animationDelay: '1.4s' }}
              />
              <span
                aria-hidden="true"
                className="animate-corner-pulse pointer-events-none absolute bottom-3 right-3 z-30 h-4 w-4 border-b-2 border-r-2 border-[#0AC8B9]"
                style={{ animationDelay: '2.1s' }}
              />

              {/* Portrait Stage */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_32%,rgba(10,200,185,0.22)_0%,transparent_50%),radial-gradient(circle_at_30%_55%,rgba(200,155,60,0.26)_0%,transparent_55%)]"
                />

                {overdrive && (
                  <div
                    aria-hidden="true"
                    className="animate-scanline pointer-events-none absolute inset-x-0 top-0 z-25 h-0.5 bg-gradient-to-r from-transparent via-[#0AC8B9] to-transparent shadow-[0_0_16px_#0AC8B9]"
                  />
                )}

                {/* Rotating 5-Layer Hextech Clockwork Halo Mounted Behind Champion Silhouette */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-[38%] z-[5] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    overdrive ? 'scale-105 opacity-90' : 'opacity-50 group-hover:opacity-80'
                  }`}
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
                    className={`relative z-10 h-full w-full object-cover object-top brightness-[0.96] contrast-[1.06] drop-shadow-[0_0_24px_rgba(200,155,60,0.26)] transition-all duration-700 group-hover:scale-[1.03] ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    fetchPriority="high"
                    decoding="async"
                  />
                ) : (
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
                    <p className="font-display text-3xl font-bold tracking-[0.14em] text-[#F0E6D2]">
                      {content.identity.callsign}
                    </p>
                    <p className="mt-2 font-gaming text-xs uppercase tracking-[0.2em] text-[#0AC8B9]">
                      {content.identity.locationShort}
                    </p>
                  </div>
                )}

                {/* LoL Champion Loading Screen Lower Gold & Obsidian Vignette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-[#091428] via-[#091428]/85 to-transparent"
                />

                {/* League of Legends Champion Mastery VII Winged Nameplate */}
                <div className="absolute inset-x-4 bottom-4 z-30">
                  {overdrive && (
                    <div className="hextech-chamfer mb-2 flex items-center justify-between border border-[#0AC8B9]/60 bg-[#091428]/90 px-2.5 py-1 font-mono text-[9px] text-[#0AC8B9] backdrop-blur-md">
                      <span>ARCFACE 512-D · &lt;180MS</span>
                      <span className="text-[#F0E6D2]">PRORES 4K SYNC</span>
                    </div>
                  )}

                  {/* Winged Gold Divider above Champion Name */}
                  <div aria-hidden="true" className="mb-2 flex items-center justify-center gap-1.5">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C89B3C]" />
                    <span className="h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_10px_#0AC8B9]" />
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C89B3C]" />
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-gaming text-[10px] font-bold uppercase tracking-[0.24em] text-[#C89B3C]">
                        CHAMPION // ARCHITECT
                      </p>
                      <p className="font-display text-lg font-extrabold tracking-[0.1em] text-[#F0E6D2]">
                        {content.identity.fullName}
                      </p>
                    </div>
                    <div className="hextech-chamfer flex items-center gap-2 border border-[#C89B3C]/55 bg-[#091428]/90 px-2.5 py-1.5 font-mono text-[10px] text-[#F0E6D2] backdrop-blur-md">
                      <div className="flex h-3 items-end gap-0.5" aria-hidden="true">
                        <span className="animate-eq-dance h-full w-0.5 rounded-full bg-[#0AC8B9]" />
                        <span
                          className="animate-eq-dance h-full w-0.5 rounded-full bg-[#C89B3C]"
                          style={{ animationDelay: '0.25s' }}
                        />
                        <span
                          className="animate-eq-dance h-full w-0.5 rounded-full bg-[#EC4899]"
                          style={{ animationDelay: '0.5s' }}
                        />
                        <span
                          className="animate-eq-dance h-full w-0.5 rounded-full bg-[#F0E6D2]"
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
      </div>

      {/* Twin Floating Hextech Mastery Wing Shards at Base */}
      <div
        aria-hidden="true"
        className="animate-float-42 pointer-events-none absolute -bottom-1 -left-3 z-20 h-14 w-10 -rotate-12 rounded border border-[#C89B3C] bg-gradient-to-br from-[#0E223D] to-[#091428] shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
      >
        <div className="flex h-full items-center justify-center">
          <span className="animate-crystal-breath h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_10px_#0AC8B9]" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="animate-float-36 pointer-events-none absolute bottom-0 -right-2 z-20 h-12 w-9 rotate-12 rounded border border-[#C89B3C] bg-gradient-to-br from-[#2B1548] to-[#091428] shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
      >
        <div className="flex h-full items-center justify-center">
          <span className="animate-crystal-breath h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#EC4899] shadow-[0_0_10px_#EC4899]" />
        </div>
      </div>
    </div>
  )
}
