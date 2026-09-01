<script setup lang="ts">
defineProps<{
  index: string
  kicker: string
  title: string
}>()
</script>

<template>
  <Reveal class="mb-12 md:mb-16">
    <div class="flex items-end justify-between gap-6 border-b-2 border-ink pb-5">
      <div class="min-w-0">
        <p class="meta text-muted mb-3">
          <span class="text-signal">{{ index }}</span>
          <span class="mx-2">/</span>
          <span>{{ kicker }}</span>
        </p>
        <h2 class="font-display text-[clamp(2.1rem,5vw,4.4rem)] leading-[0.9] tracking-[-0.04em]">
          <span class="text-reveal"><span>{{ title }}</span></span>
        </h2>
      </div>
      <slot name="aside" />
    </div>
  </Reveal>
</template>
