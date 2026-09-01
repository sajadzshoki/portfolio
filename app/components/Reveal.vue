<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: number
  as?: string
}>(), {
  delay: 0,
  as: 'div'
})

const { el, shown } = useReveal()
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="{ 'is-in': shown }"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot :shown="shown" />
  </component>
</template>
