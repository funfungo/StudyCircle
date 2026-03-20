import s from './Footer.module.css'

export function Footer({ data }) {
  return (
    <div className={s.root}>
      <span className={s.logo}>{data.logo}</span>
      <span>{data.text}</span>
    </div>
  )
}
