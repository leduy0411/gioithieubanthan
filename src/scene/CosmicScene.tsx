import { useEffect, useRef } from 'react'
import { getLiveScrollVelocity, useMotionToggle } from '../hooks/useScrollMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  rotation: number
  vRot: number
  kind: 'petal' | 'ember' | 'spark'
  phase: number
}

/**
 * CosmicScene — Always-Alive Velocity-Reactive Sakura Petals, Golden Embers & Arcane Sparks
 *
 * - Idle Motion: Petals gently drift diagonally while warm gold embers & violet diamond sparks rise.
 * - Scroll Motion: Immediately whips & elongates particles proportionally to live scroll velocity
 *   in BOTH scroll-down and scroll-up directions.
 * - Controlled cleanly via the Navbar `FX: ON/OFF` toggle.
 */
export default function CosmicScene(_props: { currentSection?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { motionEnabled } = useMotionToggle()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    const count = isMobile ? 38 : 74

    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticle = (randomY = true): Particle => {
      const roll = Math.random()
      const kind: Particle['kind'] =
        roll < 0.42 ? 'petal' : roll < 0.76 ? 'ember' : 'spark'

      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : kind === 'petal' ? -20 : height + 20,
        vx: kind === 'petal' ? 0.45 + Math.random() * 0.65 : (Math.random() - 0.5) * 0.45,
        vy: kind === 'petal' ? 0.55 + Math.random() * 0.7 : -(0.4 + Math.random() * 0.65),
        size: kind === 'petal' ? 5 + Math.random() * 4.5 : 1.8 + Math.random() * 2.6,
        alpha: 0.32 + Math.random() * 0.55,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.032,
        kind,
        phase: Math.random() * Math.PI * 2,
      }
    }

    const particles: Particle[] = Array.from({ length: count }, () => spawnParticle(true))

    const drawFrame = (timeSec: number, animateStep: boolean) => {
      ctx.clearRect(0, 0, width, height)

      const { speed, signed } = getLiveScrollVelocity()
      const speedMult = 1 + speed * 5.2
      const scrollWindY = -signed * 8.5

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (animateStep) {
          p.x +=
            (p.vx + Math.sin(timeSec * 1.1 + p.phase) * (p.kind === 'petal' ? 0.55 : 0.28)) *
            (1 + speed * 1.8)
          p.y += p.vy * speedMult + scrollWindY * (p.kind === 'petal' ? 0.85 : 1.15)
          p.rotation += p.vRot * speedMult

          if (p.x > width + 32) p.x = -24
          if (p.x < -32) p.x = width + 24
          if (p.y > height + 36) {
            p.y = -24
            p.x = Math.random() * width
          } else if (p.y < -36) {
            p.y = height + 24
            p.x = Math.random() * width
          }
        }

        const twinkle = 0.65 + 0.35 * Math.sin(timeSec * 2.5 + p.phase)
        const alpha = Math.min(p.alpha * twinkle * (1 + speed * 0.4), 0.98)

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        if (p.kind === 'petal') {
          const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size)
          grad.addColorStop(0, `rgba(255, 182, 193, ${alpha})`)
          grad.addColorStop(1, `rgba(236, 72, 153, ${alpha * 0.9})`)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.moveTo(0, -p.size)
          ctx.bezierCurveTo(p.size * 0.95, -p.size * 0.4, p.size * 0.7, p.size * 0.7, 0, p.size)
          ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.7, -p.size * 0.95, -p.size * 0.4, 0, -p.size)
          ctx.fill()
        } else if (p.kind === 'ember') {
          ctx.shadowColor = 'rgba(245, 158, 11, 0.9)'
          ctx.shadowBlur = 12
          ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size, p.size * (1 + speed * 3.4), 0, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.shadowColor = 'rgba(139, 92, 246, 0.95)'
          ctx.shadowBlur = 10
          ctx.fillStyle = `rgba(216, 180, 254, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(0, -p.size * (1.5 + speed * 2.2))
          ctx.lineTo(p.size * 0.9, 0)
          ctx.lineTo(0, p.size * (1.5 + speed * 2.2))
          ctx.lineTo(-p.size * 0.9, 0)
          ctx.closePath()
          ctx.fill()
        }

        ctx.restore()
      }
    }

    if (!motionEnabled) {
      drawFrame(0, false)
      return () => {
        window.removeEventListener('resize', resize)
      }
    }

    let isVisible = !document.hidden
    const onVisibility = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    let rafId: number
    const start = performance.now()
    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop)
      if (!isVisible) return
      drawFrame((now - start) / 1000, true)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [motionEnabled])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
    />
  )
}
