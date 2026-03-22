export const ep05 = {
  status: 'preview',
  episode: {
    number: '05',
    season: 'S01',
    title: '预训练',
    subtitle: 'Ch.5 · 损失函数 · 训练循环 · 加载预训练权重',
    date: '2026-06-05',
    duration: '20:00 - 21:00',
    contributors: [
      { name: '小明', role: '主讲' },
      { name: '小红', role: '主持' },
    ],
  },
  summary: {
    sectionLabel: '· 本期摘要 ·',
    text: [
      '本期为从零搭建的 GPT 模型注入"灵魂"。首先理解如何评估生成式模型——Cross-Entropy Loss 的含义、困惑度（Perplexity）与损失的关系。然后实现完整的训练循环：数据加载、前向传播、损失计算、反向传播和参数更新。',
      '我们用一篇短篇小说 "The Verdict" 作为训练语料，观察模型从输出乱码到生成连贯文本的过程。随后探索解码策略——Temperature 控制随机性、Top-k 采样平衡多样性与质量。最后，加载 OpenAI 发布的 GPT-2 预训练权重到我们的模型中，验证架构的正确性。',
    ],
  },
  topics: {
    sectionLabel: '· 讨论要点 ·',
    items: [
      { timestamp: '00:00', title: '开场 & 阅读回顾', description: '确认本期阅读范围（Ch.5 全章），回顾上期的模型架构。' },
      { timestamp: '10:00', title: 'Cross-Entropy Loss', description: '从概率分布视角理解损失函数，模型"自信且正确"vs"自信但错误"。' },
      { timestamp: '22:00', title: '困惑度 Perplexity', description: 'Perplexity 的直觉解释：模型在每个位置平均"犹豫"多少个选项。' },
      { timestamp: '32:00', title: '训练循环实现', description: 'DataLoader、Optimizer、学习率选择，训练 vs 验证的分离。' },
      { timestamp: '45:00', title: '训练过程观察', description: '损失曲线、生成样本的演变，过拟合的识别与应对。' },
      { timestamp: '55:00', title: '解码策略', description: 'Greedy → Temperature Scaling → Top-k Sampling 的递进逻辑。' },
      { timestamp: '1:08:00', title: '加载 OpenAI 权重', description: '权重映射的实现细节，验证我们的模型与官方 GPT-2 输出一致。' },
      { timestamp: '1:20:00', title: '答疑 & 下期预告', description: '开放讨论，预告 Chapter 6 内容和阅读任务。' },
    ],
  },
  resources: {
    sectionLabel: '· 延伸资源 ·',
    categories: [
      {
        label: '必读',
        items: [
          { title: 'Let\'s reproduce GPT-2 (124M) — Andrej Karpathy', url: 'https://www.youtube.com/watch?v=l8pRSuU81PU', type: 'video' },
          { title: 'Chinchilla Scaling Laws — Training Compute-Optimal LLMs', url: 'https://arxiv.org/abs/2203.15556', type: 'article' },
        ],
      },
      {
        label: '推荐阅读',
        items: [
          { title: 'How to Generate Text — Hugging Face Blog', url: 'https://huggingface.co/blog/how-to-generate', type: 'article' },
          { title: 'The Curious Case of Neural Text Degeneration — Holtzman et al.', url: 'https://arxiv.org/abs/1904.09751', type: 'article' },
        ],
      },
      {
        label: '工具 & 代码',
        items: [
          { title: 'rasbt/LLMs-from-scratch — Ch.5 Notebook', url: 'https://github.com/rasbt/LLMs-from-scratch/blob/main/ch05/01_main-chapter-code/ch05.ipynb', type: 'code' },
          { title: 'Weights & Biases — 训练过程可视化', url: 'https://wandb.ai/', type: 'tool' },
        ],
      },
    ],
  },
  highlights: {
    sectionLabel: '· 本期亮点 ·',
    items: [
      { quote: 'Loss 就是模型的"尴尬程度"——预测错得越离谱，loss 越高，模型越"社死"。', author: '小红', context: '讲解 Cross-Entropy Loss 时' },
      { quote: 'Temperature 就像调节创意的旋钮——调低了模型只会说最安全的话，调高了就开始"发疯"。', author: '小明', context: '讨论解码策略时' },
      { quote: '当我们加载 OpenAI 的权重后模型瞬间"开窍"，说明我们从零写的架构和人家的完全一致——这就是本书最爽的时刻。', author: '小明', context: '成功加载预训练权重后' },
    ],
  },
  nextEpisode: {
    sectionLabel: '· 下期预告 ·',
    title: 'Episode 06 · 文本分类微调',
    description: '下周进入 Chapter 6，学习如何将预训练的 GPT 改造为分类器——以垃圾邮件检测为例，实现数据集准备、分类头添加和微调训练的完整流程。',
    date: '2026-06-19',
    readingTask: 'Ch.6 全章',
  },
  topBar: { title: '女性AI共学小组 · Show Notes', tag: 'EP.05', meta: '2026 · Online' },
  footer: { logo: '女性AI共学小组 · S01', text: 'Build a Large Language Model · From Scratch' },
}
