'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../components/SceneoraNav'

type SpaceType = 'all' | 'indoor' | 'outdoor' | 'home'
type SortBy = 'rating' | 'price_asc' | 'price_desc' | 'newest'

interface Space {
  id: string
  name: string
  type: 'indoor' | 'outdoor' | 'home'
  subtype: string
  location: string
  size: string
  pricePerHour: number
  rating: number
  reviewCount: number
  amenities: string[]
  gradient: string
  host: string
  instantBook: boolean
  available: boolean
  tags: string[]
}

const SPACES: Space[] = [
  { id: 's1', name: 'The White Loft Studio', type: 'indoor', subtype: 'Studio', location: 'Downtown LA', size: '1,200 sq ft', pricePerHour: 85, rating: 4.97, reviewCount: 312, amenities: ['White cyc wall', 'LED grid', 'Dressing room', 'WiFi', 'AC'], gradient: 'linear-gradient(135deg,#e0e7ff 0%,#c7d2fe 100%)', host: 'Studio Co.', instantBook: true, available: true, tags: ['White cyc', 'Product shoots', 'Portraits'] },
  { id: 's2', name: 'Rooftop Golden Hour', type: 'outdoor', subtype: 'Rooftop', location: 'Brooklyn, NY', size: 'Open air', pricePerHour: 60, rating: 4.92, reviewCount: 187, amenities: ['City skyline', 'Sunset access', 'Power outlets', 'Prop storage'], gradient: 'linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)', host: '@roofshots', instantBook: true, available: true, tags: ['Golden hour', 'Portraits', 'Fashion'] },
  { id: 's3', name: 'Cozy Living Room Set', type: 'home', subtype: 'Living Room', location: 'Silver Lake, CA', size: '600 sq ft', pricePerHour: 45, rating: 4.88, reviewCount: 94, amenities: ['Styled furniture', 'Natural light', 'Kitchen access', 'Parking'], gradient: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 100%)', host: 'Mia K.', instantBook: false, available: true, tags: ['Lifestyle', 'UGC', 'E-commerce'] },
  { id: 's4', name: 'Industrial Warehouse', type: 'indoor', subtype: 'Warehouse', location: 'DTLA, CA', size: '3,500 sq ft', pricePerHour: 140, rating: 4.95, reviewCount: 228, amenities: ['Concrete floors', 'High ceilings', 'Loading dock', 'Rigging points', 'Generator'], gradient: 'linear-gradient(135deg,#f1f5f9 0%,#cbd5e1 100%)', host: 'Frame Space', instantBook: true, available: true, tags: ['Commercial', 'Music videos', 'Cars'] },
  { id: 's5', name: 'Lush Garden Estate', type: 'outdoor', subtype: 'Garden', location: 'Malibu, CA', size: 'Half acre', pricePerHour: 110, rating: 4.91, reviewCount: 156, amenities: ['Manicured garden', 'Pool access', 'Pergola', 'Restrooms'], gradient: 'linear-gradient(135deg,#dcfce7 0%,#a7f3d0 100%)', host: 'Estate Rentals', instantBook: false, available: true, tags: ['Weddings', 'Portraits', 'Nature'] },
  { id: 's6', name: 'Minimal White Kitchen', type: 'home', subtype: 'Kitchen', location: 'Williamsburg, NY', size: '400 sq ft', pricePerHour: 55, rating: 4.85, reviewCount: 71, amenities: ['Full appliances', 'Props included', 'Natural window light', 'Stool bar'], gradient: 'linear-gradient(135deg,#f0fdf4 0%,#bbf7d0 100%)', host: 'Nora H.', instantBook: true, available: true, tags: ['Food', 'Recipe content', 'Products'] },
  { id: 's7', name: 'Urban Alley Mural Wall', type: 'outdoor', subtype: 'Urban', location: 'Williamsburg, NY', size: 'Street level', pricePerHour: 35, rating: 4.79, reviewCount: 203, amenities: ['Mural backdrop', 'Street access', 'Flexible hours'], gradient: 'linear-gradient(135deg,#ffe4e6 0%,#fecdd3 100%)', host: '@urbanframe', instantBook: true, available: false, tags: ['Streetwear', 'Fashion', 'Editorial'] },
  { id: 's8', name: 'Boho Bedroom Suite', type: 'home', subtype: 'Bedroom', location: 'Austin, TX', size: '350 sq ft', pricePerHour: 40, rating: 4.82, reviewCount: 118, amenities: ['Styled decor', 'Canopy bed', 'Soft lighting', 'Wardrobe'], gradient: 'linear-gradient(135deg,#fefce8 0%,#fef08a 100%)', host: 'Casa Lena', instantBook: true, available: true, tags: ['Lifestyle', 'Beauty', 'Intimates'] },
  { id: 's9', name: 'Glass Cube Studio', type: 'indoor', subtype: 'Studio', location: 'Miami, FL', size: '800 sq ft', pricePerHour: 95, rating: 4.96, reviewCount: 144, amenities: ['Floor-to-ceiling windows', 'Blackout blinds', 'AC', 'Makeup station'], gradient: 'linear-gradient(135deg,#e0f2fe 0%,#bae6fd 100%)', host: 'Lumina Studio', instantBook: true, available: true, tags: ['Natural light', 'Portraits', 'Video'] },
]

