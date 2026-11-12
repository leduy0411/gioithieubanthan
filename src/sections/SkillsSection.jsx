import React, { useState } from 'react'
import { skillCategories, creativeShowcase } from '../data/portfolioData'
import { Server, Palette, Video, Layers, Check, Sparkles, Terminal, Code2 } from 'lucide-react'

const ICON_MAP = {
  Server: Server,
  Palette: Palette,
  Video: Video,
  Layers: Layers
}

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
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
          TECH &amp; CREATIVE <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,217,255,0.6)]">DISCIPLINES</span>
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-[#9CA3AF] mb-6">
          A balanced synergy between resilient software engineering, refined visual graphic design, and cinematic video storytelling.
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] rounded-full shadow-[0_0_15px_#00D9FF]" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#1558C9] text-white shadow-[0_0_20px_rgba(21,88,201,0.6)] border border-[#00D9FF]'
                  : 'bg-[#0B101A] text-[#9299A6] border border-[#1B2638] hover:border-[#1558C9] hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {displayedCategories.map((category) => {
          const IconComponent = ICON_MAP[category.icon] || Server
          const isBackend = category.id === 'backend'
          const isDesign = category.id === 'design'
          const accentColor = isBackend ? '#00D9FF' : isDesign ? '#A855F7' : '#D4FF24'

          return (
            <div
              key={category.id}
              className="cyber-card p-6 sm:p-7 rounded-2xl relative group flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B2638]">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-xl border transition-colors shadow-md"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        borderColor: `${accentColor}40`,
                        color: accentColor
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {category.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-[#9CA3AF]">
                    {category.skills.length} MODULES
                  </span>
                </div>

                {/* Skills List with Progress Visualization */}
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: accentColor }}
                          />
                          <span className="font-semibold text-[#F5F7FA]">{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                          <span className="text-xs uppercase px-2 py-0.5 rounded bg-[#1B2638] text-[#9CA3AF] font-medium">
                            {skill.tag}
                          </span>
                          <span className="font-extrabold" style={{ color: accentColor }}>
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="w-full h-2 bg-[#030407] rounded-full overflow-hidden border border-[#1B2638]">
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

      {/* Multidisciplinary Deliverables Showcase Cards */}
      <div className="mt-8 pt-8 border-t border-[#1B2638]">
        <div className="text-center mb-10">
          <span className="font-mono text-sm text-[#00D9FF] font-bold uppercase tracking-wider block mb-2">
            DELIVERABLES &amp; APPLIED CRAFT
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">
            What I Deliver Across Every Discipline
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creativeShowcase.map((item, idx) => (
            <div key={idx} className="cyber-card p-7 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20 inline-block mb-3.5">
                  {item.category}
                </span>
                <h4 className="font-display font-extrabold text-xl text-white mb-2.5">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-5">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1B2638]">
                {item.tech.map((t, tIdx) => (
                  <span key={tIdx} className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#070B14] border border-[#1B2638] text-[#9CA3AF]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
