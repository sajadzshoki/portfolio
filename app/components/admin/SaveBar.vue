<script setup lang="ts">
defineProps<{
  status: string
  failed: boolean
  saving: boolean
  add?: boolean
}>()

defineEmits<{
  add: []
}>()

const { t } = useLocale()
</script>

<template>
  <div class="save-bar">
    <p class="status" :class="{ failed }" role="status">{{ status }}</p>
    <div class="actions">
      <button v-if="add" type="button" class="site-btn site-btn-secondary" @click="$emit('add')">{{ t.admin.add }}</button>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ saving ? t.admin.saving : t.admin.save }}</button>
    </div>
  </div>
</template>

<style scoped>
.save-bar {
  position: fixed;
  z-index: 50;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  padding: 0.65rem var(--page-gutter);
  backdrop-filter: blur(12px);
}

.status {
  margin: 0;
  min-height: 1.2rem;
  color: var(--text-2);
  font-size: 0.9rem;
}

.status.failed {
  color: var(--accent-contrast);
}

.actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 0.5rem;
}
</style>
