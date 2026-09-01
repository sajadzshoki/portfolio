<script setup lang="ts">
const { locale, setLocale } = useLocale()
</script>

<template>
  <div class="flex items-center gap-1 font-mono text-[0.7rem] font-medium tracking-[0.14em] uppercase">
    <button
      type="button"
      class="px-1.5 py-1 transition-colors"
      :class="locale === 'en' ? 'text-ink' : 'text-muted hover:text-ink'"
      :aria-pressed="locale === 'en'"
      @click="setLocale('en')"
    >
      EN
    </button>
    <span class="text-muted">—</span>
    <button
      type="button"
      class="px-1.5 py-1 transition-colors"
      :class="locale === 'fa' ? 'text-ink' : 'text-muted hover:text-ink'"
      :aria-pressed="locale === 'fa'"
      @click="setLocale('fa')"
    >
      FA
    </button>
  </div>
</template>
