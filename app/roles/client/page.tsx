'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

const STEPS = [
  { icon: '🔍', title: 'Search & Filter', desc: 'Search by city, service type (wedding, event, commercial), style (candid, traditional, cinematic), price range, and availability. Results are ranked by trust score, distance, and rating.' },
  { icon: '👁️', title: 'Browse & Shortlist', desc: 'View full profiles — portfolios, packages, all-in pricing, 200+ real reviews, and live availability calendar. Save up to 5 creators to your shortlist to compare later.' },
  { icon: '💰', title: 'AI Budget Estimator', desc: 'Not sure what things cost? Fill in event type, date, city, and coverage hours. Our AI gives you a realistic ₹ range and shows matching creators within budget.' },
  { icon: '📅', title: 'Select Date & Soft Hold', desc: 'Pick your date from the live calendar. A 15-minute soft hold reserves the slot while you complete payment — no one else can book during this window.' },
  { icon: '💳', title: 'Pay Advance (Escrow)', desc: 'Pay the advance (typically 30–50%) via Razorpay. Funds go into escrow — protected and held until after delivery is confirmed. No ghosting. No disappearing advances.' },
  { icon: '💬', title: 'Chat & Contract', desc: 'In-app messaging begins. The auto-generated contract (scope, timeline, deliverables) is e-signed by both parties. Everything is documented.' },
  { icon: '🎬', title: 'Shoot Day', desc: 'The creator arrives. You check in via the app. Any last-minute changes flow through the platform — no WhatsApp confusion.' },
  { icon: '📸', title: 'Receive & Confirm Delivery', desc: 'The creator delivers the gallery / files. You confirm delivery in the app. Your confirmation releases the balance payment to the creator (T+1 payout).' },
  { icon: '⭐', title: 'Leave a Review', desc: 'You\'re prompted 48 hours after delivery. A quick review improves the creator\'s trust score and ranking — and earns you Sceneora loyalty points for your next booking.' },
]

const MOCK_BOOKINGS = [
  { creator: 'Arjun Mehta', service: 'Wedding Photography · 2 days', date: 'Aug 12–13, 2026', status: 'Upcoming', statusColor: '#0F62FE', statusBg: '#EFF4FF', price: 85000, paid: 25500, avatar: '📷' },
  { creator: 'Priya Nair', service: 'Pre-wedding Shoot · 4 hrs', date: 'Jul 28, 2026', status: 'Completed', statusColor: '#059669', statusBg: '#ECFDF5', price: 22000, paid: 22000, avatar: '🌿' },
  { creator: 'Rahul Sharma', service: 'Wedding Film · Cinematic', date: 'Aug 12, 2026', status: 'Upcoming', statusColor: '#0F62FE', statusBg: '#EFF4FF', price: 65000, paid: 19500, avatar: '🎬' },
]

const MOCK_SHORTLIST = [
  { name: 'Vikram Photos', specialty: 'Candid + Drone', rating: 4.96, price: 55000, available: true },
  { name: 'LensArt by Meena', specialty: 'Traditional + Contemporary', rating: 4.91, price: 42000, available: true },
  { name: 'Cinematic Wedding Co.', specialty: 'Cinematic Films', rating: 4.98, price: 90000, available: false },
]

const ONBOARDING_STEPS = [
  { step: '01', title: 'Create Your Account', desc: 'Phone OTP or Google sign-in. Takes 30 seconds.', icon: '📱' },
  { step: '02', title: 'Tell Us About Your Event', desc: 'Event type, city, date, approximate budget.', icon: '📋' },
  { step: '03', title: 'Get AI-matched Creators', desc: 'We show you the top 5–10 best-fit creators for your event.', icon: '🤖' },
  { step: '04', title: 'Browse, Shortlist & Compare', desc: 'Save favourites, compare side by side, request quotes.', icon: '❤️' },
  { step: '05', title: 'Book with Escrow Protection', desc: 'Pay advance securely. Your money is protected until delivery.', icon: '🔐' },
]

