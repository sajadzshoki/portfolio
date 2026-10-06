<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  lede?: string
}>()
</script>

<template>
  <header class="mb-[clamp(1.75rem,4vw,2.75rem)] grid gap-4 min-[800px]:grid-cols-[minmax(0,1fr)_auto] min-[800px]:items-end">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 class="display mt-[0.85rem] max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.6rem)]">{{ title }}</h2>
    </div>
    <p v-if="lede" class="lede min-[800px]:col-start-1">{{ lede }}</p>
    <div v-if="$slots.action" class="justify-self-start min-[800px]:col-start-2 min-[800px]:row-start-1 min-[800px]:justify-self-end">
      <slot name="action" />
    </div>
  </header>
</template>
