'use client'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

const STEPS = [
  { icon: '🔍', title: 'Search Freely', desc: 'No login required. Search photographers, videographers, studios, spaces, and gear by city, service type, style, or budget. Browse over 3M+ profiles.' },
  { icon: '👤', title: 'View Creator Profiles', desc: 'See full portfolios, service packages, pricing, real reviews, trust scores, and live availability calendars — all without creating an account.' },
  { icon: '💰', title: 'Use the AI Budget Estimator', desc: 'Tell us your event type, city, and dates. The AI Budget Estimator gives you a realistic price range and recommends matching creators — for free.' },
  { icon: '❤️', title: 'Shortlist Favourites', desc: 'Save creators to your shortlist (requires quick sign-up). Compare 2–3 creators side by side on price, style, availability, and trust score.' },
  { icon: '📅', title: 'Ready to Book? Become a Client', desc: 'When you\'re ready, create a free account to request a quote, hold a slot, or book directly with escrow payment protection.' },
]

const SEARCH_EXAMPLES = [
  { query: 'Wedding photographer Coimbatore', results: 342, icon: '💍' },
  { query: 'Candid photography Chennai under ₹30K', results: 187, icon: '📸' },
  { query: 'Product shoot studio Bengaluru', results: 94, icon: '📦' },
  { query: 'DJI drone rental Mumbai', results: 56, icon: '🚁' },
  { query: 'UGC creator food niche Instagram', results: 213, icon: '🍕' },
  { query: 'White cyc studio Hyderabad', results: 28, icon: '🏛️' },
]

export default function VisitorPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/visitor" />

      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid #64748B44', marginBottom: '24px', background: '#F1F5F9' }}>
          <span style={{ fontSize: '16px' }}>👤</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#64748B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Visitor Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Browse. Discover. Explore.<br />
          <span style={{ color: '#64748B' }}>No account needed.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          As a Visitor, you have complete access to search and discover every creator, space, and gear listing on Sceneora — completely free, no sign-up required. Explore, estimate, and shortlist before you ever commit.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
          <Link href="/roles/client#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#fff', background: '#0F62FE', textDecoration: 'none', padding: '12px 28px', borderRadius: '10px', boxShadow: '0 2px 12px rgba(15,98,254,0.3)' }}>
            Create Free Account →
          </Link>
          <Link href="/creators" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '12px 28px', borderRadius: '10px', border: '1px solid var(--color-hairline)' }}>
            Browse Creators
          </Link>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { val: '3M+',      label: 'Creator profiles',          icon: '📷' },
            { val: '200+',     label: 'Cities covered',            icon: '🌏' },
            { val: '₹0',       label: 'Cost to browse',            icon: '✅' },
            { val: '4.9★',     label: 'Avg platform rating',       icon: '⭐' },
            { val: '100%',     label: 'No sign-up to search',      icon: '🔓' },
          ].map(s => (
            <div key={s.label} style={{ padding: '10px 18px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontSize: '16px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.1rem', color: '#64748B', letterSpacing: '-0.025em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What Visitors Can Do */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', padding: '40px', border: '1px solid var(--color-hairline)' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>What you can do as a Visitor</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '32px' }}>No account. No commitment. Full discovery.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px' }}>
            {[
              { icon: '🔍', label: 'Full Search', desc: 'Search by city, service, style, price range' },
              { icon: '📷', label: 'View Profiles', desc: 'Full portfolios, packages, pricing, reviews' },
              { icon: '📅', label: 'Check Availability', desc: 'See live calendars (read-only)' },
              { icon: '💰', label: 'AI Budget Estimator', desc: '7-step wizard with price range + matches' },
              { icon: '🏛️', label: 'Browse Spaces', desc: 'Studios, locations, home sets' },
              { icon: '📦', label: 'Browse Gear', desc: 'Cameras, lenses, lighting, drones' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '3px' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>The Visitor Journey</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '36px' }}>From first Google search to booking — here's your path.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {STEPS.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', position: 'relative', paddingBottom: i < STEPS.length - 1 ? '32px' : '0' }}>
              {i < STEPS.length - 1 && (
                <div style={{ position: 'absolute', left: '20px', top: '48px', bottom: '0', width: '2px', background: 'var(--color-hairline)' }} />
              )}
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#F1F5F9', border: '2px solid var(--color-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                {s.icon}
              </div>
              <div style={{ flex: 1, paddingTop: '8px' }}>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#64748B', marginRight: '8px' }}>0{i + 1}</span>
                  {s.title}
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Examples - Mockup */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>What Visitors Search For</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '28px' }}>Real search examples from our platform</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '12px' }}>
          {SEARCH_EXAMPLES.map(ex => (
            <div key={ex.query} style={{ padding: '16px 20px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#64748B'; el.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = '' }}
            >
              <span style={{ fontSize: '22px' }}>{ex.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>"{ex.query}"</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '11px', color: '#64748B' }}>{ex.results} results</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
          ))}
        </div>
      </section>

      {/* Upgrade CTA */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#F1F5F9,#E2E8F0)', borderRadius: '20px', padding: '48px 40px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center', border: '1px solid #CBD5E1' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.025em', color: '#1E293B', marginBottom: '10px' }}>Ready to book? Become a Client.</h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: '#64748B', marginBottom: '0', lineHeight: 1.6 }}>Creating a free account unlocks: quote requests, slot holds, escrow bookings, in-app chat, and your personal booking dashboard.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
            <Link href="/roles/client#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#fff', background: '#0F62FE', textDecoration: 'none', padding: '12px 24px', borderRadius: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>Become a Client →</Link>
            <Link href="/roles/creator#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#1D4ED8', background: '#EFF6FF', textDecoration: 'none', padding: '12px 24px', borderRadius: '10px', textAlign: 'center', border: '1px solid #BFDBFE', whiteSpace: 'nowrap' }}>I'm a Creator</Link>
          </div>
        </div>
      </section>

      {/* Other Roles */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'visitor').map(r => (
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
