<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
const { t } = useLocale()
</script>

<template>
  <button
    type="button"
    class="grid size-9 cursor-pointer place-items-center rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] text-[var(--text)]"
    :aria-label="t.theme.toggle"
    :aria-pressed="theme === 'dark'"
    @click="toggleTheme"
  >
    <svg v-if="theme === 'dark'" class="size-4" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4" />
      <path d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.4 4.4l1.3 1.3M14.3 14.3l1.3 1.3M15.6 4.4l-1.3 1.3M5.7 14.3l-1.3 1.3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </svg>
    <svg v-else class="size-4" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.5 12.2A5.2 5.2 0 0 1 7.8 5.5 5.4 5.4 0 1 0 14.5 12.2z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
    </svg>
  </button>
</template>
