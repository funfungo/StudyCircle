import { useEffect } from 'react'
import { StudyCirclePage } from './components/StudyCirclePage'
import { useTheme } from './hooks/useTheme'

function dismissLoading() {
  const el = document.getElementById('loading-screen')
  if (!el) return
  document.body.classList.add('app-ready')
  el.classList.add('loaded')
  el.addEventListener('transitionend', () => el.remove(), { once: true })
}

export function App() {
  const { cycleTheme } = useTheme()

  useEffect(() => {
    document.fonts.ready.then(dismissLoading)
  }, [])

  return <StudyCirclePage onToggleTheme={cycleTheme} />
}
