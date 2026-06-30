import fs from 'fs'
import path from 'path'
import type { NavSection, DocMeta, SearchItem } from './types'

const DOC_PATH = path.join(process.cwd(), 'SCENEORA-SRS-PRD-Architecture.md')

export function readDocFile(): string {
  return fs.readFileSync(DOC_PATH, 'utf-8')
}

export function extractMeta(content: string): DocMeta {
  const versionMatch = content.match(/Version\s+([\d.]+)/i)
  const dateMatch = content.match(/Last Updated[:\s]+(.+)/i)
  const classMatch = content.match(/Classification[:\s]+(.+)/i)
  return {
    version: versionMatch?.[1] ?? '4.5',
    lastUpdated: dateMatch?.[1]?.trim() ?? '30 June 2026',
    classification: classMatch?.[1]?.trim() ?? 'Internal Product · Investor Reference · Engineering Specification',
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_[\]()]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function extractNavSections(content: string): NavSection[] {
  const lines = content.split('\n')
  const nav: NavSection[] = []
  const stack: NavSection[] = []

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)$/)
    const h2 = line.match(/^##\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)

    if (h1 && !h2) {
      const title = h1[1].trim()
      const id = slugify(title)
      const node: NavSection = { id, title, level: 1, children: [] }
      nav.push(node)
      stack.length = 0
      stack.push(node)
    } else if (h2 && !h3) {
      const title = h2[1].trim()
      const id = slugify(title)
      const node: NavSection = { id, title, level: 2, children: [] }
      const parent = stack[0]
      if (parent) parent.children.push(node)
      else nav.push(node)
      stack[1] = node
    } else if (h3) {
      const title = h3[1].trim()
      const id = slugify(title)
      const node: NavSection = { id, title, level: 3, children: [] }
      const parent = stack[1] ?? stack[0]
      if (parent) parent.children.push(node)
      else nav.push(node)
    }
  }

  return nav
}

// ── Custom Markdown → HTML converter (no external deps) ────────────────────
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderInline(text: string): string {
  return text
    // pass-through existing HTML tags (badge spans, mermaid divs)
    // Bold+italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Strikethrough
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
}

