import React from 'react'
import Character3D from '../components/Character3D'
import { personalInfo } from '../data/portfolioData'
import { ArrowRight, Mail, Terminal, Cpu, Database, Server, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: 3D Character Avatar (Arms Crossed, Black Suit, White Shirt) */}
        <div className="lg:col-span-6 order-2 lg:order-1 relative flex items-center justify-center">
          {/* Subtle Cyber Aura behind character */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#1558C9]/25 blur-[120px] pointer-events-none" />
          
          {/* Interactive 3D Character Canvas */}
          <div className="w-full max-w-[500px]">
            <Character3D fallbackImage={personalInfo.avatarUrl} />
          </div>

          {/* Floating Telemetry Code Snippet Widget (Bottom-Left) */}
          <div className="hidden sm:flex absolute -bottom-4 left-0 z-20 items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B101A]/90 border border-[#1B2638] shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4FF24] animate-pulse" />
            <div className="font-mono text-[11px] leading-tight">
              <span className="text-[#9299A6]">CLUSTER // </span>
              <span className="text-[#00D9FF]">US-EAST-1</span>
              <div className="text-[#D4FF24] font-semibold">99.99% UPTIME • 14ms P99</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Brand Title, Tagline & CTAs */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101A] border border-[#1558C9]/40 mb-6 shadow-[0_0_15px_rgba(21,88,201,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#D4FF24] shadow-[0_0_8px_#D4FF24] animate-ping" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[#00D9FF]">
              {personalInfo.status}
            </span>
          </div>

          {/* Main Greeting & Name with Electric Blue Glow */}
          <div className="mb-3">
            <span className="font-mono text-sm sm:text-base tracking-[0.2em] text-[#9299A6] uppercase block mb-1">
              HI, I'M
            </span>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white">
              <span className="bg-gradient-to-r from-white via-[#00D9FF] to-[#1558C9] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(21,88,201,0.65)]">
                DUY
              </span>
            </h1>
          </div>

          {/* Role Header */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-0.5 w-8 bg-[#D4FF24] hidden sm:block shadow-[0_0_8px_#D4FF24]" />
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-widest text-[#D4FF24]">
              {personalInfo.role}
            </h2>
          </div>

          {/* Tagline / Subtitle */}
          <p className="font-body text-[#9299A6] text-base sm:text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            {personalInfo.titleSuffix}
          </p>

          {/* Quick Architecture Stack Highlights */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 max-w-lg">
            <span className="cyber-badge">
              <Server className="w-3 h-3 text-[#1558C9]" />
              <span>Microservices</span>
            </span>
            <span className="cyber-badge">
              <Cpu className="w-3 h-3 text-[#00D9FF]" />
              <span>High Concurrency</span>
            </span>
            <span className="cyber-badge">
              <Database className="w-3 h-3 text-[#D4FF24]" />
              <span>Distributed Data</span>
            </span>
            <span className="cyber-badge">
              <Terminal className="w-3 h-3 text-[#1558C9]" />
              <span>Clean Architecture</span>
            </span>
          </div>

          {/* Two CTAs as explicitly mandated */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="btn-lime w-full sm:w-auto px-7 py-3.5 rounded-xl font-display font-bold text-sm tracking-wider flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="btn-secondary w-full sm:w-auto px-7 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wider flex items-center justify-center gap-2 group cursor-pointer hover:border-[#1558C9]"
            >
              <Mail className="w-4 h-4 text-[#1558C9] group-hover:text-[#D4FF24] transition-colors" />
              <span>CONTACT ME</span>
            </button>
          </div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator at Bottom */}
      <div 
        onClick={() => scrollTo('about')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="font-mono text-[10px] tracking-widest text-[#9299A6] group-hover:text-[#D4FF24] transition-colors">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-[#1B2638] flex items-start justify-center p-1 group-hover:border-[#D4FF24] transition-colors">
          <div className="w-1.5 h-2 rounded-full bg-[#D4FF24] shadow-[0_0_6px_#D4FF24] animate-bounce" />
        </div>
      </div>
    </section>
  )
}
