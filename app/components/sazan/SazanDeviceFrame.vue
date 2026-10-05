<script setup lang="ts">
import type { DeviceType } from '~/utils/studio'

const props = withDefaults(defineProps<{
  type?: DeviceType
  src?: string | null
  alt?: string
  liveUrl?: string | null
  live?: boolean
  priority?: boolean
  title?: string
}>(), {
  type: 'laptop',
  src: '',
  alt: '',
  liveUrl: '',
  live: false,
  priority: false,
  title: ''
})

const id = `sz${useId().replace(/[^a-zA-Z0-9]/g, '')}`
const { t } = useLocale()
const failed = ref(false)

watch(() => props.src, () => {
  failed.value = false
})

const showShot = computed(() => Boolean(props.src) && !failed.value)
const showLive = computed(() => Boolean(props.live && props.liveUrl))

const screen = computed(() => {
  if (props.type === 'phone') return { left: '5.64%', top: '2.75%', width: '88.72%', height: '94.5%', radius: '12%' }
  if (props.type === 'tablet') return { left: '4.74%', top: '3.27%', width: '90.53%', height: '93.47%', radius: '4.2%' }
  return { left: '12.2%', top: '8.125%', width: '75.6%', height: '66.25%', radius: '0.4rem' }
})
</script>

<template>
  <div class="sz-device" :data-device="type">
    <div
      class="sz-screen"
      :style="{
        left: screen.left,
        top: screen.top,
        width: screen.width,
        height: screen.height,
        borderRadius: screen.radius
      }"
    >
      <iframe
        v-if="showLive"
        :src="liveUrl || undefined"
        :title="alt || title || 'Live preview'"
        loading="lazy"
        referrerpolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
      <img
        v-else-if="showShot"
        :src="src || undefined"
        :alt="alt"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
        @error="failed = true"
      >
      <div v-else class="sz-shot-missing">
        <strong>{{ title || 'SAZAN' }}</strong>
        <span class="text-[0.78rem] font-semibold text-primary">{{ t.work.missingTitle }}</span>
        <span class="text-[0.72rem] leading-snug">{{ t.work.missingBody }}</span>
        <span class="font-mono text-[0.62rem] break-all text-subtle">{{ src || '—' }}</span>
      </div>
    </div>

    <svg v-if="type === 'laptop'" viewBox="0 0 1000 640" aria-hidden="true">
      <defs>
        <linearGradient :id="`${id}-lid`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--sz-device-hi)" />
          <stop offset="1" stop-color="var(--sz-device-lo)" />
        </linearGradient>
        <linearGradient :id="`${id}-base`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--sz-device-base-hi)" />
          <stop offset="1" stop-color="var(--sz-device-base-lo)" />
        </linearGradient>
        <mask :id="`${id}-hole`">
          <rect width="1000" height="640" fill="white" />
          <rect x="122" y="52" width="756" height="424" rx="8" fill="black" />
        </mask>
      </defs>
      <ellipse cx="500" cy="620" rx="320" ry="12" fill="var(--sz-device-shadow)" />
      <g :mask="`url(#${id}-hole)`">
        <rect x="90" y="16" width="820" height="500" rx="22" :fill="`url(#${id}-lid)`" />
        <rect x="106" y="32" width="788" height="468" rx="14" fill="#1a1d24" />
      </g>
      <circle cx="500" cy="42" r="3" fill="#4a5160" />
      <path d="M48 516h904c26 0 38 16 30 32l-20 34c-8 14-22 22-38 22H76c-16 0-30-8-38-22L18 548c-8-16 4-32 30-32Z" :fill="`url(#${id}-base)`" />
      <rect x="438" y="530" width="124" height="6" rx="3" fill="var(--sz-device-track)" />
    </svg>

    <svg v-else-if="type === 'tablet'" viewBox="0 0 760 980" aria-hidden="true">
      <defs>
        <linearGradient :id="`${id}-tab`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="var(--sz-device-hi)" />
          <stop offset="1" stop-color="var(--sz-device-lo)" />
        </linearGradient>
        <mask :id="`${id}-tab-hole`">
          <rect width="760" height="980" fill="white" />
          <rect x="36" y="32" width="688" height="916" rx="28" fill="black" />
        </mask>
      </defs>
      <g :mask="`url(#${id}-tab-hole)`">
        <rect x="8" y="6" width="744" height="968" rx="46" :fill="`url(#${id}-tab)`" />
        <rect x="22" y="20" width="716" height="940" rx="38" fill="#1a1d24" />
      </g>
      <circle cx="380" cy="26" r="3" fill="#4a5160" />
    </svg>

    <svg v-else viewBox="0 0 390 800" aria-hidden="true">
      <defs>
        <linearGradient :id="`${id}-phone`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="var(--sz-device-hi)" />
          <stop offset="1" stop-color="var(--sz-device-track)" />
        </linearGradient>
        <mask :id="`${id}-phone-hole`">
          <rect width="390" height="800" fill="white" />
          <rect x="22" y="22" width="346" height="756" rx="36" fill="black" />
        </mask>
      </defs>
      <g :mask="`url(#${id}-phone-hole)`">
        <rect x="6" y="4" width="378" height="792" rx="54" :fill="`url(#${id}-phone)`" />
        <rect x="14" y="12" width="362" height="776" rx="48" fill="#16181d" />
      </g>
      <rect x="378" y="168" width="4" height="54" rx="2" fill="var(--sz-device-track)" />
      <rect x="378" y="236" width="4" height="34" rx="2" fill="var(--sz-device-track)" />
    </svg>

    <span
      v-if="type === 'phone'"
      class="pointer-events-none absolute left-1/2 z-[2] h-[3.2%] w-[28%] -translate-x-1/2 rounded-full bg-[#16181d]"
      style="top: 3.6%"
      aria-hidden="true"
    />
  </div>
</template>
