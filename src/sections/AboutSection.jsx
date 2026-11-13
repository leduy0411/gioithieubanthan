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

/* ─── Discipline card data ───────────────────────────────────── */
const DISCIPLINES = [
  {
    icon: Server,
    color: '#00D9FF',
    colorSoft: 'rgba(0,217,255,0.12)',
    borderColor: '#00D9FF',
    title: 'Backend Engineering',
    desc: 'Designing microservice systems, async pipelines, robust data layers, and secured auth gateways with high throughput and reliability.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&fit=crop'
  },
  {
    icon: Palette,
    color: '#A855F7',
    colorSoft: 'rgba(168,85,247,0.12)',
    borderColor: '#A855F7',
    title: 'Graphic Design',
    desc: 'Crafting visual identities, brand assets, social media key visuals, and photo compositing with Photoshop and Illustrator.',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80&fit=crop'
  },
  {
    icon: Film,
    color: '#D4FF24',
    colorSoft: 'rgba(212,255,36,0.10)',
    borderColor: '#D4FF24',
    title: 'Video Editing & Motion',
    desc: 'Assembling dynamic narratives, beat sync, cinematic color grading, and After Effects motion graphics for modern digital audiences.',
    img: '/images/video-editing.svg'
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div data-reveal className="flex flex-col items-center text-center mb-16">
          <span className="cyber-badge mb-4">Profile</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white mb-4">
            ABOUT{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent">
              LE DUY
            </span>
          </h2>
          <div className="section-accent-line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="cyber-card p-7 sm:p-9 rounded-2xl">

              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-7 pb-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/25">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#F5F7FA]">
                      IT Engineer & Visual Craftsman
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-body text-[#00D9FF] mt-0.5">
                      <MapPin className="w-4 h-4 text-[#A855F7] shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>
                </div>
                <span className="cyber-badge text-xs">Verified Degree</span>
              </div>

              {/* Bio — font-body, font-normal, slate-300 */}
              <p className="font-body font-normal text-[#CBD5E1] text-base sm:text-lg leading-relaxed mb-4">
                {personalInfo.bioShort}
              </p>
              {personalInfo.bioLong.map((para, idx) => (
                <p key={idx} className="font-body font-normal text-[#94A3B8] text-base leading-relaxed mb-4">
                  {para}
                </p>
              ))}

              {/* Multilingual Block */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-sm font-display font-bold text-[#00D9FF] uppercase tracking-wider mb-4">
                  <Languages className="w-5 h-5 text-[#A855F7]" />
                  <span>Multilingual Fluency</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {personalInfo.languages.map((lang, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[#00D9FF]/40 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-white">{lang.name}</span>
                        <span className="text-xs font-body font-medium text-[#D4FF24]">{lang.proficiency}%</span>
                      </div>
                      <span className="text-xs font-body text-[#94A3B8]">{lang.level}</span>
                      <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#1558C9] via-[#00D9FF] to-[#D4FF24] rounded-full"
                          style={{ width: `${lang.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Competencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7 pt-6 border-t border-white/[0.06]">
                {[
                  { text: 'Backend Architecture & Scalable APIs', color: '#00D9FF' },
                  { text: 'Adobe Photoshop & Illustrator Vector Art', color: '#A855F7' },
                  { text: 'Premiere Pro & After Effects Motion VFX', color: '#D4FF24' },
                  { text: 'Database Optimization & High Availability', color: '#00D9FF' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-body text-[#CBD5E1]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: item.color }} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="cyber-card p-5 rounded-xl text-center hover:scale-105 transition-transform">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#00D9FF] mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="font-body text-xs text-[#94A3B8] uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Discipline Cards with imagery */}
            {DISCIPLINES.map((disc) => {
              const Icon = disc.icon
              return (
                <div
                  key={disc.title}
                  className="cyber-card rounded-2xl overflow-hidden group hover:translate-x-1 transition-transform"
                  style={{ borderLeftWidth: '3px', borderLeftColor: disc.color }}
                >
                  {/* Thumbnail */}
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={disc.img}
                      alt={disc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to right, ${disc.color}20, rgba(3,4,7,0.85))` }}
                    />
                    <div
                      className="absolute top-3 left-4 p-2 rounded-xl"
                      style={{ backgroundColor: disc.colorSoft, border: `1px solid ${disc.color}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: disc.color }} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-bold text-base sm:text-lg text-white mb-1.5">
                      {disc.title}
                    </h4>
                    <p className="font-body font-normal text-sm text-[#94A3B8] leading-relaxed">
                      {disc.desc}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Lifestyle & Interests */}
            <div className="cyber-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-5">
                <span className="font-display font-bold text-sm uppercase text-[#00D9FF] tracking-wider">
                  Lifestyle & Passions
                </span>
                <Sparkles className="w-4 h-4 text-[#D4FF24] animate-pulse" />
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Landscape Photography */}
                <div className="relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[#00D9FF]/40 flex items-center gap-3.5 transition-all group overflow-hidden">
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
                      Golden hours, natural depth & RAW color science
                    </p>
                  </div>
                  <span className="ml-auto relative z-10 text-xs font-body font-medium px-2 py-0.5 rounded bg-[#00D9FF]/10 border border-[#00D9FF]/25 text-[#00D9FF] shrink-0">
                    VISUALS
                  </span>
                </div>

                {/* DJing */}
                <div className="relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[#D4FF24]/40 flex items-center gap-3.5 transition-all group overflow-hidden">
                  <img
                    src="/images/dj-console.svg"
                    alt="DJing"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity"
                    loading="lazy"
                  />
                  <DJTurntableLogo className="w-11 h-11 shrink-0 relative z-10" />
                  <div className="relative z-10">
                    <h5 className="font-display font-bold text-sm text-white group-hover:text-[#D4FF24] transition-colors">
                      DJing & Electronic Music
                    </h5>
                    <p className="font-body text-xs text-[#94A3B8]">
                      Harmonic mixing, rhythmic cues & audio flow
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
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* FC Barcelona */}
                <div
                  className="relative p-4 rounded-xl border flex items-center gap-3.5 transition-all group hover:scale-[1.02] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,77,152,0.2) 0%, rgba(165,0,68,0.2) 100%)',
                    borderColor: 'rgba(0,77,152,0.5)'
                  }}
                >
                  {/* Blaugrana stripe */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5 rounded-l-xl"
                    style={{ background: 'linear-gradient(180deg, #004d98 0%, #a50044 100%)' }}
                  />
                  <div className="pl-2 shrink-0">
                    <FCBarcelonaLogo className="w-12 h-12 drop-shadow-[0_0_10px_rgba(237,187,0,0.5)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h5 className="font-display font-bold text-sm text-white">FC Barcelona</h5>
                      <span className="text-xs font-body font-medium px-1.5 py-0.5 rounded text-[#EDBB00] bg-black/60 border border-[#EDBB00]/40">
                        CULER
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#F5F7FA]/80 italic">
                      "Més que un club" — Passion, Strategy & Legacy
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
