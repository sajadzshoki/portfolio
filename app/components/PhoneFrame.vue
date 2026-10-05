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
  <figure class="phone">
    <span class="notch" aria-hidden="true" />
    <div class="screen">
      <LiveFrame
        v-if="liveUrl"
        :url="liveUrl"
        :width="390"
        :height="844"
        :title="alt"
      />
      <img v-else-if="src && !failed" :src="src" :alt="alt" @error="failed = true">
      <div v-else class="fallback">{{ alt }}</div>
    </div>
  </figure>
</template>

<style scoped>
.phone {
  position: relative;
  margin: 0;
  padding: 0.42rem;
  border-radius: 30px;
  background: linear-gradient(180deg, #2a2b2e, #0e0e10);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.notch {
  position: absolute;
  z-index: 2;
  top: 0.62rem;
  left: 50%;
  width: 30%;
  height: 0.72rem;
  border-radius: 999px;
  background: #0a0a0b;
  transform: translateX(-50%);
}

.screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 390 / 844;
  border-radius: 24px;
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
  padding: 0.75rem;
  color: #9a958c;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-align: center;
}
</style>
