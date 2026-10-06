<script setup lang="ts">
import type { TimelineItem } from '~~/shared/types'

const { t, field } = useLocale()
const { data } = usePortfolio()

function isPresent(value: string) {
  return /^(present|now|current|اکنون)$/i.test((value || '').trim())
}

function yearOf(value: string) {
  const match = (value || '').match(/\d{4}/)
  return match ? Number(match[0]) : 0
}

function span(item: TimelineItem) {
  const end = isPresent(item.yearEnd) ? t.value.experience.present : item.yearEnd
  return `${item.yearStart} — ${end}`
}

const stops = computed(() => {
  const work = (data.value?.experience || []).map(item => ({
    id: item.id,
    order: yearOf(item.yearStart),
    index: item.index,
    when: span(item),
    heading: field(item.orgEn, item.orgFa) || field(item.titleEn, item.titleFa),
    sub: field(item.titleEn, item.titleFa),
    body: field(item.bodyEn, item.bodyFa),
    current: isPresent(item.yearEnd)
  }))
  const study = (data.value?.education || []).map(item => ({
    id: item.id,
    order: yearOf(item.yearStart),
    index: item.index,
    when: span(item),
    heading: field(item.titleEn, item.titleFa),
    sub: field(item.orgEn, item.orgFa),
    body: field(item.bodyEn, item.bodyFa),
    current: false
  }))
  return [...study, ...work].sort((a, b) => a.order - b.order || a.index - b.index)
})
</script>

<template>
  <div v-if="stops.length" class="rail" :style="{ '--count': stops.length }">
    <article v-for="item in stops" :key="item.id">
      <span class="dot" :class="{ now: item.current }" aria-hidden="true" />
      <p class="inline-block font-mono text-[0.75rem] text-[var(--text-3)] [direction:ltr] [unicode-bidi:isolate]">{{ item.when }}</p>
      <h3 class="mt-[0.35rem] text-[1.15rem] font-[650] tracking-[-0.03em]">{{ item.heading }}</h3>
      <p v-if="item.sub && item.sub !== item.heading" class="mt-[0.35rem] text-[0.92rem] leading-[1.65] text-[var(--text-2)]">{{ item.sub }}</p>
      <p v-if="item.body" class="mt-[0.35rem] leading-[1.65] text-[var(--text-2)]">{{ item.body }}</p>
    </article>
  </div>
</template>

<style scoped>
.rail {
  display: grid;
  gap: 1.6rem;
  position: relative;
}

.rail::before {
  content: "";
  position: absolute;
  inset-inline-start: 4px;
  top: 0.35rem;
  bottom: 0.35rem;
  width: 1px;
  background: var(--line-strong);
}

article {
  position: relative;
  min-width: 0;
  padding-inline-start: 1.6rem;
}

.dot {
  position: absolute;
  inset-inline-start: 0;
  top: 0.28rem;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: 0 0 0 1px var(--text-3);
}

.dot.now {
  background: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 28%, transparent);
}

@media (min-width: 900px) {
  .rail {
    grid-template-columns: repeat(var(--count), minmax(0, 1fr));
    gap: 2rem;
    padding-top: 1.15rem;
  }

  .rail::before {
    inset-inline: 0;
    top: 0;
    bottom: auto;
    width: auto;
    height: 1px;
  }

  article {
    padding-inline-start: 0;
    padding-top: 0.35rem;
  }

  .dot {
    top: -1.15rem;
    inset-inline-start: 0;
  }
}
</style>
