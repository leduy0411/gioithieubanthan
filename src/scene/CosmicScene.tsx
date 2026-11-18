import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { STATION_PROFILES, StationOrbitalProfile } from './stations'
import { createPlanetObject } from './PlanetMesh'
import { stationStore, StationIndex } from '../store/stationStore'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * CosmicScene — Master 3D Celestial Engine (Minimalist Deep-Space Odyssey)
 *
 * Implements Phase 2b:
 * - Two-planet transition coordinator (~1.4s) with easeOutCubic
 * - Forward & Backward orbital trajectories
 * - Stardust with 600ms Warp Streak dynamic velocity
 * - Rare shooting stars (desktop only, 8-15s interval)
 * - Deep background procedural nebula
 * - Camera FOV dolly (45° -> 49° -> 45°) during warp
 * - CSS --accent smooth interpolation
 * - Race-condition guard: never more than 2 planets in memory
 * - Reduced-motion compliant (300ms stationary crossfade)
 * - High-performance GPU lifecycle management with visibilitychange pause
 */

interface PlanetInstance {
  profile: StationOrbitalProfile
  obj: ReturnType<typeof createPlanetObject>
  initialPos: THREE.Vector3
  initialScale: number
  startTime: number
  duration: number
  isIncoming: boolean
  isForward: boolean
}

// Subtle Nebula GLSL Shader
const NEBULA_VERTEX = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const NEBULA_FRAGMENT = /* glsl */`
precision highp float;
uniform vec3 uColor;
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
             mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  v += 0.5 * noise(p); p *= 2.02;
  v += 0.25 * noise(p); p *= 2.03;
  v += 0.125 * noise(p);
  return v;
}

void main() {
  vec2 uv = vUv - 0.5;
  float d = length(uv);
  float n = fbm(uv * 2.5 + vec2(uTime * 0.015));
  float alpha = smoothstep(0.65, 0.1, d) * n * 0.14;
  gl_FragColor = vec4(uColor, alpha);
}
`

