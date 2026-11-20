import { useEffect, useRef, useState, useCallback } from 'react'
import { stationStore } from '../store/stationStore'

const AUDIO_STORAGE_KEY = 'duy_orbital_audio_enabled'

// Module-level references so the 60fps WebGL loop can modulate the BiquadFilter
// with zero React re-renders or garbage collection overhead.
let activeAudioCtx: AudioContext | null = null
let activeLowpassFilter: BiquadFilterNode | null = null
let activeMasterGain: GainNode | null = null
let activeOsc2: OscillatorNode | null = null

/**
 * Velocity-reactive audio modulator called from CosmicScene's requestAnimationFrame loop.
 * Gently sweeps the BiquadFilter cutoff frequency (160Hz -> 380Hz) and subtle pitch/gain
 * proportionally to normalized spacecraft scroll velocity (0..1).
 */
export function setAudioFlightVelocity(normalizedVelocity: number) {
  if (!activeAudioCtx || !activeLowpassFilter || !activeMasterGain) return
  if (activeAudioCtx.state !== 'running') return

  try {
    const v = Math.min(Math.max(normalizedVelocity, 0), 1)
    const now = activeAudioCtx.currentTime
    // Smoothly sweep low-pass filter upward as spacecraft accelerates between stations
    const targetCutoff = 160 + v * 220
    activeLowpassFilter.frequency.setTargetAtTime(targetCutoff, now, 0.06)

    // Subtle harmonic swell during high-speed warp
    const targetGain = 0.028 + v * 0.014
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
 * Strictly silent unless the user has explicitly unmuted Web Audio (`activeAudioCtx` running).
 */
export function playMechanicalTick() {
  if (!activeAudioCtx || activeAudioCtx.state !== 'running') return

  try {
    const ctx = activeAudioCtx
    const now = ctx.currentTime

    // Crisp filtered metallic impulse (high-Q bandpass click)
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
 * Strictly silent unless the user has explicitly unmuted Web Audio (`activeAudioCtx` running).
 */
export function playMechanicalUnlock() {
  if (!activeAudioCtx || activeAudioCtx.state !== 'running') return

  try {
    const ctx = activeAudioCtx
    const now = ctx.currentTime

    // Stage 1 & 2: Twin rapid ratchet clicks (0ms and +55ms)
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

    // Subtle crystalline resonance tail
    const chime = ctx.createOscillator()
    const chimeGain = ctx.createGain()
    chime.type = 'sine'
    chime.frequency.setValueAtTime(1174.66, now + 0.05) // D6
    chime.frequency.exponentialRampToValueAtTime(1760, now + 0.19) // A6
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

/**
 * Web Audio API synthesized ambient cockpit drone and station transition blip.
 * - Zero external mp3 files.
 * - Default: OFF. Never autoplays without explicit user interaction.
 * - Remembers preference in localStorage wrapped in try/catch.
 */
export function useAudioDrone() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [savedPreference] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUDIO_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)

  const stopAudio = useCallback(() => {
    try {
      activeLowpassFilter = null
      activeMasterGain = null
      activeOsc2 = null
      activeAudioCtx = null

      if (osc1Ref.current) {
        osc1Ref.current.stop()
        osc1Ref.current.disconnect()
        osc1Ref.current = null
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop()
        osc2Ref.current.disconnect()
        osc2Ref.current = null
      }
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close()
        ctxRef.current = null
      }
    } catch {
      // Safe cleanup ignore
    }
  }, [])

  const startAudio = useCallback(() => {
    if (typeof window === 'undefined') return
    try {
      stopAudio()
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      const ctx = new AudioContextClass()
      ctxRef.current = ctx
      activeAudioCtx = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.028, ctx.currentTime) // Very soft ambient drone
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain
      activeMasterGain = masterGain

      // Sub-bass drone oscillator (55Hz / A1)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(55, ctx.currentTime)

      // Ambient harmonic oscillator (110Hz / A2) with velocity-modulated low-pass filter
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(160, ctx.currentTime)
      filter.Q.setValueAtTime(1.2, ctx.currentTime)
      activeLowpassFilter = filter

      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(110, ctx.currentTime)
      activeOsc2 = osc2

      osc1.connect(masterGain)
      osc2.connect(filter)
      filter.connect(masterGain)

      osc1.start()
      osc2.start()

      osc1Ref.current = osc1
      osc2Ref.current = osc2
    } catch {
      // Browser autoplay policy safeguard
    }
  }, [stopAudio])

  const playBlip = useCallback(() => {
    if (!isEnabled || !ctxRef.current) return
    try {
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }
      const blipOsc = ctx.createOscillator()
      const blipGain = ctx.createGain()

      blipOsc.type = 'sine'
      blipOsc.frequency.setValueAtTime(660, ctx.currentTime)
      blipOsc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.075)

      blipGain.gain.setValueAtTime(0.025, ctx.currentTime)
      blipGain.gain.exponentialRampToValueAtTime(0.0008, ctx.currentTime + 0.075)

      blipOsc.connect(blipGain)
      blipGain.connect(ctx.destination)

      blipOsc.start(ctx.currentTime)
      blipOsc.stop(ctx.currentTime + 0.075)
    } catch {
      // Ignore blip errors
    }
  }, [isEnabled])

  const toggleAudio = useCallback(() => {
    setIsEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem(AUDIO_STORAGE_KEY, String(next))
      } catch {
        // localStorage write safeguard
      }
      if (next) {
        startAudio()
      } else {
        stopAudio()
      }
      return next
    })
  }, [startAudio, stopAudio])

  // Play soft blip when station changes while audio is enabled
  useEffect(() => {
    const unsubscribe = stationStore.subscribe(() => {
      playBlip()
    })
    return () => unsubscribe()
  }, [playBlip])

  useEffect(() => {
    return () => stopAudio()
  }, [stopAudio])

  return {
    isEnabled,
    isAudioEnabled: isEnabled,
    savedPreference,
    toggleAudio,
  }
}