export function markdownToHtml(md: string): string {
  const lines = md.split('\n')
  const out: string[] = []

  let i = 0
  let inList = false
  let listType = ''
  let inBlockquote = false

  const flushList = () => {
    if (inList) {
      out.push(`</${listType}>`)
      inList = false
      listType = ''
    }
  }
  const flushBlockquote = () => {
    if (inBlockquote) {
      out.push('</blockquote>')
      inBlockquote = false
    }
  }

  while (i < lines.length) {
    const line = lines[i]

    // ── Pass-through raw HTML lines (our injected spans/divs) ──────────
    if (/^<(div|span|table|tr|th|td|ul|ol|li|p|h[1-6]|pre|code|blockquote|hr)/.test(line) ||
        line.startsWith('</') || line.startsWith('<span')) {
      flushList()
      flushBlockquote()
      out.push(line)
      i++
      continue
    }

    // ── Fenced code block ───────────────────────────────────────────────
    if (line.startsWith('```')) {
      flushList()
      flushBlockquote()
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]))
        i++
      }
      i++ // skip closing ```
      out.push(
        `<pre><code class="language-${lang || 'text'}">${codeLines.join('\n')}</code></pre>`
      )
      continue
    }

    // ── Horizontal rule ─────────────────────────────────────────────────
    if (/^[-*_]{3,}\s*$/.test(line)) {
      flushList()
      flushBlockquote()
      out.push('<hr />')
      i++
      continue
    }

    // ── Headings ────────────────────────────────────────────────────────
    const h6 = line.match(/^######\s+(.+)$/)
    const h5 = line.match(/^#####\s+(.+)$/)
    const h4 = line.match(/^####\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)
    const h2 = line.match(/^##\s+(.+)$/)
    const h1 = line.match(/^#\s+(.+)$/)

    if (h6 || h5 || h4 || h3 || h2 || h1) {
      flushList()
      flushBlockquote()
      const level = h1 ? 1 : h2 ? 2 : h3 ? 3 : h4 ? 4 : h5 ? 5 : 6
      const text = (h1 ?? h2 ?? h3 ?? h4 ?? h5 ?? h6)![1].trim()
      const id = slugify(text.replace(/<[^>]+>/g, ''))
      out.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`)
      i++
      continue
    }

    // ── Blockquote ──────────────────────────────────────────────────────
    if (line.startsWith('> ')) {
      flushList()
      if (!inBlockquote) {
        out.push('<blockquote>')
        inBlockquote = true
      }
      out.push(`<p>${renderInline(line.slice(2))}</p>`)
      i++
      continue
    } else if (inBlockquote && line.trim() === '') {
      flushBlockquote()
    } else if (inBlockquote) {
      flushBlockquote()
    }

    // ── GFM Table ───────────────────────────────────────────────────────
    if (line.includes('|') && line.trim().startsWith('|')) {
      flushList()
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        const cells = lines[i]
          .split('|')
          .slice(1, -1)
          .map(c => c.trim())
        rows.push(cells)
        i++
      }
      if (rows.length >= 2) {
        // rows[0] = headers, rows[1] = separator, rows[2+] = data
        const headers = rows[0]
        const dataRows = rows.slice(2)
        out.push('<table>')
        out.push('<thead><tr>')
        headers.forEach(h => out.push(`<th>${renderInline(h)}</th>`))
        out.push('</tr></thead>')
        if (dataRows.length > 0) {
          out.push('<tbody>')
          dataRows.forEach(row => {
            out.push('<tr>')
            row.forEach(cell => out.push(`<td>${renderInline(cell)}</td>`))
            out.push('</tr>')
          })
          out.push('</tbody>')
        }
        out.push('</table>')
      }
      continue
    }

    // ── Unordered list ──────────────────────────────────────────────────
    const ulMatch = line.match(/^[-*+]\s+(.+)$/)
    if (ulMatch) {
      flushBlockquote()
      if (!inList || listType !== 'ul') {
        if (inList) flushList()
        out.push('<ul>')
        inList = true
        listType = 'ul'
      }
      out.push(`<li>${renderInline(ulMatch[1])}</li>`)
      i++
      continue
    }

    // ── Ordered list ────────────────────────────────────────────────────
    const olMatch = line.match(/^\d+\.\s+(.+)$/)
    if (olMatch) {
      flushBlockquote()
      if (!inList || listType !== 'ol') {
        if (inList) flushList()
        out.push('<ol>')
        inList = true
        listType = 'ol'
      }
      out.push(`<li>${renderInline(olMatch[1])}</li>`)
      i++
      continue
    }

    // ── Empty line ──────────────────────────────────────────────────────
    if (line.trim() === '') {
      flushList()
      flushBlockquote()
      i++
      continue
    }

    // ── Paragraph ───────────────────────────────────────────────────────
    flushList()
    flushBlockquote()
    // Collect consecutive non-special lines
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('|') &&
      !/^[-*+]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^[-*_]{3,}\s*$/.test(lines[i]) &&
      !/^<(div|span|pre|table|blockquote|ul|ol|h[1-6])/.test(lines[i]) &&
      !lines[i].startsWith('</')
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      out.push(`<p>${renderInline(paraLines.join(' '))}</p>`)
    }
  }

  flushList()
  flushBlockquote()
  return out.join('\n')
}

// ── Confidence badge transformation ────────────────────────────────────────
export function preprocessMarkdown(content: string): { processed: string; mermaidBlocks: Record<string, string> } {
  const mermaidBlocks: Record<string, string> = {}
  let counter = 0

  let processed = content.replace(/```mermaid\n([\s\S]*?)```/g, (_, code) => {
    const id = `mermaid-${counter++}`
    mermaidBlocks[id] = code.trim()
    return `<div class="mermaid-placeholder" data-mermaid-id="${id}"></div>`
  })

  // Confidence badges — order matters (longer patterns first)
  processed = processed.replace(/\*\*`Proposed`\*\*/g, '<span class="badge badge-proposed">Proposed</span>')
  processed = processed.replace(/\*\*`Assumed`\*\*/g, '<span class="badge badge-assumed">Assumed</span>')
  processed = processed.replace(/`Proposed`/g, '<span class="badge badge-proposed">Proposed</span>')
  processed = processed.replace(/`Assumed`/g, '<span class="badge badge-assumed">Assumed</span>')
  processed = processed.replace(/\*\(confirmed\)\*/g, '<span class="badge badge-confirmed">confirmed</span>')
  processed = processed.replace(/\(confirmed\)/g, '<span class="badge badge-confirmed">confirmed</span>')

  return { processed, mermaidBlocks }
}

// ── Section splitter ────────────────────────────────────────────────────────
export interface DocSection {
  id: string
  number: string
  title: string
  level: number
  rawContent: string
  mermaidBlocks: Record<string, string>
}

export function splitIntoSections(content: string): DocSection[] {
  const lines = content.split('\n')
  const sections: DocSection[] = []
  let current: { id: string; number: string; title: string; level: number; lines: string[] } | null = null

  const flush = () => {
    if (!current) return
    const raw = current.lines.join('\n')
    const { processed, mermaidBlocks } = preprocessMarkdown(raw)
    sections.push({
      id: current.id,
      number: current.number,
      title: current.title,
      level: current.level,
      rawContent: processed,
      mermaidBlocks,
    })
  }

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)$/)
    const h2 = line.match(/^##\s+(.+)$/)

    if (h1 && !h2) {
      flush()
      const title = h1[1].trim()
      const numMatch = title.match(/^(\d+)\.\s+/)
      current = {
        id: slugify(title),
        number: numMatch?.[1] ?? '',
        title,
        level: 1,
        lines: [line],
      }
    } else {
      if (current) current.lines.push(line)
    }
  }
  flush()

  return sections
}

// ── Search index ────────────────────────────────────────────────────────────
export function buildSearchIndex(content: string): SearchItem[] {
  const lines = content.split('\n')
  const items: SearchItem[] = []
  let currentId = ''
  let currentTitle = ''
  let buffer: string[] = []

  const flush = () => {
    if (currentId && buffer.length > 0) {
      const text = buffer.join(' ').replace(/[#*`_[\]()]/g, '').replace(/\s+/g, ' ').trim()
      if (text.length > 20) {
        items.push({ id: currentId, title: currentTitle, content: text.slice(0, 500), sectionId: currentId })
      }
    }
    buffer = []
  }

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)$/)
    const h2 = line.match(/^##\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)

    if (h1 || h2 || h3) {
      flush()
      const title = (h1 ?? h2 ?? h3)![1].trim()
      currentTitle = title
      currentId = slugify(title)
    } else if (!line.startsWith('```') && line.trim()) {
      buffer.push(line)
    }
  }
  flush()
  return items
}

// ── Cached parsed doc ────────────────────────────────────────────────────────
let _cache: {
  rawContent: string
  navSections: NavSection[]
  meta: DocMeta
  searchItems: SearchItem[]
  mermaidBlocks: Record<string, string>
} | null = null

export function getParsedDoc() {
  if (_cache) return _cache
  const rawContent = readDocFile()
  const navSections = extractNavSections(rawContent)
  const meta = extractMeta(rawContent)
  const searchItems = buildSearchIndex(rawContent)
  const { mermaidBlocks } = preprocessMarkdown(rawContent)
  _cache = { rawContent, navSections, meta, searchItems, mermaidBlocks }
  return _cache
}
