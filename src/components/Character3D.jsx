import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Disc3, Shield, Terminal, Zap } from 'lucide-react'

export default function Character3D({ fallbackImage = '/images/duy-portrait.png' }) {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [imageError, setImageError] = useState(false)
  const [imgSrc, setImgSrc] = useState(fallbackImage)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.2, 5.2)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const space = new THREE.Group()
    scene.add(space)

    // Holographic Cyber Rings
    const ringGeometries = [
      new THREE.TorusGeometry(1.5, 0.012, 16, 120),
      new THREE.TorusGeometry(1.85, 0.008, 16, 120),
      new THREE.TorusGeometry(2.2, 0.006, 16, 120),
    ]

    const ringMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.65 }),
      new THREE.MeshBasicMaterial({ color: 0x4facfe, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0x7928ca, transparent: true, opacity: 0.35 }),
    ]

    const rings = ringGeometries.map((geo, index) => {
      const ring = new THREE.Mesh(geo, ringMaterials[index])
      ring.rotation.x = Math.PI / (2.2 + index * 0.15)
      ring.rotation.z = index * 0.8
      ring.position.y = -1.35
      space.add(ring)
      return ring
    })

    // Ground Hologram Grid
    const grid = new THREE.GridHelper(4.8, 16, 0x00f2fe, 0x1e293b)
    grid.position.y = -1.45
    grid.rotation.x = 0.06
    grid.material.transparent = true
    grid.material.opacity = 0.25
    space.add(grid)

    // Quantum Floating Particles
    const particleCount = 60
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.9 + Math.random() * 1.6
      const angle = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = -1.2 + Math.random() * 3.2
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.7
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    space.add(particleSystem)

    const resize = () => {
      const width = container.clientWidth || 540
      const height = container.clientHeight || 640
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    let animationFrame
    const clock = new THREE.Clock()
    const animate = () => {
      const time = clock.getElapsedTime()
      const target = pointerRef.current
      space.rotation.y += (target.x * 0.12 - space.rotation.y) * 0.05
      space.rotation.x += (target.y * 0.06 - space.rotation.x) * 0.05

      if (!reducedMotion) {
        rings.forEach((ring, index) => {
          ring.rotation.z += (index % 2 === 0 ? 1 : -1) * 0.0015
          ring.position.y = -1.35 + Math.sin(time * 0.5 + index) * 0.02
        })
        particleSystem.rotation.y = time * 0.04
      }

      renderer.render(scene, camera)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()
    sceneRef.current = { renderer, scene }

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      ringGeometries.forEach((g) => g.dispose())
      ringMaterials.forEach((m) => m.dispose())
      particleGeo.dispose()
      particleMat.dispose()
      grid.geometry.dispose()
      grid.material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      sceneRef.current = null
    }
  }, [])

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    pointerRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    }
  }

  const resetPointer = () => {
    pointerRef.current = { x: 0, y: 0 }
  }

  const handleImageError = () => {
    if (imgSrc === '/images/duy-portrait.png') {
      setImgSrc('/images/duy-portrait-cutout.png')
    } else if (imgSrc === '/images/duy-portrait-cutout.png') {
      setImgSrc('/images/duy-portrait.svg')
    } else {
      setImageError(true)
    }
  }

  return (
    <figure
      className="relative mx-auto h-[34rem] w-full max-w-[34rem] overflow-hidden rounded-[2.5rem] border border-white/[0.12] border-t-white/[0.25] bg-gradient-to-b from-[#0b101d]/90 to-[#04060b]/95 shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(0,242,254,0.1)] backdrop-blur-2xl sm:h-[42rem] lg:h-[46rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* 3D Holographic WebGL Canvas */}
      <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      {/* Cybernetic Volumetric Radial Glows */}
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_bottom,rgba(0,242,254,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute top-10 right-10 h-48 w-48 rounded-full bg-[#7928ca]/20 blur-3xl" />

      {/* Portrait of Le Duy */}
      {!imageError ? (
        <img
          src={imgSrc}
          alt="Le Duy - IT Engineer & Creative Technologist"
          onError={handleImageError}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[94%] w-auto max-w-[95%] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-[1.02]"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 rounded-full border border-[#00f2fe]/40 bg-[#00f2fe]/10 flex items-center justify-center mb-4">
            <Zap size={40} className="text-[#00f2fe]" />
          </div>
          <h4 className="font-display text-2xl font-bold text-white">LE DUY</h4>
          <p className="font-mono text-xs text-[#00f2fe] mt-1">IT ENGINEER // CREATIVE TECHNOLOGIST</p>
        </div>
      )}

      {/* Floating Holographic Telemetry Badge Top Right */}
      <div className="absolute right-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#070b14]/85 px-3 py-1.5 font-mono text-[10px] tracking-wider text-[#00f2fe] backdrop-blur-xl shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
        HOLO_SYS // V2.6
      </div>

      {/* Floating Identity Capsule Bottom Left */}
      <figcaption className="absolute bottom-5 left-5 z-20 flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-[#070b14]/90 px-4 py-2 font-mono text-xs text-white backdrop-blur-xl shadow-xl">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" aria-hidden="true" />
        <span className="font-medium">Tra Vinh • Vinh Long, VN</span>
      </figcaption>

      {/* Satellite Badge: DJ & Electronic Sound */}
      <div className="absolute left-5 top-20 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#070b14]/80 px-3 py-2 text-xs font-mono text-[#cbd5e1] backdrop-blur-md shadow-lg">
        <Disc3 size={15} className="text-[#00f2fe] animate-spin" style={{ animationDuration: '6s' }} />
        <span>128 BPM // DJ</span>
      </div>

      {/* Satellite Badge: FC Barcelona Blaugrana Pride */}
      <div className="absolute right-5 bottom-24 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-[#a50044]/30 bg-[#070b14]/85 px-3 py-2 text-xs font-mono text-white backdrop-blur-md shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-[#a50044] border border-[#004d98]" />
        <span>Culér // Barça</span>
      </div>
    </figure>
  )
}
