import {
  ArrowUpRight,
  Cpu,
  Database,
  Film,
  GraduationCap,
  Languages,
  Layers,
  MapPin,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { content } from '../data/content'
import Character3D from '../components/Character3D'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { stationStore, StationIndex } from '../store/stationStore'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

const PLATFORM_STACK_ITEMS: readonly {
  label: string
  sub: string
  Icon: typeof Server
  targetStation: StationIndex
  projectIndex?: number
}[] = [
  { label: 'Node.js', sub: 'TypeScript', Icon: Server, targetStation: 2, projectIndex: 2 },
  { label: 'Python', sub: 'FastAPI', Icon: Zap, targetStation: 2, projectIndex: 0 },
  { label: 'PostgreSQL', sub: 'MongoDB', Icon: Database, targetStation: 3 },
  { label: 'Redis', sub: 'Cluster Cache', Icon: Layers, targetStation: 2, projectIndex: 1 },
  { label: 'ONNX / AI', sub: 'ArcFace 512-D', Icon: Cpu, targetStation: 2, projectIndex: 0 },
  { label: 'Adobe Suite', sub: '4K Motion', Icon: Film, targetStation: 2, projectIndex: 3 },
] as const

export default function AboutSection() {
  const sectionRef = useScrollMotion<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex flex-1 min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden bg-[#0B0E1D] px-5 pt-24 pb-10 sm:px-8"
    >
      {/* Breathing Piltover Gold & Hextech Mana Cyan Corner Glows */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(200,155,60,0.18)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute -left-24 bottom-12 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(10,200,185,0.18)_0%,transparent_70%)] blur-3xl"
        style={{ animationDelay: '-3s' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Piltover Summoner Dossier */}
          <div
            className="will-change-transform lg:col-span-7"
            style={{
              transform:
                'translate3d(calc(var(--ap, 0) * -48px), calc(var(--p, 0) * 42px), 0)',
              opacity: 'var(--vis, 1)',
            }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5">
                <span className="animate-node-blink h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_8px_#0AC8B9]" />
                <p className="font-gaming text-xs font-bold uppercase tracking-[0.22em] text-[#0AC8B9]">
                  SUMMONER DOSSIER // TRA VINH, VN
                </p>
              </div>
              <span className="hextech-chamfer inline-flex items-center gap-1.5 border border-[#C89B3C]/60 bg-[#091428] px-3 py-0.5 font-mono text-[10px] text-[#F0E6D2]">
                <ShieldCheck size={11} className="text-[#C89B3C]" />
                {content.identity.education.status}
              </span>
            </div>

            <h2 className="animate-title-shine mt-3 font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-[0.04em] sm:text-5xl">
              ENGINEERING RESILIENCE. <br />
              DIRECTING VISUALS.
            </h2>

            {/* Credentials Strip with Traveling Hextech Mana Light Pulse */}
            <div className="relative mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 overflow-hidden border-y border-[#C89B3C]/30 py-3 font-mono text-xs text-[#C8AA6E]">
              <span
                aria-hidden="true"
                className="animate-divider-pulse pointer-events-none absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#0AC8B9] to-transparent"
              />
              <span className="inline-flex items-center gap-2 text-[#F0E6D2]">
                <GraduationCap size={15} className="text-[#C89B3C]" aria-hidden="true" />
                {content.identity.education.degree} — {content.identity.education.institution}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#C8AA6E]">
                <MapPin size={14} className="text-[#0AC8B9]" aria-hidden="true" />
                {content.identity.originBase}
              </span>
            </div>

            {/* Clean Vietnamese Biography */}
            <div className="mt-4 space-y-3">
              {content.bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-body text-[14.5px] leading-relaxed text-[#E2E8F0] sm:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Verified Hextech Engineering Telemetry Strip */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {content.dossierMetrics.map((m) => (
                <div
                  key={m.label}
                  className="fantasy-card rounded-lg px-3 py-2"
                >
                  <p className="truncate font-mono text-[9px] uppercase tracking-wider text-[#C8AA6E]">
                    {m.label}
                  </p>
                  <p className="mt-0.5 font-display text-sm font-extrabold text-[#0AC8B9]">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Runeterra Communication Protocols (VIE, ENG, ZHO) */}
            <div className="mt-6">
              <div className="flex items-center gap-2 font-gaming text-[11px] font-bold uppercase tracking-[0.22em] text-[#C8AA6E]">
                <Languages size={13} className="text-[#0AC8B9]" />
                <span>RUNETERRA COMMUNICATION PROTOCOLS</span>
              </div>
              <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {content.identity.languages.map((lang, idx) => (
                  <div
                    key={lang.code}
                    className="fantasy-card flex items-center justify-between rounded-lg px-3.5 py-2.5"
                  >
                    <div>
                      <p className="font-gaming text-xs font-bold uppercase tracking-wider text-[#F0E6D2]">
                        {lang.name}
                      </p>
                      <p className="font-body text-[11px] text-[#B8B0C8]">{lang.level}</p>
                    </div>
                    <span
                      className="hextech-chamfer animate-pill-glow border border-[#0AC8B9]/55 bg-[#091428] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0AC8B9]"
                      style={{ animationDelay: `${idx * 0.35}s` }}
                    >
                      {lang.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Interactive Hextech Production Platform Relics */}
            <div className="mt-6">
              <p className="font-gaming text-[11px] font-bold uppercase tracking-[0.22em] text-[#C8AA6E]">
                HEXTECH PRODUCTION ARSENAL (CLICK TO INSPECT ARTIFACT)
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                {PLATFORM_STACK_ITEMS.map(({ label, sub, Icon, targetStation, projectIndex }, idx) => (
                  <div
                    key={label}
                    className="will-change-transform"
                    style={{
                      transform: `perspective(900px) translate3d(0, calc(var(--p, 0) * ${-22 - idx * 9}px), 0) scale(calc(1 - var(--ap, 0) * ${0.1 + idx * 0.015})) rotateX(calc(var(--p, 0) * ${10 + idx * 2}deg))`,
                    }}
                  >
                    <div
                      className="animate-tile-float"
                      style={{ animationDelay: `${idx * 0.45}s` }}
                    >
                      <button
                        type="button"
                        onMouseEnter={() => playMechanicalTick()}
                        onClick={() => {
                          playMechanicalUnlock()
                          stationStore.navigate(
                            targetStation,
                            typeof projectIndex === 'number' ? { projectIndex } : undefined
                          )
                        }}
                        className="fantasy-card group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-lg px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Icon
                            size={20}
                            className="shrink-0 text-[#F0E6D2] transition-all duration-300 group-hover:scale-115 group-hover:text-[#0AC8B9]"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-gaming text-sm font-bold uppercase tracking-wider text-[#F0E6D2]">
                              {label}
                            </p>
                            <p className="truncate font-mono text-[10px] text-[#C8AA6E]">{sub}</p>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={13}
                          className="shrink-0 text-[#C89B3C]/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0AC8B9]"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Champion Mastery VII Frame */}
          <div
            className="will-change-transform lg:col-span-5"
            style={{
              transform:
                'perspective(1200px) translate3d(calc(var(--ap, 0) * 64px), calc(var(--p, 0) * -68px), 0) rotateY(calc(var(--p, 0) * 14deg)) scale(calc(1 - var(--ap, 0) * 0.08))',
            }}
          >
            <Character3D fallbackImage={content.identity.avatarUrl} />
          </div>
        </div>
      </div>
    </section>
  )
}
