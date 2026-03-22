import './NotesHeader.css'

const statusConfig = {
  preview:  { label: '预习', className: 'status-preview' },
  complete: { label: '已完成', className: 'status-complete' },
}

export function NotesHeader({ data, status = 'preview' }) {
  const s = statusConfig[status] || statusConfig.preview

  return (
    <div className="notes-header">
      <div className="notes-header-top-row">
        <div className="notes-header-episode">
          {data.season} · Episode {data.number}
        </div>
        <span className={`notes-status-badge ${s.className}`}>{s.label}</span>
      </div>
      <h1 className="notes-header-title">{data.title}</h1>
      <div className="notes-header-subtitle">{data.subtitle}</div>
      <div className="notes-header-meta">
        <span>{data.date}</span>
        <span className="notes-header-sep">·</span>
        <span>{data.duration}</span>
      </div>
      {/* <div className="notes-header-contributors">
        {data.contributors.map((c) => (
          <span className="notes-contributor-pill" key={c.name}>
            {c.name}
            <span className="notes-contributor-role">{c.role}</span>
          </span>
        ))}
      </div> */}
    </div>
  )
}
