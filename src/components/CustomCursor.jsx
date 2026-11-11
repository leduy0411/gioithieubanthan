import React, { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    // Only enable on fine pointer devices (desktop / mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024
    if (isTouch) return

    setIsVisible(true)

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    // Detect hoverable elements
    const handleMouseOver = (e) => {
      const targetEl = e.target.closest('a, button, input, textarea, select, [data-cursor="hover"], .cyber-card')
      setIsHovered(!!targetEl)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)

    // Smooth lerp animation loop for the outer cursor ring
    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18
      pos.current.y += (target.current.y - pos.current.y) * 0.18

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

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer Glow Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border transition-all duration-150 ease-out will-change-transform ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-[#D4FF24] bg-[#D4FF24]/10 shadow-[0_0_20px_rgba(212,255,36,0.6)]'
            : isClicked
            ? 'w-6 h-6 -ml-3 -mt-3 border-[#00D9FF] bg-[#1558C9]/30 shadow-[0_0_15px_rgba(21,88,201,0.8)]'
            : 'w-8 h-8 border-[#1558C9] bg-[#1558C9]/10 shadow-[0_0_12px_rgba(21,88,201,0.5)]'
        }`}
      />

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full transition-transform duration-75 ease-out will-change-transform ${
          isHovered
            ? 'w-2.5 h-2.5 -ml-1.25 -mt-1.25 bg-[#D4FF24] shadow-[0_0_8px_#D4FF24]'
            : 'w-2 h-2 bg-[#F5F7FA] shadow-[0_0_6px_#00D9FF]'
        }`}
      />
    </div>
  )
}
