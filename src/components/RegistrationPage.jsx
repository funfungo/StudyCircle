import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSupabase } from '../lib/supabase';
import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { defaultSiteData } from '../siteData';
import './RegistrationPage.css';

const CONTRACT_ITEMS = [
  { num: '一', text: '每周按计划完成对应章节的阅读，带着思考来参加讨论。' },
  { num: '二', text: '每周准时参加线上讨论会；如需请假，提前一天在群里说明。' },
  { num: '三', text: '讨论会上积极分享自己的收获或困惑，不做沉默的旁观者。' },
  { num: '四', text: '尊重每位成员，友善沟通，包容不同背景和水平的伙伴。' },
  { num: '五', text: '报名时缴纳 200 元学习押金（通过闲鱼支付，完成全部学习后原路退还）。' },
  { num: '六', text: '连续两周缺席视为自动退出，押金不予退还。' }
];

const PYTHON_LEVELS = [
  { value: 'none', label: '零基础，但愿意学' },
  { value: 'beginner', label: '写过一些脚本，能跑通代码' },
  { value: 'intermediate', label: '日常使用，熟悉常用库' },
  { value: 'advanced', label: '非常熟练，有工程经验' }
];

const GIT_LEVELS = [
  { value: 'none', label: '完全没用过' },
  { value: 'basic', label: '用过基本的 clone / pull / push' },
  { value: 'proficient', label: '熟练使用，了解分支和合并' }
];

const initialForm = {
  name: '',
  wechat: '',
  xiaohongshu: '',
  email: '',
  python_level: '',
  git_level: '',
  motivation: '',
  questions: ''
};

