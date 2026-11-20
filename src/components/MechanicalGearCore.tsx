import { useId } from 'react'

export interface MechanicalGearCoreProps {
  /**
   * - `full`: Detailed 5-layer centerpiece for 02. SYSTEMS card backs.
   * - `watermark`: Low-opacity ambient mechanical clockwork behind active center card content.
   * - `halo`: Compact Hextech gear halo rotating behind the 03. EXPERTISE RPG top icon badge.
   */
  variant?: 'full' | 'watermark' | 'halo'
  /** Optional interactive 3D cursor tilt passed from parent card for real multi-layer Z parallax */
  tiltX?: number
  tiltY?: number
  /** Incrementing key that triggers the sharp 300ms Mechanical Unlock Surge + golden core flash */
  unlockTrigger?: number
  /** Extra utility classes for sizing / positioning */
  className?: string
}

/* ─────────────────────────────────────────────────────────────────
   DETERMINISTIC HOROLOGY GEOMETRY GENERATORS (Computed Once at Load)
   viewBox = "0 0 260 260" | Exact Center = (130, 130)
   Module m = 7.5px:
   - Main Spur Gear: 16 teeth (Rp = 60, Ro = 66.4, Rr = 52.8)
   - Satellite Pinions (x2): 8 teeth (Rp = 30, Ro = 36.2, Rr = 22.8)
     Center distance D = Rp1 + Rp2 = 90px at -45° & +135°
     With +22.5° phase offset, teeth mathematically interlock at mesh!
   - Inner Ratchet Ring: 12 asymmetric escapement teeth (Ro = 39, Rr = 32.5)
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

/**
 * Generates an exact chamfered spur gear profile with flat-crested trapezoidal teeth.
 */
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

/**
 * Generates an annular ring cutout path (for spoke windows using fillRule="evenodd").
 */
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

/**
 * Generates a precision 12-tooth asymmetric horological escapement ratchet ring.
 */
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

  // Circular inner bore (drawn counter-clockwise via evenodd)
  const hole = `M ${fmt(cx + innerHoleR)} ${fmt(cy)} A ${fmt(innerHoleR)} ${fmt(innerHoleR)} 0 1 0 ${fmt(cx - innerHoleR)} ${fmt(cy)} A ${fmt(innerHoleR)} ${fmt(innerHoleR)} 0 1 0 ${fmt(cx + innerHoleR)} ${fmt(cy)} Z`
  return `${outerPts.join(' ')} ${hole}`
}

// Precomputed static SVG geometry (zero per-render math overhead)
const MAIN_GEAR_OUTER = buildSpurGearPath(CX, CY, 16, 66.4, 52.8, 0)
const MAIN_SPOKE_CUTOUTS = [0, 90, 180, 270]
  .map((deg) => buildArcCutoutPath(CX, CY, 25.5, 45.2, deg + 13, deg + 77))
  .join(' ')
const MAIN_GEAR_COMPOUND = `${MAIN_GEAR_OUTER} ${MAIN_SPOKE_CUTOUTS}`

// Inner 12-tooth ratchet ring nested inside main gear cavity
const RATCHET_PATH = buildRatchetRingPath(CX, CY, 12, 39.2, 32.6, 23.5)

// Satellite pinion geometry centered at (0,0) so CSS rotation pivots around each pinion axle cleanly
const PINION_OUTER = buildSpurGearPath(0, 0, 8, 36.2, 22.8, 22.5)
const PINION_HOLE =
  'M 9.5 0 A 9.5 9.5 0 1 0 -9.5 0 A 9.5 9.5 0 1 0 9.5 0 Z'
const PINION_COMPOUND = `${PINION_OUTER} ${PINION_HOLE}`

// Exact meshing centers: distance D = 90px along -45° (top-right) and +135° (bottom-left)
const SAT_OFFSET = 90 * Math.SQRT1_2 // 63.6396
const SAT_1 = { x: CX + SAT_OFFSET, y: CY - SAT_OFFSET } // (193.64, 66.36)
const SAT_2 = { x: CX - SAT_OFFSET, y: CY + SAT_OFFSET } // (66.36, 193.64)

