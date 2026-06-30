# Sceneora Documentation Site

A premium, interactive documentation & architecture website for Sceneora — built with Next.js 14, Tailwind CSS, TypeScript, Mermaid.js, and Framer Motion.

## Quick Start

```bash
cd docs-site
npm install
npm run dev
# Open http://localhost:3000
```

## Build & Deploy

```bash
npm run build   # Static export
npm run start   # Production server
```

### Vercel / Netlify / Cloudflare Pages

Push to GitHub and connect your deployment platform. The `output: 'standalone'` config in `next.config.ts` ensures efficient production builds.

## Structure

```
docs-site/
├── app/
│   ├── layout.tsx          # Root layout, font imports
│   ├── page.tsx            # Hero landing page
│   ├── globals.css         # Design tokens, base styles
│   └── docs/
│       ├── page.tsx        # Server component: parses MD → HTML
│       └── DocsClient.tsx  # Client shell: nav, search, theme
├── components/
│   ├── TopBar.tsx          # Fixed header with search + dark mode toggle
│   ├── Sidebar.tsx         # Auto-generated nav with scroll-spy
│   ├── TableOfContents.tsx # Right-side mini-TOC
│   ├── MermaidDiagram.tsx  # Interactive diagrams (zoom/pan/fullscreen)
│   ├── CommandPalette.tsx  # ⌘K search palette
│   ├── StatCards.tsx       # Animated KPI/metric cards
│   ├── PricingCards.tsx    # Subscription plan comparison
│   ├── RoadmapTimeline.tsx # Phase stepper (scale + city-launch)
│   ├── TechStackVisual.tsx # Layered tech stack diagram
│   ├── KPICards.tsx        # KPI definitions with formulas
│   ├── DocRenderer.tsx     # Mermaid injector + visual component router
│   └── ThemeProvider.tsx   # Dark/light mode context
└── lib/
    ├── parse-docs.ts       # Markdown parser (headings → nav, mermaid extraction)
    └── types.ts            # TypeScript interfaces

## Features

- **Interactive Mermaid diagrams** — zoom, pan, fullscreen, semantic colors
- **Command palette search** — ⌘K or / to search all 23 sections
- **Dark / light mode** — system-preference aware, persisted
- **Scroll-spy navigation** — sidebar + TOC track active section
- **Deep-linkable anchors** — every heading has a copy-link
- **Visual components** — stat cards, pricing cards, timeline, tech stack visual
- **Confidence badges** — `confirmed`, `Proposed`, `Assumed` inline
- **Copy buttons** — every code / SQL block
- **Responsive** — mobile drawer sidebar, desktop 3-column layout
- **Print-friendly** — clean print stylesheet
- **Accessible** — WCAG AA, keyboard nav, `prefers-reduced-motion`

## Source of Truth

All content is parsed from `../SCENEORA-SRS-PRD-Architecture.md` (the v4.5 canonical document). No content is invented or omitted. The parser (`lib/parse-docs.ts`) extracts headings for navigation and mermaid blocks for interactive rendering.

## Design

- **Display font**: Space Grotesk (headings)
- **Body font**: Inter
- **Mono font**: JetBrains Mono (code/SQL)
- **Accent**: #0F62FE (Indigo-blue)
- **Semantic palette**: confirmed/proposed/assumed/flow/storage/danger
- **Dark mode**: auto-detected from system, manually togglable
