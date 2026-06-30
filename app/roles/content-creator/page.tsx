'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

const MOCK_DEALS = [
  { brand: 'NatureBrew Coffee', type: 'UGC · 3 Reels + 6 Stories', status: 'Active', statusColor: '#059669', statusBg: '#ECFDF5', value: 45000, deadline: 'Jul 25, 2026', deliverable: 'Draft submitted', progress: 60 },
  { brand: 'StyleNest Clothing', type: 'Instagram · 2 Posts + 4 Reels', status: 'Negotiating', statusColor: '#D97706', statusBg: '#FFFBEB', value: 80000, deadline: 'Aug 5, 2026', deliverable: 'Brief received', progress: 20 },
  { brand: 'GlowSkin Beauty', type: 'YouTube · 1 Dedicated video', status: 'Completed', statusColor: '#0F62FE', statusBg: '#EFF4FF', value: 120000, deadline: 'Jun 30, 2026', deliverable: 'Posted & confirmed', progress: 100 },
]

const RATE_CARD = [
  { format: 'Instagram Reel (≤60s)', reach: '82K', rate: '₹18,000' },
  { format: 'Instagram Post + Caption', reach: '82K', rate: '₹8,500' },
  { format: 'Instagram Story (3 slides)', reach: '22K', rate: '₹4,500' },
  { format: 'YouTube Dedicated (8–15 min)', reach: '41K', rate: '₹65,000' },
  { format: 'YouTube Integration (2–3 min)', reach: '41K', rate: '₹28,000' },
  { format: 'UGC Only (no posting)', reach: '—', rate: '₹12,000' },
]

