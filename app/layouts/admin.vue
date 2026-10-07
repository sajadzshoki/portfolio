<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="admin-shell min-h-dvh bg-[var(--bg)] text-[var(--text)]">
    <header class="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]">
      <div class="shell flex min-h-[3.4rem] items-center justify-between gap-4">
        <NuxtLink to="/admin" class="brand" :aria-label="t.admin.desk">
          <img src="/sajad-logo.png" alt="" width="512" height="512">
        </NuxtLink>
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
    <main class="shell pt-5 pb-28">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.brand {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  flex: none;
  overflow: hidden;
}

.brand img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5.6rem;
  max-width: none;
  height: 5.6rem;
  transform: translate(-50%, -50%);
}
</style>
