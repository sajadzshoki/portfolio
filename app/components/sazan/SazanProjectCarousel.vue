<script setup lang="ts">
import type { Project } from '~~/shared/types'
import { deviceForSpan, productShape, spanFor, type ViewportMode } from '~/utils/studio'

const { t, field, locale } = useLocale()
const { data } = usePortfolio()
const projects = computed(() => data.value?.projects || [])
const index = ref(0)
const span = ref(100)
const latched = ref(false)
const compact = ref(false)
const scroller = ref<HTMLElement | null>(null)

const active = computed(() => projects.value[index.value] || null)
const device = computed(() => compact.value ? 'phone' : deviceForSpan(span.value))
const liveOn = computed(() => latched.value && Boolean(active.value?.demoUrl))

function reduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function go(next: number) {
  const count = projects.value.length
  const root = scroller.value
  if (!count || !root) return
  const wrapped = (next + count) % count
  const slide = root.querySelector<HTMLElement>(`[data-slide="${wrapped}"]`)
  if (!slide) return
  const rootRect = root.getBoundingClientRect()
  const slideRect = slide.getBoundingClientRect()
  const delta = slideRect.left - rootRect.left - (rootRect.width - slideRect.width) / 2
  root.scrollBy({ left: delta, behavior: reduced() ? 'auto' : 'smooth' })
  index.value = wrapped
}

function setMode(mode: ViewportMode) {
  span.value = spanFor(mode)
}

function onKey(event: KeyboardEvent) {
  if (!projects.value.length) return
  const nextKey = locale.value === 'fa' ? 'ArrowLeft' : 'ArrowRight'
  const prevKey = locale.value === 'fa' ? 'ArrowRight' : 'ArrowLeft'
  if (event.key === nextKey) {
    event.preventDefault()
    go(index.value + 1)
  }
  if (event.key === prevKey) {
    event.preventDefault()
    go(index.value - 1)
  }
}

function engage() {
  if (active.value?.demoUrl && window.matchMedia('(hover: hover)').matches) latched.value = true
}

let observer: IntersectionObserver | null = null

function bindSlides() {
  observer?.disconnect()
  const root = scroller.value
  if (!root) return
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')]
  observer = new IntersectionObserver((entries) => {
    const best = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (!best) return
    const next = Number((best.target as HTMLElement).dataset.slide)
    if (!Number.isNaN(next) && next !== index.value) index.value = next
  }, { root, threshold: [0.6, 0.8] })
  slides.forEach(slide => observer?.observe(slide))
}

watch(index, () => {
  latched.value = false
  const project = projects.value[index.value]
  if (!project || compact.value) return
  span.value = productShape(project) === 'mobile' ? spanFor('mobile') : spanFor('desktop')
})

watch(projects, async () => {
  await nextTick()
  bindSlides()
})

let stopWatching: (() => void) | null = null

onMounted(() => {
  const query = window.matchMedia('(max-width: 767px)')
  const apply = () => {
    compact.value = query.matches
  }
  apply()
  query.addEventListener('change', apply)
  bindSlides()
  stopWatching = () => {
    query.removeEventListener('change', apply)
    observer?.disconnect()
  }
})

onBeforeUnmount(() => stopWatching?.())

function shapeLabel(project: Project) {
  const shape = productShape(project)
  if (shape === 'mobile') return t.value.work.mobile
  if (shape === 'dashboard') return t.value.work.desktop
  return t.value.work.desktop
}
</script>

<template>
  <section id="work" class="scroll-mt-24 py-10 md:py-28" aria-roledescription="carousel">
    <div class="sz-wrap">
      <div class="max-w-xl">
        <Reveal>
          <SazanSectionLabel :text="t.work.eyebrow" />
          <h2 class="sz-title mt-3 max-w-xl md:mt-4">{{ t.work.title }}</h2>
          <p class="sz-lede mt-3 md:mt-4">{{ t.work.lede }}</p>
        </Reveal>
      </div>
    </div>

    <p v-if="!projects.length" class="sz-wrap mt-10 text-muted">{{ t.work.empty }}</p>

    <div v-else class="sz-stage mt-5 md:mt-8">
      <button
        type="button"
        class="sz-nav sz-nav-prev"
        :disabled="projects.length < 2"
        :aria-label="locale === 'fa' ? 'قبلی' : 'Previous project'"
        @click="go(index - 1)"
      >
        <SazanArrow back />
      </button>
      <button
        type="button"
        class="sz-nav sz-nav-next"
        :disabled="projects.length < 2"
        :aria-label="locale === 'fa' ? 'بعدی' : 'Next project'"
        @click="go(index + 1)"
      >
        <SazanArrow />
      </button>
      <div
        ref="scroller"
        class="sz-scroller"
        tabindex="0"
        :aria-label="t.work.eyebrow"
        @keydown="onKey"
        @mouseenter="engage"
      >
        <article
          v-for="(project, i) in projects"
          :key="project.id"
          class="sz-slide"
          :class="{ 'is-active': i === index }"
          :data-slide="i"
          :aria-hidden="i === index ? undefined : true"
        >
          <div class="grid items-center">
            <div
              class="mx-auto transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              :style="{ width: i === index && !compact ? `${span}%` : '100%' }"
            >
              <SazanDeviceFrame
                :type="i === index ? device : (productShape(project) === 'mobile' ? 'phone' : 'laptop')"
                :src="project.imageUrl"
                :alt="field(project.titleEn, project.titleFa)"
                :title="field(project.titleEn, project.titleFa)"
                :live="i === index && liveOn"
                :live-url="project.demoUrl"
                :priority="i === 0"
              />
            </div>
          </div>
        </article>
      </div>
    </div>

    <div v-if="active" class="sz-wrap mt-2">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          class="sz-live"
          :aria-pressed="liveOn"
          :disabled="!active.demoUrl"
          @click="latched = !latched"
        >
          <i />
          {{ active.demoUrl ? t.work.live : t.work.preview }}
        </button>
        <div v-if="!compact" class="sz-seg" role="group" :aria-label="t.work.resize">
          <button type="button" :aria-pressed="device === 'laptop'" @click="setMode('desktop')">{{ t.work.desktop }}</button>
          <button type="button" :aria-pressed="device === 'tablet'" @click="setMode('tablet')">{{ t.work.tablet }}</button>
          <button type="button" :aria-pressed="device === 'phone'" @click="setMode('mobile')">{{ t.work.mobile }}</button>
        </div>
        <p v-else class="text-xs text-subtle">{{ shapeLabel(active) }}</p>
      </div>

      <div v-if="!compact" class="mb-8 flex items-center gap-4">
        <label class="sr-only" for="viewport-span">{{ t.work.resize }}</label>
        <input
          id="viewport-span"
          v-model.number="span"
          class="sz-range"
          type="range"
          min="34"
          max="100"
          step="1"
        >
        <span class="font-mono text-[0.68rem] text-subtle">{{ t.work.resize }}</span>
      </div>

      <p v-if="liveOn" class="mb-4 text-xs text-subtle">{{ t.work.embedNote }}</p>

      <SazanProjectMeta :project="active" :index="index" :total="projects.length" />

      <div class="mt-6 flex justify-center gap-2 md:hidden" role="tablist">
        <button
          v-for="(project, i) in projects"
          :key="project.id"
          type="button"
          class="h-1.5 rounded-full transition-all"
          :class="i === index ? 'w-6 bg-primary' : 'w-1.5 bg-line-strong'"
          :aria-label="field(project.titleEn, project.titleFa)"
          @click="go(i)"
        />
      </div>
    </div>
  </section>
</template>
