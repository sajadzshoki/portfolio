<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
</script>

<template>
  <section id="about" class="site-shell scroll-mt-24 py-24 md:py-32">
    <SectionHeader index="02" :kicker="t.about.kicker" :title="t.about.title" />

    <div class="grid grid-cols-12 gap-x-5 gap-y-10">
      <Reveal class="col-span-12 md:col-span-5">
        <h3 class="font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.035em]">
          {{ data ? field(data.about.headingEn, data.about.headingFa) : '' }}
        </h3>
      </Reveal>
      <Reveal class="col-span-12 md:col-span-6 md:col-start-7" :delay="80">
        <p class="text-[1.08rem] leading-[1.7] text-muted">
          {{ data ? field(data.about.bodyEn, data.about.bodyFa) : '' }}
        </p>
      </Reveal>
    </div>

    <ol class="mt-16 border-t-2 border-ink">
      <Reveal
        v-for="(item, i) in data?.focusAreas || []"
        :key="item.id"
        as="li"
        :delay="i * 50"
        class="grid grid-cols-12 items-baseline gap-x-4 border-b-2 border-ink py-6 md:py-8"
      >
        <span class="col-span-2 font-mono text-sm text-signal md:col-span-1">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
        <h4 class="col-span-10 font-display text-[clamp(1.35rem,2.4vw,2rem)] tracking-[-0.03em] md:col-span-4">
          {{ field(item.titleEn, item.titleFa) }}
        </h4>
        <p class="col-span-12 mt-3 text-[0.98rem] leading-relaxed text-muted md:col-span-7 md:col-start-6 md:mt-0">
          {{ field(item.bodyEn, item.bodyFa) }}
        </p>
      </Reveal>
    </ol>
  </section>
</template>
