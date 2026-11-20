/**
 * 5 DISTINCT CELESTIAL GLSL SHADERS — CINEMATIC PIPELINE
 * src/scene/shaders.ts
 *
 * Rendering contract (Three.js r174, WebGL2 / GLSL ES 3.00 via ShaderMaterial):
 * - All lighting math is done in LINEAR space. Hard-coded palette hex values are
 *   converted with toLinear(); THREE.Color uniforms are already linear.
 * - Every fragment shader ends with <tonemapping_fragment> + <colorspace_fragment>
 *   so output goes through renderer.toneMapping (ACES Filmic) and sRGB encoding.
 * - Surface noise is sampled in OBJECT space (normalized vObjPos), so features stay
 *   locked to the planet while it translates (parallax / transitions) and spins.
 * - Lighting is evaluated in VIEW space (vNormal, vViewPos, uSunDirection).
 * - LOW_QUALITY define (mobile / low-power) trims octaves and secondary passes.
 * - Interface preserved: uCrustColor, uAtmosphereColor, uSunDirection,
 *   uFresnelPower, uTime, uOpacity, uBrightness.
 */

// ─────────────────────────────────────────────────────────────────
// SHARED GLSL LIBRARY (hash, gradient noise, fBm, Voronoi edge, rotation)
// ─────────────────────────────────────────────────────────────────
const GLSL_COMMON = /* glsl */ `
precision highp float;

#ifndef PI
#define PI 3.141592653589793
#endif

// sRGB hex triplet (0..1) -> linear working space
vec3 toLinear(vec3 c) {
  return pow(c, vec3(2.2));
}

// Sine-free hashes (Dave Hoskins) - stable across GPUs, no precision banding
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yxx) * p3.zyx);
}

// 3D gradient noise with quintic interpolation, range ~[-0.85, 0.85]
float gnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 w = fract(x);
  vec3 u = w * w * w * (w * (w * 6.0 - 15.0) + 10.0);

  float n000 = dot(hash33(i) * 2.0 - 1.0, w);
  float n100 = dot(hash33(i + vec3(1.0, 0.0, 0.0)) * 2.0 - 1.0, w - vec3(1.0, 0.0, 0.0));
  float n010 = dot(hash33(i + vec3(0.0, 1.0, 0.0)) * 2.0 - 1.0, w - vec3(0.0, 1.0, 0.0));
  float n110 = dot(hash33(i + vec3(1.0, 1.0, 0.0)) * 2.0 - 1.0, w - vec3(1.0, 1.0, 0.0));
  float n001 = dot(hash33(i + vec3(0.0, 0.0, 1.0)) * 2.0 - 1.0, w - vec3(0.0, 0.0, 1.0));
  float n101 = dot(hash33(i + vec3(1.0, 0.0, 1.0)) * 2.0 - 1.0, w - vec3(1.0, 0.0, 1.0));
  float n011 = dot(hash33(i + vec3(0.0, 1.0, 1.0)) * 2.0 - 1.0, w - vec3(0.0, 1.0, 1.0));
  float n111 = dot(hash33(i + vec3(1.0, 1.0, 1.0)) * 2.0 - 1.0, w - vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);
  float nxy0 = mix(nx00, nx10, u.y);
  float nxy1 = mix(nx01, nx11, u.y);
  return mix(nxy0, nxy1, u.z);
}

// Octave rotation breaks axis-aligned lattice artifacts between octaves
const mat3 OCTAVE_ROT = mat3(
   0.00,  0.80,  0.60,
  -0.80,  0.36, -0.48,
  -0.60, -0.48,  0.64
);

// Normalized fBm, range ~[-0.6, 0.6] (typical +-0.35)
float fbm(vec3 p, int octaves, float lacunarity, float gain) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    sum += amp * gnoise(p);
    norm += amp;
    p = OCTAVE_ROT * p * lacunarity;
    amp *= gain;
  }
  return sum / norm;
}

// 3D Voronoi with EXACT edge distance (perpendicular distance to the F1/F2
// bisector plane) - the geometrically correct form of the F2 - F1 edge metric.
// Returns vec3(edgeDistance, F1, cellId).
vec3 voronoiEdge(vec3 x) {
  vec3 n = floor(x);
  vec3 w = fract(x);
  vec3 mg = vec3(0.0);
  vec3 mr = vec3(0.0);
  float md = 8.0;

  for (int k = -1; k <= 1; k++) {
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec3 g = vec3(float(i), float(j), float(k));
        vec3 r = g + hash33(n + g) - w;
        float d = dot(r, r);
        if (d < md) {
          md = d;
          mr = r;
          mg = g;
        }
      }
    }
  }

  float ed = 8.0;
  for (int k = -1; k <= 1; k++) {
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec3 g = mg + vec3(float(i), float(j), float(k));
        vec3 r = g + hash33(n + g) - w;
        vec3 diff = r - mr;
        float len2 = dot(diff, diff);
        if (len2 > 0.00001) {
          ed = min(ed, dot(0.5 * (mr + r), diff * inversesqrt(len2)));
        }
      }
    }
  }

  return vec3(ed, sqrt(md), hash13(n + mg));
}

// Rodrigues rotation of v around a unit axis
vec3 rotateAxis(vec3 v, vec3 axis, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);
}
`

