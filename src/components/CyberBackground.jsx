import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * CyberBackground — Awwwards / Lusion-Tier Custom GLSL Shader WebGL Canvas
 * Features:
 * - Realtime 3D Iridescent Liquid Glass & Ferrofluid Mesh Sculpture
 * - Custom GLSL Vertex Shader: 3D Simplex Curl Noise dynamic displacement
 * - Custom GLSL Fragment Shader: Chromatic Fresnel dispersion & Obsidian Liquid Chrome reflections
 * - Mouse gravitational inertia & parallax camera damping
 * - Scroll-velocity geometry morphing across page sections
 * - Automatic GPU throttling on background tab & responsive mobile scaling
 */

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uDistortion;
  uniform vec2 uMouse;
  uniform float uScroll;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  varying float vDisplacement;

  // 3D Simplex-style Classic Perlin Noise in GLSL
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    
    // Wave frequencies modulated by time, mouse and scroll
    vec3 noiseCoord = position * 0.45 + vec3(uMouse * 0.25, uScroll * 0.5);
    float noise1 = snoise(noiseCoord + vec3(uTime * 0.22));
    float noise2 = snoise(noiseCoord * 1.8 - vec3(uTime * 0.18)) * 0.5;
    
    float displacement = (noise1 + noise2) * (0.42 + uDistortion * 0.35);
    vDisplacement = displacement;

    vec3 newPosition = position + normal * displacement;
    vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
    vViewDir = normalize(-vPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorCyan;
  uniform vec3 uColorViolet;
  uniform vec3 uColorAmber;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  varying float vDisplacement;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewDir);

    // Fresnel reflectance with exponential grazing angle
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.2);

    // Chromatic Iridescence dispersion
    float shiftR = sin(vDisplacement * 4.0 + uTime * 0.4) * 0.5 + 0.5;
    float shiftG = sin(vDisplacement * 4.0 + uTime * 0.4 + 2.094) * 0.5 + 0.5;
    float shiftB = sin(vDisplacement * 4.0 + uTime * 0.4 + 4.188) * 0.5 + 0.5;
    vec3 iridescentSheen = vec3(shiftR, shiftG, shiftB);

    // Twin specular studio lights (Cool Cyan + Warm Violet)
    vec3 light1Dir = normalize(vec3(1.2, 1.5, 1.0));
    vec3 light2Dir = normalize(vec3(-1.2, -1.0, 0.8));

    float diff1 = max(dot(normal, light1Dir), 0.0);
    float diff2 = max(dot(normal, light2Dir), 0.0);

    vec3 half1 = normalize(light1Dir + viewDir);
    vec3 half2 = normalize(light2Dir + viewDir);

    float spec1 = pow(max(dot(normal, half1), 0.0), 32.0);
    float spec2 = pow(max(dot(normal, half2), 0.0), 24.0);

    // Blend obsidian base with iridescent chrome highlights
    vec3 finalColor = uColorBase;
    finalColor += diff1 * uColorCyan * 0.35;
    finalColor += diff2 * uColorViolet * 0.30;
    finalColor += spec1 * uColorCyan * 0.85;
    finalColor += spec2 * uColorViolet * 0.65;
    finalColor += fresnel * mix(uColorCyan, iridescentSheen, 0.45) * 0.95;

    // Atmospheric depth attenuation (soft alpha blend to keep text 100% readable)
    float alpha = clamp(0.32 + fresnel * 0.65, 0.0, 0.90);

    gl_FragColor = vec4(finalColor, alpha);
  }
