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
      <NuxtLink class="back" to="/projects">{{ t.projects.back }}</NuxtLink>
      <p class="eyebrow">{{ project.year }}</p>
      <h1 class="display title">{{ titleText }}</h1>
      <p class="lede">{{ description }}</p>
      <p v-if="project.techs.length" class="stack">{{ project.techs.join(' · ') }}</p>
      <div class="actions">
        <SiteButton v-if="project.demoUrl" :href="safeHref(project.demoUrl)" variant="primary" arrow>
          {{ t.projects.demo }}
        </SiteButton>
        <SiteButton v-if="project.githubUrl" :href="safeHref(project.githubUrl)" variant="secondary">
          {{ t.projects.code }}
        </SiteButton>
      </div>

      <div class="previews">
        <LaptopFrame :src="project.imageUrl" :alt="titleText" :live="project.demoUrl ? safeHref(project.demoUrl) : ''" />
        <PhoneFrame :src="project.mobileImageUrl || project.imageUrl" :alt="titleText" :live="project.demoUrl ? safeHref(project.demoUrl) : ''" />
      </div>

      <NuxtLink v-if="next" class="next" :to="`/projects/${next.slug}`">
        <span>{{ t.projects.next }}</span>
        <strong>{{ field(next.titleEn, next.titleFa) }}</strong>
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 1.4rem;
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

html[lang="fa"] .back {
  letter-spacing: 0;
  text-transform: none;
  font-size: 0.9rem;
}

.title {
  margin-top: 0.8rem;
  font-size: clamp(3rem, 8vw, 6rem);
}

.lede,
.stack {
  margin-top: 1rem;
}

.stack {
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.82rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.4rem;
}

.previews {
  display: grid;
  gap: 1.5rem;
  align-items: end;
  margin-top: 2.5rem;
}

.previews :deep(.phone) {
  width: min(100%, 240px);
  justify-self: center;
}

.next {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
}

.next span {
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.next strong {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 650;
  letter-spacing: -0.04em;
}

@media (min-width: 900px) {
  .previews {
    grid-template-columns: minmax(0, 1fr) 230px;
  }

  .previews :deep(.phone) {
    justify-self: end;
  }
}
</style>