const PLANET_INTERFACE = /* glsl */ `
uniform vec3 uCrustColor;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunDirection;
uniform float uFresnelPower;
uniform float uTime;
uniform float uOpacity;
uniform float uBrightness;

varying vec3 vNormal;
varying vec3 vObjPos;
varying vec3 vViewPos;
`

const OUTPUT_CHUNKS = /* glsl */ `
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
`

// ─────────────────────────────────────────────────────────────────
// SHARED PLANET VERTEX SHADER
// ─────────────────────────────────────────────────────────────────
export const SHARED_VERTEX_SHADER = /* glsl */ `
precision highp float;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPosition;
varying vec2 vUv;
varying vec3 vObjPos;
varying vec3 vViewPos;

void main() {
  vUv = uv;
  vObjPos = position;
  vNormal = normalize(normalMatrix * normal);

  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mvPosition.xyz;
  vViewDir = normalize(-mvPosition.xyz);

  gl_Position = projectionMatrix * mvPosition;
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 00: CRYO-OBSIDIAN
// Domain-warped exact Voronoi edge fissures + glossy faceted obsidian plates
// ─────────────────────────────────────────────────────────────────
export const CRYO_OBSIDIAN_FRAGMENT = /* glsl */ `
${GLSL_COMMON}
${PLANET_INTERFACE}

#ifdef LOW_QUALITY
  #define CRYO_WARP_OCTAVES 3
#else
  #define CRYO_WARP_OCTAVES 4
#endif

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(uSunDirection);
  vec3 p = normalize(vObjPos);

  float NdotL = dot(N, L);
  float NdotV = clamp(dot(N, V), 0.0, 1.0);
  // Hard, cinematic terminator with almost no ambient wrap
  float day = smoothstep(-0.03, 0.24, NdotL);

  // 1. Domain-warped tectonic coordinate field
  vec3 wp = p * 2.4;
  vec3 warp = vec3(
    fbm(wp + vec3(0.0, 0.0, uTime * 0.006), CRYO_WARP_OCTAVES, 2.03, 0.5),
    fbm(wp + vec3(5.2, 1.3, 2.8), CRYO_WARP_OCTAVES, 2.03, 0.5),
    fbm(wp + vec3(1.7, 9.2, 4.1), CRYO_WARP_OCTAVES, 2.03, 0.5)
  );
  vec3 q = p * 3.6 + warp * 1.25;

  // 2. High-frequency jitter turns smooth cell borders into jagged fractures
  vec3 jag = vec3(
    gnoise(p * 23.0),
    gnoise(p * 23.0 + vec3(7.1, 2.3, 5.9)),
    gnoise(p * 23.0 + vec3(13.7, 9.4, 1.2))
  );
  q += jag * 0.07;

  vec3 vor = voronoiEdge(q);
  float edge = vor.x;
  float cellId = vor.z;

  // Razor-thin, anti-aliased fissure core + tight glow + wide faint halo
  float edgeAA = fwidth(edge);
  float fissureCore = 1.0 - smoothstep(0.0, 0.010 + edgeAA * 1.2, edge);
  float fissureGlow = exp(-edge * 24.0);
  float fissureHalo = exp(-edge * 7.5) * 0.22;

  // Secondary hairline micro-fractures (high quality only)
  float hairline = 0.0;
#ifndef LOW_QUALITY
  vec3 vor2 = voronoiEdge(q * 2.3 + vec3(3.1, 7.7, 1.9));
  float edge2AA = fwidth(vor2.x);
  hairline = (1.0 - smoothstep(0.0, 0.006 + edge2AA * 1.2, vor2.x)) * 0.55 + exp(-vor2.x * 42.0) * 0.18;
  hairline *= smoothstep(0.1, 0.5, gnoise(q * 0.9 + vec3(4.0)) + 0.35);
