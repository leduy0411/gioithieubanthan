import React from 'react'
import {
  GraduationCap,
  Languages,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { content } from '../data/content'
import { BarcaShieldIcon, CameraLensIcon, TurntableIcon } from '../components/BrandIcons'

export default function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Anti-AI Slop: Unboxed architectural split where content breathes naturally */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 items-start">
          {/* Left Column: Architectural Thesis & Academic Credentials */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E2E8F0]">
              <span className="w-2 h-2 rounded-full bg-[#E2E8F0] shadow-[0_0_8px_#E2E8F0]" />
              <span>STATION 01 // LUNA ARGENT • PROFILE</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#F8FAFC] sm:text-5xl">
              ENGINEERING RESILIENCE. <br />
              <span className="text-zinc-400">DIRECTING VISUALS.</span>
            </h2>

            {/* Academic & Geographic Credentials */}
            <div className="mt-8 space-y-4 font-mono text-xs text-zinc-400 border-l border-white/20 pl-5">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#38bdf8] shrink-0" aria-hidden="true" />
                <span className="text-zinc-200">{content.identity.originBase}</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap size={16} className="text-[#38bdf8] shrink-0" aria-hidden="true" />
                <span className="text-white font-medium">
                  {content.identity.education.degree} — {content.identity.education.institution}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Languages size={16} className="text-[#38bdf8] shrink-0" aria-hidden="true" />
                <span>
                  {content.identity.languages.map((l) => `${l.name} (${l.code})`).join(' • ')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (Unboxed, Natural Flow) */}
          <div className="space-y-6 text-base leading-8 text-zinc-300">
            {content.bio.map((paragraph, index) => (
              <p
                key={index}
                className="text-base sm:text-lg leading-relaxed text-zinc-300 border-b border-white/[0.06] pb-6 last:border-b-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 4 Realistic Developer Metrics (No AI Slop / No fake 99.99%) */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.dossierMetrics.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.08] bg-[#070b14]/75 p-6 backdrop-blur-xl"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{stat.label}</p>
              <p className="mt-3 font-display text-3xl font-extrabold text-white">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-xs text-zinc-400">{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* Beyond Code Bento Grid (DJing, Photography & FC Barcelona) */}
        <div className="mt-24">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                BEYOND CODE // MISSION PASSIONS
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                CRAFT, SOUND &amp; TACTICAL PASSION
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* 1. DJing & Electronic Audio */}
            <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b14]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#38bdf8]/40">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8] transition-transform duration-300 group-hover:scale-105">
                  <TurntableIcon className="w-8 h-8 text-[#38bdf8]" />
                </div>
                {/* 4-Bar Equalizer Live Waveform */}
                <div className="flex items-end gap-1 h-5">
                  <span className="w-1 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '200ms' }} />
                  <span className="w-1 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '400ms' }} />
                  <span className="w-1 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '100ms' }} />
                </div>
              </div>

              <h4 className="mt-6 font-display text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                DJing &amp; Electronic Audio
              </h4>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Harmonic mixing, beat-matching rhythms, and building immersive sonic momentum through high-energy 128 BPM electronic soundscapes.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-zinc-500">
                <span className="text-[#38bdf8]">128 BPM LOCKED</span>
                <span>HARMONIC SYNTHESIS</span>
              </div>
            </article>

            {/* 2. Landscape Photography */}
            <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b14]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-400 transition-transform duration-300 group-hover:scale-105">
                  <CameraLensIcon className="w-8 h-8 text-amber-400" />
                </div>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] text-amber-300">
                  RAW 35MM
                </span>
              </div>

              <h4 className="mt-6 font-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Landscape Photography
              </h4>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Capturing scenic horizons, natural environmental geometry, and golden hour luminescence with disciplined framing and calibrated color science.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-zinc-500">
                <span className="text-amber-300">f/1.8 • ISO 100 • RAW</span>
                <span>OPTICAL DEPTH</span>
              </div>
            </article>

            {/* 3. FC Barcelona Blaugrana */}
            <article className="group relative overflow-hidden rounded-2xl border border-[#a50044]/40 bg-[#070b14]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#004d98]/60">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#004d98] bg-[#a50044]/30 text-white transition-transform duration-300 group-hover:scale-105">
                  <BarcaShieldIcon className="w-8 h-8" />
                </div>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] text-amber-300">
                  CULÉR
                </span>
              </div>

              <h4 className="mt-6 font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                FC Barcelona
              </h4>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Unwavering passion for the Blaugrana tactical philosophy — <span className="text-white italic">"Més que un club"</span>. Elegance, collective strategy, and enduring character.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-zinc-500">
                <span className="text-amber-300">MÉS QUE UN CLUB</span>
                <span className="text-[#a50044] font-bold">1899 // BLAUGRANA</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
