/**
 * STATION STORE // MISSION CONTROL SHARED STATE
 * src/store/stationStore.ts
 *
 * Lightweight reactive store managing active orbital station (0-4),
 * flight direction ('forward' | 'backward'), and dynamic CSS --accent variable.
 */

export type StationIndex = 0 | 1 | 2 | 3 | 4

export interface StationConfig {
  id: StationIndex
  sectionId: string
  callsign: string
  planetName: string
  accentColor: string
}

export const STATIONS: readonly StationConfig[] = [
  { id: 0, sectionId: 'home', callsign: 'STATION 00 // INDEX', planetName: 'Cryo-Obsidian', accentColor: '#38BDF8' },
  { id: 1, sectionId: 'about', callsign: 'STATION 01 // PROFILE', planetName: 'Luna Argent', accentColor: '#E2E8F0' },
  { id: 2, sectionId: 'projects', callsign: 'STATION 02 // SYSTEMS', planetName: 'Helios Amber', accentColor: '#F59E0B' },
  { id: 3, sectionId: 'skills', callsign: 'STATION 03 // EXPERTISE', planetName: 'Nebula Gas Giant', accentColor: '#A855F7' },
  { id: 4, sectionId: 'socials', callsign: 'STATION 04 // SIGNAL', planetName: 'Eclipse Horizon', accentColor: '#BFDBFE' },
] as const

type Listener = () => void

let activeStation: StationIndex = 0
let direction: 'forward' | 'backward' = 'forward'
const listeners = new Set<Listener>()

/**
 * FIX: useSyncExternalStore requires getSnapshot to return the SAME reference
 * when state hasn't changed. We cache the snapshot object and only create a new
 * one inside notify() when state actually changes. This prevents the
 * "getSnapshot should be cached" infinite loop warning.
 */
interface StoreSnapshot {
  activeStation: StationIndex
  direction: 'forward' | 'backward'
  currentConfig: StationConfig
}

let cachedSnapshot: StoreSnapshot = {
  activeStation: 0,
  direction: 'forward',
  currentConfig: STATIONS[0],
}

function notify() {
  // Rebuild snapshot with new reference only on actual change
  cachedSnapshot = {
    activeStation,
    direction,
    currentConfig: STATIONS[activeStation],
  }
  // Sync CSS variable --accent on document root
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--accent', cachedSnapshot.currentConfig.accentColor)
  }
  listeners.forEach((l) => l())
}

export const stationStore = {
  /** Returns stable cached snapshot — same reference between notify() calls */
  getState(): StoreSnapshot {
    return cachedSnapshot
  },

  setStation(nextStation: number) {
    const clamped = Math.min(Math.max(Math.round(nextStation), 0), 4) as StationIndex
    if (clamped === activeStation) return

    direction = clamped > activeStation ? 'forward' : 'backward'
    activeStation = clamped
    notify()
  },

  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
