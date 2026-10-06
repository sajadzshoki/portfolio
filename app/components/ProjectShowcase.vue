<script setup lang="ts">
import type { Project } from '~~/shared/types'

const props = defineProps<{
  projects: Project[]
}>()

const { t, field } = useLocale()
const active = ref(0)
const armed = ref(false)
const root = ref<HTMLElement | null>(null)
const listEl = ref<HTMLElement | null>(null)

const project = computed(() => props.projects[active.value] || props.projects[0])
const laptopVariant = computed(() => active.value % 2 === 0 ? 'silver' : 'slim')
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

function toneAt(index: number) {
  return projectTone(index)
}

watch(active, async () => {
  await nextTick()
  listEl.value?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
})

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
  <div v-if="project" ref="root" class="relative grid items-center gap-7 min-[1080px]:grid-cols-[minmax(210px,250px)_minmax(0,1fr)_minmax(210px,250px)] min-[1080px]:gap-x-6 min-[1080px]:gap-y-5">
    <div>
      <button v-if="projects.length > 1" type="button" class="mb-[0.8rem] grid size-[2.1rem] cursor-pointer place-items-center rounded-full border border-[var(--line-strong)] bg-transparent text-[var(--text)]" :aria-label="t.projects.prev" @click="step(-1)">
        <svg class="size-[0.9rem] rtl:-scale-x-100" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
      <h3 class="display text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.05]">{{ title }}</h3>
      <p class="mt-[0.45rem] font-mono text-[0.75rem] tracking-[0.04em] text-[var(--text-3)]">{{ project.year }}</p>
      <p class="lede mt-[0.85rem] line-clamp-4 text-[0.95rem]">{{ description }}</p>
      <ul v-if="project.techs.length" class="m-0 mt-4 flex list-none flex-wrap gap-[0.4rem] p-0">
        <li v-for="tech in project.techs" :key="tech" class="rounded-full border border-[var(--line-strong)] px-[0.65rem] py-[0.28rem] text-[0.78rem] text-[var(--text-2)]">{{ tech }}</li>
      </ul>
      <div class="mt-[1.15rem] flex flex-wrap gap-x-[0.8rem] gap-y-[0.45rem]">
        <SiteButton v-if="live" :href="live" variant="secondary" arrow class="rounded-full">{{ t.projects.demo }}</SiteButton>
        <SiteButton v-if="project.githubUrl" :href="safeHref(project.githubUrl)" variant="ghost" class="rounded-full">{{ t.projects.code }}</SiteButton>
        <SiteButton :to="`/projects/${project.slug}`" variant="ghost" arrow class="rounded-full">{{ t.projects.view }}</SiteButton>
      </div>
    </div>

    <div class="min-w-0">
      <Transition name="swap" mode="out-in">
        <div :key="project.id" class="devices relative pe-[11%] pb-[0.4rem] max-[860px]:pe-0">
          <component
            :is="live ? 'a' : 'div'"
            class="device-hit device-hit-laptop"
            v-bind="live ? { href: live, target: '_blank', rel: 'noreferrer' } : {}"
          >
            <LaptopFrame :src="project.imageUrl" :alt="title" :variant="laptopVariant" :live="armed ? live : ''" />
          </component>
          <div class="phone-slot absolute end-0 bottom-0 z-[2] w-[min(30%,188px)] max-[860px]:relative max-[860px]:end-auto max-[860px]:bottom-auto max-[860px]:z-auto max-[860px]:mt-[-22%] max-[860px]:ms-auto max-[860px]:w-[min(52%,190px)]">
            <component
              :is="live ? 'a' : 'div'"
              class="device-hit device-hit-phone"
              v-bind="live ? { href: live, target: '_blank', rel: 'noreferrer' } : {}"
            >
              <PhoneFrame :src="project.mobileImageUrl || project.imageUrl" :alt="title" :live="armed ? live : ''" />
            </component>
          </div>
        </div>
      </Transition>
    </div>

    <div class="picker min-h-0">
    <div ref="listEl" class="picker-scroll flex gap-[0.55rem] overflow-x-auto pb-[0.2rem] min-[1080px]:flex-col min-[1080px]:items-stretch" role="tablist" :aria-label="t.projects.title">
      <button
        v-for="(item, index) in projects"
        :key="item.id"
        type="button"
        role="tab"
        class="flex w-[min(100%,240px)] flex-none cursor-pointer items-center gap-[0.7rem] rounded-[14px] border border-transparent bg-transparent p-[0.45rem] text-start text-[var(--text-2)] hover:border-[var(--line-strong)] hover:bg-[color-mix(in_srgb,var(--text)_5%,transparent)] hover:text-[var(--text)] aria-selected:border-[var(--line-strong)] aria-selected:bg-[color-mix(in_srgb,var(--text)_5%,transparent)] aria-selected:text-[var(--text)] min-[1080px]:w-full"
        :aria-selected="index === active"
        @click="select(index)"
      >
        <span class="grid size-[3.1rem] flex-none place-items-center overflow-hidden rounded-[10px] font-mono text-[0.78rem] text-[#1a2433]" :style="{ background: toneAt(index) }">
          <img v-if="item.imageUrl" class="size-full object-cover object-top" :src="item.imageUrl" alt="">
          <template v-else>{{ field(item.titleEn, item.titleFa).slice(0, 1) }}</template>
        </span>
        <span class="grid min-w-0 gap-[0.1rem]">
          <strong class="text-[0.92rem] font-[650] tracking-[-0.02em]">{{ field(item.titleEn, item.titleFa) }}</strong>
          <em class="text-[0.72rem] leading-[1.35] text-[var(--text-3)] not-italic">{{ item.year }}</em>
          <small v-if="item.techs.length" class="truncate text-[0.72rem] leading-[1.35] text-[var(--text-3)]">{{ item.techs.slice(0, 3).join(' · ') }}</small>
        </span>
      </button>
      <button v-if="projects.length > 1" type="button" class="hidden size-[2.1rem] cursor-pointer place-items-center self-center rounded-full border border-[var(--line-strong)] bg-transparent text-[var(--text)] min-[1080px]:mt-[0.4rem] min-[1080px]:mb-0 min-[1080px]:ml-auto min-[1080px]:grid min-[1080px]:mr-0 rtl:min-[1080px]:mr-auto rtl:min-[1080px]:ml-0" :aria-label="t.projects.next" @click="step(1)">
        <svg class="size-[0.9rem] rtl:-scale-x-100" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
    </div>
    </div>
    <p class="absolute h-px w-px overflow-hidden [clip:rect(0_0_0_0)]">{{ title }}</p>
  </div>
