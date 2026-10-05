<script setup lang="ts">
const { data } = usePortfolio()
const { field, t, locale } = useLocale()

const site = computed(() => data.value?.site)
const name = computed(() => site.value ? presentName(field(site.value.nameEn, site.value.nameFa)) : '')
const role = computed(() => site.value ? field(site.value.roleEn, site.value.roleFa) : '')

useSeoMeta({
  title: () => `${t.value.resume.title} — ${name.value}`,
  description: () => site.value ? field(site.value.introEn, site.value.introFa) : '',
  robots: 'noindex'
})

function printPage() {
  window.print()
}
</script>

<template>
  <div class="page">
    <div class="shell sheet">
      <div class="top no-print">
        <NuxtLink to="/">{{ name }}</NuxtLink>
        <button type="button" class="site-btn site-btn-primary" @click="printPage">{{ t.resume.print }}</button>
      </div>

      <header>
        <p class="eyebrow">{{ t.resume.title }}</p>
        <h1 class="display">{{ name }}</h1>
        <p class="role">{{ role }}</p>
        <p class="meta-line">
          <span>{{ site ? field(site.locationEn, site.locationFa) : '' }}</span>
          <a v-if="site?.email" :href="`mailto:${site.email}`">{{ site.email }}</a>
        </p>
      </header>

      <p class="lede">{{ data ? field(data.about.bodyEn, data.about.bodyFa) : '' }}</p>

      <section v-if="data?.experience.length">
        <h2>{{ t.experience.work }}</h2>
        <article v-for="item in data.experience" :key="item.id">
          <p class="when">{{ item.yearStart }} — {{ item.yearEnd }}</p>
          <h3>{{ field(item.titleEn, item.titleFa) }} — {{ field(item.orgEn, item.orgFa) }}</h3>
          <p>{{ field(item.bodyEn, item.bodyFa) }}</p>
        </article>
      </section>

      <section v-if="data?.education.length">
        <h2>{{ t.experience.education }}</h2>
        <article v-for="item in data.education" :key="item.id">
          <p class="when">{{ item.yearStart }} — {{ item.yearEnd }}</p>
          <h3>{{ field(item.titleEn, item.titleFa) }}</h3>
          <p>{{ field(item.orgEn, item.orgFa) }}<span v-if="field(item.locationEn, item.locationFa)"> · {{ field(item.locationEn, item.locationFa) }}</span></p>
        </article>
      </section>

      <section v-if="data?.skills.length">
        <h2>{{ t.skills.title }}</h2>
        <p class="tools">{{ data.skills.filter(skill => skill.isActive !== false).map(skill => skill.name).join(' · ') }}</p>
      </section>

      <section v-if="data?.projects.length">
        <h2>{{ t.projects.title }}</h2>
        <article v-for="item in data.projects" :key="item.id">
          <h3>{{ field(item.titleEn, item.titleFa) }} <span>{{ item.year }}</span></h3>
          <p>{{ field(item.descriptionEn, item.descriptionFa) }}</p>
        </article>
      </section>
    </div>
  </div>
</template>

<style scoped>
.top,
.meta-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.display {
  margin-top: 0.7rem;
  font-size: clamp(2.8rem, 7vw, 4.6rem);
}

.role,
.lede {
  margin-top: 0.8rem;
}

.meta-line {
  justify-content: flex-start;
  margin-top: 0.7rem;
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

section {
  margin-top: 2.2rem;
}

h2 {
  padding-bottom: 0.45rem;
  border-bottom: 1px solid var(--line);
  font-size: 0.78rem;
  font-family: var(--font-mono);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
}

html[lang="fa"] h2 {
  letter-spacing: 0;
  text-transform: none;
  font-size: 0.95rem;
}

article {
  padding-block: 0.9rem;
  border-bottom: 1px solid var(--line);
}

.when {
  color: var(--accent-contrast);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

h3 {
  margin-top: 0.2rem;
  font-size: 1.15rem;
  font-weight: 600;
}

h3 span,
article p {
  color: var(--text-2);
  font-weight: 400;
}

article p {
  margin-top: 0.35rem;
  line-height: 1.65;
}

.tools {
  margin-top: 0.9rem;
  line-height: 1.8;
}
</style>
