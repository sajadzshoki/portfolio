<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, statusMessage?: string } }>()
</script>

<template>
  <div class="min-h-dvh bg-paper text-ink">
    <div class="site-shell py-32">
      <p class="meta text-signal mb-4">{{ props.error?.statusCode || 500 }}</p>
      <h1 class="font-display text-6xl tracking-[-0.04em]">Page not set.</h1>
      <p class="mt-4 max-w-md text-muted">{{ props.error?.statusMessage || 'Something broke in the composing room.' }}</p>
      <SiteButton to="/" class="mt-8" variant="primary">Index</SiteButton>
    </div>
  </div>
</template>
