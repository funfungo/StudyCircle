import { useEffect } from 'react'
import { Routes, Route, Navigate, useSearchParams, useParams } from 'react-router-dom'
import { StudyCirclePage } from './components/StudyCirclePage'
import { MobileStudyCirclePage } from './components/MobileStudyCirclePage'
import { RegistrationPage } from './components/RegistrationPage'
import { AdminPage } from './components/AdminPage'
import { ShowNotesPage } from './components/ShowNotesPage'
import { MobileShowNotesPage } from './components/MobileShowNotesPage'
import { DevTools } from './dev/DevTools'
import { useTheme } from './hooks/useTheme'
import { siteDataMap, latestSeasonId, showNotesMap, latestEpisodeId } from './data'

function dismissLoading() {
  const el = document.getElementById('loading-screen')
  if (!el) return
  document.body.classList.add('app-ready')
  el.classList.add('loaded')
  el.addEventListener('transitionend', () => el.remove(), { once: true })
}

function SeasonPage({ onToggleTheme }) {
  const { seasonId } = useParams()
  const [searchParams] = useSearchParams()
  const isMobile = searchParams.get('view') === 'mobile'

  const data = siteDataMap[seasonId]
  if (!data) {
    return <Navigate to={`/${latestSeasonId}`} replace />
  }

  return isMobile
    ? <MobileStudyCirclePage data={data} onToggleTheme={onToggleTheme} />
    : <StudyCirclePage data={data} onToggleTheme={onToggleTheme} />
}

function ShowNotesRoute({ onToggleTheme }) {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const isMobile = searchParams.get('view') === 'mobile'

  const resolvedId = id || latestEpisodeId
  const data = showNotesMap[resolvedId]
  if (!data) {
    return <Navigate to={`/show-notes/${latestEpisodeId}`} replace />
  }

  return isMobile
    ? <MobileShowNotesPage data={data} onToggleTheme={onToggleTheme} />
    : <ShowNotesPage data={data} onToggleTheme={onToggleTheme} />
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
        <Route path="/" element={<Navigate to={`/${latestSeasonId}`} replace />} />
        <Route path="/:seasonId" element={<SeasonPage onToggleTheme={cycleTheme} />} />
        <Route path="/register" element={<RegistrationPage onToggleTheme={cycleTheme} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/show-notes" element={<ShowNotesRoute onToggleTheme={cycleTheme} />} />
        <Route path="/show-notes/:id" element={<ShowNotesRoute onToggleTheme={cycleTheme} />} />
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
