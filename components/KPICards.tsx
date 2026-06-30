'use client'
import { useEffect, useRef, useState } from 'react'

const KPIS = [
  { kpi: 'GMV', formula: 'Σ value of confirmed bookings + brand deals in period', color: 'var(--color-accent)' },
  { kpi: 'MRR', formula: 'Σ active subscription monthly value (annual ÷ 12)', color: 'var(--color-flow)' },
  { kpi: 'Take-rate Revenue', formula: 'GMV × effective take-rate (6–15% by plan)', color: 'var(--color-confirmed)' },
  { kpi: 'Hold → Pay Conversion', formula: '`advance_paid` ÷ `slot_held`', color: 'var(--color-proposed)' },
  { kpi: 'Review Completion Rate', formula: 'reviews_submitted ÷ completed_bookings (target 65%+)', color: 'var(--color-storage)' },
  { kpi: 'Dispute Rate', formula: 'disputes ÷ completed_bookings (target <2%)', color: 'var(--color-danger)' },
  { kpi: 'Discovery → Booking', formula: '`booking_confirmed` ÷ unique `search_performed` users', color: 'var(--color-assumed)' },
  { kpi: 'Inquiry → Qualified Lead', formula: 'quotes_accepted ÷ inquiries (target ~72%)', color: 'var(--color-flow)' },
  { kpi: 'Creator Activation', formula: 'creators with ≥1 confirmed booking ÷ onboarded creators', color: 'var(--color-confirmed)' },
  { kpi: 'Slot Fill Rate', formula: 'BOOKED days ÷ available days per creator', color: 'var(--color-accent)' },
  { kpi: 'CAC / LTV', formula: 'acquisition_spend ÷ new_customers; LTV = ARPU × gross_margin × avg_lifetime', color: 'var(--color-storage)' },
  { kpi: 'Repeat / Retention', formula: 'clients_with_≥2_bookings ÷ clients_with_≥1', color: 'var(--color-proposed)' },
]

function KPICard({ kpi, index }: { kpi: typeof KPIS[0]; index: number }) {
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

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-hairline)',
        borderLeft: `3px solid ${kpi.color}`,
        borderRadius: '8px',
        padding: '14px 16px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.45s ${index * 60}ms cubic-bezier(0.16,1,0.30,1), transform 0.45s ${index * 60}ms cubic-bezier(0.16,1,0.30,1)`,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontWeight: 700,
        fontSize: '13px',
        color: kpi.color,
        marginBottom: '4px',
      }}>
        {kpi.kpi}
      </div>
      <div style={{
        fontSize: '12px',
        color: 'var(--color-muted)',
        fontFamily: 'var(--font-jetbrains-mono)',
        lineHeight: 1.5,
      }}>
        {kpi.formula}
      </div>
    </div>
  )
}

export default function KPICards() {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <span className="badge badge-proposed" style={{ marginBottom: '12px', display: 'inline-block' }}>Proposed</span>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '12px',
      }}>
        {KPIS.map((kpi, i) => (
          <KPICard key={i} kpi={kpi} index={i} />
        ))}
      </div>
    </div>
  )
}
