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
  Sparkles,
  Terminal,
  User,
  X,
  Zap,
} from 'lucide-react'
import { personalInfo, projectShowcase } from '../data/portfolioData'

export default function CommandPalette({ isOpen, setIsOpen }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)

  // Global Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  const copyEmailAction = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setIsOpen(false)
    }, 1200)
  }

  const navigateTo = (hash) => {
    setIsOpen(false)
    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const items = [
    // Sections
    {
      id: 'sec-home',
      category: 'NAVIGATION',
      title: 'Index // Flagship Stage',
      subtitle: 'Hero, 3D Character Stage & Identity',
      icon: Zap,
      action: () => navigateTo('#home'),
    },
    {
      id: 'sec-about',
      category: 'NAVIGATION',
      title: 'Profile // Architectural Philosophy',
      subtitle: 'Background, Credentials & Passions',
      icon: User,
      action: () => navigateTo('#about'),
    },
    {
      id: 'sec-projects',
      category: 'NAVIGATION',
      title: 'Systems // Production Architectures',
      subtitle: 'FastAPI AI Attendance & Gemini Platform',
      icon: Layers,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'sec-skills',
      category: 'NAVIGATION',
      title: 'Expertise // Technical Arsenal',
      subtitle: 'Capabilities, Production Stacks & Bash',
      icon: Terminal,
      action: () => navigateTo('#skills'),
    },
    {
      id: 'sec-socials',
      category: 'NAVIGATION',
      title: 'Signal // Direct Collaboration',
      subtitle: 'Verified Channels & Encrypted Inbox',
      icon: Mail,
      action: () => navigateTo('#socials'),
    },
    // Projects
    ...projectShowcase.map((p) => ({
      id: `proj-${p.id}`,
      category: 'SYSTEMS',
      title: p.name,
      subtitle: `${p.category} • ${p.tech.slice(0, 3).join(', ')}`,
      icon: Code,
      action: () => navigateTo('#projects'),
    })),
    // Quick Actions
    {
      id: 'act-copy-email',
      category: 'QUICK ACTIONS',
      title: copied ? 'Email Address Copied! ✓' : 'Copy Primary Email Address',
      subtitle: personalInfo.email,
      icon: copied ? Check : Copy,
      action: copyEmailAction,
      highlight: true,
    },
    {
      id: 'act-email',
      category: 'QUICK ACTIONS',
      title: 'Compose Direct Email',
      subtitle: `Open client -> ${personalInfo.email}`,
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${personalInfo.email}`
        setIsOpen(false)
      },
    },
  ]

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyNav = (e) => {
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
      className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-20 sm:pt-28 bg-black/80 backdrop-blur-2xl animate-fade-up"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14]/95 shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(0,242,254,0.15)] backdrop-blur-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <Search size={18} className="text-[#00f2fe] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyNav}
            placeholder="Type a command, jump to system, or search..."
            className="w-full bg-transparent font-mono text-sm text-white placeholder:text-zinc-500 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
            ESC
          </kbd>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[22rem] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-zinc-500">
              No matching commands found for "{query}"
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
                        ? 'border border-[#00f2fe]/40 bg-[#00f2fe]/10 text-white'
                        : 'border border-transparent text-zinc-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                          isSelected
                            ? 'border-[#00f2fe]/50 bg-[#00f2fe]/20 text-[#00f2fe]'
                            : 'border-white/[0.08] bg-white/[0.03] text-zinc-400'
                        }`}
                      >
                        <Icon size={17} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-[#00f2fe]">
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
                        isSelected ? 'translate-x-1 text-[#00f2fe]' : 'text-zinc-600'
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
          <span className="text-[#00f2fe]">LE DUY // CORE COMMAND</span>
        </div>
      </div>
    </div>
  )
}
