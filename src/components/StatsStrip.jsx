import s from './StatsStrip.module.css'

export function StatsStrip({ data }) {
  return (
    <div className={`stats-strip ${s.root}`}>
      {data.map((item) => (
        <div className={s.stat} key={item.label}>
          <div className={s.num}>
            {item.num}
            {item.unit && <span>{item.unit}</span>}
          </div>
          <div className={s.label}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
