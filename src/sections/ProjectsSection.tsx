import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, RotateCw } from 'lucide-react'
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
      <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#190F33] via-[#2B1650] to-[#110B1F] p-3">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#F472B6] to-transparent shadow-[0_0_14px_#EC4899]"
        />
        <svg viewBox="0 0 180 96" className="h-24 w-44 text-[#F472B6]" fill="none" aria-hidden="true">
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
      <div className="relative flex h-36 w-full flex-col justify-center overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#1B1038] via-[#321959] to-[#110B1F] p-3.5 font-mono text-[10px]">
        <div
          aria-hidden="true"
          className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent shadow-[0_0_12px_#8B5CF6]"
        />
        <p className="text-[#F472B6]">&gt; gemini_2.5.tool_call()</p>
        <p className="mt-1.5 text-white">search_catalog → strict_json</p>
        <p className="mt-1 text-[#F59E0B]">redis_cart_sync &lt; 2ms [SIM]</p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#EC4899] shadow-[0_0_8px_#EC4899]" />
          <span className="text-[9px] text-[#B8B0C8]">AUTONOMOUS AGENT ONLINE</span>
        </div>
      </div>
    )
  }

  if (project.previewType === 'rate-limiter') {
    return (
      <div className="relative flex h-36 w-full flex-col justify-between overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#1A0F34] via-[#2B174D] to-[#110B1F] p-3.5">
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
        <div className="flex h-16 items-end gap-1.5">
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
    <div className="relative flex h-36 w-full flex-col justify-between overflow-hidden rounded-lg border border-violet-300/25 bg-gradient-to-br from-[#23103E] via-[#3B185B] to-[#110B1F] p-3.5">
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
      <div className="flex h-16 items-end gap-1">
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
}: {
  project: ProjectItem
  index: number
  total: number
  isActive: boolean
  isFlipped: boolean
  onClick: () => void
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
      className={`group card-perspective relative mx-auto h-[490px] w-full max-w-[330px] cursor-pointer select-none rounded-2xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80 sm:h-[520px] sm:max-w-[350px] ${
        isActive
          ? 'z-20 scale-100 opacity-100'
          : 'z-10 scale-[0.86] opacity-65 hover:opacity-92'
      }`}
    >
      {/* Continuous Zero-Gravity Levitation (-10px <-> +10px, out-of-phase on side cards) */}
      <div
        className={`h-full w-full ${
          isActive ? 'animate-card-levitate' : 'animate-card-levitate-delayed'
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
            {/* CARD BACK (Spinning Arcane Crest & Breathing Ruby Gem)  */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div
              className={`card-backface-hidden absolute inset-0 rounded-2xl ${
                isActive
                  ? 'conic-border-beam'
                  : 'border-2 border-violet-400/50 shadow-[0_24px_65px_rgba(8,3,18,0.85)]'
              }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-b from-[#331C5E] via-[#1E1138] to-[#130B24] p-4">
                <div className="holo-foil z-20" aria-hidden="true" />

                <div className="relative z-10 flex h-full w-full flex-col items-center justify-between rounded-xl border border-[#EC4899]/40 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.24)_0%,rgba(17,11,31,0.92)_72%)] p-6">
                  <span className="absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-[#F59E0B]/85" />
                  <span className="absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-[#F59E0B]/85" />
                  <span className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#F59E0B]/85" />
                  <span className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#F59E0B]/85" />

                  <span className="font-mono text-[11px] tracking-[0.25em] text-[#F472B6]">
                    {badgeNumber}
                  </span>

                  {/* 5-Layer Hextech / Arcane Mechanical Clockwork Centerpiece */}
                  <div className="relative flex flex-col items-center">
                    <MechanicalGearCore
                      variant="full"
                      tiltX={tilt.x}
                      tiltY={tilt.y}
                      unlockTrigger={unlockTick}
                      className="h-52 w-52 sm:h-56 sm:w-56"
                    />

                    <p className="mt-3 font-display text-sm font-bold tracking-[0.22em] text-white">
                      {project.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-gaming text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8B0C8]">
                    <RotateCw size={12} className="animate-slow-spin text-[#EC4899]" />
                    <span>{isActive ? 'CLICK TO REVEAL' : 'SELECT CARD'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* CARD FRONT (Orbiting Conic Beam + Periodic Holo Foil)   */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div
              className={`card-backface-hidden card-rotate-y-180 absolute inset-0 rounded-2xl ${
                isActive
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
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                      <span className="animate-pill-glow rounded border border-[#EC4899]/50 bg-[#EC4899]/18 px-2 py-0.5 font-bold text-[#F472B6]">
                        {badgeNumber}
                      </span>
                      <span className="text-[#F59E0B]">{project.category}</span>
                    </div>

                    <div className="mt-3">
                      <CardVisualArt project={project} />
                    </div>

                    <h3 className="mt-4 text-center font-gaming text-lg font-bold uppercase tracking-[0.06em] text-white">
                      {displayTitle}
                    </h3>
                  </div>

                  {/* Lower Lavender Translucent Parchment Panel */}
                  <div className="relative z-10 mt-3 flex flex-1 flex-col justify-between rounded-lg border border-violet-200/20 bg-[#F3EAFF]/[0.10] p-3.5 backdrop-blur-[2px]">
                    <p className="line-clamp-4 font-body text-xs leading-relaxed text-[#EFEAF8]">
                      {project.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-violet-300/25 bg-[#110B1F]/75 px-2 py-0.5 font-mono text-[10px] text-[#E9D5FF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div
                      className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1 rounded bg-white py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-[#110B1F] hover:bg-[#F472B6] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
                        >
                          <span>LIVE DEMO</span>
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span
                          title="Live deployment URL pending"
                          className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded border border-white/15 bg-white/[0.04] py-1.5 font-gaming text-[10px] font-semibold uppercase tracking-wider text-white/45"
                        >
                          DEMO PENDING
                        </span>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded border border-white/30 bg-[#110B1F]/75 px-3 py-1.5 font-gaming text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:border-[#EC4899] hover:text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
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

  useEffect(() => {
    if (selectedProjectIndex !== null && selectedProjectIndex >= 0 && selectedProjectIndex < total) {
      setActiveIndex(selectedProjectIndex)
      setCenterFlipped(true)
      stationStore.clearSelectedProject()
    }
  }, [selectedProjectIndex, total])

  const prevIndex = (activeIndex - 1 + total) % total
  const nextIndex = (activeIndex + 1) % total

  const goToIndex = (targetIdx: number) => {
    setActiveIndex(targetIdx)
    setCenterFlipped(true)
  }

  const handlePrev = () => goToIndex(prevIndex)
  const handleNext = () => goToIndex(nextIndex)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="diamond-pattern-bg relative flex flex-1 min-h-[calc(100vh-5.5rem)] flex-col justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#110B1F]/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0717]/80 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
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
            Click side cards or arrows to rotate the deck. Click the center card to flip between
            crest and technical specifications.
          </p>
        </div>

        {/* 3-Card Horizontal Showcase with Bi-Directional Fan-Out */}
        <div
          className="mt-14 grid items-center gap-6 will-change-transform md:grid-cols-3 md:gap-4"
          style={{
            transform: 'skewY(calc(var(--vel, 0) * 1.1deg))',
          }}
        >
          {/* Left Preview Card: Swings cleanly from +110px & -12deg tilt into place */}
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
            />
          </div>

          {/* Center Active Card: Perfectly vertically aligned with side cards, rises smoothly on scroll */}
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
            />
          </div>

          {/* Right Preview Card: Swings cleanly from -110px & +12deg tilt into place */}
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
            />
          </div>
        </div>

        {/* Carousel Bottom Control Bar (Generous spacing & elevated z-30 so cards never collide) */}
        <div
          className="relative z-30 mt-16 flex flex-wrap items-center justify-center gap-6 will-change-transform sm:justify-between"
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
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80 ${
                    isCurrent
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
    </section>
  )
}
