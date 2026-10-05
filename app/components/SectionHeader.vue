<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  lede?: string
}>()
</script>

<template>
  <header class="section-head">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 class="display title">{{ title }}</h2>
    </div>
    <p v-if="lede" class="lede">{{ lede }}</p>
    <div v-if="$slots.action" class="action">
      <slot name="action" />
    </div>
  </header>
</template>

<style scoped>
.section-head {
  display: grid;
  gap: 1rem;
  margin-bottom: clamp(1.75rem, 4vw, 2.75rem);
}

.title {
  margin-top: 0.85rem;
  font-size: clamp(2.1rem, 4.6vw, 3.6rem);
  max-width: 18ch;
}

.action {
  justify-self: start;
}

@media (min-width: 800px) {
  .section-head {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }

  .lede {
    grid-column: 1;
  }

  .action {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
  }
}
</style>
