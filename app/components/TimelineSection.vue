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

    <div class="grid grid-cols-12 gap-x-8 gap-y-16">
      <div class="col-span-12 lg:col-span-7">
        <p class="meta mb-6 text-signal">{{ t.experience.work }}</p>
        <ol>
          <Reveal
            v-for="(item, i) in data?.experience || []"
            :key="item.id"
            as="li"
            :delay="i * 60"
            class="grid grid-cols-12 gap-4 border-t-2 border-ink py-8 first:border-t-2"
          >
            <div class="col-span-12 md:col-span-4">
              <p class="font-mono text-[clamp(1.6rem,3vw,2.4rem)] leading-none tracking-[-0.04em]">
                {{ yearLabel(item) }}
              </p>
            </div>
            <div class="col-span-12 md:col-span-8">
              <h3 class="font-display text-[clamp(1.4rem,2.4vw,2rem)] tracking-[-0.03em] leading-tight">
                {{ field(item.titleEn, item.titleFa) }}
              </h3>
              <p class="mt-1 text-[0.98rem]">
                {{ field(item.orgEn, item.orgFa) }}
                <span class="text-muted"> · {{ field(item.locationEn, item.locationFa) }}</span>
              </p>
              <p class="mt-3 text-[0.98rem] leading-relaxed text-muted">
                {{ field(item.bodyEn, item.bodyFa) }}
              </p>
            </div>
          </Reveal>
        </ol>
      </div>

      <div class="col-span-12 lg:col-span-4 lg:col-start-9">
        <p class="meta mb-6 text-signal">{{ t.experience.education }}</p>
        <ol>
          <Reveal
            v-for="(item, i) in data?.education || []"
            :key="item.id"
            as="li"
            :delay="i * 60"
            class="border-t-2 border-ink py-8"
          >
            <p class="font-mono text-2xl tracking-[-0.04em]">{{ yearLabel(item) }}</p>
            <h3 class="mt-3 font-display text-xl tracking-[-0.03em]">
              {{ field(item.titleEn, item.titleFa) }}
            </h3>
            <p class="mt-1 text-sm">
              {{ field(item.orgEn, item.orgFa) }}
              <span class="text-muted"> · {{ field(item.locationEn, item.locationFa) }}</span>
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
