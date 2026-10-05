<script setup lang="ts">
const { data } = usePortfolio()
const { field, locale } = useLocale()
const requestUrl = useRequestURL()

const title = computed(() => data.value
  ? `${field(data.value.about.headingEn, data.value.about.headingFa)} — ${field(data.value.site.nameEn, data.value.site.nameFa)}`
  : 'About')

useSeoMeta({
  title,
  description: () => data.value ? field(data.value.about.bodyEn, data.value.about.bodyFa) : '',
  ogTitle: title,
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${requestUrl.origin}/about` }]
}))
</script>

<template>
  <div class="page">
    <AboutSection :featured="false" />
  </div>
</template>
