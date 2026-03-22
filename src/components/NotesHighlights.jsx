import './NotesHighlights.css'

export function NotesHighlights({ data }) {
  return (
    <div className="notes-highlights">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="highlights-grid">
        {data.items.map((item, i) => (
          <div className="highlight-card" key={i}>
            <blockquote className="highlight-quote">{item.quote}</blockquote>
            <div className="highlight-author">— {item.author}</div>
            <div className="highlight-context">{item.context}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
