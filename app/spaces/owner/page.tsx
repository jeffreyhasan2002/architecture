'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../../components/SceneoraNav'

const ACCENT = '#0F62FE'
const ACCENT_BG = '#EEF2FF'

const ONBOARDING_STEPS = [
  { step: '01', icon: '📱', title: 'Register & Verify', desc: 'Phone OTP or Google sign-in. Select "Space Owner" as your role.' },
  { step: '02', icon: '🏛️', title: 'List Your Space', desc: 'Add your space name, type (indoor / outdoor / home), location, size, and amenities.' },
  { step: '03', icon: '📸', title: 'Upload Photos', desc: 'Add real photos — AI auto-tags the mood, style, and best use-cases for better discoverability.' },
  { step: '04', icon: '🪪', title: 'KYC & Property Verification', desc: 'Aadhaar + property proof. Verified badge unlocks in 24–48 hrs and boosts search ranking.' },
  { step: '05', icon: '📅', title: 'Set Availability & Pricing', desc: 'Set hourly price, blocked dates, and toggle Instant Book. Connect Google Calendar optionally.' },
  { step: '06', icon: '💼', title: 'Choose Your Plan', desc: 'Start Free (1 listing). Upgrade to Pro or Studio to list more spaces and earn more.' },
]

const PLANS = [
  {
    name: 'Free', price: '₹0', period: '/mo', color: '#5A5F7A', bg: '#F0F1F8',
    features: ['1 space listing', 'Basic photos (up to 8)', 'Standard search listing', 'Request-to-book only', 'Escrow-protected payments', 'Basic analytics'],
    cta: 'Start Free',
  },
  {
    name: 'Pro', price: '₹1,499', period: '/mo', color: ACCENT, bg: ACCENT_BG, featured: true,
    features: ['Up to 5 space listings', 'Unlimited photos + video tour', 'Priority search ranking', '⚡ Instant Book enabled', 'Advanced calendar management', 'Earnings dashboard & payouts', 'Direct renter messaging', 'Custom amenity tags'],
    cta: 'Get Pro',
  },
  {
    name: 'Studio', price: '₹3,999', period: '/mo', color: '#7C3AED', bg: '#F5F3FF',
    features: ['Unlimited listings', 'Featured homepage placement', 'Studio branding & custom URL', 'Multi-host team access', 'Priority dispute resolution', 'Dedicated account manager', 'API access for calendar sync', 'Revenue forecasting tools'],
    cta: 'Get Studio',
  },
]

const MOCK_BOOKINGS = [
  { renter: 'Priya Nair', use: 'Fashion Editorial · 4 hrs', space: 'The White Loft Studio', date: 'Jul 14, 2026 · 10:00 AM', status: 'Confirmed', statusColor: '#059669', statusBg: '#ECFDF5', amount: 4800, released: false },
  { renter: 'Rahul Sharma', use: 'Product Shoot · 3 hrs', space: 'The White Loft Studio', date: 'Jul 10, 2026 · 9:00 AM', status: 'Completed', statusColor: ACCENT, statusBg: ACCENT_BG, amount: 3600, released: true },
  { renter: 'Brand Collab', use: 'Campaign Shoot · 6 hrs', space: 'Rooftop Suite', date: 'Jul 8, 2026 · 2:00 PM', status: 'Request Pending', statusColor: '#B45309', statusBg: '#FFFBEB', amount: 7200, released: false },
  { renter: 'Sneha Iyer', use: 'Content Creation · 2 hrs', space: 'The White Loft Studio', date: 'Jul 5, 2026 · 11:00 AM', status: 'Completed', statusColor: ACCENT, statusBg: ACCENT_BG, amount: 2400, released: true },
]

