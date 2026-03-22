import { Link } from 'react-router-dom'
import './CTA.css'

export function CTA({ data }) {
  const textParts = data.text
  const highlight = data.highlight

  return (
    <div className="cta-section">
      <div>
        <div className="cta-text">
          {textParts.map((part, i) => {
            const highlighted = highlight && part.includes(highlight)
              ? part.split(highlight).reduce((acc, seg, j, arr) => {
                  acc.push(seg)
                  if (j < arr.length - 1) acc.push(<em key={j}>{highlight}</em>)
                  return acc
                }, [])
              : part
            return (
              <span key={i}>
                {highlighted}
                {i < textParts.length - 1 && <br />}
              </span>
            )
          })}
        </div>
        <div className="cta-meta">{data.meta}</div>
      </div>
      <div>
        {data.buttonLink ? (
          <Link className="cta-btn" to={data.buttonLink}>
            {data.buttonText}
          </Link>
        ) : (
          <button className="cta-btn" onClick={data.onButtonClick}>
            {data.buttonText}
          </button>
        )}
      </div>
    </div>
  )
}
