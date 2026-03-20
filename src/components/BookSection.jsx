export function BookSection() {
  return (
    <div className="book-section">
      <div className="book-spine">Build LLM From Scratch</div>
      <div className="book-content">
        <div className="section-label">· 本期书目 ·</div>
        <div className="book-title">
          Build a Large Language Model<br />(From Scratch)
        </div>
        <div className="book-author">Sebastian Raschka · 2024</div>
        <div className="book-desc">
          这本书不绕弯子。从 tokenization 到 attention
          机制，从预训练到指令微调，作者用 Python
          从第一行代码开始手撸一个完整的 GPT
          风格语言模型。没有黑盒，没有魔法——只有你真正需要懂的那些东西。
          <br /><br />
          读完之后，你会知道 Transformer
          里的每个矩阵乘法在算什么，ChatGPT 的 RLHF
          在做什么，以及那些漂亮的涌现能力是怎么来的。
        </div>
      </div>
    </div>
  )
}
