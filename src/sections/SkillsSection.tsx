import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, Cpu, Palette, RotateCcw, Server, Sparkles, Terminal } from 'lucide-react'
import { content, HobbyItem, SkillItem } from '../data/content'
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

const RUNE_PATH_TITLES: Record<string, { pathName: string; color: string }> = {
  backend: { pathName: 'PRECISION PATH // BACKEND', color: '#C89B3C' },
  'ai-vision': { pathName: 'SORCERY PATH // AI & VISION', color: '#0AC8B9' },
  creative: { pathName: 'DOMINATION PATH // 4K VISUALS', color: '#EC4899' },
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
  const [equippedSkill, setEquippedSkill] = useState<SkillItem | null>(null)
  const [relicUnlockTick, setRelicUnlockTick] = useState(0)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'HEXTECH KERNEL: Piltover Core v2.7 [Tra Vinh Node / Online]',
    'Click any quick-rune chip below or type "help" to inspect telemetry.',
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
  const activeRuneMeta = RUNE_PATH_TITLES[activeCategory.id] || RUNE_PATH_TITLES.backend

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
        'PRECISION (BACKEND): Node.js, Express, TypeScript, FastAPI, Python, PostgreSQL, MongoDB, Redis, Docker',
        'SORCERY (AI/EDGE):   InsightFace ArcFace 512-d, ONNX Runtime, OpenCV, Gemini 2.5 Tool Calling',
        'DOMINATION (4K VFX): Adobe Photoshop, Illustrator, Premiere Pro, After Effects (ProRes 4K)',
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

    setTerminalLogs((prev) => [...prev, `duy@piltover-core:~$ ${raw}`, ...replies])
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
    setEquippedSkill(null)
    setActiveHobbyId((prev) => (prev === hobbyId ? null : hobbyId))
  }

  const equipSkillModule = (skill: SkillItem) => {
    playMechanicalUnlock()
    setRelicUnlockTick((t) => t + 1)
    setActiveHobbyId(null)
    setEquippedSkill((prev) => (prev?.name === skill.name ? null : skill))
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative flex flex-1 min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden bg-[#0D0A1C] px-5 pt-24 pb-12 sm:px-8"
    >
      {/* Pulsing Hextech Mana Cyan & Gold Ambient Aura */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,200,185,0.22)_0%,rgba(200,155,60,0.14)_45%,transparent_70%)] blur-3xl"
      />

      {/* Full-Section Runes Reforged Celestial Constellation Star-Chart Background */}
      <svg
        viewBox="0 0 1200 720"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-70"
        fill="none"
      >
        <circle
          cx="860"
          cy="360"
          r="290"
          stroke={activeRuneMeta.color}
          strokeWidth="1.2"
          strokeOpacity="0.45"
          strokeDasharray="12 8"
          className="animate-slow-spin"
        />
        <circle
          cx="860"
          cy="360"
          r="235"
          stroke="#0AC8B9"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="20 10"
          className="animate-slow-spin-reverse"
        />
        {/* Outer Constellation Star-Chart Lines */}
        <polyline
          points="560,110 710,65 860,48 1030,85 1135,215 1145,385 1075,545 860,645 645,565 555,415 560,110"
          stroke="#C89B3C"
          strokeWidth="1.35"
          strokeOpacity="0.65"
          strokeDasharray="9 5"
          className="animate-packet-flow"
        />
        <polyline
          points="710,65 860,360 1135,215 860,645 555,415 860,360 1075,545"
          stroke="#0AC8B9"
          strokeWidth="1.15"
          strokeOpacity="0.55"
          strokeDasharray="6 6"
          className="animate-packet-flow"
        />
        {[
          [560, 110],
          [710, 65],
          [860, 48],
          [1030, 85],
          [1135, 215],
          [1145, 385],
          [1075, 545],
          [860, 645],
          [645, 565],
          [555, 415],
        ].map(([cx, cy], idx) => (
          <g key={idx}>
            <circle
              cx={cx}
              cy={cy}
              r="8"
              stroke={idx % 2 === 0 ? '#0AC8B9' : '#C89B3C'}
              strokeWidth="1.1"
              strokeOpacity="0.7"
            />
            <circle
              cx={cx}
              cy={cy}
              r="3.5"
              fill={idx % 2 === 0 ? '#0AC8B9' : '#F0E6D2'}
              className="animate-node-blink"
              style={{ animationDelay: `${idx * 0.22}s` }}
            />
          </g>
        ))}
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left Column (7 cols): League of Legends "Runes Reforged" Skill Tree */}
          <div
            className="will-change-transform lg:col-span-7"
            style={{
              transform: 'translate3d(0, calc(var(--p, 0) * 52px), 0)',
            }}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="animate-node-blink h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_10px_#0AC8B9]" />
              <p className="font-gaming text-xs font-bold uppercase tracking-[0.22em] text-[#0AC8B9]">
                RUNES REFORGED // {activeRuneMeta.pathName}
              </p>
            </div>

            <h2 className="animate-title-shine mt-3 font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-[0.05em] sm:text-5xl">
              HEXTECH RUNE FORGE
            </h2>

            <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-[#B8B0C8] sm:text-base">
              Select a primary Hextech Rune Path below, then socket any production rune into the
              Keystone Relic Forge to inspect its architectural deliverable.
            </p>

            {/* 3 League of Legends Rune Path Selector Tabs */}
            <div
              role="tablist"
              aria-label="Runes Reforged Paths"
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {content.skillCategories.map((cat) => {
                const isSelected = cat.id === activeCategoryId
                const meta = RUNE_PATH_TITLES[cat.id]
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveCategoryId(cat.id)
                      setActiveHobbyId(null)
                      setEquippedSkill(null)
                      setRelicUnlockTick((t) => t + 1)
                      playMechanicalUnlock()
                    }}
                    className={`tactile-btn inline-flex items-center gap-2 rounded border px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.14em] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] ${
                      isSelected
                        ? 'border-[#F0E6D2] bg-gradient-to-r from-[#C89B3C]/30 via-[#0AC8B9]/25 to-[#091428] text-[#F0E6D2] shadow-[0_0_22px_rgba(200,155,60,0.38)]'
                        : 'border-[#C89B3C]/35 bg-[#091428]/80 text-[#B8B0C8] hover:border-[#C89B3C] hover:text-[#F0E6D2]'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rotate-45"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span>{cat.title.split('&')[0].trim()}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        isSelected
                          ? 'bg-[#C89B3C] font-bold text-[#091428]'
                          : 'bg-white/10 text-[#C8AA6E]'
                      }`}
                    >
                      {cat.skills.length}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Live SVG Hextech Mana Conduit Pipeline */}
            <div className="mt-4 flex items-center justify-between rounded border border-[#C89B3C]/35 bg-[#091428]/85 px-3.5 py-2 font-mono text-[10px] text-[#C8AA6E]">
              <span className="text-[#F0E6D2]">MANA CONDUIT // {activeCategory.stationCode}</span>
              <svg viewBox="0 0 180 14" className="hidden h-3.5 w-40 sm:block" fill="none" aria-hidden="true">
                <line
                  x1="8"
                  y1="7"
                  x2="172"
                  y2="7"
                  stroke="#0AC8B9"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                  className="animate-packet-flow"
                />
                {[12, 64, 116, 168].map((cx, i) => (
                  <circle
                    key={cx}
                    cx={cx}
                    cy="7"
                    r="3"
                    fill={i % 2 === 0 ? '#C89B3C' : '#0AC8B9'}
                    className="animate-node-blink"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </svg>
              <span className="text-[#0AC8B9]">SOCKET RUNE ★</span>
            </div>

            {/* Runes Reforged Connected Skill Tree Nodes */}
            <div className="relative mt-4 space-y-2.5 pl-6">
              {/* Vertical Glowing Hextech Gold & Cyan Conduit Line connecting all Rune Nodes */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 left-2 top-4 w-0.5 bg-gradient-to-b from-[#C89B3C] via-[#0AC8B9] to-[#C89B3C] shadow-[0_0_10px_#0AC8B9]"
              />

              {activeCategory.skills.map((skill, idx) => {
                const isEquipped = equippedSkill?.name === skill.name
                return (
                  <div
                    key={skill.name}
                    className="relative will-change-transform"
                    style={{
                      transform: `translate3d(calc(var(--ap, 0) * ${-28 - idx * 14}px), calc(var(--p, 0) * ${-10 - idx * 6}px), 0)`,
                      opacity: 'var(--vis, 1)',
                    }}
                  >
                    {/* Socketed LoL Rune Node on the Vertical Conduit */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -left-[21px] top-1/2 z-10 h-3 w-3 -translate-y-1/2 rotate-45 border transition-all duration-300 ${
                        isEquipped
                          ? 'scale-125 border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_14px_#0AC8B9]'
                          : 'border-[#C89B3C] bg-[#091428]'
                      }`}
                    />

                    <button
                      type="button"
                      onMouseEnter={() => playMechanicalTick()}
                      onClick={() => equipSkillModule(skill)}
                      aria-pressed={isEquipped}
                      className={`fantasy-card group relative w-full overflow-hidden rounded-xl px-4 py-3 text-left transition-all duration-300 hover:translate-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] ${
                        isEquipped
                          ? 'border-[#0AC8B9] bg-[#0E2238] shadow-[0_0_24px_rgba(10,200,185,0.3)]'
                          : 'hover:border-[#C89B3C]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-y-0 left-0 w-1 origin-center transition-transform duration-300 ${
                          isEquipped
                            ? 'scale-y-100 bg-[#0AC8B9] shadow-[0_0_14px_#0AC8B9]'
                            : 'scale-y-0 bg-[#C89B3C] shadow-[0_0_14px_#C89B3C] group-hover:scale-y-100'
                        }`}
                      />
                      <div className="flex items-center justify-between gap-3 pl-1">
                        <span className="inline-flex items-center gap-2.5 font-gaming text-sm font-bold tracking-wide text-[#F0E6D2]">
                          <span
                            className={`animate-node-blink h-1.5 w-1.5 rotate-45 ${
                              isEquipped ? 'bg-[#0AC8B9]' : 'bg-[#C89B3C]'
                            }`}
                            style={{ animationDelay: `${idx * 0.3}s` }}
                          />
                          {skill.name}
                        </span>
                        <span
                          className={`animate-pill-glow shrink-0 rounded border px-2.5 py-0.5 font-mono text-[10px] ${
                            isEquipped
                              ? 'border-[#0AC8B9]/60 bg-[#0AC8B9]/25 font-bold text-[#E0F2FE]'
                              : 'border-[#C89B3C]/40 bg-[#091428] text-[#C8AA6E]'
                          }`}
                          style={{ animationDelay: `${idx * 0.35}s` }}
                        >
                          {isEquipped ? 'KEYSTONE ACTIVE ★' : skill.tag}
                        </span>
                      </div>
                      <p className="mt-1 pl-5 font-body text-xs text-[#B8B0C8]">
                        {skill.productionOutput}
                      </p>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Action CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="/signal"
                onClick={(e) => {
                  e.preventDefault()
                  playMechanicalUnlock()
                  stationStore.navigate(4)
                }}
                className="hextech-play-btn tactile-btn group relative inline-flex items-center gap-2.5 overflow-hidden px-7 py-3.5 font-gaming text-xs font-extrabold uppercase tracking-[0.2em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
              >
                <span
                  aria-hidden="true"
                  className="animate-btn-glint pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />
                <span className="relative z-10">OPEN HEXGATE SIGNAL</span>
                <ArrowRight size={14} aria-hidden="true" className="relative z-10" />
              </a>

              <button
                type="button"
                onClick={() => {
                  playMechanicalUnlock()
                  setShowTerminal((v) => !v)
                }}
                className="hextech-btn tactile-btn inline-flex items-center gap-2 rounded px-5 py-3.5 font-mono text-xs text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
              >
                <Terminal size={14} className="text-[#0AC8B9]" />
                <span>{showTerminal ? 'HIDE HEXTECH CONSOLE' : 'HEXTECH CONSOLE'}</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): League of Legends Keystone Relic Forge Card */}
          <div
            className="relative mx-auto w-full max-w-[385px] py-14 will-change-transform lg:col-span-5"
            style={{
              transform:
                'perspective(1200px) translate3d(0, calc(var(--p, 0) * -60px), 0) rotateY(calc(var(--p, 0) * -10deg))',
            }}
          >
            <div
              aria-hidden="true"
              className="animate-aura-breath pointer-events-none absolute inset-2 rounded-3xl bg-[radial-gradient(circle,rgba(10,200,185,0.32)_0%,rgba(200,155,60,0.22)_52%,transparent_75%)] blur-2xl"
            />

            {/* Runes Reforged SVG Constellation Circuit Map behind Keystone Card */}
            <svg
              viewBox="0 0 360 460"
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 z-0 h-[calc(100%+2rem)] w-[calc(100%+2rem)] opacity-55"
              fill="none"
            >
              <circle
                cx="180"
                cy="115"
                r="102"
                stroke={activeRuneMeta.color}
                strokeWidth="1"
                strokeDasharray="6 6"
                className="animate-slow-spin"
              />
              <polygon
                points="180,10 330,115 285,420 75,420 30,115"
                stroke="#C89B3C"
                strokeWidth="0.85"
                strokeOpacity="0.45"
                strokeDasharray="10 6"
                className="animate-packet-flow"
              />
              <line
                x1="30"
                y1="115"
                x2="330"
                y2="115"
                stroke="#0AC8B9"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              <line
                x1="180"
                y1="10"
                x2="180"
                y2="445"
                stroke="#C89B3C"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              {[
                [180, 10],
                [330, 115],
                [285, 420],
                [75, 420],
                [30, 115],
              ].map(([cx, cy], idx) => (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="3.2"
                  fill={idx % 2 === 0 ? '#0AC8B9' : '#C89B3C'}
                  className="animate-node-blink"
                  style={{ animationDelay: `${idx * 0.35}s` }}
                />
              ))}
            </svg>

            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute -left-3 top-6 z-30 h-2.5 w-2.5 rotate-45 bg-[#0AC8B9] shadow-[0_0_16px_#0AC8B9]"
            />
            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute -right-4 top-24 z-30 h-2 w-2 rotate-45 bg-[#C89B3C] shadow-[0_0_14px_#C89B3C]"
              style={{ animationDelay: '1.1s' }}
            />
            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute -left-2 bottom-20 z-30 h-2 w-2 rotate-45 bg-[#EC4899] shadow-[0_0_14px_#EC4899]"
              style={{ animationDelay: '2.0s' }}
            />
            <span
              aria-hidden="true"
              className="animate-firefly pointer-events-none absolute bottom-4 right-2 z-30 h-2.5 w-2.5 rotate-45 bg-[#C89B3C] shadow-[0_0_16px_#C89B3C]"
              style={{ animationDelay: '0.6s' }}
            />

            {/* Gently Levitating Piltover Keystone Forge Frame */}
            <div
              className="group animate-card-levitate"
              onPointerEnter={() => playMechanicalTick()}
            >
              <div className="relative rounded-2xl border-2 border-[#C89B3C]/80 bg-gradient-to-b from-[#0E1E38]/95 via-[#13112B]/96 to-[#080B16] p-6 shadow-[0_0_55px_rgba(10,200,185,0.25)]">
                {/* Hextech Mana Shockwave Ring when socketing a new Keystone Rune */}
                {relicUnlockTick > 0 && (
                  <div
                    key={`keystone-shockwave-${relicUnlockTick}`}
                    aria-hidden="true"
                    className="animate-hextech-shockwave pointer-events-none absolute left-1/2 top-16 z-30 h-48 w-48 rounded-full border-2 border-[#0AC8B9] shadow-[0_0_28px_#0AC8B9,inset_0_0_18px_#C89B3C]"
                  />
                )}
                <span className="animate-corner-pulse pointer-events-none absolute -left-1.5 -top-1.5 h-5 w-5 border-l-2 border-t-2 border-[#F0E6D2]" />
                <span className="animate-corner-pulse pointer-events-none absolute -right-1.5 -top-1.5 h-5 w-5 border-r-2 border-t-2 border-[#F0E6D2]" />
                <span className="animate-corner-pulse pointer-events-none absolute -bottom-1.5 -left-1.5 h-5 w-5 border-b-2 border-l-2 border-[#0AC8B9]" />
                <span className="animate-corner-pulse pointer-events-none absolute -bottom-1.5 -right-1.5 h-5 w-5 border-b-2 border-r-2 border-[#0AC8B9]" />

                {/* TOP BREAK-THE-FRAME KEYSTONE LAYER */}
                <div
                  className="relative z-20 -mt-16 flex flex-col items-center will-change-transform"
                  style={{
                    transform: 'translate3d(0, calc(var(--p, 0) * -55px), 0)',
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-12 z-0 -translate-x-1/2 -translate-y-1/2"
                    >
                      <MechanicalGearCore
                        variant="halo"
                        unlockTrigger={relicUnlockTick}
                        className="h-44 w-44 opacity-95"
                      />
                    </div>
                    <div className="animate-float-42 relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[#F0E6D2] bg-gradient-to-br from-[#132C4E] via-[#1B1438] to-[#091428] shadow-[0_14px_42px_rgba(10,200,185,0.48)]">
                      <ActiveIcon
                        size={38}
                        className="text-[#F0E6D2] drop-shadow-[0_0_16px_rgba(10,200,185,0.95)]"
                      />
                    </div>
                    <span className="animate-float-36 relative z-10 -mt-2 h-3.5 w-3.5 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_14px_#0AC8B9]" />
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#0AC8B9]">
                    {activeHobby
                      ? activeHobby.badgeText
                      : equippedSkill
                        ? `KEYSTONE // ${equippedSkill.tag}`
                        : activeCategory.stationCode}
                  </p>
                  <h3 className="mt-1 text-center font-display text-lg font-extrabold uppercase tracking-[0.06em] text-[#F0E6D2]">
                    {activeHobby
                      ? activeHobby.title
                      : equippedSkill
                        ? equippedSkill.name
                        : activeCategory.title}
                  </h3>
                </div>

                {/* Interactive Runes Reforged Constellation Star Map inside Keystone Card */}
                <div className="mt-4 rounded-xl border border-[#C89B3C]/45 bg-[#070B18]/90 p-3">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#C8AA6E]">
                    <span>RUNE CONSTELLATION // {activeCategory.id.toUpperCase()}</span>
                    <span className="text-[#0AC8B9]">CLICK STAR NODE</span>
                  </div>
                  <svg
                    viewBox="0 0 280 96"
                    className="mt-1.5 h-24 w-full"
                    fill="none"
                    role="img"
                    aria-label="Interactive Runes Reforged Constellation Map"
                  >
                    {/* Background Astrolabe Arcs */}
                    <circle
                      cx="140"
                      cy="48"
                      r="42"
                      stroke="#C89B3C"
                      strokeWidth="0.8"
                      strokeOpacity="0.35"
                      strokeDasharray="4 4"
                      className="animate-slow-spin"
                    />
                    {/* Constellation Energy Lines connecting all Skill Stars */}
                    <polyline
                      points={
                        activeCategory.id === 'backend'
                          ? '28,68 74,24 122,62 168,20 214,64 254,30'
                          : activeCategory.id === 'ai-vision'
                            ? '38,70 104,22 176,72 242,24 104,22 242,24'
                            : '38,26 106,72 174,24 242,70 174,24 106,72'
                      }
                      stroke={activeRuneMeta.color}
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                      className="animate-packet-flow"
                    />
                    <polyline
                      points={
                        activeCategory.id === 'backend'
                          ? '28,68 122,62 214,64 168,20 74,24'
                          : activeCategory.id === 'ai-vision'
                            ? '38,70 176,72 242,24'
                            : '38,26 242,70'
                      }
                      stroke="#0AC8B9"
                      strokeWidth="1"
                      strokeOpacity="0.55"
                    />
                    {/* Interactive Clickable Skill Star Vertices */}
                    {activeCategory.skills.map((sk, idx) => {
                      const coords =
                        activeCategory.id === 'backend'
                          ? [
                              [28, 68],
                              [74, 24],
                              [122, 62],
                              [168, 20],
                              [214, 64],
                              [254, 30],
                            ]
                          : activeCategory.id === 'ai-vision'
                            ? [
                                [38, 70],
                                [104, 22],
                                [176, 72],
                                [242, 24],
                              ]
                            : [
                                [38, 26],
                                [106, 72],
                                [174, 24],
                                [242, 70],
                              ]
                      const [sx, sy] = coords[idx] || [140, 48]
                      const isStarSelected = equippedSkill?.name === sk.name
                      return (
                        <g
                          key={sk.name}
                          onClick={() => equipSkillModule(sk)}
                          className="cursor-pointer"
                        >
                          <circle
                            cx={sx}
                            cy={sy}
                            r={isStarSelected ? 11 : 7.5}
                            fill={isStarSelected ? 'rgba(10,200,185,0.25)' : 'rgba(9,20,40,0.85)'}
                            stroke={isStarSelected ? '#0AC8B9' : '#C89B3C'}
                            strokeWidth={isStarSelected ? '1.8' : '1.1'}
                          />
                          <polygon
                            points={`${sx},${sy - 4} ${sx + 4},${sy} ${sx},${sy + 4} ${sx - 4},${sy}`}
                            fill={isStarSelected ? '#0AC8B9' : '#F0E6D2'}
                            className="animate-node-blink"
                            style={{ animationDelay: `${idx * 0.2}s` }}
                          />
                          <text
                            x={sx}
                            y={sy > 48 ? sy + 16 : sy - 11}
                            textAnchor="middle"
                            fill={isStarSelected ? '#0AC8B9' : '#F0E6D2'}
                            fontSize="7.5"
                            fontFamily="JetBrains Mono, monospace"
                            fontWeight="bold"
                          >
                            0{idx + 1}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>

                {/* Center Keystone Readout */}
                <div className="fantasy-card mt-3 rounded-xl p-4 text-center">
                  {activeHobby ? (
                    <div>
                      <div className="flex items-center justify-between border-b border-[#C89B3C]/30 pb-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#F0E6D2]">
                          {activeHobby.subtitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveHobbyId(null)}
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-[#0AC8B9] hover:text-white"
                        >
                          <RotateCcw size={10} />
                          <span>RUNE TREE</span>
                        </button>
                      </div>
                      <p className="mt-2.5 font-body text-xs leading-relaxed text-[#E2E8F0]">
                        {activeHobby.description}
                      </p>
                      <div className="mt-3 rounded border border-[#C89B3C]/45 bg-[#091428] px-2.5 py-1.5 font-mono text-[10px] font-bold text-[#0AC8B9]">
                        {activeHobby.telemetry}
                      </div>
                    </div>
                  ) : equippedSkill ? (
                    <div>
                      <div className="flex items-center justify-between border-b border-[#C89B3C]/30 pb-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C89B3C]">
                          KEYSTONE DELIVERABLE
                        </span>
                        <button
                          type="button"
                          onClick={() => setEquippedSkill(null)}
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-[#0AC8B9] hover:text-white"
                        >
                          <RotateCcw size={10} />
                          <span>RESET RUNE</span>
                        </button>
                      </div>
                      <p className="mt-3 font-gaming text-sm font-bold text-[#F0E6D2]">
                        {equippedSkill.productionOutput}
                      </p>
                      <div className="mt-3 rounded border border-[#0AC8B9]/45 bg-[#091428] px-2.5 py-1.5 font-mono text-[10px] font-bold text-[#0AC8B9]">
                        SOCKETED · {activeCategory.stationCode}
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-body text-xs leading-relaxed text-[#B8B0C8]">
                        {activeCategory.description}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#C89B3C]/25 pt-3.5 font-mono text-[11px]">
                        <div>
                          <p className="text-[9px] uppercase text-[#C8AA6E]">VECTOR CORE</p>
                          <p className="mt-0.5 font-bold text-[#0AC8B9]">512-D ONNX</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase text-[#C8AA6E]">MASTER OUTPUT</p>
                          <p className="mt-0.5 font-bold text-[#F0E6D2]">PRORES 4K</p>
                        </div>
                      </div>
                      <p className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#0AC8B9]">
                        <Sparkles size={10} />
                        <span>Click any rune node or bottom shard</span>
                      </p>
                    </>
                  )}
                </div>

                {/* BOTTOM BREAK-THE-FRAME MINOR RUNE SHARDS (DJING, OPTICS, BARÇA) */}
                <div
                  className="relative z-20 -mb-14 mt-7 grid grid-cols-3 gap-2.5 will-change-transform"
                  style={{
                    transform: 'translate3d(0, calc(var(--p, 0) * -48px), 0)',
                  }}
                >
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
                        className={`w-full cursor-pointer rounded-xl border bg-gradient-to-b from-[#0E223D] to-[#091428] p-3 text-center shadow-[0_14px_30px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-2 hover:scale-105 focus:outline-none ${
                          activeHobbyId === 'djing'
                            ? 'border-[#0AC8B9] shadow-[0_0_24px_rgba(10,200,185,0.5)]'
                            : 'border-[#C89B3C]/60 hover:border-[#0AC8B9]'
                        }`}
                      >
                        <TurntableIcon className="mx-auto h-6 w-6 text-[#0AC8B9]" />
                        <div
                          className="mx-auto mt-1.5 flex h-2.5 w-8 items-end justify-center gap-0.5"
                          aria-hidden="true"
                        >
                          <span className="animate-eq-dance h-full w-0.5 rounded-full bg-[#0AC8B9]" />
                          <span
                            className="animate-eq-dance h-full w-0.5 rounded-full bg-[#C89B3C]"
                            style={{ animationDelay: '0.2s' }}
                          />
                          <span
                            className="animate-eq-dance h-full w-0.5 rounded-full bg-[#F0E6D2]"
                            style={{ animationDelay: '0.45s' }}
                          />
                          <span
                            className="animate-eq-dance h-full w-0.5 rounded-full bg-[#EC4899]"
                            style={{ animationDelay: '0.7s' }}
                          />
                        </div>
                        <p className="mt-1 font-gaming text-[10px] font-bold uppercase text-[#F0E6D2]">
                          DJING
                        </p>
                        <p className="font-mono text-[9px] text-[#C8AA6E]">128 BPM</p>
                      </button>
                    </div>
                  </div>

                  <div className="-translate-y-2">
                    <div className="animate-badge-bob" style={{ animationDelay: '0.8s' }}>
                      <button
                        type="button"
                        onClick={() => selectHobbyRelic('photography')}
                        aria-pressed={activeHobbyId === 'photography'}
                        className={`w-full cursor-pointer rounded-xl border bg-gradient-to-b from-[#1E2442] to-[#091428] p-3 text-center shadow-[0_18px_35px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-2 hover:scale-105 focus:outline-none ${
                          activeHobbyId === 'photography'
                            ? 'border-[#F0E6D2] shadow-[0_0_24px_rgba(200,155,60,0.55)]'
                            : 'border-[#C89B3C]/75 hover:border-[#F0E6D2]'
                        }`}
                      >
                        <CameraLensIcon className="animate-slow-spin mx-auto h-6 w-6 text-[#C89B3C]" />
                        <p className="mt-2 font-gaming text-[10px] font-bold uppercase text-[#F0E6D2]">
                          OPTICS
                        </p>
                        <p className="font-mono text-[9px] text-[#C8AA6E]">35MM RAW</p>
                      </button>
                    </div>
                  </div>

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
                        className={`w-full cursor-pointer rounded-xl border bg-gradient-to-b from-[#2A153E] to-[#091428] p-3 text-center shadow-[0_14px_30px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-2 hover:scale-105 focus:outline-none ${
                          activeHobbyId === 'barcelona'
                            ? 'border-[#EC4899] shadow-[0_0_24px_rgba(236,72,153,0.55)]'
                            : 'border-[#C89B3C]/60 hover:border-[#EC4899]'
                        }`}
                      >
                        <BarcaShieldIcon className="animate-crystal-breath mx-auto h-6 w-6" />
                        <p className="mt-2 font-gaming text-[10px] font-bold uppercase text-[#F0E6D2]">
                          BARÇA
                        </p>
                        <p className="font-mono text-[9px] text-[#C8AA6E]">1899</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hextech Interactive Shell with 1-Click Command Runes */}
        {showTerminal && (
          <div className="mt-16 rounded-2xl border border-[#C89B3C]/50 bg-[#080B18]/96 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C89B3C]/25 pb-3 font-mono text-xs text-[#C8AA6E]">
              <span className="font-bold text-[#F0E6D2]">duy@piltover-core:~</span>
              <span className="text-[#0AC8B9]">HEXTECH TELEMETRY SHELL · CLICK RUNE OR TYPE</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {SHELL_QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeShellCommand(cmd)}
                  className="tactile-btn rounded border border-[#C89B3C]/40 bg-[#091428] px-2.5 py-1 font-mono text-[11px] text-[#F0E6D2] transition-colors hover:border-[#0AC8B9] hover:bg-[#0AC8B9]/20 hover:text-white"
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
                <p key={i} className={log.startsWith('duy@') ? 'font-semibold text-[#F0E6D2]' : ''}>
                  {log}
                </p>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-[#C89B3C]/25 pt-3 font-mono text-xs">
              <label htmlFor="fantasy-shell-input" className="shrink-0 font-bold text-[#0AC8B9]">
                duy@piltover-core:~$
              </label>
              <input
                id="fantasy-shell-input"
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="help, projects, stack, socials, whoami, time, barca, clear"
                className="w-full bg-transparent text-[#F0E6D2] outline-none placeholder:text-[#B8B0C8]/40"
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
