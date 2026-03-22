import { MobileSwiper } from '../shared/MobileSwiper'
import './MobileShowNotesPage.css'

const typeLabels = {
  paper: 'Paper',
  article: 'Article',
  code: 'Code',
  video: 'Video',
  tool: 'Tool',
}

const statusConfig = {
  preview: { label: '预习', className: 'mp-sn-badge--preview' },
  complete: { label: '已完成', className: 'mp-sn-badge--complete' },
}

export function MobileShowNotesPage({ data, onToggleTheme }) {
  const d = data
  const isComplete = d.status === 'complete'
  const s = statusConfig[d.status] || statusConfig.preview

  const pages = []

  /* ── Page 1: TopBar + Episode Header ── */
  pages.push(
    <div className="mobile-page page-sn-header" key="header">
      <div className="mp-sn-topbar">
        <span className="mp-sn-topbar__title">{d.topBar.title}</span>
        <span className="mp-sn-topbar__tag">{d.topBar.tag}</span>
        <button
          className="theme-toggle"
          aria-label="切换主题"
          onClick={onToggleTheme}
        />
      </div>
      <div className="mp-sn-header">
        <div className="mp-sn-top-row">
          <span className="mp-sn-episode">
            {d.episode.season} · Episode {d.episode.number}
          </span>
          <span className={`mp-sn-badge ${s.className}`}>{s.label}</span>
        </div>
        <h1 className="mp-sn-title">{d.episode.title}</h1>
        <div className="mp-sn-subtitle">{d.episode.subtitle}</div>
        <div className="mp-sn-meta">
          <span>{d.episode.date}</span>
          <span className="mp-sn-meta__sep">·</span>
          <span>{d.episode.duration}</span>
        </div>
        {d.status !== 'preview' && (
          <div className="mp-sn-contributors">
            {d.episode.contributors.map((c) => (
              <span className="mp-sn-contributor" key={c.name}>
                {c.name}
                <span className="mp-sn-contributor__role">{c.role}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>,
  )

  /* ── Page 2: Summary ── */
  pages.push(
    <div className="mobile-page page-sn-summary" key="summary">
      <div className="mp-sn-section-head">{d.summary.sectionLabel}</div>
      <div className="mp-sn-summary__body">
        {d.summary.text.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>,
  )

  /* ── Page 3 (complete only): Discussion Topics ── */
  if (isComplete) {
    pages.push(
      <div className="mobile-page page-sn-topics" key="topics">
        <div className="mp-sn-section-head">{d.topics.sectionLabel}</div>
        <div className="mp-sn-topics__list">
          {d.topics.items.map((item, i) => (
            <div className="mp-sn-topic" key={i}>
              <div className="mp-sn-topic__time">{item.timestamp}</div>
              <div className="mp-sn-topic__body">
                <div className="mp-sn-topic__title">{item.title}</div>
                <div className="mp-sn-topic__desc">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>,
    )
  }

  /* ── Resources ── */
  pages.push(
    <div className="mobile-page page-sn-resources" key="resources">
      <div className="mp-sn-section-head">{d.resources.sectionLabel}</div>
      <div className="mp-sn-resources__body">
        {d.resources.categories.map((cat) => (
          <div className="mp-sn-resource-cat" key={cat.label}>
            <div className="mp-sn-resource-cat__label">{cat.label}</div>
            <ul className="mp-sn-resource-list">
              {cat.items.map((item) => (
                <li className="mp-sn-resource-item" key={item.title}>
                  <div className="mp-sn-resource-item-body">
                    <div className="mp-sn-resource-item-row">
                      <a
                        className="mp-sn-resource-link"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                      <span className="mp-sn-resource-type">
                        {typeLabels[item.type] || item.type}
                      </span>
                    </div>
                    {item.description && (
                      <div className="mp-sn-resource-desc">{item.description}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>,
  )

  /* ── Page 5 (complete only): Highlights ── */
  if (isComplete) {
    pages.push(
      <div className="mobile-page page-sn-highlights" key="highlights">
        <div className="mp-sn-section-head mp-sn-section-head--chrome">
          {d.highlights.sectionLabel}
        </div>
        <div className="mp-sn-highlights__list">
          {d.highlights.items.map((item, i) => (
            <div className="mp-sn-highlight" key={i}>
              <blockquote className="mp-sn-highlight__quote">
                {item.quote}
              </blockquote>
              <div className="mp-sn-highlight__author">— {item.author}</div>
              <div className="mp-sn-highlight__context">{item.context}</div>
            </div>
          ))}
        </div>
      </div>,
    )
  }

  /* ── Last Page: Next Episode (complete) or Footer-only (preview) ── */
  if (isComplete) {
    pages.push(
      <div className="mobile-page page-sn-next" key="next">
        <div className="mp-sn-next">
          <div className="mp-sn-section-head">{d.nextEpisode.sectionLabel}</div>
          <div className="mp-sn-next__title">{d.nextEpisode.title}</div>
          <div className="mp-sn-next__desc">{d.nextEpisode.description}</div>
          <div className="mp-sn-next__meta">
            <span className="mp-sn-next__task">{d.nextEpisode.readingTask}</span>
            <span className="mp-sn-next__date">{d.nextEpisode.date}</span>
          </div>
        </div>
        <div className="mp-sn-footer">
          <span className="mp-sn-footer__logo">{d.footer.logo}</span>
          <span>{d.footer.text}</span>
        </div>
      </div>,
    )
  } else {
    /* preview: last page gets a footer bar */
    const lastIdx = pages.length - 1
    const lastPage = pages[lastIdx]
    pages[lastIdx] = (
      <div className="mobile-page page-sn-resources" key="resources-footer">
        {lastPage.props.children}
        <div className="mp-sn-footer">
          <span className="mp-sn-footer__logo">{d.footer.logo}</span>
          <span>{d.footer.text}</span>
        </div>
      </div>
    )
  }

  return <MobileSwiper>{pages}</MobileSwiper>
}