// Outer Astrolabe Calibration Ring degree tick marks (72 precision ticks, cardinal & 30° emphasis)
const ASTROLABE_TICKS = Array.from({ length: 72 }, (_, idx) => {
  const deg = idx * 5
  const isCardinal = deg % 90 === 0
  const isMajor = deg % 30 === 0
  const r1 = isCardinal ? 105 : isMajor ? 108 : 112
  const r2 = 117.5
  const [x1, y1] = polar(CX, CY, r1, deg)
  const [x2, y2] = polar(CX, CY, r2, deg)
  return { deg, x1, y1, x2, y2, isCardinal, isMajor }
})

// Rivets positioned on the main gear hub & rim
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

/**
 * MechanicalGearCore — AAA Hextech / Arcane 5-Layer Clockwork Assembly
 *
 * Layer 1 (translateZ  8px): Outer Astrolabe Calibration Ring — physically cranked by `--section-progress`
 * Layer 2 (translateZ 18px): 16-Tooth Champagne Gold Spur Gear — stepped escapement tick + glowing spoke traces
 * Layer 3 (translateZ 26px): 12-Tooth Violet Steel Ratchet Ring — counter-rotating escapement beat
 * Layer 4 (translateZ 22px): 2 Meshing 8-Tooth Satellite Pinions — 2x speed opposite rotation interlocked with main gear
 * Layer 5 (translateZ 36px): Glowing Magenta/Violet Diamond Crystal Core — pulsing ambient energy + unlock flash
 */
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
      {/* Shared SVG Gradient & Glow Definitions (Unique per instance via useId) */}
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          {/* Champagne Gold -> Burnished Amber Metallic Finish */}
          <linearGradient id={`${uid}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="28%" stopColor="#FDE68A" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Satin Gold Highlight Rim */}
          <linearGradient id={`${uid}-gold-rim`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Iridescent Violet Steel Metallic Finish */}
          <linearGradient id={`${uid}-steel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="30%" stopColor="#C084FC" />
            <stop offset="68%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#2E1065" />
          </linearGradient>

          {/* Dark Gunmetal Arcane Alloy for Inner Cavities */}
          <linearGradient id={`${uid}-dark-alloy`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="55%" stopColor="#251640" />
            <stop offset="100%" stopColor="#110B1F" />
          </linearGradient>

          {/* Hextech Crystal Core Magenta -> Arcane Violet */}
          <linearGradient id={`${uid}-crystal`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="35%" stopColor="#EC4899" />
            <stop offset="78%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>

          {/* Ambient Energy Glow Radiating onto Inner Gear Teeth */}
          <radialGradient id={`${uid}-core-aura`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.65" />
            <stop offset="42%" stopColor="#8B5CF6" stopOpacity="0.32" />
            <stop offset="78%" stopColor="#F59E0B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#110B1F" stopOpacity="0" />
          </radialGradient>

          {/* Golden Unlock Flash Aura */}
          <radialGradient id={`${uid}-flash-aura`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.82" />
            <stop offset="70%" stopColor="#EC4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Local 3D Perspective Stage preserving stepped Z-depth across all 5 mechanical layers */}
      <div
        className="gear-stage relative h-full w-full transition-transform duration-200 ease-out"
        style={stageTransform ? { transform: stageTransform } : undefined}
      >
        {/* Subtle Energy Illumination Wash behind Inner Teeth */}
        <div
          className="gear-layer gear-z-0 absolute inset-0"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.22) 0%, rgba(139,92,246,0.12) 38%, transparent 66%)',
          }}
        />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 1: OUTER ASTROLABE CALIBRATION RING — translateZ(8px)     */}
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
              {/* Outer Thin Precision Bezel */}
              <circle
                cx={CX}
                cy={CY}
                r={122}
                stroke={`url(#${uid}-gold)`}
                strokeWidth="1.2"
                strokeOpacity="0.72"
              />
              {/* Dashed Arcane Calibration Arc */}
              <circle
                cx={CX}
                cy={CY}
                r={118}
                stroke="#C084FC"
                strokeWidth="1.15"
                strokeOpacity="0.5"
                strokeDasharray="12 6 3 6"
              />
              {/* Inner Hairline Guide Circle */}
              <circle
                cx={CX}
                cy={CY}
                r={104}
                stroke={`url(#${uid}-steel)`}
                strokeWidth="0.9"
                strokeOpacity="0.45"
                strokeDasharray="24 8"
              />
              {/* 72 Engraved Degree Tick Marks */}
              {ASTROLABE_TICKS.map((t) => (
                <line
                  key={t.deg}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={t.isCardinal ? '#FDE68A' : t.isMajor ? '#F472B6' : '#C084FC'}
                  strokeWidth={t.isCardinal ? 2 : t.isMajor ? 1.25 : 0.75}
                  strokeOpacity={t.isCardinal ? 0.95 : t.isMajor ? 0.75 : 0.42}
                />
              ))}
              {/* 4 Cardinal Diamond Notches (N / E / S / W) */}
              {[0, 90, 180, 270].map((deg) => {
                const [nx, ny] = polar(CX, CY, 122, deg)
                return (
                  <g key={deg} transform={`translate(${fmt(nx)}, ${fmt(ny)}) rotate(${deg + 45})`}>
                    <rect
                      x="-3.2"
                      y="-3.2"
                      width="6.4"
                      height="6.4"
                      fill="#110B1F"
                      stroke="#FDE68A"
                      strokeWidth="1.2"
                    />
                  </g>
                )
              })}
              {/* Arcane Segmented Accent Arcs */}
              <path
                d="M 130 16 A 114 114 0 0 1 187 31.3"
                stroke="#EC4899"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeOpacity="0.82"
              />
              <path
                d="M 130 244 A 114 114 0 0 1 73 228.7"
                stroke="#F59E0B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeOpacity="0.82"
              />
            </svg>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 2: MAIN 16-TOOTH SPUR GEAR — translateZ(18px)             */}
        {/* Stepped Horological Escapement Tick + Hover Overdrive + Surge   */}
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
                  strokeWidth="1.25"
                />

                {/* Engraved Inner Pitch-Circle Groove */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={51}
                  stroke="#78350F"
                  strokeWidth="1.1"
                  strokeOpacity="0.85"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={46.5}
                  stroke="#FEF3C7"
                  strokeWidth="0.7"
                  strokeOpacity="0.6"
                  strokeDasharray="6 4"
                />

                {/* 8 Perimeter Mechanical Rivets */}
                {MAIN_HUB_RIVETS.map((r, i) => (
                  <g key={i}>
                    <circle
                      cx={r.x}
                      cy={r.y}
                      r={2.1}
                      fill="#19112B"
                      stroke="#FEF3C7"
                      strokeWidth="0.85"
                    />
                    <circle cx={r.x - 0.4} cy={r.y - 0.4} r={0.65} fill="#FDE68A" />
                  </g>
                ))}

                {/* Riveted Inner Hub Collar */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={25.5}
                  fill={`url(#${uid}-dark-alloy)`}
                  stroke={`url(#${uid}-gold-rim)`}
                  strokeWidth="1.5"
                />
                {INNER_HUB_RIVETS.map((r, i) => (
                  <circle
                    key={i}
                    cx={r.x}
                    cy={r.y}
                    r={1.7}
                    fill="#FDE68A"
                    stroke="#78350F"
                    strokeWidth="0.6"
                  />
                ))}

                {/* Hextech Energy Conduit Traces along the 4 Spokes (Ignite on Hover Overdrive) */}
                <g className="gear-energy-traces">
                  {[0, 90, 180, 270].map((deg) => {
                    const [sx, sy] = polar(CX, CY, 26, deg)
                    const [ex, ey] = polar(CX, CY, 49, deg)
                    return (
                      <line
                        key={deg}
                        x1={sx}
                        y1={sy}
                        x2={ex}
                        y2={ey}
                        stroke="#F472B6"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    )
                  })}
                  <circle
                    cx={CX}
                    cy={CY}
                    r={48.8}
                    stroke="#EC4899"
                    strokeWidth="1.4"
                    strokeDasharray="10 14"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 4: 2 MESHING 8-TOOTH SATELLITE PINIONS — translateZ(22px) */}
        {/* Positioned tangentially at -45° & +135°, spinning 2x opposite   */}
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
                    {/* 8-Tooth Interlocking Pinion Body */}
                    <path
                      d={PINION_COMPOUND}
                      fill={`url(#${uid}-steel)`}
                      fillRule="evenodd"
                      stroke="#E9D5FF"
                      strokeWidth="1.15"
                    />
                    {/* Fine Engraved Pitch Circle */}
                    <circle
                      cx={0}
                      cy={0}
                      r={20.5}
                      stroke="#19112B"
                      strokeWidth="1"
                      strokeOpacity="0.8"
                    />
                    {/* 4 Weight-Relief Pinion Holes */}
                    {PINION_HOLES.map((h, hIdx) => (
                      <circle
                        key={hIdx}
                        cx={h.x}
                        cy={h.y}
                        r={3.2}
                        fill="#110B1F"
                        stroke="#FDE68A"
                        strokeWidth="0.85"
                      />
                    ))}
                    {/* Central Brass Axle Cap */}
                    <circle
                      cx={0}
                      cy={0}
                      r={9.5}
                      fill={`url(#${uid}-dark-alloy)`}
                      stroke={`url(#${uid}-gold)`}
                      strokeWidth="1.5"
                    />
                    <circle cx={0} cy={0} r={3.4} fill={`url(#${uid}-gold)`} />
                    {/* Hextech Energy Trace Ring (Ignites on Hover Overdrive) */}
                    <circle
                      cx={0}
                      cy={0}
                      r={13}
                      className="gear-energy-traces"
                      stroke="#FDE68A"
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
        {/* Counter-rotating dark iridescent violet steel escapement wheel  */}
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
                {/* 12-Tooth Asymmetric Escapement Ratchet */}
                <path
                  d={RATCHET_PATH}
                  fill={`url(#${uid}-steel)`}
                  fillRule="evenodd"
                  stroke="#E9D5FF"
                  strokeWidth="1"
                />
                {/* Inner Engraved Gold Trim Ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={29}
                  stroke={`url(#${uid}-gold)`}
                  strokeWidth="1.2"
                  strokeDasharray="8 4"
                />
                {/* 6 Precision Micro-Pawl Notches */}
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
                      stroke="#FDE68A"
                      strokeWidth="1.25"
                      strokeOpacity="0.85"
                    />
                  )
                })}
                {/* Inner Energy Conduit Ring (Ignites on Hover) */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={26}
                  className="gear-energy-traces"
                  stroke="#EC4899"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LAYER 5: CENTRAL GLOWING CRYSTAL CORE — translateZ(36px)        */}
        {/* Mounted on center axle; illuminates metallic teeth & flashes    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {showCrystal && (
          <div className="gear-layer gear-z-5 absolute inset-0">
            <svg viewBox="0 0 260 260" className="h-full w-full overflow-visible" fill="none">
              {/* Pulsing Ambient Energy Aura illuminating inner metal teeth */}
              <circle
                cx={CX}
                cy={CY}
                r={48}
                fill={`url(#${uid}-core-aura)`}
                className="animate-crystal-breath"
                style={{ transformOrigin: '130px 130px' }}
              />

              {/* Ornate Octagonal Gold Axle Bezel */}
              <polygon
                points="130,104 148,112 156,130 148,148 130,156 112,148 104,130 112,112"
                fill="#110B1F"
                stroke={`url(#${uid}-gold)`}
                strokeWidth="1.8"
              />

              {/* 4 Mechanical Retention Clamps holding the Crystal */}
              {[0, 90, 180, 270].map((deg) => {
                const [x1, y1] = polar(CX, CY, 19, deg)
                const [x2, y2] = polar(CX, CY, 25, deg)
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#FDE68A"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                )
              })}

              {/* Signature Faceted Magenta / Violet Diamond Crystal */}
              <g
                className="animate-crystal-breath gear-crystal-glow"
                style={{ transformOrigin: '130px 130px' }}
              >
                <polygon
                  points="130,106 146,130 130,154 114,130"
                  fill={`url(#${uid}-crystal)`}
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                />
                {/* Crisp Specular Top-Right & Core Facets */}
                <polygon points="130,106 146,130 130,130" fill="rgba(255,255,255,0.38)" />
                <polygon points="130,106 114,130 130,130" fill="rgba(251,207,232,0.22)" />
                <polygon points="130,130 146,130 130,154" fill="rgba(76,29,149,0.45)" />
                <polygon
                  points="130,118 137,130 130,142 123,130"
                  fill="rgba(255,255,255,0.52)"
                />
              </g>
            </svg>
          </div>
        )}

        {/* Golden Unlock Surge Core Flash (300ms burst on card click / flip / tab switch) */}
        {unlockTrigger > 0 && (
          <div
            key={`core-flash-${unlockTrigger}`}
            className="gear-layer gear-z-5 gear-core-flash absolute inset-0"
          >
            <svg viewBox="0 0 260 260" className="h-full w-full overflow-visible" fill="none">
              <circle cx={CX} cy={CY} r={74} fill={`url(#${uid}-flash-aura)`} />
              <circle
                cx={CX}
                cy={CY}
                r={52}
                stroke="#FEF3C7"
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
