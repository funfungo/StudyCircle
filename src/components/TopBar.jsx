import s from './TopBar.module.css'

export function TopBar({ data, onToggleTheme }) {
  return (
    <div className={s.root}>
      <span>{data.title}</span>
      <span className={s.tag}>{data.tag}</span>
      <span>{data.meta}</span>
      <button
        className={s.toggle}
        aria-label="切换主题"
        onClick={onToggleTheme}
      />
    </div>
  )
}
