import React, { useEffect, useState, useCallback } from 'react'
import {
  Activity,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  LayoutGrid,
  Layers,
  RotateCw,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { content, ProjectItem } from '../data/content'
import { GithubLogo } from '../components/BrandIcons'
import MechanicalGearCore from '../components/MechanicalGearCore'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { useActiveSection } from '../hooks/useActiveSection'
import { stationStore } from '../store/stationStore'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

const SHORT_CARD_TITLES: Record<string, string> = {
  'ai-attendance': 'AI BIOMETRIC ATTENDANCE',
  'gemini-ecommerce': 'GEMINI AGENT E-COMMERCE',
  'microservices-gateway': 'MICROSERVICES API GATEWAY',
  'creative-direction-suite': 'CINEMATIC 4K MOTION SUITE',
}

const ARTIFACT_RARITY_TIERS: Record<
  string,
  { tier: string; gemColor: string; glowColor: string }
> = {
  'ai-attendance': {
    tier: 'HEXTECH MYTHIC',
    gemColor: '#0AC8B9',
    glowColor: 'rgba(10,200,185,0.85)',
  },
  'gemini-ecommerce': {
    tier: 'ULTIMATE TIER',
    gemColor: '#F0E6D2',
    glowColor: 'rgba(200,155,60,0.9)',
  },
  'microservices-gateway': {
    tier: 'PRESTIGE EDITION',
    gemColor: '#C89B3C',
    glowColor: 'rgba(200,155,60,0.85)',
  },
  'creative-direction-suite': {
    tier: 'ARCANE LEGENDARY',
    gemColor: '#EC4899',
    glowColor: 'rgba(236,72,153,0.85)',
  },
}

/**
 * Stylized Hextech Project Visual Schematic with Live Scanline Sweep, Blinking Nodes & Dancing Bars
 */
function CardVisualArt({ project }: { project: ProjectItem }) {
  if (project.previewType === 'biometric-scanner') {
    return (
      <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded border border-[#C89B3C]/45 bg-gradient-to-br from-[#091428] via-[#131B38] to-[#090D1A] p-3 shadow-[inset_0_0_18px_rgba(10,200,185,0.15)]">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#0AC8B9] to-transparent shadow-[0_0_14px_#0AC8B9]"
        />
        <svg viewBox="0 0 180 96" className="h-22 w-40 text-[#0AC8B9]" fill="none" aria-hidden="true">
          <polygon
            points="90,8 128,28 118,74 90,88 62,74 52,28"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />
          <circle
            cx="90"
            cy="48"
            r="26"
            stroke="#C89B3C"
            strokeWidth="1.2"
            strokeDasharray="5 4"
            className="animate-slow-spin"
          />
          <line x1="52" y1="28" x2="128" y2="28" stroke="#C89B3C" strokeWidth="0.9" strokeOpacity="0.75" />
          <line x1="90" y1="8" x2="90" y2="88" stroke="#0AC8B9" strokeWidth="0.8" strokeOpacity="0.65" />
          {[
            [90, 8],
            [128, 28],
            [118, 74],
            [90, 88],
            [62, 74],
            [52, 28],
            [75, 38],
            [105, 38],
            [90, 52],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="2.6"
              fill="#F0E6D2"
              className="animate-node-blink"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
          ))}
        </svg>
        <span className="absolute bottom-2 right-2.5 rounded border border-[#C89B3C]/40 bg-[#091428]/90 px-2 py-0.5 font-mono text-[9px] text-[#F0E6D2]">
          512-D ARCFACE
        </span>
      </div>
    )
  }

  if (project.previewType === 'agentic-pipeline') {
    return (
      <div className="relative flex h-32 w-full flex-col justify-center overflow-hidden rounded border border-[#C89B3C]/45 bg-gradient-to-br from-[#091428] via-[#1B1438] to-[#090D1A] p-3.5 font-mono text-[10px] shadow-[inset_0_0_18px_rgba(10,200,185,0.15)]">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#0AC8B9] to-transparent shadow-[0_0_12px_#0AC8B9]"
        />
        <p className="text-[#0AC8B9]">&gt; gemini_2.5.tool_call()</p>
        <p className="mt-1 text-[#F0E6D2]">search_catalog → strict_json</p>
        <p className="mt-1 text-[#C89B3C]">redis_cart_sync &lt; 2ms [SIM]</p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#0AC8B9] shadow-[0_0_8px_#0AC8B9]" />
          <span className="text-[9px] text-[#C8AA6E]">HEXTECH AGENT ONLINE</span>
        </div>
      </div>
    )
  }

  if (project.previewType === 'rate-limiter') {
    return (
      <div className="relative flex h-32 w-full flex-col justify-between overflow-hidden rounded border border-[#C89B3C]/45 bg-gradient-to-br from-[#091428] via-[#142038] to-[#090D1A] p-3 shadow-[inset_0_0_18px_rgba(200,155,60,0.15)]">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent shadow-[0_0_12px_#C89B3C]"
        />
        <div className="flex items-center justify-between font-mono text-[9px] text-[#F0E6D2]">
          <span>TOKEN BUCKET</span>
          <span className="inline-flex items-center gap-1 text-[#0AC8B9]">
            <span className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#0AC8B9]" />
            RS256 JWT
          </span>
        </div>
        <div className="flex h-14 items-end gap-1.5">
          {[42, 68, 52, 88, 74, 96, 68, 82, 58, 90].map((h, i) => (
            <div
              key={i}
              className="animate-eq-dance w-full rounded-t bg-gradient-to-t from-[#C89B3C] via-[#0AC8B9] to-[#F0E6D2]"
              style={{ height: `${h}%`, animationDelay: `${i * 0.14}s` }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] text-[#C8AA6E]">REDIS CLUSTER · DOCKER</span>
      </div>
    )
  }

  return (
    <div className="relative flex h-32 w-full flex-col justify-between overflow-hidden rounded border border-[#C89B3C]/45 bg-gradient-to-br from-[#0E1832] via-[#281542] to-[#090D1A] p-3 shadow-[inset_0_0_18px_rgba(236,72,153,0.15)]">
      <div
        aria-hidden="true"
        className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#EC4899] to-transparent shadow-[0_0_12px_#EC4899]"
      />
      <div className="flex items-center justify-between font-mono text-[9px] text-[#F0E6D2]">
        <span>PRORES 4K MASTER</span>
        <span className="inline-flex items-center gap-1 text-[#0AC8B9]">
          <span className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#0AC8B9]" />
          128 BPM
        </span>
      </div>
      <div className="flex h-14 items-end gap-1">
        {[48, 78, 55, 92, 70, 98, 60, 84, 72, 90, 62, 76].map((h, i) => (
          <div
            key={i}
            className="animate-eq-dance w-full rounded-t bg-gradient-to-t from-[#C89B3C] via-[#EC4899] to-[#0AC8B9]"
            style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] text-[#C8AA6E]">PS · AI · PR · AE</span>
    </div>
  )
}

/**
 * Single Legends of Runeterra / Hextech Crafting Mythic Artifact Card
 */
function CollectibleGameCard({
  project,
  index,
  total,
  isActive,
  isFlipped,
  onClick,
  onInspectBlueprint,
}: {
  project: ProjectItem
  index: number
  total: number
  isActive: boolean
  isFlipped: boolean
  onClick: () => void
  onInspectBlueprint: (project: ProjectItem) => void
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 25 })
  const [unlockTick, setUnlockTick] = useState(0)

  const handlePointerEnter = () => {
    playMechanicalTick()
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const maxAngle = isActive ? 10 : 6
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    setTilt({ x: (ny - 0.5) * -maxAngle, y: (nx - 0.5) * maxAngle })
    setGlare({ x: nx * 100, y: ny * 100 })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 25 })
  }

  const handleCardAction = () => {
    setUnlockTick((t) => t + 1)
    playMechanicalUnlock()
    onClick()
  }

  const displayTitle = SHORT_CARD_TITLES[project.id] || project.title.toUpperCase()
  const badgeNumber = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
  const rarity = ARTIFACT_RARITY_TIERS[project.id] || ARTIFACT_RARITY_TIERS['ai-attendance']

  return (
    <div
      onClick={handleCardAction}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardAction()
        }
      }}
      aria-label={
        isActive
          ? `${project.title} — click to flip Hextech card`
          : `Bring ${project.title} to center`
      }
      className={`group card-perspective relative mx-auto h-[520px] w-full max-w-[335px] cursor-pointer select-none rounded-2xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] sm:h-[550px] sm:max-w-[355px] ${
        isActive
          ? 'z-20 scale-100 opacity-100'
          : 'z-10 scale-[0.86] opacity-70 hover:opacity-95'
      }`}
    >
      {/* Piltover Hextech Loot Preview Tooltip on Side Cards (Appears on Hover) */}
      {!isActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 z-40 w-72 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-250 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <div className="hextech-chamfer border border-[#C89B3C] bg-[#091428]/96 px-3.5 py-2 text-center shadow-[0_12px_30px_rgba(0,0,0,0.95)] backdrop-blur-md">
            <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-[#0AC8B9]">
              <span
                className="h-2 w-2 rotate-45 border border-white"
                style={{ backgroundColor: rarity.gemColor }}
              />
              <span>{rarity.tier}</span>
              <span>·</span>
              <span className="text-[#C89B3C]">
                {project.metrics[0]?.value || project.category}
              </span>
            </div>
            <p className="mt-0.5 truncate font-display text-xs font-extrabold tracking-wider text-[#F0E6D2]">
              {displayTitle}
            </p>
          </div>
        </div>
      )}

      <div
        className={`h-full w-full ${
          isActive ? 'animate-card-levitate' : 'animate-card-levitate-delayed'
        }`}
      >
        <div
          className="h-full w-full transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
          }}
        >
          <div
            className="card-preserve-3d relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* ═══════════════════════════════════════════════════════ */}
            {/* CARD BACK: PILTOVER HEXTECH CRAFTING CLOCKWORK BACK     */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div
              className={`card-backface-hidden absolute inset-0 rounded-2xl ${
                isActive
                  ? 'conic-border-beam'
                  : 'border-2 border-[#C89B3C]/70 shadow-[0_24px_65px_rgba(5,4,14,0.9)]'
              }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-b from-[#0E1E38] via-[#13112B] to-[#080B16] p-3.5">
                {/* Cursor-Tracked Specular Glare */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(240px circle at ${glare.x.toFixed(1)}% ${glare.y.toFixed(1)}%, rgba(240,230,210,0.22), rgba(10,200,185,0.14) 45%, transparent 75%)`,
                  }}
                />
                <div className="holo-foil z-20" aria-hidden="true" />

                {/* Double-Beveled Piltover Gold Inner Sanctum */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-between rounded-xl border-2 border-[#C89B3C]/65 bg-[radial-gradient(circle_at_50%_45%,rgba(10,200,185,0.18)_0%,rgba(9,16,32,0.95)_72%)] p-5 shadow-[inset_0_0_24px_rgba(200,155,60,0.18)]">
                  {/* Inner Fine Gold Hairline */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-1.5 rounded-lg border border-[#F0E6D2]/20"
                  />

                  {/* 4 Piltover Gold Art-Deco Corner Brackets */}
                  <span className="animate-corner-pulse absolute left-2.5 top-2.5 h-4 w-4 border-l-2 border-t-2 border-[#F0E6D2]" />
                  <span
                    className="animate-corner-pulse absolute right-2.5 top-2.5 h-4 w-4 border-r-2 border-t-2 border-[#F0E6D2]"
                    style={{ animationDelay: '0.6s' }}
                  />
                  <span
                    className="animate-corner-pulse absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 border-[#0AC8B9]"
                    style={{ animationDelay: '1.2s' }}
                  />
                  <span
                    className="animate-corner-pulse absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-[#0AC8B9]"
                    style={{ animationDelay: '1.8s' }}
                  />

                  {/* Top LoL Winged Mana Crest */}
                  <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C89B3C]" />
                    <span className="whitespace-nowrap rounded border border-[#C89B3C]/60 bg-[#091428] px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.22em] text-[#F0E6D2]">
                      {badgeNumber}
                    </span>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C89B3C]" />
                  </div>

                  {/* 5-Layer Piltover Hextech Clockwork Centerpiece */}
                  <div className="relative flex flex-col items-center">
                    <MechanicalGearCore
                      variant="full"
                      tiltX={tilt.x}
                      tiltY={tilt.y}
                      unlockTrigger={unlockTick}
                      className="h-44 w-44 sm:h-48 sm:w-48"
                    />

                    {/* Winged Gold Category Plate */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#C89B3C]" />
                      <p className="whitespace-nowrap font-display text-sm font-extrabold tracking-[0.22em] text-[#F0E6D2]">
                        {project.category}
                      </p>
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#C89B3C]" />
                    </div>
                  </div>

                  {/* Bottom Hextech Unlock Prompt */}
                  <div className="flex items-center gap-2 whitespace-nowrap font-gaming text-[11px] font-bold uppercase tracking-[0.2em] text-[#0AC8B9]">
                    <RotateCw size={12} className="animate-slow-spin shrink-0 text-[#C89B3C]" />
                    <span>{isActive ? 'UNLOCK ARTIFACT' : 'SELECT CARD'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* CARD FRONT: LEGENDS OF RUNETERRA MYTHIC CHAMPION CARD   */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div
              className={`card-backface-hidden card-rotate-y-180 absolute inset-0 rounded-2xl ${
                isActive
                  ? 'conic-border-beam'
                  : 'border-2 border-[#C89B3C]/80 shadow-[0_28px_75px_rgba(10,200,185,0.25)]'
              }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-b from-[#0E1E38] via-[#13112A] to-[#080B16] p-3.5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(250px circle at ${glare.x.toFixed(1)}% ${glare.y.toFixed(1)}%, rgba(240,230,210,0.2), rgba(10,200,185,0.14) 45%, transparent 76%)`,
                  }}
                />
                <div className="holo-foil z-20" aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col justify-between overflow-hidden rounded-xl border-2 border-[#C89B3C]/65 bg-[#0B1022]/94 p-3.5 shadow-[inset_0_0_24px_rgba(200,155,60,0.14)]">
                  {/* Legends of Runeterra Level-Up / Hextech Unlock Shockwave Ring */}
                  {unlockTick > 0 && (
                    <div
                      key={`card-shockwave-${unlockTick}`}
                      aria-hidden="true"
                      className="animate-hextech-shockwave pointer-events-none absolute left-1/2 top-1/2 z-30 h-52 w-52 rounded-full border-2 border-[#0AC8B9] shadow-[0_0_28px_#0AC8B9,inset_0_0_18px_#C89B3C]"
                    />
                  )}

                  {/* 4 Piltover Art-Deco Corner Filigrees on Card Front */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1.5 top-1.5 z-20 h-3 w-3 border-l-2 border-t-2 border-[#C89B3C]/80"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-1.5 top-1.5 z-20 h-3 w-3 border-r-2 border-t-2 border-[#C89B3C]/80"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1.5 left-1.5 z-20 h-3 w-3 border-b-2 border-l-2 border-[#0AC8B9]/75"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1.5 right-1.5 z-20 h-3 w-3 border-b-2 border-r-2 border-[#0AC8B9]/75"
                  />

                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.14] transition-opacity duration-500 group-hover:opacity-[0.25]"
                    >
                      <MechanicalGearCore
                        variant="watermark"
                        tiltX={tilt.x * 0.6}
                        tiltY={tilt.y * 0.6}
                        unlockTrigger={unlockTick}
                        className="h-64 w-64"
                      />
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Top Legends of Runeterra Mana Crystal & Skin Tier Gem */}
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                      <span className="hextech-chamfer inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border border-[#0AC8B9]/65 bg-[#091428] px-2.5 py-0.5 font-bold text-[#0AC8B9] shadow-[0_0_10px_rgba(10,200,185,0.25)]">
                        <span className="h-1.5 w-1.5 rotate-45 bg-[#0AC8B9]" />
                        {badgeNumber}
                      </span>
                      <span className="inline-flex items-center gap-1.5 truncate whitespace-nowrap font-mono text-[9px] font-bold text-[#F0E6D2]">
                        <span
                          className="h-2 w-2 rotate-45 border border-white"
                          style={{
                            backgroundColor: rarity.gemColor,
                            boxShadow: `0 0 8px ${rarity.glowColor}`,
                          }}
                        />
                        {rarity.tier}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <CardVisualArt project={project} />
                    </div>

                    {/* LoR Gold-Beveled Champion Nameplate Banner */}
                    <div className="mt-2.5 rounded border border-[#C89B3C]/55 bg-gradient-to-r from-[#091428] via-[#1B1838] to-[#091428] px-2.5 py-1.5 text-center shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                      <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.07em] text-[#F0E6D2] sm:text-[15px]">
                        {displayTitle}
                      </h3>
                    </div>

                    {/* 3 Hextech Telemetry Stat Runes */}
                    <div className="mt-2 grid grid-cols-3 gap-1.5">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded border border-[#C89B3C]/35 bg-[#091428]/85 px-1.5 py-1 text-center"
                        >
                          <p className="truncate font-mono text-[8px] uppercase text-[#C8AA6E]">
                            {m.label}
                          </p>
                          <p className="mt-0.5 truncate font-mono text-[10px] font-bold text-[#0AC8B9]">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lower Piltover Lore & Rune Socket Panel */}
                  <div className="relative z-10 mt-2 flex flex-1 flex-col justify-between rounded-lg border border-[#C89B3C]/30 bg-[#091428]/75 p-3 backdrop-blur-[2px]">
                    <p className="line-clamp-3 font-body text-xs leading-relaxed text-[#E2E8F0]">
                      {project.summary}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-[#C89B3C]/35 bg-[#110B1F]/85 px-2 py-0.5 font-mono text-[10px] text-[#F0E6D2]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded border border-[#0AC8B9]/45 bg-[#0AC8B9]/15 px-1.5 py-0.5 font-mono text-[10px] text-[#0AC8B9]">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div
                      className="mt-2.5 flex items-center gap-2 border-t border-[#C89B3C]/25 pt-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          playMechanicalUnlock()
                          onInspectBlueprint(project)
                        }}
                        className="hextech-btn tactile-btn inline-flex flex-1 items-center justify-center gap-1.5 rounded py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
                      >
                        <Sparkles size={11} className="text-[#0AC8B9]" />
                        <span>BLUEPRINT</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tactile-btn inline-flex items-center justify-center gap-1 rounded border border-[#0AC8B9]/60 bg-[#0AC8B9]/20 px-2.5 py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#0AC8B9]"
                        >
                          <span>DEMO</span>
                          <ExternalLink size={10} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tactile-btn inline-flex items-center justify-center gap-1.5 rounded border border-[#C89B3C]/50 bg-[#091428] px-3 py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-[#F0E6D2] transition-colors hover:border-[#0AC8B9] hover:text-[#0AC8B9]"
                        >
                          <GithubLogo className="h-3 w-3" />
                          <span>SOURCE</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom Center LoR Mythic Gemstone Emblem */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1 left-1/2 z-20 -translate-x-1/2"
                  >
                    <span className="block h-2 w-2 rotate-45 border border-[#F0E6D2] bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useScrollMotion<HTMLElement>()
  const { selectedProjectIndex } = useActiveSection()
  const total = content.projects.length
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    selectedProjectIndex !== null && selectedProjectIndex >= 0 && selectedProjectIndex < total
      ? selectedProjectIndex
      : 0
  )
  const [centerFlipped, setCenterFlipped] = useState<boolean>(true)
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck')
  const [gridFlipped, setGridFlipped] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(content.projects.map((p) => [p.id, true]))
  )
  const [blueprintProject, setBlueprintProject] = useState<ProjectItem | null>(null)
  const [benchmarkDone, setBenchmarkDone] = useState(false)
  const [benchmarkRunning, setBenchmarkRunning] = useState(false)

  useEffect(() => {
    if (selectedProjectIndex !== null && selectedProjectIndex >= 0 && selectedProjectIndex < total) {
      setActiveIndex(selectedProjectIndex)
      setCenterFlipped(true)
      stationStore.clearSelectedProject()
    }
  }, [selectedProjectIndex, total])

  const prevIndex = (activeIndex - 1 + total) % total
  const nextIndex = (activeIndex + 1) % total

  const goToIndex = useCallback((targetIdx: number) => {
    playMechanicalUnlock()
    setActiveIndex(targetIdx)
    setCenterFlipped(true)
  }, [])

  const handlePrev = useCallback(() => goToIndex(prevIndex), [goToIndex, prevIndex])
  const handleNext = useCallback(() => goToIndex(nextIndex), [goToIndex, nextIndex])

  const openBlueprint = (proj: ProjectItem) => {
    setBenchmarkDone(false)
    setBenchmarkRunning(false)
    setBlueprintProject(proj)
  }

  const runLiveBenchmark = () => {
    playMechanicalUnlock()
    setBenchmarkRunning(true)
    setBenchmarkDone(false)
    window.setTimeout(() => {
      playMechanicalUnlock()
      setBenchmarkRunning(false)
      setBenchmarkDone(true)
    }, 650)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return

      if (blueprintProject) {
        if (e.key === 'Escape') {
          setBlueprintProject(null)
        }
        return
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault()
        playMechanicalUnlock()
        setCenterFlipped((f) => !f)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [blueprintProject, handlePrev, handleNext])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="diamond-pattern-bg relative flex flex-1 min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden px-5 pt-24 pb-10 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#110B1F]/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0717]/85 to-transparent"
      />

      {/* League of Legends Hextech Rune Constellation Background Star-Chart */}
      <svg
        viewBox="0 0 1200 680"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-55"
        fill="none"
      >
        {/* Outer Celestial Astrolabe Rings */}
        <circle
          cx="600"
          cy="370"
          r="295"
          stroke="#C89B3C"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray="10 8"
          className="animate-slow-spin"
        />
        <circle
          cx="600"
          cy="370"
          r="235"
          stroke="#0AC8B9"
          strokeWidth="0.9"
          strokeOpacity="0.3"
          strokeDasharray="18 10"
          className="animate-slow-spin-reverse"
        />
        {/* Left Wing Constellation Lines */}
        <polyline
          points="95,150 215,105 335,175 260,310 125,380 225,520"
          stroke="#0AC8B9"
          strokeWidth="1.3"
          strokeOpacity="0.65"
          strokeDasharray="8 5"
          className="animate-packet-flow"
        />
        <line x1="215" y1="105" x2="260" y2="310" stroke="#C89B3C" strokeWidth="0.9" strokeOpacity="0.45" />
        {/* Right Wing Constellation Lines */}
        <polyline
          points="1105,150 985,105 865,175 940,310 1075,380 975,520"
          stroke="#C89B3C"
          strokeWidth="1.3"
          strokeOpacity="0.65"
          strokeDasharray="8 5"
          className="animate-packet-flow"
        />
        <line x1="985" y1="105" x2="940" y2="310" stroke="#0AC8B9" strokeWidth="0.9" strokeOpacity="0.45" />
        {/* Bridging Arcane Leylines to Center Vault */}
        <line x1="335" y1="175" x2="600" y2="95" stroke="#C89B3C" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="5 5" />
        <line x1="865" y1="175" x2="600" y2="95" stroke="#0AC8B9" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="5 5" />
        {/* Glowing Constellation Star Nodes */}
        {[
          [95, 150],
          [215, 105],
          [335, 175],
          [260, 310],
          [125, 380],
          [225, 520],
          [600, 95],
          [1105, 150],
          [985, 105],
          [865, 175],
          [940, 310],
          [1075, 380],
          [975, 520],
        ].map(([cx, cy], idx) => (
          <g key={idx}>
            <circle
              cx={cx}
              cy={cy}
              r="7"
              stroke={idx % 2 === 0 ? '#0AC8B9' : '#C89B3C'}
              strokeWidth="0.9"
              strokeOpacity="0.55"
            />
            <circle
              cx={cx}
              cy={cy}
              r="3"
              fill={idx % 2 === 0 ? '#0AC8B9' : '#F0E6D2'}
              className="animate-node-blink"
              style={{ animationDelay: `${idx * 0.25}s` }}
            />
          </g>
        ))}
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading + Hextech Deck/Vault View Mode Toggle */}
        <div
          className="text-center will-change-transform"
          style={{
            transform: 'translate3d(0, calc(var(--p, 0) * 42px), 0)',
            opacity: 'var(--vis, 1)',
          }}
        >
          <p className="font-gaming text-xs font-bold uppercase tracking-[0.24em] text-[#0AC8B9]">
            HEXTECH CRAFTING VAULT // MYTHIC ARTIFACTS
          </p>
          <h2 className="animate-title-shine mt-2 font-display text-3xl font-extrabold uppercase tracking-[0.06em] sm:text-5xl">
            FEATURED ARTIFACTS
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-sm text-[#B8B0C8] sm:text-base">
            Click side cards or press{' '}
            <kbd className="rounded border border-[#C89B3C]/45 bg-[#091428] px-1.5 py-0.5 font-mono text-[11px] text-[#F0E6D2]">
              ←
            </kbd>{' '}
            <kbd className="rounded border border-[#C89B3C]/45 bg-[#091428] px-1.5 py-0.5 font-mono text-[11px] text-[#F0E6D2]">
              →
            </kbd>{' '}
            to rotate the Hextech vault. Click any card (or press{' '}
            <kbd className="rounded border border-[#0AC8B9]/45 bg-[#091428] px-1.5 py-0.5 font-mono text-[11px] text-[#0AC8B9]">
              F
            </kbd>
            ) to flip between Piltover clockwork and technical specs.
          </p>

          {/* Hextech View Mode Switcher Pill */}
          <div className="mt-4 inline-flex items-center gap-1 rounded border border-[#C89B3C]/50 bg-[#091428]/90 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                playMechanicalTick()
                setViewMode('deck')
              }}
              className={`inline-flex items-center gap-1.5 rounded px-3.5 py-1 font-gaming text-[11px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'deck'
                  ? 'border border-[#F0E6D2]/60 bg-gradient-to-r from-[#C89B3C] to-[#936A25] text-[#091428] shadow-[0_0_14px_rgba(200,155,60,0.45)]'
                  : 'text-[#B8B0C8] hover:text-[#F0E6D2]'
              }`}
            >
              <Layers size={12} />
              <span>3D VAULT DECK</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playMechanicalTick()
                setViewMode('grid')
              }}
              className={`inline-flex items-center gap-1.5 rounded px-3.5 py-1 font-gaming text-[11px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'border border-[#F0E6D2]/60 bg-gradient-to-r from-[#C89B3C] to-[#936A25] text-[#091428] shadow-[0_0_14px_rgba(200,155,60,0.45)]'
                  : 'text-[#B8B0C8] hover:text-[#F0E6D2]'
              }`}
            >
              <LayoutGrid size={12} />
              <span>ALL 4 ARTIFACTS</span>
            </button>
          </div>
        </div>

        {viewMode === 'deck' ? (
          <>
            <div
              className="mt-10 grid items-center gap-6 will-change-transform md:grid-cols-3 md:gap-4"
              style={{
                transform: 'skewY(calc(var(--vel, 0) * 1.1deg))',
              }}
            >
              <div
                className="hidden will-change-transform md:block"
                style={{
                  transform:
                    'translate3d(calc(var(--ap, 0) * 110px), calc(var(--p, 0) * 28px), 0) rotate(calc(-3deg + var(--ap, 0) * -10deg)) scale(calc(1 - var(--ap, 0) * 0.14))',
                }}
              >
                <CollectibleGameCard
                  project={content.projects[prevIndex]}
                  index={prevIndex}
                  total={total}
                  isActive={false}
                  isFlipped={false}
                  onClick={handlePrev}
                  onInspectBlueprint={openBlueprint}
                />
              </div>

              <div
                className="will-change-transform"
                style={{
                  transform:
                    'perspective(1200px) translate3d(0, calc(var(--p, 0) * -28px), 0) scale(calc(1.02 - var(--ap, 0) * 0.12)) rotateX(calc(var(--p, 0) * -8deg))',
                }}
              >
                <CollectibleGameCard
                  project={content.projects[activeIndex]}
                  index={activeIndex}
                  total={total}
                  isActive={true}
                  isFlipped={centerFlipped}
                  onClick={() => setCenterFlipped((f) => !f)}
                  onInspectBlueprint={openBlueprint}
                />
              </div>

              <div
                className="hidden will-change-transform md:block"
                style={{
                  transform:
                    'translate3d(calc(var(--ap, 0) * -110px), calc(var(--p, 0) * 28px), 0) rotate(calc(3deg + var(--ap, 0) * 10deg)) scale(calc(1 - var(--ap, 0) * 0.14))',
                }}
              >
                <CollectibleGameCard
                  project={content.projects[nextIndex]}
                  index={nextIndex}
                  total={total}
                  isActive={false}
                  isFlipped={false}
                  onClick={handleNext}
                  onInspectBlueprint={openBlueprint}
                />
              </div>
            </div>

            {/* Carousel Bottom Control Bar */}
            <div
              className="relative z-30 mt-12 flex flex-wrap items-center justify-center gap-6 will-change-transform sm:justify-between"
              style={{
                transform: 'translate3d(0, calc(var(--p, 0) * -12px), 0)',
              }}
            >
              <button
                type="button"
                onClick={handlePrev}
                className="hextech-btn tactile-btn inline-flex items-center gap-2 rounded px-5 py-2.5 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
              >
                <ChevronLeft size={15} className="text-[#0AC8B9]" aria-hidden="true" />
                <span>PREVIOUS</span>
              </button>

              <div className="flex items-center gap-3" role="tablist" aria-label="Select project card">
                {content.projects.map((p, idx) => {
                  const isCurrent = idx === activeIndex
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`View card ${idx + 1}: ${p.title}`}
                      onClick={() => goToIndex(idx)}
                      className={`rotate-45 border transition-all duration-300 focus:outline-none ${
                        isCurrent
                          ? 'h-3.5 w-3.5 border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_14px_#0AC8B9]'
                          : 'h-2.5 w-2.5 border-[#C89B3C]/60 bg-[#091428] hover:border-[#F0E6D2]'
                      }`}
                    />
                  )
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="hextech-btn tactile-btn inline-flex items-center gap-2 rounded px-5 py-2.5 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
              >
                <span>NEXT</span>
                <ChevronRight size={15} className="text-[#0AC8B9]" aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.projects.map((proj, idx) => (
              <CollectibleGameCard
                key={proj.id}
                project={proj}
                index={idx}
                total={total}
                isActive={true}
                isFlipped={gridFlipped[proj.id] ?? true}
                onClick={() =>
                  setGridFlipped((prev) => ({
                    ...prev,
                    [proj.id]: !(prev[proj.id] ?? true),
                  }))
                }
                onInspectBlueprint={openBlueprint}
              />
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PILTOVER HEXTECH ARCHITECTURE BLUEPRINT INSPECTOR MODAL             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {blueprintProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${blueprintProject.title} Architecture Blueprint`}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060813]/90 p-4 backdrop-blur-2xl"
          onClick={() => setBlueprintProject(null)}
        >
          <div
            className="conic-border-beam relative max-h-[90vh] w-full max-w-3xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-[14px] border border-[#C89B3C]/65 bg-gradient-to-b from-[#0E1E38] via-[#13112A] to-[#090D1A] p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 opacity-20"
              >
                <MechanicalGearCore variant="full" unlockTrigger={1} className="h-72 w-72" />
              </div>

              <div className="relative z-10 flex items-start justify-between gap-4 border-b border-[#C89B3C]/30 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-[#0AC8B9]/60 bg-[#0AC8B9]/18 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0AC8B9]">
                      {blueprintProject.category}
                    </span>
                    <span className="font-mono text-xs text-[#C89B3C]">
                      {blueprintProject.categoryLabel}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-wide text-[#F0E6D2] sm:text-2xl">
                    {blueprintProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setBlueprintProject(null)}
                  aria-label="Close Blueprint Inspector"
                  className="tactile-btn inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#C89B3C]/50 bg-[#091428] text-[#F0E6D2] hover:border-[#0AC8B9] hover:text-[#0AC8B9]"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="relative z-10 mt-5 grid gap-6 md:grid-cols-12">
                <div className="md:col-span-5">
                  <CardVisualArt project={blueprintProject} />

                  {/* Live Benchmark Diagnostic Simulator */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C8AA6E]">
                      HEXTECH DIAGNOSTICS
                    </span>
                    <button
                      type="button"
                      onClick={runLiveBenchmark}
                      disabled={benchmarkRunning}
                      className="tactile-btn inline-flex items-center gap-1 rounded border border-[#0AC8B9]/60 bg-[#0AC8B9]/18 px-2.5 py-1 font-mono text-[9px] font-bold uppercase text-[#0AC8B9] hover:bg-[#0AC8B9] hover:text-[#091428]"
                    >
                      <Activity size={10} className={benchmarkRunning ? 'animate-spin' : ''} />
                      <span>
                        {benchmarkRunning
                          ? 'PROBING...'
                          : benchmarkDone
                            ? 'RE-RUN TEST'
                            : 'RUN BENCHMARK'}
                      </span>
                    </button>
                  </div>

                  <div className="mt-2.5 space-y-2">
                    {blueprintProject.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded border border-[#C89B3C]/35 bg-[#091428]/85 px-3 py-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-mono text-[10px] uppercase text-[#C8AA6E]">
                              {m.label}
                            </p>
                            <p className="font-mono text-xs font-bold text-[#F0E6D2]">{m.value}</p>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                              benchmarkDone
                                ? 'border border-[#0AC8B9]/60 bg-[#0AC8B9]/20 text-[#0AC8B9]'
                                : m.isSimulatedOrArchitecture
                                  ? 'border border-[#C89B3C]/50 bg-[#C89B3C]/18 text-[#F0E6D2]'
                                  : 'border border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                            }`}
                          >
                            {benchmarkDone && <CheckCircle2 size={10} />}
                            {benchmarkDone
                              ? 'PASS'
                              : m.isSimulatedOrArchitecture
                                ? 'ARCH / SIM'
                                : 'VERIFIED'}
                          </span>
                        </div>
                        {(benchmarkRunning || benchmarkDone) && (
                          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full bg-gradient-to-r from-[#C89B3C] via-[#0AC8B9] to-[#F0E6D2] transition-all duration-500 ${
                                benchmarkDone ? 'w-full' : 'w-2/3 animate-pulse'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-4 md:col-span-7">
                  <div>
                    <div className="flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#0AC8B9]">
                      <Cpu size={14} />
                      <span>SYSTEM OVERVIEW</span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-[#E2E8F0]">
                      {blueprintProject.summary}
                    </p>

                    <div className="mt-4 flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#C89B3C]">
                      <ShieldCheck size={14} />
                      <span>ARCHITECTURE & PRODUCTION FOCUS</span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-[#B8B0C8]">
                      {blueprintProject.architectureFocus}
                    </p>

                    <div className="mt-4 flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#F0E6D2]">
                      <Layers size={14} />
                      <span>EQUIPPED TECH RUNES ({blueprintProject.techStack.length})</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {blueprintProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-[#C89B3C]/45 bg-[#091428] px-2.5 py-1 font-mono text-xs text-[#F0E6D2]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#C89B3C]/30 pt-4">
                    <div className="flex items-center gap-2.5">
                      {blueprintProject.liveUrl ? (
                        <a
                          href={blueprintProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hextech-btn tactile-btn inline-flex items-center gap-1.5 rounded px-4 py-2 font-gaming text-xs font-bold uppercase tracking-wider text-[#F0E6D2]"
                        >
                          <span>OPEN LIVE DEMO</span>
                          <ExternalLink size={13} className="text-[#0AC8B9]" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded border border-white/15 bg-white/[0.04] px-3.5 py-2 font-gaming text-xs font-semibold uppercase tracking-wider text-white/45">
                          LIVE DEMO PENDING
                        </span>
                      )}

                      {blueprintProject.githubUrl && (
                        <a
                          href={blueprintProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hextech-btn tactile-btn inline-flex items-center gap-2 rounded px-4 py-2 font-gaming text-xs font-bold uppercase tracking-wider text-[#F0E6D2]"
                        >
                          <GithubLogo className="h-3.5 w-3.5 text-[#0AC8B9]" />
                          <span>GITHUB REPO</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setBlueprintProject(null)}
                      className="font-mono text-xs text-[#C8AA6E] hover:text-white"
                    >
                      ESC TO CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
