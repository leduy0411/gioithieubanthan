import React, { useState, useRef } from 'react'

/**
 * TiltCard — High-End 3D Perspective Tilt + Realistic Glare Reflection
 * Inspired by Apple VisionOS & Active Theory spatial glass.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  glareOpacity = 0.25,
  ...props
}) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`)
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity
    })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative spatial-glass spotlight-card cyber-card overflow-hidden transition-all duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d'
      }}
      {...props}
    >
      {/* 3D Specular Glare Reflection Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 ease-out rounded-[inherit]"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.35), transparent 70%)`
        }}
      />
      {children}
    </div>
  )
}
