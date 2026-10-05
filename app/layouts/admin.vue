<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="admin">
    <header>
      <div class="shell bar">
        <NuxtLink to="/admin" class="mark">{{ t.admin.desk }}</NuxtLink>
        <div class="tools">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <NuxtLink to="/" class="site-btn site-btn-secondary">{{ t.nav.home }}</NuxtLink>
          <button
            v-if="route.path !== '/admin/login'"
            type="button"
            class="site-btn site-btn-ghost"
            @click="logout"
          >
            {{ t.admin.logout }}
          </button>
        </div>
      </div>
    </header>
    <main class="shell">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
}

header {
  border-bottom: 1px solid var(--line);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.25rem;
}

.mark {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

main {
  padding-block: 2rem 4rem;
}
</style>
