<script setup lang="ts">
import { localNum } from '~/utils/studio'

const { t, field, locale } = useLocale()
const { data } = usePortfolio()
const px = ref(0)
const py = ref(0)

const project = computed(() => data.value?.projects.find(item => item.featured) || data.value?.projects[0])
const chips = computed(() => (data.value?.skills || []).slice(0, 3))
const words = computed(() => t.value.hero.cycle)
const wordIndex = ref(0)
const cycleWord = computed(() => words.value[wordIndex.value] || words.value[0])
let cycleTimer: number | undefined

function reduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function startCycle() {
  if (cycleTimer) window.clearInterval(cycleTimer)
  cycleTimer = undefined
  if (reduced()) return
  cycleTimer = window.setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % words.value.length
  }, 2200)
}

onMounted(startCycle)
onUnmounted(() => {
  if (cycleTimer) window.clearInterval(cycleTimer)
})
watch(locale, () => {
  wordIndex.value = 0
})

function onMove(event: MouseEvent) {
  if (reduced()) return
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect()
  px.value = ((event.clientX - bounds.left) / bounds.width - 0.5) * -14
  py.value = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8
}

function resetMove() {
  px.value = 0
  py.value = 0
}

</script>

<template>
  <section id="top" class="relative overflow-hidden pb-6 pt-5 md:pb-12 md:pt-12" @mousemove="onMove" @mouseleave="resetMove">
    <svg class="pointer-events-none absolute end-[-8%] top-8 hidden h-[34rem] w-[34rem] text-primary/50 lg:block" viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <path class="sz-dash" d="M80 520C210 180 390 70 560 150" stroke="currentColor" stroke-width="1.4" />
    </svg>

    <div class="sz-wrap grid items-center gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
      <div class="sz-enter">
        <SazanSectionLabel :text="t.hero.eyebrow" />
        <h1 class="sz-hero-title mt-3 md:mt-5">
          <span class="block">{{ t.hero.line1 }}</span>
          <span class="block text-primary">{{ t.hero.line2 }}</span>
          <span class="block">{{ t.hero.line3 }}</span>
        </h1>
        <p class="sz-hero-live">
          <span class="sz-hero-back">
            <span class="sz-hero-sizer" aria-hidden="true">
              <span v-for="item in words" :key="item">{{ item }}</span>
            </span>
            <span :key="`${locale}-${cycleWord}`" class="sz-hero-back-word">{{ cycleWord }}</span>
          </span>
          <span class="sz-hero-brand">{{ t.hero.brand }}</span>
        </p>
        <p class="sz-lede mt-3 md:mt-4">{{ t.hero.lede }}</p>
        <div class="mt-5 flex flex-wrap items-center gap-2.5 md:mt-8 md:gap-3">
          <SiteButton to="/contact" variant="primary" size="lg" magnetic>
            {{ t.hero.primary }}
            <SazanArrow />
          </SiteButton>
          <SiteButton to="/work" size="lg">
            {{ t.hero.secondary }}
          </SiteButton>
        </div>
      </div>

      <div
        class="relative mx-auto w-full max-w-[640px]"
        :style="{ transform: `translate3d(${px}px, ${py}px, 0)` }"
      >
        <div class="sz-float relative z-10 w-[88%]">
          <SazanDeviceFrame
            type="laptop"
            :src="project?.imageUrl"
            :alt="project ? field(project.titleEn, project.titleFa) : 'SAZAN'"
            :title="project ? field(project.titleEn, project.titleFa) : ''"
            priority
          />
        </div>
        <div class="sz-float-late absolute bottom-[4%] end-0 z-20 w-[31%]">
          <SazanDeviceFrame
            type="phone"
            :src="project?.imageUrl"
            :alt="project ? field(project.titleEn, project.titleFa) : 'SAZAN'"
            :title="project ? field(project.titleEn, project.titleFa) : ''"
          />
        </div>

        <div
          v-for="(chip, i) in chips"
          :key="chip.id"
          class="sz-chip-float absolute z-30 hidden items-center gap-2.5 rounded-2xl bg-surface px-3 py-2 shadow-[var(--sz-shadow-soft)] ring-1 ring-black/5 md:flex"
          :style="{
            animationDelay: `${i * -1.4}s`,
            top: ['4%', '46%', 'auto'][i],
            bottom: ['auto', 'auto', '22%'][i],
            insetInlineStart: ['auto', '0%', '18%'][i],
            insetInlineEnd: ['2%', 'auto', 'auto'][i]
          }"
        >
          <span class="text-primary"><SazanTechIcon :name="chip.name" /></span>
          <span>
            <span class="block text-sm font-semibold leading-none">{{ chip.name }}</span>
            <span class="mt-1 block text-[0.68rem] text-muted">{{ chip.category }}</span>
          </span>
        </div>

        <p v-if="project" class="absolute bottom-[-0.2rem] start-[8%] z-30 hidden font-mono text-[0.65rem] tracking-[0.14em] text-muted md:block">
          {{ field(project.titleEn, project.titleFa) }}
          <span class="mx-1 text-primary">/</span>
          {{ localNum(project.year, locale) }}
        </p>
      </div>
    </div>

    <div class="sz-wrap mt-7 grid gap-4 border-t border-line pt-4 sm:grid-cols-3 md:mt-12 md:gap-6 md:pt-6">
      <div>
        <p class="sz-kicker mb-2">{{ t.available }}</p>
        <p class="text-sm font-medium">{{ data ? field(data.site.availabilityEn, data.site.availabilityFa) : '' }}</p>
      </div>
      <div>
        <p class="sz-kicker mb-2">{{ t.location }}</p>
        <p class="text-sm font-medium">{{ data ? field(data.site.locationEn, data.site.locationFa) : '' }}</p>
      </div>
      <div>
        <p class="sz-kicker mb-2">{{ t.stack }}</p>
        <p class="text-sm font-medium">{{ data ? field(data.site.metaEn, data.site.metaFa) : '' }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sz-hero-live {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.28em 0.35em;
  margin-top: 0.7rem;
}

.sz-hero-brand {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;
}

.sz-hero-back {
  display: inline-grid;
  justify-items: end;
  color: var(--sz-primary);
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;
  user-select: none;
}

.sz-hero-sizer {
  display: inline-grid;
  grid-area: 1 / 1;
  visibility: hidden;
}

.sz-hero-sizer span,
.sz-hero-back-word {
  grid-area: 1 / 1;
  white-space: nowrap;
}

.sz-hero-back-word {
  animation: sz-hero-swap 0.55s var(--sz-ease) both;
}

html[lang="fa"] .sz-hero-brand,
html[dir="rtl"] .sz-hero-brand,
html[lang="fa"] .sz-hero-back,
html[dir="rtl"] .sz-hero-back {
  font-family: var(--font-persian);
  letter-spacing: -0.03em;
}

@keyframes sz-hero-swap {
  from {
    opacity: 0;
    transform: translateY(0.28em);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 768px) {
  .sz-hero-live {
    margin-top: 1.15rem;
  }
}

@media (max-width: 767px) {
  .sz-hero-brand,
  .sz-hero-back {
    font-size: 1.65rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sz-hero-back-word {
    animation: none;
  }
}
</style>
