'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

const MOCK_CAMPAIGNS = [
  { name: 'Summer Brew Campaign', creators: 4, status: 'Active', statusColor: '#059669', statusBg: '#ECFDF5', budget: 240000, spent: 165000, deliverables: '12/18 approved' },
  { name: 'Monsoon Skin Launch', creators: 2, status: 'Draft Review', statusColor: '#D97706', statusBg: '#FFFBEB', budget: 120000, spent: 0, deliverables: '2 drafts pending' },
  { name: 'Diwali Ethnic Wear', creators: 8, status: 'Planning', statusColor: '#0F62FE', statusBg: '#EFF4FF', budget: 500000, spent: 0, deliverables: 'Briefs sent' },
]

export default function BrandPage() {
  const [dashTab, setDashTab] = useState('campaigns')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/brand" />

      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(8,145,178,0.3)', marginBottom: '24px', background: '#ECFEFF' }}>
          <span style={{ fontSize: '16px' }}>🏢</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#0891B2', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Brand Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Find the right creator.<br />
          <span style={{ color: '#0891B2' }}>Run campaigns that convert.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Brands use Sceneora to discover niche-matched content creators, send structured briefs, manage deliverables, approve drafts, and pay — all in one place. No DMs. No 90-day payment cycles. No scope creep.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: '#0891B2', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', boxShadow: '0 4px 18px rgba(8,145,178,0.32)' }}>Start Onboarding →</Link>
          <Link href="/roles/content-creator" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', border: '1px solid var(--color-hairline)' }}>I'm a Content Creator →</Link>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px' }}>
          {[
            { val: '50K+',     label: 'Verified creators',         icon: '🎬' },
            { val: 'AI',       label: 'Fit Score matching',         icon: '📊' },
            { val: '₹0',       label: 'Fee until deal confirmed',  icon: '✅' },
            { val: 'T+1',      label: 'Creator payout after delivery', icon: '💸' },
            { val: 'Escrow',   label: 'Protected payments',         icon: '🔒' },
          ].map(s => (
            <div key={s.label} style={{ padding: '10px 18px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontSize: '16px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1rem', color: '#0891B2', letterSpacing: '-0.02em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>How Brands Run Campaigns on Sceneora</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '32px' }}>From creator discovery to content delivery — structured and tracked.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
          {[
            { icon: '🔍', step: '01', title: 'Search & Filter Creators', desc: 'Filter by niche, audience size, engagement rate, city, past brand categories, and Fit Score. See which creators are best aligned to your brand.' },
            { icon: '📊', step: '02', title: 'View Verified Metrics', desc: 'See verified (API-connected) follower counts, avg engagement rate, audience demographics, and past brand collaborations — no fake stats.' },
            { icon: '📋', step: '03', title: 'Send a Structured Brief', desc: 'Fill out a brief form or upload a PDF. AI extracts deliverables, timeline, usage rights — sent directly to the creator\'s portal.' },
            { icon: '🤝', step: '04', title: 'Negotiate & Confirm', desc: 'Creator accepts, counter-offers, or declines. All negotiation in-platform. Once agreed, auto-contract is generated and e-signed.' },
            { icon: '🔒', step: '05', title: 'Fund Escrow', desc: 'Fund the full campaign value into escrow. Creator sees confirmed funds — starts work immediately.' },
            { icon: '✅', step: '06', title: 'Review & Approve Drafts', desc: 'Creator submits drafts. You review, request revisions (capped per contract), or approve. No more endless email chains.' },
            { icon: '🌐', step: '07', title: 'Confirm Live Content', desc: 'Creator publishes. You confirm the content is live and matches the brief. Escrow released.' },
            { icon: '📈', step: '08', title: 'Track Campaign Performance', desc: 'View post-campaign metrics: views, engagement, link clicks, estimated reach — all in your brand dashboard.' },
          ].map(s => (
            <div key={s.step} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#0891B244'; el.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = '' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#0891B2', fontWeight: 700 }}>{s.step}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px' }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '28px' }}>Brand Dashboard Preview</h2>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ background: '#ECFEFF', borderBottom: '1px solid rgba(8,145,178,0.2)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#0C4A6E' }}>NatureBrew Co. — Brand Dashboard</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#0891B2', background: '#fff', padding: '4px 12px', borderRadius: '100px', border: '1px solid #0891B244' }}>3 Active Campaigns</span>
              <button style={{ padding: '7px 16px', borderRadius: '8px', background: '#0891B2', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>+ New Campaign</button>
            </div>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {['campaigns', 'creators', 'deliverables', 'spend'].map(tab => (
              <button key={tab} onClick={() => setDashTab(tab)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: dashTab === tab ? '#0891B2' : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === tab ? '2px solid #0891B2' : '2px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ padding: '24px' }}>
            {dashTab === 'campaigns' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {MOCK_CAMPAIGNS.map(c => (
                  <div key={c.name} style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '4px' }}>{c.name}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{c.creators} creators · {c.deliverables}</div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: c.statusColor, background: c.statusBg, padding: '4px 12px', borderRadius: '100px' }}>{c.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>Budget utilisation</span>
                          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#0891B2' }}>₹{c.spent.toLocaleString()} / ₹{c.budget.toLocaleString()}</span>
                        </div>
                        <div style={{ height: '4px', background: 'var(--color-hairline)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(c.spent / c.budget) * 100}%`, background: '#0891B2', borderRadius: '2px' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {dashTab === 'creators' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Sneha Iyer', niche: 'Food & Lifestyle', followers: '82K IG · 41K YT', fit: 94, status: 'Active', deals: 2 },
                  { name: 'Arun Krishnan', niche: 'Tech Reviewer', followers: '125K YT · 45K IG', fit: 88, status: 'Brief Sent', deals: 0 },
                  { name: 'Meera Joshi', niche: 'Beauty & Skincare', followers: '210K IG', fit: 97, status: 'Active', deals: 3 },
                  { name: 'Vikram Das', niche: 'Lifestyle & Travel', followers: '67K IG', fit: 79, status: 'Negotiating', deals: 0 },
                ].map(c => (
                  <div key={c.name} style={{ padding: '14px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '14px', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{c.name}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{c.niche} · {c.followers}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '12px', color: '#0891B2' }}>Fit {c.fit}%</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: c.status === 'Active' ? '#059669' : '#D97706', background: c.status === 'Active' ? '#ECFDF5' : '#FFFBEB', padding: '3px 10px', borderRadius: '100px' }}>{c.status}</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{c.deals} deals</span>
                  </div>
                ))}
              </div>
            )}
            {(dashTab === 'deliverables' || dashTab === 'spend') && (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-muted)' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '14px' }}>
                  {dashTab === 'deliverables' ? 'Deliverable tracker and approval queue' : 'Full spend analytics and invoice management'}
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', marginTop: '6px' }}>Available in the live product</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="onboarding" style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#0891B2,#0F62FE)', borderRadius: '24px', padding: '56px 48px', color: '#fff' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Brand Onboarding</span>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.025em', marginBottom: '14px', marginTop: '16px' }}>Launch your first campaign in 24 hours</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '36px', maxWidth: '540px', lineHeight: 1.7 }}>
            Create a brand account, define your target creator profile, send structured briefs, and run campaigns with escrow protection. The same onboarding flow applies to all roles — it adapts based on who you are.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#0891B2', background: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer' }}>Start Onboarding →</button>
            <Link href="/roles/content-creator" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', textDecoration: 'none', padding: '14px 32px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center' }}>Browse Content Creators →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'brand').map(r => (
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
