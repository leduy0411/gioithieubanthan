import React, { useState } from 'react'
import { projects } from '../data/portfolioData'
import { ExternalLink, Terminal, ArrowUpRight, Cpu, Layers } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="cyber-badge-lime mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>PORTFOLIO_SYSTEM // SHOWCASE</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
          FEATURED <span className="text-[#1558C9] text-glow-blue">PROJECTS</span> &amp; ARCHITECTURES
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-[#9299A6] mb-8">
          Tuyển chọn những hệ sinh thái vi dịch vụ, pipeline xử lý dữ liệu lớn và cổng thanh toán bảo mật cao mà tôi đã trực tiếp thiết kế và triển khai.
        </p>
        <div className="w-16 h-1 bg-[#D4FF24] rounded-full shadow-[0_0_10px_#D4FF24]" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onMouseEnter={() => setHoveredProject(proj.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="cyber-card rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
          >
            {/* Top Preview Image Container */}
            <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#070B14] border-b border-[#1B2638]">
              {/* Image with zoom on hover */}
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B101A] via-transparent to-transparent opacity-80" />

              {/* Category Badge (Top-Left) */}
              <div className="absolute top-4 left-4 z-10">
                <span className="cyber-badge backdrop-blur-md">
                  <Layers className="w-3 h-3 text-[#1558C9]" />
                  <span>{proj.category}</span>
                </span>
              </div>

              {/* Top Right Quick Stats HUD */}
              {proj.stats && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-[#030407]/85 border border-[#1B2638] backdrop-blur-md px-3 py-1 rounded-lg font-mono text-[11px] text-[#D4FF24]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-ping" />
                  <span>{Object.values(proj.stats)[0]}</span>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                  {proj.title}
                </h3>
                
                <p className="font-body text-[#9299A6] text-sm leading-relaxed mb-6">
                  {proj.description}
                </p>

                {/* Performance Metrics Pills */}
                {proj.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-[#030407]/60 border border-[#1B2638] font-mono text-xs">
                    {Object.entries(proj.stats).map(([k, v], i) => (
                      <div key={i} className="text-center">
                        <span className="text-[10px] text-[#9299A6] uppercase block truncate">{k}</span>
                        <span className="text-[#F5F7FA] font-bold text-xs">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#070B14] border border-[#1B2638] text-[#9299A6] group-hover:border-[#1558C9]/40 group-hover:text-[#F5F7FA] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1B2638]">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lime flex-1 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>LIVE ARCHITECTURE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View GitHub Repository"
                  className="p-2.5 rounded-xl bg-[#070B14] border border-[#1B2638] text-[#9299A6] hover:text-white hover:border-[#1558C9] hover:bg-[#1558C9]/20 transition-all flex items-center justify-center"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
