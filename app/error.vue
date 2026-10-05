<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, statusMessage?: string } }>()
const { t } = useLocale()
</script>

<template>
  <div class="min-h-dvh bg-bg text-ink">
    <div class="sz-wrap py-24">
      <NuxtLink to="/" class="inline-flex items-center gap-2 font-display text-lg font-semibold">
        <span class="text-primary"><SazanMark /></span>
        SAZAN
      </NuxtLink>
      <p class="mt-16 font-mono text-sm text-primary">{{ props.error?.statusCode || 500 }}</p>
      <h1 class="sz-title mt-3 max-w-xl">{{ t.error.title }}</h1>
      <p class="mt-4 max-w-md text-muted">{{ props.error?.statusMessage || t.error.body }}</p>
      <SiteButton to="/" class="mt-8" variant="primary">{{ t.error.home }}</SiteButton>
    </div>
  </div>
</template>
