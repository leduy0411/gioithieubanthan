import React, { useEffect, useRef } from 'react'

const MARQUEE_ITEMS = [
  'DISTRIBUTED BACKEND ARCHITECTURE',
  'CHROMATIC BRAND IDENTITY',
  '4K CINEMATIC MOTION & VFX',
  'CUSTOM THREE.JS / GLSL SHADERS',
  'HIGH-CONCURRENCY NODE.JS & REDIS',
  'FC BARCELONA SPIRIT & LEGACY',
  'DOCKER & KUBERNETES RESILIENCE',
  'ELECTRONIC SOUND MIXING & 128 BPM',
  'MICROSERVICES & RESTful / GraphQL API',
  'ADOBE SUITE MASTERY: PS • AI • PR • AE'
]

export default function KineticMarquee() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const speedRef = useRef(1)
  const targetSpeedRef = useRef(1)
  const posRef = useRef(0)
  const rafId = useRef(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastScrollTime = performance.now()

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = performance.now()
      const deltaY = Math.abs(currentScrollY - lastScrollY)
      const deltaTime = Math.max(currentTime - lastScrollTime, 1)

      const velocity = deltaY / deltaTime // px per ms
      // Accelerate speed on scroll
      targetSpeedRef.current = 1 + Math.min(velocity * 4.5, 9.0)

      lastScrollY = currentScrollY
      lastScrollTime = currentTime
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const animate = () => {
      // Lerp speed back to 1.0 (smooth deceleration)
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08
      targetSpeedRef.current += (1.0 - targetSpeedRef.current) * 0.04

      posRef.current -= speedRef.current * 0.75

      if (trackRef.current) {
        // Loop modulo when half width scrolled
        const halfWidth = trackRef.current.scrollWidth / 2
        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = 0
        }
        trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-6 border-y border-white/[0.08] bg-[#030306]/75 backdrop-blur-md select-none my-12"
      aria-hidden="true"
    >
      {/* Edge Fade Masks for smooth infinite blending */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#030306] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#030306] to-transparent z-10" />

      <div ref={trackRef} className="flex items-center gap-8 whitespace-nowrap will-change-transform">
        {/* Render twice for seamless infinite looping */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-display font-bold text-sm sm:text-base tracking-[0.2em] uppercase text-white/80 hover:text-[#00D9FF] transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          </div>
        ))}
      </div>
    </div>
  )
}
