'use client'
import { useState, useEffect, useRef } from 'react'
import type { NavSection } from '@/lib/types'

interface Props {
  sections: NavSection[]
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ sections, isOpen, onClose }: Props) {
  const [activeId, setActiveId] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // Scroll spy
  useEffect(() => {
    const headings = document.querySelectorAll('[data-section-id]')
    if (!headings.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('data-section-id') ?? ''
          setActiveId(id)
        }
      },
      { rootMargin: `-${60 + 24}px 0px -60% 0px`, threshold: 0 }
    )

    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 84
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    if (window.innerWidth < 768) onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 89,
          }}
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 'var(--topbar-height)',
          left: 0,
          width: 'var(--sidebar-width, 280px)',
          height: 'calc(100vh - var(--topbar-height))',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: 'var(--color-bg)',
          borderRight: '1px solid var(--color-hairline)',
          zIndex: 90,
          padding: '16px 12px 40px',
        }}
      >
        <div style={{ marginBottom: '8px', padding: '0 4px' }}>
          <span style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
          }}>
            Documentation
          </span>
        </div>

        <nav aria-label="Docs navigation">
          {sections.map(section => (
            <SidebarItem
              key={section.id}
              section={section}
              activeId={activeId}
              expanded={expanded}
              onToggle={toggleExpand}
              onNavigate={scrollTo}
              depth={0}
            />
          ))}
        </nav>
      </aside>
    </>
  )
}

function SidebarItem({
  section,
  activeId,
  expanded,
  onToggle,
  onNavigate,
  depth,
}: {
  section: NavSection
  activeId: string
  expanded: Record<string, boolean>
  onToggle: (id: string) => void
  onNavigate: (id: string) => void
  depth: number
}) {
  const hasChildren = section.children.length > 0
  const isActive = activeId === section.id
  const isExpanded = expanded[section.id] ?? (depth === 0)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <button
          onClick={() => onNavigate(section.id)}
          aria-current={isActive ? 'page' : undefined}
          style={{
            flex: 1,
            display: 'block',
            padding: depth === 0 ? '6px 12px' : '4px 12px 4px 20px',
            borderRadius: '6px',
            background: isActive ? 'var(--color-accent)' : 'none',
            color: isActive ? 'white' : 'var(--color-muted)',
            fontSize: depth === 0 ? '13px' : '12px',
            fontWeight: isActive ? 600 : (depth === 0 ? 500 : 400),
            fontFamily: 'var(--font-inter)',
            textAlign: 'left',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.12s, color 0.12s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--color-surface-hover)'; e.currentTarget.style.color = 'var(--color-ink)' }}}
          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--color-muted)' }}}
        >
          {section.title.replace(/^#+\s*/, '')}
        </button>

        {hasChildren && (
          <button
            onClick={() => onToggle(section.id)}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            style={{
              flexShrink: 0,
              padding: '4px 6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-muted)',
              borderRadius: '4px',
              transition: 'transform 0.15s',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div style={{ paddingLeft: '8px' }}>
          {section.children.map(child => (
            <SidebarItem
              key={child.id}
              section={child}
              activeId={activeId}
              expanded={expanded}
              onToggle={onToggle}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
