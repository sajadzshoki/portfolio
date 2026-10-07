<script setup lang="ts">
const { t, field, dir } = useLocale()
const { data } = usePortfolio()
const ready = ref(false)
const cinematic = ref(true)

const stage = ref<HTMLElement | null>(null)
const media = ref<HTMLElement | null>(null)
const copy = ref<HTMLElement | null>(null)
const cue = ref<HTMLElement | null>(null)
const statement = ref<HTMLElement | null>(null)

const site = computed(() => data.value?.site)
const name = computed(() => site.value ? presentName(field(site.value.nameEn, site.value.nameFa)) : '')
const role = computed(() => site.value ? splitRole(field(site.value.roleEn, site.value.roleFa)) : { lead: '', rest: '' })
const intro = computed(() => site.value ? field(site.value.introEn, site.value.introFa) : '')
const keywords = computed(() => t.value.hero.keywords)

let motion: { revert: () => void } | null = null
let extraCleanup: (() => void) | null = null
let refreshTimer = 0

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}

function shift(mobile: boolean) {
  const distance = mobile ? 18 : 48
  return document.documentElement.dir === 'rtl' ? -distance : distance
}

async function play() {
  extraCleanup?.()
  extraCleanup = null
  motion?.revert()
  motion = null
  if (!stage.value || prefersReducedMotion()) {
    cinematic.value = false
    return
  }

  cinematic.value = true
  const { gsap, ScrollTrigger } = await loadGsap()
  if (!stage.value) return

  const mm = gsap.matchMedia()
  const build = (mobile: boolean) => {
    const words = gsap.utils.toArray<HTMLElement>('[data-keyword]', stage.value)
    gsap.set(words, { autoAlpha: 0 })
    gsap.set(statement.value, { autoAlpha: 0 })
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage.value,
        start: 'top top',
        end: mobile ? 'bottom 35%' : 'bottom 18%',
        scrub: 0.25
      }
    })

    tl.to(media.value, {
      scale: mobile ? 1.035 : 1.07,
      x: () => shift(mobile),
      opacity: 0.82,
      duration: 0.72
    }, 0)

    tl.to(copy.value, {
      y: mobile ? -18 : -36,
      scale: 0.975,
      opacity: 0,
      duration: 0.62
    }, 0.04)

    tl.set(copy.value, { pointerEvents: 'none' }, 0.42)

    tl.to(cue.value, { autoAlpha: 0, y: -8, duration: 0.16 }, 0)

    words.forEach((word, index) => {
      const at = 0.04 + index * 0.14
      tl.fromTo(word, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.04, immediateRender: false }, at)
      tl.to(word, { autoAlpha: 0, y: -10, duration: 0.035 }, at + 0.105)
    })

    tl.fromTo(statement.value, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.16, immediateRender: false }, 0.82)
  }

  mm.add('(max-width: 860px)', () => build(true))
  mm.add('(min-width: 861px)', () => build(false))
  motion = mm

  let lastHeight = 0
  const refresh = () => {
    ScrollTrigger.refresh()
    lastHeight = document.getElementById('main')?.scrollHeight || 0
  }
  window.addEventListener('load', refresh, { once: true })
  const main = document.getElementById('main')
  const observer = main
    ? new ResizeObserver(() => {
        const next = main.scrollHeight
        if (Math.abs(next - lastHeight) < 8) return
        window.clearTimeout(refreshTimer)
        refreshTimer = window.setTimeout(refresh, 180)
      })
    : null
  observer?.observe(main!)
  refreshTimer = window.setTimeout(refresh, 240)
  extraCleanup = () => {
    window.clearTimeout(refreshTimer)
    window.removeEventListener('load', refresh)
    observer?.disconnect()
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
  play()
})

watch(dir, () => {
  if (!import.meta.client || prefersReducedMotion()) return
  play()
})

onBeforeUnmount(() => {
  extraCleanup?.()
  motion?.revert()
})
</script>

