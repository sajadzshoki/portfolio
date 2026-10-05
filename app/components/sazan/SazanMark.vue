<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 36 })
</script>

<template>
  <img
    src="/images/sazan-mark.png"
    alt=""
    :width="size"
    :height="size"
    class="sz-brand-mark"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
</template>

<style>
.sz-brand-mark {
  display: block;
  flex: none;
  object-fit: contain;
}
</style>
