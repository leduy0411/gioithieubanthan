import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { STATION_PROFILES, StationOrbitalProfile } from './stations'
import { createPlanetObject } from './PlanetMesh'
import { ArrowLeft, Play, Volume2, VolumeX } from 'lucide-react'
import { useAudioDrone } from '../hooks/useAudioDrone'

export default function DevPlanetPreview() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedStation, setSelectedStation] = useState<number>(0)
  const selectedStationRef = useRef<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const { isAudioEnabled, toggleAudio } = useAudioDrone()

  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const currentPlanetRef = useRef<ReturnType<typeof createPlanetObject> | null>(null)
  const incomingPlanetRef = useRef<ReturnType<typeof createPlanetObject> | null>(null)

  const activeProfile: StationOrbitalProfile = STATION_PROFILES[selectedStation]

  // Initialize WebGL Scene
  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const initProfile = STATION_PROFILES[selectedStationRef.current]
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, initProfile.cameraZ)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.outputColorSpace = THREE.SRGBColorSpace
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
    const initialPlanet = createPlanetObject(initProfile)
    initialPlanet.group.position.copy(initProfile.position)
    initialPlanet.group.scale.setScalar(initProfile.scale)
    scene.add(initialPlanet.group)
    currentPlanetRef.current = initialPlanet

    renderer.compile(scene, camera)

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    let rafId: number
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      const liveProfile = STATION_PROFILES[selectedStationRef.current]

      starField.rotation.y = elapsedTime * 0.003

      if (currentPlanetRef.current) {
        currentPlanetRef.current.mesh.rotation.y = elapsedTime * liveProfile.rotationSpeed
        currentPlanetRef.current.uniforms.uTime.value = elapsedTime

        if (currentPlanetRef.current.satelliteMesh && liveProfile.satellite) {
          const s = liveProfile.satellite
          const angle = elapsedTime * s.speed
          currentPlanetRef.current.satelliteMesh.position.x = Math.cos(angle) * s.orbitRadius
          currentPlanetRef.current.satelliteMesh.position.z =
            Math.sin(angle) * (s.orbitRadius * 0.68)
          currentPlanetRef.current.satelliteMesh.position.y = Math.sin(angle * 1.2) * s.tilt
        }
      }

      if (incomingPlanetRef.current) {
        incomingPlanetRef.current.uniforms.uTime.value = elapsedTime
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      starGeo.dispose()
      starMat.dispose()
      if (currentPlanetRef.current) {
        currentPlanetRef.current.dispose()
        currentPlanetRef.current = null
      }
      if (incomingPlanetRef.current) {
        incomingPlanetRef.current.dispose()
        incomingPlanetRef.current = null
      }
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

    const prevProfile = STATION_PROFILES[selectedStationRef.current]
    const nextProfile = STATION_PROFILES[newIndex]
    const scene = sceneRef.current
    const camera = cameraRef.current
    if (!scene || !camera) return

    const incoming = createPlanetObject(nextProfile)
    incoming.group.position.copy(nextProfile.position)
    incoming.group.scale.setScalar(nextProfile.scale)
    incoming.setOpacity(0, 0.85)
    scene.add(incoming.group)
    incomingPlanetRef.current = incoming

    if (rendererRef.current) {
      rendererRef.current.compile(scene, camera)
    }

    const outgoing = currentPlanetRef.current
    const startTime = performance.now()
    const duration = 1200

    const transitionLoop = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1.0)
      const ease = 1 - Math.pow(1 - progress, 3)

      camera.position.z = THREE.MathUtils.lerp(prevProfile.cameraZ, nextProfile.cameraZ, ease)

      if (outgoing) {
        outgoing.setOpacity(1.0 - ease, 1.0 - ease * 0.25)
      }

      incoming.setOpacity(ease, 0.85 + ease * 0.15)

      if (progress < 1.0) {
        requestAnimationFrame(transitionLoop)
      } else {
        if (outgoing) {
          scene.remove(outgoing.group)
          outgoing.dispose()
        }
        currentPlanetRef.current = incoming
        incomingPlanetRef.current = null
        selectedStationRef.current = newIndex
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
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/[0.08] bg-[#020307]/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="tactile-btn flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-zinc-300 hover:border-white/30 hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO MISSION CONTROL</span>
          </a>
          <span className="font-mono text-xs text-zinc-600">/</span>
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
      <div className="absolute inset-x-0 bottom-8 z-20 mx-auto flex w-fit max-w-[95vw] flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/[0.1] bg-[#070b14]/90 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
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
                  ? 'border border-white/30 bg-white/10 font-bold text-white shadow-lg'
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
          <span className="font-bold text-[#38BDF8]">ORBITAL PROFILE</span>
          <span className="text-zinc-500">{activeProfile.callsign}</span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <span className="block text-[10px] text-zinc-500">CELESTIAL BODY</span>
            <span className="text-sm font-bold text-white">{activeProfile.planetName}</span>
          </div>
          <div>
            <span className="block text-[10px] text-zinc-500">GLSL SHADER ROUTINE</span>
            <span className="text-[#38BDF8]">{activeProfile.shaderKey}.glsl</span>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-2">
            <div>
              <span className="block text-[10px] text-zinc-500">SCALE</span>
              <span className="text-white">{activeProfile.scale.toFixed(2)}x</span>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-500">CAMERA DIST</span>
              <span className="text-white">{activeProfile.cameraZ.toFixed(1)} Z</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-2">
            <div>
              <span className="block text-[10px] text-zinc-500">FRESNEL POWER</span>
              <span className="text-white">{activeProfile.atmosphere.fresnelPower.toFixed(1)}</span>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-500">RING SYSTEM</span>
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
