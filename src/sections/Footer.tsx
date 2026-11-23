import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import { STATIONS, stationStore } from '../store/stationStore'
import { useActiveSection } from '../hooks/useActiveSection'
import { playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

export default function Footer() {
  const { activeStation } = useActiveSection()
  const prevStation = activeStation > 0 ? STATIONS[activeStation - 1] : null
  const nextStation = activeStation < STATIONS.length - 1 ? STATIONS[activeStation + 1] : null

  return (
    <footer className="relative z-10 border-t border-[#C89B3C]/35 bg-[#070A17]/95 px-5 py-4 backdrop-blur-md sm:px-8">
      {/* Top Center Piltover Gold Diamond Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1"
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C89B3C]" />
        <span className="h-2.5 w-2.5 rotate-45 border border-[#F0E6D2] bg-[#091428]" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C89B3C]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        {/* Left: Previous Realm Button */}
        <div className="flex w-full items-center justify-center md:w-auto md:justify-start">
          {prevStation ? (
            <a
              href={prevStation.path}
              onMouseEnter={() => playMechanicalTick()}
              onClick={(e) => {
                e.preventDefault()
                playMechanicalUnlock()
                stationStore.navigate(prevStation.id)
              }}
              className="hextech-btn tactile-btn inline-flex items-center gap-2 px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.16em] text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
            >
              <ChevronLeft size={14} className="text-[#0AC8B9]" aria-hidden="true" />
              <span>{prevStation.callsign}</span>
            </a>
          ) : (
            <div className="flex items-center gap-2.5">
              <span
                className="animate-node-blink h-2 w-2 rotate-45 border border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_8px_#0AC8B9]"
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8AA6E]">
                REALM 01 / 0{STATIONS.length}
              </span>
            </div>
          )}
        </div>

        {/* Center: 5 Hextech Diamond Nodes + Copyright */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3" role="navigation" aria-label="Realm step switcher">
            {STATIONS.map((page) => {
              const isCurrent = page.id === activeStation
              return (
                <button
                  key={page.id}
                  type="button"
                  onMouseEnter={() => playMechanicalTick()}
                  onClick={() => {
                    playMechanicalUnlock()
                    stationStore.navigate(page.id)
                  }}
                  title={`[Key ${page.id + 1}] ${page.callsign} (${page.path})`}
                  aria-label={`Go to ${page.callsign} page`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`rotate-45 border transition-all duration-300 focus:outline-none ${
                    isCurrent
                      ? 'h-3 w-3 border-[#F0E6D2] bg-[#0AC8B9] shadow-[0_0_12px_#0AC8B9]'
                      : 'h-2 w-2 border-[#C89B3C]/60 bg-[#091428] hover:border-[#F0E6D2] hover:bg-[#C89B3C]'
                  }`}
                />
              )
            })}
          </div>
          <p className="font-gaming text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C8AA6E]/85">
            LE DUY. // 2026 • PILTOVER HEXTECH ARCHIVE • TRA VINH, VN
          </p>
        </div>

        {/* Right: Next Realm Button */}
        <div className="flex w-full items-center justify-center md:w-auto md:justify-end">
          {nextStation ? (
            <a
              href={nextStation.path}
              onMouseEnter={() => playMechanicalTick()}
              onClick={(e) => {
                e.preventDefault()
                playMechanicalUnlock()
                stationStore.navigate(nextStation.id)
              }}
              className="hextech-play-btn tactile-btn inline-flex items-center gap-2 px-5 py-2 font-gaming text-xs font-extrabold uppercase tracking-[0.16em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
            >
              <span>NEXT: {nextStation.callsign}</span>
              <ChevronRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <a
              href="/"
              onMouseEnter={() => playMechanicalTick()}
              onClick={(e) => {
                e.preventDefault()
                playMechanicalUnlock()
                stationStore.navigate(0)
              }}
              className="hextech-btn tactile-btn inline-flex items-center gap-2 px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.16em] text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
            >
              <Home size={13} className="text-[#0AC8B9]" aria-hidden="true" />
              <span>RETURN HOME</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
