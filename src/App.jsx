import { useEffect } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { StudyCirclePage } from './components/StudyCirclePage'
import { MobileStudyCirclePage } from './components/MobileStudyCirclePage'
import { RegistrationPage } from './components/RegistrationPage'
import { DevTools } from './dev/DevTools'
import { useTheme } from './hooks/useTheme'

function dismissLoading() {
  const el = document.getElementById('loading-screen')
  if (!el) return
  document.body.classList.add('app-ready')
  el.classList.add('loaded')
  el.addEventListener('transitionend', () => el.remove(), { once: true })
}

function HomePage({ onToggleTheme }) {
  const [searchParams] = useSearchParams()
  const isMobile = searchParams.get('view') === 'mobile'

  return isMobile
    ? <MobileStudyCirclePage onToggleTheme={onToggleTheme} />
    : <StudyCirclePage onToggleTheme={onToggleTheme} />
}

const isInsideDevToolsIframe =
  new URLSearchParams(window.location.search).has('_devtools')

export function App() {
  const { theme, themeKeys, themeNames, cycleTheme, switchTheme } = useTheme()

  useEffect(() => {
    document.fonts.ready.then(dismissLoading)
  }, [])

  const showDevTools = import.meta.env.DEV && !isInsideDevToolsIframe

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onToggleTheme={cycleTheme} />} />
        <Route path="/register" element={<RegistrationPage onToggleTheme={cycleTheme} />} />
      </Routes>
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
