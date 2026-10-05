<script setup lang="ts">
import { localNum, safeHref } from '~/utils/studio'

const { data, pending, error } = usePortfolio()
const { t, field, locale } = useLocale()

useSeoMeta({
  title: () => `${t.value.work.pageTitle} — SAZAN`,
  description: () => t.value.work.pageLede,
  ogTitle: () => `${t.value.work.pageTitle} — SAZAN`,
  ogDescription: () => t.value.work.pageLede
})
</script>

<template>
  <div class="sz-wrap py-8 md:py-16">
    <SazanSectionLabel :text="t.work.eyebrow" />
    <h1 class="sz-title mt-4 max-w-3xl">{{ t.work.pageTitle }}</h1>
    <p class="sz-lede mt-4">{{ t.work.pageLede }}</p>

    <p v-if="pending && !data" class="mt-16 text-muted">…</p>
    <p v-else-if="error" class="mt-16 text-muted">Content unavailable.</p>
    <p v-else-if="!data?.projects.length" class="mt-16 text-muted">{{ t.work.empty }}</p>

    <div v-else class="mt-8 space-y-10 md:mt-14 md:space-y-20">
      <article
        v-for="(project, i) in data.projects"
        :key="project.id"
        class="grid items-center gap-5 border-t border-line pt-6 lg:grid-cols-2 md:gap-8 md:pt-10"
      >
        <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
          <SazanDeviceFrame
            :type="project.descriptionEn.toLowerCase().includes('capacitor') ? 'phone' : 'laptop'"
            :src="project.imageUrl"
            :alt="field(project.titleEn, project.titleFa)"
            :title="field(project.titleEn, project.titleFa)"
          />
        </div>
        <div>
          <p class="font-mono text-xs text-primary">{{ localNum(project.year, locale) }}</p>
          <h2 class="mt-2 font-display text-2xl tracking-[-0.04em] md:text-4xl">
            {{ field(project.titleEn, project.titleFa) }}
          </h2>
          <p class="mt-4 text-muted leading-relaxed">
            {{ field(project.descriptionEn, project.descriptionFa) }}
          </p>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="tech in project.techs" :key="tech" class="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              {{ tech }}
            </li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-4">
            <NuxtLink :to="`/work/${project.slug}`" class="inline-flex items-center gap-2 text-sm font-semibold">
              {{ t.work.case }}
              <SazanArrow />
            </NuxtLink>
            <a
              v-if="project.demoUrl"
              :href="safeHref(project.demoUrl)"
              class="text-sm text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t.work.open }}
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
