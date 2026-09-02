<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const ready = ref(false)

const first = computed(() => {
  const name = data.value ? field(data.value.site.nameEn, data.value.site.nameFa) : ''
  return name.split(/\s+/)[0] || ''
})
const last = computed(() => {
  const name = data.value ? field(data.value.site.nameEn, data.value.site.nameFa) : ''
  return name.split(/\s+/).slice(1).join(' ')
})

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
})

function go(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="top"
    class="relative min-h-[100dvh] pt-16"
    :class="{ 'hero-ready': ready }"
  >
    <div class="pointer-events-none absolute inset-0 grid-lines opacity-70" />

    <div class="site-shell relative grid min-h-[calc(100dvh-4rem)] grid-cols-12 gap-x-4 pb-10 pt-8 md:pt-12">
      <div class="col-span-12 mb-6 flex items-center justify-between md:col-span-12">
        <p class="meta text-muted">
          <span class="text-signal">01</span>
          <span class="mx-2">/</span>
          <span>{{ t.hero.kicker }}</span>
        </p>
        <p class="meta text-muted">
          {{ data?.site.issue || 'Nº 04' }}
          <span class="mx-2">—</span>
          {{ t.hero.vol }}
          <span class="mx-2">—</span>
          2026
        </p>
      </div>

      <div class="col-span-12 md:col-span-8 md:row-start-2">
        <h2 class="display-name ">
          <span class="text-reveal"><span>{{ first }}</span></span>
          <span class="text-reveal" style="transition-delay: 90ms"><span>{{ last }}<span class="text-signal">.</span></span></span>
        </h2>
      </div>

      <div class="col-span-12 mt-6 md:col-span-4 md:col-start-9 md:row-start-2 md:row-span-2 md:mt-2 md:self-start">
        <div class="relative ms-auto w-[min(100%,320px)] md:w-full">
          <div class="absolute -z-0 h-full w-full translate-x-3 translate-y-3 bg-signal [dir=rtl]:-translate-x-3" />
          <figure class="img-frame relative aspect-[4/5] crop">
            <SiteImage
              v-if="data?.site.portraitUrl"
              :src="data.site.portraitUrl"
              :alt="t.hero.portrait"
              :width="720"
              :height="900"
              eager
            />
            <figcaption class="absolute inset-x-0 bottom-0 flex justify-between bg-ink px-3 py-2 text-paper">
              <span class="meta">{{ t.hero.portrait }}</span>
              <span class="meta">35MM</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div class="col-span-12 mt-10 md:col-span-7 md:mt-8">
        <p class="font-display text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.035em]">
          {{ data ? field(data.site.roleEn, data.site.roleFa) : '' }}
        </p>
        <p class="mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-muted md:text-[1.12rem]">
          {{ data ? field(data.site.introEn, data.site.introFa) : '' }}
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <SiteButton variant="primary" size="lg" magnetic @click="go('#work')">
            {{ t.hero.ctaPrimary }}
          </SiteButton>
          <SiteButton size="lg" @click="go('#contact')">
            {{ t.hero.ctaSecondary }}
          </SiteButton>
        </div>
      </div>

      <div class="col-span-12 mt-12 grid grid-cols-2 gap-px border-2 border-ink bg-ink md:col-span-12 lg:col-span-8">
        <div class="bg-paper p-4">
          <p class="meta text-muted mb-1">{{ t.available }}</p>
          <p class="font-mono text-sm">{{ data ? field(data.site.availabilityEn, data.site.availabilityFa) : '' }}</p>
        </div>
        <div class="bg-paper p-4">
          <p class="meta text-muted mb-1">{{ t.location }}</p>
          <p class="font-mono text-sm">{{ data ? field(data.site.locationEn, data.site.locationFa) : '' }}</p>
        </div>
        <div class="col-span-2 bg-paper p-4">
          <p class="meta text-muted mb-1">{{ t.stack }}</p>
          <p class="font-mono text-sm">{{ data ? field(data.site.metaEn, data.site.metaFa) : '' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
