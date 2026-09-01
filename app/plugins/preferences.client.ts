export default defineNuxtPlugin(() => {
  const { init: initTheme } = useTheme()
  const { init: initLocale } = useLocale()
  initTheme()
  initLocale()
})
