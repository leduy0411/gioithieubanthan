import React, { useState } from 'react'
import { skillCategories } from '../data/portfolioData'
import { Server, Code2, Database, Cloud, Layout, Check, Sparkles, Terminal } from 'lucide-react'

const ICON_MAP = {
  Server: Server,
  Code2: Code2,
  Database: Database,
  Cloud: Cloud,
  Layout: Layout
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all')

  const categories = [
    { id: 'all', name: 'Tất Cả Kỹ Năng' },
    ...skillCategories.map((c) => ({ id: c.id, name: c.name }))
  ]

  const displayedCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeTab)

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="cyber-badge-lime mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>TECH_MATRIX // EXPERTISE</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
          TECHNICAL <span className="text-[#1558C9] text-glow-blue">STACK</span> &amp; SKILLS
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-[#9299A6] mb-8">
          Hệ thống kỹ năng chuyên sâu được tôi rèn luyện qua các dự án thực tế, tập trung vào kiến trúc backend vững chắc, cơ sở dữ liệu mở rộng và hạ tầng Cloud.
        </p>
        <div className="w-16 h-1 bg-[#D4FF24] rounded-full shadow-[0_0_10px_#D4FF24]" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedCategories.map((category) => {
          const IconComponent = ICON_MAP[category.icon] || Server
          return (
            <div
              key={category.id}
              className="cyber-card p-6 sm:p-7 rounded-2xl relative group"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B2638]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1558C9]/20 text-[#00D9FF] border border-[#1558C9]/30 group-hover:border-[#D4FF24] group-hover:text-[#D4FF24] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                    {category.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#9299A6]">
                  {category.skills.length} MODULES
                </span>
              </div>

              {/* Skills List with Progress Visualization */}
              <div className="flex flex-col gap-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1558C9] group-hover:bg-[#D4FF24] transition-colors" />
                        <span className="font-medium text-[#F5F7FA]">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#1B2638] text-[#9299A6]">
                          {skill.tag}
                        </span>
                        <span className="text-[#D4FF24] font-bold">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-1.5 bg-[#030407] rounded-full overflow-hidden border border-[#1B2638]">
                      <div
                        className="h-full bg-gradient-to-r from-[#1558C9] to-[#D4FF24] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