#endif

  // Energy varies along the fissure network so it never reads as a uniform mesh
  float energy = 0.55 + 0.45 * smoothstep(-0.35, 0.45, gnoise(q * 1.4 + vec3(0.0, uTime * 0.04, 0.0)));

  vec3 iceGlow = toLinear(vec3(0.2196, 0.7412, 0.9725)); // #38BDF8
  vec3 iceCore = toLinear(vec3(0.8784, 0.9490, 0.9961)); // #E0F2FE
  vec3 emissive = iceGlow * (fissureGlow * 1.7 + fissureHalo + hairline) * energy
                + iceCore * fissureCore * 3.4 * energy;

  // 3. Glossy volcanic obsidian plates
  vec3 rockDark = toLinear(vec3(0.0157, 0.0275, 0.0588)); // #04070F
  vec3 rockLit = toLinear(vec3(0.1137, 0.1451, 0.2000));  // #1D2533
  float grain = fbm(p * 19.0, 3, 2.1, 0.5);
  float plateTone = clamp(0.25 + cellId * 0.55 + grain * 0.6, 0.0, 1.0);
  vec3 albedo = mix(rockDark, rockLit, plateTone);

  // Each plate is a slightly tilted facet -> scattered micro-specular glints
  vec3 facetTilt = (hash33(vec3(cellId * 113.1, cellId * 37.7, cellId * 71.3)) - 0.5) * 0.42;
  vec3 Np = normalize(N + facetTilt + jag * 0.05);

  const float SUN = 3.1;
  float diffuse = max(dot(Np, L), 0.0) * day;

  vec3 H = normalize(L + V);
  float NdotH = max(dot(Np, H), 0.0);
  float VdotH = max(dot(V, H), 0.0);
  float schlick = 0.05 + 0.95 * pow(1.0 - VdotH, 5.0);
  // Energy-normalized Blinn-Phong: sharp glassy lobe + broad satin sheen
  float glossy = pow(NdotH, 160.0) * (168.0 / (8.0 * PI));
  float sheen = pow(NdotH, 22.0) * (30.0 / (8.0 * PI)) * 0.18;
  vec3 specTint = toLinear(vec3(0.78, 0.88, 1.0));
  vec3 specular = specTint * (glossy + sheen) * schlick * diffuse * SUN * (1.0 - fissureCore);

  vec3 space = toLinear(vec3(0.0078, 0.0157, 0.0392)); // #02040A
  vec3 color = space * (1.0 - day) + albedo * diffuse * SUN;
  color += specular;
  // Fissures are self-luminous: dimmer, but still alive on the night side
  color += emissive * mix(0.4, 1.0, day);

  // 4. Thin Fresnel atmospheric rim, strongest on the sunward limb
  float rim = pow(1.0 - NdotV, uFresnelPower * 1.6);
  float rimSun = smoothstep(-0.35, 0.55, NdotL);
  color += uAtmosphereColor * rim * (0.08 + 1.5 * rimSun);

  gl_FragColor = vec4(color * uBrightness, uOpacity);
