<script setup lang="ts">
import { padNum } from '~/utils/studio'

const props = defineProps<{
  index: number
  title: string
  body: string
  href?: string
  lead?: boolean
}>()

const { locale } = useLocale()
const kind = computed(() => props.index % 5)
const link = resolveComponent('NuxtLink')
const tag = computed(() => props.href ? link : 'article')
const num = computed(() => padNum(props.index + 1, locale.value))
</script>

<template>
  <component
    :is="tag"
    :to="href"
    class="sz-svc"
    :class="{ 'is-lead': lead }"
    :style="{ '--i': index }"
  >
    <span class="sz-svc-top">
      <span class="sz-svc-n">{{ num }}</span>
      <span class="sz-svc-mark" aria-hidden="true">
        <svg v-if="kind === 0" viewBox="0 0 48 48">
          <rect x="6" y="11" width="36" height="24" rx="3.5" />
          <path d="M6 17h36" />
          <rect x="11" y="21" width="12" height="8" rx="1.5" class="hot" />
          <path d="M26 22h11M26 26.5h8" />
        </svg>
        <svg v-else-if="kind === 1" viewBox="0 0 48 48">
          <rect x="8" y="8" width="22" height="16" rx="3" />
          <rect x="16" y="18" width="24" height="18" rx="3" />
          <path d="M21 24h12M21 29h8" />
          <rect x="16" y="18" width="24" height="6" class="hot" />
        </svg>
        <svg v-else-if="kind === 2" viewBox="0 0 48 48">
          <rect x="15" y="5" width="18" height="38" rx="4" />
          <path d="M21 9.5h6" />
          <rect x="19" y="15" width="10" height="14" rx="1.5" class="hot" />
          <circle cx="24" cy="37" r="1.5" class="hot" />
        </svg>
        <svg v-else-if="kind === 3" viewBox="0 0 48 48">
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
    </span>
    <h3 class="sz-svc-title">{{ title }}</h3>
    <p class="sz-svc-body">{{ body }}</p>
    <span v-if="href" class="sz-svc-go" aria-hidden="true">
      <SazanArrow />
    </span>
  </component>
</template>

<style scoped>
.sz-svc {
  position: relative;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: calc(var(--sz-radius) + 0.15rem);
  background:
    radial-gradient(220px 140px at 100% 0%, color-mix(in srgb, var(--sz-primary) 18%, transparent), transparent 70%),
    var(--sz-background);
  padding: 1.05rem 1.1rem 1rem;
  color: inherit;
  text-decoration: none;
  animation: sz-svc-in 0.7s var(--sz-ease) both;
  animation-delay: calc(var(--i) * 55ms);
  transition:
    transform 0.45s var(--sz-ease),
    border-color 0.3s ease,
    box-shadow 0.45s var(--sz-ease);
}

.sz-svc::before {
  content: "";
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 2px;
  background: var(--sz-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--sz-ease);
}

[dir="rtl"] .sz-svc::before {
  transform-origin: right;
}

.sz-svc:hover {
  border-color: color-mix(in srgb, var(--sz-primary) 42%, var(--sz-border));
  background:
    radial-gradient(240px 150px at 100% 0%, color-mix(in srgb, var(--sz-primary) 16%, transparent), transparent 70%),
    var(--sz-surface);
  color: var(--sz-text);
  box-shadow: 0 18px 36px -24px color-mix(in srgb, var(--sz-primary) 45%, black);
  transform: translateY(-4px);
}

.sz-svc:hover::before {
  transform: scaleX(1);
}

.sz-svc-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.sz-svc-n {
  color: var(--sz-primary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
}

.sz-svc-mark {
  display: grid;
  width: 3.35rem;
  height: 3.35rem;
  place-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 0.95rem;
  background: color-mix(in srgb, var(--sz-surface) 88%, white);
  color: var(--sz-text);
  transition: transform 0.45s var(--sz-ease), border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.sz-svc:hover .sz-svc-mark {
  border-color: color-mix(in srgb, var(--sz-primary) 35%, var(--sz-border));
  background: var(--sz-primary-soft);
  color: var(--sz-text);
  transform: translateY(-3px);
}

.sz-svc-mark svg {
  width: 1.7rem;
  height: 1.7rem;
}

.sz-svc-mark svg :deep(*) {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sz-svc-mark svg :deep(.hot) {
  fill: var(--sz-primary);
  stroke: none;
}

.sz-svc-title {
  margin: 0.7rem 0 0;
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.2;
}

.sz-svc-body {
  margin: 0.4rem 0 0;
  color: var(--sz-text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.sz-svc:hover .sz-svc-body {
  color: var(--sz-text-muted);
}

.sz-svc-go {
  display: inline-flex;
  margin-top: auto;
  padding-top: 1rem;
  color: var(--sz-primary);
  transition: transform 0.35s var(--sz-ease);
}

.sz-svc:hover .sz-svc-go {
  transform: translateX(4px);
}

[dir="rtl"] .sz-svc:hover .sz-svc-go {
  transform: translateX(-4px);
}

.is-lead .sz-svc-mark {
  width: 4.15rem;
  height: 4.15rem;
  border-radius: 1.15rem;
}

@media (min-width: 720px) {
  .sz-svc-title {
    margin-top: 0.95rem;
    font-size: 1.28rem;
  }
}

@media (min-width: 1080px) {
  .is-lead {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 1.2rem;
    align-items: center;
    padding: 1.2rem 1.3rem;
  }

  .is-lead .sz-svc-top {
    grid-row: 1 / span 3;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
  }

  .is-lead .sz-svc-title,
  .is-lead .sz-svc-body,
  .is-lead .sz-svc-go {
    grid-column: 2;
  }

  .is-lead .sz-svc-title {
    margin-top: 0;
  }

  .is-lead .sz-svc-go {
    padding-top: 0.7rem;
  }
}

.is-lead .sz-svc-mark svg {
  width: 2.25rem;
  height: 2.25rem;
}

.is-lead .sz-svc-title {
  font-size: clamp(1.6rem, 2vw, 2rem);
}

.is-lead .sz-svc-body {
  max-width: 22rem;
  margin-top: 0.55rem;
  font-size: 1rem;
}

@keyframes sz-svc-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

html[lang="fa"] .sz-svc-n,
html[dir="rtl"] .sz-svc-n,
html[lang="fa"] .sz-svc-title,
html[dir="rtl"] .sz-svc-title {
  font-family: var(--font-persian);
  letter-spacing: 0;
}

html[lang="fa"] .sz-svc-title,
html[dir="rtl"] .sz-svc-title {
  font-size: 1.16rem;
  line-height: 1.4;
}

html[lang="fa"] .is-lead .sz-svc-title,
html[dir="rtl"] .is-lead .sz-svc-title {
  font-size: 1.45rem;
}

html[lang="fa"] .sz-svc-body,
html[dir="rtl"] .sz-svc-body {
  line-height: 1.75;
}

html.dark .sz-svc:hover {
  border-color: transparent;
  background:
    radial-gradient(240px 150px at 100% 0%, color-mix(in srgb, var(--sz-primary) 24%, transparent), transparent 68%),
    #243044;
  color: #f4f7fb;
}

html.dark .sz-svc:hover .sz-svc-mark {
  border-color: transparent;
  background: #1a2330;
  color: #f4f7fb;
}

html.dark .sz-svc:hover .sz-svc-body {
  color: #c5ced8;
}

@media (prefers-reduced-motion: reduce) {
  .sz-svc,
  .sz-svc-mark,
  .sz-svc-go,
  .sz-svc::before {
    animation: none;
    transition: none;
  }
}
</style>
