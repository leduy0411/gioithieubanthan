import React, { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Sparkles,
} from 'lucide-react'
import { personalInfo } from '../data/portfolioData'
import {
  FacebookLogo,
  InstagramLogo,
  LocketLogo,
  TikTokLogo,
} from '../components/BrandIcons'

const brandLogos = {
  facebook: FacebookLogo,
  locket: LocketLogo,
  instagram: InstagramLogo,
  tiktok: TikTokLogo,
}

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
            <div className="spatial-glass mt-8 rounded-2xl border border-white/[0.08] bg-[#070b14]/75 p-6 backdrop-blur-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">PRIMARY ENCRYPTED INBOX</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-base font-bold text-white selection:bg-[#00f2fe]/40">
                  {personalInfo.email}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="tactile-btn inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#00f2fe]/40 transition-colors"
                    title="Copy Email Address"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span className={copied ? 'text-emerald-400 font-semibold' : ''}>
                      {copied ? 'COPIED ✓' : 'COPY'}
                    </span>
                  </button>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="tactile-btn inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-mono font-bold text-black hover:bg-zinc-200 transition-colors"
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
              {personalInfo.socialsList.map((social) => {
                const Logo = brandLogos[social.id] || FacebookLogo
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cyber-card group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070b14]/75 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
                          style={{ backgroundColor: `${social.color}15`, color: social.color }}
                        >
                          <Logo className="w-6 h-6" />
                        </div>
                        <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-zinc-400">
                          {social.badge}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-bold text-white transition-colors group-hover:text-[#00f2fe]">
                        {social.name}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-zinc-400">
                        {social.username}
                      </p>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                        {social.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-3.5 font-mono text-xs text-zinc-400 transition-colors group-hover:text-white">
                      <span>{social.handle}</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-zinc-500 group-hover:text-white" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
