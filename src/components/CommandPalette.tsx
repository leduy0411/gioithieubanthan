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
import { useAudioDrone, playMechanicalTick, playMechanicalUnlock } from '../hooks/useAudioDrone'

interface CommandPaletteProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onOpenIdCard?: () => void
}

interface PaletteItem {
  id: string
  category: 'REALM' | 'ARTIFACT' | 'PORTAL' | 'ACTION'
  title: string
  subtitle: string
  icon: React.ElementType
  action: () => void
}

export default function CommandPalette({ isOpen, setIsOpen, onOpenIdCard }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const { isAudioEnabled, toggleAudio } = useAudioDrone()

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        playMechanicalUnlock()
        setIsOpen((prev) => !prev)
        return
      }

      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        return
      }

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
    playMechanicalUnlock()
    navigator.clipboard.writeText(content.identity.email)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setIsOpen(false)
    }, 900)
  }

  const navigateToStation = (stationIdx: StationIndex, projectIndex?: number) => {
    playMechanicalUnlock()
    setIsOpen(false)
    stationStore.navigate(stationIdx, { projectIndex })
  }

  const items: PaletteItem[] = [
    ...STATIONS.map((station) => ({
      id: `station-${station.id}`,
      category: 'REALM' as const,
      title: `0${station.id + 1} // ${station.callsign}`,
      subtitle: `${station.path} • ${station.planetName} [Shortcut Key ${station.id + 1}]`,
      icon: Zap,
      action: () => navigateToStation(station.id),
    })),

    ...content.projects.map((project, idx) => ({
      id: `proj-${project.id}`,
      category: 'ARTIFACT' as const,
      title: project.title,
      subtitle: `${project.category} • ${project.techStack.slice(0, 4).join(', ')}`,
      icon: Code,
      action: () => navigateToStation(2, idx),
    })),

    ...content.socials.map((soc) => ({
      id: `soc-${soc.id}`,
      category: 'PORTAL' as const,
      title: `Open ${soc.name} (${soc.handle})`,
      subtitle: soc.url,
      icon: ExternalLink,
      action: () => {
        playMechanicalUnlock()
        window.open(soc.url, '_blank', 'noopener,noreferrer')
        setIsOpen(false)
      },
    })),

    {
      id: 'act-summoner-id-card',
      category: 'ACTION' as const,
      title: 'Open Summoner Engineer ID Card (1-Page CV Dossier)',
      subtitle: 'Quick executive summary, copyable CV & PDF print view',
      icon: Zap,
      action: () => {
        playMechanicalUnlock()
        setIsOpen(false)
        onOpenIdCard?.()
      },
    },
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
      title: isAudioEnabled ? 'HEXTECH SFX: Turn OFF' : 'HEXTECH SFX: Turn ON',
      subtitle: 'Web Audio API Piltover clockwork ratchet & mana chime',
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
      playMechanicalTick()
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      playMechanicalTick()
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
      aria-label="Hextech Command Palette"
      className="fixed inset-0 z-[99999] flex items-start justify-center bg-[#060A17]/88 p-4 pt-20 backdrop-blur-2xl sm:pt-28"
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={dialogRef}
        className="fantasy-card w-full max-w-2xl overflow-hidden rounded-xl border-2 border-[#C89B3C]/75"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#C89B3C]/30 bg-[#091428]/90 px-5 py-4">
          <Search size={17} className="shrink-0 text-[#0AC8B9]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyNav}
            placeholder="Search Hextech realms, artifacts, portals, or toggle SFX..."
            className="w-full bg-transparent font-mono text-sm text-[#F0E6D2] outline-none placeholder:text-[#C8AA6E]/55"
            aria-label="Search commands"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="hextech-chamfer border border-[#C89B3C]/50 bg-[#091428] px-2.5 py-1 font-mono text-[10px] text-[#F0E6D2] hover:border-[#0AC8B9]"
            aria-label="Close Command Palette"
          >
            ESC
          </button>
        </div>

        {/* Filtered Command List */}
        <div className="max-h-[22rem] overflow-y-auto p-2" role="listbox" data-scrollable="true">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-[#C8AA6E]">
              No matching Hextech coordinates for &quot;{query}&quot;
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
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all ${
                      isSelected
                        ? 'border border-[#C89B3C]/70 bg-[#091428] text-[#F0E6D2] shadow-[inset_0_0_16px_rgba(10,200,185,0.18)]'
                        : 'border border-transparent text-[#B8B0C8] hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#C89B3C]/45 bg-[#091428] text-[#0AC8B9]">
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#0AC8B9]">
                          {item.category}
                        </span>
                        <p className="truncate font-display text-sm font-bold text-[#F0E6D2]">
                          {item.title}
                        </p>
                        <p className="truncate font-mono text-xs text-[#C8AA6E]">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isSelected ? 'translate-x-1 text-[#0AC8B9]' : 'text-[#C8AA6E]/40'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer Controls Legend */}
        <div className="flex items-center justify-between border-t border-[#C89B3C]/30 bg-[#060914]/95 px-5 py-3 font-mono text-[11px] text-[#C8AA6E]">
          <div className="flex items-center gap-4">
            <span>↑ ↓ NAVIGATE</span>
            <span>ENTER EXECUTE</span>
            <span>ESC CLOSE</span>
          </div>
          <span className="text-[#0AC8B9]">PILTOVER HEXTECH CONSOLE</span>
        </div>
      </div>
    </div>
  )
}
