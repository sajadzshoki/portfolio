<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const email = ref('admin@atlas.dev')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { t } = useLocale()

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await navigateTo('/admin')
  } catch {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-md py-16">
    <p class="meta text-muted mb-3">07 / ACCESS</p>
    <h1 class="font-display text-5xl tracking-[-0.04em]">{{ t.admin.login }}</h1>
    <form class="mt-10 space-y-5" @submit.prevent="submit">
      <div>
        <label class="field-label">Email</label>
        <input v-model="email" type="email" autocomplete="username" required>
      </div>
      <div>
        <label class="field-label">Password</label>
        <input v-model="password" type="password" autocomplete="current-password" required>
      </div>
      <p v-if="error" class="text-sm text-signal">{{ error }}</p>
      <SiteButton variant="primary" type="submit" :magnetic="false">
        {{ loading ? '…' : t.admin.login }}
      </SiteButton>
    </form>
    <p class="mt-8 font-mono text-xs text-muted">
      Default: admin@atlas.dev / atlas-admin
    </p>
  </div>
</template>
