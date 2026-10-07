<script setup lang="ts">
const props = defineProps<{
  title: string
  meta?: string
  index: number
  total: number
  open: boolean
  dragging: boolean
  over: boolean
}>()

const emit = defineEmits<{
  toggle: []
  remove: []
  reorder: [position: number]
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}>()

const { t } = useLocale()

function onOrder(event: Event) {
  const next = Number((event.target as HTMLInputElement).value)
  if (!Number.isFinite(next)) return
  emit('reorder', next)
}

function grab(event: PointerEvent) {
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  emit('pointerdown', event)
}
</script>

<template>
  <article
    class="item"
    :class="{ open: props.open, dragging: props.dragging, over: props.over }"
  >
    <div class="bar">
      <button
        type="button"
        class="handle"
        :aria-label="t.admin.drag"
        @pointerdown="grab"
        @pointermove="emit('pointermove', $event)"
        @pointerup="emit('pointerup', $event)"
        @pointercancel="emit('pointerup', $event)"
      >
        <span class="grip" aria-hidden="true">⋮⋮</span>
      </button>
      <input
        class="order"
        type="number"
        inputmode="numeric"
        :min="1"
        :max="props.total"
        :value="props.index + 1"
        :aria-label="t.admin.order"
        @change="onOrder"
      >
      <button type="button" class="summary" @click="emit('toggle')">
        <span class="chevron" aria-hidden="true">{{ props.open ? '▾' : '▸' }}</span>
        <strong>{{ props.title || t.admin.untitled }}</strong>
        <span v-if="props.meta">{{ props.meta }}</span>
      </button>
      <button type="button" class="site-btn site-btn-ghost" @click="emit('remove')">{{ t.admin.remove }}</button>
    </div>
    <div v-if="props.open" class="body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.item {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}

.item.over {
  border-color: var(--accent);
}

.item.dragging {
  opacity: 0.55;
}

.bar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.8rem;
  padding: 0.35rem 0.55rem 0.35rem 0.4rem;
}

.chevron {
  flex: none;
  color: var(--text-3);
  font-size: 0.75rem;
}

.summary {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: baseline;
  gap: 0.55rem;
  border: 0;
  background: transparent;
  padding: 0.3rem 0;
  text-align: start;
  cursor: pointer;
}

.summary strong {
  overflow: hidden;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary span {
  overflow: hidden;
  color: var(--text-3);
  font-size: 0.78rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.handle {
  display: grid;
  width: 1.7rem;
  height: 1.7rem;
  flex: none;
  place-items: center;
  border: 0;
  border-radius: 7px;
  background: transparent;
  cursor: grab;
  touch-action: none;
}

.handle:active {
  cursor: grabbing;
}

.grip {
  color: var(--text-3);
  font-size: 0.85rem;
  letter-spacing: -0.14em;
  line-height: 1;
}

.order {
  width: 3.1rem;
  flex: none;
  padding: 0.2rem 0.15rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.body {
  display: grid;
  gap: 0.7rem;
  border-top: 1px solid var(--line);
  padding: 0.8rem;
}
</style>
