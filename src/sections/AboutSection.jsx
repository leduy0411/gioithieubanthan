import React from 'react'
import { Camera, Film, Languages, MapPin, Palette, Server } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

const DISCIPLINES = [
  {
    icon: Server,
    number: '01',
    title: 'Backend engineering',
    description: 'APIs, data models and dependable services built around clear system boundaries.',
    accent: 'cyan'
  },
  {
    icon: Palette,
    number: '02',
    title: 'Graphic design',
    description: 'Visual identities and digital assets shaped with a strong sense of hierarchy and detail.',
    accent: 'violet'
  },
  {
    icon: Film,
    number: '03',
    title: 'Video & motion',
    description: 'Rhythm-led editing, considered color and motion that gives a story its energy.',
    accent: 'lime'
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="section-intro mb-12 sm:mb-16">
          <p className="section-index">01 / A little about me</p>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="section-title">
              A curious mind,
              <br />
              <span className="text-gradient">by design.</span>
            </h2>
            <p className="max-w-2xl pb-1 text-base leading-relaxed text-[#AAB6C9] sm:text-lg">
              I enjoy moving between engineering and visual craft — finding the
              simplest way to make complex ideas feel clear, useful and human.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <article data-reveal className="cyber-card profile-story rounded-3xl p-6 sm:p-9 lg:col-span-7">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div>
                <p className="section-index mb-2">The person behind the pixels</p>
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                  IT Engineer &amp; multidisciplinary creator
                </h3>
              </div>
              <span className="profile-mark" aria-hidden="true">LD</span>
            </div>

            <p className="mb-5 text-base leading-relaxed text-[#D0D8E5] sm:text-lg">
              {personalInfo.bioShort}
            </p>
            {personalInfo.bioLong.slice(0, 2).map((paragraph) => (
              <p key={paragraph} className="mb-4 text-sm leading-7 text-[#98A6BB] sm:text-[15px]">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 text-sm text-[#9BA9BE]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#83DDE4]" />
                {personalInfo.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Languages className="h-4 w-4 text-[#A5A0F4]" />
                Vietnamese · English · Chinese
              </span>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {DISCIPLINES.map(({ icon: Icon, number, title, description, accent }) => (
              <article key={number} data-reveal className={`discipline-card discipline-${accent} cyber-card rounded-2xl p-5 sm:p-6`}>
                <div className="mb-5 flex items-center justify-between">
                  <span className="discipline-icon"><Icon className="h-5 w-5" /></span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">{number}</span>
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-[#99A7BB]">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div data-reveal className="about-languages mt-5 grid gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7">
          <div>
            <p className="section-index mb-2">Outside the code</p>
            <p className="text-sm text-[#AAB6C9]">
              Landscape photography, electronic music and a lifelong love of FC Barcelona.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[Camera, Film, Languages].map((Icon, index) => (
              <span key={index} className="about-interest-icon">
                <Icon className="h-4 w-4" />
              </span>
            ))}
            <span className="about-interest-wordmark">FCB</span>
          </div>
        </div>
      </div>
    </section>
  )
}
