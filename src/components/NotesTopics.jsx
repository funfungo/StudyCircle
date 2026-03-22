import './NotesTopics.css'

export function NotesTopics({ data }) {
  return (
    <div className="notes-topics">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="topics-list">
        {data.items.map((item, i) => (
          <div className="topic-item" key={i}>
            <div className="topic-timestamp">{item.timestamp}</div>
            <div className="topic-content">
              <div className="topic-title">{item.title}</div>
              <div className="topic-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
