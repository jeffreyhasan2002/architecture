'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../../components/SceneoraNav'
import FlowSubNav from '../../../components/FlowSubNav'
import MermaidDiagram from '../../../components/MermaidDiagram'

type RoleKey =
  | 'visitor' | 'client' | 'creator' | 'content-creator' | 'brand' | 'agency'
  | 'space-renter' | 'space-owner' | 'gear-renter' | 'gear-owner' | 'admin'

interface RoleJourney {
  icon: string; color: string; bg: string; title: string; tagline: string
  mermaid: string; widgets: { widget: string; shows: string }[]; mobileTabs: string
  linkOut: { href: string; label: string }
}

const ROLE_JOURNEYS: Record<RoleKey, RoleJourney> = {
  visitor: {
    icon: '👤', color: '#5A5F7A', bg: '#F0F1F8', title: 'Visitor', tagline: 'Browse everything — sign up for nothing',
    mermaid: `flowchart LR
    G["Google: 'wedding photographer Coimbatore'"] --> SSR["SSR city + service page"]
    SSR --> LIST["Ranked listings"]
    LIST --> P["Profile / listing — public, indexable"]
    P --> CTA{Action}
    CTA --> EST["Try Budget Estimator — no login"]
    CTA --> SAVE["Shortlist → localStorage"]
    CTA --> REG["Register to book"]
    SAVE --> REG`,
    widgets: [
      { widget: 'No dashboard yet', shows: 'Everything runs unauthenticated — search, profiles, budget estimator' },
      { widget: 'AI Budget Estimator', shows: 'Full 7-step wizard, open to anyone, no sign-up required' },
      { widget: 'Local shortlist', shows: 'Saves to localStorage; merges automatically into the account on signup' },
      { widget: 'SEO surface', shows: 'City+service pages and profiles are server-rendered and fully crawlable' },
    ],
    mobileTabs: 'Search · Discover · Account (prompts sign-up)',
    linkOut: { href: '/roles/visitor', label: 'Full visitor guide →' },
  },
  client: {
    icon: '📅', color: '#0F62FE', bg: '#EFF4FF', title: 'Client', tagline: 'Discover → book → pay → track → review',
    mermaid: `flowchart TD
    SEARCH["Search creators"] --> SLOTS["See live available slots"]
    SLOTS --> PICK["Pick date → soft hold 15m"]
    PICK --> PATH{"Book now or request quote?"}
    PATH -->|Book now| PAY["Pay advance: full / split / EMI / milestone"]
    PATH -->|Request quote| Q["Inquiry → creator quote → accept"]
    Q --> PAY
    PAY --> ORDER["Order confirmed → tracker"]
    ORDER --> CHAT["Chatbox with creator"]
    ORDER --> TRACK["Status timeline: confirmed → shoot → delivery"]
    TRACK --> CONF["Confirm delivery"]
    CONF --> REV["Leave review"]`,
    widgets: [
      { widget: 'Active orders + status timeline', shows: 'confirmed → shoot → delivery, at a glance' },
      { widget: 'Chatbox', shows: 'Per-order thread with the creator, attachments, audit trail' },
      { widget: 'Payments & invoices', shows: 'Paid, in-escrow, refunds, EMI schedule, split contributors' },
      { widget: 'Saved shortlist', shows: 'Wishlist + compare (§3.10.1)' },
      { widget: 'Review prompts', shows: 'Fires 48h after delivery is confirmed' },
    ],
    mobileTabs: 'Search · Orders · Chat · Saved · Account',
    linkOut: { href: '/roles/client', label: 'Full client portal guide →' },
  },
  creator: {
    icon: '📷', color: '#7C3AED', bg: '#F5F3FF', title: 'Creator', tagline: 'Get booked → shoot → deliver → get paid',
    mermaid: `flowchart TD
    NEW["New booking or inquiry"] --> NOTIF["Push + SMS + in-app + email"]
    NOTIF --> CARD["Order card: date, package, client, amount"]
    CARD --> DEC{"Accept or decline?"}
    DEC -->|Decline| REL["Slot reopens; client notified; reliability noted"]
    DEC -->|Accept| CONF["Booking CONFIRMED; advance held in escrow"]
    CONF --> CHAT["Chatbox opens with client"]
    CHAT --> SHOOT["Shoot day"]
    SHOOT --> DEL["Upload gallery → client confirms"]
    DEL --> PAYOUT["Balance released → payout T+1"]
    PAYOUT --> EARN["Financial dashboard updates earnings"]`,
    widgets: [
      { widget: 'Orders board', shows: 'Pending / Confirmed / In-progress / Completed (kanban)' },
      { widget: 'Availability calendar', shows: 'Manage OPEN/blocked dates; see HELD/BOOKED; set hours' },
      { widget: 'Financial dashboard', shows: 'This-month earnings, in-escrow, released payouts, take-rate, next settlement, lifetime GMV' },
      { widget: 'Reviews', shows: 'Rating by dimension, completion rate, respond once' },
      { widget: 'Insights', shows: 'Profile views, search impressions, conversion, ranking position' },
    ],
    mobileTabs: 'Orders · Calendar · Chat · Earnings · Account',
    linkOut: { href: '/roles/creator', label: 'Full creator portal guide →' },
  },
  'content-creator': {
    icon: '🎬', color: '#B45309', bg: '#FFFBEB', title: 'Content Creator', tagline: 'Brand brief → produce → deliver → get paid',
    mermaid: `flowchart TD
    BRIEF["Brand brief arrives"] --> PARSE["AI-parsed scope, rights, deadline"]
    PARSE --> DEC{"Accept / negotiate / decline"}
    DEC -->|Accept| CON["Auto contract → brand funds escrow"]
    CON --> DRAFT["Submit drafts in portal"]
    DRAFT --> REV{"Brand approves?"}
    REV -->|Revise| DRAFT
    REV -->|Approve| POST["Post / deliver"]
    POST --> REL["Balance released T+1"]
    REL --> FIN["Earnings dashboard: deals, deadlines, payouts"]`,
    widgets: [
      { widget: 'Active deals + deadlines', shows: '48h alerts before a deliverable is due' },
      { widget: 'Rate card editor', shows: 'Per-deliverable pricing shown to brands' },
      { widget: 'Audience metrics', shows: 'Verified followers/engagement feeding the Fit Score' },
      { widget: 'Deliverable tracker', shows: 'Draft → revision → approved → delivered' },
      { widget: 'Earnings / payouts', shows: 'Per-deal escrow status + released balance' },
    ],
    mobileTabs: 'Orders · Calendar · Chat · Earnings · Account',
    linkOut: { href: '/roles/content-creator', label: 'Full content-creator portal guide →' },
  },
  brand: {
    icon: '🏢', color: '#0891B2', bg: '#ECFEFF', title: 'Brand', tagline: 'Find fit → brief → approve → confirm',
    mermaid: `flowchart TD
    SRCH["Search creators + fit score"] --> BR["Send brief"]
    BR --> DEAL["Deal created → fund escrow"]
    DEAL --> APPROVE["Review drafts → approve/revise"]
    APPROVE --> DONE["Confirm live → balance released"]
    DONE --> SPEND["Financial: campaign spend, invoices, take-rate"]`,
    widgets: [
      { widget: 'Active campaigns/deals', shows: 'All running briefs across creators' },
      { widget: 'Deliverable approvals', shows: 'Draft review queue, revision cap enforced' },
      { widget: 'Creator shortlist', shows: 'Saved creators ranked by Fit Score' },
      { widget: 'Spend dashboard', shows: 'Escrowed, released, invoices' },
      { widget: 'Plan', shows: 'Brand / Brand+ entitlements' },
    ],
    mobileTabs: 'Discover · Deals · Chat · Spend · Account',
    linkOut: { href: '/roles/brand', label: 'Full brand portal guide →' },
  },
  agency: {
    icon: '🏛️', color: '#1D4ED8', bg: '#EFF6FF', title: 'Agency', tagline: 'Roster → project → allocate → settle',
    mermaid: `flowchart TD
    ROST["Curate freelancer roster"] --> PROJ["Create project: brief, dates, budget"]
    PROJ --> MATCH["Matching surfaces available freelancers by slot"]
    MATCH --> ALLOC["Allocate freelancers to roles"]
    ALLOC --> ESCM["Escrow per freelancer / per milestone"]
    ESCM --> TRK["Track deliverables + payments in one view"]
    TRK --> SETTLE["Consolidated payouts + reviews"]`,
    widgets: [
      { widget: 'Roster', shows: 'Curated freelancers with their own availability' },
      { widget: 'Projects board', shows: 'Multi-freelancer projects with dates + budget' },
      { widget: 'Allocation view', shows: 'Per-project role assignment against real availability' },
      { widget: 'Consolidated financial', shows: 'Per-freelancer payouts, project budgets, invoices' },
    ],
    mobileTabs: 'Projects · Roster · Chat · Finance · Account',
    linkOut: { href: '/roles/agency', label: 'Full agency portal guide →' },
  },
  'space-renter': {
    icon: '🏛️', color: '#4F46E5', bg: '#EEF2FF', title: 'Space Renter', tagline: 'Browse → book → shoot → review',
    mermaid: `flowchart TD
    BROWSE["Browse + filter spaces"] --> VIEW["View space: photos, amenities, reviews, live calendar"]
    VIEW --> BOOK{"Instant Book or Request-to-Book?"}
    BOOK -->|Instant| CONFIRMED["Confirmed immediately"]
    BOOK -->|Request| WAIT["Host approves within 24h"]
    WAIT --> CONFIRMED
    CONFIRMED --> PAY["Pay: hourly rate + 10% fee → escrow"]
    PAY --> SHOOT["QR check-in → shoot → auto checkout"]
    SHOOT --> REL["Escrow released 24h after shoot"]
    REL --> REV["Bilateral review"]`,
    widgets: [
      { widget: 'Active bookings', shows: 'Upcoming shoots with check-in QR + host contact' },
      { widget: 'Chatbox with host', shows: 'Coordinate access, extensions, house rules' },
      { widget: 'Payments', shows: 'Escrow status, free cancellation window (48h+), invoices' },
      { widget: 'Saved shortlist', shows: 'Compare studios/locations before booking' },
    ],
    mobileTabs: 'Search · Bookings · Chat · Saved · Account',
    linkOut: { href: '/how-it-works/spaces', label: 'Full space rental guide →' },
  },
  'space-owner': {
    icon: '🏛️', color: '#0F62FE', bg: '#EFF4FF', title: 'Space Owner', tagline: 'List → verify → get booked → get paid',
    mermaid: `flowchart TD
    REG["Register → select 'Space Owner'"] --> LIST["List space: type, location, amenities, house rules"]
    LIST --> PHOTO["Upload photos → AI mood / use-case tags"]
    PHOTO --> KYC["KYC + property verification (24–48h)"]
    KYC --> PRICE["Set hourly price + availability + Instant Book toggle"]
    PRICE --> LIVE["Live in search"]
    LIVE --> BOOKING["Booking received"] --> PAYOUT["Escrow released T+1 → weekly payout"]`,
    widgets: [
      { widget: 'Bookings board', shows: 'Confirmed / Request Pending / Completed' },
      { widget: 'Earnings', shows: 'Revenue YTD, in-escrow amounts, monthly net payouts' },
      { widget: 'Listings', shows: 'Active spaces with booking counts + revenue per listing' },
      { widget: 'Analytics', shows: 'Views, bookings, occupancy rate, response rate, rating' },
      { widget: 'Plan', shows: 'Free (1 listing) → Pro (5, instant book) → Studio (unlimited, featured)' },
    ],
    mobileTabs: 'Listings · Bookings · Earnings · Chat · Account',
    linkOut: { href: '/spaces/owner', label: 'Full space owner portal guide →' },
  },
  'gear-renter': {
    icon: '🎥', color: '#7C3AED', bg: '#F5F3FF', title: 'Gear Renter', tagline: 'Browse → deposit → pickup → return',
    mermaid: `flowchart TD
    BROWSE["Browse + filter gear"] --> SPEC["Check specs, condition grade, owner type"]
    SPEC --> PERIOD["Choose day / week rental period"]
    PERIOD --> PAY["Pay rental fee + refundable deposit → escrow"]
    PAY --> PICKUP{"Shop or Individual owner?"}
    PICKUP -->|Shop| WALKIN["Walk-in pickup"]
    PICKUP -->|Individual| CHATIN["In-app chat handoff + photos"]
    WALKIN --> RETURN["Return gear"]
    CHATIN --> RETURN
    RETURN --> INSPECT["Owner 48h inspection window"]
    INSPECT -->|No claim| RELEASE["Deposit auto-released"]
    INSPECT -->|Claim filed| DISPUTE["Dispute → team mediates"]`,
    widgets: [
      { widget: 'Active rentals', shows: 'Pickup/return dates, deposit-held amount' },
      { widget: 'Chat with owner', shows: 'Handoff coordination, timestamped condition photos' },
      { widget: 'Deposit tracker', shows: '"Held in escrow · 48h inspection" → "Auto-released ✓"' },
      { widget: 'Protection add-on', shows: 'Optional +8% rental protection insurance at checkout' },
    ],
    mobileTabs: 'Search · Rentals · Chat · Saved · Account',
    linkOut: { href: '/how-it-works/gear', label: 'Full gear rental guide →' },
  },
  'gear-owner': {
    icon: '🔧', color: '#7C3AED', bg: '#F5F3FF', title: 'Gear Owner', tagline: 'List → deposit setup → rent → get paid',
    mermaid: `flowchart TD
    REG["Register → select 'Gear Owner' (Shop / Individual)"] --> LIST["List gear: brand, specs, condition, photos"]
    LIST --> KYC["KYC + ownership proof (24–48h)"]
    KYC --> PRICE["Set day/week pricing + damage deposit"]
    PRICE --> AVAIL["Manage availability calendar"]
    AVAIL --> RENTAL["Rental received — renter pays upfront"]
    RENTAL --> WEEKLY["Rental fee paid weekly"]
    RENTAL --> DEP["Deposit held in escrow → 48h inspection → auto-release or claim"]`,
    widgets: [
      { widget: 'Overview', shows: 'Revenue, active rentals, deposit held, listing views' },
      { widget: 'Rentals', shows: 'History with deposit status bar per rental' },
      { widget: 'Inventory', shows: 'Gear items with availability + monthly revenue' },
      { widget: 'Analytics', shows: 'Views, rental count, utilization rate, disputes, rating' },
      { widget: 'Plan', shows: 'Free (2 items) → Pro (20, instant book) → Shop (unlimited, API access)' },
    ],
    mobileTabs: 'Inventory · Rentals · Earnings · Chat · Account',
    linkOut: { href: '/gear/owner', label: 'Full gear owner portal guide →' },
  },
  admin: {
    icon: '🔧', color: '#374151', bg: '#F9FAFB', title: 'Admin / Moderator / Trust Officer', tagline: 'Keep every order, dispute, and rupee safe',
    mermaid: `flowchart TD
    Q["Queues: KYC, moderation, disputes"] --> REV["Review item"]
    REV --> ACT{Action}
    ACT --> KYC["Approve/reject verification"]
    ACT --> MOD["Approve/remove content/review"]
    ACT --> DIS["Resolve dispute → release/refund/split"]
    ACT --> FIN["Finance: payouts, refunds, invoices, tax exports"]
    KYC & MOD & DIS & FIN --> AUD["Every action → audit_log"]`,
    widgets: [
      { widget: 'Platform KPIs', shows: 'GMV, active orders, dispute rate, MRR — across bookings, brand deals, and rentals' },
      { widget: 'KYC queue', shows: 'Aadhaar/DigiLocker + property/ownership verification approvals' },
      { widget: 'Moderation queue', shows: 'Flagged reviews/content' },
      { widget: 'Disputes', shows: 'Evidence window → ruling → refund/release/split — including gear damage claims' },
      { widget: 'Finance console', shows: 'Payouts, refunds, invoices, tax exports' },
      { widget: 'Audit log', shows: 'Every action across every role, immutable' },
    ],
    mobileTabs: 'Web-only — desktop console',
    linkOut: { href: '/roles/admin', label: 'Full admin console guide →' },
  },
}