${OUTPUT_CHUNKS}
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 01: LUNA ARGENT
// 6-octave regolith fBm + multi-scale crater SDFs + dFdx/dFdy bump normals
// ─────────────────────────────────────────────────────────────────
export const LUNA_ARGENT_FRAGMENT = /* glsl */ `
${GLSL_COMMON}
${PLANET_INTERFACE}

#ifdef LOW_QUALITY
  #define LUNA_OCTAVES 4
#else
  #define LUNA_OCTAVES 6
#endif

// One crater layer: jittered 3D cells, each optionally holding a circular crater
// with a flat dark floor, a raised bright rim and a soft ejecta skirt.
void craterField(vec3 p, float freq, float depthScale, float density,
                 inout float height, inout float bowl, inout float rimMask) {
  vec3 x = p * freq;
  vec3 n = floor(x);
  vec3 w = fract(x);

  for (int k = -1; k <= 1; k++) {
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec3 g = vec3(float(i), float(j), float(k));
        vec3 cell = n + g;
        vec3 rnd = hash33(cell + vec3(freq * 17.31, freq * 3.17, freq * 11.7));
        if (rnd.x > density) continue;

        vec3 jitter = 0.2 + 0.6 * hash33(cell * 1.37 + vec3(4.1, 9.3, 2.7));
        vec3 toCenter = g + jitter - w;
        float radius = mix(0.16, 0.40, rnd.y * rnd.y);
        float d = length(toCenter) / radius;
        if (d > 1.8) continue;

        float floorShape = 1.0 - smoothstep(0.42, 1.0, d);
        float rimShape = exp(-((d - 1.0) * (d - 1.0)) / 0.028);
        float ejecta = (1.0 - smoothstep(1.0, 1.8, d)) * step(1.0, d) * 0.10;
        float depth = depthScale * mix(0.75, 1.2, rnd.z);

        height += (rimShape * 0.42 + ejecta - floorShape * 0.9) * depth;
        bowl = max(bowl, floorShape * mix(0.55, 1.0, rnd.z));
        rimMask = max(rimMask, rimShape);
      }
    }
  }
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(uSunDirection);
  vec3 p = normalize(vObjPos);

  // 1. Heightfield: three crater generations + 6-octave regolith
  float height = 0.0;
  float bowl = 0.0;
  float rimMask = 0.0;
  craterField(p, 3.1, 1.0, 0.55, height, bowl, rimMask);
  craterField(p, 7.4, 0.46, 0.5, height, bowl, rimMask);
#ifndef LOW_QUALITY
  craterField(p, 16.8, 0.21, 0.45, height, bowl, rimMask);
#endif
  float regolith = fbm(p * 3.0, LUNA_OCTAVES, 2.02, 0.52);
  height += regolith * 0.55;

  // 2. Albedo: subtle maria, darker bowls, brighter rims (no ink blotches)
  float maria = smoothstep(-0.12, 0.22, fbm(p * 1.45 + vec3(2.7), 4, 2.0, 0.5));
  float albedo = mix(0.70, 1.0, maria);
  albedo *= mix(1.0, 0.82, bowl);
  albedo *= 1.0 + rimMask * 0.16;
  albedo *= 0.92 + 0.16 * (regolith * 0.5 + 0.5);

  // 3. Screen-space perturbed normal (Mikkelsen surface-gradient bump mapping)
  float bumpHeight = height * 0.045;
  vec3 dpdx = dFdx(vViewPos);
  vec3 dpdy = dFdy(vViewPos);
  float dhdx = dFdx(bumpHeight);
  float dhdy = dFdy(bumpHeight);
  vec3 r1 = cross(dpdy, N);
  vec3 r2 = cross(N, dpdx);
  float det = dot(dpdx, r1);
  vec3 surfGrad = sign(det) * (dhdx * r1 + dhdy * r2);
  vec3 Nb = abs(det) > 1e-12 ? normalize(abs(det) * N - surfGrad) : N;

  // 4. Lighting: Lambert blended with Lommel-Seeliger (lunar regolith law)
  float NdotLg = dot(N, L);
  float mu0 = max(dot(Nb, L), 0.0);
  float mu = max(dot(Nb, V), 0.05);
  float lommel = min(2.0 * mu0 / (mu0 + mu), 1.6);
  float diffuse = mix(mu0, lommel, 0.4);
  // Geometric terminator mask lets sun-facing crater rims glint just past the line
  float terminator = smoothstep(-0.14, 0.10, NdotLg);
  float light = diffuse * terminator;

  vec3 litCol = toLinear(vec3(0.7961, 0.8353, 0.8824));    // #CBD5E1
  vec3 shadowCol = toLinear(vec3(0.0353, 0.0510, 0.0863)); // #090D16
  vec3 space = toLinear(vec3(0.0078, 0.0157, 0.0392));     // #02040A

  float hemi = smoothstep(-0.22, 0.06, NdotLg);
  vec3 color = mix(space, shadowCol * 0.6, hemi);
  color += litCol * albedo * light * 1.3;

  // 5. Subtle cold lunar rim (airless body: thin, sun-weighted)
  float NdotV = clamp(dot(N, V), 0.0, 1.0);
  float rim = pow(1.0 - NdotV, uFresnelPower * 1.6);
  color += uAtmosphereColor * rim * (0.04 + 0.55 * smoothstep(-0.2, 0.5, NdotLg));

  gl_FragColor = vec4(color * uBrightness, uOpacity);
${OUTPUT_CHUNKS}
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 02: HELIOS AMBER (self-luminous)
// 5-octave warped plasma + ridged filaments + Voronoi granulation + sunspots,
// blackbody ramp, quadratic limb darkening, thin chromosphere
// ─────────────────────────────────────────────────────────────────
export const HELIOS_AMBER_FRAGMENT = /* glsl */ `
${GLSL_COMMON}
${PLANET_INTERFACE}

#ifdef LOW_QUALITY
  #define HELIOS_OCTAVES 4
#else
  #define HELIOS_OCTAVES 5
