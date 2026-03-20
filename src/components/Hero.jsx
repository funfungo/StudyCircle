import s from './Hero.module.css'

export function Hero({ data }) {
  const lines = data.subtitle.split('\n')

  return (
    <div className={`hero ${s.root}`}>
      <div className={s.eyebrow}>{data.eyebrow}</div>
      <h1 className={s.heading}>
        {data.heading[0]}
        <br />
        <em>{data.heading[1]}</em>
      </h1>
      <p className={s.subtitle}>
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className={s.image}>
        <div role="img" aria-label={data.logoAlt} className={s.logo} />
      </div>
    </div>
  )
}
