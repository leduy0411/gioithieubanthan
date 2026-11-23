import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, Cpu, Palette, RotateCcw, Server, Sparkles, Terminal } from 'lucide-react'
import { content, HobbyItem } from '../data/content'
import { BarcaShieldIcon, CameraLensIcon, TurntableIcon } from '../components/BrandIcons'
import MechanicalGearCore from '../components/MechanicalGearCore'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { stationStore } from '../store/stationStore'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  backend: Server,
  'ai-vision': Cpu,
  creative: Palette,
}

const SHELL_QUICK_COMMANDS = [
  'help',
  'projects',
  'stack',
  'socials',
  'whoami',
  'time',
  'barca',
  'clear',
] as const

export default function SkillsSection() {
  const sectionRef = useScrollMotion<HTMLElement>()
  const [activeCategoryId, setActiveCategoryId] = useState<'backend' | 'ai-vision' | 'creative'>('backend')
  const [activeHobbyId, setActiveHobbyId] = useState<HobbyItem['id'] | null>(null)
  const [relicUnlockTick, setRelicUnlockTick] = useState(0)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'KERNEL: Le Duy Core v2.6 PRO MAX [Tra Vinh Node / Online]',
    'Click any quick-command chip below or type "help" to inspect telemetry.',
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyPointer, setHistoryPointer] = useState<number>(-1)
  const logsContainerRef = useRef<HTMLDivElement>(null)

  const activeCategory =
    content.skillCategories.find((c) => c.id === activeCategoryId) || content.skillCategories[0]
  const activeHobby = activeHobbyId
    ? content.hobbies.find((h) => h.id === activeHobbyId) || null
    : null
  const ActiveIcon = CATEGORY_ICONS[activeCategory.id] || Server

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
    }
  }, [terminalLogs])

  const executeShellCommand = (rawCmd: string) => {
    const raw = rawCmd.trim()
    const cmd = raw.toLowerCase()
    if (!cmd) return

    playMechanicalTick()
    setCommandHistory((prev) => [...prev, raw])
    setHistoryPointer(-1)

    if (cmd === 'clear') {
      setTerminalLogs([])
      setTerminalInput('')
      return
    }

    let replies: string[] = []
    if (cmd === 'help') {
      replies = ['Available: help, projects, stack, socials, whoami, time, barca, clear']
    } else if (cmd === 'projects') {
      replies = content.projects.map((p, idx) => `  0${idx + 1}. [${p.category}] ${p.title}`)
    } else if (cmd === 'stack') {
      replies = [
        'BACKEND:  Node.js, Express, TypeScript, FastAPI, Python, PostgreSQL, MongoDB, Redis, Docker, RS256 JWT',
        'AI/EDGE:  InsightFace ArcFace 512-d, ONNX Runtime, OpenCV, Gemini 2.5 API Tool Calling, WebSockets',
        'VISUALS:  Adobe Photoshop, Illustrator, Premiere Pro, After Effects (ProRes 4K)',
      ]
    } else if (cmd === 'socials') {
      replies = [
        `  Email      ${content.identity.email}`,
        ...content.socials.map((s) => `  ${s.name.padEnd(10, ' ')} ${s.handle} -> ${s.url}`),
      ]
    } else if (cmd === 'whoami') {
      replies = [
        `${content.identity.fullName} — ${content.identity.primaryRoleShort}`,
        `${content.identity.education.degree}, ${content.identity.education.institution}`,
      ]
    } else if (cmd === 'time') {
      const vnTime = new Date().toLocaleTimeString('en-GB', {
        timeZone: content.identity.timezone,
        hour12: false,
      })
      replies = [`Local Time: ${vnTime} (${content.identity.locationShort} · GMT+7)`]
    } else if (cmd === 'barca') {
      replies = ['FC Barcelona — Més que un club (1899).']
    } else {
      replies = [`Unknown command: "${cmd}". Type "help".`]
    }

    setTerminalLogs((prev) => [...prev, `duy@tra-vinh-core:~$ ${raw}`, ...replies])
    setTerminalInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextPointer =
        historyPointer === -1 ? commandHistory.length - 1 : Math.max(historyPointer - 1, 0)
      setHistoryPointer(nextPointer)
      setTerminalInput(commandHistory[nextPointer] || '')
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (commandHistory.length === 0 || historyPointer === -1) return
      const nextPointer = historyPointer + 1
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1)
        setTerminalInput('')
      } else {
        setHistoryPointer(nextPointer)
        setTerminalInput(commandHistory[nextPointer] || '')
      }
      return
    }

    if (e.key === 'Enter') {
      executeShellCommand(terminalInput)
    }
  }

  const selectHobbyRelic = (hobbyId: HobbyItem['id']) => {
    playMechanicalUnlock()
    setRelicUnlockTick((t) => t + 1)
    setActiveHobbyId((prev) => (prev === hobbyId ? null : hobbyId))
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative flex flex-1 min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden bg-[#130D24] px-5 pt-24 pb-12 sm:px-8"
    >
      {/* Pulsing Arcane Violet Ambient Aura */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.24)_0%,rgba(236,72,153,0.12)_45%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Left Column (7 cols): Strong Counter-Parallax (+52px) & Cascading Skill Rows */}
          <div
            className="will-change-transform lg:col-span-7"
            style={{
              transform: 'translate3d(0, calc(var(--p, 0) * 52px), 0)',
            }}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="animate-node-blink h-2 w-2 rotate-45 bg-[#EC4899] shadow-[0_0_8px_#EC4899]" />
              <p className="font-gaming text-xs font-bold uppercase tracking-[0.22em] text-[#F472B6]">
                CORE ARSENAL // {activeCategory.stationCode}
              </p>
            </div>

            <h2 className="animate-title-shine mt-4 font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-[0.05em] sm:text-5xl">
              SUMMON PRODUCTION SYSTEMS
            </h2>

            <p className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-[#B8B0C8] sm:text-base">
              Merging high-throughput distributed backend engineering, real-time 512-D edge computer
              vision inference, and color-calibrated 4K motion direction into cohesive products.
            </p>

            {/* Interactive Skill Category Tabs with Count Badges */}
            <div
              role="tablist"
              aria-label="Expertise categories"
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {content.skillCategories.map((cat) => {
                const isSelected = cat.id === activeCategoryId
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveCategoryId(cat.id)
                      setActiveHobbyId(null)
                      setRelicUnlockTick((t) => t + 1)
                      playMechanicalUnlock()
                    }}
                    className={`tactile-btn inline-flex items-center gap-2 rounded border px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.14em] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70 ${
                      isSelected
                        ? 'border-[#EC4899] bg-[#EC4899]/22 text-white shadow-[0_0_20px_rgba(236,72,153,0.35)]'
                        : 'border-violet-400/25 bg-[#19112B]/80 text-[#B8B0C8] hover:border-violet-400/55 hover:text-white'
                    }`}
                  >
                    <span>{cat.title.split('&')[0].trim()}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        isSelected
                          ? 'bg-[#EC4899] text-white'
                          : 'bg-white/10 text-[#B8B0C8]'
                      }`}
                    >
                      {cat.skills.length}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Skill Rows: Staggered Bi-Directional Horizontal Scroll Slide + Idle Pulse Dot & Pill + Hover Slide */}
            <div className="mt-6 space-y-3">
              {activeCategory.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className="will-change-transform"
                  style={{
                    transform: `translate3d(calc(var(--ap, 0) * ${-28 - idx * 14}px), calc(var(--p, 0) * ${-10 - idx * 6}px), 0)`,
                    opacity: 'var(--vis, 1)',
                  }}
                >
                  <div
                    onMouseEnter={() => playMechanicalTick()}
                    className="fantasy-card group relative overflow-hidden rounded-xl px-4 py-3.5 transition-all duration-300 hover:translate-x-2 hover:border-[#EC4899]/65 hover:bg-[#22163D]/95"
                  >
                    {/* Glowing Magenta Left Accent Bar lighting up on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-center scale-y-0 bg-[#EC4899] shadow-[0_0_14px_#EC4899] transition-transform duration-300 group-hover:scale-y-100"
                    />
                    <div className="flex items-center justify-between gap-3 pl-1">
                      <span className="inline-flex items-center gap-2.5 font-gaming text-sm font-bold tracking-wide text-white">
                        <span
                          className="animate-node-blink h-1.5 w-1.5 rounded-full bg-[#EC4899]"
                          style={{ animationDelay: `${idx * 0.3}s` }}
                        />
                        {skill.name}
                      </span>
                      <span
                        className="animate-pill-glow shrink-0 rounded bg-[#EC4899]/20 px-2.5 py-0.5 font-mono text-[10px] text-[#F472B6]"
                        style={{ animationDelay: `${idx * 0.35}s` }}
                      >
                        {skill.tag}
                      </span>
                    </div>
                    <p className="mt-1 pl-5 font-body text-xs text-[#B8B0C8]">
                      {skill.productionOutput}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Crisp Solid-White Shimmer CTA + Shell Toggle */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/signal"
                onClick={(e) => {
                  e.preventDefault()
                  playMechanicalUnlock()
                  stationStore.navigate(4)
                }}
                className="tactile-btn group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 font-gaming text-xs font-bold uppercase tracking-[0.2em] text-[#110B1F] shadow-[0_12px_36px_rgba(236,72,153,0.3)] transition-all hover:scale-[1.03] hover:bg-[#FFF5F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80"
              >
                <span
                  aria-hidden="true"
                  className="animate-btn-glint pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#F472B6]/45 to-transparent"
                />
                <span className="relative z-10">INITIATE SIGNAL</span>
                <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
              </a>

              <button
                type="button"
                onClick={() => {
                  playMechanicalUnlock()
                  setShowTerminal((v) => !v)
                }}
                className="tactile-btn inline-flex items-center gap-2 rounded border border-violet-400/40 bg-[#19112B]/80 px-5 py-3.5 font-mono text-xs text-[#B8B0C8] transition-colors hover:border-[#EC4899] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
              >
                <Terminal size={14} className="text-[#F472B6]" />
                <span>{showTerminal ? 'HIDE SHELL' : 'OPEN SHELL'}</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Strong Counter-Parallax (-60px) & 3D Depth Layer Separation */}
          <div
            className="relative mx-auto w-full max-w-[385px] py-14 will-change-transform lg:col-span-5"
            style={{
              transform:
                'perspective(1200px) translate3d(0, calc(var(--p, 0) * -60px), 0) rotateY(calc(var(--p, 0) * -10deg))',
            }}
          >
            {/* Soft Pulsing Violet Aura behind RPG Frame */}
            <div
              aria-hidden="true"
              className="animate-aura-breath pointer-events-none absolute inset-2 rounded-3xl bg-[radial-gradient(circle,rgba(139,92,246,0.4)_0%,rgba(236,72,153,0.16)_52%,transparent_75%)] blur-2xl"
            />

            {/* 6 Frame-Bound Energy Micro-Orbs */}
            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute -left-3 top-6 z-30 h-2.5 w-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_16px_#F59E0B]"
            />
            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute -right-4 top-24 z-30 h-2 w-2 rounded-full bg-[#EC4899] shadow-[0_0_14px_#EC4899]"
              style={{ animationDelay: '1.1s' }}
            />
            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute -left-2 bottom-20 z-30 h-2 w-2 rounded-full bg-[#A855F7] shadow-[0_0_14px_#A855F7]"
              style={{ animationDelay: '2.0s' }}
            />
            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute bottom-4 right-2 z-30 h-2.5 w-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_16px_#F59E0B]"
              style={{ animationDelay: '0.6s' }}
            />

            {/* Gently Levitating Ornate Glowing Vertical RPG Card Frame */}
            <div
              className="group animate-card-levitate"
              onPointerEnter={() => playMechanicalTick()}
            >
              <div className="relative rounded-2xl border-2 border-violet-400/55 bg-gradient-to-b from-[#2A174C]/92 via-[#1B1035]/95 to-[#110B1F] p-6 shadow-[0_0_55px_rgba(139,92,246,0.32)]">
                <span className="animate-corner-pulse pointer-events-none absolute -left-1.5 -top-1.5 h-5 w-5 border-l-2 border-t-2 border-[#F59E0B]" />
                <span className="animate-corner-pulse pointer-events-none absolute -right-1.5 -top-1.5 h-5 w-5 border-r-2 border-t-2 border-[#F59E0B]" />
                <span className="animate-corner-pulse pointer-events-none absolute -bottom-1.5 -left-1.5 h-5 w-5 border-b-2 border-l-2 border-[#EC4899]" />
                <span className="animate-corner-pulse pointer-events-none absolute -bottom-1.5 -right-1.5 h-5 w-5 border-b-2 border-r-2 border-[#EC4899]" />

                {/* TOP BREAK-THE-FRAME LAYER: Stronger 3D Scroll Depth (-55px extra) + Mechanical Gear Halo + Independent Levitation */}
                <div
                  className="relative z-20 -mt-16 flex flex-col items-center will-change-transform"
                  style={{
                    transform: 'translate3d(0, calc(var(--p, 0) * -55px), 0)',
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Compact 5-Layer Hextech Mechanical Gear Halo Rotating Behind Top Icon Badge */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-12 z-0 -translate-x-1/2 -translate-y-1/2"
                    >
                      <MechanicalGearCore
                        variant="halo"
                        unlockTrigger={relicUnlockTick}
                        className="h-44 w-44 opacity-90"
                      />
                    </div>
                    <div className="animate-float-42 relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[#EC4899]/90 bg-gradient-to-br from-[#3A1E68] via-[#241242] to-[#110B1F] shadow-[0_14px_42px_rgba(236,72,153,0.52)]">
                      <ActiveIcon
                        size={38}
                        className="text-white drop-shadow-[0_0_16px_rgba(244,114,182,0.9)]"
                      />
                    </div>
                    <span className="animate-float-36 relative z-10 -mt-2 h-3.5 w-3.5 rotate-45 border border-white bg-[#F59E0B] shadow-[0_0_14px_#F59E0B]" />
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#F472B6]">
                    {activeHobby ? activeHobby.badgeText : activeCategory.stationCode}
                  </p>
                  <h3 className="mt-1 text-center font-display text-lg font-bold uppercase tracking-[0.06em] text-white">
                    {activeHobby ? activeHobby.title : activeCategory.title}
                  </h3>
                </div>

                {/* Center Spec Readout OR Interactive Hobby Dossier inside RPG Frame */}
                <div className="fantasy-card mt-5 rounded-xl p-4 text-center">
                  {activeHobby ? (
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FDE68A]">
                          {activeHobby.subtitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveHobbyId(null)}
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-[#F472B6] hover:text-white"
                        >
                          <RotateCcw size={10} />
                          <span>LAB SPECS</span>
                        </button>
                      </div>
                      <p className="mt-2.5 font-body text-xs leading-relaxed text-[#EFEAF8]">
                        {activeHobby.description}
                      </p>
                      <div className="mt-3 rounded border border-violet-300/25 bg-[#110B1F]/80 px-2.5 py-1.5 font-mono text-[10px] font-bold text-[#F59E0B]">
                        {activeHobby.telemetry}
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-body text-xs leading-relaxed text-[#B8B0C8]">
                        {activeCategory.description}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3.5 font-mono text-[11px]">
                        <div>
                          <p className="text-[9px] uppercase text-[#B8B0C8]">VECTOR CORE</p>
                          <p className="mt-0.5 font-bold text-white">512-D ONNX</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase text-[#B8B0C8]">MASTER OUTPUT</p>
                          <p className="mt-0.5 font-bold text-[#F59E0B]">PRORES 4K</p>
                        </div>
                      </div>
                      <p className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#F472B6]/80">
                        <Sparkles size={10} />
                        <span>Click any bottom relic badge to inspect</span>
                      </p>
                    </>
                  )}
                </div>

                {/* BOTTOM BREAK-THE-FRAME LAYER: Interactive Clickable Hobby Relic Badges */}
                <div
                  className="relative z-20 -mb-14 mt-7 grid grid-cols-3 gap-2.5 will-change-transform"
                  style={{
                    transform: 'translate3d(0, calc(var(--p, 0) * -48px), 0)',
                  }}
                >
                  {/* Badge 1: DJING with Live Equalizer Micro-Bars */}
                  <div
                    className="will-change-transform"
                    style={{
                      transform:
                        'translate3d(calc(var(--ap, 0) * -14px), 0, 0) rotate(calc(-6deg - var(--ap, 0) * 6deg))',
                    }}
                  >
                    <div className="animate-badge-bob" style={{ animationDelay: '0s' }}>
                      <button
                        type="button"
                        onClick={() => selectHobbyRelic('djing')}
                        aria-pressed={activeHobbyId === 'djing'}
                        className={`w-full cursor-pointer rounded-xl border bg-gradient-to-b from-[#2E1A54] to-[#140C26] p-3 text-center shadow-[0_14px_30px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-2 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899] ${
                          activeHobbyId === 'djing'
                            ? 'border-[#38BDF8] shadow-[0_0_24px_rgba(56,189,248,0.45)]'
                            : 'border-violet-300/40 hover:border-[#EC4899]'
                        }`}
                      >
                        <TurntableIcon className="mx-auto h-6 w-6 text-[#F472B6]" />
                        <div
                          className="mx-auto mt-1.5 flex h-2.5 w-8 items-end justify-center gap-0.5"
                          aria-hidden="true"
                        >
                          <span className="animate-eq-dance h-full w-0.5 rounded-full bg-[#EC4899]" />
                          <span
                            className="animate-eq-dance h-full w-0.5 rounded-full bg-[#F59E0B]"
                            style={{ animationDelay: '0.2s' }}
                          />
                          <span
                            className="animate-eq-dance h-full w-0.5 rounded-full bg-[#F472B6]"
                            style={{ animationDelay: '0.45s' }}
                          />
                          <span
                            className="animate-eq-dance h-full w-0.5 rounded-full bg-[#A855F7]"
                            style={{ animationDelay: '0.7s' }}
                          />
                        </div>
                        <p className="mt-1 font-gaming text-[10px] font-bold uppercase text-white">
                          DJING
                        </p>
                        <p className="font-mono text-[9px] text-[#B8B0C8]">128 BPM</p>
                      </button>
                    </div>
                  </div>

                  {/* Badge 2: OPTICS with Slow Spinning Aperture Lens */}
                  <div className="-translate-y-2">
                    <div className="animate-badge-bob" style={{ animationDelay: '0.8s' }}>
                      <button
                        type="button"
                        onClick={() => selectHobbyRelic('photography')}
                        aria-pressed={activeHobbyId === 'photography'}
                        className={`w-full cursor-pointer rounded-xl border bg-gradient-to-b from-[#361E5F] to-[#140C26] p-3 text-center shadow-[0_18px_35px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-2 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] ${
                          activeHobbyId === 'photography'
                            ? 'border-[#FDE68A] shadow-[0_0_24px_rgba(245,158,11,0.55)]'
                            : 'border-[#F59E0B]/60 hover:border-[#F59E0B]'
                        }`}
                      >
                        <CameraLensIcon className="animate-slow-spin mx-auto h-6 w-6 text-[#F59E0B]" />
                        <p className="mt-2 font-gaming text-[10px] font-bold uppercase text-white">
                          OPTICS
                        </p>
                        <p className="font-mono text-[9px] text-[#B8B0C8]">35MM RAW</p>
                      </button>
                    </div>
                  </div>

                  {/* Badge 3: BARÇA */}
                  <div
                    className="will-change-transform"
                    style={{
                      transform:
                        'translate3d(calc(var(--ap, 0) * 14px), 0, 0) rotate(calc(6deg + var(--ap, 0) * 6deg))',
                    }}
                  >
                    <div className="animate-badge-bob" style={{ animationDelay: '1.6s' }}>
                      <button
                        type="button"
                        onClick={() => selectHobbyRelic('barcelona')}
                        aria-pressed={activeHobbyId === 'barcelona'}
                        className={`w-full cursor-pointer rounded-xl border bg-gradient-to-b from-[#2E1A54] to-[#140C26] p-3 text-center shadow-[0_14px_30px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-2 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899] ${
                          activeHobbyId === 'barcelona'
                            ? 'border-[#F472B6] shadow-[0_0_24px_rgba(236,72,153,0.55)]'
                            : 'border-[#EC4899]/50 hover:border-[#EC4899]'
                        }`}
                      >
                        <BarcaShieldIcon className="animate-crystal-breath mx-auto h-6 w-6" />
                        <p className="mt-2 font-gaming text-[10px] font-bold uppercase text-white">
                          BARÇA
                        </p>
                        <p className="font-mono text-[9px] text-[#B8B0C8]">1899</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Max Collapsible Interactive Shell with 1-Click Command Chips */}
        {showTerminal && (
          <div className="mt-16 rounded-2xl border border-violet-400/35 bg-[#0E091A]/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.78)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 font-mono text-xs text-[#B8B0C8]">
              <span className="font-bold text-white">duy@tra-vinh-core:~</span>
              <span className="text-[#F472B6]">INTERACTIVE SHELL · CLICK CHIP OR TYPE</span>
            </div>

            {/* 1-Click Command Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {SHELL_QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeShellCommand(cmd)}
                  className="tactile-btn rounded border border-violet-400/30 bg-[#19112B] px-2.5 py-1 font-mono text-[11px] text-[#E9D5FF] transition-colors hover:border-[#EC4899] hover:bg-[#EC4899]/20 hover:text-white"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div
              ref={logsContainerRef}
              data-scrollable="true"
              className="mt-4 max-h-48 space-y-1.5 overflow-y-auto font-mono text-xs text-[#B8B0C8]"
            >
              {terminalLogs.map((log, i) => (
                <p key={i} className={log.startsWith('duy@') ? 'font-semibold text-white' : ''}>
                  {log}
                </p>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-xs">
              <label htmlFor="fantasy-shell-input" className="shrink-0 font-bold text-[#F472B6]">
                duy@tra-vinh-core:~$
              </label>
              <input
                id="fantasy-shell-input"
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="help, projects, stack, socials, whoami, time, barca, clear"
                className="w-full bg-transparent text-white outline-none placeholder:text-[#B8B0C8]/40"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
