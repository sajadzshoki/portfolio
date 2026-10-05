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
  <ul v-if="skills.length" class="board">
    <li v-for="skill in skills" :key="skill.id">
      <span class="mark">
        <img v-if="skill.logoUrl" :src="skill.logoUrl" :alt="skill.name" width="52" height="52">
        <span v-else>{{ mark(skill.name) }}</span>
      </span>
      <span class="name">{{ skill.name }}</span>
    </li>
  </ul>
  <p v-else class="lede">{{ t.skills.empty }}</p>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.board li {
  display: grid;
  justify-items: center;
  gap: 0.7rem;
  min-width: 0;
  text-align: center;
}

.mark {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.mark img {
  width: 2.65rem;
  height: 2.65rem;
  object-fit: contain;
}

.name {
  color: var(--text-2);
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

@media (min-width: 720px) {
  .board {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2.25rem 1.25rem;
  }

  .mark,
  .mark img {
    width: 2.85rem;
    height: 2.85rem;
  }
}
</style>
