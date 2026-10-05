<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()
const visible = computed(() => Boolean(data.value?.experience.length || data.value?.education.length))
</script>

<template>
  <section v-if="visible" id="experience" class="band">
    <div class="shell-wide">
      <SectionHeader :eyebrow="t.experience.eyebrow" :title="t.experience.title" />
      <ExperienceTimeline />
    </div>
  </section>
</template>
