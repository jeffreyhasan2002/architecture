'use client'
import { useEffect, useState } from 'react'
import type { NavSection } from '@/lib/types'

interface Props {
  sections: NavSection[]
}

export default function TableOfContents({ sections }: Props) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const headings = document.querySelectorAll('h2[id], h3[id]')
    if (!headings.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-60px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  // Flatten sections 2 levels deep
  const items: { id: string; title: string; level: number }[] = []
  for (const s of sections) {
    if (s.level === 2) {
      items.push({ id: s.id, title: s.title, level: 2 })
      for (const c of s.children.slice(0, 5)) {
        items.push({ id: c.id, title: c.title, level: 3 })
      }
    }
  }

  if (items.length === 0) return null

  return (
    <nav
      aria-label="On this page"
      style={{
        position: 'sticky',
        top: 'calc(var(--topbar-height) + 24px)',
        maxHeight: 'calc(100vh - var(--topbar-height) - 48px)',
        overflowY: 'auto',
        paddingBottom: '24px',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '8px',
      }}>
        On this page
      </div>

      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          style={{
            display: 'block',
            padding: `4px ${item.level === 3 ? '0 4px 12px' : '4px'}`,
            paddingLeft: item.level === 3 ? '12px' : '0',
            fontSize: item.level === 3 ? '12px' : '13px',
            color: activeId === item.id ? 'var(--color-accent)' : 'var(--color-muted)',
            textDecoration: 'none',
            borderLeft: item.level === 3 ? `2px solid ${activeId === item.id ? 'var(--color-accent)' : 'var(--color-hairline)'}` : 'none',
            transition: 'color 0.15s, border-color 0.15s',
            fontWeight: activeId === item.id ? 600 : 400,
            lineHeight: 1.4,
          }}
          onMouseEnter={e => { if (activeId !== item.id) e.currentTarget.style.color = 'var(--color-ink)' }}
          onMouseLeave={e => { if (activeId !== item.id) e.currentTarget.style.color = 'var(--color-muted)' }}
        >
          {item.title.replace(/^#+\s*/, '').replace(/\s*`Proposed`\s*/g, '').replace(/\s*\(.*?\)$/, '')}
        </a>
      ))}
    </nav>
  )
}
