<script setup lang="ts">
const { data } = usePortfolio()
const { field, t, locale } = useLocale()
const requestUrl = useRequestURL()
const title = computed(() => {
  const headline = data.value ? field(data.value.site.contactTitleEn, data.value.site.contactTitleFa) : t.value.contact.title
  const name = data.value ? field(data.value.site.nameEn, data.value.site.nameFa) : ''
  return name ? `${headline} — ${name}` : headline
})

useSeoMeta({
  title,
  description: () => data.value ? field(data.value.site.contactBodyEn, data.value.site.contactBodyFa) : t.value.contact.body,
  ogTitle: title,
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${requestUrl.origin}/contact` }]
}))
</script>

<template>
  <div class="page">
    <ContactSection />
  </div>
</template>
