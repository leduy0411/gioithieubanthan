import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * CosmicScene — Minimalist Cosmic Odyssey 3D Celestial Stage
 * 
 * Features:
 * - Sparse, ultra-fine cosmic stardust drifting imperceptibly
 * - 3D Celestial Body with Custom GLSL Atmospheric Fresnel & Crust Shaders
 * - Dynamic Solar Accretion Ring for Systems section
 * - 5-Stage Orbital Navigation & Scroll Transition Engine:
 *     00. INDEX:     Obsidian & Electric Cyan Rim
 *     01. PROFILE:   Deep Sapphire & Silver Rim
 *     02. SYSTEMS:   Solar Amber & Glowing Halo Ring
 *     03. EXPERTISE: Deep Nebula Violet & Cyan Aurora Rim
 *     04. SIGNAL:    Monolithic Deep Space Eclipse Horizon
 * - GPU Throttling on document.hidden, DPR clamped to [1, 2]
 * - Central radial vignette for razor-sharp text readability
 */

const PLANET_VERTEX_SHADER = /* glsl */`
precision highp float;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  
  gl_Position = projectionMatrix * mvPosition;
}
`

const PLANET_FRAGMENT_SHADER = /* glsl */`
precision highp float;

uniform vec3 uCrustColor;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunDirection;
uniform float uFresnelPower;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;

// Simple 3D pseudo-noise for organic surface texture
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);
  vec3 sunDir = normalize(uSunDirection);

  // Diffuse sunlight calculation
  float nDotL = max(dot(normal, sunDir), 0.0);
  float daylight = smoothstep(-0.2, 0.8, nDotL);

  // Atmospheric Fresnel Rim Glow
  float rim = 1.0 - max(dot(normal, viewDir), 0.0);
  float fresnel = pow(rim, uFresnelPower);

  // Subtle organic procedural surface variation
  vec3 noiseCoord = vWorldPosition * 0.8 + vec3(uTime * 0.02);
  float surfaceNoise = noise(noiseCoord) * 0.4 + noise(noiseCoord * 2.5) * 0.2;

  // Base planet crust blending with noise
  vec3 surfaceColor = uCrustColor * (0.8 + surfaceNoise * 0.35);

  // Night side illumination (deep space darkness with faint back-bounce)
  vec3 ambientDark = uCrustColor * 0.15;
  vec3 litColor = mix(ambientDark, surfaceColor, daylight);

  // Add rich atmospheric rim glow
  vec3 finalColor = litColor + (uAtmosphereColor * fresnel * 1.6);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

const RING_VERTEX_SHADER = /* glsl */`
precision highp float;
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const RING_FRAGMENT_SHADER = /* glsl */`
precision highp float;
uniform vec3 uRingColor;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  // Radial ring distance calculation
  float dist = distance(vUv, vec2(0.5, 0.5));
  if (dist < 0.28 || dist > 0.49) discard;

  // Concentric ring stripes
  float stripes = sin(dist * 120.0) * 0.5 + 0.5;
  float alpha = smoothstep(0.28, 0.34, dist) * smoothstep(0.49, 0.44, dist) * uOpacity;
  
  vec3 col = uRingColor * (0.7 + stripes * 0.4);
  gl_FragColor = vec4(col, alpha * 0.65);
}
`

