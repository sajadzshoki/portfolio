<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()

const site = computed(() => data.value?.site)
const title = computed(() => {
  const custom = site.value ? field(site.value.contactTitleEn, site.value.contactTitleFa) : ''
  return custom || t.value.contact.title
})
const body = computed(() => {
  const custom = site.value ? field(site.value.contactBodyEn, site.value.contactBodyFa) : ''
  return custom || t.value.contact.body
})
const email = computed(() => site.value?.email || '')
</script>

<template>
  <section id="contact" class="band contact">
    <div class="shell-wide">
      <p class="eyebrow">{{ t.contact.eyebrow }}</p>
      <h2 class="display mt-[0.85rem] max-w-[12ch] text-[clamp(2.6rem,7vw,5.4rem)]">{{ title }}</h2>
      <p class="lede mt-4">{{ body }}</p>

      <div class="mt-[1.8rem] flex flex-wrap items-end justify-between gap-4">
        <a v-if="email" class="border-b border-[var(--line-strong)] text-[clamp(1.15rem,2vw,1.6rem)] font-semibold tracking-[-0.03em] [font-family:var(--font-display)] hover:border-[var(--accent)]" :href="`mailto:${email}`">{{ email }}</a>
        <div class="flex flex-wrap gap-[0.6rem]">
          <SiteButton v-if="email" :href="`mailto:${email}`" variant="primary" arrow>{{ t.contact.cta }}</SiteButton>
          <SiteButton v-if="site?.resumeUrl" :to="site.resumeUrl" variant="secondary">{{ t.contact.resume }}</SiteButton>
        </div>
      </div>

      <div class="mt-[2.2rem] grid border-t border-[var(--line)]">
        <a
          v-for="item in data?.socials || []"
          :key="item.id"
          :href="safeHref(item.url)"
          class="group flex justify-between gap-4 border-b border-[var(--line)] py-[0.9rem] text-[var(--text)]"
          target="_blank"
          rel="noreferrer"
        >
          <span class="group-hover:text-[var(--accent-contrast)]">{{ item.name }}</span>
          <span class="font-mono text-[0.78rem] text-[var(--text-3)]">{{ item.handle }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
