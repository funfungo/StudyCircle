import { vi } from 'vitest'

export const mockInsert = vi.fn()
export const mockSelect = vi.fn()
export const mockOrder = vi.fn()

export const mockAuth = {
  getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
  onAuthStateChange: vi.fn(() => ({
    data: { subscription: { unsubscribe: vi.fn() } },
  })),
  signInWithPassword: vi.fn(),
  signOut: vi.fn(),
}

const mockSupabase = {
  from: vi.fn(() => ({
    insert: mockInsert,
    select: vi.fn(() => ({ order: mockOrder })),
  })),
  auth: mockAuth,
}

export const getSupabase = vi.fn(() => mockSupabase)
