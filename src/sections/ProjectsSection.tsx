import React, { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Cpu,
  ExternalLink,
  Layers,
  Search,
  Sparkles,
  Terminal,
  Video,
  X,
  Zap,
} from 'lucide-react'
import { content, ProjectItem } from '../data/content'
import { GithubLogo } from '../components/BrandIcons'

const FILTER_ITEMS = [
  { id: 'ALL', label: 'ALL SYSTEMS' },
  { id: 'AI & VISION', label: 'AI & VISION' },
  { id: 'AGENTIC', label: 'AGENTIC CORE' },
  { id: 'BACKEND', label: 'BACKEND & CLOUD' },
  { id: 'VISUALS', label: '4K VISUALS' },
] as const

/**
 * Interactive Spacecraft Simulation Previews
 */
function ProjectSimulationPreview({ project }: { project: ProjectItem }) {
  if (project.previewType === 'biometric-scanner') {
    return (
      <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#03060f] p-4 font-mono text-xs">
        {/* Animated Scanner Laser Bar */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent shadow-[0_0_12px_#38bdf8] animate-scan-beam" />

        {/* Reticle Bounding Box */}
        <div className="absolute inset-10 rounded-lg border border-[#38bdf8]/40 border-dashed flex flex-col justify-between p-2">
          <div className="flex justify-between text-[10px] text-[#38bdf8]">
            <span>[TARGET_LOCK]</span>
            <span>99.8% CONFIDENCE</span>
          </div>
          <div className="flex justify-between text-[10px] text-zinc-400">
            <span>512-D ONNX</span>
            <span>&lt; 180ms</span>
          </div>
        </div>

        {/* Status Chip */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>BIOMETRIC LIVENESS: VERIFIED</span>
        </div>
      </div>
    )
  }

  if (project.previewType === 'agentic-pipeline') {
    return (
      <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#03060f] p-4 font-mono text-[11px] text-zinc-300 space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-[#38bdf8] border-b border-white/[0.06] pb-2">
          <Terminal size={12} />
          <span>GEMINI_2.5_AGENTIC_PIPELINE // CALL_STREAM</span>
        </div>
        <p className="text-[#38bdf8]">&gt; tool_call: search_catalog(query=&quot;mechanical keyboard&quot;)</p>
        <p className="text-emerald-400">✔ schema_validation: 100% strict JSON</p>
        <p className="text-zinc-400">✔ redis_cart_cache_sync: &lt; 2ms</p>
        <p className="text-white font-medium">&gt; agent_response: 3 candidate SKU payloads injected</p>
        <div className="pt-1 flex items-center gap-1.5 text-[10px] text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>AUTONOMOUS REASONING ACTIVE</span>
        </div>
      </div>
    )
  }

  if (project.previewType === 'rate-limiter') {
    return (
      <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#03060f] p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-amber-400">
          <span>TOKEN_BUCKET_RATE_LIMITER</span>
          <span className="text-emerald-400">STATUS: 200 OK</span>
        </div>
        <div className="mt-3 space-y-2 text-[11px] text-zinc-300">
          <div className="flex justify-between">
            <span className="text-zinc-400">Bucket Capacity:</span>
            <span className="text-white font-semibold">100 tokens</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Refill Rate:</span>
            <span className="text-amber-400">50 tokens/sec</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Security:</span>
            <span className="text-zinc-200">RS256 Asymmetric JWT</span>
          </div>
        </div>
        {/* Dynamic Throughput Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
            <span>NETWORK THROUGHPUT</span>
            <span className="text-emerald-400">HEALTHY</span>
          </div>
          <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden flex gap-0.5">
            <div className="h-full bg-emerald-400 rounded-full w-[38%]" />
            <div className="h-full bg-[#38bdf8] rounded-full w-[24%]" />
            <div className="h-full bg-amber-400 rounded-full w-[12%]" />
          </div>
        </div>
      </div>
    )
  }

  // 4K Color Grading Waveform & 128 BPM Timeline
  return (
    <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#03060f] p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-violet-400">
        <span>PRORES_4K // 60_FPS_MASTER</span>
        <span className="text-white">128 BPM LOCKED</span>
      </div>
      {/* Waveform Graphic */}
      <div className="mt-4 flex items-end justify-between gap-1 h-20 px-2">
        {[45, 65, 30, 85, 95, 55, 70, 40, 80, 60, 90, 75, 45, 85, 65, 50, 95, 40].map((h, i) => (
          <div
            key={i}
            className="w-full bg-gradient-to-t from-violet-600 via-fuchsia-500 to-[#38bdf8] rounded-t-sm opacity-80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-zinc-400">
        <span>COLOR SCIENCE: REC.709 / LOG</span>
        <span className="text-violet-300">BEAT-MATCHED TRANSITIONS</span>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return content.projects
    return content.projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="projects" className="relative border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#F59E0B]">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
              <span>STATION 02 // HELIOS AMBER • SYSTEMS</span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#F8FAFC] sm:text-5xl">
              ORBITAL PAYLOADS &amp; <br />
              <span className="text-[#F59E0B]">PRODUCTION SYSTEMS.</span>
            </h2>
          </div>

          {/* 5 Filter Pills in ONE Horizontal Row */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none"
            aria-label="Filter Projects"
          >
            {FILTER_ITEMS.map((filter) => {
              const isActive = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`tactile-btn shrink-0 rounded-xl px-3.5 py-2 font-mono text-xs tracking-wider transition-all ${
                    isActive
                      ? 'border border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[#F59E0B] font-semibold'
                      : 'border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects 2x2 Grid: Spacecraft Module Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b14]/75 backdrop-blur-2xl transition-all duration-300 hover:border-[#F59E0B]/40"
            >
              <div>
                {/* Titlebar Chrome */}
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#04060c]/80 px-5 py-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-zinc-400 truncate max-w-[160px] sm:max-w-none">
                      sys://{project.id}
                    </span>
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-zinc-300 uppercase">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Simulation Preview Stage */}
                <div className="p-5 border-b border-white/[0.06] bg-[#050811]/60">
                  <ProjectSimulationPreview project={project} />
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer font-display text-2xl font-bold text-white transition-colors group-hover:text-[#F59E0B]"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {project.summary}
                  </p>
                  <div className="mt-3 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 font-mono text-xs text-zinc-400">
                    <span className="text-[#F59E0B]">&gt; architecture_focus:</span> {project.architectureFocus}
                  </div>

                  {/* Production Metrics Row */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/[0.06] py-3 font-mono">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-[10px] text-zinc-500 uppercase truncate">{m.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-center gap-1">
                          {m.value}
                          {m.isSimulatedOrArchitecture && (
                            <span className="text-[9px] font-normal text-amber-400/80">[SIM]</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Pillars: LIVE DEMO (Safely Disabled if null) and GITHUB SOURCE */}
              <div className="flex items-center gap-3 border-t border-white/[0.06] bg-[#04060c]/50 p-5 sm:px-7">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="tactile-btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5 font-mono text-xs text-zinc-500 cursor-not-allowed"
                    title="Live deployment is internal or pending public URL"
                  >
                    <span>INTERNAL DEMO</span>
                    <span className="text-[10px] text-zinc-600">[RESTRICTED]</span>
                  </button>
                )}

                <a
                  href={project.githubUrl || 'https://github.com/leduy'}
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 font-mono text-xs font-semibold text-white hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-colors"
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
            className="animate-scale-up relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/[0.12] bg-[#070b14] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-white"
              aria-label="Close Inspection Modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-[#F59E0B]">
              <Zap size={14} />
              <span>SYSTEM_TELEMETRY // {selectedProject.category}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-white">
              {selectedProject.title}
            </h3>

            <div className="mt-6">
              <ProjectSimulationPreview project={selectedProject} />
            </div>

            <p className="mt-5 text-sm leading-6 text-zinc-300">
              {selectedProject.summary}
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-xs text-zinc-400">
              <span className="text-[#F59E0B]">&gt; architecture_focus:</span> {selectedProject.architectureFocus}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProject.techStack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-mono text-xs font-bold text-black hover:bg-zinc-200"
                >
                  <GithubLogo className="w-4 h-4" />
                  <span>VIEW SOURCE REPOSITORY ↗</span>
                </a>
              )}
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
