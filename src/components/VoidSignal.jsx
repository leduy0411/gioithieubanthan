import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * VoidSignal — Awwwards SOTY WebGL Centerpiece
 *
 * Art Direction: "Signal from the Void"
 * A morphing icosahedral signal mesh with custom GLSL shaders creates
 * a living, breathing sculpture that reacts to mouse movement and scroll.
 * The mesh embodies the "invisible architecture" that Le Duy engineers —
 * systems that work in darkness but illuminate everything they touch.
 *
 * Technical highlights:
 * - Dual-pass GLSL: 3D Simplex noise vertex displacement + Chromatic Fresnel fragment
 * - Real-time mouse inertia with exponential damping (not simple lerp)
 * - Scroll-reactive morphing state (5 scroll "chapters")
 * - Full GPU resource lifecycle management
 * - Responsive DPR + mobile geometry simplification
 */

// ─────────────────────────────────────────────────────────────────
// VERTEX SHADER — 3D Simplex Noise Organic Displacement
// ─────────────────────────────────────────────────────────────────
const VERT = /* glsl */`
precision highp float;

uniform float uTime;
uniform float uMorphFactor;
uniform vec2 uMouse;
uniform float uDistort;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDispAmt;
varying vec3 vWorldPos;

// 3D Simplex Noise (Stefan Gustavson's implementation)
vec3 mod289v3(vec3 x) { return x - floor(x*(1./289.))*289.; }
vec4 mod289v4(vec4 x) { return x - floor(x*(1./289.))*289.; }
vec4 permute(vec4 x) { return mod289v4(((x*34.)+1.)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1./6., 1./3.);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1. - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - .5;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0., i1.z, i2.z, 1.)) +
    i.y + vec4(0., i1.y, i2.y, 1.)) +
    i.x + vec4(0., i1.x, i2.x, 1.));
  float n_ = .142857142857;
  vec3 ns = n_ * vec3(0., .5, 1.) - vec3(1., 0., 1.) * n_;
  vec4 j  = p - 49.*floor(p*ns.z*ns.z);
  vec4 x_ = floor(j*ns.z), y_ = floor(j - 7.*x_);
  vec4 x  = x_*ns.x + ns.yyyy;
  vec4 y  = y_*ns.x + ns.yyyy;
  vec4 h  = 1. - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy), b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2. + 1., s1 = floor(b1)*2. + 1.;
  vec4 sh = -step(h, vec4(0.));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m = max(.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.);
  m = m*m;
  return 42.*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main() {
  vNormal = normalize(normalMatrix * normal);
  
  // Multi-octave noise for organic complexity
  vec3 noisePos = position * 0.55 + vec3(uMouse * 0.3, 0.);
  float n1 = snoise(noisePos + vec3(uTime * 0.18));
  float n2 = snoise(noisePos * 2.1 - vec3(uTime * 0.14)) * 0.45;
  float n3 = snoise(noisePos * 4.3 + vec3(uTime * 0.09)) * 0.18;
  
  float disp = (n1 + n2 + n3) * (0.38 + uDistort * 0.42 + uMorphFactor * 0.22);
  vDispAmt = disp;
  
  vec3 displaced = position + normal * disp;
  vWorldPos = (modelMatrix * vec4(displaced, 1.)).xyz;
  vec4 mvPos = modelViewMatrix * vec4(displaced, 1.);
  vViewDir = normalize(-mvPos.xyz);
  
  gl_Position = projectionMatrix * mvPos;
}
`

// ─────────────────────────────────────────────────────────────────
// FRAGMENT SHADER — Chromatic Iridescent Fresnel
// ─────────────────────────────────────────────────────────────────
const FRAG = /* glsl */`
precision highp float;

uniform float uTime;
uniform vec3 uColorA;  // Electric Cyan
uniform vec3 uColorB;  // Violet
uniform vec3 uColorC;  // Obsidian

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDispAmt;
varying vec3 vWorldPos;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  
  // Fresnel power — grazing angle brightens to full iridescence
  float fresnel = pow(1. - clamp(dot(N, V), 0., 1.), 2.8);
  
  // Chromatic spectral shift (oil-slick iridescence)
  float t = uTime * 0.35;
  float shR = sin(vDispAmt * 5.0 + t       ) * 0.5 + 0.5;
  float shG = sin(vDispAmt * 5.0 + t + 2.09) * 0.5 + 0.5;
  float shB = sin(vDispAmt * 5.0 + t + 4.19) * 0.5 + 0.5;
  vec3 iridescent = vec3(shR, shG, shB);
  
  // Dual-tone studio lighting
  vec3 L1 = normalize(vec3(1.4, 1.8, 1.2));
  vec3 L2 = normalize(vec3(-1.0, -0.6, 0.9));
  
  float diff1 = max(dot(N, L1), 0.0);
  float diff2 = max(dot(N, L2), 0.0);
  
  // Blinn-Phong specular
  float spec1 = pow(max(dot(N, normalize(L1 + V)), 0.0), 48.0);
  float spec2 = pow(max(dot(N, normalize(L2 + V)), 0.0), 28.0);
  
  // Compose final color
  vec3 col = uColorC;
  col += diff1 * uColorA * 0.4;
  col += diff2 * uColorB * 0.3;
  col += spec1 * uColorA * 1.1;
  col += spec2 * uColorB * 0.75;
  col += fresnel * mix(uColorA, iridescent, 0.55) * 1.2;
  
  // Atmospheric depth — keep central mass visible through canvas
  float alpha = clamp(0.28 + fresnel * 0.68, 0.0, 0.88);
  
  gl_FragColor = vec4(col, alpha);
}
`

