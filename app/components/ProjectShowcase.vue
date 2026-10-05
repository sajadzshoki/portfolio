<script setup lang="ts">
import type { Project } from '~~/shared/types'

const props = defineProps<{
  projects: Project[]
}>()

const { t, field } = useLocale()
const active = ref(0)
const armed = ref(false)
const root = ref<HTMLElement | null>(null)

const project = computed(() => props.projects[active.value] || props.projects[0])
const title = computed(() => project.value ? field(project.value.titleEn, project.value.titleFa) : '')
const description = computed(() => project.value ? field(project.value.descriptionEn, project.value.descriptionFa) : '')
const live = computed(() => {
  const href = safeHref(project.value?.demoUrl || '')
  return /^https?:\/\//i.test(href) ? href : ''
})

watch(() => props.projects, (list) => {
  if (active.value > list.length - 1) active.value = 0
})

function select(index: number) {
  active.value = index
}

function step(direction: number) {
  const count = props.projects.length
  if (count < 2) return
  active.value = (active.value + direction + count) % count
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const node = root.value
  if (!node) return
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    armed.value = true
    observer?.disconnect()
  }, { rootMargin: '240px' })
  observer.observe(node)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div v-if="project" ref="root" class="showcase">
    <div class="meta">
      <button v-if="projects.length > 1" type="button" class="arrow" :aria-label="t.projects.prev" @click="step(-1)">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
      <h3 class="display">{{ title }}</h3>
      <p class="year">{{ project.year }}</p>
      <p class="lede">{{ description }}</p>
      <ul v-if="project.techs.length" class="pills">
        <li v-for="tech in project.techs" :key="tech">{{ tech }}</li>
      </ul>
      <div class="links">
        <SiteButton v-if="live" :href="live" variant="secondary" arrow>{{ t.projects.demo }}</SiteButton>
        <SiteButton v-if="project.githubUrl" :href="safeHref(project.githubUrl)" variant="ghost">{{ t.projects.code }}</SiteButton>
        <SiteButton :to="`/projects/${project.slug}`" variant="ghost" arrow>{{ t.projects.view }}</SiteButton>
      </div>
    </div>

    <div class="stage">
      <Transition name="swap" mode="out-in">
        <div :key="project.id" class="devices">
          <LaptopFrame :src="project.imageUrl" :alt="title" :live="armed ? live : ''" />
          <PhoneFrame :src="project.mobileImageUrl || project.imageUrl" :alt="title" :live="armed ? live : ''" />
        </div>
      </Transition>
    </div>

    <div class="picker" role="tablist" :aria-label="t.projects.title">
      <button
        v-for="(item, index) in projects"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="index === active"
        :class="{ on: index === active }"
        @click="select(index)"
      >
        <span class="thumb">
          <img v-if="item.imageUrl" :src="item.imageUrl" alt="">
        </span>
        <span class="info">
          <strong>{{ field(item.titleEn, item.titleFa) }}</strong>
          <em>{{ item.year }}</em>
          <small v-if="item.techs.length">{{ item.techs.slice(0, 3).join(' · ') }}</small>
        </span>
      </button>
      <button v-if="projects.length > 1" type="button" class="arrow side" :aria-label="t.projects.next" @click="step(1)">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
    </div>
    <p class="sr">{{ title }}</p>
  </div>
</template>

<style scoped>
.showcase {
  position: relative;
  display: grid;
  gap: 1.75rem;
  align-items: center;
}

.display {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  line-height: 1.05;
}

.year {
  margin-top: 0.45rem;
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.lede {
  margin-top: 0.85rem;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.pills li {
  padding: 0.28rem 0.65rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--text-2);
  font-size: 0.78rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.8rem;
  margin-top: 1.15rem;
}

.links :deep(.site-btn) {
  border-radius: 999px;
}

.stage {
  min-width: 0;
}

.devices {
  position: relative;
  padding-bottom: 0.4rem;
  padding-inline-end: 11%;
}

.devices::after {
  content: "";
  position: absolute;
  z-index: -1;
  inset-inline: 6% 16%;
  bottom: 0;
  height: 1.4rem;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45), transparent 70%);
  filter: blur(8px);
}

.devices :deep(.phone) {
  position: absolute;
  z-index: 2;
  inset-inline-end: 0;
  bottom: 0;
  width: min(30%, 188px);
}

.picker {
  display: flex;
  gap: 0.55rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
}

.picker > button[role="tab"] {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex: none;
  width: min(100%, 240px);
  padding: 0.45rem;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: var(--text-2);
  text-align: start;
  cursor: pointer;
}

.picker > button[role="tab"].on,
.picker > button[role="tab"]:hover {
  border-color: var(--line-strong);
  background: color-mix(in srgb, var(--text) 5%, transparent);
  color: var(--text);
}

.thumb {
  flex: none;
  width: 3.1rem;
  height: 3.1rem;
  overflow: hidden;
  border-radius: 10px;
  background: var(--surface-2);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.info {
  display: grid;
  min-width: 0;
  gap: 0.1rem;
}

.info strong {
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.info em,
.info small {
  color: var(--text-3);
  font-style: normal;
  font-size: 0.72rem;
  line-height: 1.35;
}

.info small {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  margin-bottom: 0.8rem;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.arrow svg {
  width: 0.9rem;
  height: 0.9rem;
}

[dir="rtl"] .arrow svg {
  transform: scaleX(-1);
}

.arrow.side {
  display: none;
}

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.35s ease, transform 0.45s var(--ease);
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 860px) {
  .devices {
    padding-inline-end: 0;
  }

  .devices :deep(.phone) {
    position: relative;
    width: min(52%, 190px);
    margin-top: -22%;
    margin-inline-start: auto;
  }
}

@media (min-width: 1080px) {
  .showcase {
    grid-template-columns: minmax(210px, 250px) minmax(0, 1fr) minmax(210px, 250px);
    gap: 1.25rem 1.5rem;
  }

  .picker {
    flex-direction: column;
    overflow: visible;
    align-items: stretch;
  }

  .picker > button[role="tab"] {
    width: 100%;
  }

  .arrow.side {
    display: grid;
    align-self: center;
    margin: 0.4rem 0 0 auto;
  }

  [dir="rtl"] .arrow.side {
    margin-inline: auto 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .swap-enter-active,
  .swap-leave-active {
    transition: none;
  }
}
</style>
