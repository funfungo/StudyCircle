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

export function App() {
  const { cycleTheme } = useTheme()

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
