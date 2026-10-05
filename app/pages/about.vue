<script setup lang="ts">
import { isExternal, localNum, safeHref } from '~/utils/studio'

const { data } = usePortfolio()
const { t, field, locale } = useLocale()

const site = computed(() => data.value?.site)
const about = computed(() => data.value?.about)
const name = computed(() => site.value ? field(site.value.nameEn, site.value.nameFa) : '')
const role = computed(() => site.value ? field(site.value.roleEn, site.value.roleFa) : '')
const intro = computed(() => site.value ? field(site.value.introEn, site.value.introFa) : '')
const heading = computed(() => about.value ? field(about.value.headingEn, about.value.headingFa) : '')
const body = computed(() => about.value ? field(about.value.bodyEn, about.value.bodyFa) : '')
const location = computed(() => site.value ? field(site.value.locationEn, site.value.locationFa) : '')
const availability = computed(() => site.value ? field(site.value.availabilityEn, site.value.availabilityFa) : '')
const portraitUrl = computed(() => site.value?.portraitUrl?.trim() || '')
const portraitMissing = ref(false)
const hiddenShots = ref<Record<string, true>>({})

const chips = computed(() => {
  if (!site.value) return []
  return field(site.value.metaEn, site.value.metaFa)
    .split(/[·|,]/)
    .map(item => item.trim())
    .filter(Boolean)
})

const works = computed(() => (data.value?.projects || []).filter(item => item.imageUrl && !hiddenShots.value[item.id]))

watch(portraitUrl, () => {
  portraitMissing.value = false
})

useSeoMeta({
  title: () => name.value ? `${name.value} — SAZAN` : `${t.value.nav.about} — SAZAN`,
  description: () => body.value || t.value.about.pageLede,
  ogTitle: () => name.value ? `${name.value} — SAZAN` : `${t.value.nav.about} — SAZAN`,
  ogDescription: () => body.value || t.value.about.pageLede
})

function endLabel(value: string) {
  return /^(now|present)$/i.test(value) ? t.value.present : localNum(value, locale.value)
}

</script>