#endif

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPos);
  vec3 p = normalize(vObjPos);
  float mu = clamp(dot(N, V), 0.0, 1.0);
  float t = uTime;

  // 1. Two-level domain warp (convective plasma currents)
  vec3 sp = p * 2.3;
  vec3 warp = vec3(
    fbm(sp + vec3(0.0, 0.0, t * 0.035), 3, 2.0, 0.5),
    fbm(sp + vec3(5.2, 1.3, -t * 0.03), 3, 2.0, 0.5),
    fbm(sp + vec3(9.1, 4.7, t * 0.025), 3, 2.0, 0.5)
  );
  vec3 r = p * 4.2 + warp * 2.4;
  float plasma = fbm(r + vec3(t * 0.02), HELIOS_OCTAVES, 2.11, 0.55);

  // 2. Ridged magnetic filaments
  float filament = clamp(1.0 - abs(gnoise(r * 2.6 + warp * 1.8) * 1.9), 0.0, 1.0);
  filament = pow(filament, 7.0);

  // 3. Granulation: bright convection cells, razor-thin dark intergranular lanes
  vec3 gran = voronoiEdge(p * 28.0 + warp * 0.8 + vec3(0.0, t * 0.05, 0.0));
  float laneAA = fwidth(gran.x);
  float lanes = smoothstep(0.0, 0.07 + laneAA, gran.x);
  float granule = lanes * (1.0 - gran.y * 0.55);

  // 4. Sunspots (umbra + penumbra)
  float spotField = gnoise(p * 1.8 + vec3(3.3, 1.1, t * 0.004));
  float penumbra = smoothstep(0.24, 0.36, spotField);
  float umbra = smoothstep(0.36, 0.44, spotField);

  float heat = 0.5 + plasma * 1.45 + filament * 0.32 + (granule - 0.5) * 0.30;
  heat = clamp(heat, 0.0, 1.0);
  heat *= 1.0 - penumbra * 0.45;
  heat *= 1.0 - umbra * 0.88;

  // 5. Crisp blackbody ramp
  vec3 cUmbra = toLinear(vec3(0.1216, 0.0314, 0.0000)); // #1F0800
  vec3 cMagma = toLinear(vec3(0.7059, 0.3255, 0.0353)); // #B45309
  vec3 cAmber = toLinear(vec3(0.9608, 0.6196, 0.0431)); // #F59E0B
  vec3 cWhite = toLinear(vec3(1.0000, 0.9843, 0.9216)); // #FFFBEB
  vec3 ramp = mix(cUmbra, cMagma, smoothstep(0.08, 0.38, heat));
  ramp = mix(ramp, cAmber, smoothstep(0.38, 0.66, heat));
  ramp = mix(ramp, cWhite, smoothstep(0.72, 0.94, heat));
  float emission = mix(0.6, 3.2, smoothstep(0.2, 1.0, heat)); // HDR for ACES

  // 6. Quadratic limb darkening with reddening toward the edge
  float oneMinusMu = 1.0 - mu;
  float limb = clamp(1.0 - 0.6 * oneMinusMu - 0.18 * oneMinusMu * oneMinusMu, 0.0, 1.0);
  vec3 limbTint = mix(vec3(1.0, 0.5, 0.22), vec3(1.0), smoothstep(0.0, 0.55, mu));
  vec3 color = ramp * emission * limb * limbTint;

  // 7. Thin, intense chromosphere rim
  float chromo = pow(oneMinusMu, 16.0);
  float chromoFlicker = 0.75 + 0.25 * gnoise(p * 11.0 + vec3(0.0, 0.0, t * 0.3));
  vec3 chromoCol = mix(toLinear(vec3(1.0, 0.36, 0.12)), uAtmosphereColor, 0.35);
  color += chromoCol * chromo * 7.0 * chromoFlicker;

  gl_FragColor = vec4(color * uBrightness, uOpacity);