export default function CosmicScene({ currentSection = 0 }) {
  const mountRef = useRef(null)
  const currentSectionRef = useRef(0)

  // Keep section ref synchronized
  useEffect(() => {
    currentSectionRef.current = currentSection
  }, [currentSection])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 6.2)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x030307, 1)
    container.appendChild(renderer.domElement)

    // 1. Sparse Cosmic Stardust Field (600 points)
    const starCount = 650
    const starPositions = new Float32Array(starCount * 3)
    const starScales = new Float32Array(starCount)
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 24
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
      starScales[i] = 0.6 + Math.random() * 1.4
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    // 2. The 3D Celestial Body (Procedural Shader Sphere)
    const planetGroup = new THREE.Group()
    scene.add(planetGroup)

    const planetGeo = new THREE.SphereGeometry(1.6, 64, 64)
    const planetUniforms = {
      uCrustColor: { value: new THREE.Color('#0b101d') },
      uAtmosphereColor: { value: new THREE.Color('#00f2fe') },
      uSunDirection: { value: new THREE.Vector3(1.2, 0.8, 1.0).normalize() },
      uFresnelPower: { value: 3.2 },
      uTime: { value: 0 },
    }
    const planetMat = new THREE.ShaderMaterial({
      vertexShader: PLANET_VERTEX_SHADER,
      fragmentShader: PLANET_FRAGMENT_SHADER,
      uniforms: planetUniforms,
    })
    const planetMesh = new THREE.Mesh(planetGeo, planetMat)
    planetGroup.add(planetMesh)

    // 3. Solar Accretion Ring (for Systems section)
    const ringGeo = new THREE.PlaneGeometry(5.2, 5.2)
    const ringUniforms = {
      uRingColor: { value: new THREE.Color('#f59e0b') },
      uOpacity: { value: 0.0 },
    }
    const ringMat = new THREE.ShaderMaterial({
      vertexShader: RING_VERTEX_SHADER,
      fragmentShader: RING_FRAGMENT_SHADER,
      uniforms: ringUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 2.3
    ringMesh.rotation.y = -0.15
    planetGroup.add(ringMesh)

    // 5 Orbital Planet States
    const planetStates = [
      // 00. INDEX (Hero): Obsidian Crust, Electric Cyan Atmosphere
      {
        pos: new THREE.Vector3(1.7, 0.15, -0.4),
        scale: 1.6,
        crust: new THREE.Color('#080d1a'),
        atmosphere: new THREE.Color('#00f2fe'),
        sunDir: new THREE.Vector3(1.4, 0.6, 0.9).normalize(),
        fresnel: 3.2,
        ringOpacity: 0.0,
      },
      // 01. PROFILE: Deep Sapphire & Silver Rim
      {
        pos: new THREE.Vector3(-1.6, -0.2, -0.8),
        scale: 1.45,
        crust: new THREE.Color('#050b18'),
        atmosphere: new THREE.Color('#94a3b8'),
        sunDir: new THREE.Vector3(-1.2, 0.5, 0.8).normalize(),
        fresnel: 3.6,
        ringOpacity: 0.0,
      },
      // 02. SYSTEMS: Solar Amber & Golden Halo Ring
      {
        pos: new THREE.Vector3(1.5, -0.15, -0.5),
        scale: 1.55,
        crust: new THREE.Color('#190e04'),
        atmosphere: new THREE.Color('#f59e0b'),
        sunDir: new THREE.Vector3(1.2, 0.9, 0.6).normalize(),
        fresnel: 2.8,
        ringOpacity: 0.85,
      },
      // 03. EXPERTISE: Deep Nebula Violet & Cyan Aurora Rim
      {
        pos: new THREE.Vector3(-1.5, 0.15, -0.6),
        scale: 1.5,
        crust: new THREE.Color('#130622'),
        atmosphere: new THREE.Color('#c084fc'),
        sunDir: new THREE.Vector3(-0.9, 0.8, 1.1).normalize(),
        fresnel: 3.0,
        ringOpacity: 0.0,
      },
      // 04. SIGNAL: Monolithic Deep Space Eclipse Horizon Arc
      {
        pos: new THREE.Vector3(0.0, -1.8, 0.3),
        scale: 2.85,
        crust: new THREE.Color('#030307'),
        atmosphere: new THREE.Color('#38bdf8'),
        sunDir: new THREE.Vector3(0.0, 1.0, -1.2).normalize(), // Backlit eclipse
        fresnel: 4.8,
        ringOpacity: 0.0,
      },
    ]

    // Damped Mouse Parallax Tracking
    const mouse = new THREE.Vector2(0, 0)
    const mouseTarget = new THREE.Vector2(0, 0)
    const handleMouseMove = (e) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Scroll interpolation calculation
    let currentSectionLerp = 0
    const updateScrollSection = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        const rawProgress = (scrollY / maxScroll) * 4.0
        currentSectionLerp = Math.min(Math.max(rawProgress, 0), 4.0)
      }
    }
    window.addEventListener('scroll', updateScrollSection, { passive: true })

    // Pause render when tab is hidden
    let isVisible = true
    const handleVisibility = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    let animationFrame
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrame = requestAnimationFrame(animate)
      if (!isVisible) return

      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Mouse Parallax smooth lerp
      mouse.x += (mouseTarget.x - mouse.x) * 0.04
      mouse.y += (mouseTarget.y - mouse.y) * 0.04

      // Current orbital state calculation (blend between floors)
      const targetSec = currentSectionRef.current
      const sectionFloat = Math.min(Math.max(targetSec, 0), 4)
      const baseIdx = Math.floor(sectionFloat)
      const nextIdx = Math.min(baseIdx + 1, 4)
      const progress = sectionFloat - baseIdx

      const stateA = planetStates[baseIdx]
      const stateB = planetStates[nextIdx]

      // Interpolate position, scale, colors
      const targetPos = new THREE.Vector3().lerpVectors(stateA.pos, stateB.pos, progress)
      // On mobile screens, center planet
      if (window.innerWidth < 1024) {
        targetPos.x *= 0.25
        targetPos.y += 0.4
      }

      const targetScale = THREE.MathUtils.lerp(stateA.scale, stateB.scale, progress)
      const targetFresnel = THREE.MathUtils.lerp(stateA.fresnel, stateB.fresnel, progress)
      const targetRingOpacity = THREE.MathUtils.lerp(stateA.ringOpacity, stateB.ringOpacity, progress)

      // Smoothly move planet group
      planetGroup.position.x += (targetPos.x + mouse.x * 0.3 - planetGroup.position.x) * 0.05
      planetGroup.position.y += (targetPos.y + mouse.y * 0.2 - planetGroup.position.y) * 0.05
      planetGroup.position.z += (targetPos.z - planetGroup.position.z) * 0.05

      const currentScale = planetGroup.scale.x
      const newScale = currentScale + (targetScale - currentScale) * 0.05
      planetGroup.scale.set(newScale, newScale, newScale)

      // Color lerp
      planetUniforms.uCrustColor.value.lerp(stateA.crust.clone().lerp(stateB.crust, progress), 0.05)
      planetUniforms.uAtmosphereColor.value.lerp(
        stateA.atmosphere.clone().lerp(stateB.atmosphere, progress),
        0.05
      )
      planetUniforms.uSunDirection.value.lerp(stateA.sunDir.clone().lerp(stateB.sunDir, progress), 0.05)
      planetUniforms.uFresnelPower.value += (targetFresnel - planetUniforms.uFresnelPower.value) * 0.05
      planetUniforms.uTime.value = prefersReducedMotion ? 0 : elapsedTime

      ringUniforms.uOpacity.value += (targetRingOpacity - ringUniforms.uOpacity.value) * 0.05

      if (!prefersReducedMotion) {
        planetMesh.rotation.y = elapsedTime * 0.04
        starField.rotation.y = elapsedTime * 0.003
        starField.rotation.x = mouse.y * 0.02
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', updateScrollSection)
      document.removeEventListener('visibilitychange', handleVisibility)

      starGeo.dispose()
      starMat.dispose()
      planetGeo.dispose()
      planetMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
      {/* Central radial vignette mask to ensure text readability is 100% crisp */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,rgba(3,3,7,0.55)_0%,rgba(3,3,7,0.85)_65%,#030307_100%)] pointer-events-none" />
    </div>
  )
}
