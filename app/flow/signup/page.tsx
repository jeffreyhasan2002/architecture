'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../../components/SceneoraNav'
import FlowSubNav from '../../../components/FlowSubNav'
import MermaidDiagram from '../../../components/MermaidDiagram'

const UNIFIED_SIGNUP = `flowchart TD
    L["Landing / any CTA — 'Get Started'"] --> R["ONE registration form: phone or email"]
    R --> V{"Verify"}
    V -->|"Phone"| OTP["OTP · 6-digit · 5-min TTL"]
    V -->|Email| EM["Email link / Google / Apple OAuth"]
    OTP --> U["users row created — status: pending_profile"]
    EM --> U
    U --> ROLE["Role selection screen<br/>(Client / Creator / Content Creator / Brand / Agency / Space Owner / Gear Owner)"]

    ROLE -->|Client| ORB1["No extra step — ready to search & book"]
    ROLE -->|Creator| ORB2["Profile + portfolio + KYC + availability + plan"]
    ROLE -->|"Content Creator"| ORB3["Profile + rate card + niches + KYC + plan"]
    ROLE -->|Brand| ORB4["Company details + verification + team invite"]
    ROLE -->|Agency/Studio| ORB5["Company + team invite + roster setup"]
    ROLE -->|"Space Owner"| ORB6["List space + photos + property KYC + pricing"]
    ROLE -->|"Gear Owner"| ORB7["List gear + photos + ownership KYC + deposit"]

    ORB1 --> TOK["Issue access (15m) + refresh (7d) JWT"]
    ORB2 --> TOK
    ORB3 --> TOK
    ORB4 --> TOK
    ORB5 --> TOK
    ORB6 --> TOK
    ORB7 --> TOK
    TOK --> DASH["Land on role-specific dashboard"]

    INV["Moderator / Trust Officer / Admin / Super Admin"] -.->|"invite-only — never via this form"| PROV["Provisioned by Super Admin (§18)"]
    PROV --> TOK`

const LOGIN_FLOW = `flowchart TD
    A["Phone/email or OAuth"] --> B{Method}
    B -->|OTP| C["Verify OTP"]
    B -->|Password| D["Verify Argon2id"]
    B -->|OAuth| E["Verify OIDC token"]
    C & D & E --> F{Valid?}
    F -->|No| X["Reject + rate-limit"]
    F -->|Yes| G{"MFA enabled?"}
    G -->|Yes| H["Second factor (TOTP)"]
    G -->|No| I["Issue access + refresh"] --> J["Create session"]
    H --> I`

