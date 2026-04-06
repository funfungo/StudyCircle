import { useState, useRef, useCallback, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { createTicket } from '../../lib/tickets'
import './TicketPage.css'

const BARCODE_HEIGHTS = [30, 18, 38, 22, 42, 16, 34, 24, 40, 20, 28, 26, 36, 18, 42, 22, 30, 38, 20, 34, 24, 40, 16, 28]
const PERF_DOT_COUNT = 18

export function TicketPage() {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [avatarSrc, setAvatarSrc] = useState('')
  const [showTicket, setShowTicket] = useState(false)
  const [stampVisible, setStampVisible] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const ticketCardRef = useRef(null)
  const wrapRef = useRef(null)

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setAvatarSrc(ev.target.result)
    reader.readAsDataURL(file)
  }, [])

  const handleGenerate = useCallback(async () => {
    const finalName = name.trim() || '匿名成员'
    const finalDesc = desc.trim() || '期待与大家一起深入 LLM 的世界'

    setSubmitStatus('submitting')
    setErrorMsg('')

    try {
      await createTicket({
        name: finalName,
        description: finalDesc,
        has_avatar: !!avatarSrc,
        created_at: new Date().toISOString(),
      })
      setSubmitStatus('success')
      setShowTicket(true)
      setStampVisible(false)
      setTimeout(() => setStampVisible(true), 300)
    } catch (err) {
      setSubmitStatus('error')
      setErrorMsg(err.message || '提交失败，请稍后再试')
    }
  }, [name, desc, avatarSrc])

  const handleBack = useCallback(() => {
    setShowTicket(false)
    setStampVisible(false)
    setSubmitStatus('idle')
  }, [])

  const displayName = name.trim() || '匿名成员'
  const displayDesc = desc.trim() || '期待与大家一起深入 LLM 的世界'

  const [downloading, setDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    const card = ticketCardRef.current
    const wrap = wrapRef.current
    if (!card || !wrap || downloading) return

    setDownloading(true)

    const savedCard = {
      transition: card.style.transition,
      transform: card.style.transform,
      overflow: card.style.overflow,
    }
    const savedWrap = {
      filter: wrap.style.filter,
      animation: wrap.style.animation,
    }

    try {
      card.style.transition = 'none'
      card.style.transform = 'none'
      card.style.overflow = 'hidden'
      wrap.style.filter = 'none'
      wrap.style.animation = 'none'

      const grain = card.querySelector('.ticket-grain')
      const shine = card.querySelector('.ticket-shine')
      if (grain) grain.style.display = 'none'
      if (shine) shine.style.display = 'none'

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

      const canvas = await html2canvas(card, {
        scale: 3,
        backgroundColor: '#1a1814',
        useCORS: true,
        logging: false,
      })

      if (grain) grain.style.display = ''
      if (shine) shine.style.display = ''

      const link = document.createElement('a')
      link.download = `LLM共学门票-${displayName}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      alert('下载失败，请尝试截图保存')
    } finally {
      card.style.transition = savedCard.transition
      card.style.transform = savedCard.transform
      card.style.overflow = savedCard.overflow
      wrap.style.filter = savedWrap.filter
      wrap.style.animation = savedWrap.animation
      setDownloading(false)
    }
  }, [downloading, displayName])

  useEffect(() => {
    const wrap = wrapRef.current
    const card = ticketCardRef.current
    if (!wrap || !card) return

    const applyTilt = (dx, dy) => {
      card.style.transition = ''
      card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg)`
    }
    const resetTilt = () => {
      card.style.transition = 'transform 0.5s ease'
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
    }

    const onMouseMove = (e) => {
      const r = wrap.getBoundingClientRect()
      applyTilt(
        (e.clientX - r.left - r.width / 2) / (r.width / 2),
        (e.clientY - r.top - r.height / 2) / (r.height / 2)
      )
    }
    const onTouchMove = (e) => {
      const t = e.touches[0]
      const r = wrap.getBoundingClientRect()
      applyTilt(
        (t.clientX - r.left - r.width / 2) / (r.width / 2),
        (t.clientY - r.top - r.height / 2) / (r.height / 2)
      )
    }

    wrap.addEventListener('mousemove', onMouseMove)
    wrap.addEventListener('mouseleave', resetTilt)
    wrap.addEventListener('touchmove', onTouchMove, { passive: true })
    wrap.addEventListener('touchend', resetTilt)

    return () => {
      wrap.removeEventListener('mousemove', onMouseMove)
      wrap.removeEventListener('mouseleave', resetTilt)
      wrap.removeEventListener('touchmove', onTouchMove)
      wrap.removeEventListener('touchend', resetTilt)
    }
  }, [showTicket])

  return (
    <div className="ticket-page">
      <div className="ticket-page-title">
        <h2>LLM 共学小组 · 入营门票</h2>
        <p>Study Circle · Season 01 · Ticket Generator</p>
      </div>

      {!showTicket ? (
        <div className="ticket-form-panel">
          <div className="ticket-form-row">
            <label>成员姓名 / 昵称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：小明 / Alice"
            />
          </div>
          <div className="ticket-form-row">
            <label>一句话介绍</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="例：产品经理，对 LLM 应用层感兴趣，Python 新手"
            />
            <div className="ticket-form-hint">建议 20–50 字，显示在门票成员栏</div>
          </div>
          <div className="ticket-form-row">
            <label>头像上传（可选）</label>
            <div className="ticket-avatar-row">
              <div className="ticket-avatar-preview">
                {avatarSrc
                  ? <img src={avatarSrc} alt="头像预览" />
                  : '🧑'}
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ fontSize: '12px', color: 'rgba(245,240,232,0.45)' }}
                />
                <div className="ticket-form-hint">不上传则用姓名首字</div>
              </div>
            </div>
          </div>

          <button
            className="ticket-gen-btn"
            onClick={handleGenerate}
            disabled={submitStatus === 'submitting'}
          >
            {submitStatus === 'submitting' ? '提交中…' : '✦ 生成入营门票'}
          </button>

          {submitStatus === 'error' && (
            <div className="ticket-submit-status error">{errorMsg}</div>
          )}
        </div>
      ) : (
        <div className="ticket-stage">
          <div className="ticket-wrap" ref={wrapRef}>
            <div className="ticket-card" ref={ticketCardRef}>
              <div className="ticket-grain" />
              <div className={`ticket-stamp${stampVisible ? ' show' : ''}`}>
                <div className="ticket-stamp-text">已<br />加入<br />ADMIT</div>
              </div>

              {/* MAIN */}
              <div className="ticket-main">
                <div className="ticket-shine" />
                <div className="ticket-watermark">LLM</div>
                <div className="ticket-stripe" />
                <div className="ticket-inner">
                  <div className="ticket-event">LLM 共学小组 · Study Circle · Season 01</div>
                  <div className="ticket-title-text">
                    从零构建<br /><em>大语言模型</em>
                  </div>
                  <div className="ticket-sub">
                    Build a Large Language Model · From Scratch<br />
                    Sebastian Raschka · Manning · 2024
                  </div>
                </div>
                <div className="ticket-member">
                  <div className="ticket-member-avatar">
                    {avatarSrc
                      ? <img src={avatarSrc} alt={displayName} />
                      : <span style={{
                          fontSize: '22px',
                          lineHeight: 1,
                          fontFamily: "'Noto Serif SC Variable', 'Noto Serif SC', serif",
                          color: 'var(--ticket-gold, #d4a843)',
                        }}>{displayName.charAt(0)}</span>}
                  </div>
                  <div className="ticket-member-info">
                    <div className="ticket-member-name">{displayName}</div>
                    <div className="ticket-member-desc">{displayDesc}</div>
                  </div>
                </div>
                <div className="ticket-meta">
                  <div className="ticket-meta-item">
                    <div className="ticket-meta-val">8<sup>周</sup></div>
                    <div className="ticket-meta-key">共学周期</div>
                  </div>
                  <div className="ticket-meta-item">
                    <div className="ticket-meta-val" style={{ fontSize: '10px' }}>2026.04.10</div>
                    <div className='ticket-meta-val-time'>20:30-21:30</div>
                    <div className="ticket-meta-key">开营日期</div>
                  </div>
                  <div className="ticket-meta-item">
                    <div className="ticket-meta-val">线上会议</div>
                    <div className="ticket-meta-key">形式</div>
                  </div>
                </div>
              </div>

              {/* SEPARATOR */}
              <div className="ticket-sep-row">
                <div className="ticket-notch-l" />
                <div className="ticket-notch-r" />
                <div className="ticket-sep-dashes" />
                <div className="ticket-perf-row">
                  {Array.from({ length: PERF_DOT_COUNT }, (_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>

              {/* STUB */}
              <div className="ticket-stub">
                <div className="ticket-stub-left">
                  <div className="ticket-stub-label">入营凭证 · Admit One</div>
                  <div className="ticket-stub-no">S01</div>
                  <div className="ticket-stub-admit">LLM 共学<br /><em>开营典礼</em></div>
                </div>
                <div className="ticket-barcode">
                  {BARCODE_HEIGHTS.map((h, i) => (
                    <span key={i} style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ticket-actions">
            <button className="ticket-action-btn" onClick={handleBack}>← 重新编辑</button>
            <button className="ticket-action-btn primary" onClick={handleDownload} disabled={downloading}>
              {downloading ? '生成中…' : '↓ 保存门票'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
