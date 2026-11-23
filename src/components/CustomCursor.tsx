import { useEffect, useState, useRef } from 'react'
import { useMotionToggle } from '../hooks/useScrollMotion'

/**
 * CustomCursor — Pro Max Dual-Layer Hextech Precision Reticle
 * - Inner instant amber pinpoint + outer damped rotating diamond ring that locks onto interactive elements.
 */
export default function CustomCursor() {
  const { motionEnabled } = useMotionToggle()
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)

  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const angleRef = useRef(45)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer || !motionEnabled) {
      setIsVisible(false)
      return undefined
    }

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX - 2.5}px, ${e.clientY - 2.5}px, 0)`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const interactive = el?.closest('a, button, input, [role="button"], [role="tab"]')
      setIsInteractive(Boolean(interactive))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18
      pos.current.y += (target.current.y - pos.current.y) * 0.18
      angleRef.current = (angleRef.current + (isInteractive ? 1.2 : 0.25)) % 360

      if (outerRef.current) {
        const sizeOffset = isInteractive ? 15 : 11
        outerRef.current.style.transform = `translate3d(${pos.current.x - sizeOffset}px, ${pos.current.y - sizeOffset}px, 0) rotate(${angleRef.current.toFixed(1)}deg)`
      }
      rafId.current = requestAnimationFrame(render)
    }

    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [motionEnabled, isInteractive])

  if (!isVisible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className={`fixed left-0 top-0 h-[5px] w-[5px] rounded-full transition-colors duration-150 will-change-transform ${
          isInteractive
            ? 'bg-[#FDE68A] shadow-[0_0_10px_#F59E0B]'
            : 'bg-[#EC4899] shadow-[0_0_8px_#EC4899]'
        }`}
      />
      <div
        ref={outerRef}
        className={`fixed left-0 top-0 border transition-[width,height,border-color,opacity,box-shadow] duration-200 will-change-transform ${
          isInteractive
            ? 'h-[30px] w-[30px] border-[#F59E0B] opacity-95 shadow-[0_0_16px_rgba(245,158,11,0.75)]'
            : 'h-[22px] w-[22px] border-white/40 opacity-55'
        }`}
      />
    </div>
  )
}
