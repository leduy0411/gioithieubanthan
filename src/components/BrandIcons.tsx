import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

/**
 * BrandIcons — Custom & Simple-Icons SVG Vector Paths
 *
 * Provenance Notes:
 * - FacebookLogo & GithubLogo: Official simple-icons SVG paths.
 * - InstagramLogo: Rounded camera glyph with official 4-stop gradient (#F58529 -> #DD2A7B -> #8134AF -> #515BD4).
 * - TikTokLogo: Musical note glyph (simple-icons derived) with dual Cyan (#00F2FE) + Magenta (#FE2C55) phase offset.
 * - LocketLogo: Custom geometric approximation (rounded widget frame with #FFB800 heart center).
 * - TurntableIcon, CameraLensIcon, BarcaShieldIcon: Original bespoke geometric SVGs (non-trademarked Blaugrana shield approximation).
 */

export function FacebookLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

/**
 * Custom Geometric Approximation: Locket Widget Frame with #FFB800 Heart
 */
export function LocketLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="#FFB800"
        strokeWidth="2"
      />
      <path
        d="M12 16.6s-4.6-2.85-4.6-5.75c0-1.55 1.22-2.75 2.75-2.75.92 0 1.72.45 2.2 1.15.48-.7 1.28-1.15 2.2-1.15 1.53 0 2.75 1.2 2.75 2.75 0 2.9-4.6 5.75-4.6 5.75z"
        fill="#FFB800"
      />
    </svg>
  )
}

/**
 * Instagram Glyph with exact 4-stop Gradient (#F58529 -> #DD2A7B -> #8134AF -> #515BD4)
 */
export function InstagramLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <defs>
        <linearGradient id="ig-brand-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="35%" stopColor="#DD2A7B" />
          <stop offset="70%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-brand-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.3" stroke="url(#ig-brand-grad)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="url(#ig-brand-grad)" />
    </svg>
  )
}

/**
 * TikTok Musical Note with Phase-Offset Cyan (#00F2FE) + Magenta (#FE2C55)
 */
export function TikTokLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      {/* Cyan Phase Offset (#00F2FE) */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
        fill="#00F2FE"
        transform="translate(-0.75, -0.6)"
      />
      {/* Magenta Phase Offset (#FE2C55) */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
        fill="#FE2C55"
        transform="translate(0.75, 0.6)"
      />
      {/* Core White Glyph */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

/**
 * Custom Bespoke SVG: DJ Turntable
 */
export function TurntableIcon({ className = 'w-8 h-8', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="16" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="14"
        cy="16"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        strokeOpacity="0.65"
      />
      <circle cx="14" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="14" cy="16" r="1.2" fill="currentColor" />
      <circle cx="25.5" cy="8.5" r="1.8" fill="currentColor" />
      <path d="M25.5 10.3L22 17.5l-2.2 1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Custom Bespoke SVG: Optical Camera Lens
 */
export function CameraLensIcon({ className = 'w-8 h-8', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <circle cx="16" cy="16" r="12.5" stroke="currentColor" strokeWidth="1.8" />
      <circle
        cx="16"
        cy="16"
        r="9"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeDasharray="3 2"
        strokeOpacity="0.6"
      />
      <path
        d="M16 7.5l4 4M22.5 11l-1 5.5M22.5 19.5l-5 1.8M17.5 24l-4-4M9.5 20.5l1-5.5M9.5 12.5l5-1.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

/**
 * Custom Bespoke SVG: Minimalist Blaugrana Shield (Original design, does not copy official club crest)
 */
export function BarcaShieldIcon({ className = 'w-8 h-8', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <path
        d="M16 3l10.5 3v8.5c0 8.2-6.5 13.8-10.5 15.5-4-1.7-10.5-7.3-10.5-15.5V6L16 3z"
        stroke="#F59E0B"
        strokeWidth="1.6"
      />
      <path d="M6.5 13.5h19" stroke="#F59E0B" strokeWidth="1.4" />
      <path d="M11.5 15v9.5" stroke="#004D98" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 15v10.5" stroke="#A50044" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20.5 15v9.5" stroke="#004D98" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Official Simple-Icons GitHub Path
 */
export function GithubLogo({ className = 'w-4 h-4', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}
