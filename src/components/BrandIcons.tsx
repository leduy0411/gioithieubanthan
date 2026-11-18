import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

/**
 * BrandIcons — Ultra-crisp Custom SVG Logos & Symbols
 * Strictly follows brand geometry, gradients, and proper aspect ratios.
 */

export function FacebookLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function LocketLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="2" y="3" width="20" height="18" rx="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="7" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12.5" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 15.2s-2.8-1.75-2.8-3.45c0-.95.75-1.7 1.7-1.7.6 0 1.1.25 1.4.7.3-.45.8-.7 1.4-.7.95 0 1.7.75 1.7 1.7 0 1.7-2.8 3.45-2.8 3.45z"
        fill="currentColor"
      />
    </svg>
  )
}

export function InstagramLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <defs>
        <linearGradient id="ig-grad" x1="2" y1="21" x2="22" y2="3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC107" />
          <stop offset="0.3" stopColor="#F44336" />
          <stop offset="0.65" stopColor="#E91E63" />
          <stop offset="1" stopColor="#9C27B0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="url(#ig-grad)" />
    </svg>
  )
}

export function TikTokLogo({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      {/* 3D Cyan Offset */}
      <path
        d="M19.5 8.2c-1.5-.2-2.9-.9-4-2.1v8.8c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6c.4 0 .8.05 1.2.14v3.2c-.38-.13-.78-.2-1.2-.2-1.4 0-2.6 1.15-2.6 2.55s1.15 2.55 2.6 2.55 2.6-1.15 2.6-2.55V2h3.3c.2 2 1.8 3.6 3.7 3.8v2.4z"
        fill="#00F2FE"
        transform="translate(-0.8, -0.6)"
      />
      {/* 3D Magenta Offset */}
      <path
        d="M19.5 8.2c-1.5-.2-2.9-.9-4-2.1v8.8c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6c.4 0 .8.05 1.2.14v3.2c-.38-.13-.78-.2-1.2-.2-1.4 0-2.6 1.15-2.6 2.55s1.15 2.55 2.6 2.55 2.6-1.15 2.6-2.55V2h3.3c.2 2 1.8 3.6 3.7 3.8v2.4z"
        fill="#FF0080"
        transform="translate(0.8, 0.6)"
      />
      {/* White Main Glyph */}
      <path
        d="M19.5 8.2c-1.5-.2-2.9-.9-4-2.1v8.8c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6c.4 0 .8.05 1.2.14v3.2c-.38-.13-.78-.2-1.2-.2-1.4 0-2.6 1.15-2.6 2.55s1.15 2.55 2.6 2.55 2.6-1.15 2.6-2.55V2h3.3c.2 2 1.8 3.6 3.7 3.8v2.4z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

/**
 * DJ Turntable SVG with Grooved Vinyl and Moving Tonearm
 */
export function TurntableIcon({ className = 'w-8 h-8', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.8" />
      <circle cx="14" cy="16" r="10" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="16" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
      <circle cx="14" cy="16" r="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" />
      <circle cx="26" cy="8" r="2" fill="currentColor" />
      <path d="M26 10l-4 7-2 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="26" y1="21" x2="26" y2="27" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="24.5" y="23" width="3" height="2" rx="0.5" fill="currentColor" />
    </svg>
  )
}

/**
 * Camera Optical Lens SVG with Aperture Blades
 */
export function CameraLensIcon({ className = 'w-8 h-8', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="9.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" strokeOpacity="0.6" />
      <path d="M16 8l4.5 4.5M22.5 11l-1 6M23 19l-5.5 2M18 24l-4.5-4.5M9.5 21l1-6M9 13l5.5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14.5" cy="14.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

/**
 * FC Barcelona Minimalist Blaugrana Shield
 */
export function BarcaShieldIcon({ className = 'w-8 h-8', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <path
        d="M16 2l11 3v9c0 8.5-7 14.5-11 16-4-1.5-11-7.5-11-16V5l11-3z"
        stroke="#FFED00"
        strokeWidth="1.8"
      />
      <path d="M8 7h6M11 4v6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M19 4v6M21.5 4v6M24 4v6" stroke="#FFED00" strokeWidth="1.2" />
      <path d="M6 13h20" stroke="#FFED00" strokeWidth="1.8" />
      <path d="M11 15v10" stroke="#004D98" strokeWidth="2.4" />
      <path d="M16 15v11" stroke="#A50044" strokeWidth="2.4" />
      <path d="M21 15v10" stroke="#004D98" strokeWidth="2.4" />
    </svg>
  )
}

/**
 * GitHub Logo SVG
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
