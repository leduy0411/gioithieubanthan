import React, { useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import {
  FacebookIcon,
  LocketIcon,
  InstagramIcon,
  TikTokIcon,
  GmailIcon
} from '../components/SocialIcons'
import { ExternalLink, Copy, Check, QrCode, X, Mail, ShieldCheck } from 'lucide-react'

const ICON_COMPONENTS = {
  facebook: FacebookIcon,
  locket: LocketIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  gmail: GmailIcon
}

export default function SocialSection() {
  const [copiedId, setCopiedId] = useState(null)
  const [activeQrModal, setActiveQrModal] = useState(null)

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2200)
  }

  return (
    <section id="socials" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div data-reveal className="flex flex-col items-center text-center mb-16">
          <span className="cyber-badge mb-4">Social Hub</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white mb-3">
            CONNECT WITH{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent">
              LE DUY
            </span>
          </h2>
          <p className="font-body font-normal max-w-xl text-sm sm:text-base text-[#94A3B8] mb-5 leading-relaxed">
            Reach out across my verified channels. Open directly, scan the mobile QR code, or copy handles with a single click.
          </p>
          <div className="section-accent-line" />
        </div>

        {/* ── 5 Social Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-12">
          {personalInfo.socialsList.map((item) => {
            const IconComp = ICON_COMPONENTS[item.id] || FacebookIcon
            const isCopied = copiedId === item.id

            return (
              <div
                key={item.id}
                className="relative rounded-2xl p-7 sm:p-8 bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden flex flex-col justify-between"
              >
                {/* Brand color top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                />

                {/* Ambient aura */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
                  style={{ backgroundColor: item.color }}
                />

                <div>
                  {/* Icon + Badge row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <IconComp className="w-14 h-14" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium bg-white/[0.04] border border-white/[0.08] text-[#94A3B8]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00D9FF]" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Platform name & handle */}
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1 group-hover:text-[#00D9FF] transition-colors">
                    {item.name}
                  </h3>
                  <div className="font-body text-sm text-[#00D9FF] mb-3 truncate">
                    {item.handle}
                  </div>

                  {/* Description */}
                  <p className="font-body font-normal text-[#94A3B8] text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2.5 pt-5 border-t border-white/[0.06]">
                  <a
                    href={item.url}
                    target={item.id === 'gmail' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl font-display font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                    style={{ backgroundColor: item.color, color: '#FFFFFF', boxShadow: `0 0 16px ${item.glowColor}` }}
                  >
                    <span>OPEN {item.name.toUpperCase()}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.url)}
                    title="Copy link to clipboard"
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#94A3B8] hover:text-white hover:border-[#00D9FF]/40 hover:bg-[#00D9FF]/08 transition-all cursor-pointer flex items-center justify-center"
                  >
                    {isCopied
                      ? <Check className="w-4 h-4 text-[#22C55E]" />
                      : <Copy className="w-4 h-4" />
                    }
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveQrModal(item)}
                    title={`QR Code – ${item.name}`}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#94A3B8] hover:text-white hover:border-[#A855F7]/40 hover:bg-[#A855F7]/08 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Direct Contact Bar ── */}
        <div data-reveal className="p-7 sm:p-9 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white mb-1.5">
              Direct Business & Engineering Inbox
            </h4>
            <p className="font-body font-normal text-sm text-[#94A3B8] leading-relaxed">
              Available for software engineering contracts, visual branding, and video production assignments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00D9FF]/40 font-body text-sm text-[#F5F7FA] hover:text-[#00D9FF] transition-all flex items-center gap-2.5"
            >
              <Mail className="w-4 h-4 text-[#EA4335]" />
              <span>{personalInfo.email}</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopy('email-chip', personalInfo.email)}
              title="Copy email"
              className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] font-body font-medium text-xs text-[#94A3B8] hover:text-white hover:border-[#00D9FF]/40 transition-all cursor-pointer flex items-center gap-2"
            >
              {copiedId === 'email-chip'
                ? <><Check className="w-4 h-4 text-[#22C55E]" /><span className="text-[#22C55E]">COPIED!</span></>
                : <><Copy className="w-4 h-4" /><span>COPY EMAIL</span></>
              }
            </button>
          </div>
        </div>

        {/* ── QR Modal ── */}
        {activeQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div className="relative w-full max-w-sm rounded-2xl bg-[#070B14] border border-white/[0.1] p-7 text-center shadow-[0_0_60px_rgba(0,217,255,0.25)] animate-scale-up">
              <button
                type="button"
                onClick={() => setActiveQrModal(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-white bg-white/[0.05] border border-white/[0.08] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex p-3 rounded-2xl mb-4" style={{ backgroundColor: `${activeQrModal.color}18` }}>
                <QrCode className="w-10 h-10" style={{ color: activeQrModal.color }} />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-1.5">
                Scan {activeQrModal.name} QR
              </h3>
              <p className="font-body text-sm text-[#00D9FF] mb-6 truncate px-4">
                {activeQrModal.handle}
              </p>

              <div className="relative p-4 rounded-xl bg-white mx-auto w-52 h-52 flex items-center justify-center shadow-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(activeQrModal.url)}`}
                  alt={`QR for ${activeQrModal.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="mt-4 font-body text-xs text-[#94A3B8]">
                Point your smartphone camera to connect immediately
              </p>

              <a
                href={activeQrModal.url}
                target={activeQrModal.id === 'gmail' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="mt-5 w-full py-3 rounded-xl font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                style={{ backgroundColor: activeQrModal.color, color: '#FFFFFF' }}
              >
                <span>OPEN IN BROWSER</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
