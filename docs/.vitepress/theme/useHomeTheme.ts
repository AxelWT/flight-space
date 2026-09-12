/**
 * 首页风格主题切换
 *
 * 两种首页风格：
 * - gate：门厅版式（居中 wordmark + 进入 + 四角标签 + 树影动效）
 * - paper：纸片版式（封面 / 最近更新 / 主题卡片 / 落款）
 *
 * 切换方式参考 VitePress 的浅色/深色切换：
 * 1. config.mts 的 head 里有一段内联脚本，在 Vue 挂载之前读 localStorage，
 *    把 data-home-theme 写到 <html> 上，避免闪屏。
 * 2. 本 composable 从 <html> 属性或 localStorage 读初始值，提供 reactive ref。
 * 3. 切换时同步写 localStorage + 更新 <html> 属性。
 */
import { ref, watch } from 'vue'

export type HomeTheme = 'gate' | 'paper'

const STORAGE_KEY = 'flight-space-home-theme'

function readInitial(): HomeTheme {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-home-theme')
    if (attr === 'paper' || attr === 'gate') return attr
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'paper' || stored === 'gate') return stored
    } catch {}
  }
  return 'gate'
}

const homeTheme = ref<HomeTheme>(readInitial())

if (typeof window !== 'undefined') {
  watch(homeTheme, (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, val)
    } catch {}
    document.documentElement.setAttribute('data-home-theme', val)
  })
}

export function useHomeTheme() {
  return {
    homeTheme,
    toggleHomeTheme: () => {
      homeTheme.value = homeTheme.value === 'gate' ? 'paper' : 'gate'
    },
  }
}
