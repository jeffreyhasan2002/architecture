'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../../components/SceneoraNav'

const STEPS = [
  {
    n: 1,
    title: 'Browse & Filter Gear',
    subtitle: 'Find exactly what your shoot needs',
    color: '#6D5BD0',
    bg: '#F3F0FF',
    icon: '🔍',
    description: 'Search 8,900+ gear items across cameras, lenses, lighting, audio, stabilizers, and accessories. Filter by category, owner type (verified shop or individual creator), max daily price, condition, and availability.',
    features: ['7 categories: camera, lens, lighting, audio, stabilizer, accessory, drone', 'Filter by owner type: 🏪 Verified Shop or 🤝 Individual Creator', 'Set max price per day', 'Filter by condition: Like New / Excellent / Good', 'Toggle "Available only"'],
    mockup: <GearBrowseMockup />,
  },
  {
    n: 2,
    title: 'Check Specs & Condition',
    subtitle: 'Know exactly what you\'re getting',
    color: '#0F62FE',
    bg: '#EFF4FF',
    icon: '📋',
    description: 'Every listing includes a full tech spec sheet, condition grade with explanation, owner profile, review history, and photos of the actual item. No stock photos — only real gear, real condition.',
    features: ['Full spec sheet (sensor size, aperture, output, etc.)', 'Condition grade: Like New / Excellent / Good', 'Real photos of the actual item (not stock)', 'Owner profile: shop address or creator bio', 'Review history from previous renters'],
    mockup: <GearDetailMockup />,
  },
  {
    n: 3,
    title: 'Choose Rental Period',
    subtitle: 'Daily or weekly — you choose',
    color: '#1E8E5A',
    bg: '#EDFAF3',
    icon: '📅',
    description: 'Pick a per-day rate for short shoots or unlock the weekly rate (typically 5–6× the daily price) for extended projects. Choose your pickup date, number of days, and quantity needed.',
    features: ['Per day or per week pricing', 'Weekly rates typically 30–40% cheaper than 7 daily rates', 'Multi-item checkout (rent camera + lens + light together)', 'Select pickup date from live calendar', 'Quantity selector for accessories'],
    mockup: <GearPeriodMockup />,
  },
  {
    n: 4,
    title: 'Pay & Place Deposit',
    subtitle: 'Secure, transparent, refundable',
    color: '#B7791F',
    bg: '#FEF3C7',
    icon: '💳',
    description: 'Pay the rental fee plus a 10% service fee at checkout. A refundable damage deposit (set by the owner) is also held in escrow. The deposit is automatically returned within 48 hours of gear return — no claim, no hassle.',
    features: ['Rental fee + 10% service fee', 'Refundable deposit held in escrow (not paid to owner)', 'Optional rental protection insurance (+8% of rental)', 'Pay via card, UPI, or wallet', 'Receipt and pickup instructions emailed instantly'],
    mockup: <GearPayMockup />,
  },
  {
    n: 5,
    title: 'Pick Up Your Gear',
    subtitle: 'Shop pickup or creator handoff',
    color: '#0E7C86',
    bg: '#E0F7FA',
    icon: '📦',
    description: 'Shop rentals have a fixed address — walk in with your booking confirmation. Individual creator rentals coordinate via in-app encrypted chat. Both parties photograph the gear at handoff (timestamped) to document condition.',
    features: ['Shop rental: walk-in pickup at store address', 'Individual: arrange meeting via in-app secure chat', 'Both parties submit timestamped handoff photos', 'Check gear on the spot — report any discrepancies before leaving', 'Delivery available from select verified shops (Proposed)'],
    mockup: <GearPickupMockup />,
  },
  {
    n: 6,
    title: 'Return & Get Deposit Back',
    subtitle: 'Return in same condition, deposit auto-released',
    color: '#C0362C',
    bg: '#FEF2F2',
    icon: '↩️',
    description: 'Return the gear by your agreed return date. The owner has 48 hours to inspect and file a damage claim. If no claim is filed, your deposit is automatically released back to your payment method. File a dispute in-app if there\'s a disagreement.',
    features: ['Return gear in same condition as received', 'Owner has 48h to file damage claim', 'No claim → deposit auto-released within 48h', 'Damage claim → safety team mediates', 'Leave a review — bidirectional (you + owner rate each other)'],
    mockup: <GearReturnMockup />,
  },
]

