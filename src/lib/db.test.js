import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mockSupabaseClient = {
  from: vi.fn(),
  auth: {
    getSession: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChange: vi.fn(),
  },
}

const mockCloudbaseDb = { collection: vi.fn() }
const mockCloudbaseAuth = {
  getSession: vi.fn(),
  signInWithPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChange: vi.fn(),
}

vi.mock('./supabase.js', () => ({
  getSupabase: vi.fn(() => mockSupabaseClient),
}))

vi.mock('./cloudbase.js', () => ({
  getCloudbaseDb: vi.fn(() => mockCloudbaseDb),
  getCloudbaseAuth: vi.fn(() => mockCloudbaseAuth),
}))

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('db - supabase provider (default)', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_DB_PROVIDER', 'supabase')
    vi.resetModules()
  })

  it('getDb 返回 supabase 客户端', async () => {
    const { getDb } = await import('./db.js')
    expect(getDb()).toBe(mockSupabaseClient)
  })

  it('getAuth 返回 supabase auth', async () => {
    const { getAuth } = await import('./db.js')
    expect(getAuth()).toBe(mockSupabaseClient.auth)
  })
})

describe('db - cloudbase provider', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_DB_PROVIDER', 'cloudbase')
    vi.resetModules()
  })

  it('getDb 返回 cloudbase 文档数据库客户端', async () => {
    const { getDb } = await import('./db.js')
    expect(getDb()).toBe(mockCloudbaseDb)
  })

  it('getAuth 返回 cloudbase auth', async () => {
    const { getAuth } = await import('./db.js')
    expect(getAuth()).toBe(mockCloudbaseAuth)
  })
})

describe('db - 未设置 VITE_DB_PROVIDER 时默认使用 supabase', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_DB_PROVIDER', '')
    vi.resetModules()
  })

  it('getDb 返回 supabase 客户端', async () => {
    const { getDb } = await import('./db.js')
    expect(getDb()).toBe(mockSupabaseClient)
  })
})

describe('db - 配置缺失时传播底层错误', () => {
  it('supabase 配置缺失时抛出错误', async () => {
    vi.stubEnv('VITE_DB_PROVIDER', 'supabase')
    vi.resetModules()

    const supabaseMod = await import('./supabase.js')
    supabaseMod.getSupabase.mockImplementationOnce(() => {
      throw new Error('请在 .env 文件中配置 VITE_SUPABASE_URL')
    })

    const { getDb } = await import('./db.js')
    expect(() => getDb()).toThrow('VITE_SUPABASE_URL')
  })

  it('cloudbase 配置缺失时抛出错误', async () => {
    vi.stubEnv('VITE_DB_PROVIDER', 'cloudbase')
    vi.resetModules()

    const cloudbaseMod = await import('./cloudbase.js')
    cloudbaseMod.getCloudbaseDb.mockImplementationOnce(() => {
      throw new Error('请在 .env 文件中配置 VITE_CLOUDBASE_ENV')
    })

    const { getDb } = await import('./db.js')
    expect(() => getDb()).toThrow('VITE_CLOUDBASE_ENV')
  })
})
