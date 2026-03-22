export const ep07 = {
  status: 'preview',
  episode: {
    number: '07',
    season: 'S01',
    title: '指令微调',
    subtitle: 'Ch.7 · Instruction Tuning · 数据格式 · 对话能力',
    date: '2026-07-03',
    duration: '20:00 - 21:00',
    contributors: [
      { name: '小明', role: '主讲' },
      { name: '小红', role: '主持' },
    ],
  },
  summary: {
    sectionLabel: '· 本期摘要 ·',
    text: [
      '本期是 Season 01 的收官之作，进入全书最后一章——指令微调。这是从"GPT"到"ChatGPT"的关键一步：让模型从单纯的文本续写，进化为能够理解并执行人类指令的助手。我们首先理解指令微调的核心思想：用 (instruction, input, output) 三元组格式化训练数据，教模型学会"问答"模式。',
      '然后动手实现完整流程：构建指令数据集、设计 Prompt 模板、处理变长序列的 Padding 与 Collate 策略、训练循环。最终我们的模型能够对新指令生成合理回答。章节还简要介绍了 RLHF 和 DPO 等进阶对齐方法，为 Season 02 的进一步探索埋下伏笔。',
    ],
  },
  topics: {
    sectionLabel: '· 讨论要点 ·',
    items: [
      { timestamp: '00:00', title: '开场 & 阅读回顾', description: '确认本期阅读范围（Ch.7 全章），回顾从 Ch.1 到 Ch.7 的完整旅程。' },
      { timestamp: '10:00', title: '指令微调 vs 分类微调', description: '两种微调的目标差异：分类是"选择"，指令微调是"生成"。' },
      { timestamp: '20:00', title: '指令数据集格式', description: 'Alpaca 格式的 (instruction, input, output) 三元组，Prompt 模板设计。' },
      { timestamp: '32:00', title: '数据处理挑战', description: '变长序列的 Padding 策略，自定义 Collate 函数，只对 output 部分计算损失。' },
      { timestamp: '45:00', title: '训练与生成', description: '微调训练循环实现，观察模型指令遵循能力的逐步提升。' },
      { timestamp: '55:00', title: '模型评估', description: '指令模型的评估难题：自动指标的局限性，LLM-as-a-Judge 方法。' },
      { timestamp: '1:05:00', title: 'RLHF & DPO 简介', description: '从 SFT 到 RLHF 再到 DPO：对齐技术的演进路线。' },
      { timestamp: '1:15:00', title: 'Season 01 回顾与总结', description: '从零到一构建 LLM 的完整旅程回顾，每位成员分享最大收获。' },
    ],
  },
  resources: {
    sectionLabel: '· 延伸资源 ·',
    categories: [
      {
        label: '必读',
        items: [
          { title: 'Training language models to follow instructions (InstructGPT)', url: 'https://arxiv.org/abs/2203.02155', type: 'article' },
          { title: 'RLHF: Reinforcement Learning from Human Feedback — Hugging Face', url: 'https://huggingface.co/blog/rlhf', type: 'article' },
        ],
      },
      {
        label: '推荐阅读',
        items: [
          { title: 'Direct Preference Optimization (DPO) 论文', url: 'https://arxiv.org/abs/2305.18290', type: 'article' },
          { title: 'LLM Alignment 技术综述 — Sebastian Raschka', url: 'https://magazine.sebastianraschka.com/p/llm-training-rlhf-and-its-alternatives', type: 'article' },
          { title: 'Stanford Alpaca — 指令微调开源实践', url: 'https://github.com/tatsu-lab/stanford_alpaca', type: 'code' },
        ],
      },
      {
        label: '工具 & 代码',
        items: [
          { title: 'rasbt/LLMs-from-scratch — Ch.7 Notebook', url: 'https://github.com/rasbt/LLMs-from-scratch/blob/main/ch07/01_main-chapter-code/ch07.ipynb', type: 'code' },
          { title: 'Hugging Face TRL — 强化学习训练库', url: 'https://github.com/huggingface/trl', type: 'tool' },
          { title: 'Ollama — 本地运行 LLM', url: 'https://ollama.com/', type: 'tool' },
        ],
      },
    ],
  },
  highlights: {
    sectionLabel: '· 本期亮点 ·',
    items: [
      { quote: '指令微调就像从"自言自语"变成"对话"——模型终于学会了先听问题，再给答案。', author: '小红', context: '讨论指令微调的本质时' },
      { quote: '只对 output 部分算 loss 这个设计太精妙了——你不惩罚模型"听问题"的过程，只要求它"回答得好"。', author: '小明', context: '讲解损失计算策略时' },
      { quote: '七章读完，我们真的从一个空白的 Python 文件，一路走到了一个能听懂指令的语言模型——这种从零到一的感觉太棒了。', author: '小红', context: 'Season 01 总结时' },
    ],
  },
  nextEpisode: {
    sectionLabel: '· 下期预告 ·',
    title: 'Season 02 · 敬请期待',
    description: 'Season 01 到此圆满结束！我们用七期完成了"从零构建 LLM"的完整旅程。Season 02 的主题正在筹划中——可能会深入 RAG、Agent、多模态，或一起动手做一个真正可用的 AI 应用。敬请期待！',
    date: 'TBD',
    readingTask: '待定',
  },
  topBar: { title: '女性AI共学小组 · Show Notes', tag: 'EP.07', meta: '2026 · Online' },
  footer: { logo: '女性AI共学小组 · S01', text: 'Build a Large Language Model · From Scratch' },
}
