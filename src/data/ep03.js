export const ep03 = {
  status: 'preview',
  episode: {
    number: '03',
    season: 'S01',
    title: '注意力机制',
    subtitle: 'Ch.3 · Self-Attention · Causal Attention · Multi-Head',
    date: '2026-05-08',
    duration: '20:00 - 21:00',
    contributors: [
      { name: '小明', role: '主讲' },
      { name: '小红', role: '主持' },
    ],
  },
  summary: {
    sectionLabel: '· 本期摘要 ·',
    text: [
      '本期进入全书最核心的章节之一——Attention 机制的完整编码实现。我们从最简单的无参数注意力出发，逐步引入可训练的 Query / Key / Value 权重矩阵，理解 Scaled Dot-Product Attention 的每一步数学运算和代码实现。',
      '随后实现因果注意力（Causal Attention）：通过上三角掩码确保模型只能"看到过去"，这是 GPT 等自回归模型的关键约束。最后将单头注意力扩展为 Multi-Head Attention，理解多头并行带来的表达能力提升，并完成一个可复用的 MultiHeadAttention 类。',
    ],
  },
  topics: {
    sectionLabel: '· 讨论要点 ·',
    items: [
      { timestamp: '00:00', title: '开场 & 阅读回顾', description: '确认本期阅读范围（Ch.3 全章），回顾上期 Embedding 内容的衔接。' },
      { timestamp: '10:00', title: '简单自注意力', description: '无可训练参数的注意力：点积计算相似度，softmax 归一化为权重。' },
      { timestamp: '22:00', title: 'Q / K / V 权重矩阵', description: '引入可训练参数，理解投影的几何直觉：Query 是"提问"，Key 是"索引"，Value 是"内容"。' },
      { timestamp: '35:00', title: 'Scaled Dot-Product', description: '为什么要除以 √d_k？数值稳定性与梯度流的关系。' },
      { timestamp: '45:00', title: '因果注意力掩码', description: '上三角 mask + 负无穷填充，确保自回归生成时不"偷看未来"。' },
      { timestamp: '58:00', title: 'Dropout 在注意力中的应用', description: '注意力权重 Dropout 的作用与训练 / 推理行为差异。' },
      { timestamp: '1:08:00', title: 'Multi-Head Attention', description: '多头拆分与拼接策略，为什么多个"小注意力"比一个"大注意力"更好。' },
      { timestamp: '1:20:00', title: '答疑 & 下期预告', description: '开放讨论，预告 Chapter 4 内容和阅读任务。' },
    ],
  },
  resources: {
    sectionLabel: '· 延伸资源 ·',
    categories: [
      {
        label: '必读',
        items: [
          { title: 'Attention Is All You Need — Vaswani et al.', url: 'https://arxiv.org/abs/1706.03762', type: 'article' },
          { title: 'Attention in Transformers, Visually Explained — 3Blue1Brown', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', type: 'video' },
        ],
      },
      {
        label: '推荐阅读',
        items: [
          { title: 'The Illustrated Self-Attention — Raimi Karim', url: 'https://towardsdatascience.com/illustrated-self-attention-2d627e33b20a', type: 'article' },
          { title: 'Visualizing Attention — Jay Alammar', url: 'https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/', type: 'article' },
        ],
      },
      {
        label: '工具 & 代码',
        items: [
          { title: 'rasbt/LLMs-from-scratch — Ch.3 Notebook', url: 'https://github.com/rasbt/LLMs-from-scratch/blob/main/ch03/01_main-chapter-code/ch03.ipynb', type: 'code' },
          { title: 'BertViz — 注意力权重可视化工具', url: 'https://github.com/jessevig/bertviz', type: 'tool' },
        ],
      },
    ],
  },
  highlights: {
    sectionLabel: '· 本期亮点 ·',
    items: [
      { quote: 'Self-Attention 的本质就是一次"全员投票"——每个 token 对所有 token 打分，然后按得分加权求和。', author: '小明', context: '讲解简单自注意力时' },
      { quote: '因果掩码就像考试时的挡板——你只能看自己和前面同学的答案，不能偷看后面的。', author: '小红', context: '讨论 Causal Attention 时' },
      { quote: '多头注意力就是让模型同时从多个角度看问题——一个头关注语法，一个头关注语义，各有分工。', author: '小明', context: '解释 Multi-Head Attention 时' },
    ],
  },
  nextEpisode: {
    sectionLabel: '· 下期预告 ·',
    title: 'Episode 04 · 从零实现 GPT',
    description: '下周进入 Chapter 4，将前几章的组件——Embedding、Attention、前馈网络——拼装成完整的 GPT 模型。涵盖 LayerNorm、GELU 激活、残差连接和 Transformer Block 的逐层实现。',
    date: '2026-05-22',
    readingTask: 'Ch.4 全章',
  },
  topBar: { title: '女性AI共学小组 · Show Notes', tag: 'EP.03', meta: '2026 · Online' },
  footer: { logo: '女性AI共学小组 · S01', text: 'Build a Large Language Model · From Scratch' },
}
