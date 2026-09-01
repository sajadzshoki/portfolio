<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()
const active = ref<string | null>(null)
</script>

<template>
  <section id="skills" class="scroll-mt-24 border-y-2 border-ink bg-[color-mix(in_srgb,var(--ink)_4%,var(--paper))] py-24 md:py-32">
    <div class="site-shell">
      <SectionHeader index="03" :kicker="t.skills.kicker" :title="t.skills.title" />

      <ul class="divide-y-2 divide-ink border-y-2 border-ink">
        <li
          v-for="(skill, i) in data?.skills || []"
          :key="skill.id"
          class="group grid grid-cols-12 items-center gap-3 py-3 transition-colors hover:bg-ink hover:text-paper"
          @mouseenter="active = skill.id"
          @mouseleave="active = null"
        >
          <span class="col-span-2 font-mono text-xs text-signal group-hover:text-paper md:col-span-1">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <span class="col-span-6 font-display text-[clamp(1.2rem,2.2vw,1.85rem)] tracking-[-0.03em] md:col-span-7">
            {{ skill.name }}
          </span>
          <span class="col-span-4 text-end font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted group-hover:text-paper">
            {{ skill.category }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
