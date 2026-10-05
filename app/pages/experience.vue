<script setup lang="ts">
const { data } = usePortfolio()
const { field, t, locale } = useLocale()
const requestUrl = useRequestURL()
const title = computed(() => data.value ? `${t.value.experience.title} — ${field(data.value.site.nameEn, data.value.site.nameFa)}` : t.value.experience.title)

useSeoMeta({
  title,
  description: () => data.value?.experience[0] ? field(data.value.experience[0].bodyEn, data.value.experience[0].bodyFa) : t.value.experience.title,
  ogTitle: title,
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${requestUrl.origin}/experience` }]
}))
</script>

<template>
  <div class="page">
    <TimelineSection />
  </div>
</template>
