import React from 'react'

export default function SiteLogo({ className = '' }) {
  return (
    <img
      src="/images/site-logo.png"
      alt="Le Duy"
      width="334"
      height="265"
      className={`object-contain ${className}`}
      draggable="false"
    />
  )
}
