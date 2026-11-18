/**
 * 5 DISTINCT CELESTIAL GLSL SHADERS
 * src/scene/shaders.ts
 *
 * Mathematically unique procedural surfaces for each orbital station.
 * Max 3-4 octave fBm/Voronoi to ensure high performance on mobile GPUs (≥55 FPS).
 */

export const SHARED_VERTEX_SHADER = /* glsl */`
precision highp float;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  
  gl_Position = projectionMatrix * mvPosition;
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 00: CRYO-OBSIDIAN (Dark rock + Voronoi ice fracture veins + Cyan Fresnel)
// ─────────────────────────────────────────────────────────────────
export const CRYO_OBSIDIAN_FRAGMENT = /* glsl */`
precision highp float;

uniform vec3 uCrustColor;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunDirection;
uniform float uFresnelPower;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;
varying vec2 vUv;

// 3D hash & Voronoi cellular distance
vec3 hash3(vec3 p) {
  p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
           dot(p, vec3(269.5, 183.3, 246.1)),
           dot(p, vec3(113.5, 271.9, 124.6)));
  return fract(sin(p) * 43758.5453123);
}

float voronoi(vec3 x) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  float minDist = 1.0;
  for (int k = -1; k <= 1; k++) {
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec3 b = vec3(float(i), float(j), float(k));
        vec3 r = vec3(b) - f + hash3(p + b);
        float d = dot(r, r);
        minDist = min(minDist, d);
      }
    }
  }
  return sqrt(minDist);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);
  vec3 sunDir = normalize(uSunDirection);

  float daylight = smoothstep(-0.25, 0.75, dot(normal, sunDir));
  float rim = 1.0 - max(dot(normal, viewDir), 0.0);
  float fresnel = pow(rim, uFresnelPower);

  // Voronoi cracked ice veins
  float cells = voronoi(vWorldPosition * 3.5 + vec3(uTime * 0.015));
  float crack = smoothstep(0.04, 0.09, abs(cells - 0.5));
  float iceVein = 1.0 - crack;

  // Dark obsidian surface with electric cyan glowing cracks
  vec3 obsidian = uCrustColor * (0.8 + cells * 0.4);
  vec3 iceGlow = uAtmosphereColor * iceVein * 1.5;
  vec3 surface = mix(obsidian, iceGlow, iceVein * 0.7);

  vec3 lit = surface * (daylight * 0.9 + 0.1);
  vec3 finalColor = lit + (uAtmosphereColor * fresnel * 1.6);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 01: LUNA ARGENT (Cratered lunar topography + Silver specular reflection)
// ─────────────────────────────────────────────────────────────────
export const LUNA_ARGENT_FRAGMENT = /* glsl */`
precision highp float;

uniform vec3 uCrustColor;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunDirection;
uniform float uFresnelPower;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;
varying vec2 vUv;

// Crater-like cellular noise
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

float crater(vec3 p) {
  float n1 = noise(p * 2.2);
  float n2 = noise(p * 5.4) * 0.5;
  float n3 = noise(p * 11.0) * 0.25;
  float height = (n1 + n2 + n3);
  // Ridge simulation for crater rims
  float craterRim = smoothstep(0.42, 0.48, height) * smoothstep(0.58, 0.52, height);
  return height * 0.6 + craterRim * 0.4;
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);
  vec3 sunDir = normalize(uSunDirection);

  // Sharp stark contrast of airless lunar body
  float nDotL = dot(normal, sunDir);
  float daylight = smoothstep(-0.05, 0.5, nDotL);

  // Subtle silver rim highlight (specular only, no diffuse atmosphere)
  float rim = 1.0 - max(dot(normal, viewDir), 0.0);
  float silverSpecular = pow(rim, uFresnelPower) * smoothstep(0.0, 1.0, nDotL + 0.3);

  float topography = crater(vWorldPosition * 2.5);
  vec3 regolith = uCrustColor * (0.65 + topography * 0.7);

  vec3 finalColor = regolith * daylight + (uAtmosphereColor * silverSpecular * 0.85);
  gl_FragColor = vec4(finalColor, 1.0);
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 02: HELIOS AMBER (Plasma fluid fBm + Domain warping + Warm corona)
// ─────────────────────────────────────────────────────────────────
export const HELIOS_AMBER_FRAGMENT = /* glsl */`
precision highp float;

uniform vec3 uCrustColor;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunDirection;
uniform float uFresnelPower;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;
varying vec2 vUv;

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