// ── Mockups ───────────────────────────────────────────────────────────────────

function GearBrowseMockup() {
  const [cat, setCat] = useState('all')
  const [owner, setOwner] = useState('all')
  const cats = [{ v: 'all', icon: '🎒', l: 'All' }, { v: 'camera', icon: '📷', l: 'Camera' }, { v: 'lens', icon: '🔭', l: 'Lens' }, { v: 'lighting', icon: '💡', l: 'Light' }]
  const items = [
    { name: 'Sony A7 IV', cat: 'camera', owner: 'shop', price: 95, rating: 4.97, gradient: 'linear-gradient(135deg,#1e1e2e,#2d2d44)', emoji: '📷', cond: 'like-new' },
    { name: 'Canon RF 50mm', cat: 'lens', owner: 'shop', price: 55, rating: 4.95, gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)', emoji: '🔭', cond: 'like-new' },
    { name: 'Aputure 600d', cat: 'lighting', owner: 'shop', price: 75, rating: 4.93, gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)', emoji: '💡', cond: 'excellent' },
    { name: 'DJI RS 3 Pro', cat: 'stabilizer', owner: 'individual', price: 40, rating: 4.91, gradient: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', emoji: '🦾', cond: 'like-new' },
  ].filter(i => (cat === 'all' || i.cat === cat) && (owner === 'all' || i.owner === owner))
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '8px', flexWrap: 'wrap' }}>
        {cats.map(c => <button key={c.v} onClick={() => setCat(c.v)} style={{ padding: '4px 10px', borderRadius: '100px', border: `1.5px solid ${cat === c.v ? '#6D5BD0' : '#e5e7eb'}`, background: cat === c.v ? 'rgba(109,91,208,0.1)' : '#fff', color: cat === c.v ? '#6D5BD0' : '#6b7280', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>{c.icon} {c.l}</button>)}
      </div>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        {[['all','🌐','All'], ['shop','🏪','Shop'], ['individual','🤝','Individual']].map(([v,icon,l]) => <button key={v} onClick={() => setOwner(v)} style={{ flex: 1, padding: '5px', borderRadius: '7px', border: `1.5px solid ${owner === v ? '#6D5BD0' : '#e5e7eb'}`, background: owner === v ? 'rgba(109,91,208,0.08)' : '#fff', color: owner === v ? '#6D5BD0' : '#6b7280', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>{icon} {l}</button>)}
      </div>
      <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {items.map(item => (
          <div key={item.name} style={{ borderRadius: '9px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ height: '55px', background: item.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: '22px' }}>
              {item.emoji}
              <span style={{ position: 'absolute', top: '3px', left: '3px', fontSize: '8px', background: item.owner === 'shop' ? '#0F62FE' : '#1E8E5A', color: '#fff', padding: '2px 5px', borderRadius: '100px', fontWeight: 700 }}>{item.owner === 'shop' ? '🏪' : '🤝'}</span>
            </div>
            <div style={{ padding: '7px' }}>
              <div style={{ fontWeight: 700, fontSize: '10px', color: '#111' }}>{item.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                <span style={{ fontSize: '9px', color: '#f59e0b', fontWeight: 700 }}>★ {item.rating}</span>
                <span style={{ fontSize: '9px', color: '#6D5BD0', fontWeight: 700 }}>${item.price}/d</span>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '16px', color: '#9ca3af', fontSize: '11px' }}>No items match. Try different filters.</div>}
      </div>
    </div>
  )
}

function GearDetailMockup() {
  const [tab, setTab] = useState<'specs' | 'condition' | 'reviews'>('specs')
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ height: '70px', background: 'linear-gradient(135deg,#1e1e2e,#2d2d44)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '10px' }}>📷</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '12px', color: '#111' }}>Sony A7 IV</div>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>Sony · by ProGear LA 🏪</div>
        </div>
        <span style={{ fontSize: '8px', background: '#EDFAF3', color: '#1E8E5A', padding: '3px 7px', borderRadius: '100px', fontWeight: 700 }}>Like New</span>
      </div>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', marginTop: '8px' }}>
        {(['specs','condition','reviews'] as const).map(t => <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '5px', borderRadius: '6px', border: 'none', background: tab === t ? '#6D5BD0' : '#f3f4f6', color: tab === t ? '#fff' : '#6b7280', fontWeight: 600, fontSize: '10px', cursor: 'pointer', textTransform: 'capitalize' }}>{t}</button>)}
      </div>
      {tab === 'specs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[['Sensor', '33MP BSI Full Frame'], ['Video', '4K 60fps, S-Log3'], ['IBIS', '5.5 stops'], ['AF', 'Phase Detect, AI tracking'], ['Slots', 'Dual CFexpress / SD']].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', padding: '5px 8px', borderRadius: '6px', background: '#f9fafb' }}>
              <span style={{ color: '#6b7280', fontWeight: 600 }}>{k}</span>
              <span style={{ color: '#111', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
      {tab === 'condition' && (
        <div>
          <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(30,142,90,0.08)', border: '1px solid rgba(30,142,90,0.2)', marginBottom: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '11px', color: '#1E8E5A', marginBottom: '4px' }}>✅ Like New</div>
            <div style={{ fontSize: '10px', color: '#374151', lineHeight: 1.5 }}>Mint condition. Under 200 actuations. All original accessories included. Cleaned and sensor-checked before every rental.</div>
          </div>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>📸 Condition photos verified by Sceneora at onboarding</div>
        </div>
      )}
      {tab === 'reviews' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {[{n:'Aanya R.', s:5, t:'Perfect camera, zero issues.'}, {n:'Diego M.', s:5, t:'Fast pickup, immaculate condition.'}].map(r => (
            <div key={r.n} style={{ padding: '8px', borderRadius: '7px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontWeight: 700, fontSize: '10px', color: '#111' }}>{r.n}</span>
                <span style={{ color: '#f59e0b', fontSize: '10px' }}>{'★'.repeat(r.s)}</span>
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>{r.t}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function GearPeriodMockup() {
  const [period, setPeriod] = useState<'day' | 'week'>('day')
  const [days, setDays] = useState(2)
  const [qty, setQty] = useState(1)
  const priceDay = 95, priceWeek = 540
  const total = period === 'day' ? priceDay * days * qty : priceWeek * qty
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '12px' }}>Sony A7 IV — Choose Period</div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {(['day','week'] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1.5px solid ${period === p ? '#1E8E5A' : '#e5e7eb'}`, background: period === p ? 'rgba(30,142,90,0.08)' : '#fff', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '11px', color: period === p ? '#1E8E5A' : '#374151' }}>{p === 'day' ? '📅 Per Day' : '🗓️ Per Week'}</div>
            <div style={{ fontWeight: 800, fontSize: '14px', color: period === p ? '#1E8E5A' : '#111', marginTop: '3px' }}>{p === 'day' ? `$${priceDay}` : `$${priceWeek}`}</div>
            {p === 'week' && <div style={{ fontSize: '9px', color: '#1E8E5A', fontWeight: 600 }}>Save 19% vs 7 days</div>}
          </button>
        ))}
      </div>
      {period === 'day' && (
        <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
          {[['Days', days, setDays, [1,2,3,4,5,6,7]], ['Qty', qty, setQty, [1,2,3]]].map(([label, val, setter, opts]: any) => (
            <div key={label}>
              <label style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>{label}</label>
              <select value={val} onChange={e => setter(Number(e.target.value))} style={{ width: '100%', padding: '7px 8px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '11px', outline: 'none' }}>
                {opts.map((o: number) => <option key={o} value={o}>{label === 'Days' ? `${o}d` : `×${o}`}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
      <div style={{ padding: '10px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px', color: '#6b7280' }}>
          <span>{period === 'day' ? `$${priceDay} × ${days}d × ${qty}` : `$${priceWeek} × ${qty} week`}</span>
          <span>${total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px', color: '#6b7280' }}><span>Service fee</span><span>${Math.round(total * 0.1)}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px', color: '#6b7280' }}><span>Deposit (refundable)</span><span>$500</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid #e5e7eb', fontWeight: 700, fontSize: '12px' }}><span>Total now</span><span style={{ color: '#6D5BD0' }}>${Math.round(total * 1.1) + 500}</span></div>
      </div>
    </div>
  )
}

function GearPayMockup() {
  const [insure, setInsure] = useState(false)
  const base = 235, deposit = 500
  const insurance = insure ? Math.round(base * 0.08) : 0
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '12px' }}>Order Summary</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px', borderRadius: '9px', background: '#f9fafb', border: '1px solid #e5e7eb', marginBottom: '12px' }}>
        {[['Sony A7 IV · 2 days', `$${190}`], ['Aputure 600d · 2 days', '$150'], ['Service fee (10%)', `$${Math.round(340 * 0.1)}`]].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280' }}><span>{l}</span><span>{v}</span></div>
        ))}
        {insure && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#B7791F' }}><span>🛡️ Rental protection</span><span>+${insurance}</span></div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280' }}><span>Deposit (refundable)</span><span>$500</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#111', paddingTop: '6px', borderTop: '1px solid #e5e7eb' }}><span>Total charged</span><span style={{ color: '#0F62FE' }}>${374 + insurance + 500}</span></div>
      </div>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px', borderRadius: '8px', background: insure ? 'rgba(183,121,31,0.08)' : '#fff', border: `1.5px solid ${insure ? '#B7791F' : '#e5e7eb'}`, cursor: 'pointer', marginBottom: '12px' }}>
        <input type="checkbox" checked={insure} onChange={e => setInsure(e.target.checked)} style={{ accentColor: '#B7791F', marginTop: '1px' }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '11px', color: '#B7791F' }}>🛡️ Add rental protection (+8%)</div>
          <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>Covers accidental damage up to declared item value. Processed by Insuratech.</div>
        </div>
      </label>
      <button style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0F62FE', color: '#fff', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer' }}>🔒 Pay ${374 + insurance + 500}</button>
    </div>
  )
}

function GearPickupMockup() {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {[['🏪', 'Shop Pickup', 'Fixed address, walk-in', '#0F62FE'], ['🤝', 'Creator Handoff', 'Arrange via in-app chat', '#1E8E5A']].map(([icon, title, desc, color]) => (
          <div key={title} style={{ flex: 1, padding: '10px', borderRadius: '9px', border: `1.5px solid ${color}`, background: `rgba(${color === '#0F62FE' ? '15,98,254' : '30,142,90'},0.06)`, textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{icon}</div>
            <div style={{ fontWeight: 700, fontSize: '10px', color }}>{title}</div>
            <div style={{ fontSize: '9px', color: '#6b7280', marginTop: '2px' }}>{desc}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', marginBottom: '10px' }}>
        <div style={{ fontWeight: 700, fontSize: '11px', color: '#111', marginBottom: '6px' }}>📍 ProGear LA — Shop Details</div>
        {[['Address', '820 Maple Ave, DTLA'], ['Hours', 'Mon–Sat 8am–7pm'], ['Booking ref', 'GR-8K2M'], ['Bring', 'Booking email + ID']].map(([k,v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
            <span style={{ color: '#6b7280' }}>{k}</span>
            <span style={{ color: '#111', fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px', borderRadius: '8px', background: confirmed ? 'rgba(30,142,90,0.08)' : '#f9fafb', border: `1px solid ${confirmed ? 'rgba(30,142,90,0.3)' : '#e5e7eb'}`, marginBottom: '10px', textAlign: 'center', fontSize: '11px', color: confirmed ? '#1E8E5A' : '#6b7280', fontWeight: 600 }}>
        {confirmed ? '✅ Condition photos submitted' : '📸 Submit handoff condition photos'}
      </div>
      <button onClick={() => setConfirmed(!confirmed)} style={{ width: '100%', padding: '9px', borderRadius: '8px', background: confirmed ? '#ef4444' : '#1E8E5A', color: '#fff', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer' }}>
        {confirmed ? 'Undo Submission' : '📷 Submit Handoff Photos'}
      </button>
    </div>
  )
}

function GearReturnMockup() {
  const [returned, setReturned] = useState(false)
  const [depositStatus, setDepositStatus] = useState<'pending' | 'released'>('pending')
  return (
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        {[
          { icon: returned ? '✅' : '📦', label: 'Gear returned', status: returned ? 'Done' : 'Pending', color: returned ? '#1E8E5A' : '#6b7280' },
          { icon: '⏳', label: 'Owner inspection window', status: '48h · Ends July 14', color: '#B7791F' },
          { icon: depositStatus === 'released' ? '💚' : '🔒', label: 'Deposit ($500)', status: depositStatus === 'released' ? 'Released to card' : 'In escrow', color: depositStatus === 'released' ? '#1E8E5A' : '#6b7280' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: '#111', fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '10px', color: item.color, fontWeight: 600 }}>{item.status}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <button onClick={() => { setReturned(true) }} disabled={returned} style={{ flex: 1, padding: '9px', borderRadius: '8px', background: returned ? '#e5e7eb' : '#0F62FE', color: returned ? '#6b7280' : '#fff', fontWeight: 700, fontSize: '11px', border: 'none', cursor: returned ? 'not-allowed' : 'pointer' }}>
          ↩️ Mark Returned
        </button>
        <button onClick={() => setDepositStatus('released')} disabled={!returned || depositStatus === 'released'} style={{ flex: 1, padding: '9px', borderRadius: '8px', background: returned && depositStatus === 'pending' ? '#1E8E5A' : '#e5e7eb', color: returned && depositStatus === 'pending' ? '#fff' : '#6b7280', fontWeight: 700, fontSize: '11px', border: 'none', cursor: returned && depositStatus === 'pending' ? 'pointer' : 'not-allowed' }}>
          💚 Release Deposit
        </button>
      </div>
      {depositStatus === 'released' && (
        <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(30,142,90,0.08)', border: '1px solid rgba(30,142,90,0.2)', textAlign: 'center', fontSize: '11px', color: '#1E8E5A', fontWeight: 700 }}>
          $500 returned to your card · 3–5 business days
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function HowItWorksGear() {
  const [activeStep, setActiveStep] = useState(0)

  const step = STEPS[activeStep]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)' }}>
      <SceneoraNav active="/how-it-works/gear" />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgba(109,91,208,0.06) 0%, rgba(15,98,254,0.06) 100%)', borderBottom: '1px solid var(--color-hairline)', padding: '112px 24px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', background: 'rgba(109,91,208,0.1)', marginBottom: '16px' }}>
          <span style={{ fontSize: '14px' }}>📷</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#6D5BD0' }}>Gear Rental · How It Works</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '12px' }}>Rent Pro Gear in 6 Steps</h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto 24px' }}>
          From verified shops or fellow creators — camera bodies, lenses, lights, and more, available by the day or week.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gear" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#fff', background: '#6D5BD0', textDecoration: 'none', padding: '11px 22px', borderRadius: '8px' }}>Browse Gear →</Link>
          <Link href="/how-it-works/spaces" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)', background: 'var(--color-surface)', textDecoration: 'none', padding: '11px 22px', borderRadius: '8px', border: '1px solid var(--color-hairline)' }}>How Space Rental Works →</Link>
        </div>
      </div>

      {/* Step tabs */}
      <div style={{ borderBottom: '1px solid var(--color-hairline)', background: 'var(--color-surface)', overflowX: 'auto' }}>
        <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          {STEPS.map((s, i) => (
            <button key={s.n} onClick={() => setActiveStep(i)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 18px', background: 'none', border: 'none', borderBottom: `3px solid ${activeStep === i ? s.color : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'border-color 0.15s' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeStep === i ? s.color : 'var(--color-hairline)', color: activeStep === i ? '#fff' : 'var(--color-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>{s.n}</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', color: activeStep === i ? 'var(--color-ink)' : 'var(--color-muted)' }}>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', background: step.bg, marginBottom: '20px' }}>
              <span style={{ fontSize: '16px' }}>{step.icon}</span>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: step.color }}>Step {step.n} of {STEPS.length}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '8px' }}>{step.title}</h2>
            <p style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '1rem', color: step.color, marginBottom: '16px' }}>{step.subtitle}</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '28px' }}>{step.description}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
              {step.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: step.bg, border: `1.5px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={step.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-ink)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {activeStep > 0 && <button onClick={() => setActiveStep(activeStep - 1)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>← Previous</button>}
              {activeStep < STEPS.length - 1
                ? <button onClick={() => setActiveStep(activeStep + 1)} style={{ padding: '10px 20px', borderRadius: '8px', background: step.color, color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>Next Step →</button>
                : <Link href="/gear" style={{ padding: '10px 20px', borderRadius: '8px', background: '#6D5BD0', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Browse Gear →</Link>
              }
            </div>
          </div>

          <div>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-bg)' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
                </div>
                <div style={{ flex: 1, background: 'var(--color-surface)', borderRadius: '6px', padding: '4px 10px', fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'var(--font-jetbrains-mono)' }}>sceneora.app/gear{activeStep > 0 ? `/${['','sony-a7iv','sony-a7iv/period','checkout','pickups/GR-8K2M','return/GR-8K2M'][activeStep]}` : ''}</div>
              </div>
              <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--color-bg)' }}>
                <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '12px', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}>SCENEORA</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Spaces','Gear','Docs'].map(l => <span key={l} style={{ fontSize: '10px', color: l === 'Gear' ? '#6D5BD0' : 'var(--color-muted)', fontWeight: 600 }}>{l}</span>)}
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                {step.mockup}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{ width: i === activeStep ? '24px' : '8px', height: '8px', borderRadius: '100px', background: i === activeStep ? step.color : 'var(--color-hairline)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All steps */}
      <div style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-hairline)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--color-ink)', letterSpacing: '-0.03em', marginBottom: '32px', textAlign: 'center' }}>All 6 Steps at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
            {STEPS.map((s, i) => (
              <button key={s.n} onClick={() => setActiveStep(i)} style={{ padding: '20px 16px', borderRadius: '12px', background: 'var(--color-bg)', border: `1.5px solid ${activeStep === i ? s.color : 'var(--color-hairline)'}`, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, transform 0.15s', transform: activeStep === i ? 'translateY(-2px)' : '' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = s.color}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = activeStep === i ? s.color : 'var(--color-hairline)'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginBottom: '10px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '10px', color: s.color, fontWeight: 700, marginBottom: '4px' }}>Step {s.n}</div>
                <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)' }}>{s.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--color-ink)', letterSpacing: '-0.03em', marginBottom: '12px' }}>Ready to rent your first piece of gear?</h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '24px' }}>8,900+ items from verified shops and creators.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gear" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: '#fff', background: '#6D5BD0', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px' }}>Browse Gear</Link>
          <Link href="/how-it-works/spaces" style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)', background: 'var(--color-surface)', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--color-hairline)' }}>How Space Rental Works</Link>
        </div>
      </div>
    </div>
  )
}
