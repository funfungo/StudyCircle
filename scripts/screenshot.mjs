#!/usr/bin/env node

/**
 * 用法:
 *   pnpm screenshot              # 默认主题 (桌面端)
 *   pnpm screenshot dark          # 指定主题 (warm / dark / ocean)
 *   pnpm screenshot --all         # 导出所有主题 (桌面端)
 *   pnpm screenshot:mobile        # 默认主题 (移动端)
 *   pnpm screenshot:mobile dark   # 指定主题 (移动端)
 *   pnpm screenshot:mobile --all  # 导出所有主题 (移动端)
 *   pnpm screenshot:pages         # 默认主题 (3:4 逐页导出)
 *   pnpm screenshot:pages dark    # 指定主题 (3:4 逐页导出)
 *   pnpm screenshot:pages --all   # 所有主题 (3:4 逐页导出)
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

const isMobile = process.env.SCREENSHOT_MOBILE === '1'
const isPages = process.env.SCREENSHOT_PAGES === '1'
const arg = process.argv[2]

const PAGE_W = 414
const PAGE_H = 552

const VIEWPORT = isPages
  ? { width: PAGE_W, height: PAGE_H, deviceScaleFactor: 2 }
  : isMobile
    ? { width: 414, height: 896, deviceScaleFactor: 4 }
    : { width: 780, height: 600, deviceScaleFactor: 2 }

const server = await createServer({
  configFile: resolve(root, 'vite.config.js'),
  server: { port: 0 },
  logLevel: 'silent',
})
await server.listen()
const port = server.httpServer.address().port
const baseUrl = `http://localhost:${port}`

const browser = await chromium.launch()

async function openPage(id, tokens, pageUrl) {
  const page = await browser.newPage({
    viewport: { width: VIEWPORT.width, height: VIEWPORT.height },
    deviceScaleFactor: VIEWPORT.deviceScaleFactor,
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
    content: '.export-btn, .theme-toggle, .mobile-swiper__dots, .mobile-swiper__counter { display: none !important; }',
  })

  await page.waitForTimeout(800)
  return page
}

async function capture(themeId) {
  const id = themeId || themesConfig.defaultTheme
  const tokens = themesConfig.themes[id].tokens

  const page = await openPage(id, tokens, baseUrl)

  const date = new Date().toISOString().slice(0, 10)
  const suffix = isMobile ? '-mobile' : ''
  const filename = resolve(root, `LLM共学小组-${id}${suffix}-${date}.png`)

  await page.screenshot({ path: filename, fullPage: true })
  await page.close()

  console.log(`  ✓ ${filename}`)
}

async function capturePages(themeId) {
  const id = themeId || themesConfig.defaultTheme
  const tokens = themesConfig.themes[id].tokens

  const page = await openPage(id, tokens, `${baseUrl}/?view=mobile`)

  const totalSlides = await page.locator('.mobile-swiper__slide').count()
  console.log(`  共 ${totalSlides} 页`)

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

    const filename = resolve(outDir, `Frame ${i + 1}.png`)
    await mobilePage.screenshot({ path: filename })

    console.log(`  ✓ Frame ${i + 1}.png`)
  }

  await page.close()
  console.log(`  导出到 exports/${id}/`)
}

try {
  if (arg === '--all') {
    console.log(`导出所有主题 (${THEME_IDS.join(', ')})…`)
    for (const id of THEME_IDS) {
      console.log(`\n主题: ${id}`)
      if (isPages) await capturePages(id)
      else await capture(id)
    }
  } else {
    const themeId = arg && THEME_IDS.includes(arg) ? arg : null
    if (arg && !themeId) {
      console.error(`未知主题: ${arg}\n可用: ${THEME_IDS.join(', ')}`)
      process.exit(1)
    }
    const displayId = themeId || themesConfig.defaultTheme
    if (isPages) {
      console.log(`逐页导出 (3:4): ${displayId}…`)
      await capturePages(themeId)
    } else {
      console.log(`导出主题: ${displayId}…`)
      await capture(themeId)
    }
  }
  console.log('完成!')
} finally {
  await browser.close()
  await server.close()
}