const TYPE_FILTERS: { label: string; value: SpaceType; icon: string }[] = [
  { label: 'All Spaces', value: 'all', icon: '🌐' },
  { label: 'Indoor Studio', value: 'indoor', icon: '🏛️' },
  { label: 'Outdoor', value: 'outdoor', icon: '🌿' },
  { label: 'Home & Lifestyle', value: 'home', icon: '🛋️' },
]

const AMENITY_FILTERS = ['Natural light', 'LED grid', 'WiFi', 'Parking', 'Dressing room', 'Props included']

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  )
}

function BookingModal({ space, onClose }: { space: Space; onClose: () => void }) {
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [hours, setHours] = useState(2)
  const [step, setStep] = useState<'form' | 'confirm' | 'done'>('form')

  const total = space.pricePerHour * hours

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: 'var(--color-bg)', borderRadius: '20px', width: '100%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
        {/* Header gradient */}
        <div style={{ height: '120px', background: space.gradient, display: 'flex', alignItems: 'flex-end', padding: '16px 24px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>✕</button>
          <div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.1rem', color: '#111' }}>{space.name}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#444' }}>{space.location} · ${space.pricePerHour}/hr</div>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {step === 'form' && (
            <>
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-ink)', marginBottom: '20px' }}>Book this space</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>DATE</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>START TIME</label>
                    <select value={startTime} onChange={e => setStartTime(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
                      {['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>HOURS</label>
                    <select value={hours} onChange={e => setHours(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
                      {[1,2,3,4,5,6,8,10,12].map(h => <option key={h} value={h}>{h}h</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '20px', padding: '16px', borderRadius: '10px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>${space.pricePerHour} × {hours}h</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>${space.pricePerHour * hours}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>Service fee</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>${Math.round(total * 0.1)}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-accent)' }}>${Math.round(total * 1.1)}</span>
                </div>
              </div>
              <button onClick={() => setStep('confirm')} disabled={!date} style={{ width: '100%', marginTop: '16px', padding: '14px', borderRadius: '10px', background: date ? 'var(--color-accent)' : 'var(--color-hairline)', color: date ? '#fff' : 'var(--color-muted)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: 'none', cursor: date ? 'pointer' : 'not-allowed', transition: 'opacity 0.15s' }}>
                {space.instantBook ? 'Confirm Instant Book' : 'Request to Book'}
              </button>
            </>
          )}
          {step === 'confirm' && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-ink)', marginBottom: '8px' }}>Confirm your booking</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', marginBottom: '20px' }}>{date} at {startTime} · {hours}h · ${Math.round(total * 1.1)} total</p>
              <button onClick={() => setStep('done')} style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'var(--color-accent)', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Pay &amp; Confirm</button>
              <button onClick={() => setStep('form')} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'none', color: 'var(--color-muted)', fontFamily: 'var(--font-inter)', fontSize: '13px', border: '1px solid var(--color-hairline)', cursor: 'pointer' }}>Go back</button>
            </div>
          )}
          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-ink)', marginBottom: '8px' }}>You&apos;re booked!</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', marginBottom: '20px' }}>Confirmation sent to your Sceneora inbox. The host will be notified.</p>
              <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--color-accent)', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SpaceCard({ space, onBook }: { space: Space; onBook: (s: Space) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ borderRadius: '16px', background: 'var(--color-surface)', border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-hairline)'}`, overflow: 'hidden', transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s', transform: hovered ? 'translateY(-2px)' : '', boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div style={{ height: '180px', background: space.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!space.available && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '6px 14px', borderRadius: '100px' }}>Unavailable</span>
          </div>
        )}
        {space.instantBook && space.available && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#1E8E5A', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', padding: '4px 10px', borderRadius: '100px' }}>⚡ Instant Book</div>
        )}
        <div style={{ fontSize: '48px', opacity: 0.6 }}>
          {space.type === 'indoor' ? '🏛️' : space.type === 'outdoor' ? '🌿' : '🛋️'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '2px' }}>{space.name}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{space.location} · {space.subtype} · {space.size}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: 'var(--color-ink)' }}>${space.pricePerHour}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>per hour</div>
          </div>
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
          {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(space.rating)} />)}
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)', marginLeft: '2px' }}>{space.rating}</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>({space.reviewCount})</span>
        </div>

        {/* Amenities */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {space.amenities.slice(0, 3).map(a => (
            <span key={a} style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', padding: '3px 8px', borderRadius: '100px' }}>{a}</span>
          ))}
          {space.amenities.length > 3 && <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', padding: '3px 0' }}>+{space.amenities.length - 3} more</span>}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {space.tags.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '11px', color: 'var(--color-accent)', background: 'rgba(15,98,254,0.08)', padding: '3px 8px', borderRadius: '100px' }}>{t}</span>
          ))}
        </div>

        <button onClick={() => space.available && onBook(space)} disabled={!space.available} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: space.available ? 'var(--color-accent)' : 'var(--color-hairline)', color: space.available ? '#fff' : 'var(--color-muted)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', border: 'none', cursor: space.available ? 'pointer' : 'not-allowed', transition: 'opacity 0.15s' }}
          onMouseEnter={e => { if (space.available) (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
        >
          {space.available ? (space.instantBook ? '⚡ Book Now' : 'Request to Book') : 'Unavailable'}
        </button>
      </div>
    </div>
  )
}

export default function SpacesPage() {
  const [typeFilter, setTypeFilter] = useState<SpaceType>('all')
  const [maxPrice, setMaxPrice] = useState(200)
  const [sortBy, setSortBy] = useState<SortBy>('rating')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [booking, setBooking] = useState<Space | null>(null)
  const filtered = SPACES
    .filter(s => typeFilter === 'all' || s.type === typeFilter)
    .filter(s => s.pricePerHour <= maxPrice)
    .filter(s => !showAvailableOnly || s.available)
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price_asc') return a.pricePerHour - b.pricePerHour
      if (sortBy === 'price_desc') return b.pricePerHour - a.pricePerHour
      return 0
    })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)' }}>
      <SceneoraNav active="/spaces" />

      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(15,98,254,0.06) 0%, rgba(30,142,90,0.06) 100%)', borderBottom: '1px solid var(--color-hairline)', padding: '104px 24px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '8px' }}>Browse Spaces</h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-muted)', marginBottom: '20px' }}>Indoor studios, outdoor locations, and home sets — ready to shoot.</p>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, location, or tag…" style={{ width: '100%', paddingLeft: '38px', paddingRight: '14px', paddingTop: '11px', paddingBottom: '11px', borderRadius: '10px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortBy)} style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
              <option value="rating">Top rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Sidebar filters */}
        <aside>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '14px', padding: '20px', position: 'sticky', top: '80px' }}>
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '14px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Space Type</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
              {TYPE_FILTERS.map(f => (
                <button key={f.value} onClick={() => setTypeFilter(f.value)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', border: 'none', background: typeFilter === f.value ? 'rgba(15,98,254,0.1)' : 'none', color: typeFilter === f.value ? 'var(--color-accent)' : 'var(--color-ink)', fontFamily: 'var(--font-space-grotesk)', fontWeight: typeFilter === f.value ? 700 : 500, fontSize: '13px', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}>
                  <span>{f.icon}</span> {f.label}
                </button>
              ))}
            </div>

            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '10px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Max Price / hr</h3>
            <div style={{ marginBottom: '6px' }}>
              <input type="range" min={20} max={200} step={5} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-accent)' }} />
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-accent)' }}>Up to ${maxPrice}/hr</div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-hairline)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" checked={showAvailableOnly} onChange={e => setShowAvailableOnly(e.target.checked)} style={{ accentColor: 'var(--color-accent)', width: '15px', height: '15px' }} />
                <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', color: 'var(--color-ink)' }}>Available only</span>
              </label>
            </div>

            {(typeFilter !== 'all' || maxPrice < 200 || showAvailableOnly || search) && (
              <button onClick={() => { setTypeFilter('all'); setMaxPrice(200); setShowAvailableOnly(false); setSearch('') }} style={{ marginTop: '16px', width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'none', color: 'var(--color-muted)', fontFamily: 'var(--font-inter)', fontSize: '12px', cursor: 'pointer' }}>
                Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-muted)' }}>{filtered.length} space{filtered.length !== 1 ? 's' : ''} found</span>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-muted)', fontFamily: 'var(--font-inter)' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
              <p>No spaces match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {filtered.map(s => <SpaceCard key={s.id} space={s} onBook={setBooking} />)}
            </div>
          )}
        </div>
      </div>

      {booking && <BookingModal space={booking} onClose={() => setBooking(null)} />}
    </div>
  )
}
