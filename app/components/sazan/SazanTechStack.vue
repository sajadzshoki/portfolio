<script setup lang="ts">
const { data } = usePortfolio()
</script>

<template>
  <section aria-label="Technology" class="border-y border-line bg-surface-muted/60">
    <div class="sz-wrap flex items-center gap-4 overflow-x-auto py-3 [scrollbar-width:none] sm:flex-wrap sm:py-5 [&::-webkit-scrollbar]:hidden">
      <template v-for="(skill, i) in data?.skills || []" :key="skill.id">
        <span v-if="i > 0" class="mx-1 hidden h-3 w-px shrink-0 bg-line-strong sm:block" aria-hidden="true" />
        <span class="inline-flex shrink-0 items-center gap-2 text-sm text-muted">
          <span class="text-ink/80"><SazanTechIcon :name="skill.name" /></span>
          {{ skill.name }}
        </span>
      </template>
    </div>
  </section>
</template>
