'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../../components/SceneoraNav'

const ACCENT = '#7C3AED'
const ACCENT_BG = '#F5F3FF'
const GREEN = '#059669'

const ONBOARDING_STEPS = [
  { step: '01', icon: '📱', title: 'Register & Verify', desc: 'Phone OTP or Google sign-in. Select "Gear Owner" and choose Shop or Individual.' },
  { step: '02', icon: '📷', title: 'List Your Gear', desc: 'Add item name, brand, category, specs, condition grade, and high-quality real photos.' },
  { step: '03', icon: '🪪', title: 'KYC & Gear Verification', desc: 'Aadhaar verification + proof of ownership (invoice/serial). Verified badge unlocks in 24–48 hrs.' },
  { step: '04', icon: '💰', title: 'Set Pricing & Deposit', desc: 'Set per-day and per-week rates. Define a refundable damage deposit. Toggle availability.' },
  { step: '05', icon: '📅', title: 'Manage Availability', desc: 'Mark your item available or blocked. Renters book from your live calendar — no double-rentals.' },
  { step: '06', icon: '💼', title: 'Choose Your Plan', desc: 'Free for 2 items. Upgrade to Pro (₹799/mo) or Shop (₹2,299/mo) for more listings and tools.' },
]

const PLANS = [
  {
    name: 'Free', price: '₹0', period: '/mo', color: '#5A5F7A', bg: '#F0F1F8',
    features: ['Up to 2 gear listings', 'Basic photos (5 per item)', 'Standard search listing', 'Request-to-book only', 'Escrow-protected deposits', 'Basic payout tracking'],
    cta: 'Start Free',
  },
  {
    name: 'Pro', price: '₹799', period: '/mo', color: ACCENT, bg: ACCENT_BG, featured: true,
    features: ['Up to 20 gear listings', 'Unlimited photos per item', 'Priority search ranking', '⚡ Instant Book enabled', 'Earnings dashboard & analytics', 'Direct renter messaging', 'Condition verification badge', 'Weekly payout reports'],
    cta: 'Get Pro',
  },
  {
    name: 'Shop', price: '₹2,299', period: '/mo', color: '#0F62FE', bg: '#EEF2FF',
    features: ['Unlimited listings', 'Verified Shop badge & storefront', 'Featured search placement', 'Multi-staff access', 'Bulk upload via CSV/API', 'Dedicated account manager', 'Custom insurance integration', 'Revenue forecasting & CSV export'],
    cta: 'Get Shop Plan',
  },
]

const MOCK_RENTALS = [
  { renter: 'Priya Nair', gear: 'Sony A7 IV · 2 days', date: 'Jul 14–16, 2026', status: 'Active Rental', statusColor: '#059669', statusBg: '#ECFDF5', rentalAmt: 190, deposit: 500, depositStatus: 'held' },
  { renter: 'Rahul Kanna', gear: 'Aputure 600d Pro · 1 day', date: 'Jul 10, 2026', status: 'Returned', statusColor: '#0F62FE', statusBg: '#EEF2FF', rentalAmt: 75, deposit: 400, depositStatus: 'released' },
  { renter: 'Brand Team', gear: 'DJI Mavic 3 Pro · 3 days', date: 'Jul 7–10, 2026', status: 'Returned', statusColor: '#0F62FE', statusBg: '#EEF2FF', rentalAmt: 330, deposit: 600, depositStatus: 'released' },
  { renter: 'Sneha Iyer', gear: 'Canon RF 50mm f/1.2L · 2 days', date: 'Jul 3–5, 2026', status: 'Pending Request', statusColor: '#B45309', statusBg: '#FFFBEB', rentalAmt: 110, deposit: 300, depositStatus: 'pending' },
]

