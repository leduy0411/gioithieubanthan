import { useEffect, useState } from 'react'
import {
  Award,
  Check,
  Copy,
  Cpu,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Printer,
  Shield,
  Sparkles,
  X,
} from 'lucide-react'
import { content } from '../data/content'
import MechanicalGearCore from './MechanicalGearCore'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

interface SummonerIdModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * SummonerIdModal — 1-Screen League of Legends Hextech Engineer ID Card / Quick CV Summary
 * Designed for recruiters & clients to inspect, copy, or print Le Duy's complete dossier at a glance.
 */
export default function SummonerIdModal({ isOpen, onClose }: SummonerIdModalProps) {
  const [copiedDossier, setCopiedDossier] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCopyFullDossier = () => {
    playMechanicalUnlock()
    const summaryText = [
      `${content.identity.fullName} (${content.identity.callsign}) — ${content.identity.primaryRoleShort}`,
      `Education: ${content.identity.education.degree} — ${content.identity.education.institution}`,
      `Location: ${content.identity.originBase} (${content.identity.timezoneLabel})`,
      `Email: ${content.identity.email}`,
      `Languages: ${content.identity.languages.map((l) => `${l.name} (${l.level})`).join(' | ')}`,
      '',
      'KEY METRICS:',
      ...content.dossierMetrics.map((m) => `- ${m.label}: ${m.value} (${m.detail})`),
      '',
      'FEATURED SYSTEMS:',
      ...content.projects.map(
        (p, i) => `0${i + 1}. [${p.category}] ${p.title} — Stack: ${p.techStack.join(', ')}`
      ),
    ].join('\n')

    navigator.clipboard.writeText(summaryText)
    setCopiedDossier(true)
    window.setTimeout(() => setCopiedDossier(false), 2200)
  }

  const handlePrintDossier = () => {
    playMechanicalUnlock()
    window.print()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Summoner Hextech Engineer ID Card"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050812]/90 p-4 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        data-scrollable="true"
        className="conic-border-beam relative max-h-[92vh] w-full max-w-4xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-[14px] border border-[#C89B3C]/75 bg-gradient-to-b from-[#0E1E38] via-[#101328] to-[#080B16] p-6 sm:p-8">
          {/* Subtle Hextech Clockwork Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 opacity-15"
          >
            <MechanicalGearCore variant="full" unlockTrigger={1} className="h-80 w-80" />
          </div>

          {/* 4 Piltover Art-Deco Corner Brackets */}
          <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#F0E6D2]" />
          <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#F0E6D2]" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#0AC8B9]" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#0AC8B9]" />

          {/* Top Identity Header */}
          <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-[#C89B3C]/35 pb-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-[#C89B3C] bg-[#091428] shadow-[0_0_20px_rgba(10,200,185,0.3)]">
                <img
                  src={content.identity.avatarUrl}
                  alt={content.identity.fullName}
                  className="h-full w-full object-cover object-top"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).src = content.identity.avatarSvgUrl
                  }}
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="hextech-chamfer inline-flex items-center gap-1 border border-[#0AC8B9]/65 bg-[#0AC8B9]/18 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0AC8B9]">
                    <Shield size={10} />
                    MASTERY VII // EXECUTIVE DOSSIER
                  </span>
                  <span className="font-mono text-xs text-[#C89B3C]">
                    {content.identity.timezoneLabel}
                  </span>
                </div>
                <h2 className="mt-1 font-display text-2xl font-extrabold tracking-wide text-[#F0E6D2] sm:text-3xl">
                  {content.identity.fullName}{' '}
                  <span className="font-mono text-sm font-normal text-[#0AC8B9]">
                    ({content.identity.callsign})
                  </span>
                </h2>
                <p className="font-gaming text-xs font-bold uppercase tracking-[0.16em] text-[#C8AA6E]">
                  {content.identity.primaryRoleShort}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close ID Card"
              className="tactile-btn self-end inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#C89B3C]/50 bg-[#091428] text-[#F0E6D2] hover:border-[#0AC8B9] hover:text-[#0AC8B9] sm:self-auto"
            >
              <X size={17} />
            </button>
          </div>

          {/* Credentials & Quick Contact Bar */}
          <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#C89B3C]/30 bg-[#091428]/85 px-4 py-2.5 font-mono text-xs text-[#E2E8F0]">
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={15} className="text-[#C89B3C]" />
              <span>
                {content.identity.education.degree} — {content.identity.education.institution}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#C8AA6E]">
              <MapPin size={13} className="text-[#0AC8B9]" />
              <span>{content.identity.locationShort}</span>
            </span>
            <a
              href={`mailto:${content.identity.email}`}
              className="inline-flex items-center gap-1.5 font-bold text-[#0AC8B9] hover:underline"
            >
              <Mail size={13} />
              <span>{content.identity.email}</span>
            </a>
          </div>

          {/* 4 Verified Engineering Metrics */}
          <div className="relative z-10 mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {content.dossierMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-[#C89B3C]/35 bg-[#091428]/75 px-3.5 py-2.5"
              >
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#C8AA6E]">
                  {m.label}
                </p>
                <p className="mt-0.5 font-display text-base font-extrabold text-[#F0E6D2]">
                  {m.value}
                </p>
                <p className="mt-0.5 truncate font-body text-[10px] text-[#0AC8B9]">{m.detail}</p>
              </div>
            ))}
          </div>

          {/* 2-Column Body: 4 Featured Systems + 3 Rune Paths */}
          <div className="relative z-10 mt-5 grid gap-5 lg:grid-cols-12">
            {/* Left 7 Cols: 4 Production Projects */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#0AC8B9]">
                <Cpu size={14} />
                <span>PRODUCTION ARTIFACTS (04)</span>
              </div>
              <div className="mt-2.5 space-y-2.5">
                {content.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    onMouseEnter={() => playMechanicalTick()}
                    className="rounded-lg border border-[#C89B3C]/35 bg-[#091428]/80 p-3 transition-colors hover:border-[#0AC8B9]/65"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-gaming text-xs font-bold uppercase tracking-wide text-[#F0E6D2]">
                        0{idx + 1}. {proj.title}
                      </span>
                      <span className="shrink-0 rounded border border-[#C89B3C]/45 bg-[#110B1F] px-2 py-0.5 font-mono text-[9px] text-[#C89B3C]">
                        {proj.category}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 font-body text-[11px] leading-relaxed text-[#B8B0C8]">
                      {proj.summary}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-[#C89B3C]/25 bg-[#060914] px-1.5 py-0.5 font-mono text-[9px] text-[#E2E8F0]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: 3 Rune Paths & Languages */}
            <div className="flex flex-col justify-between space-y-4 lg:col-span-5">
              <div>
                <div className="flex items-center gap-2 font-gaming text-xs font-bold uppercase tracking-[0.18em] text-[#C89B3C]">
                  <Award size={14} />
                  <span>CORE RUNE PATHS & LANGUAGES</span>
                </div>
                <div className="mt-2.5 space-y-2.5">
                  {content.skillCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="rounded-lg border border-[#C89B3C]/30 bg-[#091428]/80 p-3"
                    >
                      <p className="font-gaming text-xs font-bold uppercase text-[#F0E6D2]">
                        {cat.title}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {cat.skills.map((s) => (
                          <span
                            key={s.name}
                            className="rounded border border-[#0AC8B9]/30 bg-[#0AC8B9]/10 px-2 py-0.5 font-mono text-[9px] text-[#E0F2FE]"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Languages */}
                  <div className="rounded-lg border border-[#C89B3C]/30 bg-[#091428]/80 p-3">
                    <p className="font-gaming text-xs font-bold uppercase text-[#F0E6D2]">
                      COMMUNICATION PROTOCOLS
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {content.identity.languages.map((l) => (
                        <span
                          key={l.code}
                          className="rounded border border-[#C89B3C]/40 bg-[#060914] px-2 py-0.5 font-mono text-[10px] text-[#F0E6D2]"
                        >
                          <strong className="text-[#0AC8B9]">{l.code}</strong> · {l.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Social Channels Mini Bar */}
              <div className="rounded-lg border border-[#C89B3C]/30 bg-[#091428]/80 p-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#C8AA6E]">
                  VERIFIED DIRECT PORTALS
                </p>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {content.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded border border-[#C89B3C]/30 bg-[#060914] px-2.5 py-1 font-mono text-[10px] text-[#F0E6D2] transition-colors hover:border-[#0AC8B9] hover:text-[#0AC8B9]"
                    >
                      <span>{s.name}</span>
                      <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#C89B3C]/35 pt-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyFullDossier}
                className="hextech-play-btn tactile-btn inline-flex items-center gap-2 px-5 py-2 font-gaming text-xs font-extrabold uppercase tracking-wider"
              >
                {copiedDossier ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedDossier ? 'DOSSIER COPIED ✓' : 'COPY FULL DOSSIER'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintDossier}
                className="hextech-btn tactile-btn inline-flex items-center gap-2 px-4 py-2 font-gaming text-xs font-bold uppercase tracking-wider text-[#F0E6D2]"
              >
                <Printer size={13} className="text-[#0AC8B9]" />
                <span>PRINT / PDF</span>
              </button>

              <a
                href={`mailto:${content.identity.email}`}
                className="hextech-btn tactile-btn inline-flex items-center gap-2 px-4 py-2 font-gaming text-xs font-bold uppercase tracking-wider text-[#F0E6D2]"
              >
                <Sparkles size={13} className="text-[#C89B3C]" />
                <span>DIRECT EMAIL</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs text-[#C8AA6E] hover:text-white"
            >
              ESC TO CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
