import * as THREE from 'three'
import { StationOrbitalProfile } from './stations'
import {
  SHARED_VERTEX_SHADER,
  CRYO_OBSIDIAN_FRAGMENT,
  LUNA_ARGENT_FRAGMENT,
  HELIOS_AMBER_FRAGMENT,
  NEBULA_GIANT_FRAGMENT,
  ECLIPSE_HORIZON_FRAGMENT,
  RING_VERTEX_SHADER,
  RING_FRAGMENT_SHADER,
  HALO_VERTEX_SHADER,
  HALO_FRAGMENT_SHADER,
} from './shaders'

const FRAGMENT_SHADERS = {
  'cryo-obsidian': CRYO_OBSIDIAN_FRAGMENT,
  'luna-argent': LUNA_ARGENT_FRAGMENT,
  'helios-amber': HELIOS_AMBER_FRAGMENT,
  'nebula-giant': NEBULA_GIANT_FRAGMENT,
  'eclipse-horizon': ECLIPSE_HORIZON_FRAGMENT,
} as const

/**
 * Creates and updates a standalone Three.js Planet Object3D with its GLSL material,
 * optional accretion ring, corona halo shell, and optional orbiting satellite.
 */
export function createPlanetObject(profile: StationOrbitalProfile) {
  const group = new THREE.Group()

  // Shared time uniform object so updating uniforms.uTime.value updates planet, ring, and halo together
  const sharedTimeUniform = { value: 0 }

  // 1. High-subdivision Sphere Geometry (96x96) for silky-smooth Fresnel rims & silhouettes
  const PLANET_RADIUS = 1.6
  const geometry = new THREE.SphereGeometry(PLANET_RADIUS, 96, 96)
  const fragmentShader = FRAGMENT_SHADERS[profile.shaderKey]

  const uniforms = {
    uCrustColor: { value: new THREE.Color(profile.palette.crust) },
    uAtmosphereColor: { value: new THREE.Color(profile.palette.atmosphere) },
    uSunDirection: { value: new THREE.Vector3(1.25, 0.72, 0.85).normalize() },
    uFresnelPower: { value: profile.atmosphere.fresnelPower },
    uTime: sharedTimeUniform,
    uOpacity: { value: 1.0 },
    uBrightness: { value: 1.0 },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader: SHARED_VERTEX_SHADER,
    fragmentShader,
    uniforms,
    transparent: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  group.add(mesh)

  // 2. Volumetric Corona Halo Shell for Eclipse Horizon (Station 04) & Helios Amber (Station 02)
  let coronaMesh: THREE.Mesh | null = null
  if (profile.shaderKey === 'eclipse-horizon' || profile.shaderKey === 'helios-amber') {
    const isEclipse = profile.shaderKey === 'eclipse-horizon'
    const shellScale = isEclipse ? 1.24 : 1.22
    const coronaGeo = new THREE.SphereGeometry(PLANET_RADIUS * shellScale, 64, 64)
    const coronaMat = new THREE.ShaderMaterial({
      vertexShader: HALO_VERTEX_SHADER,
      fragmentShader: HALO_FRAGMENT_SHADER,
      uniforms: {
        uPlanetRadius: { value: PLANET_RADIUS },
        uColor: { value: new THREE.Color(profile.palette.atmosphere) },
        uCoreColor: { value: new THREE.Color(isEclipse ? '#FFFFFF' : '#FFFBEB') },
        uOpacity: { value: isEclipse ? 0.92 : 0.65 },
        uTime: sharedTimeUniform,
        uShellScale: { value: shellScale },
        uFalloff: { value: isEclipse ? 4.8 : 3.6 },
        uIntensity: { value: isEclipse ? 1.55 : 1.15 },
        uDiamond: { value: isEclipse ? 1.0 : 0.0 },
        uStreamers: { value: 1.0 },
      },
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    coronaMesh = new THREE.Mesh(coronaGeo, coronaMat)
    group.add(coronaMesh)
  }

  // 3. Optional Planetary Ring with Cassini Divisions & Particle Shimmer
  let ringMesh: THREE.Mesh | null = null
  let ringUniforms: Record<string, { value: unknown }> | null = null

  if (profile.ring) {
    const r = profile.ring
    const ringGeo = new THREE.PlaneGeometry(r.outerRadius * 2.2, r.outerRadius * 2.2)
    const isSolarRing = profile.shaderKey === 'helios-amber'
    const isCryoRing = profile.shaderKey === 'cryo-obsidian'

    ringUniforms = {
      uRingColor: { value: new THREE.Color(r.color) },
      uOpacity: { value: r.opacity },
      uInner: { value: 0.27 },
      uOuter: { value: 0.48 },
      uTime: sharedTimeUniform,
      uSeed: { value: profile.id * 7.13 + 1.0 },
      uGapStrength: { value: isSolarRing ? 0.92 : isCryoRing ? 0.72 : 0.85 },
      uShimmer: { value: isSolarRing ? 1.25 : 0.85 },
      uBandFreq: { value: isSolarRing ? 22.0 : isCryoRing ? 18.0 : 16.0 },
    }

    const ringMat = new THREE.ShaderMaterial({
      vertexShader: RING_VERTEX_SHADER,
      fragmentShader: RING_FRAGMENT_SHADER,
      uniforms: ringUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = r.tiltX
    ringMesh.rotation.y = r.tiltY
    group.add(ringMesh)
  }

  // 4. Optional Orbiting Satellite (Station 03)
  let satelliteMesh: THREE.Mesh | null = null
  if (profile.satellite) {
    const s = profile.satellite
    const satGeo = new THREE.SphereGeometry(s.radius, 24, 24)
    const satMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(s.color) })
    satelliteMesh = new THREE.Mesh(satGeo, satMat)
    group.add(satelliteMesh)
  }

  // Helper to update opacity across sphere, ring, corona, and satellite
  const setOpacity = (alpha: number, brightness = 1.0) => {
    uniforms.uOpacity.value = alpha
    uniforms.uBrightness.value = brightness
    if (ringMesh && ringUniforms) {
      ringUniforms.uOpacity.value = (profile.ring?.opacity ?? 0) * alpha
    }
    if (coronaMesh) {
      const baseCorona = profile.shaderKey === 'eclipse-horizon' ? 0.92 : 0.65
      ;(coronaMesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
        baseCorona * alpha * brightness
    }
    if (satelliteMesh) {
      const satMat = satelliteMesh.material as THREE.MeshBasicMaterial
      satMat.transparent = true
      satMat.opacity = alpha
    }
  }

  // Cleanup helper
  const dispose = () => {
    geometry.dispose()
    material.dispose()
    if (ringMesh) {
      ringMesh.geometry.dispose()
      ;(ringMesh.material as THREE.Material).dispose()
    }
    if (coronaMesh) {
      coronaMesh.geometry.dispose()
      ;(coronaMesh.material as THREE.Material).dispose()
    }
    if (satelliteMesh) {
      satelliteMesh.geometry.dispose()
      ;(satelliteMesh.material as THREE.Material).dispose()
    }
  }

  return {
    group,
    mesh,
    material,
    uniforms,
    ringMesh,
    ringUniforms,
    coronaMesh,
    satelliteMesh,
    setOpacity,
    dispose,
  }
}
