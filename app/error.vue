<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, statusMessage?: string } }>()
const { t } = useLocale()

function home() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="grid min-h-dvh items-center bg-[var(--bg)] text-[var(--text)]">
    <div class="shell">
      <p class="eyebrow">{{ props.error?.statusCode || 500 }}</p>
      <h1 class="display mt-[0.8rem] max-w-[12ch] text-[clamp(2.6rem,7vw,5rem)]">{{ t.error.title }}</h1>
      <p class="lede mt-4">{{ props.error?.statusMessage || t.error.body }}</p>
      <button type="button" class="site-btn site-btn-primary mt-6" @click="home">{{ t.error.home }}</button>
    </div>
  </div>
</template>
