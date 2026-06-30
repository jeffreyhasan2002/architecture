'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../components/SceneoraNav'

type CreatorType = 'all' | 'photographer' | 'videographer' | 'mua' | 'content-creator'
type SortBy = 'rating' | 'price_asc' | 'price_desc' | 'trust'

interface Creator {
  id: string
  name: string
  handle: string
  type: 'photographer' | 'videographer' | 'mua' | 'content-creator'
  speciality: string
  city: string
  startingPrice: number
  rating: number
  reviewCount: number
  trustScore: number
  verified: boolean
  instantBook: boolean
  available: boolean
  gradient: string
  tags: string[]
  responseTime: string
  bookingsCompleted: number
}

const CREATORS: Creator[] = [
  { id: 'c1', name: 'Arun Krishnan', handle: '@arun.frames', type: 'photographer', speciality: 'Wedding & Candid', city: 'Chennai', startingPrice: 25000, rating: 4.97, reviewCount: 284, trustScore: 96, verified: true, instantBook: true, available: true, gradient: 'linear-gradient(135deg,#e0e7ff 0%,#c7d2fe 100%)', tags: ['Wedding', 'Candid', 'Portraits'], responseTime: '< 1h', bookingsCompleted: 312 },
  { id: 'c2', name: 'Meera Nair', handle: '@meera.lens', type: 'photographer', speciality: 'Product & Commercial', city: 'Bengaluru', startingPrice: 8000, rating: 4.95, reviewCount: 196, trustScore: 94, verified: true, instantBook: true, available: true, gradient: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 100%)', tags: ['Product', 'E-commerce', 'Fashion'], responseTime: '< 2h', bookingsCompleted: 228 },
  { id: 'c3', name: 'Vikram Doss', handle: '@vikram.films', type: 'videographer', speciality: 'Cinematic Wedding Films', city: 'Coimbatore', startingPrice: 40000, rating: 4.98, reviewCount: 143, trustScore: 97, verified: true, instantBook: false, available: true, gradient: 'linear-gradient(135deg,#1e1e2e 0%,#312e81 100%)', tags: ['Wedding', 'Cinematic', 'Reels'], responseTime: '< 4h', bookingsCompleted: 167 },
  { id: 'c4', name: 'Priya Sundar', handle: '@priyamua', type: 'mua', speciality: 'Bridal MUA', city: 'Hyderabad', startingPrice: 12000, rating: 4.93, reviewCount: 318, trustScore: 93, verified: true, instantBook: true, available: true, gradient: 'linear-gradient(135deg,#fff7ed 0%,#fed7aa 100%)', tags: ['Bridal', 'HD Makeup', 'Airbrush'], responseTime: '< 1h', bookingsCompleted: 441 },
  { id: 'c5', name: 'Karthik S', handle: '@karthik.cc', type: 'content-creator', speciality: 'Food & Lifestyle UGC', city: 'Mumbai', startingPrice: 15000, rating: 4.88, reviewCount: 87, trustScore: 88, verified: true, instantBook: true, available: true, gradient: 'linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%)', tags: ['Food', 'Lifestyle', 'UGC', 'Reels'], responseTime: '< 3h', bookingsCompleted: 94 },
  { id: 'c6', name: 'Studio Lens Co.', handle: '@studiolens', type: 'photographer', speciality: 'Corporate & Events', city: 'Delhi', startingPrice: 18000, rating: 4.91, reviewCount: 211, trustScore: 95, verified: true, instantBook: true, available: true, gradient: 'linear-gradient(135deg,#f0f9ff 0%,#bae6fd 100%)', tags: ['Corporate', 'Events', 'Headshots'], responseTime: '< 2h', bookingsCompleted: 289 },
  { id: 'c7', name: 'Ananya Roy', handle: '@ananya.cuts', type: 'videographer', speciality: 'Brand Reels & Ads', city: 'Bengaluru', startingPrice: 20000, rating: 4.89, reviewCount: 102, trustScore: 90, verified: true, instantBook: false, available: false, gradient: 'linear-gradient(135deg,#ecfdf5 0%,#a7f3d0 100%)', tags: ['Brand', 'Reels', 'Ads'], responseTime: '< 6h', bookingsCompleted: 118 },
  { id: 'c8', name: 'Leela Hassan', handle: '@leela.beauty', type: 'mua', speciality: 'Fashion & Editorial MUA', city: 'Chennai', startingPrice: 8000, rating: 4.85, reviewCount: 178, trustScore: 87, verified: true, instantBook: true, available: true, gradient: 'linear-gradient(135deg,#fdf2f8 0%,#e879f9 20%,#fdf2f8 100%)', tags: ['Fashion', 'Editorial', 'Avant-garde'], responseTime: '< 2h', bookingsCompleted: 203 },
  { id: 'c9', name: 'Rahul Menon', handle: '@rahuloptics', type: 'photographer', speciality: 'Pre-wedding & Portraits', city: 'Kochi', startingPrice: 15000, rating: 4.94, reviewCount: 156, trustScore: 92, verified: true, instantBook: true, available: true, gradient: 'linear-gradient(135deg,#f5f3ff 0%,#ddd6fe 100%)', tags: ['Pre-wedding', 'Portraits', 'Travel'], responseTime: '< 1h', bookingsCompleted: 187 },
]