const GROUPS: { id: string; label: string; desc: string; keys: RoleKey[] }[] = [
  { id: 'start',   label: '1 · Getting Started',       desc: 'Before an account exists at all.', keys: ['visitor'] },
  { id: 'core',    label: '2 · Book & Create',          desc: 'Photography/video bookings and brand deals.', keys: ['client', 'creator', 'content-creator', 'brand', 'agency'] },
  { id: 'rentals', label: '3 · Space & Gear Rentals',    desc: 'A parallel vertical — same trust/escrow rails, different inventory.', keys: ['space-renter', 'space-owner', 'gear-renter', 'gear-owner'] },
  { id: 'ops',     label: '4 · Operations',              desc: 'Invite-only roles that keep everything above safe.', keys: ['admin'] },
]

export default function FlowRolesPage() {
  const [activeGroup, setActiveGroup] = useState('start')
  const [activeRole, setActiveRole] = useState<RoleKey>('visitor')

  const group = GROUPS.find(g => g.id === activeGroup)!
  const r = ROLE_JOURNEYS[activeRole]

  const selectGroup = (gid: string) => {
    setActiveGroup(gid)
    const g = GROUPS.find(x => x.id === gid)!
    setActiveRole(g.keys[0])
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/flow" />
      <FlowSubNav />

      <section style={{ paddingTop: '56px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(124,58,237,0.3)', marginBottom: '20px', background: '#F5F3FF' }}>
          <span>👥</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#7C3AED', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Same shell, different data</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.045em', lineHeight: 1.1, marginBottom: '16px' }}>
          11 journeys. Four shared building blocks.
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--color-muted)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.75 }}>
          Every portal — booking a creator, renting a studio, renting a lens, or moderating a dispute — is built from the same four blocks: an <strong>Available-Slots widget</strong>, <strong>order/booking intake</strong>, an <strong>Accept/Decline</strong> step, a <strong>chatbox</strong>, and a <strong>financial dashboard</strong>. What differs per role is only <em>what flows through them</em>.
        </p>
      </section>

      {/* Shared blocks */}
      <section style={{ padding: '0 24px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '10px' }}>
          {[
            { icon: '📆', t: 'Available-Slots widget', d: 'Live OPEN/HELD/BOOKED calendar — for a creator date, a studio hour, or a gear day' },
            { icon: '📥', t: 'Order/booking intake', d: 'New booking, inquiry, or rental request lands with push/SMS/email' },
            { icon: '✅', t: 'Accept / Decline', d: 'Moves the relevant state machine forward or reopens the slot' },
            { icon: '💬', t: 'Chatbox', d: 'Real-time, per-order, with attachments + audit trail' },
            { icon: '💰', t: 'Financial dashboard', d: 'Earnings/spend, escrow + deposit status, payouts, invoices, take-rate' },
          ].map(b => (
            <div key={b.t} style={{ padding: '14px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>{b.icon}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)', marginBottom: '3px' }}>{b.t}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Group selector */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {GROUPS.map(g => {
            const isActiveGroup = activeGroup === g.id
            return (
              <div key={g.id}>
                <button onClick={() => selectGroup(g.id)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
                  padding: '13px 18px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                  background: isActiveGroup ? 'var(--color-surface)' : 'transparent',
                  border: `1.5px solid ${isActiveGroup ? 'var(--color-hairline)' : 'transparent'}`,
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13.5px', color: 'var(--color-ink)' }}>{g.label}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-muted)', marginTop: '2px' }}>{g.desc}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2.5" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isActiveGroup ? 'rotate(180deg)' : '' }}><path d="m6 9 6 6 6-6" /></svg>
                </button>
                {isActiveGroup && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '10px 8px 4px' }}>
                    {g.keys.map(k => {
                      const meta = ROLE_JOURNEYS[k]
                      const active = activeRole === k
                      return (
                        <button key={k} onClick={() => setActiveRole(k)} style={{
                          display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '11px',
                          background: active ? meta.bg : 'var(--color-surface)',
                          border: active ? `1.5px solid ${meta.color}44` : '1.5px solid var(--color-hairline)',
                          fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12.5px',
                          color: active ? meta.color : 'var(--color-muted)',
                          cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                        }}><span style={{ fontSize: '15px' }}>{meta.icon}</span>{meta.title}</button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', color: r.color, marginBottom: '4px' }}>{r.title}</h2>
          <p style={{ fontSize: '13px', color: 'var(--color-muted)' }}>{r.tagline}</p>
        </div>

        <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start', marginBottom: '24px' }}>
          <div style={{ borderRadius: '14px', border: '1px solid var(--color-hairline)', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <MermaidDiagram code={r.mermaid} id={`role-journey-${activeRole}`} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: r.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Dashboard widgets</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {r.widgets.map(w => (
                <div key={w.widget} style={{ padding: '10px 13px', borderRadius: '10px', background: r.bg, border: `1px solid ${r.color}22` }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: r.color }}>{w.widget}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-muted)', marginTop: '2px' }}>{w.shows}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: r.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Mobile tabs</div>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: 'var(--color-ink)', marginBottom: '18px' }}>{r.mobileTabs}</div>
            <Link href={r.linkOut.href} style={{ display: 'inline-flex', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: r.color, textDecoration: 'none' }}>{r.linkOut.label}</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '40px', textAlign: 'center' }}>
        <Link href="/flow/systems" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: '#0891B2', textDecoration: 'none', padding: '13px 26px', borderRadius: '10px' }}>Next: the shared systems every role relies on →</Link>
      </section>
    </div>
  )
}
