import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'
import './AdminPage.css'

const PYTHON_LEVEL_MAP = {
  none: '零基础',
  beginner: '入门',
  intermediate: '日常使用',
  advanced: '非常熟练',
}

export function AdminPage() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = getSupabase()
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, s) => setSession(s)
    )
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const { error: err } = await getSupabase().auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (err) throw err
    } catch (err) {
      setLoginError(err.message || '登录失败')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await getSupabase().auth.signOut()
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: fetchErr } = await getSupabase()
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchErr) throw fetchErr
      setRows(data || [])
    } catch (err) {
      setError(err.message || '加载失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (session) fetchData()
  }, [session, fetchData])

  if (checking) {
    return (
      <div className="adm-page">
        <p className="adm-empty">验证中…</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="adm-page">
        <div className="adm-login">
          <h1 className="adm-login-title">管理后台</h1>
          <p className="adm-login-hint">使用 Supabase 管理员账号登录</p>
          <form onSubmit={handleLogin}>
            <input
              className="adm-pw-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="邮箱"
              autoFocus
              required
            />
            <input
              className="adm-pw-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              required
            />
            {loginError && (
              <p className="adm-pw-error">{loginError}</p>
            )}
            <button className="adm-btn" type="submit" disabled={loginLoading}>
              {loginLoading ? '登录中…' : '登录'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="adm-page">
      <div className="adm-toolbar">
        <Link className="adm-back" to="/">← 返回首页</Link>
        <div className="adm-toolbar-right">
          <span className="adm-count">{rows.length} 条报名</span>
          <button
            className="adm-btn adm-btn-sm"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? '刷新中…' : '刷新'}
          </button>
          <button
            className="adm-btn adm-btn-sm adm-btn-ghost"
            onClick={handleLogout}
          >
            退出
          </button>
        </div>
      </div>

      <h1 className="adm-title">报名数据</h1>

      {error && <div className="adm-error">{error}</div>}

      {loading && rows.length === 0 ? (
        <p className="adm-empty">加载中…</p>
      ) : rows.length === 0 ? (
        <p className="adm-empty">暂无报名数据</p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>姓名</th>
                <th>微信</th>
                <th>小红书</th>
                <th>邮箱</th>
                <th>Python</th>
                <th>动机</th>
                <th>补充</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id}>
                  <td className="adm-cell-num">{i + 1}</td>
                  <td className="adm-cell-name">{r.name}</td>
                  <td className="adm-cell-mono">{r.wechat}</td>
                  <td className="adm-cell-mono">{r.xiaohongshu || '—'}</td>
                  <td className="adm-cell-mono">{r.email}</td>
                  <td>
                    <span className={`adm-badge adm-badge-${r.python_level}`}>
                      {PYTHON_LEVEL_MAP[r.python_level] || r.python_level}
                    </span>
                  </td>
                  <td className="adm-cell-text">{r.motivation}</td>
                  <td className="adm-cell-text">{r.questions || '—'}</td>
                  <td className="adm-cell-time">
                    {new Date(r.created_at).toLocaleString('zh-CN', {
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
