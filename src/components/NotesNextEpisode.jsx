import './NotesNextEpisode.css'

export function NotesNextEpisode({ data }) {
  return (
    <div className="notes-next-episode">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="next-episode-title">{data.title}</div>
      <div className="next-episode-desc">{data.description}</div>
      <div className="next-episode-meta">
        <span className="next-episode-task">{data.readingTask}</span>
        <span className="next-episode-date">{data.date}</span>
      </div>
    </div>
  )
}
