import React from 'react'
import {
  Camera,
  Disc3,
  Globe2,
  GraduationCap,
  Languages,
  MapPin,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

export default function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:py-36">
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#7928ca]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Intro */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 items-start">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00f2fe]">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe]" />
              <span>01 // ARCHITECTURAL PROFILE</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              ENGINEERING RESILIENCE. <br />
              <span className="gradient-text">DIRECTING VISUALS.</span>
            </h2>

            {/* Academic & Geographic Credentials */}
            <div className="mt-8 space-y-3.5 font-mono text-xs text-zinc-400 border-l-2 border-[#00f2fe]/40 pl-4">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#00f2fe] shrink-0" aria-hidden="true" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap size={16} className="text-[#00f2fe] shrink-0" aria-hidden="true" />
                <span className="text-zinc-200">{personalInfo.education}</span>
              </div>
              <div className="flex items-center gap-3">
                <Languages size={16} className="text-[#00f2fe] shrink-0" aria-hidden="true" />
                <span>Vietnamese (Native) • English (Proficient) • Chinese (Conversational)</span>
              </div>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-6 text-base leading-8 text-zinc-300">
            {personalInfo.bioLong.map((paragraph, index) => (
              <p
                key={index}
                className="relative rounded-2xl border border-white/[0.06] bg-[#070b14]/60 p-6 backdrop-blur-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 4 Flagship Metrics */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="spatial-glass rounded-2xl p-6 border border-white/[0.08] bg-[#070b14]/80 backdrop-blur-xl"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{stat.label}</p>
              <p className="mt-3 font-display text-4xl font-extrabold text-white">
                {stat.value}
                <span className="ml-1 text-lg text-[#00f2fe]">{stat.suffix}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Passions Bento Grid: Photography, DJing & Barça */}
        <div className="mt-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#00f2fe]">DISCIPLINES BEYOND CODE</p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                THE HUMAN &amp; KINETIC LAYER
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Photography Card */}
            <article className="cyber-card group relative overflow-hidden rounded-2xl p-7 border border-white/[0.1] bg-[#070b14]/80 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-[#00f2fe]">
                <Camera size={24} />
              </div>
              <h4 className="mt-6 font-display text-xl font-bold text-white">Landscape Photography</h4>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Capturing scenic vistas, golden hour horizons, and raw environmental geometry with disciplined framing and calibrated color science.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-zinc-500">
                <span>VISUAL DEPTH</span>
                <span className="text-[#00f2fe]">OPTICAL ART</span>
              </div>
            </article>

            {/* DJing & Electronic Sound Card */}
            <article className="cyber-card group relative overflow-hidden rounded-2xl p-7 border border-white/[0.1] bg-[#070b14]/80 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#7928ca]/30 bg-[#7928ca]/20 text-[#d8b4fe]">
                <Disc3 size={24} className="animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <h4 className="mt-6 font-display text-xl font-bold text-white">DJing &amp; Electronic Sound</h4>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Harmonic mixing, beat-matching rhythms, and building immersive sonic momentum through high-energy electronic soundscapes.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-zinc-500">
                <span>128 BPM SYNC</span>
                <span className="text-[#d8b4fe]">AUDIO KINETICS</span>
              </div>
            </article>

            {/* FC Barcelona Blaugrana Card */}
            <article className="cyber-card group relative overflow-hidden rounded-2xl p-7 border border-[#a50044]/30 bg-[#070b14]/80 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#004d98] bg-[#a50044]/30 text-white">
                <ShieldAlert size={24} className="text-[#ffed00]" />
              </div>
              <h4 className="mt-6 font-display text-xl font-bold text-white">FC Barcelona</h4>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Unwavering passion for the Blaugrana philosophy — <span className="text-white italic">"Més que un club"</span>. Elegance, collective strategy, and enduring character.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-zinc-500">
                <span>BLAUGRANA</span>
                <span className="text-[#ffed00]">VISCA EL BARÇA</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
