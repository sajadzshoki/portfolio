<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  url?: string
  live?: string
  variant?: 'silver' | 'slim'
}>()

const failed = ref(false)
const slim = computed(() => props.variant === 'slim')
const frameSrc = computed(() => slim.value ? '/images/laptop2.png' : '/images/laptop.png')

const liveUrl = computed(() => {
  const value = (props.live || '').trim()
  return /^https?:\/\//i.test(value) ? value : ''
})

const screenStyle = computed(() => slim.value
  ? { left: '9.09%', top: '2.51%', width: '81.98%', height: '76.25%' }
  : { left: '13.33%', top: '8.47%', width: '73.33%', height: '77.25%' })

watch(() => props.src, () => {
  failed.value = false
})
</script>

<template>
  <figure class="relative m-0">
    <div class="relative overflow-hidden" :style="{ aspectRatio: slim ? '1.432' : '1.667' }">
      <div class="absolute overflow-hidden rounded-[10px] bg-[#0c0d0b]" :style="screenStyle">
        <img v-if="src && !failed" class="block h-full w-full object-cover object-top" :src="src" :alt="alt" @error="failed = true">
        <LiveFrame
          v-else-if="liveUrl"
          :url="liveUrl"
          :width="1280"
          :height="800"
          :title="alt"
        />
        <div v-else class="grid h-full place-items-center p-4 text-center font-mono text-[0.75rem] text-[#9a958c]">{{ alt }}</div>
      </div>
      <img
        class="pointer-events-none absolute z-[1] max-w-none select-none"
        :src="frameSrc"
        alt=""
        :style="slim
          ? { width: '153.1%', height: '123.3%', left: '-26.47%', top: '-18.26%' }
          : { width: '100%', height: '100%', left: '0', top: '0' }"
      >
    </div>
  </figure>
</template>
