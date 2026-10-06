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
      <div class="no-print flex flex-wrap items-center justify-between gap-[0.8rem]">
        <NuxtLink to="/">{{ name }}</NuxtLink>
        <button type="button" class="site-btn site-btn-primary" @click="printPage">{{ t.resume.print }}</button>
      </div>

      <header>
        <p class="eyebrow">{{ t.resume.title }}</p>
        <h1 class="display mt-[0.7rem] text-[clamp(2.8rem,7vw,4.6rem)]">{{ name }}</h1>
        <p class="mt-[0.8rem]">{{ role }}</p>
        <p class="mt-[0.7rem] flex flex-wrap items-center justify-start gap-[0.8rem] font-mono text-[0.78rem] text-[var(--text-3)]">
          <span>{{ site ? field(site.locationEn, site.locationFa) : '' }}</span>
          <a v-if="site?.email" :href="`mailto:${site.email}`">{{ site.email }}</a>
        </p>
      </header>

      <p class="lede mt-[0.8rem]">{{ data ? field(data.about.bodyEn, data.about.bodyFa) : '' }}</p>

      <section v-if="data?.experience.length" class="mt-[2.2rem]">
        <h2 class="border-b border-[var(--line)] pb-[0.45rem] font-mono text-[0.78rem] font-medium tracking-[0.12em] text-[var(--text-3)] uppercase fa:text-[0.95rem] fa:tracking-normal fa:normal-case">{{ t.experience.work }}</h2>
        <article v-for="item in data.experience" :key="item.id" class="border-b border-[var(--line)] py-[0.9rem]">
          <p class="font-mono text-[0.75rem] text-[var(--accent-contrast)]">{{ item.yearStart }} — {{ item.yearEnd }}</p>
          <h3 class="mt-[0.2rem] text-[1.15rem] font-semibold">{{ field(item.titleEn, item.titleFa) }} — {{ field(item.orgEn, item.orgFa) }}</h3>
          <p class="mt-[0.35rem] leading-[1.65] font-normal text-[var(--text-2)]">{{ field(item.bodyEn, item.bodyFa) }}</p>
        </article>
      </section>

      <section v-if="data?.education.length" class="mt-[2.2rem]">
        <h2 class="border-b border-[var(--line)] pb-[0.45rem] font-mono text-[0.78rem] font-medium tracking-[0.12em] text-[var(--text-3)] uppercase fa:text-[0.95rem] fa:tracking-normal fa:normal-case">{{ t.experience.education }}</h2>
        <article v-for="item in data.education" :key="item.id" class="border-b border-[var(--line)] py-[0.9rem]">
          <p class="font-mono text-[0.75rem] text-[var(--accent-contrast)]">{{ item.yearStart }} — {{ item.yearEnd }}</p>
          <h3 class="mt-[0.2rem] text-[1.15rem] font-semibold">{{ field(item.titleEn, item.titleFa) }}</h3>
          <p class="mt-[0.35rem] leading-[1.65] font-normal text-[var(--text-2)]">{{ field(item.orgEn, item.orgFa) }}<span v-if="field(item.locationEn, item.locationFa)"> · {{ field(item.locationEn, item.locationFa) }}</span></p>
        </article>
      </section>

      <section v-if="data?.skills.length" class="mt-[2.2rem]">
        <h2 class="border-b border-[var(--line)] pb-[0.45rem] font-mono text-[0.78rem] font-medium tracking-[0.12em] text-[var(--text-3)] uppercase fa:text-[0.95rem] fa:tracking-normal fa:normal-case">{{ t.skills.title }}</h2>
        <p class="mt-[0.9rem] leading-[1.8]">{{ data.skills.filter(skill => skill.isActive !== false).map(skill => skill.name).join(' · ') }}</p>
      </section>

      <section v-if="data?.projects.length" class="mt-[2.2rem]">
        <h2 class="border-b border-[var(--line)] pb-[0.45rem] font-mono text-[0.78rem] font-medium tracking-[0.12em] text-[var(--text-3)] uppercase fa:text-[0.95rem] fa:tracking-normal fa:normal-case">{{ t.projects.title }}</h2>
        <article v-for="item in data.projects" :key="item.id" class="border-b border-[var(--line)] py-[0.9rem]">
          <h3 class="mt-[0.2rem] text-[1.15rem] font-semibold">{{ field(item.titleEn, item.titleFa) }} <span class="font-normal text-[var(--text-2)]">{{ item.year }}</span></h3>
          <p class="mt-[0.35rem] leading-[1.65] font-normal text-[var(--text-2)]">{{ field(item.descriptionEn, item.descriptionFa) }}</p>
        </article>
      </section>
    </div>
  </div>
</template>
