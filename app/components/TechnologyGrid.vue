<script setup lang="ts">
const props = defineProps<{
  limit?: number
  logosOnly?: boolean
}>()

const { data } = usePortfolio()
const { t } = useLocale()

const skills = computed(() => {
  const list = (data.value?.skills || []).filter(skill => skill.isActive !== false && skill.name)
  const picked = props.logosOnly ? list.filter(skill => skill.logoUrl) : list
  return props.limit ? picked.slice(0, props.limit) : picked
})

function mark(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <ul v-if="skills.length" class="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-7 p-0 min-[720px]:grid-cols-5 min-[720px]:gap-x-5 min-[720px]:gap-y-9">
    <li v-for="skill in skills" :key="skill.id" class="grid min-w-0 justify-items-center gap-[0.7rem] text-center">
      <span class="grid size-[3.25rem] place-items-center font-mono text-[0.78rem] text-[var(--text-2)] min-[720px]:size-[2.85rem]">
        <img v-if="skill.logoUrl" class="size-[2.65rem] object-contain min-[720px]:size-[2.85rem]" :src="skill.logoUrl" :alt="skill.name" width="52" height="52">
        <span v-else>{{ mark(skill.name) }}</span>
      </span>
      <span class="text-[0.84rem] font-medium leading-[1.3] tracking-[-0.01em] text-[var(--text-2)]">{{ skill.name }}</span>
    </li>
  </ul>
  <p v-else class="lede">{{ t.skills.empty }}</p>
</template>
