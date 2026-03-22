import './NotesResources.css'

const typeLabels = {
  paper: 'Paper',
  article: 'Article',
  code: 'Code',
  video: 'Video',
  tool: 'Tool',
}

export function NotesResources({ data }) {
  return (
    <div className="notes-resources">
      <div className="section-label">{data.sectionLabel}</div>
      <div className="resources-grid">
        {data.categories.map((cat) => (
          <div className="resource-category" key={cat.label}>
            <div className="resource-category-label">{cat.label}</div>
            <ul className="resource-list">
              {cat.items.map((item) => (
                <li className="resource-item" key={item.title}>
                  <a
                    className="resource-link"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                  <span className="resource-type-pill">
                    {typeLabels[item.type] || item.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