export default function CosmicScene({ currentSection = 0 }: { currentSection?: number }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const activeSectionRef = useRef<number>(currentSection)

  useEffect(() => {
    activeSectionRef.current = currentSection
  }, [currentSection])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const isMobile = window.innerWidth < 1024
    const isLowPower = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 4) <= 4

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, STATION_PROFILES[0].cameraZ)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isLowPower,
        powerPreference: 'high-performance',
      })
    } catch {
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x020307, 1)
    container.appendChild(renderer.domElement)

    // 2. Pre-warmed Planet Instances (Max 2)
    let currentPlanet: PlanetInstance | null = null
    let outgoingPlanet: PlanetInstance | null = null

    const initialProfile = STATION_PROFILES[Math.min(Math.max(activeSectionRef.current, 0), 4)]
    const initObj = createPlanetObject(initialProfile)
    initObj.group.position.copy(initialProfile.position)
    initObj.group.scale.setScalar(initialProfile.scale)
    scene.add(initObj.group)

    currentPlanet = {
      profile: initialProfile,
      obj: initObj,
      initialPos: initialProfile.position.clone(),
      initialScale: initialProfile.scale,
      startTime: 0,
      duration: 0,
      isIncoming: false,
      isForward: true,
    }

    // 3. Stardust Particle System & Warp Streak Lines
    const starCount = isMobile ? 260 : 700
    const starPositions = new Float32Array(starCount * 3)
    const starVelocities = new Float32Array(starCount)
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 24
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
      starVelocities[i] = 0.5 + Math.random() * 1.5
    }

    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 0.04 : 0.035,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    })
    const starPoints = new THREE.Points(starGeo, starMat)
    scene.add(starPoints)

    // 4. Subtle Distant Nebula Layer (Desktop / Higher Tier)
    let nebulaMesh: THREE.Mesh | null = null
    let nebulaUniforms: { uColor: { value: THREE.Color }; uTime: { value: number } } | null = null
    if (!isLowPower && !isMobile) {
      const nebGeo = new THREE.PlaneGeometry(28, 22)
      nebulaUniforms = {
        uColor: { value: new THREE.Color(initialProfile.palette.accent) },
        uTime: { value: 0 },
      }
      const nebMat = new THREE.ShaderMaterial({
        vertexShader: NEBULA_VERTEX,
        fragmentShader: NEBULA_FRAGMENT,
        uniforms: nebulaUniforms,
        transparent: true,
        depthWrite: false,
      })
      nebulaMesh = new THREE.Mesh(nebGeo, nebMat)
      nebulaMesh.position.set(0, 0, -8.0)
      scene.add(nebulaMesh)
    }

    // 5. Rare Shooting Star (Meteor) System
    let shootingStarMesh: THREE.Line | null = null
    let shootingStarActive = false
    let shootingStarProgress = 0
    let lastMeteorTime = 0

    if (!isMobile && !isLowPower) {
      const meteorGeo = new THREE.BufferGeometry()
      const pts = new Float32Array([0, 0, 0, -1.8, 0.9, -0.6])
      meteorGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3))
      const meteorMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      })
      shootingStarMesh = new THREE.Line(meteorGeo, meteorMat)
      scene.add(shootingStarMesh)
    }

    // Pre-compile initial scene to guarantee zero shader hitching
    renderer.compile(scene, camera)

    // Warp & Transition Variables
    let isWarping = false
    let warpStartTime = 0
    let warpDuration = 1400 // 1.4s standard
    let targetCameraZ = initialProfile.cameraZ
    let baseFov = 45

    // Damped Mouse Parallax Tracking
    const mouse = new THREE.Vector2(0, 0)
    const mouseTarget = new THREE.Vector2(0, 0)
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Visibility Safeguard
    let isTabVisible = true
    const handleVisibility = () => {
      isTabVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // ─────────────────────────────────────────────────────────────
    // TWO-PLANET ORBITAL TRANSITION COORDINATOR
    // ─────────────────────────────────────────────────────────────
    let lastHandledStation = initialProfile.id

    const triggerStationTransition = (nextIdx: number, forward: boolean) => {
      if (nextIdx === lastHandledStation) return

      const nextProfile = STATION_PROFILES[nextIdx]
      lastHandledStation = nextIdx
      targetCameraZ = nextProfile.cameraZ

      const now = performance.now()
      isWarping = true
      warpStartTime = now
      warpDuration = prefersReducedMotion ? 300 : isMobile ? 950 : 1400

      // Update station store & CSS variable
      stationStore.setStation(nextIdx)

      // If an outgoing planet is already uncompleted, dispose it immediately
      if (outgoingPlanet) {
        scene.remove(outgoingPlanet.obj.group)
        outgoingPlanet.obj.dispose()
        outgoingPlanet = null
      }

      // Current planet becomes outgoing
      if (currentPlanet) {
        outgoingPlanet = {
          ...currentPlanet,
          startTime: now,
          duration: warpDuration,
          isIncoming: false,
          isForward: forward,
        }
      }

      // Create new incoming planet
      const incomingObj = createPlanetObject(nextProfile)
      scene.add(incomingObj.group)

      // Pre-warm incoming planet shader
      renderer.compile(scene, camera)

      currentPlanet = {
        profile: nextProfile,
        obj: incomingObj,
        initialPos: nextProfile.position.clone(),
        initialScale: nextProfile.scale,
        startTime: now,
        duration: warpDuration,
        isIncoming: true,
        isForward: forward,
      }

      // Update nebula color
      if (nebulaUniforms) {
        nebulaUniforms.uColor.value.set(nextProfile.palette.accent)
      }
    }

    // Subscribe to store updates (triggered either by scroll or navbar click)
    const unsubscribeStore = stationStore.subscribe(() => {
      const state = stationStore.getState()
      if (state.activeStation !== lastHandledStation) {
        triggerStationTransition(state.activeStation, state.direction === 'forward')
      }
    })

    // ─────────────────────────────────────────────────────────────
    // RENDER ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────
    let rafId: number
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!isTabVisible) return

      const now = performance.now()
      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // 1. Mouse Parallax Lerp
      mouse.x += (mouseTarget.x - mouse.x) * 0.04
      mouse.y += (mouseTarget.y - mouse.y) * 0.04

      // 2. Camera Dolly & Warp FOV Surge
      camera.position.z += (targetCameraZ - camera.position.z) * 0.06

      if (isWarping && !prefersReducedMotion) {
        const warpElapsed = now - warpStartTime
        const warpProgress = Math.min(warpElapsed / warpDuration, 1.0)

        // Peak FOV surge at 40% of duration (45° -> 49° -> 45°)
        const fovSurge = Math.sin(warpProgress * Math.PI) * 4.2
        camera.fov = baseFov + fovSurge
        camera.updateProjectionMatrix()

        if (warpProgress >= 1.0) {
          isWarping = false
          camera.fov = baseFov
          camera.updateProjectionMatrix()
        }
      }

      // 3. Planet Lifecycle Coordination
      // A) OUTGOING PLANET
      if (outgoingPlanet) {
        const outElapsed = now - outgoingPlanet.startTime
        const outProgress = Math.min(outElapsed / outgoingPlanet.duration, 1.0)
        const ease = 1 - Math.pow(1 - outProgress, 3) // easeOutCubic

        if (prefersReducedMotion) {
          // Stationary crossfade
          outgoingPlanet.obj.material.opacity = 1.0 - outProgress
        } else if (outgoingPlanet.isForward) {
          // Slide left towards camera, scale up 1.0 -> 1.35, fade out in 2nd half
          outgoingPlanet.obj.group.position.x = outgoingPlanet.initialPos.x - ease * 3.2
          outgoingPlanet.obj.group.position.y = outgoingPlanet.initialPos.y + ease * 0.4
          outgoingPlanet.obj.group.position.z = outgoingPlanet.initialPos.z + ease * 1.8
          const s = outgoingPlanet.initialScale * (1.0 + ease * 0.35)
          outgoingPlanet.obj.group.scale.setScalar(s)

          // Opacity drops to 0 at second half
          outgoingPlanet.obj.material.opacity = Math.max(1.0 - outProgress * 1.6, 0.0)
        } else {
          // Backward: recede deep into space
          outgoingPlanet.obj.group.position.z = outgoingPlanet.initialPos.z - ease * 4.5
          const s = outgoingPlanet.initialScale * Math.max(1.0 - ease * 0.65, 0.1)
          outgoingPlanet.obj.group.scale.setScalar(s)
          outgoingPlanet.obj.material.opacity = Math.max(1.0 - outProgress * 1.5, 0.0)
        }

        // Fade ring if present
        if (outgoingPlanet.obj.ringMesh && outgoingPlanet.profile.ring) {
          ;(outgoingPlanet.obj.ringMesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
            outgoingPlanet.profile.ring.opacity * outgoingPlanet.obj.material.opacity
        }

        outgoingPlanet.obj.mesh.rotation.y = elapsedTime * (outgoingPlanet.profile.rotationSpeed * 1.4)
        outgoingPlanet.obj.uniforms.uTime.value = elapsedTime

        if (outProgress >= 1.0) {
          scene.remove(outgoingPlanet.obj.group)
          outgoingPlanet.obj.dispose()
          outgoingPlanet = null
        }
      }

      // B) INCOMING / CURRENT PLANET
      if (currentPlanet) {
        if (currentPlanet.isIncoming) {
          const inElapsed = now - currentPlanet.startTime
          const inProgress = Math.min(inElapsed / currentPlanet.duration, 1.0)
          const ease = 1 - Math.pow(1 - inProgress, 3) // easeOutCubic

          if (prefersReducedMotion) {
            currentPlanet.obj.group.position.copy(currentPlanet.initialPos)
            currentPlanet.obj.group.scale.setScalar(currentPlanet.initialScale)
            currentPlanet.obj.material.opacity = inProgress
          } else if (currentPlanet.isForward) {
            // Arrives from far z (-4.0), scales 0.25 -> 1.0, lands smoothly
            const startZ = currentPlanet.initialPos.z - 4.2
            const startScale = currentPlanet.initialScale * 0.25

            currentPlanet.obj.group.position.x = currentPlanet.initialPos.x
            currentPlanet.obj.group.position.y = currentPlanet.initialPos.y
            currentPlanet.obj.group.position.z = THREE.MathUtils.lerp(startZ, currentPlanet.initialPos.z, ease)
            const s = THREE.MathUtils.lerp(startScale, currentPlanet.initialScale, ease)
            currentPlanet.obj.group.scale.setScalar(s)

            currentPlanet.obj.material.opacity = Math.min(inProgress * 1.4, 1.0)
          } else {
            // Backward: arrives from left camera
            const startX = currentPlanet.initialPos.x - 3.2
            currentPlanet.obj.group.position.x = THREE.MathUtils.lerp(startX, currentPlanet.initialPos.x, ease)
            currentPlanet.obj.group.position.y = currentPlanet.initialPos.y
            currentPlanet.obj.group.position.z = currentPlanet.initialPos.z
            currentPlanet.obj.group.scale.setScalar(currentPlanet.initialScale)
            currentPlanet.obj.material.opacity = Math.min(inProgress * 1.4, 1.0)
          }

          if (currentPlanet.obj.ringMesh && currentPlanet.profile.ring) {
            ;(currentPlanet.obj.ringMesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
              currentPlanet.profile.ring.opacity * currentPlanet.obj.material.opacity
          }

          if (inProgress >= 1.0) {
            currentPlanet.isIncoming = false
            currentPlanet.obj.material.opacity = 1.0
          }
        } else {
          // Settled idle position with damped mouse parallax
          const targetX = currentPlanet.initialPos.x + mouse.x * 0.28
          const targetY = currentPlanet.initialPos.y + mouse.y * 0.18
          currentPlanet.obj.group.position.x += (targetX - currentPlanet.obj.group.position.x) * 0.05
          currentPlanet.obj.group.position.y += (targetY - currentPlanet.obj.group.position.y) * 0.05
          currentPlanet.obj.group.position.z = currentPlanet.initialPos.z
          currentPlanet.obj.group.scale.setScalar(currentPlanet.initialScale)
        }

        currentPlanet.obj.mesh.rotation.y = elapsedTime * currentPlanet.profile.rotationSpeed
        currentPlanet.obj.uniforms.uTime.value = elapsedTime

        // Animate satellite if present (Station 03)
        if (currentPlanet.obj.satelliteMesh && currentPlanet.profile.satellite) {
          const s = currentPlanet.profile.satellite
          const angle = elapsedTime * s.speed
          currentPlanet.obj.satelliteMesh.position.x = Math.cos(angle) * s.orbitRadius
          currentPlanet.obj.satelliteMesh.position.z = Math.sin(angle) * s.orbitRadius
          currentPlanet.obj.satelliteMesh.position.y = Math.sin(angle * 1.6) * s.tilt
        }
      }

      // 4. Stardust Drift & 600ms Warp Velocity
      const positions = starGeo.attributes.position.array as Float32Array
      const isStreaking = isWarping && !prefersReducedMotion && now - warpStartTime < 650
      const warpMult = isStreaking ? 4.5 : 1.0

      for (let i = 0; i < starCount; i++) {
        // Z-axis movement
        positions[i * 3 + 2] += 0.006 * starVelocities[i] * warpMult
        if (positions[i * 3 + 2] > 4) {
          positions[i * 3 + 2] = -12
          positions[i * 3] = (Math.random() - 0.5) * 24
          positions[i * 3 + 1] = (Math.random() - 0.5) * 20
        }
      }
      starGeo.attributes.position.needsUpdate = true
      starPoints.rotation.y = elapsedTime * 0.0025

      // 5. Nebula Layer Animation
      if (nebulaUniforms) {
        nebulaUniforms.uTime.value = elapsedTime
      }

      // 6. Rare Shooting Star (Meteor)
      if (shootingStarMesh && !prefersReducedMotion) {
        if (!shootingStarActive && elapsedTime - lastMeteorTime > 11.0 + Math.random() * 4.0) {
          shootingStarActive = true
          shootingStarProgress = 0
          lastMeteorTime = elapsedTime
          // Randomize spawn position high in space
          shootingStarMesh.position.set(
            (Math.random() - 0.5) * 8 + 2.0,
            Math.random() * 3 + 3.0,
            -2.5
          )
        }

        if (shootingStarActive) {
          shootingStarProgress += delta * 1.8 // Fast streak across
          shootingStarMesh.position.x -= delta * 14
          shootingStarMesh.position.y -= delta * 7
          const streakAlpha = Math.sin(Math.min(shootingStarProgress, 1.0) * Math.PI) * 0.75
          ;(shootingStarMesh.material as THREE.LineBasicMaterial).opacity = streakAlpha

          if (shootingStarProgress >= 1.0) {
            shootingStarActive = false
            ;(shootingStarMesh.material as THREE.LineBasicMaterial).opacity = 0
          }
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // ─────────────────────────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      unsubscribeStore()

      starGeo.dispose()
      starMat.dispose()
      if (nebulaMesh) {
        nebulaMesh.geometry.dispose()
        ;(nebulaMesh.material as THREE.Material).dispose()
      }
      if (shootingStarMesh) {
        shootingStarMesh.geometry.dispose()
        ;(shootingStarMesh.material as THREE.Material).dispose()
      }
      if (currentPlanet) currentPlanet.obj.dispose()
      if (outgoingPlanet) outgoingPlanet.obj.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [prefersReducedMotion])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
      {/* Central radial vignette mask to ensure text readability is 100% crisp at all times */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_45%,rgba(2,3,7,0.55)_0%,rgba(2,3,7,0.88)_65%,#020307_100%)] pointer-events-none" />
    </div>
  )
}
