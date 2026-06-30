import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        // Light mode
        bg: '#FAFAF8',
        ink: '#161616',
        muted: '#6F6F6F',
        hairline: 'rgba(0,0,0,0.08)',
        accent: '#0F62FE',
        // Semantic
        confirmed: '#1E8E5A',
        proposed: '#0F62FE',
        assumed: '#B7791F',
        flow: '#6D5BD0',
        storage: '#0E7C86',
        danger: '#C0362C',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#161616',
            '--tw-prose-headings': '#161616',
            '--tw-prose-links': '#0F62FE',
            '--tw-prose-code': '#161616',
            '--tw-prose-pre-bg': '#F3F3F1',
            maxWidth: '720px',
            lineHeight: '1.7',
            fontFamily: 'var(--font-inter)',
            h1: { fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em', fontWeight: '700' },
            h2: { fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.025em', fontWeight: '700' },
            h3: { fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em', fontWeight: '600' },
            code: { fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.875em' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#ECECEC',
            '--tw-prose-headings': '#F5F5F5',
            '--tw-prose-links': '#60A5FA',
            '--tw-prose-code': '#ECECEC',
            '--tw-prose-pre-bg': '#1E1E1E',
          },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        'dialog': '0 20px 60px rgba(0,0,0,0.15)',
      },
      animation: {
        'count-up': 'countUp 1.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.30,1) forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        countUp: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        drawLine: { '0%': { strokeDashoffset: '1000' }, '100%': { strokeDashoffset: '0' } },
      },
    },
  },
  plugins: [typography],
}

export default config
