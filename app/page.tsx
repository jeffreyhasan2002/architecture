'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav, { ROLES } from '../components/SceneoraNav'

const STATS = [
  { value: '3M+', label: 'Creative Professionals', icon: '🎨' },
  { value: '₹8,000Cr', label: 'Wedding Market / Year', icon: '💍' },
  { value: '200+', label: 'Cities Covered', icon: '📍' },
  { value: '4.9★', label: 'Avg Platform Rating', icon: '⭐' },
]

const VERTICALS = [
  {
    id: 'photography', icon: '📷', label: 'Photography & Video',
    color: '#7C3AED', bg: '#F5F3FF',
    desc: 'Find verified photographers, videographers & cinematographers for weddings, events, commercial shoots.',
    tags: ['Wedding', 'Portraits', 'Commercial', 'Events', 'Fashion', 'Product'],
    href: '/roles/creator',
  },
  {
    id: 'content', icon: '🎬', label: 'Content Creation',
    color: '#D97706', bg: '#FFFBEB',
    desc: 'Connect brands with UGC creators, influencers, and social media specialists for campaigns.',
    tags: ['UGC', 'Instagram', 'YouTube', 'Brand Deals', 'Reels', 'Reviews'],
    href: '/roles/content-creator',
  },
  {
    id: 'spaces', icon: '🏛️', label: 'Photography Spaces',
    color: '#0F62FE', bg: '#EFF4FF',
    desc: 'Book indoor studios, outdoor locations, and lifestyle sets by the hour. Instant or request-to-book.',
    tags: ['White Cyc', 'Rooftop', 'Home Sets', 'Outdoor', 'Commercial', 'Instant Book'],
    href: '/spaces',
  },
  {
    id: 'gear', icon: '🎥', label: 'Gear Rental',
    color: '#059669', bg: '#ECFDF5',
    desc: 'Rent cameras, lenses, lighting, audio & drones from verified shops or individual creators.',
    tags: ['Sony', 'Canon', 'DJI', 'Aputure', 'Lighting', 'Audio'],
    href: '/gear',
  },
]

const FEATURED_CREATORS = [
  { name: 'Arjun Mehta', role: 'Wedding Photographer', city: 'Coimbatore', price: 45000, rating: 4.97, reviews: 312, badge: '⚡ Top Rated', tags: ['Candid', 'Drone', 'Pre-wedding'], gradient: 'linear-gradient(135deg,#667eea,#764ba2)', trust: 96 },
  { name: 'Priya Nair', role: 'Fashion & Lifestyle', city: 'Chennai', price: 18000, rating: 4.94, reviews: 187, badge: '✓ KYC Verified', tags: ['Fashion', 'Editorial', 'BTS'], gradient: 'linear-gradient(135deg,#f093fb,#f5576c)', trust: 94 },
  { name: 'Rahul Sharma', role: 'Cinematographer', city: 'Bengaluru', price: 65000, rating: 4.92, reviews: 143, badge: '⚡ Top Rated', tags: ['Wedding Films', 'Commercial', '4K'], gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)', trust: 98 },
  { name: 'Sneha Iyer', role: 'Content Creator · UGC', city: 'Mumbai', price: 25000, rating: 4.95, reviews: 94, badge: '🔥 Rising Star', tags: ['Food', 'Lifestyle', 'Beauty'], gradient: 'linear-gradient(135deg,#fa709a,#fee140)', trust: 91 },
]

