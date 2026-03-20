const weeks = [
  {
    num: 'Week 01',
    topic: '理解数据与注意力',
    chapters: ['Ch.1 – Ch.3', 'Tokenization · Attention'],
  },
  {
    num: 'Week 02',
    topic: '搭建 GPT 架构',
    chapters: ['Ch.4 – Ch.5', 'Model · Pretraining'],
  },
  {
    num: 'Week 03',
    topic: '加载与微调',
    chapters: ['Ch.6', 'Fine-tuning · Classification'],
  },
  {
    num: 'Week 04',
    topic: '指令微调与对齐',
    chapters: ['Ch.7', 'RLHF · Instruction'],
  },
]

export function Schedule() {
  return (
    <div className="schedule-section">
      <div className="section-label">· 四周计划 ·</div>
      <div className="week-grid">
        {weeks.map((w) => (
          <div className="week-item" key={w.num}>
            <div className="week-dot" />
            <div className="week-num">{w.num}</div>
            <div className="week-topic">{w.topic}</div>
            <div className="week-chapters">
              {w.chapters.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < w.chapters.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
