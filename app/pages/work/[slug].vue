<script setup lang="ts">
import { deviceForSpan, localNum, productShape, safeHref, spanFor, type ViewportMode } from '~/utils/studio'

const route = useRoute()
const { data, pending } = usePortfolio()
const { t, field, locale } = useLocale()

const project = computed(() => data.value?.projects.find(item => item.slug === route.params.slug))
const index = computed(() => data.value?.projects.findIndex(item => item.slug === route.params.slug) ?? -1)
const nextProject = computed(() => {
  const list = data.value?.projects || []
  if (index.value < 0 || list.length < 2) return null
  return list[(index.value + 1) % list.length]
})

const span = ref(100)
const live = ref(false)
const compact = ref(false)
const device = computed(() => compact.value ? 'phone' : deviceForSpan(span.value))

function setMode(mode: ViewportMode) {
  span.value = spanFor(mode)
}

watch(project, (value) => {
  if (!value) return
  span.value = productShape(value) === 'mobile' ? spanFor('mobile') : spanFor('desktop')
  live.value = false
}, { immediate: true })

let stopWatching: (() => void) | null = null

onMounted(() => {
  const query = window.matchMedia('(max-width: 767px)')
  const apply = () => { compact.value = query.matches }
  apply()
  query.addEventListener('change', apply)
  stopWatching = () => query.removeEventListener('change', apply)
})

onBeforeUnmount(() => stopWatching?.())

const title = computed(() => project.value ? field(project.value.titleEn, project.value.titleFa) : t.value.work.missingProject)

useSeoMeta({
  title: () => `${title.value} — SAZAN`,
  description: () => project.value ? field(project.value.descriptionEn, project.value.descriptionFa) : t.value.work.pageLede,
  ogTitle: () => `${title.value} — SAZAN`,
  ogDescription: () => project.value ? field(project.value.descriptionEn, project.value.descriptionFa) : t.value.work.pageLede
})
</script>

<template>
  <div class="sz-wrap py-8 md:py-16">
    <p v-if="pending && !data" class="text-muted">…</p>
    <div v-else-if="!project" class="py-20">
      <h1 class="sz-title">{{ t.work.missingProject }}</h1>
      <NuxtLink to="/work" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
        <SazanArrow back />
        {{ t.work.back }}
      </NuxtLink>
    </div>
    <template v-else>
      <NuxtLink to="/work" class="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <SazanArrow back />
        {{ t.work.back }}
      </NuxtLink>

      <p class="sz-kicker mt-5 md:mt-8">{{ localNum(project.year, locale) }}</p>
      <h1 class="sz-hero-title mt-3 max-w-4xl md:mt-4">{{ title }}</h1>
      <p class="sz-lede mt-3 md:mt-5">{{ field(project.descriptionEn, project.descriptionFa) }}</p>

      <div class="mt-6 flex flex-wrap items-center justify-between gap-3 md:mt-10">
        <button
          type="button"
          class="sz-live"
          :aria-pressed="live"
          :disabled="!project.demoUrl"
          @click="live = !live"
        >
          <i />
          {{ project.demoUrl ? t.work.live : t.work.preview }}
        </button>
        <div v-if="!compact" class="sz-seg">
          <button type="button" :aria-pressed="device === 'laptop'" @click="setMode('desktop')">{{ t.work.desktop }}</button>
          <button type="button" :aria-pressed="device === 'tablet'" @click="setMode('tablet')">{{ t.work.tablet }}</button>
          <button type="button" :aria-pressed="device === 'phone'" @click="setMode('mobile')">{{ t.work.mobile }}</button>
        </div>
      </div>

      <div v-if="!compact" class="mt-4 flex items-center gap-4">
        <label class="sr-only" :for="`span-${project.id}`">{{ t.work.resize }}</label>
        <input :id="`span-${project.id}`" v-model.number="span" class="sz-range" type="range" min="34" max="100" step="1">
      </div>
      <p v-if="live" class="mt-3 text-xs text-subtle">{{ t.work.embedNote }}</p>

      <div class="sz-case-stage mt-8">
        <div class="mx-auto transition-[width] duration-500" :style="{ width: compact ? '100%' : `${span}%` }">
          <SazanDeviceFrame
            :type="device"
            :src="project.imageUrl"
            :alt="title"
            :title="title"
            :live="live"
            :live-url="project.demoUrl"
            priority
          />
        </div>
      </div>

      <div class="mt-8 grid gap-8 border-t border-line pt-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] md:mt-14 md:gap-12 md:pt-10">
        <div>
          <h2 class="font-display text-xl tracking-[-0.03em] md:text-2xl">{{ t.work.overview }}</h2>
          <p class="mt-3 text-base leading-relaxed md:mt-4 md:text-lg">{{ field(project.descriptionEn, project.descriptionFa) }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <SiteButton v-if="project.demoUrl" :href="safeHref(project.demoUrl)" variant="primary">
              {{ t.work.open }}
              <SazanArrow />
            </SiteButton>
            <SiteButton v-if="project.githubUrl" :href="safeHref(project.githubUrl)">
              {{ t.work.code }}
            </SiteButton>
          </div>
        </div>
        <div>
          <h2 class="font-display text-xl tracking-[-0.03em] md:text-2xl">{{ t.work.technology }}</h2>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="tech in project.techs" :key="tech" class="rounded-full border border-line bg-surface px-3 py-1 text-sm">
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>

      <figure v-if="project.imageUrl" class="sz-case-stage mt-8 md:mt-14">
        <figcaption class="sz-kicker mb-4">{{ t.work.capture }}</figcaption>
        <img
          :src="project.imageUrl"
          :alt="title"
          class="w-full rounded-[var(--sz-radius)] border border-line bg-surface"
          loading="lazy"
        >
      </figure>

      <NuxtLink
        v-if="nextProject"
        :to="`/work/${nextProject.slug}`"
        class="mt-8 flex items-end justify-between gap-4 border-t border-line pt-6 md:mt-16 md:gap-6 md:pt-8"
      >
        <span>
          <span class="sz-kicker">{{ t.work.next }}</span>
          <span class="mt-2 block font-display text-2xl tracking-[-0.04em] md:text-3xl">
            {{ field(nextProject.titleEn, nextProject.titleFa) }}
          </span>
        </span>
        <SazanArrow />
      </NuxtLink>
    </template>
  </div>
</template>
