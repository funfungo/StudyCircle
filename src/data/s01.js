export const s01 = {
  topBar: {
    title: '女性AI共学小组 · Season 01',
    tag: 'NOW OPEN',
    meta: '2026 · Online',
  },

  hero: {
    eyebrow: '招募令',
    badge: ['女性', 'AI共学'],
    subtitle: '一本书、八周时间、一群认真的人——\n一起读懂 LLM 背后真正发生的事。',
    openingTime: '2026 年 4 月 10 日· 正式开营',
    logoAlt: '女性AI共学小组',
    watermark: 'LLM',
  },

  stats: [
    { num: '8', unit: '周', label: '共学周期' },
    { num: '8', unit: '次', label: '线上讨论会' },
    { num: '∞', unit: null, label: '可能的收获' },
  ],

  book: {
    spine: 'Build LLM From Scratch',
    heading: ['从零构建', '大语言模型'],
    sectionLabel: '· 本期书目 ·',
    title: 'Build a Large Language Model\n(From Scratch)',
    author: 'Sebastian Raschka · 2024',
    desc: [
      '这本书不绕弯子。从 tokenization 到 attention 机制，从预训练到指令微调，作者用 Python 从第一行代码开始手撸一个完整的 GPT 风格语言模型。没有黑盒，没有魔法——只有你真正需要懂的那些东西。',
      '读完之后，你会知道 Transformer 里的每个矩阵乘法在算什么，ChatGPT 的 RLHF 在做什么，以及那些漂亮的涌现能力是怎么来的。',
    ],
    image: 'season1/book.png',
  },

  schedule: {
    sectionLabel: '· 八周计划 ·',
    weeks: [
      {
        num: 'Week 01',
        topic: '理解大语言模型',
        chapters: ['Ch.1', 'LLM 概览 · Transformer 架构'],
      },
      {
        num: 'Week 02',
        topic: '文本数据处理',
        chapters: ['Ch.2', 'Tokenization · Embedding · 位置编码'],
      },
      {
        num: 'Week 03',
        topic: '注意力机制',
        chapters: ['Ch.3', 'Self-Attention · Causal · Multi-Head'],
      },
      {
        num: 'Week 04',
        topic: '实现 GPT 架构',
        chapters: ['Ch.4', 'LayerNorm · FFN · GPT 组装'],
      },
      {
        num: 'Week 05',
        topic: '预训练',
        chapters: ['Ch.5', 'Training Loop · Loss · 文本生成'],
      },
      {
        num: 'Week 06',
        topic: '文本分类微调',
        chapters: ['Ch.6', 'Fine-tuning · Classification'],
      },
      {
        num: 'Week 07',
        topic: '指令微调与对齐',
        chapters: ['Ch.7', 'Instruction Tuning · RLHF'],
      },
      {
        num: 'Week 08',
        topic: '进阶与总复习',
        chapters: ['附录 D–E · 回顾', 'LoRA · 训练技巧 · 总结'],
      },
    ],
  },

  formats: [
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
  ],

  perks: {
    sectionLabel: '· 为什么要一起读 ·',
    items: [
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
    ],
  },

  cta: {
    text: ['想一起读的，', '来报个名吧。'],
    highlight: '报个名',
    meta: '· 人数有限，越早越好 · 有 Python 基础即可 ·',
    buttonText: '加入我们 →',
    buttonLink: '/register',
  },

  footer: {
    logo: '女性AI共学小组 · S01',
    text: 'Build a Large Language Model · From Scratch',
  },
}
