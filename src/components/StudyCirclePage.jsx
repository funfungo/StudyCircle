import { TopBar } from './TopBar'
import { Hero } from './Hero'
import { StatsStrip } from './StatsStrip'
import { BookSection } from './BookSection'
import { Schedule } from './Schedule'
import { FormatSection } from './FormatSection'
import { Perks } from './Perks'
import { CTA } from './CTA'
import { Footer } from './Footer'
import { defaultSiteData } from '../siteData'

export function StudyCirclePage({ data = {}, onToggleTheme }) {
  const d = { ...defaultSiteData, ...data }

  return (
    <>
      <TopBar data={d.topBar} onToggleTheme={onToggleTheme} />
      <Hero data={d.hero} />
      <StatsStrip data={d.stats} />
      <BookSection data={d.book} />
      <Schedule data={d.schedule} />
      <FormatSection data={d.formats} />
      <Perks data={d.perks} />
      <CTA data={d.cta} />
      <Footer data={d.footer} />
    </>
  )
}
