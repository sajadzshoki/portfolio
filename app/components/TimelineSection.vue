<script setup lang="ts">
import type { TimelineItem } from '~~/shared/types'

const { t, field } = useLocale()
const { data } = usePortfolio()

function yearEnd(item: TimelineItem) {
  if (!item.yearEnd) return ''
  return /^(now|present)$/i.test(item.yearEnd) ? t.value.present : item.yearEnd
}

function yearLabel(item: TimelineItem) {
  const end = yearEnd(item)
  return end ? `${item.yearStart}—${end}` : item.yearStart
}
</script>

<template>
  <section id="studio" class="site-shell scroll-mt-24 py-24 md:py-32">
    <SectionHeader index="05" :kicker="t.experience.kicker" :title="t.experience.title" />

    <div class="grid grid-cols-12 gap-x-10 gap-y-16">
      <div class="col-span-12 lg:col-span-7">
        <p class="meta mb-8 text-signal">// {{ t.experience.work }}</p>
        <ol class="relative ms-3 border-s border-dashed border-[color-mix(in_srgb,var(--signal)_55%,transparent)] ps-8">
          <Reveal
            v-for="(item, i) in data?.experience || []"
            :key="item.id"
            as="li"
            :delay="i * 60"
            class="relative pb-10 last:pb-0"
          >
            <span
              class="absolute start-[-2.15rem] top-1.5 size-2.5 rounded-none bg-signal"
              aria-hidden="true"
            />
            <p class="font-mono text-sm tracking-tight text-signal">
              v{{ yearLabel(item) }}
            </p>
            <h3 class="mt-2 font-display text-[clamp(1.35rem,2.2vw,1.85rem)] tracking-[-0.03em] leading-tight">
              {{ field(item.titleEn, item.titleFa) }}
            </h3>
            <p class="mt-1 text-sm">
              {{ field(item.orgEn, item.orgFa) }}
              <span class="text-muted"> · {{ field(item.locationEn, item.locationFa) }}</span>
            </p>
            <p class="mt-3 text-[0.95rem] leading-relaxed text-muted">
              {{ field(item.bodyEn, item.bodyFa) }}
            </p>
          </Reveal>
        </ol>
      </div>

      <div class="col-span-12 lg:col-span-4 lg:col-start-9">
        <p class="meta mb-8 text-signal">// {{ t.experience.education }}</p>
        <ol class="space-y-4">
          <Reveal
            v-for="(item, i) in data?.education || []"
            :key="item.id"
            as="li"
            :delay="i * 60"
            class="sheet p-5"
          >
            <p class="font-mono text-sm text-signal">{{ yearLabel(item) }}</p>
            <h3 class="mt-3 font-display text-xl tracking-[-0.03em]">
              {{ field(item.titleEn, item.titleFa) }}
            </h3>
            <p class="mt-1 text-sm text-muted">
              {{ field(item.orgEn, item.orgFa) }}
              <span> · {{ field(item.locationEn, item.locationFa) }}</span>
            </p>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ field(item.bodyEn, item.bodyFa) }}
            </p>
          </Reveal>
        </ol>
      </div>
    </div>
  </section>
</template>