const MOCK_GEAR = [
  { name: 'Sony A7 IV', brand: 'Sony', cat: 'Camera', emoji: '📷', condition: 'Like New', priceDay: 95, priceWeek: 560, deposit: 500, rating: 4.97, reviews: 341, rentalsMonth: 8, revenueMonth: 950, available: true, gradient: 'linear-gradient(135deg,#1e1e2e,#2d2d44)' },
  { name: 'Aputure 600d Pro', brand: 'Aputure', cat: 'Lighting', emoji: '💡', condition: 'Excellent', priceDay: 75, priceWeek: 430, deposit: 400, rating: 4.93, reviews: 187, rentalsMonth: 11, revenueMonth: 1100, available: true, gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
  { name: 'DJI Mavic 3 Pro', brand: 'DJI', cat: 'Camera', emoji: '🚁', condition: 'Like New', priceDay: 110, priceWeek: 620, deposit: 600, rating: 4.94, reviews: 172, rentalsMonth: 6, revenueMonth: 880, available: false, gradient: 'linear-gradient(135deg,#e0f7fa,#b2ebf2)' },
]

const ANALYTICS = [
  { icon: '👁️', label: 'Listing Views (30d)', val: '6,840', trend: '+22%', trendColor: GREEN },
  { icon: '📦', label: 'Rentals (30d)', val: '25', trend: '+31%', trendColor: GREEN },
  { icon: '📈', label: 'Utilization Rate', val: '68%', trend: '+8pp', trendColor: GREEN },
  { icon: '💬', label: 'Response Rate', val: '99%', trend: 'Top 3%', trendColor: GREEN },
  { icon: '🔒', label: 'Deposit Disputes', val: '0', trend: 'All-time', trendColor: '#5A5F7A' },
  { icon: '⭐', label: 'Avg Rating', val: '4.95 / 5', trend: '+0.02', trendColor: GREEN },
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

const COND_COLORS: Record<string, { color: string; bg: string }> = {
  'Like New': { color: '#059669', bg: '#ECFDF5' },
  'Excellent': { color: '#0F62FE', bg: '#EEF2FF' },
  'Good': { color: '#B45309', bg: '#FFFBEB' },
}

export default function GearOwnerPage() {
  const [dashTab, setDashTab] = useState<'overview' | 'rentals' | 'earnings' | 'inventory' | 'analytics'>('overview')
  const [onboardStep, setOnboardStep] = useState(0)

  const totalGross = MOCK_RENTALS.filter(r => r.status === 'Returned').reduce((s, r) => s + r.rentalAmt, 0)
  const activeRevenue = MOCK_RENTALS.find(r => r.status === 'Active Rental')?.rentalAmt ?? 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/gear/owner" />

      {/* ── Hero ── */}
      <section style={{ paddingTop: '110px', paddingBottom: '72px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1060px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '100px', border: `1px solid ${ACCENT}33`, marginBottom: '28px', background: ACCENT_BG }}>
          <span style={{ fontSize: '16px' }}>🔧</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', color: ACCENT, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Gear Owner Portal</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,3.8rem)', letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: '22px', color: 'var(--color-ink)' }}>
          Your idle gear is<br />
          <span style={{ color: ACCENT }}>a revenue machine.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.75 }}>
          List your cameras, lenses, lights, and audio equipment on Sceneora. Rent to verified creators and shops nearby. Get escrow-protected deposits, weekly payouts, and full damage protection — from one professional dashboard.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          {[
            { val: '₹15K–80K', label: 'Avg monthly revenue per owner' },
            { val: '68%', label: 'Avg utilization rate on Pro plan' },
            { val: '8,900+', label: 'Active gear items on platform' },
            { val: '0 disputes', label: 'Avg for verified gear owners' },
          ].map(s => (
            <div key={s.label} style={{ padding: '14px 22px', background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', borderRadius: '14px', textAlign: 'center', minWidth: '140px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: ACCENT, letterSpacing: '-0.03em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px', maxWidth: '120px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#onboarding" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', background: `linear-gradient(135deg, ${ACCENT}, #0F62FE)`, textDecoration: 'none', padding: '14px 30px', borderRadius: '11px', boxShadow: `0 4px 18px ${ACCENT}44` }}>
            List My Gear →
          </a>
          <a href="#dashboard" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '14px 30px', borderRadius: '11px', border: '1.5px solid var(--color-hairline)' }}>
            Preview Dashboard
          </a>
        </div>
      </section>

      {/* ── Dashboard Mockup ── */}
      <section id="dashboard" style={{ padding: '0 24px 72px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', marginBottom: '8px' }}>Gear Owner Dashboard</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)' }}>Track rentals, deposits, earnings, and your gear inventory — all in one place. (Mock data)</p>
        </div>

        <div style={{ background: 'var(--color-surface)', borderRadius: '22px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          {/* Dashboard Header */}
          <div style={{ background: `linear-gradient(135deg, ${ACCENT_BG}, #EEF2FF)`, borderBottom: `1px solid ${ACCENT}22`, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `linear-gradient(135deg, ${ACCENT}, #0F62FE)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📷</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--color-ink)' }}>ProGear LA</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>Los Angeles · 3 Items · Shop Owner</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: GREEN, background: '#ECFDF5', padding: '2px 9px', borderRadius: '100px' }}>✓ Verified</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: ACCENT, background: ACCENT_BG, padding: '2px 9px', borderRadius: '100px' }}>Pro Plan</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: ACCENT }}>₹2,930</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>This Month Net</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: GREEN }}>₹1,500</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>Deposits Held</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: '#B45309' }}>1</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>Pending Request</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 28px', overflowX: 'auto' }}>
            {(['overview', 'rentals', 'earnings', 'inventory', 'analytics'] as const).map(tab => (
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
                    { icon: '💰', label: 'Gross Revenue (Month)', val: '₹3,255', sub: '+41% vs last month', color: ACCENT },
                    { icon: '📦', label: 'Active Rentals', val: '1', sub: 'Sony A7 IV · ends Jul 16', color: GREEN },
                    { icon: '🔒', label: 'Deposits Held', val: '₹500', sub: 'Sony A7 IV · Jul 14–16', color: '#B45309' },
                    { icon: '👁️', label: 'Views (30d)', val: '6,840', sub: '+22% vs last month', color: '#0F62FE' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)' }}>
                      <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.icon}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: s.color, letterSpacing: '-0.03em' }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>{s.label}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: GREEN, marginTop: '5px', fontWeight: 600 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Revenue bars */}
                <div style={{ background: 'var(--color-bg)', borderRadius: '14px', padding: '20px', border: '1.5px solid var(--color-hairline)', marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '16px' }}>Monthly Revenue Trend (Gear Rental)</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px' }}>
                    {[['Apr', 30], ['May', 55], ['Jun', 48], ['Jul', 72, true], ['Aug', 62]].map(([m, h, cur]) => (
                      <div key={String(m)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '100%', height: `${Number(h)}%`, borderRadius: '6px 6px 0 0', background: cur ? ACCENT : 'var(--color-hairline)' }} />
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: cur ? ACCENT : 'var(--color-muted)', fontWeight: cur ? 700 : 500 }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deposit safety notice */}
                <div style={{ padding: '16px 18px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>🛡️</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: '#065F46', marginBottom: '4px' }}>Deposit Protection — You're Covered</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#047857' }}>All damage deposits are held in escrow by Sceneora. If gear is returned damaged, you have 48 hours to file a claim. No claim = deposit auto-released to renter. You are always protected.</div>
                  </div>
                </div>
              </div>
            )}

            {/* RENTALS */}
            {dashTab === 'rentals' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>Rental History</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['All', 'Active', 'Pending', 'Returned'].map(f => (
                      <button key={f} style={{ padding: '5px 12px', borderRadius: '100px', border: '1.5px solid var(--color-hairline)', background: f === 'All' ? ACCENT_BG : 'none', color: f === 'All' ? ACCENT : 'var(--color-muted)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '11px', cursor: 'pointer' }}>{f}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {MOCK_RENTALS.map(r => (
                    <div key={r.renter + r.date} style={{ padding: '16px 20px', borderRadius: '14px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '14px', alignItems: 'center' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: ACCENT_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📷</div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{r.renter}</div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>{r.gear}</div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>📅 {r.date}</div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: r.statusColor, background: r.statusBg, padding: '4px 11px', borderRadius: '100px', whiteSpace: 'nowrap' }}>{r.status}</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--color-ink)' }}>₹{r.rentalAmt}</div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>+₹{r.deposit} deposit</div>
                        </div>
                      </div>
                      {/* Deposit status bar */}
                      <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '8px', background: r.depositStatus === 'released' ? '#ECFDF5' : r.depositStatus === 'held' ? '#FFFBEB' : 'var(--color-bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: r.depositStatus === 'released' ? GREEN : r.depositStatus === 'held' ? '#B45309' : 'var(--color-muted)', fontWeight: 600 }}>
                          🔒 Deposit ₹{r.deposit} — {r.depositStatus === 'released' ? 'Auto-released to renter ✓' : r.depositStatus === 'held' ? 'Held in escrow · 48h inspection window' : 'Awaiting payment confirmation'}
                        </span>
                        {r.depositStatus === 'held' && (
                          <button style={{ padding: '4px 12px', borderRadius: '7px', background: '#DC2626', color: '#fff', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', cursor: 'pointer' }}>File Claim</button>
                        )}
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
                    { label: 'Total Earned (YTD)', val: '₹21,840', color: ACCENT },
                    { label: 'Deposits Currently Held', val: '₹500', color: '#B45309' },
                    { label: 'Next Weekly Payout', val: '₹2,637', color: GREEN },
                    { label: 'Platform Fee (10%)', val: '₹293', color: 'var(--color-muted)' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: s.color, letterSpacing: '-0.03em', marginBottom: '6px' }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--color-bg)', borderRadius: '14px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ padding: '14px 20px', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                    {['Month', 'Rentals', 'Gross', 'Net Payout'].map(h => (
                      <span key={h} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
                    ))}
                  </div>
                  {[
                    ['Jul 2026', '25', '₹3,255', '₹2,930'],
                    ['Jun 2026', '19', '₹2,490', '₹2,241'],
                    ['May 2026', '27', '₹3,620', '₹3,258'],
                    ['Apr 2026', '14', '₹1,960', '₹1,764'],
                  ].map(([month, rentals, gross, net]) => (
                    <div key={month} style={{ padding: '13px 20px', borderBottom: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--color-ink)' }}>{month}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>{rentals}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>{gross}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: ACCENT }}>{net}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px 18px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#065F46' }}>
                  💳 <strong>Payouts</strong> are processed every Monday. Funds are released from escrow 48 hours after the renter returns the gear and the inspection window closes.
                </div>
              </div>
            )}

            {/* INVENTORY */}
            {dashTab === 'inventory' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>Your Gear Inventory</span>
                  <button style={{ padding: '8px 18px', borderRadius: '9px', background: ACCENT, color: '#fff', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>+ Add Item</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {MOCK_GEAR.map(g => {
                    const cond = COND_COLORS[g.condition]
                    return (
                      <div key={g.name} style={{ borderRadius: '16px', background: 'var(--color-bg)', border: '1.5px solid var(--color-hairline)', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto' }}>
                          <div style={{ height: '100%', minHeight: '90px', background: g.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>{g.emoji}</div>
                          <div style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{g.name}</span>
                              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: cond.color, background: cond.bg, padding: '2px 8px', borderRadius: '100px' }}>{g.condition}</span>
                              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', color: g.available ? GREEN : '#DC2626', background: g.available ? '#ECFDF5' : '#FEF2F2', padding: '2px 8px', borderRadius: '100px' }}>{g.available ? 'Available' : 'On Rental'}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px' }}>
                              {g.brand} · {g.cat} · ₹{g.priceDay}/day · ₹{g.priceWeek}/wk · Deposit ₹{g.deposit} · ★ {g.rating} ({g.reviews})
                            </div>
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                              <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: ACCENT }}>{g.rentalsMonth}</div>
                                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>rentals this month</div>
                              </div>
                              <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: GREEN }}>₹{g.revenueMonth.toLocaleString()}</div>
                                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>revenue this month</div>
                              </div>
                            </div>
                          </div>
                          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                            <button style={{ padding: '7px 14px', borderRadius: '8px', background: ACCENT_BG, color: ACCENT, border: `1px solid ${ACCENT}33`, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Edit</button>
                            <button style={{ padding: '7px 14px', borderRadius: '8px', background: 'none', color: 'var(--color-muted)', border: '1.5px solid var(--color-hairline)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Pause</button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
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

      {/* ── How It Works ── */}
      <section style={{ padding: '0 24px 72px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', marginBottom: '8px' }}>List Gear in 6 Steps</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)' }}>From registration to your first rental payout</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px' }}>
          {[
            { icon: '📱', step: '01', title: 'Register & Select Gear Owner', desc: 'Sign up with OTP or Google. Select "Gear Owner" and pick Shop or Individual.' },
            { icon: '📷', step: '02', title: 'List Your Items', desc: 'Add brand, model, category, condition grade, and your real photos (not stock).' },
            { icon: '🪪', step: '03', title: 'KYC & Ownership Proof', desc: 'Submit Aadhaar + invoice or serial photo. Verified badge unlocks within 24–48 hrs.' },
            { icon: '💰', step: '04', title: 'Set Pricing & Deposit', desc: 'Set per-day and optional per-week rates. Set a refundable damage deposit amount.' },
            { icon: '📅', step: '05', title: 'Manage Availability', desc: 'Mark items available or blocked. Calendar auto-prevents double-rentals. No spreadsheets.' },
            { icon: '💳', step: '06', title: 'Get Paid Every Week', desc: 'Renter pays upfront. Rental fee hits your account weekly. Deposit auto-released if no damage.' },
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
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', marginBottom: '8px' }}>Gear Owner Plans</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)' }}>Free for casual owners. Pro & Shop for serious gear businesses.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
          {PLANS.map(plan => <PlanCard key={plan.name} plan={plan} />)}
        </div>
        <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '14px' }}>
          {[
            { icon: '💰', title: 'Platform fee: 10% per rental', desc: 'Sceneora takes 10% of the rental fee only. Deposits are never subject to platform fees.' },
            { icon: '🛡️', title: 'Deposit protection included', desc: 'All deposits are held in Sceneora escrow. 48-hour inspection window. Auto-released if no claim.' },
            { icon: '🔒', title: 'Optional rental insurance', desc: 'Renters can purchase +8% insurance. Covers accidental damage — protects both parties.' },
          ].map(f => (
            <div key={f.title} style={{ padding: '16px 18px', borderRadius: '14px', background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '22px', flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '4px' }}>{f.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Onboarding CTA ── */}
      <section id="onboarding" style={{ padding: '0 24px 88px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #0F62FE 100%)`, borderRadius: '26px', padding: '60px 52px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: '-100px', left: '-50px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.18)', padding: '5px 14px', borderRadius: '100px', marginBottom: '22px' }}>
              <span style={{ fontSize: '14px' }}>🚀</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Gear Owner Onboarding</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.7rem,3.5vw,2.5rem)', letterSpacing: '-0.03em', marginBottom: '14px', lineHeight: 1.2 }}>Your first rental inquiry arrives within 48 hours</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '560px', lineHeight: 1.75 }}>
              Once your KYC is approved, your gear is indexed in search and visible to thousands of creators in your city. Instant Book listings typically receive their first inquiry within 12–24 hours of going live.
            </p>
            {/* Onboarding steps */}
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
                List My Gear for Free →
              </button>
              <Link href="/gear" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', textDecoration: 'none', padding: '14px 32px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)' }}>
                Browse Gear Marketplace
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
            { href: '/spaces/owner', label: '🏛️ Space Owner Portal', color: '#0F62FE', bg: '#EEF2FF' },
            { href: '/roles/creator', label: '📷 Creator Portal', color: ACCENT, bg: ACCENT_BG },
            { href: '/gear', label: '🔧 Browse Gear', color: ACCENT, bg: ACCENT_BG },
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
