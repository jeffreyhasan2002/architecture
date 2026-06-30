'use client'
import { useEffect, useRef, useState } from 'react'

const PHASES = [
  {
    id: 'seed',
    label: 'Phase 1 — Seed',
    scale: '0–10K creators',
    color: 'var(--color-confirmed)',
    items: [
      'Monolith on Fargate',
      'Single RDS + 1 replica',
      'Algolia for search',
      'Single Redis instance',
      'BullMQ for queues',
    ],
    trigger: 'Start of platform',
  },
  {
    id: 'series-a',
    label: 'Phase 2 — Series A',
    scale: '10K–100K creators',
    color: 'var(--color-accent)',
    items: [
      'Extract Payments + Brand-deals services',
      'More read replicas',
      'Redis cluster mode',
      'Cloudflare Workers for edge logic',
      'Audience-sync jobs',
    ],
    trigger: 'On scale/cost pressure',
  },
  {
    id: 'scale',
    label: 'Phase 3 — Scale',
    scale: '100K+ creators, 1M+ users',
    color: 'var(--color-flow)',
    items: [
      'Extract Search (OpenSearch) + Booking',
      'Brand-deals independent service',
      'Kafka (>10K events/sec)',
      'Global edge deployment',
      'ML-based trust / matching / fit scoring',
      'Content analytics pipeline',
    ],
    trigger: 'OpenSearch at 500K searches/mo or $3K/mo; Kafka at >10K events/sec',
  },
]

const COLD_START = [
  {
    id: 'p1',
    label: 'Phase 1 — Seed Supply',
    color: 'var(--color-accent)',
    desc: 'Recruit + KYC-verify a critical mass of creators per category in one city; build complete profiles + live calendars',
    gate: '≥ N verified creators with availability set',
  },
  {
    id: 'p2',
    label: 'Phase 2 — SEO Foundation',
    color: 'var(--color-proposed)',
    desc: 'Publish /{city}/{service} landing pages + profiles (SSR/ISR), sitemaps, structured data before demand arrives',
    gate: 'City/service pages indexed in Search Console',
  },
  {
    id: 'p3',
    label: 'Phase 3 — Seed Trust + Content',
    color: 'var(--color-storage)',
    desc: 'Capture first bookings (incl. concierge outreach), prompt reviews, publish 2–3 Real Weddings stories',
    gate: 'First reviews live; trust scores populated',
  },
  {
    id: 'p4',
    label: 'Phase 4 — Drive Demand',
    color: 'var(--color-flow)',
    desc: 'Targeted local marketing + organic; referral program activates word-of-mouth',
    gate: 'Discovery→booking conversion stabilizes',
  },
  {
    id: 'p5',
    label: 'Phase 5 — Flywheel',
    color: 'var(--color-confirmed)',
    desc: 'Bookings → reviews → ranking → discovery → bookings self-sustains; replicate playbook in the next city',
    gate: 'Positive unit economics in-city',
  },
]

type ScalePhase = typeof PHASES[0]
type CityPhase = typeof COLD_START[0]
type AnyPhase = ScalePhase | CityPhase

function PhaseBlock({ phase, index, type }: { phase: AnyPhase; index: number; type: 'scale' | 'city' }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scalePhase = type === 'scale' ? (phase as ScalePhase) : null
  const cityPhase  = type === 'city'  ? (phase as CityPhase)  : null

  return (
    <div
      ref={ref}
      className="timeline-phase"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ${index * 120}ms cubic-bezier(0.16,1,0.30,1), transform 0.5s ${index * 120}ms cubic-bezier(0.16,1,0.30,1)`,
      }}
    >
      <div className="timeline-dot" style={{ borderColor: phase.color, color: phase.color }}>
        {index + 1}
      </div>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        borderLeft: `3px solid ${phase.color}`,
        borderRadius: '0 10px 10px 0',
        padding: '14px 16px',
      }}>
        <div style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontWeight: 700,
          fontSize: '15px',
          color: phase.color,
          marginBottom: '2px',
        }}>
          {phase.label}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '8px' }}>
          {scalePhase?.scale ?? ''}
        </div>
        {scalePhase ? (
          <ul style={{ fontSize: '13px', color: 'var(--color-ink)', paddingLeft: '16px', margin: 0 }}>
            {scalePhase.items.map((item, i) => (
              <li key={i} style={{ marginBottom: '2px' }}>{item}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--color-ink)', margin: 0 }}>
            {cityPhase?.desc}
          </p>
        )}
        {scalePhase?.trigger && (
          <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--color-muted)', fontStyle: 'italic' }}>
            Trigger: {scalePhase.trigger}
          </div>
        )}
        {cityPhase && (
          <div style={{
            marginTop: '8px',
            fontSize: '11px',
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: 600,
            color: 'var(--color-confirmed)',
          }}>
            Gate: {cityPhase.gate}
          </div>
        )}
      </div>
    </div>
  )
}

export default function RoadmapTimeline({ variant = 'scale' }: { variant?: 'scale' | 'city' }) {
  const data = variant === 'city' ? COLD_START : PHASES
  return (
    <div style={{ margin: '1.5rem 0', maxWidth: '680px' }}>
      {data.map((phase, i) => (
        <PhaseBlock key={phase.id} phase={phase} index={i} type={variant} />
      ))}
    </div>
  )
}
