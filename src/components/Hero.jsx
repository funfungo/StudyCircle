import './Hero.css'

export function Hero({ data }) {
  const lines = data.subtitle.split('\n')

  return (
    <div className="hero">
      {data.badge && (
        <div className="hero-badge">{data.badge}</div>
      )}
      <div className="eyebrow">
        {data.openingTime && (
          <span className="opening-time">{data.openingTime}</span>
        )}
      </div>
      <h1>
        {data.heading[0]}
        <br />
        <em>{data.heading[1]}</em>
      </h1>
      <p className="subtitle">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className="hero-image">
        <div role="img" aria-label={data.logoAlt} className="theme-logo" />
      </div>
    </div>
  )
}
