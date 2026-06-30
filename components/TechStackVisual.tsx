'use client'
import { useEffect, useRef, useState } from 'react'

const LAYERS = [
  {
    label: 'Client',
    color: 'var(--color-accent)',
    bg: 'var(--color-proposed-bg)',
    items: ['Next.js 14 (Web)', 'React Native + Expo (Mobile)', 'Shared packages/core (TypeScript)'],
  },
  {
    label: 'Edge',
    color: 'var(--color-storage)',
    bg: 'var(--color-storage-bg)',
    items: ['Cloudflare CDN + WAF', 'DDoS protection', 'Indian PoPs', 'Image optimization'],
  },
  {
    label: 'API / Backend',
    color: 'var(--color-flow)',
    bg: 'var(--color-flow-bg)',
    items: ['NestJS Modular Monolith', 'ECS Fargate ap-south-1', 'TypeScript', '/v1 REST + WebSocket'],
  },
  {
    label: 'Data',
    color: 'var(--color-confirmed)',
    bg: 'var(--color-confirmed-bg)',
    items: ['PostgreSQL (RDS) + pgbouncer', 'Redis (cache + queues)', 'Algolia (→ OpenSearch)', 'Cloudflare R2 (media)'],
  },
  {
    label: 'AI',
    color: '#E11D48',
    bg: '#FFF1F5',
    items: ['Claude API (server-side only)', 'Budget Estimator', 'Portfolio Classification', 'Brief Parser + Fit Score'],
  },
  {
    label: 'Payments',
    color: 'var(--color-assumed)',
    bg: 'var(--color-assumed-bg)',
    items: ['Razorpay (escrow + payouts)', 'UPI / Card / EMI', 'Subscriptions + Mandate', 'HMAC webhooks'],
  },
  {
    label: 'Workers',
    color: 'var(--color-muted)',
    bg: 'var(--color-bg-secondary)',
    items: ['BullMQ (→ Kafka at scale)', 'Notifications (Push/SMS/Email/WA)', 'Algolia sync', 'Review prompts, Dunning'],
  },
  {
    label: 'Observability',
    color: '#6B7280',
    bg: 'var(--color-bg-secondary)',
    items: ['CloudWatch + OpenSearch', 'Sentry (errors)', 'OpenTelemetry (traces)', 'PagerDuty (alerts)'],
  },
]

export default function TechStackVisual() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {LAYERS.map((layer, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-24px)',
              transition: `opacity 0.45s ${i * 70}ms cubic-bezier(0.16,1,0.30,1), transform 0.45s ${i * 70}ms cubic-bezier(0.16,1,0.30,1)`,
            }}
          >
            {/* Layer label */}
            <div style={{
              flexShrink: 0,
              width: '100px',
              fontSize: '11px',
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: layer.color,
              textAlign: 'right',
            }}>
              {layer.label}
            </div>

            {/* Connector line */}
            <div style={{
              flexShrink: 0,
              width: '16px',
              height: '2px',
              background: layer.color,
              opacity: 0.4,
            }} />

            {/* Items */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
              {layer.items.map((item, j) => (
                <span
                  key={j}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: layer.bg,
                    border: `1px solid ${layer.color}30`,
                    color: layer.color,
                    fontSize: '12px',
                    fontFamily: 'var(--font-space-grotesk)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
