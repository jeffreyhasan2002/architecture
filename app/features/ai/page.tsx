'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../../../components/SceneoraNav'

// ─── Budget Estimator wizard data ──────────────────────────────────────────────
const WIZARD_STEPS = [
  {
    q: 'What type of event is this?',
    options: [
      { label: 'Wedding', icon: '💍', val: 'wedding' },
      { label: 'Corporate Shoot', icon: '🏢', val: 'corporate' },
      { label: 'Product Shoot', icon: '📦', val: 'product' },
      { label: 'Portrait / Maternity', icon: '🤱', val: 'portrait' },
    ],
  },
  {
    q: 'Which service do you need?',
    options: [
      { label: 'Photography', icon: '📷', val: 'photo' },
      { label: 'Videography', icon: '🎬', val: 'video' },
      { label: 'Photo + Video', icon: '📸', val: 'both' },
      { label: 'MUA (Makeup)', icon: '💄', val: 'mua' },
    ],
  },
  {
    q: 'Which city?',
    options: [
      { label: 'Mumbai / Delhi', icon: '🏙️', val: 'metro' },
      { label: 'Chennai / Bengaluru', icon: '🌆', val: 'tier1' },
      { label: 'Coimbatore / Kochi', icon: '🏘️', val: 'tier2' },
      { label: 'Other city', icon: '📍', val: 'other' },
    ],
  },
  {
    q: 'When is the event?',
    options: [
      { label: 'Oct – Feb (peak)', icon: '🌸', val: 'peak' },
      { label: 'Mar – May', icon: '☀️', val: 'summer' },
      { label: 'Jun – Sep', icon: '🌧️', val: 'monsoon' },
      { label: 'Flexible', icon: '📅', val: 'flex' },
    ],
  },
  {
    q: 'How long is the shoot?',
    options: [
      { label: 'Half-day (4h)', icon: '🕐', val: 'half' },
      { label: 'Full-day (8–10h)', icon: '🌅', val: 'full' },
      { label: 'Multi-day (2–3d)', icon: '📆', val: 'multi' },
      { label: 'Quick shoot (1–2h)', icon: '⚡', val: 'quick' },
    ],
  },
  {
    q: 'Any add-ons?',
    options: [
      { label: 'Drone footage', icon: '🚁', val: 'drone' },
      { label: 'Edited album', icon: '📖', val: 'album' },
      { label: 'Second shooter', icon: '👤', val: 'second' },
      { label: 'No extras', icon: '✅', val: 'none' },
    ],
  },
  {
    q: 'What is your rough budget?',
    options: [
      { label: 'Under ₹20,000', icon: '💚', val: 'budget' },
      { label: '₹20K – ₹50K', icon: '💛', val: 'mid' },
      { label: '₹50K – ₹1.5L', icon: '🧡', val: 'premium' },
      { label: 'Open budget', icon: '💜', val: 'open' },
    ],
  },
]

const BUDGET_RESULT = {
  low:         '₹24,000',
  recommended: '₹38,500',
  premium:     '₹68,000+',
  breakdown: [
    { service: 'Wedding photography (full-day)', low: '₹20,000', rec: '₹32,000', pre: '₹58,000' },
    { service: 'Drone footage (2h)',              low: '₹3,000',  rec: '₹4,500',  pre: '₹6,000'  },
    { service: 'Edited photo album (50 pages)',   low: '₹1,000',  rec: '₹2,000',  pre: '₹4,000'  },
  ],
  matches: [
    { name: 'Arun Krishnan', city: 'Chennai', pkg: '₹32,000 · Full day', score: 96, tag: 'Wedding', avail: true  },
    { name: 'Vikram Doss',   city: 'Coimbatore', pkg: '₹28,000 · Full day', score: 94, tag: 'Candid', avail: true  },
    { name: 'Studio Lens',   city: 'Chennai', pkg: '₹38,000 · Full day', score: 91, tag: 'Cinematic', avail: false },
  ],
  seasonNote: 'Oct–Feb peak season · +18% multiplier applied',
  cityNote:   'Tier-1 city · standard city-rate applied',
}

// ─── Brief Parser data ─────────────────────────────────────────────────────────
const RAW_BRIEF = `CAMPAIGN BRIEF — NATUREBREW × CREATOR PARTNERSHIP

Hi! We're NatureBrew, a cold brew coffee brand from Pune. We're looking for an Instagram creator
to promote our new Monsoon Blend. Our campaign runs Aug–Sep. We'd love 2–3 reels and maybe
a few story frames. Budget is around 40–50k for the right person. We don't want the content
used anywhere else (just organic). Revisions are ok but please not more than twice.
Post should go up by Aug 25. DM us to discuss!

— Neha, Marketing Team`

const PARSED_BRIEF = {
  brand:        'NatureBrew',
  product:      'Monsoon Blend Cold Brew Coffee',
  platforms:    ['Instagram Reels', 'Instagram Stories'],
  deliverables: [
    { type: 'Instagram Reel (60s)', qty: 2, deadline: 'Aug 25, 2026', notes: 'Product-forward, authentic tone' },
    { type: 'Instagram Story pack', qty: 5, deadline: 'Aug 25, 2026', notes: 'Swipe-up optional, brand-tagged' },
  ],
  usage_rights:  'Organic only — no paid amplification, no whitelisting',
  exclusivity:   'Category exclusivity for 30 days post-publish',
  revisions:     2,
  budget_range:  '₹40,000 – ₹50,000',
  timeline:      { shoot_by: 'Aug 15, 2026', post_by: 'Aug 25, 2026' },
  confidence:    98,
  flags:         ['Budget explicitly stated — no negotiation buffer needed', 'Exclusivity window inferred (not stated explicitly)'],
}

