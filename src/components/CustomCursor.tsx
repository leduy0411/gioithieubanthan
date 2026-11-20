import { useEffect, useState, useRef } from 'react'
import { useMotionToggle } from '../hooks/useScrollMotion'

/**
 * CustomCursor — Stylized Arcane Diamond Cursor Accent (Keeps native cursor visible)
 */
export default function CustomCursor() {
  const { motionEnabled } = useMotionToggle()
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)

  const reticleRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
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
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const interactive = el?.closest('a, button, input, [role="button"]')
      setIsInteractive(Boolean(interactive))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16
      pos.current.y += (target.current.y - pos.current.y) * 0.16

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${pos.current.x - 10}px, ${pos.current.y - 10}px, 0) rotate(45deg)`
      }
      rafId.current = requestAnimationFrame(render)
    }

    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [motionEnabled])

  if (!isVisible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={reticleRef}
        className={`fixed left-0 top-0 h-5 w-5 border transition-[border-color,opacity,box-shadow] duration-200 will-change-transform ${
          isInteractive
            ? 'border-[#EC4899] opacity-90 shadow-[0_0_12px_rgba(236,72,153,0.75)]'
            : 'border-white/35 opacity-50'
        }`}
      />
    </div>
  )
}
