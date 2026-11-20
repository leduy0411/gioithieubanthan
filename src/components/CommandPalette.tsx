import React, { useEffect, useState, useRef } from 'react'
import {
  ArrowRight,
  Check,
  Code,
  Copy,
  ExternalLink,
  Mail,
  Search,
  Volume2,
  VolumeX,
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
  category: 'STATION' | 'PROJECT' | 'SOCIAL' | 'ACTION'
  title: string
  subtitle: string
  icon: React.ElementType
  action: () => void
}

export default function CommandPalette({ isOpen, setIsOpen }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const { isAudioEnabled, toggleAudio } = useAudioDrone()

  // Save previous focus on open and restore when closed
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setQuery('')
      setSelectedIndex(0)
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [isOpen])

  // Global Ctrl+K / Cmd+K and Escape + Focus Trap inside dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        return
      }

      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        return
      }

      // Focus Trap (Tab / Shift+Tab stays inside modal)
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'input, button, a[href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
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
    }, 900)
  }

  const navigateToStation = (stationIdx: StationIndex, projectIndex?: number) => {
    setIsOpen(false)
    stationStore.navigate(stationIdx, { projectIndex })
  }

  const items: PaletteItem[] = [
    // 5 Standalone Pages
    ...STATIONS.map((station) => ({
      id: `station-${station.id}`,
      category: 'STATION' as const,
      title: station.callsign,
      subtitle: `${station.path} • ${station.planetName}`,
      icon: Zap,
      action: () => navigateToStation(station.id),
    })),

    // 4 Production Projects
    ...content.projects.map((project, idx) => ({
      id: `proj-${project.id}`,
      category: 'PROJECT' as const,
      title: project.title,
      subtitle: `${project.category} • ${project.techStack.slice(0, 4).join(', ')}`,
      icon: Code,
      action: () => navigateToStation(2, idx),
    })),

    // 4 Verified Social Links
    ...content.socials.map((soc) => ({
      id: `soc-${soc.id}`,
      category: 'SOCIAL' as const,
      title: `Open ${soc.name} (${soc.handle})`,
      subtitle: soc.url,
      icon: ExternalLink,
      action: () => {
        window.open(soc.url, '_blank', 'noopener,noreferrer')
        setIsOpen(false)
      },
    })),

    // Direct Actions
    {
      id: 'act-copy-email',
      category: 'ACTION' as const,
      title: copied ? 'COPIED ✓' : 'Copy Email Address',
      subtitle: content.identity.email,
      icon: copied ? Check : Copy,
      action: copyEmailAction,
    },
    {
      id: 'act-compose-email',
      category: 'ACTION' as const,
      title: 'Compose Direct Email',
      subtitle: `mailto:${content.identity.email}`,
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${content.identity.email}`
        setIsOpen(false)
      },
    },
    {
      id: 'act-toggle-sound',
      category: 'ACTION' as const,
      title: isAudioEnabled ? 'SOUND: Turn OFF' : 'SOUND: Turn ON',
      subtitle: 'Web Audio API ambient drone & station blip',
      icon: isAudioEnabled ? VolumeX : Volume2,
      action: () => toggleAudio(),
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
      setSelectedIndex(
        (prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1)
      )
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
      aria-label="Quick Navigation Command Palette"
      className="fixed inset-0 z-[99999] flex items-start justify-center bg-[#0B0615]/85 p-4 pt-20 backdrop-blur-2xl sm:pt-28"
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={dialogRef}
        className="fantasy-card w-full max-w-2xl overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <Search size={17} className="shrink-0 text-[#F472B6]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyNav}
            placeholder="Search sections, jump to projects, open links, or copy email..."
            className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-[#B8B0C8]/50"
            aria-label="Search commands"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg border border-white/15 px-2 py-1 font-mono text-[10px] text-[#B8B0C8] hover:text-white"
            aria-label="Close Command Palette"
          >
            ESC
          </button>
        </div>

        {/* Filtered Command List */}
        <div className="max-h-[22rem] overflow-y-auto p-2" role="listbox">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-[#94A3B8]">
              No matching coordinates or commands for &quot;{query}&quot;
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
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                      isSelected
                        ? 'border border-white/20 bg-white/[0.08] text-[#F8FAFC]'
                        : 'border border-transparent text-[#94A3B8] hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#F8FAFC]">
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8]">
                          {item.category}
                        </span>
                        <p className="truncate font-display text-sm font-semibold text-[#F8FAFC]">
                          {item.title}
                        </p>
                        <p className="truncate font-mono text-xs text-[#94A3B8]">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isSelected ? 'translate-x-1 text-[#F8FAFC]' : 'text-[#94A3B8]/40'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer Controls Legend */}
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#020307]/80 px-5 py-3 font-mono text-[11px] text-[#94A3B8]">
          <div className="flex items-center gap-4">
            <span>↑ ↓ NAVIGATE</span>
            <span>ENTER SELECT</span>
            <span>ESC CLOSE</span>
          </div>
          <span>MISSION CONTROL</span>
        </div>
      </div>
    </div>
  )
}