<template>
  <section
    id="top"
    ref="stage"
    class="hero relative flex min-h-[70dvh] items-center overflow-hidden bg-[var(--bg)] pt-[var(--header-h)] pb-[4.5rem] max-[860px]:block max-[860px]:min-h-0"
    :class="{ ready, 'is-cinematic': cinematic }"
  >
    <div ref="media" class="media absolute inset-y-0 end-0 z-0 w-[min(68%,920px)] max-[860px]:relative max-[860px]:end-auto max-[860px]:h-[min(40.6vw,224px)] max-[860px]:w-full" aria-hidden="true">
      <div class="shots absolute inset-0">
        <img
          class="shot shot-dark absolute inset-0 block h-full w-full object-cover object-[62%_center]"
          src="/images/sajad-hero-dark.webp"
          alt=""
          width="1774"
          height="887"
          fetchpriority="high"
          decoding="async"
        >
        <img
          class="shot shot-light absolute inset-0 block h-full w-full object-cover object-[62%_center]"
          src="/images/sajad-hero-light.webp"
          alt=""
          width="2019"
          height="779"
          decoding="async"
        >
      </div>
    </div>

    <div class="shell-wide relative z-[1] max-[860px]:pt-7">
      <div class="relative w-[min(38rem,100%)] py-4 max-[860px]:w-full max-[860px]:py-0">
        <div ref="copy">
          <p class="eyebrow">{{ role.lead || t.hero.eyebrow }}</p>
          <h1 class="display mt-[1.35rem] text-[clamp(2.85rem,6vw,5.35rem)] leading-[1.05] tracking-[-0.045em]">{{ name }}</h1>
          <p v-if="role.rest" class="mt-[1.35rem] max-w-[28rem] text-[clamp(1.55rem,2.6vw,2.25rem)] font-semibold leading-[1.22] tracking-[-0.04em] text-[var(--text-2)] [font-family:var(--font-display)] max-[860px]:max-w-none">{{ role.rest }}</p>
          <p class="lede intro mt-[1.35rem] max-w-[34rem]">{{ intro }}</p>
          <div class="mt-8 flex flex-wrap gap-[0.8rem]">
            <SiteButton variant="primary" arrow class="min-h-12 rounded-full px-5" @click="scrollToProjects">{{ t.hero.ctaPrimary }}</SiteButton>
            <SiteButton to="/about" variant="secondary" class="min-h-12 rounded-full px-5">{{ t.hero.ctaSecondary }}</SiteButton>
          </div>
        </div>

        <div ref="statement" class="statement pointer-events-none absolute inset-x-0 top-[12%]">
          <p class="display text-[clamp(2.15rem,4.4vw,3.7rem)] leading-[1.02]">{{ t.hero.bridgeLead }}</p>
          <p class="mt-3 text-[clamp(1.45rem,2.5vw,2.15rem)] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--text-2)] [font-family:var(--font-display)]">{{ t.hero.bridgeRest }}</p>
        </div>
      </div>
    </div>

    <div class="keyword-slot pointer-events-none absolute z-[2]" aria-hidden="true">
      <span
        v-for="word in keywords"
        :key="word"
        data-keyword
        class="keyword"
      >{{ word }}</span>
    </div>

    <a ref="cue" class="absolute bottom-7 z-[1] start-[var(--page-gutter)] inline-flex items-center gap-[0.7rem] font-mono text-[0.72rem] tracking-[0.08em] text-[var(--text-3)] uppercase fa:text-[0.84rem] fa:tracking-normal fa:normal-case" href="#projects">
      <span class="scroll-mark relative size-[1.7rem] rounded-full border border-[var(--line-strong)] before:absolute before:start-1/2 before:top-[0.35rem] before:h-[0.55rem] before:w-px before:-translate-x-1/2 before:bg-[var(--text-2)] before:content-[''] rtl:before:translate-x-1/2" aria-hidden="true" />
      {{ t.hero.scroll }}
    </a>
  </section>
</template>

<style scoped>
.media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, var(--bg) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 18%, transparent 46%),
    linear-gradient(to top, var(--bg) 0%, transparent 28%),
    linear-gradient(to left, color-mix(in srgb, var(--bg) 35%, transparent), transparent 18%);
  pointer-events: none;
}

[dir="rtl"] .media::after {
  background:
    linear-gradient(to left, var(--bg) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 18%, transparent 46%),
    linear-gradient(to top, var(--bg) 0%, transparent 28%),
    linear-gradient(to right, color-mix(in srgb, var(--bg) 35%, transparent), transparent 18%);
}

.shots {
  transition: transform 0.65s var(--ease);
}

[dir="rtl"] .shots {
  transform: scaleX(-1);
}

.shot {
  transition: opacity 0.65s var(--ease);
}

.shot-dark {
  opacity: 0;
}

.shot-light {
  opacity: 1;
}

html.dark .shot-dark {
  opacity: 1;
}

html.dark .shot-light {
  opacity: 0;
}

.ready:not(.is-cinematic) .shot {
  animation: settle 1.3s var(--ease) both;
}

.statement {
  opacity: 0;
}

.keyword-slot {
  top: 76%;
  inset-inline-end: clamp(1.25rem, 6vw, 4.5rem);
  width: min(28rem, 52%);
  height: 5.5rem;
  transform: translateY(-50%);
}

.keyword {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  opacity: 0;
  color: #111;
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 5.6vw, 4.8rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.95;
  text-shadow:
    0 0 2px #fff,
    0 1px 0 #fff,
    0 0 18px rgba(255, 255, 255, 0.95);
  white-space: nowrap;
}

html.dark .keyword {
  color: #fff;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.95),
    0 0 12px rgba(0, 0, 0, 0.85),
    0 10px 24px rgba(0, 0, 0, 0.7);
}

html[lang="fa"] .keyword {
  font-family: var(--font-persian);
}

@keyframes settle {
  from { transform: scale(1.06); }
  to { transform: none; }
}

@media (max-width: 860px) {
  .media::after,
  [dir="rtl"] .media::after {
    background: linear-gradient(to top, var(--bg) 0%, transparent 42%);
  }

  .keyword-slot {
    top: calc(var(--header-h) + min(18vw, 5.5rem));
    inset-inline: var(--page-gutter);
    width: auto;
    height: 3.4rem;
    transform: none;
  }

  .keyword {
    font-size: clamp(2.15rem, 11vw, 3rem);
  }

  .statement {
    top: auto;
    bottom: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ready .shot,
  .ready:not(.is-cinematic) .shot {
    animation: none;
  }

  .statement,
  .keyword {
    display: none;
  }
}
</style>
