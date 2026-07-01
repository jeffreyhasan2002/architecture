'use client'
import Link from 'next/link'
import SceneoraNav from '../../components/SceneoraNav'
import FlowSubNav from '../../components/FlowSubNav'
import MermaidDiagram from '../../components/MermaidDiagram'

const SITEMAP = `flowchart TD
    ROOT[sceneora.com]
    ROOT --> PUB[Public / Marketing]
    ROOT --> DISC[Discovery]
    ROOT --> ACC["Account / Auth"]
    ROOT --> DASH[Dashboards — one per role]
    ROOT --> ADMIN[Admin console]

    PUB --> P1[Home] & P2[About] & P3[Pricing] & P4["Trust & Safety"] & P5[Legal]
    DISC --> D1["Search results"] & D2["City + service SEO pages"] & D3["Creator profile"] & D4["Content-creator profile"] & D5["Budget Estimator"]
    ACC --> A1[Register] & A2["Login / OTP"] & A3["Role selection"] & A4[Settings]
    DASH --> C1["Client dashboard"] & C2["Creator dashboard"] & C3["Content-creator dashboard"] & C4["Brand dashboard"] & C5["Agency dashboard"]
    ADMIN --> AD1["KYC + moderation"] & AD2[Disputes] & AD3[Finance] & AD4["Audit log"]`

const MASTER_FLOW = `flowchart TD
    SEO["Google search / referral / ad"] --> LAND["Landing or SEO city page"]
    LAND --> BROWSE["Browse + filter creators"]
    BROWSE --> BUDGET["Optional: AI Budget Estimator"]
    BUDGET --> PROFILE["View creator profile"]
    BROWSE --> PROFILE
    PROFILE --> AVAIL["Check live availability"]
    AVAIL --> DECIDE{"Ready to book?"}

    DECIDE -->|"Just exploring"| SAVE["Shortlist / Save"]
    SAVE --> NUDGE["Re-engagement notification"]
    NUDGE --> PROFILE

    DECIDE -->|Yes| AUTH{"Logged in?"}
    AUTH -->|No| REG["Register / role selection / OTP"]
    REG --> HOLD
    AUTH -->|Yes| HOLD["Soft hold — 15 min"]

    HOLD --> PAY["Pay advance — escrow"]
    PAY --> CONFIRMED["Booking CONFIRMED"]
    CONFIRMED --> CHAT["In-app chat + contract"]
    CHAT --> SHOOT["Shoot day"]
    SHOOT --> DELIVER["Creator delivers gallery"]
    DELIVER --> CONFIRM["Client confirms delivery"]
    CONFIRM --> RELEASE["Balance released — payout T+1"]
    RELEASE --> REVIEW["Review prompt — 48h"]
    REVIEW --> TRUST["Trust score recalculated"]
    TRUST --> RANK["Creator ranks higher in search"]
    RANK --> SEO

    REVIEW --> REPEAT["Repeat booking / referral"]
    REPEAT --> BROWSE`

const SCREENS = [
  { page: 'Home', job: 'Route the visitor to search or story', els: 'Search bar, top cities/services, trust proof, CTA' },
  { page: 'SEO city/service', job: 'Rank on Google & convert', els: 'Indexable listings, filters, FAQ schema' },
  { page: 'Search results', job: 'Help choose fast', els: 'Ranked cards (distance, price, rating, availability), filters, compare' },
  { page: 'Creator profile', job: 'Build confidence → book', els: 'Portfolio, packages, reviews, trust badge, live calendar, book CTA' },
  { page: 'Checkout', job: 'Take payment safely', els: 'Escrow advance, idempotent order, trust copy' },
  { page: 'Role dashboard', job: 'Run the account for that role', els: 'Orders/deals board, calendar, chat, financial dashboard — same shell, role-specific data' },
  { page: 'Settings', job: 'Control the account', els: 'Profile, security/sessions, billing, notification prefs' },
  { page: 'Admin console', job: 'Keep the platform safe', els: 'KYC, moderation, disputes, finance, audit' },
]

