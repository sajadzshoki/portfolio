<script setup lang="ts">
const { data } = usePortfolio()
const { field, t, locale } = useLocale()
const requestUrl = useRequestURL()

const projects = computed(() => data.value?.projects || [])
const name = computed(() => data.value ? field(data.value.site.nameEn, data.value.site.nameFa) : '')
const title = computed(() => `${t.value.projects.title} — ${name.value}`)

useSeoMeta({
  title,
  description: () => t.value.projects.eyebrow,
  ogTitle: title,
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${requestUrl.origin}/projects` }]
}))
</script>

<template>
  <div class="page">
    <section class="band">
      <div class="shell-wide">
        <SectionHeader :eyebrow="t.projects.eyebrow" :title="t.projects.title" />
        <ProjectShowcase v-if="projects.length" :projects="projects" />
        <p v-else class="lede">{{ t.projects.empty }}</p>
      </div>
    </section>
  </div>
</template>
