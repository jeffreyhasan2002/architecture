// Source of truth: SCENEORA-SRS-PRD-Architecture.md §3 (PRODUCT FEATURES)
// Every feature in the §3.1 Feature Index gets one entry here — nothing skipped.

export type FeatureCategory = 'core' | 'growth' | 'money'
export type FeatureStatus = 'Confirmed' | 'Detailed' | 'Proposed' | 'Conceptual'

export interface PlatformFeature {
  id: string
  code: string
  category: FeatureCategory
  status: FeatureStatus
  icon: string
  color: string
  bg: string
  title: string
  tagline: string
  beneficiary: string
  goal: string
  mermaid: string
  how: string[]
  module: string
  tables: string[]
  acceptance: string[]
  linkOut?: { href: string; label: string }
}

export interface RadarItem {
  letter: string
  title: string
  how: string
  why: string
}

export const CATEGORY_META: Record<FeatureCategory, { label: string; desc: string; color: string; bg: string }> = {
  core:   { label: 'Core Platform (§3.2–3.9)',        desc: '8 primary features — the trust loop every booking runs through.',                color: '#4F46E5', bg: '#EEF2FF' },
  growth: { label: 'Growth & Retention (§3.10, v4.0)', desc: '10 proposed features — capture explorers, retain creators, grow GMV, scale demand, expand.', color: '#059669', bg: '#ECFDF5' },
  money:  { label: 'Money & Logistics (§3.10, v4.1)',  desc: '3 proposed features — closing gaps in the booking/payment state machine.',       color: '#D97706', bg: '#FFFBEB' },
}

