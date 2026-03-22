import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminPage } from './AdminPage';
import { mockAuth, mockOrder } from '../../lib/__mocks__/supabase';

vi.mock('../../lib/supabase');

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>
  );
}

const fakeSession = { user: { email: 'admin@test.com' } };

const fakeRows = [
  {
    id: 1,
    activity: 'Season 01',
    name: '张三',
    xiaohongshu: 'zs_xhs',
    email: 'zs@test.com',
    python_level: 'beginner',
    git_level: 'basic',
    motivation: '想学 AI',
    questions: null,
    created_at: '2026-03-20T10:00:00Z'
  }
];

describe('AdminPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.getSession.mockResolvedValue({ data: { session: null } });
    mockAuth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } }
    });
  });

  it('未登录显示登录表单', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('管理后台')).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText('邮箱')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument();
  });

  it('登录失败显示错误', async () => {
    mockAuth.signInWithPassword.mockResolvedValueOnce({
      error: { message: '密码错误' }
    });
    const user = userEvent.setup();
    renderPage();

    await waitFor(() => {
      expect(screen.getByPlaceholderText('邮箱')).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText('邮箱'), 'admin@test.com');
    await user.type(screen.getByPlaceholderText('密码'), 'wrong');
    await user.click(screen.getByRole('button', { name: '登录' }));

    await waitFor(() => {
      expect(screen.getByText('密码错误')).toBeInTheDocument();
    });
  });

  it('登录成功后显示数据列表', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: fakeSession } });
    mockOrder.mockResolvedValueOnce({ data: fakeRows, error: null });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
    });
    expect(screen.getByText('报名数据')).toBeInTheDocument();
    expect(screen.getByText('zs@test.com')).toBeInTheDocument();
  });

  it('空数据显示提示', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: fakeSession } });
    mockOrder.mockResolvedValueOnce({ data: [], error: null });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('暂无报名数据')).toBeInTheDocument();
    });
  });
});
