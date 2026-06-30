'use client'
import { useState } from 'react'

const CREATOR_PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: '/mo',
    takeRate: '12%',
    badge: null,
    color: 'var(--color-muted)',
    features: [
      { label: 'Take-rate', value: '12%' },
      { label: 'Portfolio media', value: '20' },
      { label: 'AI style tagging', value: 'Basic' },
      { label: 'Featured search boost', value: '—' },
      { label: 'Analytics dashboard', value: 'Basic' },
      { label: 'Team seats', value: '1' },
      { label: 'Priority support', value: '—' },
    ],
  },
  {
    name: 'Pro',
    price: '₹499',
    period: '/mo',
    takeRate: '8%',
    badge: 'Most Popular',
    color: 'var(--color-accent)',
    featured: true,
    features: [
      { label: 'Take-rate', value: '8%' },
      { label: 'Portfolio media', value: '200' },
      { label: 'AI style tagging', value: 'Full' },
      { label: 'Featured search boost', value: 'Weekly' },
      { label: 'Analytics dashboard', value: 'Advanced' },
      { label: 'Team seats', value: '3' },
      { label: 'Priority support', value: 'Email' },
    ],
  },
  {
    name: 'Studio',
    price: '₹1,499',
    period: '/mo',
    takeRate: '6%',
    badge: null,
    color: 'var(--color-flow)',
    features: [
      { label: 'Take-rate', value: '6%' },
      { label: 'Portfolio media', value: 'Unlimited' },
      { label: 'AI style tagging', value: 'Full' },
      { label: 'Featured search boost', value: 'Daily' },
      { label: 'Analytics dashboard', value: 'Advanced + export' },
      { label: 'Team seats', value: '15' },
      { label: 'Priority support', value: 'Email + chat' },
    ],
  },
]

const BRAND_PLANS = [
  {
    name: 'Brand Free',
    price: '₹0',
    period: '/mo',
    takeRate: '15%',
    badge: null,
    color: 'var(--color-muted)',
    features: [
      { label: 'Brand-deal take-rate', value: '15%' },
      { label: 'Active campaigns', value: '2' },
      { label: 'AI fit scoring', value: 'Basic' },
      { label: 'Bulk outreach', value: '—' },
    ],
  },
  {
    name: 'Brand+',
    price: '₹2,999',
    period: '/mo',
    takeRate: '10%',
    badge: 'Best Value',
    color: 'var(--color-accent)',
    featured: true,
    features: [
      { label: 'Brand-deal take-rate', value: '10%' },
      { label: 'Active campaigns', value: 'Unlimited' },
      { label: 'AI fit scoring', value: 'Advanced' },
      { label: 'Bulk outreach', value: '✓' },
    ],
  },
]

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-confirmed)" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function Dash() {
  return <span style={{ color: 'var(--color-muted)' }}>—</span>
}

function PlanCard({ plan }: { plan: typeof CREATOR_PLANS[0] }) {
  return (
    <div
      className={`pricing-card ${(plan as any).featured ? 'featured' : ''}`}
      style={{ borderTop: `3px solid ${plan.color}` }}
    >
      <div className="plan-name" style={{ color: plan.color }}>{plan.name}</div>
      <div className="plan-price">
        {plan.price}
        <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-muted)' }}>{plan.period}</span>
      </div>
      <div style={{
        fontSize: '12px',
        fontFamily: 'var(--font-space-grotesk)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--color-hairline)',
      }}>
        Platform take-rate: <span style={{ color: plan.color }}>{plan.takeRate}</span>
      </div>
      <div>
        {plan.features.map((f, i) => (
          <div key={i} className="plan-feature">
            <span className="feature-label">{f.label}</span>
            <span className="feature-value">
              {f.value === '—' ? <Dash /> : f.value === '✓' ? <Check /> : f.value}
            </span>
          </div>
        ))}
      </div>
      {(plan as any).featured && (
        <div style={{ marginTop: '1rem', fontSize: '11px', color: 'var(--color-muted)', textAlign: 'center' }}>
          <span className="badge badge-proposed" style={{ fontSize: '10px' }}>Proposed</span>{' '}
          prices pending ratification
        </div>
      )}
    </div>
  )
}

export default function PricingCards() {
  const [tab, setTab] = useState<'creator' | 'brand'>('creator')

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {(['creator', 'brand'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '7px 18px',
              borderRadius: '8px',
              border: '1px solid var(--color-hairline)',
              background: tab === t ? 'var(--color-accent)' : 'var(--color-surface)',
              color: tab === t ? 'white' : 'var(--color-muted)',
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {t === 'creator' ? 'Creator / Content Creator' : 'Brand'}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${tab === 'creator' ? 3 : 2}, 1fr)`,
        gap: '16px',
      }}>
        {(tab === 'creator' ? CREATOR_PLANS : BRAND_PLANS).map((plan, i) => (
          <PlanCard key={i} plan={plan} />
        ))}
      </div>

      <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '12px' }}>
        <span className="badge badge-proposed">Proposed</span>{' '}
        All prices are proposed placeholders for ratification. Annual billing at ~2 months free (−17%).
      </p>
    </div>
  )
}
