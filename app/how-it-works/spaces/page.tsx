'use client'
import { useState } from 'react'
import Link from 'next/link'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/spaces', label: 'Spaces' },
  { href: '/gear', label: 'Gear' },
  { href: '/how-it-works/spaces', label: 'How It Works' },
  { href: '/docs', label: 'Docs' },
]

const STEPS = [
  {
    n: 1,
    title: 'Browse & Filter Spaces',
    subtitle: 'Find the perfect location for your shoot',
    color: '#0F62FE',
    bg: '#EFF4FF',
    icon: '🔍',
    description: 'Search across 2,400+ curated indoor studios, outdoor locations, and home lifestyle sets. Filter by type, price, date availability, amenities, and shoot tags to narrow down exactly what you need.',
    features: ['Filter by Indoor / Outdoor / Home', 'Set max price per hour', 'Filter by amenities (LED grid, dressing room, parking)', 'Search by shoot type tag (fashion, food, product, etc.)', 'Toggle "Available only" to hide booked spaces'],
    mockup: <BrowseMockup />,
  },
  {
    n: 2,
    title: 'View Space Details',
    subtitle: 'See everything before you commit',
    color: '#1E8E5A',
    bg: '#EDFAF3',
    icon: '🏛️',
    description: 'Each listing shows real photos, a full amenity checklist, host information, verified reviews, and live calendar availability. No surprises on shoot day.',
    features: ['Photo gallery with verified host uploads', 'Full amenity list and space rules', 'Verified reviews from past creators', 'Live calendar — see exact available slots', 'Host response time and rating'],
    mockup: <DetailMockup />,
  },
  {
    n: 3,
    title: 'Book Your Slot',
    subtitle: 'Instant book or send a request',
    color: '#6D5BD0',
    bg: '#F3F0FF',
    icon: '📅',
    description: 'Pick your date, start time, and duration. Spaces with the ⚡ Instant Book badge are confirmed immediately. Others go to the host for approval — they have 24 hours to respond.',
    features: ['Select date from live availability calendar', 'Choose start time + number of hours', 'See price breakdown before paying', '⚡ Instant Book = confirmed immediately', 'Request to Book = host approves within 24h'],
    mockup: <BookMockup />,
  },
  {
    n: 4,
    title: 'Pay Securely',
    subtitle: 'Transparent pricing, no hidden fees',
    color: '#B7791F',
    bg: '#FEF3C7',
    icon: '💳',
    description: 'Pay the hourly rate plus a 10% service fee. All payments are processed through Stripe. Your money is held in escrow until 24 hours after your shoot — so hosts are motivated to show up, and you\'re protected.',
    features: ['Pay via card, UPI, or wallet', 'Hourly rate + 10% service fee', 'Funds held in escrow until shoot completes', 'Automatic refund if host cancels', 'Free cancellation 48h+ before shoot'],
    mockup: <PayMockup />,
  },
  {
    n: 5,
    title: 'Shoot Your Content',
    subtitle: 'Show up, unlock, create',
    color: '#0E7C86',
    bg: '#E0F7FA',
    icon: '🎬',
    description: 'On shoot day, you\'ll receive a check-in code in your Sceneora inbox. Use it to access the space at your booked start time. Need more time? Request an extension directly in the app.',
    features: ['QR check-in code sent 1h before shoot', 'Auto check-out at booking end time', 'Request time extension in-app', 'Direct chat with host if needed', 'Crew headcount logged for safety'],
    mockup: <ShootMockup />,
  },
  {
    n: 6,
    title: 'Review & Repeat',
    subtitle: 'Build your reputation, earn perks',
    color: '#C0362C',
    bg: '#FEF2F2',
    icon: '⭐',
    description: 'After every shoot, you\'ll be prompted to leave a review. Reviews are bilateral — hosts also review you. Build a strong creator profile to unlock priority booking, loyalty discounts, and featured creator status.',
    features: ['Leave a star rating + written review', 'Host reviews your creator profile too', 'Reviews publish after both parties respond or 7 days', 'High-rated creators get priority slots', 'Earn loyalty credits for repeat bookings'],
    mockup: <ReviewMockup />,
  },
]

// ── Step Mockups ──────────────────────────────────────────────────────────────

