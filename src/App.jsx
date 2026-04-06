import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useSearchParams, useParams, useLocation } from 'react-router-dom'
import { StudyCirclePage } from './components/landing/StudyCirclePage'
import { MobileStudyCirclePage } from './components/landing/MobileStudyCirclePage'
import { RegistrationPage } from './components/registration/RegistrationPage'
import { AdminPage } from './components/admin/AdminPage'
import { ShowNotesPage } from './components/show-notes/ShowNotesPage'
import { TicketPage } from './components/ticket/TicketPage'
import { MobileShowNotesPage } from './components/show-notes/MobileShowNotesPage'
import { useTheme } from './hooks/useTheme'
import { siteDataMap, latestSeasonId, showNotesMap, latestEpisodeId } from './data'

const DevTools = import.meta.env.DEV
  ? lazy(() => import('./dev/DevTools').then(m => ({ default: m.DevTools })))
  : null

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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  const { theme, themeKeys, themeNames, cycleTheme, switchTheme } = useTheme()

  useEffect(() => {
    document.fonts.ready.then(dismissLoading)
  }, [])

  const showDevTools = import.meta.env.DEV && !isInsideDevToolsIframe

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to={`/${latestSeasonId}`} replace />} />
        <Route path="/:seasonId" element={<SeasonPage onToggleTheme={cycleTheme} />} />
        <Route path="/register" element={<RegistrationPage onToggleTheme={cycleTheme} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/show-notes" element={<ShowNotesRoute onToggleTheme={cycleTheme} />} />
        <Route path="/show-notes/:id" element={<ShowNotesRoute onToggleTheme={cycleTheme} />} />
      </Routes>
      {showDevTools && DevTools && (
        <Suspense fallback={null}>
          <DevTools
            theme={theme}
            themeKeys={themeKeys}
            themeNames={themeNames}
            onSwitchTheme={switchTheme}
          />
        </Suspense>
      )}
    </>
  )
}
