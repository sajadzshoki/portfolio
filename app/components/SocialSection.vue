<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()
</script>

<template>
  <section id="social" class="scroll-mt-24 border-y-2 border-ink py-24 md:py-32">
    <div class="site-shell">
      <SectionHeader index="06" :kicker="t.social.kicker" :title="t.social.title" />

      <ul>
        <li v-for="(item, i) in data?.socials || []" :key="item.id">
          <a
            :href="item.url"
            class="group grid grid-cols-12 items-center gap-3 border-b-2 border-ink py-5 first:border-t-2"
            :target="item.url.startsWith('http') ? '_blank' : undefined"
            rel="noreferrer"
          >
            <span class="col-span-2 font-mono text-xs text-signal md:col-span-1">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="col-span-6 font-display text-[clamp(1.5rem,3vw,2.6rem)] tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-2 [dir=rtl]:group-hover:-translate-x-2 md:col-span-5">
              {{ item.name }}
            </span>
            <span class="col-span-4 text-end font-mono text-xs text-muted md:col-span-6">
              {{ item.handle }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
