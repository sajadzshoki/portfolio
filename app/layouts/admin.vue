<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
    <header class="border-b border-[var(--line)]">
      <div class="shell flex min-h-[4.25rem] items-center justify-between gap-4">
        <NuxtLink to="/admin" class="text-[1.15rem] font-bold tracking-[-0.04em] [font-family:var(--font-display)]">{{ t.admin.desk }}</NuxtLink>
        <div class="flex flex-wrap items-center gap-2">
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
    <main class="shell pt-8 pb-16">
      <slot />
    </main>
  </div>
</template>
