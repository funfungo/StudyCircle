import s from './FormatSection.module.css'

export function FormatSection({ data }) {
  return (
    <div className={`format-section ${s.root}`}>
      {data.map((f) => (
        <div className={s.block} key={f.title}>
          <span className={s.icon}>{f.icon}</span>
          <div className={s.title}>{f.title}</div>
          <div className={s.desc}>{f.desc}</div>
        </div>
      ))}
    </div>
  )
}
