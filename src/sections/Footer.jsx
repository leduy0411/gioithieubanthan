import React from 'react'
import { ArrowUp, Zap } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#030307] px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-[#00f2fe]">
            <Zap size={13} />
          </div>
          <span className="text-zinc-300 font-medium">LE DUY // PORTFOLIO 2026</span>
          <span className="text-zinc-700">|</span>
          <span>MINIMALIST COSMIC ODYSSEY</span>
        </div>

        <div className="flex items-center gap-6">
          <span>VINH LONG, VIETNAM • GMT+7</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="tactile-btn inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-zinc-400 hover:border-white/20 hover:text-white transition-colors"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp size={14} className="text-[#00f2fe]" />
          </button>
        </div>
      </div>
    </footer>
  )
}
