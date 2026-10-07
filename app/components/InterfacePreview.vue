<script setup lang="ts">
const props = defineProps<{
  step: number
}>()

const { t } = useLocale()

function rowClass(index: number) {
  const hidden = index > 1 && props.step < 3
  const active = props.step >= 2 && index === 0
  return [
    hidden ? 'hidden' : '',
    active ? 'border-[var(--text)] text-[var(--text)]' : 'border-[var(--line)] text-[var(--text-2)]'
  ]
}

const dotClass = computed(() => props.step >= 1 ? 'bg-[var(--accent)]' : 'bg-[var(--line-strong)]')
const colsClass = computed(() => props.step >= 3 ? 'grid-cols-2' : 'grid-cols-1')
const actionClass = computed(() => props.step >= 2 ? 'bg-[var(--text)] text-[var(--bg)]' : 'border border-[var(--line-strong)] text-[var(--text-2)]')
</script>

<template>
  <div class="preview grid min-h-[320px] place-items-center" :data-step="props.step">
    <div class="frame relative flex h-[280px] w-full flex-col justify-between border border-[var(--line-strong)] bg-[var(--surface)] p-4">
      <div class="part relative">
        <span v-if="props.step >= 4" class="part-label">{{ t.craft.partHeader }}</span>
        <div class="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
          <strong class="text-[1rem] font-semibold tracking-[-0.03em] [font-family:var(--font-display)]">{{ t.craft.previewTitle }}</strong>
          <span class="size-2 rounded-full" :class="dotClass" />
        </div>
      </div>

      <div class="part relative">
        <span v-if="props.step >= 4" class="part-label">{{ t.craft.partContent }}</span>
        <ul class="m-0 grid list-none gap-2 p-0" :class="colsClass">
        <li
          v-for="(row, index) in t.craft.rows"
          :key="row"
          class="flex items-center justify-between gap-3 border px-3 py-[0.65rem] text-[0.84rem]"
          :class="rowClass(index)"
        >
          <span>{{ row }}</span>
          <span v-if="props.step >= 2 && index === 0" class="size-1.5 rounded-full bg-[var(--accent)]" />
        </li>
        </ul>
      </div>

      <div class="part relative">
        <span v-if="props.step >= 4" class="part-label">{{ t.craft.partAction }}</span>
        <span
          class="action inline-flex min-h-10 items-center px-3.5 text-[0.9rem] font-semibold tracking-[-0.02em] [font-family:var(--font-display)]"
          :class="actionClass"
        >
          {{ t.craft.previewAction }}
        </span>
      </div>

    </div>
  </div>
</template>

<style scoped>
.frame {
  transition: width var(--motion-normal) var(--ease);
}

.preview[data-step="1"] .frame,
.preview[data-step="2"] .frame {
  width: min(220px, 78%);
}

.part-label {
  position: absolute;
  inset-inline-start: 0;
  top: -0.95rem;
  color: var(--accent-contrast);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

html[lang="fa"] .part-label {
  letter-spacing: 0;
  text-transform: none;
  font-size: 0.78rem;
}

.action {
  transition: background-color var(--motion-fast) var(--ease), color var(--motion-fast) var(--ease), border-color var(--motion-fast) var(--ease);
}

@media (prefers-reduced-motion: reduce) {
  .frame,
  .action {
    transition: none;
  }
}
</style>
