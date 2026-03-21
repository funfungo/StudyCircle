import { useEffect, useState } from 'react'
import { StudyCirclePage } from './components/StudyCirclePage'
import { MobileStudyCirclePage } from './components/MobileStudyCirclePage'
import { DevTools } from './dev/DevTools'
import { useTheme } from './hooks/useTheme'

function dismissLoading() {
  const el = document.getElementById('loading-screen')
  if (!el) return
  document.body.classList.add('app-ready')
  el.classList.add('loaded')
  el.addEventListener('transitionend', () => el.remove(), { once: true })
}

function useViewMode() {
  const [mode, setMode] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('view') === 'mobile' ? 'mobile' : 'desktop'
  })

  useEffect(() => {
    const onChange = () => {
      const params = new URLSearchParams(window.location.search)
      setMode(params.get('view') === 'mobile' ? 'mobile' : 'desktop')
    }
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  return mode
}

const isInsideDevToolsIframe =
  new URLSearchParams(window.location.search).has('_devtools')

export function App() {
  const { theme, themeKeys, themeNames, cycleTheme, switchTheme } = useTheme()
  const viewMode = useViewMode()

  useEffect(() => {
    document.fonts.ready.then(dismissLoading)
  }, [])

  const showDevTools = import.meta.env.DEV && !isInsideDevToolsIframe

  return (
    <>
      {viewMode === 'mobile'
        ? <MobileStudyCirclePage onToggleTheme={cycleTheme} />
        : <StudyCirclePage onToggleTheme={cycleTheme} />
      }
      {showDevTools && (
        <DevTools
          theme={theme}
          themeKeys={themeKeys}
          themeNames={themeNames}
          onSwitchTheme={switchTheme}
        />
      )}
    </>
  )
}
