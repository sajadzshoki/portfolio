<script setup lang="ts">
import { techMark } from '~/utils/techMarks'

const props = defineProps<{ name: string }>()
const mark = computed(() => techMark(props.name))
</script>

<template>
  <svg viewBox="0 0 24 24" class="sz-mark" aria-hidden="true">
    <path v-if="mark?.path" :d="mark.path" fill="currentColor" />
    <template v-else-if="mark?.kind === 'rest'">
      <path fill="currentColor" d="M9.1 5.2 3.4 12l5.7 6.8h2.4L5.8 12l5.7-6.8zm5.8 0L21.6 12l-6.7 6.8h-2.4L18.2 12l-5.7-6.8z" />
    </template>
    <template v-else-if="mark?.kind === 'socket'">
      <path fill="currentColor" d="M2.2 13.2h3.1l2.2-4.6 2.6 6.8 2.2-4.4 1.5 2.2h8V11h-6.4l-2.4-3.4-2.5 5.4L8.2 8.4 5.6 13.2H2.2z" />
    </template>
    <template v-else-if="mark?.kind === 'jwt'">
      <path fill="currentColor" d="M8.2 10.2V8.4a3.8 3.8 0 0 1 7.6 0v1.8h1.4A1.8 1.8 0 0 1 19 12v7.2a1.8 1.8 0 0 1-1.8 1.8H6.8A1.8 1.8 0 0 1 5 19.2V12a1.8 1.8 0 0 1 1.8-1.8zm2.1 0h3.4V8.4a1.7 1.7 0 0 0-3.4 0zm1.7 3.2a1.15 1.15 0 0 0-.7 2.06V17h1.4v-1.54a1.15 1.15 0 0 0-.7-2.06z" />
    </template>
    <template v-else-if="mark?.kind === 'otp'">
      <rect x="2.2" y="7.2" width="3.1" height="9.6" rx="1.1" fill="currentColor" />
      <rect x="7.7" y="7.2" width="3.1" height="9.6" rx="1.1" fill="currentColor" />
      <rect x="13.2" y="7.2" width="3.1" height="9.6" rx="1.1" fill="currentColor" />
      <rect x="18.7" y="7.2" width="3.1" height="9.6" rx="1.1" fill="currentColor" />
    </template>
    <circle v-else cx="12" cy="12" r="3.2" fill="currentColor" />
  </svg>
</template>

<style>
.sz-mark {
  display: block;
  width: 1.15em;
  height: 1.15em;
}
</style>
