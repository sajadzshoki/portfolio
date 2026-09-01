<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt: string
  width?: number
  height?: number
  eager?: boolean
}>(), {
  eager: false
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="eager ? 'eager' : 'lazy'"
    :decoding="eager ? 'sync' : 'async'"
    :fetchpriority="eager ? 'high' : 'auto'"
  >
</template>
