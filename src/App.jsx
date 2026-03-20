import { useEffect } from 'react'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { StatsStrip } from './components/StatsStrip'
import { BookSection } from './components/BookSection'
import { Schedule } from './components/Schedule'
import { FormatSection } from './components/FormatSection'
import { Perks } from './components/Perks'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
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

  return (
    <>
      <TopBar onToggleTheme={cycleTheme} />
      <Hero />
      <StatsStrip />
      <BookSection />
      <Schedule />
      <FormatSection />
      <Perks />
      <CTA />
      <Footer />
    </>
  )
}
