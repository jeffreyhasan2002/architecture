'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { SearchItem } from '@/lib/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  items: SearchItem[]
}

export default function CommandPalette({ isOpen, onClose, items }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [focusedIndex, setFocusedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults(items.slice(0, 8))
      setFocusedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, items])

  useEffect(() => {
    if (!query.trim()) {
      setResults(items.slice(0, 8))
      return
    }

    const q = query.toLowerCase()
    const filtered = items
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q)
      )
      .slice(0, 10)
    setResults(filtered)
    setFocusedIndex(0)
  }, [query, items])

  const navigate = useCallback((item: SearchItem) => {
    const el = document.getElementById(item.sectionId)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 84
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIndex(i => Math.min(i + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIndex(i => Math.max(i - 1, 0)) }
      if (e.key === 'Enter' && results[focusedIndex]) { navigate(results[focusedIndex]) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, results, focusedIndex, navigate, onClose])

  if (!isOpen) return null

  const highlight = (text: string) => {
    if (!query.trim()) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: 'var(--color-proposed-bg)', color: 'var(--color-proposed)', borderRadius: '2px', padding: '0 2px' }}>
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <div className="command-overlay" onClick={onClose}>
      <div className="command-dialog" onClick={e => e.stopPropagation()} role="dialog" aria-modal aria-label="Search documentation">
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid var(--color-hairline)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            className="command-input"
            type="text"
            placeholder="Search documentation…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search"
            style={{ borderBottom: 'none', paddingLeft: '10px' }}
          />
          <kbd style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '11px',
            padding: '3px 7px',
            borderRadius: '4px',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-hairline)',
            color: 'var(--color-muted)',
            flexShrink: 0,
          }}>
            ESC
          </kbd>
        </div>

        <div className="command-results" role="listbox" aria-label="Search results">
          {results.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-muted)', fontSize: '14px' }}>
              No results for "{query}"
            </div>
          ) : (
            results.map((item, i) => (
              <div
                key={item.id}
                className={`command-result-item ${i === focusedIndex ? 'focused' : ''}`}
                onClick={() => navigate(item)}
                onMouseEnter={() => setFocusedIndex(i)}
                role="option"
                aria-selected={i === focusedIndex}
                tabIndex={-1}
              >
                <div className="command-result-title">{highlight(item.title)}</div>
                <div className="command-result-excerpt">{item.content.slice(0, 100)}</div>
              </div>
            ))
          )}
        </div>

        <div style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--color-hairline)',
          display: 'flex',
          gap: '12px',
          fontSize: '11px',
          color: 'var(--color-muted)',
          fontFamily: 'var(--font-space-grotesk)',
        }}>
          <span><kbd style={{ marginRight: '4px', fontFamily: 'var(--font-jetbrains-mono)' }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ marginRight: '4px', fontFamily: 'var(--font-jetbrains-mono)' }}>↵</kbd> open</span>
          <span><kbd style={{ marginRight: '4px', fontFamily: 'var(--font-jetbrains-mono)' }}>esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
