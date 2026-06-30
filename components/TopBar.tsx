'use client'
import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

interface Props {
  onSearch: () => void
  onMenuToggle: () => void
  version: string
}

export default function TopBar({ onSearch, onMenuToggle, version }: Props) {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onSearch()
      }
      if (e.key === '/' && !['INPUT','TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName ?? '')) {
        e.preventDefault()
        onSearch()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onSearch])

  return (
    <header
      className="topbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--topbar-height)',
        zIndex: 100,
        background: 'var(--color-bg)',
        borderBottom: `1px solid var(--color-hairline)`,
        boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '16px',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        aria-label="Toggle sidebar"
        className="md:hidden"
        style={{
          padding: '6px',
          borderRadius: '6px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-muted)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Wordmark */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontWeight: 800,
          fontSize: '18px',
          letterSpacing: '-0.04em',
          color: 'var(--color-ink)',
        }}>
          SCENEORA
        </span>
        <span style={{
          fontSize: '10px',
          fontFamily: 'var(--font-space-grotesk)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'var(--color-proposed)',
          background: 'var(--color-proposed-bg)',
          padding: '2px 8px',
          borderRadius: '4px',
          textTransform: 'uppercase',
        }}>
          v{version} Canonical
        </span>
      </a>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <button
        onClick={onSearch}
        aria-label="Open search (/ or ⌘K)"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '7px 14px',
          borderRadius: '8px',
          border: `1px solid var(--color-hairline)`,
          background: 'var(--color-surface)',
          cursor: 'pointer',
          color: 'var(--color-muted)',
          fontSize: '13px',
          fontFamily: 'var(--font-inter)',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          minWidth: '180px',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-hairline)')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span>Search docs…</span>
        <kbd style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '11px',
          padding: '2px 6px',
          borderRadius: '4px',
          background: 'var(--color-bg-secondary)',
          border: `1px solid var(--color-hairline)`,
          color: 'var(--color-muted)',
        }}>
          ⌘K
        </kbd>
      </button>

      {/* Links */}
      <nav className="hidden md:flex" style={{ gap: '4px' }}>
        <a href="/docs" style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontWeight: 600,
          fontSize: '13px',
          color: 'var(--color-muted)',
          textDecoration: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          transition: 'background 0.12s, color 0.12s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='var(--color-surface-hover)'; e.currentTarget.style.color='var(--color-ink)' }}
        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='var(--color-muted)' }}
        >
          Docs
        </a>
      </nav>

      {/* Dark mode */}
      <button
        onClick={toggle}
        aria-label="Toggle dark mode"
        style={{
          padding: '7px',
          borderRadius: '8px',
          background: 'none',
          border: `1px solid var(--color-hairline)`,
          cursor: 'pointer',
          color: 'var(--color-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.12s, color 0.12s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='var(--color-surface-hover)'; e.currentTarget.style.color='var(--color-ink)' }}
        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='var(--color-muted)' }}
      >
        {theme === 'dark' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </header>
  )
}
