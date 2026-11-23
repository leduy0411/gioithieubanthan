import { useEffect, useState, useCallback } from 'react'
import { stationStore } from '../store/stationStore'

const AUDIO_STORAGE_KEY = 'duy_orbital_audio_enabled'

// Module-level shared Web Audio state so Navbar, CommandPalette, and MechanicalGearCore
// stay 100% synchronized with zero duplicate AudioContexts.
let activeAudioCtx: AudioContext | null = null
let activeLowpassFilter: BiquadFilterNode | null = null
let activeMasterGain: GainNode | null = null
let activeOsc1: OscillatorNode | null = null
let activeOsc2: OscillatorNode | null = null
let globalAudioEnabled = false
const audioListeners = new Set<() => void>()

function notifyAudioListeners() {
  audioListeners.forEach((fn) => fn())
}

export function setAudioFlightVelocity(normalizedVelocity: number) {
  if (!activeAudioCtx || !activeLowpassFilter || !activeMasterGain) return
  if (activeAudioCtx.state !== 'running') return

  try {
    const v = Math.min(Math.max(normalizedVelocity, 0), 1)
    const now = activeAudioCtx.currentTime
    const targetCutoff = 160 + v * 220
    activeLowpassFilter.frequency.setTargetAtTime(targetCutoff, now, 0.06)

    const targetGain = 0.026 + v * 0.014
    activeMasterGain.gain.setTargetAtTime(targetGain, now, 0.08)

    if (activeOsc2) {
      activeOsc2.frequency.setTargetAtTime(110 + v * 12, now, 0.08)
    }
  } catch {
    // Safeguard against Web Audio state edge cases
  }
}

/**
 * Ultra-subtle synthesized metallic clockwork "tick" micro-SFX on card hover engage.
 * Strictly silent unless the user has explicitly unmuted Web Audio.
 */
export function playMechanicalTick() {
  if (!globalAudioEnabled || !activeAudioCtx || activeAudioCtx.state !== 'running') return

  try {
    const ctx = activeAudioCtx
    const now = ctx.currentTime

    const bufferSize = Math.floor(ctx.sampleRate * 0.022)
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22))
    }

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(3400, now)
    filter.Q.setValueAtTime(5.5, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.032, now)
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.024)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start(now)
    noise.stop(now + 0.025)
  } catch {
    // Ignore transient Web Audio scheduling errors
  }
}

/**
 * Crisp 2-stage mechanical ratchet lock + golden harmonic ping on card click / flip unlock.
 * Strictly silent unless the user has explicitly unmuted Web Audio.
 */
export function playMechanicalUnlock() {
  if (!globalAudioEnabled || !activeAudioCtx || activeAudioCtx.state !== 'running') return

  try {
    const ctx = activeAudioCtx
    const now = ctx.currentTime

    ;[0, 0.055].forEach((offset, idx) => {
      const t = now + offset
      const osc = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(idx === 0 ? 1850 : 2620, t)
      osc.frequency.exponentialRampToValueAtTime(idx === 0 ? 780 : 1240, t + 0.038)

      filter.type = 'highpass'
      filter.frequency.setValueAtTime(950, t)

      gain.gain.setValueAtTime(idx === 0 ? 0.028 : 0.034, t)
      gain.gain.exponentialRampToValueAtTime(0.0006, t + 0.045)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(t)
      osc.stop(t + 0.048)
    })

    const chime = ctx.createOscillator()
    const chimeGain = ctx.createGain()
    chime.type = 'sine'
    chime.frequency.setValueAtTime(1174.66, now + 0.05)
    chime.frequency.exponentialRampToValueAtTime(1760, now + 0.19)
    chimeGain.gain.setValueAtTime(0.014, now + 0.05)
    chimeGain.gain.exponentialRampToValueAtTime(0.0004, now + 0.21)

    chime.connect(chimeGain)
    chimeGain.connect(ctx.destination)
    chime.start(now + 0.05)
    chime.stop(now + 0.22)
  } catch {
    // Ignore transient Web Audio scheduling errors
  }
}

function stopGlobalAudio() {
  try {
    activeLowpassFilter = null
    activeMasterGain = null
    if (activeOsc1) {
      activeOsc1.stop()
      activeOsc1.disconnect()
      activeOsc1 = null
    }
    if (activeOsc2) {
      activeOsc2.stop()
      activeOsc2.disconnect()
      activeOsc2 = null
    }
    if (activeAudioCtx && activeAudioCtx.state !== 'closed') {
      activeAudioCtx.close()
      activeAudioCtx = null
    }
  } catch {
    // Safe cleanup ignore
  }
}

function startGlobalAudio() {
  if (typeof window === 'undefined') return
  try {
    stopGlobalAudio()
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    activeAudioCtx = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.024, ctx.currentTime)
    masterGain.connect(ctx.destination)
    activeMasterGain = masterGain

    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(55, ctx.currentTime)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(160, ctx.currentTime)
    filter.Q.setValueAtTime(1.2, ctx.currentTime)
    activeLowpassFilter = filter

    const osc2 = ctx.createOscillator()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(110, ctx.currentTime)

    osc1.connect(masterGain)
    osc2.connect(filter)
    filter.connect(masterGain)

    osc1.start()
    osc2.start()

    activeOsc1 = osc1
    activeOsc2 = osc2
  } catch {
    // Browser autoplay policy safeguard
  }
}

function playGlobalBlip() {
  if (!globalAudioEnabled || !activeAudioCtx) return
  try {
    const ctx = activeAudioCtx
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    const blipOsc = ctx.createOscillator()
    const blipGain = ctx.createGain()

    blipOsc.type = 'sine'
    blipOsc.frequency.setValueAtTime(660, ctx.currentTime)
    blipOsc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.075)

    blipGain.gain.setValueAtTime(0.024, ctx.currentTime)
    blipGain.gain.exponentialRampToValueAtTime(0.0008, ctx.currentTime + 0.075)

    blipOsc.connect(blipGain)
    blipGain.connect(ctx.destination)

    blipOsc.start(ctx.currentTime)
    blipOsc.stop(ctx.currentTime + 0.075)
  } catch {
    // Ignore blip errors
  }
}

let stationSubscriptionRegistered = false
function ensureStationSubscription() {
  if (stationSubscriptionRegistered) return
  stationSubscriptionRegistered = true
  stationStore.subscribe(() => {
    playGlobalBlip()
  })
}

export function toggleGlobalAudio() {
  ensureStationSubscription()
  globalAudioEnabled = !globalAudioEnabled
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, String(globalAudioEnabled))
  } catch {
    // ignore storage errors
  }

  if (globalAudioEnabled) {
    startGlobalAudio()
    playMechanicalUnlock()
  } else {
    stopGlobalAudio()
  }
  notifyAudioListeners()
}

export function useAudioDrone() {
  const [isEnabled, setIsEnabled] = useState<boolean>(globalAudioEnabled)

  useEffect(() => {
    ensureStationSubscription()
    const sync = () => setIsEnabled(globalAudioEnabled)
    audioListeners.add(sync)
    return () => {
      audioListeners.delete(sync)
    }
  }, [])

  const toggleAudio = useCallback(() => {
    toggleGlobalAudio()
  }, [])

  return {
    isEnabled,
    isAudioEnabled: isEnabled,
    toggleAudio,
  }
}
