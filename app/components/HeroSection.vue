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
  <section id="top" class="hero" :class="{ ready }">
    <div class="media" aria-hidden="true">
      <img
        class="shot shot-dark"
        src="/images/sajad-hero-dark.png"
        alt=""
        width="1774"
        height="887"
        fetchpriority="high"
        decoding="async"
      >
      <img
        class="shot shot-light"
        src="/images/sajad-hero-light.png"
        alt=""
        width="2019"
        height="779"
        decoding="async"
      >
    </div>

    <div class="inner">
      <div class="copy">
        <p class="eyebrow">{{ role.lead || t.hero.eyebrow }}</p>
        <h1 class="display name">{{ name }}</h1>
        <p v-if="role.rest" class="statement">{{ role.rest }}</p>
        <p class="lede intro">{{ intro }}</p>
        <div class="actions">
          <SiteButton variant="primary" arrow @click="scrollToProjects">{{ t.hero.ctaPrimary }}</SiteButton>
          <SiteButton to="/about" variant="secondary">{{ t.hero.ctaSecondary }}</SiteButton>
        </div>
      </div>
    </div>

    <a class="scroll" href="#projects">
      <span class="scroll-mark" aria-hidden="true" />
      {{ t.hero.scroll }}
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 70dvh;
  padding-top: var(--header-h);
  padding-bottom: 4.5rem;
  overflow: hidden;
  background: var(--bg);
}

.media {
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  width: min(68%, 920px);
  z-index: 0;
}

.shot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% center;
  display: block;
}

.shot-light {
  visibility: hidden;
}

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

.inner {
  position: relative;
  z-index: 1;
  width: min(1320px, calc(100% - var(--page-gutter) * 2));
  margin-inline: auto;
}

.copy {
  width: min(38rem, 100%);
  padding-block: 1rem;
}

.name {
  margin-top: 1.35rem;
  font-size: clamp(2.85rem, 6vw, 5.35rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
}

.statement {
  margin-top: 1.35rem;
  max-width: 28rem;
  color: var(--text-2);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2.6vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.22;
}

.intro {
  margin-top: 1.35rem;
  max-width: 34rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
}

.actions :deep(.site-btn) {
  min-height: 3rem;
  padding-inline: 1.25rem;
  border-radius: 999px;
}

.scroll {
  position: absolute;
  z-index: 1;
  inset-inline-start: var(--page-gutter);
  bottom: 1.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

html[lang="fa"] .scroll {
  letter-spacing: 0;
  text-transform: none;
  font-size: 0.84rem;
}

.scroll-mark {
  width: 1.7rem;
  height: 1.7rem;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  position: relative;
}

.scroll-mark::before {
  content: "";
  position: absolute;
  inset-inline-start: 50%;
  top: 0.35rem;
  width: 1px;
  height: 0.55rem;
  background: var(--text-2);
  transform: translateX(-50%);
}

[dir="rtl"] .scroll-mark::before {
  transform: translateX(50%);
}

.ready .shot {
  animation: settle 1.3s var(--ease) both;
}

@keyframes settle {
  from { transform: scale(1.06); }
  to { transform: none; }
}

@media (max-width: 860px) {
  .hero {
    display: block;
    min-height: 0;
    padding-top: var(--header-h);
    padding-bottom: 4.5rem;
  }

  .media {
    position: relative;
    width: 100%;
    height: min(40.6vw, 224px);
    inset-inline-end: auto;
  }

  .media::after,
  [dir="rtl"] .media::after {
    background: linear-gradient(to top, var(--bg) 0%, transparent 42%);
  }

  .inner {
    width: min(1320px, calc(100% - var(--page-gutter) * 2));
    padding-top: 1.75rem;
  }

  .copy {
    width: 100%;
    padding-block: 0;
  }

  .name,
  .statement {
    max-width: none;
  }

  .scroll {
    inset-inline-start: var(--page-gutter);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ready .shot {
    animation: none;
  }
}
</style>

<style>
html:not(.dark) .hero .shot-dark {
  visibility: hidden;
}

html:not(.dark) .hero .shot-light {
  visibility: visible;
}
</style>