`

export default function CyberBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // ─────────────────────────────────────────────
    // 1. SCENE, CAMERA, RENDERER
    // ─────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x030306, 0.016)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance'
      })
    } catch {
      return
    }

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75))
    renderer.setClearColor(0x030306, 0)
    container.appendChild(renderer.domElement)

    // ─────────────────────────────────────────────
    // 2. ORGANIC IRIDESCENT LIQUID GLASS MESH
    // ─────────────────────────────────────────────
    // Detail level: 4 subdivisions on desktop, 3 on mobile for maximum 60/120fps efficiency
    const meshDetail = isMobile ? 3 : 5
    const geometry = new THREE.IcosahedronGeometry(2.3, meshDetail)

    const uniforms = {
      uTime: { value: 0 },
      uDistortion: { value: 0.15 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColorBase: { value: new THREE.Color('#030306') },
      uColorCyan: { value: new THREE.Color('#00D9FF') },
      uColorViolet: { value: new THREE.Color('#8B5CF6') },
      uColorAmber: { value: new THREE.Color('#F59E0B') }
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      wireframe: false,
      side: THREE.DoubleSide
    })

    const liquidMesh = new THREE.Mesh(geometry, material)
    liquidMesh.position.set(1.2, 0.2, 0)
    scene.add(liquidMesh)

    // Secondary subtle geometric orbit halo
    const haloGeo = new THREE.TorusGeometry(3.6, 0.012, 16, isMobile ? 64 : 120)
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      transparent: true,
      opacity: 0.18
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    haloMesh.rotation.x = Math.PI * 0.35
    scene.add(haloMesh)

    // Subtle cosmic quantum dust particles
    const dustCount = isMobile ? 60 : 160
    const dustGeo = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 16
      dustPositions[i + 1] = (Math.random() - 0.5) * 12
      dustPositions[i + 2] = (Math.random() - 0.5) * 8
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dustMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.45
    })
    const dustPoints = new THREE.Points(dustGeo, dustMat)
    scene.add(dustPoints)

    // ─────────────────────────────────────────────
    // 3. MOUSE INTERACTION WITH DAMPED INERTIA
    // ─────────────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let scrollY = 0
    let targetScrollY = 0

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    // ─────────────────────────────────────────────
    // 4. ANIMATION LOOP & RESIZE HANDLER
    // ─────────────────────────────────────────────
    let isTabVisible = true
    const handleVisibility = () => {
      isTabVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      // Adjust position on mobile vs desktop
      if (window.innerWidth < 768) {
        liquidMesh.position.set(0, 0.4, -0.5)
        liquidMesh.scale.set(0.75, 0.75, 0.75)
      } else {
        liquidMesh.position.set(1.5, 0.1, 0)
        liquidMesh.scale.set(1, 1, 1)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    let clock = new THREE.Clock()
    let animationFrameId

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isTabVisible) return

      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Smooth scroll lerp
      scrollY += (targetScrollY - scrollY) * 0.05

      // Update Shader Uniforms
      uniforms.uTime.value = elapsedTime * (prefersReducedMotion ? 0.3 : 0.8)
      uniforms.uMouse.value.set(mouse.x, mouse.y)
      uniforms.uScroll.value = scrollY
      uniforms.uDistortion.value = 0.15 + Math.abs(mouse.x * mouse.y) * 0.35 + scrollY * 0.45

      // Smooth rotations
      liquidMesh.rotation.y = elapsedTime * 0.15 + mouse.x * 0.4
      liquidMesh.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2 + mouse.y * 0.3
      haloMesh.rotation.z = elapsedTime * 0.08
      haloMesh.rotation.y = mouse.x * 0.2

      // Subtle parallax camera drift
      camera.position.x = mouse.x * 0.45
      camera.position.y = mouse.y * 0.35 + scrollY * -0.8
      camera.lookAt(liquidMesh.position.x * 0.4, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // ─────────────────────────────────────────────
    // 5. CLEANUP ON UNMOUNT
    // ─────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
      haloGeo.dispose()
      haloMat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #080D1A 0%, #030306 70%, #020204 100%)'
      }}
      aria-hidden="true"
    >
      {/* Film Grain Subtle Noise Texture (SVG fractalNoise) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Architectural Grid Lines with Radial Gradient Mask */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 80%)'
        }}
      />

      {/* Volumetric Aurora Spotlight Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #00D9FF 0%, #1558C9 45%, transparent 75%)'
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full blur-[160px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, #030306 65%, transparent 80%)'
        }}
      />

      {/* Soft Vignette Mask behind central text */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(3, 3, 6, 0.75) 100%)'
        }}
      />
    </div>
  )
}
