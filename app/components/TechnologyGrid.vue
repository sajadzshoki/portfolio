<script setup lang="ts">
import type { Skill } from '~~/shared/types'

const props = defineProps<{
  limit?: number
  logosOnly?: boolean
}>()

const { data } = usePortfolio()
const { t, field } = useLocale()

const skills = computed(() => {
  const list = (data.value?.skills || []).filter(skill => skill.isActive !== false && skill.name)
  const picked = props.logosOnly ? list.filter(skill => skill.logoUrl) : list
  return props.limit ? picked.slice(0, props.limit) : picked
})

const openId = ref('')

function noteKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function pointsOf(skill: Skill) {
  const table = t.value.skills.notes as Record<string, readonly string[]>
  return table[noteKey(skill.name)] || []
}

function categoryOf(skill: Skill) {
  if (!skill.category) return ''
  const table = t.value.skills.categories as Record<string, string>
  const key = skill.category.toLowerCase().replace(/[^a-z0-9]/g, '')
  return table[key] || skill.category
}

function descriptionOf(skill: Skill) {
  return field(skill.descriptionEn, skill.descriptionFa)
}

function mark(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

function show(id: string) {
  openId.value = id
}

function hide(id: string) {
  if (openId.value === id) openId.value = ''
}

function toggle(id: string) {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  openId.value = openId.value === id ? '' : id
}
</script>

<template>
  <ul v-if="skills.length" class="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-7 p-0 min-[720px]:grid-cols-5 min-[720px]:gap-x-5 min-[720px]:gap-y-9">
    <li
      v-for="skill in skills"
      :key="skill.id"
      class="relative grid min-w-0 justify-items-center gap-[0.7rem] text-center"
      @mouseenter="show(skill.id)"
      @mouseleave="hide(skill.id)"
      @focusin="show(skill.id)"
      @focusout="hide(skill.id)"
    >
      <button
        type="button"
        class="grid cursor-pointer justify-items-center gap-[0.7rem] border-0 bg-transparent p-0 text-center"
        :aria-expanded="openId === skill.id"
        @click="toggle(skill.id)"
      >
        <span class="grid size-[3.25rem] place-items-center font-mono text-[0.78rem] text-[var(--text-2)] min-[720px]:size-[2.85rem]">
          <img v-if="skill.logoUrl" class="size-[2.65rem] object-contain min-[720px]:size-[2.85rem]" :src="skill.logoUrl" :alt="skill.name" width="52" height="52">
          <span v-else>{{ mark(skill.name) }}</span>
        </span>
        <span class="text-[0.84rem] font-medium leading-[1.3] tracking-[-0.01em] text-[var(--text-2)]">{{ skill.name }}</span>
      </button>

      <div v-if="openId === skill.id" class="popover" role="tooltip">
        <p v-if="categoryOf(skill)" class="font-mono text-[0.66rem] tracking-[0.12em] text-[var(--accent-contrast)] uppercase fa:text-[0.78rem] fa:tracking-normal fa:normal-case">{{ categoryOf(skill) }}</p>
        <p class="mt-1 text-[0.95rem] font-semibold tracking-[-0.03em]">{{ skill.name }}</p>
        <p v-if="descriptionOf(skill)" class="mt-1 text-[0.84rem] leading-[1.45] text-[var(--text-2)]">{{ descriptionOf(skill) }}</p>
        <ul v-if="pointsOf(skill).length" class="m-0 mt-2 grid list-none gap-[0.2rem] p-0">
          <li v-for="point in pointsOf(skill)" :key="point" class="text-[0.84rem] leading-[1.4] text-[var(--text-2)]">{{ point }}</li>
        </ul>
      </div>
    </li>
  </ul>
  <p v-else class="lede">{{ t.skills.empty }}</p>
</template>

<style scoped>
.popover {
  position: absolute;
  z-index: 8;
  top: calc(100% + 0.35rem);
  left: 50%;
  width: max-content;
  min-width: 9.5rem;
  max-width: min(14rem, 70vw);
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--line-strong);
  background: var(--surface-2);
  text-align: start;
  box-shadow: var(--shadow);
  transform: translateX(-50%);
}
</style>
