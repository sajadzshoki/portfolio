<script setup lang="ts">
const { t } = useLocale()
const { data } = usePortfolio()
const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

const mark = computed(() => initials(data.value?.site.nameEn || 'Sajad Shokraei'))

const links = computed(() => [
  { to: '/projects', label: t.value.nav.projects },
  { to: '/about', label: t.value.nav.about },
  { to: '/skills', label: t.value.nav.skills },
  { to: '/experience', label: t.value.nav.experience },
  { to: '/contact', label: t.value.nav.contact }
])

const solid = computed(() => route.path !== '/' || scrolled.value || open.value)

function current(path: string) {
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
  <header class="site-header" :class="{ 'is-solid': solid, 'is-open': open }">
    <div class="shell-wide bar">
      <NuxtLink to="/" class="mark" :aria-label="t.nav.home">{{ mark }}</NuxtLink>

      <nav class="desk" :aria-label="t.index">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :aria-current="current(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="tools">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <SiteButton class="talk" to="/contact" variant="primary" arrow>{{ t.nav.talk }}</SiteButton>
        <button
          type="button"
          class="menu-btn"
          :aria-expanded="open"
          :aria-label="open ? t.close : t.menu"
          @click="open = !open"
        >
          <span />
          <span />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="open" class="overlay">
        <nav class="shell" :aria-label="t.menu">
          <NuxtLink
            v-for="(link, index) in links"
            :key="link.to"
            :to="link.to"
            :style="{ transitionDelay: `${80 + index * 40}ms` }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ link.label }}
          </NuxtLink>
          <SiteButton to="/contact" variant="primary" arrow>{{ t.nav.talk }}</SiteButton>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 70;
  height: var(--header-h);
  color: var(--text);
}

.site-header.is-solid {
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  border-bottom: 1px solid var(--line);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
}

.mark {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.06em;
}

.desk {
  display: none;
  align-items: center;
  gap: 1.35rem;
}

.desk a {
  color: var(--text-2);
  font-size: 0.92rem;
  font-weight: 500;
}

.desk a[aria-current="page"],
.desk a:hover {
  color: var(--text);
}

.tools {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.talk {
  display: none;
}

.menu-btn {
  display: grid;
  gap: 6px;
  width: 2.4rem;
  height: 2.4rem;
  place-content: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  cursor: pointer;
}

.menu-btn span {
  display: block;
  width: 0.9rem;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.3s var(--ease);
}

.is-open .menu-btn span:first-child {
  transform: translateY(3.75px) rotate(45deg);
}

.is-open .menu-btn span:last-child {
  transform: translateY(-3.75px) rotate(-45deg);
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: -1;
  display: flex;
  align-items: flex-end;
  padding-bottom: 2.5rem;
  background: color-mix(in srgb, var(--bg) 96%, black);
}

.overlay nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.overlay a {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 8vw, 3.3rem);
  font-weight: 650;
  letter-spacing: -0.045em;
  line-height: 1.12;
}

html[lang="fa"] .overlay a {
  font-family: var(--font-persian);
}

.overlay a span {
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

.overlay .site-btn {
  margin-top: 1.25rem;
  align-self: flex-start;
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

@media (min-width: 980px) {
  .desk,
  .talk {
    display: inline-flex;
  }

  .menu-btn,
  .overlay {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-from a {
    transform: none;
  }
}
</style>
