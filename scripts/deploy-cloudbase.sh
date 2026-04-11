#!/usr/bin/env bash
set -euo pipefail

ENV_ID="${CLOUDBASE_ENV_ID:-cloud1-1gwlfxy3574bdc66}"
BUILD_DIR="dist"

echo "🔨 构建项目..."
pnpm build

echo "🗑️  删除远端旧 index.html（避免 CDN 缓存）..."
tcb hosting delete index.html -e "$ENV_ID" 2>/dev/null || true

echo "🚀 部署到 CloudBase 静态托管 (${ENV_ID})..."
tcb hosting deploy "$BUILD_DIR" -e "$ENV_ID"

echo "✅ 部署完成!"
echo "   环境: ${ENV_ID}"
