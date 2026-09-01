<script setup lang="ts">
const { data, error, pending } = usePortfolio()
const { field } = useLocale()

useHead(() => ({
  title: data.value
    ? `${field(data.value.site.nameEn, data.value.site.nameFa)} — ${field(data.value.site.roleEn, data.value.site.roleFa)}`
    : 'Frontend Developer'
}))
</script>

<template>
  <div>
    <div v-if="pending && !data" class="min-h-dvh" />
    <div v-else-if="error" class="site-shell py-40">
      <p class="font-display text-3xl">Content unavailable.</p>
      <p class="mt-3 text-muted">Seed the database: <span class="font-mono">npm run db:setup</span></p>
    </div>
    <template v-else>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <SocialSection />
      <ContactSection />
    </template>
  </div>
</template>