export const PLATFORM_FEATURES: PlatformFeature[] = [
  // ───────────────────────────── CORE (3.2–3.9) ─────────────────────────────
  {
    id: 'geo-discovery', code: '§3.2', category: 'core', status: 'Detailed',
    icon: '📍', color: '#4F46E5', bg: '#EEF2FF',
    title: 'Geo Discovery Engine', tagline: 'Location-aware search, SSR for Google', beneficiary: 'Clients / Brands',
    goal: 'Location-aware search (radius + style/budget/availability/rating filters), server-rendered so it is fully crawlable. SSR is a customer-acquisition decision — organic CAC is 10–20× cheaper than paid in Tier-2 cities.',
    mermaid: `flowchart LR
    A[Geolocation or manual city] --> B[Algolia geo query]
    B --> C["Filters: style / budget / availability / rating"]
    C --> D["Rank: distance + relevance + trust + recency"]
    D --> E[SSR result page — Google-indexable]`,
    how: [
      'Geolocation (with consent) or manual city entry seeds the query.',
      'Algolia geo-query returns candidates within radius.',
      'Filters compose: style tags, budget band, live availability, rating floor.',
      'Ranking blends distance + relevance + trust score + recency.',
      'Result page is server-rendered — HTML present without JS, so it is fully crawlable.',
    ],
    module: 'search', tables: ['creators (indexed)', 'creator_slots', 'trust_scores'],
    acceptance: [
      'Search by city+service returns geo-ranked results in <100ms (Algolia).',
      'Result page is server-rendered and fully crawlable (HTML present without JS).',
      'Filters (style/budget/availability/rating) compose correctly.',
      'Ranking reflects distance + trust + recency + availability.',
    ],
  },
  {
    id: 'slot-engine', code: '§3.3', category: 'core', status: 'Detailed',
    icon: '📅', color: '#4F46E5', bg: '#EEF2FF',
    title: 'Slot Availability Engine', tagline: 'Real-time calendar, no inquiry round-trip', beneficiary: 'Clients + Creators',
    goal: 'A real-time per-creator calendar that removes the "is this date free?" inquiry round-trip. A 15-minute Redis-backed soft hold prevents double-booking while a client completes checkout.',
    mermaid: `stateDiagram-v2
    [*] --> OPEN
    OPEN --> SOFT_HOLD: client selects date
    SOFT_HOLD --> OPEN: 15-min TTL expires
    SOFT_HOLD --> PAYMENT_PENDING: checkout started
    PAYMENT_PENDING --> CONFIRMED: payment success
    PAYMENT_PENDING --> OPEN: payment abandoned
    CONFIRMED --> COMPLETED: shoot delivered
    COMPLETED --> REVIEWED: review submitted`,
    how: [
      'State machine: OPEN → SOFT_HOLD (15-min Redis TTL) → PAYMENT_PENDING → CONFIRMED → COMPLETED → REVIEWED.',
      'SOFT_HOLD auto-reverts to OPEN on TTL expiry — no creator action needed.',
      'Concurrent holds on the same date are serialized so exactly one wins.',
    ],
    module: 'slots', tables: ['creator_slots (month-partitioned)', 'Redis hold keys', 'bookings', 'payments'],
    acceptance: [
      'Selecting an OPEN date creates a Redis soft-hold visible to all viewers within 1s.',
      'Hold auto-expires at 15 min and reopens the slot with no creator action.',
      'A confirmed booking marks the date BOOKED.',
      'Double-booking is impossible under concurrent holds (verified by concurrency test).',
    ],
  },
  {
    id: 'review-system', code: '§3.4', category: 'core', status: 'Detailed',
    icon: '⭐', color: '#4F46E5', bg: '#EEF2FF',
    title: 'Review Completion System', tagline: 'Behavior-triggered, target 65%+ completion', beneficiary: 'All roles',
    goal: 'Structured, behavior-triggered, incentivized reviews targeting 65%+ completion. Every review updates the Trust Score, which drives search ranking.',
    mermaid: `flowchart LR
    A[Booking COMPLETED] -->|48h timer| B[Review prompt fires]
    B --> C["Star + dimension ratings + text + photo"]
    C --> D[Moderation queue]
    D --> E[Published on profile]
    E --> F["Creator response window (≤7 days)"]
    F --> G[Trust Score recalculated]
    G --> H[Search ranking updated]`,
    how: [
      'Triggered exactly 48h after booking status becomes COMPLETED.',
      'Structured form: star rating + per-dimension ratings + prompted text + optional photo.',
      'All reviews pass a moderation queue before appearing publicly.',
      'One creator response allowed within 7 days.',
      'Trust Score = (rating×0.40 + completion×0.20 + response_time×0.15 + reliability×0.15 + completeness×0.10) × 100.',
    ],
    module: 'reviews', tables: ['reviews', 'review_dimensions', 'trust_scores'],
    acceptance: [
      'Review prompt fires exactly 48h after COMPLETED.',
      'Structured form enforces star + dimension ratings.',
      'One creator response allowed within 7 days.',
      'Published review updates trust score and re-syncs Algolia.',
      'Flagged reviews enter moderation, not the public profile.',
    ],
  },
  {
    id: 'budget-estimator', code: '§3.5', category: 'core', status: 'Detailed',
    icon: '💰', color: '#7C3AED', bg: '#F5F3FF',
    title: 'AI Budget Estimator', tagline: '7-step wizard → price range in <4s', beneficiary: 'Clients',
    goal: 'Removes price anxiety before a client is willing to talk numbers with a creator. Fully interactive demo lives on the AI Features page.',
    mermaid: `flowchart LR
    A[7-step wizard] --> B["claude-sonnet-4-6 (server-side, JSON-only)"]
    B --> C["Low / Recommended / Premium + breakdown"]
    C --> D[Matched listings]
    B -.->|24h cache| E[Redis]`,
    how: [
      '7-step wizard collects event type, service, city, season, duration, add-ons, budget band.',
      'Server-side Claude call returns structured JSON: low/recommended/premium + per-service breakdown.',
      'Seasonal multiplier (Oct–Feb peak) and city-tier adjustment applied.',
      'Continuous learning loop compares estimate vs. actual booking value.',
      'Identical inputs served from a 24h Redis cache.',
    ],
    module: 'budget-ai', tables: ['budget_estimates (cache)', 'creators'],
    acceptance: [
      '7-step wizard returns low/recommended/premium + per-service breakdown + matched listings in <4s.',
      'Output is valid JSON to schema.',
      'Seasonal + city-tier multipliers applied.',
      'Identical inputs served from 24h cache.',
    ],
    linkOut: { href: '/features/ai', label: 'Try the interactive demo →' },
  },
  {
    id: 'matching-engine', code: '§3.6', category: 'core', status: 'Detailed',
    icon: '🧩', color: '#4F46E5', bg: '#EEF2FF',
    title: 'Freelancer Discovery & Matching', tagline: 'Two-sided matching + AI style tags', beneficiary: 'Creators / Agencies',
    goal: 'Two-sided matching — creators↔collaborators, agencies↔freelancers — ranked by compatibility, with AI portfolio classification driving style-filtered search.',
    mermaid: `flowchart LR
    subgraph Inputs
      REQ[Project requirements]
      SIG[Creator signals]
    end
    REQ --> ENG[Matching engine]
    SIG --> ENG
    ENG --> RANK["Ranked matches + compatibility score + 'worked together before'"]
    UP[Portfolio upload → R2] --> VIS[Claude Vision style classification]
    VIS --> TAGS[Style tags]
    TAGS --> ENG`,
    how: [
      'Inputs = project requirements × creator signals (style, availability, price, past collaborations).',
      'Engine outputs ranked matches with a compatibility score and a "worked together before" flag.',
      'Portfolio uploads to R2 are classified by Claude Vision into style tags automatically.',
    ],
    module: 'matching', tables: ['creators', 'portfolio_assets', 'collaboration_history'],
    acceptance: [
      'Multi-requirement search returns ranked creators with a compatibility score and "worked together before" flag where applicable.',
      'Portfolio uploads receive AI style tags before appearing in style-filtered search.',
    ],
  },
  {
    id: 'trust-infrastructure', code: '§3.7', category: 'core', status: 'Detailed',
    icon: '🛡️', color: '#4F46E5', bg: '#EEF2FF',
    title: 'Trust Infrastructure', tagline: '"Trust is not a feature. It is the product."', beneficiary: 'All roles',
    goal: 'Identity verification, EXIF spot-checks, reviews, escrow, and dispute resolution combine into one payment state machine that nobody can bypass. Targets: dispute rate <2%, satisfaction >85%.',
    mermaid: `stateDiagram-v2
    [*] --> BOOKING_INITIATED
    BOOKING_INITIATED --> ADVANCE_PAID
    ADVANCE_PAID --> SHOOT_CONFIRMED
    SHOOT_CONFIRMED --> DELIVERY_IN_PROGRESS
    DELIVERY_IN_PROGRESS --> DELIVERY_CONFIRMED
    DELIVERY_CONFIRMED --> BALANCE_RELEASED
    BALANCE_RELEASED --> COMPLETED
    COMPLETED --> REVIEW_PROMPTED
    ADVANCE_PAID --> DISPUTED: dispute raised
    SHOOT_CONFIRMED --> DISPUTED: dispute raised
    DELIVERY_IN_PROGRESS --> DISPUTED: dispute raised
    DISPUTED --> RESOLVED_FOR_CLIENT
    DISPUTED --> RESOLVED_FOR_CREATOR
    DISPUTED --> PARTIAL_RESOLUTION`,
    how: [
      'Aadhaar identity verification produces a badged, publicly visible "verified" status.',
      'EXIF spot-checks catch stock-photo / stolen-portfolio fraud.',
      'Payment state machine: BOOKING_INITIATED → ADVANCE_PAID → SHOOT_CONFIRMED → DELIVERY_IN_PROGRESS → DELIVERY_CONFIRMED → BALANCE_RELEASED → COMPLETED → REVIEW_PROMPTED.',
      'A dispute can be raised from any post-advance state and routes to RESOLVED_FOR_CLIENT / RESOLVED_FOR_CREATOR / PARTIAL_RESOLUTION.',
    ],
    module: 'trust + payments', tables: ['kyc_verifications', 'payments', 'disputes', 'trust_scores'],
    acceptance: [
      'Escrow releases balance only after DELIVERY_CONFIRMED.',
      'Every payment mutation is idempotent (duplicate request → single charge, verified).',
      'Dispute can be raised from any post-advance state and routes to a Trust Officer with an evidence window.',
      'Verified badge requires completed KYC.',
    ],
  },
  {
    id: 'connected-workflow', code: '§3.8', category: 'core', status: 'Conceptual',
    icon: '🔗', color: '#4F46E5', bg: '#EEF2FF',
    title: 'One Connected Workflow', tagline: 'The umbrella every other feature plugs into', beneficiary: 'All roles',
    goal: 'The umbrella feature: every other feature on this page is a station on one uninterrupted rail from search to review. No step forces a user off-platform into WhatsApp, Drive, or UPI.',
    mermaid: `flowchart LR
    A[Search] --> B[Profile] --> C[Slot] --> D[Budget] --> E["Book + Pay"] --> F["In-app chat"] --> G["Delivery confirm"] --> H["Balance release"] --> I[Review] --> J[Done]`,
    how: [
      'Search → Profile → Slot → Budget → Book+Pay → in-app chat → delivery confirm → balance release → review → done.',
      'Every step writes an auditable record, so the full lifecycle is reconstructable for support or disputes.',
    ],
    module: 'orchestration (cross-module)', tables: ['bookings', 'audit_log'],
    acceptance: [
      'A booking can be completed end-to-end (discover → book → pay → chat → deliver → review) without leaving the platform.',
      'Each step writes an auditable record.',
    ],
  },
  {
    id: 'brand-deal-infra', code: '§3.9', category: 'core', status: 'Detailed',
    icon: '🎬', color: '#B45309', bg: '#FFFBEB',
    title: 'Brand Deal Infrastructure', tagline: 'Dedicated UGC / social layer', beneficiary: 'Content Creators / Brands',
    goal: 'A dedicated workflow for brand↔content-creator deals: extended profiles (niches, platforms, rate cards), AI fit scoring, AI brief parsing, auto-contracts, and a deliverable state machine with a capped revision loop.',
    mermaid: `flowchart TD
    B[Brand searches creators] --> FIT["AI Fit Score: Strong / Good / Partial"]
    FIT --> BRIEF["Brief sent (form / PDF)"]
    BRIEF --> AI[AI Brief Parser extracts scope]
    AI --> NEG{Creator accepts?}
    NEG -->|Accept| CON[Auto-contract] --> ESC["Escrow (full, or 50% if >₹50K)"]
    ESC --> DRAFT[Draft submitted] --> APP{Brand approves?}
    APP -->|Revise, capped| DRAFT
    APP -->|Approve| DEL[Creator delivers] --> REL["Balance released (T+1)"] --> REV[Mutual review]`,
    how: [
      'Fit Score = (niche×0.30 + audience×0.25 + engagement×0.20 + experience×0.15 + trust×0.10) × 100, shown as Strong/Good/Partial.',
      'AI Brief Parser turns a messy PDF/form/email into structured deliverables, rights, and timeline.',
      'Deliverable state machine: BRIEF_SENT → UNDER_NEGOTIATION → AGREED → ADVANCE_HELD → DRAFT_SUBMITTED ⇄ REVISION_REQUESTED → APPROVED → DELIVERED → BALANCE_RELEASED → COMPLETED → REVIEW_PROMPTED.',
      'Escrow funds before production starts — full amount, or 50% advance if the deal is >₹50,000.',
    ],
    module: 'brand-deals', tables: ['brand_deals', 'deliverables', 'contracts'],
    acceptance: [
      'Brief (form or PDF) is AI-parsed into deliverables/rights/timeline.',
      'Contract auto-generates on agreement.',
      'Escrow funds before production.',
      'Revision count enforced against the agreed cap.',
      'Balance releases T+1 after brand confirmation.',
    ],
    linkOut: { href: '/how-it-works/brand-deals', label: 'See the full brand-deal guide →' },
  },

  // ───────────────────────────── GROWTH & RETENTION (3.10.1–3.10.10) ─────────────────────────────
  {
    id: 'shortlist-compare', code: 'G1 · §3.10.1', category: 'growth', status: 'Proposed',
    icon: '❤️', color: '#059669', bg: '#ECFDF5',
    title: 'Shortlist + Compare + Re-engagement', tagline: '~80% don’t book on the first visit', beneficiary: 'Clients',
    goal: '~80% of visitors don’t book on their first visit — wedding decisions are slow and multi-person. Capture that intent, accelerate the decision, and bring them back.',
    mermaid: `flowchart LR
    A["Save creator (wishlist)"] --> B["Compare 2–3 side by side<br/>(price, style, trust, next-available, response time)"]
    B --> C["Share read-only shortlist link<br/>(couple + family decide together)"]
    C --> D{Availability / price changes?}
    D -->|Yes| E["Re-engagement nudge<br/>(≤1×/creator/7d)"]
    E --> F[Back to profile]`,
    how: [
      'Authenticated users save to a `wishlist` table; visitors save to `localStorage`, merged automatically on signup.',
      'Compare view shows up to 3 creators side by side.',
      'A BullMQ `engagement` queue (daily) fires nudges on: date opens, price-band drop, "booking fast" signal, or 3-day no-return.',
      'Every nudge respects notification preferences and fires at most once per creator per 7 days.',
    ],
    module: 'extends creators', tables: ['wishlist', 'shortlists'],
    acceptance: [
      'Save persists and merges on signup.',
      'Compare ≤3 creators in <400ms on cache hit.',
      'Each nudge ≤1×/creator/7d and obeys opt-outs.',
      'Shared shortlist viewable only via signed URL.',
    ],
  },
  {
    id: 'gallery-proofing', code: 'G2 · §3.10.2', category: 'growth', status: 'Proposed',
    icon: '🖼️', color: '#059669', bg: '#ECFDF5',
    title: 'Gallery Proofing & Delivery', tagline: 'The retention keystone', beneficiary: 'Creators (retention)',
    goal: 'Photographers deliver via Pixieset/Drive today, so the platform loses the most emotional moment of the whole relationship and must *ask* for delivery confirmation. Bringing delivery in-platform makes DELIVERY_CONFIRMED automatic.',
    mermaid: `flowchart TD
    UP["Creator uploads → R2"] --> PR["Thumbnails, watermark proofs, AI tags"]
    PR --> PUB["Publish private gallery"] --> NT[Client notified]
    NT --> SEL["Client favorites + selects finals"] --> CRE[Creator edits finals]
    CRE --> FIN["Upload finals"] --> ACC["Client downloads / accepts"]
    ACC --> CONF["Auto DELIVERY_CONFIRMED → balance release"] --> REV["Review (48h)"]`,
    how: [
      'Presigned direct-to-R2 multipart upload keeps large galleries off the API server.',
      'Reuses the AI portfolio-tagging pipeline for thumbnails and style tags.',
      'Client accept/download deterministically transitions DELIVERY_IN_PROGRESS → DELIVERY_CONFIRMED.',
      'Inactivity auto-confirms after N days (e.g. 7, with reminders) so escrow keeps moving.',
      'Storage caps map to Free/Pro/Studio subscription plans.',
    ],
    module: 'new: galleries', tables: ['galleries', 'gallery_assets'],
    acceptance: [
      '500-image upload succeeds via presigned multipart without API memory pressure.',
      'Accept/download deterministically sets DELIVERY_CONFIRMED + queues release.',
      'Inactivity auto-confirm only after window + reminders.',
      'Proofs are watermarked, finals are not.',
    ],
  },
  {
    id: 'ai-concierge', code: 'G3 · §3.10.3', category: 'growth', status: 'Proposed',
    icon: '🤖', color: '#059669', bg: '#ECFDF5',
    title: 'AI Concierge', tagline: '"Describe your event, get matched"', beneficiary: 'Clients',
    goal: 'Collapses search + budget + matching into one natural-language step. Almost entirely reuses the existing Claude + Budget Estimator + Matching stack — the build cost is orchestration and UI, not new AI.',
    mermaid: `flowchart LR
    A["Free text (+ optional voice)"] --> B["Claude extracts EventParams"]
    B --> C{Needs clarification?}
    C -->|"≤2 questions"| A
    C -->|No| D["Budget Estimator (range)"]
    D --> E["Matching (ranked creators)"]
    E --> F["Curated shortlist + 'why this fits'"]`,
    how: [
      'A single structured-output Claude call extracts the same `EventParams` the Budget Estimator consumes.',
      'Reuses `budget:est:{hash}` and `fit:score` caches — no duplicate computation.',
      'Everything runs server-side, rate-limited; the API key is never client-exposed.',
    ],
    module: 'thin orchestrator over budget-ai + matching', tables: ['concierge_sessions'],
    acceptance: [
      'One realistic sentence → budget range + ≥3 matches in <4s.',
      '≤2 clarifying questions.',
      'Visitor sessions merge on signup.',
      'Key never client-exposed.',
    ],
    linkOut: { href: '/features/ai', label: 'Try the interactive demo →' },
  },
  {
    id: 'quote-inquiry', code: 'G4 · §3.10.4', category: 'growth', status: 'Proposed',
    icon: '💬', color: '#059669', bg: '#ECFDF5',
    title: 'Quote / Inquiry without Full Booking', tagline: 'Keeps the conversation in-platform', beneficiary: 'Clients + Creators',
    goal: 'Many real bookings need a conversation first ("2-city wedding?"). Capturing that in-platform stops the leak to WhatsApp and feeds response time into the trust score.',
    mermaid: `flowchart LR
    A["Structured quote request<br/>(date, scope, budget, message)"] --> B["Creator sends custom quote<br/>(line items → total)"]
    B --> C{Client accepts?}
    C -->|Yes| D["Soft hold + Razorpay order<br/>(existing booking path)"]
    C -->|No response in time| E[Auto-expire]`,
    how: [
      'New `inquiries` + `quotes` tables; threaded chat via the messaging module.',
      'Response time feeds directly into `response_time_score`.',
      'Unanswered inquiries auto-expire via an `inquiryExpiry` queue.',
      'Accepting a quote reuses the existing soft-hold + checkout path atomically.',
    ],
    module: 'new: inquiries', tables: ['inquiries', 'quotes'],
    acceptance: [
      'Accepting a quote atomically creates a soft hold + idempotent order.',
      'Unanswered inquiries expire on schedule.',
      'Response time updates trust score.',
    ],
  },
  {
    id: 'milestone-escrow', code: 'G5 · §3.10.5', category: 'growth', status: 'Proposed',
    icon: '🧱', color: '#059669', bg: '#ECFDF5',
    title: 'Milestone / Installment Escrow', tagline: '₹3L+ is hard to pay in two chunks', beneficiary: 'Clients',
    goal: 'Large weddings split into advance → mid → balance, each independently escrowed and released on milestones. Extends the existing §11 payment state machine without replacing it.',
    mermaid: `flowchart LR
    A["Booking carries milestones[]"] --> B["Advance escrow"]
    B -->|"on SHOOT_CONFIRMED"| C["Mid-payment escrow"]
    C -->|"on DELIVERY_CONFIRMED"| D["Balance escrow"]
    D --> E[All milestones released]
    B -.->|dispute| F["Dispute targets a single milestone"]`,
    how: [
      'Each milestone is its own escrow hold + idempotent Razorpay order.',
      'Release rules attach to booking states: mid on SHOOT_CONFIRMED, balance on DELIVERY_CONFIRMED.',
      'Disputes can target a single milestone without freezing the whole booking.',
    ],
    module: 'extends payments', tables: ['booking_milestones'],
    acceptance: [
      'Each milestone independently escrowed/released/refunded/disputable.',
      'Sum of milestones equals booking total (enforced server-side).',
    ],
  },
  {
    id: 'cancellation-protection', code: 'G6 · §3.10.6', category: 'growth', status: 'Proposed',
    icon: '🛟', color: '#059669', bg: '#ECFDF5',
    title: 'Cancellation Protection (add-on)', tagline: 'Turns fear into a paid safety net', beneficiary: 'Clients',
    goal: 'Directly attacks the #1 fear — "what if they don’t show up." A small optional fee becomes both a revenue line and a strong trust signal.',
    mermaid: `flowchart LR
    A["Opt-in fee at checkout"] --> B{Creator cancels / no-show?}
    B -->|Yes| C[Auto full refund]
    C --> D["Priority rebooking pool<br/>(same-date, similar-tier, verified)"]
    C --> E[Reliability-score penalty on creator]
    B -->|No| F[Booking proceeds normally]`,
    how: [
      'Opt-in fee is added at checkout as a booking attribute.',
      'On creator cancel/no-show: automatic full refund + surfaced priority rebooking pool + reliability penalty.',
    ],
    module: 'extends payments + bookings', tables: ['bookings.protection_opted', 'bookings.protection_fee_paise'],
    acceptance: [
      'Protected creator-cancel auto-refunds + surfaces ≥3 same-date alternatives where available.',
      'Reliability penalty reflected in ranking.',
    ],
  },
  {
    id: 'addon-marketplace', code: 'G7 · §3.10.7', category: 'growth', status: 'Proposed',
    icon: '➕', color: '#059669', bg: '#ECFDF5',
    title: 'Add-on Marketplace', tagline: 'Raises AOV with near-zero new infra', beneficiary: 'Creators (AOV)',
    goal: 'Albums, prints, drone footage, extra hours, second shooter, rush delivery — all sold through the same rails as the base booking.',
    mermaid: `flowchart LR
    A["Creator defines add-ons"] --> B["Client adds at / after checkout"]
    B --> C["Folded into same escrow + take-rate"]
    C --> D[Invoice reflects add-ons]`,
    how: [
      'Creators define their own add-on catalogue.',
      'Clients add add-ons at or after checkout; amounts fold into the same escrow, take-rate, and invoice.',
    ],
    module: 'new: addons', tables: ['creator_addons', 'booking_addons'],
    acceptance: ['Add-ons recompute total, fee/GST, payout correctly and appear on the invoice.'],
  },
  {
    id: 'referral-program', code: 'G8 · §3.10.8', category: 'growth', status: 'Proposed',
    icon: '🎁', color: '#059669', bg: '#ECFDF5',
    title: 'Referral Program', tagline: 'Make word-of-mouth trackable', beneficiary: 'All (growth)',
    goal: 'Word-of-mouth is already the industry’s main channel — make it trackable and rewarded, compounding the flywheel cheaply.',
    mermaid: `flowchart LR
    A["Referral code / link shared"] --> B["Referred user signs up"]
    B --> C["First completed, paid booking"]
    C --> D["Both parties get wallet credit"]
    D -.->|"anti-abuse dedupe"| E["Device + payment instrument check"]`,
    how: [
      'Reward triggers only on the referred user’s first completed, paid booking.',
      'Both referrer and referee get a wallet credit (against fee or subscription).',
      'Anti-abuse dedupe by device and payment instrument; self-referral blocked.',
    ],
    module: 'new: referrals', tables: ['referrals', 'wallet_credits'],
    acceptance: [
      'Reward issues only after first completed paid booking.',
      'Credits apply to fees/subscriptions with expiry.',
      'Self-referral blocked.',
    ],
  },
  {
    id: 'real-weddings-blog', code: 'G9 · §3.10.9', category: 'growth', status: 'Proposed',
    icon: '📰', color: '#059669', bg: '#ECFDF5',
    title: 'Real Weddings / Blog', tagline: 'SEO + inspiration, tagging real creators', beneficiary: 'Demand (SEO)',
    goal: 'Featured shoots become durable SEO landing pages and inspiration in the platform’s strongest acquisition channel, while tagging the creators involved for discovery and backlinks.',
    mermaid: `flowchart LR
    A["Completed gallery + client consent"] --> B["Editorial entry (SSG/ISR)"]
    B --> C["schema.org Article / ImageGallery"]
    C --> D["Tag creators involved"]
    D --> E["Backlinks to creator profiles"]`,
    how: [
      'Editorial entries are SSG/ISR pages with schema.org markup.',
      'Sourced from completed galleries with explicit consent.',
      'Tagged creators get profile backlinks.',
    ],
    module: 'new: content', tables: ['stories'],
    acceptance: ['Story pages server-rendered, indexable, valid schema markup, link to tagged creators.'],
  },
  {
    id: 'vendor-marketplace', code: 'G10 · §3.10.10', category: 'growth', status: 'Proposed',
    icon: '🏰', color: '#059669', bg: '#ECFDF5',
    title: 'Vendor Marketplace Expansion', tagline: 'The long game — the "wedding OS"', beneficiary: 'Platform (long game)',
    goal: 'The path from "photographer app" to "wedding operating system": decor, catering, MUA, venues on the same trust/escrow/booking/review rails.',
    mermaid: `flowchart TD
    A["'Plan my wedding'"] --> B[Pick categories]
    B --> C["Discover per category"]
    C --> D["Assemble multi-vendor wedding plan"]
    D --> E["Escrow per vendor / milestone"]
    E --> F["One shared timeline"]
    F --> G["Each vendor delivers + reviewed"]`,
    how: [
      'A `vendor_category` taxonomy plus category-specific profile fields.',
      'Slots, escrow, reviews, and disputes are reused unchanged — no new trust rails.',
      'Matching extends to bundles across categories.',
    ],
    module: 'generalizes creators → vendors', tables: ['creators.vendor_category', 'wedding_plans'],
    acceptance: [
      'New vendor category added via config without rewriting booking/payment/review.',
      'A wedding plan aggregates multiple vendor bookings into one timeline.',
    ],
  },

  // ───────────────────────────── MONEY & LOGISTICS (3.10.11–3.10.13) ─────────────────────────────
  {
    id: 'reschedule', code: 'G11 · §3.10.11', category: 'money', status: 'Proposed',
    icon: '🔁', color: '#D97706', bg: '#FFFBEB',
    title: 'Reschedule (booking date change)', tagline: 'Fixes a real state-machine gap', beneficiary: 'Clients + Creators',
    goal: 'The booking/slot state machines only modeled confirm or cancel — but Indian weddings are routinely postponed (muhurat shifts, family reasons). Without reschedule, this forces cancel+rebook: refund friction, lost escrow continuity, and an unfair reliability penalty for a creator who did nothing wrong.',
    mermaid: `flowchart TD
    CONF[CONFIRMED] --> RR["Reschedule requested by either party"]
    RR --> AG{"Both agree new date?"}
    AG -->|Yes| CHK{"Within free-change window?"}
    CHK -->|Yes| MV["Move escrow + slot to new date — no fee"]
    CHK -->|No| FEE["Apply reschedule fee, then move"]
    MV --> CONF2["CONFIRMED on new date"]
    FEE --> CONF2
    AG -->|No| POL["Cancellation policy / dispute"]`,
    how: [
      'State addition: CONFIRMED → RESCHEDULE_REQUESTED → (agree) RESCHEDULED → CONFIRMED(new date), or (declined) → cancellation policy/dispute.',
      'The slot engine atomically releases the old slot and holds the new one in a single transaction.',
      'Escrow and milestones (§3.10.5) carry over untouched.',
      'Free reschedule if >30 days out; a configurable fee inside the window; a per-booking reschedule cap (e.g. 2).',
      'A mutually-agreed reschedule applies no reliability penalty.',
    ],
    module: 'extends bookings + slots', tables: ['booking_reschedules'],
    acceptance: [
      'Old slot frees and new slot holds atomically (no double-book, no orphaned hold).',
      'Escrow/milestones persist across the move.',
      'Mutually-agreed reschedule applies no reliability penalty.',
      'Reschedule cap enforced.',
    ],
  },
  {
    id: 'split-payments', code: 'G12 · §3.10.12', category: 'money', status: 'Proposed',
    icon: '👥', color: '#D97706', bg: '#FFFBEB',
    title: 'Split / Group Payments', tagline: 'Weddings are family-funded', beneficiary: 'Clients (family-funded weddings)',
    goal: 'Indian weddings are family-funded — the bride’s side and groom’s side (or several relatives) each pay a share. Forcing one payer is a real conversion blocker.',
    mermaid: `flowchart LR
    A["Booking owner sets co-payers + shares"] --> B["Each co-payer pays via own idempotent Razorpay order"]
    B --> C{"Collected ≥ required advance?"}
    C -->|Yes| D[ADVANCE_PAID]
    C -->|Not yet| E["Soft hold extended (bounded window)"]
    E --> B
    D -.->|refund / dispute| F["Settled proportionally per payer"]`,
    how: [
      'One `payment_splits` row per payer; each is an independent order/payment.',
      'Booking advances to ADVANCE_PAID once collected shares meet the required advance.',
      'Soft hold extends while collection is in progress (bounded window); partial collection is surfaced ("₹X of ₹Y collected").',
      'Refunds/disputes settle proportionally to each payer.',
    ],
    module: 'extends payments', tables: ['payment_splits'],
    acceptance: [
      'Booking confirms only when collected shares meet the advance threshold.',
      'Each share is independently paid/refunded.',
      'Refunds are proportional.',
      'Hold-extension window enforced and abandoned splits reopen the slot.',
    ],
  },
  {
    id: 'emi-paylater', code: 'G13 · §3.10.13', category: 'money', status: 'Proposed',
    icon: '💳', color: '#D97706', bg: '#FFFBEB',
    title: 'EMI / Pay-Later', tagline: 'Client financing — creator unaffected', beneficiary: 'Clients (large bookings)',
    goal: '₹3L upfront is the single biggest conversion killer on large bookings. EMI/pay-later lets clients spread cost while the creator is still paid normally — the financing sits between client and lender, not the creator.',
    mermaid: `flowchart LR
    A["Checkout ≥ threshold (e.g. ₹50,000)"] --> B["Show affordability options<br/>(Razorpay EMI / cardless EMI / pay-later)"]
    B --> C["Client selects plan"] --> D["Lender disburses"]
    D --> E["Platform receives full amount"]
    E --> F["Normal escrow + payout path — unchanged"]`,
    how: [
      'Uses Razorpay EMI / Affordability Suite.',
      'A `financing_method` flag on the booking/payment records the chosen plan.',
      'Escrow and creator payout logic are completely untouched — the platform is funded in full by the lender.',
      'Reconciliation via the existing Razorpay webhook. Pairs naturally with Milestone Escrow (G5).',
    ],
    module: 'extends payments', tables: ['bookings.financing_method', 'payments.financing_provider'],
    acceptance: [
      'EMI options surface only above the threshold.',
      'Creator payout and escrow timing are identical to a full payment.',
      'Financing method recorded on the payment.',
      'Webhook reconciliation idempotent.',
    ],
  },
]

