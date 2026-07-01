'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../../components/SceneoraNav'
import FlowSubNav from '../../../components/FlowSubNav'
import MermaidDiagram from '../../../components/MermaidDiagram'

const SYSTEMS: Record<string, {
  icon: string; color: string; bg: string; title: string; tagline: string; usedBy: string
  mermaid: string; points: string[]; linkOut?: { href: string; label: string }
}> = {
  auth: {
    icon: '🔑', color: '#4F46E5', bg: '#EEF2FF', title: 'Authentication', tagline: 'One identity substrate, six roles', usedBy: 'Every role, every request',
    mermaid: `flowchart TD
    U[User] --> M{Method}
    M -->|Phone OTP| O["Verify OTP"]
    M -->|Email/Password| P["Verify Argon2id"]
    M -->|Google/Apple| X["Verify OIDC"]
    O & P & X --> V{Valid?}
    V -->|No| REJ["Reject + rate-limit"]
    V -->|Yes| MFA{MFA?}
    MFA -->|Yes| SF["Second factor"]
    MFA -->|No| T["Issue JWT + refresh"] --> SESS["Create session"]
    SF --> T`,
    points: [
      'Every request — regardless of role — passes through the same JwtAuthGuard → RolesGuard → OwnershipGuard → KycGuard → SubscriptionGuard chain.',
      'The JWT `roles[]` claim is the only thing that changes what a request is allowed to touch.',
      'Redis `session:{user_id}` (7-day TTL) + a persistent `sessions` table give device-level audit and revocation for every role.',
    ],
    linkOut: { href: '/flow/signup', label: 'See the full sign-up & role-routing flow →' },
  },
  payments: {
    icon: '💳', color: '#059669', bg: '#ECFDF5', title: 'Payments & Escrow', tagline: 'One state machine, every booking type', usedBy: 'Client, Creator, Brand, Agency',
    mermaid: `flowchart TD
    INIT["Initiate booking"] --> ORD["Razorpay order + idempotency key"]
    ORD --> CKO["Checkout: UPI/card/EMI/split"] --> WH["Webhook — HMAC verified"]
    WH --> ESC["Advance in escrow → CONFIRMED"]
    ESC --> DEL["Delivery confirmed"]
    DEL --> FEE["Compute take-rate + GST + TCS/TDS"]
    FEE --> PO["Split payout T+1"] --> INV["Invoices/receipts"]
    ESC -.->|dispute| DIS["Trust officer ruling"] --> REF["Refund / split"]`,
    points: [
      'A regular booking, a brand deal, a milestone-escrow booking, and a split-payment booking all resolve to the same underlying escrow → release state machine.',
      'Every payment mutation is idempotent — duplicate webhook or duplicate client retry produces exactly one charge.',
      'Balance only ever releases after DELIVERY_CONFIRMED, never before — this is the actual trust guarantee, not a UI promise.',
    ],
    linkOut: { href: '/features/platform', label: 'See Trust Infrastructure + Milestone/Split/EMI specs →' },
  },
  subscriptions: {
    icon: '📦', color: '#7C3AED', bg: '#F5F3FF', title: 'Subscriptions & Monetization', tagline: 'Plan-gated entitlements, not separate products', usedBy: 'Creator, Content Creator, Brand, Agency',
    mermaid: `flowchart TD
    SEL["Select plan"] --> TR{Trial?}
    TR -->|Yes| T["Trialing 14d"] --> ACT
    TR -->|No| ACT["Active + entitlements"]
    ACT --> REN{Renewal}
    REN -->|ok| ACT
    REN -->|fail| DUN["Dunning: 3 retries"] --> GR["Grace 3d"] --> EXP["Expired → Free"]
    ACT --> CH["Upgrade/Downgrade → proration"] --> ACT
    ACT --> CAN["Cancel → active until period end"] --> EXP`,
    points: [
      'Free/Pro/Studio for creators, Brand/Brand+ for brands — same billing engine, different entitlement sets gated by `SubscriptionGuard`.',
      'A downgrade never deletes data — it just tightens the entitlement check (e.g. gallery storage cap) on next write.',
      'Failed renewal never immediately locks anyone out — 3 dunning retries + 3-day grace before falling back to Free.',
    ],
  },
  notifications: {
    icon: '🔔', color: '#D97706', bg: '#FFFBEB', title: 'Notifications', tagline: 'One event bus, five channels, per-role routing', usedBy: 'Every role',
    mermaid: `flowchart TD
    E["Event: booking / review / deadline / message"] --> Q["Notifications queue"]
    Q --> PR["Apply user preferences"]
    PR --> CH{Channels}
    CH --> PUSH[Push] & SMS[SMS] & MAIL[Email] & IN["In-app"] & WA[WhatsApp]`,
    points: [
      'The same event (e.g. "booking confirmed") fans out differently per role — a client gets a confirmation, the creator gets an accept-request, admin gets an audit entry.',
      'Every channel respects the user’s own notification preferences — nudges (§3.10.1) are capped and opt-out aware by design.',
      'Mobile order intake is push-first so a creator never misses a booking on the go.',
    ],
  },
  disputes: {
    icon: '⚖️', color: '#DC2626', bg: '#FEF2F2', title: 'Dispute & Trust', tagline: 'The mechanism behind every trust score', usedBy: 'Client, Creator, Content Creator, Brand, Trust Officer',
    mermaid: `flowchart TD
    D["Dispute raised"] --> EV["Evidence window — 72h"] --> UR["Under review — Trust Officer"]
    UR --> RC["Refund client"]
    UR --> RP["Release creator"]
    UR --> PA["Partial resolution"]
    RC & RP & PA --> SC["Reliability + trust score updated"]`,
    points: [
      'Any role that can pay or be paid can raise a dispute from any post-advance state.',
      'Only a Trust Officer or Admin can rule on it — this is the one authority self-registered roles never get, by design (see sign-up flow).',
      'Every ruling updates the trust score, which feeds straight back into the search-ranking flywheel (see Flow Overview).',
    ],
    linkOut: { href: '/flow/signup', label: 'Why Trust Officer/Admin are invite-only →' },
  },
}

