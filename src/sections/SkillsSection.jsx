import React, { useState } from 'react'
import { ArrowUpRight, Layers, Palette, Server, Video } from 'lucide-react'
import { skillCategories } from '../data/portfolioData'

const CATEGORY_META = {
  backend: { icon: Server, accent: 'cyan', number: '01', summary: 'Building dependable foundations for products and teams.' },
  design: { icon: Palette, accent: 'violet', number: '02', summary: 'Giving ideas a visual language people can recognize.' },
  video: { icon: Video, accent: 'lime', number: '03', summary: 'Turning footage, sound and pacing into a coherent story.' }
}

const FILTERS = [
  { id: 'all', label: 'Everything' },
  ...skillCategories.map(({ id, name }) => ({ id, label: name }))
]

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const visibleCategories = skillCategories.filter(
    (category) => activeFilter === 'all' || category.id === activeFilter
  )

  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="section-intro mb-10 sm:mb-14">
          <p className="section-index">03 / The toolkit</p>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="section-title">
              Tools for making
              <br />
              <span className="text-gradient">good things.</span>
            </h2>
            <p className="max-w-2xl pb-1 text-base leading-relaxed text-[#AAB6C9] sm:text-lg">
              A practical mix of software engineering and creative production —
              chosen to fit the problem, not to fill a list.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills by discipline">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveFilter(filter.id)}
                className={`skill-filter ${active ? 'skill-filter-active' : ''}`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {visibleCategories.map((category) => {
            const meta = CATEGORY_META[category.id]
            const Icon = meta.icon
            return (
              <article key={category.id} data-reveal className={`skill-panel skill-${meta.accent} cyber-card rounded-3xl p-6 sm:p-7`}>
                <div className="mb-7 flex items-start justify-between">
                  <div className="skill-icon"><Icon className="h-5 w-5" /></div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">{meta.number}</span>
                </div>

                <h3 className="mb-2 font-display text-xl font-semibold text-white">{category.name}</h3>
                <p className="mb-6 min-h-12 text-sm leading-relaxed text-[#94A2B7]">{meta.summary}</p>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className="skill-chip" title={skill.tag}>
                      {skill.name}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-[#8190A6]">
                  <span>{category.skills.length} areas of practice</span>
                  <Layers className="h-4 w-4 opacity-60" />
                </div>
              </article>
            )
          })}
        </div>

        <a
          href="#projects"
          className="skills-next-link mt-7 flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 text-sm text-[#AAB6C9] transition-colors hover:border-white/[0.16] hover:text-white sm:px-6"
        >
          <span>See how these disciplines shape my selected concepts</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#83DDE4]" />
        </a>
      </div>
    </section>
  )
}
