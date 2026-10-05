<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, statusMessage?: string } }>()
</script>

<template>
  <div class="relative min-h-dvh overflow-hidden bg-paper text-ink">
    <div class="pointer-events-none absolute inset-0 grid-lines opacity-50" />
    <div class="site-shell relative py-32">
      <p class="meta text-signal mb-4">
        err {{ props.error?.statusCode || 500 }}
      </p>
      <h1 class="font-display text-6xl tracking-[-0.04em]">
        Process exited.
      </h1>
      <p class="mt-4 max-w-md font-mono text-sm text-muted">
        {{ props.error?.statusMessage || 'Something broke in the build pipeline.' }}
      </p>
      <SiteButton to="/" class="mt-8" variant="primary">~/home</SiteButton>
    </div>
  </div>
</template>
