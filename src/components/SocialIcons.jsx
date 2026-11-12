import React from 'react'

/**
 * Authentic, Standard Brand SVG Logos & Passion Badges
 * - Facebook: Official blue circle with white 'f'
 * - Locket: Official golden squircle with centered camera lens & heart
 * - Instagram: Official multi-color sunset gradient with white camera outline
 * - TikTok: Official black squircle with cyan/pink 3D stereoscopic note
 * - Gmail: Official white squircle with Google 4-color 'M'
 * - FC Barcelona: Official Blaugrana Club Crest (Shield, St George cross, Senyera, FCB, ball)
 * - Camera DSLR: Authentic photography camera lens with optical glass glare
 * - DJ Turntable: Turntable vinyl deck with soundwaves
 * - Tech & Creative Logos: Node.js, Database, Photoshop, Illustrator, Premiere, After Effects
 */

// 1. Official Facebook Brand Logo
export function FacebookIcon({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#1877F2" />
      <path
        d="M29.68 25.13l.8-5.21h-5v-3.38c0-1.42.7-2.81 2.93-2.81h2.27V9.29s-2.06-.35-4.03-.35c-4.11 0-6.8 2.49-6.8 7v3.98h-4.57v5.21h4.57V38.1a24.1 24.1 0 005.6 0V25.13h4.23z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

// 2. Official Locket Widget Brand Logo (Matching User Provided Artwork)
export function LocketIcon({ className = 'w-10 h-10' }) {
  return (
    <img
      src="/images/locket-icon.png"
      alt="Locket Widget"
      className={`${className} object-contain rounded-2xl select-none shadow-sm`}
    />
  )
}

// 3. Official Instagram Brand Logo
export function InstagramIcon({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="igRadial" cx="20%" cy="105%" r="120%">
          <stop offset="0%" stopColor="#FEE411" />
          <stop offset="25%" stopColor="#FEDB16" />
          <stop offset="50%" stopColor="#FE4164" />
          <stop offset="75%" stopColor="#E6007A" />
          <stop offset="100%" stopColor="#7E00B8" />
        </radialGradient>
        <linearGradient id="igLinear" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FCAF45" />
          <stop offset="45%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#igLinear)" />
      {/* Camera Outline */}
      <rect
        x="11"
        y="11"
        width="26"
        height="26"
        rx="7.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.2"
      />
      {/* Center Lens */}
      <circle
        cx="24"
        cy="24"
        r="6.2"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.2"
      />
      {/* Flash Dot */}
      <circle cx="31.2" cy="16.8" r="1.6" fill="#FFFFFF" />
    </svg>
  )
}

// 4. Official TikTok Brand Logo
export function TikTokIcon({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill="#010101" />
      <g transform="translate(10, 8.5) scale(1.15)">
        {/* Magenta / Pink offset */}
        <path
          d="M17.4 5.9a4.2 4.2 0 01-3.3-3.7V2h-3v12a2.5 2.5 0 01-4.5 1.5 2.5 2.5 0 012-4c.3 0 .5 0 .8.1V8.2a5.5 5.5 0 00-.8 0 5.5 5.5 0 105.5 5.5V7.8a7.1 7.1 0 004.1 1.3v-3.2z"
          fill="#FE2C55"
          transform="translate(1.2, 0.8)"
        />
        {/* Cyan offset */}
        <path
          d="M17.4 5.9a4.2 4.2 0 01-3.3-3.7V2h-3v12a2.5 2.5 0 01-4.5 1.5 2.5 2.5 0 012-4c.3 0 .5 0 .8.1V8.2a5.5 5.5 0 00-.8 0 5.5 5.5 0 105.5 5.5V7.8a7.1 7.1 0 004.1 1.3v-3.2z"
          fill="#25F4EE"
          transform="translate(-1.2, -0.8)"
        />
        {/* White Center Glyph */}
        <path
          d="M17.4 5.9a4.2 4.2 0 01-3.3-3.7V2h-3v12a2.5 2.5 0 01-4.5 1.5 2.5 2.5 0 012-4c.3 0 .5 0 .8.1V8.2a5.5 5.5 0 00-.8 0 5.5 5.5 0 105.5 5.5V7.8a7.1 7.1 0 004.1 1.3v-3.2z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  )
}

// 5. Official Gmail Brand Logo (Google 4-color M)
export function GmailIcon({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill="#FFFFFF" />
      <g transform="translate(8, 10)">
        {/* Red roof fold */}
        <path
          d="M3.2 6.8V23.5C3.2 25.4 4.8 27 6.7 27H10.5V13.8L16 18.2L21.5 13.8V27H25.3C27.2 27 28.8 25.4 28.8 23.5V6.8L16 16.5L3.2 6.8Z"
          fill="#EA4335"
        />
        {/* Green right bar */}
        <path
          d="M28.8 6.8V23.5C28.8 25.4 27.2 27 25.3 27H22.5V13.8L28.8 9V6.8Z"
          fill="#34A853"
        />
        {/* Blue left bar */}
        <path
          d="M3.2 6.8V23.5C3.2 25.4 4.8 27 6.7 27H9.5V13.8L3.2 9V6.8Z"
          fill="#4285F4"
        />
        {/* Red top band */}
        <path
          d="M6.7 3.5H11.5L16 7.2L20.5 3.5H25.3C27.2 3.5 28.8 5.1 28.8 7V9.5L16 19.2L3.2 9.5V7C3.2 5.1 4.8 3.5 6.7 3.5Z"
          fill="#EA4335"
        />
        {/* Yellow top-left corner */}
        <path
          d="M3.2 7C3.2 5.1 4.8 3.5 6.7 3.5H11.5V11L3.2 4.5V7Z"
          fill="#FBBC04"
        />
        {/* Green top-right corner */}
        <path
          d="M28.8 7C28.8 5.1 27.2 3.5 25.3 3.5H20.5V11L28.8 4.5V7Z"
          fill="#34A853"
        />
      </g>
    </svg>
  )
}

// 6. Official FC Barcelona Crest Logo (Matching User Provided Crest)
export function FCBarcelonaLogo({ className = 'w-12 h-12' }) {
  return (
    <img
      src="/images/fc-barcelona.png"
      alt="FC Barcelona Official Crest"
      className={`${className} object-contain select-none`}
    />
  )
}

// 7. Authentic Camera DSLR Logo (Landscape Photography)
export function CameraDSLRLogo({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Outer camera body */}
      <rect x="4" y="12" width="40" height="28" rx="7" fill="#1A1F2C" stroke="#00D9FF" strokeWidth="1.8" />
      {/* Viewfinder hump */}
      <path d="M16 12L19 7H29L32 12H16Z" fill="#121620" stroke="#00D9FF" strokeWidth="1.8" />
      {/* Shutter button */}
      <rect x="9" y="8" width="5" height="4" rx="1.5" fill="#A855F7" />
      {/* Grip accent strip */}
      <rect x="6" y="17" width="4" height="18" rx="2" fill="#2E3547" />
      {/* Front camera lens barrel */}
      <circle cx="27" cy="26" r="11" fill="#0E121B" stroke="#00D9FF" strokeWidth="2" />
      <circle cx="27" cy="26" r="8" fill="#1558C9" fillOpacity="0.4" stroke="#00D9FF" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="27" cy="26" r="5" fill="#00D9FF" fillOpacity="0.3" />
      {/* Optical Glass reflection flare */}
      <circle cx="30" cy="23" r="2" fill="#FFFFFF" fillOpacity="0.85" />
      <circle cx="24" cy="28" r="1.2" fill="#D4FF24" fillOpacity="0.75" />
    </svg>
  )
}

// 8. Authentic DJ Turntable Logo (DJing & Music)
export function DJTurntableLogo({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Turntable deck chassis */}
      <rect x="4" y="6" width="40" height="36" rx="6" fill="#0E121B" stroke="#D4FF24" strokeWidth="1.8" />
      {/* Vinyl Platter */}
      <circle cx="21" cy="24" r="14" fill="#05070A" stroke="#1F2839" strokeWidth="2" />
      {/* Vinyl Grooves */}
      <circle cx="21" cy="24" r="10.5" stroke="#253046" strokeWidth="1" />
      <circle cx="21" cy="24" r="7.5" stroke="#1F2839" strokeWidth="1" />
      {/* Center Label in Neon Lime */}
      <circle cx="21" cy="24" r="4.5" fill="#D4FF24" />
      <circle cx="21" cy="24" r="1.5" fill="#05070A" />
      {/* Tonearm */}
      <circle cx="39" cy="13" r="2.5" fill="#A855F7" />
      <path d="M39 13L35 27L32 30" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="29" width="3.5" height="5" rx="1" fill="#00D9FF" />
      {/* Pitch fader */}
      <rect x="37" y="24" width="2" height="12" rx="1" fill="#1F2839" />
      <rect x="36" y="28" width="4" height="2.5" rx="0.5" fill="#D4FF24" />
    </svg>
  )
}

export function GithubIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function NodeLogo({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 3l13 7.5v15L16 33 3 25.5v-15L16 3z"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 7l9 5.2v10.4L16 27.8 7 22.6V12.2L16 7z"
        fill="#22C55E"
        fillOpacity="0.25"
      />
      <text
        x="16"
        y="19"
        fill="#22C55E"
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        JS
      </text>
    </svg>
  )
}

export function DatabaseLogo({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

export function PhotoshopLogo({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#001E36" stroke="#31A8FF" strokeWidth="1.5" />
      <text x="7" y="16.5" fill="#31A8FF" fontSize="10" fontWeight="900" fontFamily="sans-serif">P</text>
      <text x="13" y="16.5" fill="#31A8FF" fontSize="8" fontWeight="700" fontFamily="sans-serif">s</text>
    </svg>
  )
}

export function IllustratorLogo({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#330000" stroke="#FF9A00" strokeWidth="1.5" />
      <text x="6.5" y="16.5" fill="#FF9A00" fontSize="10" fontWeight="900" fontFamily="sans-serif">A</text>
      <text x="14" y="16.5" fill="#FF9A00" fontSize="8" fontWeight="700" fontFamily="sans-serif">i</text>
    </svg>
  )
}

export function PremiereLogo({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#00005B" stroke="#9999FF" strokeWidth="1.5" />
      <text x="6.5" y="16.5" fill="#9999FF" fontSize="10" fontWeight="900" fontFamily="sans-serif">P</text>
      <text x="13" y="16.5" fill="#9999FF" fontSize="8" fontWeight="700" fontFamily="sans-serif">r</text>
    </svg>
  )
}

export function AfterEffectsLogo({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#00005B" stroke="#D291FF" strokeWidth="1.5" />
      <text x="6" y="16.5" fill="#D291FF" fontSize="10" fontWeight="900" fontFamily="sans-serif">A</text>
      <text x="13.5" y="16.5" fill="#D291FF" fontSize="8" fontWeight="700" fontFamily="sans-serif">e</text>
    </svg>
  )
}
