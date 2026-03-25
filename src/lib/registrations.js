import { getDb } from './db.js'

const provider = import.meta.env.VITE_DB_PROVIDER || 'supabase'
const COLLECTION = 'sc_registrations'

export async function createRegistration(data) {
  if (provider === 'cloudbase') {
    const db = getDb()
    const result = await db.collection(COLLECTION).add(data)
    if (typeof result.code === 'string') {
      throw new Error(result.errMsg || '提交失败')
    }
    return result
  }

  const { error } = await getDb()
    .from('registrations')
    .insert([data])
  if (error) throw error
}

export async function getRegistrations() {
  if (provider === 'cloudbase') {
    const db = getDb()
    const result = await db
      .collection(COLLECTION)
      .orderBy('created_at', 'desc')
      .limit(1000)
      .get()
    if (typeof result.code === 'string') {
      throw new Error(result.errMsg || '加载失败')
    }
    return (result.data || []).map((doc) => ({ ...doc, id: doc._id }))
  }

  const { data, error } = await getDb()
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateRegistrationStatus(id, status) {
  if (provider === 'cloudbase') {
    const db = getDb()
    const result = await db
      .collection(COLLECTION)
      .doc(id)
      .update({ confirmed: status })
    if (typeof result.code === 'string') {
      throw new Error(result.errMsg || '更新失败')
    }
    return
  }

  const { error } = await getDb()
    .from('registrations')
    .update({ confirmed: status })
    .eq('id', id)
  if (error) throw error
}