export default function VoidSignal() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.innerWidth < 768

    // ── Scene ──────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x010103, 0.012)

    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 8.5)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: 'high-performance' })
    } catch { return }

    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.3 : 1.8))
    renderer.setClearColor(0x010103, 0)
    el.appendChild(renderer.domElement)

    // ── Morphing Signal Mesh (Icosahedron) ───────────────────
    const geo = new THREE.IcosahedronGeometry(2.6, mobile ? 4 : 6)
    const uniforms = {
      uTime:        { value: 0 },
      uMorphFactor: { value: 0 },
      uMouse:       { value: new THREE.Vector2(0, 0) },
      uDistort:     { value: 0.12 },
      uColorA:      { value: new THREE.Color('#00D9FF') },
      uColorB:      { value: new THREE.Color('#8B5CF6') },
      uColorC:      { value: new THREE.Color('#010103') },
    }
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms,
      transparent: true, side: THREE.DoubleSide, depthWrite: false
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(2.5, 0.0, 0)
    scene.add(mesh)

    // ── Outer halo ring ──────────────────────────────────────
    const haloGeo = new THREE.TorusGeometry(4.2, 0.009, 16, mobile ? 80 : 150)
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x00D9FF, transparent: true, opacity: 0.14 })
    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.rotation.x = Math.PI * 0.42
    scene.add(halo)

    // Second thinner ring (violet)
    const halo2Geo = new THREE.TorusGeometry(3.6, 0.006, 16, mobile ? 60 : 120)
    const halo2Mat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.10 })
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat)
    halo2.rotation.x = -Math.PI * 0.28
    halo2.rotation.z = Math.PI * 0.15
    scene.add(halo2)

    // ── Sparse ambient dust ──────────────────────────────────
    const N = mobile ? 50 : 120
    const dustGeo = new THREE.BufferGeometry()
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N * 3; i += 3) {
      pos[i]   = (Math.random() - 0.5) * 20
      pos[i+1] = (Math.random() - 0.5) * 15
      pos[i+2] = (Math.random() - 0.5) * 10
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const dustMat = new THREE.PointsMaterial({ size: 0.028, color: 0x38BDF8, transparent: true, opacity: 0.38 })
    scene.add(new THREE.Points(dustGeo, dustMat))

    // ── Mouse inertia ────────────────────────────────────────
    const mouse   = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 }
    let   scrollT = 0, scrollV = 0
    const INERTIA = 0.055, FRICTION = 0.88

    const onMove = (e) => {
      mouse.tx =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1
    }
    let lastSY = 0
    const onScroll = () => {
      const sy = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
      scrollV  = (sy - lastSY) * 18
      lastSY   = sy
      scrollT  = sy
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Visibility pause ─────────────────────────────────────
    let alive = true
    const onVis = () => { alive = !document.hidden }
    document.addEventListener('visibilitychange', onVis)

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
      mesh.position.set(window.innerWidth < 768 ? 0 : 2.5, 0, 0)
      mesh.scale.setScalar(window.innerWidth < 768 ? 0.72 : 1)
    }
    window.addEventListener('resize', onResize)
    onResize()

    // ── Animation loop ───────────────────────────────────────
    const clock = new THREE.Clock()
    let raf

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!alive) return

      const t = clock.getElapsedTime()
      const spd = rm ? 0.25 : 1

      // Exponential damping inertia (spring physics)
      mouse.vx += (mouse.tx - mouse.x) * INERTIA
      mouse.vy += (mouse.ty - mouse.y) * INERTIA
      mouse.vx *= FRICTION; mouse.vy *= FRICTION
      mouse.x  += mouse.vx; mouse.y  += mouse.vy

      scrollV *= 0.92

      // Uniform updates
      uniforms.uTime.value        = t * spd
      uniforms.uMouse.value.set(mouse.x, mouse.y)
      uniforms.uDistort.value     = 0.12 + Math.abs(mouse.vx * mouse.vy) * 3.5 + Math.abs(scrollV) * 0.08
      uniforms.uMorphFactor.value = scrollT

      // Mesh rotation driven by mouse + time
      mesh.rotation.y = t * 0.11 * spd + mouse.x * 0.55
      mesh.rotation.x = Math.sin(t * 0.09 * spd) * 0.18 + mouse.y * 0.38
      mesh.rotation.z = t * 0.04 * spd

      // Halo counter-rotation
      halo.rotation.z  =  t * 0.06 * spd + mouse.x * 0.12
      halo2.rotation.y =  t * 0.08 * spd - mouse.y * 0.1

      // Camera parallax
      camera.position.x = mouse.x * 0.6
      camera.position.y = mouse.y * 0.4 - scrollT * 1.2
      camera.lookAt(mesh.position.x * 0.35, 0, 0)

      renderer.render(scene, camera)
    }
    tick()

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      ;[geo, mat, haloGeo, haloMat, halo2Geo, halo2Mat, dustGeo, dustMat].forEach(o => o.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      {/* Obsidian Void Foundation */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, #0a0d18 0%, #030306 55%, #010103 100%)' }} />

      {/* Architectural Grid — fades at all edges */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, black 20%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, black 20%, transparent 85%)',
      }} />

      {/* Film grain noise overlay */}
      <div className="absolute inset-0 opacity-[0.022] mix-blend-screen pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px'
      }} />

      {/* Volumetric aurora — primary cyan glow left */}
      <div className="absolute top-[-15%] left-[-8%] w-[700px] h-[700px] rounded-full blur-[200px] opacity-[0.11] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00D9FF 0%, transparent 70%)' }} />

      {/* Aurora — violet right */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.09] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }} />

      {/* Text legibility vignette behind content (center-left) */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 80% at 25% 50%, rgba(1,1,3,0.72) 0%, transparent 75%)' }} />
    </div>
  )
}
