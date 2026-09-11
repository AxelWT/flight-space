<script setup lang="ts">
defineProps<{ count?: string | number }>()
</script>

<template>
  <p class="fs-label">
    <span><slot /></span>
    <span v-if="count !== undefined" class="fs-label-count">{{ count }}</span>
  </p>
</template>