export default function FlowOverviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/flow" />
      <FlowSubNav />

      {/* Hero */}
      <section style={{ paddingTop: '56px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(5,150,105,0.3)', marginBottom: '20px', background: '#ECFDF5' }}>
          <span>🧭</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#059669', letterSpacing: '0.05em', textTransform: 'uppercase' }}>One platform, one login, many roles</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.6rem)', letterSpacing: '-0.045em', lineHeight: 1.06, marginBottom: '18px' }}>
          Everyone shares one platform.<br />
          <span style={{ background: 'linear-gradient(135deg,#059669,#4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Nobody shares the same screen.</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.75 }}>
          Sceneora is <strong>one codebase, one auth system, one payment/trust engine</strong> — but a client, a creator, a brand, an agency, and an admin each land on a completely different dashboard the moment they log in. This section walks through exactly how that split happens: <Link href="/flow/signup" style={{ color: '#059669', fontWeight: 700 }}>sign-up & role routing</Link>, <Link href="/flow/roles" style={{ color: '#059669', fontWeight: 700 }}>what each role does after that</Link>, and <Link href="/flow/systems" style={{ color: '#059669', fontWeight: 700 }}>the shared systems everyone quietly relies on</Link>.
        </p>
      </section>

      {/* The one loop that matters */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F62FE,#7C3AED)', borderRadius: '20px', padding: '36px', color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>🔁</div>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.025em', marginBottom: '10px' }}>The flywheel every feature feeds</h2>
          <p style={{ fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7, opacity: 0.92 }}>
            Every completed booking feeds the <strong>trust score</strong>, which improves <strong>search ranking</strong>, which drives <strong>more discovery</strong>, which drives <strong>more bookings</strong>. Whatever role you're looking at below, its job is either to feed this loop or remove friction from it.
          </p>
        </div>

        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>The master flow — whole site, one picture</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '16px' }}>How a stranger becomes a paying, reviewing, repeat customer — and how that same loop ranks creators higher over time.</p>
        <div style={{ borderRadius: '16px', border: '1px solid var(--color-hairline)', overflow: 'hidden', background: 'var(--color-surface)', marginBottom: '48px' }}>
          <MermaidDiagram code={MASTER_FLOW} id="master-flow" />
        </div>

        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>The complete sitemap</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '16px' }}>Every page on the platform falls into one of five buckets. Dashboards is the one bucket that looks different per role — that's the subject of the next page.</p>
        <div style={{ borderRadius: '16px', border: '1px solid var(--color-hairline)', overflow: 'hidden', background: 'var(--color-surface)', marginBottom: '48px' }}>
          <MermaidDiagram code={SITEMAP} id="sitemap" />
        </div>
      </section>

      {/* Screen by screen */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>Screen by screen: what each page's one job is</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '16px' }}>Every screen exists to do exactly one thing well — this is the discipline that keeps a multi-role platform from feeling like eight different products glued together.</p>
        <div className="table-scroll" style={{ borderRadius: '14px', overflowX: 'auto', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg)' }}>
                {['Page', 'One job', 'Key elements'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-hairline)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCREENS.map((s, i) => (
                <tr key={s.page} style={{ background: i % 2 ? 'var(--color-bg)' : 'transparent' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--color-ink)', whiteSpace: 'nowrap' }}>{s.page}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--color-ink)' }}>{s.job}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--color-muted)' }}>{s.els}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Next steps */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px' }}>
          {[
            { href: '/flow/signup',  icon: '🔑', title: 'Sign-Up & Onboarding', desc: 'One registration form, then role-specific onboarding — see exactly where the paths split.', c: '#4F46E5', bg: '#EEF2FF' },
            { href: '/flow/roles',   icon: '👥', title: 'Role Journeys',        desc: 'What a client, creator, content creator, brand, agency, and admin each do after signup.', c: '#7C3AED', bg: '#F5F3FF' },
            { href: '/flow/systems', icon: '⚙️', title: 'Shared Systems',       desc: 'Auth, payments/escrow, subscriptions, notifications, and disputes — used by every role.', c: '#0891B2', bg: '#ECFEFF' },
          ].map(c => (
            <Link key={c.href} href={c.href} style={{ padding: '22px', borderRadius: '16px', background: c.bg, border: `1px solid ${c.c}22`, textDecoration: 'none', transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
            >
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{c.icon}</span>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: c.c, marginBottom: '6px' }}>{c.title} →</div>
              <div style={{ fontSize: '12.5px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
