import React, { useRef, useState } from 'react'
import { Disc3, ShieldCheck, User } from 'lucide-react'

interface Character3DProps {
  fallbackImage?: string
}

export default function Character3D({ fallbackImage = '/images/duy-portrait.png' }: Character3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [imageErrorTier, setImageErrorTier] = useState<number>(0)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  // 4-Tier Robust Fallback Image Sequence
  const imageTiers = [
    fallbackImage,
    '/images/duy-portrait-cutout.png',
    '/images/duy-portrait.svg',
  ]

  const currentImageSrc = imageTiers[imageErrorTier]

  // Gentle 3D perspective tilt & specular glare calculation
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max 6-degree gentle tilt for physics realism
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    setTilt({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }

  const handleImageError = () => {
    if (imageErrorTier < imageTiers.length - 1) {
      setImageErrorTier((prev) => prev + 1)
    } else {
      setImageErrorTier(999) // Trigger Tier 4 Holographic Fallback
    }
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.16s ease-out',
      }}
      className="relative mx-auto h-[28rem] sm:h-[34rem] lg:h-[38rem] w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[28rem] select-none rounded-[2rem] border border-white/[0.09] bg-[#070b14]/70 shadow-[0_24px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden"
    >
      {/* 4 Corner Crosshair Pins (+) */}
      <span className="pointer-events-none absolute top-3.5 left-4 font-mono text-xs text-white/20 select-none z-30">+</span>
      <span className="pointer-events-none absolute top-3.5 right-4 font-mono text-xs text-white/20 select-none z-30">+</span>
      <span className="pointer-events-none absolute bottom-3.5 left-4 font-mono text-xs text-white/20 select-none z-30">+</span>
      <span className="pointer-events-none absolute bottom-3.5 right-4 font-mono text-xs text-white/20 select-none z-30">+</span>

      {/* Top Specular Edge Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent z-30" />

      {/* Dynamic Specular Reflection Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.14) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Ambient Celestial Atmosphere Dome */}
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-3/5 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.14),transparent_70%)]" />

      {/* Viewport Frame Header Tag */}
      <div className="absolute top-4 inset-x-0 flex items-center justify-between px-6 z-20 pointer-events-none font-mono text-[10px] text-zinc-400">
        <span className="inline-flex items-center gap-1.5 text-white/40">
          <ShieldCheck size={12} className="text-[#38bdf8]" />
          <span>VIEWPORT // OPTICAL 01</span>
        </span>
        <span className="text-white/30 tracking-widest">512-D ONNX</span>
      </div>

      {/* Main Astronaut Portrait */}
      {imageErrorTier < 999 && currentImageSrc ? (
        <div className="relative h-full w-full flex items-end justify-center overflow-hidden">
          {/* Subtle placeholder while image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-[#38bdf8] animate-spin" />
            </div>
          )}
          <img
            src={currentImageSrc}
            alt="Le Duy - IT Engineer & Creative Technologist"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`relative z-10 mx-auto h-[90%] w-auto max-w-[92%] object-contain object-bottom drop-shadow-[0_24px_45px_rgba(0,0,0,0.95)] transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      ) : (
        /* Tier 4 Holographic Monogram Fallback */
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-[#38bdf8]/30 bg-[#38bdf8]/10 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
            <User size={44} className="text-[#38bdf8]" />
            <div className="absolute inset-0 rounded-2xl border border-white/20 animate-ping opacity-25" />
          </div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-white">LE DUY</h3>
          <p className="mt-1 font-mono text-xs text-[#38bdf8] tracking-widest">IT ENGINEER // ARCHITECT</p>
          <p className="mt-3 max-w-[14rem] text-xs text-zinc-400">
            Tra Vinh, Vinh Long, VN • Tra Vinh University Graduate
          </p>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2 AUTHENTIC TELEMETRY CHIPS                                   */}
      {/* ───────────────────────────────────────────────────────────── */}

      {/* Chip 1 (Top-Right): 128 BPM // AUDIO with 4-Bar Equalizer */}
      <div
        style={{ transform: `translate3d(${tilt.y * 0.5}px, ${tilt.x * 0.5}px, 0)` }}
        className="absolute top-12 right-4 z-20 flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#070b14]/85 px-3 py-1.5 font-mono text-[11px] text-zinc-200 backdrop-blur-xl shadow-lg"
      >
        <Disc3 size={13} className="text-[#38bdf8] animate-spin" style={{ animationDuration: '6s' }} />
        <span>128 BPM</span>
        {/* 4-bar dynamic audio equalizer */}
        <div className="flex items-end gap-0.5 h-2.5">
          <span className="w-0.5 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '300ms' }} />
          <span className="w-0.5 bg-[#38bdf8] rounded-full animate-eq-bar" style={{ animationDelay: '450ms' }} />
        </div>
      </div>

      {/* Chip 2 (Bottom-Left): Culér // FC Barcelona 1899 */}
      <div
        style={{ transform: `translate3d(${tilt.y * -0.5}px, ${tilt.x * -0.5}px, 0)` }}
        className="absolute bottom-6 left-4 z-20 flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#070b14]/85 px-3 py-1.5 font-mono text-[11px] text-zinc-200 backdrop-blur-xl shadow-lg"
      >
        {/* Blaugrana Dual Accent Dot */}
        <span className="flex h-2.5 w-2.5 overflow-hidden rounded-full ring-1 ring-white/20">
          <span className="h-full w-1/2 bg-[#004D98]" />
          <span className="h-full w-1/2 bg-[#A50044]" />
        </span>
        <span className="font-semibold text-white">Culér</span>
        <span className="text-white/20">//</span>
        <span className="text-zinc-400">1899</span>
      </div>
    </div>
  )
}
