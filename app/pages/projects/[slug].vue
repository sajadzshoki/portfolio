<script setup lang="ts">
const route = useRoute()
const { data } = await usePortfolio()
const { field, t, locale } = useLocale()
const requestUrl = useRequestURL()

const slug = computed(() => String(route.params.slug || ''))
const projects = computed(() => data.value?.projects || [])
const project = computed(() => projects.value.find(item => item.slug === slug.value) || null)
const next = computed(() => {
  const index = projects.value.findIndex(item => item.slug === slug.value)
  if (index < 0 || projects.value.length < 2) return null
  return projects.value[(index + 1) % projects.value.length]
})

if (data.value && !project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const titleText = computed(() => project.value ? field(project.value.titleEn, project.value.titleFa) : '')
const description = computed(() => project.value ? field(project.value.descriptionEn, project.value.descriptionFa) : '')
const pageTitle = computed(() => data.value ? `${titleText.value} — ${field(data.value.site.nameEn, data.value.site.nameFa)}` : titleText.value)

useSeoMeta({
  title: pageTitle,
  description,
  ogTitle: pageTitle,
  ogDescription: description,
  ogType: 'article',
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US',
  ogImage: () => project.value?.imageUrl ? new URL(project.value.imageUrl, requestUrl.origin).href : ''
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${requestUrl.origin}/projects/${slug.value}` }]
}))
</script>

<template>
  <article v-if="project" class="page">
    <div class="shell-wide">
      <NuxtLink class="mb-[1.4rem] inline-block font-mono text-[0.75rem] tracking-[0.08em] text-[var(--text-3)] uppercase fa:text-[0.9rem] fa:tracking-normal fa:normal-case" to="/projects">{{ t.projects.back }}</NuxtLink>
      <p class="eyebrow">{{ project.year }}</p>
      <h1 class="display mt-[0.8rem] text-[clamp(3rem,8vw,6rem)]">{{ titleText }}</h1>
      <p class="lede mt-4">{{ description }}</p>
      <p v-if="project.techs.length" class="mt-4 font-mono text-[0.82rem] text-[var(--text-3)]">{{ project.techs.join(' · ') }}</p>
      <div class="mt-[1.4rem] flex flex-wrap gap-[0.6rem]">
        <SiteButton v-if="project.demoUrl" :href="safeHref(project.demoUrl)" variant="primary" arrow>
          {{ t.projects.demo }}
        </SiteButton>
        <SiteButton v-if="project.githubUrl" :href="safeHref(project.githubUrl)" variant="secondary">
          {{ t.projects.code }}
        </SiteButton>
      </div>

      <div class="mt-10 grid items-end gap-6 min-[900px]:grid-cols-[minmax(0,1fr)_230px]">
        <LaptopFrame :src="project.imageUrl" :alt="titleText" :live="project.demoUrl ? safeHref(project.demoUrl) : ''" />
        <PhoneFrame class="w-[min(100%,240px)] justify-self-center min-[900px]:justify-self-end" :src="project.mobileImageUrl || project.imageUrl" :alt="titleText" :live="project.demoUrl ? safeHref(project.demoUrl) : ''" />
      </div>

      <NuxtLink v-if="next" class="mt-12 flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-[1.2rem]" :to="`/projects/${next.slug}`">
        <span class="font-mono text-[0.75rem] tracking-[0.1em] text-[var(--text-3)] uppercase">{{ t.projects.next }}</span>
        <strong class="text-[clamp(1.6rem,3vw,2.4rem)] font-[650] tracking-[-0.04em] [font-family:var(--font-display)]">{{ field(next.titleEn, next.titleFa) }}</strong>
      </NuxtLink>
    </div>
  </article>
</template>
