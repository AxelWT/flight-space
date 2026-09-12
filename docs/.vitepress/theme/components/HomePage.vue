<script setup lang="ts">
/**
 * 首页包装器：根据用户选择的主题（gate / paper）渲染对应版式。
 * 主题偏好由 useHomeTheme 管理，持久化到 localStorage。
 */
import { useHomeTheme } from '../useHomeTheme'
import GateHome from './GateHome.vue'
import PaperHome from './PaperHome.vue'

defineProps<{ lang?: 'zh' | 'en' }>()

const { homeTheme } = useHomeTheme()
</script>

<template>
  <GateHome v-if="homeTheme === 'gate'" :lang="lang" />
  <PaperHome v-else :lang="lang" />
</template>
