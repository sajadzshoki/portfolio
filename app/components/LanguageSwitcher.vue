<script setup lang="ts">
const { locale, setLocale, t } = useLocale()
</script>

<template>
  <div class="lang" role="group" :aria-label="t.lang.toggle">
    <button type="button" :aria-pressed="locale === 'en'" @click="setLocale('en')">{{ t.lang.en }}</button>
    <button type="button" :aria-pressed="locale === 'fa'" @click="setLocale('fa')">{{ t.lang.fa }}</button>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 70%, transparent);
}

.lang button {
  min-width: 2.1rem;
  height: 1.7rem;
  padding-inline: 0.45rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-3);
  font-family: var(--font-persian), var(--font-mono), sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0;
  cursor: pointer;
}

.lang button[aria-pressed="true"] {
  background: var(--text);
  color: var(--bg);
}
</style>