export function RegistrationPage({ onToggleTheme }) {
  const [contractAccepted, setContractAccepted] = useState(false);
  const [contractConfirmed, setContractConfirmed] = useState(false);
  const [showContractModal, _setShowContractModal] = useState(false);
  const setShowContractModal = useCallback((open) => {
    _setShowContractModal(open);
    document.body.style.overflow = open ? 'hidden' : '';
  }, []);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await getSupabase()
        .from('registrations')
        .insert([
          {
            activity: defaultSiteData.topBar.title,
            name: form.name.trim(),
            wechat: form.wechat.trim(),
            xiaohongshu: form.xiaohongshu.trim(),
            email: form.email.trim(),
            python_level: form.python_level,
            git_level: form.git_level,
            motivation: form.motivation.trim(),
            questions: form.questions.trim() || null,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || '提交失败，请稍后再试');
    }
  };

  return (
    <>
      <TopBar data={defaultSiteData.topBar} onToggleTheme={onToggleTheme} />

      <div className="reg-page">
        <Link className="reg-back" to="/">
          ← 返回首页
        </Link>

        {status === 'success' ? (
          <>
            <header className="reg-header">
              <span className="reg-eyebrow">· 报名登记 ·</span>
              <h1 className="reg-title">加入共学小组</h1>
            </header>
            <div className="reg-success">
              <div className="reg-success-icon">✓</div>
              <h2 className="reg-success-title">报名成功</h2>
              <p className="reg-success-text">感谢你的报名！我们会通过微信联系你，请留意好友申请。</p>
              <button className="reg-btn" onClick={() => navigate('/')}>
                返回首页
              </button>
            </div>
          </>
        ) : !contractAccepted ? (
          <>
            <header className="reg-header">
              <span className="reg-eyebrow">· 共学契约 ·</span>
              <h1 className="reg-title">在报名之前</h1>
              <p className="reg-subtitle">请认真阅读以下契约，这是我们对彼此的承诺。</p>
            </header>

            <div className="reg-contract">
              <div className="reg-contract-list">
                {CONTRACT_ITEMS.map((item) => (
                  <div className="reg-contract-item" key={item.num}>
                    <span className="reg-contract-num">{item.num}</span>
                    <span className="reg-contract-text">{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="reg-btn reg-contract-btn" onClick={() => setContractAccepted(true)}>
                我已阅读并同意，开始报名 →
              </button>
            </div>
          </>
        ) : (
          <>
            <header className="reg-header">
              <span className="reg-eyebrow">· 报名登记 ·</span>
              <h1 className="reg-title">加入共学小组</h1>
              <p className="reg-subtitle">填写以下信息，我们会尽快联系你确认名额。</p>
            </header>

            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="reg-field">
                <label className="reg-label" htmlFor="reg-name">
                  姓名 / 昵称 <span className="reg-required">*</span>
                </label>
                <input
                  id="reg-name"
                  className="reg-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="你希望我们怎么称呼你"
                  required
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="reg-wechat">
                  微信号 <span className="reg-required">*</span>
                </label>
                <input
                  id="reg-wechat"
                  className="reg-input"
                  type="text"
                  name="wechat"
                  value={form.wechat}
                  onChange={handleChange}
                  placeholder="用于拉群和后续联系"
                  required
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="reg-xiaohongshu">
                  小红书号 <span className="reg-required">*</span>
                </label>
                <input
                  id="reg-xiaohongshu"
                  className="reg-input"
                  type="text"
                  name="xiaohongshu"
                  value={form.xiaohongshu}
                  onChange={handleChange}
                  placeholder="小红书号或主页链接"
                  required
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="reg-email">
                  邮箱 <span className="reg-required">*</span>
                </label>
                <input
                  id="reg-email"
                  className="reg-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="用于接收学习资料和通知"
                  required
                />
              </div>

              <div className="reg-field">
                <label className="reg-label">
                  Python 基础 <span className="reg-required">*</span>
                </label>
                <div className="reg-radio-group">
                  {PYTHON_LEVELS.map((level) => (
                    <label key={level.value} className="reg-radio-label">
                      <input
                        type="radio"
                        name="python_level"
                        value={level.value}
                        checked={form.python_level === level.value}
                        onChange={handleChange}
                        required
                      />
                      <span className="reg-radio-indicator" />
                      <span className="reg-radio-text">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="reg-field">
                <label className="reg-label">
                  Git 使用经验 <span className="reg-required">*</span>
                </label>
                <div className="reg-radio-group">
                  {GIT_LEVELS.map((level) => (
                    <label key={level.value} className="reg-radio-label">
                      <input
                        type="radio"
                        name="git_level"
                        value={level.value}
                        checked={form.git_level === level.value}
                        onChange={handleChange}
                        required
                      />
                      <span className="reg-radio-indicator" />
                      <span className="reg-radio-text">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="reg-motivation">
                  为什么想参加？<span className="reg-required">*</span>
                </label>
                <textarea
                  id="reg-motivation"
                  className="reg-textarea"
                  name="motivation"
                  value={form.motivation}
                  onChange={handleChange}
                  placeholder="聊聊你的动机、期待，或者你对 AI / LLM 的想法"
                  rows={4}
                  required
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="reg-questions">
                  其他想说的 <span className="reg-optional">(选填)</span>
                </label>
                <textarea
                  id="reg-questions"
                  className="reg-textarea"
                  name="questions"
                  value={form.questions}
                  onChange={handleChange}
                  placeholder="任何问题或补充信息"
                  rows={3}
                />
              </div>

              <label className="reg-confirm">
                <input
                  type="checkbox"
                  checked={contractConfirmed}
                  onChange={(e) => setContractConfirmed(e.target.checked)}
                />
                <span className="reg-confirm-check" />
                <span className="reg-confirm-text">
                  我再次确认已阅读并同意
                  <button type="button" className="reg-confirm-link" onClick={() => setShowContractModal(true)}>
                    共学契约
                  </button>
                </span>
              </label>

              {status === 'error' && <div className="reg-error">{errorMsg}</div>}

              <button className="reg-btn" type="submit" disabled={status === 'submitting' || !contractConfirmed}>
                {status === 'submitting' ? '提交中…' : '提交报名'}
              </button>

              <p className="reg-privacy">你的信息仅用于共学小组的组织沟通，不会分享给第三方。</p>
            </form>
          </>
        )}
      </div>

      <Footer data={defaultSiteData.footer} />

      {showContractModal && (
        <div className="reg-modal-overlay" onClick={() => setShowContractModal(false)}>
          <div className="reg-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reg-modal-header">
              <span className="reg-eyebrow">· 共学契约 ·</span>
              <button
                className="reg-modal-close"
                onClick={() => setShowContractModal(false)}
                aria-label="关闭"
              >
                ×
              </button>
            </div>
            <div className="reg-modal-body">
              <div className="reg-contract-list">
                {CONTRACT_ITEMS.map((item) => (
                  <div className="reg-contract-item" key={item.num}>
                    <span className="reg-contract-num">{item.num}</span>
                    <span className="reg-contract-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reg-modal-footer">
              <button className="reg-btn" onClick={() => setShowContractModal(false)}>
                我已知悉
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
