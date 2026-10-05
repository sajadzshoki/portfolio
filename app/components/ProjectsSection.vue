<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()
</script>

<template>
  <section id="work" class="site-shell scroll-mt-24 py-24 md:py-32">
    <SectionHeader index="04" :kicker="t.projects.kicker" :title="t.projects.title">
      <template #aside>
        <p class="hidden font-mono text-sm text-muted md:block">
          {{ String(data?.projects.length || 0).padStart(2, '0') }}
        </p>
      </template>
    </SectionHeader>

    <div class="space-y-5">
      <ProjectBlock
        v-for="(project, i) in data?.projects || []"
        :key="project.id"
        :project="project"
        :index="i"
      />
    </div>
  </section>
</template>
