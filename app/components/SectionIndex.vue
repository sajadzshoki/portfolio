<script setup lang="ts">
const { t } = useLocale()
const { current, active, activeIndex, available, sections, sectionLabel } = useSectionProgress()

const label = computed(() => sectionLabel(t.value))
</script>

<template>
  <nav
    v-if="available"
    class="section-index no-print fixed top-1/2 z-40 hidden -translate-y-1/2 start-[0.85rem] transition-opacity duration-200 min-[1180px]:grid min-[1180px]:grid-cols-[auto_auto] min-[1180px]:items-center min-[1180px]:gap-3"
    :class="active ? '' : 'pointer-events-none opacity-0'"
    :aria-label="t.index"
    :aria-hidden="active ? undefined : true"
  >
    <ol class="m-0 grid list-none gap-0 p-0">
      <li v-for="(section, index) in sections" :key="section.id" class="grid justify-items-center">
        <a
          :href="`#${section.id}`"
          class="font-mono text-[0.62rem] tracking-[0.08em] transition-colors duration-200"
          :class="section.id === current ? 'text-[var(--text)]' : 'text-[var(--text-3)]'"
          :aria-current="section.id === current ? 'true' : undefined"
        >
          {{ section.num }}
        </a>
        <span
          v-if="index < sections.length - 1"
          class="my-[0.2rem] block h-3 w-px"
          :class="index < activeIndex ? 'bg-[var(--text-3)]' : 'bg-[var(--line)]'"
          aria-hidden="true"
        />
      </li>
    </ol>
    <p class="m-0 max-h-28 font-mono text-[0.62rem] tracking-[0.14em] text-[var(--text-3)] uppercase [writing-mode:vertical-rl] fa:text-[0.75rem] fa:tracking-normal fa:normal-case rtl:[writing-mode:vertical-lr]">
      {{ label }}
    </p>
  </nav>
</template>
