<script setup lang="ts">
const { t, dir } = useLocale()
const enabled = ref(false)
const ring = ref<HTMLElement | null>(null)
const label = ref<HTMLElement | null>(null)

let teardown: (() => void) | null = null

function labelFor(mode: string) {
  const copy = t.value.cursor
  const arrow = dir.value === 'rtl' ? '↖' : '↗'
  if (mode === 'project') return `${copy.view}\n${copy.project}\n${arrow}`
  if (mode === 'image') return copy.explore
  return ''
}

onMounted(async () => {
  if (!hasFinePointer() || prefersReducedMotion()) return
  enabled.value = true
  document.documentElement.classList.add('has-cursor')
  await nextTick()
  if (!ring.value || !label.value) return

  const gsap = (await import('gsap')).default
  const xRing = gsap.quickTo(ring.value, 'x', { duration: 0.045, ease: 'power2.out' })
  const yRing = gsap.quickTo(ring.value, 'y', { duration: 0.045, ease: 'power2.out' })
  const xLabel = gsap.quickTo(label.value, 'x', { duration: 0.07, ease: 'power2.out' })
  const yLabel = gsap.quickTo(label.value, 'y', { duration: 0.07, ease: 'power2.out' })
  const scale = gsap.quickTo(ring.value, 'scale', { duration: 0.1, ease: 'power2.out' })

  let mode = ''
  let frame = 0
  let px = 0
  let py = 0

  function paint() {
    frame = 0
    const offset = dir.value === 'rtl' ? -22 : 18
    xRing(px - 5)
    yRing(py - 5)
    xLabel(px + offset)
    yLabel(py + 16)
    if (ring.value && ring.value.style.opacity === '0') ring.value.style.opacity = '0.85'
  }

  function onMove(event: PointerEvent) {
    px = event.clientX
    py = event.clientY
    if (!frame) frame = window.requestAnimationFrame(paint)
  }

  function modeFrom(target: EventTarget | null) {
    const node = target instanceof Element ? target : null
    if (!node || node.closest('[data-cursor-off]')) return 'default'
    const explicit = node.closest<HTMLElement>('[data-cursor]')?.dataset.cursor
    if (explicit === 'project' || explicit === 'image' || explicit === 'button' || explicit === 'link') return explicit
    const el = node.closest('button, a, .site-btn')
    if (!el) return 'default'
    if (el.matches('button, .site-btn')) return 'button'
    if (el.matches('a')) return 'link'
    return 'default'
  }

  function apply(next: string) {
    if (next === mode || !ring.value || !label.value) return
    mode = next
    const scaleTo = next === 'button' ? 1.7 : next === 'link' ? 1.35 : next === 'project' || next === 'image' ? 1.15 : 1
    scale(scaleTo)
    const text = labelFor(next)
    label.value.textContent = text
    label.value.style.opacity = text ? '1' : '0'
  }

  function onOver(event: PointerEvent) {
    apply(modeFrom(event.target))
  }

  function onLeave() {
    if (!ring.value) return
    ring.value.style.opacity = '0'
  }

  function onEnter() {
    if (!ring.value) return
    ring.value.style.opacity = '1'
  }

  const stopLocale = watch(t, () => {
    if (!label.value || !mode) return
    const text = labelFor(mode)
    label.value.textContent = text
    label.value.style.opacity = text ? '1' : '0'
  })

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerover', onOver)
  document.documentElement.addEventListener('pointerleave', onLeave)
  document.documentElement.addEventListener('pointerenter', onEnter)

  teardown = () => {
    stopLocale()
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerover', onOver)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    document.documentElement.removeEventListener('pointerenter', onEnter)
    document.documentElement.classList.remove('has-cursor')
  }
})

onBeforeUnmount(() => {
  teardown?.()
})
</script>

<template>
  <div v-if="enabled" class="site-cursor pointer-events-none fixed inset-0 z-[75]" aria-hidden="true">
    <div ref="ring" class="ring fixed top-0 left-0 size-[10px] rounded-full border border-[var(--text)] opacity-0" />
    <div ref="label" class="label fixed top-0 left-0 font-mono text-[0.62rem] leading-[1.35] tracking-[0.12em] whitespace-pre text-[var(--text)] uppercase opacity-0 fa:text-[0.75rem] fa:tracking-normal fa:normal-case" />
  </div>
</template>
