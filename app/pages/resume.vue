<script setup lang="ts">
const { data } = usePortfolio()
const { field, t, locale } = useLocale()

useHead(() => ({
  title: data.value ? `Resume — ${field(data.value.site.nameEn, data.value.site.nameFa)}` : 'Resume'
}))

function printPage() {
  window.print()
}
</script>

<template>
  <div class="site-shell py-28">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4 print:hidden">
      <div>
        <p class="meta text-muted mb-2">
          <span class="text-signal">$</span> resume — 2026
        </p>
        <h1 class="font-display text-5xl tracking-[-0.04em]">
          {{ data ? field(data.site.nameEn, data.site.nameFa) : '' }}
        </h1>
      </div>
      <SiteButton variant="primary" @click="printPage">
        {{ t.contact.resume }}
      </SiteButton>
    </div>

    <div class="grid grid-cols-12 gap-8 border-t border-dashed border-[color-mix(in_srgb,var(--ink)_35%,transparent)] pt-10">
      <aside class="col-span-12 md:col-span-4">
        <p class="font-display text-2xl tracking-[-0.03em]">
          {{ data ? field(data.site.roleEn, data.site.roleFa) : '' }}
        </p>
        <p class="mt-3 text-muted">{{ data ? field(data.site.locationEn, data.site.locationFa) : '' }}</p>
        <p class="mt-1 font-mono text-sm">{{ data?.site.email }}</p>
        <ul class="mt-8 space-y-2">
          <li v-for="s in data?.socials || []" :key="s.id" class="font-mono text-xs">
            <a :href="s.url" class="hover:text-signal">{{ s.name }} — {{ s.handle }}</a>
          </li>
        </ul>
      </aside>

      <div class="col-span-12 md:col-span-8">
        <p class="text-[1.05rem] leading-relaxed text-muted">
          {{ data ? field(data.about.bodyEn, data.about.bodyFa) : '' }}
        </p>

        <h2 class="mt-12 border-b border-dashed border-[color-mix(in_srgb,var(--ink)_35%,transparent)] pb-2 font-mono text-sm uppercase tracking-[0.12em] text-signal">
          // {{ t.experience.work }}
        </h2>
        <article
          v-for="item in data?.experience || []"
          :key="item.id"
          class="border-b border-rule py-5"
        >
          <p class="font-mono text-sm text-signal">{{ item.yearStart }}—{{ item.yearEnd }}</p>
          <h3 class="mt-1 font-display text-xl">
            {{ field(item.titleEn, item.titleFa) }} — {{ field(item.orgEn, item.orgFa) }}
          </h3>
          <p class="mt-2 text-sm text-muted">{{ field(item.bodyEn, item.bodyFa) }}</p>
        </article>

        <h2 class="mt-10 border-b border-dashed border-[color-mix(in_srgb,var(--ink)_35%,transparent)] pb-2 font-mono text-sm uppercase tracking-[0.12em] text-signal">
          // {{ t.experience.education }}
        </h2>
        <article v-for="item in data?.education || []" :key="item.id" class="py-5">
          <p class="font-mono text-sm text-signal">{{ item.yearStart }}—{{ item.yearEnd }}</p>
          <h3 class="mt-1 font-display text-xl">{{ field(item.titleEn, item.titleFa) }}</h3>
          <p class="text-sm text-muted">{{ field(item.orgEn, item.orgFa) }}</p>
        </article>

        <h2 class="mt-10 border-b border-dashed border-[color-mix(in_srgb,var(--ink)_35%,transparent)] pb-2 font-mono text-sm uppercase tracking-[0.12em] text-signal">
          // {{ locale === 'fa' ? 'ابزار' : 'Tools' }}
        </h2>
        <p class="mt-4 font-mono text-sm leading-7">
          {{ data?.skills.map(s => s.name).join('  ·  ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  header, footer, .noise, .skip-link { display: none !important; }
  body, html { background: white !important; color: black !important; }
}
</style>
