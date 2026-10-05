<script setup lang="ts">
const { locale, t } = useLocale()
const { theme } = useTheme()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'fa' ? 'rtl' : 'ltr',
    class: theme.value === 'dark' ? 'dark' : ''
  }
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
