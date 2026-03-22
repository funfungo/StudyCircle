---
name: supabase-migration
description: Sync Supabase database schema when frontend form fields change. Use when adding, removing, or renaming form fields that map to database columns, or when the user mentions database migration, schema changes, or table structure updates.
---

# Supabase 数据库迁移

当前端表单字段发生变更时（新增、删除、重命名），必须同步创建数据库迁移文件并执行。

## 迁移流程

### 1. 修改前端代码

完成表单字段的增删改（如修改 `initialForm`、添加表单控件、更新 `handleSubmit` 中的 insert 数据）。

### 2. 创建迁移文件

在 `supabase/migrations/` 下新建 SQL 文件，编号递增：

```
supabase/migrations/
  0001_add_git_level.sql      ← 已有
  0002_your_change.sql        ← 新增
```

**命名规则**: `{4位递增编号}_{简短描述}.sql`

**常用 SQL 模板**:

```sql
-- 新增列
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS field_name text;

-- 删除列
ALTER TABLE registrations DROP COLUMN IF EXISTS field_name;

-- 重命名列
ALTER TABLE registrations RENAME COLUMN old_name TO new_name;

-- 修改类型
ALTER TABLE registrations ALTER COLUMN field_name TYPE integer USING field_name::integer;
```

### 3. 执行迁移

```bash
pnpm migrate
```

脚本通过 Supabase Management API (HTTPS) 执行 SQL，需要 `.env` 中配置：

- `VITE_SUPABASE_URL` — 项目 URL
- `SUPABASE_ACCESS_TOKEN` — 个人访问令牌（从 https://supabase.com/dashboard/account/tokens 获取，以 `sbp_` 开头）

### 4. 验证

迁移成功后，已执行的迁移记录在数据库 `_migrations` 表中，重复执行不会重复应用。

## 注意事项

- 每个迁移文件使用 `IF NOT EXISTS` / `IF EXISTS` 保证幂等性
- 一个迁移文件只做一件事，不要混合多个不相关的变更
- 迁移文件一旦提交并执行，不要修改其内容，需要调整请创建新的迁移文件