${OUTPUT_CHUNKS}
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 03: NEBULA GAS GIANT
// Differential zonal jets, Rodrigues storm vortices, warped eddies, banded decks
// ─────────────────────────────────────────────────────────────────
export const NEBULA_GIANT_FRAGMENT = /* glsl */ `
${GLSL_COMMON}
${PLANET_INTERFACE}

#ifdef LOW_QUALITY
  #define GIANT_WARP_OCTAVES 3
  #define GIANT_EDDY_OCTAVES 4
#else
  #define GIANT_WARP_OCTAVES 4
  #define GIANT_EDDY_OCTAVES 5
#endif

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(uSunDirection);
  vec3 p = normalize(vObjPos);
  float lat = p.y;

  // 1. Differential rotation: alternating prograde / retrograde jets
  float jet = sin(lat * 19.0) * 0.65 + sin(lat * 7.0 + 1.3) * 0.35;
  float spin = uTime * 0.025 * jet;
  float cs = cos(spin);
  float sn = sin(spin);
  vec3 pr = vec3(cs * p.x - sn * p.z, p.y, sn * p.x + cs * p.z);

  // 2. Great storm vortex + a smaller counter-rotating eddy
  vec3 stormCenter = normalize(vec3(0.58, -0.34, 0.74));
  float stormDist = distance(pr, stormCenter);
  pr = rotateAxis(pr, stormCenter, 4.6 * exp(-(stormDist * stormDist) / 0.016));

  vec3 eddyCenter = normalize(vec3(-0.45, 0.28, 0.85));
  float eddyDist = distance(pr, eddyCenter);
  pr = rotateAxis(pr, eddyCenter, -3.2 * exp(-(eddyDist * eddyDist) / 0.006));

  // 3. Horizontally stretched warped turbulence (curl-like swirls)
  vec3 sq = pr * vec3(2.1, 8.5, 2.1);
  vec3 warp = vec3(
    fbm(sq + vec3(0.0, 0.0, uTime * 0.008), GIANT_WARP_OCTAVES, 2.0, 0.5),
    fbm(sq + vec3(4.1, 2.7, 1.9), GIANT_WARP_OCTAVES, 2.0, 0.5),
    fbm(sq + vec3(7.3, 5.1, 3.3), GIANT_WARP_OCTAVES, 2.0, 0.5)
  );
  vec3 sq2 = pr * vec3(3.2, 15.0, 3.2) + warp * 1.6;
  float eddy = fbm(sq2, GIANT_EDDY_OCTAVES, 2.07, 0.52);

  // 4. Banded cloud decks (coarse belts + anti-aliased fine striations)
  float bandCoord = lat * 10.5 + eddy * 2.6 + warp.x * 1.1;
  float bands = sin(bandCoord) * 0.5 + 0.5;
  float finePhase = lat * 46.0 + eddy * 6.0 + warp.y * 2.0;
  float fineBands = sin(finePhase) * 0.5 + 0.5;
  fineBands = mix(fineBands, 0.5, clamp(fwidth(finePhase) * 0.6, 0.0, 1.0));
  float deck = clamp(bands * 0.72 + fineBands * 0.28, 0.0, 1.0);

  vec3 cDeep = toLinear(vec3(0.0588, 0.0275, 0.1255));  // #0F0720
  vec3 cRoyal = toLinear(vec3(0.4275, 0.1569, 0.8510)); // #6D28D9
  vec3 cNeon = toLinear(vec3(0.6588, 0.3333, 0.9686));  // #A855F7
  vec3 cCyan = toLinear(vec3(0.4039, 0.9098, 0.9765));  // #67E8F9
  vec3 cLilac = toLinear(vec3(0.9137, 0.8353, 1.0000)); // #E9D5FF

  vec3 cloud = mix(cDeep, cRoyal, smoothstep(0.12, 0.55, deck));
  cloud = mix(cloud, cNeon, smoothstep(0.62, 0.93, deck));

  // Faint cyan highlights riding the jet cores
  float jetCore = pow(clamp(1.0 - abs(sin(lat * 19.0)), 0.0, 1.0), 10.0);
  cloud = mix(cloud, cCyan, smoothstep(0.22, 0.42, eddy) * jetCore * 0.45);

  // Lilac storm collar + dark indigo eye
  float ringOffset = (stormDist - 0.12) / 0.028;
  float stormRing = exp(-ringOffset * ringOffset);
  float stormCore = exp(-(stormDist * stormDist) / 0.004);
  cloud = mix(cloud, cLilac, stormRing * 0.5);
  cloud = mix(cloud, cDeep * 1.4, stormCore * 0.6);

  // 5. Dramatic day/night terminator
  float NdotL = dot(N, L);
  float NdotV = clamp(dot(N, V), 0.0, 1.0);
  float day = smoothstep(-0.02, 0.30, NdotL);
  float diffuse = max(NdotL, 0.0);
  float volume = mix(0.5, 1.0, pow(NdotV, 0.4)); // cloud-deck limb darkening
  const float SUN = 2.3;

  vec3 space = toLinear(vec3(0.0078, 0.0157, 0.0392)); // #02040A
  vec3 color = space * (1.0 - day) + cloud * (0.18 + 0.82 * diffuse) * day * volume * SUN;

  // 6. Glowing violet Fresnel atmospheric arc (forward-scatter weighted)
  float rim = pow(1.0 - NdotV, uFresnelPower * 1.3);
  float scatter = smoothstep(-0.32, 0.5, NdotL);
  color += uAtmosphereColor * rim * (0.05 + 1.7 * scatter);

  gl_FragColor = vec4(color * uBrightness, uOpacity);
${OUTPUT_CHUNKS}
}
`

