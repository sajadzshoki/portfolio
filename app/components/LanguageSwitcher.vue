<script setup lang="ts">
const { locale, setLocale } = useLocale()
</script>

<template>
  <div class="inline-flex items-center rounded-full border border-line bg-surface p-0.5 text-xs font-semibold">
    <button
      type="button"
      class="rounded-full px-2.5 py-1"
      :class="locale === 'en' ? 'bg-ink text-bg' : 'text-muted'"
      :aria-pressed="locale === 'en'"
      @click="setLocale('en')"
    >
      EN
    </button>
    <button
      type="button"
      class="rounded-full px-2.5 py-1"
      :class="locale === 'fa' ? 'bg-ink text-bg' : 'text-muted'"
      :aria-pressed="locale === 'fa'"
      @click="setLocale('fa')"
    >
      فا
    </button>
  </div>
</template>
