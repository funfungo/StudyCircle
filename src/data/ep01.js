export const ep01 = {
  /* 'preview' = 预习（仅摘要 + 资源） | 'complete' = 完成（全部内容） */
  status: 'preview',
  episode: {
    number: '01',
    season: 'S01',
    title: '理解大语言模型',
    subtitle: 'Ch.1 · LLM 概览 · Transformer 架构',
    date: '2026-04-10',
    duration: '20:00 - 21:00',
    contributors: [
      { name: '小明', role: '主讲' },
      { name: '小红', role: '主持' },
    ],
  },
  summary: {
    sectionLabel: '· 本期摘要 ·',
    text: [
      '本期围绕《Build a Large Language Model (From Scratch)》第一章展开讨论。章节从"什么是 LLM"出发，阐明了大语言模型的核心思路——在海量无标注文本上通过"预测下一个词"进行预训练，获得通用语言理解能力，再通过微调适配具体任务。我们重点梳理了 GPT 家族的演进：GPT-1 开创预训练 + 微调范式，GPT-2 验证了更大模型的零样本泛化潜力，GPT-3 凭借 1750 亿参数展现出 In-Context Learning 能力，而 InstructGPT 则通过指令微调与 RLHF 让模型真正学会"听懂人话"。',
      '章节还从宏观视角介绍了 Transformer 架构——Self-Attention 机制如何让模型关注序列中任意位置的信息，以及 GPT 为何采用 Decoder-only 架构而非原始论文的 Encoder-Decoder 设计。',
    ],
  },
  topics: {
    sectionLabel: '· 讨论要点 ·',
    items: [
      { timestamp: '00:00', title: '开场 & 阅读回顾', description: '确认本期阅读范围（Ch.1 全章），成员分享初读感受和疑问点。' },
      { timestamp: '12:30', title: 'LLM 的演进', description: '从统计语言模型到神经网络语言模型，再到 Transformer 带来的范式转变。' },
      { timestamp: '25:15', title: 'GPT 系列对比', description: 'GPT-1 → GPT-2 → GPT-3 → InstructGPT，参数规模与训练策略的变化。' },
      { timestamp: '38:40', title: 'Self-Attention 详解', description: 'Query-Key-Value 的直觉理解，Scaled Dot-Product Attention 的数学推导。' },
      { timestamp: '52:00', title: 'Multi-Head & Position Encoding', description: '多头注意力的并行化优势，正弦位置编码 vs 可学习位置编码。' },
      { timestamp: '1:05:20', title: '架构变体讨论', description: 'Encoder-only / Decoder-only / Encoder-Decoder 的选择逻辑与典型应用。' },
      { timestamp: '1:20:00', title: '答疑 & 下期预告', description: '开放讨论，预告 Chapter 2 内容和阅读任务。' },
    ],
  },
  resources: {
    sectionLabel: '· 延伸资源 ·',
    categories: [
      {
        label: '入门基础',
        items: [
          { title: 'But what is a neural network? — 3Blue1Brown', url: 'https://www.youtube.com/watch?v=aircAruvnKk', type: 'video' },
          { title: 'Introduction to Large Language Models — Andrej Karpathy', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', type: 'video' },
          { title: 'Attention in transformers, visually explained — 3Blue1Brown', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', type: 'video' },
        ],
      },
      {
        label: '工具 & 代码',
        items: [
          { title: 'rasbt/LLMs-from-scratch — 书籍官方代码', url: 'https://github.com/rasbt/LLMs-from-scratch', type: 'code' },
          { title: 'Transformer Explainer — 交互式可视化', url: 'https://poloclub.github.io/transformer-explainer/', type: 'tool' },
        ],
      },
    ],
  },
  highlights: {
    sectionLabel: '· 本期亮点 ·',
    items: [
      { quote: 'Transformer 的本质是一台"注意力路由器"——它让每个 token 自己决定该关注序列中的哪些位置。', author: '小明', context: '讨论 Self-Attention 机制时' },
      { quote: '从 GPT-1 到 InstructGPT，模型变大只是一部分，真正的跃迁是训练目标从"预测下一个词"变成了"按人类意图行动"。', author: '小红', context: '对比 GPT 系列演进时' },
      { quote: '位置编码就像给每张扑克牌编号——没有它，Transformer 看到的只是一堆无序的牌。', author: '小明', context: '解释 Positional Encoding 时' },
    ],
  },
  nextEpisode: {
    sectionLabel: '· 下期预告 ·',
    title: 'Episode 02 · 文本数据处理',
    description: '下周进入 Chapter 2，从原始文本到模型输入——Tokenization、Vocabulary 构建、BPE 算法，以及从 Token 到 Embedding 的完整流程。',
    date: '2026-04-24',
    readingTask: 'Ch.2 全章 + 附录 A',
  },
  topBar: { title: '女性AI共学小组 · Show Notes', tag: 'EP.01', meta: '2026 · Online' },
  footer: { logo: '女性AI共学小组 · S01', text: 'Build a Large Language Model · From Scratch' },
}
