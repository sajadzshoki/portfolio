<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
const { t } = useLocale()
</script>

<template>
  <button
    type="button"
    class="group relative grid size-9 place-items-center border-2 border-ink bg-paper transition-colors hover:bg-ink hover:text-paper"
    :aria-label="theme === 'dark' ? t.theme.light : t.theme.dark"
    :aria-pressed="theme === 'dark'"
    @click="toggleTheme"
  >
    <span class="meta leading-none">{{ theme === 'dark' ? 'A' : 'B' }}</span>
    <span
      class="pointer-events-none absolute -bottom-1 start-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-full bg-signal opacity-0 transition-opacity group-hover:opacity-100 [dir=rtl]:translate-x-1/2"
    />
  </button>
</template>