// ─────────────────────────────────────────────────────────────────
// SHADER 04: ECLIPSE HORIZON
// Pitch-black silhouette + razor inner limb plasma + diamond-ring crest
// (outer halo is rendered by HALO_* shell shaders in PlanetMesh)
// ─────────────────────────────────────────────────────────────────
export const ECLIPSE_HORIZON_FRAGMENT = /* glsl */ `
${GLSL_COMMON}
${PLANET_INTERFACE}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPos);
  float NdotV = clamp(dot(N, V), 0.0, 1.0);
  float edgeFactor = 1.0 - NdotV;

  vec3 space = toLinear(vec3(0.0078, 0.0157, 0.0392)); // #02040A

  // Angular position along the limb (view-space) drives the plasma shimmer
  vec2 limbDir = N.xy / max(length(N.xy), 1e-4);
  float limbAngle = atan(limbDir.y, limbDir.x);
  float shimmer = 0.72 + 0.28 * (0.5 + 0.5 * gnoise(vec3(cos(limbAngle) * 4.5, sin(limbAngle) * 4.5, uTime * 0.35)));

  float limbCore = pow(edgeFactor, uFresnelPower * 2.4);
  float limbSoft = pow(edgeFactor, uFresnelPower * 1.1) * 0.12;
  vec3 haloWhite = vec3(1.0);
  vec3 color = space;
  color += mix(uAtmosphereColor, haloWhite, clamp(limbCore * 1.5, 0.0, 1.0)) * (limbCore * 3.2 + limbSoft) * shimmer;

  // Diamond-ring bead at the top crest of the silhouette
  float crestAlign = max(limbDir.y, 0.0);
  float crest = pow(crestAlign, 260.0) * pow(edgeFactor, 5.0);
  float pulse = 0.82 + 0.18 * sin(uTime * 1.7) + 0.06 * sin(uTime * 5.3);
  color += haloWhite * crest * 7.5 * pulse;

  gl_FragColor = vec4(color * uBrightness, uOpacity);
${OUTPUT_CHUNKS}
}
`

// ─────────────────────────────────────────────────────────────────
// PLANETARY RING SHADER
// Multi-frequency density bands, AA ringlets, Cassini/Encke gaps, particle shimmer
// ─────────────────────────────────────────────────────────────────
export const RING_VERTEX_SHADER = /* glsl */ `
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

export const RING_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec3 uRingColor;
uniform float uOpacity;
uniform float uInner;
uniform float uOuter;
uniform float uTime;
uniform float uSeed;
uniform float uGapStrength;
uniform float uShimmer;
uniform float uBandFreq;

varying vec2 vUv;

float ringHash(float n) {
  return fract(sin(n * 127.1 + uSeed * 311.7) * 43758.5453);
}

float bandNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(ringHash(i), ringHash(i + 1.0), u);
}

float bandMask(float t, float a, float b, float aa) {
  return smoothstep(a - aa, a + aa, t) * (1.0 - smoothstep(b - aa, b + aa, t));
}

void main() {
  vec2 c = vUv - 0.5;
  float r = length(c);

  // All derivatives are taken before any discard
  float aaR = fwidth(r);
  float t = (r - uInner) / (uOuter - uInner);
  float aaT = fwidth(t);
  float ringletPhase = t * uBandFreq * 18.0;
  float ringletAA = fwidth(ringletPhase);

  float mask = smoothstep(uInner - aaR, uInner + aaR, r) * (1.0 - smoothstep(uOuter - aaR, uOuter + aaR, r));
  if (mask <= 0.001) discard;

  // Radial density: three noise octaves sharpened into distinct bands
  float density = bandNoise(t * uBandFreq) * 0.45
                + bandNoise(t * uBandFreq * 2.7 + 13.0) * 0.30
                + bandNoise(t * uBandFreq * 7.3 + 41.0) * 0.25;
  density = smoothstep(0.18, 0.86, density);

  // Razor ringlets, faded out once they exceed pixel resolution (no moire)
  float ringlet = 0.5 + 0.5 * sin(ringletPhase + bandNoise(t * uBandFreq * 3.0) * 6.0);
  ringlet = mix(ringlet, 0.5, clamp(ringletAA * 0.9, 0.0, 1.0));
  density *= 0.68 + 0.32 * ringlet;

  // Translucent Cassini-like division + narrow Encke-like gap
  float cassini = bandMask(t, 0.405, 0.455, aaT);
  float encke = bandMask(t, 0.742, 0.760, aaT);
  float gaps = 1.0 - uGapStrength * max(cassini, encke * 0.85);
  density *= gaps;

  // Soft inner edge, crisp bright outer edge
  density *= smoothstep(0.0, 0.07, t) * (0.78 + 0.22 * smoothstep(0.86, 0.985, t));

  // Sparse twinkling ice / dust particles
  float ang = atan(c.y, c.x);
  vec2 grainUV = vec2(ang * 22.28, t * 92.0);
  vec2 cid = floor(grainUV);
  vec2 cf = fract(grainUV) - 0.5;
  float seed = fract(sin(dot(cid + uSeed, vec2(12.9898, 78.233))) * 43758.5453);
  float speck = smoothstep(0.42, 0.05, length(cf * vec2(1.0, 0.6)));
  float twinkle = step(0.92, seed) * speck * (0.5 + 0.5 * sin(uTime * (1.3 + seed * 3.7) + seed * 40.0));
  float sparkle = twinkle * uShimmer * gaps;

  vec3 color = uRingColor * (0.45 + 1.05 * density) + (uRingColor + vec3(0.6)) * sparkle * 1.6;
  float alpha = (density * 0.9 + sparkle * 0.6) * mask * uOpacity;

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
${OUTPUT_CHUNKS}
}
`

