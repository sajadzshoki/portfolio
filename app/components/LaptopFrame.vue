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
  <figure class="laptop">
    <div class="lid">
      <span class="cam" aria-hidden="true" />
      <div class="screen">
        <LiveFrame
          v-if="liveUrl"
          :url="liveUrl"
          :width="1280"
          :height="800"
          :title="alt"
        />
        <img v-else-if="src && !failed" :src="src" :alt="alt" @error="failed = true">
        <div v-else class="fallback">{{ alt }}</div>
      </div>
    </div>
    <div class="base" aria-hidden="true">
      <span class="notch" />
    </div>
  </figure>
</template>

<style scoped>
.laptop {
  margin: 0;
  filter: drop-shadow(0 28px 40px rgba(0, 0, 0, 0.38));
}

.lid {
  position: relative;
  padding: 0.55rem 0.55rem 0.4rem;
  border: 1px solid #8d9096;
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(180deg, #e6e7eb 0%, #b9bcc2 100%);
}

.cam {
  position: absolute;
  top: 0.22rem;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6d7076;
  transform: translateX(-50%);
}

.screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: 4px;
  background: #0c0d0b;
}

.screen img,
.screen :deep(.live) {
  width: 100%;
  height: 100%;
}

.screen :deep(.live) {
  position: absolute;
  inset: 0;
}

.screen img {
  object-fit: cover;
  object-position: top center;
  display: block;
}

.fallback {
  display: grid;
  place-items: center;
  height: 100%;
  padding: 1rem;
  color: #9a958c;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-align: center;
}

.base {
  position: relative;
  height: 0.85rem;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(180deg, #f2f3f5 0%, #aeb1b6 55%, #8d9096 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.notch {
  position: absolute;
  left: 50%;
  top: 0;
  width: 16%;
  height: 0.28rem;
  border-radius: 0 0 8px 8px;
  background: #8a8d92;
  transform: translateX(-50%);
}
</style>
