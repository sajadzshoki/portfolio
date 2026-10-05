<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
</script>

<template>
  <section id="about" class="site-shell scroll-mt-24 py-24 md:py-32">
    <SectionHeader index="02" :kicker="t.about.kicker" :title="t.about.title" />

    <div class="grid grid-cols-12 gap-x-5 gap-y-10">
      <Reveal class="col-span-12 md:col-span-5">
        <h3 class="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.08] tracking-[-0.035em]">
          {{ data ? field(data.about.headingEn, data.about.headingFa) : '' }}
        </h3>
      </Reveal>
      <Reveal class="col-span-12 md:col-span-6 md:col-start-7" :delay="80">
        <p class="text-[1.05rem] leading-[1.75] text-muted">
          {{ data ? field(data.about.bodyEn, data.about.bodyFa) : '' }}
        </p>
      </Reveal>
    </div>

    <ol class="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Reveal
        v-for="(item, i) in data?.focusAreas || []"
        :key="item.id"
        as="li"
        :delay="i * 50"
        class="sheet p-5 md:p-6"
      >
        <p class="meta text-signal mb-3">
          {{ String(i + 1).padStart(2, '0') }}
        </p>
        <h4 class="font-display text-[clamp(1.25rem,2vw,1.6rem)] tracking-[-0.03em]">
          {{ field(item.titleEn, item.titleFa) }}
        </h4>
        <p class="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {{ field(item.bodyEn, item.bodyFa) }}
        </p>
      </Reveal>
    </ol>
  </section>
</template>