function BrowseMockup() {
  const [active, setActive] = useState<string>('all')
  const [price, setPrice] = useState(120)
  const types = [{ v: 'all', icon: '🌐', label: 'All' }, { v: 'indoor', icon: '🏛️', label: 'Indoor' }, { v: 'outdoor', icon: '🌿', label: 'Outdoor' }, { v: 'home', icon: '🛋️', label: 'Home' }]
  const cards = [
    { name: 'The White Loft', type: 'indoor', price: 85, rating: 4.97, gradient: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)', tag: '⚡ Instant' },
    { name: 'Rooftop Golden Hour', type: 'outdoor', price: 60, rating: 4.92, gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)', tag: '' },
    { name: 'Cozy Living Room', type: 'home', price: 45, rating: 4.88, gradient: 'linear-gradient(135deg,#fdf2f8,#fce7f3)', tag: '⚡ Instant' },
    { name: 'Glass Cube Studio', type: 'indoor', price: 95, rating: 4.96, gradient: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', tag: '⚡ Instant' },
  ].filter(c => (active === 'all' || c.type === active) && c.price <= price)
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {types.map(t => (
          <button key={t.v} onClick={() => setActive(t.v)} style={{ padding: '5px 12px', borderRadius: '100px', border: `1.5px solid ${active === t.v ? '#0F62FE' : '#e5e7eb'}`, background: active === t.v ? 'rgba(15,98,254,0.1)' : '#fff', color: active === t.v ? '#0F62FE' : '#6b7280', fontWeight: active === t.v ? 700 : 500, fontSize: '11px', cursor: 'pointer' }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Max price: <strong style={{ color: '#0F62FE' }}>${price}/hr</strong></div>
        <input type="range" min={30} max={150} value={price} onChange={e => setPrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#0F62FE' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {cards.map(c => (
          <div key={c.name} style={{ borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ height: '60px', background: c.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              {c.type === 'indoor' ? '🏛️' : c.type === 'outdoor' ? '🌿' : '🛋️'}
              {c.tag && <span style={{ position: 'absolute', top: '4px', left: '4px', fontSize: '8px', background: '#1E8E5A', color: '#fff', padding: '2px 5px', borderRadius: '100px', fontWeight: 700 }}>{c.tag}</span>}
            </div>
            <div style={{ padding: '8px' }}>
              <div style={{ fontWeight: 700, fontSize: '10px', color: '#111', marginBottom: '2px' }}>{c.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 700 }}>★ {c.rating}</span>
                <span style={{ fontSize: '10px', color: '#0F62FE', fontWeight: 700 }}>${c.price}/hr</span>
              </div>
            </div>
          </div>
        ))}
        {cards.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px', color: '#9ca3af', fontSize: '11px' }}>No spaces match. Adjust filters ↑</div>}
      </div>
    </div>
  )
}

function DetailMockup() {
  const [tab, setTab] = useState<'overview' | 'amenities' | 'reviews'>('overview')
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ height: '80px', background: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)', borderRadius: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🏛️</div>
      <div style={{ fontWeight: 800, fontSize: '13px', color: '#111', marginBottom: '2px' }}>The White Loft Studio</div>
      <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '10px' }}>Downtown LA · 1,200 sq ft · Studio</div>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        {(['overview', 'amenities', 'reviews'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '5px', borderRadius: '6px', border: 'none', background: tab === t ? '#0F62FE' : '#f3f4f6', color: tab === t ? '#fff' : '#6b7280', fontWeight: 600, fontSize: '10px', cursor: 'pointer', textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>
      {tab === 'overview' && (
        <div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>Professional white cyc wall studio with full LED grid, dressing room, and high-speed WiFi. Perfect for portraits, fashion, and product shoots.</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['⚡ Instant', '1,200 sq ft', 'Max 8 people'].map(t => <span key={t} style={{ fontSize: '9px', background: '#f3f4f6', padding: '3px 7px', borderRadius: '100px', color: '#374151' }}>{t}</span>)}
          </div>
        </div>
      )}
      {tab === 'amenities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['✅ White cyc wall', '✅ LED grid (5,000W)', '✅ Dressing room', '✅ High-speed WiFi', '✅ AC + heating', '✅ Prop storage'].map(a => (
            <div key={a} style={{ fontSize: '11px', color: '#374151' }}>{a}</div>
          ))}
        </div>
      )}
      {tab === 'reviews' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[{ name: 'Priya K.', stars: 5, text: 'Perfect studio for our campaign.' }, { name: 'Marco T.', stars: 5, text: 'Clean, well-equipped, great host.' }].map(r => (
            <div key={r.name} style={{ padding: '8px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ fontWeight: 700, fontSize: '10px', color: '#111' }}>{r.name}</span>
                <span style={{ color: '#f59e0b', fontSize: '10px' }}>{'★'.repeat(r.stars)}</span>
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>{r.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BookMockup() {
  const [date, setDate] = useState('2026-07-12')
  const [time, setTime] = useState('10:00')
  const [hours, setHours] = useState(3)
  const total = 85 * hours
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '12px' }}>Book · The White Loft <span style={{ fontSize: '10px', fontWeight: 500, color: '#6b7280' }}>$85/hr</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>DATE</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '7px 10px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>START</label>
            <select value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '7px 8px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none' }}>
              {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>HOURS</label>
            <select value={hours} onChange={e => setHours(Number(e.target.value))} style={{ width: '100%', padding: '7px 8px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none' }}>
              {[1,2,3,4,5,6,8].map(h => <option key={h} value={h}>{h}h</option>)}
            </select>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px', color: '#6b7280' }}><span>$85 × {hours}h</span><span>${total}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px', color: '#6b7280' }}><span>Service fee</span><span>${Math.round(total * 0.1)}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid #e5e7eb', fontWeight: 700, fontSize: '12px', color: '#111' }}><span>Total</span><span style={{ color: '#0F62FE' }}>${Math.round(total * 1.1)}</span></div>
      </div>
      <div style={{ padding: '8px', borderRadius: '7px', background: 'rgba(30,142,90,0.08)', fontSize: '10px', color: '#1E8E5A', fontWeight: 600, textAlign: 'center', marginBottom: '8px' }}>⚡ Instant Book — confirmed immediately</div>
      <button style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0F62FE', color: '#fff', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer' }}>Confirm Booking</button>
    </div>
  )
}

function PayMockup() {
  const [method, setMethod] = useState<'card' | 'upi' | 'wallet'>('card')
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '12px' }}>Secure Payment</div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {([['card', '💳', 'Card'], ['upi', '📲', 'UPI'], ['wallet', '👛', 'Wallet']] as const).map(([v, icon, label]) => (
          <button key={v} onClick={() => setMethod(v)} style={{ flex: 1, padding: '7px 4px', borderRadius: '7px', border: `1.5px solid ${method === v ? '#0F62FE' : '#e5e7eb'}`, background: method === v ? 'rgba(15,98,254,0.07)' : '#fff', color: method === v ? '#0F62FE' : '#6b7280', fontWeight: 600, fontSize: '10px', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', marginBottom: '2px' }}>{icon}</div>{label}
          </button>
        ))}
      </div>
      {method === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          <input placeholder="Card number" style={{ padding: '8px 10px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none' }} defaultValue="4242 4242 4242 4242" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input placeholder="MM/YY" defaultValue="08/28" style={{ padding: '8px 10px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none' }} />
            <input placeholder="CVC" defaultValue="•••" style={{ padding: '8px 10px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none' }} />
          </div>
        </div>
      )}
      {method === 'upi' && (
        <div style={{ marginBottom: '14px' }}>
          <input placeholder="yourname@upi" style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} defaultValue="creator@okaxis" />
        </div>
      )}
      {method === 'wallet' && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
          {['Paytm', 'PhonePe', 'GPay'].map(w => <div key={w} style={{ flex: 1, padding: '8px', borderRadius: '7px', border: '1.5px solid #e5e7eb', textAlign: 'center', fontSize: '10px', color: '#374151', fontWeight: 600, cursor: 'pointer' }}>{w}</div>)}
        </div>
      )}
      <div style={{ padding: '10px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', marginBottom: '10px', fontSize: '11px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#6b7280' }}><span>Booking total</span><span>$280</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}><span>Held in escrow</span><span style={{ color: '#1E8E5A', fontWeight: 700 }}>✓ Protected</span></div>
      </div>
      <button style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0F62FE', color: '#fff', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer' }}>🔒 Pay $280</button>
    </div>
  )
}

