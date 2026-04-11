/**
 * 数据注册表
 *
 * ── Site Data（落地页）──
 *   新增一季只需：
 *     1. 在 src/data/ 下新建 sXX.js
 *     2. 在此文件 import 并加入 siteDataMap
 *
 *   路由：/:seasonId  →  seasonId 对应此 map 的 key
 *     例如 /s01  →  Season 01 落地页
 *          /     →  默认显示最新一季
 *
 * ── Show Notes（讨论笔记）──
 *   新增一期只需：
 *     1. 在 src/data/ 下新建 epXX.js
 *     2. 在此文件 import 并加入 showNotesMap
 *
 *   路由：/show-notes/:id  →  id 对应此 map 的 key
 *     例如 /show-notes/ep01
 */

import { s01 } from './s01'
import { ep01 } from './ep01'
import { ep02 } from './ep02'
import { ep03 } from './ep03'
import { ep04 } from './ep04'
import { ep05 } from './ep05'
import { ep06 } from './ep06'
import { ep07 } from './ep07'

/* ── Site Data ── */

export const siteDataMap = {
  s01,
  // s02,  ← 下季在此追加
}

/** 默认显示最新一季（map 中最后一个 key） */
export const latestSeasonId = Object.keys(siteDataMap).at(-1)

/** 向后兼容：直接导出最新一季作为 defaultSiteData */
export const defaultSiteData = siteDataMap[latestSeasonId]

/* ── Show Notes ── */

export const showNotesMap = {
  ep01,
  ep02,
}

/** 默认显示最新一期（map 中最后一个 key） */
export const latestEpisodeId = Object.keys(showNotesMap).at(-1)
