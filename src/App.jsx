import { useEffect, useState } from 'react'
import { StudyCirclePage } from './components/StudyCirclePage'
import { MobileStudyCirclePage } from './components/MobileStudyCirclePage'
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

export function App() {
  const { cycleTheme } = useTheme()
  const viewMode = useViewMode()

  useEffect(() => {
    document.fonts.ready.then(dismissLoading)
  }, [])

  if (viewMode === 'mobile') {
    return <MobileStudyCirclePage onToggleTheme={cycleTheme} />
  }

  return <StudyCirclePage onToggleTheme={cycleTheme} />
}