// §3.10.14 — Additional Recommendations (radar): index-only, no dedicated deep-dive.
export const RADAR_ITEMS: RadarItem[] = [
  { letter: 'A', title: '"Notify me when available" waitlist', how: 'Watch a booked date; alert if it frees', why: 'Recovers demand lost to unavailability' },
  { letter: 'B', title: 'Collaborative shortlist voting', how: 'Couple + parents vote/comment on saved creators', why: 'Matches the real multi-person decision unit' },
  { letter: 'C', title: 'Saved searches + alerts', how: 'Persist a search; notify on new matches', why: 'Brings users back; low effort' },
  { letter: 'D', title: 'WhatsApp booking assistant', how: 'BSP bot mirrors inquiry/booking over WhatsApp', why: 'Meets India where it transacts' },
  { letter: 'E', title: 'Loyalty / repeat-booking credit', how: 'Auto-credit on Nth booking with same client', why: 'Retention + LTV' },
  { letter: 'F', title: 'AI seasonal pricing suggestions', how: 'Claude suggests price tweaks by demand/season', why: 'Helps creators earn; differentiator' },
  { letter: 'G', title: 'Verified video reviews', how: 'Short client video testimonials tied to a booking', why: 'Highest-trust social proof' },
  { letter: 'H', title: 'Dispute-prevention check-ins', how: 'Auto nudges at shoot/delivery milestones', why: 'Cuts disputes before they start' },
  { letter: 'I', title: 'Creator payout advance (fintech)', how: 'Optional early payout for a fee, post-confirmation', why: 'Revenue line + creator loyalty' },
  { letter: 'J', title: 'Multi-language UI (Hindi/Tamil)', how: 'Localized UI + DLT/WhatsApp templates', why: 'Tier-2/3 reach (core market)' },
  { letter: 'K', title: 'Calendar sync (Google)', how: 'Two-way availability sync', why: 'Stops stale calendars / double-booking' },
  { letter: 'L', title: 'Contracts & e-signature for bookings', how: 'Auto-contract from terms, e-signed, stored as evidence', why: 'Extends brand-deal contracts to all bookings' },
]
