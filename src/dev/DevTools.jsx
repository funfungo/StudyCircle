import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import './DevTools.css'

const DEVICE_PRESETS = [
  { label: '桌面', width: 'full' },
  { label: 'iPad', width: 768 },
  { label: 'iPhone+', width: 414 },
  { label: 'iPhone 14', width: 390 },
  { label: 'iPhone SE', width: 375 },
]

const ROUTE_PRESETS = [
  { label: '首页', path: '/' },
  { label: '报名', path: '/register' },
]

export function DevTools({
  theme,
  themeKeys,
  themeNames,
  onSwitchTheme,
}) {
  const [open, setOpen] = useState(false)
  const [iframeWidth, setIframeWidth] = useState(null)
  const [pageView, setPageView] = useState('desktop')
  const [activePreset, setActivePreset] = useState(null)
  const iframeRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const toggle = useCallback(() => setOpen(v => !v), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleDevice = useCallback((preset) => {
    setActivePreset(preset.label)
    setIframeWidth(preset.width === 'full' ? window.innerWidth : preset.width)
  }, [])

  const isIframeMode = iframeWidth !== null

  useEffect(() => {
    if (!isIframeMode) return
    const root = document.getElementById('root')
    if (root) root.style.display = 'none'
    return () => { if (root) root.style.display = '' }
  }, [isIframeMode])

  useEffect(() => {
    if (!iframeRef.current) return
    try {
      const iframeDoc = iframeRef.current.contentDocument
      if (!iframeDoc) return
      const tokens = themeNames[theme]?.tokens
      if (!tokens) return
      const style = iframeDoc.documentElement.style
      for (const [key, value] of Object.entries(tokens)) {
        style.setProperty(`--${key}`, value)
      }
      iframeDoc.documentElement.setAttribute('data-theme', theme)
    } catch { /* iframe not ready */ }
  }, [theme, themeNames])

  const iframeSrc = (() => {
    const url = new URL(window.location.origin + window.location.pathname)
    if (pageView === 'paged') url.searchParams.set('view', 'mobile')
    url.searchParams.set('_devtools', '1')
    if (theme) url.searchParams.set('_theme', theme)
    return url.toString()
  })()

  return createPortal(
    <>
      {isIframeMode && (
        <div className="devtools-iframe-shell">
          <div className="devtools-iframe-badge">
            {Math.round(iframeWidth)} × {window.innerHeight}
          </div>
          <iframe
            ref={iframeRef}
            key={iframeSrc}
            className="devtools-iframe"
            src={iframeSrc}
            style={{ width: iframeWidth }}
            title="Preview"
          />
        </div>
      )}

      <div className={`devtools ${open ? 'devtools--open' : ''}`}>
        <button className="devtools__toggle" onClick={toggle} title="DevTools (Ctrl+`)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L2 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 3L14 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {open && (
          <div className="devtools__panel">
            <div className="devtools__section">
              <span className="devtools__label">Theme</span>
              <div className="devtools__row">
                {themeKeys.map(k => (
                  <button
                    key={k}
                    className={`devtools__chip ${theme === k ? 'devtools__chip--active' : ''}`}
                    onClick={() => onSwitchTheme(k)}
                  >
                    <span
                      className="devtools__swatch"
                      style={{ background: themeNames[k]?.tokens?.['color-accent'] }}
                    />
                    {themeNames[k]?.name || k}
                  </button>
                ))}
              </div>
            </div>

            <div className="devtools__section">
              <span className="devtools__label">Device</span>
              <div className="devtools__row devtools__row--wrap">
                {DEVICE_PRESETS.map(p => (
                  <button
                    key={p.label}
                    className={`devtools__chip ${activePreset === p.label ? 'devtools__chip--active' : ''}`}
                    onClick={() => handleDevice(p)}
                  >
                    {p.label}
                    {p.width !== 'full' && <span className="devtools__dim">{p.width}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="devtools__section">
              <span className="devtools__label">Page</span>
              <div className="devtools__row">
                <button
                  className={`devtools__chip ${pageView === 'desktop' ? 'devtools__chip--active' : ''}`}
                  onClick={() => setPageView('desktop')}
                >
                  响应式
                </button>
                <button
                  className={`devtools__chip ${pageView === 'paged' ? 'devtools__chip--active' : ''}`}
                  onClick={() => setPageView('paged')}
                >
                  3:4 翻页
                </button>
              </div>
            </div>

            <div className="devtools__section">
              <span className="devtools__label">Route</span>
              <div className="devtools__row">
                {ROUTE_PRESETS.map(r => (
                  <button
                    key={r.path}
                    className={`devtools__chip ${location.pathname === r.path ? 'devtools__chip--active' : ''}`}
                    onClick={() => navigate(r.path)}
                  >
                    {r.label}
                    <span className="devtools__dim">{r.path}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="devtools__hint">Ctrl + ` 快速开关</div>
          </div>
        )}
      </div>
    </>,
    document.body,
  )
}
