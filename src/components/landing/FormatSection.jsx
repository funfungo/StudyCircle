import './FormatSection.css'

export function FormatSection({ data }) {
  return (
    <div className="format-section">
      {data.map((f) => (
        <div className="format-block" key={f.title}>
          <span className="format-icon">{f.icon}</span>
          <div className="format-title">{f.title}</div>
          <div className="format-desc">{f.desc}</div>
        </div>
      ))}
    </div>
  )
}
