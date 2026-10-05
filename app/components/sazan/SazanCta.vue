<script setup lang="ts">
const { t } = useLocale()
const marks = ['site', 'app', 'platform'] as const
</script>

<template>
  <section id="contact" class="sz-cta">
    <div class="sz-wrap">
      <div class="sz-cta-board">
        <div class="sz-cta-copy">
          <SazanSectionLabel :text="t.cta.eyebrow" />
          <h2 class="sz-title mt-3">{{ t.cta.title }}</h2>
          <p class="sz-cta-body">{{ t.cta.body }}</p>
          <SiteButton to="/contact" variant="primary" size="lg" class="sz-cta-action">
            {{ t.cta.action }}
            <SazanArrow />
          </SiteButton>
        </div>

        <ul class="sz-cta-kinds" :aria-label="t.cta.action">
          <li v-for="(kind, i) in t.cta.kinds" :key="kind.title" class="sz-cta-kind">
            <span class="sz-cta-mark" aria-hidden="true">
              <svg v-if="marks[i] === 'site'" viewBox="0 0 48 48">
                <rect x="6" y="9" width="36" height="26" rx="3.5" />
                <path d="M6 16h36" />
                <circle cx="11" cy="12.5" r="1.1" class="hot" />
                <rect x="11" y="20" width="14" height="9" rx="1.6" class="hot" />
                <path d="M28 21h9M28 26h6" />
                <path d="M18 35h12" />
              </svg>
              <svg v-else-if="marks[i] === 'app'" viewBox="0 0 48 48">
                <rect x="15" y="6" width="18" height="36" rx="4" />
                <path d="M15 13h18M15 35h18" />
                <rect x="19" y="16.5" width="10" height="12" rx="1.6" class="hot" />
                <circle cx="24" cy="38" r="1.2" class="hot" />
              </svg>
              <svg v-else viewBox="0 0 48 48">
                <rect x="16" y="6" width="16" height="12" rx="2.5" />
                <rect x="6" y="30" width="14" height="12" rx="2.5" />
                <rect x="28" y="30" width="14" height="12" rx="2.5" />
                <path d="M24 18v6M24 24H13v6M24 24h11v6" />
                <circle cx="24" cy="12" r="2" class="hot" />
              </svg>
            </span>
            <div>
              <p class="sz-cta-kind-title">{{ kind.title }}</p>
              <p class="sz-cta-kind-body">{{ kind.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sz-cta {
  padding-block: 0.25rem 1.6rem;
}

.sz-cta-board {
  display: grid;
  gap: 1.35rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: calc(var(--sz-radius) + 0.4rem);
  background:
    radial-gradient(460px 240px at 100% 0%, color-mix(in srgb, var(--sz-primary) 16%, transparent), transparent 70%),
    var(--sz-surface);
  color: var(--sz-text);
  padding: 1.1rem 1rem 1rem;
  box-shadow: var(--sz-shadow-soft);
}

.sz-cta-body {
  max-width: 36rem;
  margin: 0.75rem 0 0;
  color: var(--sz-text-muted);
  font-size: 1.02rem;
  line-height: 1.7;
}

.sz-cta-action {
  margin-top: 1.15rem;
}

.sz-cta-kinds {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sz-cta-kind {
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  gap: 0.8rem;
  align-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 1.05rem;
  background: color-mix(in srgb, var(--sz-background) 70%, var(--sz-surface));
  padding: 0.7rem 0.85rem;
  transition:
    transform 0.35s var(--sz-ease),
    border-color 0.3s ease,
    box-shadow 0.35s ease;
}

.sz-cta-kind:hover {
  border-color: color-mix(in srgb, var(--sz-primary) 42%, var(--sz-border));
  background: var(--sz-surface);
  color: var(--sz-text);
  box-shadow: 0 18px 36px -24px color-mix(in srgb, var(--sz-primary) 45%, black);
  transform: translateY(-3px);
}

.sz-cta-mark {
  display: grid;
  width: 3.4rem;
  height: 3.4rem;
  place-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 0.9rem;
  background: var(--sz-surface);
  color: var(--sz-text);
}

.sz-cta-kind:hover .sz-cta-mark {
  border-color: color-mix(in srgb, var(--sz-primary) 35%, var(--sz-border));
  background: var(--sz-primary-soft);
  color: var(--sz-text);
}

.sz-cta-mark svg {
  width: 1.8rem;
  height: 1.8rem;
}

.sz-cta-mark svg :deep(circle),
.sz-cta-mark svg :deep(path),
.sz-cta-mark svg :deep(rect) {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sz-cta-mark svg :deep(.hot) {
  fill: var(--sz-primary);
  stroke: none;
}

.sz-cta-kind-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.3;
}

.sz-cta-kind-body {
  margin: 0.15rem 0 0;
  color: var(--sz-text-muted);
  font-size: 0.88rem;
  line-height: 1.55;
}

@media (min-width: 900px) {
  .sz-cta {
    padding-block: 0.6rem 3rem;
  }

  .sz-cta-board {
    grid-template-columns: minmax(0, 1.15fr) minmax(17rem, 0.85fr);
    gap: 2rem 2.6rem;
    padding: 2.15rem 2.3rem;
  }
}

html[lang="fa"] .sz-cta-kind-title,
html[dir="rtl"] .sz-cta-kind-title {
  font-family: var(--font-persian);
  letter-spacing: -0.03em;
  line-height: 1.45;
}

html[lang="fa"] .sz-cta-body,
html[dir="rtl"] .sz-cta-body,
html[lang="fa"] .sz-cta-kind-body,
html[dir="rtl"] .sz-cta-kind-body {
  line-height: 1.75;
}

@media (prefers-reduced-motion: reduce) {
  .sz-cta-kind {
    transition: none;
  }
}
</style>
