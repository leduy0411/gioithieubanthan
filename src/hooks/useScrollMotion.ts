import { useEffect, useRef, useState } from 'react'

/**
 * useScrollMotion — High-Response 60fps Bi-Directional Scroll Motion Engine
 *
 * Key guarantees:
 * - Single shared requestAnimationFrame loop driving ALL sections with zero React re-renders.
 * - Reads window.scrollY with full cross-browser fallback (`documentElement.scrollTop || body.scrollTop`).
 * - Computes live damped per-section progress (`--p` from -1.2 below -> 0 centered -> +1.2 above),
 *   unsigned distance from center (`--ap` from 0 centered -> 1 edge), visibility (`--vis`),
 *   and live scroll velocity (`--vel` signed, `--speed` unsigned).
 * - Works identically scrolling DOWN and scrolling BACK UP.
 * - Motion is ON by default so Windows Battery Saver / "Animation Effects Off" never silently
 *   freezes the portfolio; users can toggle motion cleanly at any time via `toggleMotionEnabled()`.
 */

interface RegisteredNode {
  el: HTMLElement
  currentP: number
  initialized: boolean
}

const MOTION_STORAGE_KEY = 'duy_hextech_motion_v3'
const registeredNodes = new Map<HTMLElement, RegisteredNode>()
const motionListeners = new Set<() => void>()

let motionEnabled = true
try {
  if (typeof window !== 'undefined' && localStorage.getItem(MOTION_STORAGE_KEY) === 'false') {
    motionEnabled = false
  }
} catch {
  motionEnabled = true
}

let rafId: number | null = null
let currentScrollY = 0
let smoothedSpeed = 0
let smoothedSignedVel = 0
let wheelImpulseP = 0
let lastFrameTime = 0

function getScrollTop(): number {
  if (typeof window === 'undefined') return 0
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

export function getLiveScrollVelocity(): { speed: number; signed: number } {
  return { speed: smoothedSpeed, signed: smoothedSignedVel }
}

/**
 * Feeds live mouse-wheel / trackpad delta into the motion engine so even
 * non-overflowing standalone pages physically crank the Hextech Astrolabe ring
 * and 3D card depth in real time as the user scrolls.
 */
export function applyWheelImpulse(deltaY: number) {
  if (!motionEnabled) return
  const norm = Math.max(Math.min(deltaY / 220, 1), -1)
  wheelImpulseP = Math.max(Math.min(wheelImpulseP + norm * 0.45, 1.1), -1.1)
  smoothedSpeed = Math.min(Math.max(smoothedSpeed, Math.abs(norm)), 1)
  smoothedSignedVel = norm
  startEngine()
}

/**
 * Called whenever the user switches to another standalone page.
 * Resets cached scroll inertia immediately so the incoming page never jerks,
 * and triggers a graceful directional particle breeze in CosmicScene.
 */
export function resetScrollMotionOnPageChange(direction: 'forward' | 'backward') {
  currentScrollY = 0
  if (motionEnabled) {
    wheelImpulseP = direction === 'forward' ? -0.42 : 0.42
    smoothedSpeed = 0.78
    smoothedSignedVel = direction === 'forward' ? 0.78 : -0.78
  } else {
    wheelImpulseP = 0
    smoothedSpeed = 0
    smoothedSignedVel = 0
  }

  if (typeof document !== 'undefined') {
    const root = document.documentElement
    root.style.setProperty('--scroll-progress', '0')
    root.style.setProperty('--hero-progress', '0')
    root.style.setProperty('--hero-opacity', '1')
  }

  registeredNodes.forEach((entry) => {
    entry.currentP = 0
    entry.initialized = false
    entry.el.style.setProperty('--p', '0')
    entry.el.style.setProperty('--ap', '0')
    entry.el.style.setProperty('--vis', '1')
  })
}

export function isMotionEnabled(): boolean {
  return motionEnabled
}

export function setMotionEnabled(next: boolean) {
  motionEnabled = next
  try {
    localStorage.setItem(MOTION_STORAGE_KEY, String(next))
  } catch {
    // ignore storage failures
  }
  syncHtmlMotionAttribute()
  if (!next) {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    resetMotionVars()
  } else {
    startEngine()
  }
  motionListeners.forEach((fn) => fn())
}

function syncHtmlMotionAttribute() {
  if (typeof document === 'undefined') return
  if (motionEnabled) {
    document.documentElement.setAttribute('data-motion', 'active')
  } else {
    document.documentElement.setAttribute('data-motion', 'reduced')
  }
}

syncHtmlMotionAttribute()

function resetMotionVars() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const vh = Math.max(window.innerHeight, 1)
  const maxScroll = Math.max(root.scrollHeight - vh, 1)
  const globalProgress = Math.min(Math.max(getScrollTop() / maxScroll, 0), 1)

  smoothedSpeed = 0
  smoothedSignedVel = 0

  root.style.setProperty('--scroll-progress', globalProgress.toFixed(4))
  root.style.setProperty('--scroll-velocity', '0')
  root.style.setProperty('--hero-progress', '0')
  root.style.setProperty('--hero-opacity', '1')

  registeredNodes.forEach((entry) => {
    entry.el.style.setProperty('--p', '0')
    entry.el.style.setProperty('--ap', '0')
    entry.el.style.setProperty('--vis', '1')
    entry.el.style.setProperty('--vel', '0')
    entry.el.style.setProperty('--speed', '0')
    entry.el.style.setProperty('--section-progress', '0')
    entry.el.style.setProperty('--section-abs-progress', '0')
  })
}