// 3-octave Domain Warping for turbulent solar plasma
float plasma(vec3 p) {
  vec3 q = vec3(noise(p + vec3(uTime * 0.04)),
                noise(p + vec3(4.3, 1.2, 8.4) + vec3(uTime * 0.03)),
                noise(p + vec3(1.7, 7.5, 3.1) - vec3(uTime * 0.02)));
  return noise(p + 1.8 * q);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  float rim = 1.0 - max(dot(normal, viewDir), 0.0);
  float fresnel = pow(rim, uFresnelPower);

  float heat = plasma(vWorldPosition * 2.8);
  
  // Solar gradient: Deep amber core -> Radiant gold plasma -> White-hot corona
  vec3 darkPlasma = uCrustColor * 1.2;
  vec3 warmGold = uAtmosphereColor;
  vec3 whiteHot = vec3(1.0, 0.95, 0.85);

  vec3 surface = mix(darkPlasma, warmGold, smoothstep(0.2, 0.75, heat));
  surface = mix(surface, whiteHot, smoothstep(0.75, 0.98, heat));

  // Solar self-illumination (always radiant, high corona bloom)
  vec3 finalColor = surface + (warmGold * fresnel * 2.2);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 03: NEBULA GAS GIANT (Horizontal banded dynamics + Violet-cyan Rayleigh)
// ─────────────────────────────────────────────────────────────────
export const NEBULA_GIANT_FRAGMENT = /* glsl */`
precision highp float;

uniform vec3 uCrustColor;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunDirection;
uniform float uFresnelPower;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;
varying vec2 vUv;

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

  float daylight = smoothstep(-0.2, 0.7, dot(normal, sunDir));
  float rim = 1.0 - max(dot(normal, viewDir), 0.0);
  float fresnel = pow(rim, uFresnelPower);

  // Latitude sinusoidal bands with shear & swirl noise
  float lat = vWorldPosition.y * 3.8;
  float turbulence = noise(vWorldPosition * 3.0 + vec3(uTime * 0.06, 0.0, 0.0)) * 0.65;
  float bands = sin(lat + turbulence * 2.5) * 0.5 + 0.5;

  // Dual violet & cyan atmospheric cloud layers
  vec3 deepViolet = uCrustColor * (0.8 + bands * 0.5);
  vec3 cyanBands = vec3(0.22, 0.74, 0.97); // #38bdf8
  vec3 atmosphereCol = mix(deepViolet, cyanBands, smoothstep(0.35, 0.85, bands) * 0.45);

  vec3 lit = atmosphereCol * (daylight * 0.85 + 0.15);
  vec3 finalColor = lit + (uAtmosphereColor * fresnel * 1.8);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 04: ECLIPSE HORIZON (Pitch-black silhouette + Inverted corona rim)
// ─────────────────────────────────────────────────────────────────
export const ECLIPSE_HORIZON_FRAGMENT = /* glsl */`
precision highp float;

uniform vec3 uCrustColor;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunDirection;
uniform float uFresnelPower;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  // Sharp, razor-thin backlit atmospheric rim
  float rim = 1.0 - max(dot(normal, viewDir), 0.0);
  float corona = pow(rim, uFresnelPower);

  // Monolithic eclipse: interior is pitch-black space
  vec3 voidBlack = uCrustColor;
  vec3 haloGlow = uAtmosphereColor;

  // Corona light spill around edges
  vec3 finalColor = mix(voidBlack, haloGlow, corona * 1.4);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

// ─────────────────────────────────────────────────────────────────
// ACCRETION DISK / PLANETARY RING SHADER
// ─────────────────────────────────────────────────────────────────
export const RING_VERTEX_SHADER = /* glsl */`
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

export const RING_FRAGMENT_SHADER = /* glsl */`
precision highp float;
uniform vec3 uRingColor;
uniform float uOpacity;
uniform float uInner;
uniform float uOuter;
varying vec2 vUv;

void main() {
  float dist = distance(vUv, vec2(0.5, 0.5));
  if (dist < uInner || dist > uOuter) discard;

  // Concentric orbital dust rings
  float rings = sin(dist * 160.0) * 0.5 + 0.5;
  float alpha = smoothstep(uInner, uInner + 0.04, dist) *
                smoothstep(uOuter, uOuter - 0.04, dist) * uOpacity;

  vec3 col = uRingColor * (0.65 + rings * 0.45);
  gl_FragColor = vec4(col, alpha * 0.7);
}
`
