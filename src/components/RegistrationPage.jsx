import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'
import { TopBar } from './TopBar'
import { Footer } from './Footer'
import { defaultSiteData } from '../siteData'
import './RegistrationPage.css'

const PYTHON_LEVELS = [
  { value: 'none', label: '零基础，但愿意学' },
  { value: 'beginner', label: '写过一些脚本，能跑通代码' },
  { value: 'intermediate', label: '日常使用，熟悉常用库' },
  { value: 'advanced', label: '非常熟练，有工程经验' },
]

const initialForm = {
  name: '',
  wechat: '',
  xiaohongshu: '',
  email: '',
  python_level: '',
  motivation: '',
  questions: '',
}

export function RegistrationPage({ onToggleTheme }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const { error } = await getSupabase()
        .from('registrations')
        .insert([{
          name: form.name.trim(),
          wechat: form.wechat.trim(),
          xiaohongshu: form.xiaohongshu.trim() || null,
          email: form.email.trim(),
          python_level: form.python_level,
          motivation: form.motivation.trim(),
          questions: form.questions.trim() || null,
          created_at: new Date().toISOString(),
        }])

      if (error) throw error
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || '提交失败，请稍后再试')
    }
  }

  return (
    <>
      <TopBar data={defaultSiteData.topBar} onToggleTheme={onToggleTheme} />

      <div className="reg-page">
        <Link className="reg-back" to="/">← 返回首页</Link>

        <header className="reg-header">
          <span className="reg-eyebrow">· 报名登记 ·</span>
          <h1 className="reg-title">加入共学小组</h1>
          <p className="reg-subtitle">
            填写以下信息，我们会尽快联系你确认名额。
          </p>
        </header>

        {status === 'success' ? (
          <div className="reg-success">
            <div className="reg-success-icon">✓</div>
            <h2 className="reg-success-title">报名成功</h2>
            <p className="reg-success-text">
              感谢你的报名！我们会通过微信联系你，请留意好友申请。
            </p>
            <button className="reg-btn" onClick={() => navigate('/')}>
              返回首页
            </button>
          </div>
        ) : (
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
                小红书号 <span className="reg-optional">(选填)</span>
              </label>
              <input
                id="reg-xiaohongshu"
                className="reg-input"
                type="text"
                name="xiaohongshu"
                value={form.xiaohongshu}
                onChange={handleChange}
                placeholder="小红书号或主页链接"
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

            {status === 'error' && (
              <div className="reg-error">{errorMsg}</div>
            )}

            <button
              className="reg-btn"
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? '提交中…' : '提交报名'}
            </button>

            <p className="reg-privacy">
              你的信息仅用于共学小组的组织沟通，不会分享给第三方。
            </p>
          </form>
        )}
      </div>

      <Footer data={defaultSiteData.footer} />
    </>
  )
}
