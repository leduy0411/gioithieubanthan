import React, { useEffect, useState, useCallback } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
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

/**
 * Stylized Project Visual Preview Art with Live Scanline Sweep, Blinking Nodes & Dancing Bars
 */
function CardVisualArt({ project }: { project: ProjectItem }) {
  if (project.previewType === 'biometric-scanner') {
    return (
      <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#190F33] via-[#2B1650] to-[#110B1F] p-3">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#F472B6] to-transparent shadow-[0_0_14px_#EC4899]"
        />
        <svg viewBox="0 0 180 96" className="h-22 w-40 text-[#F472B6]" fill="none" aria-hidden="true">
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
            stroke="#8B5CF6"
            strokeWidth="1.2"
            strokeDasharray="5 4"
            className="animate-slow-spin"
          />
          <line x1="52" y1="28" x2="128" y2="28" stroke="#F59E0B" strokeWidth="0.9" strokeOpacity="0.7" />
          <line x1="90" y1="8" x2="90" y2="88" stroke="#F472B6" strokeWidth="0.8" strokeOpacity="0.6" />
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
              fill="#FFFFFF"
              className="animate-node-blink"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
          ))}
        </svg>
        <span className="absolute bottom-2 right-2.5 rounded bg-[#110B1F]/85 px-2 py-0.5 font-mono text-[9px] text-[#F59E0B]">
          512-D ARCFACE
        </span>
      </div>
    )
  }

  if (project.previewType === 'agentic-pipeline') {
    return (
      <div className="relative flex h-32 w-full flex-col justify-center overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#1B1038] via-[#321959] to-[#110B1F] p-3.5 font-mono text-[10px]">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent shadow-[0_0_12px_#8B5CF6]"
        />
        <p className="text-[#F472B6]">&gt; gemini_2.5.tool_call()</p>
        <p className="mt-1 text-white">search_catalog → strict_json</p>
        <p className="mt-1 text-[#F59E0B]">redis_cart_sync &lt; 2ms [SIM]</p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#EC4899] shadow-[0_0_8px_#EC4899]" />
          <span className="text-[9px] text-[#B8B0C8]">AUTONOMOUS AGENT ONLINE</span>
        </div>
      </div>
    )
  }

  if (project.previewType === 'rate-limiter') {
    return (
      <div className="relative flex h-32 w-full flex-col justify-between overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#1A0F34] via-[#2B174D] to-[#110B1F] p-3">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent shadow-[0_0_12px_#F59E0B]"
        />
        <div className="flex items-center justify-between font-mono text-[9px] text-[#F59E0B]">
          <span>TOKEN BUCKET</span>
          <span className="inline-flex items-center gap-1">
            <span className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            RS256 JWT
          </span>
        </div>
        {/* Live Dancing Throughput Bars */}
        <div className="flex h-14 items-end gap-1.5">
          {[42, 68, 52, 88, 74, 96, 68, 82, 58, 90].map((h, i) => (
            <div
              key={i}
              className="animate-eq-dance w-full rounded-t bg-gradient-to-t from-[#8B5CF6] to-[#EC4899]"
              style={{ height: `${h}%`, animationDelay: `${i * 0.14}s` }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] text-[#B8B0C8]">REDIS CLUSTER · DOCKER</span>
      </div>
    )
  }

  return (
    <div className="relative flex h-32 w-full flex-col justify-between overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#23103E] via-[#3B185B] to-[#110B1F] p-3">
      <div
        aria-hidden="true"
        className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#F472B6] to-transparent shadow-[0_0_12px_#EC4899]"
      />
      <div className="flex items-center justify-between font-mono text-[9px] text-[#F472B6]">
        <span>PRORES 4K MASTER</span>
        <span className="inline-flex items-center gap-1">
          <span className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#EC4899]" />
          128 BPM
        </span>
      </div>
      {/* Live Dancing 4K Audio/Color Waveform */}
      <div className="flex h-14 items-end gap-1">
        {[48, 78, 55, 92, 70, 98, 60, 84, 72, 90, 62, 76].map((h, i) => (
          <div
            key={i}
            className="animate-eq-dance w-full rounded-t bg-gradient-to-t from-[#F59E0B] via-[#EC4899] to-[#A855F7]"
            style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] text-[#B8B0C8]">PS · AI · PR · AE</span>
    </div>
  )
}

/**
 * Single Ornate 3D Flipping Collectible Game Card
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
  const [unlockTick, setUnlockTick] = useState(0)

  const handlePointerEnter = () => {
    playMechanicalTick()
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const maxAngle = isActive ? 10 : 6
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -maxAngle
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * maxAngle
    setTilt({ x: rx, y: ry })
  }

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 })

  const handleCardAction = () => {
    setUnlockTick((t) => t + 1)
    playMechanicalUnlock()
    onClick()
  }

  const displayTitle = SHORT_CARD_TITLES[project.id] || project.title.toUpperCase()
  const badgeNumber = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`

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
          ? `${project.title} — click to flip card`
          : `Bring ${project.title} to center`
      }
      className={`group card-perspective relative mx-auto h-[515px] w-full max-w-[335px] cursor-pointer select-none rounded-2xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80 sm:h-[545px] sm:max-w-[355px] ${isActive
          ? 'z-20 scale-100 opacity-100'
          : 'z-10 scale-[0.86] opacity-65 hover:opacity-92'
        }`}
    >
      {/* Continuous Zero-Gravity Levitation (-10px <-> +10px, out-of-phase on side cards) */}
      <div
        className={`h-full w-full ${isActive ? 'animate-card-levitate' : 'animate-card-levitate-delayed'
          }`}
      >
        {/* Interactive Cursor 3D Tilt Wrapper */}
        <div
          className="h-full w-full transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
          }}
        >
          {/* 700ms 3D Y-Axis Flip Container */}
          <div
            className="card-preserve-3d relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* ═══════════════════════════════════════════════════════ */}
            {/* CARD BACK (5-Layer Hextech Mechanical Clockwork Core)   */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div
              className={`card-backface-hidden absolute inset-0 rounded-2xl ${isActive
                  ? 'conic-border-beam'
                  : 'border-2 border-violet-400/50 shadow-[0_24px_65px_rgba(8,3,18,0.85)]'
                }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-b from-[#331C5E] via-[#1E1138] to-[#130B24] p-4">
                <div className="holo-foil z-20" aria-hidden="true" />

                <div className="relative z-10 flex h-full w-full flex-col items-center justify-between rounded-xl border border-[#EC4899]/40 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.24)_0%,rgba(17,11,31,0.92)_72%)] p-5 sm:p-6">
                  <span className="animate-corner-pulse absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-[#F59E0B]/85" />
                  <span
                    className="animate-corner-pulse absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-[#F59E0B]/85"
                    style={{ animationDelay: '0.6s' }}
                  />
                  <span
                    className="animate-corner-pulse absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#F59E0B]/85"
                    style={{ animationDelay: '1.2s' }}
                  />
                  <span
                    className="animate-corner-pulse absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#F59E0B]/85"
                    style={{ animationDelay: '1.8s' }}
                  />

                  <span className="whitespace-nowrap font-mono text-[11px] tracking-[0.25em] text-[#F472B6]">
                    {badgeNumber}
                  </span>

                  {/* 5-Layer Hextech / Arcane Mechanical Clockwork Centerpiece */}
                  <div className="relative flex flex-col items-center">
                    <MechanicalGearCore
                      variant="full"
                      tiltX={tilt.x}
                      tiltY={tilt.y}
                      unlockTrigger={unlockTick}
                      className="h-44 w-44 sm:h-48 sm:w-48"
                    />

                    <p className="mt-4 whitespace-nowrap font-display text-sm font-bold tracking-[0.22em] text-white">
                      {project.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 whitespace-nowrap font-gaming text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8B0C8]">
                    <RotateCw size={12} className="animate-slow-spin shrink-0 text-[#EC4899]" />
                    <span>{isActive ? 'CLICK TO REVEAL' : 'SELECT CARD'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* CARD FRONT (Orbiting Conic Beam + Holo Foil + Metrics)  */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div
              className={`card-backface-hidden card-rotate-y-180 absolute inset-0 rounded-2xl ${isActive
                  ? 'conic-border-beam'
                  : 'border-2 border-[#EC4899]/65 shadow-[0_28px_75px_rgba(236,72,153,0.28)]'
                }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-b from-[#2A184C] via-[#1C1033] to-[#130B24] p-4">
                <div className="holo-foil z-20" aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col justify-between overflow-hidden rounded-xl border border-violet-300/25 bg-[#150D28]/92 p-4">
                  {/* Subtle Active Mechanical Watermark keeping the active center card mechanically alive */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.22]"
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
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                      <span className="animate-pill-glow shrink-0 whitespace-nowrap rounded border border-[#EC4899]/50 bg-[#EC4899]/18 px-2 py-0.5 font-bold text-[#F472B6]">
                        {badgeNumber}
                      </span>
                      <span className="truncate whitespace-nowrap text-[#F59E0B]">
                        {project.category}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <CardVisualArt project={project} />
                    </div>

                    <h3 className="mt-3 text-center font-gaming text-base font-bold uppercase tracking-[0.06em] text-white sm:text-lg">
                      {displayTitle}
                    </h3>

                    {/* Pro Max 3-Column Live Engineering Telemetry Strip */}
                    <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded border border-violet-400/20 bg-[#110B1F]/80 px-1.5 py-1 text-center"
                        >
                          <p className="truncate font-mono text-[8px] uppercase text-[#B8B0C8]">
                            {m.label}
                          </p>
                          <p className="mt-0.5 truncate font-mono text-[10px] font-bold text-[#FDE68A]">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lower Lavender Translucent Parchment Panel */}
                  <div className="relative z-10 mt-2.5 flex flex-1 flex-col justify-between rounded-lg border border-violet-200/20 bg-[#F3EAFF]/[0.10] p-3 backdrop-blur-[2px]">
                    <p className="line-clamp-3 font-body text-xs leading-relaxed text-[#EFEAF8]">
                      {project.summary}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-violet-300/25 bg-[#110B1F]/75 px-2 py-0.5 font-mono text-[10px] text-[#E9D5FF]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded border border-[#F59E0B]/35 bg-[#F59E0B]/15 px-1.5 py-0.5 font-mono text-[10px] text-[#FDE68A]">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div
                      className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          playMechanicalUnlock()
                          onInspectBlueprint(project)
                        }}
                        className="tactile-btn inline-flex flex-1 items-center justify-center gap-1.5 rounded bg-white py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-[#110B1F] transition-colors hover:bg-[#F472B6] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
                      >
                        <Sparkles size={11} />
                        <span>BLUEPRINT</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tactile-btn inline-flex items-center justify-center gap-1 rounded border border-[#EC4899]/60 bg-[#EC4899]/20 px-2.5 py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#EC4899] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
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
                          className="tactile-btn inline-flex items-center justify-center gap-1.5 rounded border border-white/30 bg-[#110B1F]/75 px-3 py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:border-[#EC4899] hover:text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
                        >
                          <GithubLogo className="h-3 w-3" />
                          <span>SOURCE</span>
                        </a>
                      )}
                    </div>
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
  const [blueprintProject, setBlueprintProject] = useState<ProjectItem | null>(null)

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

  // Pro Max Keyboard Controls: ArrowLeft / ArrowRight to rotate deck, F to flip, Esc to close modal
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
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#110B1F]/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0717]/80 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading glides smoothly with bi-directional scroll */}
        <div
          className="text-center will-change-transform"
          style={{
            transform: 'translate3d(0, calc(var(--p, 0) * 42px), 0)',
            opacity: 'var(--vis, 1)',
          }}
        >
          <p className="font-gaming text-xs font-bold uppercase tracking-[0.24em] text-[#F472B6]">
            COLLECTIBLE DECK // PRODUCTION SYSTEMS
          </p>
          <h2 className="animate-title-shine mt-3 font-display text-3xl font-extrabold uppercase tracking-[0.06em] sm:text-5xl">
            FEATURED ARTIFACTS
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm text-[#B8B0C8] sm:text-base">
            Click side cards or press <kbd className="rounded border border-white/20 bg-[#110B1F]/70 px-1.5 py-0.5 font-mono text-[11px] text-[#FDE68A]">←</kbd>{' '}
            <kbd className="rounded border border-white/20 bg-[#110B1F]/70 px-1.5 py-0.5 font-mono text-[11px] text-[#FDE68A]">→</kbd> to rotate the deck. Click the center card (or press{' '}
            <kbd className="rounded border border-white/20 bg-[#110B1F]/70 px-1.5 py-0.5 font-mono text-[11px] text-[#F472B6]">F</kbd>) to flip, or open{' '}
            <span className="font-semibold text-white">BLUEPRINT</span> for full architecture specs.
          </p>
        </div>

        {/* 3-Card Horizontal Showcase with Bi-Directional Fan-Out */}
        <div
          className="mt-12 grid items-center gap-6 will-change-transform md:grid-cols-3 md:gap-4"
          style={{
            transform: 'skewY(calc(var(--vel, 0) * 1.1deg))',
          }}
        >
          {/* Left Preview Card */}
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
              onInspectBlueprint={setBlueprintProject}
            />
          </div>

          {/* Center Active Card */}
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
              onInspectBlueprint={setBlueprintProject}
            />
          </div>

          {/* Right Preview Card */}
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
              onInspectBlueprint={setBlueprintProject}
            />
          </div>
        </div>

        {/* Carousel Bottom Control Bar */}
        <div
          className="relative z-30 mt-14 flex flex-wrap items-center justify-center gap-6 will-change-transform sm:justify-between"
          style={{
            transform: 'translate3d(0, calc(var(--p, 0) * -12px), 0)',
          }}
        >
          <button
            type="button"
            onClick={handlePrev}
            className="tactile-btn animate-pill-glow inline-flex items-center gap-2 rounded border border-[#EC4899] bg-[#EC4899] px-5 py-2.5 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(236,72,153,0.45)] transition-all hover:scale-105 hover:bg-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <ChevronLeft size={15} aria-hidden="true" />
            <span>PREVIOUS</span>
          </button>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Select project card">
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
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80 ${isCurrent
                      ? 'w-10 bg-[#EC4899] shadow-[0_0_14px_#EC4899]'
                      : 'w-3 bg-white/25 hover:bg-white/55'
                    }`}
                />
              )
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="tactile-btn animate-pill-glow inline-flex items-center gap-2 rounded border border-[#EC4899] bg-[#EC4899] px-5 py-2.5 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(236,72,153,0.45)] transition-all hover:scale-105 hover:bg-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <span>NEXT</span>
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PRO MAX HEXTECH ARCHITECTURE BLUEPRINT INSPECTOR MODAL              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {blueprintProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${blueprintProject.title} Architecture Blueprint`}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#090514]/88 p-4 backdrop-blur-2xl"
          onClick={() => setBlueprintProject(null)}
        >
          <div
            className="conic-border-beam relative max-h-[90vh] w-full max-w-3xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-b from-[#251640] via-[#170E2B] to-[#110B1F] p-6 sm:p-8">
              {/* Background Mechanical Gear Watermark */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 opacity-15"
              >
                <MechanicalGearCore variant="full" unlockTrigger={1} className="h-72 w-72" />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-[#EC4899]/50 bg-[#EC4899]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#F472B6]">
                      {blueprintProject.category}
                    </span>
                    <span className="font-mono text-xs text-[#F59E0B]">
                      {blueprintProject.categoryLabel}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
                    {blueprintProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setBlueprintProject(null)}
                  aria-label="Close Blueprint Inspector"
                  className="tactile-btn inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-[#19112B] text-[#B8B0C8] hover:border-[#EC4899] hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Body Grid */}
              <div className="relative z-10 mt-5 grid gap-6 md:grid-cols-12">
                <div className="md:col-span-5">
                  <CardVisualArt project={blueprintProject} />

                  {/* 3 Detailed Engineering Metrics */}
                  <div className="mt-4 space-y-2">
                    {blueprintProject.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between rounded-lg border border-violet-300/20 bg-[#110B1F]/80 px-3 py-2"
                      >
                        <div>
                          <p className="font-mono text-[10px] uppercase text-[#B8B0C8]">{m.label}</p>
                          <p className="font-mono text-xs font-bold text-white">{m.value}</p>
                        </div>
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${m.isSimulatedOrArchitecture
                              ? 'border border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[#FDE68A]'
                              : 'border border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                            }`}
                        >
                          {m.isSimulatedOrArchitecture ? 'ARCH / SIM' : 'VERIFIED'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-4 md:col-span-7">
                  <div>
                    <div className="flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#F472B6]">
                      <Cpu size={14} />
                      <span>SYSTEM OVERVIEW</span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-[#EFEAF8]">
                      {blueprintProject.summary}
                    </p>

                    <div className="mt-4 flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#F59E0B]">
                      <ShieldCheck size={14} />
                      <span>ARCHITECTURE & PRODUCTION FOCUS</span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-[#B8B0C8]">
                      {blueprintProject.architectureFocus}
                    </p>

                    <div className="mt-4 flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#C084FC]">
                      <Layers size={14} />
                      <span>COMPLETE TECH STACK ({blueprintProject.techStack.length})</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {blueprintProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-violet-300/30 bg-[#110B1F]/85 px-2.5 py-1 font-mono text-xs text-[#E9D5FF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2.5">
                      {blueprintProject.liveUrl ? (
                        <a
                          href={blueprintProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tactile-btn inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 font-gaming text-xs font-bold uppercase tracking-wider text-[#110B1F] hover:bg-[#F472B6] hover:text-white"
                        >
                          <span>OPEN LIVE DEMO</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 font-gaming text-xs font-semibold uppercase tracking-wider text-white/45">
                          LIVE DEMO PENDING
                        </span>
                      )}

                      {blueprintProject.githubUrl && (
                        <a
                          href={blueprintProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tactile-btn inline-flex items-center gap-2 rounded-lg border border-white/30 bg-[#110B1F] px-4 py-2 font-gaming text-xs font-bold uppercase tracking-wider text-white hover:border-[#EC4899] hover:text-[#F472B6]"
                        >
                          <GithubLogo className="h-3.5 w-3.5" />
                          <span>GITHUB REPO</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setBlueprintProject(null)}
                      className="font-mono text-xs text-[#B8B0C8] hover:text-white"
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
