import React, { useState } from 'react'
import {
  Check,
  Code2,
  Cpu,
  Layers,
  Palette,
  Server,
  Sparkles,
  Terminal,
  Video,
  Zap,
} from 'lucide-react'
import { skillCategories, personalInfo, projectShowcase } from '../data/portfolioData'

const categoryIcons = {
  backend: Server,
  'ai-vision': Cpu,
  creative: Palette,
}

export default function SkillsSection() {
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState([
    'KERNEL: Le Duy Core v2.6 [Tra Vinh Node / Online]',
    'READY: Node.js, FastAPI, ONNX Runtime, Redis, PostgreSQL.',
    'READY: Adobe Creative Suite 2026 Acceleration active.',
    'Type "help" to inspect available diagnostic commands.',
  ])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.trim().toLowerCase()
      let replies = []

      if (!cmd) return

      if (cmd === 'help') {
        replies = [
          'AVAILABLE COMMANDS:',
          '  projects  - List real-world production architectures',
          '  stack     - Output complete engineering & creative stack',
          '  socials   - Output verified communication matrix',
          '  whoami    - Print engineer credentials and degree',
          '  time      - Print real-time Vietnam GMT+7 timestamp',
          '  barca     - Output Blaugrana club motto',
          '  clear     - Wipe interactive terminal buffer',
        ]
      } else if (cmd === 'projects') {
        replies = [
          'ACTIVE PRODUCTION PROJECTS:',
          ...projectShowcase.map((p) => `  [${p.badge}] ${p.name}`),
        ]
      } else if (cmd === 'stack') {
        replies = [
          'CORE RUNTIMES: Node.js, TypeScript, Python, FastAPI',
          'AI & VISION:   InsightFace, ONNX Runtime, OpenCV, Gemini 2.5 API',
          'DATABASES:     PostgreSQL, MongoDB, Redis Cluster',
          'CREATIVE:      Adobe Photoshop, Illustrator, Premiere Pro, After Effects',
        ]
      } else if (cmd === 'socials') {
        replies = [
          'COMMUNICATION MATRIX:',
          `  Email:     ${personalInfo.email}`,
          '  Facebook:  facebook.com/share/1F5YrEn9Jb',
          '  Locket:    locket.cam/ledi04',
          '  Instagram: @leduy1104',
          '  TikTok:    @lee_duy04',
        ]
      } else if (cmd === 'whoami') {
        replies = [
          `LE DUY — ${personalInfo.education}`,
          `Location: ${personalInfo.location}`,
          'Focus: Distributed Backend Systems, Computer Vision & Creative Direction.',
        ]
      } else if (cmd === 'time') {
        const vnTime = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour12: false,
        })
        replies = [`CURRENT LOCAL TIME: ${vnTime} (Vinh Long, VN • GMT+7)`]
      } else if (cmd === 'barca') {
        replies = [
          '💙❤️ FC BARCELONA // MÉS QUE UN CLUB',
          'Tiki-taka positional discipline & creative freedom.',
        ]
      } else if (cmd === 'clear') {
        setTerminalLogs([])
        setTerminalInput('')
        return
      } else {
        replies = [`Command not found: "${cmd}". Type "help" for valid commands.`]
      }

      setTerminalLogs((prev) => [...prev, `> ${terminalInput}`, ...replies])
      setTerminalInput('')
    }
  }

  return (
    <section id="skills" className="relative border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00f2fe]">
            <span className="w-2 h-2 rounded-full bg-[#00f2fe]" />
            <span>03 // CAPABILITIES &amp; TECHNICAL ARSENAL</span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#F8FAFC] sm:text-5xl">
            PRECISION ENGINEERING. <br />
            <span className="text-[#00f2fe]">PRODUCTION-GRADE ARSENAL.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            No synthetic percentage bars. Every capability is anchored in production tooling, real-world inference pipelines, and measurable architectural outputs.
          </p>
        </div>

        {/* Capability Bento Cards (3 Pillars) */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Server
            return (
              <article
                key={category.id}
                className="cyber-card flex flex-col justify-between rounded-2xl p-6 sm:p-7 border border-white/[0.1] bg-[#070b14]/85 backdrop-blur-2xl"
              >
                <div>
                  <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-[#00f2fe]">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{category.name}</h3>
                      <p className="font-mono text-[11px] text-[#00f2fe] mt-0.5">{category.skills.length} Capabilities</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-zinc-400">
                    {category.description}
                  </p>

                  <div className="mt-6 space-y-3.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:border-[#00f2fe]/30 hover:bg-white/[0.04]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-semibold text-white">
                            {skill.name}
                          </span>
                          <span className="rounded-md border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                            {skill.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 font-mono text-xs text-[#00f2fe]">
                          ↳ {skill.output}
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
        <div className="mt-12 rounded-2xl border border-white/[0.12] bg-[#070b14]/95 p-5 sm:p-7 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-zinc-300 font-semibold">duy@tra-vinh-core: ~ (bash)</span>
            </div>
            <div className="flex items-center gap-2 text-[#00f2fe]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
              <span>INTERACTIVE TTY</span>
            </div>
          </div>

          <div className="mt-4 max-h-56 overflow-y-auto space-y-1.5 font-mono text-xs text-zinc-300">
            {terminalLogs.map((log, i) => (
              <p
                key={i}
                className={
                  log.startsWith('>')
                    ? 'text-[#00f2fe] font-bold'
                    : log.startsWith('AVAILABLE') || log.startsWith('ACTIVE') || log.startsWith('CORE')
                    ? 'text-zinc-400 font-semibold'
                    : 'text-zinc-300'
                }
              >
                {log}
              </p>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5 font-mono text-xs">
            <span className="text-[#00f2fe] font-bold">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="Type 'help', 'projects', 'stack', 'whoami', 'time' or 'clear'..."
              className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600 selection:bg-[#00f2fe]/30"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
