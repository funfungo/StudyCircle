import s from './Schedule.module.css'

export function Schedule({ data }) {
  return (
    <div className={`schedule-section ${s.root}`}>
      <div className={s.sectionLabel}>{data.sectionLabel}</div>
      <div className={s.grid}>
        {data.weeks.map((w) => (
          <div className={s.item} key={w.num}>
            <div className={s.dot} />
            <div className={s.num}>{w.num}</div>
            <div className={s.topic}>{w.topic}</div>
            <div className={s.chapters}>
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
