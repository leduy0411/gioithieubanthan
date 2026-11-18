import React, { useEffect, useState } from 'react'
import { STATIONS, stationStore, StationIndex } from '../store/stationStore'
import { useActiveSection } from '../hooks/useActiveSection'

/**
 * HudOverlay — Minimalist Deep-Space Mission Control HUD Frame
 *
 * Provides:
 * - 4 Corner crosshairs (+) with subtle orbital coordinates
 * - Right-edge vertical 5-station clickable indicators with hover callsigns
 * - Real-time Mission Timer (T+HH:MM:SS) in GMT+7 Asia/Ho_Chi_Minh
 * - Zero interference with user clicks (pointer-events-none on overlays, interactive on buttons)
 */
export default function HudOverlay() {
  const { activeStation } = useActiveSection()
  const [missionTime, setMissionTime] = useState<string>('00:00:00')
  const [hoveredStation, setHoveredStation] = useState<number | null>(null)

  // Real-time Vietnam GMT+7 Mission Elapsed Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setMissionTime(timeStr)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleStationClick = (index: StationIndex, sectionId: string) => {
    stationStore.setStation(index)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4 CORNER MISSION BRACKETS (+) & TELEMETRY                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-40 select-none hidden md:block" aria-hidden="true">
        {/* Top-Left Bracket */}
        <div className="absolute top-5 left-6 flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/35">
          <span className="text-[#38bdf8] font-bold">+</span>
          <span>SYS_ORBIT // 2026</span>
          <span className="text-white/15">|</span>
          <span className="text-white/25">LE DUY ARCHITECTURE</span>
        </div>

        {/* Top-Right Bracket */}
        <div className="absolute top-5 right-6 flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/35">
          <span className="text-white/25">TRA VINH, VN</span>
          <span className="text-white/15">|</span>
          <span>9.93°N 106.34°E</span>
          <span className="text-[#38bdf8] font-bold">+</span>
        </div>

        {/* Bottom-Left Bracket: Mission Timer T+ */}
        <div className="absolute bottom-5 left-6 flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/35">
          <span className="text-[#38bdf8] font-bold">+</span>
          <span>T+{missionTime}</span>
          <span className="text-white/15">|</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            NOMINAL
          </span>
        </div>

        {/* Bottom-Right Bracket */}
        <div className="absolute bottom-5 right-6 flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/35">
          <span className="text-white/25">ORBITAL TRACKING</span>
          <span className="text-white/15">|</span>
          <span className="text-[#38bdf8]">
            {STATIONS[activeStation]?.planetName.toUpperCase()}
          </span>
          <span className="text-[#38bdf8] font-bold">+</span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* RIGHT-EDGE 5-STATION DOCK (Interactive)                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Orbital Stations Navigation"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-3.5"
      >
        {STATIONS.map((station) => {
          const isActive = activeStation === station.id
          const isHovered = hoveredStation === station.id

          return (
            <div
              key={station.id}
              className="relative flex items-center gap-2.5"
              onMouseEnter={() => setHoveredStation(station.id)}
              onMouseLeave={() => setHoveredStation(null)}
            >
              {/* Floating Station Callsign Label on Hover or Active */}
              <div
                className={`pointer-events-none absolute right-7 rounded-md border border-white/[0.08] bg-[#070b14]/90 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white shadow-xl backdrop-blur-md transition-all duration-200 whitespace-nowrap ${
                  isHovered || isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2'
                }`}
              >
                <span className="text-[#38bdf8] font-semibold">0{station.id}</span>
                <span className="mx-1.5 text-white/20">//</span>
                <span className="text-zinc-200">{station.planetName}</span>
              </div>

              {/* Station Nav Button */}
              <button
                type="button"
                onClick={() => handleStationClick(station.id, station.sectionId)}
                aria-label={`Navigate to ${station.callsign}: ${station.planetName}`}
                aria-current={isActive ? 'step' : undefined}
                className="group relative flex h-6 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-[#38bdf8]"
              >
                {/* Active Pulse Ring */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: station.accentColor }}
                  />
                )}

                {/* Central Dot */}
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-2.5 w-2.5 shadow-[0_0_10px_var(--accent,#38bdf8)] ring-2 ring-white/20'
                      : 'h-1.5 w-1.5 bg-white/30 group-hover:bg-white/80 group-hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: isActive ? station.accentColor : undefined,
                  }}
                />
              </button>
            </div>
          )
        })}
      </nav>
    </>
  )
}
