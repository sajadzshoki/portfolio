<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()
const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

const mark = computed(() => initials(data.value?.site.nameEn || 'Sajad Shokraei'))

const links = computed(() => [
  { to: '/', label: t.value.nav.home },
  { to: '/projects', label: t.value.nav.projects },
  { to: '/about', label: t.value.nav.about },
  { to: '/skills', label: t.value.nav.skills },
  { to: '/experience', label: t.value.nav.experience },
  { to: '/contact', label: t.value.nav.contact }
])

const solid = computed(() => route.path !== '/' || scrolled.value || open.value)

function current(path: string) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

watch(open, (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
})

watch(() => route.fullPath, () => {
  open.value = false
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header fixed inset-x-0 top-0 z-[70] h-[var(--header-h)] text-[var(--text)]" :class="{ 'is-open': open, 'border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)]': solid }">
    <div class="shell-wide flex h-full items-center justify-between gap-4">
      <NuxtLink to="/" class="text-[1.15rem] font-bold tracking-[-0.06em] [font-family:var(--font-display)]" :aria-label="t.nav.home">{{ mark }}</NuxtLink>

      <nav class="hidden items-center gap-[1.35rem] min-[980px]:inline-flex" :aria-label="t.index">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-[0.92rem] font-medium text-[var(--text-2)] hover:text-[var(--text)] aria-[current=page]:text-[var(--text)]"
          :aria-current="current(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-[0.55rem]">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <SiteButton class="hidden min-[980px]:inline-flex" to="/contact" variant="primary" arrow>{{ t.nav.talk }}</SiteButton>
        <button
          type="button"
          class="menu-btn grid size-[2.4rem] cursor-pointer place-content-center gap-[6px] rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] min-[980px]:hidden"
          :aria-expanded="open"
          :aria-label="open ? t.close : t.menu"
          @click="open = !open"
        >
          <span class="block h-[1.5px] w-[0.9rem] bg-[var(--text)]" />
          <span class="block h-[1.5px] w-[0.9rem] bg-[var(--text)]" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="open" class="overlay fixed inset-0 z-[-1] flex items-end bg-[color-mix(in_srgb,var(--bg)_96%,black)] pb-10 min-[980px]:hidden">
        <nav class="shell flex w-full flex-col gap-[0.35rem]" :aria-label="t.menu">
          <NuxtLink
            v-for="(link, index) in links"
            :key="link.to"
            :to="link.to"
            class="flex items-baseline gap-[0.85rem] text-[clamp(2.1rem,8vw,3.3rem)] font-[650] leading-[1.12] tracking-[-0.045em] [font-family:var(--font-display)] fa:font-persian"
            :style="{ transitionDelay: `${80 + index * 40}ms` }"
          >
            <span class="font-mono text-[0.78rem] tracking-[0.08em] text-[var(--text-3)]">{{ String(index + 1).padStart(2, '0') }}</span>
            {{ link.label }}
          </NuxtLink>
          <SiteButton class="mt-5 self-start" to="/contact" variant="primary" arrow>{{ t.nav.talk }}</SiteButton>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-btn span {
  transition: transform 0.3s var(--ease);
}

.is-open .menu-btn span:first-child {
  transform: translateY(3.75px) rotate(45deg);
}

.is-open .menu-btn span:last-child {
  transform: translateY(-3.75px) rotate(-45deg);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.28s ease;
}

.menu-enter-active a,
.menu-leave-active a {
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-from a {
  opacity: 0;
  transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-from a {
    transform: none;
  }
}
</style>
