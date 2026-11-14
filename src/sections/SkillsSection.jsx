import React, { useState } from 'react'
import { skillCategories, creativeShowcase, personalInfo } from '../data/portfolioData'
import { Server, Palette, Video, Layers, Terminal as TerminalIcon, Sparkles, Send, CornerDownLeft, Play, Cpu } from 'lucide-react'

const ICON_MAP = { Server, Palette, Video, Layers }

/* 100% Guaranteed Local Vector Illustrations (No Broken Images!) */
const SHOWCASE_IMGS = [
  '/images/backend-architecture.svg', // Backend Architecture
  '/images/graphic-design.svg',        // Graphic Design & Branding
  '/images/video-editing.svg'         // Video Editing & Motion
]

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all')

  // Interactive Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    {
      command: 'duy.init()',
      output: '⚡ System initialized. Le Duy · IT Engineer · Tra Vinh, Vietnam. Type or click commands below.'
    }
  ])
  const [terminalInput, setTerminalInput] = useState('')

  const categories = [
    { id: 'all', name: 'All Disciplines' },
    ...skillCategories.map((c) => ({ id: c.id, name: c.name }))
  ]

  const displayedCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeTab)

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    let response = ''

    if (trimmed === 'duy.bio()' || trimmed === 'bio') {
      response = `👤 Le Duy | IT Engineer\n📍 Tra Vinh Ward, Vinh Long Province, Vietnam\n🎯 Backend Architecture + Graphic Design + Cinematic Video Editing\n🌐 Languages: Vietnamese (Native), English, Chinese`
    } else if (trimmed === 'duy.skills()' || trimmed === 'skills') {
      response = `🚀 Core Disciplines:\n1. Backend: Node.js, REST/GraphQL, PostgreSQL, Redis, Microservices (92-95%)\n2. Graphic Design: Adobe Photoshop, Illustrator, Brand Systems (90-95%)\n3. Video Editing: Premiere Pro, After Effects VFX, Color Grading (90-96%)`
    } else if (trimmed === 'duy.barca()' || trimmed === 'barca') {
      response = `🔵🔴 FC BARCELONA // CULER FOREVER\n"Més que un club" — Passion, Strategy & Legacy\nColors: Blaugrana (#004d98 / #a50044)`
    } else if (trimmed === 'duy.contact()' || trimmed === 'contact') {
      response = `📬 Email: ${personalInfo.email}\n🌐 Socials: Facebook, Locket (@ledi04), Instagram (@leduy1104), TikTok (@lee_duy04)`
    } else if (trimmed === 'clear') {
      setTerminalHistory([])
      return
    } else if (trimmed === 'help') {
      response = `Available commands:\n- duy.bio()\n- duy.skills()\n- duy.barca()\n- duy.contact()\n- clear`
    } else {
      response = `Command not recognized: "${trimmed}". Type "help" or click one of the quick command buttons below.`
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output: response }])
    setTerminalInput('')
  }

  const handleTerminalSubmit = (e) => {
    e.preventDefault()
    if (!terminalInput.trim()) return
    executeCommand(terminalInput)
  }

  return (
    <section id="skills" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101A] border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] mb-3 shadow-[0_0_15px_rgba(0,217,255,0.15)]">
            <Cpu className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>03 // MULTIDISCIPLINARY STACK</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-3">
            TECH &amp; CREATIVE{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent">
              DISCIPLINES
            </span>
          </h2>
          <p className="font-body font-normal max-w-xl text-sm sm:text-base text-[#94A3B8] mb-5 leading-relaxed">
            A balanced synergy between resilient backend software architecture, refined visual graphic design, and cinematic video storytelling.
          </p>
          <div className="section-accent-line" />
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00D9FF] text-[#030407] shadow-[0_0_20px_rgba(0,217,255,0.5)] border border-[#00D9FF]'
                    : 'bg-white/[0.03] text-[#94A3B8] border border-white/[0.08] hover:border-[#00D9FF]/40 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* ── Skills Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {displayedCategories.map((category) => {
            const IconComponent = ICON_MAP[category.icon] || Server
            const accentColor =
              category.id === 'backend' ? '#00D9FF'
              : category.id === 'design' ? '#A855F7'
              : '#D4FF24'

            return (
              <div
                key={category.id}
                className="cyber-card p-6 sm:p-7 rounded-2xl flex flex-col group justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-xl border backdrop-blur-md"
                        style={{
                          backgroundColor: `${accentColor}14`,
                          borderColor: `${accentColor}30`,
                          color: accentColor
                        }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                        {category.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#94A3B8] uppercase">
                      {category.skills.length} MODULES
                    </span>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-col gap-4">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: accentColor }}
                            />
                            <span className="font-body font-medium text-[#CBD5E1]">{skill.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#94A3B8]">
                              {skill.tag}
                            </span>
                            <span className="font-mono font-bold text-xs" style={{ color: accentColor }}>
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, #1558C9, ${accentColor})`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Multidisciplinary Deliverables Showcase ── */}
        <div className="mb-16 pt-10 border-t border-white/[0.08]">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-[#00D9FF] uppercase tracking-wider block mb-2">
              APPLIED PRODUCTION CRAFT
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              What I Deliver Across Every Discipline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creativeShowcase.map((item, idx) => (
              <div key={idx} className="spotlight-card cyber-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform group flex flex-col justify-between">
                <div>
                  {/* Thumbnail with overlay */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={SHOWCASE_IMGS[idx]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
                    <span className="absolute top-3 left-3 font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/30">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-body font-normal text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                    {item.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#94A3B8]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── NEW: Interactive Holographic Cyber Terminal ── */}
        <div className="spotlight-card cyber-card rounded-2xl overflow-hidden border border-[#00D9FF]/30 shadow-[0_0_40px_rgba(0,217,255,0.15)]">
          {/* Terminal Window Chrome */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-2 font-mono text-xs text-[#94A3B8]">duy@cyberdeck:~ (zsh)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00D9FF]">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>INTERACTIVE CLI</span>
            </div>
          </div>

          {/* Terminal Output Screen */}
          <div className="p-5 sm:p-6 bg-[#030407]/95 font-mono text-xs sm:text-sm text-[#CBD5E1] min-h-[200px] max-h-[320px] overflow-y-auto space-y-3">
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-[#00D9FF]">
                  <span>➜</span>
                  <span className="text-[#A855F7]">duy.dev</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <pre className="font-mono text-xs text-[#94A3B8] whitespace-pre-wrap pl-4 border-l-2 border-[#00D9FF]/30 leading-relaxed">
                  {item.output}
                </pre>
              </div>
            ))}
          </div>

          {/* Terminal Input Bar & Quick Commands */}
          <div className="p-4 bg-black/60 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Quick Action Command Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[10px] text-[#94A3B8] mr-1 hidden sm:inline">QUICK RUN:</span>
              {['duy.bio()', 'duy.skills()', 'duy.barca()', 'duy.contact()', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 text-[11px] font-mono text-[#00D9FF] transition-all cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Manual Command Form Input */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 flex-1 sm:max-w-xs">
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type command (e.g. help)..."
                className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white placeholder-[#718096] focus:border-[#00D9FF] focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-[#00D9FF] text-[#030407] hover:bg-[#38E5FF] transition-colors cursor-pointer shrink-0"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
