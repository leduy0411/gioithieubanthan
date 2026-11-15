import React, { useEffect, useRef } from 'react'

/**
 * SplitReveal — Awwwards-tier masked line text entrance
 *
 * Each line of text is wrapped in a clip container.
 * On mount, the text translates from Y+100% → Y0 with a 3D perspective tilt,
 * creating the "emerging from a physical slot" reveal effect used at studios
 * like Locomotive, Obys, and Resn.
 *
 * Usage:
 *   <SplitReveal tag="h1" delay={0} className="...">LE DUY</SplitReveal>
 */
export default function SplitReveal({
  children,
  tag: Tag = 'div',
  delay = 0,
  duration = 0.9,
  className = '',
  stagger = 0.08,
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Collect individual line wrappers
    const lines = el.querySelectorAll('.sr-line-inner')
    lines.forEach((line, i) => {
      line.style.transform = 'translateY(108%) skewY(3.5deg)'
      line.style.opacity = '0'
      line.style.transition = `transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}s, opacity ${duration * 0.6}s ease ${delay + i * stagger}s`
    })

    // Trigger after a micro-frame to allow CSS to register initial state
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lines.forEach(line => {
          line.style.transform = 'translateY(0%) skewY(0deg)'
          line.style.opacity = '1'
        })
      })
    })

    return () => cancelAnimationFrame(id)
  }, [delay, duration, stagger])

  /**
   * Wraps each line of text in an overflow-hidden clip container
   * so the reveal slides up into view from behind a "shelf".
   */
  const wrappedChildren = typeof children === 'string'
    ? children.split('\n').map((line, i) => (
      <span key={i} className="sr-line-clip block overflow-hidden leading-[1.1]">
        <span className="sr-line-inner block will-change-transform">{line}</span>
      </span>
    ))
    : (
      <span className="sr-line-clip block overflow-hidden">
        <span className="sr-line-inner block will-change-transform">{children}</span>
      </span>
    )

  return (
    <Tag ref={ref} className={className} {...props}>
      {wrappedChildren}
    </Tag>
  )
}

/**
 * FadeUp — Lightweight fade-up for body text and secondary elements
 */
export function FadeUp({ children, delay = 0, className = '', ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0px)'
      })
    })

    return () => cancelAnimationFrame(id)
  }, [delay])

  return <div ref={ref} className={className} {...props}>{children}</div>
}
