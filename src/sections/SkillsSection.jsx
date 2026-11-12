import React, { useState } from 'react'
import { skillCategories, creativeShowcase } from '../data/portfolioData'
import { Server, Palette, Video, Layers } from 'lucide-react'

const ICON_MAP = { Server, Palette, Video, Layers }

/* Unsplash showcase images for creative deliverables */
const SHOWCASE_IMGS = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=75&fit=crop', // server
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=75&fit=crop', // design
  '/images/video-editing.svg' // video
]

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all')

  const categories = [
    { id: 'all', name: 'All Disciplines' },
    ...skillCategories.map((c) => ({ id: c.id, name: c.name }))
  ]

  const displayedCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeTab)

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="cyber-badge mb-4">Expertise Matrix</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white mb-3">
            TECH & CREATIVE{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent">
              DISCIPLINES
            </span>
          </h2>
          <p className="font-body font-normal max-w-xl text-sm sm:text-base text-[#94A3B8] mb-5 leading-relaxed">
            A balanced synergy between resilient software engineering, refined graphic design, and cinematic video storytelling.
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
                className={`px-5 py-2.5 rounded-xl text-sm font-display font-bold tracking-wide transition-all duration-200 cursor-pointer ${
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
                className="cyber-card p-6 sm:p-7 rounded-2xl flex flex-col group"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl border"
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
                  <span className="font-body font-medium text-xs text-[#94A3B8] uppercase tracking-wide">
                    {category.skills.length} modules
                  </span>
                </div>

                {/* Skills List */}
                <div className="flex flex-col gap-4 flex-1">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: accentColor }}
                          />
                          <span className="font-body font-medium text-[#CBD5E1]">{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body text-xs px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.07] text-[#94A3B8]">
                            {skill.tag}
                          </span>
                          <span className="font-display font-bold text-xs" style={{ color: accentColor }}>
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
            )
          })}
        </div>

        {/* ── Deliverables Showcase ── */}
        <div className="pt-10 border-t border-white/[0.06]">
          <div className="text-center mb-10">
            <span className="cyber-badge mb-3 inline-block">Applied Craft</span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              What I Deliver Across Every Discipline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creativeShowcase.map((item, idx) => (
              <div key={idx} className="cyber-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform group">
                {/* Thumbnail */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={SHOWCASE_IMGS[idx]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-[#030407]/60 to-transparent" />
                  <span className="absolute top-3 left-3 font-body font-medium text-xs px-3 py-1 rounded-full bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/25">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="font-body font-normal text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                    {item.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-body font-medium text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[#94A3B8]"
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

      </div>
    </section>
  )
}
