<script setup lang="ts">
defineProps<{ back?: boolean }>()
</script>

<template>
  <svg class="sz-arrow" :class="{ 'sz-arrow-back': back }" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M3 8h10M9.2 4.2 13 8l-3.8 3.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
