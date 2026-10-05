<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <p class="sz-kicker">{{ text }}</p>
</template>
