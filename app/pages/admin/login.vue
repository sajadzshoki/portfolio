<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const email = ref('')
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
    error.value = t.value.admin.invalid
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="login">
    <p class="eyebrow">{{ t.admin.desk }}</p>
    <h1 class="display">{{ t.admin.login }}</h1>
    <form @submit.prevent="submit">
      <div>
        <label class="field-label" for="email">Email</label>
        <input id="email" v-model="email" type="email" autocomplete="username" required>
      </div>
      <div>
        <label class="field-label" for="password">Password</label>
        <input id="password" v-model="password" type="password" autocomplete="current-password" required>
      </div>
      <p v-if="error" class="err">{{ error }}</p>
      <button class="site-btn site-btn-primary" type="submit">{{ loading ? '…' : t.admin.login }}</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  max-width: 28rem;
  padding-top: 2rem;
}

.display {
  margin-top: 0.7rem;
  font-size: 3rem;
}

form {
  display: grid;
  gap: 1rem;
  margin-top: 1.6rem;
}

.err {
  color: var(--danger);
  font-size: 0.92rem;
}
</style>
