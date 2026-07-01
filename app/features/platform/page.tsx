'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'
import MermaidDiagram from '../../../components/MermaidDiagram'
import { PLATFORM_FEATURES, RADAR_ITEMS, CATEGORY_META, type FeatureCategory } from '../../../lib/platform-features-data'

const STATUS_STYLE: Record<string, { c: string; bg: string }> = {
  Confirmed:   { c: '#059669', bg: '#ECFDF5' },
  Detailed:    { c: '#059669', bg: '#ECFDF5' },
  Proposed:    { c: '#4F46E5', bg: '#EEF2FF' },
  Conceptual:  { c: '#D97706', bg: '#FFFBEB' },
}

export default function PlatformFeaturesPage() {
  const [activeCategory, setActiveCategory] = useState<FeatureCategory | 'radar'>('core')
  const [openId, setOpenId] = useState<string | null>('geo-discovery')

  const categories: (FeatureCategory | 'radar')[] = ['core', 'growth', 'money', 'radar']
  const featuresInView = activeCategory === 'radar' ? [] : PLATFORM_FEATURES.filter(f => f.category === activeCategory)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/features/platform" />

      {/* Hero */}
      <section style={{ paddingTop: '96px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(5,150,105,0.3)', marginBottom: '20px', background: '#ECFDF5' }}>
          <span>🧭</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#059669', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Full Feature Spec — §3 of the SRS</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.6rem)', letterSpacing: '-0.045em', lineHeight: 1.06, marginBottom: '18px' }}>
          22 features.<br />
          <span style={{ background: 'linear-gradient(135deg,#059669,#4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One consistent schema, nothing skipped.</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.75 }}>
          Every feature below follows the same schema as the spec: <strong>Goal · Flow · How it works · Module &amp; tables · Acceptance criteria.</strong> The 8 core features power the trust loop today; the 13 growth &amp; money features are <code style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.85em', background: 'var(--color-surface)', padding: '1px 6px', borderRadius: '4px' }}>Proposed</code> — designed to slot into the existing stack.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { val: '8',  label: 'Core features (§3.2–3.9)', c: '#4F46E5' },
            { val: '10', label: 'Growth & retention (v4.0)', c: '#059669' },
            { val: '3',  label: 'Money & logistics (v4.1)',  c: '#D97706' },
            { val: '12', label: 'On the radar (§3.10.14)',   c: '#7C3AED' },
          ].map(s => (
            <div key={s.label} style={{ padding: '10px 16px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.1rem', color: s.c }}>{s.val}</div>
              <div style={{ fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category tabs */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '28px', padding: '6px', background: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-hairline)', width: 'fit-content' }}>
          {categories.map(cat => {
            const meta = cat === 'radar'
              ? { label: 'Radar (§3.10.14)', color: '#7C3AED', bg: '#F5F3FF' }
              : CATEGORY_META[cat]
            const active = activeCategory === cat
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '9px 16px', borderRadius: '11px',
                background: active ? meta.bg : 'transparent',
                border: active ? `1.5px solid ${meta.color}44` : '1.5px solid transparent',
                fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12.5px',
                color: active ? meta.color : 'var(--color-muted)',
                cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>{meta.label}</button>
            )
          })}
        </div>

        {activeCategory !== 'radar' && (
          <p style={{ fontSize: '13.5px', color: 'var(--color-muted)', marginBottom: '24px', maxWidth: '720px' }}>{CATEGORY_META[activeCategory].desc}</p>
        )}

        {/* Feature accordion */}
        {activeCategory !== 'radar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {featuresInView.map(f => {
              const isOpen = openId === f.id
              const st = STATUS_STYLE[f.status]
              return (
                <div key={f.id} style={{ borderRadius: '16px', border: `1.5px solid ${isOpen ? f.color + '55' : 'var(--color-hairline)'}`, background: 'var(--color-surface)', overflow: 'hidden', transition: 'border-color 0.15s' }}>
                  <button onClick={() => setOpenId(isOpen ? null : f.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ width: '42px', height: '42px', borderRadius: '11px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', flexShrink: 0 }}>{f.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)' }}>{f.title}</span>
                        <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10.5px', color: 'var(--color-muted)' }}>{f.code}</span>
                        <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '9.5px', color: st.c, background: st.bg, padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{f.status}</span>
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--color-muted)', marginTop: '3px' }}>{f.tagline} · <span style={{ opacity: 0.8 }}>{f.beneficiary}</span></div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2.5" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : '' }}><path d="m6 9 6 6 6-6" /></svg>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 20px 24px', borderTop: '1px solid var(--color-hairline)', marginTop: '-1px', paddingTop: '20px' }}>
                      <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                        {/* Left: goal + how + module + acceptance */}
                        <div>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: f.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Goal</div>
                          <p style={{ fontSize: '13.5px', color: 'var(--color-ink)', lineHeight: 1.7, marginBottom: '18px' }}>{f.goal}</p>

                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: f.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>How it works</div>
                          <ul style={{ margin: '0 0 18px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {f.how.map((h, i) => <li key={i} style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.65 }}>{h}</li>)}
                          </ul>

                          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
                            <div style={{ padding: '8px 12px', borderRadius: '9px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Module</div>
                              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--color-ink)', marginTop: '2px' }}>{f.module}</div>
                            </div>
                            <div style={{ padding: '8px 12px', borderRadius: '9px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tables / columns</div>
                              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--color-ink)', marginTop: '2px' }}>{f.tables.join(', ')}</div>
                            </div>
                          </div>

                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: f.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Acceptance criteria</div>
                          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {f.acceptance.map((a, i) => <li key={i} style={{ fontSize: '12.5px', color: 'var(--color-muted)', lineHeight: 1.6 }}>✓ {a}</li>)}
                          </ul>

                          {f.linkOut && (
                            <Link href={f.linkOut.href} style={{ display: 'inline-flex', marginTop: '18px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: f.color, textDecoration: 'none' }}>{f.linkOut.label}</Link>
                          )}
                        </div>

                        {/* Right: diagram */}
                        <div>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: f.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Flow</div>
                          <div style={{ borderRadius: '14px', border: '1px solid var(--color-hairline)', overflow: 'hidden', background: 'var(--color-bg)' }}>
                            <MermaidDiagram code={f.mermaid} id={f.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Radar table */}
        {activeCategory === 'radar' && (
          <div>
            <p style={{ fontSize: '13.5px', color: 'var(--color-muted)', marginBottom: '20px', maxWidth: '720px' }}>
              §3.10.14 — smaller ideas not yet promoted to a full spec entry. Kept visible so nothing from the source document is dropped.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '12px' }}>
              {RADAR_ITEMS.map(r => (
                <div key={r.letter} style={{ padding: '16px 18px', borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: '#F5F3FF', color: '#7C3AED', fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.letter}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13.5px', color: 'var(--color-ink)', marginBottom: '4px' }}>{r.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '4px' }}><strong style={{ color: 'var(--color-ink)' }}>How:</strong> {r.how}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.6 }}><strong style={{ color: 'var(--color-ink)' }}>Why:</strong> {r.why}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Cross-links */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px', marginBottom: '32px' }}>
          {[
            { icon: '🤖', title: 'AI Features', desc: 'Interactive demos: Budget Estimator, Brief Parser, Fit Score, Concierge', href: '/features/ai', c: '#4F46E5', bg: '#EEF2FF' },
            { icon: '🧭', title: 'Complete Flow', desc: 'Signup → role journeys → shared systems, tied together', href: '/flow', c: '#059669', bg: '#ECFDF5' },
            { icon: '📄', title: 'Full SRS / PRD', desc: 'The raw spec — all 23 sections + appendices', href: '/docs', c: '#0891B2', bg: '#ECFEFF' },
          ].map(c => (
            <Link key={c.title} href={c.href} style={{ padding: '20px', borderRadius: '14px', background: c.bg, border: `1px solid ${c.c}22`, textDecoration: 'none', transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
            >
              <span style={{ fontSize: '22px', display: 'block', marginBottom: '10px' }}>{c.icon}</span>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: c.c, marginBottom: '5px' }}>{c.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{c.desc}</div>
            </Link>
          ))}
        </div>

        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-muted)', marginBottom: '18px' }}>Explore platform roles →</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ROLES.map(r => (
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
