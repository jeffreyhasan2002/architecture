'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ROLES = [
  { key: 'visitor',         label: 'Visitor',          icon: '👤', desc: 'Browse & discover freely',             color: '#5A5F7A', bg: '#F0F1F8', href: '/roles/visitor' },
  { key: 'client',          label: 'Client',            icon: '📅', desc: 'Book creators for events & shoots',    color: '#4F46E5', bg: '#EEF2FF', href: '/roles/client' },
  { key: 'creator',         label: 'Creator',           icon: '📷', desc: 'Photographers, videographers, MUAs',   color: '#7C3AED', bg: '#F5F3FF', href: '/roles/creator' },
  { key: 'content-creator', label: 'Content Creator',   icon: '🎬', desc: 'UGC & brand deal creators',           color: '#B45309', bg: '#FFFBEB', href: '/roles/content-creator' },
  { key: 'brand',           label: 'Brand',             icon: '🏢', desc: 'Hire talent for campaigns',            color: '#0891B2', bg: '#ECFEFF', href: '/roles/brand' },
  { key: 'agency',          label: 'Agency',            icon: '🏛️', desc: 'Manage teams & projects at scale',    color: '#1D4ED8', bg: '#EFF6FF', href: '/roles/agency' },
  { key: 'moderator',       label: 'Moderator',         icon: '🛡️', desc: 'Platform content review',            color: '#059669', bg: '#ECFDF5', href: '/roles/moderator' },
  { key: 'trust-officer',   label: 'Trust Officer',     icon: '⚖️', desc: 'Dispute resolution specialist',       color: '#DC2626', bg: '#FEF2F2', href: '/roles/trust-officer' },
  { key: 'admin',           label: 'Admin',             icon: '🔧', desc: 'Full platform operations',            color: '#374151', bg: '#F9FAFB', href: '/roles/admin' },
]

const HOW_GUIDES = [
  { icon: '📅', bg: '#EEF2FF', color: '#4F46E5', href: '/roles/client',              title: 'For Clients',       desc: 'Book creators for your events' },
  { icon: '📷', bg: '#F5F3FF', color: '#7C3AED', href: '/roles/creator',             title: 'For Creators',      desc: 'Get discovered and booked' },
  { icon: '🎬', bg: '#FFFBEB', color: '#B45309', href: '/how-it-works/brand-deals',  title: 'Brand Deals',       desc: 'Content creator × brand collabs' },
  { icon: '🏛️', bg: '#EEF2FF', color: '#4F46E5', href: '/how-it-works/spaces',      title: 'Space Rental',      desc: 'Book photography locations' },
  { icon: '🎥', bg: '#F5F3FF', color: '#7C3AED', href: '/how-it-works/gear',         title: 'Gear Rental',       desc: 'Rent professional equipment' },
]

const HOW_OWNERS = [
  { icon: '🏛️', bg: '#EEF2FF', color: '#0F62FE', href: '/spaces/owner', title: 'Space Owner Portal', desc: 'List spaces, track earnings & bookings' },
  { icon: '🔧', bg: '#F5F3FF', color: '#7C3AED', href: '/gear/owner',   title: 'Gear Owner Portal',  desc: 'List gear, manage rentals & deposits' },
]

const FLOW_LINKS = [
  { icon: '🧭', bg: '#ECFDF5', color: '#059669', href: '/flow',         title: 'Overview',              desc: 'The whole platform, one picture' },
  { icon: '🔑', bg: '#EEF2FF', color: '#4F46E5', href: '/flow/signup',  title: 'Sign-Up & Onboarding',   desc: 'One form, role-adaptive wizard' },
  { icon: '👥', bg: '#F5F3FF', color: '#7C3AED', href: '/flow/roles',   title: 'Role Journeys',          desc: 'What each role does after signup' },
  { icon: '⚙️', bg: '#ECFEFF', color: '#0891B2', href: '/flow/systems', title: 'Shared Systems',         desc: 'Auth, payments, subscriptions, disputes' },
]

const FEATURES_LINKS = [
  { icon: '🤖', bg: '#EEF2FF', color: '#4F46E5', href: '/features/ai',       title: 'AI Features',       desc: 'Budget Estimator, Brief Parser, Fit Score, Concierge' },
  { icon: '🧭', bg: '#ECFDF5', color: '#059669', href: '/features/platform', title: 'Platform Features',  desc: 'All 22 features from the spec, §3.2–3.10' },
]

