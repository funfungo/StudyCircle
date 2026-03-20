#!/usr/bin/env node

/**
 * 用法:
 *   pnpm screenshot              # 默认主题 (桌面端)
 *   pnpm screenshot dark          # 指定主题 (warm / dark / ocean)
 *   pnpm screenshot --all         # 导出所有主题 (桌面端)
 *   pnpm screenshot:mobile        # 默认主题 (移动端)
 *   pnpm screenshot:mobile dark   # 指定主题 (移动端)
 *   pnpm screenshot:mobile --all  # 导出所有主题 (移动端)
 */

import { chromium } from 'playwright'
import { createServer } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const themesConfig = JSON.parse(
  readFileSync(resolve(root, 'src/themes.json'), 'utf-8'),
)
const THEME_IDS = Object.keys(themesConfig.themes)

const isMobile = process.env.SCREENSHOT_MOBILE === '1'
const arg = process.argv[2]

const VIEWPORT = isMobile
  ? { width: 414, height: 896, deviceScaleFactor: 3 }
  : { width: 780, height: 600, deviceScaleFactor: 2 }

const server = await createServer({
  configFile: resolve(root, 'vite.config.js'),
  server: { port: 0 },
  logLevel: 'silent',
})
await server.listen()
const port = server.httpServer.address().port
const url = `http://localhost:${port}`

const browser = await chromium.launch()

async function capture(themeId) {
  const id = themeId || themesConfig.defaultTheme
  const tokens = themesConfig.themes[id].tokens

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

  await page.goto(url, { waitUntil: 'networkidle' })

  await page.addStyleTag({
    content: '.export-btn, .theme-toggle { display: none !important; }',
  })

  await page.waitForTimeout(800)

  const date = new Date().toISOString().slice(0, 10)
  const suffix = isMobile ? '-mobile' : ''
  const filename = resolve(root, `LLM共学小组-${id}${suffix}-${date}.png`)

  await page.screenshot({ path: filename, fullPage: true })
  await page.close()

  console.log(`  ✓ ${filename}`)
}

try {
  if (arg === '--all') {
    console.log(`导出所有主题 (${THEME_IDS.join(', ')})…`)
    for (const id of THEME_IDS) await capture(id)
  } else {
    const themeId = arg && THEME_IDS.includes(arg) ? arg : null
    if (arg && !themeId) {
      console.error(`未知主题: ${arg}\n可用: ${THEME_IDS.join(', ')}`)
      process.exit(1)
    }
    console.log(`导出主题: ${themeId || themesConfig.defaultTheme}…`)
    await capture(themeId)
  }
  console.log('完成!')
} finally {
  await browser.close()
  await server.close()
}
