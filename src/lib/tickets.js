import { getDb } from './db.js'

const provider = import.meta.env.VITE_DB_PROVIDER || 'supabase'
const COLLECTION = 'sc_tickets'

export async function createTicket(data) {
  if (provider === 'cloudbase') {
    const db = getDb()
    const result = await db.collection(COLLECTION).add(data)
    if (typeof result.code === 'string') {
      if (result.code === 'DATABASE_COLLECTION_NOT_EXIST') {
        throw new Error('数据库集合尚未创建，请在 CloudBase 控制台新建 sc_tickets 集合')
      }
      throw new Error(result.errMsg || '提交失败')
    }
    return result
  }

  const { error } = await getDb()
    .from('tickets')
    .insert([data])
  if (error) throw error
}

export async function getTickets() {
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
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}