export default function SceneoraNav({ active }: { active?: string }) {
  const [scrolled, setScrolled]     = useState(false)
  const [rolesOpen, setRolesOpen]   = useState(false)
  const [howOpen, setHowOpen]       = useState(false)
  const [flowOpen, setFlowOpen]     = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileRoles, setMobileRoles] = useState(false)
  const [mobileHow, setMobileHow]   = useState(false)
  const [mobileFlow, setMobileFlow] = useState(false)
  const [mobileFeatures, setMobileFeatures] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const currentPath = active ?? pathname ?? '/'
  const isActive = (href: string) => currentPath === href || currentPath.startsWith(href + '/')

  const navBtnStyle = (href?: string): React.CSSProperties => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '13.5px',
    color: href && isActive(href) ? 'var(--color-accent)' : 'var(--color-muted)',
    background: href && isActive(href) ? 'var(--color-accent-muted)' : 'none',
    border: 'none',
    padding: '7px 13px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.14s',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  })

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '64px', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '4px',
        background: scrolled || mobileOpen ? 'rgba(248,249,252,0.97)' : 'transparent',
        borderBottom: scrolled ? '1.5px solid var(--color-hairline)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        transition: 'all 0.22s ease',
      }}>
        {/* Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.045em',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>SCENEORA</span>
          <span style={{
            fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 800,
            color: 'var(--color-accent)', background: 'var(--color-accent-muted)',
            padding: '2px 9px', borderRadius: '5px', letterSpacing: '0.05em', textTransform: 'uppercase',
            border: '1px solid rgba(79,70,229,0.2)',
          }}>Beta</span>
        </Link>

        {/* Desktop Primary Nav */}
        <nav className="sceneora-desktop-nav" style={{ display: 'flex', gap: '2px', alignItems: 'center', flex: 1 }}>

          {/* Roles mega-menu */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setRolesOpen(true)} onMouseLeave={() => setRolesOpen(false)}>
            <button style={navBtnStyle('/roles')}
              onMouseEnter={e => { if (!isActive('/roles')) { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' } }}
              onMouseLeave={e => { if (!isActive('/roles')) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' } }}
            >
              Platform
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: rolesOpen ? 'rotate(180deg)' : '' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {rolesOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', borderRadius: '18px', padding: '14px', width: '580px', boxShadow: 'var(--shadow-dialog)', zIndex: 400, animation: 'fadeInUp 0.18s ease-out both' }}>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-muted)', letterSpacing: '0.09em', textTransform: 'uppercase', padding: '4px 10px 12px', borderBottom: '1px solid var(--color-hairline)', marginBottom: '10px' }}>Platform Roles</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                  {ROLES.map(r => (
                    <Link key={r.key} href={r.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 11px', borderRadius: '11px', textDecoration: 'none', transition: 'background 0.12s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}>
                      <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0, border: '1px solid rgba(0,0,0,0.05)' }}>{r.icon}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', color: r.color }}>{r.label}</div>
                        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '1px', lineHeight: 1.3 }}>{r.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* How It Works dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setHowOpen(true)} onMouseLeave={() => setHowOpen(false)}>
            <button style={navBtnStyle('/how-it-works')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' }}
            >
              How It Works
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: howOpen ? 'rotate(180deg)' : '' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {howOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', borderRadius: '15px', padding: '8px', minWidth: '300px', boxShadow: 'var(--shadow-dialog)', zIndex: 400, animation: 'fadeInUp 0.18s ease-out both' }}>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px 8px', borderBottom: '1px solid var(--color-hairline)', marginBottom: '4px' }}>Guides</div>
                {HOW_GUIDES.map(item => (
                  <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 13px', borderRadius: '11px', textDecoration: 'none', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{item.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '1px' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 12px 8px', borderTop: '1px solid var(--color-hairline)', marginTop: '4px' }}>Owner Portals</div>
                {HOW_OWNERS.map(item => (
                  <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 13px', borderRadius: '11px', textDecoration: 'none', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{item.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '1px' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Flow mega-menu */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setFlowOpen(true)} onMouseLeave={() => setFlowOpen(false)}>
            <button style={navBtnStyle('/flow')}
              onMouseEnter={e => { if (!isActive('/flow')) { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' } }}
              onMouseLeave={e => { if (!isActive('/flow')) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' } }}
            >
              🧭 Flow
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: flowOpen ? 'rotate(180deg)' : '' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {flowOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', borderRadius: '15px', padding: '8px', minWidth: '300px', boxShadow: 'var(--shadow-dialog)', zIndex: 400, animation: 'fadeInUp 0.18s ease-out both' }}>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px 8px', borderBottom: '1px solid var(--color-hairline)', marginBottom: '4px' }}>Signup → Everything, tied together</div>
                {FLOW_LINKS.map(item => (
                  <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 13px', borderRadius: '11px', textDecoration: 'none', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{item.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '1px' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Features dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setFeaturesOpen(true)} onMouseLeave={() => setFeaturesOpen(false)}>
            <button style={navBtnStyle('/features')}
              onMouseEnter={e => { if (!isActive('/features')) { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' } }}
              onMouseLeave={e => { if (!isActive('/features')) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' } }}
            >
              Features
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: featuresOpen ? 'rotate(180deg)' : '' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {featuresOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)', borderRadius: '15px', padding: '8px', minWidth: '300px', boxShadow: 'var(--shadow-dialog)', zIndex: 400, animation: 'fadeInUp 0.18s ease-out both' }}>
                {FEATURES_LINKS.map(item => (
                  <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 13px', borderRadius: '11px', textDecoration: 'none', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{item.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginTop: '1px' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { href: '/creators',    label: 'Creators' },
            { href: '/spaces',      label: 'Spaces' },
            { href: '/gear',        label: 'Gear' },
            { href: '/docs',        label: 'Docs' },
          ].map(l => (
            <Link key={l.href} href={l.href} style={navBtnStyle(l.href)}
              onMouseEnter={e => { if (!isActive(l.href)) { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' } }}
              onMouseLeave={e => { if (!isActive(l.href)) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' } }}
            >{l.label}</Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="sceneora-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/roles/client" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--color-muted)', textDecoration: 'none', padding: '7px 15px', borderRadius: '9px', border: '1.5px solid var(--color-hairline)', transition: 'all 0.14s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-hairline)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; (e.currentTarget as HTMLElement).style.background = 'none' }}
          >Log In</Link>
          <Link href="/roles/client#onboarding" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: '#fff', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', textDecoration: 'none', padding: '8px 18px', borderRadius: '9px', boxShadow: '0 2px 12px rgba(79,70,229,0.35)', transition: 'opacity 0.15s, transform 0.15s', letterSpacing: '-0.01em' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = '' }}
          >Get Started →</Link>
        </div>

        {/* Mobile hamburger */}
        <div className="sceneora-mobile-btn" style={{ marginLeft: 'auto' }}>
          <button onClick={() => setMobileOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-ink)', borderRadius: '2px', transition: 'all 0.2s', transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : '' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-ink)', borderRadius: '2px', transition: 'all 0.2s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-ink)', borderRadius: '2px', transition: 'all 0.2s', transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : '' }} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0, zIndex: 190, background: 'var(--color-bg)', overflowY: 'auto', padding: '16px 20px 40px', animation: 'fadeInUp 0.2s ease-out both' }}>

          {/* Get Started CTA */}
          <Link href="/roles/client#onboarding" onClick={() => setMobileOpen(false)} style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', textDecoration: 'none', padding: '14px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>Get Started — It's Free →</Link>

          {/* Platform Roles section */}
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => setMobileRoles(r => !r)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--color-surface)', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>
              <span>Platform Roles</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: mobileRoles ? 'rotate(180deg)' : '' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {mobileRoles && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '10px 4px 0' }}>
                {ROLES.map(r => (
                  <Link key={r.key} href={r.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '12px', background: r.bg, textDecoration: 'none', border: `1px solid ${r.color}22` }}>
                    <span style={{ fontSize: '20px' }}>{r.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', color: r.color }}>{r.label}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', lineHeight: 1.3 }}>{r.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* How It Works section */}
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => setMobileHow(h => !h)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--color-surface)', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>
              <span>How It Works</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: mobileHow ? 'rotate(180deg)' : '' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {mobileHow && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 4px 0' }}>
                {[...HOW_GUIDES, ...HOW_OWNERS].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: 'var(--color-surface)', textDecoration: 'none', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{item.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Flow section */}
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => setMobileFlow(f => !f)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--color-surface)', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>
              <span>🧭 Flow</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: mobileFlow ? 'rotate(180deg)' : '' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {mobileFlow && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 4px 0' }}>
                {FLOW_LINKS.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: 'var(--color-surface)', textDecoration: 'none', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{item.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Features section */}
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => setMobileFeatures(f => !f)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--color-surface)', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>
              <span>Features</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.15s', transform: mobileFeatures ? 'rotate(180deg)' : '' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {mobileFeatures && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 4px 0' }}>
                {FEATURES_LINKS.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: 'var(--color-surface)', textDecoration: 'none', border: '1px solid var(--color-hairline)' }}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{item.title}</div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
            {[
              { href: '/creators',    label: 'Creators',    icon: '📷', desc: 'Browse photographers, videographers, MUAs' },
              { href: '/spaces',      label: 'Spaces',      icon: '🏛️', desc: 'Indoor studios & outdoor locations' },
              { href: '/gear',        label: 'Gear',        icon: '🎥', desc: 'Cameras, lenses, lighting & more' },
              { href: '/docs',        label: 'Docs',        icon: '📄', desc: 'Full platform documentation' },
            ].map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: 'var(--color-surface)', textDecoration: 'none', border: '1px solid var(--color-hairline)' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{l.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-ink)' }}>{l.label}</div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Log in */}
          <Link href="/roles/client" onClick={() => setMobileOpen(false)} style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', textDecoration: 'none', padding: '12px', borderRadius: '12px', border: '1.5px solid var(--color-hairline)' }}>
            Log In
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .sceneora-mobile-btn { display: none; }
        @media (max-width: 768px) {
          .sceneora-desktop-nav { display: none !important; }
          .sceneora-mobile-btn { display: block; }
        }
      `}</style>
    </>
  )
}
