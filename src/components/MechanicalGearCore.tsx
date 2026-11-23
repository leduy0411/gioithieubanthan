import { useId } from 'react'

export interface MechanicalGearCoreProps {
  /**
   * - `full`: Detailed 5-layer Piltover Hextech centerpiece for 02. SYSTEMS card backs.
   * - `watermark`: Low-opacity ambient Hextech clockwork behind active center card content.
   * - `halo`: Compact Hextech gear & rune halo rotating behind Champion Portrait & Keystone Relic.
   */
  variant?: 'full' | 'watermark' | 'halo'
  /** Optional interactive 3D cursor tilt passed from parent card for real multi-layer Z parallax */
  tiltX?: number
  tiltY?: number
  /** Incrementing key that triggers the sharp 300ms Hextech Unlock Surge + core mana flash */
  unlockTrigger?: number
  /** Extra utility classes for sizing / positioning */
  className?: string
}

/* ─────────────────────────────────────────────────────────────────
   PILTOVER HEXTECH HOROLOGY GEOMETRY (League of Legends / Arcane)
   viewBox = "0 0 260 260" | Exact Center = (130, 130)
   Module m = 7.5px:
   - Layer 1 (translateZ  8px): Piltover Runic Astrolabe Ring & Caliper Pointers
   - Layer 2 (translateZ 18px): 16-Tooth Forged Hextech Gold Spur Gear (Rp = 60)
   - Layer 3 (translateZ 26px): 12-Tooth Obsidian-Brass Escapement Ratchet Ring
   - Layer 4 (translateZ 22px): 2 Meshing 8-Tooth Satellite Pinions (Rp = 30, D = 90)
   - Layer 5 (translateZ 36px): Multi-Faceted Hextech Mana Gemstone & Containment Claws
   ───────────────────────────────────────────────────────────────── */

const CX = 130
const CY = 130
const RAD = Math.PI / 180

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = deg * RAD
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function fmt(n: number): string {
  return n.toFixed(2)
}

function buildSpurGearPath(
  cx: number,
  cy: number,
  teeth: number,
  outerR: number,
  rootR: number,
  angleOffsetDeg = 0
): string {
  const pitch = 360 / teeth
  const halfRoot = pitch * 0.29
  const halfTip = pitch * 0.165
  const chamferR = outerR - 1.4
  const halfChamfer = pitch * 0.195

  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const base = angleOffsetDeg + i * pitch
    const [x1, y1] = polar(cx, cy, rootR, base - halfRoot)
    const [x2, y2] = polar(cx, cy, chamferR, base - halfChamfer)
    const [x3, y3] = polar(cx, cy, outerR, base - halfTip)
    const [x4, y4] = polar(cx, cy, outerR, base + halfTip)
    const [x5, y5] = polar(cx, cy, chamferR, base + halfChamfer)
    const [x6, y6] = polar(cx, cy, rootR, base + halfRoot)

    pts.push(
      `${i === 0 ? 'M' : 'L'} ${fmt(x1)} ${fmt(y1)}`,
      `L ${fmt(x2)} ${fmt(y2)}`,
      `L ${fmt(x3)} ${fmt(y3)}`,
      `L ${fmt(x4)} ${fmt(y4)}`,
      `L ${fmt(x5)} ${fmt(y5)}`,
      `L ${fmt(x6)} ${fmt(y6)}`
    )
  }
  pts.push('Z')
  return pts.join(' ')
}

function buildArcCutoutPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number
): string {
  const [ox1, oy1] = polar(cx, cy, rOuter, startDeg)
  const [ox2, oy2] = polar(cx, cy, rOuter, endDeg)
  const [ix2, iy2] = polar(cx, cy, rInner, endDeg)
  const [ix1, iy1] = polar(cx, cy, rInner, startDeg)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0

  return [
    `M ${fmt(ox1)} ${fmt(oy1)}`,
    `A ${fmt(rOuter)} ${fmt(rOuter)} 0 ${largeArc} 1 ${fmt(ox2)} ${fmt(oy2)}`,
    `L ${fmt(ix2)} ${fmt(iy2)}`,
    `A ${fmt(rInner)} ${fmt(rInner)} 0 ${largeArc} 0 ${fmt(ix1)} ${fmt(iy1)}`,
    'Z',
  ].join(' ')
}

