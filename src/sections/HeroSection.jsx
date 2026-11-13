import React from 'react'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import Character3D from '../components/Character3D'
import { personalInfo } from '../data/portfolioData'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="hero-section relative flex min-h-[min(940px,100svh)] items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:px-12"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="hero-backdrop-word pointer-events-none absolute" aria-hidden="true">DUY</div>

      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-2 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0">
        <div data-reveal className="hero-copy relative z-10 order-1 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="hero-status mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] sm:text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A99AFF] opacity-45" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A99AFF]" />
            </span>
            <span>{personalInfo.status}</span>
          </div>

          <p className="hero-kicker mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.28em] sm:text-xs">
            ENGINEER <span>/</span> DESIGNER <span>/</span> EDITOR
          </p>

          <h1 className="hero-title font-display font-bold tracking-[-0.09em] text-white">
            <span className="block">Le</span>
            <span className="hero-title-last block">Duy<span>.</span></span>
          </h1>

          <p className="hero-manifesto mt-7 font-display text-[clamp(1.45rem,2.4vw,2.1rem)] font-medium leading-[1.18] tracking-[-0.055em] text-white">
            Engineer by logic.<br />
            <span>Creator by instinct.</span>
          </p>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#AEB8CA] sm:text-lg">
            I connect dependable backend systems with bold visual storytelling.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#8995AA] lg:justify-start">
            <MapPin className="h-4 w-4 text-[#A99AFF]" />
            <span>{personalInfo.location}</span>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#projects" className="hero-primary group">
              <span>Explore selected work</span>
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a href="#socials" className="hero-secondary group">
              <span>Let&apos;s connect</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="hero-disciplines mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A5B0C1] lg:justify-start">
            <span>Backend systems</span>
            <span className="hero-discipline-dot" />
            <span>Visual identity</span>
            <span className="hero-discipline-dot" />
            <span>Motion &amp; film</span>
          </div>
        </div>

        <div data-reveal className="hero-portrait relative order-2 mx-auto w-full max-w-[640px] lg:-mr-5">
          <div className="hero-portrait-glow pointer-events-none absolute left-1/2 top-[42%] h-[82%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <Character3D fallbackImage={personalInfo.avatarUrl} />
          <div className="hero-coordinate absolute bottom-10 right-0 z-20 hidden px-4 py-3 font-mono text-[10px] leading-5 sm:block">
            <span className="block">BASED IN</span>
            <strong>TRÀ VINH · VIETNAM</strong>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hero-scroll-hint absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#75839A] transition-colors hover:text-white sm:flex"
      >
        Scroll to explore
        <span className="h-8 w-px bg-gradient-to-b from-[#A99AFF]/80 to-transparent" />
      </a>
    </section>
  )
}
