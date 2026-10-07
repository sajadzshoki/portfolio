<script setup lang="ts">
const { data, error, pending } = usePortfolio()
const { field, locale } = useLocale()
const requestUrl = useRequestURL()

const site = computed(() => data.value?.site)
const title = computed(() => site.value
  ? `${field(site.value.nameEn, site.value.nameFa)} — ${field(site.value.roleEn, site.value.roleFa)}`
  : 'Front-end Developer')
const description = computed(() => site.value ? field(site.value.introEn, site.value.introFa) : '')

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US',
  twitterCard: 'summary_large_image',
  ogImage: () => site.value?.portraitUrl ? new URL(site.value.portraitUrl, requestUrl.origin).href : ''
})

useHead(() => ({
  link: [{ rel: 'canonical', href: requestUrl.origin + '/' }],
  script: site.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: field(site.value.nameEn, site.value.nameFa),
          jobTitle: field(site.value.roleEn, site.value.roleFa),
          email: site.value.email,
          address: field(site.value.locationEn, site.value.locationFa),
          image: site.value.portraitUrl ? new URL(site.value.portraitUrl, requestUrl.origin).href : undefined,
          sameAs: (data.value?.socials || []).map(item => safeHref(item.url)).filter(href => href.startsWith('http'))
        })
      }]
    : []
}))
</script>

<template>
  <div>
    <div v-if="pending && !data" class="min-h-dvh" />
    <div v-else-if="error" class="shell page">
      <h1 class="display text-[2.4rem]">Content unavailable.</h1>
    </div>
    <template v-else>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <CodeInterfaceSection />
      <AboutSection />
      <TimelineSection />
      <ContactSection />
    </template>
  </div>
</template>
