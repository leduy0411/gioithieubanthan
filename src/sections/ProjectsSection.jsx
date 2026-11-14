import React, { useState } from 'react'
import { projectShowcase } from '../data/portfolioData'
import { ArrowDownRight, ChevronDown, Layers, Terminal, ExternalLink, X, Cpu, Server, Shield, Database, Activity } from 'lucide-react'

const FILTERS = [
  { id: 'all', label: 'All Concepts' },
  { id: 'platform', label: 'Platforms' },
  { id: 'data', label: 'Data Systems' },
  { id: 'security', label: 'Security' }
]

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedProject, setExpandedProject] = useState(null)
  const [selectedBlueprint, setSelectedBlueprint] = useState(null)

  const visibleProjects = projectShowcase.filter(
    (project) => activeFilter === 'all' || project.filter === activeFilter
  )

  return (
    <section id="projects" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101A] border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] mb-3 shadow-[0_0_15px_rgba(0,217,255,0.15)]">
            <Cpu className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>02 // ARCHITECTURAL CONCEPTS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
            SYSTEM{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent">
              CONCEPTS &amp; DESIGNS
            </span>
          </h2>
          <p className="font-body font-normal max-w-2xl text-sm sm:text-base text-[#94A3B8] mb-5 leading-relaxed">
            High-concurrency backend blueprints, distributed data streaming architectures, and cryptographic security designs engineered with modern best practices.
          </p>
          <div className="section-accent-line" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00D9FF] text-[#030407] shadow-[0_0_20px_rgba(0,217,255,0.5)] border border-[#00D9FF]'
                    : 'bg-white/[0.03] text-[#94A3B8] border border-white/[0.08] hover:border-[#00D9FF]/40 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {visibleProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id
            const isFeature = index === 0

            return (
              <article
                key={project.id}
                className="cyber-card rounded-2xl overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Visual Diagram Preview Container */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#070B14] border-b border-white/[0.08]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-transparent opacity-80" />
                    
                    {/* Badge Pill */}
                    <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#0B101A]/90 border border-white/10 text-white backdrop-blur-md">
                      <Layers className="w-3.5 h-3.5 text-[#00D9FF]" />
                      {project.category}
                    </span>

                    {/* Telemetry Tag */}
                    <span className="absolute bottom-3.5 right-3.5 font-mono text-[10px] tracking-widest text-[#00D9FF] bg-black/60 px-2 py-0.5 rounded border border-[#00D9FF]/20">
                      SYS // {project.id.toUpperCase()}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="font-mono text-[10px] tracking-widest text-[#A855F7] uppercase block mb-1">
                          ARCHITECTURAL STUDY 0{index + 1}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#00D9FF] transition-colors">
                          {project.name}
                        </h3>
                      </div>
                      <ArrowDownRight className="w-5 h-5 text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-[#00D9FF] shrink-0 mt-1" />
                    </div>

                    <p className="font-body font-normal text-sm text-[#CBD5E1] leading-relaxed mb-5">
                      {project.summary}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#94A3B8]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Blueprint Details */}
                    <div className="border-t border-white/[0.08] pt-4">
                      <button
                        type="button"
                        onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                        className="flex w-full items-center justify-between text-xs font-mono font-semibold text-[#CBD5E1] hover:text-[#00D9FF] transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'COLLAPSE DESIGN NOTES' : 'EXPLORE ARCHITECTURE NOTES'}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="mt-3.5 pt-3.5 border-t border-white/[0.04] text-xs font-body text-[#94A3B8] leading-relaxed animate-fade-up">
                          <p className="mb-3">{project.focus}</p>
                          <button
                            type="button"
                            onClick={() => setSelectedBlueprint(project)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] hover:bg-[#00D9FF]/20 text-xs font-mono font-medium transition-colors cursor-pointer"
                          >
                            <Activity className="w-3.5 h-3.5" />
                            <span>INSPECT SYSTEM TOPOLOGY</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Blueprint Topology Modal */}
        {selectedBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div className="relative w-full max-w-2xl rounded-2xl bg-[#070B14] border border-[#00D9FF]/40 p-6 sm:p-8 text-left shadow-[0_0_60px_rgba(0,217,255,0.25)] animate-scale-up">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedBlueprint(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-white bg-white/[0.05] border border-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 text-xs font-mono text-[#00D9FF] mb-2">
                <Terminal className="w-4 h-4" />
                <span>TOPOLOGY // {selectedBlueprint.name.toUpperCase()}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                {selectedBlueprint.name} — Architecture Blueprint
              </h3>
              <p className="font-body text-sm text-[#CBD5E1] mb-6 leading-relaxed">
                {selectedBlueprint.focus}
              </p>

              {/* Simulated Topology Node Graph */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-6">
                <div className="p-3 rounded-lg bg-black/50 border border-[#00D9FF]/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00D9FF] mb-1">
                    <Server className="w-3.5 h-3.5" />
                    <span>INGESTION GATEWAY</span>
                  </div>
                  <p className="text-[11px] font-body text-[#94A3B8]">Rate limiting, HMAC signature validation &amp; TLS 1.3</p>
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-[#A855F7]/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A855F7] mb-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>ASYNC PIPELINE</span>
                  </div>
                  <p className="text-[11px] font-body text-[#94A3B8]">Partitioned event broker, dead-letter queue &amp; replay</p>
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-[#D4FF24]/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D4FF24] mb-1">
                    <Database className="w-3.5 h-3.5" />
                    <span>DATA &amp; CACHE</span>
                  </div>
                  <p className="text-[11px] font-body text-[#94A3B8]">Sharded storage, read replicas &amp; sub-millisecond cache</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedBlueprint(null)}
                  className="px-5 py-2.5 rounded-xl font-display font-bold text-xs bg-[#00D9FF] text-[#030407] hover:bg-[#38E5FF] transition-all cursor-pointer"
                >
                  CLOSE BLUEPRINT
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
