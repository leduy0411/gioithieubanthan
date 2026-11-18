import React, { useState, useRef, useEffect } from 'react'
import {
  Cpu,
  Palette,
  Server,
  Terminal,
  Zap,
} from 'lucide-react'
import { content } from '../data/content'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  backend: Server,
  'ai-vision': Cpu,
  creative: Palette,
}

export default function SkillsSection() {
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'KERNEL: Le Duy Core v2.6 [Tra Vinh Node / Online]',
    'MISSION: Distributed Systems, Computer Vision & 4K Creative Direction',
    'READY: Node.js, FastAPI, ONNX Runtime, Redis, PostgreSQL, Adobe Suite.',
    'Type "help" to inspect available diagnostic mission commands.',
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyPointer, setHistoryPointer] = useState<number>(-1)
  const terminalLogsEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll terminal to bottom on new log
  useEffect(() => {
    terminalLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(historyPointer - 1, 0)
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
      const cmd = terminalInput.trim().toLowerCase()
      if (!cmd) return

      // Save to history
      setCommandHistory((prev) => [...prev, cmd])
      setHistoryPointer(-1)

      let replies: string[] = []

      if (cmd === 'help') {
        replies = [
          'AVAILABLE MISSION COMMANDS:',
          '  projects  - Inspect orbital production payloads & statuses',
          '  stack     - Output complete engineering & creative stack',
          '  socials   - Output verified communication matrix links',
          '  whoami    - Print engineer credentials, university & base',
          '  time      - Print real-time Vietnam GMT+7 timestamp',
          '  barca     - Print Blaugrana tactical ethos',
          '  clear     - Wipe interactive terminal buffer',
        ]
      } else if (cmd === 'projects') {
        replies = [
          'ORBITAL PRODUCTION PAYLOADS:',
          ...content.projects.map(
            (p) => `  [${p.category}] ${p.title} (${p.categoryLabel})`
          ),
        ]
      } else if (cmd === 'stack') {
        replies = [
          'CORE BACKEND:    FastAPI, Python, Node.js, Express, TypeScript',
          'AI & VISION:     InsightFace ArcFace (512-D), ONNX Runtime, OpenCV, Gemini 2.5 API',
          'STORAGE & CACHE: PostgreSQL, MongoDB, Redis Cluster',
          'CREATIVE SUITE:  Adobe Photoshop, Illustrator, Premiere Pro, After Effects (ProRes 4K)',
        ]
      } else if (cmd === 'socials') {
        replies = [
          'COMMUNICATION MATRIX:',
          `  Email:     ${content.identity.email}`,
          `  Facebook:  ${content.socials.channels.find((s) => s.id === 'facebook')?.url}`,
          `  Locket:    ${content.socials.channels.find((s) => s.id === 'locket')?.url}`,
          `  Instagram: ${content.socials.channels.find((s) => s.id === 'instagram')?.url}`,
          `  TikTok:    ${content.socials.channels.find((s) => s.id === 'tiktok')?.url}`,
        ]
      } else if (cmd === 'whoami') {
        replies = [
          `CALLSIGN: ${content.identity.callsign}`,
          `FULL NAME: ${content.identity.fullName}`,
          `EDUCATION: ${content.identity.education.degree} (${content.identity.education.institution})`,
          `BASE:      ${content.identity.originBase}`,
          `FOCUS:     ${content.identity.missionFocus}`,
        ]
      } else if (cmd === 'time') {
        const vnTime = new Date().toLocaleTimeString('en-US', {
          timeZone: content.identity.timezone,
          hour12: false,
        })
        replies = [`CURRENT LOCAL TIME: ${vnTime} (${content.identity.locationShort} • GMT+7)`]
      } else if (cmd === 'barca') {
        replies = [
          '💙❤️ FC BARCELONA // MÉS QUE UN CLUB',
          '1899 // Blaugrana positional mastery, tactical discipline & artistic flow.',
        ]
      } else if (cmd === 'clear') {
        setTerminalLogs([])
        setTerminalInput('')
        return
      } else {
        replies = [`Command not found: "${cmd}". Type "help" for valid mission commands.`]
      }

      setTerminalLogs((prev) => [...prev, `duy@tra-vinh-core:~$ ${terminalInput}`, ...replies])
      setTerminalInput('')
    }
  }

  return (
    <section id="skills" className="relative border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs text-[#A855F7]">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
            <span>STATION 03 // NEBULA GAS GIANT • EXPERTISE</span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#F8FAFC] sm:text-5xl">
            PRECISION ENGINEERING. <br />
            <span className="text-[#A855F7]">PRODUCTION-GRADE ARSENAL.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            No synthetic percentage bars. Every capability is anchored in production tooling, real-world inference pipelines, and measurable architectural outputs.
          </p>
        </div>

        {/* Capability Bento Cards (3 Deep Tech Pillars) */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.skillCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] || Server
            return (
              <article
                key={category.id}
                className="flex flex-col justify-between rounded-2xl p-6 sm:p-7 border border-white/[0.08] bg-[#070b14]/80 backdrop-blur-2xl transition-all duration-300 hover:border-[#A855F7]/40"
              >
                <div>
                  <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7]">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{category.title}</h3>
                      <p className="font-mono text-[11px] text-[#A855F7] mt-0.5">{category.stationCode}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-zinc-400">
                    {category.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:border-[#A855F7]/30 hover:bg-white/[0.04]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-semibold text-white">
                            {skill.name}
                          </span>
                          <span className="rounded-md border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                            {skill.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 font-mono text-xs text-[#A855F7]">
                          ↳ {skill.productionOutput}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Real-time Interactive Bash Terminal */}
        <div className="mt-14 rounded-2xl border border-white/[0.1] bg-[#04060c]/95 p-5 sm:p-7 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-zinc-300 font-semibold">duy@tra-vinh-core: ~ (bash)</span>
            </div>
            <div className="flex items-center gap-2 text-[#A855F7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-ping" />
              <span>INTERACTIVE TTY</span>
            </div>
          </div>

          <div className="mt-4 max-h-60 overflow-y-auto space-y-1.5 font-mono text-xs text-zinc-300">
            {terminalLogs.map((log, i) => (
              <p
                key={i}
                className={
                  log.startsWith('duy@')
                    ? 'text-[#38bdf8] font-bold'
                    : log.startsWith('AVAILABLE') || log.startsWith('ORBITAL') || log.startsWith('CORE')
                    ? 'text-zinc-400 font-semibold'
                    : 'text-zinc-300'
                }
              >
                {log}
              </p>
            ))}
            <div ref={terminalLogsEndRef} />
          </div>

          <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5 font-mono text-xs">
            <span className="text-[#38bdf8] font-bold">duy@tra-vinh-core:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type 'help', 'projects', 'stack', 'whoami', 'time' or 'clear'..."
              className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600 selection:bg-[#A855F7]/30"
              aria-label="Terminal Command Input"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
