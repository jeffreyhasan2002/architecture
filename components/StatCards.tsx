'use client'
import { useEffect, useRef, useState } from 'react'

interface Stat {
  value: string
  label: string
  before?: string
  after?: string
  color?: string
}

const STATS: Stat[] = [
  { value: '200+', label: 'Professionals interviewed', color: 'var(--color-accent)' },
  { value: '3M+', label: 'Active freelance photographers/videographers in India', color: 'var(--color-flow)' },
  { value: '₹8–12K Cr', label: 'Wedding photography market / yr', color: 'var(--color-storage)' },
  { value: '₹3–5K Cr', label: 'UGC/content economy, growing 35%+/yr', color: 'var(--color-confirmed)' },
  { before: '18–36h', after: '<20 min', label: 'Inquiry to confirmation time', color: 'var(--color-proposed)' },
  { before: '2–3h', after: '<8 min', label: 'Discovery time compressed', color: 'var(--color-assumed)' },
  { value: '65%+', label: 'Target review completion rate (from ~8%)', color: 'var(--color-confirmed)' },
  { value: '<2%', label: 'Target dispute rate', color: 'var(--color-danger)' },
]

interface AnimatedNumberProps {
  target: string
  delay?: number
}

function AnimatedValue({ target, delay = 0 }: AnimatedNumberProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.6s ${delay}ms cubic-bezier(0.16,1,0.30,1), transform 0.6s ${delay}ms cubic-bezier(0.16,1,0.30,1)`,
      }}
    >
      {target}
    </span>
  )
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ${index * 80}ms cubic-bezier(0.16,1,0.30,1), transform 0.5s ${index * 80}ms cubic-bezier(0.16,1,0.30,1)`,
        borderTop: `3px solid ${stat.color ?? 'var(--color-accent)'}`,
      }}
    >
      {stat.before && stat.after ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-muted)',
            textDecoration: 'line-through',
          }}>
            {stat.before}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(22px, 2.5vw, 30px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: stat.color,
          }}>
            <AnimatedValue target={stat.after} delay={index * 80} />
          </span>
        </div>
      ) : (
        <div className="stat-value" style={{ color: stat.color }}>
          <AnimatedValue target={stat.value ?? ''} delay={index * 80} />
        </div>
      )}
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}

export default function StatCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
      margin: '1.5rem 0',
    }}>
      {STATS.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  )
}
