import { useSyncExternalStore } from 'react'
import { stationStore } from '../store/stationStore'

/**
 * Subscribes to the unified multi-page navigation state (0–4: Home, Profile, Systems, Expertise, Signal).
 * Browser URL syncing (`popstate` / `hashchange`) and `document.title` updates are handled once globally
 * in `stationStore.ts` so every component shares one consistent snapshot with zero duplicate listeners.
 */
export function useActiveSection() {
  return useSyncExternalStore(
    stationStore.subscribe,
    stationStore.getState,
    stationStore.getState
  )
}
