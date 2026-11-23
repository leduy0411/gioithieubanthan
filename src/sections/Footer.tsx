import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import { STATIONS, stationStore } from '../store/stationStore'
import { useActiveSection } from '../hooks/useActiveSection'

export default function Footer() {
  const { activeStation } = useActiveSection()
  const prevStation = activeStation > 0 ? STATIONS[activeStation - 1] : null
  const nextStation = activeStation < STATIONS.length - 1 ? STATIONS[activeStation + 1] : null

  return (
    <footer className="relative z-10 border-t border-violet-400/15 bg-[#0C0717]/95 px-5 py-4 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        {/* Left: Previous Page Button (or Brand Emblem on Home) */}
        <div className="flex w-full items-center justify-center md:w-auto md:justify-start">
          {prevStation ? (
            <a
              href={prevStation.path}
              onClick={(e) => {
                e.preventDefault()
                stationStore.navigate(prevStation.id)
              }}
              className="tactile-btn inline-flex items-center gap-2 rounded border border-violet-400/35 bg-[#19112B] px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.16em] text-white transition-all hover:border-[#EC4899] hover:text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
            >
              <ChevronLeft size={14} aria-hidden="true" />
              <span>{prevStation.callsign}</span>
            </a>
          ) : (
            <div className="flex items-center gap-2.5">
              <span
                className="animate-node-blink h-2 w-2 rotate-45 bg-[#EC4899] shadow-[0_0_8px_#EC4899]"
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#B8B0C8]">
                PAGE 01 / 0{STATIONS.length}
              </span>
            </div>
          )}
        </div>

        {/* Center: 5-Page Selector Dots + Copyright */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2" role="navigation" aria-label="Page step switcher">
            {STATIONS.map((page) => {
              const isCurrent = page.id === activeStation
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => stationStore.navigate(page.id)}
                  title={`${page.callsign} (${page.path})`}
                  aria-label={`Go to ${page.callsign} page`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80 ${
                    isCurrent
                      ? 'w-9 bg-[#EC4899] shadow-[0_0_12px_#EC4899]'
                      : 'w-2.5 bg-white/25 hover:bg-white/60'
                  }`}
                />
              )
            })}
          </div>
          <p className="font-gaming text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B8B0C8]/80">
            LE DUY. // 2026 • TRA VINH, VIETNAM
          </p>
        </div>

        {/* Right: Next Page Button (or Return Home on Final Page) */}
        <div className="flex w-full items-center justify-center md:w-auto md:justify-end">
          {nextStation ? (
            <a
              href={nextStation.path}
              onClick={(e) => {
                e.preventDefault()
                stationStore.navigate(nextStation.id)
              }}
              className="tactile-btn inline-flex items-center gap-2 rounded border border-[#EC4899]/75 bg-[#EC4899]/18 px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(236,72,153,0.22)] transition-all hover:bg-[#EC4899] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/80"
            >
              <span>NEXT: {nextStation.callsign}</span>
              <ChevronRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                stationStore.navigate(0)
              }}
              className="tactile-btn inline-flex items-center gap-2 rounded border border-violet-400/35 bg-[#19112B] px-4 py-2 font-gaming text-xs font-bold uppercase tracking-[0.16em] text-white transition-all hover:border-[#EC4899] hover:text-[#F472B6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/70"
            >
              <Home size={13} aria-hidden="true" />
              <span>RETURN HOME</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
