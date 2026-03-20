import s from './Perks.module.css'

export function Perks({ data }) {
  return (
    <div className={`perks-section ${s.root}`}>
      <div className={s.sectionLabel}>{data.sectionLabel}</div>
      <div className={s.grid}>
        {data.items.map((p) => (
          <div className={s.perk} key={p.title}>
            <div className={s.perkTitle}>{p.title}</div>
            <div className={s.perkDesc}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
