import { useEffect, useState, useSyncExternalStore } from 'react'
import { STATIONS, stationStore, StationIndex } from '../store/stationStore'

/**
 * Observes viewport scroll across the 5 orbital sections
 * with a 50% threshold to seamlessly switch station state.
 */
export function useActiveSection() {
  const storeState = useSyncExternalStore(
    stationStore.subscribe,
    stationStore.getState,
    stationStore.getState
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const sectionElements = STATIONS.map((s) => document.getElementById(s.sectionId)).filter(
      (el): el is HTMLElement => el !== null
    )

    if (sectionElements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const index = STATIONS.findIndex((s) => s.sectionId === visible.target.id)
          if (index !== -1) {
            stationStore.setStation(index as StationIndex)
          }
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.15, 0.45, 0.75],
      }
    )

    sectionElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return storeState
}
