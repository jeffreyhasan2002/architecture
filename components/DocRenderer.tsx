'use client'
import { useEffect, useRef, useState, memo } from 'react'
import dynamic from 'next/dynamic'

const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { ssr: false })
const StatCards = dynamic(() => import('./StatCards'), { ssr: false })
const PricingCards = dynamic(() => import('./PricingCards'), { ssr: false })
const RoadmapTimeline = dynamic(() => import('./RoadmapTimeline'), { ssr: false })
const TechStackVisual = dynamic(() => import('./TechStackVisual'), { ssr: false })
const KPICards = dynamic(() => import('./KPICards'), { ssr: false })

interface Props {
  htmlContent: string
  mermaidBlocks: Record<string, string>
  sectionId: string
}

// For code copy buttons
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        padding: '5px 10px',
        borderRadius: '5px',
        background: copied ? 'var(--color-confirmed-bg)' : 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        cursor: 'pointer',
        fontSize: '11px',
        fontFamily: 'var(--font-space-grotesk)',
        fontWeight: 600,
        color: copied ? 'var(--color-confirmed)' : 'var(--color-muted)',
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {copied ? (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

// Section animation wrapper
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ${delay}ms cubic-bezier(0.16,1,0.30,1), transform 0.6s ${delay}ms cubic-bezier(0.16,1,0.30,1)`,
      }}
    >
      {children}
    </div>
  )
}

function processHtml(
  html: string,
  mermaidBlocks: Record<string, string>,
  sectionId: string,
): React.ReactNode[] {
  const nodes: React.ReactNode[] = []

  // Split by mermaid placeholders
  const parts = html.split(/<div class="mermaid-placeholder" data-mermaid-id="([^"]+)"><\/div>/g)

  let i = 0
  let mermaidIndex = 0
  while (i < parts.length) {
    const text = parts[i]
    if (text) {
      nodes.push(
        <div
          key={`html-${i}`}
          className="doc-prose"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )
    }
    i++

    if (i < parts.length) {
      const mermaidId = parts[i]
      const code = mermaidBlocks[mermaidId]
      if (code) {
        nodes.push(
          <AnimatedSection key={`mermaid-${mermaidId}`} delay={0}>
            <MermaidDiagram code={code} id={`${sectionId}-${mermaidIndex++}`} />
          </AnimatedSection>
        )
      }
      i++
    }
  }

  return nodes
}

const DocRenderer = memo(function DocRenderer({ htmlContent, mermaidBlocks, sectionId }: Props) {
  // Inject visual components for specific sections
  const isExecutiveSummary = sectionId.includes('executive-summary') || sectionId === '1-executive-summary'
  const isPricing = sectionId.includes('subscription') || sectionId.includes('monetization')
  const isRoadmap = sectionId.includes('roadmap') && !sectionId.includes('cold')
  const isColdStart = sectionId.includes('cold-start')
  const isTechStack = sectionId.includes('technology-stack')
  const isKPI = sectionId.includes('kpi') || sectionId.includes('analytics')

  const nodes = processHtml(htmlContent, mermaidBlocks, sectionId)

  return (
    <div>
      {/* Visual components injected at top of relevant sections */}
      {isExecutiveSummary && (
        <AnimatedSection>
          <StatCards />
        </AnimatedSection>
      )}

      {isPricing && (
        <AnimatedSection>
          <PricingCards />
        </AnimatedSection>
      )}

      {isRoadmap && (
        <AnimatedSection>
          <RoadmapTimeline variant="scale" />
        </AnimatedSection>
      )}

      {isColdStart && (
        <AnimatedSection>
          <RoadmapTimeline variant="city" />
        </AnimatedSection>
      )}

      {isTechStack && (
        <AnimatedSection>
          <TechStackVisual />
        </AnimatedSection>
      )}

      {isKPI && (
        <AnimatedSection>
          <KPICards />
        </AnimatedSection>
      )}

      {/* Main rendered content */}
      {nodes}
    </div>
  )
})

export default DocRenderer
