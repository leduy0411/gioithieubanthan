import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FCBarcelonaLogo, CameraDSLRLogo, DJTurntableLogo } from './SocialIcons'
import { Sparkles, Terminal, Code2, ShieldCheck, Zap } from 'lucide-react'

/**
 * Character3D — Ultra-Tier Holographic Cyber Platform & 3D Interactive Portrait
 * Features:
 * - Real-time Three.js rotating holographic rings & upward cyber spark fountain
 * - Smooth 3D mouse tilt parallax with spring physics
 * - Interactive floating holographic satellite badges (FC Barcelona, Photography, DJing, Code Status)
 * - Click-to-pulse particle celebration effect
 */
export default function Character3D({ fallbackImage = '/images/duy-portrait.png' }) {
  const mountRef = useRef(null)
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [pulseCount, setPulseCount] = useState(0)

  // Three.js 3D Holographic Base & Orbit Rings
  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const width = container.clientWidth || 540
    const height = container.clientHeight || 680

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 5.2)

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

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // ─────────────────────────────────────────────
    // 1. CONCENTRIC HOLOGRAPHIC ENERGY RINGS
    // ─────────────────────────────────────────────
    const ringGroup = new THREE.Group()
    scene.add(ringGroup)

    // Ring 1: Neon Cyan Orbit Ring
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.014, 16, 120)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 2.3
    ring1.position.set(0, -1.1, 0)
    ringGroup.add(ring1)

    // Ring 2: Electric Violet Halo Ring
    const ring2Geo = new THREE.TorusGeometry(1.4, 0.012, 16, 120)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xA855F7,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 2.5
    ring2.rotation.y = 0.2
    ring2.position.set(0, -1.1, 0)
    ringGroup.add(ring2)

    // Ring 3: Neon Lime Outer Horizon
    const ring3Geo = new THREE.TorusGeometry(2.0, 0.008, 16, 120)
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xD4FF24,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.x = Math.PI / 2.2
    ring3.rotation.z = 0.4
    ring3.position.set(0, -1.1, 0)
    ringGroup.add(ring3)

    // Head Halo Ring (circling above portrait)
    const headHaloGeo = new THREE.TorusGeometry(1.15, 0.01, 16, 100)
    const headHaloMat = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    })
    const headHalo = new THREE.Mesh(headHaloGeo, headHaloMat)
    headHalo.rotation.x = Math.PI / 2.4
    headHalo.position.set(0, 1.45, -0.6)
    scene.add(headHalo)

    // ─────────────────────────────────────────────
    // 2. UPWARD CYBER SPARK PARTICLE FOUNTAIN
    // ─────────────────────────────────────────────
    const sparkCount = 85
    const sparkGeo = new THREE.BufferGeometry()
    const sparkPos = new Float32Array(sparkCount * 3)
    const sparkVel = new Float32Array(sparkCount * 3)
    const sparkColors = new Float32Array(sparkCount * 3)

    const cCyan = new THREE.Color('#00D9FF')
    const cViolet = new THREE.Color('#A855F7')
    const cLime = new THREE.Color('#D4FF24')

    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.4 + Math.random() * 1.5
      sparkPos[i * 3] = Math.cos(angle) * radius
      sparkPos[i * 3 + 1] = -1.2 + Math.random() * 3.2
      sparkPos[i * 3 + 2] = Math.sin(angle) * radius * 0.5 - 0.4

      sparkVel[i * 3] = (Math.random() - 0.5) * 0.005
      sparkVel[i * 3 + 1] = 0.008 + Math.random() * 0.015
      sparkVel[i * 3 + 2] = (Math.random() - 0.5) * 0.005

      const r = Math.random()
      const c = r > 0.6 ? cCyan : r > 0.3 ? cViolet : cLime
      sparkColors[i * 3] = c.r
      sparkColors[i * 3 + 1] = c.g
      sparkColors[i * 3 + 2] = c.b
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3))
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3))

    // Dot Glow texture
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.3, 'rgba(0, 217, 255, 0.9)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 32, 32)
    const sparkTexture = new THREE.CanvasTexture(canvas)

    const sparkMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      map: sparkTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const sparkPoints = new THREE.Points(sparkGeo, sparkMat)
    scene.add(sparkPoints)

    // Animation Loop
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()

      // Rotate concentric energy rings
      ring1.rotation.z = t * 0.35
      ring2.rotation.z = -t * 0.25
      ring3.rotation.z = t * 0.15
      headHalo.rotation.z = -t * 0.2

      // Pulsing glow breathing effect
      ring1.material.opacity = 0.55 + Math.sin(t * 2.2) * 0.15
      ring2.material.opacity = 0.45 + Math.sin(t * 1.8 + 1) * 0.12
      ring3.material.opacity = 0.3 + Math.sin(t * 1.4 + 2) * 0.08
      headHalo.material.opacity = 0.4 + Math.sin(t * 2.0) * 0.1

      // Elevate upward sparks
      if (!prefersReducedMotion) {
        const positions = sparkGeo.attributes.position.array
        for (let i = 0; i < sparkCount; i++) {
          const i3 = i * 3
          positions[i3 + 1] += sparkVel[i3 + 1]
          positions[i3] += Math.sin(t * 2 + i) * 0.002
          if (positions[i3 + 1] > 2.0) {
            positions[i3 + 1] = -1.2
          }
        }
        sparkGeo.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      ring1Geo.dispose()
      ring2Geo.dispose()
      ring3Geo.dispose()
      headHaloGeo.dispose()
      sparkGeo.dispose()
      sparkMat.dispose()
      sparkTexture.dispose()
    }
  }, [])

  // Smooth mouse parallax calculations
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 24
    setMousePos({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0 })
  }

  const handlePortraitClick = () => {
    setPulseCount((prev) => prev + 1)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePortraitClick}
      className="relative mx-auto flex h-[480px] w-full max-w-[620px] select-none items-end justify-center sm:h-[580px] lg:h-[720px] cursor-pointer group"
      title="Click to trigger cyber pulse energy!"
    >
      {/* 1. Three.js WebGL Hologram Layer in Background */}
      <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0" />

      {/* 2. Cyber Hologram Projector Platform at the base */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-24 z-0">
        {/* Concentric oval glow rings */}
        <div className="absolute inset-0 rounded-[100%] border border-[#00D9FF]/40 shadow-[0_0_35px_rgba(0,217,255,0.45)] bg-gradient-to-t from-[#00D9FF]/10 to-transparent" />
        <div className="absolute inset-[15%] rounded-[100%] border border-[#A855F7]/40 shadow-[0_0_25px_rgba(168,85,247,0.4)]" />
        <div className="absolute inset-[30%] rounded-[100%] border border-[#D4FF24]/40 shadow-[0_0_20px_rgba(212,255,36,0.35)]" />
        {/* Projector Center Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-6 rounded-full bg-[#00D9FF] blur-md opacity-70 animate-pulse" />
      </div>

      {/* 3. Ambient Backlight Volumetric Dome */}
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] h-[75%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] opacity-25 transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.6) 0%, rgba(168,85,247,0.4) 50%, transparent 100%)'
        }}
      />

      {/* 4. Duy's Portrait Cutout with 3D Spring Tilt Parallax */}
      <div
        className="relative z-10 flex h-full w-full items-end justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `perspective(1200px) rotateY(${mousePos.x * 0.28}deg) rotateX(${-mousePos.y * 0.2}deg) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`
        }}
      >
        <div className="relative flex h-[440px] w-[320px] items-end justify-center sm:h-[530px] sm:w-[410px] lg:h-[660px] lg:w-[500px]">
          <img
            src={fallbackImage}
            alt="Le Duy - IT Engineer • Backend Developer • Graphic Designer • Video Editor"
            className="h-full w-full select-none object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter contrast-[1.04] transition-all duration-300 group-hover:brightness-105"
            draggable="false"
          />

          {/* Hologram scanline effect over portrait */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030407]/90 via-transparent to-transparent" />
        </div>
      </div>

      {/* 5. Floating Interactive Holographic Badges */}
      {/* Top Left: Terminal Telemetry Chip */}
      <div
        className="pointer-events-none absolute top-12 left-2 sm:left-4 z-20 transition-transform duration-300 ease-out hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#070B14]/85 border border-[#00D9FF]/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]"
        style={{
          transform: `translate3d(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px, 0)`
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
        <div className="font-mono text-[11px] text-white">
          <span className="text-[#00D9FF]">duy.config</span>: <span className="text-[#D4FF24]">ONLINE</span>
        </div>
      </div>

      {/* Top Right: Code Status Beacon */}
      <div
        className="pointer-events-none absolute top-20 right-2 sm:right-4 z-20 transition-transform duration-300 ease-out hidden sm:flex flex-col gap-1 px-3.5 py-2 rounded-xl bg-[#070B14]/85 border border-[#A855F7]/40 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.25)]"
        style={{
          transform: `translate3d(${mousePos.x * 0.35}px, ${-mousePos.y * 0.35}px, 0)`
        }}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#A855F7]">
          <Code2 className="w-3.5 h-3.5" />
          <span>ENGINEERING // CORE</span>
        </div>
        <div className="font-mono text-[11px] font-bold text-white">
          IT Engineer · Degree Verified
        </div>
      </div>

      {/* Middle Right: FC Barcelona Blaugrana Satellite Card */}
      <div
        className="pointer-events-none absolute top-[44%] -right-2 sm:right-2 z-20 transition-transform duration-300 ease-out flex items-center gap-2.5 px-3 py-2 rounded-xl border backdrop-blur-md shadow-[0_0_25px_rgba(165,0,68,0.35)]"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 77, 152, 0.45) 0%, rgba(165, 0, 68, 0.45) 100%)',
          borderColor: 'rgba(0, 77, 152, 0.7)',
          transform: `translate3d(${mousePos.x * 0.45}px, ${mousePos.y * 0.3}px, 0)`
        }}
      >
        <FCBarcelonaLogo className="w-7 h-7 drop-shadow-[0_0_8px_rgba(237,187,0,0.8)]" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-display font-bold text-xs text-white">FC BARCELONA</span>
            <span className="text-[9px] font-mono font-bold text-[#EDBB00]">★</span>
          </div>
          <span className="font-mono text-[9px] text-[#CBD5E1]">Culer • Més que un club</span>
        </div>
      </div>

      {/* Middle Left: DJ Turntable + Audio Equalizer */}
      <div
        className="pointer-events-none absolute top-[52%] -left-2 sm:left-2 z-20 transition-transform duration-300 ease-out flex items-center gap-2 px-3 py-2 rounded-xl bg-[#070B14]/90 border border-[#D4FF24]/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,255,36,0.25)]"
        style={{
          transform: `translate3d(${-mousePos.x * 0.4}px, ${mousePos.y * 0.35}px, 0)`
        }}
      >
        <DJTurntableLogo className="w-6 h-6" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-xs text-white">DJ &amp; SOUND</span>
          <div className="flex items-center gap-0.5 h-2.5 mt-0.5">
            <span className="w-0.5 bg-[#D4FF24] rounded-full animate-pulse h-2" />
            <span className="w-0.5 bg-[#00D9FF] rounded-full animate-pulse h-3.5" />
            <span className="w-0.5 bg-[#A855F7] rounded-full animate-pulse h-1.5" />
            <span className="w-0.5 bg-[#D4FF24] rounded-full animate-pulse h-3" />
            <span className="w-0.5 bg-[#00D9FF] rounded-full animate-pulse h-2" />
          </div>
        </div>
      </div>

      {/* Bottom Left: Photography DSLR Satellite */}
      <div
        className="pointer-events-none absolute bottom-16 -left-2 sm:left-4 z-20 transition-transform duration-300 ease-out hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#070B14]/90 border border-[#00D9FF]/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]"
        style={{
          transform: `translate3d(${-mousePos.x * 0.3}px, ${mousePos.y * 0.4}px, 0)`
        }}
      >
        <CameraDSLRLogo className="w-6 h-6" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-xs text-white">PHOTOGRAPHY</span>
          <span className="font-mono text-[9px] text-[#00D9FF]">Landscape • RAW</span>
        </div>
      </div>

      {/* Bottom Right: Quick Interaction Pill */}
      <div className="pointer-events-none absolute bottom-8 right-2 sm:right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101A]/85 border border-white/10 backdrop-blur-md text-[10px] font-mono text-[#94A3B8]">
        <Zap className="w-3.5 h-3.5 text-[#D4FF24] animate-pulse" />
        <span>CYBER PROTOCOL v3.8</span>
      </div>
    </div>
  )
}
