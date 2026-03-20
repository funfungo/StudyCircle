export function TopBar({ onToggleTheme }) {
  return (
    <div className="top-bar">
      <span>共学小组 · Season 01</span>
      <span className="tag">NOW OPEN</span>
      <span>2026 · Online</span>
      <button
        className="theme-toggle"
        aria-label="切换主题"
        onClick={onToggleTheme}
      />
    </div>
  )
}
