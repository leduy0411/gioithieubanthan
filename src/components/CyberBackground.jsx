import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CyberBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 40

    // WebGL Renderer with performance optimizations
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
      })
    } catch {
      // Fallback if WebGL isn't supported
      return
    }

    const isMobile = window.innerWidth < 768
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // Particle System (Cyber Dust & Energy Motes)
    const particleCount = isMobile ? 250 : 600
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorBlue = new THREE.Color('#1558C9')
    const colorLime = new THREE.Color('#D4FF24')
    const colorCyan = new THREE.Color('#00D9FF')

    for (let i = 0; i < particleCount; i++) {
      // Spread in 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 90
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      // Color distribution: 65% Electric Blue, 20% Cyan, 15% Neon Lime
      const rand = Math.random()
      let c = colorBlue
      if (rand > 0.85) c = colorLime
      else if (rand > 0.65) c = colorCyan

      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Particle texture
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(21,88,201,0.8)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 16, 16)
    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.9 : 1.3,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Orbital cyber rings
    const ringGeo1 = new THREE.RingGeometry(22, 22.2, 64)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x1558C9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    })
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)
    ring1.rotation.x = Math.PI / 3
    ring1.position.set(-15, 0, -10)
    scene.add(ring1)

    const ringGeo2 = new THREE.RingGeometry(18, 18.15, 64)
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xD4FF24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18
    })
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)
    ring2.rotation.x = -Math.PI / 4
    ring2.position.set(20, -5, -15)
    scene.add(ring2)

    // Parallax mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse parallax
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      particleSystem.rotation.y = elapsedTime * 0.03 + targetX * 0.2
      particleSystem.rotation.x = elapsedTime * 0.015 - targetY * 0.15

      ring1.rotation.z = elapsedTime * 0.05
      ring2.rotation.z = -elapsedTime * 0.07

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      ringGeo1.dispose()
      ringMat1.dispose()
      ringGeo2.dispose()
      ringMat2.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 70% Deep Space Black base with animated CSS grid */}
      <div className="absolute inset-0 bg-[#030407]" />
      <div className="absolute inset-0 bg-cyber-grid opacity-35" />

      {/* Cyber Glow Highlights (Electric Blue & Neon Lime) */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#1558C9]/20 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#1558C9]/15 blur-[160px]" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full bg-[#D4FF24]/6 blur-[180px]" />

      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  )
}