export default function ContentCreatorPage() {
  const [dashTab, setDashTab] = useState('deals')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/content-creator" />

      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(217,119,6,0.3)', marginBottom: '24px', background: '#FFFBEB' }}>
          <span style={{ fontSize: '16px' }}>🎬</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#D97706', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Content Creator Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          UGC. Brand Deals. <br />
          <span style={{ color: '#D97706' }}>No more DM chaos.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Content Creators on Sceneora get structured brand deal briefs, auto-generated contracts, milestone-based escrow payments, and a professional rate card — all without managing it across 6 different DMs.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { val: '₹15K–₹2L', label: 'Avg brand deal range' },
            { val: '0', label: 'Scope creep (contractual)' },
            { val: 'T+1', label: 'Payout after brand approves' },
            { val: '35%', label: 'Creator economy growth/yr' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#D97706', letterSpacing: '-0.025em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px', maxWidth: '110px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: '#D97706', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', boxShadow: '0 4px 18px rgba(217,119,6,0.32)' }}>Start Onboarding →</Link>
          <Link href="/roles/brand" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', border: '1px solid var(--color-hairline)' }}>I'm a Brand →</Link>
        </div>
      </section>

      {/* How Brand Deals Work */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>How Brand Deals Work on Sceneora</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '32px' }}>From brief to payout — structured, contractual, protected.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' }}>
          {[
            { icon: '🔍', step: '01', title: 'Brand Discovers You', desc: 'Brands search by niche (food, beauty, tech, lifestyle), audience size, engagement rate, and location. Your "Fit Score" is computed for each brand — Strong / Good / Partial.' },
            { icon: '📋', step: '02', title: 'Brand Sends a Brief', desc: 'Brand submits a structured brief form or PDF. Our AI Brief Parser auto-extracts scope, deliverables, timeline, and budget — no ambiguity.' },
            { icon: '🤝', step: '03', title: 'You Accept, Negotiate, or Decline', desc: 'Review the brief. Accept as-is, propose a counter-offer (different rate, fewer deliverables, later date), or decline. All in-platform, no WhatsApp needed.' },
            { icon: '📝', step: '04', title: 'Auto-Contract Generated', desc: 'Upon acceptance, a contract is auto-generated: deliverables, revision rounds, posting windows, IP terms, usage rights. Both parties e-sign.' },
            { icon: '🔒', step: '05', title: 'Brand Funds Escrow', desc: 'Full deal value goes into escrow. You see the funds are confirmed — no 90-day payment anxiety. Revisions are bounded by the contract.' },
            { icon: '🎬', step: '06', title: 'Create, Submit, Revise', desc: 'Submit drafts through the platform. Brand reviews and approves or requests revisions. Revision rounds are capped (e.g., 2 rounds) per the contract.' },
            { icon: '✅', step: '07', title: 'Post & Confirm', desc: 'Publish the content. Share the live link. Brand confirms it\'s live and matches the brief. No "just one more thing" scope creep.' },
            { icon: '💸', step: '08', title: 'Payment Released T+1', desc: 'Brand confirms. Escrow releases. Payout hits your bank account the next business day — not 90 days later.' },
          ].map(s => (
            <div key={s.step} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#D9770644'; el.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = '' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#D97706', fontWeight: 700 }}>{s.step}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px' }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Content Creator Dashboard Preview</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '28px' }}>Manage all your brand deals in one place. (Mock data)</p>

        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ background: '#FFFBEB', borderBottom: '1px solid rgba(217,119,6,0.2)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: 700 }}>S</div>
              <div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#1E293B' }}>Sneha Iyer · Food & Lifestyle</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#64748B' }}>Mumbai · 82K Instagram · 41K YouTube</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '3px 10px', borderRadius: '100px' }}>✓ Verified</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#D97706', background: '#FFFBEB', padding: '3px 10px', borderRadius: '100px', border: '1px solid #D97706' }}>Fit Score: 94%</span>
            </div>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {['deals', 'rate card', 'analytics', 'earnings'].map(tab => (
              <button key={tab} onClick={() => setDashTab(tab)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: dashTab === tab ? '#D97706' : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === tab ? '2px solid #D97706' : '2px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ padding: '24px' }}>
            {dashTab === 'deals' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {MOCK_DEALS.map(d => (
                  <div key={d.brand} style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '4px' }}>{d.brand}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{d.type} · Due {d.deadline}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: '#D97706', marginBottom: '4px' }}>₹{d.value.toLocaleString()}</div>
                        <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: d.statusColor, background: d.statusBg, padding: '3px 10px', borderRadius: '100px' }}>{d.status}</span>
                      </div>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{d.deliverable}</span>
                        <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#D97706' }}>{d.progress}%</span>
                      </div>
                      <div style={{ height: '4px', background: 'var(--color-hairline)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${d.progress}%`, background: '#D97706', borderRadius: '2px' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dashTab === 'rate card' && (
              <div>
                <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FFFBEB', borderRadius: '10px', border: '1px solid #FDE68A', fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#92400E' }}>
                  💡 Rate card is visible to brands searching for you. Update anytime to reflect your current market rate.
                </div>
                <div style={{ border: '1px solid var(--color-hairline)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '10px 16px', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Format</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right', minWidth: '80px' }}>Reach</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right', minWidth: '80px' }}>Rate</span>
                  </div>
                  {RATE_CARD.map((r, i) => (
                    <div key={r.format} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '12px 16px', borderBottom: i < RATE_CARD.length - 1 ? '1px solid var(--color-hairline)' : 'none' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>{r.format}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', textAlign: 'right', minWidth: '80px' }}>{r.reach}</span>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#D97706', textAlign: 'right', minWidth: '80px' }}>{r.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dashTab === 'analytics' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px' }}>
                {[
                  { icon: '👥', label: 'Instagram Followers', val: '82,400', trend: '+1.2K this month' },
                  { icon: '📈', label: 'Avg Engagement Rate', val: '6.8%', trend: 'Above avg 3.2%' },
                  { icon: '▶️', label: 'YouTube Subscribers', val: '41,200', trend: '+820 this month' },
                  { icon: '🤝', label: 'Fit Score (avg brand)', val: '91%', trend: 'Top 8% of creators' },
                  { icon: '📊', label: 'Brand Collab Rate', val: '74%', trend: 'Briefs → accepted' },
                  { icon: '💰', label: 'Avg Deal Value', val: '₹81,666', trend: '+18% vs last quarter' },
                ].map(s => (
                  <div key={s.label} style={{ padding: '18px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: '#D97706', letterSpacing: '-0.025em' }}>{s.val}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '4px' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: '#059669', marginTop: '4px' }}>{s.trend}</div>
                  </div>
                ))}
              </div>
            )}

            {dashTab === 'earnings' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  {[
                    { label: 'YTD Earnings', val: '₹5,65,000', color: '#D97706' },
                    { label: 'In Escrow', val: '₹1,25,000', color: '#0F62FE' },
                    { label: 'Deals This Month', val: '3 active', color: '#059669' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: s.color }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '6px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {['NatureBrew Coffee', 'GlowSkin Beauty', 'StyleNest Clothing'].map((brand, i) => (
                  <div key={brand} style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{brand}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{['Payout Jul 26', 'Payout Jun 30', 'Escrow held'][i]}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: ['#059669', '#0F62FE', '#D97706'][i] }}>
                      {['₹45,000', '₹1,20,000', '₹80,000'][i]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section id="onboarding" style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#D97706,#DC2626)', borderRadius: '24px', padding: '56px 48px', color: '#fff' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Content Creator Onboarding</span>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.025em', marginBottom: '14px', marginTop: '16px' }}>Get your first brand deal in 7 days</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '36px', maxWidth: '540px', lineHeight: 1.7 }}>
            Register → add your niche, audience metrics, and content samples → set your rate card → get matched with brands. The same onboarding applies to all creator types — the platform adapts to your profile.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px', marginBottom: '32px' }}>
            {[
              { icon: '📱', step: '01', title: 'Register & Select Role', desc: 'Select "Content Creator". Add your platform handles (Instagram, YouTube, TikTok).' },
              { icon: '🎯', step: '02', title: 'Set Your Niche', desc: 'Food, Beauty, Tech, Lifestyle, Travel, Finance — be specific for better brand matches.' },
              { icon: '📊', step: '03', title: 'Connect Analytics', desc: 'Connect Instagram & YouTube for verified follower/engagement data. Brands trust verified metrics.' },
              { icon: '💰', step: '04', title: 'Set Your Rate Card', desc: 'Define rates per format. AI suggests market rates based on your niche and audience size.' },
              { icon: '🤝', step: '05', title: 'Get Brand Matched', desc: 'Brands find you. You receive structured briefs — no more "interested in collab?" DMs.' },
            ].map(s => (
              <div key={s.step} style={{ padding: '18px', borderRadius: '12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{s.step}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#fff', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#D97706', background: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer' }}>Start Onboarding →</button>
            <Link href="/roles/brand" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', textDecoration: 'none', padding: '14px 32px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center' }}>I'm a Brand →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'content-creator').map(r => (
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
