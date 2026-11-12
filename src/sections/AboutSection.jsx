import React from 'react'
import { personalInfo } from '../data/portfolioData'
import {
  GraduationCap,
  MapPin,
  Languages,
  CheckCircle2,
  Server,
  Palette,
  Film,
  Sparkles
} from 'lucide-react'
import {
  FCBarcelonaLogo,
  CameraDSLRLogo,
  DJTurntableLogo
} from '../components/SocialIcons'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
          ABOUT <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,217,255,0.6)]">LE DUY</span>
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] rounded-full shadow-[0_0_15px_#00D9FF]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Academic Credentials, Bio & Multilingual Capabilities */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="cyber-card p-7 sm:p-9 rounded-2xl shadow-xl">
            {/* Header with Verified Beacon */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-7 pb-5 border-b border-[#1B2638]">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/30 shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F5F7FA]">
                    IT Engineer &amp; Visual Craftsman
                  </h3>
                  <div className="flex items-center gap-2 text-sm sm:text-base font-mono text-[#00D9FF]">
                    <MapPin className="w-4 h-4 text-[#A855F7]" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <span className="cyber-badge text-xs px-3.5 py-1.5 font-bold">
                Verified Degree
              </span>
            </div>

            {/* Narrative Paragraphs with Increased Font Size */}
            <p className="font-body text-[#F5F7FA] text-base sm:text-lg lg:text-xl leading-relaxed mb-5 font-semibold">
              {personalInfo.bioShort}
            </p>

            {personalInfo.bioLong.map((para, idx) => (
              <p key={idx} className="font-body text-[#CBD5E1] text-base sm:text-lg leading-relaxed mb-4">
                {para}
              </p>
            ))}

            {/* Multilingual Communication Block */}
            <div className="mt-8 pt-6 border-t border-[#1B2638]">
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#00D9FF] uppercase tracking-wider mb-4">
                <Languages className="w-5 h-5 text-[#A855F7]" />
                <span>Multilingual Fluency</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {personalInfo.languages.map((lang, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#070B14] border border-[#1B2638] flex flex-col gap-1.5 hover:border-[#00D9FF]/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-base text-white">{lang.name}</span>
                      <span className="text-xs font-mono font-bold text-[#D4FF24]">{lang.proficiency}%</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#9CA3AF]">{lang.level}</span>
                    <div className="w-full h-1.5 bg-[#1B2638] rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-[#1558C9] via-[#00D9FF] to-[#D4FF24] rounded-full"
                        style={{ width: `${lang.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7 pt-6 border-t border-[#1B2638]">
              <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#F5F7FA]">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] shrink-0" />
                <span>Backend Architecture &amp; Scalable APIs</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#F5F7FA]">
                <CheckCircle2 className="w-5 h-5 text-[#A855F7] shrink-0" />
                <span>Adobe Photoshop &amp; Illustrator Vector Art</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#F5F7FA]">
                <CheckCircle2 className="w-5 h-5 text-[#D4FF24] shrink-0" />
                <span>Premiere Pro &amp; After Effects Motion VFX</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#F5F7FA]">
                <CheckCircle2 className="w-5 h-5 text-[#00D9FF] shrink-0" />
                <span>Database Optimization &amp; High Availability</span>
              </div>
            </div>
          </div>

          {/* Key Metrics Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {personalInfo.stats.map((stat, idx) => (
              <div key={idx} className="cyber-card p-5 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#00D9FF] mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="font-mono text-xs sm:text-sm text-[#9CA3AF] uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Three Disciplines & Lifestyle Interests */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* 3 Core Roles Summary */}
          <div className="cyber-card p-6 sm:p-7 rounded-2xl border-l-4 border-l-[#00D9FF] hover:translate-x-1 transition-transform">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#00D9FF]/15 text-[#00D9FF]">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">Backend Engineering</h4>
            </div>
            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Designing microservice systems, asynchronous message pipelines, robust data layers, and secured auth gateways with high throughput.
            </p>
          </div>

          <div className="cyber-card p-6 sm:p-7 rounded-2xl border-l-4 border-l-[#A855F7] hover:translate-x-1 transition-transform">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#A855F7]/15 text-[#A855F7]">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">Graphic Design</h4>
            </div>
            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Crafting visual identities, typography, brand assets, social media key visuals, and photo manipulation with meticulous detail in Photoshop and Illustrator.
            </p>
          </div>

          <div className="cyber-card p-6 sm:p-7 rounded-2xl border-l-4 border-l-[#D4FF24] hover:translate-x-1 transition-transform">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#D4FF24]/15 text-[#D4FF24]">
                <Film className="w-6 h-6" />
              </div>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">Video Editing &amp; Motion</h4>
            </div>
            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Assembling dynamic narratives, rhythmic beat synchronization, color grading, and custom After Effects motion graphics for modern digital audiences.
            </p>
          </div>

          {/* Lifestyle & Interests Showcase (Photography, DJing, FC Barcelona with Authentic Logos) */}
          <div className="cyber-card p-6 sm:p-7 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-sm uppercase text-[#00D9FF] font-bold tracking-wider">
                LIFESTYLE &amp; PERSONAL PASSIONS
              </span>
              <Sparkles className="w-4 h-4 text-[#D4FF24] animate-pulse" />
            </div>

            <div className="flex flex-col gap-4">
              {/* 1. Landscape Photography with Real DSLR Camera Logo */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1B2638] hover:border-[#00D9FF] flex items-center justify-between transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,217,255,0.25)]">
                <div className="flex items-center gap-3.5">
                  <div className="transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                    <CameraDSLRLogo className="w-12 h-12" />
                  </div>
                  <div>
                    <h5 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-[#00D9FF] transition-colors">
                      Landscape Photography
                    </h5>
                    <p className="text-xs sm:text-sm text-[#9CA3AF]">Golden hours, natural depth &amp; RAW color science</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF]">
                  VISUALS
                </span>
              </div>

              {/* 2. DJing with Real DJ Turntable Logo & Animated EQ Audio Bars */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1B2638] hover:border-[#D4FF24] flex items-center justify-between transition-all duration-300 group hover:shadow-[0_0_20px_rgba(212,255,36,0.25)]">
                <div className="flex items-center gap-3.5">
                  <div className="transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                    <DJTurntableLogo className="w-12 h-12" />
                  </div>
                  <div>
                    <h5 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-[#D4FF24] transition-colors">
                      DJing &amp; Electronic Music
                    </h5>
                    <p className="text-xs sm:text-sm text-[#9CA3AF]">Harmonic mixing, rhythmic cues &amp; audio flow</p>
                  </div>
                </div>
                
                {/* Animated Soundwave Equalizer Bars */}
                <div className="flex items-center gap-1 h-5 px-2 py-1 rounded bg-[#D4FF24]/10 border border-[#D4FF24]/30" title="Audio beats playing">
                  <span className="w-1 bg-[#D4FF24] rounded-full animate-pulse h-3.5" style={{ animationDuration: '0.6s' }} />
                  <span className="w-1 bg-[#00D9FF] rounded-full animate-pulse h-5" style={{ animationDuration: '0.8s' }} />
                  <span className="w-1 bg-[#A855F7] rounded-full animate-pulse h-2.5" style={{ animationDuration: '0.5s' }} />
                  <span className="w-1 bg-[#D4FF24] rounded-full animate-pulse h-4" style={{ animationDuration: '0.7s' }} />
                </div>
              </div>

              {/* 3. FC Barcelona with Official Club Crest & Blaugrana Aura */}
              <div 
                className="p-4 rounded-xl border relative overflow-hidden flex items-center justify-between transition-all duration-300 group hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 77, 152, 0.28) 0%, rgba(165, 0, 68, 0.28) 100%)',
                  borderColor: 'rgba(0, 77, 152, 0.7)',
                  boxShadow: '0 0 25px rgba(165, 0, 68, 0.25)'
                }}
              >
                {/* Blaugrana Accent Strip */}
                <div 
                  className="absolute top-0 left-0 bottom-0 w-2"
                  style={{
                    background: 'linear-gradient(180deg, #004d98 0%, #a50044 100%)'
                  }}
                />

                <div className="flex items-center gap-3.5 pl-2.5">
                  {/* Official FC Barcelona Crest */}
                  <div className="transition-transform duration-300 group-hover:scale-115 drop-shadow-[0_0_12px_rgba(237,187,0,0.6)]">
                    <FCBarcelonaLogo className="w-14 h-14" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h5 className="font-display font-extrabold text-base sm:text-lg text-white">
                        FC Barcelona
                      </h5>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded text-[#EDBB00] bg-black/60 border border-[#EDBB00]/50 shadow-sm">
                        CULER
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#F5F7FA]/90 italic font-medium">
                      "Més que un club" — Passion, Strategy &amp; Legacy
                    </p>
                  </div>
                </div>

                <div 
                  className="w-4 h-4 rounded-full mr-1"
                  style={{
                    background: 'linear-gradient(45deg, #004d98 50%, #a50044 50%)',
                    boxShadow: '0 0 10px #a50044'
                  }}
                  title="Blaugrana Colors (#004d98 / #a50044)"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
