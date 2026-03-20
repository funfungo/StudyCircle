const perks = [
  {
    title: '逼自己真的读完',
    desc: '有约定就有动力，周会前必须读完，不然没法开口说话。',
  },
  {
    title: '卡点秒变讨论点',
    desc: '一个人看不懂的地方，换五个人一起看，总有人能讲清楚。',
  },
  {
    title: '建立真正的认知',
    desc: '能给别人讲明白，才算真的懂了。教是最好的学习方式。',
  },
  {
    title: '认识有趣的人',
    desc: '一起做同一件事的人，往往更值得深交，话题也更有趣。',
  },
  {
    title: '把握技术脉搏',
    desc: 'LLM 是当下最重要的技术浪潮，现在是最好的入门时机。',
  },
  {
    title: '低成本高回报',
    desc: '只需一本书和每周 1-2 小时，换来真正扎实的底层理解。',
  },
]

export function Perks() {
  return (
    <div className="perks-section">
      <div className="section-label">· 为什么要一起读 ·</div>
      <div className="perks-grid">
        {perks.map((p) => (
          <div className="perk" key={p.title}>
            <div className="perk-title">{p.title}</div>
            <div className="perk-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