// ─── Fit Score data ────────────────────────────────────────────────────────────
const FIT_CREATORS = [
  {
    name: 'Meera V.',       handle: '@meera.sips',    type: 'Food & Lifestyle',  followers: '48K',  eng: '6.2%',
    score: 94, tier: 'Strong Match', tc: '#059669', tb: '#ECFDF5',
    breakdown: [
      { factor: 'Niche alignment', pct: 30, score: 29, max: 30 },
      { factor: 'Audience size',   pct: 25, score: 22, max: 25 },
      { factor: 'Engagement rate', pct: 20, score: 20, max: 20 },
      { factor: 'Brand experience',pct: 15, score: 13, max: 15 },
      { factor: 'Trust score',     pct: 10, score: 10, max: 10 },
    ],
    avatar: '☕',
    past: ['BeanBox', 'Teaology', 'Brewjoy'],
  },
  {
    name: 'Rahul K.',       handle: '@rahul.travels',  type: 'Travel & Lifestyle', followers: '120K', eng: '3.4%',
    score: 72, tier: 'Good Match',   tc: '#D97706', tb: '#FFFBEB',
    breakdown: [
      { factor: 'Niche alignment', pct: 30, score: 21, max: 30 },
      { factor: 'Audience size',   pct: 25, score: 25, max: 25 },
      { factor: 'Engagement rate', pct: 20, score: 13, max: 20 },
      { factor: 'Brand experience',pct: 15, score: 8,  max: 15 },
      { factor: 'Trust score',     pct: 10, score: 5,  max: 10 },
    ],
    avatar: '✈️',
    past: ['AirBrew', 'RoamCafe'],
  },
  {
    name: 'Sunita R.',      handle: '@sunita.beauty',  type: 'Beauty & Skincare',  followers: '34K',  eng: '8.1%',
    score: 45, tier: 'Partial Match',tc: '#0891B2', tb: '#ECFEFF',
    breakdown: [
      { factor: 'Niche alignment', pct: 30, score: 9,  max: 30 },
      { factor: 'Audience size',   pct: 25, score: 18, max: 25 },
      { factor: 'Engagement rate', pct: 20, score: 16, max: 20 },
      { factor: 'Brand experience',pct: 15, score: 2,  max: 15 },
      { factor: 'Trust score',     pct: 10, score: 0,  max: 10 },
    ],
    avatar: '💄',
    past: ['GlowSkin'],
  },
  {
    name: 'Arjun M.',       handle: '@arjun.eats',     type: 'Food & Comedy',      followers: '210K', eng: '4.8%',
    score: 88, tier: 'Strong Match', tc: '#059669', tb: '#ECFDF5',
    breakdown: [
      { factor: 'Niche alignment', pct: 30, score: 27, max: 30 },
      { factor: 'Audience size',   pct: 25, score: 25, max: 25 },
      { factor: 'Engagement rate', pct: 20, score: 17, max: 20 },
      { factor: 'Brand experience',pct: 15, score: 12, max: 15 },
      { factor: 'Trust score',     pct: 10, score: 7,  max: 10 },
    ],
    avatar: '🍔',
    past: ['CafeCo', 'BrewBurger', 'SipCity'],
  },
]

// ─── Style Tagger data ──────────────────────────────────────────────────────────
const PORTFOLIO_IMAGES = [
  { emoji: '🌅', bg: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)', tags: ['Golden Hour', 'Candid', 'Outdoor', 'Warm Tones'], confidence: 97 },
  { emoji: '👰', bg: 'linear-gradient(135deg,#fff5f5 0%,#fed7d7 100%)', tags: ['Bridal Portrait', 'Bright & Airy', 'Indoor', 'Soft Focus'], confidence: 94 },
  { emoji: '📦', bg: 'linear-gradient(135deg,#f7fafc 0%,#e2e8f0 100%)', tags: ['Product', 'Studio Strobe', 'Clean BG', 'Commercial'], confidence: 99 },
  { emoji: '🎭', bg: 'linear-gradient(135deg,#0d0d0d 0%,#1a0533 100%)', tags: ['Dark & Moody', 'Editorial', 'High Contrast', 'Low-key'], confidence: 96 },
  { emoji: '🏙️', bg: 'linear-gradient(135deg,#2d3748 0%,#4a5568 100%)', tags: ['Street', 'Architecture', 'Blue Hour', 'Urban'], confidence: 91 },
  { emoji: '👶', bg: 'linear-gradient(135deg,#fffbf0 0%,#fef3c7 100%)', tags: ['Newborn', 'Natural Light', 'Lifestyle', 'Pastel'], confidence: 98 },
]

// ─── AI Concierge chat data ─────────────────────────────────────────────────────
const CONCIERGE_MESSAGES = [
  { role: 'user', text: 'I need a candid wedding photographer for my daughter\'s engagement ceremony in Coimbatore, sometime in November, budget around ₹25,000.' },
  { role: 'ai', text: null, type: 'thinking', label: 'Extracting event parameters…' },
  { role: 'ai', text: null, type: 'params', params: {
    'Event type': 'Engagement ceremony',
    'Service':    'Candid photography',
    'City':       'Coimbatore (Tier-1)',
    'Date':       'November 2026 (peak season)',
    'Budget':     '₹25,000',
    'Style':      'Candid',
  }},
  { role: 'ai', text: null, type: 'budget', budget: { low: '₹18,000', rec: '₹26,000', pre: '₹42,000', note: 'Your budget of ₹25,000 aligns with the recommended range ✓' }},
  { role: 'ai', text: null, type: 'matches', matches: [
    { name: 'Karthik S.',    city: 'Coimbatore', price: '₹22,000', score: 95, avail: true,  tags: ['Candid', 'Wedding', 'Natural'] },
    { name: 'Priya N.',      city: 'Coimbatore', price: '₹24,000', score: 91, avail: true,  tags: ['Candid', 'Engagement', 'Portraits'] },
    { name: 'Ramesh Kumar',  city: 'Coimbatore', price: '₹28,000', score: 88, avail: false, tags: ['Candid', 'Cinematic', 'Wedding'] },
  ]},
  { role: 'ai', text: '3 candid specialists in Coimbatore match your brief. Karthik S. fits your budget exactly and has 11 engagement shoots this year. Want me to check his availability for a specific date in November?' },
]


