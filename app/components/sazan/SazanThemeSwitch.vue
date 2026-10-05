<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
const { t } = useLocale()

function onToggle(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
}
</script>

<template>
  <button
    type="button"
    class="sz-theme"
    role="switch"
    :aria-checked="theme === 'dark'"
    :aria-label="theme === 'dark' ? t.theme.light : t.theme.dark"
    @click="onToggle"
  >
    <span class="sz-theme-knob">
      <svg class="sz-theme-glyph sz-theme-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.8" />
        <path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
      </svg>
      <svg class="sz-theme-glyph sz-theme-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M15.5 3.8A7.8 7.8 0 1 0 20.2 15 6.2 6.2 0 0 1 15.5 3.8Z" />
      </svg>
    </span>
  </button>
</template>
