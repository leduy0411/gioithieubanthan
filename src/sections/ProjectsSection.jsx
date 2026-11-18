import React, { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Code2,
  Cpu,
  ExternalLink,
  Layers,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react'
import { projectShowcase } from '../data/portfolioData'
import { GithubLogo } from '../components/BrandIcons'

const filters = [
  { id: 'all', label: 'ALL SYSTEMS' },
  { id: 'ai', label: 'COMPUTER VISION & AI' },
  { id: 'platform', label: 'AGENTIC PLATFORMS' },
  { id: 'backend', label: 'BACKEND & CLOUD' },
  { id: 'creative', label: 'CREATIVE DIRECTION' },
]

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = useMemo(
    () => projectShowcase.filter((p) => activeFilter === 'all' || p.filter === activeFilter),
    [activeFilter]
  )

  return (
    <section id="projects" className="relative border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00f2fe]">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe]" />
              <span>02 // PRODUCTION ARCHITECTURES</span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#F8FAFC] sm:text-5xl">
              SYSTEMS ENGINEERED FOR <br />
              <span className="text-[#00f2fe]">REAL-WORLD IMPACT.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2" aria-label="Project filters">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`tactile-btn rounded-xl px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                    isActive
                      ? 'border border-[#00f2fe]/50 bg-[#00f2fe]/15 text-[#00f2fe] shadow-[0_0_15px_rgba(0,242,254,0.25)] font-bold'
                      : 'border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid: System Window & Live Telemetry Layout */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="spotlight-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.1] bg-[#070b14]/85 backdrop-blur-2xl transition-all duration-300 hover:border-[#00f2fe]/40"
            >
              <div>
                {/* System Window Chrome Titlebar */}
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#04060c]/90 px-5 py-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-zinc-400 truncate max-w-[180px] sm:max-w-none">
                      sys://{project.id}.cluster
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00f2fe]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00f2fe] animate-ping" />
                    <span className="text-[10px] tracking-wider uppercase font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Architecture Visual Preview */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative h-56 sm:h-64 w-full cursor-pointer overflow-hidden border-b border-white/[0.08] bg-gradient-to-br from-[#0c1224] to-[#04060c] p-6"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute top-4 right-4 rounded-full border border-white/[0.1] bg-[#070b14]/90 px-3 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
                    {project.badge}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer font-display text-2xl font-bold text-white transition-colors group-hover:text-[#00f2fe]"
                  >
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {project.summary}
                  </p>
                  <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 font-mono text-xs text-zinc-400">
                    <span className="text-[#00f2fe]">&gt; architecture_focus:</span> {project.focus}
                  </div>

                  {/* Production Metrics Row */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/[0.08] py-3 font-mono">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-[10px] text-zinc-500 uppercase truncate">{m.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{m.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: 2 Clear Pillars (LIVE DEMO ↗ and GITHUB SOURCE) */}
              <div className="flex items-center gap-3 border-t border-white/[0.08] bg-[#04060c]/60 p-5 sm:px-7">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="tactile-btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] py-2.5 font-mono text-xs font-bold text-black shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:opacity-95"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink size={14} />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-2.5 font-mono text-xs font-semibold text-white hover:border-[#00f2fe]/40 hover:text-[#00f2fe]"
                >
                  <GithubLogo className="w-4 h-4" />
                  <span className="hidden sm:inline">GITHUB</span> SOURCE
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Deep Inspection Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="animate-scale-up relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#00f2fe]/40 bg-[#070b14] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,242,254,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-[#00f2fe]">
              <Zap size={14} />
              <span>SYSTEM_TELEMETRY // {selectedProject.category.toUpperCase()}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-white">
              {selectedProject.name}
            </h3>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="max-h-60 w-full object-contain mx-auto"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-zinc-300">
              {selectedProject.summary}
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-zinc-400">
              <span className="text-[#00f2fe]">&gt; architecture_focus:</span> {selectedProject.focus}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProject.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[#00f2fe]/30 bg-[#00f2fe]/10 px-3 py-1 font-mono text-xs text-[#00f2fe]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="tactile-btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] py-3 font-mono text-xs font-bold text-black"
              >
                OPEN SYSTEM REPOSITORY ↗
              </a>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="tactile-btn rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-mono text-xs text-zinc-400 hover:text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
