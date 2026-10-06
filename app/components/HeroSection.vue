<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const ready = ref(false)

const site = computed(() => data.value?.site)
const name = computed(() => site.value ? presentName(field(site.value.nameEn, site.value.nameFa)) : '')
const role = computed(() => site.value ? splitRole(field(site.value.roleEn, site.value.roleFa)) : { lead: '', rest: '' })
const intro = computed(() => site.value ? field(site.value.introEn, site.value.introFa) : '')

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
})

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="top" class="hero relative flex min-h-[70dvh] items-center overflow-hidden bg-[var(--bg)] pt-[var(--header-h)] pb-[4.5rem] max-[860px]:block max-[860px]:min-h-0" :class="{ ready }">
    <div class="media absolute inset-y-0 end-0 z-0 w-[min(68%,920px)] max-[860px]:relative max-[860px]:end-auto max-[860px]:h-[min(40.6vw,224px)] max-[860px]:w-full" aria-hidden="true">
      <div class="shots absolute inset-0">
        <img
          class="shot shot-dark absolute inset-0 block h-full w-full object-cover object-[62%_center]"
          src="/images/sajad-hero-dark.webp"
          alt=""
          width="1774"
          height="887"
          fetchpriority="high"
          decoding="async"
        >
        <img
          class="shot shot-light absolute inset-0 block h-full w-full object-cover object-[62%_center]"
          src="/images/sajad-hero-light.webp"
          alt=""
          width="2019"
          height="779"
          decoding="async"
        >
      </div>
    </div>

    <div class="shell-wide relative z-[1] max-[860px]:pt-7">
      <div class="w-[min(38rem,100%)] py-4 max-[860px]:w-full max-[860px]:py-0">
        <p class="eyebrow">{{ role.lead || t.hero.eyebrow }}</p>
        <h1 class="display mt-[1.35rem] text-[clamp(2.85rem,6vw,5.35rem)] leading-[1.05] tracking-[-0.045em]">{{ name }}</h1>
        <p v-if="role.rest" class="mt-[1.35rem] max-w-[28rem] text-[clamp(1.55rem,2.6vw,2.25rem)] font-semibold leading-[1.22] tracking-[-0.04em] text-[var(--text-2)] [font-family:var(--font-display)] max-[860px]:max-w-none">{{ role.rest }}</p>
        <p class="lede intro mt-[1.35rem] max-w-[34rem]">{{ intro }}</p>
        <div class="mt-8 flex flex-wrap gap-[0.8rem]">
          <SiteButton variant="primary" arrow class="min-h-12 rounded-full px-5" @click="scrollToProjects">{{ t.hero.ctaPrimary }}</SiteButton>
          <SiteButton to="/about" variant="secondary" class="min-h-12 rounded-full px-5">{{ t.hero.ctaSecondary }}</SiteButton>
        </div>
      </div>
    </div>

    <a class="absolute bottom-7 z-[1] start-[var(--page-gutter)] inline-flex items-center gap-[0.7rem] font-mono text-[0.72rem] tracking-[0.08em] text-[var(--text-3)] uppercase fa:text-[0.84rem] fa:tracking-normal fa:normal-case" href="#projects">
      <span class="scroll-mark relative size-[1.7rem] rounded-full border border-[var(--line-strong)] before:absolute before:start-1/2 before:top-[0.35rem] before:h-[0.55rem] before:w-px before:-translate-x-1/2 before:bg-[var(--text-2)] before:content-[''] rtl:before:translate-x-1/2" aria-hidden="true" />
      {{ t.hero.scroll }}
    </a>
  </section>
</template>

<style scoped>
.media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, var(--bg) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 18%, transparent 46%),
    linear-gradient(to top, var(--bg) 0%, transparent 28%),
    linear-gradient(to left, color-mix(in srgb, var(--bg) 35%, transparent), transparent 18%);
  pointer-events: none;
}

[dir="rtl"] .media::after {
  background:
    linear-gradient(to left, var(--bg) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 18%, transparent 46%),
    linear-gradient(to top, var(--bg) 0%, transparent 28%),
    linear-gradient(to right, color-mix(in srgb, var(--bg) 35%, transparent), transparent 18%);
}

.shots {
  transition: transform 0.65s var(--ease);
}

[dir="rtl"] .shots {
  transform: scaleX(-1);
}

.shot {
  transition: opacity 0.65s var(--ease);
}

.shot-dark {
  opacity: 0;
}

.shot-light {
  opacity: 1;
}

html.dark .shot-dark {
  opacity: 1;
}

html.dark .shot-light {
  opacity: 0;
}

.ready .shot {
  animation: settle 1.3s var(--ease) both;
}

@keyframes settle {
  from { transform: scale(1.06); }
  to { transform: none; }
}

@media (max-width: 860px) {
  .media::after,
  [dir="rtl"] .media::after {
    background: linear-gradient(to top, var(--bg) 0%, transparent 42%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ready .shot {
    animation: none;
  }
}
</style>
