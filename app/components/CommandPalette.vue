<script setup lang="ts">
const { open, close } = useCommandPalette()
const { t, toggleLocale, locale } = useLocale()
const { toggleTheme, theme } = useTheme()
const { data } = usePortfolio()

const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement | null>(null)

const github = computed(() => data.value?.socials.find(s => s.name.toLowerCase() === 'github')?.url || 'https://github.com')

const items = computed(() => {
  const list = [
    { id: 'about', label: t.value.nav.about, hint: '#about', run: () => go('#about') },
    { id: 'work', label: t.value.nav.work, hint: '#work', run: () => go('#work') },
    { id: 'studio', label: t.value.experience.title, hint: '#studio', run: () => go('#studio') },
    { id: 'contact', label: t.value.nav.contact, hint: '#contact', run: () => go('#contact') },
    { id: 'github', label: 'GitHub', hint: '↗', run: () => window.open(github.value, '_blank', 'noreferrer') },
    { id: 'theme', label: theme.value === 'dark' ? t.value.theme.light : t.value.theme.dark, hint: 'theme', run: () => toggleTheme() },
    { id: 'lang', label: locale.value === 'en' ? 'فارسی' : 'English', hint: 'lang', run: () => toggleLocale() }
  ]
  const q = query.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(i => `${i.label} ${i.hint} ${i.id}`.toLowerCase().includes(q))
})

function go(sel: string) {
  close()
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
}

function run(i = active.value) {
  const item = items.value[i]
  if (item) item.run()
  close()
}

watch(open, async (v) => {
  if (v) {
    query.value = ''
    active.value = 0
    await nextTick()
    input.value?.focus()
  }
})

watch(items, () => {
  active.value = 0
})

function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = !open.value
    return
  }
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (active.value + 1) % Math.max(items.value.length, 1)
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (active.value - 1 + items.value.length) % Math.max(items.value.length, 1)
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    run()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[70] flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-[2px]"
      @click.self="close"
    >
      <div class="w-full max-w-xl border-2 border-ink bg-paper shadow-[8px_8px_0_var(--ink)]">
        <div class="border-b-2 border-ink">
          <input
            ref="input"
            v-model="query"
            class="border-0 px-4 py-4 font-display text-lg tracking-[-0.02em] focus:outline-none"
            :placeholder="t.cmd.placeholder"
            autocomplete="off"
            spellcheck="false"
          >
        </div>
        <ul class="max-h-[50vh] overflow-auto">
          <li v-if="!items.length" class="px-4 py-6 text-sm text-muted">{{ t.cmd.empty }}</li>
          <li v-for="(item, i) in items" :key="item.id">
            <button
              type="button"
              class="flex w-full items-center justify-between px-4 py-3 text-start font-display text-lg tracking-[-0.02em] transition-colors"
              :class="i === active ? 'bg-ink text-paper' : 'hover:bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]'"
              @mouseenter="active = i"
              @click="run(i)"
            >
              <span>{{ item.label }}</span>
              <span class="font-mono text-[0.65rem] uppercase tracking-[0.12em] opacity-70">{{ item.hint }}</span>
            </button>
          </li>
        </ul>
        <div class="flex justify-between border-t-2 border-ink px-4 py-2">
          <span class="meta text-muted">{{ t.cmd.hint }}</span>
          <span class="meta text-muted">ESC</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
