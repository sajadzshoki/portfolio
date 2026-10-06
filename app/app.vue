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
    <a href="#main" class="skip-link absolute start-4 -top-16 z-[100] rounded-lg bg-[var(--text)] px-[0.9rem] py-[0.6rem] text-[var(--bg)] focus:top-4">{{ t.skip }}</a>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
