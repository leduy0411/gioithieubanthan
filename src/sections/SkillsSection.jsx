import React, { useState } from 'react'
import { Code2, Cpu, Palette, Server, Terminal, Video, Zap } from 'lucide-react'
import { skillCategories } from '../data/portfolioData'

const categoryIcons = {
  backend: Server,
  design: Palette,
  video: Video,
}

export default function SkillsSection() {
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState([
    'SYSTEM INIT: Le Duy Kernel v2.6 [Tra Vinh Cluster]',
    'READY: Node.js, Redis, PostgreSQL, Docker daemon running.',
    'READY: Adobe Creative Cloud GPU Acceleration linked.',
    'Type "help" or "skills" for diagnostic readout.',
  ])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.trim().toLowerCase()
      let reply = ''
      if (cmd === 'help') {
        reply = 'Available commands: help, skills, ping, barca, clear'
      } else if (cmd === 'skills') {
        reply = 'Backend: 95% API | Design: 94% PS & AI | Video: 95% PR & AE'
      } else if (cmd === 'ping') {
        reply = 'PONG: 0.8ms latency from Tra Vinh, Vinh Long.'
      } else if (cmd === 'barca') {
        reply = '💙❤️ Més que un club! Visca el Barça!'
      } else if (cmd === 'clear') {
        setTerminalLogs([])
        setTerminalInput('')
        return
      } else {
        reply = `Command not recognized: "${cmd}". Type "help" for options.`
      }

      setTerminalLogs((prev) => [...prev, `> ${terminalInput}`, reply])
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
            <span>03 // TECHNICAL ARSENAL &amp; MASTERY</span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
            RIGOROUS BACKEND LOGIC. <br />
            <span className="gradient-text">MASTERFUL VISUAL TOOLS.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            A balanced dual-discipline capability spanning distributed systems architecture, API security, Adobe creative suites, and cinematic 4K motion design.
          </p>
        </div>

        {/* Interactive Terminal Sandbox */}
        <div className="mt-12 rounded-2xl border border-white/[0.1] bg-[#070b14]/95 p-5 sm:p-6 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-zinc-300">duy@tra-vinh-core: ~</span>
            </div>
            <span className="text-[#00f2fe]">BASH // INTERACTIVE</span>
          </div>

          <div className="mt-4 max-h-48 overflow-y-auto space-y-1 font-mono text-xs text-zinc-300">
            {terminalLogs.map((log, i) => (
              <p key={i} className={log.startsWith('>') ? 'text-[#00f2fe]' : ''}>
                {log}
              </p>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-white/[0.08] pt-3 font-mono text-xs">
            <span className="text-[#00f2fe]">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="Try 'help', 'skills', or 'barca'..."
              className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* 3 Skill Pillars Grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Server
            return (
              <article
                key={category.id}
                className="cyber-card rounded-2xl p-6 sm:p-7 border border-white/[0.1] bg-[#070b14]/80 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-[#00f2fe]">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>

                <ul className="mt-6 space-y-5">
                  {category.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-200">{skill.name}</span>
                        <span className="text-[#00f2fe]">{skill.level}%</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#7928ca] transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
