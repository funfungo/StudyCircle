import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminPage } from './AdminPage';
import { mockAuth, __setProvider } from '../../lib/__mocks__/db';
import { getRegistrations } from '../../lib/__mocks__/registrations';

vi.mock('../../lib/db');
vi.mock('../../lib/registrations');

const fakeRows = [
  {
    id: 1,
    activity: 'Season 01',
    name: '张三',
    wechat: 'zs_wx',
    xiaohongshu: 'zs_xhs',
    email: 'zs@test.com',
    python_level: 'beginner',
    git_level: 'basic',
    motivation: '想学 AI',
    questions: null,
    created_at: '2026-03-20T10:00:00Z',
  },
];

const fakeSession = { user: { email: 'admin@test.com' } };

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>
  );
}

describe('AdminPage (Supabase 模式)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    __setProvider('supabase');
    mockAuth.getSession.mockResolvedValue({ data: { session: null } });
    mockAuth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  it('未登录显示邮箱+密码表单', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('管理后台')).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText('邮箱')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument();
  });

  it('Supabase 登录失败显示错误', async () => {
    mockAuth.signInWithPassword.mockResolvedValueOnce({
      error: { message: '密码错误' },
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

  it('Supabase 登录成功后显示数据', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: fakeSession } });
    getRegistrations.mockResolvedValueOnce(fakeRows);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
    });
    expect(screen.getByText('报名数据')).toBeInTheDocument();
  });

  it('空数据显示提示', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: fakeSession } });
    getRegistrations.mockResolvedValueOnce([]);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('暂无报名数据')).toBeInTheDocument();
    });
  });
});

describe('AdminPage (固定密码模式)', () => {
  const TEST_PASSWORD = 'test-secret';

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    __setProvider('cloudbase');
    import.meta.env.VITE_ADMIN_PASSWORD = TEST_PASSWORD;
  });

  it('未登录显示密码表单（无邮箱）', () => {
    renderPage();
    expect(screen.getByText('管理后台')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('邮箱')).not.toBeInTheDocument();
  });

  it('密码错误显示提示', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText('密码'), 'wrong-password');
    await user.click(screen.getByRole('button', { name: '登录' }));

    expect(screen.getByText('密码错误')).toBeInTheDocument();
    expect(screen.queryByText('报名数据')).not.toBeInTheDocument();
  });

  it('密码正确登录后显示数据', async () => {
    getRegistrations.mockResolvedValueOnce(fakeRows);
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText('密码'), TEST_PASSWORD);
    await user.click(screen.getByRole('button', { name: '登录' }));

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
    });
    expect(screen.getByText('报名数据')).toBeInTheDocument();
  });

  it('登录后 sessionStorage 保持登录态', async () => {
    getRegistrations.mockResolvedValueOnce(fakeRows);
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText('密码'), TEST_PASSWORD);
    await user.click(screen.getByRole('button', { name: '登录' }));

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
    });
    expect(sessionStorage.getItem('sc_admin_authed')).toBe('1');
  });

  it('已有 session 时直接显示数据', async () => {
    sessionStorage.setItem('sc_admin_authed', '1');
    getRegistrations.mockResolvedValueOnce(fakeRows);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
    });
    expect(screen.getByText('报名数据')).toBeInTheDocument();
  });

  it('点击退出回到登录页', async () => {
    sessionStorage.setItem('sc_admin_authed', '1');
    getRegistrations.mockResolvedValueOnce([]);
    const user = userEvent.setup();

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('报名数据')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: '退出' }));

    expect(screen.getByText('管理后台')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument();
    expect(sessionStorage.getItem('sc_admin_authed')).toBeNull();
  });

  it('空数据显示提示', async () => {
    sessionStorage.setItem('sc_admin_authed', '1');
    getRegistrations.mockResolvedValueOnce([]);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('暂无报名数据')).toBeInTheDocument();
    });
  });
});
