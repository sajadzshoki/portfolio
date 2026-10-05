<script setup lang="ts">
const { data } = usePortfolio()
const { field, t, locale } = useLocale()
const requestUrl = useRequestURL()
const title = computed(() => data.value ? `${t.value.skills.title} — ${field(data.value.site.nameEn, data.value.site.nameFa)}` : t.value.skills.title)

useSeoMeta({
  title,
  description: () => t.value.skills.lede,
  ogTitle: title,
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${requestUrl.origin}/skills` }]
}))
</script>

<template>
  <div class="page">
    <SkillsSection :featured="false" />
  </div>
</template>
