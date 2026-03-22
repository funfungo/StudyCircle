import './NotesSummary.css'

export function NotesSummary({ data }) {
  return (
    <div className="notes-summary">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="notes-summary-body">
        {data.text.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}
