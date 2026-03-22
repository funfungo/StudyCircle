import './TopBar.css'

export function TopBar({ data, onToggleTheme }) {
  return (
    <div className="top-bar">
      <span>{data.title}</span>
      <span className="tag">{data.tag}</span>
      <span>{data.meta}</span>
      <button
        className="theme-toggle"
        aria-label="切换主题"
        onClick={onToggleTheme}
      />
    </div>
  )
}