<template>
  <div class="sz-about">
    <div class="sz-wrap">
      <section class="sz-about-hero">
        <figure class="sz-about-portrait">
          <img
            v-if="portraitUrl && !portraitMissing"
            :src="portraitUrl"
            :alt="name || t.about.portrait"
            width="640"
            height="800"
            @error="portraitMissing = true"
          >
          <div v-else class="sz-about-fallback">
            <span>{{ t.about.portrait }}</span>
          </div>
        </figure>

        <div class="sz-about-copy">
          <SazanSectionLabel :text="t.about.eyebrow" />
          <h1 class="sz-title mt-3">{{ name }}</h1>
          <p v-if="role" class="sz-about-role">{{ role }}</p>
          <p v-if="intro" class="sz-about-intro">{{ intro }}</p>
          <h2 v-if="heading" class="sz-about-heading">{{ heading }}</h2>
          <p v-if="body" class="sz-about-body">{{ body }}</p>

          <ul v-if="location || availability || site?.email" class="sz-about-facts">
            <li v-if="location">{{ location }}</li>
            <li v-if="availability">{{ availability }}</li>
            <li v-if="site?.email">
              <a :href="`mailto:${site.email}`">{{ site.email }}</a>
            </li>
          </ul>

          <div v-if="site?.resumeUrl || data?.socials.length" class="sz-about-links">
            <NuxtLink v-if="site?.resumeUrl?.startsWith('/')" :to="site.resumeUrl" class="sz-about-pill">
              {{ t.contact.resume }}
              <SazanArrow />
            </NuxtLink>
            <a v-else-if="site?.resumeUrl" :href="site.resumeUrl" class="sz-about-pill">
              {{ t.contact.resume }}
              <SazanArrow />
            </a>
            <a
              v-for="item in data?.socials || []"
              :key="item.id"
              :href="safeHref(item.url)"
              class="sz-about-pill is-quiet"
              :target="isExternal(item.url) ? '_blank' : undefined"
              :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </section>

      <ul v-if="chips.length" class="sz-about-chips" :aria-label="t.stack">
        <li v-for="chip in chips" :key="chip">{{ chip }}</li>
      </ul>

      <section v-if="data?.experience.length" class="sz-about-block">
        <h2 class="sz-kicker">{{ t.about.experience }}</h2>
        <ol class="sz-about-list">
          <li v-for="item in data.experience" :key="item.id" class="sz-about-item">
            <p class="sz-about-years">
              {{ localNum(item.yearStart, locale) }} — {{ endLabel(item.yearEnd) }}
            </p>
            <h3 class="sz-about-item-title">
              {{ field(item.titleEn, item.titleFa) }}
              <span>{{ field(item.orgEn, item.orgFa) }}</span>
            </h3>
            <p v-if="field(item.locationEn, item.locationFa)" class="sz-about-where">
              {{ field(item.locationEn, item.locationFa) }}
            </p>
            <p v-if="field(item.bodyEn, item.bodyFa)" class="sz-about-item-body">
              {{ field(item.bodyEn, item.bodyFa) }}
            </p>
          </li>
        </ol>
      </section>

      <section v-if="data?.education.length" class="sz-about-block">
        <h2 class="sz-kicker">{{ t.about.education }}</h2>
        <ol class="sz-about-list">
          <li v-for="item in data.education" :key="item.id" class="sz-about-item">
            <p class="sz-about-years">
              {{ localNum(item.yearStart, locale) }} — {{ localNum(item.yearEnd, locale) }}
            </p>
            <h3 class="sz-about-item-title">{{ field(item.titleEn, item.titleFa) }}</h3>
            <p class="sz-about-where">{{ field(item.orgEn, item.orgFa) }}</p>
            <p v-if="field(item.locationEn, item.locationFa)" class="sz-about-item-body">
              {{ field(item.locationEn, item.locationFa) }}
            </p>
            <p v-if="field(item.bodyEn, item.bodyFa)" class="sz-about-item-body">
              {{ field(item.bodyEn, item.bodyFa) }}
            </p>
          </li>
        </ol>
      </section>

      <section v-if="works.length" class="sz-about-block">
        <div class="sz-about-block-head">
          <h2 class="sz-kicker">{{ t.work.eyebrow }}</h2>
          <NuxtLink to="/work" class="sz-about-more">
            {{ t.nav.work }}
            <SazanArrow />
          </NuxtLink>
        </div>
        <div class="sz-about-shots">
          <NuxtLink v-for="item in works" :key="item.id" :to="`/work/${item.slug}`" class="sz-about-shot">
            <img
              :src="item.imageUrl"
              :alt="field(item.titleEn, item.titleFa)"
              @error="hiddenShots = { ...hiddenShots, [item.id]: true }"
            >
            <span>{{ field(item.titleEn, item.titleFa) }}</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.sz-about {
  padding-block: 1.5rem 2rem;
}

.sz-about-hero {
  display: grid;
  gap: 1rem;
  align-items: start;
  grid-template-columns: minmax(0, 1fr);
}

.sz-about-portrait {
  max-width: 13.5rem;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: calc(var(--sz-radius) + 0.45rem);
  background:
    radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--sz-primary) 20%, transparent), transparent 62%),
    var(--sz-surface);
  box-shadow: var(--sz-shadow-soft);
}

.sz-about-portrait img,
.sz-about-fallback {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center top;
}

.sz-about-fallback {
  display: grid;
  place-items: center;
  color: var(--sz-text-subtle);
  font-size: 0.9rem;
}

.sz-about-role {
  margin: 0.7rem 0 0;
  color: var(--sz-primary);
  font-size: 0.98rem;
  font-weight: 600;
}

.sz-about-intro {
  max-width: 40rem;
  margin: 0.85rem 0 0;
  color: var(--sz-text);
  font-size: 1.05rem;
  line-height: 1.7;
}

.sz-about-heading {
  margin: 1.15rem 0 0;
  max-width: 38rem;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.7rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.35;
}

.sz-about-body {
  max-width: 40rem;
  margin: 0.75rem 0 0;
  color: var(--sz-text-muted);
  font-size: 1.02rem;
  line-height: 1.75;
}

.sz-about-facts,
.sz-about-chips,
.sz-about-links,
.sz-about-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sz-about-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.15rem;
}

.sz-about-facts li,
.sz-about-chips li {
  border: 1px solid var(--sz-border);
  border-radius: 999px;
  background: var(--sz-surface);
  padding: 0.35rem 0.75rem;
  color: var(--sz-text-muted);
  font-size: 0.84rem;
}

.sz-about-facts a {
  color: var(--sz-text);
  font-weight: 600;
}

.sz-about-facts a:hover,
.sz-about-more:hover {
  color: var(--sz-primary);
}

