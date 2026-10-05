export function useMagnetic(strength = 0.32) {
  const el = ref<HTMLElement | null>(null)
  const x = ref(0)
  const y = ref(0)

  function reduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || window.matchMedia('(pointer: coarse)').matches
  }

  function node() {
    const value = el.value as (HTMLElement & { $el?: HTMLElement }) | null
    if (!value) return null
    return value instanceof HTMLElement ? value : value.$el || null
  }

  function onMove(e: MouseEvent) {
    const target = node()
    if (!target || reduced()) return
    const r = target.getBoundingClientRect()
    x.value = (e.clientX - r.left - r.width / 2) * strength
    y.value = (e.clientY - r.top - r.height / 2) * strength
  }

  function onLeave() {
    x.value = 0
    y.value = 0
  }

  const style = computed(() => ({
    transform: `translate3d(${x.value}px, ${y.value}px, 0)`
  }))

  return { el, x, y, onMove, onLeave, style }
}