export default function AiFeaturesPage() {
  const [activeFeature, setActiveFeature]   = useState<string>('budget')
  const [wizardStep, setWizardStep]         = useState(0)
  const [wizardAnswers, setWizardAnswers]   = useState<string[]>([])
  const [wizardDone, setWizardDone]         = useState(false)
  const [briefView, setBriefView]           = useState<'raw' | 'parsed'>('raw')
  const [expandedCreator, setExpandedCreator] = useState<number | null>(0)
  const [taggedIdx, setTaggedIdx]           = useState<number | null>(null)
  const [chatStep, setChatStep]             = useState(0)

  const pickWizardOption = (val: string) => {
    const next = [...wizardAnswers, val]
    setWizardAnswers(next)
    if (next.length === WIZARD_STEPS.length) {
      setWizardDone(true)
    } else {
      setWizardStep(s => s + 1)
    }
  }

  const resetWizard = () => {
    setWizardStep(0)
    setWizardAnswers([])
    setWizardDone(false)
  }

  const NAV_TABS = [
    { id: 'budget',       icon: '💰', label: 'AI Budget Estimator', color: '#7C3AED', bg: '#F5F3FF' },
    { id: 'brief-parser', icon: '📋', label: 'AI Brief Parser',     color: '#0891B2', bg: '#ECFEFF' },
    { id: 'fit-score',    icon: '📊', label: 'AI Fit Score',        color: '#D97706', bg: '#FFFBEB' },
    { id: 'style-tagger', icon: '🏷️', label: 'AI Style Tagger',    color: '#7C3AED', bg: '#F5F3FF' },
    { id: 'concierge',    icon: '🤖', label: 'AI Concierge',        color: '#4F46E5', bg: '#EEF2FF' },
  ]

  const activeTab = NAV_TABS.find(t => t.id === activeFeature)!

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/features/ai" />

      {/* Hero */}
      <section style={{ paddingTop: '96px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(79,70,229,0.3)', marginBottom: '20px', background: '#EEF2FF' }}>
          <span>🤖</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#4F46E5', letterSpacing: '0.05em', textTransform: 'uppercase' }}>AI-Powered Platform</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-0.045em', lineHeight: 1.06, marginBottom: '18px' }}>
          Five AI systems.<br />
          <span style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Woven into every workflow.</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.75 }}>
          Sceneora uses <strong>Claude by Anthropic</strong> as its AI backbone. Every call is server-side — the API key is never exposed to the client. All features are optimized for sub-4-second responses.
        </p>

        {/* Platform stats */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { val: '5',        label: 'AI features',                icon: '🤖', c: '#4F46E5' },
            { val: '< 4s',     label: 'Max response time',         icon: '⚡', c: '#7C3AED' },
            { val: 'Claude',   label: 'Anthropic backbone',         icon: '🧠', c: '#0891B2' },
            { val: '100%',     label: 'Server-side execution',      icon: '🔒', c: '#059669' },
            { val: '24h',      label: 'Redis cache on estimates',   icon: '♻️', c: '#D97706' },
          ].map(s => (
            <div key={s.label} style={{ padding: '10px 16px', borderRadius: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: '15px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '0.95rem', color: s.c }}>{s.val}</div>
              <div style={{ fontSize: '10px', color: 'var(--color-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature tabs + panels */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1280px', margin: '0 auto' }}>

        {/* Tab strip */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '28px', padding: '6px', background: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-hairline)', width: 'fit-content' }}>
          {NAV_TABS.map(t => (
            <button key={t.id} onClick={() => setActiveFeature(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '11px',
              background: activeFeature === t.id ? t.bg : 'transparent',
              border: activeFeature === t.id ? `1.5px solid ${t.color}44` : '1.5px solid transparent',
              fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px',
              color: activeFeature === t.id ? t.color : 'var(--color-muted)',
              cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: '16px' }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════ BUDGET ESTIMATOR ════════════════════════════════ */}
        {activeFeature === 'budget' && (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>💰</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em', margin: 0 }}>AI Budget Estimator</h2>
                  <p style={{ fontSize: '13px', color: '#7C3AED', fontWeight: 600, margin: '2px 0 0' }}>7-step wizard → price range in &lt; 4 seconds</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '20px' }}>
                Available to visitors — no sign-up needed. Describe your event across 7 quick questions and the AI returns a low / recommended / premium price range with per-service cost breakdown and matched creator suggestions.
              </p>

              {/* Tech specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '24px' }}>
                {[
                  { k: 'AI Model',     v: 'claude-sonnet-4-6 · server-side JSON' },
                  { k: 'Caching',      v: '24h Redis on identical input hash' },
                  { k: 'Performance',  v: '< 4 seconds end-to-end' },
                  { k: 'Access',       v: 'No login required — open to all visitors' },
                  { k: 'Multipliers',  v: 'Peak season × 1.18 · Metro city × 1.25' },
                ].map(m => (
                  <div key={m.k} style={{ display: 'flex', gap: '12px', padding: '9px 13px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#7C3AED', minWidth: '90px', textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: '1px' }}>{m.k}</span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{m.v}</span>
                  </div>
                ))}
              </div>

              {/* Step progress */}
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {wizardDone ? '✅ All 7 steps complete' : `Step ${wizardAnswers.length + 1} of 7`}
              </div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '0' }}>
                {WIZARD_STEPS.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i < wizardAnswers.length || wizardDone ? '#7C3AED' : 'var(--color-hairline)', transition: 'background 0.3s' }} />
                ))}
              </div>
            </div>

            {/* Right — Interactive Wizard */}
            <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>
              {/* Browser chrome */}
              <div style={{ background: '#F5F3FF', borderBottom: '1px solid rgba(124,58,237,0.15)', padding: '11px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FC5256' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FDBA2C' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2CC840' }} />
                <div style={{ marginLeft: '8px', flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: '6px', padding: '4px 12px', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#7C3AED' }}>
                  sceneora.app/budget-estimator
                </div>
              </div>

              {!wizardDone ? (
                <div style={{ padding: '28px' }}>
                  {/* Question */}
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#7C3AED', fontWeight: 700 }}>Q{wizardStep + 1}/7</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', marginBottom: '20px', color: 'var(--color-ink)' }}>
                    {WIZARD_STEPS[wizardStep].q}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {WIZARD_STEPS[wizardStep].options.map(opt => (
                      <button key={opt.val} onClick={() => pickWizardOption(opt.val)} style={{
                        padding: '16px 14px', borderRadius: '14px', background: 'var(--color-bg)',
                        border: '1.5px solid var(--color-hairline)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left',
                        transition: 'all 0.15s', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)',
                      }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#7C3AED66'; el.style.background = '#F5F3FF'; el.style.transform = 'translateY(-1px)' }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.background = 'var(--color-bg)'; el.style.transform = '' }}
                      >
                        <span style={{ fontSize: '22px' }}>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {wizardAnswers.length > 0 && (
                    <button onClick={resetWizard} style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter)' }}>← Start over</button>
                  )}
                </div>
              ) : (
                <div style={{ padding: '24px' }}>
                  {/* Result header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-ink)' }}>🎯 Your Estimate is Ready</div>
                    <button onClick={resetWizard} style={{ fontSize: '11px', color: '#7C3AED', background: '#F5F3FF', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700 }}>Try Again</button>
                  </div>

                  {/* Price range */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '18px' }}>
                    {[
                      { tier: 'Low',         val: BUDGET_RESULT.low,         c: '#64748B', bg: '#F8FAFC', note: 'Basic packages' },
                      { tier: 'Recommended', val: BUDGET_RESULT.recommended, c: '#7C3AED', bg: '#F5F3FF', note: 'Best quality-price' },
                      { tier: 'Premium',     val: BUDGET_RESULT.premium,     c: '#B45309', bg: '#FFFBEB', note: 'Luxury tier' },
                    ].map(e => (
                      <div key={e.tier} style={{ padding: '14px 10px', borderRadius: '14px', background: e.bg, border: `1.5px solid ${e.c}33`, textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: e.c, fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{e.tier}</div>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.2rem', color: e.c, marginBottom: '4px' }}>{e.val}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: e.c, opacity: 0.7 }}>{e.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* Multipliers */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                    {[BUDGET_RESULT.seasonNote, BUDGET_RESULT.cityNote].map(n => (
                      <span key={n} style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: '#7C3AED', background: '#F5F3FF', padding: '3px 9px', borderRadius: '100px', border: '1px solid rgba(124,58,237,0.25)' }}>ℹ️ {n}</span>
                    ))}
                  </div>

                  {/* Breakdown table */}
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Per-Service Breakdown</div>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-hairline)', marginBottom: '18px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ background: 'var(--color-bg)' }}>
                          {['Service', 'Low', 'Recommended', 'Premium'].map(h => (
                            <th key={h} style={{ padding: '8px 12px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: 'var(--color-muted)', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-hairline)' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {BUDGET_RESULT.breakdown.map((row, i) => (
                          <tr key={i} style={{ background: i % 2 ? 'var(--color-bg)' : 'transparent' }}>
                            <td style={{ padding: '9px 12px', color: 'var(--color-ink)', fontWeight: 500 }}>{row.service}</td>
                            <td style={{ padding: '9px 12px', color: '#64748B', fontWeight: 600 }}>{row.low}</td>
                            <td style={{ padding: '9px 12px', color: '#7C3AED', fontWeight: 700 }}>{row.rec}</td>
                            <td style={{ padding: '9px 12px', color: '#B45309', fontWeight: 600 }}>{row.pre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Matched creators */}
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✓ 3 Creators Matched</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {BUDGET_RESULT.matches.map(m => (
                      <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 13px', borderRadius: '11px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)' }}>
                        <span style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>📷</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{m.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>{m.city} · {m.pkg}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '15px', color: '#059669' }}>{m.score}</div>
                          {m.avail ? <span style={{ fontSize: '10px', color: '#059669', background: '#ECFDF5', padding: '2px 7px', borderRadius: '100px' }}>Available</span> : <span style={{ fontSize: '10px', color: '#DC2626', background: '#FFF1F0', padding: '2px 7px', borderRadius: '100px' }}>Booked</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════ BRIEF PARSER ════════════════════════════════════ */}
        {activeFeature === 'brief-parser' && (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>📋</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em', margin: 0 }}>AI Brief Parser</h2>
                  <p style={{ fontSize: '13px', color: '#0891B2', fontWeight: 600, margin: '2px 0 0' }}>Form or PDF → structured deliverables</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '20px' }}>
                Brands submit messy briefs — PDFs, Word docs, casual emails. The AI extracts every negotiable field into a clean, structured scope that both parties see identically. Drives auto-contract generation and enforces revision caps.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '24px' }}>
                {[
                  { k: 'AI Model',    v: 'claude-sonnet-4-6 · structured output' },
                  { k: 'Input',       v: 'PDF upload, form fields, or email paste' },
                  { k: 'Output',      v: 'Structured JSON → auto-contract fields' },
                  { k: 'Performance', v: '< 3s form · < 6s PDF (avg 8 pages)' },
                  { k: 'Confidence',  v: 'Per-field confidence score (0–100%)' },
                ].map(m => (
                  <div key={m.k} style={{ display: 'flex', gap: '12px', padding: '9px 13px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#0891B2', minWidth: '90px', textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: '1px' }}>{m.k}</span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{m.v}</span>
                  </div>
                ))}
              </div>
              {/* Fields extracted */}
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>8 fields always extracted</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Brand', 'Product', 'Platforms', 'Deliverables', 'Usage rights', 'Exclusivity', 'Revisions', 'Timeline'].map(f => (
                  <span key={f} style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', padding: '4px 10px', borderRadius: '100px', background: '#ECFEFF', color: '#0891B2', border: '1px solid rgba(8,145,178,0.25)', fontWeight: 600 }}>{f}</span>
                ))}
              </div>
            </div>

            {/* Right — Before / After */}
            <div>
              {/* Toggle */}
              <div style={{ display: 'flex', gap: '0', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-hairline)', padding: '4px', width: 'fit-content', marginBottom: '16px' }}>
                {(['raw', 'parsed'] as const).map(v => (
                  <button key={v} onClick={() => setBriefView(v)} style={{ padding: '8px 22px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', background: briefView === v ? (v === 'raw' ? '#1E293B' : '#ECFEFF') : 'transparent', color: briefView === v ? (v === 'raw' ? '#fff' : '#0891B2') : 'var(--color-muted)', transition: 'all 0.15s' }}>
                    {v === 'raw' ? '📄 Raw Brief (Input)' : '✅ Parsed Output'}
                  </button>
                ))}
              </div>

              <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>
                <div style={{ background: briefView === 'raw' ? '#1E293B' : '#ECFEFF', borderBottom: `1px solid ${briefView === 'raw' ? 'rgba(255,255,255,0.08)' : 'rgba(8,145,178,0.2)'}`, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FC5256' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FDBA2C' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2CC840' }} />
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: briefView === 'raw' ? '#94A3B8' : '#0891B2', marginLeft: '8px' }}>
                    {briefView === 'raw' ? 'NatureBrew_Campaign_Brief_Aug.pdf' : 'Brief parsed · Confidence 98% · sceneora.app/deals/new'}
                  </span>
                </div>

                {briefView === 'raw' ? (
                  <div style={{ padding: '24px', background: '#0F172A', minHeight: '420px' }}>
                    <pre style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{RAW_BRIEF}</pre>
                    <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(8,145,178,0.1)', borderRadius: '10px', border: '1px solid rgba(8,145,178,0.3)' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#38BDF8', marginBottom: '6px' }}>🔍 AI is reading this…</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#64748B', lineHeight: 1.6 }}>Extracting: brand, product, platforms, deliverables, usage rights, exclusivity, revisions, timeline, budget…</div>
                    </div>
                    <button onClick={() => setBriefView('parsed')} style={{ marginTop: '16px', width: '100%', padding: '12px', borderRadius: '10px', background: '#0891B2', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', letterSpacing: '-0.01em' }}>
                      ✨ See Parsed Output →
                    </button>
                  </div>
                ) : (
                  <div style={{ padding: '24px', background: 'var(--color-bg)' }}>
                    {/* Confidence badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: '#0891B2' }}>Brief Parsed Successfully</div>
                      <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontWeight: 700, fontSize: '12px', color: '#059669', background: '#ECFDF5', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(5,150,105,0.3)' }}>98% confidence</span>
                    </div>

                    {/* Brand + Product */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                      {[
                        { label: 'Brand',   val: PARSED_BRIEF.brand },
                        { label: 'Product', val: PARSED_BRIEF.product },
                      ].map(f => (
                        <div key={f.label} style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#0891B2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{f.label}</div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)', fontWeight: 500 }}>{f.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Deliverables */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#0891B2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Deliverables</div>
                      {PARSED_BRIEF.deliverables.map((d, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', marginBottom: '6px' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)' }}>{d.qty}× {d.type}</div>
                            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{d.notes}</div>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#0891B2' }}>Due {d.deadline}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key terms grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                      {[
                        { label: 'Usage Rights',  val: PARSED_BRIEF.usage_rights,  flag: '⚠️' },
                        { label: 'Exclusivity',    val: PARSED_BRIEF.exclusivity,   flag: '📌' },
                        { label: 'Revisions',      val: `${PARSED_BRIEF.revisions} rounds max — enforced`, flag: '✅' },
                        { label: 'Budget Range',   val: PARSED_BRIEF.budget_range,  flag: '💰' },
                      ].map(f => (
                        <div key={f.label} style={{ padding: '10px 12px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', color: '#0891B2', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>{f.flag} {f.label}</div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11.5px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{f.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* AI flags */}
                    <div style={{ padding: '12px 14px', borderRadius: '10px', background: '#FFFBEB', border: '1px solid rgba(217,119,6,0.25)' }}>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#D97706', marginBottom: '6px' }}>⚡ AI Notes</div>
                      {PARSED_BRIEF.flags.map(f => (
                        <div key={f} style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#78350F', marginBottom: '3px', lineHeight: 1.5 }}>• {f}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════ FIT SCORE ═══════════════════════════════════════ */}
        {activeFeature === 'fit-score' && (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>📊</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em', margin: 0 }}>AI Fit Score</h2>
                  <p style={{ fontSize: '13px', color: '#D97706', fontWeight: 600, margin: '2px 0 0' }}>Weighted match · Strong / Good / Partial</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '20px' }}>
                Every creator is automatically scored against a brand brief using 5 weighted signals. The score is pre-indexed in Algolia so it returns in under 100ms — it's the first thing a brand sees on every search card.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '20px' }}>
                {[
                  { k: 'Computation', v: 'Weighted formula — no LLM needed' },
                  { k: 'Indexing',    v: 'Pre-computed · stored in Algolia' },
                  { k: 'Performance', v: '< 100ms on cache hit' },
                  { k: 'Refresh',     v: 'Recalculated on profile update or new brief' },
                  { k: 'Display',     v: 'Color badge: Strong / Good / Partial' },
                ].map(m => (
                  <div key={m.k} style={{ display: 'flex', gap: '12px', padding: '9px 13px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#D97706', minWidth: '90px', textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: '1px' }}>{m.k}</span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{m.v}</span>
                  </div>
                ))}
              </div>

              {/* Formula */}
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Score formula</div>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', color: 'var(--color-ink)', background: '#FFFBEB', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(217,119,6,0.25)', lineHeight: 1.7 }}>
                (Niche×0.30 + Audience×0.25<br/>
                + Engagement×0.20 + Experience×0.15<br/>
                + Trust×0.10) × 100
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                {[
                  { t: 'Strong',  c: '#059669', bg: '#ECFDF5', r: '80–100' },
                  { t: 'Good',    c: '#D97706', bg: '#FFFBEB', r: '55–79' },
                  { t: 'Partial', c: '#0891B2', bg: '#ECFEFF', r: '30–54' },
                ].map(tier => (
                  <div key={tier.t} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: tier.bg, border: `1px solid ${tier.c}33`, textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: tier.c }}>{tier.t}</div>
                    <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: tier.c, marginTop: '2px' }}>{tier.r}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Creator Search Results */}
            <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>
              <div style={{ background: '#FFFBEB', borderBottom: '1px solid rgba(217,119,6,0.15)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FC5256' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FDBA2C' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2CC840' }} />
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#D97706', marginLeft: '8px' }}>sceneora.app · Creator search for "NatureBrew Cold Brew Campaign"</span>
              </div>

              {/* Search bar mockup */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline)', background: 'var(--color-bg)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1, padding: '9px 14px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>
                    🔍 Food & Lifestyle · Instagram · India · Budget ₹40K–₹50K
                  </div>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#D97706', background: '#FFFBEB', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(217,119,6,0.3)', whiteSpace: 'nowrap' }}>4 creators found</span>
                </div>
              </div>

              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {FIT_CREATORS.map((c, i) => (
                  <div key={c.name} onClick={() => setExpandedCreator(expandedCreator === i ? null : i)} style={{ borderRadius: '14px', background: 'var(--color-bg)', border: `1.5px solid ${expandedCreator === i ? c.tc + '66' : 'var(--color-hairline)'}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', gap: '12px', padding: '14px 16px', alignItems: 'center' }}>
                      <span style={{ width: '44px', height: '44px', borderRadius: '12px', background: c.tb, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, border: `1px solid ${c.tc}22` }}>{c.avatar}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{c.name}</span>
                          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: c.tc, background: c.tb, padding: '2px 8px', borderRadius: '100px', border: `1px solid ${c.tc}33` }}>{c.tier}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{c.handle} · {c.type} · {c.followers} followers · {c.eng} engagement</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', color: c.tc, lineHeight: 1 }}>{c.score}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', color: 'var(--color-muted)', marginTop: '2px' }}>/100</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.tc} strokeWidth="2.5" style={{ flexShrink: 0, transition: 'transform 0.15s', transform: expandedCreator === i ? 'rotate(180deg)' : '' }}><path d="m6 9 6 6 6-6"/></svg>
                    </div>

                    {/* Score bar */}
                    <div style={{ padding: '0 16px 12px' }}>
                      <div style={{ height: '5px', borderRadius: '3px', background: 'var(--color-hairline)', overflow: 'hidden' }}>
                        <div style={{ width: `${c.score}%`, height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${c.tc}, ${c.tc}aa)`, transition: 'width 0.5s' }} />
                      </div>
                    </div>

                    {/* Expanded breakdown */}
                    {expandedCreator === i && (
                      <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--color-hairline)' }}>
                        <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {c.breakdown.map(b => (
                            <div key={b.factor} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', minWidth: '130px' }}>{b.factor}</div>
                              <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'var(--color-hairline)', overflow: 'hidden' }}>
                                <div style={{ width: `${(b.score / b.max) * 100}%`, height: '100%', borderRadius: '3px', background: c.tc }} />
                              </div>
                              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: c.tc, fontWeight: 700, minWidth: '50px', textAlign: 'right' }}>{b.score}/{b.max}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>Past brands:</span>
                          {c.past.map(p => <span key={p} style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: c.tc, background: c.tb, padding: '2px 7px', borderRadius: '100px' }}>{p}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════ STYLE TAGGER ════════════════════════════════════ */}
        {activeFeature === 'style-tagger' && (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>🏷️</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em', margin: 0 }}>AI Style Tagger</h2>
                  <p style={{ fontSize: '13px', color: '#7C3AED', fontWeight: 600, margin: '2px 0 0' }}>Portfolio upload → auto-tagged before it goes live</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '20px' }}>
                Every image uploaded by a creator is automatically classified by Claude Vision before it appears in search. Tags power style-filtered discovery — clients searching "dark & moody wedding" get matched to portfolios with those exact tags.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '20px' }}>
                {[
                  { k: 'AI Model',   v: 'Claude Vision (multimodal) · Anthropic' },
                  { k: 'Trigger',    v: 'Upload confirmed → BullMQ job queued' },
                  { k: 'Output',     v: 'JSON tag array + per-tag confidence %' },
                  { k: 'Storage',    v: 'Tags in Cloudflare R2 metadata + Algolia' },
                  { k: 'Processing', v: 'Async background — non-blocking for user' },
                ].map(m => (
                  <div key={m.k} style={{ display: 'flex', gap: '12px', padding: '9px 13px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#7C3AED', minWidth: '90px', textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: '1px' }}>{m.k}</span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{m.v}</span>
                  </div>
                ))}
              </div>

              {/* Processing pipeline */}
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pipeline</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  'Creator uploads → presigned R2 multipart',
                  'Upload confirmed → aiPortfolioTag queued',
                  'Claude Vision reads image → returns tags[]',
                  'Tags saved to R2 metadata + Algolia index',
                  'Image appears in style-filtered search',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '7px 12px', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: '#7C3AED', fontWeight: 700, flexShrink: 0, paddingTop: '1px' }}>{i + 1}.</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Portfolio Grid with Tags */}
            <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>
              <div style={{ background: '#F5F3FF', borderBottom: '1px solid rgba(124,58,237,0.15)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FC5256' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FDBA2C' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2CC840' }} />
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: '#7C3AED', marginLeft: '8px' }}>Creator Dashboard · Portfolio · AI tagging active</span>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>Portfolio · 6 images · Click to inspect tags</div>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '100px' }}>✓ AI-tagged</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
                  {PORTFOLIO_IMAGES.map((img, i) => (
                    <div key={i} onClick={() => setTaggedIdx(taggedIdx === i ? null : i)} style={{ borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', border: `1.5px solid ${taggedIdx === i ? '#7C3AED' : 'transparent'}`, transition: 'all 0.15s' }}>
                      {/* Image placeholder */}
                      <div style={{ height: '120px', background: img.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <span style={{ fontSize: '36px' }}>{img.emoji}</span>
                        <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '100px', padding: '2px 7px' }}>
                          <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '9px', color: '#fff', fontWeight: 700 }}>{img.confidence}%</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(124,58,237,0.9)', borderRadius: '100px', padding: '2px 7px' }}>
                          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '9px', color: '#fff', fontWeight: 700 }}>AI-tagged ✓</span>
                        </div>
                      </div>
                      {/* Tags */}
                      <div style={{ padding: '8px', background: 'var(--color-bg)', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {img.tags.slice(0, taggedIdx === i ? img.tags.length : 2).map(tag => (
                          <span key={tag} style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', padding: '2px 7px', borderRadius: '100px', background: '#F5F3FF', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.25)', fontWeight: 600 }}>{tag}</span>
                        ))}
                        {taggedIdx !== i && img.tags.length > 2 && (
                          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', padding: '2px 7px', borderRadius: '100px', background: 'var(--color-surface)', color: 'var(--color-muted)', border: '1px solid var(--color-hairline)' }}>+{img.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {taggedIdx !== null && (
                  <div style={{ marginTop: '14px', padding: '14px', borderRadius: '12px', background: '#F5F3FF', border: '1px solid rgba(124,58,237,0.25)' }}>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#7C3AED', marginBottom: '8px' }}>🏷️ All tags for image {taggedIdx + 1} · {PORTFOLIO_IMAGES[taggedIdx].confidence}% confidence</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {PORTFOLIO_IMAGES[taggedIdx].tags.map(tag => (
                        <span key={tag} style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', padding: '4px 10px', borderRadius: '100px', background: 'rgba(124,58,237,0.12)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.3)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: '8px', fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#7C3AED', opacity: 0.8 }}>These tags are now indexed in Algolia — this image appears in style-filtered search results for each tag.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════ AI CONCIERGE ════════════════════════════════════ */}
        {activeFeature === 'concierge' && (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>🤖</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em', margin: 0 }}>AI Concierge</h2>
                  <p style={{ fontSize: '13px', color: '#4F46E5', fontWeight: 600, margin: '2px 0 0' }}>One sentence → budget + matched creators</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '20px' }}>
                Collapses search + filter + budget estimation into one natural-language step. The visitor types a single sentence — the AI extracts all event parameters, runs the Budget Estimator, and returns a curated shortlist with explanations in under 4 seconds.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '20px' }}>
                {[
                  { k: 'AI Model',   v: 'claude-sonnet-4-6 · single structured call' },
                  { k: 'Reuses',     v: 'Budget Estimator + Fit Score caches' },
                  { k: 'Performance',v: '< 4s · ≤ 2 clarifying questions' },
                  { k: 'Access',     v: 'Visitors + logged-in users (sessions merge)' },
                  { k: 'Input',      v: 'Free text (+ optional voice input)' },
                ].map(m => (
                  <div key={m.k} style={{ display: 'flex', gap: '12px', padding: '9px 13px', borderRadius: '9px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#4F46E5', minWidth: '90px', textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: '1px' }}>{m.k}</span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11.5px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{m.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Concierge flow</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {['Visitor types free text (+ voice)', 'Claude extracts EventParams (structured)', 'Budget Estimator → price range', 'Matching engine → ranked creators', '"Why this fits" explanation per creator', 'Session merges into account on sign-up'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', padding: '7px 12px', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: '#4F46E5', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Chat UI */}
            <div style={{ background: 'var(--color-surface)', borderRadius: '20px', border: '1.5px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>
              <div style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#fff' }}>Sceneora AI Concierge</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Powered by Claude · responds in &lt; 4s</div>
                </div>
                <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '100px' }}>🟢 Online</div>
              </div>

              <div style={{ padding: '20px', maxHeight: '500px', overflowY: 'auto' }}>
                {/* Welcome bubble */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</span>
                  <div style={{ padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: '#EEF2FF', border: '1px solid rgba(79,70,229,0.15)', maxWidth: '80%' }}>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#1E1B4B', lineHeight: 1.65 }}>
                      Hi! Tell me about your event in one sentence — service type, city, and rough budget. I'll find matching creators and estimate your costs instantly.
                    </div>
                  </div>
                </div>

                {/* Progressive chat messages */}
                {CONCIERGE_MESSAGES.slice(0, chatStep).map((msg, i) => (
                  <div key={i}>
                    {msg.role === 'user' && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                        <div style={{ padding: '12px 16px', borderRadius: '14px 4px 14px 14px', background: '#4F46E5', maxWidth: '80%' }}>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#fff', lineHeight: 1.65 }}>{msg.text}</div>
                        </div>
                      </div>
                    )}
                    {msg.role === 'ai' && msg.type === 'thinking' && (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</span>
                        <div style={{ padding: '10px 14px', borderRadius: '4px 14px 14px 14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)' }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#4F46E5' }}>⚙️ {msg.label}</div>
                        </div>
                      </div>
                    )}
                    {msg.role === 'ai' && msg.type === 'params' && (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</span>
                        <div style={{ padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#4F46E5', marginBottom: '8px' }}>📋 Event parameters extracted</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                            {Object.entries(msg.params as Record<string,string>).map(([k, v]) => (
                              <div key={k} style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>
                                <span style={{ fontWeight: 700, color: '#4F46E5' }}>{k}:</span> {v}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {msg.role === 'ai' && msg.type === 'budget' && (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</span>
                        <div style={{ padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#4F46E5', marginBottom: '8px' }}>💰 Budget estimate</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                            {[
                              { t: 'Low',         v: (msg.budget as {low:string,rec:string,pre:string,note:string}).low,  c: '#64748B', bg: '#F8FAFC' },
                              { t: 'Recommended', v: (msg.budget as {low:string,rec:string,pre:string,note:string}).rec,  c: '#4F46E5', bg: '#EEF2FF' },
                              { t: 'Premium',     v: (msg.budget as {low:string,rec:string,pre:string,note:string}).pre,  c: '#B45309', bg: '#FFFBEB' },
                            ].map(b => (
                              <div key={b.t} style={{ padding: '8px 6px', borderRadius: '8px', background: b.bg, textAlign: 'center' }}>
                                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', color: b.c, fontWeight: 600 }}>{b.t}</div>
                                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '13px', color: b.c }}>{b.v}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#059669', background: '#ECFDF5', padding: '5px 9px', borderRadius: '7px' }}>{(msg.budget as {note:string}).note}</div>
                        </div>
                      </div>
                    )}
                    {msg.role === 'ai' && msg.type === 'matches' && (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</span>
                        <div style={{ padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#4F46E5', marginBottom: '8px' }}>🎯 Top matches for your brief</div>
                          {(msg.matches as {name:string,city:string,price:string,score:number,avail:boolean,tags:string[]}[]).map(m => (
                            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '9px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', marginBottom: '6px' }}>
                              <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>📷</span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)' }}>{m.name} · {m.city}</div>
                                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>{m.price} · {m.tags.join(' · ')}</div>
                              </div>
                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '14px', color: m.avail ? '#059669' : '#DC2626' }}>{m.score}</div>
                                {m.avail ? <div style={{ fontSize: '9px', color: '#059669' }}>Available</div> : <div style={{ fontSize: '9px', color: '#DC2626' }}>Booked</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {msg.role === 'ai' && msg.text && (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</span>
                        <div style={{ padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: '#EEF2FF', border: '1px solid rgba(79,70,229,0.15)', maxWidth: '80%' }}>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#1E1B4B', lineHeight: 1.65 }}>{msg.text}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Step controls */}
                <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                  {chatStep < CONCIERGE_MESSAGES.length ? (
                    <button onClick={() => setChatStep(s => s + 1)} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: '#4F46E5', color: '#fff', border: 'none', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                      {chatStep === 0 ? '▶ Start conversation' : '⟶ Next message'}
                    </button>
                  ) : (
                    <button onClick={() => setChatStep(0)} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'var(--color-surface)', color: '#4F46E5', border: '1.5px solid #4F46E544', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                      ↺ Replay conversation
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* How AI connects every step */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: '20px', padding: '40px', border: '1px solid var(--color-hairline)' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.03em', marginBottom: '8px' }}>AI at every step of the platform</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '28px' }}>None of these are standalone features — each one connects to the core booking/deal workflow.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '12px' }}>
            {[
              { stage: 'Discovery',    icon: '🔍', feature: 'AI Concierge',       desc: 'Natural language → shortlist in < 4s', color: '#4F46E5', bg: '#EEF2FF' },
              { stage: 'Budget',       icon: '💰', feature: 'AI Budget Estimator',desc: '7-step → price range + matched creators', color: '#7C3AED', bg: '#F5F3FF' },
              { stage: 'Portfolio',    icon: '🏷️', feature: 'AI Style Tagger',   desc: 'Upload → tags for style-filtered search', color: '#7C3AED', bg: '#F5F3FF' },
              { stage: 'Brand Match',  icon: '📊', feature: 'AI Fit Score',       desc: 'Formula → Strong / Good / Partial badge', color: '#D97706', bg: '#FFFBEB' },
              { stage: 'Brand Brief',  icon: '📋', feature: 'AI Brief Parser',    desc: 'PDF/form → structured deliverables + contract', color: '#0891B2', bg: '#ECFEFF' },
            ].map(s => (
              <button key={s.stage} onClick={() => setActiveFeature(NAV_TABS.find(t => t.label === s.feature)?.id || activeFeature)} style={{ padding: '18px', borderRadius: '14px', background: s.bg, border: `1px solid ${s.color}22`, textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 8px 24px ${s.color}22` }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '' }}
              >
                <span style={{ fontSize: '22px', display: 'block', marginBottom: '10px' }}>{s.icon}</span>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: s.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{s.stage}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '5px' }}>{s.feature}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11.5px', color: 'var(--color-muted)', lineHeight: 1.5 }}>{s.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Explore roles */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid var(--color-hairline)', paddingTop: '48px' }}>
        <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Explore platform roles →</h3>
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
