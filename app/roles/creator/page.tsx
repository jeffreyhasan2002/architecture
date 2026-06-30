'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

const ONBOARDING_STEPS = [
  { step: '01', icon: '📱', title: 'Register & Verify', desc: 'Phone OTP or Google sign-in. Select "Creator" as your role.' },
  { step: '02', icon: '📋', title: 'Build Your Profile', desc: 'Add services (photography, video, MUA), packages, pricing, and bio.' },
  { step: '03', icon: '🖼️', title: 'Upload Portfolio', desc: 'Upload your best work. AI auto-tags style, mood, and category — "candid", "cinematic", "minimalist".' },
  { step: '04', icon: '🪪', title: 'KYC Verification', desc: 'Aadhaar + face verification. Takes 24–48 hrs. Unlocks the "Verified" badge and higher search ranking.' },
  { step: '05', icon: '📅', title: 'Set Availability', desc: 'Connect your calendar. Block dates, set recurring availability, and never double-book again.' },
  { step: '06', icon: '💼', title: 'Choose Your Plan', desc: 'Start Free. Upgrade to Pro (₹999/mo) or Studio (₹2,499/mo) for more leads and priority ranking.' },
]

const PLANS = [
  { name: 'Free', price: '₹0', period: '/mo', color: '#64748B', features: ['1 profile', '5 portfolio images', 'Basic search listing', 'Slot availability', 'Escrow payments', 'Basic analytics'] },
  { name: 'Pro', price: '₹999', period: '/mo', color: '#7C3AED', featured: true, features: ['Everything in Free', 'Unlimited portfolio images', 'Priority search ranking', 'Accept 20 bookings/mo', 'AI style tag boost', 'Advanced analytics', 'Direct client messaging'] },
  { name: 'Studio', price: '₹2,499', period: '/mo', color: '#0F62FE', features: ['Everything in Pro', 'Multi-profile (team)', 'Unlimited bookings', 'Studio branding', 'Featured placement', 'Dedicated account manager', 'API access'] },
]

const MOCK_BOOKINGS = [
  { client: 'Rohit & Preethi', service: 'Wedding · 2 days · Coimbatore', date: 'Aug 12–13, 2026', status: 'Confirmed', statusColor: '#059669', statusBg: '#ECFDF5', amount: 85000, released: false },
  { client: 'Fashion Brand X', service: 'Product Shoot · 6 hrs · Chennai', date: 'Jul 30, 2026', status: 'Pending Accept', statusColor: '#D97706', statusBg: '#FFFBEB', amount: 32000, released: false },
  { client: 'Ananya & Kiran', service: 'Engagement · 3 hrs', date: 'Jul 14, 2026', status: 'Delivered', statusColor: '#0F62FE', statusBg: '#EFF4FF', amount: 18000, released: true },
]

