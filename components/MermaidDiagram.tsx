'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

interface Props {
  code: string
  id: string
}

// Track whether mermaid has been initialized for the current theme
let _mermaidInitialized = false
let _currentTheme: string | null = null

async function getMermaid(theme: string) {
  const mermaid = (await import('mermaid')).default
  // Only re-initialize if theme actually changed
  if (!_mermaidInitialized || _currentTheme !== theme) {
    mermaid.initialize({
      startOnLoad: false,
      theme,
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
      er: { useMaxWidth: true },
      themeVariables: {
        primaryColor: '#EFF4FF',
        primaryTextColor: '#161616',
        primaryBorderColor: '#0F62FE',
        lineColor: '#6F6F6F',
        secondaryColor: '#F4F2FF',
        tertiaryColor: '#ECFDF5',
        edgeLabelBackground: '#FAFAF8',
      },
      securityLevel: 'loose',
    })
    _mermaidInitialized = true
    _currentTheme = theme
  }
  return mermaid
}

export default function MermaidDiagram({ code, id }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [zoom, setZoom] = useState(1)
  // renderKey is bumped whenever we need to force a re-render (e.g. theme change)
  const [renderKey, setRenderKey] = useState(0)

  const getTheme = useCallback(() => 'default', [])

  // Main render effect – depends on code, id, and renderKey so theme changes re-trigger it
  useEffect(() => {
    let cancelled = false

    const renderDiagram = async () => {
      try {
        const theme = getTheme()
        const mermaid = await getMermaid(theme)

        // Use a unique element ID each call to avoid Mermaid's internal ID cache
        const uniqueId = `mermaid-${id}-${renderKey}-${Date.now()}`
        const { svg: rendered } = await mermaid.render(uniqueId, code)
        if (!cancelled) {
          setSvg(rendered)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Mermaid render error:', err)
          setError(code)
        }
      }
    }

    // Reset svg before re-render so loading state is shown
    setSvg('')
    setError('')
    renderDiagram()

    return () => { cancelled = true }
  }, [code, id, renderKey, getTheme])



  const handleZoomIn = () => setZoom(z => Math.min(z + 0.25, 3))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.25, 0.25))
  const handleReset = () => setZoom(1)

  const toolbar = (
    <div className="mermaid-toolbar">
      <span className="mermaid-label">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-flow)" style={{ display: 'inline', marginRight: 5 }}>
          <circle cx="12" cy="12" r="10"/>
        </svg>
        Diagram
      </span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <ToolBtn onClick={handleZoomOut} title="Zoom out">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </ToolBtn>
        <span style={{ fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'var(--font-jetbrains-mono)', minWidth: '36px', textAlign: 'center' }}>
          {Math.round(zoom * 100)}%
        </span>
        <ToolBtn onClick={handleZoomIn} title="Zoom in">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </ToolBtn>
        <ToolBtn onClick={handleReset} title="Reset zoom">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </ToolBtn>
        <div style={{ width: 1, height: 16, background: 'var(--color-hairline)', margin: '0 2px' }} />
        <ToolBtn onClick={() => setIsFullscreen(true)} title="Fullscreen">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </ToolBtn>
      </div>
    </div>
  )

  const diagramContent = error ? (
    <pre style={{
      padding: '1rem',
      fontSize: '12px',
      color: 'var(--color-muted)',
      overflow: 'auto',
      fontFamily: 'var(--font-jetbrains-mono)',
      whiteSpace: 'pre-wrap',
    }}>
      {error}
    </pre>
  ) : !svg ? (
    <div style={{
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      color: 'var(--color-muted)',
      fontSize: '13px',
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Rendering diagram…
    </div>
  ) : (
    <div
      ref={containerRef}
      className="mermaid-container"
      style={{
        overflowX: 'auto',
        overflowY: 'auto',
        minHeight: '80px',
        maxHeight: isFullscreen ? 'calc(100vh - 120px)' : '500px',
      }}
    >
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s',
          display: 'inline-block',
          minWidth: '100%',
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="diagram-fullscreen">
        <div style={{ flexShrink: 0 }}>
          <div className="mermaid-toolbar" style={{ borderRadius: 0 }}>
            <span className="mermaid-label">Diagram — Fullscreen</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <ToolBtn onClick={handleZoomOut} title="Zoom out">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </ToolBtn>
              <span style={{ fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'var(--font-jetbrains-mono)', minWidth: '36px', textAlign: 'center' }}>
                {Math.round(zoom * 100)}%
              </span>
              <ToolBtn onClick={handleZoomIn} title="Zoom in">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </ToolBtn>
              <ToolBtn onClick={handleReset} title="Reset">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </ToolBtn>
              <div style={{ width: 1, height: 16, background: 'var(--color-hairline)', margin: '0 2px' }} />
              <ToolBtn onClick={() => setIsFullscreen(false)} title="Exit fullscreen">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                </svg>
              </ToolBtn>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '2rem',
            background: 'var(--color-bg)',
          }}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s',
              display: 'inline-block',
              minWidth: '100%',
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mermaid-wrapper">
      {toolbar}
      {diagramContent}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function ToolBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      style={{
        padding: '5px',
        borderRadius: '5px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.12s, color 0.12s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface-hover)'; e.currentTarget.style.color = 'var(--color-ink)' }}
      onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--color-muted)' }}
    >
      {children}
    </button>
  )
}
