import { vi } from 'vitest'

export let provider = 'supabase'

export function __setProvider(p) {
  provider = p
}

export const mockAuth = {
  getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
  onAuthStateChange: vi.fn(() => ({
    data: { subscription: { unsubscribe: vi.fn() } },
  })),
  signInWithPassword: vi.fn(),
  signOut: vi.fn(),
}

export const getDb = vi.fn()
export const getAuth = vi.fn(() => mockAuth)