const TYPE_FILTERS: { label: string; value: CreatorType; icon: string; desc: string }[] = [
  { label: 'All Creators', value: 'all', icon: '✨', desc: 'All types' },
  { label: 'Photographers', value: 'photographer', icon: '📷', desc: 'Still photography' },
  { label: 'Videographers', value: 'videographer', icon: '🎬', desc: 'Video & films' },
  { label: 'MUAs', value: 'mua', icon: '💄', desc: 'Makeup artists' },
  { label: 'Content Creators', value: 'content-creator', icon: '📱', desc: 'UGC & brand deals' },
]

const CITIES = ['All Cities', 'Chennai', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Coimbatore', 'Kochi']

function TrustBar({ score }: { score: number }) {
  const color = score >= 95 ? '#059669' : score >= 90 ? '#0F62FE' : score >= 85 ? '#D97706' : '#DC2626'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'var(--color-hairline)', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', borderRadius: '2px', background: color, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '11px', color }}>{score}</span>
    </div>
  )
}

export default function CreatorsPage() {
  const [typeFilter, setTypeFilter] = useState<CreatorType>('all')
  const [city, setCity] = useState('All Cities')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('rating')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)

  const filtered = CREATORS
    .filter(c => typeFilter === 'all' || c.type === typeFilter)
    .filter(c => city === 'All Cities' || c.city === city)
    .filter(c => !availableOnly || c.available)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.speciality.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'trust') return b.trustScore - a.trustScore
      if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice
      return b.startingPrice - a.startingPrice
    })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)' }}>
      <SceneoraNav active="/creators" />

      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(124,58,237,0.06) 100%)', borderBottom: '1px solid var(--color-hairline)', padding: '104px 24px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '8px' }}>Browse Creators</h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-muted)', marginBottom: '16px' }}>Verified photographers, videographers, MUAs, and content creators — book by availability, trust score, and city.</p>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {[
              { val: '3M+',    label: 'Verified creators',         icon: '📷' },
              { val: '200+',   label: 'Cities',                    icon: '🌏' },
              { val: 'Trust',  label: 'Score on every profile',    icon: '⭐' },
              { val: 'Escrow', label: 'Protected booking',         icon: '🔒' },
              { val: 'T+1',    label: 'Creator payout',            icon: '💸' },
            ].map(s => (
              <div key={s.label} style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(79,70,229,0.15)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#4F46E5' }}>{s.val}</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search + sort row */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, speciality, or tag…" style={{ width: '100%', paddingLeft: '38px', paddingRight: '14px', paddingTop: '11px', paddingBottom: '11px', borderRadius: '10px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortBy)} style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
              <option value="rating">Top rated</option>
              <option value="trust">Highest trust score</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Type filter pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {TYPE_FILTERS.map(f => (
              <button key={f.value} onClick={() => setTypeFilter(f.value)} style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '100px',
                background: typeFilter === f.value ? 'var(--color-accent)' : 'var(--color-surface)',
                border: `1.5px solid ${typeFilter === f.value ? 'var(--color-accent)' : 'var(--color-hairline)'}`,
                color: typeFilter === f.value ? '#fff' : 'var(--color-ink)',
                fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.14s',
              }}>
                <span>{f.icon}</span>{f.label}
              </button>
            ))}
            <button onClick={() => setAvailableOnly(!availableOnly)} style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '100px',
              background: availableOnly ? '#ECFDF5' : 'var(--color-surface)',
              border: `1.5px solid ${availableOnly ? '#059669' : 'var(--color-hairline)'}`,
              color: availableOnly ? '#059669' : 'var(--color-muted)',
              fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.14s',
            }}>⚡ Available Now</button>
          </div>

          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>
            {filtered.length} creator{filtered.length !== 1 ? 's' : ''} found
            {typeFilter !== 'all' && ` · ${TYPE_FILTERS.find(f => f.value === typeFilter)?.label}`}
            {city !== 'All Cities' && ` · ${city}`}
          </div>
        </div>
      </div>

      {/* Creator grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-ink)', marginBottom: '8px' }}>No creators found</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-muted)' }}>Try adjusting your filters or search terms</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '20px' }}>
            {filtered.map(c => (
              <div key={c.id} onClick={() => setSelectedCreator(c)} style={{ background: 'var(--color-surface)', borderRadius: '18px', border: '1px solid var(--color-hairline)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                {/* Card header gradient */}
                <div style={{ height: '100px', background: c.gradient, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
                  {!c.available && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', padding: '3px 8px', borderRadius: '100px' }}>Unavailable</div>
                  )}
                  {c.instantBook && c.available && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#059669', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', padding: '3px 8px', borderRadius: '100px' }}>⚡ Instant Book</div>
                  )}
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.9)', border: '2px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
                    {c.type === 'photographer' ? '📷' : c.type === 'videographer' ? '🎬' : c.type === 'mua' ? '💄' : '📱'}
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {c.name}
                        {c.verified && <span style={{ fontSize: '12px', color: '#0F62FE' }}>✓</span>}
                      </div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginTop: '2px' }}>{c.handle} · {c.city}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: 'var(--color-accent)' }}>₹{c.startingPrice.toLocaleString()}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>starting</div>
                    </div>
                  </div>

                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginBottom: '12px' }}>{c.speciality}</div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {c.tags.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', padding: '2px 8px', borderRadius: '100px' }}>{t}</span>
                    ))}
                  </div>

                  {/* Trust score */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Trust Score</span>
                    </div>
                    <TrustBar score={c.trustScore} />
                  </div>

                  {/* Stats row */}
                  <div style={{ display: 'flex', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-hairline)', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '11px' }}>⭐</span>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)' }}>{c.rating}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>({c.reviewCount})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '11px' }}>📅</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{c.bookingsCompleted} bookings</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '11px' }}>⚡</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{c.responseTime}</span>
                    </div>
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); setSelectedCreator(c) }}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', background: c.available ? 'var(--color-accent)' : 'var(--color-hairline)', color: c.available ? '#fff' : 'var(--color-muted)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', border: 'none', cursor: c.available ? 'pointer' : 'default', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => { if (c.available) (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  >
                    {c.available ? (c.instantBook ? '⚡ Book Instantly' : 'Request Quote') : 'Currently Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How to Book section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 24px', borderTop: '1px solid var(--color-hairline)' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>How booking works</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-muted)', marginBottom: '24px' }}>From discovery to delivery — four steps.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
          {[
            { n: '01', icon: '🔍', title: 'Browse & filter', desc: 'Search by city, type, style tags, price range, and trust score. No login needed.' },
            { n: '02', icon: '📅', title: 'Check availability', desc: 'View live slots on the creator\'s calendar. Pick a date — 15-min soft hold prevents double-bookings.' },
            { n: '03', icon: '🔒', title: 'Pay into escrow', desc: 'Create a free account and pay the advance. Funds are held in escrow — released only after you confirm delivery.' },
            { n: '04', icon: '⭐', title: 'Confirm & review', desc: 'Confirm delivery when you receive your work. Balance releases to creator T+1. Leave a review to help others.' },
          ].map(s => (
            <div key={s.n} style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#4F46E5', fontWeight: 700 }}>{s.n}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '6px' }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore roles footer */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 64px', borderTop: '1px solid var(--color-hairline)' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-muted)', marginBottom: '14px' }}>Explore platform roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { icon: '📅', label: 'Client',          href: '/roles/client',          color: '#4F46E5', bg: '#EEF2FF' },
            { icon: '📷', label: 'Creator',         href: '/roles/creator',         color: '#7C3AED', bg: '#F5F3FF' },
            { icon: '🎬', label: 'Content Creator', href: '/roles/content-creator', color: '#B45309', bg: '#FFFBEB' },
            { icon: '🏢', label: 'Brand',           href: '/roles/brand',           color: '#0891B2', bg: '#ECFEFF' },
            { icon: '🤖', label: 'AI Features',     href: '/features/ai',           color: '#4F46E5', bg: '#EEF2FF' },
          ].map(r => (
            <Link key={r.label} href={r.href} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', borderRadius: '100px', background: r.bg, border: `1px solid ${r.color}33`, textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: r.color, transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
            ><span>{r.icon}</span>{r.label}</Link>
          ))}
        </div>
      </div>

      {/* Creator Profile Modal */}
      {selectedCreator && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={e => { if (e.target === e.currentTarget) setSelectedCreator(null) }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setSelectedCreator(null)} />
          <div style={{ position: 'relative', background: 'var(--color-bg)', borderRadius: '24px', width: '100%', maxWidth: '520px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Profile header */}
            <div style={{ height: '140px', background: selectedCreator.gradient, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '16px 24px' }}>
              <button onClick={() => setSelectedCreator(null)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                  {selectedCreator.type === 'photographer' ? '📷' : selectedCreator.type === 'videographer' ? '🎬' : selectedCreator.type === 'mua' ? '💄' : '📱'}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#111' }}>{selectedCreator.name}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#555' }}>{selectedCreator.handle} · {selectedCreator.city}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {selectedCreator.verified && <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#0F62FE', background: '#EEF2FF', padding: '4px 10px', borderRadius: '100px' }}>✓ KYC Verified</span>}
                {selectedCreator.instantBook && <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '100px' }}>⚡ Instant Book</span>}
                <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#7C3AED', background: '#F5F3FF', padding: '4px 10px', borderRadius: '100px' }}>Escrow Protected</span>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '18px' }}>
                {[
                  { icon: '⭐', val: `${selectedCreator.rating}`, label: 'Rating' },
                  { icon: '📋', val: `${selectedCreator.reviewCount}`, label: 'Reviews' },
                  { icon: '📅', val: `${selectedCreator.bookingsCompleted}`, label: 'Bookings' },
                  { icon: '🛡️', val: `${selectedCreator.trustScore}`, label: 'Trust' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '10px', borderRadius: '10px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ fontSize: '16px', marginBottom: '3px' }}>{s.icon}</div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-ink)' }}>{s.val}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust score bar */}
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', marginBottom: '18px' }}>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-muted)', marginBottom: '8px' }}>Trust Score · {selectedCreator.trustScore}/100</div>
                <TrustBar score={selectedCreator.trustScore} />
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '6px' }}>Based on KYC status, review history, delivery rate, response time, and dispute record.</div>
              </div>

              {/* Portfolio preview placeholder */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '10px' }}>Portfolio Preview</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ height: '80px', borderRadius: '10px', background: selectedCreator.gradient, opacity: 0.7 + i * 0.1 }} />
                  ))}
                </div>
              </div>

              {/* Packages */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '10px' }}>Packages</div>
                {[
                  { name: 'Basic', duration: '4 hrs', price: selectedCreator.startingPrice, includes: 'Coverage + 50 edited photos' },
                  { name: 'Standard', duration: '8 hrs', price: Math.round(selectedCreator.startingPrice * 1.7), includes: 'Coverage + 150 edited photos + album' },
                  { name: 'Premium', duration: 'Full day', price: Math.round(selectedCreator.startingPrice * 2.8), includes: 'Coverage + unlimited photos + video highlights + album' },
                ].map(pkg => (
                  <div key={pkg.name} style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{pkg.name} · {pkg.duration}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{pkg.includes}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: 'var(--color-accent)' }}>₹{pkg.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              {/* Availability + Book */}
              <div style={{ padding: '14px', borderRadius: '12px', background: selectedCreator.available ? '#ECFDF5' : '#FFF1F0', border: `1px solid ${selectedCreator.available ? '#059669' : '#DC2626'}`, marginBottom: '16px' }}>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: selectedCreator.available ? '#059669' : '#DC2626', marginBottom: '4px' }}>
                  {selectedCreator.available ? '✅ Available — responds ' + selectedCreator.responseTime : '❌ Currently unavailable'}
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>
                  {selectedCreator.available ? 'Payment held in escrow until delivery is confirmed.' : 'Check back soon or add to your shortlist.'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, padding: '13px', borderRadius: '10px', background: selectedCreator.available ? 'var(--color-accent)' : 'var(--color-hairline)', color: selectedCreator.available ? '#fff' : 'var(--color-muted)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: 'none', cursor: selectedCreator.available ? 'pointer' : 'default' }}>
                  {selectedCreator.available ? (selectedCreator.instantBook ? '⚡ Book Now' : 'Request Quote') : 'Not Available'}
                </button>
                <button style={{ padding: '13px 18px', borderRadius: '10px', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: '1.5px solid var(--color-hairline)', cursor: 'pointer' }}>
                  💬 Message
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <Link href="/roles/client#onboarding" style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', textDecoration: 'none' }}>
                  New? <span style={{ color: 'var(--color-accent)' }}>Create a free account to book →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
