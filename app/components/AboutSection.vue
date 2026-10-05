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
    <div class="shell-wide layout">
      <figure v-if="site?.portraitUrl" class="visual">
        <span v-if="role" class="side">{{ role }}</span>
        <img :src="site.portraitUrl" :alt="t.hero.portrait" width="720" height="900">
      </figure>

      <div class="copy">
        <p class="eyebrow">{{ t.about.eyebrow }}</p>
        <h2 class="display heading">{{ heading || t.about.title }}</h2>
        <p class="lede">{{ body }}</p>
        <div class="links">
          <a
            v-for="item in links"
            :key="item.id"
            :href="safeHref(item.url)"
            target="_blank"
            rel="noreferrer"
          >
            <svg v-if="/github/i.test(item.name)" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.39v-1.36c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.89.88 2.35.67.07-.52.28-.88.5-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .22.15.47.55.39A8 8 0 0 0 8 0" /></svg>
            <svg v-else viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M3.6 14.5H1.1V5.4h2.5zM2.35 4.2A1.45 1.45 0 1 1 2.34 1.3a1.45 1.45 0 0 1 .01 2.9M14.9 14.5h-2.5V10c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58H6.68V5.4h2.4v1.24h.03c.33-.63 1.15-1.3 2.37-1.3 2.54 0 3.01 1.67 3.01 3.84z" /></svg>
            {{ item.name }}
          </a>
          <NuxtLink v-if="site?.resumeUrl" :to="site.resumeUrl">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.3" d="M4 1.5h5.2L13 5.3V14.5H4z" /><path fill="none" stroke="currentColor" stroke-width="1.3" d="M9 1.5V5.5h4M6 8.5h4M6 11h4" /></svg>
            {{ t.contact.resume }}
          </NuxtLink>
        </div>

        <div v-if="!featured && data?.focusAreas.length" class="focus">
          <h3>{{ t.about.focus }}</h3>
          <ol>
            <li v-for="item in data.focusAreas" :key="item.id">
              <strong>{{ field(item.titleEn, item.titleFa) }}</strong>
              <span>{{ field(item.bodyEn, item.bodyFa) }}</span>
            </li>
          </ol>
        </div>
      </div>

      <aside v-if="company || since || location" class="facts">
        <p v-if="company">
          <strong>{{ company }}</strong>
          <span>{{ t.about.company }}</span>
        </p>
        <p v-if="since">
          <strong>{{ since }}</strong>
          <span>{{ t.about.since }}</span>
        </p>
        <p v-if="location" class="where">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.2a4.3 4.3 0 0 0-4.3 4.3c0 3.2 4.3 9.3 4.3 9.3s4.3-6.1 4.3-9.3A4.3 4.3 0 0 0 8 1.2m0 5.8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" /></svg>
          {{ location }}
        </p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 1.75rem;
  align-items: center;
}

.visual {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin: 0;
}

.side {
  flex: none;
  writing-mode: vertical-rl;
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

html[lang="fa"] .side {
  letter-spacing: 0;
  text-transform: none;
  font-family: var(--font-persian);
  font-size: 0.86rem;
}

.visual img {
  width: min(100%, 280px);
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 16%;
  display: block;
}

.heading {
  margin-top: 0.75rem;
  font-size: clamp(1.7rem, 2.8vw, 2.45rem);
  max-width: 18em;
  line-height: 1.08;
  text-wrap: balance;
}

.lede {
  margin-top: 0.9rem;
  max-width: 38rem;
  font-size: 0.98rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem 1.35rem;
  margin-top: 1.35rem;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-2);
  font-size: 0.92rem;
}

.links a:hover {
  color: var(--text);
}

.links svg {
  width: 1rem;
  height: 1rem;
}

.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

.facts p {
  margin: 0;
}

.facts strong {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2vw, 1.85rem);
  font-weight: 650;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.facts span,
.where {
  color: var(--text-3);
  font-size: 0.82rem;
}

.where {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  align-self: end;
}

.where svg {
  width: 0.9rem;
  height: 0.9rem;
  flex: none;
}

.focus {
  margin-top: 2rem;
}

.focus h3 {
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

html[lang="fa"] .focus h3 {
  letter-spacing: 0;
  text-transform: none;
  font-size: 0.85rem;
}

ol {
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  gap: 0.25rem;
  padding-block: 0.85rem;
  border-top: 1px solid var(--line);
}

li strong {
  font-weight: 600;
  letter-spacing: -0.02em;
}

li span {
  color: var(--text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (min-width: 860px) {
  .layout {
    grid-template-columns: minmax(200px, 260px) minmax(0, 1fr);
    gap: 2rem 2.5rem;
  }

  .facts {
    grid-column: 2;
    max-width: 28rem;
  }
}

@media (min-width: 1100px) {
  .layout {
    grid-template-columns: minmax(220px, 280px) minmax(0, 1fr) minmax(9rem, 12rem);
  }

  .facts {
    grid-column: auto;
    grid-template-columns: 1fr;
    justify-items: end;
    text-align: end;
    gap: 1.5rem;
    max-width: none;
  }

  .where {
    justify-content: flex-end;
  }
}
</style>
