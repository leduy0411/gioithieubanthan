import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * VoidSignal — Flagship Three.js Spatial Shader & Flow Field Mesh
 * 
 * Features:
 * - 3D Simplex noise organic vertex displacement
 * - Damped mouse parallax with exponential inertia
 * - Scroll-reactive mesh dilation
 * - Automatic animation throttling when document is hidden / tab switched
 * - Radial dark vignette mask for 100% crisp text readability
 */

const VERTEX_SHADER = /* glsl */`
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;
varying vec3 vWorldPos;

// 3D Simplex Noise
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
  vec4 j = p - 49.*floor(p*ns.z*ns.z);
  vec4 x_ = floor(j*ns.z), y_ = floor(j - 7.*x_);
  vec4 x = x_*ns.x + ns.yyyy;
  vec4 y = y_*ns.x + ns.yyyy;
  vec4 h = 1. - abs(x) - abs(y);
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
  
  vec3 pos = position;
  vec3 noiseSeed = pos * 0.45 + vec3(uMouse * 0.25, uScroll * 0.2);
  float n1 = snoise(noiseSeed + vec3(uTime * 0.12));
  float n2 = snoise(noiseSeed * 2.2 - vec3(uTime * 0.08)) * 0.45;
  
  float displacement = (n1 + n2) * 0.42;
  vDisp = displacement;
  
  vec3 newPosition = position + normal * displacement;
  vWorldPos = (modelMatrix * vec4(newPosition, 1.0)).xyz;
  vec4 mvPos = modelViewMatrix * vec4(newPosition, 1.0);
  vViewDir = normalize(-mvPos.xyz);
  
  gl_Position = projectionMatrix * mvPos;
}
`

const FRAGMENT_SHADER = /* glsl */`
precision highp float;

uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;
varying vec3 vWorldPos;

void main() {
  float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.2);
  
  // Electric Cyan to Obsidian Violet Depth
  vec3 deepVoid = vec3(0.012, 0.015, 0.024);
  vec3 cyanSignal = vec3(0.0, 0.95, 1.0);
  vec3 violetSignal = vec3(0.48, 0.16, 0.85);
  
  vec3 color = mix(deepVoid, violetSignal, clamp(vDisp * 1.5 + 0.3, 0.0, 1.0));
  color = mix(color, cyanSignal, fresnel * 0.75);
  
  float alpha = smoothstep(0.0, 0.85, fresnel * 0.85 + 0.12);
  
  gl_FragColor = vec4(color, alpha * 0.48);
}
`

export default function VoidSignal() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 5.2)

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
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Subdivided Icosahedron Geometry
    const geometry = new THREE.IcosahedronGeometry(2.1, 24)
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(1.4, 0.2, 0) // Shifted to right side of viewport for balance
    scene.add(mesh)

    // Damped Mouse Parallax Tracking
    const mouseTarget = new THREE.Vector2(0, 0)
    const mouseCurrent = new THREE.Vector2(0, 0)

    const handleMouseMove = (e) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let scrollTarget = 0
    let scrollCurrent = 0
    const handleScroll = () => {
      scrollTarget = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)

      // Reposition mesh responsively
      if (w < 1024) {
        mesh.position.set(0, 0, 0)
        mesh.scale.setScalar(0.75)
      } else {
        mesh.position.set(1.4, 0.2, 0)
        mesh.scale.setScalar(1.0)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Throttle GPU when tab is inactive
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

      // Exponential damping for smooth mouse inertia
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.04
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.04
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.05

      uniforms.uTime.value = prefersReducedMotion ? 0 : elapsedTime
      uniforms.uMouse.value.copy(mouseCurrent)
      uniforms.uScroll.value = scrollCurrent

      if (!prefersReducedMotion) {
        mesh.rotation.y = elapsedTime * 0.05 + mouseCurrent.x * 0.25
        mesh.rotation.x = elapsedTime * 0.02 + mouseCurrent.y * 0.15
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      geometry.dispose()
      material.dispose()
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(3,3,6,0.65)_0%,rgba(3,3,6,0.92)_65%,#030306_100%)] pointer-events-none" />
    </div>
  )
}
