<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
const { t } = useLocale()
</script>

<template>
  <button
    type="button"
    class="grid size-9 place-items-center border border-ink bg-paper font-mono text-[0.65rem] tracking-[0.08em] uppercase transition-colors hover:border-signal hover:text-signal"
    :aria-label="theme === 'dark' ? t.theme.light : t.theme.dark"
    :aria-pressed="theme === 'dark'"
    @click="toggleTheme"
  >
    {{ theme === 'dark' ? 'LT' : 'DK' }}
  </button>
</template>
