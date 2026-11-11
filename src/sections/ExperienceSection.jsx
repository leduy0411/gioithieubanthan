import React from 'react'
import { experiences } from '../data/portfolioData'
import { Briefcase, Calendar, Terminal, CheckCircle2 } from 'lucide-react'

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="cyber-badge-lime mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>CHRONOLOGY // JOURNEY</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
          EXPERIENCE &amp; <span className="text-[#1558C9] text-glow-blue">EDUCATION</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#9299A6] mb-8">
          Hành trình phát triển sự nghiệp từ nền tảng Khoa học Máy tính đến kiến trúc sư hệ thống backend quy mô lớn.
        </p>
        <div className="w-16 h-1 bg-[#D4FF24] rounded-full shadow-[0_0_10px_#D4FF24]" />
      </div>

      {/* Futuristic Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-[#1558C9]/40 flex flex-col gap-12 ml-2 sm:ml-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#030407] border-2 border-[#1558C9] group-hover:border-[#D4FF24] group-hover:scale-125 transition-all flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] shadow-[0_0_8px_#D4FF24]" />
            </div>

            {/* Content Card */}
            <div className="cyber-card p-6 sm:p-7 rounded-2xl">
              {/* Period & Role */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#D4FF24] bg-[#D4FF24]/10 border border-[#D4FF24]/30 px-3 py-1 rounded-full w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
                <span className="font-mono text-xs text-[#9299A6] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#1558C9]" />
                  {exp.company}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-[#00D9FF] transition-colors">
                {exp.role}
              </h3>

              <p className="font-body text-[#9299A6] text-sm sm:text-base leading-relaxed mb-5">
                {exp.description}
              </p>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1B2638]">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono text-[#F5F7FA] bg-[#070B14] border border-[#1B2638] px-2.5 py-1 rounded-md"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