function buildRatchetRingPath(
  cx: number,
  cy: number,
  teeth: number,
  outerR: number,
  rootR: number,
  innerHoleR: number
): string {
  const pitch = 360 / teeth
  const outerPts: string[] = []

  for (let i = 0; i < teeth; i++) {
    const base = i * pitch
    const [rx, ry] = polar(cx, cy, rootR, base)
    const [tx, ty] = polar(cx, cy, outerR, base + pitch * 0.14)
    const [mx, my] = polar(cx, cy, outerR - 1.2, base + pitch * 0.34)
    const [ex, ey] = polar(cx, cy, rootR + 0.8, base + pitch * 0.88)

    outerPts.push(
      `${i === 0 ? 'M' : 'L'} ${fmt(rx)} ${fmt(ry)}`,
      `L ${fmt(tx)} ${fmt(ty)}`,
      `L ${fmt(mx)} ${fmt(my)}`,
      `L ${fmt(ex)} ${fmt(ey)}`
    )
  }
  outerPts.push('Z')

  const hole = `M ${fmt(cx + innerHoleR)} ${fmt(cy)} A ${fmt(innerHoleR)} ${fmt(innerHoleR)} 0 1 0 ${fmt(cx - innerHoleR)} ${fmt(cy)} A ${fmt(innerHoleR)} ${fmt(innerHoleR)} 0 1 0 ${fmt(cx + innerHoleR)} ${fmt(cy)} Z`
  return `${outerPts.join(' ')} ${hole}`
}

// Precomputed static SVG geometry (zero per-render math overhead)
const MAIN_GEAR_OUTER = buildSpurGearPath(CX, CY, 16, 66.4, 52.8, 0)
const MAIN_SPOKE_CUTOUTS = [0, 90, 180, 270]
  .map((deg) => buildArcCutoutPath(CX, CY, 25.5, 45.2, deg + 13, deg + 77))
  .join(' ')
const MAIN_GEAR_COMPOUND = `${MAIN_GEAR_OUTER} ${MAIN_SPOKE_CUTOUTS}`

const RATCHET_PATH = buildRatchetRingPath(CX, CY, 12, 39.2, 32.6, 23.5)

const PINION_OUTER = buildSpurGearPath(0, 0, 8, 36.2, 22.8, 22.5)
const PINION_HOLE = 'M 9.5 0 A 9.5 9.5 0 1 0 -9.5 0 A 9.5 9.5 0 1 0 9.5 0 Z'
const PINION_COMPOUND = `${PINION_OUTER} ${PINION_HOLE}`

const SAT_OFFSET = 90 * Math.SQRT1_2
const SAT_1 = { x: CX + SAT_OFFSET, y: CY - SAT_OFFSET }
const SAT_2 = { x: CX - SAT_OFFSET, y: CY + SAT_OFFSET }

const ASTROLABE_TICKS = Array.from({ length: 72 }, (_, idx) => {
  const deg = idx * 5
  const isCardinal = deg % 90 === 0
  const isMajor = deg % 30 === 0
  const r1 = isCardinal ? 104 : isMajor ? 108 : 112
  const r2 = 117.5
  const [x1, y1] = polar(CX, CY, r1, deg)
  const [x2, y2] = polar(CX, CY, r2, deg)
  return { deg, x1, y1, x2, y2, isCardinal, isMajor }
})

// 8 Piltover Runic Geometry Nodes around the Astrolabe Ring
const RUNE_NODES = Array.from({ length: 8 }, (_, idx) => {
  const deg = idx * 45
  const [x, y] = polar(CX, CY, 97, deg)
  return { deg, x, y, isPrimary: idx % 2 === 0 }
})

const MAIN_HUB_RIVETS = Array.from({ length: 8 }, (_, idx) => {
  const [x, y] = polar(CX, CY, 48.8, idx * 45 + 22.5)
  return { x, y }
})

