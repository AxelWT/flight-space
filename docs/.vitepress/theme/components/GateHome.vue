<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import GateDapple from './GateDapple.vue'
import { useHomeTheme } from '../useHomeTheme'

/**
 * 首页 = 门厅，结构对齐 lefos.com：
 *   居中 wordmark → 下方一行大写「进入」 → 四角固定的小标签
 * 入场节奏也照搬：logo 0.5s、进入 1.5s、四角 2.9s，各自淡入 1 秒。
 */

const props = defineProps<{ lang?: 'zh' | 'en' }>()

const { lang, isDark } = useData()
const { toggleHomeTheme } = useHomeTheme()
const isEn = computed(() =>
  props.lang ? props.lang === 'en' : lang.value.startsWith('en')
)

const copy = computed(() =>
  isEn.value
    ? {
        brand: 'Flight Space',
        enter: 'Enter',
        enterHref: '/en/life/',
        about: 'About',
        aboutHref: '/en/about.html',
        locale: '中文',
        localeHref: '/',
        toDark: 'Dark',
        toLight: 'Light',
        toPaper: 'Paper',
      }
    : {
        brand: 'Flight Space',
        enter: '进入',
        enterHref: '/life/',
        about: '关于',
        aboutHref: '/about.html',
        locale: 'EN',
        localeHref: '/en/',
        toDark: '暗色',
        toLight: '亮色',
        toPaper: '纸片',
      }
)

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <div class="gate">
    <!-- 光与暗角 -->
    <div class="gate-shade" aria-hidden="true"></div>

    <!-- 会缓慢晃动的树叶影子 -->
    <GateDapple />

    <!-- 居中 wordmark -->
    <div class="gate-layer">
      <a class="gate-logo" :href="withBase('/')" aria-label="Flight Space">
        {{ copy.brand }}
      </a>
    </div>

    <!-- 居中后整体下移：和参考站同一个 clamp -->
    <div class="gate-layer gate-layer--enter">
      <a class="gate-enter" :href="withBase(copy.enterHref)">
        {{ copy.enter }}
      </a>
    </div>

    <!-- 四角 -->
    <div class="gate-corner gate-corner--tr">
      <a class="gate-link" :href="withBase(copy.aboutHref)">{{ copy.about }}</a>
    </div>

    <div class="gate-corner gate-corner--bl">
      <a
        class="gate-link"
        href="https://github.com/axelwt"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      <button
        class="gate-link"
        type="button"
        :aria-label="isEn ? 'Switch to paper layout' : '切换到纸片版式'"
        @click="toggleHomeTheme"
      >
        {{ copy.toPaper }}
      </button>
    </div>

    <div class="gate-corner gate-corner--br">
      <a class="gate-link" :href="withBase(copy.localeHref)">{{ copy.locale }}</a>
      <button
        class="gate-link"
        type="button"
        :aria-label="isEn ? 'Toggle colour scheme' : '切换深浅色'"
        @click="toggleTheme"
      >
        {{ isDark ? copy.toLight : copy.toDark }}
      </button>
    </div>
  </div>
</template>
