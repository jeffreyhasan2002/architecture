'use client'
import { createContext, useContext } from 'react'

type Theme = 'light'
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Light-only — no dark mode
  return (
    <ThemeCtx.Provider value={{ theme: 'light', toggle: () => {} }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
