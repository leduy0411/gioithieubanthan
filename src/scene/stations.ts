/**
 * ORBITAL STATIONS REGISTRY
 * src/scene/stations.ts
 *
 * Full mathematical and optical definitions for the 5 distinct celestial bodies.
 * Every planet features unique geometry parameters, camera distance, and GLSL shader routines.
 */

import * as THREE from 'three'

export type PlanetShaderKey =
  | 'cryo-obsidian'
  | 'luna-argent'
  | 'helios-amber'
  | 'nebula-giant'
  | 'eclipse-horizon'

export interface RingDefinition {
  innerRadius: number
  outerRadius: number
  tiltX: number
  tiltY: number
  color: string
  opacity: number
}

export interface SatelliteDefinition {
  radius: number
  orbitRadius: number
  speed: number
  tilt: number
  color: string
}

export interface StationOrbitalProfile {
  id: number
  callsign: string
  sectionId: string
  planetName: string
  shaderKey: PlanetShaderKey
  position: THREE.Vector3
  scale: number
  cameraZ: number
  rotationSpeed: number
  palette: {
    crust: string
    atmosphere: string
    ambient: string
    accent: string
  }
  atmosphere: {
    fresnelPower: number
    glowIntensity: number
    hasAtmosphere: boolean
  }
  ring: RingDefinition | null
  satellite: SatelliteDefinition | null
}

export const STATION_PROFILES: readonly StationOrbitalProfile[] = [
  // ─────────────────────────────────────────────────────────────────
  // 00. STATION INDEX // CRYO-OBSIDIAN
  // ─────────────────────────────────────────────────────────────────
  {
    id: 0,
    callsign: 'STATION 00 // INDEX',
    sectionId: 'home',
    planetName: 'Cryo-Obsidian',
    shaderKey: 'cryo-obsidian',
    position: new THREE.Vector3(1.7, 0.15, -0.4),
    scale: 1.6,
    cameraZ: 6.2,
    rotationSpeed: 0.04,
    palette: {
      crust: '#080d1a',
      atmosphere: '#38bdf8',
      ambient: '#02050e',
      accent: '#38bdf8',
    },
    atmosphere: {
      fresnelPower: 3.2,
      glowIntensity: 1.6,
      hasAtmosphere: true,
    },
    ring: {
      innerRadius: 1.9,
      outerRadius: 2.35,
      tiltX: Math.PI / 2.3,
      tiltY: -0.15,
      color: '#38bdf8',
      opacity: 0.35,
    },
    satellite: null,
  },

  // ─────────────────────────────────────────────────────────────────
  // 01. STATION PROFILE // LUNA ARGENT
  // ─────────────────────────────────────────────────────────────────
  {
    id: 1,
    callsign: 'STATION 01 // PROFILE',
    sectionId: 'about',
    planetName: 'Luna Argent',
    shaderKey: 'luna-argent',
    position: new THREE.Vector3(-1.6, -0.2, -0.7),
    scale: 1.45,
    cameraZ: 5.6, // Closer camera view for quiet crater inspection
    rotationSpeed: 0.015, // Slow lunar tidal lock simulation
    palette: {
      crust: '#060b14',
      atmosphere: '#e2e8f0',
      ambient: '#030509',
      accent: '#e2e8f0',
    },
    atmosphere: {
      fresnelPower: 5.2,
      glowIntensity: 0.65, // No thick atmosphere, subtle specular lunar rim only
      hasAtmosphere: false,
    },
    ring: null,
    satellite: null,
  },

  // ─────────────────────────────────────────────────────────────────
  // 02. STATION SYSTEMS // HELIOS AMBER
  // ─────────────────────────────────────────────────────────────────
  {
    id: 2,
    callsign: 'STATION 02 // SYSTEMS',
    sectionId: 'projects',
    planetName: 'Helios Amber',
    shaderKey: 'helios-amber',
    position: new THREE.Vector3(1.5, -0.15, -0.5),
    scale: 1.55,
    cameraZ: 6.0,
    rotationSpeed: 0.06, // Energetic solar rotation
    palette: {
      crust: '#1a0e03',
      atmosphere: '#f59e0b',
      ambient: '#0a0501',
      accent: '#f59e0b',
    },
    atmosphere: {
      fresnelPower: 2.6,
      glowIntensity: 2.1, // Warm blooming solar corona
      hasAtmosphere: true,
    },
    ring: {
      innerRadius: 2.1,
      outerRadius: 2.8,
      tiltX: Math.PI / 2.2,
      tiltY: 0.2,
      color: '#f59e0b',
      opacity: 0.85,
    },
    satellite: null,
  },

  // ─────────────────────────────────────────────────────────────────
  // 03. STATION EXPERTISE // NEBULA GAS GIANT
  // ─────────────────────────────────────────────────────────────────
  {
    id: 3,
    callsign: 'STATION 03 // EXPERTISE',
    sectionId: 'skills',
    planetName: 'Nebula Gas Giant',
    shaderKey: 'nebula-giant',
    position: new THREE.Vector3(-1.5, 0.15, -0.6),
    scale: 1.5,
    cameraZ: 6.1,
    rotationSpeed: 0.035,
    palette: {
      crust: '#130622',
      atmosphere: '#a855f7',
      ambient: '#06010c',
      accent: '#a855f7',
    },
    atmosphere: {
      fresnelPower: 3.0,
      glowIntensity: 1.8,
      hasAtmosphere: true,
    },
    ring: {
      innerRadius: 2.0,
      outerRadius: 3.1,
      tiltX: Math.PI / 2.5,
      tiltY: -0.3,
      color: '#c084fc',
      opacity: 0.6,
    },
    satellite: {
      radius: 0.12,
      orbitRadius: 2.7,
      speed: 0.8,
      tilt: 0.35,
      color: '#38bdf8',
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 04. STATION SIGNAL // DEEP-SPACE ECLIPSE
  // ─────────────────────────────────────────────────────────────────
  {
    id: 4,
    callsign: 'STATION 04 // SIGNAL',
    sectionId: 'socials',
    planetName: 'Eclipse Horizon',
    shaderKey: 'eclipse-horizon',
    position: new THREE.Vector3(0.0, -1.8, 0.3), // Lower horizon arc
    scale: 2.85, // Monolithic scale spanning the lower screen
    cameraZ: 5.8,
    rotationSpeed: 0.01,
    palette: {
      crust: '#020306',
      atmosphere: '#bfdbfe',
      ambient: '#010103',
      accent: '#bfdbfe',
    },
    atmosphere: {
      fresnelPower: 4.8, // Inverted sharp corona rim
      glowIntensity: 2.4,
      hasAtmosphere: true,
    },
    ring: null,
    satellite: null,
  },
] as const
