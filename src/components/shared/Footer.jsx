import './Footer.css'

export function Footer({ data }) {
  return (
    <div className="footer">
      <span className="footer-logo">{data.logo}</span>
      <span>{data.text}</span>
    </div>
  )
}
