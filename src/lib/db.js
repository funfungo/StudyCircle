import { getSupabase } from './supabase.js'
import { getCloudbaseDb, getCloudbaseAuth } from './cloudbase.js'

export const provider = import.meta.env.VITE_DB_PROVIDER || 'supabase'

export function getDb() {
  return provider === 'cloudbase' ? getCloudbaseDb() : getSupabase()
}

export function getAuth() {
  return provider === 'cloudbase' ? getCloudbaseAuth() : getSupabase().auth
}
