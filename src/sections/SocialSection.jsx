import React, { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { personalInfo } from '../data/portfolioData'
import {
  FacebookLogo,
  InstagramLogo,
  LocketLogo,
  TikTokLogo,
} from '../components/BrandIcons'

export default function SocialSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="socials" className="relative border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 items-start">
          {/* Left Column: Direct Signal Contact */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00f2fe]">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe]" />
              <span>04 // TRANSMIT SIGNAL &amp; COLLABORATE</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#F8FAFC] sm:text-5xl">
              INITIATE A DIRECT <br />
              <span className="text-[#00f2fe]">COMMUNICATION LINK.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-300">
              For high-concurrency backend services, edge computer vision pipelines, or cinematic video post-production — transmit your signal directly.
            </p>

            {/* Primary Encrypted Inbox Box */}
            <div className="spatial-glass mt-8 rounded-2xl border border-white/[0.1] bg-[#070b14]/90 p-6 backdrop-blur-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">PRIMARY ENCRYPTED INBOX</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-base font-bold text-white selection:bg-[#00f2fe]/40">
                  {personalInfo.email}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="tactile-btn inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.05] px-3.5 py-2 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#00f2fe]/40"
                    title="Copy Email Address"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span className={copied ? 'text-emerald-400 font-semibold' : ''}>
                      {copied ? 'COPIED ✓' : 'COPY'}
                    </span>
                  </button>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="tactile-btn inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] px-4 py-2 text-xs font-mono font-bold text-black shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                  >
                    <span>COMPOSE</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced 2x2 Bento Grid for 4 Verified Platforms */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                VERIFIED SOCIAL MATRIX // 2X2 GRID
              </p>
              <span className="font-mono text-[11px] text-[#00f2fe]">4 CHANNELS ACTIVE</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* 1. Facebook */}
              <a
                href="https://www.facebook.com/share/1F5YrEn9Jb/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="cyber-card group relative flex flex-col justify-between rounded-2xl border border-white/[0.1] bg-[#070b14]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#1877F2]/50 hover:shadow-[0_0_30px_rgba(24,119,242,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1877F2]/40 bg-[#1877F2]/10 text-[#1877F2] transition-transform duration-300 group-hover:scale-105">
                      <FacebookLogo className="w-6 h-6" />
                    </div>
                    <span className="rounded-full border border-[#1877F2]/30 bg-[#1877F2]/10 px-2.5 py-1 font-mono text-[10px] text-[#1877F2]">
                      Official Profile
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-[#1877F2] transition-colors">
                    Facebook
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    Le Duy
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    Professional network updates, software architecture insights, and community tech networking.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-3.5 font-mono text-xs text-zinc-400 group-hover:text-[#1877F2]">
                  <span>@facebook/share</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              {/* 2. Locket */}
              <a
                href="https://locket.cam/ledi04"
                target="_blank"
                rel="noreferrer"
                className="cyber-card group relative flex flex-col justify-between rounded-2xl border border-white/[0.1] bg-[#070b14]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#FFB800]/50 hover:shadow-[0_0_30px_rgba(255,184,0,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FFB800]/40 bg-[#FFB800]/10 text-[#FFB800] transition-transform duration-300 group-hover:scale-105">
                      <LocketLogo className="w-6 h-6" />
                    </div>
                    <span className="rounded-full border border-[#FFB800]/30 bg-[#FFB800]/10 px-2.5 py-1 font-mono text-[10px] text-[#FFB800]">
                      Live Widget
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-[#FFB800] transition-colors">
                    Locket
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    ledi04
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    Real-time candid camera moments and behind-the-scenes engineering snapshots directly on widget.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-3.5 font-mono text-xs text-zinc-400 group-hover:text-[#FFB800]">
                  <span>locket.cam/ledi04</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              {/* 3. Instagram */}
              <a
                href="https://www.instagram.com/leduy1104?mdxt=MWdscm55MnNnMjZpbw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="cyber-card group relative flex flex-col justify-between rounded-2xl border border-white/[0.1] bg-[#070b14]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#E1306C]/50 hover:shadow-[0_0_30px_rgba(225,48,108,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E1306C]/40 bg-[#E1306C]/10 transition-transform duration-300 group-hover:scale-105">
                      <InstagramLogo className="w-6 h-6" />
                    </div>
                    <span className="rounded-full border border-[#E1306C]/30 bg-[#E1306C]/10 px-2.5 py-1 font-mono text-[10px] text-[#E1306C]">
                      Visual Feed
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-[#E1306C] transition-colors">
                    Instagram
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    @leduy1104
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    Landscape photography snapshots, graphic design art reels, and creative lifestyle moments.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-3.5 font-mono text-xs text-zinc-400 group-hover:text-[#E1306C]">
                  <span>@leduy1104</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              {/* 4. TikTok */}
              <a
                href="https://www.tiktok.com/@lee_duy04?_r=1&_t=ZS-9BKZrrsUP4f"
                target="_blank"
                rel="noreferrer"
                className="cyber-card group relative flex flex-col justify-between rounded-2xl border border-white/[0.1] bg-[#070b14]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#00F2FE]/50 hover:shadow-[0_0_30px_rgba(0,242,254,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00F2FE]/40 bg-[#00F2FE]/10 transition-transform duration-300 group-hover:scale-105">
                      <TikTokLogo className="w-6 h-6" />
                    </div>
                    <span className="rounded-full border border-[#00F2FE]/30 bg-[#00F2FE]/10 px-2.5 py-1 font-mono text-[10px] text-[#00F2FE]">
                      Motion Media
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
                    TikTok
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    @lee_duy04
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    Short-form video edits, tech snippets, electronic DJ sessions, and color grading clips.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-3.5 font-mono text-xs text-zinc-400 group-hover:text-[#00F2FE]">
                  <span>@lee_duy04</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
