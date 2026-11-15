import React, { useEffect, useState, useRef } from 'react'

/**
 * CustomCursor — Spatial & Kinetic Magnetic Cursor (2026 Studio Standard)
 * Features:
 * - Spring interpolation towards mouse coordinates
 * - Context-aware pill expansion with dynamic text labels (EXPLORE, VIEW, ORBIT 3D, COPY)
 * - Chromatic aberration fringe on click & magnetic snap
 * - Auto-disabled on mobile and touchscreens
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    setIsVisible(true)

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    // Context-aware hover detection
    const handleMouseOver = (e) => {
      const textTarget = e.target.closest('[data-cursor-text]')
      if (textTarget) {
        setCursorText(textTarget.getAttribute('data-cursor-text') || '')
        setIsHovered(true)
        return
      }

      const interactive = e.target.closest(
        'a, button, input, textarea, select, [data-cursor="hover"], .cyber-card, .spatial-glass, .tactile-btn'
      )
      if (interactive) {
        setCursorText('')
        setIsHovered(true)
      } else {
        setCursorText('')
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    const render = () => {
      // Smooth lerp physics
      pos.current.x += (target.current.x - pos.current.x) * 0.16
      pos.current.y += (target.current.y - pos.current.y) * 0.16

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      rafId.current = requestAnimationFrame(render)
    }

    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (!isVisible) return null

  const hasText = !!cursorText

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999999] overflow-hidden" aria-hidden="true">
      {/* 1. Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed -left-1 -top-1 w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_12px_#00D9FF] transition-opacity duration-200 will-change-transform ${
          isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      />

      {/* 2. Fluid Kinetic Outer Ring / Pill */}
      <div
        ref={cursorRef}
        className={`fixed -left-6 -top-6 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          hasText
            ? 'px-4 py-2 rounded-full bg-white/[0.90] text-[#030306] shadow-[0_0_25px_rgba(0,217,255,0.6)] backdrop-blur-md'
            : isHovered
            ? 'w-16 h-16 rounded-full border border-[#00D9FF] bg-[#00D9FF]/10 shadow-[0_0_20px_rgba(0,217,255,0.3)] backdrop-blur-[2px]'
            : isClicked
            ? 'w-10 h-10 rounded-full border border-white/60 bg-white/20 scale-90'
            : 'w-12 h-12 rounded-full border border-white/20 bg-transparent'
        }`}
      >
        {hasText && (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase select-none whitespace-nowrap text-[#030306]">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
