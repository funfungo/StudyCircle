#!/usr/bin/env bash
set -euo pipefail

ENV_ID="${CLOUDBASE_ENV_ID:-cloud1-1gwlfxy3574bdc66}"
BUILD_DIR="dist"

echo "🔨 构建项目..."
pnpm build

echo "🚀 部署到 CloudBase 静态托管 (${ENV_ID})..."
tcb hosting deploy "$BUILD_DIR" -e "$ENV_ID"

echo "🧹 刷新 CDN 缓存..."
tcb hosting cache-clear -e "$ENV_ID" || echo "⚠️  缓存刷新失败，请手动在控制台刷新"

echo "✅ 部署完成!"
echo "   环境: ${ENV_ID}"
