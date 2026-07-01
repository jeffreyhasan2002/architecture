'use client'
import { useState } from 'react'
import Link from 'next/link'
import SceneoraNav from '../../components/SceneoraNav'

type GearCategory = 'all' | 'camera' | 'lens' | 'lighting' | 'audio' | 'stabilizer' | 'accessory'
type OwnerType = 'all' | 'shop' | 'individual'
type SortBy = 'rating' | 'price_asc' | 'price_desc'

interface GearItem {
  id: string
  name: string
  brand: string
  category: 'camera' | 'lens' | 'lighting' | 'audio' | 'stabilizer' | 'accessory'
  ownerType: 'shop' | 'individual'
  pricePerDay: number
  pricePerWeek?: number
  condition: 'like-new' | 'excellent' | 'good'
  rating: number
  reviewCount: number
  available: boolean
  owner: string
  description: string
  specs: string[]
  gradient: string
  emoji: string
  depositRequired: number
}

const GEAR: GearItem[] = [
  { id: 'g1', name: 'Sony A7 IV', brand: 'Sony', category: 'camera', ownerType: 'shop', pricePerDay: 95, pricePerWeek: 560, condition: 'like-new', rating: 4.97, reviewCount: 341, available: true, owner: 'ProGear LA', description: 'Full-frame mirrorless, 33MP, 4K 60fps video', specs: ['33MP BSI sensor', '4K 60fps', 'IBIS 5.5 stops', 'Dual SD slots'], gradient: 'linear-gradient(135deg,#1e1e2e 0%,#2d2d44 100%)', emoji: '📷', depositRequired: 500 },
  { id: 'g2', name: 'Canon RF 50mm f/1.2L', brand: 'Canon', category: 'lens', ownerType: 'shop', pricePerDay: 55, pricePerWeek: 320, condition: 'like-new', rating: 4.95, reviewCount: 218, available: true, owner: 'LensHub NYC', description: 'Ultra-fast prime for portraits and low-light', specs: ['f/1.2 max aperture', 'RF mount', 'Image stabilization', 'Nano USM'], gradient: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)', emoji: '🔭', depositRequired: 300 },
  { id: 'g3', name: 'Aputure 600d Pro', brand: 'Aputure', category: 'lighting', ownerType: 'shop', pricePerDay: 75, pricePerWeek: 430, condition: 'excellent', rating: 4.93, reviewCount: 187, available: true, owner: 'LightBox Rentals', description: '600W daylight LED with Bowens mount', specs: ['600W output', '5600K CCT', 'Bowens mount', 'Silent fan'], gradient: 'linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)', emoji: '💡', depositRequired: 400 },
  { id: 'g4', name: 'DJI RS 3 Pro', brand: 'DJI', category: 'stabilizer', ownerType: 'individual', pricePerDay: 40, pricePerWeek: 220, condition: 'like-new', rating: 4.91, reviewCount: 129, available: true, owner: '@filmmaker_alex', description: '3-axis gimbal, 4.5kg payload, OLED display', specs: ['4.5kg payload', 'OLED display', 'Bluetooth follow focus', '12h battery'], gradient: 'linear-gradient(135deg,#e0f2fe 0%,#bae6fd 100%)', emoji: '🦾', depositRequired: 200 },
  { id: 'g5', name: 'Rode NTG5 Shotgun', brand: 'Rode', category: 'audio', ownerType: 'shop', pricePerDay: 28, pricePerWeek: 160, condition: 'excellent', rating: 4.88, reviewCount: 97, available: true, owner: 'AudioGear Pro', description: 'Broadcast-grade shotgun mic, low self-noise', specs: ['Low self-noise 10dB', 'Lightweight 76g', 'HDDA preamp', 'Weather resistant'], gradient: 'linear-gradient(135deg,#dcfce7 0%,#a7f3d0 100%)', emoji: '🎙️', depositRequired: 150 },
  { id: 'g6', name: 'Sony FX3 Cinema', brand: 'Sony', category: 'camera', ownerType: 'shop', pricePerDay: 130, pricePerWeek: 750, condition: 'like-new', rating: 4.98, reviewCount: 206, available: true, owner: 'CinemaGear LA', description: 'Cinema line full-frame, 12.1MP, unlimited recording', specs: ['12.1MP FF sensor', 'S-Cinetone', 'Unlimited 4K record', 'Variable ND built-in'], gradient: 'linear-gradient(135deg,#18181b 0%,#27272a 100%)', emoji: '🎬', depositRequired: 800 },
  { id: 'g7', name: 'Sigma 35mm f/1.4 Art', brand: 'Sigma', category: 'lens', ownerType: 'individual', pricePerDay: 30, pricePerWeek: 175, condition: 'excellent', rating: 4.85, reviewCount: 88, available: true, owner: '@portraits_nyc', description: 'Iconic Art series wide-angle prime', specs: ['f/1.4 max aperture', 'Sony E / Canon EF', '13 elements', 'Full-frame'], gradient: 'linear-gradient(135deg,#f3e8ff 0%,#e9d5ff 100%)', emoji: '🔭', depositRequired: 180 },
  { id: 'g8', name: 'GVM 800D RGB Panel', brand: 'GVM', category: 'lighting', ownerType: 'individual', pricePerDay: 35, pricePerWeek: 200, condition: 'good', rating: 4.76, reviewCount: 62, available: false, owner: '@studio_jess', description: 'RGB LED panel, 800 LEDs, 2700–6500K', specs: ['800 bi-color LEDs', 'RGB & CCT mode', 'App control', 'V-mount plate'], gradient: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 100%)', emoji: '💡', depositRequired: 180 },
  { id: 'g9', name: 'DJI Mavic 3 Pro', brand: 'DJI', category: 'camera', ownerType: 'shop', pricePerDay: 110, pricePerWeek: 620, condition: 'like-new', rating: 4.94, reviewCount: 172, available: true, owner: 'SkyGear Rentals', description: 'Triple-camera drone, Hasselblad main sensor', specs: ['Hasselblad camera', '46-min flight time', '5.1K video', 'Omnidirectional obstacle'], gradient: 'linear-gradient(135deg,#e0f7fa 0%,#b2ebf2 100%)', emoji: '🚁', depositRequired: 600 },
  { id: 'g10', name: 'Zoom F8n Pro Recorder', brand: 'Zoom', category: 'audio', ownerType: 'individual', pricePerDay: 45, pricePerWeek: 260, condition: 'excellent', rating: 4.9, reviewCount: 55, available: true, owner: '@sound_maya', description: '8-track field recorder, 32-bit float', specs: ['8 XLR/TRS inputs', '32-bit float recording', 'Time code', 'Dual SD slots'], gradient: 'linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)', emoji: '🎚️', depositRequired: 250 },
  { id: 'g11', name: 'Tiffen Variable ND Kit', brand: 'Tiffen', category: 'accessory', ownerType: 'shop', pricePerDay: 18, pricePerWeek: 100, condition: 'excellent', rating: 4.82, reviewCount: 144, available: true, owner: 'ProGear LA', description: 'ND3–450 variable kit, 5 filter sizes', specs: ['ND3–450', '5 filter sizes', 'Waterproof coating', 'Hard case'], gradient: 'linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)', emoji: '🎒', depositRequired: 80 },
  { id: 'g12', name: 'Zhiyun Crane-M3', brand: 'Zhiyun', category: 'stabilizer', ownerType: 'individual', pricePerDay: 25, pricePerWeek: 140, condition: 'good', rating: 4.7, reviewCount: 78, available: true, owner: '@content_lou', description: 'Compact 3-axis gimbal for mirrorless & smartphones', specs: ['800g payload', 'Fill light built-in', '8h battery', 'Bluetooth'], gradient: 'linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)', emoji: '🦾', depositRequired: 120 },
]