const ROLE_ONBOARDING: Record<string, { icon: string; color: string; bg: string; title: string; note: string; steps: { title: string; desc: string }[]; mermaid: string }> = {
  client: {
    icon: '📅', color: '#0F62FE', bg: '#EFF4FF', title: 'Client',
    note: 'No extra onboarding — the platform’s default state is "ready to book."',
    steps: [
      { title: 'Verified & done', desc: 'Phone/email verified → account is immediately live.' },
      { title: 'Optional profile details', desc: 'City, preferred services, budget band — used to personalize search, never blocking.' },
      { title: 'Land on client dashboard', desc: 'Search → shortlist → book. Nothing else required.' },
    ],
    mermaid: `flowchart LR
    A[Verified] --> B["Optional: city + preferences"] --> C["Client dashboard — search & book"]`,
  },
  creator: {
    icon: '📷', color: '#7C3AED', bg: '#F5F3FF', title: 'Creator',
    note: 'Photographers, videographers, MUAs, studios — same wizard, KYC-gated before going live.',
    steps: [
      { title: 'Build profile', desc: 'Services, packages, pricing, bio.' },
      { title: 'Upload portfolio', desc: 'Images go to R2; Claude Vision assigns AI style tags automatically.' },
      { title: 'KYC / Aadhaar', desc: 'DigiLocker/OTP verification (24–48h) → "Verified" badge + ranking boost.' },
      { title: 'Set availability', desc: 'Populates creator_slots — the calendar clients see.' },
      { title: 'Pick a plan', desc: 'Free / Pro / Studio — determines take-rate + storage caps.' },
      { title: 'Go live', desc: 'Indexed in Algolia, searchable immediately.' },
    ],
    mermaid: `flowchart TD
    A[Register as Creator] --> B["Profile: services, portfolio"]
    B --> C["Upload → AI style tagging"] --> D["KYC / Aadhaar → badge"]
    D --> E["Set availability"] --> F["Synced to Algolia"]
    F --> G{"Choose plan"} --> H["Receive bookings"]`,
  },
  'content-creator': {
    icon: '🎬', color: '#B45309', bg: '#FFFBEB', title: 'Content Creator',
    note: 'An extended Creator type — same base wizard, plus the brand-deal-specific fields.',
    steps: [
      { title: 'Everything a Creator does', desc: 'Profile, portfolio (AI-tagged), KYC, plan.' },
      { title: 'Rate card', desc: 'Structured pricing per deliverable type (reel, story, post).' },
      { title: 'Niches + platforms', desc: 'Food, travel, beauty, etc.; Instagram/YouTube/etc.' },
      { title: 'Audience metrics', desc: 'Verified follower count + engagement rate — feeds the Fit Score.' },
      { title: 'Go live for brand search', desc: 'Appears in brand discovery with a pre-computed Fit Score.' },
    ],
    mermaid: `flowchart TD
    A["All Creator steps"] --> B["Rate card + niches + platforms"]
    B --> C["Audience metrics verified"] --> D["Fit Score pre-computed"] --> E["Visible to brand search"]`,
  },
  brand: {
    icon: '🏢', color: '#0891B2', bg: '#ECFEFF', title: 'Brand',
    note: 'Company-level account — can invite teammates who inherit the Brand role.',
    steps: [
      { title: 'Company details', desc: 'Business name, category, GST (for invoicing).' },
      { title: 'Verification', desc: 'Business email domain or document check.' },
      { title: 'Invite team', desc: 'Teammates join under the same brand account.' },
      { title: 'Set target creator profile', desc: 'Niches, budget range — powers Fit Score matching.' },
      { title: 'Go live', desc: 'Search creators, send briefs, fund escrow.' },
    ],
    mermaid: `flowchart TD
    A["Company details"] --> B[Verification] --> C["Invite team"] --> D["Target creator profile"] --> E["Search + send briefs"]`,
  },
  agency: {
    icon: '🏛️', color: '#1D4ED8', bg: '#EFF6FF', title: 'Agency / Studio',
    note: 'The wizard detects Agency vs. Studio and configures the dashboard accordingly.',
    steps: [
      { title: 'Company details', desc: 'Agency or studio, team size, specialties.' },
      { title: 'Invite team', desc: 'Freelancers/staff join the roster.' },
      { title: 'Build roster', desc: 'Curate available freelancers with their own slots.' },
      { title: 'Go live', desc: 'Accept projects, allocate freelancers, track consolidated payouts.' },
    ],
    mermaid: `flowchart TD
    A["Company details"] --> B["Invite team"] --> C["Build roster"] --> D["Accept projects"]`,
  },
  'space-owner': {
    icon: '🏛️', color: '#0F62FE', bg: '#EFF4FF', title: 'Space Owner',
    note: 'A parallel listing vertical, not in the core role catalogue — modeled as a Creator subtype with its own onboarding wizard.',
    steps: [
      { title: 'List your space', desc: 'Type (indoor/outdoor/home), location, amenities, house rules.' },
      { title: 'Upload photos', desc: 'AI auto-tags mood + use-case (e.g. "fashion-ready") for discoverability.' },
      { title: 'KYC + property verification', desc: 'Aadhaar + property proof (24–48h) → verified badge, up to 2× ranking boost.' },
      { title: 'Set pricing + Instant Book', desc: 'Hourly rate, blocked dates, optional Google Calendar sync.' },
      { title: 'Go live', desc: 'Free (1 listing) → Pro → Studio plans gate instant book + featured placement.' },
    ],
    mermaid: `flowchart TD
    A["Register → Space Owner"] --> B["List space + amenities"]
    B --> C["Photos → AI tags"] --> D["KYC + property proof"]
    D --> E["Pricing + Instant Book"] --> F["Live in search"]`,
  },
  'gear-owner': {
    icon: '🔧', color: '#7C3AED', bg: '#F5F3FF', title: 'Gear Owner',
    note: 'Same pattern as Space Owner — a Creator subtype, distinguished by Shop vs. Individual at signup.',
    steps: [
      { title: 'Choose Shop or Individual', desc: 'Shops get bulk upload + API access on higher plans.' },
      { title: 'List your gear', desc: 'Brand, model, specs, condition grade, real photos (not stock).' },
      { title: 'KYC + ownership proof', desc: 'Aadhaar + invoice/serial photo (24–48h) → verified badge.' },
      { title: 'Set pricing + deposit', desc: 'Day/week rates + a refundable damage deposit amount.' },
      { title: 'Go live', desc: 'Free (2 items) → Pro (20, instant book) → Shop (unlimited, API access).' },
    ],
    mermaid: `flowchart TD
    A["Register → Gear Owner (Shop/Individual)"] --> B["List gear + condition + photos"]
    B --> C["KYC + ownership proof"] --> D["Pricing + damage deposit"]
    D --> E["Manage availability"] --> F["Live in search"]`,
  },
}