const FEATURED_SPACES = [
  { name: 'The White Loft Studio', type: 'Indoor · White Cyc', city: 'Coimbatore', price: 1200, rating: 4.97, reviews: 312, badge: '⚡ Instant Book', gradient: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)' },
  { name: 'Rooftop Golden Hour', type: 'Outdoor · Rooftop', city: 'Chennai', price: 900, rating: 4.92, reviews: 187, badge: '', gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
  { name: 'Cozy Lifestyle Set', type: 'Home · Lifestyle', city: 'Bengaluru', price: 700, rating: 4.88, reviews: 94, badge: '⚡ Instant Book', gradient: 'linear-gradient(135deg,#fdf2f8,#fce7f3)' },
  { name: 'Glass Cube Studio', type: 'Indoor · Commercial', city: 'Mumbai', price: 1800, rating: 4.96, reviews: 144, badge: '⚡ Instant Book', gradient: 'linear-gradient(135deg,#e0f2fe,#bae6fd)' },
]

const FEATURED_GEAR = [
  { name: 'Sony A7 IV', brand: 'Sony', owner: 'shop', price: 2400, rating: 4.97, cond: 'Like New', condColor: '#059669', condBg: '#ECFDF5', gradient: 'linear-gradient(135deg,#1e1e2e,#2d2d44)', emoji: '📷' },
  { name: 'Canon RF 50mm f/1.2L', brand: 'Canon', owner: 'shop', price: 1400, rating: 4.95, cond: 'Like New', condColor: '#059669', condBg: '#ECFDF5', gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)', emoji: '🔭' },
  { name: 'Aputure 600d Pro', brand: 'Aputure', owner: 'shop', price: 1800, rating: 4.93, cond: 'Excellent', condColor: '#0F62FE', condBg: '#EFF4FF', gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)', emoji: '💡' },
  { name: 'DJI RS 3 Pro', brand: 'DJI', owner: 'individual', price: 900, rating: 4.91, cond: 'Like New', condColor: '#059669', condBg: '#ECFDF5', gradient: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', emoji: '🦾' },
]

const CHAOS_TOOLS = [
  { icon: '📸', label: 'Instagram DMs', desc: 'Discovery' },
  { icon: '💬', label: 'WhatsApp', desc: 'Negotiation' },
  { icon: '📞', label: 'Phone Calls', desc: 'Confirmations' },
  { icon: '📁', label: 'Google Drive', desc: 'File Delivery' },
  { icon: '💸', label: 'UPI Apps', desc: 'Payments' },
  { icon: '📧', label: 'Email', desc: 'Invoices' },
]

const HOW_STEPS = [
  { icon: '🔍', num: '01', title: 'Search & Discover', desc: 'Find photographers, videographers, spaces, or gear by location, style, budget, and live availability.' },
  { icon: '📅', num: '02', title: 'Check Availability', desc: 'See real-time availability. Reserve a 15-min soft hold while you complete your booking.' },
  { icon: '💳', num: '03', title: 'Book & Pay Securely', desc: 'Pay advance via Razorpay. Funds held in escrow — released only after delivery confirmed.' },
  { icon: '🎬', num: '04', title: 'Create & Deliver', desc: 'Complete the shoot, deliver the gallery, or publish content. Everything tracked in-platform.' },
  { icon: '⭐', num: '05', title: 'Review & Grow', desc: 'Leave a review. Trust scores update, creators rank higher, everyone wins.' },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('photography')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)' }}>
      <SceneoraNav active="/" />

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Gradient blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '5%', left: '5%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', top: '15%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(15,98,254,0.07) 0%,transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '700px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(5,150,105,0.06) 0%,transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '860px' }}>
          {/* Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(15,98,254,0.25)', marginBottom: '32px', background: 'rgba(15,98,254,0.05)' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#059669', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '12px', color: 'var(--color-accent)', letterSpacing: '0.02em' }}>Now in Beta — India's Creative Commerce Platform</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(2.4rem,6.5vw,4.5rem)', letterSpacing: '-0.045em', lineHeight: 1.06, marginBottom: '24px', color: 'var(--color-ink)' }}>
            The Operating System<br />
            <span style={{ color: 'var(--color-accent)' }}>for Creative Relationships.</span>
          </h1>

          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--color-muted)', maxWidth: '640px', margin: '0 auto 16px' }}>
            Discover verified photographers, videographers, content creators & studios. Book spaces, rent gear, run brand deals — all with escrow payments, trust scores, and zero WhatsApp chaos.
          </p>
          <p style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', color: 'var(--color-muted)', marginBottom: '40px', letterSpacing: '0.01em' }}>
            Built for India's ₹11,000 Crore creative economy. 3M+ creators. One platform.
          </p>

          {/* Search bar */}
          <div style={{ display: 'flex', background: 'var(--color-surface)', border: '2px solid var(--color-hairline)', borderRadius: '14px', overflow: 'hidden', maxWidth: '640px', margin: '0 auto 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', transition: 'border-color 0.2s' }}
            onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = '#7C3AED'}
            onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-hairline)'}
          >
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input placeholder="Search photographers, spaces, gear... (e.g. 'wedding photographer Coimbatore')" style={{ border: 'none', background: 'transparent', fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-ink)', flex: 1, outline: 'none', minWidth: 0 }} />
            </div>
            <button style={{ margin: '8px', padding: '10px 20px', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >Search →</button>
          </div>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              { label: 'Find a Creator', href: '/roles/creator', color: '#7C3AED', bg: '#F5F3FF', border: 'rgba(124,58,237,0.25)' },
              { label: 'Book a Space', href: '/spaces', color: '#0F62FE', bg: '#EFF4FF', border: 'rgba(15,98,254,0.25)' },
              { label: 'Rent Gear', href: '/gear', color: '#059669', bg: '#ECFDF5', border: 'rgba(5,150,105,0.25)' },
              { label: 'Brand Deals', href: '/roles/content-creator', color: '#D97706', bg: '#FFFBEB', border: 'rgba(217,119,6,0.25)' },
            ].map(btn => (
              <Link key={btn.label} href={btn.href} style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: btn.color, background: btn.bg, textDecoration: 'none', padding: '9px 18px', borderRadius: '9px', border: `1px solid ${btn.border}`, transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
              >{btn.label}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✓ KYC-verified creators', '✓ Escrow-protected payments', '✓ Live availability calendar', '✓ Trust score ranking'].map(f => (
              <span key={f} style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'flex', marginTop: '72px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '16px', overflow: 'hidden', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: '22px 44px', textAlign: 'center', borderRight: i < STATS.length - 1 ? '1px solid var(--color-hairline)' : 'none' }}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.9rem', color: 'var(--color-accent)', letterSpacing: '-0.03em' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem → Solution ── */}
      <section style={{ padding: '80px 24px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#DC2626', background: '#FFF1F0', padding: '4px 14px', borderRadius: '100px', marginBottom: '16px' }}>The Problem</div>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '12px' }}>Creative projects run across 6 broken tools</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-muted)', maxWidth: '560px', margin: '0 auto' }}>
              Every shoot in India today is managed across Instagram DMs, WhatsApp, phone calls, Google Drive, UPI, and email. <strong>This is not a workflow. It's chaos with a deadline.</strong>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '12px', marginBottom: '48px' }}>
            {CHAOS_TOOLS.map(t => (
              <div key={t.label} style={{ padding: '20px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#DC2626', opacity: 0.4 }} />
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{t.icon}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '4px' }}>{t.label}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#059669' }}>Sceneora collapses it into one</span>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg,#0F62FE,#7C3AED)', borderRadius: '18px', padding: '40px', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🎯</div>
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '12px' }}>One connected, trusted, professional workflow</h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.7 }}>
              Discovery → Communication → Booking → Escrow Payment → Delivery → Review → Trust Score → Better Ranking → More Bookings
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['No WhatsApp chaos', 'Escrow payments', 'KYC-verified creators', 'Auto-contracts', 'Trust scores'].map(f => (
                <span key={f} style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '12px', background: 'rgba(255,255,255,0.15)', padding: '5px 12px', borderRadius: '100px', color: '#fff' }}>✓ {f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform Verticals ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0F62FE', background: '#EFF4FF', padding: '4px 14px', borderRadius: '100px', marginBottom: '16px' }}>Platform</div>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '12px' }}>Everything the Creative Economy Needs</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-muted)', maxWidth: '520px', margin: '0 auto' }}>Four verticals. One login. One platform. One trust layer.</p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {VERTICALS.map(v => (
            <button key={v.id} onClick={() => setActiveTab(v.id)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 18px',
              borderRadius: '100px', border: `1.5px solid ${activeTab === v.id ? v.color : 'var(--color-hairline)'}`,
              background: activeTab === v.id ? v.bg : 'var(--color-surface)',
              fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px',
              color: activeTab === v.id ? v.color : 'var(--color-muted)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: '15px' }}>{v.icon}</span>{v.label}
            </button>
          ))}
        </div>

        {VERTICALS.map(v => v.id === activeTab && (
          <div className="split-2col" key={v.id} style={{ background: v.bg, borderRadius: '20px', padding: '40px', border: `1.5px solid ${v.color}22`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', color: v.color, marginBottom: '12px' }}>{v.label}</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-ink)', lineHeight: 1.7, marginBottom: '24px' }}>{v.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {v.tags.map(t => <span key={t} style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '12px', background: 'rgba(0,0,0,0.06)', color: 'var(--color-ink)', padding: '5px 12px', borderRadius: '100px' }}>{t}</span>)}
              </div>
              <Link href={v.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#fff', background: v.color, textDecoration: 'none', padding: '12px 24px', borderRadius: '10px', transition: 'opacity 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Explore {v.label} →
              </Link>
            </div>
            {/* Mini mockup */}
            <div style={{ background: 'var(--color-surface)', borderRadius: '14px', border: '1px solid var(--color-hairline)', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
              <div style={{ background: `${v.color}15`, borderBottom: '1px solid var(--color-hairline)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBB2C' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2BC840' }} />
                <div style={{ flex: 1, background: 'var(--color-hairline)', borderRadius: '4px', height: '18px', marginLeft: '8px', padding: '0 10px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)' }}>sceneora.com/{v.id}</span>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '12px' }}>Top Results</div>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', marginBottom: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{v.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ height: '10px', background: 'var(--color-hairline)', borderRadius: '4px', width: `${75 + n * 5}%`, marginBottom: '6px' }} />
                      <div style={{ height: '8px', background: 'var(--color-hairline)', borderRadius: '4px', width: '55%', opacity: 0.6 }} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: v.color, flexShrink: 0 }}>₹{(n * 12000).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Featured Creators ── */}
      <section style={{ padding: '80px 24px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '6px' }}>Featured Creators</h2>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'var(--color-muted)' }}>KYC-verified, top-rated professionals across India</p>
            </div>
            <Link href="/roles/creator" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#7C3AED', textDecoration: 'none' }}>Browse all creators →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '18px' }}>
            {FEATURED_CREATORS.map(c => (
              <div key={c.name} style={{ borderRadius: '16px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'; el.style.borderColor = '#7C3AED44' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'var(--color-hairline)' }}
              >
                <div style={{ height: '130px', background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', border: '2px solid rgba(255,255,255,0.4)' }}>📷</div>
                  {c.badge && <span style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '3px 9px', borderRadius: '100px', fontWeight: 700, backdropFilter: 'blur(4px)' }}>{c.badge}</span>}
                  <span style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '3px 9px', borderRadius: '100px', fontWeight: 700 }}>Trust {c.trust}%</span>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>{c.name}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginBottom: '8px' }}>{c.role} · {c.city}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {c.tags.map(t => <span key={t} style={{ fontSize: '10px', background: 'var(--color-surface)', color: 'var(--color-muted)', padding: '2px 8px', borderRadius: '100px', border: '1px solid var(--color-hairline)' }}>{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>★ {c.rating} <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>({c.reviews})</span></span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '13px', color: '#7C3AED' }}>from ₹{(c.price / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Spaces ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '6px' }}>Photography Spaces</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'var(--color-muted)' }}>Book by the hour — studios, rooftops, home sets & outdoor locations</p>
          </div>
          <Link href="/spaces" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#0F62FE', textDecoration: 'none' }}>View all spaces →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '18px' }}>
          {FEATURED_SPACES.map(s => (
            <Link key={s.name} href="/spaces" style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', overflow: 'hidden', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#0F62FE44'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = ''; el.style.boxShadow = '' }}
              >
                <div style={{ height: '140px', background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', position: 'relative' }}>
                  🏛️
                  {s.badge && <span style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', background: '#059669', color: '#fff', padding: '3px 9px', borderRadius: '100px', fontWeight: 700 }}>{s.badge}</span>}
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '2px' }}>{s.name}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginBottom: '6px' }}>{s.type} · {s.city}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>★ {s.rating} ({s.reviews})</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '13px', color: '#0F62FE' }}>₹{s.price}/hr</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Gear ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '6px' }}>Gear Rental</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'var(--color-muted)' }}>Cameras, lenses, lighting & drones — verified shops + individual creators</p>
          </div>
          <Link href="/gear" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: '#059669', textDecoration: 'none' }}>View all gear →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '18px' }}>
          {FEATURED_GEAR.map(g => (
            <Link key={g.name} href="/gear" style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: '14px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', overflow: 'hidden', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#05996944'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = ''; el.style.boxShadow = '' }}
              >
                <div style={{ height: '120px', background: g.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '34px', position: 'relative' }}>
                  {g.emoji}
                  <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9px', background: g.owner === 'shop' ? '#0F62FE' : '#059669', color: '#fff', padding: '3px 8px', borderRadius: '100px', fontWeight: 700 }}>{g.owner === 'shop' ? '🏪 Shop' : '🤝 Creator'}</span>
                  <span style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '9px', background: g.condBg, color: g.condColor, padding: '3px 8px', borderRadius: '100px', fontWeight: 700 }}>{g.cond}</span>
                </div>
                <div style={{ padding: '13px' }}>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>{g.brand}</div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)', marginBottom: '8px' }}>{g.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>★ {g.rating}</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '13px', color: '#059669' }}>₹{g.price}/day</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Roles ── */}
      <section style={{ padding: '80px 24px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C3AED', background: '#F5F3FF', padding: '4px 14px', borderRadius: '100px', marginBottom: '16px' }}>Platform Roles</div>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '12px' }}>Built for Everyone in the Creative Ecosystem</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-muted)', maxWidth: '560px', margin: '0 auto' }}>From the first-time couple hiring a photographer, to the agency managing 50 freelancers — every role has a tailored portal.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px' }}>
            {ROLES.map(r => (
              <Link key={r.key} href={r.href} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '24px', borderRadius: '14px', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', transition: 'all 0.2s', height: '100%', display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = r.color; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 8px 24px ${r.color}22` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-hairline)'; el.style.transform = ''; el.style.boxShadow = '' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '14px' }}>{r.icon}</div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: r.color, marginBottom: '6px' }}>{r.label}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6, flex: 1 }}>{r.desc}</div>
                  <div style={{ marginTop: '16px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: r.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    See how it works
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#059669', background: '#ECFDF5', padding: '4px 14px', borderRadius: '100px', marginBottom: '16px' }}>How It Works</div>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '12px' }}>5 Steps. Zero Chaos.</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-muted)' }}>The same trusted flow for creators, spaces, and gear</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '24px' }}>
          {HOW_STEPS.map((s, i) => (
            <div key={s.title} style={{ textAlign: 'center', position: 'relative' }}>
              {i < HOW_STEPS.length - 1 && (
                <div style={{ position: 'absolute', top: '26px', left: 'calc(50% + 26px)', right: 'calc(-50% + 26px)', height: '2px', background: 'var(--color-hairline)', zIndex: 0, display: 'none' }} />
              )}
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--color-surface)', border: '2px solid var(--color-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 14px', position: 'relative', zIndex: 1 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '6px' }}>{s.num}</div>
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '6px' }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', borderRadius: '24px', background: 'linear-gradient(135deg,#7C3AED 0%,#0F62FE 100%)', padding: '72px 52px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '340px', height: '340px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: '-100px', left: '-50px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff', letterSpacing: '-0.03em', marginBottom: '16px' }}>Ready to build something?</h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.7 }}>
              3M+ creators. 2,400+ spaces. 8,900+ gear items. One trusted platform built for India's creative economy.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/roles/client#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#7C3AED', background: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: '10px', transition: 'opacity 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >I'm a Client</Link>
              <Link href="/roles/creator#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.15)', textDecoration: 'none', padding: '14px 28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'}
              >I'm a Creator</Link>
              <Link href="/roles/brand#onboarding" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'rgba(255,255,255,0.12)', textDecoration: 'none', padding: '14px 28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.25)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.20)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}
              >I'm a Brand</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--color-hairline)', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '36px', marginBottom: '36px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.04em', color: 'var(--color-ink)', marginBottom: '10px' }}>SCENEORA</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '12px' }}>The operating system for India's creative economy. Discovery → Booking → Escrow → Trust.</div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, color: '#0F62FE', background: '#EFF4FF', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>BETA</div>
          </div>
          {[
            { title: 'Platform', links: [{ label: 'Photography & Video', href: '/roles/creator' }, { label: 'Content Creation', href: '/roles/content-creator' }, { label: 'Book a Space', href: '/spaces' }, { label: 'Rent Gear', href: '/gear' }] },
            { title: 'Roles', links: ROLES.slice(0, 6).map(r => ({ label: r.label, href: r.href })) },
            { title: 'Learn', links: [{ label: 'How It Works', href: '/roles/client' }, { label: 'Architecture Docs', href: '/docs' }, { label: 'Space Rental Guide', href: '/how-it-works/spaces' }, { label: 'Gear Rental Guide', href: '/how-it-works/gear' }] },
            { title: 'Company', links: [{ label: 'About Sceneora', href: '/' }, { label: 'R&D Story', href: '/docs' }, { label: 'Trust & Safety', href: '/roles/trust-officer' }, { label: 'Admin Console', href: '/roles/admin' }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-ink)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '14px' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {col.links.map(l => (
                  <Link key={l.label} href={l.href} style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.12s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-ink)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'}
                  >{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>© 2026 Sceneora · Operating System for Creative Relationships · India</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Privacy', 'Terms', 'Refund Policy', 'Grievance', 'Support'].map(l => <span key={l} style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', cursor: 'pointer', transition: 'color 0.12s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-ink)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'}
            >{l}</span>)}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
      `}</style>
    </div>
  )
}
