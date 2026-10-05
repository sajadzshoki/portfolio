<script setup lang="ts">
const { data, error, pending } = usePortfolio()
const { t, field } = useLocale()
const requestUrl = useRequestURL()

useSeoMeta({
  title: () => 'SAZAN — Digital Product Studio',
  description: () => t.value.hero.lede,
  ogTitle: () => 'SAZAN — Digital Product Studio',
  ogDescription: () => t.value.hero.lede,
  ogType: 'website'
})

useHead(() => {
  if (!data.value) return {}
  const origin = requestUrl.origin
  return {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'SAZAN',
          description: t.value.hero.lede,
          email: data.value.site.email,
          url: origin,
          founder: {
            '@type': 'Person',
            name: field(data.value.site.nameEn, data.value.site.nameFa)
          },
          areaServed: field(data.value.site.locationEn, data.value.site.locationFa)
        })
      }
    ]
  }
})
</script>

<template>
  <div>
    <div v-if="pending && !data" class="min-h-[70dvh]" />
    <div v-else-if="error || !data" class="sz-wrap py-32">
      <h1 class="sz-title">Content unavailable.</h1>
      <p class="mt-3 text-muted">Seed the database: <span class="font-mono">npm run db:setup</span></p>
    </div>
    <template v-else>
      <SazanHero />
      <SazanTechStack />
      <SazanIntro />
      <SazanProjectCarousel />
      <SazanServices />
      <SazanProcess />
      <SazanEngineering />
      <SazanAboutBand />
      <SazanCta />
    </template>
  </div>
</template>
