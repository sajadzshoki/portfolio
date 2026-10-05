<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const ready = ref(false)
const typed = ref('')
const typingDone = ref(false)

const fullName = computed(() =>
  data.value ? field(data.value.site.nameEn, data.value.site.nameFa) : ''
)

const role = computed(() =>
  data.value ? field(data.value.site.roleEn, data.value.site.roleFa) : ''
)

const promptTarget = computed(() => `${t.value.hero.prompt}: ${role.value}`)

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.value = promptTarget.value
    typingDone.value = true
    return
  }

  let i = 0
  const run = () => {
    const target = promptTarget.value
    if (i <= target.length) {
      typed.value = target.slice(0, i)
      i += 1
      window.setTimeout(run, i < 8 ? 45 : 28)
    } else {
      typingDone.value = true
    }
  }
  window.setTimeout(run, 420)
})

watch(promptTarget, (next) => {
  if (typingDone.value) typed.value = next
})

function go(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="top"
    class="relative min-h-[100dvh] overflow-hidden pt-16"
    :class="{ 'hero-ready': ready }"
  >
    <div class="pointer-events-none absolute inset-0 grid-lines opacity-60" />
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,color-mix(in_srgb,var(--signal)_12%,transparent),transparent_55%)]" />

    <div class="site-shell relative grid min-h-[calc(100dvh-4rem)] grid-cols-12 gap-x-5 gap-y-8 pb-10 pt-8 md:pt-12">
      <div class="col-span-12 flex items-center justify-between">
        <p class="meta text-muted">
          <span class="text-signal">01</span>
          <span class="mx-2">//</span>
          <span>{{ t.hero.kicker }}</span>
        </p>
        <p class="meta text-muted">
          <span class="text-signal">$</span>
          {{ t.hero.path }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-7 md:row-start-2">
        <p class="mb-4 font-mono text-sm text-muted">
          <span class="text-signal">></span>
          <span
            class="ms-2"
            :class="typingDone ? '' : 'cursor-blink'"
          >{{ typed }}</span>
        </p>

        <h1 class="display-name">
          <span class="text-reveal"><span>{{ fullName }}</span></span>
        </h1>

        <p class="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted md:text-[1.12rem]">
          {{ data ? field(data.site.introEn, data.site.introFa) : '' }}
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <SiteButton variant="primary" size="lg" magnetic @click="go('#work')">
            {{ t.hero.ctaPrimary }}
          </SiteButton>
          <SiteButton size="lg" @click="go('#contact')">
            {{ t.hero.ctaSecondary }}
          </SiteButton>
        </div>
      </div>

      <div class="col-span-12 md:col-span-5 md:col-start-8 md:row-start-2 md:self-stretch">
        <div class="relative h-full min-h-[280px] md:min-h-[420px]">
          <figure class="img-frame crop absolute inset-0 h-full w-full">
            <SiteImage
              v-if="data?.site.portraitUrl"
              :src="data.site.portraitUrl"
              :alt="t.hero.portrait"
              :width="900"
              :height="1100"
              eager
              class="h-full w-full object-cover"
            />
            <div
              v-else
              class="grid h-full place-items-center blueprint-dots bg-panel font-mono text-xs uppercase tracking-[0.16em] text-muted"
            >
              {{ t.hero.portrait }}
            </div>
          </figure>
        </div>
      </div>

      <div class="col-span-12 mt-auto md:row-start-3">
        <dl class="spec-table grid-cols-1 sm:grid-cols-3 sm:[&>*]:border-b-0 sm:[&>*:not(:last-child)]:border-e sm:[&>*:not(:last-child)]:border-dashed sm:[&>*:not(:last-child)]:border-[color-mix(in_srgb,var(--ink)_22%,transparent)]">
          <div>
            <dt class="meta text-muted mb-1">{{ t.available }}</dt>
            <dd class="font-mono text-sm">
              {{ data ? field(data.site.availabilityEn, data.site.availabilityFa) : '' }}
            </dd>
          </div>
          <div>
            <dt class="meta text-muted mb-1">{{ t.location }}</dt>
            <dd class="font-mono text-sm">
              {{ data ? field(data.site.locationEn, data.site.locationFa) : '' }}
            </dd>
          </div>
          <div>
            <dt class="meta text-muted mb-1">{{ t.stack }}</dt>
            <dd class="font-mono text-sm">
              {{ data ? field(data.site.metaEn, data.site.metaFa) : '' }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
