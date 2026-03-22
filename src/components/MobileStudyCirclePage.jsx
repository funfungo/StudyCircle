import { Link } from 'react-router-dom'
import { MobileSwiper } from './MobileSwiper'
import { defaultSiteData } from '../data'
import './MobileStudyCirclePage.css'

export function MobileStudyCirclePage({ data, onToggleTheme }) {
  const d = data || defaultSiteData
  const scheduleHalf = Math.ceil(d.schedule.weeks.length / 2)

  return (
    <MobileSwiper>
      {/* Page 1: TopBar + Hero + Stats */}
      <div className="mobile-page page-hero">
        <div className="mp-topbar">
          <span className="mp-topbar__title">{d.topBar.title}</span>
          <span className="mp-topbar__tag">{d.topBar.tag}</span>
          <button
            className="theme-toggle"
            aria-label="切换主题"
            onClick={onToggleTheme}
          />
        </div>

        <div className="mp-hero">
          {d.hero.badge && (
            <div className="mp-hero__badge">
              <em>{d.hero.badge[0]}</em>{d.hero.badge[1]}
            </div>
          )}
          <div className="mp-hero__eyebrow">
            <span className="mp-hero__time">{d.hero.openingTime}</span>
          </div>
          <p className="mp-hero__subtitle">
            {d.hero.subtitle.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="mp-hero__logo">
            <div role="img" aria-label={d.hero.logoAlt} className="theme-logo" />
          </div>
        </div>

        <div className="mp-stats">
          {d.stats.map((item) => (
            <div className="mp-stat" key={item.label}>
              <span className="mp-stat__num">
                {item.num}
                {item.unit && <em>{item.unit}</em>}
              </span>
              <span className="mp-stat__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Page 2: Book */}
      <div className="mobile-page page-book">
        <div className="mp-book__header">
          <div className="mp-section-label">{d.book.sectionLabel}</div>
          {d.book.heading && (
            <h2 className="mp-book__heading">
              {d.book.heading[0]} <em>{d.book.heading[1]}</em>
            </h2>
          )}
          <div className="mp-book__title">
            {d.book.title.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="mp-book__author">{d.book.author}</div>
        </div>
        <div className="mp-book__body">
          <div className="mp-book__cover-area">
            <div className="mp-book__cover">
              <img src={d.book.image} alt={d.book.title} />
            </div>
            <div className="mp-book__cover-label">Season 01</div>
          </div>
          <div className="mp-book__desc">
            {d.book.desc.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="mp-book__spine">{d.book.spine}</div>
      </div>

      {/* Page 3: Schedule Week 1–4 */}
      <div className="mobile-page page-schedule">
        <div className="mp-schedule__head">
          <div className="mp-section-label">{d.schedule.sectionLabel}</div>
          <div className="mp-schedule__range">01 — 04</div>
        </div>
        <div className="mp-schedule__grid">
          {d.schedule.weeks.slice(0, scheduleHalf).map((w) => (
            <div className="mp-week" key={w.num}>
              <div className="mp-week__num">{w.num}</div>
              <div className="mp-week__topic">{w.topic}</div>
              <div className="mp-week__chapters">
                {w.chapters.map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page 4: Schedule Week 5–8 */}
      <div className="mobile-page page-schedule">
        <div className="mp-schedule__head">
          <div className="mp-section-label">{d.schedule.sectionLabel}</div>
          <div className="mp-schedule__range">05 — 08</div>
        </div>
        <div className="mp-schedule__grid">
          {d.schedule.weeks.slice(scheduleHalf).map((w) => (
            <div className="mp-week" key={w.num}>
              <div className="mp-week__num">{w.num}</div>
              <div className="mp-week__topic">{w.topic}</div>
              <div className="mp-week__chapters">
                {w.chapters.map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page 5: Format + Perks */}
      <div className="mobile-page page-perks">
        <div className="mp-formats">
          {d.formats.map((f) => (
            <div className="mp-format" key={f.title}>
              <span className="mp-format__icon">{f.icon}</span>
              <div>
                <div className="mp-format__title">{f.title}</div>
                <div className="mp-format__desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mp-perks">
          <div className="mp-section-label">{d.perks.sectionLabel}</div>
          <div className="mp-perks__grid">
            {d.perks.items.map((p) => (
              <div className="mp-perk" key={p.title}>
                <div className="mp-perk__title">{p.title}</div>
                <div className="mp-perk__desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 6: CTA + Footer */}
      <div className="mobile-page page-cta">
        <div className="mp-cta">
          <div className="mp-cta__text">
            {d.cta.text.map((part, i) => {
              const highlighted =
                d.cta.highlight && part.includes(d.cta.highlight)
                  ? part
                      .split(d.cta.highlight)
                      .reduce((acc, seg, j, arr) => {
                        acc.push(seg)
                        if (j < arr.length - 1)
                          acc.push(<em key={j}>{d.cta.highlight}</em>)
                        return acc
                      }, [])
                  : part
              return (
                <span key={i}>
                  {highlighted}
                  {i < d.cta.text.length - 1 && <br />}
                </span>
              )
            })}
          </div>
          <div className="mp-cta__meta">{d.cta.meta}</div>
          {d.cta.buttonLink ? (
            <Link className="mp-cta__btn" to={d.cta.buttonLink}>
              {d.cta.buttonText}
            </Link>
          ) : (
            <button className="mp-cta__btn" onClick={d.cta.onButtonClick}>
              {d.cta.buttonText}
            </button>
          )}
        </div>
        <div className="mp-footer">
          <span className="mp-footer__logo">{d.footer.logo}</span>
          <span>{d.footer.text}</span>
        </div>
      </div>
    </MobileSwiper>
  )
}
