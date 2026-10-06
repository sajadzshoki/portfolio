<script setup lang="ts">
const props = defineProps<{
  url: string
  width: number
  height: number
  title: string
}>()

const box = ref<HTMLElement | null>(null)
const scale = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
const loaded = ref(false)
const shown = ref(false)

function measure() {
  if (!box.value) return
  const boxWidth = box.value.clientWidth
  const boxHeight = box.value.clientHeight
  if (boxWidth <= 0 || boxHeight <= 0) return
  const next = Math.max(boxWidth / props.width, boxHeight / props.height)
  scale.value = next
  offsetX.value = (boxWidth - props.width * next) / 2
  offsetY.value = (boxHeight - props.height * next) / 2
}

let observer: ResizeObserver | null = null

onMounted(() => {
  shown.value = true
  measure()
  if (!box.value) return
  observer = new ResizeObserver(measure)
  observer.observe(box.value)
})

onBeforeUnmount(() => observer?.disconnect())

watch(() => props.url, () => {
  loaded.value = false
})
</script>

<template>
  <div ref="box" class="live absolute inset-0 h-full w-full overflow-hidden">
    <iframe
      v-if="shown"
      :src="url"
      :title="title"
      class="pointer-events-none absolute top-0 left-0 origin-top-left border-0 bg-white"
      :class="loaded ? 'opacity-100' : 'opacity-0'"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
      }"
      referrerpolicy="strict-origin-when-cross-origin"
      @load="loaded = true"
    />
  </div>
</template>

<style scoped>
.live {
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent),
    #10110f;
  background-size: 200% 100%;
}
</style>