.sz-about-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.sz-about-pill,
.sz-about-more {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid var(--sz-border-strong);
  border-radius: 999px;
  background: var(--sz-surface);
  padding: 0.5rem 0.85rem;
  color: var(--sz-text);
  font-size: 0.88rem;
  font-weight: 600;
}

.sz-about-pill.is-quiet {
  border-color: var(--sz-border);
  background: transparent;
  color: var(--sz-text-muted);
  font-weight: 500;
}

.sz-about-pill:hover {
  border-color: var(--sz-primary);
  color: var(--sz-primary);
}

.sz-about-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.4rem;
}

.sz-about-block {
  margin-top: 2.4rem;
}

.sz-about-block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.sz-about-more {
  border: 0;
  background: transparent;
  padding: 0;
}

.sz-about-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-inline-start: 1.15rem;
}

.sz-about-list::before {
  content: "";
  position: absolute;
  inset-inline-start: 0.28rem;
  top: 1.15rem;
  bottom: 1.15rem;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--sz-primary) 0 7px,
    transparent 7px 13px
  );
}

.sz-about-item {
  position: relative;
  border: 1px solid var(--sz-border);
  border-radius: 1.1rem;
  transition:
    transform 0.35s var(--sz-ease),
    border-color 0.35s ease,
    box-shadow 0.35s ease;
  background:
    radial-gradient(220px 90px at 100% 0%, color-mix(in srgb, var(--sz-primary) 10%, transparent), transparent 70%),
    var(--sz-surface);
  padding: 0.95rem 1.05rem 1rem;
}

.sz-about-item::before {
  content: "";
  position: absolute;
  top: 1.25rem;
  inset-inline-start: -1.08rem;
  width: 0.62rem;
  height: 0.62rem;
  border: 2px solid var(--sz-primary);
  border-radius: 50%;
  background: var(--sz-background);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--sz-primary) 12%, transparent);
}

.sz-about-years {
  margin: 0;
  color: var(--sz-primary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}

.sz-about-item-title {
  margin: 0.35rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.3;
}

.sz-about-item-title span {
  color: var(--sz-text-muted);
  font-weight: 600;
}

.sz-about-where,
.sz-about-item-body {
  margin: 0.3rem 0 0;
  color: var(--sz-text-muted);
  font-size: 0.92rem;
  line-height: 1.7;
}

.sz-about-item:hover {
  border-color: color-mix(in srgb, var(--sz-primary) 42%, var(--sz-border));
  box-shadow: 0 18px 36px -24px color-mix(in srgb, var(--sz-primary) 45%, black);
  transform: translateY(-3px);
}

.sz-about-shots {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
  grid-template-columns: minmax(0, 1fr);
}

.sz-about-shot {
  position: relative;
  display: block;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: 1.1rem;
  background: var(--sz-surface);
  aspect-ratio: 16 / 10;
}

.sz-about-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--sz-ease);
}

.sz-about-shot span {
  position: absolute;
  inset-inline: 0.7rem;
  bottom: 0.7rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--sz-background) 88%, transparent);
  padding: 0.3rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 600;
}

.sz-about-shot:hover img {
  transform: scale(1.04);
}

@media (min-width: 720px) {
  .sz-about-portrait {
    max-width: none;
  }

  .sz-about-portrait img,
  .sz-about-fallback {
    aspect-ratio: 4 / 5;
  }

  .sz-about-shots {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }

  .sz-about-shots:has(> :only-child) {
    grid-template-columns: minmax(0, 36rem);
    justify-content: start;
  }
}

@media (min-width: 900px) {
  .sz-about {
    padding-block: 3.1rem 3.6rem;
  }

  .sz-about-hero {
    grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
    gap: 2.5rem 3rem;
  }
}

html[lang="fa"] .sz-about-heading,
html[dir="rtl"] .sz-about-heading,
html[lang="fa"] .sz-about-item-title,
html[dir="rtl"] .sz-about-item-title {
  font-family: var(--font-persian);
  letter-spacing: -0.03em;
}

html[lang="fa"] .sz-about-years,
html[dir="rtl"] .sz-about-years {
  font-family: var(--font-persian);
  letter-spacing: 0;
}

html[lang="fa"] .sz-about-heading,
html[dir="rtl"] .sz-about-heading {
  line-height: 1.55;
}

@media (prefers-reduced-motion: reduce) {
  .sz-about-shot img,
  .sz-about-item {
    transition: none;
  }
}
</style>
