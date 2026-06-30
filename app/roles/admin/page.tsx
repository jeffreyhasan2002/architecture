'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

export default function AdminPage() {
  const [dashTab, setDashTab] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/admin" />

      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(31,41,55,0.3)', marginBottom: '24px', background: '#F9FAFB' }}>
          <span style={{ fontSize: '16px' }}>🔧</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#1F2937', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Admin Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Full platform control.<br />
          <span style={{ color: '#1F2937' }}>Every lever. Every metric.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.05rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Admins have full access to all platform operations: user management, KYC queues, financial reconciliation, payout management, moderation oversight, dispute records, audit logs, subscription management, and real-time platform KPIs.
        </p>

        {/* KPI strip */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { val: '₹4.2Cr',  label: 'Monthly GMV',          icon: '💰' },
            { val: '1.8%',    label: 'Dispute rate (target <2%)', icon: '⚖️' },
            { val: '4 KYC',   label: 'Pending verifications', icon: '🪪' },
            { val: '99.97%',  label: 'Platform uptime SLO',  icon: '🟢' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px 20px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: '#1F2937', letterSpacing: '-0.025em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px', maxWidth: '100px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Dashboard */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '28px' }}>Admin Console Preview</h2>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          {/* Top bar */}
          <div style={{ background: '#111827', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: '#fff' }}>SCENEORA</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#374151', background: '#F9FAFB', padding: '2px 8px', borderRadius: '4px' }}>Admin Console</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#F59E0B', background: 'rgba(245,158,11,0.15)', padding: '4px 12px', borderRadius: '100px' }}>🔔 4 KYC pending</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#F87171', background: 'rgba(248,113,113,0.15)', padding: '4px 12px', borderRadius: '100px' }}>⚠️ 2 disputes open</span>
            </div>
          </div>

          {/* Sidebar + Content layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
            {/* Sidebar */}
            <div style={{ background: '#1F2937', padding: '16px 0', minHeight: '500px' }}>
              {[
                { icon: '📊', label: 'Overview', key: 'overview' },
                { icon: '👥', label: 'Users & KYC', key: 'users' },
                { icon: '💳', label: 'Finance', key: 'finance' },
                { icon: '🛡️', label: 'Moderation', key: 'moderation' },
                { icon: '⚖️', label: 'Disputes', key: 'disputes' },
                { icon: '📋', label: 'Audit Log', key: 'audit' },
              ].map(item => (
                <button key={item.key} onClick={() => setDashTab(item.key)} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 16px',
                  background: dashTab === item.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  borderLeft: dashTab === item.key ? '3px solid #60A5FA' : '3px solid transparent',
                }}>
                  <span style={{ fontSize: '14px' }}>{item.icon}</span>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: dashTab === item.key ? 700 : 500, fontSize: '13px', color: dashTab === item.key ? '#fff' : '#9CA3AF' }}>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              {dashTab === 'overview' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>Platform KPIs — Last 30 days</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px', marginBottom: '24px' }}>
                    {[
                      { icon: '💰', label: 'GMV (30d)', val: '₹2.4Cr', trend: '+28%', color: '#059669' },
                      { icon: '📅', label: 'Bookings', val: '1,841', trend: '+34%', color: '#0F62FE' },
                      { icon: '👥', label: 'New Users', val: '4,290', trend: '+22%', color: '#7C3AED' },
                      { icon: '📷', label: 'Active Creators', val: '12,441', trend: '+18%', color: '#D97706' },
                      { icon: '⭐', label: 'Review Rate', val: '68%', trend: '+3pp', color: '#059669' },
                      { icon: '⚖️', label: 'Dispute Rate', val: '1.7%', trend: '-0.2pp', color: '#DC2626' },
                    ].map(s => (
                      <div key={s.label} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                        <div style={{ fontSize: '18px', marginBottom: '8px' }}>{s.icon}</div>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.3rem', color: s.color, letterSpacing: '-0.025em' }}>{s.val}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '3px' }}>{s.label}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: s.color, marginTop: '3px' }}>{s.trend}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '16px', borderRadius: '12px', background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#92400E', marginBottom: '8px' }}>🚀 Platform Health</div>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'API Uptime (30d)', val: '99.98%', ok: true },
                        { label: 'Avg API Response', val: '142ms', ok: true },
                        { label: 'Failed Payments', val: '0.3%', ok: true },
                        { label: 'Pending KYC', val: '4', ok: false },
                      ].map(h => (
                        <div key={h.label}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.1rem', color: h.ok ? '#059669' : '#D97706' }}>{h.val}</div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#78350F' }}>{h.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {dashTab === 'users' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>KYC Verification Queue</div>
                  {[
                    { name: 'Karthik S.', role: 'Creator', submitted: '2h ago', type: 'Aadhaar + Face', status: 'Pending', statusColor: '#D97706' },
                    { name: 'Leela Fashion Studio', role: 'Agency', submitted: '5h ago', type: 'Business Registration', status: 'Pending', statusColor: '#D97706' },
                    { name: 'Arun Krishnan', role: 'Content Creator', submitted: '1d ago', type: 'Aadhaar + PAN', status: 'Under Review', statusColor: '#0F62FE' },
                    { name: 'Priya Photography', role: 'Creator', submitted: '2d ago', type: 'Aadhaar + Face', status: 'Approved', statusColor: '#059669' },
                  ].map(u => (
                    <div key={u.name} style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', marginBottom: '8px', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{u.name}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{u.role} · {u.type} · {u.submitted}</div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: u.statusColor }}>{u.status}</span>
                      <button style={{ padding: '5px 12px', borderRadius: '6px', background: '#1F2937', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', cursor: 'pointer', opacity: u.status === 'Approved' ? 0.4 : 1 }}>Review</button>
                      <button style={{ padding: '5px 12px', borderRadius: '6px', background: '#059669', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', cursor: 'pointer', opacity: u.status === 'Approved' ? 0.4 : 1 }}>Approve</button>
                    </div>
                  ))}
                </div>
              )}

              {dashTab === 'finance' && (
                <div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>Financial Overview</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    {[
                      { label: 'GMV (30d)', val: '₹2.4Cr', color: '#059669' },
                      { label: 'Platform Revenue (take-rate)', val: '₹24L', color: '#0F62FE' },
                      { label: 'Payouts Pending', val: '₹18.6L', color: '#D97706' },
                    ].map(s => (
                      <div key={s.label} style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', color: s.color, marginBottom: '6px' }}>{s.val}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>
                    Full payout ledger, refund management, GST/TDS computation, invoice generation, and Razorpay reconciliation available in the live admin console.
                  </div>
                </div>
              )}

              {['moderation', 'disputes', 'audit'].includes(dashTab) && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-muted)' }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{dashTab === 'moderation' ? '🛡️' : dashTab === 'disputes' ? '⚖️' : '📋'}</div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '6px' }}>
                    {dashTab === 'moderation' ? 'Content moderation queue and actions' :
                      dashTab === 'disputes' ? 'All open and resolved disputes with ruling history' :
                        'Full immutable audit log of all admin and platform actions'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px' }}>Available in the live admin console. See <Link href="/roles/moderator" style={{ color: '#0F62FE' }}>Moderator</Link> and <Link href="/roles/trust-officer" style={{ color: '#DC2626' }}>Trust Officer</Link> pages for details.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Daily Flow */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Admin Daily Operations Flow</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '32px' }}>How a Sceneora Admin keeps the platform healthy every day.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { icon: '📊', step: '01', title: 'Morning KPI Review', desc: 'Admin opens the console to review overnight activity: GMV, new bookings, new user signups, any failed payments, dispute rate, and API uptime. Red metrics trigger immediate investigation.' },
            { icon: '🪪', step: '02', title: 'Process KYC Queue', desc: 'Review pending Aadhaar/PAN/face verification requests. Approve verified profiles or flag for re-submission. Verified creators unlock higher search ranking — delays in KYC directly impact creator earnings.' },
            { icon: '💰', step: '03', title: 'Finance & Payout Reconciliation', desc: 'Review payout queue. Verify escrow positions match booking ledger. Trigger any held payouts. Check for failed UPI transfers and retry or escalate. Review GST/TDS deductions for accuracy.' },
            { icon: '🛡️', step: '04', title: 'Moderation Oversight', desc: 'Review moderation queue stats. Check if any high-severity reports are unresolved past SLA (4h). Override moderator decisions if needed. Review policy edge cases flagged by moderators for guidelines update.' },
            { icon: '⚖️', step: '05', title: 'Dispute & Trust Review', desc: 'Review active disputes — especially any past the evidence collection window. Ensure Trust Officers are unblocked. Review resolved disputes for payout accuracy. Check if platform trust health metrics are trending correctly.' },
            { icon: '📋', step: '06', title: 'Audit & Compliance Log', desc: 'All admin actions are auto-logged with user ID, timestamp, before/after state, and IP address. Weekly compliance export for legal/finance. DPDP Act 2023 data access requests are processed here.' },
          ].map((s, i, arr) => (
            <div key={s.step} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', position: 'relative', paddingBottom: i < arr.length - 1 ? '24px' : '0' }}>
              {i < arr.length - 1 && <div style={{ position: 'absolute', left: '21px', top: '48px', bottom: '0', width: '2px', background: 'linear-gradient(to bottom,#37415144,transparent)' }} />}
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F9FAFB', border: '2px solid rgba(55,65,81,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, position: 'relative', zIndex: 1 }}>{s.icon}</div>
              <div style={{ flex: 1, padding: '14px 18px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-hairline)', marginBottom: i < arr.length - 1 ? '8px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: '#374151', fontWeight: 700 }}>{s.step}</span>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{s.title}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Capabilities */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '28px' }}>Full Admin Capabilities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
          {[
            { icon: '👥', title: 'User Management', desc: 'View, search, suspend, reinstate, and role-change any user. Full user history.' },
            { icon: '🪪', title: 'KYC Queue', desc: 'Review and approve/reject Aadhaar, PAN, face verification, and business registration.' },
            { icon: '💰', title: 'Finance & Payouts', desc: 'View all escrow positions, trigger manual payouts, process refunds, manage take-rate.' },
            { icon: '📊', title: 'Platform Analytics', desc: 'Real-time KPIs: GMV, bookings, review rate, dispute rate, creator earnings, city-wise data.' },
            { icon: '🛡️', title: 'Moderation Oversight', desc: 'View all moderation actions, review queues, override decisions, manage policy.' },
            { icon: '📋', title: 'Audit Log', desc: 'Immutable log of every admin action — who did what, when, with full before/after state.' },
            { icon: '📬', title: 'Notification System', desc: 'Configure and trigger platform-wide, segment, or individual notifications across all channels.' },
            { icon: '💼', title: 'Subscription Management', desc: 'View all subscriptions, process upgrades/downgrades, handle dunning, apply credits.' },
          ].map(cap => (
            <div key={cap.title} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#1F293744'; el.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = '' }}
            >
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '12px' }}>{cap.icon}</span>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px' }}>{cap.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{cap.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding section */}
      <section id="onboarding" style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#F9FAFB,#F3F4F6)', borderRadius: '20px', padding: '40px', border: '1px solid #D1D5DB' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '8px', color: '#1F2937' }}>Admin Onboarding</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: '#6B7280', marginBottom: '28px' }}>Admin accounts are provisioned by Super Admin only. Full-access credentials require identity verification and a formal role assignment record.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
            {[
              { step: '1', icon: '🔑', label: 'Super Admin invite', desc: 'Super Admin generates a one-time token. No self-registration. Access scoped per assignment.' },
              { step: '2', icon: '🪪', label: 'Identity verification', desc: 'Identity document + face verification required before console access is granted.' },
              { step: '3', icon: '🔐', label: 'Security setup', desc: 'Passkey/2FA + session logging. All admin sessions are recorded in the audit trail.' },
              { step: '4', icon: '🔧', label: 'Console access', desc: 'Full admin console access: users, KYC, finance, moderation, disputes, audit log, feature flags.' },
            ].map(s => (
              <div key={s.step} style={{ padding: '18px', borderRadius: '14px', background: 'rgba(255,255,255,0.8)', border: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{s.icon}</span>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#111827', marginBottom: '6px' }}>Step {s.step} · {s.label}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'admin').map(r => (
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
