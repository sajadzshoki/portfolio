<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()

const groups = computed(() => {
  const map = new Map<string, { name: string, id: string }[]>()
  for (const skill of data.value?.skills || []) {
    const key = skill.category || 'General'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push({ name: skill.name, id: skill.id })
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }))
})
</script>

<template>
  <section id="skills" class="scroll-mt-24 border-y border-rule bg-panel py-24 md:py-32">
    <div class="site-shell">
      <SectionHeader index="03" :kicker="t.skills.kicker" :title="t.skills.title" />

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Reveal
          v-for="(group, gi) in groups"
          :key="group.category"
          :delay="gi * 70"
          class="sheet p-5 md:p-6"
        >
          <p class="meta text-signal mb-4">
            // {{ group.category }}
          </p>
          <ul class="space-y-1">
            <li
              v-for="(skill, i) in group.items"
              :key="skill.id"
              class="group flex items-center justify-between gap-3 border-b border-dashed border-[color-mix(in_srgb,var(--ink)_18%,transparent)] py-2.5 last:border-b-0"
            >
              <span class="flex items-center gap-3">
                <span class="font-mono text-[0.65rem] text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="font-display text-lg tracking-[-0.03em] transition-colors group-hover:text-signal">
                  {{ skill.name }}
                </span>
              </span>
              <span
                class="h-1.5 w-10 bg-[color-mix(in_srgb,var(--ink)_12%,transparent)] transition-colors group-hover:bg-signal"
                aria-hidden="true"
              />
            </li>
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
</template>
