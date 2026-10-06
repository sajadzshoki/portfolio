<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  url?: string
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
  <figure class="m-0 drop-shadow-[0_28px_40px_rgba(0,0,0,0.38)]">
    <div class="relative rounded-t-[14px] border border-b-0 border-[#8d9096] bg-[linear-gradient(180deg,#e6e7eb_0%,#b9bcc2_100%)] px-[0.55rem] pt-[0.55rem] pb-[0.4rem]">
      <span class="absolute top-[0.22rem] left-1/2 size-[6px] -translate-x-1/2 rounded-full bg-[#6d7076]" aria-hidden="true" />
      <div class="relative aspect-[16/10] overflow-hidden rounded bg-[#0c0d0b]">
        <LiveFrame
          v-if="liveUrl"
          :url="liveUrl"
          :width="1280"
          :height="800"
          :title="alt"
        />
        <img v-else-if="src && !failed" class="block h-full w-full object-cover object-top" :src="src" :alt="alt" @error="failed = true">
        <div v-else class="grid h-full place-items-center p-4 text-center font-mono text-[0.75rem] text-[#9a958c]">{{ alt }}</div>
      </div>
    </div>
    <div class="relative h-[0.85rem] rounded-b-xl bg-[linear-gradient(180deg,#f2f3f5_0%,#aeb1b6_55%,#8d9096_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]" aria-hidden="true">
      <span class="absolute top-0 left-1/2 h-[0.28rem] w-[16%] -translate-x-1/2 rounded-b-lg bg-[#8a8d92]" />
    </div>
  </figure>
</template>
