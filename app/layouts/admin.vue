<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()

useHead({ title: 'Desk — SAZAN' })

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="admin-root min-h-dvh bg-bg text-ink">
    <header class="border-b border-line">
      <div class="site-shell flex h-16 items-center justify-between gap-4">
        <NuxtLink to="/admin" class="flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.04em]">
          <span class="text-primary"><SazanMark /></span>
          SAZAN
          <span class="text-sm font-medium text-muted">/ {{ t.admin.desk }}</span>
        </NuxtLink>
        <div class="flex items-center gap-3">
          <SazanThemeSwitch />
          <LanguageSwitcher />
          <NuxtLink to="/" class="text-sm hover:text-primary">Site</NuxtLink>
          <button
            v-if="route.path !== '/admin/login'"
            type="button"
            class="text-sm text-muted hover:text-primary"
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
