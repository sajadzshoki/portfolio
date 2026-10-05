<script setup lang="ts">
import { isExternal, localNum, safeHref } from '~/utils/studio'

const { data } = usePortfolio()
const { field, t, locale } = useLocale()

useSeoMeta({
  title: () => data.value ? `${t.value.contact.resume} — ${field(data.value.site.nameEn, data.value.site.nameFa)}` : t.value.contact.resume
})

function printPage() {
  window.print()
}

function endLabel(value: string) {
  return /^(now|present)$/i.test(value) ? t.value.present : localNum(value, locale.value)
}
</script>

<template>
  <div class="sz-wrap py-8 md:py-16">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4 print:hidden md:mb-10">
      <div>
        <SazanSectionLabel :text="t.resume.kicker" />
        <h1 class="sz-title mt-3">
          {{ data ? field(data.site.nameEn, data.site.nameFa) : '' }}
        </h1>
      </div>
      <SiteButton variant="primary" @click="printPage">
        {{ t.contact.resume }}
      </SiteButton>
    </div>

    <div class="grid gap-6 border-t border-line pt-6 lg:grid-cols-12 md:gap-10 md:pt-10">
      <aside class="lg:col-span-4">
        <p class="font-display text-2xl tracking-[-0.03em]">
          {{ data ? field(data.site.roleEn, data.site.roleFa) : '' }}
        </p>
        <p class="mt-3 text-muted">{{ data ? field(data.site.locationEn, data.site.locationFa) : '' }}</p>
        <p class="mt-1 text-sm">{{ data?.site.email }}</p>
        <ul class="mt-6 space-y-2 text-sm">
          <li v-for="social in data?.socials || []" :key="social.id">
            <a
              :href="safeHref(social.url)"
              class="hover:text-primary"
              :target="isExternal(social.url) ? '_blank' : undefined"
              rel="noopener noreferrer"
            >
              {{ social.name }} — {{ social.handle }}
            </a>
          </li>
        </ul>
      </aside>
      <div class="lg:col-span-8">
        <p class="text-lg leading-relaxed">
          {{ data ? field(data.about.bodyEn, data.about.bodyFa) : '' }}
        </p>

        <h2 class="mt-12 border-b border-line pb-2 font-display text-2xl">{{ t.about.experience }}</h2>
        <article v-for="item in data?.experience || []" :key="item.id" class="border-b border-line py-5">
          <p class="font-mono text-xs text-primary">{{ localNum(item.yearStart, locale) }} — {{ endLabel(item.yearEnd) }}</p>
          <h3 class="mt-1 font-display text-xl">{{ field(item.titleEn, item.titleFa) }} — {{ field(item.orgEn, item.orgFa) }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ field(item.bodyEn, item.bodyFa) }}</p>
        </article>

        <h2 class="mt-10 border-b border-line pb-2 font-display text-2xl">{{ t.about.education }}</h2>
        <article v-for="item in data?.education || []" :key="item.id" class="py-5">
          <p class="font-mono text-xs text-primary">{{ localNum(item.yearStart, locale) }} — {{ localNum(item.yearEnd, locale) }}</p>
          <h3 class="mt-1 font-display text-xl">{{ field(item.titleEn, item.titleFa) }}</h3>
          <p class="text-sm text-muted">{{ field(item.orgEn, item.orgFa) }}</p>
        </article>

        <h2 class="mt-10 border-b border-line pb-2 font-display text-2xl">{{ t.engineering.eyebrow }}</h2>
        <p class="mt-4 text-sm leading-7">
          {{ data?.skills.map(skill => skill.name).join('  ·  ') }}
        </p>
      </div>
    </div>
  </div>
</template>