export default function ClientPage() {
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [dashTab, setDashTab] = useState('bookings')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/client" />

      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(15,98,254,0.3)', marginBottom: '24px', background: '#EFF4FF' }}>
          <span style={{ fontSize: '16px' }}>📅</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#0F62FE', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Client Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Find the right creator.<br />
          <span style={{ color: '#0F62FE' }}>Book with confidence.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '620px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Clients use Sceneora to discover KYC-verified photographers, videographers, and studios — check live availability, compare packages, pay securely via escrow, and get their creative projects delivered on time, every time.
        </p>

        {/* Key stats */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[
            { val: '< 8 min', label: 'Discovery to booking' },
            { val: '< 2%', label: 'Dispute rate' },
            { val: '65%+', label: 'Review completion rate' },
            { val: '100%', label: 'Advance in escrow' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: '#0F62FE', letterSpacing: '-0.025em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => { setOnboardingOpen(true); document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: '#0F62FE', border: 'none', padding: '13px 28px', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 4px 18px rgba(15,98,254,0.32)', transition: 'opacity 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >Start Onboarding →</button>
          <Link href="/" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', border: '1px solid var(--color-hairline)' }}>Search Creators</Link>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em' }}>How It Works for Clients</div>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '4px 12px', borderRadius: '100px', border: '1px solid #059669' }}>9 steps</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {STEPS.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', position: 'relative', paddingBottom: i < STEPS.length - 1 ? '28px' : '0' }}>
              {i < STEPS.length - 1 && (
                <div style={{ position: 'absolute', left: '21px', top: '48px', bottom: '0', width: '2px', background: 'linear-gradient(to bottom,#0F62FE44,transparent)' }} />
              )}
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF4FF', border: '2px solid rgba(15,98,254,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                {s.icon}
              </div>
              <div style={{ flex: 1, background: 'var(--color-surface)', borderRadius: '12px', padding: '14px 18px', border: '1px solid var(--color-hairline)', marginBottom: i < STEPS.length - 1 ? '8px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: '#0F62FE', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{s.title}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Client Dashboard Preview</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '28px' }}>Everything for your bookings in one place. (Mock data)</p>

        {/* Dashboard UI */}
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          {/* Top bar */}
          <div style={{ background: '#EFF4FF', borderBottom: '1px solid rgba(15,98,254,0.15)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0F62FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: 700 }}>R</div>
              <div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#1E293B' }}>Rohit & Preethi Wedding</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#64748B' }}>August 12–13, 2026 · Coimbatore</div>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#0F62FE', background: '#fff', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(15,98,254,0.25)' }}>43 days to event</span>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {['bookings', 'shortlist', 'messages', 'payments'].map(tab => (
              <button key={tab} onClick={() => setDashTab(tab)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: dashTab === tab ? '#0F62FE' : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === tab ? '2px solid #0F62FE' : '2px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ padding: '24px' }}>
            {dashTab === 'bookings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MOCK_BOOKINGS.map(b => (
                  <div key={b.creator} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{b.avatar}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{b.creator}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginTop: '2px' }}>{b.service}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '3px' }}>📅 {b.date}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: b.statusColor, background: b.statusBg, padding: '4px 10px', borderRadius: '100px' }}>{b.status}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: 'var(--color-ink)' }}>₹{b.price.toLocaleString()}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#059669' }}>₹{b.paid.toLocaleString()} paid</div>
                    </div>
                  </div>
                ))}
                <div style={{ padding: '12px 16px', borderRadius: '12px', background: '#ECFDF5', border: '1px dashed #059669', textAlign: 'center', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', color: '#059669', cursor: 'pointer' }}>
                  + Add another service (Decor? MUA? Catering?)
                </div>
              </div>
            )}

            {dashTab === 'shortlist' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {MOCK_SHORTLIST.map(s => (
                  <div key={s.name} style={{ padding: '14px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>❤️</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{s.name}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{s.specialty} · ★ {s.rating}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#7C3AED' }}>₹{s.price.toLocaleString()}</div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: s.available ? '#059669' : '#DC2626', background: s.available ? '#ECFDF5' : '#FFF1F0', padding: '3px 9px', borderRadius: '100px' }}>
                      {s.available ? 'Available' : 'Booked'}
                    </span>
                    <button style={{ padding: '7px 14px', borderRadius: '8px', background: '#0F62FE', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', opacity: s.available ? 1 : 0.4 }}>Book</button>
                  </div>
                ))}
              </div>
            )}

            {dashTab === 'messages' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Arjun Mehta', msg: 'Hi! Confirmed for Aug 12. I\'ll arrive at 6am for the nalangu shots. Can you share the exact address?', time: '2h ago', unread: 2 },
                  { name: 'Rahul Sharma', msg: 'The pre-shoot location scouting is done. Shared the shortlist in the gallery.', time: '1d ago', unread: 0 },
                ].map(m => (
                  <div key={m.name} style={{ padding: '14px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: `1px solid ${m.unread ? '#0F62FE44' : 'var(--color-hairline)'}`, display: 'flex', gap: '12px', cursor: 'pointer' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>📷</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{m.name}</span>
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{m.time}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.msg}</div>
                    </div>
                    {m.unread > 0 && <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#0F62FE', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, flexShrink: 0 }}>{m.unread}</div>}
                  </div>
                ))}
              </div>
            )}

            {dashTab === 'payments' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                  {[
                    { label: 'Total Booking Value', val: '₹1,72,000', color: '#0F62FE' },
                    { label: 'Paid (in escrow)', val: '₹65,000', color: '#059669' },
                    { label: 'Balance Due (on delivery)', val: '₹1,07,000', color: '#D97706' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: s.color, marginBottom: '6px' }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {[
                  { desc: 'Advance — Arjun Mehta (Wedding)', date: 'Jun 15, 2026', amount: '-₹25,500', type: 'Paid', color: '#DC2626' },
                  { desc: 'Advance — Rahul Sharma (Film)', date: 'Jun 15, 2026', amount: '-₹19,500', type: 'Paid', color: '#DC2626' },
                  { desc: 'Advance — Priya Nair (Pre-wedding)', date: 'Jun 2, 2026', amount: '-₹20,000', type: 'Paid', color: '#DC2626' },
                  { desc: 'Refund — Cancelled Makeup', date: 'May 28, 2026', amount: '+₹8,000', type: 'Refunded', color: '#059669' },
                ].map(t => (
                  <div key={t.desc} style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)', marginBottom: '2px' }}>{t.desc}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{t.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: t.color }}>{t.amount}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>{t.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section id="onboarding" style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F62FE,#7C3AED)', borderRadius: '24px', padding: '56px 48px', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Client Onboarding</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.025em', marginBottom: '14px' }}>Get started in 5 minutes</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '540px', lineHeight: 1.7 }}>
            The same onboarding flow applies to all roles. Tell us who you are and what you need — we'll set up your portal, match you with the right creators, and have you ready to book or list within minutes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '36px' }}>
            {ONBOARDING_STEPS.map(s => (
              <div key={s.step} style={{ padding: '20px', borderRadius: '14px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{s.step}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#fff', marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#0F62FE', background: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >Start Onboarding →</button>
            <button style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer' }}>Continue as Visitor</button>
          </div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '20px' }}>
            ✓ Free account · ✓ No booking fee until you confirm · ✓ Escrow protection on every payment
          </p>
        </div>
      </section>

      {/* Other Roles */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'client').map(r => (
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
