<script setup lang="ts">
const { open, close } = useCommandPalette()
const { t, toggleLocale, locale, field } = useLocale()
const { data } = usePortfolio()
const router = useRouter()

const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement | null>(null)

const github = computed(() => data.value?.socials.find(item => item.name.toLowerCase() === 'github')?.url || 'https://github.com')

const items = computed(() => {
  const list = [
    { id: 'home', label: t.value.nav.home, hint: '/', run: () => router.push('/') },
    { id: 'work', label: t.value.nav.work, hint: '/work', run: () => router.push('/work') },
    { id: 'services', label: t.value.nav.services, hint: '/services', run: () => router.push('/services') },
    { id: 'about', label: t.value.nav.about, hint: '/about', run: () => router.push('/about') },
    { id: 'contact', label: t.value.nav.start, hint: '/contact', run: () => router.push('/contact') },
    { id: 'resume', label: t.value.contact.resume, hint: '/resume', run: () => router.push('/resume') },
    ...(data.value?.projects || []).map(project => ({
      id: project.slug,
      label: field(project.titleEn, project.titleFa),
      hint: `/work/${project.slug}`,
      run: () => router.push(`/work/${project.slug}`)
    })),
    { id: 'github', label: 'GitHub', hint: '↗', run: () => window.open(github.value, '_blank', 'noopener,noreferrer') },
    { id: 'lang', label: locale.value === 'en' ? 'فارسی' : 'English', hint: locale.value, run: () => toggleLocale() }
  ]
  const q = query.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(item => `${item.label} ${item.hint} ${item.id}`.toLowerCase().includes(q))
})

function run(i = active.value) {
  const item = items.value[i]
  if (!item) return
  close()
  item.run()
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

onMounted(() => {
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]"
      style="background: var(--sz-scrim)"
      @click.self="close"
    >
      <div class="w-full max-w-xl overflow-hidden rounded-[var(--sz-radius)] border border-line bg-surface shadow-[var(--sz-shadow)]" role="dialog" aria-modal="true">
        <input
          ref="input"
          v-model="query"
          class="border-0 px-4 py-4 text-lg tracking-[-0.02em] focus:shadow-none"
          :placeholder="t.cmd.placeholder"
          autocomplete="off"
          spellcheck="false"
        >
        <ul class="max-h-[50vh] overflow-auto border-t border-line">
          <li v-if="!items.length" class="px-4 py-6 text-sm text-muted">{{ t.cmd.empty }}</li>
          <li v-for="(item, i) in items" :key="item.id">
            <button
              type="button"
              class="flex w-full items-center justify-between px-4 py-3 text-start"
              :class="i === active ? 'bg-primary-soft text-ink' : 'hover:bg-bg-soft'"
              @mouseenter="active = i"
              @click="run(i)"
            >
              <span>{{ item.label }}</span>
              <span class="font-mono text-[0.65rem] text-muted">{{ item.hint }}</span>
            </button>
          </li>
        </ul>
        <div class="flex justify-between border-t border-line px-4 py-2 text-xs text-subtle">
          <span>{{ t.cmd.hint }}</span>
          <span>ESC</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
