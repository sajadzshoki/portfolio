export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return
  const { data } = await useFetch('/api/admin/session')
  if (!data.value?.ok) {
    return navigateTo('/admin/login')
  }
})
