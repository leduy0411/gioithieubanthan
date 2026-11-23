import { useEffect, useState, useRef } from 'react'
import { useMotionToggle } from '../hooks/useScrollMotion'

/**
 * CustomCursor — League of Legends Piltover Hextech Precision Target Reticle
 * - Inner instant Mana Cyan (#0AC8B9) crystal pinpoint + outer damped rotating Piltover Gold (#C89B3C) diamond reticle.
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
        innerRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0) rotate(45deg)`
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
      angleRef.current = (angleRef.current + (isInteractive ? 1.35 : 0.25)) % 360

      if (outerRef.current) {
        const sizeOffset = isInteractive ? 16 : 11
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
      {/* Inner Hextech Mana Crystal Pinpoint */}
      <div
        ref={innerRef}
        className={`fixed left-0 top-0 h-[6px] w-[6px] border transition-colors duration-150 will-change-transform ${
          isInteractive
            ? 'border-white bg-[#F0E6D2] shadow-[0_0_12px_#C89B3C]'
            : 'border-[#E0F2FE] bg-[#0AC8B9] shadow-[0_0_10px_#0AC8B9]'
        }`}
      />
      {/* Outer Piltover Gold Rotating Diamond Reticle with Corner Notches */}
      <div
        ref={outerRef}
        className={`fixed left-0 top-0 border transition-[width,height,border-color,opacity,box-shadow] duration-200 will-change-transform ${
          isInteractive
            ? 'h-[32px] w-[32px] border-[#0AC8B9] opacity-95 shadow-[0_0_18px_rgba(10,200,185,0.7),inset_0_0_8px_rgba(200,155,60,0.6)]'
            : 'h-[22px] w-[22px] border-[#C89B3C]/65 opacity-65'
        }`}
      >
        <span className="absolute -left-0.5 -top-0.5 h-1.5 w-1.5 border-l border-t border-[#F0E6D2]" />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 border-r border-t border-[#F0E6D2]" />
        <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-b border-l border-[#F0E6D2]" />
        <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border-b border-r border-[#F0E6D2]" />
      </div>
    </div>
  )
}