const MOCK_SPACES = [
  { name: 'The White Loft Studio', type: 'Indoor · White Cyc', price: 1200, rating: 4.97, reviews: 312, bookingsMonth: 18, revenue: 38400, available: true, instant: true, gradient: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)' },
  { name: 'Rooftop Suite', type: 'Outdoor · Rooftop', price: 900, rating: 4.92, reviews: 187, bookingsMonth: 11, revenue: 22500, available: true, instant: false, gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
]

const ANALYTICS = [
  { icon: '👁️', label: 'Listing Views (30d)', val: '8,420', trend: '+18%', trendColor: '#059669' },
  { icon: '📅', label: 'Bookings (30d)', val: '29', trend: '+34%', trendColor: '#059669' },
  { icon: '⏱️', label: 'Avg Booking Duration', val: '3.8 hrs', trend: 'Stable', trendColor: ACCENT },
  { icon: '📈', label: 'Occupancy Rate', val: '73%', trend: '+9pp', trendColor: '#059669' },
  { icon: '💬', label: 'Response Rate', val: '97%', trend: 'Top 5%', trendColor: '#059669' },
  { icon: '⭐', label: 'Avg Rating', val: '4.95 / 5', trend: '+0.03', trendColor: '#059669' },
]

function PlanCard({ plan }: { plan: typeof PLANS[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{
        padding: '30px', borderRadius: '20px', background: 'var(--color-surface)',
        border: `${plan.featured ? '2px' : '1.5px'} solid ${plan.featured ? plan.color : 'var(--color-hairline)'}`,
        position: 'relative', transition: 'all 0.2s',
        boxShadow: plan.featured ? `0 0 0 4px ${plan.color}18, var(--shadow-md)` : hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hov ? 'translateY(-4px)' : '',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {plan.featured && (
        <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: plan.color, color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 16px', borderRadius: '100px' }}>
          Most Popular
        </div>
      )}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', background: plan.bg, marginBottom: '14px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: plan.color }}>{plan.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '22px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', color: 'var(--color-ink)', letterSpacing: '-0.04em' }}>{plan.price}</span>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>{plan.period}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '26px' }}>
        {plan.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
              <circle cx="7.5" cy="7.5" r="7" fill={`${plan.color}22`} />
              <path d="M4.5 7.5l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{f}</span>
          </div>
        ))}
      </div>
      <button style={{
        width: '100%', padding: '12px', borderRadius: '10px',
        background: plan.featured ? plan.color : 'transparent',
        color: plan.featured ? '#fff' : plan.color,
        border: `2px solid ${plan.color}`,
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
        transition: 'all 0.15s',
      }}>
        {plan.cta}
      </button>
    </div>
  )
}

