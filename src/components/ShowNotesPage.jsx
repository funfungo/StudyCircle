import { useParams, Navigate } from 'react-router-dom'
import { TopBar } from './TopBar'
import { Footer } from './Footer'
import { NotesHeader } from './NotesHeader'
import { NotesSummary } from './NotesSummary'
import { NotesTopics } from './NotesTopics'
import { NotesResources } from './NotesResources'
import { NotesHighlights } from './NotesHighlights'
import { NotesNextEpisode } from './NotesNextEpisode'
import { showNotesMap, latestEpisodeId } from '../data'
import './ShowNotesPage.css'

export function ShowNotesPage({ data, onToggleTheme }) {
  const { id } = useParams()

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

  return (
    <div className="show-notes-page">
      <TopBar data={d.topBar} onToggleTheme={onToggleTheme} />
      <NotesHeader data={d.episode} status={d.status} />
      <NotesSummary data={d.summary} />
      <NotesResources data={d.resources} />
      {isComplete && (
        <>
          <NotesTopics data={d.topics} />
          <NotesHighlights data={d.highlights} />
          <NotesNextEpisode data={d.nextEpisode} />
        </>
      )}
      <Footer data={d.footer} />
    </div>
  )
}