function ShootMockup() {
  const [checkedIn, setCheckedIn] = useState(false)
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ padding: '12px', borderRadius: '10px', background: checkedIn ? 'rgba(30,142,90,0.08)' : '#f9fafb', border: `1.5px solid ${checkedIn ? '#1E8E5A' : '#e5e7eb'}`, marginBottom: '12px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '6px' }}>{checkedIn ? '✅' : '🔐'}</div>
        <div style={{ fontWeight: 700, fontSize: '12px', color: checkedIn ? '#1E8E5A' : '#111' }}>{checkedIn ? 'Checked In!' : 'Check-In Code'}</div>
        <div style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 800, color: '#0F62FE', letterSpacing: '0.15em', margin: '8px 0' }}>SC-7X9K</div>
        {!checkedIn && <div style={{ fontSize: '10px', color: '#6b7280' }}>Valid from 10:00 AM — 1:00 PM</div>}
        {checkedIn && <div style={{ fontSize: '10px', color: '#1E8E5A', fontWeight: 600 }}>Access unlocked · Timer running</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {[
          { icon: '📍', label: 'Location', value: '123 Loft St, DTLA' },
          { icon: '⏰', label: 'Shoot window', value: '10:00 AM – 1:00 PM' },
          { icon: '👥', label: 'Crew', value: '2 people logged' },
          { icon: '💬', label: 'Host chat', value: 'James W. · Online' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: '7px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '14px' }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#111', fontWeight: 600 }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setCheckedIn(!checkedIn)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: checkedIn ? '#ef4444' : '#0F62FE', color: '#fff', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer' }}>
        {checkedIn ? 'Check Out Early' : '⚡ Check In Now'}
      </button>
    </div>
  )
}

function ReviewMockup() {
  const [stars, setStars] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const [review, setReview] = useState('Great studio, super clean and well-equipped!')
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      {!submitted ? (
        <>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '4px' }}>How was The White Loft?</div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px' }}>Your review helps other creators find great spaces.</div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', justifyContent: 'center' }}>
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => setStars(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', transition: 'transform 0.1s', transform: s <= stars ? 'scale(1.1)' : 'scale(1)' }}>
                {s <= stars ? '⭐' : '☆'}
              </button>
            ))}
          </div>
          <textarea value={review} onChange={e => setReview(e.target.value)} rows={3} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '11px', resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: '10px', color: '#374151', lineHeight: 1.5 }} />
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {['Clean space', 'Great lighting', 'Responsive host', 'Will return'].map(tag => (
              <button key={tag} style={{ padding: '4px 10px', borderRadius: '100px', border: '1.5px solid #0F62FE', background: 'rgba(15,98,254,0.07)', color: '#0F62FE', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>{tag}</button>
            ))}
          </div>
          <button onClick={() => setSubmitted(true)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0F62FE', color: '#fff', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer' }}>Submit Review</button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '6px' }}>Review submitted!</div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '14px' }}>You earned <strong style={{ color: '#0F62FE' }}>+50 loyalty points</strong> for your review.</div>
          <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(15,98,254,0.06)', border: '1px solid rgba(15,98,254,0.2)', fontSize: '11px', color: '#374151' }}>
            🏆 <strong>Creator Level:</strong> Rising Star<br />
            <span style={{ color: '#6b7280' }}>150 more points to unlock Priority Booking</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function HowItWorksSpaces() {
  const [activeStep, setActiveStep] = useState(0)

  const step = STEPS[activeStep]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, height: '60px', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-hairline)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.04em', color: 'var(--color-ink)' }}>SCENEORA</span>
        </Link>
        <nav style={{ display: 'flex', gap: '2px' }}>
          {NAV.map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '12px', color: l.href === '/how-it-works/spaces' ? 'var(--color-accent)' : 'var(--color-muted)', textDecoration: 'none', padding: '5px 10px', borderRadius: '6px', background: l.href === '/how-it-works/spaces' ? 'rgba(15,98,254,0.08)' : 'none' }}>{l.label}</Link>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, rgba(15,98,254,0.06) 0%, rgba(30,142,90,0.06) 100%)`, borderBottom: '1px solid var(--color-hairline)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', background: 'rgba(15,98,254,0.1)', marginBottom: '16px' }}>
          <span style={{ fontSize: '14px' }}>🏛️</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-accent)' }}>Space Rental · How It Works</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '12px' }}>From Browse to Shoot in 6 Steps</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto 24px' }}>
          Book any photography space on Sceneora — indoor studios, rooftops, or home sets — in minutes.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/spaces" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#fff', background: 'var(--color-accent)', textDecoration: 'none', padding: '11px 22px', borderRadius: '8px' }}>Browse Spaces →</Link>
          <Link href="/how-it-works/gear" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)', background: 'var(--color-surface)', textDecoration: 'none', padding: '11px 22px', borderRadius: '8px', border: '1px solid var(--color-hairline)' }}>How Gear Rental Works →</Link>
        </div>
      </div>

      {/* Step selector */}
      <div style={{ borderBottom: '1px solid var(--color-hairline)', background: 'var(--color-surface)', overflowX: 'auto' }}>
        <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          {STEPS.map((s, i) => (
            <button key={s.n} onClick={() => setActiveStep(i)} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 20px',
              background: 'none', border: 'none', borderBottom: `3px solid ${activeStep === i ? s.color : 'transparent'}`,
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'border-color 0.15s',
            }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeStep === i ? s.color : 'var(--color-hairline)', color: activeStep === i ? '#fff' : 'var(--color-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>{s.n}</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', color: activeStep === i ? 'var(--color-ink)' : 'var(--color-muted)' }}>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          {/* Left: explanation */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', background: step.bg, marginBottom: '20px' }}>
              <span style={{ fontSize: '16px' }}>{step.icon}</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: step.color }}>Step {step.n} of {STEPS.length}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '8px' }}>{step.title}</h2>
            <p style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '1rem', color: step.color, marginBottom: '16px' }}>{step.subtitle}</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '28px' }}>{step.description}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
              {step.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: step.bg, border: `1.5px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={step.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Step navigation */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {activeStep > 0 && (
                <button onClick={() => setActiveStep(activeStep - 1)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>← Previous</button>
              )}
              {activeStep < STEPS.length - 1 ? (
                <button onClick={() => setActiveStep(activeStep + 1)} style={{ padding: '10px 20px', borderRadius: '8px', background: step.color, color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>Next Step →</button>
              ) : (
                <Link href="/spaces" style={{ padding: '10px 20px', borderRadius: '8px', background: 'var(--color-accent)', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Browse Spaces →</Link>
              )}
            </div>
          </div>

          {/* Right: interactive mockup */}
          <div>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
              {/* Mock browser chrome */}
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-bg)' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
                </div>
                <div style={{ flex: 1, background: 'var(--color-surface)', borderRadius: '6px', padding: '4px 10px', fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'var(--font-jetbrains-mono)' }}>sceneora.app/{activeStep === 0 ? 'spaces' : activeStep === 1 ? 'spaces/white-loft' : activeStep === 2 ? 'spaces/white-loft/book' : activeStep === 3 ? 'checkout' : activeStep === 4 ? 'bookings/SC-7X9K' : 'bookings/review'}</div>
              </div>
              {/* Sceneora mini nav in mockup */}
              <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--color-bg)' }}>
                <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '12px', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}>SCENEORA</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Spaces', 'Gear', 'Docs'].map(l => <span key={l} style={{ fontSize: '10px', color: l === 'Spaces' ? 'var(--color-accent)' : 'var(--color-muted)', fontWeight: 600 }}>{l}</span>)}
                </div>
              </div>
              {/* Mockup content */}
              <div style={{ padding: '16px' }}>
                {step.mockup}
              </div>
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{ width: i === activeStep ? '24px' : '8px', height: '8px', borderRadius: '100px', background: i === activeStep ? step.color : 'var(--color-hairline)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All steps overview */}
      <div style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-hairline)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--color-ink)', letterSpacing: '-0.03em', marginBottom: '32px', textAlign: 'center' }}>All 6 Steps at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
            {STEPS.map((s, i) => (
              <button key={s.n} onClick={() => setActiveStep(i)} style={{ padding: '20px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: `1.5px solid ${activeStep === i ? s.color : 'var(--color-hairline)'}`, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, transform 0.15s', transform: activeStep === i ? 'translateY(-2px)' : '' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = s.color}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = activeStep === i ? s.color : 'var(--color-hairline)'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginBottom: '10px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: s.color, fontWeight: 700, marginBottom: '4px' }}>Step {s.n}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)' }}>{s.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--color-ink)', letterSpacing: '-0.03em', marginBottom: '12px' }}>Ready to find your space?</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '24px' }}>2,400+ curated spaces available right now.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/spaces" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#fff', background: 'var(--color-accent)', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px' }}>Browse Spaces</Link>
          <Link href="/how-it-works/gear" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)', background: 'var(--color-surface)', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--color-hairline)' }}>How Gear Rental Works</Link>
        </div>
      </div>
    </div>
  )
}
