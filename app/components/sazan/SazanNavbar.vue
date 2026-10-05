<script setup lang="ts">
const { t, locale } = useLocale()
const { toggle } = useCommandPalette()
const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const closeBtn = ref<HTMLButtonElement | null>(null)

const links = computed(() => [
  { to: '/', label: t.value.nav.home },
  { to: '/work', label: t.value.nav.work },
  { to: '/services', label: t.value.nav.services },
  { to: '/about', label: t.value.nav.about }
])

function active(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

watch(() => route.fullPath, () => {
  open.value = false
})

watch(open, async (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) {
    await nextTick()
    closeBtn.value?.focus()
  }
})

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="sz-header" :class="{ 'is-scrolled': scrolled || open }">
    <div class="sz-wrap flex h-full items-center justify-between gap-2 sm:gap-4">
      <NuxtLink to="/" class="sz-brand" aria-label="SAZAN">
        <span class="text-primary"><SazanMark /></span>
        SAZAN
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex" :aria-label="t.index">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="sz-navlink"
          :class="{ 'is-active': active(link.to) }"
          :aria-current="active(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <SazanThemeSwitch />
        <div class="hidden sm:flex">
          <LanguageSwitcher />
        </div>
        <button
          type="button"
          class="hidden items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.08em] text-muted hover:text-ink md:inline-flex"
          @click="toggle"
        >
          {{ locale === 'fa' ? 'جستجو' : '⌘K' }}
        </button>
        <div class="hidden sm:flex">
          <SiteButton to="/contact" variant="primary">
            {{ t.nav.start }}
            <SazanArrow />
          </SiteButton>
        </div>
        <button
          type="button"
          class="sz-burger lg:hidden"
          :aria-expanded="open"
          aria-controls="sazan-menu"
          :aria-label="open ? t.close : t.menu"
          @click="open = !open"
        >
          <span class="sz-burger-label">{{ open ? t.close : t.menu }}</span>
          <span class="relative block h-3 w-3.5" aria-hidden="true">
            <span class="absolute inset-x-0 top-0 h-px bg-ink transition-transform" :class="open ? 'translate-y-[5px] rotate-45' : ''" />
            <span class="absolute inset-x-0 bottom-0 h-px bg-ink transition-transform" :class="open ? '-translate-y-[6px] -rotate-45' : ''" />
          </span>
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="sz-menu">
      <div v-if="open" id="sazan-menu" class="sz-menu lg:hidden">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 font-display text-lg font-semibold" @click="open = false">
            <span class="text-primary"><SazanMark /></span>
            SAZAN
          </NuxtLink>
          <button ref="closeBtn" type="button" class="rounded-full border border-line-strong px-3 py-2 text-sm" @click="open = false">
            {{ t.close }}
          </button>
        </div>
        <nav class="mt-6 flex flex-1 flex-col" :aria-label="t.index">
          <NuxtLink
            v-for="(link, i) in links"
            :key="link.to"
            :to="link.to"
            class="sz-menu-link"
            :class="active(link.to) ? 'text-primary' : ''"
            :style="{ animationDelay: `${i * 40}ms` }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="mt-5 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <SazanThemeSwitch />
            <LanguageSwitcher />
          </div>
          <SiteButton to="/contact" variant="primary" @click="open = false">
            {{ t.nav.start }}
            <SazanArrow />
          </SiteButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sz-brand {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.04em;
}

.sz-brand :deep(.sz-brand-mark) {
  width: 28px !important;
  height: 28px !important;
}

.sz-burger {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 999px;
  border: 1px solid var(--sz-border-strong);
  padding: 0.45rem 0.6rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.sz-burger-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sz-menu-link {
  border-bottom: 1px solid var(--sz-border);
  padding-block: 0.7rem;
  font-family: var(--font-display);
  font-size: 1.65rem;
  letter-spacing: -0.04em;
  line-height: 1.25;
}

@media (min-width: 640px) {
  .sz-brand {
    gap: 0.5rem;
    font-size: 1.15rem;
  }

  .sz-brand :deep(.sz-brand-mark) {
    width: 36px !important;
    height: 36px !important;
  }

  .sz-burger {
    padding: 0.5rem 0.75rem;
  }

  .sz-burger-label {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
  }

  .sz-menu-link {
    padding-block: 0.85rem;
    font-size: 2rem;
  }
}

@media (min-width: 1024px) {
  .sz-burger {
    display: none;
  }
}
</style>
