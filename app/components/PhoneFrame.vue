<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  live?: string
}>()

const failed = ref(false)
const liveUrl = computed(() => {
  const value = (props.live || '').trim()
  return /^https?:\/\//i.test(value) ? value : ''
})

watch(() => props.src, () => {
  failed.value = false
})
</script>

<template>
  <figure class="relative m-0">
    <div class="absolute overflow-hidden bg-[#0c0d0b]" style="left: 6.9%; top: 3.04%; width: 86.62%; height: 92.82%; border-radius: 9.2% / 4.3%">
      <img v-if="src && !failed" class="block h-full w-full object-cover object-top" :src="src" :alt="alt" @error="failed = true">
      <LiveFrame
        v-else-if="liveUrl"
        :url="liveUrl"
        :width="390"
        :height="844"
        :title="alt"
      />
      <div v-else class="grid h-full place-items-center p-3 text-center font-mono text-[0.68rem] text-[#9a958c]">{{ alt }}</div>
    </div>
    <img class="pointer-events-none relative z-[1] block h-auto w-full select-none" src="/images/mobile.png" alt="">
  </figure>
</template>
