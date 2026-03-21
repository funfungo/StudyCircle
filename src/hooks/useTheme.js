import { useState, useCallback, useEffect } from 'react'
import themes from '../themes.json'

const themeKeys = Object.keys(themes.themes)

function applyThemeTokens(themeKey) {
  const tokens = themes.themes[themeKey]?.tokens
  if (!tokens) return
  const style = document.documentElement.style
  for (const [key, value] of Object.entries(tokens)) {
    style.setProperty(`--${key}`, value)
  }
  document.documentElement.setAttribute('data-theme', themeKey)
  localStorage.setItem('theme', themeKey)
  localStorage.setItem('theme-tokens', JSON.stringify(tokens))
}

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored && themes.themes[stored]) return stored
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return themes.defaultTheme
}

export function useTheme() {
  const [theme, _setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyThemeTokens(theme)
  }, [theme])

  const switchTheme = useCallback((key) => {
    if (!themes.themes[key]) return
    document.documentElement.setAttribute('data-theme-transition', '')
    setTimeout(() => {
      document.documentElement.removeAttribute('data-theme-transition')
    }, 500)
    _setTheme(key)
  }, [])

  const cycleTheme = useCallback(() => {
    _setTheme(prev => {
      const idx = themeKeys.indexOf(prev)
      const next = themeKeys[(idx + 1) % themeKeys.length]
      document.documentElement.setAttribute('data-theme-transition', '')
      setTimeout(() => {
        document.documentElement.removeAttribute('data-theme-transition')
      }, 500)
      return next
    })
  }, [])

  return { theme, themeKeys, themeNames: themes.themes, cycleTheme, switchTheme }
}