const INNER_HUB_RIVETS = Array.from({ length: 4 }, (_, idx) => {
  const [x, y] = polar(CX, CY, 21.5, idx * 90)
  return { x, y }
})

const PINION_HOLES = [0, 90, 180, 270].map((deg) => {
  const [x, y] = polar(0, 0, 16.5, deg + 22.5)
  return { x, y }
})

export default function MechanicalGearCore({
  variant = 'full',
  tiltX = 0,
  tiltY = 0,
  unlockTrigger = 0,
  className = '',
}: MechanicalGearCoreProps) {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '')

  const isWatermark = variant === 'watermark'
  const isHalo = variant === 'halo'
  const showCrystal = variant === 'full'

  const stageTransform =
    tiltX !== 0 || tiltY !== 0
      ? `rotateX(${(tiltX * 1.15).toFixed(2)}deg) rotateY(${(tiltY * 1.15).toFixed(2)}deg)`
      : undefined

  return (
    <div
      aria-hidden="true"
      className={`gear-assembly relative select-none pointer-events-none ${
        isWatermark ? 'gear-variant-watermark' : isHalo ? 'gear-variant-halo' : 'gear-variant-full'
      } ${className}`}
    >
      {/* Shared League of Legends Hextech Gold, Gunmetal & Mana Gradient Definitions */}
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          {/* Piltover Forged Hextech Gold (#F0E6D2 -> #C89B3C -> #785A28) */}
          <linearGradient id={`${uid}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" />
            <stop offset="24%" stopColor="#F0E6D2" />
            <stop offset="56%" stopColor="#C89B3C" />
            <stop offset="84%" stopColor="#936A25" />
            <stop offset="100%" stopColor="#5C4114" />
          </linearGradient>

          {/* Satin Ivory-Gold Bevel Rim */}
          <linearGradient id={`${uid}-gold-rim`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="45%" stopColor="#C8AA6E" />
            <stop offset="100%" stopColor="#785A28" />
          </linearGradient>

          {/* Hextech Arcane Gunmetal & Cobalt-Violet Steel */}
          <linearGradient id={`${uid}-steel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="28%" stopColor="#38BDF8" />
            <stop offset="65%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          {/* Deep Piltover Obsidian Alloy */}
          <linearGradient id={`${uid}-dark-alloy`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="55%" stopColor="#151028" />
            <stop offset="100%" stopColor="#090714" />
          </linearGradient>

          {/* Hextech Gemstone Core (Piltover Mana Cyan -> Arcane Shimmer Magenta) */}
          <linearGradient id={`${uid}-crystal`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="28%" stopColor="#0AC8B9" />
            <stop offset="65%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>

          {/* Ambient Hextech Mana Glow Radiating onto Inner Gear Teeth */}
          <radialGradient id={`${uid}-core-aura`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0AC8B9" stopOpacity="0.62" />
            <stop offset="42%" stopColor="#EC4899" stopOpacity="0.38" />
            <stop offset="75%" stopColor="#C89B3C" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#110B1F" stopOpacity="0" />
          </radialGradient>

          {/* Hextech Golden-Cyan Unlock Surge Flash */}
          <radialGradient id={`${uid}-flash-aura`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="30%" stopColor="#0AC8B9" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#C89B3C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Local 3D Perspective Stage preserving stepped Z-depth across all 5 mechanical layers */}
      <div
        className="gear-stage relative h-full w-full transition-transform duration-200 ease-out"
        style={stageTransform ? { transform: stageTransform } : undefined}
      >
        {/* Subtle Hextech Mana Illumination Wash behind Inner Teeth */}
        <div
          className="gear-layer gear-z-0 absolute inset-0"
          style={{
            background:
              'radial-gradient(circle, rgba(10,200,185,0.22) 0%, rgba(236,72,153,0.14) 40%, transparent 68%)',
          }}
        />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 1: PILTOVER RUNIC ASTROLABE RING — translateZ(8px)        */}
        {/* Physically cranked bi-directionally by `--section-progress`     */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="gear-layer gear-z-1 absolute inset-0">
          <div
            className="h-full w-full will-change-transform"
            style={{
              transform: 'rotate(calc(var(--section-progress, 0) * 120deg))',
            }}
          >
            <svg viewBox="0 0 260 260" className="h-full w-full overflow-visible" fill="none">
              {/* Outer Forged Hextech Gold Bezel */}
              <circle
                cx={CX}
                cy={CY}
                r={123}
                stroke={`url(#${uid}-gold)`}
                strokeWidth="1.4"
                strokeOpacity="0.85"
              />
              {/* Piltover Octagonal Art-Deco Inscribed Frame */}
              <polygon
                points="130,9 215,45 251,130 215,215 130,251 45,215 9,130 45,45"
                stroke={`url(#${uid}-gold)`}
                strokeWidth="0.85"
                strokeOpacity="0.42"
              />
              {/* Dashed Hextech Mana Calibration Arc */}
              <circle
                cx={CX}
                cy={CY}
                r={118}
                stroke="#0AC8B9"
                strokeWidth="1.2"
                strokeOpacity="0.58"
                strokeDasharray="14 5 3 5"
              />
              {/* Inner Runic Track */}
              <circle
                cx={CX}
                cy={CY}
                r={103}
                stroke={`url(#${uid}-gold-rim)`}
                strokeWidth="1"
                strokeOpacity="0.52"
                strokeDasharray="22 7"
              />
              {/* 72 Engraved Horological Degree Tick Marks */}
              {ASTROLABE_TICKS.map((t) => (
                <line
                  key={t.deg}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={t.isCardinal ? '#F0E6D2' : t.isMajor ? '#0AC8B9' : '#C89B3C'}
                  strokeWidth={t.isCardinal ? 2.1 : t.isMajor ? 1.3 : 0.75}
                  strokeOpacity={t.isCardinal ? 0.98 : t.isMajor ? 0.82 : 0.45}
                />
              ))}
              {/* 8 Runic Socket Nodes around Astrolabe */}
              {RUNE_NODES.map((rn) => (
                <circle
                  key={rn.deg}
                  cx={rn.x}
                  cy={rn.y}
                  r={rn.isPrimary ? 2.2 : 1.4}
                  fill={rn.isPrimary ? '#0AC8B9' : '#C89B3C'}
                  opacity={rn.isPrimary ? 0.9 : 0.65}
                />
              ))}
              {/* 4 Cardinal Piltover Caliper Chevrons (N / E / S / W) */}
              {[0, 90, 180, 270].map((deg) => {
                const [nx, ny] = polar(CX, CY, 123, deg)
                return (
                  <g key={deg} transform={`translate(${fmt(nx)}, ${fmt(ny)}) rotate(${deg})`}>
                    <polygon
                      points="-5,0 0,-5 5,0 0,5"
                      fill="#091428"
                      stroke="#F0E6D2"
                      strokeWidth="1.35"
                    />
                    <circle cx="0" cy="0" r="1.4" fill="#0AC8B9" />
                  </g>
                )
              })}
              {/* Twin Glowing Hextech Energy Arcs */}
              <path
                d="M 130 16 A 114 114 0 0 1 187 31.3"
                stroke="#0AC8B9"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <path
                d="M 130 244 A 114 114 0 0 1 73 228.7"
                stroke="#EC4899"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
            </svg>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 2: MAIN 16-TOOTH HEXTECH GOLD SPUR GEAR — translateZ(18px)*/}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="gear-layer gear-z-2 absolute inset-0">
          <div
            key={`main-surge-${unlockTrigger}`}
            className={`h-full w-full ${unlockTrigger > 0 ? 'gear-unlock-cw' : ''}`}
          >
            <div className="gear-tick-main h-full w-full">
              <svg
                viewBox="0 0 260 260"
                className="gear-glow-gold h-full w-full overflow-visible"
                fill="none"
              >
                {/* 16-Tooth Chamfered Spur Gear with 4 Cutout Spoke Windows */}
                <path
                  d={MAIN_GEAR_COMPOUND}
                  fill={`url(#${uid}-gold)`}
                  fillRule="evenodd"
                  stroke={`url(#${uid}-gold-rim)`}
                  strokeWidth="1.3"
                />

                {/* Engraved Inner Pitch-Circle Groove */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={51}
                  stroke="#5C4114"
                  strokeWidth="1.2"
                  strokeOpacity="0.9"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={46.5}
                  stroke="#F0E6D2"
                  strokeWidth="0.75"
                  strokeOpacity="0.65"
                  strokeDasharray="6 4"
                />

                {/* 8 Perimeter Forged Brass Rivets */}
                {MAIN_HUB_RIVETS.map((r, i) => (
                  <g key={i}>
                    <circle
                      cx={r.x}
                      cy={r.y}
                      r={2.2}
                      fill="#091428"
                      stroke="#F0E6D2"
                      strokeWidth="0.9"
                    />
                    <circle cx={r.x - 0.35} cy={r.y - 0.35} r={0.7} fill="#0AC8B9" />
                  </g>
                ))}

                {/* Riveted Inner Hub Collar */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={25.5}
                  fill={`url(#${uid}-dark-alloy)`}
                  stroke={`url(#${uid}-gold-rim)`}
                  strokeWidth="1.6"
                />
                {INNER_HUB_RIVETS.map((r, i) => (
                  <circle
                    key={i}
                    cx={r.x}
                    cy={r.y}
                    r={1.7}
                    fill="#F0E6D2"
                    stroke="#5C4114"
                    strokeWidth="0.6"
                  />
                ))}

                {/* Hextech Mana Conduit Traces along the 4 Spokes (Ignite on Hover Overdrive) */}
                <g className="gear-energy-traces">
                  {[0, 90, 180, 270].map((deg, idx) => {
                    const [sx, sy] = polar(CX, CY, 26, deg)
                    const [ex, ey] = polar(CX, CY, 49, deg)
                    return (
                      <line
                        key={deg}
                        x1={sx}
                        y1={sy}
                        x2={ex}
                        y2={ey}
                        stroke={idx % 2 === 0 ? '#0AC8B9' : '#EC4899'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    )
                  })}
                  <circle
                    cx={CX}
                    cy={CY}
                    r={48.8}
                    stroke="#0AC8B9"
                    strokeWidth="1.5"
                    strokeDasharray="10 14"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 4: 2 MESHING 8-TOOTH SATELLITE PINIONS — translateZ(22px) */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="gear-layer gear-z-4 absolute inset-0">
          {[SAT_1, SAT_2].map((sat, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                left: `${(sat.x / 260) * 100}%`,
                top: `${(sat.y / 260) * 100}%`,
                width: `${(84 / 260) * 100}%`,
                height: `${(84 / 260) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                key={`pinion-surge-${idx}-${unlockTrigger}`}
                className={`h-full w-full ${unlockTrigger > 0 ? 'gear-unlock-ccw-2x' : ''}`}
              >
                <div className="gear-tick-pinion h-full w-full">
                  <svg
                    viewBox="-42 -42 84 84"
                    className="gear-glow-violet h-full w-full overflow-visible"
                    fill="none"
                  >
                    <path
                      d={PINION_COMPOUND}
                      fill={`url(#${uid}-steel)`}
                      fillRule="evenodd"
                      stroke="#F0E6D2"
                      strokeWidth="1.15"
                    />
                    <circle
                      cx={0}
                      cy={0}
                      r={20.5}
                      stroke="#091428"
                      strokeWidth="1"
                      strokeOpacity="0.85"
                    />
                    {PINION_HOLES.map((h, hIdx) => (
                      <circle
                        key={hIdx}
                        cx={h.x}
                        cy={h.y}
                        r={3.2}
                        fill="#091428"
                        stroke="#C89B3C"
                        strokeWidth="0.9"
                      />
                    ))}
                    <circle
                      cx={0}
                      cy={0}
                      r={9.5}
                      fill={`url(#${uid}-dark-alloy)`}
                      stroke={`url(#${uid}-gold)`}
                      strokeWidth="1.6"
                    />
                    <circle cx={0} cy={0} r={3.4} fill={idx === 0 ? '#0AC8B9' : '#EC4899'} />
                    <circle
                      cx={0}
                      cy={0}
                      r={13}
                      className="gear-energy-traces"
                      stroke="#0AC8B9"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 3: INNER 12-TOOTH RATCHET RING — translateZ(26px)         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="gear-layer gear-z-3 absolute inset-0">
          <div
            key={`ratchet-surge-${unlockTrigger}`}
            className={`h-full w-full ${unlockTrigger > 0 ? 'gear-unlock-ccw' : ''}`}
          >
            <div className="gear-tick-ratchet h-full w-full">
              <svg
                viewBox="0 0 260 260"
                className="gear-glow-violet h-full w-full overflow-visible"
                fill="none"
              >
                <path
                  d={RATCHET_PATH}
                  fill={`url(#${uid}-steel)`}
                  fillRule="evenodd"
                  stroke="#E0F2FE"
                  strokeWidth="1"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={29}
                  stroke={`url(#${uid}-gold)`}
                  strokeWidth="1.25"
                  strokeDasharray="8 4"
                />
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                  const [x1, y1] = polar(CX, CY, 24, deg)
                  const [x2, y2] = polar(CX, CY, 31.5, deg)
                  return (
                    <line
                      key={deg}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#F0E6D2"
                      strokeWidth="1.25"
                      strokeOpacity="0.9"
                    />
                  )
                })}
                <circle
                  cx={CX}
                  cy={CY}
                  r={26}
                  className="gear-energy-traces"
                  stroke="#0AC8B9"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 5: HEXTECH GEMSTONE CORE & GOLD CLAWS — translateZ(36px)  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {showCrystal && (
          <div className="gear-layer gear-z-5 absolute inset-0">
            <svg viewBox="0 0 260 260" className="h-full w-full overflow-visible" fill="none">
              <circle
                cx={CX}
                cy={CY}
                r={50}
                fill={`url(#${uid}-core-aura)`}
                className="animate-crystal-breath"
                style={{ transformOrigin: '130px 130px' }}
              />

              {/* Ornate Piltover Octagonal Gold Axle Housing */}
              <polygon
                points="130,103 149,111 157,130 149,149 130,157 111,149 103,130 111,111"
                fill="#091428"
                stroke={`url(#${uid}-gold)`}
                strokeWidth="2"
              />

              {/* 4 Forged Gold Retention Claws */}
              {[0, 90, 180, 270].map((deg) => {
                const [x1, y1] = polar(CX, CY, 18.5, deg)
                const [x2, y2] = polar(CX, CY, 25.5, deg)
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#F0E6D2"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                )
              })}

              {/* Multi-Faceted Hextech Mana Gemstone (Cyan-to-Magenta Duality) */}
              <g
                className="animate-crystal-breath gear-crystal-glow"
                style={{ transformOrigin: '130px 130px' }}
              >
                <polygon
                  points="130,105 147,130 130,155 113,130"
                  fill={`url(#${uid}-crystal)`}
                  stroke="#FFFFFF"
                  strokeWidth="1.25"
                />
                <polygon points="130,105 147,130 130,130" fill="rgba(224,242,254,0.45)" />
                <polygon points="130,105 113,130 130,130" fill="rgba(10,200,185,0.28)" />
                <polygon points="130,130 147,130 130,155" fill="rgba(88,28,135,0.48)" />
                <polygon
                  points="130,117 138,130 130,143 122,130"
                  fill="rgba(255,255,255,0.65)"
                />
              </g>
            </svg>
          </div>
        )}

        {/* Hextech Mana Unlock Surge Core Flash (300ms burst on card click / flip / tab switch) */}
        {unlockTrigger > 0 && (
          <div
            key={`core-flash-${unlockTrigger}`}
            className="gear-layer gear-z-5 gear-core-flash absolute inset-0"
          >
            <svg viewBox="0 0 260 260" className="h-full w-full overflow-visible" fill="none">
              <circle cx={CX} cy={CY} r={76} fill={`url(#${uid}-flash-aura)`} />
              <circle
                cx={CX}
                cy={CY}
                r={54}
                stroke="#0AC8B9"
                strokeWidth="2.5"
                strokeOpacity="0.95"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
