<script setup lang="ts">
import type { Project } from '~~/shared/types'

const props = defineProps<{
  project: Project
  index: number
}>()

const { t, field } = useLocale()
const layout = computed(() => props.project.layout || 'image-start')

function onLook(e: MouseEvent) {
  if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
  const frame = e.currentTarget as HTMLElement
  const img = frame.querySelector('img')
  if (!img) return
  const r = frame.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width - 0.5) * 14
  const y = ((e.clientY - r.top) / r.height - 0.5) * 14
  img.style.transform = `scale(1.07) translate3d(${x}px, ${y}px, 0)`
}

function onLookLeave(e: MouseEvent) {
  const img = (e.currentTarget as HTMLElement).querySelector('img')
  if (img) img.style.transform = ''
}
</script>

<template>
  <article class="border-b-2 border-ink py-14 md:py-20">
    <!-- image-start / image-end -->
    <div
      v-if="layout === 'image-start' || layout === 'image-end'"
      class="grid grid-cols-12 items-end gap-x-6 gap-y-8"
    >
      <Reveal
        class="col-span-12 md:col-span-7"
        :class="layout === 'image-end' ? 'md:order-2 md:col-start-6' : ''"
      >
        <a :href="project.demoUrl || project.githubUrl || '#'" class="img-frame block aspect-[16/11]" :target="project.demoUrl ? '_blank' : undefined" rel="noreferrer" @mousemove="onLook" @mouseleave="onLookLeave">
          <SiteImage
            :src="project.imageUrl"
            :alt="field(project.titleEn, project.titleFa)"
            :width="1400"
            :height="960"
          />
        </a>
      </Reveal>

      <Reveal
        class="col-span-12 md:col-span-5"
        :class="layout === 'image-end' ? 'md:order-1 md:col-start-1 md:row-start-1' : ''"
        :delay="80"
      >
        <p class="meta text-muted mb-4">
          <span class="text-signal">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="mx-2">/</span>
          <span>{{ project.year }}</span>
          <template v-if="project.featured">
            <span class="mx-2">/</span>
            <span>{{ t.projects.featured }}</span>
          </template>
        </p>
        <h3 class="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[0.88] tracking-[-0.045em]">
          {{ field(project.titleEn, project.titleFa) }}
        </h3>
        <p class="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">
          {{ field(project.descriptionEn, project.descriptionFa) }}
        </p>
        <ul class="mt-5 flex flex-wrap gap-x-3 gap-y-1">
          <li v-for="tech in project.techs" :key="tech" class="meta text-muted">
            {{ tech }}
          </li>
        </ul>
        <div class="mt-7 flex flex-wrap gap-3">
          <SiteButton v-if="project.demoUrl" :href="project.demoUrl" variant="primary">
            {{ t.projects.demo }}
          </SiteButton>
          <SiteButton v-if="project.githubUrl" :href="project.githubUrl">
            {{ t.projects.code }}
          </SiteButton>
        </div>
      </Reveal>
    </div>

    <!-- overlay -->
    <Reveal v-else-if="layout === 'overlay'">
      <div class="relative">
        <div class="img-frame aspect-[16/9] md:aspect-[21/9]" @mousemove="onLook" @mouseleave="onLookLeave">
          <SiteImage
            :src="project.imageUrl"
            :alt="field(project.titleEn, project.titleFa)"
            :width="1600"
            :height="800"
          />
        </div>
        <div class="mt-6 grid grid-cols-12 gap-5 md:absolute md:end-8 md:bottom-8 md:mt-0 md:w-[min(420px,40%)] md:border-2 md:border-ink md:bg-paper md:p-6">
          <div class="col-span-12">
            <p class="meta text-muted mb-3">
              <span class="text-signal">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="mx-2">/</span>
              <span>{{ project.year }}</span>
              <template v-if="project.featured">
                <span class="mx-2">/</span>
                <span>{{ t.projects.featured }}</span>
              </template>
            </p>
            <h3 class="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.9] tracking-[-0.04em]">
              {{ field(project.titleEn, project.titleFa) }}
            </h3>
            <p class="mt-4 text-[0.98rem] leading-relaxed text-muted">
              {{ field(project.descriptionEn, project.descriptionFa) }}
            </p>
            <ul class="mt-4 flex flex-wrap gap-x-3">
              <li v-for="tech in project.techs" :key="tech" class="meta text-muted">{{ tech }}</li>
            </ul>
            <div class="mt-5 flex gap-3">
              <SiteButton v-if="project.demoUrl" :href="project.demoUrl" variant="primary">{{ t.projects.demo }}</SiteButton>
              <SiteButton v-if="project.githubUrl" :href="project.githubUrl">{{ t.projects.code }}</SiteButton>
            </div>
          </div>
        </div>
      </div>
    </Reveal>

    <!-- stacked -->
    <div v-else class="grid grid-cols-12 gap-x-6 gap-y-8">
      <Reveal class="col-span-12 md:col-span-5">
        <p class="meta text-muted mb-4">
          <span class="text-signal">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="mx-2">/</span>
          <span>{{ project.year }}</span>
        </p>
        <h3 class="font-display text-[clamp(2.4rem,5vw,5rem)] leading-[0.84] tracking-[-0.05em]">
          {{ field(project.titleEn, project.titleFa) }}
        </h3>
      </Reveal>
      <Reveal class="col-span-12 md:col-span-6 md:col-start-7 md:self-end" :delay="60">
        <p class="text-[1.05rem] leading-relaxed text-muted">
          {{ field(project.descriptionEn, project.descriptionFa) }}
        </p>
        <ul class="mt-4 flex flex-wrap gap-x-3">
          <li v-for="tech in project.techs" :key="tech" class="meta text-muted">{{ tech }}</li>
        </ul>
        <div class="mt-6 flex gap-3">
          <SiteButton v-if="project.demoUrl" :href="project.demoUrl" variant="primary">{{ t.projects.demo }}</SiteButton>
          <SiteButton v-if="project.githubUrl" :href="project.githubUrl">{{ t.projects.code }}</SiteButton>
        </div>
      </Reveal>
      <Reveal class="col-span-12" :delay="100">
        <div class="img-frame aspect-[21/9]" @mousemove="onLook" @mouseleave="onLookLeave">
          <SiteImage
            :src="project.imageUrl"
            :alt="field(project.titleEn, project.titleFa)"
            :width="1600"
            :height="700"
          />
        </div>
      </Reveal>
    </div>
  </article>
</template>
