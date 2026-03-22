export const ep06 = {
  status: 'preview',
  episode: {
    number: '06',
    season: 'S01',
    title: '文本分类微调',
    subtitle: 'Ch.6 · 迁移学习 · 分类头 · 垃圾邮件检测',
    date: '2026-06-19',
    duration: '20:00 - 21:00',
    contributors: [
      { name: '小明', role: '主讲' },
      { name: '小红', role: '主持' },
    ],
  },
  summary: {
    sectionLabel: '· 本期摘要 ·',
    text: [
      '本期进入微调（Fine-tuning）的第一站——将预训练 GPT 改造为文本分类器。我们首先区分特征提取（Feature-based）与微调（Fine-tuning）两种迁移学习策略，然后以垃圾邮件检测为实战任务，从头走完数据准备、模型改造和训练评估的全流程。',
      '核心改动是在 GPT 之上添加分类头（Classification Head）：冻结或解冻预训练层、在最后一个 token 位置提取特征、通过线性层映射到类别概率。我们还讨论了数据集平衡、训练技巧（学习率选择、冻结策略）以及如何评估分类性能。',
    ],
  },
  topics: {
    sectionLabel: '· 讨论要点 ·',
    items: [
      { timestamp: '00:00', title: '开场 & 阅读回顾', description: '确认本期阅读范围（Ch.6 全章），回顾预训练模型的能力。' },
      { timestamp: '10:00', title: '微调的不同范式', description: 'Feature-based vs Fine-tuning vs Prompt-based，各自适用场景。' },
      { timestamp: '20:00', title: '数据集准备', description: 'SMS 垃圾邮件数据集：清洗、分割、平衡采样、创建 DataLoader。' },
      { timestamp: '32:00', title: '模型架构改造', description: '移除原始输出头，添加分类 Linear 层，选择最后一个 token 的表示。' },
      { timestamp: '45:00', title: '冻结与解冻策略', description: '全量微调 vs 只训练分类头 vs 只解冻最后几层，效率与效果的权衡。' },
      { timestamp: '55:00', title: '训练与评估', description: '分类任务的损失函数、准确率指标、混淆矩阵解读。' },
      { timestamp: '1:08:00', title: '实验对比', description: '不同冻结策略的效果对比，预训练权重带来的提升有多大。' },
      { timestamp: '1:20:00', title: '答疑 & 下期预告', description: '开放讨论，预告 Chapter 7 内容和阅读任务。' },
    ],
  },
  resources: {
    sectionLabel: '· 延伸资源 ·',
    categories: [
      {
        label: '必读',
        items: [
          { title: 'ULMFiT — Universal Language Model Fine-tuning', url: 'https://arxiv.org/abs/1801.06146', type: 'article' },
          { title: 'A Survey of LLMs — 微调方法综述', url: 'https://arxiv.org/abs/2303.18223', type: 'article' },
        ],
      },
      {
        label: '推荐阅读',
        items: [
          { title: 'Fine-Tuning LLMs — Sebastian Raschka Blog', url: 'https://magazine.sebastianraschka.com/p/finetuning-large-language-models', type: 'article' },
          { title: 'LoRA: Low-Rank Adaptation of LLMs', url: 'https://arxiv.org/abs/2106.09685', type: 'article' },
        ],
      },
      {
        label: '工具 & 代码',
        items: [
          { title: 'rasbt/LLMs-from-scratch — Ch.6 Notebook', url: 'https://github.com/rasbt/LLMs-from-scratch/blob/main/ch06/01_main-chapter-code/ch06.ipynb', type: 'code' },
          { title: 'Hugging Face PEFT — 参数高效微调库', url: 'https://github.com/huggingface/peft', type: 'tool' },
        ],
      },
    ],
  },
  highlights: {
    sectionLabel: '· 本期亮点 ·',
    items: [
      { quote: '微调就像请了一位博学的老师来做垃圾分类——他不需要从零学语文，只需要学会"这个是垃圾、那个不是"就行。', author: '小红', context: '解释迁移学习的优势时' },
      { quote: '为什么取最后一个 token？因为在因果注意力下，只有最后一个 token "看过"了前面所有内容，它的表示信息最完整。', author: '小明', context: '讨论分类头设计时' },
      { quote: '仅训练分类头就能达到 95% 准确率，说明预训练阶段学到的语言表示本身就蕴含了大量可用信息。', author: '小明', context: '对比不同微调策略时' },
    ],
  },
  nextEpisode: {
    sectionLabel: '· 下期预告 ·',
    title: 'Episode 07 · 指令微调',
    description: '下周进入最终章 Chapter 7——指令微调（Instruction Fine-tuning）。学习如何让模型从"续写文本"进化到"听懂并执行指令"，这是从 GPT 到 ChatGPT 的关键一步。',
    date: '2026-07-03',
    readingTask: 'Ch.7 全章',
  },
  topBar: { title: '女性AI共学小组 · Show Notes', tag: 'EP.06', meta: '2026 · Online' },
  footer: { logo: '女性AI共学小组 · S01', text: 'Build a Large Language Model · From Scratch' },
}
