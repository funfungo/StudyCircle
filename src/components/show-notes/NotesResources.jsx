import './NotesResources.css'

const typeLabels = {
  paper: 'Paper',
  article: 'Article',
  code: 'Code',
  video: 'Video',
  tool: 'Tool',
}

function getGridColumns(count) {
  if (count <= 3) return count
  if (count === 4) return 2
  return 3
}

export function NotesResources({ data }) {
  const columns = getGridColumns(data.categories.length)

  return (
    <div className="notes-resources">
      <div className="section-label">{data.sectionLabel}</div>
      <div
        className="resources-grid"
        style={{ '--grid-columns': columns }}
      >
        {data.categories.map((cat) => (
          <div className="resource-category" key={cat.label}>
            <div className="resource-category-label">{cat.label}</div>
            <ul className="resource-list">
              {cat.items.map((item) => (
                <li className="resource-item" key={item.title}>
                  <div className="resource-item-body">
                    <div className="resource-item-row">
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
                    </div>
                    {item.description && (
                      <div className="resource-desc">{item.description}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
