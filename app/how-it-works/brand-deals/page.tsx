'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../../components/SceneoraNav'

const STEPS = [
  {
    n: 1, icon: '🏢', color: '#0891B2', bg: '#ECFEFF',
    title: 'Brand Discovers Creator',
    desc: 'Brand searches Sceneora\'s content creator marketplace. They filter by niche (food, fashion, tech, beauty), platform (Instagram, YouTube, LinkedIn), city, follower count, engagement rate, and Fit Score.',
    features: ['AI Fit Score shows how well a creator matches the brand\'s audience', 'Filter by platform and follower range', 'View creator\'s portfolio, past collabs, and rate card', 'Shortlist up to 10 creators before reaching out'],
  },
  {
    n: 2, icon: '📋', color: '#7C3AED', bg: '#F5F3FF',
    title: 'Brand Sends Creative Brief',
    desc: 'Brand submits a structured brief via Sceneora. The AI Brief Parser validates it — ensuring deliverables, timelines, exclusivity clauses, and usage rights are clearly defined before the creator even sees it.',
    features: ['AI Brief Parser checks for: deliverables, timelines, usage rights, exclusivity', 'Brands choose post format: Reel, Post, Story, YouTube, UGC', 'Auto-calculates a suggested budget based on creator\'s rate card', 'Brief is locked and time-stamped on submission'],
  },
  {
    n: 3, icon: '🤝', color: '#059669', bg: '#ECFDF5',
    title: 'Creator Reviews & Negotiates',
    desc: 'Creator sees the brief in their dashboard. They can accept at the offered rate, counter-propose (different price, revised scope, or adjusted timeline), or decline. All negotiation happens on-platform — no DMs, no WhatsApp.',
    features: ['Accept, counter-offer, or decline — structured negotiation only', 'Counter-offer includes new price + reason', 'Brand can accept counter, counter-again, or withdraw brief', 'All negotiation history is logged and admissible in disputes'],
  },
  {
    n: 4, icon: '📄', color: '#D97706', bg: '#FFFBEB',
    title: 'Auto-Contract Generated',
    desc: 'Once both parties agree on terms, Sceneora auto-generates a legally-structured collaboration contract. It includes deliverables, due dates, exclusivity window, revision rounds, payment split, and usage rights.',
    features: ['Contract auto-populates from agreed brief + negotiation terms', 'Includes: deliverables, due dates, exclusivity, revisions', 'Both parties e-sign via OTP (Aadhaar-linked for KYC-verified users)', 'Contract is immutable after signing — serves as dispute evidence'],
  },
  {
    n: 5, icon: '🔒', color: '#4F46E5', bg: '#EEF2FF',
    title: 'Brand Pays into Escrow',
    desc: 'Brand pays 100% of the agreed deal value upfront. Funds go into Sceneora\'s escrow — not to the creator yet. Creator sees "Funds secured" status and begins work. No more "payment after posting" ambiguity.',
    features: ['100% upfront to escrow (not the creator)', 'Creator sees "Funds secured" confirmation before starting', 'Escrow holds funds until delivery is confirmed or dispute resolved', 'Supported: UPI, Net Banking, Credit Card, Brand wallet'],
  },
  {
    n: 6, icon: '🎬', color: '#DC2626', bg: '#FFF1F0',
    title: 'Creator Submits Draft Content',
    desc: 'Creator produces the content and uploads drafts directly in the Sceneora dashboard. Brand reviews, requests revisions (up to contract-specified rounds), and approves — all within the platform.',
    features: ['Draft upload directly in platform (no Google Drive links)', 'Brand comments on specific draft frames with timestamps', 'Revision rounds tracked against contract limit', 'Revision limit exceeded → additional fee or escalation'],
  },
  {
    n: 7, icon: '📱', color: '#059669', bg: '#ECFDF5',
    title: 'Creator Posts & Shares Proof',
    desc: 'Creator publishes the content on their channel. They submit the live post URL and screenshot of initial performance metrics (reach, views) directly in Sceneora. Brand verifies the live post.',
    features: ['Creator submits live post URL + initial performance screenshot', 'Brand verifies live post matches approved draft', 'Post timestamp is recorded — starts exclusivity window timer', 'Auto-notification to brand when post is live'],
  },
  {
    n: 8, icon: '💸', color: '#059669', bg: '#ECFDF5',
    title: 'Escrow Released — T+1 Payout',
    desc: 'Brand confirms delivery. Escrow releases to the creator next business day (T+1) via UPI or bank transfer. Sceneora deducts its platform take-rate (8–15% depending on deal size). Creator receives a detailed payout breakdown.',
    features: ['T+1 payout to creator\'s UPI or bank after brand confirmation', 'Platform take-rate: 8% (>₹1L deals) to 15% (smaller deals)', 'Auto-reconciled GST/TDS deductions', 'Creator receives PDF invoice + payout confirmation'],
  },
]

