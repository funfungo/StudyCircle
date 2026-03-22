import { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'
import './AdminPage.css'

const COL_COUNT = 8

const PYTHON_LEVEL_MAP = {
  none: '零基础',
  beginner: '入门',
  intermediate: '日常使用',
  advanced: '非常熟练',
}

const GIT_LEVEL_MAP = {
  none: '没用过',
  basic: '基本操作',
  proficient: '熟练使用',
}

function RegistrationRow({ r, index }) {
  const [expanded, setExpanded] = useState(false)
  const hasDetail = r.motivation || r.questions

  return (
    <Fragment>
      <tr
        className={`adm-row ${hasDetail ? 'adm-row-clickable' : ''}`}
        data-expanded={expanded}
        onClick={() => hasDetail && setExpanded(!expanded)}
      >
        <td className="adm-cell-num">{index + 1}</td>
        <td className="adm-cell-name">{r.name}</td>
        <td className="adm-cell-mono">{r.wechat}</td>
        <td className="adm-cell-mono">{r.xiaohongshu || '—'}</td>
        <td className="adm-cell-mono">{r.email}</td>
        <td>
          <span className={`adm-badge adm-badge-${r.python_level}`}>
            {PYTHON_LEVEL_MAP[r.python_level] || r.python_level}
          </span>
        </td>
        <td>
          <span className={`adm-badge adm-badge-git-${r.git_level}`}>
            {GIT_LEVEL_MAP[r.git_level] || r.git_level || '—'}
          </span>
        </td>
        <td className="adm-cell-time">
          {new Date(r.created_at).toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </td>
      </tr>
      {expanded && (
        <tr className="adm-detail-row">
          <td colSpan={COL_COUNT}>
            <div className="adm-detail">
              {r.motivation && (
                <div className="adm-detail-section">
                  <span className="adm-detail-label">动机</span>
                  <p className="adm-detail-body">{r.motivation}</p>
                </div>
              )}
              {r.questions && (
                <div className="adm-detail-section">
                  <span className="adm-detail-label">补充</span>
                  <p className="adm-detail-body">{r.questions}</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </Fragment>
  )
}

function ActivityGroup({ activity, items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="adm-group">
      <button className="adm-group-header" onClick={() => setOpen(!open)}>
        <span className="adm-group-arrow" data-open={open}>▶</span>
        <h2 className="adm-group-title">{activity || '未分类'}</h2>
        <span className="adm-group-count">{items.length} 人</span>
      </button>

      {open && (
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
                <th>Git</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r, i) => (
                <RegistrationRow key={r.id} r={r} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
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

  const grouped = useMemo(() => {
    const map = new Map()
    for (const row of rows) {
      const key = row.activity || ''
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(row)
    }
    return [...map.entries()]
  }, [rows])

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
          <span className="adm-count">
            {grouped.length} 个活动 · {rows.length} 条报名
          </span>
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
        grouped.map(([activity, items], idx) => (
          <ActivityGroup
            key={activity}
            activity={activity}
            items={items}
            defaultOpen={idx === 0}
          />
        ))
      )}
    </div>
  )
}
