<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, statusMessage?: string } }>()
const { t } = useLocale()

function home() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="shell">
      <p class="eyebrow">{{ props.error?.statusCode || 500 }}</p>
      <h1 class="display">{{ t.error.title }}</h1>
      <p class="lede">{{ props.error?.statusMessage || t.error.body }}</p>
      <button type="button" class="site-btn site-btn-primary" @click="home">{{ t.error.home }}</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: grid;
  min-height: 100dvh;
  align-items: center;
  background: var(--bg);
  color: var(--text);
}

.display {
  margin-top: 0.8rem;
  font-size: clamp(2.6rem, 7vw, 5rem);
  max-width: 12ch;
}

.lede {
  margin-top: 1rem;
}

.site-btn {
  margin-top: 1.5rem;
}
</style>
