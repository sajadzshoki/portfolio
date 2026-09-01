export function useReveal(options: IntersectionObserverInit = {}) {
  const el = ref<HTMLElement | null>(null)
  const shown = ref(false)

  onMounted(async () => {
    await nextTick()
    const node = el.value instanceof HTMLElement
      ? el.value
      : (el.value as { $el?: HTMLElement } | null)?.$el ?? null

    const reduce = import.meta.client
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!node || reduce) {
      shown.value = true
      return
    }

    const reveal = () => {
      shown.value = true
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        reveal()
        io.disconnect()
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px', ...options })

    io.observe(node)

    const fallback = window.setTimeout(reveal, 1400)
    onBeforeUnmount(() => {
      io.disconnect()
      window.clearTimeout(fallback)
    })
  })

  return { el, shown }
}
