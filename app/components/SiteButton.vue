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

const { el, onMove, onLeave, style } = useMagnetic(0.16)
const external = computed(() => Boolean(props.href && /^https?:/i.test(props.href)))
const tag = computed(() => props.href ? 'a' : props.to ? resolveComponent('NuxtLink') : 'button')
</script>

<template>
  <component
    :is="tag"
    ref="el"
    :href="href"
    :to="to"
    :type="href || to ? undefined : type"
    :download="download"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="sz-btn"
    :class="[
      variant === 'primary' ? 'sz-btn-primary' : variant === 'ghost' ? 'sz-btn-ghost' : 'sz-btn-secondary',
      size === 'lg' ? 'sz-btn-lg' : 'sz-btn-md'
    ]"
    :style="magnetic ? style : undefined"
    @mousemove="magnetic ? onMove($event) : undefined"
    @mouseleave="magnetic ? onLeave() : undefined"
  >
    <slot />
  </component>
</template>
