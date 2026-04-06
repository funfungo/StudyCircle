import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import html2canvas from 'html2canvas'
import { TicketPage } from './TicketPage'
import { createTicket } from '../../lib/__mocks__/tickets'

vi.mock('../../lib/tickets')
vi.mock('html2canvas')

function renderPage() {
  return render(<TicketPage />)
}

describe('TicketPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('初始渲染显示表单', () => {
    renderPage()
    expect(screen.getByText('LLM 共学小组 · 入营门票')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/小明/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /生成入营门票/ })).toBeInTheDocument()
  })

  it('填写表单并成功生成门票', async () => {
    createTicket.mockResolvedValueOnce()
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByPlaceholderText(/小明/), '张三')
    await user.type(screen.getByPlaceholderText(/产品经理/), '前端工程师，想深入了解 LLM')
    await user.click(screen.getByRole('button', { name: /生成入营门票/ }))

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument()
    })
    expect(screen.getByText('前端工程师，想深入了解 LLM')).toBeInTheDocument()
    expect(createTicket).toHaveBeenCalledWith(
      expect.objectContaining({
        name: '张三',
        description: '前端工程师，想深入了解 LLM',
        has_avatar: false,
      }),
    )
  })

  it('不填写姓名时使用默认值"匿名成员"', async () => {
    createTicket.mockResolvedValueOnce()
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /生成入营门票/ }))

    await waitFor(() => {
      expect(screen.getByText('匿名成员')).toBeInTheDocument()
    })
    expect(createTicket).toHaveBeenCalledWith(
      expect.objectContaining({ name: '匿名成员' }),
    )
  })

  it('提交失败显示错误信息', async () => {
    createTicket.mockRejectedValueOnce(new Error('网络错误'))
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /生成入营门票/ }))

    await waitFor(() => {
      expect(screen.getByText('网络错误')).toBeInTheDocument()
    })
    expect(screen.getByPlaceholderText(/小明/)).toBeInTheDocument()
  })

  it('提交中按钮禁用且文案变化', async () => {
    let resolveCreate
    createTicket.mockReturnValueOnce(
      new Promise((resolve) => { resolveCreate = resolve }),
    )
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /生成入营门票/ }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '提交中…' })).toBeDisabled()
    })

    resolveCreate()
  })

  it('点击"重新编辑"返回表单', async () => {
    createTicket.mockResolvedValueOnce()
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /生成入营门票/ }))
    await waitFor(() => {
      expect(screen.getByText('← 重新编辑')).toBeInTheDocument()
    })

    await user.click(screen.getByText('← 重新编辑'))

    expect(screen.getByPlaceholderText(/小明/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /生成入营门票/ })).toBeInTheDocument()
  })

  describe('保存门票（下载图片）', () => {
    async function goToTicketView(user) {
      createTicket.mockResolvedValueOnce()
      await user.click(screen.getByRole('button', { name: /生成入营门票/ }))
      await waitFor(() => {
        expect(screen.getByText(/保存门票/)).toBeInTheDocument()
      })
    }

    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('点击保存门票调用 html2canvas 并触发下载', async () => {
      const fakeCanvas = { toDataURL: vi.fn(() => 'data:image/png;base64,fake') }
      html2canvas.mockResolvedValueOnce(fakeCanvas)

      const clickSpy = vi.fn()
      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') {
          const a = { click: clickSpy, download: '', href: '' }
          return a
        }
        return document.__proto__.createElement.call(document, tag)
      })

      const user = userEvent.setup()
      renderPage()
      await goToTicketView(user)

      await user.click(screen.getByRole('button', { name: /保存门票/ }))

      await waitFor(() => {
        expect(html2canvas).toHaveBeenCalledTimes(1)
      })
      expect(html2canvas).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({ scale: 3, useCORS: true }),
      )
      expect(fakeCanvas.toDataURL).toHaveBeenCalledWith('image/png')
      expect(clickSpy).toHaveBeenCalled()

      document.createElement.mockRestore?.()
    })

    it('下载过程中按钮显示"生成中…"并禁用', async () => {
      let resolveCanvas
      html2canvas.mockReturnValueOnce(
        new Promise((resolve) => { resolveCanvas = resolve }),
      )

      const user = userEvent.setup()
      renderPage()
      await goToTicketView(user)

      await user.click(screen.getByRole('button', { name: /保存门票/ }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '生成中…' })).toBeDisabled()
      })

      resolveCanvas({ toDataURL: () => 'data:image/png;base64,fake' })
    })

    it('html2canvas 失败时显示 alert 降级提示', async () => {
      html2canvas.mockRejectedValueOnce(new Error('render failed'))
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

      const user = userEvent.setup()
      renderPage()
      await goToTicketView(user)

      await user.click(screen.getByRole('button', { name: /保存门票/ }))

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('下载失败，请尝试截图保存')
      })

      alertSpy.mockRestore()
    })

    it('下载文件名包含用户姓名', async () => {
      const fakeCanvas = { toDataURL: vi.fn(() => 'data:image/png;base64,fake') }
      html2canvas.mockResolvedValueOnce(fakeCanvas)

      let capturedLink
      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') {
          capturedLink = { click: vi.fn(), download: '', href: '' }
          return capturedLink
        }
        return document.__proto__.createElement.call(document, tag)
      })

      const user = userEvent.setup()
      renderPage()

      await user.type(screen.getByPlaceholderText(/小明/), '李四')
      await goToTicketView(user)
      await user.click(screen.getByRole('button', { name: /保存门票/ }))

      await waitFor(() => {
        expect(html2canvas).toHaveBeenCalled()
      })
      expect(capturedLink.download).toBe('LLM共学门票-李四.png')

      document.createElement.mockRestore?.()
    })
  })
})
