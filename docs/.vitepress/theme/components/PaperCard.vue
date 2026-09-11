<script setup lang="ts">
defineProps<{
  kicker?: string
  title: string
  href?: string
  linkLabel?: string
}>()
</script>

<template>
  <component :is="href ? 'a' : 'div'" class="fs-card" :href="href">
    <p v-if="kicker" class="fs-card-kicker">{{ kicker }}</p>
    <h3 class="fs-card-title">{{ title }}</h3>
    <p class="fs-card-text"><slot /></p>
    <span v-if="href && linkLabel" class="fs-card-more">
      {{ linkLabel }}
      <span class="fs-arrow" aria-hidden="true">→</span>
    </span>
  </component>
</template>
