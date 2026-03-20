const formats = [
  {
    icon: '📖',
    title: '自主阅读',
    desc: '每周独立完成对应章节的阅读，带着自己的问题和思考来参加周会。节奏不强制，但建议保持每天 30-60 分钟的阅读习惯。',
  },
  {
    icon: '🎙️',
    title: '每周线上讨论',
    desc: '每周固定时间，1-1.5 小时线上同步，轮流分享本周最大的收获或困惑，一起把卡住的地方打通，顺便聊聊相关的前沿进展。',
  },
]

export function FormatSection() {
  return (
    <div className="format-section">
      {formats.map((f) => (
        <div className="format-block" key={f.title}>
          <span className="format-icon">{f.icon}</span>
          <div className="format-title">{f.title}</div>
          <div className="format-desc">{f.desc}</div>
        </div>
      ))}
    </div>
  )
}
