import React, { useMemo, useEffect, useRef } from 'react'
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
} from './shaders'

const FRAGMENT_SHADERS = {
  'cryo-obsidian': CRYO_OBSIDIAN_FRAGMENT,
  'luna-argent': LUNA_ARGENT_FRAGMENT,
  'helios-amber': HELIOS_AMBER_FRAGMENT,
  'nebula-giant': NEBULA_GIANT_FRAGMENT,
  'eclipse-horizon': ECLIPSE_HORIZON_FRAGMENT,
} as const

interface PlanetMeshProps {
  profile: StationOrbitalProfile
  opacity?: number
  scaleMultiplier?: number
  time?: number
}

/**
 * Creates and updates a standalone Three.js Planet Object3D with its GLSL material,
 * optional accretion ring, and optional orbiting satellite.
 */
export function createPlanetObject(profile: StationOrbitalProfile) {
  const group = new THREE.Group()

  // 1. Sphere Geometry & Shader Material
  const geometry = new THREE.SphereGeometry(1.6, 64, 64)
  const fragmentShader = FRAGMENT_SHADERS[profile.shaderKey]

  const uniforms = {
    uCrustColor: { value: new THREE.Color(profile.palette.crust) },
    uAtmosphereColor: { value: new THREE.Color(profile.palette.atmosphere) },
    uSunDirection: { value: new THREE.Vector3(1.2, 0.8, 1.0).normalize() },
    uFresnelPower: { value: profile.atmosphere.fresnelPower },
    uTime: { value: 0 },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader: SHARED_VERTEX_SHADER,
    fragmentShader,
    uniforms,
    transparent: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  group.add(mesh)

  // 2. Optional Planetary Ring
  let ringMesh: THREE.Mesh | null = null
  let ringUniforms: Record<string, { value: unknown }> | null = null

  if (profile.ring) {
    const r = profile.ring
    const ringGeo = new THREE.PlaneGeometry(r.outerRadius * 2.2, r.outerRadius * 2.2)
    ringUniforms = {
      uRingColor: { value: new THREE.Color(r.color) },
      uOpacity: { value: r.opacity },
      uInner: { value: 0.28 },
      uOuter: { value: 0.48 },
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

  // 3. Optional Orbiting Satellite
  let satelliteMesh: THREE.Mesh | null = null
  if (profile.satellite) {
    const s = profile.satellite
    const satGeo = new THREE.SphereGeometry(s.radius, 16, 16)
    const satMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(s.color) })
    satelliteMesh = new THREE.Mesh(satGeo, satMat)
    group.add(satelliteMesh)
  }

  // Cleanup helper
  const dispose = () => {
    geometry.dispose()
    material.dispose()
    if (ringMesh) {
      ringMesh.geometry.dispose()
      ;(ringMesh.material as THREE.Material).dispose()
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
    satelliteMesh,
    dispose,
  }
}
