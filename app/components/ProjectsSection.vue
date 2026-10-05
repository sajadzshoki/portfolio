<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()

const projects = computed(() => {
  const all = data.value?.projects || []
  const featured = all.filter(project => project.featured)
  return featured.length ? featured : all
})
</script>

<template>
  <section v-if="projects.length" id="projects" class="band">
    <div class="shell-wide">
      <SectionHeader :eyebrow="t.projects.eyebrow" :title="t.projects.title">
        <template #action>
          <SiteButton to="/projects" variant="ghost" arrow>{{ t.projects.all }}</SiteButton>
        </template>
      </SectionHeader>
      <ProjectShowcase :projects="projects" />
    </div>
  </section>
</template>