const CATEGORIES: { label: string; value: GearCategory; icon: string }[] = [
  { label: 'All Gear', value: 'all', icon: '🎒' },
  { label: 'Cameras', value: 'camera', icon: '📷' },
  { label: 'Lenses', value: 'lens', icon: '🔭' },
  { label: 'Lighting', value: 'lighting', icon: '💡' },
  { label: 'Audio', value: 'audio', icon: '🎙️' },
  { label: 'Stabilizers', value: 'stabilizer', icon: '🦾' },
  { label: 'Accessories', value: 'accessory', icon: '🎛️' },
]

const CONDITION_COLORS: Record<string, { bg: string; color: string }> = {
  'like-new': { bg: '#EDFAF3', color: '#1E8E5A' },
  'excellent': { bg: '#EFF4FF', color: '#0F62FE' },
  'good': { bg: '#FEF3C7', color: '#B7791F' },
}

function StarIcon({ filled }: { filled: boolean }) {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
}

function RentalModal({ item, onClose }: { item: GearItem; onClose: () => void }) {
  const [period, setPeriod] = useState<'day' | 'week'>('day')
  const [qty, setQty] = useState(1)
  const [days, setDays] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [step, setStep] = useState<'form' | 'confirm' | 'done'>('form')

  const basePrice = period === 'week' ? (item.pricePerWeek ?? item.pricePerDay * 5) : item.pricePerDay * days
  const total = Math.round(basePrice * qty * 1.1)

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: 'var(--color-bg)', borderRadius: '20px', width: '100%', maxWidth: '460px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
        <div style={{ height: '100px', background: item.gradient, display: 'flex', alignItems: 'center', padding: '16px 24px', gap: '14px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{item.emoji}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '1rem', color: item.category === 'camera' && item.ownerType === 'shop' && item.brand === 'Sony' ? '#fff' : '#111' }}>{item.name}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: item.category === 'camera' && item.ownerType === 'shop' && item.brand === 'Sony' ? 'rgba(255,255,255,0.7)' : '#555' }}>{item.brand} · {item.ownerType === 'shop' ? '🏪 Shop' : '🤝 Individual'}</div>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {step === 'form' && (
            <>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {(['day', 'week'] as const).map(p => (
                  <button key={p} onClick={() => setPeriod(p)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${period === p ? 'var(--color-accent)' : 'var(--color-hairline)'}`, background: period === p ? 'rgba(15,98,254,0.08)' : 'var(--color-surface)', color: period === p ? 'var(--color-accent)' : 'var(--color-muted)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                    {p === 'day' ? 'Per Day' : 'Per Week'} {p === 'day' ? `$${item.pricePerDay}` : `$${item.pricePerWeek ?? item.pricePerDay * 5}`}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>PICKUP DATE</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                {period === 'day' && (
                  <div className="split-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>DAYS</label>
                      <select value={days} onChange={e => setDays(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
                        {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>{d} day{d > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>QTY</label>
                      <select value={qty} onChange={e => setQty(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
                        {[1,2,3].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>Rental fee</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>${basePrice * qty}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>Service fee (10%)</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>${Math.round(basePrice * qty * 0.1)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)' }}>Deposit (refundable)</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-ink)' }}>${item.depositRequired}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)' }}>Total charged now</span>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-accent)' }}>${total + item.depositRequired}</span>
                </div>
              </div>

              <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(30,142,90,0.08)', border: '1px solid rgba(30,142,90,0.2)', marginBottom: '16px', fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#1E8E5A' }}>
                ✓ Deposit of ${item.depositRequired} returned within 48h of gear return
              </div>

              <button onClick={() => setStep('confirm')} disabled={!startDate} style={{ width: '100%', padding: '13px', borderRadius: '10px', background: startDate ? 'var(--color-accent)' : 'var(--color-hairline)', color: startDate ? '#fff' : 'var(--color-muted)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: 'none', cursor: startDate ? 'pointer' : 'not-allowed' }}>
                Reserve Gear
              </button>
            </>
          )}
          {step === 'confirm' && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-ink)', marginBottom: '8px' }}>Confirm your rental</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', marginBottom: '20px' }}>{item.name} · Pickup {startDate} · ${total + item.depositRequired} total</p>
              <button onClick={() => setStep('done')} style={{ width: '100%', padding: '13px', borderRadius: '10px', background: 'var(--color-accent)', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Pay &amp; Reserve</button>
              <button onClick={() => setStep('form')} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'none', color: 'var(--color-muted)', fontFamily: 'var(--font-inter)', fontSize: '13px', border: '1px solid var(--color-hairline)', cursor: 'pointer' }}>Go back</button>
            </div>
          )}
          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-ink)', marginBottom: '8px' }}>Gear Reserved!</h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--color-muted)', marginBottom: '20px' }}>Pickup details and instructions sent to your Sceneora inbox.</p>
              <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--color-accent)', color: '#fff', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function GearCard({ item, onRent }: { item: GearItem; onRent: (g: GearItem) => void }) {
  const [hovered, setHovered] = useState(false)
  const cond = CONDITION_COLORS[item.condition]
  return (
    <div style={{ borderRadius: '16px', background: 'var(--color-surface)', border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-hairline)'}`, overflow: 'hidden', transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s', transform: hovered ? 'translateY(-2px)' : '', boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.10)' : 'none' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ height: '140px', background: item.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ fontSize: '48px', opacity: 0.7 }}>{item.emoji}</div>
        {!item.available && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '5px 12px', borderRadius: '100px' }}>Unavailable</span>
          </div>
        )}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', padding: '3px 8px', borderRadius: '100px', background: item.ownerType === 'shop' ? '#0F62FE' : '#1E8E5A', color: '#fff' }}>
            {item.ownerType === 'shop' ? '🏪 Shop' : '🤝 Individual'}
          </span>
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '10px', padding: '3px 8px', borderRadius: '100px', background: cond.bg, color: cond.color }}>
            {item.condition.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '4px', fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.brand}</div>
        <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '4px' }}>{item.name}</div>
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)', marginBottom: '10px', lineHeight: 1.4 }}>{item.description}</div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '10px' }}>
          {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(item.rating)} />)}
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', color: 'var(--color-ink)', marginLeft: '3px' }}>{item.rating}</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--color-muted)' }}>({item.reviewCount})</span>
        </div>

        {/* Specs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
          {item.specs.slice(0, 3).map(s => (
            <span key={s} style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'var(--color-muted)', background: 'var(--color-bg)', border: '1px solid var(--color-hairline)', padding: '3px 7px', borderRadius: '100px' }}>{s}</span>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: '16px', color: 'var(--color-ink)' }}>${item.pricePerDay}</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>/day</span>
            {item.pricePerWeek && <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)', marginLeft: '8px' }}>${item.pricePerWeek}/wk</span>}
          </div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--color-muted)' }}>by {item.owner}</div>
        </div>

        <button onClick={() => item.available && onRent(item)} disabled={!item.available} style={{ width: '100%', padding: '9px', borderRadius: '8px', background: item.available ? 'var(--color-accent)' : 'var(--color-hairline)', color: item.available ? '#fff' : 'var(--color-muted)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '12px', border: 'none', cursor: item.available ? 'pointer' : 'not-allowed', transition: 'opacity 0.15s' }}
          onMouseEnter={e => { if (item.available) (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
        >{item.available ? 'Reserve Gear' : 'Unavailable'}</button>
      </div>
    </div>
  )
}

export default function GearPage() {
  const [category, setCategory] = useState<GearCategory>('all')
  const [ownerType, setOwnerType] = useState<OwnerType>('all')
  const [maxPrice, setMaxPrice] = useState(150)
  const [sortBy, setSortBy] = useState<SortBy>('rating')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [renting, setRenting] = useState<GearItem | null>(null)
  const filtered = GEAR
    .filter(g => category === 'all' || g.category === category)
    .filter(g => ownerType === 'all' || g.ownerType === ownerType)
    .filter(g => g.pricePerDay <= maxPrice)
    .filter(g => !availableOnly || g.available)
    .filter(g => !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.brand.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price_asc') return a.pricePerDay - b.pricePerDay
      if (sortBy === 'price_desc') return b.pricePerDay - a.pricePerDay
      return 0
    })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-ink)' }}>
      <SceneoraNav active="/gear" />

      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(109,91,208,0.06) 0%, rgba(15,98,254,0.06) 100%)', borderBottom: '1px solid var(--color-hairline)', padding: '104px 24px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', color: 'var(--color-ink)', marginBottom: '8px' }}>Browse Gear</h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--color-muted)', marginBottom: '20px' }}>Cameras, lenses, lights &amp; more — from verified shops and fellow creators.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search gear by name, brand, or description…" style={{ width: '100%', paddingLeft: '38px', paddingRight: '14px', paddingTop: '11px', paddingBottom: '11px', borderRadius: '10px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortBy)} style={{ padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', color: 'var(--color-ink)', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}>
              <option value="rating">Top rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Sidebar */}
        <aside>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-hairline)', borderRadius: '14px', padding: '20px', position: 'sticky', top: '80px' }}>
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setCategory(c.value)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '7px', border: 'none', background: category === c.value ? 'rgba(15,98,254,0.1)' : 'none', color: category === c.value ? 'var(--color-accent)' : 'var(--color-ink)', fontFamily: 'var(--font-space-grotesk)', fontWeight: category === c.value ? 700 : 500, fontSize: '12px', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>

            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Owner Type</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
              {([['all', '🌐', 'All Owners'], ['shop', '🏪', 'Verified Shops'], ['individual', '🤝', 'Individuals']] as const).map(([val, icon, label]) => (
                <button key={val} onClick={() => setOwnerType(val as OwnerType)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '7px', border: 'none', background: ownerType === val ? 'rgba(15,98,254,0.1)' : 'none', color: ownerType === val ? 'var(--color-accent)' : 'var(--color-ink)', fontFamily: 'var(--font-space-grotesk)', fontWeight: ownerType === val ? 700 : 500, fontSize: '12px', cursor: 'pointer', textAlign: 'left' }}>
                  {icon} {label}
                </button>
              ))}
            </div>

            <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-muted)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Max Price / Day</h3>
            <input type="range" min={10} max={150} step={5} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-accent)', marginBottom: '4px' }} />
            <div style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-accent)', marginBottom: '16px' }}>Up to ${maxPrice}/day</div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', paddingTop: '12px', borderTop: '1px solid var(--color-hairline)' }}>
              <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} style={{ accentColor: 'var(--color-accent)', width: '14px', height: '14px' }} />
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, fontSize: '12px', color: 'var(--color-ink)' }}>Available only</span>
            </label>

            {(category !== 'all' || ownerType !== 'all' || maxPrice < 150 || availableOnly || search) && (
              <button onClick={() => { setCategory('all'); setOwnerType('all'); setMaxPrice(150); setAvailableOnly(false); setSearch('') }} style={{ marginTop: '14px', width: '100%', padding: '7px', borderRadius: '7px', border: '1px solid var(--color-hairline)', background: 'none', color: 'var(--color-muted)', fontFamily: 'var(--font-inter)', fontSize: '12px', cursor: 'pointer' }}>Clear filters</button>
            )}
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '13px', color: 'var(--color-muted)' }}>{filtered.length} item{filtered.length !== 1 ? 's' : ''} found</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ padding: '5px 12px', borderRadius: '100px', background: 'rgba(15,98,254,0.1)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: 'var(--color-accent)' }}>🏪 {GEAR.filter(g => g.ownerType === 'shop').length} from shops</div>
              <div style={{ padding: '5px 12px', borderRadius: '100px', background: 'rgba(30,142,90,0.1)', fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '11px', color: '#1E8E5A' }}>🤝 {GEAR.filter(g => g.ownerType === 'individual').length} from creators</div>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-muted)', fontFamily: 'var(--font-inter)' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
              <p>No gear matches your filters.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '18px' }}>
              {filtered.map(g => <GearCard key={g.id} item={g} onRent={setRenting} />)}
            </div>
          )}
        </div>
      </div>

      {renting && <RentalModal item={renting} onClose={() => setRenting(null)} />}
    </div>
  )
}
