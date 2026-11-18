import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { STATION_PROFILES, StationOrbitalProfile } from './stations'
import { createPlanetObject } from './PlanetMesh'
import { ArrowLeft, Play, RotateCcw, Volume2, VolumeX, Zap } from 'lucide-react'
import { useAudioDrone } from '../hooks/useAudioDrone'

export default function DevPlanetPreview() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedStation, setSelectedStation] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const { isAudioEnabled, toggleAudio } = useAudioDrone()

  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const currentPlanetRef = useRef<ReturnType<typeof createPlanetObject> | null>(null)
  const nextPlanetRef = useRef<ReturnType<typeof createPlanetObject> | null>(null)

  const activeProfile: StationOrbitalProfile = STATION_PROFILES[selectedStation]

  // Initialize WebGL Scene
  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, activeProfile.cameraZ)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x020307, 1)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 1. Sparse Stardust Background Field (750 points)
    const starCount = 750
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 26
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 22
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    // 2. Pre-warm / Compile initial planet
    const initialPlanet = createPlanetObject(activeProfile)
    initialPlanet.group.position.copy(activeProfile.position)
    initialPlanet.group.scale.setScalar(activeProfile.scale)
    scene.add(initialPlanet.group)
    currentPlanetRef.current = initialPlanet

    // Pre-warm renderer pipeline
    renderer.compile(scene, camera)

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let rafId: number
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      starField.rotation.y = elapsedTime * 0.003

      if (currentPlanetRef.current) {
        currentPlanetRef.current.mesh.rotation.y = elapsedTime * activeProfile.rotationSpeed
        currentPlanetRef.current.uniforms.uTime.value = elapsedTime

        if (currentPlanetRef.current.satelliteMesh && activeProfile.satellite) {
          const s = activeProfile.satellite
          const angle = elapsedTime * s.speed
          currentPlanetRef.current.satelliteMesh.position.x = Math.cos(angle) * s.orbitRadius
          currentPlanetRef.current.satelliteMesh.position.z = Math.sin(angle) * s.orbitRadius
          currentPlanetRef.current.satelliteMesh.position.y = Math.sin(angle * 1.5) * s.tilt
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      starGeo.dispose()
      starMat.dispose()
      if (currentPlanetRef.current) currentPlanetRef.current.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  // Switch planet when selectedStation changes
  const handleSelectStation = (newIndex: number) => {
    if (newIndex === selectedStation || isTransitioning) return
    setIsTransitioning(true)

    const nextProfile = STATION_PROFILES[newIndex]
    const scene = sceneRef.current
    const camera = cameraRef.current
    if (!scene || !camera) return

    // Create incoming planet
    const incoming = createPlanetObject(nextProfile)
    incoming.group.position.copy(nextProfile.position)
    incoming.group.scale.setScalar(nextProfile.scale)
    scene.add(incoming.group)

    // Pre-warm incoming planet shader
    if (rendererRef.current) {
      rendererRef.current.compile(scene, camera)
    }

    // Smooth camera dolly & crossfade transition
    const outgoing = currentPlanetRef.current
    const startTime = performance.now()
    const duration = 1200 // 1.2s transition

    const transitionLoop = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1.0)
      const ease = 1 - Math.pow(1 - progress, 3) // easeOutCubic

      // Camera dolly
      camera.position.z = THREE.MathUtils.lerp(activeProfile.cameraZ, nextProfile.cameraZ, ease)

      // Outgoing fades out
      if (outgoing) {
        outgoing.material.opacity = 1.0 - ease
        if (outgoing.ringMesh) {
          ;(outgoing.ringMesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
            (activeProfile.ring?.opacity ?? 0) * (1.0 - ease)
        }
      }

      // Incoming fades in
      incoming.material.opacity = ease
      if (incoming.ringMesh) {
        ;(incoming.ringMesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
          (nextProfile.ring?.opacity ?? 0) * ease
      }

      if (progress < 1.0) {
        requestAnimationFrame(transitionLoop)
      } else {
        if (outgoing) {
          scene.remove(outgoing.group)
          outgoing.dispose()
        }
        currentPlanetRef.current = incoming
        setSelectedStation(newIndex)
        setIsTransitioning(false)
      }
    }

    requestAnimationFrame(transitionLoop)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020307] text-[#F8FAFC]">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Top Telemetry Header */}
      <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between border-b border-white/[0.08] bg-[#020307]/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="tactile-btn flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-zinc-300 hover:border-white/30 hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO MISSION CONTROL</span>
          </a>
          <span className="text-zinc-600 font-mono text-xs">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
            DEV PLANET SHADER TESTBENCH
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleAudio}
            className="tactile-btn flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-zinc-300 hover:text-white"
          >
            {isAudioEnabled ? (
              <>
                <Volume2 size={14} className="text-[#38BDF8]" />
                <span>SOUND: ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} className="text-zinc-500" />
                <span>SOUND: OFF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Floating Station Selector Dock (Bottom) */}
      <div className="absolute bottom-8 inset-x-0 z-20 mx-auto flex w-fit max-w-[95vw] flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/[0.1] bg-[#070b14]/90 p-2 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        {STATION_PROFILES.map((station, idx) => {
          const isActive = selectedStation === idx
          return (
            <button
              key={station.id}
              type="button"
              disabled={isTransitioning}
              onClick={() => handleSelectStation(idx)}
              className={`tactile-btn flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs transition-all ${
                isActive
                  ? 'border border-white/30 bg-white/10 text-white font-bold shadow-lg'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
              }`}
              style={{
                borderColor: isActive ? station.palette.accent : undefined,
                color: isActive ? station.palette.accent : undefined,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: station.palette.accent }}
              />
              <span>{station.planetName}</span>
            </button>
          )
        })}
      </div>

      {/* Side Telemetry HUD (Left) */}
      <aside className="absolute left-6 top-24 z-20 hidden w-72 rounded-2xl border border-white/[0.08] bg-[#070b14]/75 p-5 font-mono text-xs text-zinc-300 backdrop-blur-xl lg:block">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <span className="text-[#38BDF8] font-bold">ORBITAL PROFILE</span>
          <span className="text-zinc-500">{activeProfile.callsign}</span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <span className="text-zinc-500 text-[10px] block">CELESTIAL BODY</span>
            <span className="text-white font-bold text-sm">{activeProfile.planetName}</span>
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] block">GLSL SHADER ROUTINE</span>
            <span className="text-[#38BDF8]">{activeProfile.shaderKey}.glsl</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
            <div>
              <span className="text-zinc-500 text-[10px] block">SCALE</span>
              <span className="text-white">{activeProfile.scale.toFixed(2)}x</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">CAMERA DIST</span>
              <span className="text-white">{activeProfile.cameraZ.toFixed(1)} Z</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
            <div>
              <span className="text-zinc-500 text-[10px] block">FRESNEL POWER</span>
              <span className="text-white">{activeProfile.atmosphere.fresnelPower.toFixed(1)}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">RING SYSTEM</span>
              <span className={activeProfile.ring ? 'text-amber-400' : 'text-zinc-600'}>
                {activeProfile.ring ? 'ACTIVE' : 'NONE'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <button
            type="button"
            disabled={isTransitioning}
            onClick={() => handleSelectStation((selectedStation + 1) % STATION_PROFILES.length)}
            className="tactile-btn flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 font-mono text-xs font-bold text-black hover:bg-zinc-200"
          >
            <Play size={13} />
            <span>TEST NEXT ORBIT WARP</span>
          </button>
        </div>
      </aside>
    </div>
  )
}
