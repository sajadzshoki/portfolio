<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="min-h-dvh bg-paper text-ink">
    <header class="border-b-2 border-ink">
      <div class="site-shell flex h-16 items-center justify-between">
        <NuxtLink to="/admin" class="font-display text-xl tracking-[-0.04em]">
          ATLAS <span class="text-muted">/ {{ t.admin.desk }}</span>
        </NuxtLink>
        <div class="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <NuxtLink to="/" class="meta border-2 border-ink px-2 py-1 hover:bg-ink hover:text-paper">Site</NuxtLink>
          <button
            v-if="route.path !== '/admin/login'"
            type="button"
            class="meta border-2 border-ink px-2 py-1 hover:bg-signal hover:text-white hover:border-signal"
            @click="logout"
          >
            {{ t.admin.logout }}
          </button>
        </div>
      </div>
    </header>
    <main class="site-shell py-10">
      <slot />
    </main>
  </div>
</template>
