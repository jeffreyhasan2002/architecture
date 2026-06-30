'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

const DISPUTES = [
  { id: 'DSP-0419', parties: 'Client (Rohit K.) vs Creator (Vikram D.)', type: 'Non-delivery', value: 85000, status: 'Evidence collection', statusColor: '#D97706', statusBg: '#FFFBEB', opened: '3d ago', deadline: '1d remaining' },
  { id: 'DSP-0418', parties: 'Brand (StyleMax) vs Creator (Arun K.)', type: 'Deliverable mismatch', value: 120000, status: 'Under ruling', statusColor: '#0F62FE', statusBg: '#EFF4FF', opened: '5d ago', deadline: 'Due today' },
  { id: 'DSP-0415', parties: 'Client (Preethi M.) vs Creator (Studio Lens)', type: 'Partial delivery', value: 48000, status: 'Resolved', statusColor: '#059669', statusBg: '#ECFDF5', opened: '9d ago', deadline: 'Closed', ruling: '60/40 split' },
]

export default function TrustOfficerPage() {
  const [dashTab, setDashTab] = useState('disputes')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/trust-officer" />

      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(220,38,38,0.3)', marginBottom: '24px', background: '#FFF1F0' }}>
          <span style={{ fontSize: '16px' }}>⚖️</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#DC2626', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Trust Officer Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Resolve disputes.<br />
          <span style={{ color: '#DC2626' }}>Protect the trust layer.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.05rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Trust Officers are Sceneora's dispute resolution specialists. When escrow-protected transactions are contested, Trust Officers review evidence from both parties and issue binding rulings — determining refunds, partial payouts, or full release to the creator.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { val: '< 2%', label: 'Bookings end in dispute' },
            { val: '72h', label: 'Evidence window' },
            { val: '85%+', label: 'Resolution satisfaction' },
            { val: 'Binding', label: 'Rulings (escrowed funds)' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#DC2626', letterSpacing: '-0.025em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px', maxWidth: '110px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dispute Flow */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>The Dispute Resolution Flow</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '32px' }}>Every dispute follows this structured, fair process.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { icon: '🚨', step: '01', title: 'Dispute Raised', desc: 'Either party (client or creator) raises a dispute through the platform. Escrow is frozen — no payout until resolution. Both parties are notified immediately.' },
            { icon: '📁', step: '02', title: 'Evidence Collection (72 hours)', desc: 'Both parties submit evidence: chat logs, contracts, delivery timestamps, gallery links, screenshots. The 72-hour window is strictly enforced.' },
            { icon: '⚖️', step: '03', title: 'Under Review', desc: 'Trust Officer reviews all submitted evidence against the auto-generated contract. Scope of work, delivery timelines, and revision rounds are verified.' },
            { icon: '📋', step: '04', title: 'Ruling Issued', desc: 'Three possible outcomes: (a) Full refund to client, (b) Full release to creator, (c) Partial split (e.g., 60/40) based on evidence weight.' },
            { icon: '💸', step: '05', title: 'Escrow Settled', desc: 'Ruling is executed automatically. Funds route to the ruled parties. Payout processes T+1. Both parties receive a resolution summary.' },
            { icon: '🛡️', step: '06', title: 'Trust Score Impact', desc: 'The responsible party\'s reliability score and trust score are updated. Repeat violations can result in listing suspension or platform removal.' },
          ].map((s, i) => (
            <div key={s.step} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', position: 'relative', paddingBottom: i < 5 ? '24px' : '0' }}>
              {i < 5 && <div style={{ position: 'absolute', left: '21px', top: '48px', bottom: '0', width: '2px', background: 'linear-gradient(to bottom,#DC262644,transparent)' }} />}
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF1F0', border: '2px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, position: 'relative', zIndex: 1 }}>{s.icon}</div>
              <div style={{ flex: 1, padding: '14px 18px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-hairline)', marginBottom: i < 5 ? '8px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: '#DC2626', fontWeight: 700 }}>{s.step}</span>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{s.title}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard with tabs */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '28px' }}>Trust Officer Console Preview</h2>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ background: '#FFF1F0', borderBottom: '1px solid rgba(220,38,38,0.2)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#7F1D1D' }}>Trust Officer Console — Sceneora</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#D97706', background: '#FFFBEB', padding: '4px 10px', borderRadius: '100px' }}>2 open</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#DC2626', background: '#FFF1F0', padding: '4px 10px', borderRadius: '100px', border: '1px solid #DC262633' }}>1 ruling due today</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {[
              { id: 'disputes', label: 'Active',    badge: '2' },
              { id: 'evidence', label: 'Evidence',  badge: '1' },
              { id: 'resolved', label: 'Resolved',  badge: null },
              { id: 'escalated', label: 'Escalated', badge: null },
            ].map(t => (
              <button key={t.id} onClick={() => setDashTab(t.id)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: dashTab === t.id ? '#DC2626' : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === t.id ? '2px solid #DC2626' : '2px solid transparent',
                marginBottom: '-1px', display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                {t.label}
                {t.badge && <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', background: '#DC2626', color: '#fff', padding: '1px 6px', borderRadius: '100px', fontWeight: 700 }}>{t.badge}</span>}
              </button>
            ))}
          </div>

          <div style={{ padding: '24px' }}>
            {dashTab === 'disputes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {DISPUTES.filter(d => d.status !== 'Resolved').map(d => (
                  <div key={d.id} style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-bg)', border: `1px solid #DC262622` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: 'var(--color-muted)' }}>{d.id}</span>
                          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: d.statusColor, background: d.statusBg, padding: '3px 10px', borderRadius: '100px' }}>{d.status}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '4px' }}>{d.type}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{d.parties}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: '#DC2626' }}>₹{d.value.toLocaleString()}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: d.deadline === 'Due today' ? '#DC2626' : 'var(--color-muted)' }}>{d.opened} · {d.deadline}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '7px 16px', borderRadius: '8px', background: '#DC2626', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Review Case</button>
                      <button style={{ padding: '7px 16px', borderRadius: '8px', background: 'transparent', color: '#DC2626', border: '1px solid #DC262633', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Issue Ruling</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {dashTab === 'evidence' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { case: 'DSP-0419', party: 'Client (Rohit K.)', items: ['Chat log (47 messages)', 'Booking confirmation receipt'], submitted: '18h ago', pending: 'Creator evidence due in 6h' },
                  { case: 'DSP-0419', party: 'Creator (Vikram D.)', items: ['Partial gallery link (32 images)'], submitted: 'Due in 6h', pending: null },
                ].map((e, i) => (
                  <div key={i} style={{ padding: '14px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)', marginBottom: '6px' }}>{e.case} · {e.party}</div>
                    {e.items.map(item => (
                      <div key={item} style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', padding: '4px 8px', background: '#F8FAFC', borderRadius: '6px', marginBottom: '4px' }}>📎 {item}</div>
                    ))}
                    {e.pending && <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#DC2626', marginTop: '6px' }}>⏳ {e.pending}</div>}
                  </div>
                ))}
              </div>
            )}
            {dashTab === 'resolved' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '18px', borderRadius: '14px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: 'var(--color-muted)' }}>DSP-0415</span>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '4px' }}>Partial delivery</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>Client (Preethi M.) vs Creator (Studio Lens)</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: '#059669' }}>Resolved</div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#059669' }}>Ruling: 60/40 split · ₹48,000</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dashTab === 'escalated' && (
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📤</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '6px' }}>No escalations pending</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>Cases involving legal, regulatory, or criminal matters are escalated to Admin. No active escalations from this officer's queue.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Onboarding section */}
      <section id="onboarding" style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#FFF1F0,#FEE2E2)', borderRadius: '20px', padding: '40px', border: '1px solid rgba(220,38,38,0.15)' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '8px', color: '#7F1D1D' }}>Trust Officer Onboarding</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: '#DC2626', marginBottom: '28px' }}>Trust Officers are appointed by Admins. The role requires legal/policy training before accessing dispute resolution tools.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
            {[
              { step: '1', icon: '📧', label: 'Role invite', desc: 'Admin sends a scoped invite. No public registration — internal appointment only.' },
              { step: '2', icon: '🔐', label: 'Setup credentials', desc: '2FA required. Trust Officers have escrow-level access; security is mandatory.' },
              { step: '3', icon: '⚖️', label: 'Dispute training', desc: 'Complete dispute resolution protocol and escrow release policy guidelines.' },
              { step: '4', icon: '💸', label: 'Console access', desc: 'Access granted: dispute queue, evidence viewer, ruling tools, and escrow release.' },
            ].map(s => (
              <div key={s.step} style={{ padding: '18px', borderRadius: '14px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(220,38,38,0.15)' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{s.icon}</span>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#7F1D1D', marginBottom: '6px' }}>Step {s.step} · {s.label}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#DC2626', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'trust-officer').map(r => (
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
