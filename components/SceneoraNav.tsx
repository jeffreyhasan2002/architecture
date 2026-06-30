'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ROLES = [
  { key: 'visitor',       label: 'Visitor',         icon: '👤', desc: 'Browse & discover freely',             color: '#5A5F7A', bg: '#F0F1F8', href: '/roles/visitor' },
  { key: 'client',        label: 'Client',           icon: '📅', desc: 'Book creators for events & shoots',    color: '#4F46E5', bg: '#EEF2FF', href: '/roles/client' },
  { key: 'creator',       label: 'Creator',          icon: '📷', desc: 'Photographers, videographers, MUAs',   color: '#7C3AED', bg: '#F5F3FF', href: '/roles/creator' },
  { key: 'content-creator', label: 'Content Creator',icon: '🎬', desc: 'UGC & brand deal creators',           color: '#B45309', bg: '#FFFBEB', href: '/roles/content-creator' },
  { key: 'brand',         label: 'Brand',            icon: '🏢', desc: 'Hire talent for campaigns',            color: '#0891B2', bg: '#ECFEFF', href: '/roles/brand' },
  { key: 'agency',        label: 'Agency',           icon: '🏛️', desc: 'Manage teams & projects at scale',    color: '#1D4ED8', bg: '#EFF6FF', href: '/roles/agency' },
  { key: 'moderator',     label: 'Moderator',        icon: '🛡️', desc: 'Platform content review',            color: '#059669', bg: '#ECFDF5', href: '/roles/moderator' },
  { key: 'trust-officer', label: 'Trust Officer',    icon: '⚖️', desc: 'Dispute resolution specialist',       color: '#DC2626', bg: '#FEF2F2', href: '/roles/trust-officer' },
  { key: 'admin',         label: 'Admin',            icon: '🔧', desc: 'Full platform operations',            color: '#374151', bg: '#F9FAFB', href: '/roles/admin' },
]

export default function SceneoraNav({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [rolesOpen, setRolesOpen] = useState(false)
  const [howOpen, setHowOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentPath = active ?? pathname ?? '/'
  const isActive = (href: string) => currentPath === href || currentPath.startsWith(href + '/')

  const navBtnStyle = (href?: string) => ({
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
  } as React.CSSProperties)

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '64px', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '4px',
        background: scrolled ? 'rgba(248,249,252,0.94)' : 'transparent',
        borderBottom: scrolled ? '1.5px solid var(--color-hairline)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        transition: 'all 0.22s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px', flexShrink: 0 }}>
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

        {/* Primary Nav */}
        <nav style={{ display: 'flex', gap: '2px', alignItems: 'center', flex: 1 }}>

          {/* Roles mega-menu */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setRolesOpen(true)} onMouseLeave={() => setRolesOpen(false)}>
            <button
              style={navBtnStyle('/roles')}
              onMouseEnter={e => { if (!isActive('/roles')) { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' } }}
              onMouseLeave={e => { if (!isActive('/roles')) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' } }}
            >
              Platform
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ transition: 'transform 0.15s', transform: rolesOpen ? 'rotate(180deg)' : '' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {rolesOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)',
                borderRadius: '18px', padding: '14px', width: '580px',
                boxShadow: 'var(--shadow-dialog)', zIndex: 400,
                animation: 'fadeInUp 0.18s ease-out both',
              }}>
                <div style={{
                  fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 800,
                  color: 'var(--color-muted)', letterSpacing: '0.09em', textTransform: 'uppercase',
                  padding: '4px 10px 12px', borderBottom: '1px solid var(--color-hairline)', marginBottom: '10px',
                }}>Platform Roles</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                  {ROLES.map(r => (
                    <Link key={r.key} href={r.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 11px', borderRadius: '11px', textDecoration: 'none', transition: 'background 0.12s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                    >
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
            <button
              style={navBtnStyle('/how-it-works')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' }}
            >
              How It Works
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ transition: 'transform 0.15s', transform: howOpen ? 'rotate(180deg)' : '' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {howOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                background: 'var(--color-surface)', border: '1.5px solid var(--color-hairline)',
                borderRadius: '15px', padding: '8px', minWidth: '280px',
                boxShadow: 'var(--shadow-dialog)', zIndex: 400,
                animation: 'fadeInUp 0.18s ease-out both',
              }}>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px 8px', borderBottom: '1px solid var(--color-hairline)', marginBottom: '4px' }}>Renter Guides</div>
                {[
                  { icon: '📅', bg: '#EEF2FF', color: '#4F46E5', href: '/roles/client',         title: 'For Clients',    desc: 'Book creators for your events' },
                  { icon: '📷', bg: '#F5F3FF', color: '#7C3AED', href: '/roles/creator',         title: 'For Creators',   desc: 'Get discovered and booked' },
                  { icon: '🏛️', bg: '#EEF2FF', color: '#4F46E5', href: '/how-it-works/spaces',  title: 'Space Rental',   desc: 'Book photography locations' },
                  { icon: '🎥', bg: '#F5F3FF', color: '#7C3AED', href: '/how-it-works/gear',     title: 'Gear Rental',    desc: 'Rent professional equipment' },
                ].map(item => (
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
                {[
                  { icon: '🏛️', bg: '#EEF2FF', color: '#0F62FE', href: '/spaces/owner', title: 'Space Owner Portal', desc: 'List spaces, track earnings & bookings' },
                  { icon: '🔧', bg: '#F5F3FF', color: '#7C3AED', href: '/gear/owner',   title: 'Gear Owner Portal',  desc: 'List gear, manage rentals & deposits' },
                ].map(item => (
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

          {[{ href: '/spaces', label: 'Spaces' }, { href: '/gear', label: 'Gear' }, { href: '/docs', label: 'Docs' }].map(l => (
            <Link key={l.href} href={l.href}
              style={navBtnStyle(l.href) as React.CSSProperties}
              onMouseEnter={e => { if (!isActive(l.href)) { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' } }}
              onMouseLeave={e => { if (!isActive(l.href)) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' } }}
            >{l.label}</Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/roles/client" style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
            color: 'var(--color-muted)', textDecoration: 'none', padding: '7px 15px',
            borderRadius: '9px', border: '1.5px solid var(--color-hairline)', transition: 'all 0.14s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-muted)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-hairline)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; (e.currentTarget as HTMLElement).style.background = 'none' }}
          >Log In</Link>

          <Link href="/roles/client#onboarding" style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: '#fff',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            textDecoration: 'none', padding: '8px 18px', borderRadius: '9px',
            boxShadow: '0 2px 12px rgba(79,70,229,0.35)', transition: 'opacity 0.15s, transform 0.15s',
            letterSpacing: '-0.01em',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = '' }}
          >Get Started →</Link>
        </div>
      </header>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </>
  )
}
