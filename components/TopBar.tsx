'use client'
import { useState, useEffect } from 'react'

interface Props {
  onSearch: () => void
  onMenuToggle: () => void
  version: string
}

export default function TopBar({ onSearch, onMenuToggle, version }: Props) {
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
        top: 0, left: 0, right: 0,
        height: 'var(--topbar-height)',
        zIndex: 100,
        background: scrolled ? 'rgba(248,249,252,0.92)' : '#F8F9FC',
        borderBottom: `1.5px solid ${scrolled ? 'var(--color-hairline)' : 'transparent'}`,
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        gap: '16px',
        transition: 'all 0.22s ease',
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        aria-label="Toggle sidebar"
        className="md:hidden"
        style={{
          padding: '7px',
          borderRadius: 'var(--radius-md)',
          background: 'none',
          border: '1.5px solid var(--color-hairline)',
          cursor: 'pointer',
          color: 'var(--color-muted)',
          display: 'flex',
          alignItems: 'center',
          transition: 'border-color 0.15s, background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.background = 'var(--color-accent-muted)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-hairline)'; e.currentTarget.style.background = 'none' }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Wordmark */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '17px',
          letterSpacing: '-0.04em',
          color: 'var(--color-ink)',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          SCENEORA
        </span>
        <span style={{
          fontSize: '10px',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          letterSpacing: '0.05em',
          color: 'var(--color-accent)',
          background: 'var(--color-accent-muted)',
          padding: '2px 9px',
          borderRadius: '5px',
          textTransform: 'uppercase',
          border: '1px solid rgba(79,70,229,0.2)',
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
          gap: '9px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-md)',
          border: `1.5px solid var(--color-hairline)`,
          background: 'var(--color-surface)',
          cursor: 'pointer',
          color: 'var(--color-muted)',
          fontSize: '13px',
          fontFamily: 'var(--font-inter)',
          fontWeight: 500,
          transition: 'border-color 0.15s, box-shadow 0.15s',
          minWidth: '180px',
          boxShadow: 'var(--shadow-sm)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-hairline)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span>Search docs…</span>
        <kbd style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '11px',
          padding: '2px 7px',
          borderRadius: '5px',
          background: 'var(--color-bg-secondary)',
          border: `1px solid var(--color-hairline)`,
          color: 'var(--color-muted)',
          fontWeight: 500,
        }}>
          ⌘K
        </kbd>
      </button>

      {/* Nav links */}
      <nav className="hidden md:flex" style={{ gap: '4px' }}>
        {[
          { href: '/', label: 'Home' },
          { href: '/spaces', label: 'Spaces' },
          { href: '/gear', label: 'Gear' },
          { href: '/docs', label: 'Docs' },
        ].map(l => (
          <a key={l.href} href={l.href} style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '13px',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            padding: '7px 13px',
            borderRadius: 'var(--radius-md)',
            transition: 'background 0.14s, color 0.14s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='var(--color-accent-muted)'; e.currentTarget.style.color='var(--color-accent)' }}
          onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='var(--color-muted)' }}
          >{l.label}</a>
        ))}
      </nav>
    </header>
  )
}
