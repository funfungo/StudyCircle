export const ep04 = {
  status: 'preview',
  episode: {
    number: '04',
    season: 'S01',
    title: '从零实现 GPT',
    subtitle: 'Ch.4 · LayerNorm · GELU · Transformer Block · GPT',
    date: '2026-05-22',
    duration: '20:00 - 21:00',
    contributors: [
      { name: '小明', role: '主讲' },
      { name: '小红', role: '主持' },
    ],
  },
  summary: {
    sectionLabel: '· 本期摘要 ·',
    text: [
      '本期是全书的"组装"章节——将前三章实现的 Tokenizer、Embedding 和 Multi-Head Attention 拼装成一个完整的 GPT 模型。我们逐个实现关键组件：Layer Normalization 如何稳定深层网络训练、GELU 激活函数相比 ReLU 的优势、前馈网络（Feed-Forward）的结构设计。',
      '随后通过残差连接（Shortcut Connection）解决深层网络的梯度消失问题，将所有组件封装为 Transformer Block，最终堆叠多个 Block 组成完整的 GPTModel 类。章节结尾展示了如何用这个模型进行文本生成（generate 函数），虽然此时权重是随机的，输出也是乱码，但架构已经完整。',
    ],
  },
  topics: {
    sectionLabel: '· 讨论要点 ·',
    items: [
      { timestamp: '00:00', title: '开场 & 阅读回顾', description: '确认本期阅读范围（Ch.4 全章），回顾模型架构全貌。' },
      { timestamp: '10:00', title: 'Layer Normalization', description: 'LayerNorm vs BatchNorm：为什么 LLM 选择 LayerNorm？Pre-Norm vs Post-Norm 的区别。' },
      { timestamp: '22:00', title: 'GELU 激活函数', description: 'GELU 的数学定义与直觉，为什么 GPT 不用 ReLU。' },
      { timestamp: '30:00', title: '前馈网络', description: '两层线性变换 + 激活的"扩展-压缩"设计，4× 隐藏维度的经验法则。' },
      { timestamp: '40:00', title: '残差连接', description: 'Shortcut Connection 的梯度高速公路比喻，对深层网络训练的关键作用。' },
      { timestamp: '52:00', title: 'Transformer Block 组装', description: '将 Attention + FFN + LayerNorm + Residual 封装为一个可重复堆叠的单元。' },
      { timestamp: '1:05:00', title: 'GPT 模型完整实现', description: '配置字典设计、模型参数量计算、generate 函数实现。' },
      { timestamp: '1:20:00', title: '答疑 & 下期预告', description: '开放讨论，预告 Chapter 5 内容和阅读任务。' },
    ],
  },
  resources: {
    sectionLabel: '· 延伸资源 ·',
    categories: [
      {
        label: '必读',
        items: [
          { title: 'Let\'s build GPT: from scratch, in code — Andrej Karpathy', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', type: 'video' },
          { title: 'The Annotated Transformer — Harvard NLP', url: 'https://nlp.seas.harvard.edu/annotated-transformer/', type: 'article' },
        ],
      },
      {
        label: '推荐阅读',
        items: [
          { title: 'Language Models are Unsupervised Multitask Learners — GPT-2 论文', url: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf', type: 'article' },
          { title: 'nanoGPT — Karpathy 的极简 GPT 实现', url: 'https://github.com/karpathy/nanoGPT', type: 'code' },
        ],
      },
      {
        label: '工具 & 代码',
        items: [
          { title: 'rasbt/LLMs-from-scratch — Ch.4 Notebook', url: 'https://github.com/rasbt/LLMs-from-scratch/blob/main/ch04/01_main-chapter-code/ch04.ipynb', type: 'code' },
          { title: 'Netron — 神经网络架构可视化', url: 'https://netron.app/', type: 'tool' },
        ],
      },
    ],
  },
  highlights: {
    sectionLabel: '· 本期亮点 ·',
    items: [
      { quote: 'LayerNorm 就像给每一层的输出做"体检"——不管前面算出来的数值多离谱，都先拉回正常范围再往下传。', author: '小红', context: '讨论 Layer Normalization 时' },
      { quote: '残差连接是深度学习里最伟大的"偷懒"设计——让梯度可以抄近道直达底层，不用每层都辛苦传递。', author: '小明', context: '解释 Shortcut Connection 时' },
      { quote: '今天我们从零搭了一个 1.24 亿参数的 GPT-2，虽然它现在只会说胡话，但架构和 OpenAI 的一模一样。', author: '小明', context: '完成模型组装后' },
    ],
  },
  nextEpisode: {
    sectionLabel: '· 下期预告 ·',
    title: 'Episode 05 · 预训练',
    description: '下周进入 Chapter 5，为我们从零搭建的 GPT 模型注入"灵魂"——在无标注文本上训练模型，实现损失计算、训练循环，以及加载 OpenAI 的预训练权重。',
    date: '2026-06-05',
    readingTask: 'Ch.5 全章',
  },
  topBar: { title: '女性AI共学小组 · Show Notes', tag: 'EP.04', meta: '2026 · Online' },
  footer: { logo: '女性AI共学小组 · S01', text: 'Build a Large Language Model · From Scratch' },
}
