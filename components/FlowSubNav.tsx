'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/flow',         icon: '🧭', label: 'Overview' },
  { href: '/flow/signup',  icon: '🔑', label: 'Sign-Up & Onboarding' },
  { href: '/flow/roles',   icon: '👥', label: 'Role Journeys' },
  { href: '/flow/systems', icon: '⚙️', label: 'Shared Systems' },
]

export default function FlowSubNav() {
  const pathname = usePathname() ?? '/flow'

  return (
    <div style={{ position: 'sticky', top: '64px', zIndex: 100, background: 'rgba(248,249,252,0.97)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--color-hairline)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
        {TABS.map(t => {
          const active = pathname === t.href
          return (
            <Link key={t.href} href={t.href} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '13px 16px',
              fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px',
              color: active ? '#059669' : 'var(--color-muted)',
              borderBottom: active ? '2.5px solid #059669' : '2.5px solid transparent',
              textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.15s',
            }}>
              <span>{t.icon}</span>{t.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
