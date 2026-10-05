<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()
</script>

<template>
  <section id="social" class="scroll-mt-24 border-y border-rule py-24 md:py-32">
    <div class="site-shell">
      <SectionHeader index="06" :kicker="t.social.kicker" :title="t.social.title" />

      <ul class="divide-y divide-dashed divide-[color-mix(in_srgb,var(--ink)_28%,transparent)] border-y border-dashed border-[color-mix(in_srgb,var(--ink)_28%,transparent)]">
        <li v-for="(item, i) in data?.socials || []" :key="item.id">
          <a
            :href="item.url"
            class="group grid grid-cols-12 items-center gap-3 py-5"
            :target="item.url.startsWith('http') ? '_blank' : undefined"
            rel="noreferrer"
          >
            <span class="col-span-2 font-mono text-xs text-signal md:col-span-1">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="col-span-6 font-display text-[clamp(1.4rem,2.8vw,2.2rem)] tracking-[-0.035em] transition-colors group-hover:text-signal md:col-span-5">
              {{ item.name }}
            </span>
            <span class="col-span-4 text-end font-mono text-xs text-muted transition-colors group-hover:text-ink md:col-span-6">
              {{ item.handle }}
              <span class="ms-2 text-signal opacity-0 transition-opacity group-hover:opacity-100">↗</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
