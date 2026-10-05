<script setup lang="ts">
const { t } = useLocale()

const marks = ['interface', 'application', 'release'] as const
</script>

<template>
  <section id="practice" class="sz-practice">
    <div class="sz-wrap sz-practice-grid">
      <Reveal>
        <SazanSectionLabel :text="t.intro.eyebrow" />
        <h2 class="sz-title mt-3">
          <span class="block">{{ t.intro.line1 }}</span>
          <span class="block">{{ t.intro.line2 }}</span>
        </h2>
        <p class="sz-practice-body">{{ t.intro.body }}</p>
      </Reveal>

      <Reveal :delay="80">
        <ol class="sz-layers">
          <li v-for="(layer, i) in t.intro.layers" :key="layer.title" class="sz-layer">
            <span class="sz-layer-mark" aria-hidden="true">
              <svg v-if="marks[i] === 'interface'" viewBox="0 0 48 48">
                <rect x="7" y="10" width="34" height="24" rx="3.5" />
                <path d="M7 16.5h34" />
                <rect x="12" y="20.5" width="11" height="8" rx="1.5" class="hot" />
                <path d="M26 21.5h10M26 26h7" />
              </svg>
              <svg v-else-if="marks[i] === 'application'" viewBox="0 0 48 48">
                <path d="M24 8l14 7.5v15L24 38 10 30.5v-15L24 8z" />
                <path d="M24 23.5 38 15.5M24 23.5 10 15.5M24 23.5V38" />
                <path d="M24 23.5 38 15.5v5.5L24 29 10 21v-5.5L24 23.5z" class="hot" />
              </svg>
              <svg v-else viewBox="0 0 48 48">
                <path d="M16 36V14" />
                <path d="M16 15h15l-4 6 4 6H16z" class="hot" />
                <path d="M12 36h16" />
                <circle cx="34" cy="13" r="2" class="hot" />
              </svg>
            </span>
            <div>
              <p class="sz-layer-title">{{ layer.title }}</p>
              <p class="sz-layer-body">{{ layer.body }}</p>
            </div>
          </li>
        </ol>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.sz-practice {
  padding-block: 1.6rem 1.75rem;
}

.sz-practice-grid {
  display: grid;
  gap: 1rem;
  align-items: center;
}

.sz-practice-body {
  max-width: 38rem;
  margin: 0.85rem 0 0;
  color: var(--sz-text-muted);
  font-size: 1.02rem;
  line-height: 1.7;
}

.sz-layers {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin: 0;
  padding: 0.7rem;
  list-style: none;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: calc(var(--sz-radius) + 0.3rem);
  background:
    radial-gradient(320px 180px at 0% 0%, color-mix(in srgb, var(--sz-primary) 16%, transparent), transparent 72%),
    var(--sz-surface);
}

.sz-layers::before {
  content: "";
  position: absolute;
  z-index: 0;
  inset-inline-start: calc(0.7rem + 0.9rem + 1.75rem - 1px);
  top: 1.85rem;
  bottom: 1.85rem;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--sz-primary) 0 7px,
    transparent 7px 12px
  );
}

.sz-layer {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  gap: 0.85rem;
  align-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 1.05rem;
  background: color-mix(in srgb, var(--sz-background) 72%, var(--sz-surface));
  padding: 0.75rem 0.9rem;
  transition: border-color 0.3s ease, transform 0.4s var(--sz-ease);
}

.sz-layer:hover {
  border-color: color-mix(in srgb, var(--sz-primary) 45%, var(--sz-border));
  transform: translateY(-2px);
}

.sz-layer-mark {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 0.95rem;
  background: var(--sz-surface);
  color: var(--sz-text);
  box-shadow: var(--sz-shadow-soft);
}

.sz-layer-mark svg {
  width: 1.85rem;
  height: 1.85rem;
}

.sz-layer-mark svg :deep(circle),
.sz-layer-mark svg :deep(path),
.sz-layer-mark svg :deep(rect) {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sz-layer-mark svg :deep(.hot) {
  fill: var(--sz-primary);
  stroke: none;
}

.sz-layer-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.2;
}

.sz-layer-body {
  margin: 0.2rem 0 0;
  color: var(--sz-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (min-width: 900px) {
  .sz-practice {
    padding-block: 3.15rem 3.3rem;
  }

  .sz-practice-grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.82fr);
    gap: 2rem 3rem;
  }
}

html[lang="fa"] .sz-layer-title,
html[dir="rtl"] .sz-layer-title {
  font-family: var(--font-persian);
  font-size: 1.12rem;
  letter-spacing: -0.03em;
  line-height: 1.4;
}

html[lang="fa"] .sz-practice-body,
html[dir="rtl"] .sz-practice-body,
html[lang="fa"] .sz-layer-body,
html[dir="rtl"] .sz-layer-body {
  line-height: 1.75;
}

@media (prefers-reduced-motion: reduce) {
  .sz-layer {
    transition: none;
  }
}
</style>
