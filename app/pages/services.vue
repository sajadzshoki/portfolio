<script setup lang="ts">
import { padNum } from '~/utils/studio'

const { data } = usePortfolio()
const { t, field, locale } = useLocale()

const areas = computed(() => data.value?.focusAreas || [])

useSeoMeta({
  title: () => `${t.value.services.title} — SAZAN`,
  description: () => t.value.services.pageLede,
  ogTitle: () => `${t.value.services.title} — SAZAN`,
  ogDescription: () => t.value.services.pageLede
})

function kind(index: number) {
  return index % 5
}
</script>

<template>
  <div class="sz-offers">
    <div class="sz-wrap">
      <header class="sz-offers-hero">
        <div>
          <SazanSectionLabel :text="t.services.eyebrow" />
          <h1 class="sz-title mt-3">{{ t.services.title }}</h1>
          <p class="sz-lede mt-3">{{ t.services.pageLede }}</p>
        </div>
        <nav v-if="areas.length" class="sz-offers-index" :aria-label="t.services.eyebrow">
          <a v-for="(area, i) in areas" :key="area.id" :href="`#${area.id}`">
            <span>{{ padNum(i + 1, locale) }}</span>
            {{ field(area.titleEn, area.titleFa) }}
          </a>
        </nav>
      </header>

      <ol v-if="areas.length" class="sz-offers-list">
        <li v-for="(area, i) in areas" :id="area.id" :key="area.id" class="sz-offer">
          <span class="sz-offer-mark" aria-hidden="true">
            <svg v-if="kind(i) === 0" viewBox="0 0 48 48">
              <rect x="6" y="11" width="36" height="24" rx="3.5" />
              <path d="M6 17h36" />
              <rect x="11" y="21" width="12" height="8" rx="1.5" class="hot" />
              <path d="M26 22h11M26 26.5h8" />
            </svg>
            <svg v-else-if="kind(i) === 1" viewBox="0 0 48 48">
              <rect x="8" y="8" width="22" height="16" rx="3" />
              <rect x="16" y="18" width="24" height="18" rx="3" />
              <path d="M21 24h12M21 29h8" />
              <rect x="16" y="18" width="24" height="6" class="hot" />
            </svg>
            <svg v-else-if="kind(i) === 2" viewBox="0 0 48 48">
              <rect x="15" y="5" width="18" height="38" rx="4" />
              <path d="M21 9.5h6" />
              <rect x="19" y="15" width="10" height="14" rx="1.5" class="hot" />
              <circle cx="24" cy="37" r="1.5" class="hot" />
            </svg>
            <svg v-else-if="kind(i) === 3" viewBox="0 0 48 48">
              <path d="M6 30c4-9 7 9 11 0s7 9 11 0 7 9 11 0" />
              <circle cx="24" cy="16" r="3.2" class="hot" />
              <path d="M15 16a9 9 0 0 1 18 0" />
              <path d="M11 12a14 14 0 0 1 26 0" />
            </svg>
            <svg v-else viewBox="0 0 48 48">
              <rect x="7" y="7" width="14" height="14" rx="3" class="hot" />
              <rect x="27" y="7" width="14" height="14" rx="3" />
              <rect x="7" y="27" width="14" height="14" rx="3" />
              <rect x="27" y="27" width="14" height="14" rx="3" />
            </svg>
          </span>
          <div class="sz-offer-copy">
            <p class="sz-offer-n">{{ padNum(i + 1, locale) }}</p>
            <h2 class="sz-offer-title">{{ field(area.titleEn, area.titleFa) }}</h2>
            <p v-if="field(area.bodyEn, area.bodyFa)" class="sz-offer-body">
              {{ field(area.bodyEn, area.bodyFa) }}
            </p>
          </div>
        </li>
      </ol>

      <div class="sz-offers-next">
        <p>{{ t.cta.body }}</p>
        <SiteButton to="/contact" variant="primary" size="lg">
          {{ t.cta.action }}
          <SazanArrow />
        </SiteButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sz-offers {
  padding-block: 1.5rem 1.75rem;
}

.sz-offers-hero {
  display: grid;
  gap: 1.25rem;
  align-items: end;
}

.sz-offers-index {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.sz-offers-index a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid var(--sz-border);
  border-radius: 999px;
  background: var(--sz-surface);
  padding: 0.4rem 0.75rem;
  color: var(--sz-text);
  font-size: 0.86rem;
  font-weight: 600;
}