export default function CreatorPage() {
  const [dashTab, setDashTab] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/creator" />

      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(124,58,237,0.3)', marginBottom: '24px', background: '#F5F3FF' }}>
          <span style={{ fontSize: '16px' }}>📷</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#7C3AED', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Creator Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Get discovered. Get booked.<br />
          <span style={{ color: '#7C3AED' }}>Get paid reliably.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '620px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Creators — photographers, videographers, makeup artists, stylists — use Sceneora to build a professional profile, manage their calendar, accept bookings, and receive guaranteed escrow payouts. Stop losing bookings to double-booking chaos.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { val: '3 bookings/mo', label: 'Avg lost to double-booking (before)' },
            { val: 'T+1', label: 'Payout after delivery' },
            { val: '₹0', label: 'To start (Free plan)' },
            { val: '65%+', label: 'Clients leave a review' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#7C3AED', letterSpacing: '-0.025em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px', maxWidth: '120px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: '#7C3AED', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', boxShadow: '0 4px 18px rgba(124,58,237,0.32)' }}>Start Onboarding →</Link>
          <Link href="/docs" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', border: '1px solid var(--color-hairline)' }}>View Architecture Docs</Link>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Creator Journey: Onboard → Get Booked → Get Paid</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '32px' }}>From registration to your first booking payout</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px' }}>
          {[
            { icon: '📱', step: '01', title: 'Register & Select Creator', desc: 'OTP or Google. Pick "Creator" role and your category (Photography, Videography, MUA, Stylist, etc.).' },
            { icon: '🖼️', step: '02', title: 'Build Your Profile', desc: 'Add packages with all-in pricing, portfolio gallery (AI-tagged), bio, and service area.' },
            { icon: '🪪', step: '03', title: 'Complete KYC', desc: 'Aadhaar + face verification → Verified badge. Unlocks higher ranking in search results.' },
            { icon: '📅', step: '04', title: 'Set Availability', desc: 'Mark your availability. The slot engine prevents double-bookings automatically — no spreadsheets.' },
            { icon: '📬', step: '05', title: 'Receive Inquiries', desc: 'Clients find you via search, city pages, or AI matching. Accept → soft hold is placed automatically.' },
            { icon: '💳', step: '06', title: 'Client Pays Advance', desc: 'Client pays 30–50% advance into escrow. You see the confirmation — guaranteed funds.' },
            { icon: '🎬', step: '07', title: 'Shoot & Deliver', desc: 'Complete the shoot. Upload the gallery to Sceneora. Client confirms delivery in-app.' },
            { icon: '💸', step: '08', title: 'Payout T+1', desc: 'Balance released upon delivery confirmation. Payout hits your bank account next business day.' },
            { icon: '⭐', step: '09', title: 'Earn Trust Score', desc: 'Clients leave reviews. Your trust score updates. Higher score = better ranking = more bookings.' },
          ].map((s, i) => (
            <div key={s.step} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#7C3AED44'; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = ''; el.style.boxShadow = '' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#7C3AED', fontWeight: 700 }}>{s.step}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px' }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Dashboard Mockup */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Creator Dashboard Preview</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '28px' }}>Run your photography business from one dashboard. (Mock data)</p>

        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          {/* Header */}
          <div style={{ background: '#F5F3FF', borderBottom: '1px solid rgba(124,58,237,0.15)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: 700 }}>A</div>
              <div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#1E293B' }}>Arjun Mehta Photography</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#64748B' }}>Coimbatore · Wedding & Events</span>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '2px 8px', borderRadius: '100px' }}>✓ KYC Verified</span>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#7C3AED', background: '#F5F3FF', padding: '2px 8px', borderRadius: '100px' }}>Pro Plan</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#7C3AED' }}>Trust 96%</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#64748B' }}>★ 4.97 · 312 reviews</div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {['overview', 'bookings', 'earnings', 'analytics'].map(tab => (
              <button key={tab} onClick={() => setDashTab(tab)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: dashTab === tab ? '#7C3AED' : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === tab ? '2px solid #7C3AED' : '2px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ padding: '24px' }}>
            {dashTab === 'overview' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '24px' }}>
                  {[
                    { icon: '💰', label: 'This Month Earnings', val: '₹1,85,000', sub: '+34% vs last month', color: '#7C3AED' },
                    { icon: '📅', label: 'Upcoming Bookings', val: '8', sub: 'Next: Aug 12, 2026', color: '#0F62FE' },
                    { icon: '👁️', label: 'Profile Views (30d)', val: '4,281', sub: '+12% vs prev month', color: '#059669' },
                    { icon: '📩', label: 'Pending Inquiries', val: '3', sub: 'Respond within 4h for ranking', color: '#D97706' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>{s.icon}</div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', color: s.color, letterSpacing: '-0.025em' }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>{s.label}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: '#059669', marginTop: '4px' }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '16px', borderRadius: '12px', background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#D97706', marginBottom: '6px' }}>💡 You rank #4 for "wedding photographer Coimbatore"</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#92400E' }}>Complete your profile bio and add 5 more portfolio images to rank #2. Estimated +18% more inquiries.</div>
                </div>
              </div>
            )}

            {dashTab === 'bookings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {MOCK_BOOKINGS.map(b => (
                  <div key={b.client} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '14px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📷</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{b.client}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{b.service}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>📅 {b.date}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: b.statusColor, background: b.statusBg, padding: '4px 10px', borderRadius: '100px' }}>{b.status}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: 'var(--color-ink)' }}>₹{b.amount.toLocaleString()}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: b.released ? '#059669' : '#D97706' }}>{b.released ? '✓ Paid out' : '🔒 In escrow'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dashTab === 'earnings' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  {[
                    { label: 'Total Earned (YTD)', val: '₹9,45,000', color: '#7C3AED' },
                    { label: 'In Escrow (awaiting)', val: '₹1,04,500', color: '#D97706' },
                    { label: 'Last Payout', val: '₹18,000', color: '#059669' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: s.color, marginBottom: '6px' }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {['Jun 2026', 'May 2026', 'Apr 2026'].map((month, i) => (
                  <div key={month} style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)', fontWeight: 600 }}>{month}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{[4, 6, 5][i]} bookings completed</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: '#7C3AED' }}>
                      ₹{['1,85,000', '2,20,000', '1,60,000'][i]}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dashTab === 'analytics' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  { label: 'Search Appearances (30d)', val: '12,840', trend: '+22%', icon: '🔍' },
                  { label: 'Profile Views (30d)', val: '4,281', trend: '+12%', icon: '👁️' },
                  { label: 'Conversion Rate', val: '6.8%', trend: '+0.4pp', icon: '📈' },
                  { label: 'Avg Response Time', val: '47 min', trend: 'Top 10%', icon: '⚡' },
                  { label: 'Trust Score', val: '96 / 100', trend: '+2 this month', icon: '🛡️' },
                  { label: 'Review Rate', val: '71%', trend: 'Above avg', icon: '⭐' },
                ].map(s => (
                  <div key={s.label} style={{ padding: '18px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{s.icon}</span>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '3px 8px', borderRadius: '100px' }}>{s.trend}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: '#7C3AED', letterSpacing: '-0.025em' }}>{s.val}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Creator Plans</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '28px' }}>Start free. Upgrade when you're ready to scale.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '20px' }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{ padding: '28px', borderRadius: '18px', background: 'var(--color-surface)', border: `${plan.featured ? '2px' : '1px'} solid ${plan.featured ? plan.color : 'var(--color-hairline)'}`, position: 'relative', transition: 'all 0.2s' }}>
              {plan.featured && <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: plan.color, color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 14px', borderRadius: '100px' }}>Most Popular</div>}
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: plan.color, marginBottom: '8px' }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '2rem', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}>{plan.price}</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>{plan.period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill={`${plan.color}22`} /><path d="M4 7l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', padding: '11px', borderRadius: '10px', background: plan.featured ? plan.color : 'transparent', color: plan.featured ? '#fff' : plan.color, border: `2px solid ${plan.color}`, fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.15s' }}>
                {plan.name === 'Free' ? 'Start Free' : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding */}
      <section id="onboarding" style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#7C3AED,#0F62FE)', borderRadius: '24px', padding: '56px 48px', color: '#fff' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Creator Onboarding</span>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.025em', marginBottom: '14px', marginTop: '16px' }}>Go from signup to your first booking in 48 hours</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '36px', maxWidth: '540px', lineHeight: 1.7 }}>
            The same onboarding flow for all creator types — photographers, videographers, MUAs. KYC verification takes 24–48 hrs. Once live, your profile is indexed in Algolia and searchable by clients immediately.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px', marginBottom: '32px' }}>
            {ONBOARDING_STEPS.map(s => (
              <div key={s.step} style={{ padding: '18px', borderRadius: '12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{s.step}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#fff', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#7C3AED', background: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer' }}>Start Onboarding →</button>
            <button style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer' }}>Browse as Visitor First</button>
          </div>
        </div>
      </section>

      {/* Other Roles */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'creator').map(r => (
            <Link key={r.key} href={r.href} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', borderRadius: '100px', background: r.bg, border: `1px solid ${r.color}33`, textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: r.color, transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
            ><span>{r.icon}</span>{r.label}</Link>
          ))}
        </div>
      </section>
    </div>
  )
}
