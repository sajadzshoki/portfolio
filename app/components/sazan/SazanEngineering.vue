<script setup lang="ts">
import { localNum } from '~/utils/studio'
import { techMark } from '~/utils/techMarks'

const { t, locale } = useLocale()
const { data } = usePortfolio()

const categoryFa: Record<string, string> = {
  Framework: 'فریم‌ورک',
  UI: 'رابط',
  Language: 'زبان',
  Markup: 'نشانه‌گذاری',
  Styling: 'استایل',
  Data: 'داده',
  Realtime: 'بلادرنگ',
  Auth: 'احراز هویت',
  Mobile: 'موبایل',
  DevOps: 'دواپس',
  Backend: 'بک‌اند'
}

const skills = computed(() => {
  const buckets = new Map<string, NonNullable<typeof data.value>['skills']>()
  for (const skill of data.value?.skills || []) {
    const list = buckets.get(skill.category) || []
    list.push(skill)
    buckets.set(skill.category, list)
  }
  return [...buckets.values()].flat()
})
const total = computed(() => skills.value.length)

function label(category: string) {
  if (locale.value === 'fa') return categoryFa[category] || category
  return category
}

function color(name: string) {
  return techMark(name)?.color || '#ff5a1f'
}
</script>

<template>
  <section id="engineering" class="sz-eng">
    <div class="sz-wrap">
      <Reveal>
        <div class="sz-eng-head">
          <div>
            <SazanSectionLabel :text="t.engineering.eyebrow" />
            <h2 class="sz-title mt-4 max-w-xl">{{ t.engineering.title }}</h2>
            <p class="sz-lede mt-4">{{ t.engineering.lede }}</p>
          </div>
          <p class="sz-eng-count">
            <span>{{ localNum(total, locale) }}</span>
            {{ locale === 'fa' ? 'ابزار' : 'tools' }}
          </p>
        </div>
      </Reveal>

      <div class="sz-eng-board">
        <ul class="sz-eng-grid">
          <li
            v-for="(skill, i) in skills"
            :key="skill.id"
            class="sz-tool"
            :style="{ '--mark': color(skill.name), '--i': i }"
          >
            <span class="sz-tool-cat">{{ label(skill.category) }}</span>
            <span class="sz-tool-mark">
              <SazanTechIcon :name="skill.name" />
            </span>
            <span class="sz-tool-name">{{ skill.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sz-eng {
  border-block: 1px solid var(--sz-border);
  background: var(--sz-background-soft);
  padding-block: 5rem;
}

.sz-eng-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
}

.sz-eng-count {
  margin: 0;
  color: var(--sz-text-muted);
  font-size: 0.95rem;
  white-space: nowrap;
}

.sz-eng-count span {
  display: block;
  color: var(--sz-text);
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 4vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.9;
}

.sz-eng-board {
  position: relative;
  margin-top: 2.75rem;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: calc(var(--sz-radius) + 0.4rem);
  background:
    radial-gradient(520px 180px at 100% 0%, color-mix(in srgb, var(--sz-primary) 16%, transparent), transparent 70%),
    var(--sz-surface);
  padding: 0.85rem;
}

.sz-eng-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8.6rem, 1fr));
  gap: 0.7rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sz-tool {
  position: relative;
  display: flex;
  min-height: 7.4rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  text-align: center;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--sz-background) 62%, var(--sz-surface));
  padding: 0.8rem 0.85rem 0.75rem;
  color: var(--sz-text);
  animation: sz-tool-in 0.7s var(--sz-ease) both;
  animation-delay: calc(var(--i) * 36ms);
  transition:
    transform 0.45s var(--sz-ease),
    background-color 0.35s ease,
    border-color 0.35s ease,
    color 0.35s ease,
    box-shadow 0.45s var(--sz-ease);
}

.sz-tool-cat {
  color: var(--sz-text-subtle);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
}

.sz-tool::before {
  content: "";
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 2px;
  background: var(--mark);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--sz-ease);
}

[dir="rtl"] .sz-tool::before {
  transform-origin: right;
}

.sz-tool:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--mark) 45%, var(--sz-border));
  background-color: var(--sz-surface);
  background-image: radial-gradient(140px 90px at 50% 0%, color-mix(in srgb, var(--mark) 16%, transparent), transparent 72%);
  color: var(--sz-text);
  box-shadow: 0 18px 36px -24px color-mix(in srgb, var(--mark) 50%, black);
}

.sz-tool:hover .sz-tool-cat {
  color: color-mix(in srgb, var(--mark) 72%, var(--sz-text));
}

.sz-tool:hover::before {
  transform: scaleX(1);
}

.sz-tool-mark {
  display: grid;
  width: 1.7rem;
  height: 1.7rem;
  place-items: center;
  color: color-mix(in srgb, var(--sz-text) 78%, transparent);
  font-size: 1.7rem;
  transition: color 0.3s ease, transform 0.45s var(--sz-ease);
}

.sz-tool-mark :deep(.sz-mark) {
  width: 1em;
  height: 1em;
}

.sz-tool:hover .sz-tool-mark {
  color: var(--mark);
  transform: translateY(-2px) scale(1.08);
}

.sz-tool-mark,
.sz-tool-name,
.sz-tool-cat {
  position: relative;
  z-index: 1;
}

.sz-tool-name {
  width: 100%;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-align: center;
}

@keyframes sz-tool-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 720px) {
  .sz-eng {
    padding-block: 2.15rem;
  }

  .sz-eng-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }

  .sz-eng-board {
    margin-top: 1.15rem;
    padding: 0.5rem;
  }

  .sz-eng-row,
  .sz-eng-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.4rem;
  }

  .sz-tool {
    min-height: 4.7rem;
    gap: 0.3rem;
    padding: 0.5rem 0.35rem 0.45rem;
  }

  .sz-tool-name {
    font-size: 0.7rem;
  }
}

html[lang="fa"] .sz-tool-cat,
html[dir="rtl"] .sz-tool-cat {
  letter-spacing: 0;
  text-transform: none;
  font-size: 0.72rem;
}

html.dark .sz-tool:hover {
  border-color: transparent;
  background-color: #243044;
  background-image: none;
  color: #f4f7fb;
}

html.dark .sz-tool:hover .sz-tool-cat {
  color: color-mix(in srgb, var(--mark) 75%, white);
}

html[lang="fa"] .sz-eng-count span,
html[dir="rtl"] .sz-eng-count span {
  font-family: var(--font-persian);
  letter-spacing: -0.03em;
}

@media (prefers-reduced-motion: reduce) {
  .sz-tool {
    animation: none;
    transition: none;
  }
}
</style>
