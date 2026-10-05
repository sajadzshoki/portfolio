<script setup lang="ts">
import type { Project } from '~~/shared/types'
import { isExternal, localNum, padNum, safeHref } from '~/utils/studio'

const props = defineProps<{
  project: Project
  index: number
  total: number
}>()

const { t, field, locale } = useLocale()
const title = computed(() => field(props.project.titleEn, props.project.titleFa))
</script>

<template>
  <div class="grid gap-4 border-t border-line pt-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-end md:gap-6 md:pt-6">
    <p class="font-mono text-sm text-muted">
      <span class="text-primary">{{ padNum(index + 1, locale) }}</span>
      <span class="mx-1">/</span>
      {{ padNum(total, locale) }}
    </p>
    <div>
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 class="font-display text-2xl tracking-[-0.04em] md:text-4xl">{{ title }}</h3>
        <span class="text-sm text-muted">{{ localNum(project.year, locale) }}</span>
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
      <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
        {{ field(project.descriptionEn, project.descriptionFa) }}
      </p>
      <ul class="mt-4 flex flex-wrap gap-2">
        <li
          v-for="tech in project.techs"
          :key="tech"
          class="rounded-full border border-line bg-surface px-2.5 py-1 text-[0.75rem] text-muted"
        >
          {{ tech }}
        </li>
      </ul>
    </div>
    <div class="flex flex-wrap gap-4 md:justify-end">
      <NuxtLink :to="`/work/${project.slug}`" class="inline-flex items-center gap-2 text-sm font-semibold">
        {{ t.work.case }}
        <SazanArrow />
      </NuxtLink>
      <a
        v-if="project.githubUrl"
        :href="safeHref(project.githubUrl)"
        class="text-sm text-muted hover:text-ink"
        :target="isExternal(project.githubUrl) ? '_blank' : undefined"
        rel="noopener noreferrer"
      >
        {{ t.work.code }}
      </a>
    </div>
  </div>
</template>
