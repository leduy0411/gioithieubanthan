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
    <section id="socials" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header without Terminal Badges */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-4">
          CONNECT WITH <span className="bg-gradient-to-r from-[#00D9FF] via-[#1558C9] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,217,255,0.6)]">LE DUY</span>
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-[#9CA3AF] mb-6">
          Reach out across my verified channels. Open directly, scan the mobile QR code, or copy handles with a single click.
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] rounded-full shadow-[0_0_15px_#00D9FF]" />
      </div>

      {/* 5 Social Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
        {personalInfo.socialsList.map((item) => {
          const IconComp = ICON_COMPONENTS[item.id] || FacebookIcon
          const isCopied = copiedId === item.id

          return (
            <div
              key={item.id}
              className="relative rounded-2xl p-7 sm:p-8 bg-[#070B14]/90 border border-[#1B2638] hover:border-[#2D3F5E] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden flex flex-col justify-between"
              style={{
                boxShadow: `0 12px 36px -10px rgba(0,0,0,0.85)`
              }}
            >
              {/* Glowing Top Line in Brand Color */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`
                }}
              />

              {/* Subtle Ambient Aura */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] opacity-15 group-hover:opacity-35 transition-opacity pointer-events-none"
                style={{ backgroundColor: item.color }}
              />

              <div>
                {/* Header: Authentic Large Brand Icon & Verified Badge */}
                <div className="flex items-center justify-between mb-6">
                  {/* Authentic App Logo (Sized Up & Standard Brand Artwork) */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                    <IconComp className="w-14 h-14" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0B101A] border border-[#1B2638] text-[#9CA3AF]">
                    <ShieldCheck className="w-4 h-4 text-[#00D9FF]" />
                    <span>{item.badge}</span>
                  </span>
                </div>

                {/* Platform Name & Handle with Increased Font Sizes */}
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-1.5 group-hover:text-[#00D9FF] transition-colors">
                  {item.name}
                </h3>
                <div className="font-mono text-sm sm:text-base text-[#00D9FF] mb-3 truncate">
                  {item.handle}
                </div>

                {/* Description */}
                <p className="font-body text-[#9CA3AF] text-sm sm:text-base leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Actions Button Group */}
              <div className="flex items-center gap-2.5 pt-5 border-t border-[#1B2638]">
                {/* Open Profile Button */}
                <a
                  href={item.url}
                  target={item.id === 'gmail' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-xl font-display font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group/btn"
                  style={{
                    backgroundColor: item.color,
                    color: item.id === 'tiktok' ? '#FFFFFF' : '#FFFFFF',
                    boxShadow: `0 0 18px ${item.glowColor}`
                  }}
                >
                  <span>OPEN {item.name.toUpperCase()}</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>

                {/* Copy Link / ID Button */}
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.url)}
                  title="Copy link to clipboard"
                  className="p-3 rounded-xl bg-[#0B101A] border border-[#1B2638] text-[#9CA3AF] hover:text-white hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 transition-all cursor-pointer flex items-center justify-center"
                >
                  {isCopied ? (
                    <span className="flex items-center gap-1 text-xs text-[#22C55E] font-mono font-bold">
                      <Check className="w-4 h-4" />
                    </span>
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>

                {/* QR Code Button for Mobile scanning */}
                <button
                  type="button"
                  onClick={() => setActiveQrModal(item)}
                  title={`View QR Code for ${item.name}`}
                  className="p-3 rounded-xl bg-[#0B101A] border border-[#1B2638] text-[#9CA3AF] hover:text-white hover:border-[#A855F7] hover:bg-[#A855F7]/10 transition-all cursor-pointer flex items-center justify-center"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Direct Contact Bar: Email Display & Copy Chip */}
      <div className="p-7 sm:p-9 rounded-2xl bg-[#070B14]/90 border border-[#1B2638] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2">
            Direct Business &amp; Engineering Inbox
          </h4>
          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Available for software engineering contracts, visual branding identity, and video production assignments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Email Chip */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-5 py-3 rounded-xl bg-[#0B101A] border border-[#1B2638] hover:border-[#00D9FF] text-sm sm:text-base font-mono text-[#F5F7FA] hover:text-[#00D9FF] transition-all flex items-center gap-2.5 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <Mail className="w-4 h-4 text-[#EA4335]" />
            <span>{personalInfo.email}</span>
          </a>

          {/* Quick Copy Email Button */}
          <button
            type="button"
            onClick={() => handleCopy('email-chip', personalInfo.email)}
            title="Copy email address"
            className="px-4 py-3 rounded-xl bg-[#0B101A] border border-[#1B2638] text-sm font-mono text-[#9CA3AF] hover:text-white hover:border-[#00D9FF] transition-all cursor-pointer flex items-center gap-2"
          >
            {copiedId === 'email-chip' ? (
              <>
                <Check className="w-4 h-4 text-[#22C55E]" />
                <span className="text-[#22C55E] font-bold">COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* QR Code Popup Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#070B14] border border-[#1B2638] p-7 text-center shadow-[0_0_60px_rgba(0,217,255,0.3)] animate-scale-up">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveQrModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[#9CA3AF] hover:text-white bg-[#0B101A] border border-[#1B2638] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* QR Header with Brand Icon */}
            <div className="inline-flex p-3 rounded-2xl mb-4" style={{ backgroundColor: `${activeQrModal.color}20` }}>
              <QrCode className="w-10 h-10" style={{ color: activeQrModal.color }} />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white mb-1.5">
              Scan {activeQrModal.name} QR Code
            </h3>
            <p className="font-mono text-sm text-[#00D9FF] mb-6 truncate px-4">
              {activeQrModal.handle}
            </p>

            {/* QR Pattern with High Contrast White Padding */}
            <div className="relative p-4 rounded-xl bg-white mx-auto w-52 h-52 flex items-center justify-center shadow-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(activeQrModal.url)}`}
                alt={`QR code for ${activeQrModal.name}`}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="mt-4 font-mono text-xs text-[#9CA3AF]">
              Point your smartphone camera to connect immediately
            </p>

            <a
              href={activeQrModal.url}
              target={activeQrModal.id === 'gmail' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="mt-5 w-full py-3 rounded-xl text-sm font-bold font-display uppercase tracking-wider flex items-center justify-center gap-2"
              style={{ backgroundColor: activeQrModal.color, color: '#FFFFFF' }}
            >
              <span>OPEN DIRECTLY IN BROWSER</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
