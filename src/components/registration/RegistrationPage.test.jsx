import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RegistrationPage } from './RegistrationPage'
import { mockInsert } from '../../lib/__mocks__/supabase'

vi.mock('../../lib/supabase')

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/register']}>
      <RegistrationPage onToggleTheme={() => {}} />
    </MemoryRouter>,
  )
}

async function acceptContract(user) {
  await user.click(screen.getByRole('button', { name: /同意.*报名/i }))
}

async function fillForm(user) {
  await user.type(screen.getByLabelText(/姓名/), '张三')
  await user.type(screen.getByLabelText(/小红书号/), 'zhangsan_xhs')
  await user.type(screen.getByLabelText(/邮箱/), 'test@example.com')
  await user.click(screen.getByLabelText(/零基础，但愿意学/))
  await user.click(screen.getByLabelText(/完全没用过/))
  await user.type(screen.getByLabelText(/为什么想参加/), '想学 AI')
}

describe('RegistrationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('初始渲染显示共学契约', () => {
    renderPage()
    expect(screen.getByText('在报名之前')).toBeInTheDocument()
    expect(screen.getByText(/请认真阅读以下契约/)).toBeInTheDocument()
    expect(screen.queryByText('加入共学小组')).not.toBeInTheDocument()
  })

  it('接受契约后显示表单', async () => {
    const user = userEvent.setup()
    renderPage()
    await acceptContract(user)
    expect(screen.getByText('加入共学小组')).toBeInTheDocument()
    expect(screen.getByLabelText(/姓名/)).toBeInTheDocument()
  })

  it('提交按钮在未勾选确认时禁用', async () => {
    const user = userEvent.setup()
    renderPage()
    await acceptContract(user)
    expect(screen.getByRole('button', { name: '提交报名' })).toBeDisabled()
  })

  it('填写表单并成功提交', async () => {
    mockInsert.mockResolvedValueOnce({ error: null })
    const user = userEvent.setup()
    renderPage()
    await acceptContract(user)
    await fillForm(user)
    await user.click(screen.getByRole('checkbox', { name: /确认已阅读/ }))
    await user.click(screen.getByRole('button', { name: '提交报名' }))

    await waitFor(() => {
      expect(screen.getByText('报名成功')).toBeInTheDocument()
    })
  })

  it('提交失败显示错误信息', async () => {
    mockInsert.mockResolvedValueOnce({ error: { message: '网络错误' } })
    const user = userEvent.setup()
    renderPage()
    await acceptContract(user)
    await fillForm(user)
    await user.click(screen.getByRole('checkbox', { name: /确认已阅读/ }))
    await user.click(screen.getByRole('button', { name: '提交报名' }))

    await waitFor(() => {
      expect(screen.getByText('网络错误')).toBeInTheDocument()
    })
  })

  it('提交中按钮禁用且文案变化', async () => {
    let resolveInsert
    mockInsert.mockReturnValueOnce(
      new Promise((resolve) => { resolveInsert = resolve }),
    )
    const user = userEvent.setup()
    renderPage()
    await acceptContract(user)
    await fillForm(user)
    await user.click(screen.getByRole('checkbox', { name: /确认已阅读/ }))
    await user.click(screen.getByRole('button', { name: '提交报名' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '提交中…' })).toBeDisabled()
    })

    resolveInsert({ error: null })
  })
})
