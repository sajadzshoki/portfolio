<script setup lang="ts">
const { locale, t, field } = useLocale()
const { data } = usePortfolio()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'fa' ? 'rtl' : 'ltr'
  },
  title: data.value
    ? `${field(data.value.site.nameEn, data.value.site.nameFa)} — ${field(data.value.site.roleEn, data.value.site.roleFa)}`
    : undefined
}))
</script>

<template>
  <div>
    <a href="#main" class="skip-link">{{ t.skip }}</a>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
