<script setup lang="ts">
const { locale, setLocale, t } = useLocale()
</script>

<template>
  <div class="inline-flex rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] p-[3px]" role="group" :aria-label="t.lang.toggle">
    <button type="button" class="h-[1.7rem] min-w-[2.1rem] cursor-pointer rounded-full border-0 bg-transparent px-[0.45rem] font-[family-name:var(--font-persian),var(--font-mono),sans-serif] text-[0.72rem] tracking-normal text-[var(--text-3)] aria-pressed:bg-[var(--text)] aria-pressed:text-[var(--bg)]" :aria-pressed="locale === 'en'" @click="setLocale('en')">{{ t.lang.en }}</button>
    <button type="button" class="h-[1.7rem] min-w-[2.1rem] cursor-pointer rounded-full border-0 bg-transparent px-[0.45rem] font-[family-name:var(--font-persian),var(--font-mono),sans-serif] text-[0.72rem] tracking-normal text-[var(--text-3)] aria-pressed:bg-[var(--text)] aria-pressed:text-[var(--bg)]" :aria-pressed="locale === 'fa'" @click="setLocale('fa')">{{ t.lang.fa }}</button>
  </div>
</template>
