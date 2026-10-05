<script setup lang="ts">
const { open, close } = useCommandPalette()
const { t, toggleLocale, locale } = useLocale()
const { toggleTheme, theme } = useTheme()
const { data } = usePortfolio()
const router = useRouter()

const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement | null>(null)

const github = computed(() => data.value?.socials.find(item => item.name.toLowerCase() === 'github')?.url || '')

const items = computed(() => {
  const list = [
    { id: 'home', label: t.value.nav.home, hint: '/', run: () => router.push('/') },
    { id: 'projects', label: t.value.nav.projects, hint: '/projects', run: () => router.push('/projects') },
    { id: 'about', label: t.value.nav.about, hint: '/about', run: () => router.push('/about') },
    { id: 'skills', label: t.value.nav.skills, hint: '/skills', run: () => router.push('/skills') },
    { id: 'experience', label: t.value.nav.experience, hint: '/experience', run: () => router.push('/experience') },
    { id: 'contact', label: t.value.nav.contact, hint: '/contact', run: () => router.push('/contact') },
    { id: 'resume', label: t.value.contact.resume, hint: '/resume', run: () => router.push('/resume') },
    { id: 'theme', label: theme.value === 'dark' ? t.value.theme.light : t.value.theme.dark, hint: 'theme', run: () => toggleTheme() },
    { id: 'lang', label: locale.value === 'en' ? 'فارسی' : 'English', hint: 'lang', run: () => toggleLocale() }
  ]
  if (github.value) {
    list.splice(7, 0, { id: 'github', label: 'GitHub', hint: '↗', run: () => window.open(safeHref(github.value), '_blank', 'noreferrer') })
  }
  const q = query.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(item => `${item.label} ${item.hint} ${item.id}`.toLowerCase().includes(q))
})

function run(index = active.value) {
  items.value[index]?.run()
  close()
}

watch(open, async (value) => {
  if (!value) return
  query.value = ''
  active.value = 0
  await nextTick()
  input.value?.focus()
})

watch(items, () => {
  active.value = 0
})

function onKey(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    open.value = !open.value
    return
  }
  if (!open.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    active.value = (active.value + 1) % Math.max(items.value.length, 1)
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    active.value = (active.value - 1 + items.value.length) % Math.max(items.value.length, 1)
  }
  if (event.key === 'Enter') {
    event.preventDefault()
    run()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="palette" @click.self="close">
      <div class="panel" role="dialog" aria-modal="true">
        <input
          ref="input"
          v-model="query"
          :placeholder="t.cmd.placeholder"
          autocomplete="off"
          spellcheck="false"
        >
        <ul>
          <li v-if="!items.length" class="empty">{{ t.cmd.empty }}</li>
          <li v-for="(item, index) in items" :key="item.id">
            <button type="button" :class="{ on: index === active }" @mouseenter="active = index" @click="run(index)">
              <span>{{ item.label }}</span>
              <span>{{ item.hint }}</span>
            </button>
          </li>
        </ul>
        <div class="hint">
          <span>{{ t.cmd.hint }}</span>
          <span>ESC</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.palette {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  justify-content: center;
  padding: 12vh 1rem 1rem;
  background: color-mix(in srgb, var(--bg) 40%, transparent);
}

.panel {
  width: min(36rem, 100%);
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: 16px;
  background: var(--surface-2);
  box-shadow: var(--shadow);
}

input {
  border: 0;
  border-bottom: 1px solid var(--line);
  border-radius: 0;
  background: transparent;
  padding: 1rem 1.05rem;
  font-size: 1.05rem;
}

ul {
  max-height: 50vh;
  margin: 0;
  padding: 0.35rem;
  list-style: none;
  overflow: auto;
}

button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0.7rem;
  border: 0;
  border-radius: 10px;
  background: transparent;
  text-align: start;
  cursor: pointer;
}

button span:last-child,
.empty,
.hint {
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

button.on {
  background: color-mix(in srgb, var(--text) 8%, transparent);
}

.empty {
  padding: 1rem 0.7rem;
  font-size: 0.9rem;
}

.hint {
  display: flex;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  border-top: 1px solid var(--line);
}
</style>
