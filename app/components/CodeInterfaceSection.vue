<script setup lang="ts">
const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
const step = ref(0)

const effect = computed(() => {
  const copy = t.value.craft.effect
  if (step.value <= 0) return copy.idle
  if (step.value === 1) return copy.responsive
  if (step.value === 2) return copy.interactive
  if (step.value === 3) return copy.scalable
  return copy.maintainable
})

const lines = [
  { text: 'const interface = {', hot: 0 },
  { text: '  responsive: true,', hot: 1 },
  { text: '  interactive: true,', hot: 2 },
  { text: '  scalable: true,', hot: 3 },
  { text: '  maintainable: true', hot: 4 },
  { text: '}', hot: 4 }
]

let motion: { revert: () => void } | null = null

onMounted(async () => {
  if (prefersReducedMotion()) {
    step.value = 4
    return
  }
  if (!root.value) return
  const { gsap, ScrollTrigger } = await loadGsap()
  if (!root.value) return

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: root.value,
      start: 'top 72%',
      end: 'center 42%',
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const progress = self.progress
        const next = progress < 0.16 ? 0 : progress < 0.36 ? 1 : progress < 0.56 ? 2 : progress < 0.76 ? 3 : 4
        if (next !== step.value) step.value = next
      }
    })
  }, root.value)
  motion = ctx
  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onBeforeUnmount(() => {
  motion?.revert()
})
</script>

<template>
  <section id="craft" ref="root" class="band">
    <div class="shell-wide">
      <header class="mb-[clamp(1.75rem,4vw,2.6rem)] max-w-[36rem]">
        <p class="eyebrow">{{ t.craft.eyebrow }}</p>
        <h2 class="display mt-[0.85rem] text-[clamp(2rem,4vw,3.15rem)]">{{ t.craft.title }}</h2>
        <p class="lede mt-3">{{ t.craft.lede }}</p>
      </header>

      <div class="grid items-center gap-6 min-[900px]:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.1fr)] min-[900px]:gap-8">
        <div class="code font-mono text-[0.92rem] leading-[1.85] text-[var(--text-2)] min-[900px]:text-[1rem]" dir="ltr">
          <p class="m-0 mb-2 px-3 font-sans text-[0.78rem] tracking-[0.08em] text-[var(--text-3)] uppercase fa:text-[0.9rem] fa:tracking-normal fa:normal-case">{{ t.craft.codeLabel }}</p>
          <p
            v-for="(line, index) in lines"
            :key="index"
            class="m-0 px-3 whitespace-pre transition-colors duration-200"
            :class="step >= line.hot ? 'text-[var(--text)]' : 'text-[var(--text-3)]'"
          >
            <span class="inline-block px-2" :class="step === line.hot && line.text.includes(':') ? 'bg-[var(--accent-soft)]' : ''">{{ line.text }}</span>
          </p>
        </div>

        <span class="arrow justify-self-center font-mono text-[1.1rem] text-[var(--text-3)]" aria-hidden="true">→</span>

        <div class="grid gap-4">
          <p class="m-0 font-sans text-[0.78rem] tracking-[0.08em] text-[var(--text-3)] uppercase fa:text-[0.9rem] fa:tracking-normal fa:normal-case">{{ t.craft.uiLabel }}</p>
          <InterfacePreview :step="step" />
          <p class="m-0 text-[clamp(1.15rem,2vw,1.45rem)] font-semibold leading-[1.35] tracking-[-0.03em] [font-family:var(--font-display)]" aria-live="polite">{{ effect }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arrow {
  transform: rotate(90deg);
}

@media (min-width: 900px) {
  .arrow {
    transform: none;
  }

  [dir="rtl"] .arrow {
    transform: scaleX(-1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .code p {
    transition: none;
  }
}
</style>
