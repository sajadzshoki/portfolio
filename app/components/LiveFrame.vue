<script setup lang="ts">
const props = defineProps<{
  url: string
  width: number
  height: number
  title: string
}>()

const box = ref<HTMLElement | null>(null)
const scale = ref(0.2)
const loaded = ref(false)
const shown = ref(false)

function measure() {
  if (!box.value) return
  const next = box.value.clientWidth / props.width
  if (next > 0) scale.value = next
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
        transform: `scale(${scale})`
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
