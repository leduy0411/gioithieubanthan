import React, { useMemo, useState } from 'react'
import { ArrowUpRight, Code, ExternalLink, Layers, Sparkles, X, Zap } from 'lucide-react'
import { projectShowcase } from '../data/portfolioData'

const filters = [
  { id: 'all', label: 'ALL ARCHITECTURES' },
  { id: 'platform', label: 'PLATFORMS' },
  { id: 'data', label: 'DATA SYSTEMS' },
  { id: 'security', label: 'SECURITY' },
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
              <span>02 // FLAGSHIP ARCHITECTURES</span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              SYSTEMS DESIGNED TO WITHSTAND <br />
              <span className="gradient-text">CRITICAL THROUGHPUT.</span>
            </h2>
          </div>

          {/* Interactive Filter Pills */}
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

        {/* Projects Grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="spotlight-card group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.1] bg-[#070b14]/80 backdrop-blur-xl transition-all duration-300 hover:border-[#00f2fe]/40"
            >
              {/* Architecture Blueprint Visual Preview */}
              <div className="relative h-60 w-full overflow-hidden border-b border-white/[0.08] bg-gradient-to-br from-[#0c1222] to-[#04060c] p-6 sm:h-72">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#070b14]/85 px-3 py-1 font-mono text-[10px] text-[#00f2fe] backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
                  {project.category}
                </div>
              </div>

              {/* Project Metadata & Technical Summary */}
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#00f2fe]">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {project.summary}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-zinc-400 font-mono">
                    {project.focus}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#00f2fe] transition-transform group-hover:translate-x-1">
                    INSPECT ARCHITECTURE
                    <ArrowUpRight size={16} />
                  </span>
                </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="animate-scale-up relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#00f2fe]/40 bg-[#070b14] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,242,254,0.2)]"
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

            <h3 className="mt-3 font-display text-3xl font-extrabold text-white">
              {selectedProject.name}
            </h3>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="max-h-64 w-full object-contain mx-auto"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-zinc-300">
              {selectedProject.summary}
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-zinc-400">
              <span className="text-[#00f2fe]">&gt; architecture_focus:</span> {selectedProject.focus}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[#00f2fe]/30 bg-[#00f2fe]/10 px-3 py-1 font-mono text-xs text-[#00f2fe]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
