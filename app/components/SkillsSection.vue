<script setup lang="ts">
withDefaults(defineProps<{
  featured?: boolean
}>(), {
  featured: true
})

const { t } = useLocale()
const { data } = usePortfolio()
const visible = computed(() => (data.value?.skills || []).some(skill => skill.isActive !== false && skill.name))
</script>

<template>
  <section v-if="visible" id="skills" class="band" :class="{ feature: featured }">
    <div class="shell-wide layout">
      <div class="copy">
        <p class="eyebrow">{{ t.skills.eyebrow }}</p>
        <h2 class="display title">{{ t.skills.title }}</h2>
        <p class="lede">{{ t.skills.lede }}</p>
        <SiteButton v-if="featured" to="/skills" variant="secondary" arrow>{{ t.skills.all }}</SiteButton>
      </div>
      <TechnologyGrid :limit="featured ? 10 : undefined" :logos-only="featured" />
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 2.25rem;
}

.title {
  margin-top: 0.85rem;
  font-size: clamp(1.9rem, 3.2vw, 2.85rem);
  max-width: 10em;
  line-height: 1.05;
  text-wrap: balance;
}

.lede {
  margin-top: 0.9rem;
  max-width: 24rem;
  font-size: 0.98rem;
}

.copy :deep(.site-btn) {
  margin-top: 1.45rem;
  border-radius: 999px;
}

.feature .layout {
  align-items: center;
}

@media (min-width: 980px) {
  .feature .layout {
    grid-template-columns: minmax(16rem, 22.5rem) minmax(0, 1fr);
    gap: 2rem 4.5rem;
  }
}
</style>
