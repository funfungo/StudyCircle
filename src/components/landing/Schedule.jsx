import './Schedule.css'

export function Schedule({ data }) {
  return (
    <div className="schedule-section">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="week-grid">
        {data.weeks.map((w) => (
          <div className="week-item" key={w.num}>
            <div className="week-dot" />
            <div className="week-num">{w.num}</div>
            <div className="week-topic">{w.topic}</div>
            <div className="week-chapters">
              {w.chapters.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < w.chapters.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