export default function SpaceOwnerPage() {
  const [dashTab, setDashTab] = useState<'overview' | 'bookings' | 'earnings' | 'analytics' | 'spaces'>('overview')
  const [onboardStep, setOnboardStep] = useState(0)

  const totalEarned = MOCK_BOOKINGS.filter(b => b.released).reduce((s, b) => s + b.amount, 0)
  const inEscrow = MOCK_BOOKINGS.filter(b => !b.released && b.status === 'Confirmed').reduce((s, b) => s + b.amount, 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/spaces/owner" />

      {/* ── Hero ── */}
      <section style={{ paddingTop: '110px', paddingBottom: '72px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1060px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '100px', border: `1px solid ${ACCENT}33`, marginBottom: '28px', background: ACCENT_BG }}>
          <span style={{ fontSize: '16px' }}>🏛️</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', color: ACCENT, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Space Owner Portal</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,3.8rem)', letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: '22px', color: 'var(--color-ink)' }}>
          Turn your space into<br />
          <span style={{ color: ACCENT }}>a steady income stream.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.75 }}>
          List your studio, rooftop, or home set on Sceneora. Get discovered by thousands of photographers and content creators. Accept bookings, receive escrow-protected payments, and grow your space business — all from one dashboard.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          {[
            { val: '₹60K–2.4L', label: 'Avg monthly revenue per space' },
            { val: '73%', label: 'Avg occupancy on Pro plan' },
            { val: '2,400+', label: 'Active spaces on platform' },
            { val: 'T+1', label: 'Payout after booking confirmed' },
          ].map(s => (
            <div key={s.label} style={{ padding: '14px 22px', background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', borderRadius: '14px', textAlign: 'center', minWidth: '140px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: ACCENT, letterSpacing: '-0.03em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px', maxWidth: '120px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#onboarding" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)`, textDecoration: 'none', padding: '14px 30px', borderRadius: '11px', boxShadow: `0 4px 18px ${ACCENT}44` }}>
            List My Space →
          </a>
          <a href="#dashboard" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '14px 30px', borderRadius: '11px', border: '1.5px solid var(--color-hairline)' }}>
            Preview Dashboard
          </a>
        </div>
      </section>

      {/* ── Dashboard Mockup ── */}
      <section id="dashboard" style={{ padding: '0 24px 72px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', marginBottom: '8px' }}>Space Owner Dashboard</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)' }}>Track earnings, manage bookings, and monitor your space performance in real time. (Mock data)</p>
        </div>

        <div style={{ background: 'var(--color-surface)', borderRadius: '22px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          {/* Dashboard Header */}
          <div style={{ background: `linear-gradient(135deg, ${ACCENT_BG}, #F5F3FF)`, borderBottom: `1px solid ${ACCENT}22`, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏛️</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--color-ink)' }}>Ananya Studio Co.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>Coimbatore · 2 Spaces</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '2px 9px', borderRadius: '100px' }}>✓ Verified</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: ACCENT, background: ACCENT_BG, padding: '2px 9px', borderRadius: '100px' }}>Pro Plan</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: ACCENT }}>₹60,900</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>This Month</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: '#059669' }}>₹4,800</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>In Escrow</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: '#B45309' }}>3</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>Pending</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 28px', overflowX: 'auto' }}>
            {(['overview', 'bookings', 'earnings', 'spaces', 'analytics'] as const).map(tab => (
              <button key={tab} onClick={() => setDashTab(tab)} style={{
                padding: '15px 18px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
                color: dashTab === tab ? ACCENT : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === tab ? `2.5px solid ${ACCENT}` : '2.5px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize', whiteSpace: 'nowrap',
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ padding: '28px' }}>
            {/* OVERVIEW */}
            {dashTab === 'overview' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginBottom: '24px' }}>
                  {[
                    { icon: '💰', label: 'Revenue This Month', val: '₹60,900', sub: '+28% vs last month', color: ACCENT },
                    { icon: '📅', label: 'Upcoming Bookings', val: '6', sub: 'Next: Jul 14 · 10:00 AM', color: '#7C3AED' },
                    { icon: '👁️', label: 'Listing Views (30d)', val: '8,420', sub: '+18% vs prev period', color: '#059669' },
                    { icon: '⚡', label: 'Instant Bookings', val: '71%', sub: 'of total (above avg)', color: '#B45309' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)', transition: 'box-shadow 0.15s' }}>
                      <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.icon}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: s.color, letterSpacing: '-0.03em' }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>{s.label}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#059669', marginTop: '5px', fontWeight: 600 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Earnings bar chart (visual) */}
                <div style={{ background: 'var(--color-bg)', borderRadius: '14px', padding: '20px', border: '1.5px solid var(--color-hairline)', marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '16px' }}>Monthly Revenue Trend</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px' }}>
                    {[['Apr', 38], ['May', 52], ['Jun', 47], ['Jul', 68, true], ['Aug', 60]].map(([m, h, cur]) => (
                      <div key={String(m)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '100%', height: `${Number(h)}%`, borderRadius: '6px 6px 0 0', background: cur ? ACCENT : 'var(--color-hairline)', transition: 'background 0.15s' }} />
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: cur ? ACCENT : 'var(--color-muted)', fontWeight: cur ? 700 : 500 }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                <div style={{ padding: '16px 18px', borderRadius: '12px', background: '#FFFBEB', border: '1px solid #FDE68A', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>💡</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: '#B45309', marginBottom: '4px' }}>Tip: Enable Instant Book to get 40% more bookings</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#92400E' }}>Your Rooftop Suite is on Request-to-book. Switching to Instant Book could increase your monthly revenue by an estimated ₹18,000.</div>
                  </div>
                </div>
              </div>
            )}

            {/* BOOKINGS */}
            {dashTab === 'bookings' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>Recent Bookings</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['All', 'Confirmed', 'Pending', 'Completed'].map(f => (
                      <button key={f} style={{ padding: '5px 12px', borderRadius: '100px', border: '1.5px solid var(--color-hairline)', background: f === 'All' ? ACCENT_BG : 'none', color: f === 'All' ? ACCENT : 'var(--color-muted)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '11px', cursor: 'pointer' }}>{f}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {MOCK_BOOKINGS.map(b => (
                    <div key={b.renter + b.date} style={{ padding: '16px 20px', borderRadius: '14px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '14px', alignItems: 'center' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: ACCENT_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📷</div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{b.renter}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>{b.use}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>📅 {b.date} · {b.space}</div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: b.statusColor, background: b.statusBg, padding: '4px 11px', borderRadius: '100px', whiteSpace: 'nowrap' }}>{b.status}</span>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--color-ink)' }}>₹{b.amount.toLocaleString()}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: b.released ? '#059669' : '#B45309', marginTop: '2px' }}>{b.released ? '✓ Paid out' : '🔒 In escrow'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EARNINGS */}
            {dashTab === 'earnings' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginBottom: '24px' }}>
                  {[
                    { label: 'Total Earned (YTD)', val: '₹5,24,000', color: ACCENT },
                    { label: 'In Escrow (awaiting)', val: '₹4,800', color: '#B45309' },
                    { label: 'Next Payout', val: '₹38,400', color: '#059669' },
                    { label: 'Platform Fee (10%)', val: '₹6,090', color: 'var(--color-muted)' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: s.color, letterSpacing: '-0.03em', marginBottom: '6px' }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--color-bg)', borderRadius: '14px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ padding: '14px 20px', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                    {['Month', 'Bookings', 'Gross Revenue', 'Net Payout'].map(h => (
                      <span key={h} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
                    ))}
                  </div>
                  {[
                    ['Jul 2026', '29', '₹67,600', '₹60,900'],
                    ['Jun 2026', '24', '₹55,500', '₹49,950'],
                    ['May 2026', '31', '₹72,200', '₹64,980'],
                    ['Apr 2026', '19', '₹43,500', '₹39,150'],
                  ].map(([month, books, gross, net]) => (
                    <div key={month} style={{ padding: '13px 20px', borderBottom: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--color-ink)' }}>{month}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>{books}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>{gross}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: ACCENT }}>{net}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px 18px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#065F46' }}>
                  💳 <strong>Payouts</strong> are processed every Monday. Funds are released from escrow 24 hours after the booking is confirmed complete by the renter.
                </div>
              </div>
            )}

            {/* SPACES */}
            {dashTab === 'spaces' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>Your Listings</span>
                  <button style={{ padding: '8px 18px', borderRadius: '9px', background: ACCENT, color: '#fff', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>+ Add Space</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {MOCK_SPACES.map(sp => (
                    <div key={sp.name} style={{ borderRadius: '16px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '0' }}>
                        <div style={{ height: '100%', minHeight: '100px', background: sp.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🏛️</div>
                        <div style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{sp.name}</span>
                            {sp.instant && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '2px 8px', borderRadius: '100px' }}>⚡ Instant Book</span>}
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: sp.available ? '#059669' : '#DC2626', background: sp.available ? '#ECFDF5' : '#FEF2F2', padding: '2px 8px', borderRadius: '100px' }}>{sp.available ? 'Active' : 'Paused'}</span>
                          </div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px' }}>{sp.type} · ₹{sp.price}/hr · ★ {sp.rating} ({sp.reviews} reviews)</div>
                          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <div>
                              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: ACCENT }}>{sp.bookingsMonth}</div>
                              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>bookings this month</div>
                            </div>
                            <div>
                              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: '#059669' }}>₹{sp.revenue.toLocaleString()}</div>
                              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>revenue this month</div>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                          <button style={{ padding: '7px 16px', borderRadius: '8px', background: ACCENT_BG, color: ACCENT, border: `1px solid ${ACCENT}33`, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Edit Listing</button>
                          <button style={{ padding: '7px 16px', borderRadius: '8px', background: 'none', color: 'var(--color-muted)', border: '1.5px solid var(--color-hairline)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>View Calendar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ANALYTICS */}
            {dashTab === 'analytics' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
                {ANALYTICS.map(s => (
                  <div key={s.label} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{ fontSize: '22px' }}>{s.icon}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: s.trendColor, background: s.trendColor + '18', padding: '3px 9px', borderRadius: '100px' }}>{s.trend}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: ACCENT, letterSpacing: '-0.025em' }}>{s.val}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginTop: '5px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── How Listing Works ── */}
      <section style={{ padding: '0 24px 72px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', marginBottom: '8px' }}>Your Space, Live in 6 Steps</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)' }}>From registration to accepting your first booking</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px' }}>
          {[
            { icon: '📱', step: '01', title: 'Register & Select Owner Role', desc: 'Sign up with phone OTP or Google. Pick "Space Owner" and your space type.' },
            { icon: '🏛️', step: '02', title: 'Create Your Listing', desc: 'Add name, type, location, size, amenities, house rules, and max capacity.' },
            { icon: '📸', step: '03', title: 'Upload Real Photos', desc: 'Add photos from every angle. AI auto-tags style and use cases — "fashion-ready", "product-friendly", etc.' },
            { icon: '🪪', step: '04', title: 'KYC & Property Proof', desc: 'Submit Aadhaar + property document. Verified badge boosts your search rank by up to 2× in 24–48 hrs.' },
            { icon: '📅', step: '05', title: 'Set Pricing & Availability', desc: 'Set hourly price, block dates, toggle ⚡ Instant Book, and optionally connect Google Calendar.' },
            { icon: '💳', step: '06', title: 'Get Paid Reliably', desc: 'Renter pays upfront into escrow. Funds released T+1 after booking completion. Weekly payouts.' },
          ].map(s => (
            <div key={s.step} style={{ padding: '22px', borderRadius: '16px', background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = ACCENT + '66'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = ''; el.style.boxShadow = '' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: ACCENT_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{s.icon}</div>
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: ACCENT, fontWeight: 700 }}>{s.step}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px' }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Plans ── */}
      <section style={{ padding: '0 24px 72px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', marginBottom: '8px' }}>Space Owner Plans</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)' }}>Start free with 1 listing. Scale when you're ready.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
          {PLANS.map(plan => <PlanCard key={plan.name} plan={plan} />)}
        </div>
        <div style={{ marginTop: '28px', padding: '18px 22px', borderRadius: '14px', background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '22px' }}>💡</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '3px' }}>Platform fee: 10% per booking (all plans)</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>Sceneora takes 10% of each booking's gross rental value. No other hidden fees. Damage deposits are held separately in escrow and returned directly to renters.</div>
          </div>
        </div>
      </section>

      {/* ── Onboarding CTA ── */}
      <section id="onboarding" style={{ padding: '0 24px 88px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #7C3AED 100%)`, borderRadius: '26px', padding: '60px 52px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: '-100px', left: '-50px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.18)', padding: '5px 14px', borderRadius: '100px', marginBottom: '22px' }}>
              <span style={{ fontSize: '14px' }}>🚀</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Space Owner Onboarding</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.7rem,3.5vw,2.5rem)', letterSpacing: '-0.03em', marginBottom: '14px', lineHeight: 1.2 }}>Go from sign-up to first booking in 48 hours</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '560px', lineHeight: 1.75 }}>
              Your listing goes live the moment KYC is approved. Creators in your city can discover and book your space immediately — no waiting period, no manual approval.
            </p>
            {/* Step tracker */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px', marginBottom: '36px' }}>
              {ONBOARDING_STEPS.map((s, i) => (
                <div key={s.step}
                  onClick={() => setOnboardStep(i)}
                  style={{ padding: '16px', borderRadius: '12px', background: onboardStep === i ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)', border: `1px solid ${onboardStep === i ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{s.step}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', color: '#fff', marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: ACCENT, background: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                List My Space for Free →
              </button>
              <Link href="/spaces" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', textDecoration: 'none', padding: '14px 32px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)' }}>
                View Space Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer links */}
      <section style={{ padding: '0 24px 72px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-muted)' }}>Also explore →</span>
          {[
            { href: '/gear/owner', label: '🔧 Gear Owner Portal', color: '#7C3AED', bg: '#F5F3FF' },
            { href: '/roles/creator', label: '📷 Creator Portal', color: '#7C3AED', bg: '#F5F3FF' },
            { href: '/spaces', label: '🏛️ Browse Spaces', color: ACCENT, bg: ACCENT_BG },
            { href: '/docs', label: '📄 Architecture Docs', color: '#059669', bg: '#ECFDF5' },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '100px', background: l.bg, border: `1px solid ${l.color}33`, textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', color: l.color, transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
            >{l.label}</Link>
          ))}
        </div>
      </section>
    </div>
  )
}
