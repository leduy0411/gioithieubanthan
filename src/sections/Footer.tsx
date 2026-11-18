import React from 'react'
import { ArrowUp, Zap } from 'lucide-react'
import { stationStore } from '../store/stationStore'
import { content } from '../data/content'

export default function Footer() {
  const scrollToTop = () => {
    stationStore.setStation(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#020307] px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-zinc-500">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03] text-[#38bdf8]">
            <Zap size={13} />
          </div>
          <span className="text-zinc-300 font-medium">{content.identity.callsign} // ORBITAL 2026</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">MINIMALIST DEEP-SPACE ODYSSEY</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <span className="text-zinc-400">DEPLOYED ON VERCEL</span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline">{content.identity.timezoneLabel}</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="tactile-btn inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-zinc-400 hover:border-white/20 hover:text-white transition-colors"
          >
            <span>RETURN TO ORBIT 00</span>
            <ArrowUp size={14} className="text-[#38bdf8]" />
          </button>
        </div>
      </div>
    </footer>
  )
}