export default function FlowSystemsPage() {
  const [active, setActive] = useState<keyof typeof SYSTEMS>('auth')
  const keys = Object.keys(SYSTEMS) as (keyof typeof SYSTEMS)[]
  const s = SYSTEMS[active]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/flow" />
      <FlowSubNav />

      <section style={{ paddingTop: '56px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(8,145,178,0.3)', marginBottom: '20px', background: '#ECFEFF' }}>
          <span>⚙️</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#0891B2', letterSpacing: '0.05em', textTransform: 'uppercase' }}>The plumbing every role quietly shares</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.045em', lineHeight: 1.1, marginBottom: '16px' }}>
          Five systems. Zero duplication.
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--color-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.75 }}>
          This is the part that makes a six-role platform maintainable: none of these systems belong to a role. A client's payment, a brand's escrow, and an agency's per-freelancer milestone all run through the <strong>same</strong> payment state machine. Same story for auth, subscriptions, notifications, and disputes.
        </p>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px', padding: '6px', background: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-hairline)', width: 'fit-content' }}>
          {keys.map(k => {
            const meta = SYSTEMS[k]
            const isActive = active === k
            return (
              <button key={k} onClick={() => setActive(k)} style={{
                display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '11px',
                background: isActive ? meta.bg : 'transparent',
                border: isActive ? `1.5px solid ${meta.color}44` : '1.5px solid transparent',
                fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12.5px',
                color: isActive ? meta.color : 'var(--color-muted)',
                cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}><span style={{ fontSize: '15px' }}>{meta.icon}</span>{meta.title}</button>
            )
          })}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', color: s.color, margin: 0 }}>{s.title}</h2>
            <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>{s.tagline}</span>
          </div>
          <div style={{ fontSize: '11.5px', color: s.color, fontWeight: 600, marginTop: '4px' }}>Used by: {s.usedBy}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          <div style={{ borderRadius: '14px', border: '1px solid var(--color-hairline)', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <MermaidDiagram code={s.mermaid} id={`system-${active}`} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: s.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Why this stays one system</div>
            <ul style={{ margin: '0 0 18px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {s.points.map((p, i) => <li key={i} style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.7 }}>{p}</li>)}
            </ul>
            {s.linkOut && (
              <Link href={s.linkOut.href} style={{ display: 'inline-flex', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: s.color, textDecoration: 'none' }}>{s.linkOut.label}</Link>
            )}
          </div>
        </div>
      </section>

      {/* Wrap-up */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F62FE,#7C3AED)', borderRadius: '20px', padding: '36px', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: '26px', marginBottom: '10px' }}>🧭</div>
          <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '10px' }}>That's the whole platform, end to end</h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '640px', margin: '0 auto 20px', lineHeight: 1.7, opacity: 0.92 }}>
            One sign-up form → role-adaptive onboarding → a role-specific dashboard built from four shared building blocks → all of it running on five systems no role owns exclusively. Nothing here forks the codebase per role — it forks the <em>data</em>, gated by one JWT claim.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/flow" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#4F46E5', background: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '9px' }}>← Back to Overview</Link>
            <Link href="/features/platform" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#fff', background: 'rgba(255,255,255,0.15)', textDecoration: 'none', padding: '10px 20px', borderRadius: '9px', border: '1px solid rgba(255,255,255,0.3)' }}>See all 22 features →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
