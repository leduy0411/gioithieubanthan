import React from 'react'
import { personalInfo } from '../data/portfolioData'
import { Shield, Zap, Database, GitMerge, Award, CheckCircle2, Terminal } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="cyber-badge-lime mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>SYS_INFO // ABOUT ME</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
          ENGINEERING <span className="text-[#1558C9] text-glow-blue">HIGH-PERFORMANCE</span> BACKENDS
        </h2>
        <div className="w-16 h-1 bg-[#D4FF24] rounded-full shadow-[0_0_10px_#D4FF24]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Bio Card with Glassmorphism */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="cyber-card p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1B2638]">
              <div className="w-3 h-3 rounded-full bg-[#1558C9] shadow-[0_0_8px_#1558C9]" />
              <h3 className="font-display font-bold text-xl text-[#F5F7FA]">
                Định Hướng &amp; Tầm Nhìn Kỹ Thuật
              </h3>
            </div>

            <p className="font-body text-[#F5F7FA] text-base sm:text-lg leading-relaxed mb-4 font-medium">
              {personalInfo.bioShort}
            </p>

            {personalInfo.bioLong.map((para, idx) => (
              <p key={idx} className="font-body text-[#9299A6] text-sm sm:text-base leading-relaxed mb-3">
                {para}
              </p>
            ))}

            {/* Quick Principles Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-[#1B2638]">
              <div className="flex items-center gap-2 text-sm text-[#F5F7FA]">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF24] shrink-0" />
                <span>Microservices &amp; Event-Driven</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F5F7FA]">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF24] shrink-0" />
                <span>Zero-Downtime Deployment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F5F7FA]">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF24] shrink-0" />
                <span>High Concurrency &amp; Low Latency</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F5F7FA]">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF24] shrink-0" />
                <span>Enterprise API Security (PCI/OAuth)</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {personalInfo.stats.map((stat, idx) => (
              <div key={idx} className="cyber-card p-4 rounded-xl text-center">
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#D4FF24] mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="font-mono text-xs text-[#9299A6] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pillars of Excellence */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="cyber-card p-6 rounded-2xl border-l-4 border-l-[#1558C9]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#1558C9]/20 text-[#00D9FF]">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-white">Concurrency &amp; Throughput</h4>
            </div>
            <p className="text-xs sm:text-sm text-[#9299A6] leading-relaxed">
              Xây dựng giải pháp xử lý song song (Multi-threading, Async I/O, Worker pools) chịu tải hàng chục ngàn kết nối đồng thời mà không nghẽn tài nguyên.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-2xl border-l-4 border-l-[#D4FF24]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#D4FF24]/15 text-[#D4FF24]">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-white">Database Optimization</h4>
            </div>
            <p className="text-xs sm:text-sm text-[#9299A6] leading-relaxed">
              Tối ưu hóa chỉ mục (Indexing), Partitioning, Sharding và chiến lược Caching phân tầng (Multi-tier Cache) với Redis để duy trì truy vấn &lt; 10ms.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-2xl border-l-4 border-l-[#00D9FF]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#00D9FF]/15 text-[#00D9FF]">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-white">Robust Security &amp; Auth</h4>
            </div>
            <p className="text-xs sm:text-sm text-[#9299A6] leading-relaxed">
              Thiết kế cổng API bảo mật đa lớp: Rate limiting, JWT/mTLS, mã hóa AES-256 dữ liệu nhạy cảm, chống tấn công DDoS, SQLi, XSS &amp; Replay.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-2xl border-l-4 border-l-[#1558C9]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#1558C9]/20 text-[#00D9FF]">
                <GitMerge className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-white">DevOps &amp; Cloud Native</h4>
            </div>
            <p className="text-xs sm:text-sm text-[#9299A6] leading-relaxed">
              Container hóa với Docker, điều phối Kubernetes, thiết lập CI/CD pipeline tự động kiểm thử và triển khai hạ tầng đám mây tin cậy.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
