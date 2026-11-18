import React, { useRef, useState } from 'react'
import { Disc3, Zap } from 'lucide-react'

export default function Character3D({ fallbackImage = '/images/duy-portrait.png' }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [imageError, setImageError] = useState(false)
  const [imgSrc, setImgSrc] = useState(fallbackImage)

  // 3D Perspective Tilt & Specular Light Reflection
  const handlePointerMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Gentle 6-degree maximum tilt for physics realism
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    setTilt({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
    })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }

  const handleImageError = () => {
    if (imgSrc === '/images/duy-portrait.png') {
      setImgSrc('/images/duy-portrait-cutout.png')
    } else if (imgSrc === '/images/duy-portrait-cutout.png') {
      setImgSrc('/images/duy-portrait.svg')
    } else {
      setImageError(true)
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative mx-auto h-[32rem] w-full max-w-[32rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#070a14]/60 shadow-[0_24px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:h-[40rem] lg:h-[44rem]"
    >
      {/* Specular Light Reflection Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Top Specular Edge Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Ambient Lighting Dome */}
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(0,242,254,0.12),transparent_70%)]" />

      {/* Main Chiseled Portrait */}
      {!imageError ? (
        <img
          src={imgSrc}
          alt="Le Duy - IT Engineer & Creative Technologist"
          onError={handleImageError}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[92%] w-auto max-w-[92%] object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.95)]"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
          <Zap size={44} className="text-[#00f2fe] mb-3" />
          <h4 className="font-display text-2xl font-bold text-white">LE DUY</h4>
          <p className="font-mono text-xs text-[#00f2fe] mt-1">IT ENGINEER // CREATIVE TECHNOLOGIST</p>
        </div>
      )}

      {/* Refined Badge 1 (Top Right): 128 BPM // DJ with Subtle Equalizer */}
      <div
        style={{ transform: `translate3d(${tilt.y * 0.6}px, ${tilt.x * 0.6}px, 0)` }}
        className="absolute top-5 right-5 z-20 flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#070b14]/85 px-3 py-1.5 font-mono text-[11px] text-zinc-200 backdrop-blur-xl shadow-lg"
      >
        <Disc3 size={13} className="text-[#00f2fe] animate-spin" style={{ animationDuration: '6s' }} />
        <span>128 BPM</span>
        <div className="flex items-end gap-0.5 h-2.5">
          <span className="w-0.5 bg-[#00f2fe] rounded-full animate-eq-bar" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 bg-[#00f2fe] rounded-full animate-eq-bar" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 bg-[#00f2fe] rounded-full animate-eq-bar" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Refined Badge 2 (Bottom Left): Culér // Barça */}
      <div
        style={{ transform: `translate3d(${tilt.y * -0.5}px, ${tilt.x * 0.5}px, 0)` }}
        className="absolute bottom-5 left-5 z-20 flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#070b14]/85 px-3 py-1.5 font-mono text-[11px] text-zinc-200 backdrop-blur-xl shadow-lg"
      >
        <span className="w-2 h-2 rounded-full bg-[#a50044] border border-[#004d98]" />
        <span>Culér // Barça</span>
      </div>

      {/* Identity Tag (Bottom Right) */}
      <div className="absolute bottom-5 right-5 z-20 font-mono text-[10px] tracking-wider text-zinc-500">
        VINH LONG, VN
      </div>
    </div>
  )
}
