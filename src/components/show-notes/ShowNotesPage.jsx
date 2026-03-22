import { useParams, Navigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { TopBar } from '../shared/TopBar'
import { Footer } from '../shared/Footer'
import { NotesHeader } from './NotesHeader'
import { NotesSummary } from './NotesSummary'
import { NotesTopics } from './NotesTopics'
import { NotesResources } from './NotesResources'
import { NotesHighlights } from './NotesHighlights'
import { NotesNextEpisode } from './NotesNextEpisode'
import { showNotesMap, latestEpisodeId } from '../../data'
import './ShowNotesPage.css'

export function ShowNotesPage({ data, onToggleTheme }) {
  const { id } = useParams()
  const pageRef = useRef(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const sections = el.querySelectorAll('.sn-section')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sn-section--visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* When rendered via ShowNotesRoute, data is passed as prop */
  const d = data || showNotesMap[id]

  /* /show-notes → 重定向到最新一期 */
  if (!id && !data) {
    return <Navigate to={`/show-notes/${latestEpisodeId}`} replace />
  }

  /* id 无效 → 回到最新一期 */
  if (!d) {
    return <Navigate to={`/show-notes/${latestEpisodeId}`} replace />
  }

  const isComplete = d.status === 'complete'

  let sectionIdx = 0

  return (
    <div className="show-notes-page" ref={pageRef}>
      <TopBar data={d.topBar} onToggleTheme={onToggleTheme} />
      <div className="sn-section" style={{ '--sn-i': sectionIdx++ }}>
        <NotesHeader data={d.episode} status={d.status} />
      </div>
      <div className="sn-section" style={{ '--sn-i': sectionIdx++ }}>
        <NotesSummary data={d.summary} />
      </div>
      <div className="sn-section" style={{ '--sn-i': sectionIdx++ }}>
        <NotesResources data={d.resources} />
      </div>
      {isComplete && (
        <>
          <div className="sn-section" style={{ '--sn-i': sectionIdx++ }}>
            <NotesTopics data={d.topics} />
          </div>
          <div className="sn-section" style={{ '--sn-i': sectionIdx++ }}>
            <NotesHighlights data={d.highlights} />
          </div>
          <div className="sn-section" style={{ '--sn-i': sectionIdx++ }}>
            <NotesNextEpisode data={d.nextEpisode} />
          </div>
        </>
      )}
      <div className="sn-section" style={{ '--sn-i': sectionIdx++ }}>
        <Footer data={d.footer} />
      </div>
    </div>
  )
}