const MOCKUP_DEALS = [
  { brand: 'NatureBrew', product: 'Cold Brew Coffee', creator: '@priya.sips', platform: 'Instagram Reels', deliverables: '2 Reels + 3 Stories', value: 45000, status: 'Draft Review', statusColor: '#D97706', statusBg: '#FFFBEB', fitScore: 94, progress: 65 },
  { brand: 'StyleNest', product: 'Summer Collection', creator: '@arun.wears', platform: 'Instagram Post + Reel', deliverables: '1 Reel + 2 Posts', value: 80000, status: 'Escrow Secured', statusColor: '#4F46E5', statusBg: '#EEF2FF', fitScore: 89, progress: 40 },
  { brand: 'GlowSkin', product: 'Vitamin C Serum', creator: '@meera.glow', platform: 'YouTube Integration', deliverables: '1 YouTube Integration (8–12 min)', value: 120000, status: 'Payout T+1', statusColor: '#059669', statusBg: '#ECFDF5', fitScore: 97, progress: 100 },
]

export default function HowItWorksBrandDeals() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeTab, setActiveTab] = useState<'brand' | 'creator'>('brand')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/how-it-works/brand-deals" />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgba(180,83,9,0.07) 0%, rgba(8,145,178,0.07) 100%)', borderBottom: '1px solid var(--color-hairline)', padding: '112px 24px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', background: '#FFFBEB', border: '1px solid rgba(180,83,9,0.3)', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px' }}>🤝</span>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#B45309' }}>Brand Deals · How It Works</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '18px', color: 'var(--color-ink)' }}>
            From brief to payout —<br />
            <span style={{ color: '#B45309' }}>no DMs, no ghosting, no unpaid invoices.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.05rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '620px', margin: '0 auto 32px' }}>
            Sceneora structures every brand–creator collaboration with AI-validated briefs, auto-generated contracts, escrow-protected payments, and T+1 payouts. Eight steps from discovery to cash.
          </p>

          {/* View toggle */}
          <div style={{ display: 'inline-flex', padding: '4px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-hairline)', marginBottom: '28px' }}>
            {(['brand', 'creator'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '8px 24px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', background: activeTab === t ? (t === 'brand' ? '#0891B2' : '#B45309') : 'transparent', color: activeTab === t ? '#fff' : 'var(--color-muted)', transition: 'all 0.15s' }}>
                {t === 'brand' ? '🏢 I\'m a Brand' : '🎬 I\'m a Creator'}
              </button>
            ))}
          </div>

          {activeTab === 'brand' ? (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { val: 'AI Fit Score', label: 'matches creator to audience' },
                { val: 'Escrow', label: 'payment protection' },
                { val: 'Auto-contract', label: 'no legal team needed' },
                { val: 'T+1', label: 'payout to creator' },
              ].map(s => (
                <div key={s.label} style={{ padding: '10px 16px', borderRadius: '10px', background: '#ECFEFF', border: '1px solid rgba(8,145,178,0.2)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '13px', color: '#0891B2' }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { val: '₹15K–₹2L', label: 'avg deal range on platform' },
                { val: 'T+1', label: 'payout after post confirmation' },
                { val: '0 DMs', label: 'all communication on-platform' },
                { val: 'AI Rate Card', label: 'no more guessing your price' },
              ].map(s => (
                <div key={s.label} style={{ padding: '10px 16px', borderRadius: '10px', background: '#FFFBEB', border: '1px solid rgba(180,83,9,0.2)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '13px', color: '#B45309' }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Step-by-step flow */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {STEPS.map((s, i) => (
            <button key={i} onClick={() => setActiveStep(i)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${activeStep === i ? s.color : 'var(--color-hairline)'}`, background: activeStep === i ? s.bg : 'var(--color-surface)', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: activeStep === i ? s.color : 'var(--color-muted)', transition: 'all 0.15s' }}>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px' }}>0{s.n}</span>
              {s.title.split(' ').slice(0, 3).join(' ')}
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }}>
          <div style={{ padding: '32px', borderRadius: '20px', background: STEPS[activeStep].bg, border: `1px solid ${STEPS[activeStep].color}33` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>{STEPS[activeStep].icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: STEPS[activeStep].color, fontWeight: 700, marginBottom: '3px' }}>STEP 0{STEPS[activeStep].n}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}>{STEPS[activeStep].title}</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '20px' }}>{STEPS[activeStep].desc}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {STEPS[activeStep].features.map(f => (
                <li key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: STEPS[activeStep].color, fontWeight: 700, marginTop: '1px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step progress indicator */}
          <div style={{ padding: '28px', borderRadius: '20px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '20px' }}>All 8 Steps</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: activeStep === i ? s.bg : 'transparent', transition: 'background 0.12s', textAlign: 'left' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: activeStep === i ? s.color : 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, border: activeStep === i ? 'none' : '1px solid var(--color-hairline)' }}>
                    {activeStep > i ? '✓' : s.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: activeStep === i ? s.color : 'var(--color-ink)' }}>{s.title}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: 'var(--color-muted)' }}>0{s.n}</span>
                </button>
              ))}
            </div>

            {activeStep < STEPS.length - 1 && (
              <button onClick={() => setActiveStep(i => Math.min(i + 1, STEPS.length - 1))} style={{ width: '100%', marginTop: '16px', padding: '11px', borderRadius: '10px', background: STEPS[activeStep].color, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', transition: 'opacity 0.15s' }}>
                Next: {STEPS[activeStep + 1].title} →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live deal mockup */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 64px' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Active Deals Dashboard</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '28px' }}>This is what both brands and creators see when managing live campaigns on Sceneora.</p>

        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ background: '#FFFBEB', borderBottom: '1px solid rgba(180,83,9,0.2)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#78350F' }}>Brand Deals — Active Campaigns</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#B45309', background: '#FFFBEB', padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(180,83,9,0.3)' }}>3 active deals</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '100px' }}>₹2.45L in escrow</span>
            </div>
          </div>

          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {MOCKUP_DEALS.map(d => (
              <div key={d.brand} style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: 'var(--color-ink)' }}>{d.brand}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>× {d.creator}</span>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: d.statusColor, background: d.statusBg, padding: '2px 8px', borderRadius: '100px' }}>{d.status}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{d.product} · {d.platform} · {d.deliverables}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: '#B45309' }}>₹{d.value.toLocaleString()}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>Fit Score: {d.fitScore}%</div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>Deal progress</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: d.statusColor }}>{d.progress}%</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-hairline)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${d.progress}%`, borderRadius: '3px', background: `linear-gradient(90deg, ${d.statusColor}, ${d.statusColor}cc)`, transition: 'width 0.3s' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore roles footer */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 40px', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore platform roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { icon: '🎬', label: 'Content Creator', href: '/roles/content-creator', color: '#B45309', bg: '#FFFBEB' },
            { icon: '🏢', label: 'Brand',           href: '/roles/brand',           color: '#0891B2', bg: '#ECFEFF' },
            { icon: '📅', label: 'Client',          href: '/roles/client',          color: '#4F46E5', bg: '#EEF2FF' },
            { icon: '📷', label: 'Creator',         href: '/roles/creator',         color: '#7C3AED', bg: '#F5F3FF' },
            { icon: '🏛️', label: 'Agency',          href: '/roles/agency',          color: '#1D4ED8', bg: '#EFF6FF' },
          ].map(r => (
            <Link key={r.label} href={r.href} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', borderRadius: '100px', background: r.bg, border: `1px solid ${r.color}33`, textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: r.color, transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
            ><span>{r.icon}</span>{r.label}</Link>
          ))}
        </div>
      </div>

      {/* CTA split */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '32px', borderRadius: '20px', background: 'linear-gradient(135deg, #ECFEFF, #cffafe)', border: '1px solid rgba(8,145,178,0.2)' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#0891B2', marginBottom: '8px' }}>🏢 You're a Brand</div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#164e63', lineHeight: 1.6, marginBottom: '20px' }}>Find the right creators, send structured briefs, and pay only into escrow. No influencer agencies. No ambiguous invoices.</p>
            <Link href="/roles/brand#onboarding" style={{ display: 'inline-block', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#fff', background: '#0891B2', textDecoration: 'none', padding: '11px 22px', borderRadius: '10px' }}>Start a Campaign →</Link>
          </div>
          <div style={{ padding: '32px', borderRadius: '20px', background: 'linear-gradient(135deg, #FFFBEB, #fef3c7)', border: '1px solid rgba(180,83,9,0.2)' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#B45309', marginBottom: '8px' }}>🎬 You're a Creator</div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#78350f', lineHeight: 1.6, marginBottom: '20px' }}>Get brand deal briefs in your dashboard, negotiate on your terms, and receive T+1 payouts once you've delivered.</p>
            <Link href="/roles/content-creator#onboarding" style={{ display: 'inline-block', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#fff', background: '#B45309', textDecoration: 'none', padding: '11px 22px', borderRadius: '10px' }}>Start Getting Brand Deals →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