const OPS_ROLES = [
  { role: 'Moderator', gate: 'Invited by Admin', does: 'Reviews/content moderation, dispute triage' },
  { role: 'Trust Officer', gate: 'Invited by Admin · MFA mandatory', does: 'Dispute resolution, escrow release authority, KYC approval' },
  { role: 'Admin', gate: 'Invited by Super Admin · MFA mandatory', does: 'Full platform config, user lifecycle, finance, audit' },
  { role: 'Super Admin', gate: 'Provisioned at infra level · MFA mandatory', does: 'Role/permission management, infra-level controls' },
]

export default function FlowSignupPage() {
  const [activeRole, setActiveRole] = useState<keyof typeof ROLE_ONBOARDING>('client')
  const roleKeys = Object.keys(ROLE_ONBOARDING) as (keyof typeof ROLE_ONBOARDING)[]
  const r = ROLE_ONBOARDING[activeRole]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/flow" />
      <FlowSubNav />

      <section style={{ paddingTop: '56px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(79,70,229,0.3)', marginBottom: '20px', background: '#EEF2FF' }}>
          <span>🔑</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#4F46E5', letterSpacing: '0.05em', textTransform: 'uppercase' }}>One form. One users table. Many dashboards.</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.045em', lineHeight: 1.1, marginBottom: '16px' }}>
          There is exactly <span style={{ color: '#4F46E5' }}>one</span> registration form.
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--color-muted)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.75 }}>
          Every self-serve account — Client, Creator, Content Creator, Brand, Agency — goes through the same identity step (phone/email + OTP or OAuth). The <strong>only</strong> thing that changes per role is what happens <em>after</em> verification: a short, role-specific onboarding wizard. Operational roles (Moderator, Trust Officer, Admin) never use this form at all — they're invited.
        </p>
      </section>

      {/* Unified diagram */}
      <section style={{ padding: '0 24px 56px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ borderRadius: '16px', border: '1.5px solid rgba(79,70,229,0.25)', overflow: 'hidden', background: 'var(--color-surface)' }}>
          <MermaidDiagram code={UNIFIED_SIGNUP} id="unified-signup" />
        </div>
      </section>

      {/* Identity + token model */}
      <section style={{ padding: '0 24px 56px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1rem', marginBottom: '14px' }}>Identity methods</h3>
            {[
              { m: 'Phone + OTP', n: 'Primary — India-first. 6-digit, 5-min TTL, 5 attempts.' },
              { m: 'Email + Password', n: 'Brands/agencies, desktop. Argon2id, min 10 chars, breach check.' },
              { m: 'Google OAuth', n: 'Fast social login (OIDC).' },
              { m: 'Apple OAuth', n: 'iOS requirement (OIDC).' },
            ].map(x => (
              <div key={x.m} style={{ display: 'flex', gap: '10px', padding: '9px 0', borderBottom: '1px solid var(--color-hairline)' }}>
                <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12.5px', color: '#4F46E5', minWidth: '130px' }}>{x.m}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{x.n}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1rem', marginBottom: '14px' }}>One token model, every role</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
              The JWT is identical in shape for every role — only the <code style={{ fontFamily: 'var(--font-jetbrains-mono)', background: 'var(--color-bg)', padding: '1px 5px', borderRadius: '4px' }}>roles[]</code> claim differs. That single claim is what NestJS Guards use to route the same request to different data.
            </p>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', borderRadius: '10px', padding: '12px 14px', color: 'var(--color-ink)', lineHeight: 1.8 }}>
              access (15m): sub, roles[],<br/>
              &nbsp;&nbsp;subscription_tier, kyc_verified, jti<br/>
              refresh (7d): rotating, reuse-detected
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '10px' }}>Permission = f(role, resource_ownership, subscription_tier, kyc_status)</p>
          </div>
        </div>
      </section>

      {/* Per-role onboarding */}
      <section style={{ padding: '0 24px 56px', maxWidth: '1100px', margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '4px' }}>Where the paths actually split</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '20px' }}>Pick a role to see its onboarding wizard after identity verification.</p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px', padding: '6px', background: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-hairline)', width: 'fit-content' }}>
          {roleKeys.map(k => {
            const meta = ROLE_ONBOARDING[k]
            const active = activeRole === k
            return (
              <button key={k} onClick={() => setActiveRole(k)} style={{
                display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '11px',
                background: active ? meta.bg : 'transparent',
                border: active ? `1.5px solid ${meta.color}44` : '1.5px solid transparent',
                fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12.5px',
                color: active ? meta.color : 'var(--color-muted)',
                cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}><span style={{ fontSize: '15px' }}>{meta.icon}</span>{meta.title}</button>
            )
          })}
        </div>

        <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          <div>
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: r.bg, border: `1px solid ${r.color}33`, fontSize: '12.5px', color: r.color, fontWeight: 600, marginBottom: '18px', lineHeight: 1.6 }}>{r.note}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {r.steps.map((s, i) => (
                <div key={s.title} style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: r.bg, color: r.color, fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{s.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: '14px', border: '1px solid var(--color-hairline)', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <MermaidDiagram code={r.mermaid} id={`onboard-${activeRole}`} />
          </div>
        </div>
      </section>

      {/* Operational roles */}
      <section style={{ padding: '0 24px 56px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '20px' }}>🔒</span>
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1rem', margin: 0 }}>Operational roles never self-register</h3>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            The registration form only ever produces Client / Creator / Content Creator / Brand / Agency accounts. Moderator, Trust Officer, Admin, and Super Admin are provisioned directly — there is no public path to them, which is the actual security boundary between "anyone can sign up" and "can release escrow."
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '10px' }}>
            {OPS_ROLES.map(o => (
              <div key={o.role} style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12.5px', color: 'var(--color-ink)', marginBottom: '3px' }}>{o.role}</div>
                <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginBottom: '4px' }}>{o.gate}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{o.does}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Returning users */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>Returning users: login, not registration</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '16px' }}>Same identity methods, no onboarding wizard — the JWT already carries the role, so the user lands straight on their dashboard.</p>
        <div style={{ borderRadius: '16px', border: '1px solid var(--color-hairline)', overflow: 'hidden', background: 'var(--color-surface)', marginBottom: '20px' }}>
          <MermaidDiagram code={LOGIN_FLOW} id="login-flow" />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--color-muted)' }}>
          <span style={{ padding: '6px 12px', borderRadius: '100px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>🔁 Password reset: link/code (15-min TTL) → Argon2id → revoke all sessions</span>
          <span style={{ padding: '6px 12px', borderRadius: '100px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>📱 Session mgmt: list/revoke devices · idle timeout 7d · absolute 30d</span>
          <span style={{ padding: '6px 12px', borderRadius: '100px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>🔐 MFA: optional for Brand/Agency, mandatory for Admin/Trust Officer</span>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '40px', textAlign: 'center' }}>
        <Link href="/flow/roles" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: '#7C3AED', textDecoration: 'none', padding: '13px 26px', borderRadius: '10px' }}>Next: what each role does after signup →</Link>
      </section>
    </div>
  )
}
