<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const { toggle } = useCommandPalette()
const { current } = useSectionProgress()
const scrolled = ref(false)
const open = ref(false)

const links = computed(() => [
  { href: '#about', id: 'about', label: t.value.nav.about, num: '01' },
  { href: '#work', id: 'work', label: t.value.nav.work, num: '02' },
  { href: '#studio', id: 'studio', label: t.value.nav.studio, num: '03' },
  { href: '#contact', id: 'contact', label: t.value.nav.contact, num: '04' }
])

const initials = computed(() => {
  const name = data.value ? field(data.value.site.nameEn, data.value.site.nameFa) : 'KR'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
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
  if (id === 'about') return current.value === 'about' || current.value === 'skills'
  if (id === 'work') return current.value === 'work'
  if (id === 'studio') return current.value === 'studio' || current.value === 'social'
  if (id === 'contact') return current.value === 'contact'
  return false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-[6px] transition-[box-shadow,background-color,border-color,color] duration-300"
    :class="scrolled ? 'shadow-[0_2px_0_var(--ink)]' : ''"
  >
    <div class="site-shell flex h-16 items-center justify-between gap-4">
      <a href="#top" class="font-display text-[1.35rem] font-semibold tracking-[-0.06em] leading-none">
        {{ initials }}
        <span class="text-signal">.</span>
      </a>

      <nav class="hidden items-center gap-7 lg:flex" :aria-label="t.index">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="group flex items-baseline gap-2 text-[0.95rem] font-display tracking-[-0.02em]"
          :aria-current="isActive(link.id) ? 'location' : undefined"
          @click.prevent="go(link.href)"
        >
          <span class="meta transition-colors duration-300" :class="isActive(link.id) ? 'text-signal' : 'text-muted group-hover:text-signal'">{{ link.num }}</span>
          <span class="relative">
            {{ link.label }}
            <span
              class="absolute inset-x-0 -bottom-1 h-0.5 origin-left bg-signal transition-transform duration-300 [dir=rtl]:origin-right"
              :class="isActive(link.id) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
            />
          </span>
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <LanguageSwitcher class="hidden sm:flex" />
        <ThemeSwitcher />
        <button
          type="button"
          class="hidden items-center gap-2 border-2 border-ink px-2 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase md:inline-flex hover:bg-ink hover:text-paper"
          @click="toggle"
        >
          <span>⌘K</span>
        </button>
        <button
          type="button"
          class="grid size-9 place-items-center border-2 border-ink lg:hidden"
          :aria-expanded="open"
          :aria-label="t.menu"
          @click="open = !open"
        >
          <span class="meta">{{ open ? '×' : '≡' }}</span>
        </button>
      </div>
    </div>

    <div v-if="open" class="border-t-2 border-ink bg-paper lg:hidden">
      <div class="site-shell py-5">
        <LanguageSwitcher class="mb-5 sm:hidden" />
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="flex items-baseline justify-between border-b border-rule py-3 font-display text-2xl tracking-[-0.03em]"
          @click.prevent="go(link.href)"
        >
          <span>{{ link.label }}</span>
          <span class="meta" :class="isActive(link.id) ? 'text-signal' : 'text-muted'">{{ link.num }}</span>
        </a>
      </div>
    </div>
  </header>
</template>
