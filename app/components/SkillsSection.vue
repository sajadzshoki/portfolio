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
  <section v-if="visible" id="skills" class="band">
    <div
      class="shell-wide grid gap-9"
      :class="featured ? 'items-center min-[980px]:grid-cols-[minmax(16rem,22.5rem)_minmax(0,1fr)] min-[980px]:gap-x-[4.5rem] min-[980px]:gap-y-8' : ''"
    >
      <div>
        <p class="eyebrow">{{ t.skills.eyebrow }}</p>
        <h2 class="display mt-[0.85rem] max-w-[10em] text-balance text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.05]">{{ t.skills.title }}</h2>
        <p class="lede mt-[0.9rem] max-w-96 text-[0.98rem]">{{ t.skills.lede }}</p>
        <SiteButton v-if="featured" to="/skills" variant="secondary" arrow class="mt-[1.45rem] rounded-full">{{ t.skills.all }}</SiteButton>
      </div>
      <TechnologyGrid :limit="featured ? 10 : undefined" :logos-only="featured" />
    </div>
  </section>
</template>
