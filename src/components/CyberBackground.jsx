import React from 'react'

export default function CyberBackground() {
  return (
    <div aria-hidden="true" className="site-background pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#070A12]" />
      <div className="site-background-grid absolute inset-0" />
      <div className="site-background-glow site-background-glow-blue absolute -left-48 -top-56 h-[40rem] w-[40rem] rounded-full" />
      <div className="site-background-glow site-background-glow-violet absolute -right-56 top-[38%] h-[36rem] w-[36rem] rounded-full" />
      <div className="site-background-glow site-background-glow-cyan absolute -bottom-72 left-[22%] h-[34rem] w-[34rem] rounded-full" />
    </div>
  )
}
