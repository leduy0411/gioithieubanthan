import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Character3D — Editorial portrait stage with restrained orbital detail.
 */
export default function Character3D({ fallbackImage = '/images/duy-portrait.png' }) {
  const mountRef = useRef(null)
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 3D Three.js Ambient Particle & Halo Scene
  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    const ringMatViolet = new THREE.MeshBasicMaterial({
      color: 0xA99AFF,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide
    })
    const ringMatPurple = new THREE.MeshBasicMaterial({
      color: 0x63DDF4,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    })

    // Upper Halo Ring behind head
    const haloGeo = new THREE.TorusGeometry(1.45, 0.012, 16, 120)
    const haloMesh = new THREE.Mesh(haloGeo, ringMatViolet)
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
    const pCount = 72
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pColors = new Float32Array(pCount * 3)

    const c1 = new THREE.Color('#A99AFF')
    const c2 = new THREE.Color('#4B72E8')
    const c3 = new THREE.Color('#63DDF4')

    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.9 + Math.random() * 2.0
      pPos[i * 3] = Math.cos(angle) * radius
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 3.4
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
    grad.addColorStop(0.3, 'rgba(169, 154, 255, 0.8)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 32, 32)
    const pTexture = new THREE.CanvasTexture(canvas)

    const pMat = new THREE.PointsMaterial({
      size: 0.06,
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
      haloMesh.material.opacity = 0.36 + Math.sin(t * 1.4) * 0.08
      orbitMesh.material.opacity = 0.26 + Math.sin(t * 1.2 + 1) * 0.06

      particles.rotation.y = t * 0.04

      renderer.render(scene, camera)
      if (!prefersReducedMotion) animId = requestAnimationFrame(animate)
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
      className="portrait-stage relative mx-auto flex h-[470px] w-full max-w-[620px] select-none items-end justify-center sm:h-[560px] lg:h-[700px]"
    >
      <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0" />
      <div className="portrait-stage-light pointer-events-none absolute left-1/2 top-[42%] h-[72%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div
        className="portrait-stage-orbit pointer-events-none absolute left-1/2 top-[39%] h-[72%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex h-full w-full items-end justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.22}deg) rotateX(${-mousePos.y * 0.15}deg)`
        }}
      >
        <div className="portrait-cutout relative flex h-[440px] w-[320px] items-end justify-center overflow-visible sm:h-[530px] sm:w-[400px] lg:h-[650px] lg:w-[500px]">
          <img
            src={fallbackImage}
            alt="Le Duy - IT Engineer • Backend Developer • Graphic Designer • Video Editor"
            className="portrait-image h-full w-full select-none object-contain object-bottom"
            draggable="false"
          />
        </div>
      </div>

      <div className="portrait-gallery pointer-events-none absolute inset-0 z-20" aria-label="Creative interests">
        <figure className="portrait-gallery-card portrait-gallery-motion">
          <img src="/images/video-editing.svg" alt="" />
          <figcaption>01 / MOTION</figcaption>
        </figure>
        <figure className="portrait-gallery-card portrait-gallery-dj">
          <img src="/images/dj-console.svg" alt="" />
          <figcaption>02 / SOUND</figcaption>
        </figure>
        <figure className="portrait-gallery-crest">
          <img src="/images/fc-barcelona.png" alt="FC Barcelona crest" />
        </figure>
      </div>

      <div className="portrait-signature absolute bottom-8 left-2 z-20 hidden items-center gap-3 sm:flex">
        <span className="portrait-signature-mark">LD</span>
        <span className="font-mono text-[9px] uppercase leading-5 tracking-[0.18em]">
          <strong className="block font-medium text-white">Multidisciplinary</strong>
          <span>by nature / by design</span>
        </span>
      </div>
    </div>
  )
}
