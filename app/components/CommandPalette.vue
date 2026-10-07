<script setup lang="ts">
const { open, close } = useCommandPalette()
const { t, toggleLocale, locale } = useLocale()
const { toggleTheme, theme } = useTheme()
const { data } = usePortfolio()
const router = useRouter()

const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement | null>(null)
const dialog = ref<HTMLElement | null>(null)
let returnFocus: HTMLElement | null = null

const github = computed(() => data.value?.socials.find(item => item.name.toLowerCase() === 'github')?.url || '')
const linkedin = computed(() => data.value?.socials.find(item => item.name.toLowerCase() === 'linkedin')?.url || '')

const items = computed(() => {
  const list: { id: string, label: string, hint: string, run: () => void }[] = [
    { id: 'projects', label: t.value.nav.projects, hint: '/projects', run: () => router.push('/projects') },
    { id: 'about', label: t.value.nav.about, hint: '/about', run: () => router.push('/about') },
    { id: 'skills', label: t.value.nav.skills, hint: '/skills', run: () => router.push('/skills') },
    { id: 'experience', label: t.value.nav.experience, hint: '/experience', run: () => router.push('/experience') },
    { id: 'contact', label: t.value.nav.contact, hint: '/contact', run: () => router.push('/contact') }
  ]
  if (github.value) list.push({ id: 'github', label: 'GitHub', hint: '↗', run: () => window.open(safeHref(github.value), '_blank', 'noreferrer') })
  if (linkedin.value) list.push({ id: 'linkedin', label: 'LinkedIn', hint: '↗', run: () => window.open(safeHref(linkedin.value), '_blank', 'noreferrer') })
  list.push(
    { id: 'home', label: t.value.nav.home, hint: '/', run: () => router.push('/') },
    { id: 'resume', label: t.value.contact.resume, hint: '/resume', run: () => router.push('/resume') },
    { id: 'theme', label: theme.value === 'dark' ? t.value.theme.light : t.value.theme.dark, hint: 'theme', run: () => toggleTheme() },
    { id: 'lang', label: locale.value === 'en' ? 'فارسی' : 'English', hint: 'lang', run: () => toggleLocale() }
  )
  const q = query.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(item => `${item.label} ${item.hint} ${item.id}`.toLowerCase().includes(q))
})

const activeId = computed(() => items.value[active.value] ? `cmd-opt-${items.value[active.value].id}` : undefined)

function run(index = active.value) {
  items.value[index]?.run()
  close()
}

watch(open, async (value) => {
  if (!import.meta.client) return
  if (value) {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    query.value = ''
    active.value = 0
    document.documentElement.classList.add('cmd-open')
    await nextTick()
    input.value?.focus()
    return
  }
  document.documentElement.classList.remove('cmd-open')
  returnFocus?.focus()
  returnFocus = null
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
    return
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
  if (event.key === 'Tab' && dialog.value) {
    const focusable = [...dialog.value.querySelectorAll<HTMLElement>('button, input, a')]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('cmd-open')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cmd">
      <div v-if="open" class="fixed inset-0 z-[90] flex justify-center bg-[color-mix(in_srgb,var(--bg)_42%,transparent)] px-4 pt-[12vh] pb-4" @click.self="close">
        <div
          ref="dialog"
          class="panel w-[min(36rem,100%)] overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-2)] shadow-[var(--shadow)]"
          role="dialog"
          aria-modal="true"
          :aria-label="t.cmd.label"
        >
          <input
            ref="input"
            v-model="query"
            class="rounded-none border-0 border-b border-[var(--line)] bg-transparent px-[1.05rem] py-4 text-[1.05rem] focus:border-[var(--line)]!"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="cmd-list"
            :aria-activedescendant="activeId"
            :placeholder="t.cmd.placeholder"
            autocomplete="off"
            spellcheck="false"
          >
          <ul id="cmd-list" class="m-0 max-h-[50vh] list-none overflow-auto p-[0.35rem]" role="listbox" :aria-label="t.cmd.label">
            <li v-if="!items.length" class="px-[0.7rem] py-4 font-mono text-[0.9rem] text-[var(--text-3)]">{{ t.cmd.empty }}</li>
            <li v-for="(item, index) in items" :key="item.id" role="presentation">
              <button
                :id="`cmd-opt-${item.id}`"
                type="button"
                role="option"
                class="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[10px] border-0 bg-transparent px-[0.7rem] py-3 text-start"
                :class="index === active ? 'bg-[color-mix(in_srgb,var(--text)_8%,transparent)]' : ''"
                :aria-selected="index === active"
                @mouseenter="active = index"
                @click="run(index)"
              >
                <span>{{ item.label }}</span>
                <span class="font-mono text-[0.72rem] text-[var(--text-3)]" dir="ltr">{{ item.hint }}</span>
              </button>
            </li>
          </ul>
          <div class="flex justify-between border-t border-[var(--line)] px-4 py-[0.65rem] font-mono text-[0.72rem] text-[var(--text-3)]">
            <span>{{ t.cmd.hint }}</span>
            <span>ESC</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cmd-enter-active,
.cmd-leave-active {
  transition: opacity var(--motion-fast) var(--ease);
}

.cmd-enter-active .panel,
.cmd-leave-active .panel {
  transition: opacity var(--motion-fast) var(--ease), transform var(--motion-fast) var(--ease);
}

.cmd-enter-from,
.cmd-leave-to {
  opacity: 0;
}

.cmd-enter-from .panel,
.cmd-leave-to .panel {
  opacity: 0;
  transform: translateY(10px) scale(0.985);
}

@media (prefers-reduced-motion: reduce) {
  .cmd-enter-from .panel,
  .cmd-leave-to .panel {
    transform: none;
  }
}
</style>