.sz-offers-index a span {
  color: var(--sz-primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.sz-offers-index a:hover {
  border-color: color-mix(in srgb, var(--sz-primary) 45%, var(--sz-border));
  background: var(--sz-surface);
  color: var(--sz-text);
}

.sz-offers-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1.1rem 0 0;
  padding: 0;
  padding-inline-start: 1.15rem;
  list-style: none;
}

.sz-offers-list::before {
  content: "";
  position: absolute;
  inset-inline-start: 0.28rem;
  top: 1.4rem;
  bottom: 1.4rem;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--sz-primary) 0 7px,
    transparent 7px 13px
  );
}

.sz-offer {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.9rem 1rem;
  align-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 1.15rem;
  background:
    radial-gradient(280px 140px at 100% 0%, color-mix(in srgb, var(--sz-primary) 12%, transparent), transparent 72%),
    var(--sz-surface);
  padding: 1rem 1.05rem;
  scroll-margin-top: 6.5rem;
  transition:
    transform 0.35s var(--sz-ease),
    border-color 0.3s ease,
    box-shadow 0.35s ease;
}

.sz-offer::before {
  content: "";
  position: absolute;
  top: 1.55rem;
  inset-inline-start: -1.08rem;
  width: 0.62rem;
  height: 0.62rem;
  border: 2px solid var(--sz-primary);
  border-radius: 50%;
  background: var(--sz-background);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--sz-primary) 12%, transparent);
}

.sz-offer:hover {
  border-color: color-mix(in srgb, var(--sz-primary) 42%, var(--sz-border));
  background:
    radial-gradient(280px 140px at 100% 0%, color-mix(in srgb, var(--sz-primary) 16%, transparent), transparent 72%),
    var(--sz-surface);
  color: var(--sz-text);
  box-shadow: 0 18px 36px -24px color-mix(in srgb, var(--sz-primary) 45%, black);
  transform: translateY(-3px);
}

.sz-offer-mark {
  display: grid;
  width: 3.6rem;
  height: 3.6rem;
  place-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 1rem;
  background: var(--sz-background);
  color: var(--sz-text);
}

.sz-offer:hover .sz-offer-mark {
  border-color: color-mix(in srgb, var(--sz-primary) 35%, var(--sz-border));
  background: var(--sz-primary-soft);
  color: var(--sz-text);
}

.sz-offer-mark svg {
  width: 1.85rem;
  height: 1.85rem;
}

.sz-offer-mark svg :deep(circle),
.sz-offer-mark svg :deep(path),
.sz-offer-mark svg :deep(rect) {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sz-offer-mark svg :deep(.hot) {
  fill: var(--sz-primary);
  stroke: none;
}

.sz-offer-n {
  margin: 0;
  color: var(--sz-primary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

.sz-offer-title {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.25;
}

.sz-offer-body {
  max-width: 40rem;
  margin: 0.35rem 0 0;
  color: var(--sz-text-muted);
  font-size: 0.98rem;
  line-height: 1.7;
}

.sz-offers-next {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.4rem;
  border: 1px solid var(--sz-border);
  border-radius: calc(var(--sz-radius) + 0.25rem);
  background:
    radial-gradient(360px 160px at 100% 0%, color-mix(in srgb, var(--sz-primary) 14%, transparent), transparent 70%),
    var(--sz-surface);
  padding: 1.15rem 1.2rem;
}

.sz-offers-next p {
  max-width: 36rem;
  margin: 0;
  color: var(--sz-text-muted);
  line-height: 1.7;
}

@media (min-width: 900px) {
  .sz-offers {
    padding-block: 3.1rem 3.4rem;
  }

  .sz-offers-hero {
    grid-template-columns: minmax(0, 1.15fr) minmax(14rem, 0.7fr);
    gap: 2rem 3rem;
  }

  .sz-offers-index {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.4rem;
  }

  .sz-offer {
    grid-template-columns: 4.4rem minmax(0, 1fr);
    padding: 1.15rem 1.35rem;
  }
}

html[lang="fa"] .sz-offer-title,
html[dir="rtl"] .sz-offer-title {
  font-family: var(--font-persian);
  letter-spacing: -0.03em;
  line-height: 1.45;
}

html[lang="fa"] .sz-offer-n,
html[dir="rtl"] .sz-offer-n,
html[lang="fa"] .sz-offers-index a span,
html[dir="rtl"] .sz-offers-index a span {
  font-family: var(--font-persian);
  letter-spacing: 0;
}

html[lang="fa"] .sz-offer-body,
html[dir="rtl"] .sz-offer-body,
html[lang="fa"] .sz-offers-next p,
html[dir="rtl"] .sz-offers-next p {
  line-height: 1.8;
}

@media (prefers-reduced-motion: reduce) {
  .sz-offer {
    transition: none;
  }
}
</style>
