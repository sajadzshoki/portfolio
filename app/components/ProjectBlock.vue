<script setup lang="ts">
import type { Project } from '~~/shared/types'

const props = defineProps<{
  project: Project
  index: number
}>()

const { t, field } = useLocale()

const imageFirst = computed(() => {
  const layout = props.project.layout || 'image-start'
  return layout !== 'image-end'
})

function onLook(e: MouseEvent) {
  if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
  const frame = e.currentTarget as HTMLElement
  const img = frame.querySelector('img')
  if (!img) return
  const r = frame.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width - 0.5) * 12
  const y = ((e.clientY - r.top) / r.height - 0.5) * 12
  img.style.transform = `scale(1.06) translate3d(${x}px, ${y}px, 0)`
}

function onLookLeave(e: MouseEvent) {
  const img = (e.currentTarget as HTMLElement).querySelector('img')
  if (img) img.style.transform = ''
}
</script>

<template>
  <Reveal as="article" :delay="index * 40">
    <div class="sheet group grid grid-cols-12 gap-0 overflow-hidden md:min-h-[320px]">
      <div
        class="col-span-12 md:col-span-6"
        :class="imageFirst ? '' : 'md:order-2'"
      >
        <a
          :href="project.demoUrl || project.githubUrl || '#'"
          class="img-frame block aspect-[16/11] border-0 md:aspect-auto md:h-full"
          :target="project.demoUrl || project.githubUrl ? '_blank' : undefined"
          rel="noreferrer"
          @mousemove="onLook"
          @mouseleave="onLookLeave"
        >
          <SiteImage
            :src="project.imageUrl"
            :alt="field(project.titleEn, project.titleFa)"
            :width="1400"
            :height="960"
          />
        </a>
      </div>

      <div
        class="col-span-12 flex flex-col justify-between gap-6 border-t border-dashed border-[color-mix(in_srgb,var(--ink)_28%,transparent)] p-6 md:col-span-6 md:border-t-0 md:p-8"
        :class="imageFirst
          ? 'md:border-s md:border-dashed md:border-[color-mix(in_srgb,var(--ink)_28%,transparent)]'
          : 'md:order-1 md:border-e md:border-dashed md:border-[color-mix(in_srgb,var(--ink)_28%,transparent)]'"
      >
        <div>
          <p class="meta text-muted mb-4">
            <span class="text-signal">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="mx-2">·</span>
            <span>{{ project.year }}</span>
            <template v-if="project.featured">
              <span class="mx-2">·</span>
              <span class="text-signal">{{ t.projects.featured }}</span>
            </template>
          </p>

          <h3 class="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[0.95] tracking-[-0.04em] transition-colors group-hover:text-signal">
            {{ field(project.titleEn, project.titleFa) }}
          </h3>

          <p class="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">
            {{ field(project.descriptionEn, project.descriptionFa) }}
          </p>

          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="tech in project.techs"
              :key="tech"
              class="border border-dashed border-[color-mix(in_srgb,var(--ink)_30%,transparent)] px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted"
            >
              {{ tech }}
            </li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-2">
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            class="term-tab term-tab-active"
            target="_blank"
            rel="noreferrer"
          >
            {{ t.projects.demo }}
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            class="term-tab"
            target="_blank"
            rel="noreferrer"
          >
            {{ t.projects.code }}
          </a>
        </div>
      </div>
    </div>
  </Reveal>
</template>
