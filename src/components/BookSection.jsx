import './BookSection.css'

export function BookSection({ data }) {
  const titleLines = data.title.split('\n')

  return (
    <div className="book-section">
      <div className="book-spine">{data.spine}</div>
      <div className="book-main">
        <div className="book-header">
          <div className="section-label">{data.sectionLabel}</div>
          <div className="book-title">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="book-author">{data.author}</div>
        </div>
        <div className="book-body">
          <div className="book-cover-wrap">
            <div className="book-cover">
              <img src={data.image} alt={data.title} />
            </div>
            <div className="book-cover-label">Season 01</div>
          </div>
          <div className="book-desc">
            {data.desc.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
