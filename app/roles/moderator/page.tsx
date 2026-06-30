'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

const QUEUE = [
  { id: 'RPT-1841', type: 'Fake Reviews', subject: 'ProfileID: #PH-2291', severity: 'High', severityColor: '#DC2626', severityBg: '#FFF1F0', age: '2h ago', status: 'Open' },
  { id: 'RPT-1838', type: 'Inappropriate Portfolio', subject: 'ProfileID: #PH-1774', severity: 'Medium', severityColor: '#D97706', severityBg: '#FFFBEB', age: '5h ago', status: 'Under Review' },
  { id: 'RPT-1832', type: 'Misleading Package Pricing', subject: 'ProfileID: #PH-0932', severity: 'Low', severityColor: '#059669', severityBg: '#ECFDF5', age: '1d ago', status: 'Open' },
  { id: 'RPT-1820', type: 'Spam / Bot Review', subject: 'ReviewID: #RV-5529', severity: 'Medium', severityColor: '#D97706', severityBg: '#FFFBEB', age: '2d ago', status: 'Resolved', action: 'Removed' },
]

export default function ModeratorPage() {
  const [dashTab, setDashTab] = useState('queue')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/roles/moderator" />

      <section style={{ paddingTop: '100px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(5,150,105,0.3)', marginBottom: '24px', background: '#ECFDF5' }}>
          <span style={{ fontSize: '16px' }}>🛡️</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#059669', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Moderator Role</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '20px', color: 'var(--color-ink)' }}>
          Keep the platform<br />
          <span style={{ color: '#059669' }}>trusted and safe.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.05rem', color: 'var(--color-muted)', maxWidth: '620px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Moderators review flagged content, fraudulent profiles, fake reviews, and policy violations. The moderation queue is triaged by severity — Moderators act on open reports, log decisions, and escalate disputes to Trust Officers when needed.
        </p>
        <div style={{ padding: '20px 32px', background: '#ECFDF5', border: '1px solid #059669', borderRadius: '14px', display: 'inline-flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[{ val: '18', label: 'Open Reports' }, { val: '4h', label: 'Avg Resolution Time' }, { val: '97%', label: 'Policy Accuracy' }, { val: '< 2%', label: 'Platform Dispute Rate' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', color: '#059669' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#065F46' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Moderator Responsibilities</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '28px' }}>What Moderators review and act on</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          {[
            { icon: '🖼️', title: 'Portfolio Content', desc: 'Review flagged images for policy violations (explicit content, copyright, false representation).' },
            { icon: '⭐', title: 'Review Integrity', desc: 'Identify and remove spam, fake, or incentivized reviews. Flag patterns of review manipulation.' },
            { icon: '👤', title: 'Profile Violations', desc: 'Check profiles for misleading claims, stolen portfolios, or identity fraud.' },
            { icon: '💰', title: 'Pricing Fraud', desc: 'Investigate reports of bait-and-switch pricing, hidden fees, or fraudulent package listings.' },
            { icon: '📩', title: 'Spam & Solicitation', desc: 'Remove spam messages, off-platform solicitation, and policy-violating communications.' },
            { icon: '🚨', title: 'Escalate to Trust Officer', desc: 'When reports involve payment disputes, KYC fraud, or legal matters — escalate appropriately.' },
          ].map(item => (
            <div key={item.title} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '28px' }}>Moderator Console Preview</h2>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ background: '#ECFDF5', borderBottom: '1px solid rgba(5,150,105,0.2)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#065F46' }}>Moderation Console — Sceneora Platform</div>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#DC2626', background: '#FFF1F0', padding: '4px 12px', borderRadius: '100px', border: '1px solid #DC262633' }}>18 open reports</span>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-hairline)', padding: '0 24px' }}>
            {['queue', 'recent actions'].map(tab => (
              <button key={tab} onClick={() => setDashTab(tab)} style={{
                padding: '14px 16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
                color: dashTab === tab ? '#059669' : 'var(--color-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: dashTab === tab ? '2px solid #059669' : '2px solid transparent',
                marginBottom: '-1px', textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ padding: '24px' }}>
            {dashTab === 'queue' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {QUEUE.map(r => (
                  <div key={r.id} style={{ padding: '14px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto auto', gap: '14px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: 'var(--color-muted)' }}>{r.id}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{r.type}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{r.subject} · {r.age}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: r.severityColor, background: r.severityBg, padding: '3px 10px', borderRadius: '100px' }}>{r.severity}</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: r.status === 'Resolved' ? '#059669' : r.status === 'Under Review' ? '#D97706' : 'var(--color-muted)', background: r.status === 'Resolved' ? '#ECFDF5' : 'transparent', padding: '3px 10px', borderRadius: '100px' }}>{r.status}</span>
                    <button style={{ padding: '6px 14px', borderRadius: '8px', background: '#059669', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', cursor: 'pointer', opacity: r.status === 'Resolved' ? 0.4 : 1 }}>Review</button>
                  </div>
                ))}
              </div>
            )}
            {dashTab === 'recent actions' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { action: 'Removed fake review', target: 'ReviewID #RV-5529', by: 'Mod Karthik', time: '2d ago', result: 'Removed', resultColor: '#DC2626' },
                  { action: 'Warned profile', target: 'ProfileID #PH-1208', by: 'Mod Priya', time: '3d ago', result: 'Warning sent', resultColor: '#D97706' },
                  { action: 'Approved portfolio after review', target: 'ProfileID #PH-0881', by: 'Mod Karthik', time: '4d ago', result: 'Approved', resultColor: '#059669' },
                  { action: 'Escalated to Trust Officer', target: 'Report #RPT-1799', by: 'Mod Priya', time: '5d ago', result: 'Escalated', resultColor: '#0F62FE' },
                ].map(a => (
                  <div key={a.action} style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{a.action}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{a.target} · {a.by} · {a.time}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: a.resultColor }}>{a.result}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Step-by-step daily workflow */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '8px' }}>Moderator Daily Workflow</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '32px' }}>How a Moderator processes their queue each day.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { n: '01', icon: '📬', title: 'Review open queue', desc: 'Open the Moderation Console. Queue is sorted by severity (High → Medium → Low). New reports since last session are highlighted.', time: '8–9 AM' },
            { n: '02', icon: '🔍', title: 'Investigate each report', desc: 'Click into a report to see: the flagged content, the reporter\'s reason, the creator\'s full profile, and similar past decisions for context. Check EXIF, compare portfolio, review history.', time: 'Per report' },
            { n: '03', icon: '⚖️', title: 'Take action', desc: 'Available actions: Approve (clear the report, no violation), Warn (notify creator, log warning), Remove (take down content/review), Suspend (temp block pending review), Escalate (route to Trust Officer for payment/legal/KYC matters).', time: 'Per report' },
            { n: '04', icon: '📝', title: 'Log decision with reason', desc: 'Every action requires a reason log — referenced if the creator appeals. Reason feeds the audit trail.', time: 'Per action' },
            { n: '05', icon: '🔗', title: 'Escalate to Trust Officer if needed', desc: 'Disputes involving escrow, verified identity fraud, or legal claims are escalated — Moderators do not directly release funds or finalize KYC.', time: 'As needed' },
            { n: '06', icon: '📊', title: 'End-of-day stats check', desc: 'Review queue cleared %, avg resolution time, policy accuracy. Flag any recurring pattern (e.g. multiple fake-review reports from same creator) to Admin.', time: 'End of day' },
          ].map((s, i, arr) => (
            <div key={s.n} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', position: 'relative', paddingBottom: i < arr.length - 1 ? '28px' : '0' }}>
              {i < arr.length - 1 && (
                <div style={{ position: 'absolute', left: '20px', top: '44px', bottom: '0', width: '2px', background: 'var(--color-hairline)' }} />
              )}
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ECFDF5', border: '2px solid #059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, position: 'relative', zIndex: 1 }}>{s.icon}</div>
              <div style={{ flex: 1, paddingTop: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)' }}>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#059669', marginRight: '8px' }}>{s.n}</span>
                    {s.title}
                  </div>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '3px 10px', borderRadius: '100px' }}>{s.time}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding section */}
      <section id="onboarding" style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', borderRadius: '20px', padding: '40px', border: '1px solid rgba(5,150,105,0.2)' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '8px', color: '#065F46' }}>Moderator Onboarding</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: '#059669', marginBottom: '28px' }}>Moderators are invited by Admins — not publicly registered. Access is scoped to moderation tools only.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
            {[
              { step: '1', icon: '📧', label: 'Receive invite', desc: 'Admin sends a role-scoped invite to your email. No public sign-up.' },
              { step: '2', icon: '🔐', label: 'Create credentials', desc: 'Set up your password + 2FA (required for all internal roles).' },
              { step: '3', icon: '📚', label: 'Policy training', desc: 'Complete the platform policy guide and moderation decision framework.' },
              { step: '4', icon: '🛡️', label: 'Console access', desc: 'Access the Moderation Console — scoped to review queue and action log only.' },
            ].map(s => (
              <div key={s.step} style={{ padding: '18px', borderRadius: '14px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(5,150,105,0.2)' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{s.icon}</span>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#065F46', marginBottom: '6px' }}>Step {s.step} · {s.label}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#059669', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore other roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.filter(r => r.key !== 'moderator').map(r => (
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
