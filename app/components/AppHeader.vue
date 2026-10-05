<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const { toggle } = useCommandPalette()
const { current } = useSectionProgress()
const scrolled = ref(false)
const open = ref(false)

const links = computed(() => [
  { href: '#about', id: 'about', label: t.value.nav.about, num: '01' },
  { href: '#skills', id: 'skills', label: t.value.nav.skills, num: '02' },
  { href: '#work', id: 'work', label: t.value.nav.work, num: '03' },
  { href: '#studio', id: 'studio', label: t.value.nav.studio, num: '04' },
  { href: '#contact', id: 'contact', label: t.value.nav.contact, num: '05' }
])

const brand = computed(() => {
  const name = data.value ? field(data.value.site.nameEn, data.value.site.nameFa) : 'DEV'
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return (parts[0] || 'DEV').slice(0, 2).toUpperCase()
})

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 12
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})

function go(href: string) {
  open.value = false
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

function isActive(id: string) {
  if (id === 'about') return current.value === 'about'
  if (id === 'skills') return current.value === 'skills'
  if (id === 'work') return current.value === 'work'
  if (id === 'studio') return current.value === 'studio' || current.value === 'social'
  if (id === 'contact') return current.value === 'contact'
  return false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/88 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300"
    :class="scrolled ? 'shadow-[0_1px_0_var(--signal)]' : ''"
  >
    <div class="site-shell flex h-16 items-center justify-between gap-4">
      <a href="#top" class="group flex items-center gap-2 font-mono text-sm tracking-tight" @click.prevent="go('#top')">
        <span class="text-signal">~/</span>
        <span class="font-display text-[1.2rem] font-semibold tracking-[-0.05em]">
          {{ brand }}
          <span class="text-signal">.</span>
        </span>
      </a>

      <nav class="hidden items-center gap-5 lg:flex" :aria-label="t.index">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="group flex items-baseline gap-2 font-mono text-[0.72rem] uppercase tracking-[0.1em]"
          :aria-current="isActive(link.id) ? 'location' : undefined"
          @click.prevent="go(link.href)"
        >
          <span :class="isActive(link.id) ? 'text-signal' : 'text-muted group-hover:text-signal'">{{ link.num }}</span>
          <span :class="isActive(link.id) ? 'text-ink' : 'text-muted group-hover:text-ink'">{{ link.label }}</span>
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <LanguageSwitcher class="hidden sm:flex" />
        <ThemeSwitcher />
        <button
          type="button"
          class="hidden items-center gap-2 border border-ink px-2 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase md:inline-flex hover:border-signal hover:text-signal"
          @click="toggle"
        >
          <span>⌘K</span>
        </button>
        <button
          type="button"
          class="grid size-9 place-items-center border border-ink lg:hidden"
          :aria-expanded="open"
          :aria-label="t.menu"
          @click="open = !open"
        >
          <span class="meta">{{ open ? '×' : '≡' }}</span>
        </button>
      </div>
    </div>

    <div v-if="open" class="border-t border-rule bg-paper lg:hidden">
      <div class="site-shell py-4">
        <LanguageSwitcher class="mb-4 sm:hidden" />
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="flex items-baseline justify-between border-b border-rule py-3 font-mono text-sm uppercase tracking-[0.08em]"
          @click.prevent="go(link.href)"
        >
          <span>{{ link.label }}</span>
          <span class="meta" :class="isActive(link.id) ? 'text-signal' : 'text-muted'">{{ link.num }}</span>
        </a>
      </div>
    </div>
  </header>
</template>
