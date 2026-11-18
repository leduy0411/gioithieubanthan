import React, { useEffect, useState, useRef } from 'react'
import {
  ArrowRight,
  Check,
  Code,
  Copy,
  ExternalLink,
  Layers,
  Mail,
  Search,
  Server,
  Terminal,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react'
import { content } from '../data/content'
import { STATIONS, stationStore, StationIndex } from '../store/stationStore'
import { useAudioDrone } from '../hooks/useAudioDrone'

interface CommandPaletteProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface PaletteItem {
  id: string
  category: 'NAVIGATION' | 'PROJECTS' | 'ACTIONS'
  title: string
  subtitle: string
  icon: React.ElementType
  action: () => void
  highlight?: boolean
}

export default function CommandPalette({ isOpen, setIsOpen }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const { isEnabled: isAudioEnabled, toggleAudio } = useAudioDrone()

  // Save previous focus on open and restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [isOpen])

  // Global Keyboard listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  const copyEmailAction = () => {
    navigator.clipboard.writeText(content.identity.email)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setIsOpen(false)
    }, 1200)
  }

  const navigateToStation = (stationIdx: StationIndex, hash: string) => {
    setIsOpen(false)
    stationStore.setStation(stationIdx)
    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const items: PaletteItem[] = [
    // 5 Stations Navigation
    ...STATIONS.map((station) => ({
      id: `station-${station.id}`,
      category: 'NAVIGATION' as const,
      title: `${station.callsign}`,
      subtitle: `Celestial Body: ${station.planetName}`,
      icon: Zap,
      action: () => navigateToStation(station.id, `#${station.sectionId}`),
    })),

    // 4 Real Production Projects
    ...content.projects.map((project) => ({
      id: `proj-${project.id}`,
      category: 'PROJECTS' as const,
      title: project.title,
      subtitle: `${project.categoryLabel} • ${project.techStack.slice(0, 3).join(', ')}`,
      icon: Code,
      action: () => navigateToStation(2, '#projects'),
    })),

    // Quick Actions
    {
      id: 'act-copy-email',
      category: 'ACTIONS' as const,
      title: copied ? 'Email Address Copied! ✓' : 'Copy Primary Email Address',
      subtitle: content.identity.email,
      icon: copied ? Check : Copy,
      action: copyEmailAction,
      highlight: true,
    },
    {
      id: 'act-email',
      category: 'ACTIONS' as const,
      title: 'Compose Direct Email',
      subtitle: `Open client -> ${content.identity.email}`,
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${content.identity.email}`
        setIsOpen(false)
      },
    },
    {
      id: 'act-audio',
      category: 'ACTIONS' as const,
      title: isAudioEnabled ? 'Mute Cockpit Audio Drone' : 'Activate Cockpit Audio Drone',
      subtitle: 'Web Audio API real-time synthesis',
      icon: isAudioEnabled ? VolumeX : Volume2,
      action: () => {
        toggleAudio()
      },
    },
  ]

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-20 sm:pt-28 bg-black/80 backdrop-blur-2xl"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14]/95 shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(56,189,248,0.15)] backdrop-blur-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <Search size={18} className="text-[#38bdf8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyNav}
            placeholder="Type a command, jump to station, or search systems..."
            className="w-full bg-transparent font-mono text-sm text-white placeholder:text-zinc-500 outline-none"
            aria-label="Mission Command Search"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
            ESC
          </kbd>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-white"
            aria-label="Close Command Palette"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[22rem] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-zinc-500">
              No matching mission commands found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, idx) => {
                const Icon = item.icon
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                      isSelected
                        ? 'border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-white'
                        : 'border border-transparent text-zinc-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                          isSelected
                            ? 'border-[#38bdf8]/50 bg-[#38bdf8]/20 text-[#38bdf8]'
                            : 'border-white/[0.08] bg-white/[0.03] text-zinc-400'
                        }`}
                      >
                        <Icon size={17} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#38bdf8]">
                            {item.category}
                          </span>
                        </div>
                        <p className="truncate font-display text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="truncate font-mono text-xs text-zinc-500">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={15}
                      className={`shrink-0 transition-transform ${
                        isSelected ? 'translate-x-1 text-[#38bdf8]' : 'text-zinc-600'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Bottom Shortcut Guide */}
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#04060c] px-5 py-3 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">↑</kbd>
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">↵</kbd>
              <span>to execute</span>
            </span>
          </div>
          <span className="text-[#38bdf8]">LE DUY // MISSION CONTROL</span>
        </div>
      </div>
    </div>
  )
}
