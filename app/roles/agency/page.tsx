'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

export default function AgencyPage() {
  const [dashTab, setDashTab] = useState('projects')
  const [compTab, setCompTab] = useState('agency')

  const COMPARISON = {
    agency: {
      title: 'Agency',
      color: '#1D4ED8',
      bg: '#EFF6FF',
      desc: 'A business entity managing multiple creator/freelancer relationships, client accounts, and projects simultaneously — typically with a structured team.',
      traits: [
        'Manages a curated roster of 10–200+ freelancers',
        'Has its own client accounts (brands, event planners)',
        'Allocates freelancers to projects from a central dashboard',
        'Issues its own invoices to clients (client pays agency, agency pays freelancers)',
        'Monitors deliverables, timelines, and quality across multiple projects',
        'May operate under a brand name (e.g., "FrameCraft Media")',
        'Can have sub-roles: account managers, creative directors, project coordinators',
        'Often handles creative direction, post-production coordination',
      ],
      examples: ['Wedding photography agency with 20 associate photographers', 'Content agency with 50 UGC creators on roster', 'Commercial production house managing events'],
    },
    studio: {
      title: 'Studio',
      color: '#7C3AED',
      bg: '#F5F3FF',
      desc: 'A physical or brand-driven creative space — typically a single-owner or small-team setup with a strong individual brand. Studios often list their space AND their creative services together.',
      traits: [
        'Usually owner-operated (1–5 people)',
        'Has a physical studio space + creative services',
        'May list the studio space for rent AND book shoots within it',
        'Takes bookings under the studio brand name',
        'Portfolio reflects a consistent house style/aesthetic',
        'May have 1–3 associate photographers/videographers',
        'Often specializes in a niche (newborn, fashion, commercial)',
        'Runs like a Creator with a Studio Plan — not a full Agency',
      ],
      examples: ['Boutique wedding studio (2 photographers, 1 editor)', 'Product photography studio with a dedicated set', 'Newborn / maternity photography studio'],
    },
    why_same: 'Both Agencies and Studios use the same role portal because they share the core need: managing multiple creators/team members under one account, accepting bookings under a brand name, and coordinating deliverables across projects. The difference is scale, structure, and ownership model — not the platform features they need.',
  }

  const MOCK_PROJECTS = [
    { name: 'Kapoor Wedding — Jaipur', client: 'Kapoor Family', date: 'Aug 15, 2026', team: ['Arjun M', 'Priya N'], status: 'Confirmed', statusColor: '#059669', statusBg: '#ECFDF5', value: 280000 },
    { name: 'StyleMax Product Campaign', client: 'StyleMax Brand', date: 'Aug 5–8, 2026', team: ['Rahul S', 'Sneha I', 'Arun K'], status: 'In Progress', statusColor: '#0F62FE', statusBg: '#EFF4FF', value: 420000 },
    { name: 'Hyderabad Tech Summit', client: 'EventPro India', date: 'Sep 2, 2026', team: ['Vikram D'], status: 'Planning', statusColor: '#D97706', statusBg: '#FFFBEB', value: 95000 },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/agency" />

      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(29,78,216,0.3)', marginBottom: '24px', background: '#EFF6FF' }}>
          <span style={{ fontSize: '16px' }}>🏛️</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#1D4ED8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Agency / Studio Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Manage your team.<br />
          <span style={{ color: '#1D4ED8' }}>Scale your projects.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Agencies and Studios use Sceneora to build a curated freelancer roster, allocate talent to projects, manage multi-deliverable campaigns, track payouts, and run everything from one dashboard — replacing the chaos of group WhatsApp, shared sheets, and manual invoicing.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: '#1D4ED8', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', boxShadow: '0 4px 18px rgba(29,78,216,0.32)' }}>Start Onboarding →</Link>
          <Link href="#agency-vs-studio" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)', background: 'var(--color-surface)', textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', border: '1px solid var(--color-hairline)' }}>Agency vs Studio →</Link>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px' }}>
          {[
            { val: '200+',   label: 'Freelancers per roster max',  icon: '👥' },
            { val: '∞',      label: 'Concurrent projects',         icon: '📋' },
            { val: 'Escrow', label: 'Per-freelancer payments',      icon: '🔒' },
            { val: 'T+1',    label: 'Payout settlement',           icon: '💸' },
            { val: '1 view', label: 'All projects, one dashboard', icon: '📊' },
          ].map(s => (
            <div key={s.label} style={{ padding: '10px 18px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontSize: '16px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1rem', color: '#1D4ED8', letterSpacing: '-0.02em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Agency vs Studio — Key Explainer */}
      <section id="agency-vs-studio" style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden' }}>
          <div style={{ padding: '32px 40px', borderBottom: '1px solid var(--color-hairline)', background: 'linear-gradient(135deg,#EFF6FF,#F5F3FF)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.025em', color: 'var(--color-ink)' }}>Agency vs Studio — What's the Difference?</span>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', maxWidth: '680px', lineHeight: 1.7 }}>
              Both use the same role portal on Sceneora. Here's why — and what makes them different:
            </p>
          </div>

          {/* Tab switcher */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {(['agency', 'studio'] as const).map(tab => (
              <button key={tab} onClick={() => setCompTab(tab)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: compTab === tab ? COMPARISON[tab].color : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: compTab === tab ? `2px solid ${COMPARISON[tab].color}` : '2px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize',
              }}>{COMPARISON[tab].title}</button>
            ))}
          </div>

          <div style={{ padding: '32px 40px' }}>
            {(['agency', 'studio'] as const).map(tab => compTab === tab && (
              <div key={tab}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', background: COMPARISON[tab].bg, border: `1px solid ${COMPARISON[tab].color}33`, marginBottom: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: COMPARISON[tab].color }}>{COMPARISON[tab].title}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-ink)', lineHeight: 1.7, marginBottom: '20px' }}>{COMPARISON[tab].desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {COMPARISON[tab].traits.map((t, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7" fill={`${COMPARISON[tab].color}22`} /><path d="M5 8l2 2 4-4" stroke={COMPARISON[tab].color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>Real-world examples</div>
                    {COMPARISON[tab].examples.map((ex, i) => (
                      <div key={i} style={{ padding: '14px 16px', borderRadius: '10px', background: COMPARISON[tab].bg, border: `1px solid ${COMPARISON[tab].color}22`, marginBottom: '10px', fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-ink)' }}>
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why same role */}
          <div style={{ padding: '24px 40px', background: '#FFFBEB', borderTop: '1px solid #FDE68A' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>💡</span>
              <div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#92400E', marginBottom: '6px' }}>Why are Agency and Studio the same role on Sceneora?</div>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#78350F', lineHeight: 1.65, margin: 0 }}>{COMPARISON.why_same}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '32px' }}>How Agencies Work on Sceneora</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '16px' }}>
          {[
            { icon: '🏗️', step: '01', title: 'Build Your Roster', desc: 'Invite freelancers to your agency roster. Each freelancer has their own profile and KYC — you manage allocation.' },
            { icon: '📋', step: '02', title: 'Create a Project', desc: 'Add project: client name, brief, dates, budget, team size needed. Matching engine surfaces available freelancers from your roster.' },
            { icon: '👥', step: '03', title: 'Allocate Freelancers', desc: 'Assign specific freelancers to roles within the project. Slot machine checks for conflicts automatically.' },
            { icon: '🔒', step: '04', title: 'Escrow Per Freelancer', desc: 'Client pays the agency. Agency allocates per-freelancer or per-milestone escrow. Payments are tracked per project.' },
            { icon: '📊', step: '05', title: 'Track Deliverables', desc: 'All deliverables, revision requests, and client approvals are tracked in the project view. No email chains.' },
            { icon: '💸', step: '06', title: 'Settle Payouts & Reviews', desc: 'Once project closes, payout to each freelancer. Both agency and freelancer earn reviews. Trust scores update.' },
          ].map(s => (
            <div key={s.step} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#1D4ED844'; el.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = '' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#1D4ED8', fontWeight: 700 }}>{s.step}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px' }}>{s.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '28px' }}>Agency Dashboard Preview</h2>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ background: '#EFF6FF', borderBottom: '1px solid rgba(29,78,216,0.2)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#1E3A8A' }}>FrameCraft Media — Agency Dashboard</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#3730A3', marginTop: '2px' }}>18 freelancers on roster · 3 active projects · ₹7,95,000 this month</div>
            </div>
            <button style={{ padding: '8px 18px', borderRadius: '8px', background: '#1D4ED8', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>+ New Project</button>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {['projects', 'roster', 'payouts'].map(tab => (
              <button key={tab} onClick={() => setDashTab(tab)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: dashTab === tab ? '#1D4ED8' : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === tab ? '2px solid #1D4ED8' : '2px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ padding: '24px' }}>
            {dashTab === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MOCK_PROJECTS.map(p => (
                  <div key={p.name} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '3px' }}>{p.name}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>Client: {p.client} · {p.date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: p.statusColor, background: p.statusBg, padding: '4px 10px', borderRadius: '100px' }}>{p.status}</span>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: '#1D4ED8', marginTop: '6px' }}>₹{p.value.toLocaleString()}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>Team:</span>
                      {p.team.map(name => (
                        <span key={name} style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#1D4ED8', background: '#EFF6FF', padding: '2px 10px', borderRadius: '100px' }}>{name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {dashTab === 'roster' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Arjun Mehta', role: 'Photographer', avail: 'Available Aug 12', trust: 96, status: 'Active' },
                  { name: 'Priya Nair', role: 'Photographer', avail: 'Booked Jul 28', trust: 94, status: 'Booked' },
                  { name: 'Rahul Sharma', role: 'Videographer', avail: 'Available', trust: 98, status: 'Active' },
                  { name: 'Sneha Iyer', role: 'Content Creator', avail: 'Available', trust: 91, status: 'Active' },
                  { name: 'Vikram Das', role: 'Photographer', avail: 'Leave Jul 20–31', trust: 88, status: 'Unavailable' },
                ].map(f => (
                  <div key={f.name} style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{f.name}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{f.role} · {f.avail}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#1D4ED8' }}>Trust {f.trust}%</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: f.status === 'Active' ? '#059669' : f.status === 'Booked' ? '#0F62FE' : '#DC2626', background: f.status === 'Active' ? '#ECFDF5' : f.status === 'Booked' ? '#EFF4FF' : '#FFF1F0', padding: '3px 9px', borderRadius: '100px' }}>{f.status}</span>
                    <button style={{ padding: '5px 12px', borderRadius: '6px', background: 'transparent', border: '1px solid #1D4ED844', color: '#1D4ED8', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>Assign</button>
                  </div>
                ))}
              </div>
            )}
            {dashTab === 'payouts' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                {[
                  { label: 'Total Payouts Due', val: '₹3,85,000', color: '#1D4ED8' },
                  { label: 'In Escrow', val: '₹7,95,000', color: '#D97706' },
                  { label: 'Paid This Month', val: '₹4,10,000', color: '#059669' },
                ].map(s => (
                  <div key={s.label} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: s.color }}>{s.val}</div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '6px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="onboarding" style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)', borderRadius: '24px', padding: '56px 48px', color: '#fff' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Agency / Studio Onboarding</span>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.025em', marginBottom: '14px', marginTop: '16px' }}>Same onboarding. All roles start here.</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '36px', maxWidth: '540px', lineHeight: 1.7 }}>
            Register your agency or studio, invite your team, set up your roster, and start accepting projects within 24 hours. The onboarding wizard identifies whether you're an agency or studio and configures your dashboard accordingly.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#1D4ED8', background: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer' }}>Start Onboarding →</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'agency').map(r => (
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
