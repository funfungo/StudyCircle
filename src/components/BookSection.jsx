import s from './BookSection.module.css'

export function BookSection({ data }) {
  const titleLines = data.title.split('\n')

  return (
    <div className={`book-section ${s.root}`}>
      <div className={s.spine}>{data.spine}</div>
      <div className={s.main}>
        <div className={s.header}>
          <div className={s.sectionLabel}>{data.sectionLabel}</div>
          <div className={s.title}>
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className={s.author}>{data.author}</div>
        </div>
        <div className={s.body}>
          <div className={s.coverWrap}>
            <div className={s.cover}>
              <img src={data.image} alt={data.title} />
            </div>
            <div className={s.coverLabel}>Season 01</div>
          </div>
          <div className={s.desc}>
            {data.desc.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
