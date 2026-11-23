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
      className="relative flex flex-1 min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden bg-[#110B1F] px-5 pt-24 pb-10 sm:px-8"
    >
      {/* Breathing Warm Amber & Arcane Violet Ambient Corner Glows */}
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-aura-breath pointer-events-none absolute -left-24 bottom-12 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,transparent_70%)] blur-3xl"
        style={{ animationDelay: '-3s' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Bi-Directional Horizontal Glide & Depth Parallax */}
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
                <span className="animate-node-blink h-2 w-2 rotate-45 bg-[#EC4899] shadow-[0_0_8px_#EC4899]" />
                <p className="font-gaming text-xs font-bold uppercase tracking-[0.22em] text-[#F472B6]">
                  PROFILE // TRA VINH, VN
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/12 px-2.5 py-0.5 font-mono text-[10px] text-[#FDE68A]">
                <ShieldCheck size={11} className="text-[#F59E0B]" />
                {content.identity.education.status}
              </span>
            </div>

            <h2 className="animate-title-shine mt-4 font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-[0.04em] sm:text-5xl">
              ENGINEERING RESILIENCE. <br />
              DIRECTING VISUALS.
            </h2>

            {/* Credentials Strip with Traveling Light Pulse Divider */}
            <div className="relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 overflow-hidden border-y border-white/[0.1] py-3.5 font-mono text-xs text-[#B8B0C8]">
              <span
                aria-hidden="true"
                className="animate-divider-pulse pointer-events-none absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"
              />
              <span className="inline-flex items-center gap-2 text-white">
                <GraduationCap size={15} className="text-[#F59E0B]" aria-hidden="true" />
                {content.identity.education.degree} — {content.identity.education.institution}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#B8B0C8]">
                <MapPin size={14} className="text-[#F472B6]" aria-hidden="true" />
                {content.identity.originBase}
              </span>
            </div>

            {/* Clean Vietnamese Biography */}
            <div className="mt-5 space-y-3.5">
              {content.bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-body text-[15px] leading-relaxed text-[#B8B0C8] sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pro Max Language Matrix (VIE, ENG, ZHO) */}
            <div className="mt-7">
              <div className="flex items-center gap-2 font-gaming text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                <Languages size={13} className="text-[#F472B6]" />
                <span>COMMUNICATION PROTOCOLS</span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {content.identity.languages.map((lang, idx) => (
                  <div
                    key={lang.code}
                    className="fantasy-card flex items-center justify-between rounded-lg px-3.5 py-2.5"
                  >
                    <div>
                      <p className="font-gaming text-xs font-bold uppercase tracking-wider text-white">
                        {lang.name}
                      </p>
                      <p className="font-body text-[11px] text-[#B8B0C8]">{lang.level}</p>
                    </div>
                    <span
                      className="animate-pill-glow rounded border border-[#EC4899]/40 bg-[#EC4899]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#F472B6]"
                      style={{ animationDelay: `${idx * 0.35}s` }}
                    >
                      {lang.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Interactive Tech Stack Platform Tiles -> Click jumps to matching project / expertise */}
            <div className="mt-8">
              <p className="font-gaming text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                SUPPORTED PRODUCTION PLATFORMS (CLICK TO INSPECT)
              </p>
              <div className="mt-3.5 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
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
                        className="fantasy-card group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-lg px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EC4899]/65 hover:shadow-[0_14px_30px_rgba(236,72,153,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/75"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Icon
                            size={21}
                            className="shrink-0 text-white transition-all duration-300 group-hover:scale-115 group-hover:text-[#F472B6]"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-gaming text-sm font-bold uppercase tracking-wider text-white">
                              {label}
                            </p>
                            <p className="truncate font-mono text-[10px] text-[#B8B0C8]">{sub}</p>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={13}
                          className="shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F59E0B]"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dramatic Bi-Directional Counter-Parallax & Interactive 3D Character Frame */}
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
