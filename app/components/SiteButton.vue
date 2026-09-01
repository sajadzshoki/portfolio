<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  magnetic?: boolean
  size?: 'md' | 'lg'
  type?: 'button' | 'submit'
  download?: string
}>(), {
  variant: 'secondary',
  magnetic: false,
  size: 'md',
  type: 'button'
})

const { el, onMove, onLeave, style } = useMagnetic(0.28)
const tag = computed(() => props.href ? 'a' : props.to ? resolveComponent('NuxtLink') : 'button')
const classes = computed(() => [
  'site-btn',
  props.variant === 'primary' ? 'site-btn-primary' : props.variant === 'ghost' ? 'site-btn-ghost' : 'site-btn-secondary',
  props.size === 'lg' ? 'px-7 py-4 text-[1.05rem]' : 'px-5 py-3 text-[0.95rem]'
])
</script>

<template>
  <component
    :is="tag"
    ref="el"
    :href="href"
    :to="to"
    :download="download"
    :class="classes"
    :style="magnetic ? style : undefined"
    :target="href && href.startsWith('http') ? '_blank' : undefined"
    :rel="href && href.startsWith('http') ? 'noreferrer' : undefined"
    @mousemove="magnetic ? onMove($event) : undefined"
    @mouseleave="magnetic ? onLeave() : undefined"
  >
    <slot />
  </component>
</template>