</template>

<style scoped>
.picker {
  min-width: 0;
}

@media (min-width: 1080px) {
  .picker {
    position: relative;
    align-self: stretch;
    min-height: 26rem;
  }

  .picker-scroll {
    position: absolute;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }
}

.device-hit {
  display: block;
  color: inherit;
  text-decoration: none;
  transition: transform 0.45s var(--ease), filter 0.45s var(--ease);
}

a.device-hit {
  cursor: pointer;
}

.device-hit-laptop {
  position: relative;
  z-index: 1;
  transform-origin: center;
}

.device-hit-laptop:hover,
.device-hit-laptop:focus-visible {
  z-index: 5;
  transform: scale(1.62);
  filter: drop-shadow(0 30px 46px rgba(0, 0, 0, 0.38));
}

.phone-slot {
  transform-origin: bottom right;
  transition: transform 0.45s var(--ease), filter 0.45s var(--ease);
}

.phone-slot:hover,
.phone-slot:focus-within {
  z-index: 6;
  transform: scale(1.48);
  filter: drop-shadow(0 26px 40px rgba(0, 0, 0, 0.4));
}

:global(html[dir="rtl"]) .phone-slot {
  transform-origin: bottom left;
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
  .device-hit-laptop:hover,
  .device-hit-laptop:focus-visible {
    transform: scale(1.12);
  }

  .phone-slot {
    transform-origin: center;
  }

  .phone-slot:hover,
  .phone-slot:focus-within {
    transform: scale(1.18);
  }
}

@media (prefers-reduced-motion: reduce) {
  .swap-enter-active,
  .swap-leave-active,
  .device-hit,
  .phone-slot {
    transition: none;
  }
}
</style>
