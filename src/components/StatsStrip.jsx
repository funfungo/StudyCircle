import './StatsStrip.css'

export function StatsStrip({ data }) {
  return (
    <div className="stats-strip">
      {data.map((item) => (
        <div className="stat" key={item.label}>
          <div className="stat-num">
            {item.num}
            {item.unit && <span>{item.unit}</span>}
          </div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
