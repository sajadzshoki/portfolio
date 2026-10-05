<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const { active, sectionLabel } = useSectionProgress()
</script>

<template>
  <div>
    <div class="noise" aria-hidden="true" />
    <AppHeader />
    <p
      class="pointer-events-none fixed bottom-8 start-4 z-40 hidden font-mono text-[0.62rem] tracking-[0.18em] uppercase text-muted xl:block"
      style="writing-mode: vertical-rl; transform: rotate(180deg);"
    >
      {{ t.hero.path }}
      <span class="mx-2 text-signal">·</span>
      {{ active.num }} {{ sectionLabel(t) }}
      <span class="mx-2 text-signal">·</span>
      {{ data ? field(data.site.locationEn, data.site.locationFa) : '' }}
    </p>
    <main id="main">
      <slot />
    </main>
    <AppFooter />
    <CommandPalette />
    <span class="sr-only">{{ t.skip }}</span>
  </div>
</template>