function tick(now: number) {
  rafId = requestAnimationFrame(tick)

  if (!motionEnabled || document.hidden) {
    lastFrameTime = now
    return
  }

  const dt = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.05) : 1 / 60
  lastFrameTime = now

  // Crisp, responsive inertia lerp (~0.11 per 60fps frame so scroll feels physical & immediate)
  const alpha = 1 - Math.pow(1 - 0.11, dt * 60)

  const targetY = getScrollTop()
  const prevY = currentScrollY
  currentScrollY += (targetY - currentScrollY) * alpha

  const deltaY = targetY - prevY
  const instantSpeed = Math.min(Math.abs(deltaY) / 180, 1)
  const instantSigned = Math.max(Math.min(deltaY / 180, 1), -1)
  const velAlpha = 1 - Math.pow(1 - 0.16, dt * 60)
  smoothedSpeed += (instantSpeed - smoothedSpeed) * velAlpha
  smoothedSignedVel += (instantSigned - smoothedSignedVel) * velAlpha

  if (smoothedSpeed < 0.001) smoothedSpeed = 0
  if (Math.abs(smoothedSignedVel) < 0.001) smoothedSignedVel = 0

  const vh = Math.max(window.innerHeight, 1)
  const root = document.documentElement
  const maxScroll = Math.max(root.scrollHeight - vh, 1)
  const globalProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1)
  const heroProgress = Math.min(Math.max(currentScrollY / vh, 0), 1.3)
  const heroOpacity = Math.max(0, Math.min(1, 1 - heroProgress * 1.15))

  root.style.setProperty('--scroll-progress', globalProgress.toFixed(4))
  root.style.setProperty('--scroll-velocity', smoothedSpeed.toFixed(4))
  root.style.setProperty('--hero-progress', heroProgress.toFixed(4))
  root.style.setProperty('--hero-opacity', heroOpacity.toFixed(4))

  const lagOffset = targetY - currentScrollY
  const viewportCenter = vh * 0.5
  const pageScrollable = root.scrollHeight > vh + 48

  // Smoothly decay wheel impulse back toward 0
  wheelImpulseP *= Math.pow(0.86, dt * 60)
  if (Math.abs(wheelImpulseP) < 0.002) wheelImpulseP = 0

  registeredNodes.forEach((entry) => {
    let targetP = wheelImpulseP

    if (pageScrollable) {
      const rect = entry.el.getBoundingClientRect()
      const dampedTop = rect.top + lagOffset
      const sectionCenter = dampedTop + rect.height * 0.5
      const normalizer = Math.max(vh * 0.78, Math.min(rect.height * 0.65, vh * 1.1))

      targetP = Math.max(
        Math.min((viewportCenter - sectionCenter) / normalizer + wheelImpulseP * 0.5, 1.25),
        -1.25
      )
    }

    if (!entry.initialized) {
      entry.currentP = targetP
      entry.initialized = true
    } else {
      entry.currentP += (targetP - entry.currentP) * alpha
    }

    const p = entry.currentP
    const ap = Math.min(Math.abs(p), 1)
    const vis = Math.max(0.45, 1 - ap * 0.45)

    entry.el.style.setProperty('--p', p.toFixed(4))
    entry.el.style.setProperty('--ap', ap.toFixed(4))
    entry.el.style.setProperty('--vis', vis.toFixed(4))
    entry.el.style.setProperty('--vel', smoothedSignedVel.toFixed(4))
    entry.el.style.setProperty('--speed', smoothedSpeed.toFixed(4))
    entry.el.style.setProperty('--section-progress', p.toFixed(4))
    entry.el.style.setProperty('--section-abs-progress', ap.toFixed(4))
  })
}

let passiveScrollRegistered = false
function handlePassiveScroll() {
  if (!motionEnabled) {
    resetMotionVars()
  }
}

function startEngine() {
  if (typeof window === 'undefined') return
  syncHtmlMotionAttribute()

  if (!passiveScrollRegistered) {
    window.addEventListener('scroll', handlePassiveScroll, { passive: true })
    passiveScrollRegistered = true
  }

  if (!motionEnabled) {
    resetMotionVars()
    return
  }

  if (rafId === null) {
    currentScrollY = getScrollTop()
    lastFrameTime = performance.now()
    rafId = requestAnimationFrame(tick)
  }
}

function stopEngineIfIdle() {
  if (registeredNodes.size === 0 && rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

/**
 * Attach to any section to receive live 60fps bi-directional scroll variables:
 * `--p` (-1.2..+1.2), `--ap` (0..1), `--vis` (0.28..1), `--vel` (-1..+1), `--speed` (0..1)
 */
export function useScrollMotion<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    registeredNodes.set(el, {
      el,
      currentP: 0,
      initialized: false,
    })

    startEngine()

    return () => {
      registeredNodes.delete(el)
      stopEngineIfIdle()
    }
  }, [])

  return ref
}

/**
 * React hook for the Navbar FX ON/OFF motion toggle.
 */
export function useMotionToggle() {
  const [enabled, setEnabled] = useState<boolean>(motionEnabled)

  useEffect(() => {
    const sync = () => setEnabled(motionEnabled)
    motionListeners.add(sync)
    syncHtmlMotionAttribute()
    return () => {
      motionListeners.delete(sync)
    }
  }, [])

  return {
    motionEnabled: enabled,
    toggleMotion: () => setMotionEnabled(!motionEnabled),
  }
}
