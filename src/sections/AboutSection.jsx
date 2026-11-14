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
  Sparkles,
  Award,
  Globe2
} from 'lucide-react'
import {
  FCBarcelonaLogo,
  CameraDSLRLogo,
  DJTurntableLogo
} from '../components/SocialIcons'

/* ─── Discipline card data with Unsplash thumbnails ─────────── */
const DISCIPLINES = [
  {
    icon: Server,
    color: '#00D9FF',
    colorSoft: 'rgba(0,217,255,0.12)',
    title: 'Backend Engineering',
    desc: 'Designing microservice systems, async message pipelines, robust data layers, and secured auth gateways with high throughput and rock-solid uptime.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&fit=crop',
    tag: 'SYSTEMS'
  },
  {
    icon: Palette,
    color: '#A855F7',
    colorSoft: 'rgba(168,85,247,0.12)',
    title: 'Graphic Design',
    desc: 'Crafting brand identity systems, modern UI visuals, social media campaign key art, and detailed photo manipulation with Photoshop & Illustrator.',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80&fit=crop',
    tag: 'BRANDING'
  },
  {
    icon: Film,
    color: '#D4FF24',
    colorSoft: 'rgba(212,255,36,0.10)',
    title: 'Video Editing & Motion',
    desc: 'Assembling dynamic visual narratives, rhythmic beat synchronization, cinematic color grading, and custom After Effects motion graphics.',
    img: 'https://images.unsplash.com/photo-1536240478700-b869ad10c746?w=600&q=80&fit=crop',
    tag: 'CINEMATIC'
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101A] border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] mb-3 shadow-[0_0_15px_rgba(0,217,255,0.15)]">
            <Award className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>01 // PROFESSIONAL BACKGROUND</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
            ABOUT{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent">
              LE DUY
            </span>
          </h2>
          <div className="section-accent-line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left Column: Credentials & Bio & Languages ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="cyber-card p-7 sm:p-9 rounded-2xl">

              {/* Card Header: Degree & Location */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-7 pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30 shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F7FA]">
                      IT Engineer &amp; Visual Craftsman
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-body text-[#00D9FF] mt-1">
                      <MapPin className="w-4 h-4 text-[#A855F7] shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>
                </div>
                <span className="cyber-badge text-xs px-3.5 py-1.5 font-bold">
                  Verified Degree
                </span>
              </div>

              {/* Bio Narrative */}
              <p className="font-body font-normal text-[#F5F7FA] text-base sm:text-lg leading-relaxed mb-4 font-medium">
                {personalInfo.bioShort}
              </p>
              {personalInfo.bioLong.map((para, idx) => (
                <p key={idx} className="font-body font-normal text-[#CBD5E1] text-sm sm:text-base leading-relaxed mb-4">
                  {para}
                </p>
              ))}

              {/* Multilingual Communication Block */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 text-sm font-display font-bold text-[#00D9FF] uppercase tracking-wider mb-4">
                  <Languages className="w-4 h-4 text-[#A855F7]" />
                  <span>Multilingual Fluency</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {personalInfo.languages.map((lang, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#00D9FF]/40 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-white">{lang.name}</span>
                        <span className="text-xs font-mono font-bold text-[#D4FF24]">{lang.proficiency}%</span>
                      </div>
                      <span className="text-xs font-body text-[#94A3B8]">{lang.level}</span>
                      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mt-2.5">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7 pt-6 border-t border-white/[0.08]">
                {[
                  { text: 'Backend Architecture & Scalable APIs', color: '#00D9FF' },
                  { text: 'Adobe Photoshop & Illustrator Vector Art', color: '#A855F7' },
                  { text: 'Premiere Pro & After Effects Motion VFX', color: '#D4FF24' },
                  { text: 'Database Optimization & High Availability', color: '#00D9FF' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-body text-[#CBD5E1]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="cyber-card p-5 rounded-xl text-center hover:scale-105 transition-transform">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#00D9FF] mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="font-body text-xs text-[#94A3B8] uppercase tracking-wide font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Disciplines & Passions ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* 3 Discipline Cards with Imagery */}
            {DISCIPLINES.map((disc) => {
              const Icon = disc.icon
              return (
                <div
                  key={disc.title}
                  className="cyber-card rounded-2xl overflow-hidden group hover:translate-x-1 transition-transform"
                  style={{ borderLeftWidth: '3px', borderLeftColor: disc.color }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={disc.img}
                      alt={disc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to right, ${disc.color}25, rgba(3,4,7,0.92))` }}
                    />
                    <div
                      className="absolute top-3 left-4 p-2 rounded-xl backdrop-blur-md"
                      style={{ backgroundColor: disc.colorSoft, border: `1px solid ${disc.color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: disc.color }} />
                    </div>
                    <span className="absolute top-3 right-3 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 border border-white/10 text-white">
                      {disc.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-bold text-base sm:text-lg text-white mb-1.5">
                      {disc.title}
                    </h4>
                    <p className="font-body font-normal text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {disc.desc}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Lifestyle & Passions Showcase */}
            <div className="cyber-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-5">
                <span className="font-display font-bold text-xs uppercase text-[#00D9FF] tracking-wider">
                  Lifestyle &amp; Personal Passions
                </span>
                <Sparkles className="w-4 h-4 text-[#D4FF24] animate-pulse" />
              </div>

              <div className="flex flex-col gap-3.5">
                {/* 1. Landscape Photography */}
                <div className="relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#00D9FF]/40 flex items-center gap-3.5 transition-all group overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=70&fit=crop"
                    alt="Landscape Photography"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity"
                    loading="lazy"
                  />
                  <CameraDSLRLogo className="w-11 h-11 shrink-0 relative z-10" />
                  <div className="relative z-10">
                    <h5 className="font-display font-bold text-sm text-white group-hover:text-[#00D9FF] transition-colors">
                      Landscape Photography
                    </h5>
                    <p className="font-body text-xs text-[#94A3B8]">
                      Golden hours, natural depth &amp; RAW color science
                    </p>
                  </div>
                  <span className="ml-auto relative z-10 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00D9FF]/10 border border-[#00D9FF]/25 text-[#00D9FF] shrink-0">
                    VISUALS
                  </span>
                </div>

                {/* 2. DJing & Electronic Music */}
                <div className="relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#D4FF24]/40 flex items-center gap-3.5 transition-all group overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1571266028243-d220c6a4c5e2?w=200&q=70&fit=crop"
                    alt="DJing"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity"
                    loading="lazy"
                  />
                  <DJTurntableLogo className="w-11 h-11 shrink-0 relative z-10" />
                  <div className="relative z-10">
                    <h5 className="font-display font-bold text-sm text-white group-hover:text-[#D4FF24] transition-colors">
                      DJing &amp; Electronic Music
                    </h5>
                    <p className="font-body text-xs text-[#94A3B8]">
                      Harmonic mixing, rhythmic cues &amp; audio flow
                    </p>
                  </div>
                  <div className="ml-auto flex items-end gap-0.5 h-6 relative z-10 shrink-0">
                    {[0.6, 0.9, 0.5, 0.75, 0.6].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full animate-eq-bar"
                        style={{
                          height: `${h * 100}%`,
                          backgroundColor: i % 2 === 0 ? '#D4FF24' : '#00D9FF',
                          animationDelay: `${i * 0.12}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 3. FC Barcelona */}
                <div
                  className="relative p-4 rounded-xl border flex items-center gap-3.5 transition-all group hover:scale-[1.02] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,77,152,0.3) 0%, rgba(165,0,68,0.3) 100%)',
                    borderColor: 'rgba(0,77,152,0.65)',
                    boxShadow: '0 0 20px rgba(165,0,68,0.2)'
                  }}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5 rounded-l-xl"
                    style={{ background: 'linear-gradient(180deg, #004d98 0%, #a50044 100%)' }}
                  />
                  <div className="pl-2 shrink-0">
                    <FCBarcelonaLogo className="w-12 h-12 drop-shadow-[0_0_10px_rgba(237,187,0,0.6)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h5 className="font-display font-bold text-sm text-white">FC Barcelona</h5>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-[#EDBB00] bg-black/60 border border-[#EDBB00]/40">
                        CULER
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#F5F7FA]/85 italic">
                      "Més que un club" — Passion, Strategy &amp; Legacy
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
