<script setup lang="ts">
withDefaults(defineProps<{
  featured?: boolean
}>(), {
  featured: true
})

const { t, field } = useLocale()
const { data } = usePortfolio()

const site = computed(() => data.value?.site)
const about = computed(() => data.value?.about)
const heading = computed(() => about.value ? field(about.value.headingEn, about.value.headingFa) : '')
const body = computed(() => about.value ? field(about.value.bodyEn, about.value.bodyFa) : '')
const location = computed(() => site.value ? field(site.value.locationEn, site.value.locationFa) : '')
const role = computed(() => site.value ? splitRole(field(site.value.roleEn, site.value.roleFa)).lead : '')

const current = computed(() => (data.value?.experience || []).find(item => isPresent(item.yearEnd)))
const company = computed(() => current.value ? field(current.value.orgEn, current.value.orgFa) : '')
const since = computed(() => {
  const start = current.value?.yearStart || ''
  return start.match(/\d{4}/)?.[0] || ''
})

const links = computed(() => (data.value?.socials || []).filter(item => /^(github|linkedin)$/i.test(item.name)))

function isPresent(value: string) {
  return /^(present|now|current|اکنون)$/i.test((value || '').trim())
}
</script>

<template>
  <section id="about" class="band">
    <div class="shell-wide grid items-center gap-7 min-[860px]:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] min-[860px]:gap-x-10 min-[860px]:gap-y-8 min-[1100px]:grid-cols-[minmax(220px,280px)_minmax(0,1fr)_minmax(9rem,12rem)]">
      <figure v-if="site?.portraitUrl" class="m-0 flex items-center gap-[0.85rem]">
        <span v-if="role" class="flex-none font-mono text-[0.72rem] tracking-[0.16em] text-[var(--text-3)] uppercase [writing-mode:vertical-rl] fa:font-persian fa:text-[0.86rem] fa:tracking-normal fa:normal-case">{{ role }}</span>
        <img class="block aspect-[4/5] w-[min(100%,280px)] object-cover object-[center_16%]" :src="site.portraitUrl" :alt="t.hero.portrait" width="720" height="900">
      </figure>

      <div>
        <p class="eyebrow">{{ t.about.eyebrow }}</p>
        <h2 class="display mt-3 max-w-[18em] text-balance text-[clamp(1.7rem,2.8vw,2.45rem)] leading-[1.08]">{{ heading || t.about.title }}</h2>
        <p class="lede mt-[0.9rem] max-w-[38rem] text-[0.98rem]">{{ body }}</p>
        <div class="mt-[1.35rem] flex flex-wrap gap-x-[1.35rem] gap-y-[0.85rem]">
          <a
            v-for="item in links"
            :key="item.id"
            class="inline-flex items-center gap-[0.45rem] text-[0.92rem] text-[var(--text-2)] hover:text-[var(--text)]"
            :href="safeHref(item.url)"
            target="_blank"
            rel="noreferrer"
          >
            <svg v-if="/github/i.test(item.name)" class="size-4" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.39v-1.36c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.89.88 2.35.67.07-.52.28-.88.5-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .22.15.47.55.39A8 8 0 0 0 8 0" /></svg>
            <svg v-else class="size-4" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M3.6 14.5H1.1V5.4h2.5zM2.35 4.2A1.45 1.45 0 1 1 2.34 1.3a1.45 1.45 0 0 1 .01 2.9M14.9 14.5h-2.5V10c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58H6.68V5.4h2.4v1.24h.03c.33-.63 1.15-1.3 2.37-1.3 2.54 0 3.01 1.67 3.01 3.84z" /></svg>
            {{ item.name }}
          </a>
          <NuxtLink v-if="site?.resumeUrl" class="inline-flex items-center gap-[0.45rem] text-[0.92rem] text-[var(--text-2)] hover:text-[var(--text)]" :to="site.resumeUrl">
            <svg class="size-4" viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.3" d="M4 1.5h5.2L13 5.3V14.5H4z" /><path fill="none" stroke="currentColor" stroke-width="1.3" d="M9 1.5V5.5h4M6 8.5h4M6 11h4" /></svg>
            {{ t.contact.resume }}
          </NuxtLink>
        </div>

        <div v-if="!featured && data?.focusAreas.length" class="mt-8">
          <h3 class="font-mono text-[0.75rem] font-medium tracking-[0.12em] text-[var(--text-3)] uppercase fa:text-[0.85rem] fa:tracking-normal fa:normal-case">{{ t.about.focus }}</h3>
          <ol class="m-0 mt-[0.9rem] list-none p-0">
            <li v-for="item in data.focusAreas" :key="item.id" class="grid gap-1 border-t border-[var(--line)] py-[0.85rem]">
              <strong class="font-semibold tracking-[-0.02em]">{{ field(item.titleEn, item.titleFa) }}</strong>
              <span class="text-[0.95rem] leading-[1.6] text-[var(--text-2)]">{{ field(item.bodyEn, item.bodyFa) }}</span>
            </li>
          </ol>
        </div>
      </div>

      <aside v-if="company || since || location" class="grid grid-cols-3 gap-[1.1rem] min-[860px]:col-start-2 min-[860px]:max-w-[28rem] min-[1100px]:col-auto min-[1100px]:max-w-none min-[1100px]:grid-cols-1 min-[1100px]:justify-items-end min-[1100px]:gap-6 min-[1100px]:text-end">
        <p v-if="company" class="m-0">
          <strong class="block text-[clamp(1.45rem,2vw,1.85rem)] font-[650] leading-[1.1] tracking-[-0.04em] [font-family:var(--font-display)]">{{ company }}</strong>
          <span class="text-[0.82rem] text-[var(--text-3)]">{{ t.about.company }}</span>
        </p>
        <p v-if="since" class="m-0">
          <strong class="block text-[clamp(1.45rem,2vw,1.85rem)] font-[650] leading-[1.1] tracking-[-0.04em] [font-family:var(--font-display)]">{{ since }}</strong>
          <span class="text-[0.82rem] text-[var(--text-3)]">{{ t.about.since }}</span>
        </p>
        <p v-if="location" class="m-0 flex items-center gap-[0.35rem] self-end text-[0.82rem] text-[var(--text-3)] min-[1100px]:justify-end">
          <svg class="size-[0.9rem] flex-none" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.2a4.3 4.3 0 0 0-4.3 4.3c0 3.2 4.3 9.3 4.3 9.3s4.3-6.1 4.3-9.3A4.3 4.3 0 0 0 8 1.2m0 5.8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" /></svg>
          {{ location }}
        </p>
      </aside>
    </div>
  </section>
</template>
