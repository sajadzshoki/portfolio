<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()

const areas = computed(() => data.value?.focusAreas || [])
const five = computed(() => areas.value.length === 5)
</script>

<template>
  <section id="services" class="sz-services">
    <div class="sz-wrap">
      <div class="sz-services-head">
        <Reveal>
          <SazanSectionLabel :text="t.services.eyebrow" />
          <h2 class="sz-title mt-3">{{ t.services.title }}</h2>
          <p class="sz-lede mt-3">{{ t.services.lede }}</p>
        </Reveal>
        <NuxtLink to="/services" class="sz-services-all">
          {{ t.services.all }}
          <SazanArrow />
        </NuxtLink>
      </div>

      <div class="sz-svc-grid" :class="{ 'is-five': five }">
        <SazanServiceCard
          v-for="(area, i) in areas"
          :key="area.id"
          :index="i"
          :lead="five && i === 0"
          :title="field(area.titleEn, area.titleFa)"
          :body="field(area.bodyEn, area.bodyFa)"
          :href="`/services#${area.id}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.sz-services {
  background: var(--sz-surface);
  padding-block: 1.75rem 1.9rem;
}

.sz-services-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
}

.sz-services-all {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid var(--sz-border-strong);
  border-radius: 999px;
  background: var(--sz-background);
  padding: 0.55rem 0.95rem;
  color: var(--sz-text);
  font-size: 0.9rem;
  font-weight: 600;
  transition: border-color 0.25s ease, color 0.25s ease, transform 0.35s var(--sz-ease);
}

.sz-services-all:hover {
  border-color: var(--sz-primary);
  color: var(--sz-primary);
}

.sz-svc-grid {
  display: grid;
  gap: 0.6rem;
  margin-top: 1rem;
}

@media (min-width: 720px) {
  .sz-services {
    padding-block: 2.5rem 2.65rem;
  }

  .sz-svc-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    margin-top: 1.35rem;
  }
}

@media (min-width: 1080px) {
  .sz-services {
    padding-block: 3.35rem 3.5rem;
  }

  .sz-svc-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sz-svc-grid.is-five {
    grid-template-columns: 1.15fr 1fr 1fr;
  }

  .sz-svc-grid.is-five :deep(.sz-svc.is-lead) {
    grid-column: span 2;
  }
}
</style>
