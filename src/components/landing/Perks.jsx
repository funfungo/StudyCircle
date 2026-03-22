import './Perks.css'

export function Perks({ data }) {
  return (
    <div className="perks-section">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="perks-grid">
        {data.items.map((p) => (
          <div className="perk" key={p.title}>
            <div className="perk-title">{p.title}</div>
            <div className="perk-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
