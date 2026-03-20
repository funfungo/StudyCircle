const stats = [
  { num: '4', unit: '周', label: '共学周期' },
  { num: '4', unit: '次', label: '线上讨论会' },
  { num: '∞', unit: null, label: '可能的收获' },
]

export function StatsStrip() {
  return (
    <div className="stats-strip">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-num">
            {s.num}
            {s.unit && <span>{s.unit}</span>}
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
