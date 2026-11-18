/**
 * ERROR BOUNDARY // MISSION FAULT CONTAINMENT
 * src/components/ErrorBoundary.tsx
 *
 * Global error boundary — renders a readable "SYSTEM FAULT" panel in dev,
 * and a compact inline fallback in production. The CosmicScene gets its own
 * boundary with a CSS gradient fallback so a WebGL crash never blacks out
 * the entire page.
 */

import React, { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Custom fallback UI. If omitted, renders the default SYSTEM FAULT panel. */
  fallback?: ReactNode
  /** Compact label shown in the fault panel (e.g. "CosmicScene") */
  label?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console so dev tools show the full stack
    console.error('[ErrorBoundary]', this.props.label ?? 'App', error, info.componentStack)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback !== undefined) return this.props.fallback

    // Default dev-friendly SYSTEM FAULT panel
    const isDev = import.meta.env.DEV
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020307] p-8 text-[#F8FAFC]">
        <div className="w-full max-w-lg rounded-2xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-xl">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <p className="font-mono text-xs uppercase tracking-widest text-red-400">
              SYSTEM FAULT // {this.props.label ?? 'RUNTIME'}
            </p>
          </div>

          {/* Message */}
          <p className="font-display text-lg font-bold text-white">
            {this.state.error?.name ?? 'UnknownError'}
          </p>
          <p className="mt-1 font-mono text-sm text-red-300">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>

          {/* Stack trace — dev only */}
          {isDev && this.state.error?.stack && (
            <pre className="mt-4 max-h-48 overflow-auto rounded-lg bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-zinc-400 whitespace-pre-wrap">
              {this.state.error.stack}
            </pre>
          )}

          {/* Reset button */}
          <button
            onClick={this.handleReset}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-white px-5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-zinc-200"
          >
            ↺ RESET MODULE
          </button>
        </div>
      </div>
    )
  }
}

/**
 * Convenience wrapper: CosmicScene fallback.
 * Renders a static CSS deep-space gradient so the page stays visible
 * if WebGL initialisation fails (e.g. software renderer, low-end GPU).
 */
export const CosmicFallback = (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0"
    style={{
      background:
        'radial-gradient(ellipse 60% 50% at 75% 35%, rgba(56,189,248,0.14) 0%, transparent 55%), ' +
        'radial-gradient(ellipse 40% 40% at 20% 70%, rgba(168,85,247,0.08) 0%, transparent 50%), ' +
        '#020307',
    }}
  />
)
