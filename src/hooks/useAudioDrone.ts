import { useEffect, useRef, useState, useCallback } from 'react'
import { stationStore } from '../store/stationStore'

const AUDIO_STORAGE_KEY = 'duy_orbital_audio_enabled'

/**
 * Web Audio API synthesized ambient cockpit drone and station transition blip.
 * Zero external audio files. Default: OFF.
 */
export function useAudioDrone() {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
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
      // Audio cleanup error safeguard
    }
  }, [])

  const startAudio = useCallback(() => {
    if (typeof window === 'undefined') return
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      const ctx = new AudioContextClass()
      ctxRef.current = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime) // Extremely soft cockpit drone
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Sub-bass drone oscillator (55Hz / A1)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(55, ctx.currentTime)

      // Ambient harmonic oscillator (110Hz / A2) with low-pass filter
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(180, ctx.currentTime)

      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(110, ctx.currentTime)

      osc1.connect(masterGain)
      osc2.connect(filter)
      filter.connect(masterGain)

      osc1.start()
      osc2.start()

      osc1Ref.current = osc1
      osc2Ref.current = osc2
    } catch {
      // AudioContext policy safeguard
    }
  }, [])

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
      blipOsc.frequency.setValueAtTime(880, ctx.currentTime)
      blipOsc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.08)

      blipGain.gain.setValueAtTime(0.03, ctx.currentTime)
      blipGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

      blipOsc.connect(blipGain)
      blipGain.connect(ctx.destination)

      blipOsc.start(ctx.currentTime)
      blipOsc.stop(ctx.currentTime + 0.08)
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
        // localStorage safeguard
      }
      if (next) {
        startAudio()
      } else {
        stopAudio()
      }
      return next
    })
  }, [startAudio, stopAudio])

  // Play blip on station change
  useEffect(() => {
    const unsubscribe = stationStore.subscribe(() => {
      playBlip()
    })
    return () => unsubscribe()
  }, [playBlip])

  useEffect(() => {
    if (isEnabled) {
      startAudio()
    }
    return () => stopAudio()
  }, [isEnabled, startAudio, stopAudio])

  return {
    isAudioEnabled: isEnabled,
    toggleAudio,
  }
}
