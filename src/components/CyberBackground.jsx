import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * CyberBackground — Ultra High-Performance Interactive Three.js WebGL Canvas
 * Features:
 * - 3D Starfield & Floating Quantum Cyber Particle Swarm
 * - Dynamic constellation line connections between proximate nodes
 * - Smooth mouse-reactive gravitation and inertia drift
 * - Undulating perspective cyber grid horizon
 * - Deep space ambient volumetric nebula glow
 * - 60+ FPS optimized with pause on hidden tab & reduced-motion support
 */
export default function CyberBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x030306, 0.014)
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 70)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
    } catch {
      return
    }

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x030306, 0)
    container.appendChild(renderer.domElement)

    // ─────────────────────────────────────────────
    // 1. STARFIELD & COSMIC QUANTUM PARTICLES
    // ─────────────────────────────────────────────
    const particleCount = prefersReducedMotion ? 120 : 320
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorPalette = [
      new THREE.Color('#00D9FF'), // Electric Cyan
      new THREE.Color('#1558C9'), // Deep Sapphire
      new THREE.Color('#8B5CF6'), // Royal Violet
      new THREE.Color('#38BDF8'), // Soft Sky
      new THREE.Color('#FFFFFF')  // Pure White
    ]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80

      velocities[i * 3] = (Math.random() - 0.5) * 0.04
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.04
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // High quality glowing particle dot texture
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.25, 'rgba(0, 217, 255, 0.85)')
    gradient.addColorStop(0.55, 'rgba(168, 85, 247, 0.4)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)

    // ─────────────────────────────────────────────
    // 2. DYNAMIC CONSTELLATION CONNECTION LINES
    // ─────────────────────────────────────────────
    const maxLineConnections = 240
    const linePositions = new Float32Array(maxLineConnections * 6)
    const lineColors = new Float32Array(maxLineConnections * 6)

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage))
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lineSegments)

    // ─────────────────────────────────────────────
    // 3. PERSPECTIVE CYBER GRID (GROUND HORIZON)
    // ─────────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(200, 40, 0x00D9FF, 0x1B2638)
    gridHelper.position.y = -42
    gridHelper.position.z = -20
    gridHelper.rotation.x = Math.PI * 0.05
    if (gridHelper.material) {
      gridHelper.material.transparent = true
      gridHelper.material.opacity = 0.22
    }
    scene.add(gridHelper)

    // ─────────────────────────────────────────────
    // 4. MOUSE REACTIVITY & ANIMATION LOOP
    // ─────────────────────────────────────────────
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let scrollY = 0

    const handleMouseMove = (e) => {
      mouseX = ((e.clientX / window.innerWidth) - 0.5) * 35
      mouseY = -((e.clientY / window.innerHeight) - 0.5) * 25
    }

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth camera interpolation toward mouse target and scroll damping
      targetX += (mouseX - targetX) * 0.04
      targetY += (mouseY - targetY) * 0.04
      camera.position.x = targetX * 0.4
      camera.position.y = targetY * 0.4 - (scrollY * 0.015)
      camera.position.z = 70 + Math.sin(scrollY * 0.002) * 3
      camera.rotation.z = Math.sin(time * 0.08) * 0.015 + (scrollY * 0.0001)
      camera.lookAt(0, - (scrollY * 0.01), 0)

      // Move grid continuously to create infinite flyover sensation
      if (!prefersReducedMotion) {
        gridHelper.position.z = ((time * 6) % 5) - 20
      }

      // Update particle positions
      const posArray = geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        if (!prefersReducedMotion) {
          posArray[i3] += velocities[i3]
          posArray[i3 + 1] += velocities[i3 + 1]
          posArray[i3 + 2] += velocities[i3 + 2]

          // Boundary bouncing / wrap
          if (posArray[i3] > 80 || posArray[i3] < -80) velocities[i3] *= -1
          if (posArray[i3 + 1] > 60 || posArray[i3 + 1] < -60) velocities[i3 + 1] *= -1
          if (posArray[i3 + 2] > 40 || posArray[i3 + 2] < -40) velocities[i3 + 2] *= -1
        }
      }
      geometry.attributes.position.needsUpdate = true

      // Recompute constellation connections between proximate particles
      let lineIndex = 0
      const connectDist = 18
      const maxLines = maxLineConnections

      for (let i = 0; i < particleCount && lineIndex < maxLines; i += 2) {
        const i3 = i * 3
        const x1 = posArray[i3]
        const y1 = posArray[i3 + 1]
        const z1 = posArray[i3 + 2]

        for (let j = i + 1; j < particleCount && lineIndex < maxLines; j += 3) {
          const j3 = j * 3
          const dx = x1 - posArray[j3]
          const dy = y1 - posArray[j3 + 1]
          const dz = z1 - posArray[j3 + 2]
          const distSq = dx * dx + dy * dy + dz * dz

          if (distSq < connectDist * connectDist) {
            const alpha = 1 - Math.sqrt(distSq) / connectDist
            const l6 = lineIndex * 6

            linePositions[l6] = x1
            linePositions[l6 + 1] = y1
            linePositions[l6 + 2] = z1
            linePositions[l6 + 3] = posArray[j3]
            linePositions[l6 + 4] = posArray[j3 + 1]
            linePositions[l6 + 5] = posArray[j3 + 2]

            // Cyan to Violet glow line color
            lineColors[l6] = 0.0
            lineColors[l6 + 1] = 0.85 * alpha
            lineColors[l6 + 2] = 1.0 * alpha
            lineColors[l6 + 3] = 0.65 * alpha
            lineColors[l6 + 4] = 0.33 * alpha
            lineColors[l6 + 5] = 0.97 * alpha

            lineIndex++
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2)
      lineGeometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.color.needsUpdate = true

      // Gentle rotation of the entire particle universe
      pointCloud.rotation.y = time * 0.02
      pointCloud.rotation.x = Math.sin(time * 0.015) * 0.05

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    // 5. GPU Optimization: Pause render loop when browser tab is inactive
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        clock.start()
        animId = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      particleTexture.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      gridHelper.dispose()
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030306]">
      {/* Three.js Dynamic WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Ultra-Fine Film Grain Noise Overlay (SVG fractalNoise, pointer-events none) */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Architectural Subtle Grid Lines with Radial Gradient Mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)'
        }}
      />

      {/* Volumetric Aurora & Spotlight Glows (Ultra-Slow Ambient Drift) */}
      <div
        className="absolute -top-40 -left-40 h-[44rem] w-[44rem] rounded-full blur-[160px] opacity-20 pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, rgba(21, 88, 201, 0.12) 70%, transparent 100%)',
          animationDuration: '8s'
        }}
      />
      <div
        className="absolute top-[35%] -right-40 h-[46rem] w-[46rem] rounded-full blur-[170px] opacity-15 pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(13, 56, 133, 0.1) 70%, transparent 100%)',
          animationDuration: '10s'
        }}
      />
      <div
        className="absolute -bottom-48 left-[25%] h-[40rem] w-[40rem] rounded-full blur-[160px] opacity-15 pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(0, 217, 255, 0.08) 70%, transparent 100%)',
          animationDuration: '12s'
        }}
      />

      {/* Radial Dark Vignette Mask for 100% Crisp Typography Legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,3,6,0.9)_100%)] pointer-events-none" />
    </div>
  )
}
