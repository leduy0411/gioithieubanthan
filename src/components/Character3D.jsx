import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Clock, Disc3, ShieldAlert, Sparkles, Terminal, Zap } from 'lucide-react'

export default function Character3D({ fallbackImage = '/images/duy-portrait.png' }) {
  const mountRef = useRef(null)
  const cardRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [vietnamTime, setVietnamTime] = useState('')
  const [imageError, setImageError] = useState(false)
  const [imgSrc, setImgSrc] = useState(fallbackImage)

  // Real-time GMT+7 Vietnam Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setVietnamTime(timeString)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Three.js Holographic stage background behind portrait
  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50)
    camera.position.set(0, 0, 4.8)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // Hologram Torus Rings
    const ringGeo1 = new THREE.TorusGeometry(1.4, 0.008, 16, 100)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.55 })
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)
    ring1.rotation.x = Math.PI / 2.2
    ring1.position.y = -1.3
    group.add(ring1)

    const ringGeo2 = new THREE.TorusGeometry(1.75, 0.006, 16, 100)
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x4facfe, transparent: true, opacity: 0.35 })
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)
    ring2.rotation.x = Math.PI / 2.4
    ring2.position.y = -1.3
    group.add(ring2)

    // Ground Grid
    const grid = new THREE.GridHelper(4.5, 14, 0x00f2fe, 0x1e293b)
    grid.position.y = -1.38
    grid.material.transparent = true
    grid.material.opacity = 0.2
    group.add(grid)

    const resize = () => {
      const w = container.clientWidth || 500
      const h = container.clientHeight || 600
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!reducedMotion) {
        ring1.rotation.z += 0.002
        ring2.rotation.z -= 0.0015
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      ringGeo1.dispose()
      ringMat1.dispose()
      ringGeo2.dispose()
      ringMat2.dispose()
      grid.geometry.dispose()
      grid.material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  // 3D Perspective Tilt & Specular Light Reflection
  const handlePointerMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Tilt angle max 8 degrees for natural physics
    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 7

    setTilt({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare((prev) => ({ ...prev, opacity: 0 }))
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
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative mx-auto h-[34rem] w-full max-w-[34rem] overflow-hidden rounded-[2.25rem] border border-white/[0.12] bg-[#070b14]/90 shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(0,242,254,0.1)] backdrop-blur-2xl sm:h-[42rem] lg:h-[46rem]"
    >
      {/* Three.js Hologram Background */}
      <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      {/* Specular Light Reflection Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Top Specular Edge Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Ambient Lighting Dome */}
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_bottom,rgba(0,242,254,0.15),transparent_70%)]" />

      {/* Main Chiseled Portrait */}
      {!imageError ? (
        <img
          src={imgSrc}
          alt="Le Duy - IT Engineer & Creative Technologist"
          onError={handleImageError}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[93%] w-auto max-w-[94%] object-contain object-bottom drop-shadow-[0_24px_45px_rgba(0,0,0,0.95)]"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
          <Zap size={48} className="text-[#00f2fe] mb-3" />
          <h4 className="font-display text-2xl font-bold text-white">LE DUY</h4>
          <p className="font-mono text-xs text-[#00f2fe] mt-1">IT ENGINEER // CREATIVE TECHNOLOGIST</p>
        </div>
      )}

      {/* Floating Telemetry Chip 1: Real-time Vietnam Clock (GMT+7) */}
      <div
        style={{ transform: `translate3d(${tilt.y * -0.5}px, ${tilt.x * -0.5}px, 0)` }}
        className="absolute top-5 left-5 z-20 flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#070b14]/90 px-3.5 py-1.5 font-mono text-xs text-white backdrop-blur-xl shadow-lg"
      >
        <Clock size={13} className="text-[#00f2fe]" />
        <span>Vinh Long • GMT+7</span>
        <span className="font-semibold text-[#00f2fe]">{vietnamTime || '14:00:00'}</span>
      </div>

      {/* Floating Telemetry Chip 2: DJ 128 BPM with Dynamic Equalizer Bars */}
      <div
        style={{ transform: `translate3d(${tilt.y * 0.8}px, ${tilt.x * 0.8}px, 0)` }}
        className="absolute top-20 right-5 z-20 flex items-center gap-2.5 rounded-xl border border-white/[0.12] bg-[#070b14]/90 px-3.5 py-2 font-mono text-xs text-white backdrop-blur-xl shadow-lg"
      >
        <Disc3 size={15} className="text-[#00f2fe] animate-spin" style={{ animationDuration: '6s' }} />
        <span>128 BPM // DJ</span>
        {/* Animated 4-Bar Equalizer */}
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 bg-[#00f2fe] rounded-full animate-eq-bar" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 bg-[#00f2fe] rounded-full animate-eq-bar" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 bg-[#00f2fe] rounded-full animate-eq-bar" style={{ animationDelay: '300ms' }} />
          <span className="w-0.5 bg-[#00f2fe] rounded-full animate-eq-bar" style={{ animationDelay: '450ms' }} />
        </div>
      </div>

      {/* Floating Telemetry Chip 3: FC Barcelona Culér */}
      <div
        style={{ transform: `translate3d(${tilt.y * -0.6}px, ${tilt.x * 0.6}px, 0)` }}
        className="absolute bottom-20 left-5 z-20 flex items-center gap-2 rounded-xl border border-[#a50044]/40 bg-[#070b14]/90 px-3.5 py-2 font-mono text-xs text-white backdrop-blur-xl shadow-lg"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#a50044] border border-[#004d98] shadow-[0_0_8px_#a50044]" />
        <span>Culér // Barça</span>
        <span className="text-[10px] text-amber-400">★ Més que un club</span>
      </div>

      {/* Bottom Identity Capsule */}
      <figcaption className="absolute bottom-5 inset-x-5 z-20 flex items-center justify-between rounded-xl border border-white/[0.1] bg-[#04060c]/90 px-4 py-2.5 font-mono text-xs text-zinc-300 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          <span className="font-medium text-white">Tra Vinh • Vinh Long Province, VN</span>
        </div>
        <span className="text-[#00f2fe] text-[11px] font-semibold">IT ENGINEER</span>
      </figcaption>
    </div>
  )
}
