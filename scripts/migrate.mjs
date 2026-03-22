import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, '..', 'supabase', 'migrations');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_ACCESS_TOKEN;

async function execSQL(sql) {
  const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0];
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`
      },
      body: JSON.stringify({ query: sql })
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SQL 执行失败 (${res.status}): ${body}`);
  }

  return res.json();
}

async function migrate() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ 缺少环境变量:');
    if (!SUPABASE_URL) console.error('   - VITE_SUPABASE_URL');
    if (!SUPABASE_SERVICE_KEY) console.error('   - SUPABASE_ACCESS_TOKEN');
    console.error('\n   SUPABASE_ACCESS_TOKEN 获取方式:');
    console.error('   https://supabase.com/dashboard/account/tokens → Generate new token');
    process.exit(1);
  }

  await execSQL(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ DEFAULT now()
    )
  `);

  const result = await execSQL('SELECT name FROM _migrations ORDER BY name');
  const appliedSet = new Set(result.map((r) => r.name));

  const files = (await readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith('.sql'))
    .sort();

  const pending = files.filter((f) => !appliedSet.has(f));

  if (pending.length === 0) {
    console.log('✅ 数据库已是最新，无需迁移');
    return;
  }

  console.log(`📦 发现 ${pending.length} 个待执行迁移\n`);

  for (const file of pending) {
    const sql = await readFile(join(MIGRATIONS_DIR, file), 'utf-8');
    console.log(`⏳ 执行: ${file}`);

    try {
      await execSQL(`BEGIN; ${sql}; INSERT INTO _migrations (name) VALUES ('${file}'); COMMIT;`);
      console.log(`   ✓ 完成`);
    } catch (err) {
      await execSQL('ROLLBACK').catch(() => {});
      console.error(`   ✗ 失败: ${err.message}`);
      process.exit(1);
    }
  }

  console.log(`\n✅ 全部迁移完成`);
}

migrate();
