import React, { useState } from 'react'
import { projectShowcase } from '../data/portfolioData'
import { ArrowDownRight, ChevronDown, Layers } from 'lucide-react'

const FILTERS = [
  { id: 'all', label: 'All concepts' },
  { id: 'platform', label: 'Platforms' },
  { id: 'data', label: 'Data systems' },
  { id: 'security', label: 'Security' }
]

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedProject, setExpandedProject] = useState(null)
  const visibleProjects = projectShowcase.filter(
    (project) => activeFilter === 'all' || project.filter === activeFilter
  )

  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="section-intro mb-12 sm:mb-16">
          <p className="section-index">02 / Selected work</p>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="section-title">
              System
              <br />
              <span className="text-gradient">concepts.</span>
            </h2>
            <p className="max-w-2xl pb-1 text-base leading-relaxed text-[#AAB6C9] sm:text-lg">
              A few architecture and visual concepts that explore the kinds of
              systems I enjoy thinking about. These are concept studies, not
              claims of production deployment or measured performance.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter concepts by topic">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border-[#A99AFF]/60 bg-[#A99AFF]/10 text-[#D3CBFF] shadow-[0_0_24px_rgba(169,154,255,0.14)]'
                    : 'border-white/[0.09] bg-white/[0.025] text-[#9AAAC0] hover:border-white/20 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {visibleProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id
            const detailId = `project-details-${project.id}`
            const isFeature = index === 0

            return (
              <article
                key={project.id}
                className={`cyber-card group overflow-hidden rounded-2xl ${
                  isFeature ? 'lg:col-span-6 lg:grid lg:grid-cols-[1.2fr_0.8fr]' : 'lg:col-span-2'
                }`}
              >
                <div className={`relative overflow-hidden bg-[#070B14] ${
                  isFeature
                    ? 'aspect-[16/9] border-b border-white/[0.07] lg:aspect-auto lg:min-h-[400px] lg:border-b-0 lg:border-r'
                    : 'aspect-[16/9] border-b border-white/[0.07]'
                }`}>
                  <img
                    src={project.image}
                    alt={`Hình minh họa concept ${project.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/75 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#070B14]/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    <Layers className="h-3.5 w-3.5 text-[#A99AFF]" />
                    {project.category}
                  </span>
                  <span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.18em] text-white/65">
                    CONCEPT / {project.id.toUpperCase()}
                  </span>
                </div>

                <div className={`p-5 sm:p-7 ${isFeature ? 'lg:flex lg:flex-col lg:justify-center lg:p-8' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[#A99AFF]">
                        0{projectShowcase.indexOf(project) + 1} / SYSTEM CONCEPT
                      </p>
                      <h3 className="mb-2 font-display text-xl font-bold text-white transition-colors group-hover:text-[#D3CBFF] sm:text-2xl">
                        {project.name}
                      </h3>
                    </div>
                    <ArrowDownRight className="mt-1 h-5 w-5 shrink-0 text-[#71839D] transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-[#A99AFF]" />
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-[#AEBBD0]">
                    {project.summary}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] text-[#9AAAC0]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={detailId}
                    onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                    className="flex w-full items-center justify-between border-t border-white/[0.07] pt-4 text-left text-sm font-semibold text-[#DCE7F5] transition-colors hover:text-[#A99AFF]"
                  >
                    <span>{isExpanded ? 'Close design notes' : 'Explore design notes'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <div id={detailId} hidden={!isExpanded} className="pt-4 text-sm leading-relaxed text-[#9AAAC0]">
                    {project.focus}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
