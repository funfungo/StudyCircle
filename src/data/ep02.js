export const ep02 = {
  /* 'preview' = 预习（仅摘要 + 资源） | 'complete' = 完成（全部内容） */
  status: 'preview',
  episode: {
    number: '02',
    season: 'S01',
    title: '文本数据处理',
    subtitle: 'Ch.2 · Tokenization · BPE · Embedding',
    date: '2026-04-24',
    duration: '20:00 - 21:00',
    contributors: [
      { name: '小明', role: '主讲' },
      { name: '小红', role: '主持' },
    ],
  },
  summary: {
    sectionLabel: '· 本期摘要 ·',
    text: [
      '本期围绕第二章"Working with Text Data"展开，讨论如何将原始文本转化为模型可处理的数值输入。从最简单的按空格/标点切分，到正则表达式 Tokenizer，再到 BPE（Byte Pair Encoding）——逐步理解现代 LLM 分词器的工作原理。',
      '随后我们跟随书中代码，亲手构建 Vocabulary、实现 Token-to-ID 映射、添加特殊 Token（<|unk|>、<|endoftext|>），并用 tiktoken 加载 GPT-2 的真实分词器进行对比。最后进入 Embedding 层：Token Embedding + Positional Embedding 如何组合成模型的输入表示，以及滑动窗口采样如何为训练准备 (input, target) 数据对。',
    ],
  },
  topics: {
    sectionLabel: '· 讨论要点 ·',
    items: [
      { timestamp: '00:00', title: '开场 & 阅读回顾', description: '确认本期阅读范围（Ch.2 全章 + 附录 A），成员分享初读感受。' },
      { timestamp: '10:00', title: '从文本到 Token', description: '空格切分 → 正则切分 → 处理标点与特殊字符的演进思路。' },
      { timestamp: '22:00', title: '构建 Vocabulary', description: 'Token-to-ID 映射表的创建，词表大小对模型的影响。' },
      { timestamp: '32:00', title: '特殊 Token 的作用', description: '<|unk|>、<|endoftext|> 等特殊标记的设计动机与实现。' },
      { timestamp: '42:00', title: 'BPE 算法详解', description: '从字符级别到子词：BPE 的合并策略、tiktoken 库的使用。' },
      { timestamp: '55:00', title: '滑动窗口与数据采样', description: '如何用 stride 和 context length 从语料中生成训练样本。' },
      { timestamp: '1:08:00', title: 'Embedding 层', description: 'Token Embedding + Positional Embedding 的组合，维度选择的考量。' },
      { timestamp: '1:20:00', title: '答疑 & 下期预告', description: '开放讨论，预告 Chapter 3 内容和阅读任务。' },
    ],
  },
  resources: {
    sectionLabel: '· 延伸资源 ·',
    categories: [
      {
        label: '必读',
        items: [
          { title: 'Let\'s build the GPT Tokenizer — Andrej Karpathy', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', type: 'video' },
          { title: 'The Illustrated Word2vec — Jay Alammar', url: 'https://jalammar.github.io/illustrated-word2vec/', type: 'article' },
        ],
      },
      {
        label: '推荐阅读',
        items: [
          { title: 'Byte Pair Encoding — Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/en/chapter6/5', type: 'article' },
          { title: 'Tokenizers: How Machines Read — 3Blue1Brown', url: 'https://www.youtube.com/watch?v=cwI1RBi5pCA', type: 'video' },
        ],
      },
      {
        label: '工具 & 代码',
        items: [
          { title: 'rasbt/LLMs-from-scratch — Ch.2 Notebook', url: 'https://github.com/rasbt/LLMs-from-scratch/blob/main/ch02/01_main-chapter-code/ch02.ipynb', type: 'code' },
          { title: 'OpenAI Tokenizer — 可视化分词', url: 'https://platform.openai.com/tokenizer', type: 'tool' },
          { title: 'Tiktokenizer — BPE 在线可视化', url: 'https://tiktokenizer.vercel.app/', type: 'tool' },
        ],
      },
    ],
  },
  highlights: {
    sectionLabel: '· 本期亮点 ·',
    items: [
      { quote: 'Tokenizer 是 LLM 的"翻译官"——模型看不懂文字，只认数字，所有的理解都从这层翻译开始。', author: '小红', context: '讨论 Tokenization 意义时' },
      { quote: 'BPE 的精妙之处在于：它不需要任何语言学知识，纯靠统计频率就能学会把常见子词拼起来。', author: '小明', context: '讲解 BPE 合并策略时' },
      { quote: 'Embedding 不是随便给每个词一个编号，而是把词放进一个"语义空间"——相似的词自然靠得更近。', author: '小明', context: '解释 Token Embedding 时' },
    ],
  },
  nextEpisode: {
    sectionLabel: '· 下期预告 ·',
    title: 'Episode 03 · 注意力机制',
    description: '下周进入 Chapter 3，深入 Attention 机制的实现——从简单注意力到因果注意力（Causal Attention），再到 Multi-Head Attention 的完整编码实现。',
    date: '2026-05-08',
    readingTask: 'Ch.3 全章',
  },
  topBar: { title: '女性AI共学小组 · Show Notes', tag: 'EP.02', meta: '2026 · Online' },
  footer: { logo: '女性AI共学小组 · S01', text: 'Build a Large Language Model · From Scratch' },
}
