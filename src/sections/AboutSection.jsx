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
  Globe2,
  ArrowUpRight,
  ShieldCheck,
  Camera,
  Music2,
  Flame
} from 'lucide-react'
import {
  FCBarcelonaLogo,
  CameraDSLRLogo,
  DJTurntableLogo
} from '../components/SocialIcons'

/* 3 Core Disciplines with 100% Guaranteed Local Vector Illustrations (No Broken Images!) */
const DISCIPLINES = [
  {
    id: 'backend',
    icon: Server,
    color: '#00D9FF',
    title: 'Backend Engineering',
    badge: 'API & CLOUD',
    desc: 'Designing microservice systems, async message pipelines, resilient database layers, and secured OAuth2 gateways with high availability.',
    img: '/images/backend-architecture.svg',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    id: 'design',
    icon: Palette,
    color: '#A855F7',
    title: 'Graphic Design',
    badge: 'BRAND IDENTITY',
    desc: 'Crafting brand visual identity systems, typography direction, vector key visuals, and photo manipulation with Photoshop & Illustrator.',
    img: '/images/graphic-design.svg',
    tags: ['Photoshop', 'Illustrator', 'Branding', 'Vector']
  },
  {
    id: 'video',
    icon: Film,
    color: '#D4FF24',
    title: 'Video Editing & Motion',
    badge: 'CINEMATIC VFX',
    desc: 'Assembling dynamic visual narratives, beat synchronization, cinematic color grading, and custom After Effects motion graphics.',
    img: '/images/video-editing.svg',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading', 'Sound Sync']
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101A] border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] mb-3 shadow-[0_0_15px_rgba(0,217,255,0.15)]">
            <Award className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>01 // ARCHITECT &amp; CREATOR PROFILE</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
            ABOUT{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent">
              LE DUY
            </span>
          </h2>
          <p className="font-body font-normal max-w-xl text-sm sm:text-base text-[#94A3B8] mb-5 leading-relaxed">
            A versatile bridge between dependable software engineering logic and high-impact visual &amp; cinematic artistic instinct.
          </p>
          <div className="section-accent-line" />
        </div>

        {/* ── INNOVATIVE ASYMMETRIC BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* ── BENTO 1: Main Engineer Identity & Narrative (Spans 8 cols on desktop) ── */}
          <div className="md:col-span-12 lg:col-span-8 cyber-card p-7 sm:p-9 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30 shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      IT Engineer &amp; Visual Craftsman
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-body text-[#00D9FF] mt-1">
                      <MapPin className="w-4 h-4 text-[#A855F7] shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>
                </div>

                <span className="cyber-badge text-xs px-3.5 py-1.5 font-bold">
                  Verified Degree
                </span>
              </div>

              {/* Bio Paragraphs */}
              <p className="font-body text-[#F5F7FA] text-base sm:text-lg leading-relaxed mb-4 font-medium">
                {personalInfo.bioShort}
              </p>
              {personalInfo.bioLong.map((para, idx) => (
                <p key={idx} className="font-body text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-3">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Competencies Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/[0.08]">
              {[
                { text: 'Backend Architecture & Scalable APIs', color: '#00D9FF' },
                { text: 'Adobe Photoshop & Illustrator Vector Art', color: '#A855F7' },
                { text: 'Premiere Pro & After Effects Motion VFX', color: '#D4FF24' },
                { text: 'Database Optimization & High Availability', color: '#00D9FF' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-body text-[#CBD5E1]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── BENTO 2: Multilingual Fluency & Key Metrics (Spans 4 cols on desktop) ── */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Multilingual Card */}
            <div className="cyber-card p-6 sm:p-7 rounded-2xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
                    <Languages className="w-4 h-4 text-[#A855F7]" />
                    <span>GLOBAL LANGUAGES</span>
                  </div>
                  <Globe2 className="w-4 h-4 text-[#D4FF24]" />
                </div>

                <div className="flex flex-col gap-4">
                  {personalInfo.languages.map((lang, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#00D9FF]/40 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-white">{lang.name}</span>
                        <span className="text-xs font-mono font-bold text-[#D4FF24]">{lang.proficiency}%</span>
                      </div>
                      <span className="text-xs font-body text-[#94A3B8]">{lang.level}</span>
                      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#1558C9] via-[#00D9FF] to-[#D4FF24] rounded-full"
                          style={{ width: `${lang.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              {personalInfo.stats.slice(0, 2).map((stat, idx) => (
                <div key={idx} className="cyber-card p-4 rounded-xl text-center">
                  <div className="font-display font-bold text-2xl text-[#00D9FF] mb-0.5">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="font-body text-[11px] text-[#94A3B8] uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── BENTO 3: Triple Discipline Production Showcase (3 Cards across full width) ── */}
          <div className="md:col-span-12 mt-2">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase text-[#00D9FF] tracking-wider font-bold">
                CORE PRODUCTION PILLARS
              </span>
              <span className="font-mono text-xs text-[#94A3B8]">03 SPECIALIZED DISCIPLINES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DISCIPLINES.map((disc) => {
                const Icon = disc.icon
                return (
                  <div
                    key={disc.id}
                    className="cyber-card rounded-2xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    style={{ borderTopWidth: '3px', borderTopColor: disc.color }}
                  >
                    <div>
                      {/* Local SVG Graphic Banner */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#070B14] border-b border-white/[0.08]">
                        <img
                          src={disc.img}
                          alt={disc.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-transparent opacity-85" />
                        
                        <div
                          className="absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md"
                          style={{ backgroundColor: `${disc.color}20`, border: `1px solid ${disc.color}50` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: disc.color }} />
                        </div>

                        <span className="absolute top-3 right-3 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/70 border border-white/10 text-white">
                          {disc.badge}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                          {disc.title}
                        </h4>
                        <p className="font-body text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                          {disc.desc}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.08]">
                        {disc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── BENTO 4: Lifestyle, Passions & FC Barcelona Tribute (3 Cards) ── */}
          <div className="md:col-span-12 mt-2">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase text-[#A855F7] tracking-wider font-bold">
                LIFESTYLE &amp; PERSONAL PASSIONS
              </span>
              <Sparkles className="w-4 h-4 text-[#D4FF24] animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 1. FC Barcelona Official Blaugrana Card */}
              <div
                className="cyber-card p-6 rounded-2xl relative overflow-hidden transition-all duration-300 group hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 77, 152, 0.35) 0%, rgba(165, 0, 68, 0.35) 100%)',
                  borderColor: 'rgba(0, 77, 152, 0.7)',
                  boxShadow: '0 0 25px rgba(165, 0, 68, 0.25)'
                }}
              >
                <div
                  className="absolute top-0 left-0 bottom-0 w-2"
                  style={{ background: 'linear-gradient(180deg, #004d98 0%, #a50044 100%)' }}
                />
                
                <div className="flex items-center justify-between mb-4 pl-1">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded text-[#EDBB00] bg-black/60 border border-[#EDBB00]/50">
                    ★ CULER SUPPORTER
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full" style={{ background: 'linear-gradient(45deg, #004d98 50%, #a50044 50%)' }} />
                </div>

                <div className="flex items-center gap-4 mb-3 pl-1">
                  <FCBarcelonaLogo className="w-14 h-14 shrink-0 drop-shadow-[0_0_12px_rgba(237,187,0,0.7)] group-hover:scale-110 transition-transform" />
                  <div>
                    <h5 className="font-display font-bold text-lg text-white">FC Barcelona</h5>
                    <p className="font-body text-xs text-[#F5F7FA]/90 italic font-medium">
                      "Més que un club"
                    </p>
                  </div>
                </div>
                <p className="font-body text-xs text-[#CBD5E1] leading-relaxed pl-1">
                  Passion, tactical strategy, legendary tiki-taka heritage, and proud support for the Blaugrana spirit.
                </p>
              </div>

              {/* 2. Landscape Photography Card */}
              <div className="cyber-card rounded-2xl overflow-hidden group hover:border-[#00D9FF]/50 transition-all">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#070B14]">
                  <img
                    src="/images/landscape-photography.svg"
                    alt="Landscape Photography"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 border border-[#00D9FF]/30 text-[#00D9FF]">
                    RAW 35MM
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <CameraDSLRLogo className="w-6 h-6 shrink-0" />
                    <h5 className="font-display font-bold text-base text-white group-hover:text-[#00D9FF] transition-colors">
                      Landscape Photography
                    </h5>
                  </div>
                  <p className="font-body text-xs text-[#94A3B8] leading-relaxed">
                    Golden hours, natural depth framing, optical RAW color science, and serene scenic captures.
                  </p>
                </div>
              </div>

              {/* 3. DJ & Electronic Music Card */}
              <div className="cyber-card rounded-2xl overflow-hidden group hover:border-[#D4FF24]/50 transition-all">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#070B14]">
                  <img
                    src="/images/dj-console.svg"
                    alt="DJ Turntable Console"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 border border-[#D4FF24]/30 text-[#D4FF24]">
                    128 BPM
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <DJTurntableLogo className="w-6 h-6 shrink-0" />
                      <h5 className="font-display font-bold text-base text-white group-hover:text-[#D4FF24] transition-colors">
                        DJing &amp; Sound
                      </h5>
                    </div>
                    {/* Live Equalizer Rhythm Bars */}
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-[#D4FF24] rounded-full animate-eq-bar h-2.5" />
                      <span className="w-1 bg-[#00D9FF] rounded-full animate-eq-bar h-4" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1 bg-[#A855F7] rounded-full animate-eq-bar h-2" style={{ animationDelay: '0.3s' }} />
                      <span className="w-1 bg-[#D4FF24] rounded-full animate-eq-bar h-3.5" style={{ animationDelay: '0.45s' }} />
                    </div>
                  </div>
                  <p className="font-body text-xs text-[#94A3B8] leading-relaxed">
                    Harmonic track mixing, rhythmic cues, bass drops, and crafting energetic electronic soundscapes.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
