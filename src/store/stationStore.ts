/**
 * STATION STORE // MULTI-PAGE ROUTER & UNIFIED NAVIGATION STATE
 * src/store/stationStore.ts
 */

import { resetScrollMotionOnPageChange } from '../hooks/useScrollMotion'

export type StationIndex = 0 | 1 | 2 | 3 | 4

export interface StationConfig {
  id: StationIndex
  sectionId: string
  path: string
  aliases: readonly string[]
  callsign: string
  planetName: string
  accentColor: string
}

export const STATIONS: readonly StationConfig[] = [
  {
    id: 0,
    sectionId: 'home',
    path: '/',
    aliases: ['', 'home', 'index.html'],
    callsign: 'Home',
    planetName: 'Twilight Realm',
    accentColor: '#EC4899',
  },
  {
    id: 1,
    sectionId: 'about',
    path: '/profile',
    aliases: ['profile', 'about'],
    callsign: 'Profile',
    planetName: 'Midnight Sanctuary',
    accentColor: '#EC4899',
  },
  {
    id: 2,
    sectionId: 'projects',
    path: '/systems',
    aliases: ['systems', 'projects'],
    callsign: 'Systems',
    planetName: 'Artifact Deck',
    accentColor: '#EC4899',
  },
  {
    id: 3,
    sectionId: 'skills',
    path: '/expertise',
    aliases: ['expertise', 'skills'],
    callsign: 'Expertise',
    planetName: 'Core Arsenal',
    accentColor: '#EC4899',
  },
  {
    id: 4,
    sectionId: 'socials',
    path: '/signal',
    aliases: ['signal', 'socials'],
    callsign: 'Signal',
    planetName: 'Direct Portal',
    accentColor: '#EC4899',
  },
] as const

type Listener = () => void

export interface StoreSnapshot {
  activeStation: StationIndex
  direction: 'forward' | 'backward'
  currentConfig: StationConfig
  isNotFound: boolean
  transitionCount: number
  selectedProjectIndex: number | null
}

function resolveRouteFromLocation(): { station: StationIndex; notFound: boolean } {
  if (typeof window === 'undefined') {
    return { station: 0, notFound: false }
  }

  const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase()
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase()

  // Priority 1: explicit pathname (e.g. /profile, /systems, /expertise, /signal)
  if (rawPath !== '') {
    const byPath = STATIONS.find((s) => s.aliases.includes(rawPath))
    if (byPath) return { station: byPath.id, notFound: false }
    return { station: 0, notFound: true }
  }

  // Priority 2: backward-compatible hash URLs (e.g. /#projects, /#about)
  if (rawHash !== '') {
    const byHash = STATIONS.find((s) => s.aliases.includes(rawHash))
    if (byHash) return { station: byHash.id, notFound: false }
  }

  return { station: 0, notFound: false }
}

const initialRoute = resolveRouteFromLocation()

let activeStation: StationIndex = initialRoute.station
let direction: 'forward' | 'backward' = 'forward'
let isNotFound: boolean = initialRoute.notFound
let transitionCount = 0
let selectedProjectIndex: number | null = null
const listeners = new Set<Listener>()

let cachedSnapshot: StoreSnapshot = {
  activeStation,
  direction,
  currentConfig: STATIONS[activeStation],
  isNotFound,
  transitionCount,
  selectedProjectIndex,
}

function syncDocumentMeta() {
  if (typeof document === 'undefined') return
  const cfg = STATIONS[activeStation]
  document.title = isNotFound ? 'LE DUY. — 404 Not Found' : `LE DUY. — ${cfg.callsign}`
}

function notify() {
  cachedSnapshot = {
    activeStation,
    direction,
    currentConfig: STATIONS[activeStation],
    isNotFound,
    transitionCount,
    selectedProjectIndex,
  }
  syncDocumentMeta()
  listeners.forEach((l) => l())
}

function handleBrowserRouteSync() {
  const resolved = resolveRouteFromLocation()
  const changed = resolved.station !== activeStation || resolved.notFound !== isNotFound
  if (!changed) return

  direction = resolved.station >= activeStation ? 'forward' : 'backward'
  activeStation = resolved.station
  isNotFound = resolved.notFound
  transitionCount += 1

  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
  resetScrollMotionOnPageChange(direction)
  notify()
}

if (typeof window !== 'undefined') {
  syncDocumentMeta()
  window.addEventListener('popstate', handleBrowserRouteSync)
  window.addEventListener('hashchange', handleBrowserRouteSync)
}

export const stationStore = {
  getState(): StoreSnapshot {
    return cachedSnapshot
  },

  navigate(nextStation: number, options?: { projectIndex?: number; replace?: boolean }) {
    const clamped = Math.min(Math.max(Math.round(nextStation), 0), 4) as StationIndex
    const targetConfig = STATIONS[clamped]
    const nextProject =
      typeof options?.projectIndex === 'number' ? options.projectIndex : null

    const alreadyOnPage =
      clamped === activeStation && !isNotFound && nextProject === null

    if (alreadyOnPage) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    direction = clamped >= activeStation ? 'forward' : 'backward'
    activeStation = clamped
    isNotFound = false
    selectedProjectIndex = nextProject
    transitionCount += 1

    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      if (currentPath !== targetConfig.path || window.location.hash !== '') {
        if (options?.replace) {
          window.history.replaceState({ station: clamped }, '', targetConfig.path)
        } else {
          window.history.pushState({ station: clamped }, '', targetConfig.path)
        }
      }
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    resetScrollMotionOnPageChange(direction)
    notify()
  },

  setStation(nextStation: number) {
    this.navigate(nextStation)
  },

  clearSelectedProject() {
    if (selectedProjectIndex === null) return
    selectedProjectIndex = null
    notify()
  },

  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
