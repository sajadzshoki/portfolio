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
  <figure class="phone relative m-0 rounded-[30px] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,#2a2b2e,#0e0e10)] p-[0.42rem] shadow-[0_18px_40px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
    <span class="absolute top-[0.62rem] left-1/2 z-[2] h-[0.72rem] w-[30%] -translate-x-1/2 rounded-full bg-[#0a0a0b]" aria-hidden="true" />
    <div class="relative aspect-[390/844] overflow-hidden rounded-3xl bg-[#0c0d0b]">
      <LiveFrame
        v-if="liveUrl"
        :url="liveUrl"
        :width="390"
        :height="844"
        :title="alt"
      />
      <img v-else-if="src && !failed" class="block h-full w-full object-cover object-top" :src="src" :alt="alt" @error="failed = true">
      <div v-else class="grid h-full place-items-center p-3 text-center font-mono text-[0.68rem] text-[#9a958c]">{{ alt }}</div>
    </div>
  </figure>
</template>
