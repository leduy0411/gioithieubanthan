import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FCBarcelonaLogo, CameraDSLRLogo, DJTurntableLogo } from './SocialIcons'

/**
 * Character3D — Clean, High-End Cybernetic Stage for Duy's Portrait
 * - Crisp transparent cutout of Duy (No black rectangular box!)
 * - Multi-tiered holographic pedestal with dual glowing neon blue rings
 * - Smooth 3D mouse parallax & ambient particle vortex
 * - Minimal, ultra-professional aesthetic
 */
export default function Character3D({ fallbackImage = '/images/duy-portrait.png' }) {
  const mountRef = useRef(null)
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 3D Three.js Ambient Particle & Halo Scene
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 520
    const height = container.clientHeight || 640

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 4.5)

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

    // Glowing Cyber Rings in 3D
    const ringMatCyan = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    })
    const ringMatPurple = new THREE.MeshBasicMaterial({
      color: 0xA855F7,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    })

    // Upper Halo Ring behind head
    const haloGeo = new THREE.TorusGeometry(1.45, 0.012, 16, 120)
    const haloMesh = new THREE.Mesh(haloGeo, ringMatCyan)
    haloMesh.rotation.x = Math.PI / 2.3
    haloMesh.position.set(0, 0.65, -0.6)
    scene.add(haloMesh)

    // Body Orbit Ring
    const orbitGeo = new THREE.TorusGeometry(1.85, 0.008, 16, 120)
    const orbitMesh = new THREE.Mesh(orbitGeo, ringMatPurple)
    orbitMesh.rotation.x = -Math.PI / 3.4
    orbitMesh.rotation.y = 0.35
    orbitMesh.position.set(0, -0.1, -0.5)
    scene.add(orbitMesh)

    // Particle Swarm
    const pCount = 120
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pColors = new Float32Array(pCount * 3)

    const c1 = new THREE.Color('#00D9FF')
    const c2 = new THREE.Color('#1558C9')
    const c3 = new THREE.Color('#A855F7')

    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.9 + Math.random() * 2.0
      pPos[i * 3] = Math.cos(angle) * radius
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4.0
      pPos[i * 3 + 2] = Math.sin(angle) * radius * 0.4 - 0.6

      const r = Math.random()
      const c = r > 0.65 ? c1 : r > 0.3 ? c2 : c3
      pColors[i * 3] = c.r
      pColors[i * 3 + 1] = c.g
      pColors[i * 3 + 2] = c.b
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    // Soft glow dot texture
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.3, 'rgba(0, 217, 255, 0.8)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 32, 32)
    const pTexture = new THREE.CanvasTexture(canvas)

    const pMat = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Animation Loop
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()

      haloMesh.rotation.z = t * 0.18
      orbitMesh.rotation.z = -t * 0.14

      // Gentle pulse
      haloMesh.material.opacity = 0.48 + Math.sin(t * 1.8) * 0.15
      orbitMesh.material.opacity = 0.38 + Math.sin(t * 1.5 + 1) * 0.12

      particles.rotation.y = t * 0.04

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
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      haloGeo.dispose()
      orbitGeo.dispose()
      pGeo.dispose()
      pMat.dispose()
      pTexture.dispose()
    }
  }, [])

  // Mouse Parallax for Foreground Layers
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] h-[520px] sm:h-[600px] lg:h-[640px] mx-auto flex items-center justify-center select-none"
    >
      {/* 1. Behind: 3D Three.js WebGL Particle & Orbital Halo Canvas */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* 2. Ambient Cyber Glowing Auras (No hard borders!) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#00D9FF]/25 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-[#1558C9]/35 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-56 h-56 rounded-full bg-[#A855F7]/25 blur-[90px] pointer-events-none" />

      {/* 3. Main Hero Portrait: Duy in Suit with Arms Crossed (Cutout with ZERO black background box) */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-end transition-transform duration-200 ease-out pointer-events-none"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.2}deg)`
        }}
      >
        {/* Soft atmospheric halo ring behind Duy's torso */}
        <div
          className="absolute top-1/4 w-[340px] sm:w-[380px] h-[340px] sm:h-[380px] rounded-full border border-[#00D9FF]/40 shadow-[0_0_40px_rgba(0,217,255,0.35),inset_0_0_20px_rgba(0,217,255,0.2)] animate-spin-slow pointer-events-none"
          style={{ animationDuration: '35s' }}
        />

        {/* The Transparent Cutout Portrait */}
        <div className="relative w-[300px] sm:w-[350px] lg:w-[390px] h-[430px] sm:h-[490px] lg:h-[530px] flex items-end justify-center overflow-visible">
          <img
            src={fallbackImage}
            alt="Le Duy - IT Engineer • Backend Developer • Graphic Designer • Video Editor"
            className="w-full h-full object-contain object-bottom select-none"
            style={{
              filter: 'drop-shadow(0 0 25px rgba(0, 217, 255, 0.4))'
            }}
          />

          {/* Floating Passion Badges with Gentle 3D Parallax */}
          {/* 1. FC Barcelona Floating Crest (Top Right) */}
          <div 
            className="absolute top-10 -right-2 sm:-right-6 p-2.5 rounded-2xl bg-[#070B14]/85 border border-[#004d98] shadow-[0_0_20px_rgba(165,0,68,0.4)] backdrop-blur-md animate-bounce pointer-events-auto transition-transform hover:scale-125"
            style={{ animationDuration: '4.2s' }}
            title="FC Barcelona • Culer Passion"
          >
            <FCBarcelonaLogo className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(237,187,0,0.8)]" />
          </div>

          {/* 2. Landscape Photography DSLR Badge (Top Left) */}
          <div 
            className="absolute top-20 -left-2 sm:-left-6 p-2.5 rounded-2xl bg-[#070B14]/85 border border-[#00D9FF]/50 shadow-[0_0_20px_rgba(0,217,255,0.35)] backdrop-blur-md animate-bounce pointer-events-auto transition-transform hover:scale-125"
            style={{ animationDuration: '4.8s', animationDelay: '1.2s' }}
            title="Landscape Photography • RAW 4K"
          >
            <CameraDSLRLogo className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>

          {/* 3. DJ Turntable Vinyl Badge (Mid-Right) */}
          <div 
            className="absolute bottom-28 -right-3 sm:-right-8 p-2.5 rounded-2xl bg-[#070B14]/85 border border-[#D4FF24]/50 shadow-[0_0_20px_rgba(212,255,36,0.35)] backdrop-blur-md animate-bounce pointer-events-auto transition-transform hover:scale-125"
            style={{ animationDuration: '3.8s', animationDelay: '0.6s' }}
            title="DJing & Electronic Music Production"
          >
            <DJTurntableLogo className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
        </div>

        {/* 4. Futuristic Multi-Layered Pedestal / Platform (As in the reference poster) */}
        <div className="relative -mt-6 sm:-mt-8 z-20 w-full max-w-[400px] flex flex-col items-center pointer-events-none">
          {/* Top glowing neon ring (Cyan) */}
          <div className="w-[290px] sm:w-[350px] h-3 rounded-[50%] bg-[#00D9FF] shadow-[0_0_20px_#00D9FF,0_0_40px_#00D9FF] animate-pulse" />

          {/* Pedestal Top Tier (Metallic Cyber Rim) */}
          <div className="w-[270px] sm:w-[330px] h-4 rounded-sm bg-gradient-to-r from-[#070B14] via-[#121E33] to-[#070B14] border-t border-b border-[#00D9FF]/60 shadow-[0_8px_20px_rgba(0,0,0,0.9)] flex items-center justify-around px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_6px_#00D9FF]" />
            <span className="w-20 h-[1px] bg-[#00D9FF]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_6px_#A855F7]" />
            <span className="w-20 h-[1px] bg-[#00D9FF]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_6px_#00D9FF]" />
          </div>

          {/* Lower glowing neon ring (Electric Blue / Purple) */}
          <div className="w-[330px] sm:w-[390px] h-3 rounded-[50%] bg-gradient-to-r from-[#1558C9] via-[#00D9FF] to-[#A855F7] shadow-[0_0_25px_rgba(0,217,255,0.6)] -mt-1" />

          {/* Base Platform */}
          <div className="w-[310px] sm:w-[370px] h-6 rounded-b-2xl bg-gradient-to-b from-[#0B101A] to-[#030407] border-b border-[#1558C9]/40 shadow-[0_15px_30px_rgba(0,0,0,0.9)]" />
        </div>
      </div>
    </div>
  )
}
