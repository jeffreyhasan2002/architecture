'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { NavSection, SearchItem, DocMeta } from '@/lib/types'
import { ThemeProvider } from '@/components/ThemeProvider'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import TableOfContents from '@/components/TableOfContents'
import DocRenderer from '@/components/DocRenderer'
import CommandPalette from '@/components/CommandPalette'

interface RenderedSection {
  id: string
  number: string
  title: string
  htmlContent: string
  mermaidBlocks: Record<string, string>
}

interface Props {
  navSections: NavSection[]
  meta: DocMeta
  searchItems: SearchItem[]
  sections: RenderedSection[]
}

// Confidence legend
function ConfidenceLegend() {
  const items = [
    { type: 'confirmed', label: 'confirmed', desc: 'Stated in v1.0 original' },
    { type: 'proposed', label: 'Proposed', desc: 'Authored to close doc gaps — ratify before build' },
    { type: 'assumed', label: 'Assumed', desc: 'Reasonable interpretation of confirmed content' },
  ]
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      padding: '12px 16px',
      background: 'var(--color-surface)',
      borderRadius: '10px',
      border: '1px solid var(--color-hairline)',
      marginBottom: '24px',
    }}>
      <span style={{ fontSize: '11px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '4px', alignSelf: 'center' }}>
        Legend:
      </span>
      {items.map(item => (
        <div key={item.type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className={`badge badge-${item.type}`}>{item.label}</span>
          <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>{item.desc}</span>
        </div>
      ))}
    </div>
  )
}

// Individual section with anchor
function Section({ section }: { section: RenderedSection }) {
  return (
    <div id={section.id} data-section-id={section.id} style={{ paddingTop: '8px', marginBottom: '3rem' }}>
      <DocRenderer
        htmlContent={section.htmlContent}
        mermaidBlocks={section.mermaidBlocks}
        sectionId={section.id}
      />
    </div>
  )
}

export default function DocsClient({ navSections, meta, searchItems, sections }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    // Add post-processing for copy buttons and anchor links
    const addCopyButtons = () => {
      document.querySelectorAll('pre:not([data-copy-added])').forEach(pre => {
        pre.setAttribute('data-copy-added', 'true')
        const code = pre.querySelector('code')?.textContent ?? ''
        const btn = document.createElement('button')
        btn.textContent = 'Copy'
        btn.className = 'copy-btn'
        btn.setAttribute('aria-label', 'Copy code')
        btn.style.cssText = `
          position:absolute;top:8px;right:8px;padding:4px 10px;
          border-radius:5px;background:var(--color-surface);
          border:1px solid var(--color-hairline);cursor:pointer;
          font-size:11px;font-family:var(--font-space-grotesk);
          font-weight:600;color:var(--color-muted);
          transition:all 0.15s;
        `
        btn.onclick = async () => {
          await navigator.clipboard.writeText(code)
          btn.textContent = '✓ Copied'
          btn.style.color = 'var(--color-confirmed)'
          setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = 'var(--color-muted)' }, 2000)
        }
        const wrapper = pre as HTMLElement
        if (wrapper.style.position !== 'relative') wrapper.style.position = 'relative'
        wrapper.appendChild(btn)
      })
    }

    const addAnchorLinks = () => {
      document.querySelectorAll('h2[id], h3[id]:not([data-anchor-added])').forEach(h => {
        h.setAttribute('data-anchor-added', 'true')
        const id = h.getAttribute('id') ?? ''
        const a = document.createElement('a')
        a.href = `#${id}`
        a.setAttribute('aria-label', `Link to ${h.textContent}`)
        a.style.cssText = `
          opacity:0;margin-left:8px;color:var(--color-muted);
          text-decoration:none;font-weight:400;font-size:0.8em;
          transition:opacity 0.15s;
        `
        a.textContent = '#'
        const el = h as HTMLElement
        el.style.position = 'relative'
        el.style.scrollMarginTop = '84px'
        el.addEventListener('mouseenter', () => a.style.opacity = '1')
        el.addEventListener('mouseleave', () => a.style.opacity = '0')
        el.appendChild(a)
      })
    }

    // Run after render
    const timer = setTimeout(() => { addCopyButtons(); addAnchorLinks() }, 500)
    return () => clearTimeout(timer)
  }, [sections])

  return (
    <ThemeProvider>
      <div style={{ fontFamily: 'var(--font-inter)' }}>
        <TopBar
          onSearch={() => setSearchOpen(true)}
          onMenuToggle={() => setSidebarOpen(o => !o)}
          version={meta.version}
        />

        <CommandPalette
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          items={searchItems}
        />

        {/* Layout */}
        <div style={{ display: 'flex', paddingTop: 'var(--topbar-height)' }}>
          {/* Sidebar */}
          <Sidebar
            sections={navSections}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content */}
          <main
            className="main-content"
            style={{
              marginLeft: 'var(--sidebar-width, 280px)',
              flex: 1,
              minWidth: 0,
              padding: '32px 40px',
              maxWidth: 'calc(100% - var(--sidebar-width, 280px) - var(--toc-width, 240px))',
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--color-hairline)' }}>
              <div style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: '8px',
              }}>
                Sceneora · {meta.classification}
              </div>
              <h1 style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--color-ink)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                Architecture & Documentation
              </h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', margin: 0 }}>
                Version {meta.version} — Last Updated: {meta.lastUpdated}
              </p>
            </div>

            <ConfidenceLegend />

            {/* Sections */}
            {sections.map(section => (
              <Section key={section.id} section={section} />
            ))}

            {/* Footer */}
            <footer style={{
              marginTop: '60px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-hairline)',
              fontSize: '13px',
              color: 'var(--color-muted)',
            }}>
              <p>
                <strong style={{ fontFamily: 'var(--font-space-grotesk)' }}>Sceneora</strong> ·
                Document Version {meta.version} Canonical ·
                Last Updated: {meta.lastUpdated}
              </p>
              <p style={{ marginTop: '4px', fontSize: '12px' }}>
                Lineage: v1.0 original → v2.0 audit → v3.0 specification → v4.0 growth merge → v4.1 money-logistics → v4.2 client workflows + scaling → v4.3 per-role portals → v4.4 screen/navigation maps → v4.5 measurement + GTM
              </p>
              <p style={{ marginTop: '4px', fontSize: '12px', fontStyle: 'italic' }}>
                "{meta.classification}"
              </p>
            </footer>
          </main>

          {/* Right TOC */}
          <aside
            className="toc"
            style={{
              width: 'var(--toc-width, 240px)',
              flexShrink: 0,
              padding: '32px 20px 32px 0',
            }}
          >
            <TableOfContents sections={navSections} />
          </aside>
        </div>
      </div>
    </ThemeProvider>
  )
}
