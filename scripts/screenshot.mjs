#!/usr/bin/env node

/**
 * 用法:
 *   pnpm screenshot              # 默认主题，所有路由 (桌面端全页长图)
 *   pnpm screenshot dark          # 指定主题
 *   pnpm screenshot --all         # 所有主题 × 所有路由
 *   pnpm screenshot:mobile        # 默认主题 (3:4 逐页切图，@4x)
 *   pnpm screenshot:mobile --all  # 所有主题 (3:4 逐页切图，@4x)
 *   pnpm screenshot:pages         # 默认主题 (3:4 逐页切图，@3x)
 *   pnpm screenshot:pages --all   # 所有主题 (3:4 逐页切图，@3x)
 *
 * 路由配置:
 *   ROUTE_CONFIGS 控制导出哪些页面。
 *   paged: true  → 有 MobileSwiper，mobile/pages 模式以 ?view=mobile 逐 slide 导出
 *   paged: false → 无 Swiper，mobile/pages 模式按滚动逐屏切成 3:4 帧导出
 */

import { chromium } from 'playwright'
import { createServer } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const themesConfig = JSON.parse(
  readFileSync(resolve(root, 'src/themes.json'), 'utf-8'),
)
const THEME_IDS = Object.keys(themesConfig.themes)

/* ── 路由配置 ──────────────────────────────────────
 * name:  文件名前缀
 * path:  页面路由
 * paged: 是否有 MobileSwiper 翻页视图（mobile/pages 模式时逐页导出）
 * ────────────────────────────────────────────────── */
const ROUTE_CONFIGS = [
  { name: '首页-S01', path: '/s01', paged: true },
  { name: 'ShowNotes-EP01', path: '/show-notes/ep01', paged: true },
  // { name: '首页-S02', path: '/s02', paged: true },
  // { name: 'ShowNotes-EP02', path: '/show-notes/ep02' },
]

const isPaged = process.env.SCREENSHOT_PAGES === '1'
const arg = process.argv[2]

const PAGE_W = 414
const PAGE_H = 552

const VIEWPORT_DESKTOP = { width: 780, height: 600, deviceScaleFactor: 3 }
const VIEWPORT_PAGED = {
  width: PAGE_W,
  height: PAGE_H,
  deviceScaleFactor: isMobile ? 4 : 3,
}

const server = await createServer({
  configFile: resolve(root, 'vite.config.js'),
  server: { port: 0 },
  logLevel: 'silent',
})
await server.listen()
const port = server.httpServer.address().port
const baseUrl = `http://localhost:${port}`

const browser = await chromium.launch()

async function openPage(id, tokens, pageUrl, viewport) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
  })

  await page.addInitScript(
    ({ id, tokens }) => {
      localStorage.setItem('theme', id)
      localStorage.setItem('theme-tokens', JSON.stringify(tokens))
    },
    { id, tokens },
  )

  await page.goto(pageUrl, { waitUntil: 'networkidle' })

  await page.addStyleTag({
    content: '.export-btn, .theme-toggle, .mobile-swiper__dots, .mobile-swiper__counter, .devtools { display: none !important; }',
  })

  await page.waitForTimeout(800)
  return page
}

/** 全页长图截图 */
async function captureFullPage(themeId, route, viewport) {
  const id = themeId || themesConfig.defaultTheme
  const tokens = themesConfig.themes[id].tokens

  const page = await openPage(id, tokens, `${baseUrl}${route.path}`, viewport)

  const date = new Date().toISOString().slice(0, 10)
  const filename = resolve(root, `exports/${id}/${route.name}-${date}.png`)

  mkdirSync(dirname(filename), { recursive: true })
  await page.screenshot({ path: filename, fullPage: true })
  await page.close()

  console.log(`  ✓ ${route.name}.png`)
}

/** 3:4 逐页切图（MobileSwiper） */
async function captureSlides(themeId, route) {
  const id = themeId || themesConfig.defaultTheme
  const tokens = themesConfig.themes[id].tokens

  const page = await openPage(
    id, tokens,
    `${baseUrl}${route.path}?view=mobile`,
    VIEWPORT_PAGED,
  )

  const totalSlides = await page.locator('.mobile-swiper__slide').count()
  console.log(`  ${route.name}: ${totalSlides} 页`)

  const date = new Date().toISOString().slice(0, 10)
  const outDir = resolve(root, `exports/${id}`)
  mkdirSync(outDir, { recursive: true })

  for (let i = 0; i < totalSlides; i++) {
    await page.evaluate((idx) => {
      const track = document.querySelector('.mobile-swiper__track')
      track.style.transition = 'none'
      track.style.transform = `translateY(-${idx * 100}%)`
    }, i)

    await page.waitForTimeout(100)

    const slide = page.locator('.mobile-swiper__slide').nth(i)
    const mobilePage = slide.locator('.mobile-page')

    const filename = resolve(outDir, `${route.name}-${i + 1}-${date}.png`)
    await mobilePage.screenshot({ path: filename })

    console.log(`  ✓ ${route.name}-${i + 1}.png`)
  }

  await page.close()
}

/** 3:4 逐屏滚动切图（无 Swiper 的普通长页面） */
async function captureScrollFrames(themeId, route) {
  const id = themeId || themesConfig.defaultTheme
  const tokens = themesConfig.themes[id].tokens

  const page = await openPage(id, tokens, `${baseUrl}${route.path}?view=mobile`, VIEWPORT_PAGED)

  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const frameH = VIEWPORT_PAGED.height
  const totalFrames = Math.ceil(fullHeight / frameH)
  console.log(`  ${route.name}: ${totalFrames} 页 (${fullHeight}px)`)

  const date = new Date().toISOString().slice(0, 10)
  const outDir = resolve(root, `exports/${id}`)
  mkdirSync(outDir, { recursive: true })

  for (let i = 0; i < totalFrames; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * frameH)
    await page.waitForTimeout(200)

    const filename = resolve(outDir, `${route.name}-${i + 1}-${date}.png`)
    await page.screenshot({
      path: filename,
      clip: { x: 0, y: 0, width: VIEWPORT_PAGED.width, height: frameH },
    })

    console.log(`  ✓ ${route.name}-${i + 1}.png`)
  }

  await page.close()
}

/** 根据模式和路由配置选择截图方式 */
async function captureRoute(themeId, route) {
  if (isPaged && route.paged) {
    await captureSlides(themeId, route)
  } else if (isPaged) {
    await captureScrollFrames(themeId, route)
  } else {
    await captureFullPage(themeId, route, VIEWPORT_DESKTOP)
  }
}

async function captureAllRoutes(themeId) {
  for (const route of ROUTE_CONFIGS) {
    await captureRoute(themeId, route)
  }
}

try {
  if (arg === '--all') {
    console.log(`导出所有主题 (${THEME_IDS.join(', ')})…`)
    for (const id of THEME_IDS) {
      console.log(`\n主题: ${id}`)
      await captureAllRoutes(id)
    }
  } else {
    const themeId = arg && THEME_IDS.includes(arg) ? arg : null
    if (arg && !themeId) {
      console.error(`未知主题: ${arg}\n可用: ${THEME_IDS.join(', ')}`)
      process.exit(1)
    }
    const displayId = themeId || themesConfig.defaultTheme
    const mode = isPaged ? '3:4 逐页切图' : '桌面端全页长图'
    console.log(`${mode}: ${displayId}`)
    console.log(`  路由: ${ROUTE_CONFIGS.map(r => r.path).join(', ')}`)
    await captureAllRoutes(themeId)
  }
  console.log('\n完成!')
} finally {
  await browser.close()
  await server.close()
}