// ─────────────────────────────────────────────────────────────────
// CORONA / ATMOSPHERE HALO SHELL (BackSide sphere, additive)
// Uses the true view-ray impact parameter against the planet, so the halo hugs
// the silhouette exactly under perspective (works for huge, off-axis planets).
// ─────────────────────────────────────────────────────────────────
export const HALO_VERTEX_SHADER = /* glsl */ `
precision highp float;

uniform float uPlanetRadius;

varying vec3 vViewPos;
varying vec3 vCenterView;
varying float vRadiusView;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mvPosition.xyz;
  vCenterView = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vRadiusView = length((modelViewMatrix * vec4(uPlanetRadius, 0.0, 0.0, 0.0)).xyz);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const HALO_FRAGMENT_SHADER = /* glsl */ `
${GLSL_COMMON}

uniform vec3 uColor;
uniform vec3 uCoreColor;
uniform float uOpacity;
uniform float uTime;
uniform float uShellScale;
uniform float uFalloff;
uniform float uIntensity;
uniform float uDiamond;
uniform float uStreamers;

varying vec3 vViewPos;
varying vec3 vCenterView;
varying float vRadiusView;

void main() {
  vec3 rayDir = normalize(vViewPos);
  float along = dot(vCenterView, rayDir);
  vec3 offset = rayDir * along - vCenterView;
  float impact = length(offset);

  float planetR = vRadiusView;
  float shellR = vRadiusView * uShellScale;
  float h = (impact - planetR) / max(shellR - planetR, 1e-4);
  float hp = max(h, 0.0);

  // Local 2D frame around the silhouette (x = side, y = screen-up)
  vec3 upPerp = normalize(vec3(0.0, 1.0, 0.0) - rayDir * rayDir.y);
  vec3 sidePerp = normalize(cross(rayDir, upPerp));
  vec2 local = vec2(dot(offset, sidePerp), dot(offset, upPerp)) / planetR;
  float ang = atan(local.y, local.x + 1e-6);

  float shimmer = 0.78 + 0.22 * gnoise(vec3(cos(ang) * 5.0, sin(ang) * 5.0, uTime * 0.4));
  float streamer = 1.0 + uStreamers * 0.55 * gnoise(vec3(cos(ang) * 11.0, sin(ang) * 11.0, hp * 2.5 - uTime * 0.12));

  float limbMask = smoothstep(-0.015, 0.0, h);
  float outerFade = 1.0 - smoothstep(0.7, 1.0, hp);
  float glow = exp(-hp * uFalloff) * limbMask * outerFade;
  float core = exp(-hp * uFalloff * 4.5) * limbMask;

  vec3 color = (uColor * glow * streamer + uCoreColor * core * 1.6) * shimmer * uIntensity;

  // Diamond-ring flare: bead + bloom + anamorphic streaks at the top crest
  if (uDiamond > 0.5) {
    vec2 crestOffset = local - vec2(0.0, 1.0);
    float crestDist = length(crestOffset);
    float pulse = 0.8 + 0.2 * sin(uTime * 1.7) + 0.05 * sin(uTime * 5.3);
    float bead = exp(-crestDist * crestDist * 2400.0) * 10.0;
    float bloom = exp(-crestDist * 26.0) * 1.1;
    float streakH = exp(-abs(crestOffset.y) * 170.0) * exp(-abs(crestOffset.x) * 4.2) * 1.2;
    float streakV = exp(-abs(crestOffset.x) * 240.0) * exp(-abs(crestOffset.y) * 10.0) * 0.45;
    color += uCoreColor * (bead + bloom + streakH + streakV) * pulse;
  }

  gl_FragColor = vec4(color, uOpacity);
${OUTPUT_CHUNKS}
}
`
