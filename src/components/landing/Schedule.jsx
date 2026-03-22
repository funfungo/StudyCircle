import { Link } from 'react-router-dom'
import { showNotesMap } from '../../data'
import './Schedule.css'

function getEpId(weekNum) {
  return `ep${weekNum.replace('Week ', '')}`
}

export function Schedule({ data }) {
  return (
    <div className="schedule-section">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="week-grid">
        {data.weeks.map((w) => {
          const epId = getEpId(w.num)
          const hasNotes = !!showNotesMap[epId]

          const content = (
            <>
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
              {hasNotes && <span className="week-notes-hint">Show Notes →</span>}
            </>
          )

          return hasNotes ? (
            <Link className="week-item week-item--linked" to={`/show-notes/${epId}`} key={w.num}>
              {content}
            </Link>
          ) : (
            <div className="week-item" key={w.num}>
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
